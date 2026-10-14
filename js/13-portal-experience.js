// OMEGA PORTAL EXPERIENCE — navigation, immersive mode and graceful degradation
(function () {
  'use strict';
  var root = document.documentElement;
  var body = document.body;
  var modeButton = document.getElementById('portalModeToggle');
  var motionButton = document.getElementById('heroMotionToggle');

  function jumpTo(id) {
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('[data-jump="' + id + '"]').forEach(function (el) {
      el.classList.add('visited');
    });
  }

  document.querySelectorAll('[data-jump]').forEach(function (button) {
    button.addEventListener('click', function () { jumpTo(button.dataset.jump); });
  });

  document.querySelectorAll('.sb-item, .topnav .ndot').forEach(function (item) {
    item.addEventListener('click', function () {
      var id = item.dataset.sec || item.dataset.t;
      if (id) window.setTimeout(function () { root.dataset.lastPortal = id; }, 250);
    });
  });

  function setImmersive(enabled) {
    body.classList.toggle('immersive-mode', enabled);
    root.dataset.immersive = enabled ? 'on' : 'off';
    if (modeButton) {
      modeButton.setAttribute('aria-pressed', String(enabled));
      modeButton.textContent = enabled ? 'SALIR DEL MODO INMERSIVO' : 'ACTIVAR MODO INMERSIVO';
    }
    try { localStorage.setItem('omega-immersive', enabled ? '1' : '0'); } catch (error) { /* private mode */ }
  }

  if (modeButton) {
    modeButton.addEventListener('click', function () {
      setImmersive(!body.classList.contains('immersive-mode'));
    });
  }

  try { setImmersive(localStorage.getItem('omega-immersive') === '1'); } catch (error) { setImmersive(false); }

  if (motionButton) {
    motionButton.addEventListener('click', function () {
      var video = document.getElementById('heroVideo');
      var paused = video && video.paused;
      if (video) paused ? video.play().catch(function () {}) : video.pause();
      motionButton.textContent = paused ? 'PAUSAR MOTION' : 'REANUDAR MOTION';
      motionButton.setAttribute('aria-pressed', String(!paused));
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key.toLowerCase() === 'i' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      setImmersive(!body.classList.contains('immersive-mode'));
    }
    if (event.key === 'Escape' && body.classList.contains('immersive-mode')) setImmersive(false);
  });

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    root.dataset.reducedMotion = 'true';
    body.classList.add('reduced-motion');
  }
})();
