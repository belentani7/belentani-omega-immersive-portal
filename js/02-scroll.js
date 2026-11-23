
// SCROLL TRIGGERS
gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
var SECS=['home','artist','music','judas','zion','concept','portal','gallery','ailab','studio','challenges','contact'];
SECS.forEach(function(s){
  ScrollTrigger.create({trigger:'#'+s,start:'top center',onToggle:function(self){
    if(self.isActive){document.querySelectorAll('.ndot').forEach(function(d){d.classList.remove('on')});
    var dot=document.querySelector('.ndot[data-t="'+s+'"]');if(dot)dot.classList.add('on');
    document.getElementById('secName').textContent=s.toUpperCase()}
  }});
});
gsap.utils.toArray('.rv').forEach(function(el){ScrollTrigger.create({trigger:el,start:'top 88%',onEnter:function(){el.classList.add('in')}})});
document.querySelectorAll('.ndot').forEach(function(d){d.addEventListener('click',function(){var t=d.dataset.t;if(t)gsap.to(window,{scrollTo:'#'+t,duration:1.6,ease:'power3.inOut'})})});

// FIRMAS (SIGNATURES)
var FIRMAS=[
  {n:'PEDRO.SIG [LA ROCA]',c:'#ffd700'},{n:'MARCOS.SIG [EL CRONISTA]',c:'#00ffff'},
  {n:'SANTOS.SIG [LA ANTENA]',c:'#b026ff'},{n:'BELENTANI.SIG [NUCLEO]',c:'#ff003c'},
  {n:'HUMAN.SIG // VAULT ABIERTO',c:'#f5f5f5'}];
var gC=0,gO=false;
function gateTouch(){if(gO)return;if(gC<5){document.getElementById('hXP').textContent='100';gC++;if(gC===5)ascend()}}


// HERO TITLE SCRAMBLE
(function(){
  var t=document.querySelector('.hero-title');
  if(t){var CH='!<>-_\\/[]{}—=+*^?#0123456789ABCDEF';var txt='BELENTANI';
    var frame=0,frames=40;
    function scram(){var o='';var p=Math.floor(frame/2);
      for(var i=0;i<txt.length;i++){if(i<p)o+=txt[i];else o+=CH[Math.floor(Math.random()*CH.length)]}
      t.textContent=o;frame++;if(frame<frames*2)requestAnimationFrame(scram);else t.textContent=txt}
    setTimeout(scram,1800)}});

// TITLE GLITCH ON HOVER
(function(){document.querySelectorAll('.sec-title').forEach(function(el){
  if(!el._glitched){
    el._glitched=true;
    el.addEventListener('mouseenter',function(){gsap.timeline().to(el,{skewX:6,duration:.04}).to(el,{skewX:-6,duration:.04}).to(el,{skewX:0,duration:.04})})}})})();

// BUTTON MAGNETIC EFFECT
(function(){document.querySelectorAll('.tc-btn, .cta').forEach(function(el){
  el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();
    var x=e.clientX-r.left-r.width/2;var y=e.clientY-r.top-r.height/2;
    gsap.to(el,{x:x*.25,y:y*.25,duration:.4,ease:'power2.out',overwrite:'auto'})});
  el.addEventListener('mouseleave',function(){gsap.to(el,{x:0,y:0,duration:.5,ease:'power2.out'})})})})();

// SCROLL REVEAL BATCH
(function(){ScrollTrigger.batch('.rv',{onEnter:function(batch){gsap.fromTo(batch,{opacity:0,y:60,scale:.96},{opacity:1,y:0,scale:1,duration:1.2,ease:'power3.out',stagger:.12,overwrite:'auto'})},start:'top 88%'});setTimeout(function(){document.querySelectorAll('.rv:not(.in)').forEach(function(el){el.classList.add('in')})},5000)})();

// XP ANIMATION
(function(){var xpEl=document.getElementById('hXP');if(!xpEl)return;
  var obs=new MutationObserver(function(){var v=parseInt(xpEl.textContent);if(v>0)gsap.fromTo(xpEl,{scale:1.3},{scale:1,duration:.4,ease:'back.out(3)'})});
  obs.observe(xpEl,{childList:true})})();

// =============================================
// 61-75: SCROLL ANIMATIONS
// =============================================

// [64] Text clip-path wipe-in for section titles
(function(){
  gsap.utils.toArray('.sec-title').forEach(function(el){
    gsap.set(el,{clipPath:'inset(0 100% 0 0)'});
    ScrollTrigger.create({trigger:el,start:'top 85%',onEnter:function(){
      gsap.to(el,{clipPath:'inset(0 0% 0 0)',duration:1,ease:'power3.inOut',overwrite:'auto'})}});
  });
})();

// [65] Staggered card entrance (.tcard cascade with 0.12s stagger)
(function(){
  ScrollTrigger.batch('.tcard',{onEnter:function(batch){
    gsap.fromTo(batch,{opacity:0,y:50,scale:.95},
      {opacity:1,y:0,scale:1,duration:.8,ease:'power3.out',stagger:.12,overwrite:'auto'})},
    start:'top 88%'});
})();

// [66] Section opacity scrub (0.6→1 on scroll position)
(function(){
  gsap.utils.toArray('section').forEach(function(sec){
    gsap.fromTo(sec,{opacity:.6},
      {opacity:1,scrollTrigger:{trigger:sec,start:'top bottom',end:'top center',scrub:.6}});
  });
})();

// [67] Bio image parallax (background scroll speed ratio)
(function(){
  var bioImg=document.querySelector('.bio-img, .bio-img-wrap');
  if(!bioImg)return;
  gsap.to(bioImg,{y:80,scrollTrigger:{trigger:bioImg,start:'top bottom',end:'bottom top',scrub:.4}});
})();

// =============================================
// 76-85: HOVER EFFECTS
// =============================================

// [79] Glass card border glow intensity animation
(function(){
  document.querySelectorAll('.glass, .glass-card').forEach(function(el){
    el.addEventListener('mouseenter',function(){
      gsap.to(el,{borderColor:'rgba(255,0,60,.6)',boxShadow:'0 0 20px rgba(255,0,60,.25)',duration:.4,ease:'power2.out',overwrite:'auto'})});
    el.addEventListener('mouseleave',function(){
      gsap.to(el,{borderColor:'rgba(255,255,255,.08)',boxShadow:'none',duration:.6,ease:'power2.out',overwrite:'auto'})});
  });
})();

// [80] Track row hover with left shadow
(function(){
  document.querySelectorAll('.track-row, .trk').forEach(function(el){
    el.addEventListener('mouseenter',function(){
      gsap.to(el,{boxShadow:'inset 4px 0 12px rgba(255,0,60,.35), 0 2px 16px rgba(0,0,0,.3)',duration:.3,ease:'power2.out',overwrite:'auto'})});
    el.addEventListener('mouseleave',function(){
      gsap.to(el,{boxShadow:'none',duration:.4,ease:'power2.out',overwrite:'auto'})});
  });
})();

// [81] Phase tab active state blood-dim fill
(function(){
  document.querySelectorAll('.phase-tab, .ptab').forEach(function(tab){
    tab.addEventListener('click',function(){
      document.querySelectorAll('.phase-tab, .ptab').forEach(function(t){
        gsap.to(t,{backgroundColor:'transparent',duration:.3,ease:'power2.out',overwrite:'auto'})});
      gsap.to(tab,{backgroundColor:'rgba(255,0,60,.15)',duration:.3,ease:'power2.out',overwrite:'auto'})});
  });
})();

// =============================================
// 86-95: MAGNETIC EFFECTS
// =============================================

// [88] Bio image tilt (rotateX/Y based on cursor, perspective 800px)
(function(){
  var el=document.querySelector('.bio-img, .bio-img-wrap');
  if(!el)return;
  el.style.perspective='800px';
  el.addEventListener('mousemove',function(e){
    var r=el.getBoundingClientRect();
    var nx=(e.clientX-r.left)/r.width*2-1;
    var ny=(e.clientY-r.top)/r.height*2-1;
    gsap.to(el,{rotateX:-ny*8,rotateY:nx*8,duration:.4,ease:'power2.out',overwrite:'auto'})});
  el.addEventListener('mouseleave',function(){
    gsap.to(el,{rotateX:0,rotateY:0,duration:.6,ease:'power2.out',overwrite:'auto'})});
})();

// [89] Hero title subtle float
(function(){
  var t=document.querySelector('.hero-title');
  if(!t)return;
  gsap.to(t,{y:-6,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
})();

// [90] Artifact orbs float animation
(function(){
  gsap.utils.toArray('.orb, .artifact-orb').forEach(function(o,i){
    gsap.to(o,{y:-10+Math.random()*20,x:-5+Math.random()*10,rotation:Math.random()*15,
      duration:2.5+i*.4,repeat:-1,yoyo:true,ease:'sine.inOut',delay:i*.3})});
})();

// [91] Live dot pulse 2.2s
(function(){
  var dot=document.querySelector('.live-dot, .live-dot-pulse');
  if(!dot)return;
  gsap.to(dot,{scale:1.6,opacity:.4,duration:1.1,repeat:-1,yoyo:true,ease:'sine.inOut'});
})();

// =============================================
// 96-100: TRANSITIONS
// =============================================

// [98] Page crossfade between sections
(function(){
  var prev=null;
  SECS.forEach(function(s){
    ScrollTrigger.create({trigger:'#'+s,start:'top 80%',onEnter:function(){
      if(prev&&prev!==s){var old=document.getElementById(prev);var cur=document.getElementById(s);
        if(old&&cur){gsap.fromTo(old,{opacity:1},{opacity:.3,duration:.6,ease:'power2.in'});
        gsap.fromTo(cur,{opacity:.3},{opacity:1,duration:.8,ease:'power2.out'})}
      }prev=s;}});
  });
})();
