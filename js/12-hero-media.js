(function () {
  var video = document.getElementById('heroVideo');
  var button = document.getElementById('heroMotionToggle');
  if (!video || !button) return;
  var heroMedia = document.querySelector('.hero-media');
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function buildOrbits() {
    if (!heroMedia || heroMedia.querySelector('.hero-orbit')) return;
    var orbit = document.createElement('div');
    orbit.className = 'hero-orbit';
    for (var i = 0; i < 10; i += 1) {
      var spark = document.createElement('span');
      spark.style.left = (8 + Math.random() * 84).toFixed(2) + '%';
      spark.style.top = (6 + Math.random() * 86).toFixed(2) + '%';
      spark.style.animationDelay = (Math.random() * 7).toFixed(2) + 's';
      spark.style.animationDuration = (6 + Math.random() * 8).toFixed(2) + 's';
      spark.style.width = (4 + Math.random() * 10).toFixed(2) + 'px';
      spark.style.height = spark.style.width;
      orbit.appendChild(spark);
    }
    heroMedia.appendChild(orbit);
  }

  function setState(paused) {
    button.textContent = paused ? 'ACTIVAR MOTION' : 'PAUSAR MOTION';
    button.setAttribute('aria-pressed', paused ? 'true' : 'false');
  }

  function pauseVideo() {
    video.pause();
    setState(true);
  }

  function playVideo() {
    var promise = video.play();
    setState(false);
    if (promise && typeof promise.catch === 'function') {
      promise.catch(function () {
        pauseVideo();
      });
    }
  }

  if (motionQuery && motionQuery.matches) {
    pauseVideo();
  } else {
    buildOrbits();
    video.addEventListener('canplay', playVideo, { once: true });
    setState(video.paused);
  }

  if (motionQuery && typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', function (event) {
      if (event.matches) {
        pauseVideo();
      } else {
        buildOrbits();
        playVideo();
      }
    });
  }

  button.addEventListener('click', function () {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });
})();
