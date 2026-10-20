import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const localOrigin = 'https://omega-portal.invalid';

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries
    .filter((entry) => entry.name !== '.git' && entry.name !== 'node_modules')
    .map(async (entry) => {
      const absolutePath = resolve(directory, entry.name);
      if (entry.isDirectory()) return collectHtmlFiles(absolutePath);
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        return [relative(root, absolutePath).split(sep).join('/')];
      }
      return [];
    }));
  return nested.flat();
}

function resolveLocalPath(reference, sourcePage) {
  const value = reference.trim();
  if (!value || value.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return null;

  let targetUrl;
  try {
    targetUrl = new URL(value, new URL(sourcePage, localOrigin + '/'));
  } catch (error) {
    throw new Error('Invalid URL reference in ' + sourcePage + ': ' + value, { cause: error });
  }
  if (targetUrl.origin !== localOrigin) return null;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(targetUrl.pathname);
  } catch (error) {
    throw new Error('Invalid URL encoding in ' + sourcePage + ': ' + value, { cause: error });
  }
  const absolutePath = resolve(root, '.' + decodedPath);
  const relativePath = relative(root, absolutePath);
  if (relativePath === '..' || relativePath.startsWith('..' + sep)) {
    throw new Error('Reference escapes the site root in ' + sourcePage + ': ' + value);
  }
  return relativePath.split(sep).join('/');
}

async function assertExists(relativePath, description) {
  const absolutePath = relativePath ? resolve(root, relativePath) : root;
  try {
    await access(absolutePath);
  } catch {
    throw new Error(description + ' does not exist: ' + relativePath);
  }
}

const manifest = JSON.parse(await readFile(resolve(root, 'manifest.json'), 'utf8'));
if (!manifest.name || !manifest.start_url || manifest.display !== 'standalone') {
  throw new Error('manifest.json must define name, start_url and standalone display');
}
const manifestStart = resolveLocalPath(manifest.start_url, '');
if (manifestStart === null) throw new Error('manifest start_url must point to a local file');
await assertExists(manifestStart, 'manifest start_url');

const serviceWorkerPath = resolve(root, 'sw.js');
const serviceWorker = await readFile(serviceWorkerPath, 'utf8');
if (!serviceWorker.includes('addEventListener')) {
  throw new Error('sw.js does not look like a service worker');
}

const coreMatch = serviceWorker.match(/\bvar\s+CORE\s*=\s*\[([\s\S]*?)\];/);
if (!coreMatch) throw new Error('sw.js must declare its CORE precache list');
const coreEntries = [...coreMatch[1].matchAll(/(["'])(.*?)\1/g)].map((match) => match[2]);
if (coreEntries.length === 0) throw new Error('sw.js CORE precache list is empty');

const corePaths = new Set();
for (const entry of coreEntries) {
  const path = resolveLocalPath(entry, '');
  if (path === null) throw new Error('sw.js CORE entries must be local paths: ' + entry);
  if (corePaths.has(path)) throw new Error('Duplicate service worker precache entry: ' + entry);
  corePaths.add(path);
  await assertExists(path, 'Service worker precache entry');
}

const htmlFiles = await collectHtmlFiles(root);
if (!htmlFiles.includes('index.html')) throw new Error('index.html is missing');
const localScripts = new Set();

for (const htmlPath of htmlFiles) {
  const html = await readFile(resolve(root, htmlPath), 'utf8');
  for (const match of html.matchAll(/\b(?:src|href|poster|action)\s*=\s*(["'])(.*?)\1/gi)) {
    const path = resolveLocalPath(match[2], htmlPath);
    if (path !== null) await assertExists(path, 'Local HTML reference from ' + htmlPath);
  }

  for (const match of html.matchAll(/<script\b([^>]*)>/gi)) {
    const source = match[1].match(/\bsrc\s*=\s*(["'])(.*?)\1/i);
    if (!source) continue;
    const path = resolveLocalPath(source[2], htmlPath);
    if (path === null) continue;
    await assertExists(path, 'Local script from ' + htmlPath);
    if (!path.toLowerCase().endsWith('.js')) {
      throw new Error('Local script must use a .js file: ' + path);
    }
    if (!corePaths.has(path)) {
      throw new Error('Local script is missing from the service worker precache: ' + path);
    }
    localScripts.add(path);
  }
}

for (const scriptPath of [...localScripts, 'sw.js']) {
  await exec(process.execPath, ['--check', resolve(root, scriptPath)]);
}

console.log('static-assets: ok (' + htmlFiles.length + ' HTML pages, ' + localScripts.size + ' local scripts, ' + corePaths.size + ' precache entries)');
