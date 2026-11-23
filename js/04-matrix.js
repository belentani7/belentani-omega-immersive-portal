
// MATRIX RAIN — scroll-speed + terminal opacity toggle
(function(){
  var mc=document.getElementById('matrix'),ctx=mc.getContext('2d');
  if(window.OMEGA_REDUCED_MOTION){mc.style.display='none';return}
  function rs(){mc.width=innerWidth;mc.height=innerHeight}rs();addEventListener('resize',rs);
  var CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD';
  var fs=14;var drops=[];for(var i=0;i<Math.ceil(innerWidth/fs);i++)drops.push(1);

  // ── SCROLL-BASED SPEED VARIATION ──
  var scrollSpeed=1;
  var lastScrollY=0;
  var lastScrollTime=Date.now();
  addEventListener('scroll',function(){
    var now=Date.now();
    var dt=Math.max(1,now-lastScrollTime);
    var dy=Math.abs(window.scrollY-lastScrollY);
    var velocity=dy/dt*16;
    scrollSpeed=1+Math.min(velocity*0.6,3.5);
    lastScrollY=window.scrollY;
    lastScrollTime=now;
  });
  // decay speed back to 1 when not scrolling
  setInterval(function(){scrollSpeed+=(1-scrollSpeed)*0.08},80);

  // ── OPACITY TOGGLE (terminal command: matrix.on / matrix.off) ──
  var matrixVisible=true;
  window.__toggleMatrix=function(){
    matrixVisible=!matrixVisible;
    mc.style.transition='opacity 0.8s';
    mc.style.opacity=matrixVisible?1:0;
    return matrixVisible;
  };
  window.__setMatrixVisible=function(v){
    matrixVisible=!!v;
    mc.style.transition='opacity 0.8s';
    mc.style.opacity=matrixVisible?1:0;
  };

  setInterval(function(){
    ctx.fillStyle='rgba(3,3,3,.05)';ctx.fillRect(0,0,mc.width,mc.height);
    ctx.font=fs+'px JetBrains Mono';
    for(var i=0;i<drops.length;i++){var c=CH[Math.floor(Math.random()*CH.length)];
      ctx.fillStyle=Math.random()>.96?'#00ff41':Math.random()>.92?'#ff003c':'rgba(255,0,60,.3)';
      ctx.fillText(c,i*fs,drops[i]*fs);
      if(drops[i]*fs>mc.height&&Math.random()>.975)drops[i]=0;
      drops[i]+=scrollSpeed;
    }
  },50);
})();
