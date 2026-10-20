import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const serviceWorkerSource = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');

function createHarness(cacheNames) {
  const handlers = new Map();
  const precached = [];
  const deleted = [];
  let openedCache = null;
  let skippedWaiting = false;
  let clientsClaimed = false;

  const cache = {
    async addAll(paths) {
      precached.push(...paths);
    }
  };
  const fakeSelf = {
    addEventListener(name, handler) {
      handlers.set(name, handler);
    },
    async skipWaiting() {
      skippedWaiting = true;
    },
    clients: {
      async claim() {
        clientsClaimed = true;
      }
    }
  };
  const fakeCaches = {
    async open(name) {
      openedCache = name;
      return cache;
    },
    async keys() {
      return cacheNames;
    },
    async delete(name) {
      deleted.push(name);
      return true;
    },
    async match() {
      return undefined;
    }
  };

  runInNewContext(serviceWorkerSource, {
    self: fakeSelf,
    caches: fakeCaches,
    location: { origin: 'https://omega-portal.invalid' },
    URL,
    fetch: async () => ({ ok: true, clone() { return this; } })
  });

  return {
    handlers,
    precached,
    deleted,
    get openedCache() { return openedCache; },
    get skippedWaiting() { return skippedWaiting; },
    get clientsClaimed() { return clientsClaimed; }
  };
}

async function dispatchAndWait(harness, eventName) {
  let pending;
  const handler = harness.handlers.get(eventName);
  assert.equal(typeof handler, 'function', 'service worker must register ' + eventName);
  handler({
    waitUntil(promise) {
      pending = promise;
    }
  });
  assert.ok(pending, eventName + ' must wait for its cache operation');
  await pending;
}

test('install caches every first-party script before activating the worker', async () => {
  const harness = createHarness([]);
  await dispatchAndWait(harness, 'install');

  assert.equal(harness.openedCache, 'belentani-omega-v16');
  assert.equal(harness.skippedWaiting, true);

  for (const match of indexHtml.matchAll(/<script\b([^>]*)>/gi)) {
    const source = match[1].match(/\bsrc\s*=\s*(["'])(.*?)\1/i);
    if (!source) continue;
    const url = new URL(source[2], 'https://omega-portal.invalid/index.html');
    if (url.origin !== 'https://omega-portal.invalid') continue;
    const expected = './' + decodeURIComponent(url.pathname).replace(/^\/+/, '');
    assert.ok(harness.precached.includes(expected), 'missing offline script: ' + expected);
  }
});

test('activation removes old portal caches and preserves caches owned by other apps', async () => {
  const harness = createHarness([
    'belentani-omega-v15',
    'belentani-omega-v16',
    'another-app-cache'
  ]);
  await dispatchAndWait(harness, 'activate');

  assert.deepEqual(harness.deleted, ['belentani-omega-v15']);
  assert.equal(harness.clientsClaimed, true);
});
