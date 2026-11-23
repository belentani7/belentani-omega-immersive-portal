
// LENIS SMOOTH SCROLL
(function(){if(window.OMEGA_REDUCED_MOTION||typeof Lenis==='undefined')return;
  var lenis=new Lenis({duration:1.4,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},orientation:'vertical',smoothWheel:true,wheelMultiplier:1,gestureOrientation:'vertical'});
  function raf(time){lenis.raf(time);ScrollTrigger.update();requestAnimationFrame(raf)}
  requestAnimationFrame(raf);
  ScrollTrigger.create({scroller:document.body,onRefresh:function(){lenis.resize()}})})();

// SCROLL REVEAL BATCH
(function(){ScrollTrigger.batch('.rv',{onEnter:function(batch){gsap.fromTo(batch,{opacity:0,y:60,scale:.96},{opacity:1,y:0,scale:1,duration:1.2,ease:'power3.out',stagger:.12,overwrite:'auto'})},start:'top 88%'});setTimeout(function(){document.querySelectorAll('.rv:not(.in)').forEach(function(el){el.classList.add('in')})},5000)})();


// FLOATING AGENT — random drift + scroll reaction
(function(){
  var face=document.getElementById('agentFace');
  if(!face)return;
  var x=0,y=0,targetX=0,targetY=0;
  var driftTimer=null;
  function startDrift(){
    targetX=(Math.random()-0.5)*60;
    targetY=(Math.random()-0.5)*60;
  }
  function animateAgent(){
    x+=(targetX-x)*0.03;
    y+=(targetY-y)*0.03;
    var scrollBoost=window.scrollY*0.05;
    face.style.transform='translate('+(x)+'px,'+(y-scrollBoost)+'px)';
    requestAnimationFrame(animateAgent);
  }
  startDrift();
  setInterval(startDrift,4000);
  animateAgent();

  // React to scroll: shift agent horizontally on scroll
  var lastScroll=0;
  window.addEventListener('scroll',function(){
    var delta=window.scrollY-lastScroll;
    targetX+=delta*0.2;
    targetX=Math.max(-80,Math.min(80,targetX));
    lastScroll=window.scrollY;
  },{passive:true});
})();

// ARTIFACT ORBS — cascade activation (200ms delay between)
(function(){
  var orbs=document.querySelectorAll('.art-orb');
  if(!orbs.length)return;
  var idx=0;
  function cascadeActivate(){
    orbs.forEach(function(o,i){
      setTimeout(function(){
        orbs.forEach(function(o2){o2.classList.remove('active')});
        o.classList.add('active');
      },i*200);
    });
  }
  setInterval(cascadeActivate,8000);
  setTimeout(cascadeActivate,4000);
})();

// SECTION GLOW — per-section color accent on scroll
(function(){
  var sections=document.querySelectorAll('section[data-glow]');
  if(!sections.length)return;
  var colors=['#ff6b6b','#4d96ff','#6bcb77','#ffd93d','#ff6ec7','#c9b1ff','#00ffcc'];
  sections.forEach(function(sec,i){
    var glow=document.createElement('div');
    glow.className='section-glow';
    var c=colors[i%colors.length];
    glow.style.cssText='position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;opacity:0;transition:opacity 0.8s ease;border-radius:inherit;z-index:0;';
    glow.style.background='radial-gradient(ellipse at center,'+c+'15,transparent 70%)';
    sec.style.position='relative';
    sec.insertBefore(glow,sec.firstChild);
    ScrollTrigger.create({
      trigger:sec,
      start:'top 60%',
      end:'bottom 40%',
      onEnter:function(){glow.style.opacity='1'},
      onLeave:function(){glow.style.opacity='0'},
      onEnterBack:function(){glow.style.opacity='1'},
      onLeaveBack:function(){glow.style.opacity='0'}
    });
  });
})();

// KEYBOARD SHORTCUTS — / opens chat, Esc closes overlays
(function(){
  document.addEventListener('keydown',function(e){
    if(e.key==='/'&&!e.ctrlKey&&!e.metaKey){
      var tag=document.activeElement.tagName;
      if(tag==='INPUT'||tag==='TEXTAREA')return;
      e.preventDefault();
      var chat=document.getElementById('agentBubble');
      if(chat){chat.classList.add('visible');chat.textContent='◉ CORE_AI: El enjambre esta activo. Preguntame algo.'}
    }
    if(e.key==='Escape'){
      var overlays=document.querySelectorAll('.overlay.on,.modal.on,.popup.on,[class*="overlay"].on');
      overlays.forEach(function(o){o.classList.remove('on')});
      var term=document.getElementById('term');
      if(term&&term.classList.contains('on'))term.classList.remove('on');
      var chat=document.getElementById('agentBubble');
      if(chat)chat.classList.remove('visible');
    }
  });
})();

// GALLERY HOVER ZOOM — GSAP powered
(function(){
  var items=document.querySelectorAll('.gallery-item,.art-orb,.artifact-card');
  items.forEach(function(item){
    item.addEventListener('mouseenter',function(){
      gsap.to(item,{scale:1.08,duration:0.4,ease:'power2.out',zIndex:10});
    });
    item.addEventListener('mouseleave',function(){
      gsap.to(item,{scale:1,duration:0.4,ease:'power2.out',zIndex:1});
    });
  });
})();

// BEAT VISUALIZER — orbs react to audio amplitude
(function(){
  var orbs=document.querySelectorAll('.art-orb');
  if(!orbs.length)return;
  var audioCtx=null,analyser=null,source=null,dataArray=null;
  var listening=false;

  function initAudio(){
    if(audioCtx)return;
    try{
      audioCtx=new(window.AudioContext||window.webkitAudioContext)();
      analyser=audioCtx.createAnalyser();
      analyser.fftSize=64;
      dataArray=new Uint8Array(analyser.frequencyBinCount);
    }catch(e){}
  }

  function startMic(){
    if(listening)return;
    initAudio();
    if(!audioCtx)return;
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
      source=audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      listening=true;
      visualize();
    }).catch(function(){});
  }

  function visualize(){
    if(!listening)return;
    analyser.getByteFrequencyData(dataArray);
    var sum=0;
    for(var i=0;i<dataArray.length;i++)sum+=dataArray[i];
    var avg=sum/dataArray.length;
    var norm=Math.min(avg/128,1);
    orbs.forEach(function(orb,i){
      var freq=dataArray[i%dataArray.length]/255;
      var scale=1+freq*0.4;
      var brightness=0.6+freq*0.4;
      orb.style.transform='scale('+scale+')';
      orb.style.filter='brightness('+brightness+')';
      orb.style.opacity=0.5+freq*0.5;
    });
    requestAnimationFrame(visualize);
  }

  // Start on first user interaction
  document.addEventListener('click',function(){startMic()},{once:true});
  // Also try auto-start
  setTimeout(startMic,5000);
})();
