
// ASCENSION
function ascend(){
  document.body.classList.add('ascended');
  if(window.__pU) window.__pU.uColor.value = new THREE.Color(0xffd700);
  gsap.fromTo('#ascFlash', {opacity:0}, {opacity:1, duration:.4, yoyo:true, repeat:3, onComplete:function(){gsap.to('#ascFlash', {opacity:0, duration:2})}});
  try{
    if(window.Tone){
      Tone.start();
      var s = new Tone.PolySynth(Tone.Synth).toDestination();
      s.volume.value = -8;
      s.triggerAttackRelease(['C4','E4','G4','B4','D5'], '2n');
    }
  }catch(e){}
  setTimeout(function(){document.body.classList.remove('ascended')}, 12000);
}

// PORTAL GEMS STATE (localStorage persistence)
var pState = {got: {}};

function loadGemState(){
  try{
    var saved = localStorage.getItem('belentani_portal_gems');
    if(saved){
      pState.got = JSON.parse(saved);
      Object.keys(pState.got).forEach(function(i){
        var idx = parseInt(i);
        if(!isNaN(idx)){
          document.getElementById('gemStatus'+idx).innerHTML = '&#9670; ACTIVA';
          document.getElementById('gemStatus'+idx).style.color = 'var(--gold)';
        }
      });
      var cnt = Object.keys(pState.got).length;
      document.getElementById('portalFrags').textContent = cnt+'/5';
      document.getElementById('swarmStatus').textContent = cnt===5 ? 'SINCRONIZADO' : 'CONECTANDO...';
      document.getElementById('swarmStatus').style.color = cnt===5 ? 'var(--gold)' : 'var(--cyan)';
      document.getElementById('portalHint').textContent = '> GEMAS RESTAURADAS: '+cnt+'/5';
      var gs = document.querySelectorAll('[data-gem]');
      gs.forEach(function(g,j){g.style.opacity = pState.got[j] ? '1' : '.5'});
      if(cnt === 5){
        document.getElementById('portalHint').textContent = '[ ENJAMBRE SINCRONIZADO — ASCENSION DISPONIBLE ]';
        activateFullGoldTheme();
      }
    }
  }catch(e){}
}

function saveGemState(){
  try{localStorage.setItem('belentani_portal_gems', JSON.stringify(pState.got));}catch(e){}
}

// GEM ACTIVATION
function gemActivate(i){
  if(pState.got[i]) return;
  pState.got[i] = true;
  saveGemState();
  var cnt = Object.keys(pState.got).length;
  document.getElementById('gemStatus'+i).innerHTML = '&#9670; ACTIVA';
  document.getElementById('gemStatus'+i).style.color = 'var(--gold)';
  document.getElementById('pilotName').textContent = FIRMAS[i].n;
  document.getElementById('portalFrags').textContent = cnt+'/5';
  document.getElementById('swarmStatus').textContent = cnt===5 ? 'SINCRONIZADO' : 'CONECTANDO...';
  document.getElementById('swarmStatus').style.color = cnt===5 ? 'var(--gold)' : 'var(--cyan)';
  document.getElementById('portalHint').textContent = '> GEMA '+(i+1)+' — '+FIRMAS[i].n+' ACTIVADA. '+((cnt===5) ? 'ENJAMBRE SINCRONIZADO — ASCENSION DISPONIBLE' : 'FALTAN '+(5-cnt)+' GEMAS.');
  var gs = document.querySelectorAll('[data-gem]');
  gs.forEach(function(g,j){g.style.opacity = pState.got[j] ? '1' : '.5'});

  // Sound effect on activation
  playGemSound(i);

  // Screen flash on activation
  triggerScreenFlash(0xffffff, 0.15);

  // Portal background color shift
  shiftPortalBackground(i);

  if(cnt === 5){
    setTimeout(function(){
      document.getElementById('portalHint').textContent = '[ ENJAMBRE SINCRONIZADO — ESCRIBE OMEGA EN EL CHAT PARA ASCENDER ]';
      activateFullGoldTheme();
      ascend();
    }, 800);
  }
}

// SCREEN FLASH ON GEM ACTIVATION
function triggerScreenFlash(color, maxOpacity){
  var flash = document.getElementById('gemFlash');
  if(!flash){
    flash = document.createElement('div');
    flash.id = 'gemFlash';
    flash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;opacity:0;mix-blend-mode:screen;';
    document.body.appendChild(flash);
  }
  flash.style.background = '#' + color.toString(16).padStart(6,'0');
  gsap.fromTo(flash, {opacity:maxOpacity}, {opacity:0, duration:0.3, ease:'power2.out'});
}

// PORTAL BACKGROUND COLOR SHIFT
var gemBgColors = [
  'rgba(255,215,0,0.08)',   // gold
  'rgba(0,255,255,0.08)',   // cyan
  'rgba(176,38,255,0.08)',  // purple
  'rgba(255,0,60,0.08)',    // red
  'rgba(245,245,245,0.08)'  // white
];

function shiftPortalBackground(idx){
  var portal = document.getElementById('portal') || document.querySelector('.portal-section');
  if(!portal) return;
  var currentBg = gemBgColors[idx];
  gsap.to(portal, {
    backgroundColor: currentBg,
    duration: 1.2,
    ease: 'power1.inOut',
    onComplete: function(){
      gsap.to(portal, {backgroundColor: 'transparent', duration: 2, delay: 0.5});
    }
  });
}

// FULL GOLD THEME WHEN ALL 5 GEMS ACTIVE
function activateFullGoldTheme(){
  var portal = document.getElementById('portal') || document.querySelector('.portal-section');
  if(portal){
    portal.classList.add('portal-gold-complete');
  }
  var gemStatuses = document.querySelectorAll('.gem-status');
  gemStatuses.forEach(function(el){
    el.style.textShadow = '0 0 12px rgba(255,215,0,0.8)';
  });
}

// LORE PHRASES FOR PORTAL HINT
var lorePhrases = [
  'Los pilotos del enjambre buscan la luz entre las estrellas.',
  'Cada gema guarda el recuerdo de un viaje incompleto.',
  'El portal resuena con las frecuencias del origen.',
  'La sinergia entre pilotos crea caminos invisibles.',
  'Belentani espera — las gemas son su lenguaje.',
  'En la oscuridad del espacio, la geometría brilla.',
  'Los fragmentos se alinean cuando la voluntad es una.',
  'El enjambre despierta solo para quienes escuchan.',
  'Cada activación es un latido del corazón digital.',
  'La ascensión no es un destino, es una frecuencia.'
];

function getRandomLore(){
  return lorePhrases[Math.floor(Math.random() * lorePhrases.length)];
}

// GEM HOVER TOOLTIP
function initGemTooltips(){
  var canvas = document.getElementById('diamC');
  if(!canvas) return;
  var tooltip = document.createElement('div');
  tooltip.id = 'gemTooltip';
  tooltip.style.cssText = 'position:fixed;padding:8px 12px;background:rgba(0,0,0,0.85);color:var(--gold);border:1px solid var(--gold);border-radius:4px;font-size:12px;font-family:"Courier New",monospace;pointer-events:none;opacity:0;z-index:10000;max-width:280px;line-height:1.4;transition:opacity 0.2s;';
  document.body.appendChild(tooltip);

  var tooltipPhrases = [
    'GEMA DEL ORIGEN — La primera luz del enjambre.',
    'GEMA DEL VUELO — Navega entre los silencios.',
    'GEMA DEL ECO — Resuena en la memoria digital.',
    'GEMA DEL FUEGO — Enciende la conexión.',
    'GEMA FINAL — Completa el circuito del alma.'
  ];

  canvas.addEventListener('mousemove', function(e){
    if(!window.THREE || !window.__portalGems) return;
    var r = canvas.getBoundingClientRect();
    var mx = ((e.clientX - r.left)/r.width)*2 - 1;
    var my = -((e.clientY - r.top)/r.height)*2 + 1;
    var raycaster = new THREE.Raycaster();
    var vec = new THREE.Vector2(mx, my);
    raycaster.setFromCamera(vec, window.__portalCam);
    var hits = raycaster.intersectObjects(window.__portalGems, true);
    if(hits.length){
      var obj = hits[0].object;
      while(obj.parent && window.__portalGems.indexOf(obj) === -1) obj = obj.parent;
      var idx = window.__portalGems.indexOf(obj);
      if(idx > -1){
        tooltip.textContent = tooltipPhrases[idx];
        tooltip.style.left = (e.clientX + 16) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
        tooltip.style.opacity = '1';
        canvas.style.cursor = 'pointer';
        return;
      }
    }
    tooltip.style.opacity = '0';
    canvas.style.cursor = 'default';
  });

  canvas.addEventListener('mouseleave', function(){
    tooltip.style.opacity = '0';
  });
}

// PORTAL SOUND EFFECTS
var portalSounds = {initialized: false, ambientNode: null};

function initPortalSounds(){
  if(!window.Tone || portalSounds.initialized) return;
  portalSounds.initialized = true;

  // Ambient hum
  try{
    var osc = new Tone.Oscillator({type:'sine', frequency:55}).toDestination();
    osc.volume.value = -30;
    var lfo = new Tone.LFO(0.1, 50, 60).start();
    lfo.connect(osc.frequency);
    osc.start();
    portalSounds.ambientNode = osc;
  }catch(e){}
}

function playClickSound(){
  try{
    if(!window.Tone) return;
    Tone.start();
    var click = new Tone.Noise('white').toDestination();
    click.volume.value = -24;
    var env = new Tone.AmplitudeEnvelope({attack:0.001,decay:0.05,sustain:0,release:0.1}).toDestination();
    click.connect(env);
    env.toDestination();
    click.start();
    env.triggerAttackRelease(0.06);
    setTimeout(function(){click.stop();click.dispose();env.dispose()}, 200);
  }catch(e){}
}

// TONE.JS GEM SOUNDS
function playGemSound(idx){
  try{
    if(!window.Tone) return;
    Tone.start();
    var notes = ['C5','E5','G5','B5','D6'];
    var synth = new Tone.Synth({oscillator:{type:'sine'},envelope:{attack:0.02,decay:0.4,sustain:0.1,release:0.8}}).toDestination();
    synth.volume.value = -12;
    synth.triggerAttackRelease(notes[idx], '8n');
    // Play click sound alongside
    playClickSound();
  }catch(e){}
}

// THREE.JS PARTICLE SYSTEM FOR BURSTS
var portalParticles = [];

function createParticleBurst(x, y, z, color, count, spread){
  if(!window.THREE) return;
  var scene = null;
  if(window.__portalScene) scene = window.__portalScene;
  if(!scene) return;
  count = count || 30;
  spread = spread || 3;
  for(var i = 0; i < count; i++){
    var geo = new THREE.SphereGeometry(0.08 + Math.random()*0.12, 6, 6);
    var mat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 1});
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    var vel = {
      x: (Math.random()-0.5)*spread,
      y: (Math.random()-0.5)*spread,
      z: (Math.random()-0.5)*spread
    };
    var life = 0.8 + Math.random()*0.6;
    scene.add(mesh);
    portalParticles.push({mesh:mesh, vel:vel, life:life, age:0});
  }
}

function updateParticles(dt){
  for(var i = portalParticles.length - 1; i >= 0; i--){
    var p = portalParticles[i];
    p.age += dt;
    if(p.age >= p.life){
      if(p.mesh.parent) p.mesh.parent.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      portalParticles.splice(i, 1);
      continue;
    }
    p.mesh.position.x += p.vel.x * dt;
    p.mesh.position.y += p.vel.y * dt;
    p.mesh.position.z += p.vel.z * dt;
    p.vel.x *= 0.96;
    p.vel.y *= 0.96;
    p.vel.z *= 0.96;
    p.mesh.material.opacity = 1 - (p.age / p.life);
  }
}

// PORTAL 3D GEMS
(function(){
  var cv = document.getElementById('diamC');
  if(!cv || !window.THREE) return;
  var sc = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(60, cv.clientWidth/cv.clientHeight, 0.1, 100);
  var ren = new THREE.WebGLRenderer({canvas:cv, alpha:true, antialias:true});
  ren.setSize(cv.clientWidth, cv.clientHeight);
  ren.setPixelRatio(Math.min(devicePixelRatio, 2));
  cam.position.z = 16;

  // Expose for tooltips and other modules
  window.__portalScene = sc;
  window.__portalCam = cam;

  var cols = [0xffd700, 0x00ffff, 0xb026ff, 0xff003c, 0xf5f5f5];
  var gems = [];
  window.__portalGems = gems;

  cols.forEach(function(c, i){
    var g = new THREE.Group();
    var solid = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.6, 0),
      new THREE.MeshPhongMaterial({color:c, emissive:c, emissiveIntensity:0.4, transparent:true, opacity:0.85, shininess:140})
    );
    var w = new THREE.Mesh(
      new THREE.OctahedronGeometry(2.1, 0),
      new THREE.MeshBasicMaterial({color:c, wireframe:true, transparent:true, opacity:0.2})
    );
    g.add(solid);
    g.add(w);
    g.position.x = (i-2)*4.6;
    g.userData = {ph:Math.random()*6, idx:i, baseY:0, driftPhase:Math.random()*Math.PI*2};
    sc.add(g);
    gems.push(g);
  });

  // Random drift offsets
  gems.forEach(function(g){
    g.userData.driftX = (Math.random()-0.5)*0.8;
    g.userData.driftZ = (Math.random()-0.5)*0.4;
  });

  // Raycaster for clicks
  var ray = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  cv.addEventListener('click', function(e){
    var r = cv.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left)/r.width)*2 - 1;
    mouse.y = -((e.clientY - r.top)/r.height)*2 + 1;
    ray.setFromCamera(mouse, cam);
    var hits = ray.intersectObjects(gems, true);
    if(hits.length){
      var o = hits[0].object;
      while(o.parent && gems.indexOf(o) === -1) o = o.parent;
      var idx = gems.indexOf(o);
      if(idx > -1){
        gemActivate(idx);
        o.scale.setScalar(1.4);
        setTimeout(function(){o.scale.setScalar(1)}, 400);

        // Particle burst on gem click
        var wp = new THREE.Vector3();
        o.getWorldPosition(wp);
        createParticleBurst(wp.x, wp.y, wp.z, cols[idx], 35, 3);
      }
    }
  });

  // Lights
  sc.add(new THREE.PointLight(0xffffff, 1.2, 60));
  sc.add(new THREE.AmbientLight(0xff003c, 0.4));

  // Easter egg: thiago red particle storm
  var thiagoActive = false;
  function triggerThiagoStorm(){
    if(thiagoActive) return;
    thiagoActive = true;
    document.getElementById('portalHint').textContent = '[ THIAGO — STORM INITIATED ]';
    document.getElementById('portalHint').style.color = '#ff003c';
    var burstCount = 0;
    var stormInterval = setInterval(function(){
      if(burstCount >= 8){clearInterval(stormInterval); thiagoActive = false; return;}
      var rx = (Math.random()-0.5)*10;
      var ry = (Math.random()-0.5)*6;
      createParticleBurst(rx, ry, 0, 0xff003c, 60, 5);
      burstCount++;
    }, 300);
    // Play a low rumble
    try{
      if(window.Tone){
        Tone.start();
        var rumble = new Tone.Noise('brown').toDestination();
        rumble.volume.value = -20;
        rumble.start();
        setTimeout(function(){rumble.stop();rumble.dispose()}, 2400);
      }
    }catch(e){}
  }

  // Easter egg: belentani free (positive colors)
  function triggerBelentaniFree(){
    document.getElementById('portalHint').textContent = '[ BELENTANI FREE — POSITIVE ENERGY ACTIVATED ]';
    document.getElementById('portalHint').style.color = '#00ff88';
    var positiveColors = [0x00ff88, 0x00ccff, 0xffd700, 0xff69b4, 0x7b68ee];
    for(var i = 0; i < gems.length; i++){
      (function(idx){
        setTimeout(function(){
          var wp = new THREE.Vector3();
          gems[idx].getWorldPosition(wp);
          createParticleBurst(wp.x, wp.y, wp.z, positiveColors[idx], 40, 4);
        }, idx * 200);
      })(i);
    }
    // Happy ascending chime
    try{
      if(window.Tone){
        Tone.start();
        var synth = new Tone.PolySynth(Tone.Synth).toDestination();
        synth.volume.value = -10;
        synth.triggerAttackRelease(['C5','E5','G5','C6'], '4n');
      }
    }catch(e){}
    // Flash all gems positive colors
    gems.forEach(function(g, i){
      g.children[0].material.color.setHex(positiveColors[i]);
      g.children[0].material.emissive.setHex(positiveColors[i]);
      g.children[1].material.color.setHex(positiveColors[i]);
    });
  }

  // Easter egg keyboard listener
  var inputBuffer = '';
  document.addEventListener('keydown', function(e){
    inputBuffer += e.key.toLowerCase();
    if(inputBuffer.length > 20) inputBuffer = inputBuffer.slice(-20);
    if(inputBuffer.indexOf('thiago') !== -1){
      inputBuffer = '';
      triggerThiagoStorm();
    }
    if(inputBuffer.indexOf('belentanifree') !== -1 || inputBuffer.indexOf('belentani free') !== -1){
      inputBuffer = '';
      triggerBelentaniFree();
    }
  });

  // Animation loop with drift
  var lastTime = performance.now();
  function loop(){
    var t = performance.now() * 0.001;
    var dt = Math.min((performance.now() - lastTime) / 1000, 0.1);
    lastTime = performance.now();

    gems.forEach(function(g, i){
      g.rotation.y = t*(0.4 + i*0.08);
      g.rotation.x = Math.sin(t*0.5 + g.userData.ph)*0.3;
      // Floating agent random drift
      g.position.y = Math.sin(t*0.8 + g.userData.ph)*0.6
        + Math.sin(t*0.3 + g.userData.driftPhase)*0.2;
      g.position.x = (i-2)*4.6 + Math.sin(t*0.2 + g.userData.driftPhase)*g.userData.driftX;
    });

    updateParticles(dt);
    ren.render(sc, cam);
    requestAnimationFrame(loop);
  }
  loop();

  // Resize
  addEventListener('resize', function(){
    if(!cv.clientWidth) return;
    cam.aspect = cv.clientWidth/cv.clientHeight;
    cam.updateProjectionMatrix();
    ren.setSize(cv.clientWidth, cv.clientHeight);
  });
})();

// Initialize gem state from localStorage
loadGemState();

// Initialize tooltips and portal sounds
initGemTooltips();
initPortalSounds();
