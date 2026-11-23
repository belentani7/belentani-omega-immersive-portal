var CACHE = 'belentani-omega-v15';
var CORE = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './js/01-boot.js',
  './js/02-scroll.js',
  './js/03-webgl.js',
  './js/04-matrix.js',
  './js/05-audio.js',
  './js/06-ai.js',
  './js/07-portal.js',
  './js/08-content.js',
  './js/09-terminal.js',
  './js/10-v13.js',
  './js/11-unified.js',
  './js/12-hero-media.js',
  './js/sw-register.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(CORE);
    }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // Estrategia: network-first para CDN/fonts, cache-first para locales
  if (url.origin !== location.origin) {
    e.respondWith(
      caches.match(req).then(function(cached) {
        return cached || fetch(req).then(function(res) {
          if (res.ok) {
            var copy = res.clone();
            caches.open(CACHE).then(function(c) { c.put(req, copy); });
          }
          return res;
        });
      })
    );
  } else {
    e.respondWith(
      fetch(req).then(function(res) {
        if (res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function(c) { c.put(req, copy); });
        }
        return res;
      }).catch(function() { return caches.match(req).then(function(c) { return c || caches.match('./index.html'); }); })
    );
  }
});
