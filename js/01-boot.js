
// BOOT SEQUENCE
var bootLog=document.getElementById('bootLog');
window.OMEGA_REDUCED_MOTION=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var BL=["> INITIALIZING JUDAS_OS v12.0...","> LOADING OMEGA KERNEL...","> MAPPING NEURAL PATHWAYS...","> CALIBRATING 432Hz RESONANCE...","> OMEGA_CORE ONLINE.","> BIOMETRIC VAULT: SEALED.","> ACCESS GRANTED."];
var bli=0;
function bwrite(){if(bli<BL.length){bootLog.innerHTML+=BL[bli]+"<br>";bli++;setTimeout(bwrite,380)}else{setTimeout(function(){gsap.to('#boot',{opacity:0,duration:1.2,onComplete:function(){document.getElementById('boot').style.display='none'}})},600)}}
if(window.OMEGA_REDUCED_MOTION){document.getElementById('boot').style.display='none'}else{bwrite()}

// CURSOR
var cDot=document.querySelector('.cur-dot'),cRing=document.querySelector('.cur-ring'),cBox=document.querySelector('.cur-box');
var cmx=0,cmy=0,cox=0,coy=0;
if(!window.OMEGA_REDUCED_MOTION){document.addEventListener('mousemove',function(e){
  cmx=e.clientX;cmy=e.clientY;
  cDot.style.transform='translate('+cmx+'px,'+cmy+'px)';
  var t=e.target.closest('a,button,.tcard,.ndot,input,textarea,.stab,.mcard,.cta,.trow,.ftab,.gg');
  if(t){var r=t.getBoundingClientRect();cBox.classList.add('on');cBox.style.width=(r.width+18)+'px';cBox.style.height=(r.height+18)+'px';cBox.style.transform='translate('+(r.left-9)+'px,'+(r.top-9)+'px)';cRing.classList.add('hover')}
  else{cBox.classList.remove('on');cRing.classList.remove('hover')}
});
function cTick(){cox+=(cmx-cox)*.12;coy+=(cmy-coy)*.12;cRing.style.transform='translate('+cox+'px,'+coy+'px) translate(-50%,-50%)';requestAnimationFrame(cTick)}
cTick()}

// TCARD GLOW
if(!window.OMEGA_REDUCED_MOTION){document.addEventListener('mousemove',function(e){
  var c=e.target.closest('.tcard');
  if(c){var r=c.getBoundingClientRect();c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}
})}

// HUD TIME
setInterval(function(){document.getElementById('hTime').innerText=new Date().toTimeString().split(' ')[0]},1000);
