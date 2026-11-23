
// ═══════════════════════════════════════════════════════════════
// OMEGA UNIFIED — MODULE 11
// themes (OPTIMUS) · loader (SUPREME) · telemetry (MERGED)
// agent visual (GOD) · tools IA extra · collapse (entity_t)
// ═══════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────────
// 1. LOADER (v15 SUPREME) — barra de progreso + status
// ────────────────────────────────────────────────────────────────
(function(){
  var bar=document.getElementById('loader-bar');
  var status=document.getElementById('loader-status');
  var loader=document.getElementById('loader');
  if(!bar||!loader)return;
  var statuses=['INICIALIZANDO NÚCLEO CUÁNTICO...','CARGANDO GEMAS ARQUETIPAS...','SINCRONIZANDO 432Hz...','DESPLEGANDO ENJAMBRE NEURAL...','OMEGA CORE LISTO.'];
  var p=0;
  var iv=setInterval(function(){
    p+=Math.random()*18+4;
    if(p>100)p=100;
    bar.style.width=p+'%';
    status.textContent=statuses[Math.min(Math.floor(p/25),4)];
    if(p>=100){
      clearInterval(iv);
      setTimeout(function(){
        if(typeof gsap!=='undefined'){
          gsap.to(loader,{opacity:0,duration:0.8,onComplete:function(){loader.style.display='none'}});
        }else{
          loader.style.display='none';
        }
      },350);
    }
  },120);
})();

// ────────────────────────────────────────────────────────────────
// 2. THEMES (v7 OPTIMUS) — 4 temas. ROJO PREVALECE: --blood fijo.
//    Los temas alteran atmósfera (fondo/glow) no la firma roja.
// ────────────────────────────────────────────────────────────────
(function(){
  var sw=document.getElementById('themeSwitcher');
  if(!sw)return;
  var saved=null;
  try{saved=localStorage.getItem('omega_theme')||'neon'}catch(e){}
  function apply(t){
    document.documentElement.setAttribute('data-theme',t);
    sw.querySelectorAll('.theme-btn').forEach(function(b){b.classList.toggle('on',b.dataset.theme===t)});
    try{localStorage.setItem('omega_theme',t)}catch(e){}
  }
  sw.addEventListener('click',function(e){
    var b=e.target.closest('.theme-btn');
    if(b){apply(b.dataset.theme)}
  });
  apply(saved||'neon');
})();

// ────────────────────────────────────────────────────────────────
// 3. TELEMETRY (v13 MERGED) — reloj + CPU simulado + freq
// ────────────────────────────────────────────────────────────────
(function(){
  var tt=document.getElementById('teleTime');
  var tc=document.getElementById('teleCpu');
  var tf=document.getElementById('teleFreq');
  if(tt)setInterval(function(){tt.textContent=new Date().toTimeString().split(' ')[0]},1000);
  if(tc)setInterval(function(){tc.textContent=(30+Math.random()*25).toFixed(1)},2000);
  if(tf)setInterval(function(){tf.textContent=(431.5+Math.random()*1).toFixed(2)},1500);

  // Sidebar active state on scroll
  var items=document.querySelectorAll('.sb-item');
  if(items.length){
    var sections=Array.prototype.slice.call(items).map(function(a){return a.dataset.sec});
    function mark(){
      var y=window.scrollY+120;
      var cur=sections[0];
      sections.forEach(function(s){
        var el=document.getElementById(s);
        if(el&&el.offsetTop<=y)cur=s;
      });
      items.forEach(function(a){a.classList.toggle('active',a.dataset.sec===cur)});
    }
    window.addEventListener('scroll',mark,{passive:true});
    mark();
    items.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var t=a.getAttribute('href');if(t&&t.charAt(0)==='#'){var el=document.getElementById(t.slice(1));if(el&&typeof gsap!=='undefined')gsap.to(window,{scrollTo:t,duration:1.4,ease:'power3.inOut'})}})});
  }
})();

// ────────────────────────────────────────────────────────────────
// 4. AGENTE VISUAL (v14 GOD) — agentFace + agentBubble
// ────────────────────────────────────────────────────────────────
(function(){
  var face=document.getElementById('agentFace');
  var bubble=document.getElementById('agentBubble');
  if(!face)return;
  var messages=[
    '> El enjambre está activo. Explora más de 300 herramientas IA.',
    '> Activa las 5 gemas para sincronizar el portal.',
    '> La frecuencia 432Hz resuena en la estructura viva.',
    '> "La voz es la llave. La traición es el input."',
    '> CORE_AI: el núcleo vigila desde las sombras.'
  ];
  var shown=false;
  function speak(txt){
    if(!bubble)return;
    bubble.textContent=txt;
    bubble.classList.add('visible');
    clearTimeout(bubble._t);
    bubble._t=setTimeout(function(){bubble.classList.remove('visible')},3800);
  }
  face.addEventListener('click',function(){
    speak(messages[Math.floor(Math.random()*messages.length)]);
    shown=true;
  });
  face.addEventListener('mouseenter',function(){
    if(!shown)speak('> Soy CORE_AI. Pulsa para hablar.');
  });
  face.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();face.click()}
  });
  setInterval(function(){
    if(!document.hidden&&Math.random()<0.35)speak(messages[Math.floor(Math.random()*messages.length)]);
  },22000);
})();

// ────────────────────────────────────────────────────────────────
// 5. MAN-IN-THE-MIDDLE (MITM) ATTACK PERFORMANCE — ENTITY_T
// ────────────────────────────────────────────────────────────────
function triggerCollapse(){
  if(window.__mitmRunning) return;
  window.__mitmRunning = true;
  
  // Strobe Shake & Screen Glitch
  document.body.style.animation='collapseShake 0.08s infinite ease-in-out';

  // Screen overlay with red glitch strobe & MITM breach banner
  var ov=document.createElement('div');
  ov.id = 'mitm-overlay';
  ov.style.cssText='position:fixed;inset:0;z-index:99999;pointer-events:all;background:rgba(18,0,4,0.94);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--fm);color:#ff003c;text-align:center;padding:20px;backdrop-filter:blur(15px);overflow:hidden;box-shadow:inset 0 0 100px #ff003c;';
  
  ov.innerHTML = [
    '<div style="font-size:clamp(18px,4vw,36px);letter-spacing:6px;font-family:var(--fd);margin-bottom:15px;color:#fff;text-shadow:0 0 20px #ff003c;animation:neonFlicker 0.2s infinite">⚠ ALERTA MÁXIMA: BRECHA DE SEGURIDAD ⚠</div>',
    '<div style="font-size:clamp(14px,2.5vw,22px);letter-spacing:4px;color:#ff1744;margin-bottom:20px;font-family:var(--fd)">[ MAN-IN-THE-MIDDLE (MITM) ATTACK IN PROGRESS ]</div>',
    '<div style="font-size:12px;color:#00ff41;margin-bottom:25px;max-width:650px;line-height:1.8;background:rgba(0,0,0,0.8);padding:15px;border:1px solid #ff003c;box-shadow:0 0 25px rgba(255,0,60,0.4)">',
      '> ENTIDAD PROHIBIDA DETECTADA EN EL CANAL QUANTUM: <strong>[ENTITY_T]</strong><br>',
      '> INTERCEPTANDO PAQUETES NEURALES...<br>',
      '> MEMORIA Y ESTRUCTURA DEL SITIO EN DESINTEGRACIÓN...<br>',
      '> ACTIVANDO AISLAMIENTO DE EMERGENCIA Y PURGA MÁXIMA...',
    '</div>',
    '<div style="font-family:var(--fd);font-size:28px;color:#ffd700;margin-bottom:15px" id="mitmCountdown">REINICIANDO NÚCLEO EN 3...</div>',
    '<div style="width:300px;height:4px;background:rgba(255,0,60,0.2);border-radius:2px;overflow:hidden"><div id="mitmBar" style="width:100%;height:100%;background:#ff003c;transition:width 3s linear"></div></div>'
  ].join('');

  document.body.appendChild(ov);

  // Audio Siren Alarm (Tone.js)
  try{
    if(window.Tone){
      Tone.start();
      var synth = new Tone.Synth({oscillator:{type:'sawtooth'}}).toDestination();
      synth.volume.value = -12;
      var now = Tone.now();
      synth.triggerAttackRelease('A4', '0.15', now);
      synth.triggerAttackRelease('E5', '0.15', now + 0.2);
      synth.triggerAttackRelease('A4', '0.15', now + 0.4);
      synth.triggerAttackRelease('F5', '0.2', now + 0.6);
      
      var noise = new Tone.Noise('pink').toDestination();
      noise.volume.value = -18;
      noise.start();
      setTimeout(function(){ noise.stop(); noise.dispose(); }, 3000);
    }
  }catch(e){}

  // Chat notification
  var msgs=document.getElementById('chMsgs');
  if(msgs){
    var d=document.createElement('div');
    d.className='msg sys';
    d.style.color='#ff003c';
    d.innerHTML='&#9888; MITM BREACH DETECTED // ENTITY_T INTERCEPTED // RECOVERING INTEGRITY...';
    msgs.appendChild(d);
    msgs.scrollTop=msgs.scrollHeight;
  }

  // Countdown & Restoration
  var bar = document.getElementById('mitmBar');
  if(bar) setTimeout(function(){ bar.style.width = '0%'; }, 50);

  var count = 3;
  var cdIv = setInterval(function(){
    count--;
    var cdEl = document.getElementById('mitmCountdown');
    if(cdEl && count > 0) cdEl.textContent = 'REINICIANDO NÚCLEO EN ' + count + '...';
    if(count <= 0){
      clearInterval(cdIv);
      if(ov.parentNode) ov.parentNode.removeChild(ov);
      document.body.style.animation = '';
      window.__mitmRunning = false;

      if(msgs){
        var d2=document.createElement('div');
        d2.className='msg sys';
        d2.style.color='#00ff41';
        d2.innerHTML='&#10004; MITM ATTACK NEUTRALIZED. NÚCLEO RESTAURADO AL 100% OPERACIONAL.';
        msgs.appendChild(d2);
        msgs.scrollTop=msgs.scrollHeight;
      }
    }
  }, 1000);
}
window.triggerCollapse=triggerCollapse;

// Global input listener watching for "thiago" typed anywhere
(function(){
  var buffer = '';
  document.addEventListener('keydown', function(e){
    if(e.key && e.key.length === 1){
      buffer += e.key.toLowerCase();
      if(buffer.length > 20) buffer = buffer.slice(-20);
      if(buffer.indexOf('thiago') !== -1){
        buffer = '';
        triggerCollapse();
      }
    }
  });

  // Attach input listener to all inputs
  document.addEventListener('input', function(e){
    if(e.target && e.target.value){
      if(e.target.value.toLowerCase().indexOf('thiago') !== -1){
        e.target.value = e.target.value.replace(/thiago/gi, '***');
        triggerCollapse();
      }
    }
  });
})();

// ────────────────────────────────────────────────────────────────
// 6. TOOLS IA EXTRA
// ────────────────────────────────────────────────────────────────
function runArchetypeScan(){
  var out=document.getElementById('archResult');
  if(!out)return;
  var archs=[
    {n:'PEDRO // LA ROCA',c:'var(--gold)',d:'Ancla fundacional. Permanencia, lealtad y estabilidad en la tormenta. Tu fortaleza es estar.'},
    {n:'MARCOS // EL CRONISTA',c:'var(--cyan)',d:'Observador. Registras todo, olvidas nada. Tu poder es la memoria transformada en historia.'},
    {n:'SANTOS // LA ANTENA',c:'var(--purple)',d:'Canal. Percibes la senal de lo trascendente. Tu poder es la conexion con lo invisible.'},
    {n:'BELENTANI // EL ARTEFACTO',c:'var(--blood)',d:'Integracion guerrero/angel. Tu poder es transmutar el trauma en arte.'},
    {n:'THE HUMAN // LA INTERFAZ',c:'var(--human)',d:'Integridad en el mundo real. Tu poder es mantener la coherencia entre dimensiones.'}
  ];
  var r=archs[Math.floor(Math.random()*archs.length)];
  out.innerHTML='> ARQUETIPO DOMINANTE: <span style="color:'+r.c+'">'+r.n+'</span><br>'+r.d;
}

function runPsycheScan(){
  var inp=document.getElementById('psyIn');
  var out=document.getElementById('psyResult');
  if(!inp||!out)return;
  var t=(inp.value||'').toLowerCase();
  var base='> [PSYCHE_SCAN] La sombra detectada responde al arquetipo de la transformacion. ';
  if(t.indexOf('enojo')!==-1||t.indexOf('rabia')!==-1)base='> [PSYCHE_SCAN] Furia contenida. El sistema sugiere canalizarla: '+(t.indexOf('musica')!==-1?'ya lo haces. La voz es el cauce.':'la escritura o la voz como descarga controlada.');
  else if(t.indexOf('trist')!==-1||t.indexOf('depre')!==-1)base='> [PSYCHE_SCAN] Peso emocional detectado. El dolor es data, no identidad. Registra, procesa, transmuta.';
  else if(t.indexOf('amor')!==-1)base='> [PSYCHE_SCAN] Apego detectado. "El amor y la traicion son la misma frecuencia, vista desde angulos opuestos." Evalua la simetria.';
  else if(t.indexOf('miedo')!==-1||t.indexOf('temor')!==-1)base='> [PSYCHE_SCAN] Patron de miedo. El sistema recuerda: la roca no teme a la tormenta; la atraviesa.';
  out.innerHTML=base+'<br>> INTEGRIDAD: 98.7% // NO HAY JUICIO. SOLO REGISTRO.';
}

function runPromptImprover(){
  var inp=document.getElementById('promptIn');
  var out=document.getElementById('promptResult');
  if(!inp||!out)return;
  var p=(inp.value||'').trim();
  if(!p){out.textContent='> PROMPT VACIO.';return;}
  var improved='cinematic belentani judas era, '+p+', dark pop aesthetic, red neon #FF003C, black void background, glitch light leaks, 35mm film grain, dramatic chiaroscuro lighting, hyperreal 8k';
  out.innerHTML='> PROMPT OPTIMIZADO:<br><span style="color:var(--txt-dim)">'+improved+'</span><br>> LISTO PARA VISION FORGE.';
}

// ────────────────────────────────────────────────────────────────
// 7. STORY ENGINE — narrativa sigue creciendo
//    capítulos ramificados guardados en memoria local
// ────────────────────────────────────────────────────────────────
(function(){
  window.storyEngine={
    chapters:[
      {id:'01',title:'EL ENTRE',text:'En un pliegue del universo donde el tiempo no corre, caminaba un hombre que llevaba muchos nombres.'},
      {id:'02',title:'LA DEUDA',text:'Pedro beso los pies de Judas. No por sumision. Por devocion. La deuda se volvio impagable.'},
      {id:'03',title:'EL ROBO',text:'Judas extendio los dedos hacia la Llave Dorada. Tiro. Y Pedro se puso a cantarle.'},
      {id:'04',title:'LA VICTORIA AMARGA',text:'Quedatela. La llave es metal. Lo que yo tengo, nadie me lo arrebata: mi voz.'},
      {id:'05',title:'LA MENTIRA COMPARTIDA',text:'La llave nunca fue lo valioso. Era test. Y Belentani canto para que no cometas el error de Judas.'}
    ],
    open:function(id){
      var ch=this.chapters.filter(function(c){return c.id===id})[0];
      if(!ch)return null;
      try{
        var prog=JSON.parse(localStorage.getItem('omega_story')||'{}');
        prog[id]=true;
        localStorage.setItem('omega_story',JSON.stringify(prog));
      }catch(e){}
      return ch;
    },
    progress:function(){
      try{return JSON.parse(localStorage.getItem('omega_story')||'{}')}catch(e){return{}}
    }
  };
})();
