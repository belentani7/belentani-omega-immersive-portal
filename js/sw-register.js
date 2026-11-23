
// Service Worker registration — PWA offline cache
if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').catch(function(err) {
      console.warn('SW registration failed:', err);
    });
  });
}
