
// TONE.JS AUDIO ENGINE — Plan 400 Pasos 101-125
var hInit = false, synth, masterGain, reverb, bassFilter;
var activeOscillators = [];

function initH() {
  if (hInit) return;
  try {
    Tone.start();
    // Master reverb
    reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 }).toDestination();
    // Master gain with fade-in
    masterGain = new Tone.Gain(0).connect(reverb);
    masterGain.gain.rampTo(1, 0.5); // Fade-in 500ms
    // Bass filter for sweep
    bassFilter = new Tone.Filter(800, 'lowpass').connect(masterGain);
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.2, release: 0.5 }
    }).connect(bassFilter);
    synth.volume.value = -8;
    hInit = true;
  } catch (e) {}
}

function disposeOsc(osc) {
  if (osc && osc.dispose) {
    try { osc.dispose(); } catch (e) {}
  }
}

function playSolfeggio(f) {
  initH();
  if (!synth) return;
  try {
    var g = new Tone.Gain(0.12).connect(masterGain);
    var o = new Tone.Oscillator(f, 'sine').connect(g);
    activeOscillators.push(o);
    o.start();
    g.gain.rampTo(0.001, 8);
    o.stop('+8');
    setTimeout(function() {
      disposeOsc(o);
      var idx = activeOscillators.indexOf(o);
      if (idx > -1) activeOscillators.splice(idx, 1);
    }, 8500);
    document.getElementById('hbF').textContent = f;
    document.getElementById('hbR').textContent = 'SOLFEGGIO';
    var b = document.getElementById('hbar');
    b.classList.add('on');
    setTimeout(function() { b.classList.remove('on'); }, 4000);
    window.__setAmp && window.__setAmp(0.5);
    drawWave(0.5);
  } catch (e) {}
}

// Solfeggio frequencies
var SOLFEGGIO = [432, 528, 639, 741, 852];
function playSolfeggioSeq(idx) {
  if (idx === undefined) idx = 0;
  if (idx >= SOLFEGGIO.length) return;
  playSolfeggio(SOLFEGGIO[idx]);
  if (idx < SOLFEGGIO.length - 1) {
    setTimeout(function() { playSolfeggioSeq(idx + 1); }, 3500);
  }
}

// WAVEFORM VISUALIZER — Plan 400 Pasos 121-125
var waveMode = 'circular'; // 'circular' | 'spectrum'
var wavePulse = 0;

function drawWave(amp) {
  var cv = document.getElementById('waveC');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var w = cv.width = cv.clientWidth;
  var h = cv.height = cv.clientHeight;
  ctx.clearRect(0, 0, w, h);
  var cx = w / 2, cy = h / 2;
  var rad = Math.min(w, h) / 2 * 0.7;
  var bars = 64;
  var a = Math.min(amp || 0.3, 1);
  var t = Date.now();

  if (waveMode === 'spectrum') {
    drawSpectrum(ctx, cx, cy, rad, bars, a, t);
  } else {
    drawCircular(ctx, cx, cy, rad, bars, a, t);
  }

  // Pulse when idle
  if (a < 0.25) {
    wavePulse = (wavePulse + 0.03) % (Math.PI * 2);
    var pulseR = rad * 0.15 + Math.sin(wavePulse) * 4;
    ctx.beginPath();
    ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,215,0,0.3)';
    ctx.fill();
  }
}

function drawCircular(ctx, cx, cy, rad, bars, a, t) {
  // Outer ring
  ctx.beginPath();
  for (var i = 0; i < bars; i++) {
    var ang = (i / bars) * Math.PI * 2;
    var r = rad + (a * 42) * Math.sin(i * 0.8 + t * 0.003);
    var x = cx + Math.cos(ang) * r;
    var y = cy + Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  var gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad + 50);
  gr.addColorStop(0, 'rgba(255,0,60,0.8)');
  gr.addColorStop(0.5, 'rgba(255,215,0,0.35)');
  gr.addColorStop(1, 'rgba(255,0,60,0)');
  ctx.fillStyle = gr;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,0,60,0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner ring (secondary, different color)
  ctx.beginPath();
  for (var i = 0; i < bars; i++) {
    var ang = (i / bars) * Math.PI * 2;
    var r = rad * 0.5 + (a * 24) * Math.sin(i * 1.2 + t * 0.004 + 1);
    var x = cx + Math.cos(ang) * r;
    var y = cy + Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = 'rgba(0,200,255,0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = 'rgba(0,200,255,0.05)';
  ctx.fill();

  // Center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 8 + a * 14, 0, Math.PI * 2);
  ctx.fillStyle = a > 0.5 ? 'rgba(255,215,0,0.8)' : 'rgba(255,0,60,0.6)';
  ctx.fill();
}

function drawSpectrum(ctx, cx, cy, rad, bars, a, t) {
  var spectrumBars = 48;
  var barW = 3;
  var maxH = rad * 0.6;
  var totalW = spectrumBars * (barW + 2);
  var startX = cx - totalW / 2;

  for (var i = 0; i < spectrumBars; i++) {
    var freq = (i / spectrumBars);
    var h = maxH * a * (0.3 + 0.7 * Math.sin(freq * Math.PI)) *
            (0.6 + 0.4 * Math.sin(i * 0.5 + t * 0.005));
    var x = startX + i * (barW + 2);
    var y = cy + rad * 0.3 - h;

    var hue = (i / spectrumBars) * 60;
    ctx.fillStyle = 'hsla(' + hue + ',100%,50%,' + (0.4 + a * 0.4) + ')';
    ctx.fillRect(x, y, barW, h);
  }

  // Reflection
  for (var i = 0; i < spectrumBars; i++) {
    var freq = (i / spectrumBars);
    var h = maxH * a * (0.3 + 0.7 * Math.sin(freq * Math.PI)) *
            (0.6 + 0.4 * Math.sin(i * 0.5 + t * 0.005)) * 0.3;
    var x = startX + i * (barW + 2);
    var y = cy + rad * 0.3 + 2;

    ctx.fillStyle = 'hsla(' + ((i / spectrumBars) * 60) + ',100%,50%,0.15)';
    ctx.fillRect(x, y, barW, h);
  }
}

function setWaveMode(mode) {
  waveMode = mode === 'spectrum' ? 'spectrum' : 'circular';
}

var wA = 0.2;
function wLoop() {
  drawWave(wA);
  wA = 0.2 + 0.15 * Math.sin(Date.now() * 0.001);
  if (document.getElementById('hbar').classList.contains('on')) wA = Math.max(wA, 0.6);
  requestAnimationFrame(wLoop);
}
wLoop();


// BEAT FORGE — Plan 400 Pasos 111-120
var beatLoop = null;

function beatPlay() {
  initH();
  if (!synth) return;
  if (beatLoop) beatStop();

  var bpm = 96;
  var beat = 60 / bpm;
  var step = 0;

  var bass = ['A1', 'A1', 'C2', 'C2', 'F1', 'F1', 'G1', 'G1'];
  var hats = [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1];
  var kickPattern = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1];

  // Kick drum (MembraneSynth)
  var kick = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 6,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 }
  }).connect(masterGain);
  kick.volume.value = -4;

  var info = document.getElementById('beatInfo');
  info.textContent = '> BPM: ' + bpm + ' | KEY: Am | SEED: ' + Math.floor(Math.random() * 9999);
  var hbar = document.getElementById('hbar');
  hbar.classList.add('on');

  // Filter sweep on bass
  var filterFreq = 400;
  var filterDir = 1;

  function tick() {
    try {
      // Filter sweep
      filterFreq += filterDir * 60;
      if (filterFreq > 1200) filterDir = -1;
      if (filterFreq < 300) filterDir = 1;
      bassFilter.frequency.value = filterFreq;

      // Bass
      synth.triggerAttackRelease(bass[step % 8], '8n');

      // Kick drum
      if (kickPattern[step % 16]) {
        kick.triggerAttackRelease('C1', '8n');
      }

      // Hi-hats
      if (hats[step % 16]) {
        var n = new Tone.NoiseSynth({
          noise: { type: 'white' },
          envelope: { attack: 0.001, decay: 0.05, sustain: 0 }
        }).connect(masterGain);
        n.volume.value = -20;
        n.triggerAttackRelease('32n');
        setTimeout(function() { disposeOsc(n); }, 200);
      }

      window.__setAmp && window.__setAmp(0.3 + Math.random() * 0.3);
      drawWave(0.4 + Math.random() * 0.2);
      document.getElementById('hbR').textContent = bass[step % 8];
      document.getElementById('hbF').textContent = Math.round(Tone.Frequency(bass[step % 8]).toFrequency());
      document.getElementById('hbK').textContent = 'Am DARK';
      document.getElementById('hbA').textContent = (0.3 + Math.random() * 0.3).toFixed(2);
    } catch (e) {}
    step++;
  }

  tick();
  beatLoop = setInterval(tick, beat * 500);
}

function beatStop() {
  if (beatLoop) {
    clearInterval(beatLoop);
    beatLoop = null;
  }
  document.getElementById('hbar').classList.remove('on');
  window.__setAmp && window.__setAmp(0);
  // Dispose active oscillators
  activeOscillators.forEach(function(o) { disposeOsc(o); });
  activeOscillators = [];
}
