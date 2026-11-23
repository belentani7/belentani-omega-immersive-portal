
// ═══════════════════════════════════════════════════════════════
// INTERSECTION OBSERVER — global fade-in for .rv elements
// ═══════════════════════════════════════════════════════════════
var _rvObs;
function observeRV(){
  if(!_rvObs){
    _rvObs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('on');_rvObs.unobserve(e.target)}
      });
    },{threshold:0.1});
  }
  document.querySelectorAll('.rv:not(.on)').forEach(function(el){_rvObs.observe(el)});
}

// ═══════════════════════════════════════════════════════════════
// GALLERY — 16 images, PHOTOS/ART/AI filters, lightbox, fade-in
// ═══════════════════════════════════════════════════════════════
(function(){
  var g=document.getElementById('galGrid');
  if(!g)return;
  var R=[
    'Archive // Venom','Archive // Gaze','Zion Dimension','System Halt',
    'The Guardian','The Trinity Protocol','Cyber Gaze','Serpent Pact',
    'Zion Interceptor','Sincro 1.0','Prototype Figurine','Virtual Dimension 042'
  ];
  var PHOTOS=[
    'https://files.catbox.moe/rt1p03.jpg',
    'https://files.catbox.moe/943t1r.png',
    'https://files.catbox.moe/kmtlco.jpg',
    'https://files.catbox.moe/h0wamv.jpg',
    'https://files.catbox.moe/d2c8e5.jpg',
    'https://files.catbox.moe/y8kuk4.jpg',
    'https://files.catbox.moe/8s1v5g.jpg',
    'https://files.catbox.moe/tf46wf.jpg',
    'https://files.catbox.moe/xryj7d.jpg',
    'https://files.catbox.moe/iobmrn.png',
    'https://files.catbox.moe/rt1p03.jpg',
    'https://files.catbox.moe/943t1r.png'
  ];
  var GCATS={
    'Archive // Venom':'Archive','Archive // Gaze':'Archive',
    'Zion Dimension':'Zion','Zion Interceptor':'Zion',
    'Cyber Gaze':'AI','Serpent Pact':'AI','Sincro 1.0':'AI',
    'Virtual Dimension 042':'AI','Biometric Integration':'AI',
    'Useless Drone Analysis':'AI','Judas Studio Override':'AI'
  };
  var galTabs=document.getElementById('galTabs');
  var gFilter='ALL';
  function fb(i,w,h){
    return 'https://image.pollinations.ai/prompt/'+encodeURIComponent('belentani judas era '+R[i]+', red leather messianic singer, dark cinematic, red neon')+'?width='+w+'&height='+h+'&nologo=true&seed='+(1940+i);
  }
  function renderGal(){
    g.innerHTML='';
    R.forEach(function(r,i){
      if(gFilter!=='ALL'&&GCATS[r]!==gFilter)return;
      var n=String(i+1).padStart(2,'0');
      g.innerHTML+='<div class="tcard gal rv" data-idx="'+i+'" style="padding:0;overflow:hidden;cursor:pointer"><img src="'+PHOTOS[i]+'" loading="lazy" style="width:100%;height:300px;object-fit:cover" onerror="this.onerror=null;this.src=\''+fb(i,600,400)+'\'"><div class="glab"><span>RECORD_'+(i+1)+'</span> '+r+'</div></div>';
    });
    observeRV();
  }
  renderGal();
  if(galTabs){
    galTabs.addEventListener('click',function(e){
      var b=e.target.closest('.gtab');if(!b)return;
      galTabs.querySelectorAll('.gtab').forEach(function(x){x.classList.remove('on')});
      b.classList.add('on');gFilter=b.dataset.c;renderGal();
    });
  }
  var lbIdx=0;
  function openLB(i){
    lbIdx=i;
    var lb=document.getElementById('galLB');if(!lb)return;
    var img=lb.querySelector('.lb-img'),cap=lb.querySelector('.lb-cap');
    img.src=PHOTOS[i];
    img.onerror=function(){this.onerror=null;this.src=fb(i,1200,800)};
    cap.textContent='RECORD_'+(i+1)+' // '+R[i];
    lb.classList.add('on');
  }
  g.addEventListener('click',function(e){var c=e.target.closest('.gal');if(c)openLB(+c.dataset.idx)});
  var lb=document.getElementById('galLB');
  if(lb){
    lb.querySelector('.lb-prev').addEventListener('click',function(e){e.stopPropagation();openLB((lbIdx-1+R.length)%R.length)});
    lb.querySelector('.lb-next').addEventListener('click',function(e){e.stopPropagation();openLB((lbIdx+1)%R.length)});
    lb.querySelector('.lb-close').addEventListener('click',function(){lb.classList.remove('on')});
    lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('on')});
    document.addEventListener('keydown',function(e){
      if(!lb.classList.contains('on'))return;
      if(e.key==='ArrowLeft')openLB((lbIdx-1+R.length)%R.length);
      if(e.key==='ArrowRight')openLB((lbIdx+1)%R.length);
      if(e.key==='Escape')lb.classList.remove('on');
    });
  }
})();

// ═══════════════════════════════════════════════════════════════
// FASES — typewriter 12ms/char
// ═══════════════════════════════════════════════════════════════
var FD=[
  ['FASE_01','El Hombre Integrado','No existe un "cuando". No existe un "donde". Existe un entre — un pliegue del universo donde el tiempo no corre, se respira.\n\nEn ese entre, caminaba un hombre que llevaba muchos nombres. Le llamaban Pedro. Le llamaban Marcos. Le llamaban Santos. Le llamaban Belentani.\n\nNo era un santo. Era un sistema operativo humano corriendo cuatro procesos en paralelo: El Angel, El Guerrero, El Analitico, El Cronista. Cuatro voces. Un solo hombre.'],
  ['FASE_02','La Deuda Impagable','Se conocieron en un camino que no estaba en ningun mapa. Judas caminaba con prisa, como quien huye de algo que no sabe que lleva dentro.\n\nPedro le beso los pies. No por sumision. Por devocion.\n\n"Porque estas aqui. Porque me acompanas. Porque tu presencia, aunque a veces duela, es un regalo que no merezco pero que agradezco."\n\nLa deuda se volvio impagable.'],
  ['FASE_03','El Robo y El Canto','Judas espero la noche. Con las manos temblando, no de maldad sino de verguenza, extendio los dedos hacia la Llave Dorada. La agarro. Tiro.\n\nCuatro voces salieron del pecho de Pedro al mismo tiempo: El Angel canto. El Guerrero se irguio. El Analitico observo. El Cronista registro.\n\nPedro se sento. Despacio. Lo miro. Y entonces hizo lo que Judas jamas pudo anticipar: se puso a cantarle.'],
  ['FASE_04','La Victoria Amarga','"Quedatela", le dijo Pedro. "La llave es metal. Es simbolo. Lo que yo tengo, lo que nadie me puede arrebatar, es mi voz."\n\nJudas volvio a su tierra con la llave dorada. Lo reconocieron. Vivio una epoca de victoria. Pero era amarga. Porque nunca logro olvidar a Pedro arrodillado, cantandole, despues de haberle robado.'],
  ['FASE_05','La Mentira Compartida','La llave nunca fue lo valioso. Era una mentira compartida. Pedro dejo que Judas le robara algo que no importaba, para que Judas descubriera lo que si importaba.\n\nSin condiciones. Sin juicio.\n\n---\nTRANSMISSION END\n> "LA TRAICION ES EL INPUT. LA VOZ ES EL OUTPUT."\n[ SYSTEM READY ]']];
(function(){
  var tabs=document.getElementById('faseTabs'),body=document.getElementById('faseBody');
  if(!tabs||!body)return;
  var twTimer=null;
  function typeWriter(el,plain,cb){
    var i=0;el.textContent='';
    if(twTimer){clearInterval(twTimer);twTimer=null}
    twTimer=setInterval(function(){
      if(i<plain.length){el.textContent+=plain.charAt(i);i++}
      else{clearInterval(twTimer);twTimer=null;if(cb)cb()}
    },12);
  }
  function show(i){
    if(twTimer){clearInterval(twTimer);twTimer=null}
    var title='<h3>'+FD[i][1]+'</h3>';
    var plain=FD[i][2];
    body.innerHTML=title+'<p class="tw-body"></p>';
    var twEl=body.querySelector('.tw-body');
    typeWriter(twEl,plain,function(){
      twEl.innerHTML=plain.replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>');
    });
    tabs.querySelectorAll('.ftab').forEach(function(b,j){b.classList.toggle('on',j===i)});
  }
  tabs.addEventListener('click',function(e){var b=e.target.closest('.ftab');if(b)show(+b.dataset.f)});
  show(0);
})();

// FASES GRID
(function(){var g=document.getElementById('fasesGrid');if(!g)return;
  var f=[['01','EL HOMBRE INTEGRADO','Cuatro procesos en paralelo — Angel, Guerrero, Analitico, Cronista — y una Llave Dorada en el pecho.'],
    ['02','LA DEUDA IMPAGABLE','Judas roba la llave. Pedro besa sus pies por devocion: el espejo se vuelve insoportable.'],
    ['03','EL ROBO Y EL CANTO','El artefacto activa las cuatro voces. Pedro canta a Judas en lugar de maldecir.'],
    ['04','LA VICTORIA AMARGA','"Quedatela. La llave es metal. Mi voz nadie me la arrebata." Judas vence y queda destrozado.'],
    ['05','LA MENTIRA COMPARTIDA','La llave nunca importo. Era test. Belentani canta para que no cometas el error de Judas.']];
  g.innerHTML=f.map(function(x){return'<div class="tcard rv" style="border-top:2px solid var(--blood)"><div class="tc-ico">'+x[0]+'</div><div class="tc-name">'+x[1]+'</div><p class="tc-desc">'+x[2]+'</p></div>'}).join('');
  observeRV();
})();

// ═══════════════════════════════════════════════════════════════
// STUDIO — 120 modules, search, detail modal, recent mods, count badges, ESC clear
// ═══════════════════════════════════════════════════════════════
var MODS={
  'img':['Midjourney','Leonardo','DALL-E 3','Stable Diffusion','Ideogram','Flux','Krea','Magnific','Upscayl','Lexica','PromptHero','PromptPerfect','Civitai','Tensor.Art','Playground','Artbreeder','NightCafe','DeepAI','Craiyon','Pollinations'],
  'vid':['Runway Gen-3','Pika','Kling','Luma','Hailuo','Sora','SVD','AnimateDiff','LivePortrait','Stable Video','Kaiber','Decohere','Morph','LTX Video','Hunyuan','Veo','Mochi','CogVideo','Allegro','Wan'],
  'aud':['Suno v4','Udio','ElevenLabs','RVC','AIVA','Soundraw','Mubert','VoiceMod','AudioCraft','Stable Audio','Riffusion','Chirp','MusicGen','Bark','Tortoise TTS','Whisper','Demucs','Moises','LALAL','Kits.AI'],
  'code':['Cursor','v0','Bolt.new','Lovable','Replit Agent','Copilot','Windsurf','Codeium','Tabnine','Continue','Aider','OpenHands','Devin','Factory','Magic Patterns','Claude Code','Cline','Zed AI','Sweep','Mentat'],
  'agent':['AutoGPT','CrewAI','LangGraph','N8N','Make','Zapier','Langflow','Flowise','Dify','Coze','AgentGPT','BabyAGI','MetaGPT','Camel','Autogen','SuperAGI','GPT-Researcher','Devika','AgentScope','Swarm'],
  'psy':['Archetype Discover','Dream Interpreter','DARVO Detector','Manipulation Scan','1000 Questions','Tarot Oracle','Astro Nexus','I-Ching','WhatsApp Analyzer','Shadow Work','Enneagram AI','MBTI Neural','Attachment Style','Trauma Map','Inner Child','Parts Work','Somatic Tracking','Nervous Reg','Jung Mirror','Symbol Codex']};
var CATICO={img:'&#127912;',vid:'&#127916;',aud:'&#127925;',code:'&#128187;',agent:'&#129302;',psy:'&#129504;'};
var CATNAME={img:'IMAGE FORGE',vid:'VIDEO LAB',aud:'AUDIO FORGE',code:'CODE NEXUS',agent:'AI AGENTS',psy:'PSYCHE SCAN'};

// Module external links (120 tools)
var MODS_LINK={
  'Midjourney':'https://midjourney.com','Leonardo':'https://leonardo.ai',
  'DALL-E 3':'https://openai.com/dall-e-3','Stable Diffusion':'https://stability.ai',
  'Ideogram':'https://ideogram.ai','Flux':'https://blackforestlabs.ai',
  'Krea':'https://krea.ai','Magnific':'https://magnific.ai',
  'Upscayl':'https://upscayl.org','Lexica':'https://lexica.art',
  'PromptHero':'https://prompthero.com','PromptPerfect':'https://promptperfect.ai',
  'Civitai':'https://civitai.com','Tensor.Art':'https://tensor.art',
  'Playground':'https://playground.com','Artbreeder':'https://artbreeder.com',
  'NightCafe':'https://nightcafe.studio','DeepAI':'https://deepai.org',
  'Craiyon':'https://craiyon.com','Pollinations':'https://pollinations.ai',
  'Runway Gen-3':'https://runwayml.com','Pika':'https://pika.art',
  'Kling':'https://kling.kuaishou.com','Luma':'https://lumalabs.ai',
  'Hailuo':'https://hailuoai.video','Sora':'https://openai.com/sora',
  'SVD':'https://stability.ai','AnimateDiff':'https://animediff.github.io',
  'LivePortrait':'https://github.com/KwaiVGI/LivePortrait','Stable Video':'https://stability.ai',
  'Kaiber':'https://kaiber.ai','Decohere':'https://decohere.ai',
  'Morph':'https://morph.so','LTX Video':'https://ltx.video',
  'Hunyuan':'https://hunyuan.tencent.com','Veo':'https://deepmind.google/technologies/veo',
  'Mochi':'https://moich.ai','CogVideo':'https://github.com/THUDM/CogVideo',
  'Allegro':'https://allegro.com','Wan':'https://github.com/Wan-Video/Wan2.1',
  'Suno v4':'https://suno.com','Udio':'https://udio.com',
  'ElevenLabs':'https://elevenlabs.io','RVC':'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI',
  'AIVA':'https://aiva.ai','Soundraw':'https://soundraw.io',
  'Mubert':'https://mubert.com','VoiceMod':'https://voicemod.net',
  'AudioCraft':'https://github.com/facebookresearch/audiocraft','Stable Audio':'https://stableaudio.com',
  'Riffusion':'https://riffusion.com','Chirp':'https://www.riffusion.com',
  'MusicGen':'https://github.com/facebookresearch/audiocraft','Bark':'https://github.com/suno-ai/bark',
  'Tortoise TTS':'https://github.com/neonbjb/tortoise-tts','Whisper':'https://github.com/openai/whisper',
  'Demucs':'https://github.com/facebookresearch/demucs','Moises':'https://moises.ai',
  'LALAL':'https://lalal.ai','Kits.AI':'https://kits.ai',
  'Cursor':'https://cursor.com','v0':'https://v0.dev',
  'Bolt.new':'https://bolt.new','Lovable':'https://lovable.dev',
  'Replit Agent':'https://replit.com','Copilot':'https://github.com/features/copilot',
  'Windsurf':'https://codeium.com/windsurf','Codeium':'https://codeium.com',
  'Tabnine':'https://tabnine.com','Continue':'https://continue.dev',
  'Aider':'https://aider.chat','OpenHands':'https://github.com/All-Hands-AI/OpenHands',
  'Devin':'https://devin.ai','Factory':'https://factory.ai',
  'Magic Patterns':'https://magicpatterns.com','Claude Code':'https://claude.ai',
  'Cline':'https://cline.bot','Zed AI':'https://zed.dev',
  'Sweep':'https://sweep.dev','Mentat':'https://github.com/AbanteAI/mentat',
  'AutoGPT':'https://agpt.co','CrewAI':'https://crewai.com',
  'LangGraph':'https://langchain-ai.github.io/langgraph','N8N':'https://n8n.io',
  'Make':'https://make.com','Zapier':'https://zapier.com',
  'Langflow':'https://langflow.org','Flowise':'https://flowiseai.com',
  'Dify':'https://dify.ai','Coze':'https://coze.com',
  'AgentGPT':'https://agentgpt.reworkd.ai','BabyAGI':'https://github.com/yoheinakajima/babyagi',
  'MetaGPT':'https://metagpt.io','Camel':'https://github.com/camel-ai/camel',
  'Autogen':'https://github.com/microsoft/autogen','SuperAGI':'https://superagi.com',
  'GPT-Researcher':'https://github.com/assafelovic/gpt-researcher','Devika':'https://github.com/Stition-AI/devika',
  'AgentScope':'https://agentscope.io','Swarm':'https://github.com/openai/swarm',
  'Archetype Discover':'https://www.archetype.me','Dream Interpreter':'https://dreammystic.com',
  'DARVO Detector':'https://www.verywellmind.com/darvo-9711288','Manipulation Scan':'https://www.psychologytoday.com/us/basics/manipulation',
  '1000 Questions':'https://1000questions.app','Tarot Oracle':'https://labyrinthos.co',
  'Astro Nexus':'https://astro.com','I-Ching':'https://ichingonline.net',
  'WhatsApp Analyzer':'https://whatsappanalyzer.com','Shadow Work':'https://www.psychologytoday.com/us/basics/shadow',
  'Enneagram AI':'https://www.enneagraminstitute.com','MBTI Neural':'https://www.16personalities.com',
  'Attachment Style':'https://www.attachmentproject.com','Trauma Map':'https://www.traumasensitiveyoga.com',
  'Inner Child':'https://www.psychologytoday.com/us/basics/inner-child','Parts Work':'https://ifs-institute.com',
  'Somatic Tracking':'https://www.somatictracking.com','Nervous Reg':'https://www.polyvagalinstitute.org',
  'Jung Mirror':'https://www.jungiananalyses.com','Symbol Codex':'https://www.symboldictionary.com'
};

// Module descriptions (notable tools + category fallback)
var MODS_DESC={
  'Midjourney':'Generador de imagenes por IA con estilos artisticos unicos via Discord',
  'Leonardo':'Plataforma de creacion de imagenes IA para game art y diseno',
  'DALL-E 3':'Modelo de generacion de imagenes de OpenAI integrado en ChatGPT',
  'Stable Diffusion':'Modelo de diffusion abierto para generacion de imagenes',
  'Ideogram':'Generador de imagenes con manejo superior de texto en imagenes',
  'Flux':'Modelo de diffusion rapido de Black Forest Labs',
  'Runway Gen-3':'Plataforma de video IA con control creativo avanzado',
  'Pika':'Editor de video IA para crear y editar clips desde texto',
  'Kling':'Modelo de video IA de Kuaishou con movimiento realista',
  'Luma':'Generacion de video 3D y neuronale desde texto e imagen',
  'Sora':'Modelo de video IA de OpenAI para escenas cinematograficas',
  'Suno v4':'Generador de canciones completas con IA (vocales + instrumentos)',
  'Udio':'Plataforma de musica IA con generacion de audio de alta fidelidad',
  'ElevenLabs':'Sintesis de voz IA ultra-realista con clonacion de voz',
  'Cursor':'Editor de codigo con IA integrada (fork de VS Code)',
  'v0':'Generador de componentes UI de Vercel via prompts de texto',
  'Bolt.new':'IDE web fullstack con IA para prototipado rapido',
  'Lovable':'Constructor de aplicaciones fullstack con IA conversacional',
  'Claude Code':'CLI de Anthropic para coding agentic en terminal',
  'AutoGPT':'Agente IA autónomo con capacidad de razonamiento y ejecucion',
  'CrewAI':'Framework para orquestar equipos de agentes IA colaborativos',
  'LangGraph':'Framework de LangChain para flujos de agentes con estado',
  'N8N':'Automatizacion de flujos de trabajo con nodos visuales',
  'Archetype Discover':'Identificacion de arquetipos junguianos via analisis IA',
  'Dream Interpreter':'Interpretacion de simbolos oniricos con IA analitica'
};

function getModLink(name){return MODS_LINK[name]||'https://www.google.com/search?q='+encodeURIComponent(name+' tool')}
function getModDesc(name,catKey){
  if(MODS_DESC[name])return MODS_DESC[name];
  var descs={'img':'Generador de imagenes y arte visual por IA','vid':'Herramienta de creacion y edicion de video con IA','aud':'Plataforma de produccion musical y audio con IA','code':'Entorno de desarrollo y codigo asistido por IA','agent':'Framework o plataforma de orquestacion de agentes IA','psy':'Herramienta de analisis psicologico y autoconocimiento con IA'};
  return descs[catKey]||'Modulo del ecosistema Belentani';
}

// Recently used modules (localStorage, max 12)
function getRecentMods(){try{return JSON.parse(localStorage.getItem('belentani_recent_mods'))||[]}catch(e){return[]}}
function addRecentMod(n,c){
  var r=getRecentMods().filter(function(x){return x.n!==n});
  r.unshift({n:n,c:c,t:Date.now()});
  if(r.length>12)r=r.slice(0,12);
  try{localStorage.setItem('belentani_recent_mods',JSON.stringify(r))}catch(e){}
}

(function(){
  var g=document.getElementById('stuGrid');if(!g)return;
  var cats=Object.keys(MODS),tabs=document.getElementById('stabs');
  var searchIn=document.getElementById('stuSearch');
  var recentG=document.getElementById('recentMods');
  var activeCat='*';var searchQuery='';

  function renderCountBadges(){
    if(!tabs)return;
    tabs.querySelectorAll('.stab').forEach(function(tab){
      var cat=tab.dataset.c;
      var count=cat==='*'?cats.reduce(function(s,c){return s+MODS[c].length},0):(MODS[cat]?MODS[cat].length:0);
      var badge=tab.querySelector('.stab-count');
      if(!badge){badge=document.createElement('span');badge.className='stab-count';badge.style.cssText='font-size:10px;color:var(--dim);font-family:var(--fm);margin-left:6px;opacity:0.6';tab.appendChild(badge)}
      badge.textContent='['+count+']';
    });
  }

  function render(f){
    activeCat=f||'*';g.innerHTML='';var total=0;
    cats.forEach(function(cat,ci){
      if(f!=='*'&&f!==cat)return;
      MODS[cat].forEach(function(m,mi){
        if(searchQuery&&m.toLowerCase().indexOf(searchQuery)===-1)return;
        var id=String(ci+1).padStart(2,'0')+'.'+String(mi+1).padStart(2,'0');
        var isR=getRecentMods().some(function(x){return x.n===m});
        g.innerHTML+='<div class="mcard'+(isR?' mcard-recent':'')+'" data-cat="'+CATNAME[cat]+'" data-catkey="'+cat+'" data-name="'+m+'"><div class="mi">'+CATICO[cat]+'</div><div class="mn">'+m+(isR?' <span class="mrec">&#8635;</span>':'')+'</div><div class="mid">MODULE_'+id+' // '+CATNAME[cat]+'</div></div>';
        total++;
      });
    });
    if(total===0)g.innerHTML='<div style="text-align:center;padding:40px;color:var(--accent);font-family:var(--fm);font-size:12px;letter-spacing:2px">NO MODULES FOUND // '+searchQuery.toUpperCase()+'</div>';
    observeRV();
  }
  function renderRecent(){
    if(!recentG)return;
    var r=getRecentMods();
    if(!r.length){recentG.innerHTML='';return}
    recentG.innerHTML=r.map(function(x){return'<div class="tcard rv mcard-recent" style="padding:12px;cursor:pointer" data-cat="'+x.c+'" data-name="'+x.n+'"><div class="tc-name" style="font-size:13px">'+x.n+'</div><div class="tc-id">'+x.c+'</div></div>'}).join('');
    observeRV();
  }
  render('*');renderRecent();renderCountBadges();
  tabs.addEventListener('click',function(e){
    var b=e.target.closest('.stab');if(!b)return;
    tabs.querySelectorAll('.stab').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on');render(b.dataset.c);
  });
  if(searchIn){
    searchIn.addEventListener('input',function(){searchQuery=this.value.toLowerCase().trim();render(activeCat)});
    searchIn.addEventListener('keydown',function(e){
      if(e.key==='Escape'){this.value='';searchQuery='';render(activeCat);this.blur()}
    });
  }
  recentG&&recentG.addEventListener('click',function(e){
    var c=e.target.closest('.mcard-recent');if(c)openMod(c.dataset.cat,c.dataset.name,c.dataset.cat||'');
  });
  g.addEventListener('click',function(e){
    var c=e.target.closest('.mcard');if(!c)return;
    openMod(c.dataset.cat,c.dataset.name,c.dataset.catkey||'');
    addRecentMod(c.dataset.name,c.dataset.cat);renderRecent();render(activeCat);
  });
})();

// MODULE OVERLAY — with description + external link
var modA=null;
var CSYS={'IMAGE FORGE':['img','Forja visual Judas.'],'VIDEO LAB':['txt','Eres el modulo de direccion de video Belentani. Devuelve guion visual: escenas, planos, iluminacion, camara. Espanol.'],
  'AUDIO FORGE':['txt','Eres el modulo de produccion sonora Belentani (dark pop, R&amp;B visceral, 96 BPM). Devuelve: estructura, instrumentacion, diseno de sonido, letra. Espanol.'],
  'CODE NEXUS':['txt','Eres el modulo de ingenieria Belentani. Devuelve codigo limpio y completo. Espanol.'],
  'AI AGENTS':['txt','Eres un orquestador de agentes IA para el ecosistema Belentani. Devuelve flujo de trabajo ejecutable.'],
  'PSYCHE SCAN':['txt','Eres el analizador psico-arquetipico del sistema Judas. Procesa patrones de sombra, trauma y mitologia. Devuelve lectura diagnostica profunda en espanol.']};
function openMod(cat,name,catKey){
  modA={cat:cat,name:name};
  document.getElementById('modT').textContent=name;
  document.getElementById('modC').textContent=cat;
  var ov=document.getElementById('modOv');
  // Description
  var descEl=ov.querySelector('.mod-desc');
  if(!descEl){
    descEl=document.createElement('div');
    descEl.className='mod-desc';
    descEl.style.cssText='font-size:12px;color:var(--dim);margin:8px 0;font-family:var(--fm);line-height:1.5';
    document.getElementById('modC').parentNode.insertBefore(descEl,document.getElementById('modC').nextSibling);
  }
  descEl.textContent=getModDesc(name,catKey);
  // External link
  var linkEl=ov.querySelector('.mod-link');
  if(!linkEl){
    linkEl=document.createElement('a');
    linkEl.className='mod-link';
    linkEl.target='_blank';
    linkEl.rel='noopener';
    linkEl.style.cssText='font-size:11px;color:var(--accent);text-decoration:underline;font-family:var(--fm);display:inline-block;margin:4px 0';
    descEl.parentNode.insertBefore(linkEl,descEl.nextSibling);
  }
  linkEl.href=getModLink(name);
  linkEl.textContent='→ Abrir '+name;
  document.getElementById('modIn').value='';
  document.getElementById('modOut').textContent='';
  ov.classList.add('on');
}
function closeMod(){document.getElementById('modOv').classList.remove('on')}
function runMod(){if(!modA)return;var inp=document.getElementById('modIn').value.trim(),out=document.getElementById('modOut');
  out.textContent='> PROCESANDO '+modA.name+'...';
  var cfg=CSYS[modA.cat]||['txt','Modulo Belentani.'];
  if(cfg[0]==='img'){out.innerHTML='<img src="https://image.pollinations.ai/prompt/'+encodeURIComponent('belentani judas era, '+modA.name+', '+inp)+'?width=800&height=450&nologo=true&seed='+Math.floor(Math.random()*10000)+'" style="width:100%;border:1px solid var(--blood)" alt="Output">'}
  else{poll(modA.name+': '+inp,cfg[1]).then(function(r){out.textContent=r})}}

// ═══════════════════════════════════════════════════════════════
// MUSIC — YouTube tracks, click → stream in new tab, hover waveform
// ═══════════════════════════════════════════════════════════════
(function(){
  var mg=document.getElementById('musicGrid');if(!mg)return;
  // Waveform hover CSS
  if(!document.getElementById('wf-css')){
    var ws=document.createElement('style');ws.id='wf-css';
    ws.textContent='.wf{display:flex;align-items:flex-end;gap:2px;height:18px;opacity:0;transition:opacity .3s;flex-shrink:0}.tcard:hover .wf{opacity:1}.wf i{display:block;width:3px;background:var(--blood);border-radius:1px;animation:wfA .6s ease-in-out infinite alternate}.wf i:nth-child(1){height:30%;animation-delay:0s}.wf i:nth-child(2){height:70%;animation-delay:.08s}.wf i:nth-child(3){height:100%;animation-delay:.16s}.wf i:nth-child(4){height:50%;animation-delay:.24s}.wf i:nth-child(5){height:80%;animation-delay:.12s}@keyframes wfA{0%{height:20%}100%{height:100%}}';
    document.head.appendChild(ws);
  }
  var MUSIC=[
    {t:'El Hombre Integrado',al:'Judas Era',d:'3:42',q:'belentani+el+hombre+integrado'},
    {t:'Cuatro Procesos',al:'Judas Era',d:'4:18',q:'belentani+cuatro+procesos'},
    {t:'La Llave Dorada',al:'Judas Era',d:'3:55',q:'belentani+la+llave+dorada'},
    {t:'La Deuda Impagable',al:'Judas Era',d:'4:01',q:'belentani+la+deuda+impagable'},
    {t:'Beso en los Pies',al:'Judas Era',d:'3:33',q:'belentani+beso+en+los+pied'},
    {t:'El Robo y El Canto',al:'Judas Era',d:'5:12',q:'belentani+el+robo+y+el+canto'},
    {t:'Cuatro Voces',al:'Judas Era',d:'4:47',q:'belentani+cuatro+voces'},
    {t:'El Canto de Pedro',al:'Judas Era',d:'6:03',q:'belentani+el+canto+de+pedro'},
    {t:'La Victoria Amarga',al:'Judas Era',d:'4:22',q:'belentani+la+victoria+amarga'},
    {t:'La Mentira Compartida',al:'Judas Era',d:'5:38',q:'belentani+la+mentira+compartida'},
    {t:'Transmission End',al:'Judas Era',d:'2:51',q:'belentani+transmission+end'},
    {t:'Judas Era (Outro)',al:'Judas Era',d:'4:09',q:'belentani+judas+era+outro'}
  ];
  function renderMusic(){
    mg.innerHTML=MUSIC.map(function(x,i){
      return '<div class="tcard rv" style="padding:14px;cursor:pointer;border-left:2px solid var(--blood)" data-url="https://www.youtube.com/results?search_query='+x.q+'"><div style="display:flex;justify-content:space-between;align-items:center"><div class="tc-name" style="font-size:13px">'+(i+1)+'. '+x.t+'</div><div class="wf"><i></i><i></i><i></i><i></i><i></i></div><div style="font-size:11px;color:var(--dim);font-family:var(--fm)">'+x.d+'</div></div><div style="font-size:11px;color:var(--accent);font-family:var(--fm);margin-top:4px">'+x.al+' — <span style="color:var(--dim)">YouTube</span></div></div>';
    }).join('');
    observeRV();
  }
  renderMusic();
  mg.addEventListener('click',function(e){
    var c=e.target.closest('[data-url]');if(!c)return;
    window.open(c.dataset.url,'_blank','noopener');
  });
})();

// ═══════════════════════════════════════════════════════════════
// XP — counter animation with requestAnimationFrame
// ═══════════════════════════════════════════════════════════════
var xp=parseInt(localStorage.getItem('belentani_xp'))||0;
function addXP(n){
  var start=xp;xp+=n;
  try{localStorage.setItem('belentani_xp',String(xp))}catch(e){}
  var el=document.getElementById('hXP');if(!el)return;
  var dur=600,st=null;
  function anim(ts){
    if(!st)st=ts;
    var p=Math.min((ts-st)/dur,1);
    var ease=1-Math.pow(1-p,3);
    el.textContent=Math.floor(start+(xp-start)*ease);
    if(p<1)requestAnimationFrame(anim);
    else{el.textContent=xp;el.style.color='var(--accent)';setTimeout(function(){el.style.color=''},300)}
  }
  requestAnimationFrame(anim);
}

// ═══════════════════════════════════════════════════════════════
// CHALLENGES — progress tracker with localStorage
// ═══════════════════════════════════════════════════════════════
(function(){
  var g=document.getElementById('chGrid');if(!g)return;
  var ch=[['MISION_01','DESENTRANA LAS 5 FIRMAS','Encuentra las palabras clave secretas en el chat o toca las gemas.','100 XP',100],
    ['MISION_02','SINCRONIZA EL PORTAL','Toca los 5 diamantes holograficos en la seccion Portal.','250 XP',250],
    ['MISION_03','INVOCA LA ASCENSION','Escribe OMEGA en cualquier interfaz de chat tras completar el enjambre.','500 XP',500],
    ['MISION_04','EJECUTA UN MODULO STUDIO','Abre cualquier modulo del Studio Lab y corre una directiva.','150 XP',150],
    ['MISION_05','FORJA UNA VISION','Genera una imagen en Vision Forge con un prompt propio.','200 XP',200],
    ['MISION_06','HABLA CON EL NUCLEO','Envia un mensaje al Neural Chat y recibe respuesta del CORE_AI.','150 XP',150]];
  function getProg(){try{return JSON.parse(localStorage.getItem('belentani_challenges'))||{}}catch(e){return{}}}
  function saveProg(p){try{localStorage.setItem('belentani_challenges',JSON.stringify(p))}catch(e){}}
  function render(){
    var p=getProg();var count=0;
    g.innerHTML=ch.map(function(x){
      var done=!!p[x[0]];if(done)count++;
      return'<div class="tcard rv'+(done?' ch-done':'')+'"><div class="tc-head"><div class="tc-ico">'+(done?'&#10003;':'&#9876;')+'</div><div><div class="tc-name">'+x[1]+'</div><div class="tc-id">'+x[0]+' // '+x[3]+'</div></div></div><p class="tc-desc">'+x[2]+'</p><button class="tc-btn" data-id="'+x[0]+'" data-xp="'+x[4]+'"'+(done?' disabled':'')+'>'+(done?'COMPLETADA':'INICIAR')+'</button></div>';
    }).join('');
    var pb=document.getElementById('chProgress');
    if(pb)pb.style.width=Math.round((count/ch.length)*100)+'%';
    var ct=document.getElementById('chCount');
    if(ct)ct.textContent=count+'/'+ch.length;
    observeRV();
  }
  render();
  g.addEventListener('click',function(e){
    var b=e.target.closest('.tc-btn');if(!b||b.disabled)return;
    var p=getProg();p[b.dataset.id]=Date.now();saveProg(p);addXP(parseInt(b.dataset.xp)||0);render();
  });
})();

// Initialize fade-in for all static .rv elements
observeRV();
