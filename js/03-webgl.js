
// THREE.JS WEBGL — Belentani Omega
// Icosahedron core + particles + ring + bloom + chromatic aberration + scroll Z + beat pulse
(function(){
  var canvas=document.getElementById('webgl');
  if(window.OMEGA_REDUCED_MOTION||!canvas||!window.THREE||!THREE.EffectComposer||!THREE.RenderPass||!THREE.UnrealBloomPass){if(canvas)canvas.style.display='none';return}
  var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});
  renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));camera.position.z=40;
  renderer.toneMapping=THREE.ReinhardToneMapping;renderer.toneMappingExposure=1.2;

  // ── POST-PROCESSING: EffectComposer + UnrealBloom + Chromatic Aberration ──
  var composer=new THREE.EffectComposer(renderer);
  var renderPass=new THREE.RenderPass(scene,camera);
  composer.addPass(renderPass);

  var bloomPass=new THREE.UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),1.1,.45,.82);
  composer.addPass(bloomPass);

  var chromaShader={
    uniforms:{
      tDiffuse:{value:null},
      uIntensity:{value:0.003},
      uAngle:{value:0.0}
    },
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform sampler2D tDiffuse;uniform float uIntensity;uniform float uAngle;varying vec2 vUv;void main(){vec2 dir=vec2(cos(uAngle),sin(uAngle))*uIntensity;float r=texture2D(tDiffuse,vUv+dir).r;float g=texture2D(tDiffuse,vUv).g;float b=texture2D(tDiffuse,vUv-dir).b;float a=texture2D(tDiffuse,vUv).a;gl_FragColor=vec4(r,g,b,a);}'
  };
  var chromaPass=new THREE.ShaderPass(chromaShader);
  composer.addPass(chromaPass);

  // ── NOISE + CORE SHADER ──
  var NOISE='vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}';
  var cU={uTime:{value:0},uAscend:{value:0},uAudio:{value:0}};
  var cMat=new THREE.ShaderMaterial({uniforms:cU,
    vertexShader:NOISE+'uniform float uTime;uniform float uAudio;varying float vN;varying vec3 vPos;void main(){float n=snoise(position*.28+uTime*.22+uAudio*.3);vec3 p=position+normal*n*(2.4+uAudio*.9);vN=n;vPos=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}',
    fragmentShader:'uniform float uTime;uniform float uAscend;uniform float uAudio;varying float vN;varying vec3 vPos;void main(){vec3 blood=vec3(1.,0.,.235);vec3 lava=vec3(1.,.35,.05);vec3 gold=vec3(1.,.84,0.);vec3 col=mix(blood,lava,smoothstep(-.6,.8,vN));col=mix(col,gold,uAscend);float glow=.55+.45*sin(uTime*1.5+vPos.y*.4)+uAudio*.3;gl_FragColor=vec4(col*(.9+glow*.8),.95);}',transparent:true});
  var core=new THREE.Mesh(new THREE.IcosahedronGeometry(9,5),cMat);scene.add(core);
  var wire=new THREE.Mesh(new THREE.IcosahedronGeometry(11.5,1),new THREE.MeshBasicMaterial({color:0xff003c,wireframe:true,transparent:true,opacity:.07}));scene.add(wire);

  // ── RING PARTICLES ──
  var RC=2400,rP=new Float32Array(RC*3),rR=new Float32Array(RC);
  for(var i=0;i<RC;i++){var a=Math.random()*Math.PI*2,r=13+Math.random()*9;rP[i*3]=Math.cos(a)*r;rP[i*3+1]=(Math.random()-.5)*1.8;rP[i*3+2]=Math.sin(a)*r;rR[i]=Math.random()}
  var rGeo=new THREE.BufferGeometry();rGeo.setAttribute('position',new THREE.BufferAttribute(rP,3));rGeo.setAttribute('aRandom',new THREE.BufferAttribute(rR,1));

  // ── POINT CLOUD ──
  var PC=1800,pP=new Float32Array(PC*3),pR=new Float32Array(PC);
  for(var i=0;i<PC;i++){var r=18+Math.random()*28,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);pP[i*3]=r*Math.sin(ph)*Math.cos(th);pP[i*3+1]=r*Math.sin(ph)*Math.sin(th);pP[i*3+2]=r*Math.cos(ph);pR[i]=Math.random()}
  var pGeo=new THREE.BufferGeometry();pGeo.setAttribute('position',new THREE.BufferAttribute(pP,3));pGeo.setAttribute('aRandom',new THREE.BufferAttribute(pR,1));
  var pU={uTime:{value:0},uMouse:{value:new THREE.Vector2},uColor:{value:new THREE.Color(0xff003c)},uScrollColor:{value:0},uHover:{value:0},uAudio:{value:0}};
  var pMat=new THREE.ShaderMaterial({uniforms:pU,
    vertexShader:'uniform float uTime;uniform vec2 uMouse;uniform float uAudio;uniform float uHover;attribute float aRandom;varying float vA;void main(){vec3 p=position;float b=sin(uTime*.5+aRandom*6.28)*.5+.5;p*=1.+b*.1+uAudio*.05;vec4 mv=modelViewMatrix*vec4(p,1.);vec2 sp=mv.xy/mv.z;float d=distance(sp,uMouse*2.);p+=normalize(p)*(1./(d+.1))*.5;mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(4.+aRandom*4.+uAudio*2.+uHover*3.)*(10./-mv.z);vA=.3+b*.7+uAudio*.2+uHover*.15;}',
    fragmentShader:'uniform vec3 uColor;uniform float uScrollColor;varying float vA;vec3 scrollPalette(float t){vec3 blood=vec3(1.,0.,.235);vec3 gold=vec3(1.,.84,0.);vec3 cyan=vec3(0.,1.,1.);vec3 purple=vec3(.7,0.,1.);if(t<.33)return mix(blood,gold,t/.33);if(t<.66)return mix(gold,cyan,(t-.33)/.33);return mix(cyan,purple,(t-.66)/.34);}void main(){float dd=distance(gl_PointCoord,vec2(.5));if(dd>.5)discard;float s=pow(1.-dd*2.,2.);vec3 col=uColor*uScrollColor+scrollPalette(uScrollColor)*(1.-uScrollColor);gl_FragColor=vec4(col,s*vA);}',
    transparent:true,blending:THREE.AdditiveBlending,depthWrite:false});
  var pts=new THREE.Points(pGeo,pMat);scene.add(pts);
  var ring=new THREE.Points(rGeo,pMat.clone());ring.material.uniforms.uColor.value=new THREE.Color(0xffd700);ring.material.uniforms.uScrollColor.value=0;ring.rotation.x=.5;scene.add(ring);

  // ── MOUSE TRACKING ──
  var tmx=0,tmy=0;
  addEventListener('mousemove',function(e){tmx=(e.clientX/innerWidth)*2-1;tmy=-(e.clientY/innerHeight)*2+1});

  // ── AUDIO AMP + BEAT COLOR PULSE ──
  var aAmp=0;
  var beatPulse=0;
  window.__setAmp=function(a){
    aAmp=a;
    if(a>0.35){beatPulse=1.0;}
  };

  // ── SCROLL-LINKED CAMERA Z + COLOR TRANSITIONS ──
  var scrollNorm=0;
  var baseZ=40;
  var zRange=18;
  // Section color waypoints: scrollNorm → particle color blend factor
  // 0=blood, 0.33=gold, 0.66=cyan, 1.0=purple
  var colorWaypoints=[{at:0,blend:0},{at:.25,blend:.33},{at:.5,blend:.66},{at:.75,blend:1},{at:1,blend:1}];
  var scrollColorBlend=0;
  // Section hover detection for particle density boost
  var hoveredSection=false;
  var hoverIntensity=0;

  function updateScrollColor(){
    for(var i=0;i<colorWaypoints.length-1;i++){
      if(scrollNorm>=colorWaypoints[i].at&&scrollNorm<=colorWaypoints[i+1].at){
        var t=(scrollNorm-colorWaypoints[i].at)/(colorWaypoints[i+1].at-colorWaypoints[i].at);
        scrollColorBlend=colorWaypoints[i].blend+(colorWaypoints[i+1].blend-colorWaypoints[i].blend)*t;
        break;
      }
    }
  }

  addEventListener('scroll',function(){
    var maxScroll=document.documentElement.scrollHeight-innerHeight;
    scrollNorm=maxScroll>0?(window.scrollY/maxScroll):0;
    updateScrollColor();
  });

  // ── SECTION HOVER DETECTION (particle density boost) ──
  SECS.forEach(function(s){
    var el=document.getElementById(s);
    if(!el)return;
    el.addEventListener('mouseenter',function(){hoveredSection=true});
    el.addEventListener('mouseleave',function(){hoveredSection=false});
  });

  // ── CHROMATIC ABERRATION BEAT MODULATION ──
  var chromaAngle=0;

  // ── ANIMATION LOOP ──
  var clock=new THREE.Clock();
  function anim(){
    var t=clock.getElapsedTime();
    var dt=Math.min(clock.getDelta(),.05);

    // Beat decay
    beatPulse*=0.92;
    if(beatPulse<0.01)beatPulse=0;

    // Chromatic aberration: idle drift + beat spike
    chromaAngle+=0.1;
    var chromaBase=0.003;
    var chromaBeat=beatPulse*0.012;
    chromaPass.uniforms.uIntensity.value=chromaBase+chromaBeat;
    chromaPass.uniforms.uAngle.value=chromaAngle;

    // Bloom intensity reacts to beat
    bloomPass.strength=1.1+beatPulse*0.6;

    // Uniforms
    cU.uTime.value=t;cU.uAudio.value=aAmp;
    pU.uTime.value=t;pU.uAudio.value=aAmp;

    // Scroll-linked particle color transition: blood→gold→cyan→purple
    pU.uScrollColor.value=scrollColorBlend;
    pMat.uniforms.uScrollColor.value=scrollColorBlend;

    // Hover density boost: ramp up over 0.5s
    var hoverTarget=hoveredSection?1:0;
    hoverIntensity+=(hoverTarget-hoverIntensity)*0.04;
    pU.uHover.value=hoverIntensity;
    pMat.uniforms.uHover.value=hoverIntensity;
    ring.material.uniforms.uTime.value=t;

    // Mouse smoothing
    pU.uMouse.value.x+=(tmx-pU.uMouse.value.x)*.05;pU.uMouse.value.y+=(tmy-pU.uMouse.value.y)*.05;

    // Rotations
    core.rotation.y=t*.1;wire.rotation.y=-t*.06;pts.rotation.y=t*.02;ring.rotation.z=t*.05;

    // Camera X/Y from mouse
    camera.position.x+=((tmx*3)-camera.position.x)*.02;
    camera.position.y+=((tmy*2)-camera.position.y)*.02;

    // Camera Z from scroll: 40 (top) → 22 (bottom)
    var targetZ=baseZ-scrollNorm*zRange;
    camera.position.z+=(targetZ-camera.position.z)*0.03;

    camera.lookAt(0,0,0);

    // Render via composer (bloom + chromatic aberration)
    composer.render();
    requestAnimationFrame(anim);
  }
  anim();

  // ── RESIZE ──
  addEventListener('resize',function(){
    camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
    composer.setSize(innerWidth,innerHeight);
    bloomPass.resolution.set(innerWidth,innerHeight);
  });

  window.__pU=pU;
})();

// SCROLL-BASED SECTION COLOR ACCENTS
(function(){
  var accents={home:'rgba(255,0,60,.03)',artist:'rgba(255,215,0,.02)',music:'rgba(0,255,255,.02)',judas:'rgba(255,0,60,.04)',zion:'rgba(176,38,255,.02)',concept:'rgba(0,255,65,.02)',portal:'rgba(255,215,0,.03)',gallery:'rgba(0,255,255,.02)',ailab:'rgba(255,0,60,.02)',studio:'rgba(0,255,255,.02)',challenges:'rgba(255,215,0,.02)',contact:'rgba(255,0,60,.03)'};
  var overlay=document.createElement('div');
  overlay.className='section-glow';overlay.id='secGlow';
  overlay.style.cssText='position:fixed;inset:0;z-index:1;pointer-events:none;opacity:0;transition:opacity 1.5s';
  document.body.appendChild(overlay);
  SECS.forEach(function(s){
    ScrollTrigger.create({trigger:'#'+s,start:'top center',end:'bottom center',onEnter:function(){overlay.style.background='radial-gradient(ellipse at 50% 50%,'+(accents[s]||'transparent')+',transparent 70%)';overlay.style.opacity='1'},onLeave:function(){overlay.style.opacity='0'}});
  });
})();

// PARALLAX TILT ON IMAGES
(function(){
  document.querySelectorAll('.bio-img img').forEach(function(img){
    img.parentElement.addEventListener('mousemove',function(e){
      var r=img.parentElement.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5;
      var y=(e.clientY-r.top)/r.height-.5;
      gsap.to(img,{rotateY:x*8,rotateX:-y*8,duration:.6,ease:'power2.out',transformPerspective:800});
    });
    img.parentElement.addEventListener('mouseleave',function(){
      gsap.to(img,{rotateY:0,rotateX:0,duration:.8,ease:'power2.out'});
    });
  });
})();

// ENHANCED GALLERY WITH LAZY LOADING + HOVER ZOOM
(function(){
  document.querySelectorAll('.gal').forEach(function(card){
    card.addEventListener('mouseenter',function(){gsap.to(card.querySelector('img'),{scale:1.08,duration:.8,ease:'power2.out'})});
    card.addEventListener('mouseleave',function(){gsap.to(card.querySelector('img'),{scale:1,duration:.6,ease:'power2.out'})});
  });
})();

// KEYBOARD SHORTCUTS
(function(){
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){closeMod();document.getElementById('term').classList.remove('on')}
    if(e.key==='/'&&!e.ctrlKey){e.preventDefault();document.getElementById('chIn').focus();document.getElementById('aiChat').classList.remove('min')}
  });
})();

// SMOOTH SECTION TRANSITIONS
(function(){
  SECS.forEach(function(s){
    var el=document.getElementById(s);if(!el)return;
    gsap.fromTo(el,{opacity:.6},{opacity:1,scrollTrigger:{trigger:el,start:'top 80%',end:'top 20%',scrub:true}});
  });
})();

// ENHANCED BEAT VISUALIZER (reacts to Three.js particles)
(function(){
  var origSetAmp=window.__setAmp;
  window.__setAmp=function(a){
    if(origSetAmp)origSetAmp(a);
    var glow=document.querySelector('.vignette');
    if(glow)glow.style.background='radial-gradient(ellipse at 50% 50%,transparent 20%,rgba(0,0,0,'+(0.88-a*.15)+') 100%)';
    // Pulse artifact orbs with beat
    document.querySelectorAll('.art-orb').forEach(function(o,i){
      if(a>.3){o.style.transform='scale('+(1+a*.5)+')';o.style.opacity=Math.min(1,.3+a)}
      else{o.style.transform='';o.style.opacity=''}
    });
  };
})();

console.log('%c◉ BELENTANI OMEGA v14 ULTRA // JUDAS CORE + BLOOM + CHROMA ONLINE', 'color:#ff003c;font-size:14px;font-family:monospace;text-shadow:0 0 10px rgba(255,0,60,.8)');
