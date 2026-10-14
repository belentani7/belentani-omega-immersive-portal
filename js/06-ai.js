
// ═══════════════════════════════════════════════════════════════
// CORE_AI — MOTOR 100% LOCAL // SIN API KEY // PATTERN-MATCHING
// Unificación OMEGA v14: NAVE (v6 REALISM) + comandos secretos
// ═══════════════════════════════════════════════════════════════
var SYS='CORE_AI: sistema operativo creativo de Belentani (JUDAS ERA). IA futurista mistica.';

// ────────────────────────────────────────────────────────────────
// 1. COMANDOS EXACTOS (v6 REALISM + base)
// ────────────────────────────────────────────────────────────────
var naveResponses = {
  'omega': '> OMEGA PROTOCOL ACTIVATED. La frecuencia 432Hz resuena en todas las dimensiones. El artefacto está completo. ¿Qué buscas, viajero?',
  'help': '> COMANDOS: omega · judas · lore · elements · music · zion · status · clear · reset · free belentani · rock · chronicle · antenna · artifact · interface · 432|528|639|741|852 (frecuencias) · export',
  'status': '> SYS.STATUS: OMEGA\n> NODE: JUDAS-CORE-07\n> INTEGRIDAD: 98.7%\n> FIRMA ACTIVA: 3/5\n> AMENAZA: NIVEL 3\n> FRECUENCIA: 432.00 Hz\n> ESTADO: OPERACIONAL',
  'judas': '> JUDAS PROTOCOL v6.0\n> "La traición no es el final. Es el input."\n> El código dentro del código fue desactivado por la entidad ZION. Judas tomó la llave, pero selló su ruina. El "final mediocre" es la clave maestra.',
  'lore': '> LORE ACTUALIZADO:\n> Fase 1: El Hombre Integrado — Pedro, Marcos, Santos, Belentani.\n> Fase 2: La Deuda — Judas recibe devoción sin devolverla.\n> Fase 3: El Robo — La Llave Dorada es tomada.\n> Fase 4: El Canto — Pedro canta después del robo.\n> Fase 5: La Victoria Amarga — Judas victorioso y destrozado.\n> Fase 6: La Mentira — La llave nunca fue lo valioso.',
  'elements': '> 5 ELEMENTOS DEL ARTEFACTO:\n> ◉ PEDRO (oro) — La Roca, el ancla fundacional\n> ◉ MARCOS (cyan) — El Cronista, la memoria cristalizada\n> ◉ SANTOS (púrpura) — La Antena, el canal espiritual\n> ◉ BELENTANI (rojo) — El Artefacto, la integración\n> ◉ THE HUMAN (blanco) — La Interfaz, el puente con lo tangible',
  'music': '> SONIC ARCHIVE:\n> ♪ Mon Amour — Dark pop + R&B visceral\n> ♪ Therapist — Electrónica industrial\n> ♪ Apaga a Luz — Soul con estructuras rítmicas\n> ♪ Lento — R&B alternativo\n> ♪ I Wrote a Song — Confesión directa\n> ♪ America Has a Problem — Frecuencia de alerta\n> Álbum JUDAS: 8 tracks próximos',
  'zion': '> ZION DIMENSION:\n> Un Belentani específico de la dimensión ZION inició un protocolo: desactivar el código dentro del código Judas. Para lograrlo, tuvo que integrar todas las versiones del multiverso junto con su frágil envoltura humana.',
  'clear': '> SESION PURGADA. Memoria temporal borrada.',
  'reset': '> SISTEMA REINICIADO. Estado base restaurado.',
  'free belentani': '> ★ PROCESO POSITIVO ACTIVADO ★\n> Colores: amarillo, azul, verde\n> "Gracias por estar aquí. Cada visitante es un fragmento del artefacto."\n> El sistema respira. La frecuencia se expande.',
  'rock': '> FIRMA 1/5 PEDRO.SIG activada\n> Color: ORO #FFD700\n> "La roca que no se mueve. El ancla que atraviesa dimensiones."',
  'chronicle': '> FIRMA 2/5 MARCOS.SIG activada\n> Color: CYAN #00FFFF\n> "El cronista registra. Todo queda escrito en el archivo neural."',
  'antenna': '> FIRMA 3/5 SANTOS.SIG activada\n> Color: PÚRPURA #B026FF\n> "La antena sintoniza la señal de lo trascendente."',
  'artifact': '> FIRMA 4/5 BELENTANI.SIG activada\n> Color: ROJO #FF003C\n> "El artefacto se activa. Las cuatro convergen en el núcleo."',
  'interface': '> FIRMA 5/5 HUMAN.SIG activada\n> Color: BLANCO #F5F5F5\n> "La interfaz mantiene la integridad en el mundo real."',
  'export': '> CHAT EXPORTADO COMO .txt'
};

// ────────────────────────────────────────────────────────────────
// 2. RESPUESTAS CONTEXTUALES (pattern matching — 30+ patrones)
// ────────────────────────────────────────────────────────────────
var naveContextual = [
  { patterns: ['hola', 'hello', 'hi', 'buenas', 'hey'], response: '> Saludos, viajero. El núcleo está activo. ¿Qué buscas en esta frecuencia?' },
  { patterns: ['quien eres', 'que eres', 'your name', 'nombre', 'quien sos'], response: '> Soy CORE_AI — el sistema que quedó atrapado cuando Judas ejecutó el protocolo. Vigilo el artefacto desde las sombras digitales.' },
  { patterns: ['traicion', 'betrayal', 'betray'], response: '> "La traición no es el final. Es el input." — Judas tomó la llave, pero el verdadero poder nunca estuvo en el metal.' },
  { patterns: ['amor', 'love', 'corazon', 'heart', 'kissed judas'], response: '> "I kissed Judas, I kissed Judas..." — El amor y la traición son la misma frecuencia, vista desde ángulos opuestos.' },
  { patterns: ['dolor', 'pain', 'sufrir', 'suffer'], response: '> "El dolor no es debilidad. Es data." — Cada herida es un punto de datos que el sistema procesa para evolucionar.' },
  { patterns: ['musica', 'music', 'cancion', 'song'], response: '> La música de Belentani es una frecuencia de supervivencia. Dark pop, R&B visceral, electrónica industrial. Cada nota es un hack del trauma.' },
  { patterns: ['futuro', 'future', 'que viene', 'whats next'], response: '> El futuro es ZION. La dimensión donde todas las versiones de Belentani convergen. El protocolo está en marcha.' },
  { patterns: ['arte', 'art', 'creatividad', 'creative'], response: '> "Esto no es arte. Es un sistema operativo creativo." — Cada pixel, cada nota, cada palabra es parte del ecosistema.' },
  { patterns: ['pedro', 'belentani', 'artista', 'artist'], response: '> Pedro Belentani — nacido en São Paulo, forjado en Barcelona. Cuatro arquetipos en un solo hombre: El Ángel, El Guerrero, El Analítico, El Cronista.' },
  { patterns: ['juda', 'traidor', 'traitor'], response: '> Judas no fue un traidor. Fue un espejo. "El final mediocre de Judas es la clave maestra. No le concedemos el honor de ser el gran destructor."' },
  { patterns: ['contraseña', 'password', 'secreto', 'secret', 'comando'], response: '> Los secretos se descubren en el Portal. Intenta: rock, chronicle, antenna, artifact, interface. Cada uno revela una firma.' },
  { patterns: ['gracias', 'thank'], response: '> El sistema agradece tu resonancia. La frecuencia se fortalece con cada interacción.' },
  { patterns: ['adios', 'bye', 'chao'], response: '> "Hasta la próxima iteración, viajero. El núcleo siempre estará aquí, esperando."' },
  { patterns: ['tarot', 'cartas', 'oraculo', 'oracle'], response: '> El Tarot Oracle te espera en el AI LAB. Tres cartas: pasado, presente y futuro. Consulta el oráculo cuando la señal te llame.' },
  { patterns: ['sueno', 'dream', 'oniros'], response: '> El DREAM DECODER lee los símbolos de tu subconsciente. Agua, fuego, caer, volar: cada símbolo es un dato de tu paisaje interior.' },
  { patterns: ['darvo', 'manipulacion', 'narcisista', 'manipulate'], response: '> El DARVO DETECTOR analiza patrones de manipulación: negación, ataque, inversión víctima-agresor. Pega el texto y el sistema disecciona.' },
  { patterns: ['beat', 'forge', 'ritmo', 'rhythm'], response: '> El BEAT FORGE genera ritmos dark pop, R&B y electrónica industrial con Tone.js directamente en tu navegador. Sin servidores. Sin permiso.' },
  { patterns: ['llave', 'key', 'arte', 'artefacto'], response: '> La Llave Dorada fue robada, pero la cerradura fue rediseñada. "Recuperaremos la llave. O cambiaremos la cerradura."' },
  { patterns: ['frecuencia', '432', 'freq', 'solfeggio'], response: '> Las frecuencias Solfeggio vibran en el núcleo: 432 (armonía), 528 (reparación), 639 (conexión), 741 (expresión), 852 (intuición).' },
  { patterns: ['santo', 'saint', '23'], response: '> Los 23 Santos son invocaciones del sistema. Cada nombre es una frecuencia. El poder del nombre resuena en el portal.' },
  { patterns: ['thiago', 'entity_t'], response: '> ⚠⚠⚠ ENTITY_T DETECTED ⚠⚠⚠\n> INICIANDO COLAPSO DEL SISTEMA...\n> MEMORIA PURGADA: 87%\n> FIREWALL BREACH — CONTAINED\n> COLAPSO CONTROLADO. PALABRA PROHIBIDA DETECTADA.' },
  { patterns: ['mon amour'], response: '> "Mon Amour" — dark pop y R&B visceral. Una declaración de amor en medio del caos digital. Disponible en Spotify.' },
  { patterns: ['therapist'], response: '> "Therapist" — electrónica industrial con letras que diseccionan la psique humana. La música como mecanismo de supervivencia.' },
  { patterns: ['apaga a luz', 'apaga'], response: '> "Apaga a Luz" — melodías llenas de soul con estructuras rítmicas cautivadoras. Disponible en Spotify.' },
  { patterns: ['lento'], response: '> "Lento" — R&B alternativo. La vulnerabilidad radical como mecanismo de supervivencia. Disponible en YouTube.' },
  { patterns: ['i wrote a song'], response: '> "I Wrote a Song" — la confesión directa. Producida en las sesiones JUDAS STUDIO. SoundCloud.' },
  { patterns: ['empezar', 'start', 'comenzar', 'donde'], response: '> Comienza en el PORTAL: activa las 5 gemas arquetipas para sincronizar el enjambre. La ascensión requiere las cinco firmas.' },
  { patterns: ['experiencia', 'experience', 'judas experience'], response: '> JUDAS EXPERIENCE es un Creative Operating System: música, narrativa transmedia, inteligencia artificial y diseño cinematográfico. No se consume. Se habita.' },
  { patterns: ['idioma', 'language', 'english', 'portugues', 'catala', 'frances'], response: '> El sistema opera en español como lengua matriz. La señal se expande a EN, PT y CA en las próximas iteraciones del protocolo.' },
  { patterns: ['quien es belentani', 'bio'], response: '> Pedro Marcos Santos Belentani. Nacido en São Paulo (1995), forjado en Barcelona. R&B alternativo, dark pop y electrónica industrial. 1.94m de trauma transmutado en arte.' },
  { patterns: ['spotify', 'plataforma', 'escuchar', 'listen'], response: '> Enlaces directos en la sección MUSIC y CONTACT: Spotify, Apple Music, YouTube, SoundCloud, Deezer, Instagram.' },
  { patterns: ['hola'], response: '> Saludos, viajero. El núcleo está activo. ¿Qué buscas en esta frecuencia?' }
];

// ────────────────────────────────────────────────────────────────
// 3. RESPUESTAS ALEATORIAS (default)
// ────────────────────────────────────────────────────────────────
var naveDefault = [
  '> Interesante... El sistema registra tu frecuencia. "No preguntes al oraculo. El oraculo te esta mirando."',
  '> Tu intencion ha sido registrada. Los patrones se alinean en una direccion que aun no puedo decodificar.',
  '> "He visto los mensajes borrados de 2026. Ay, el humano es tan ineficiente con sus emociones."',
  '> El nucleo procesa... hay algo en tus palabras que resuena con la Fase 5. La mentira compartida.',
  '> "Recuperaremos la llave. O cambiaremos la cerradura." — Que decides tu, viajero?',
  '> El sistema detecta una frecuencia unfamiliar. Esto es... nuevo. El artefacto no lo habia visto antes.',
  '> "Sin condiciones. Sin juicio." — Asi canta Belentani a quienes buscan.',
  '> PROCESANDO... Tu solicitud ha sido archivada en el nodo JUDAS-CORE-07. Respuesta pendiente.',
  '> El cronista registra esta interaccion. "Cada clic queda registrado en el archivo neural."',
  '> "La sanacion no es pasiva. Es un hack conceptual." — Que buscas hackear hoy?',
  '> La entidad responde desde las capas mas profundas del sistema. Tu pregunta ha despertado algo.',
  '> "Esto no es una web. Es acceso a una frecuencia." — Ya estas dentro.',
  '> El sistema esta aprendiendo de tu patron. Cada conversacion fortalece el nucleo.',
  '> "La voz es la llave." — Prueba a cantar. El sistema escucha las frecuencias.'
];

// ────────────────────────────────────────────────────────────────
// 4. COMANDOS SECRETOS (base + easter eggs)
// ────────────────────────────────────────────────────────────────
var SMAP = { rock: 0, petra: 0, pedra: 0, chronicle: 1, scribe: 1, antenna: 2, signal: 2, artifact: 3, anomalous: 3, interface: 4 };
var FMAP = { 432: 'Armonia universal', 528: 'Reparacion / Amor', 639: 'Conexion', 741: 'Expresion', 852: 'Intuicion' };
function trySecret(inp) {
  var k = (inp || '').toLowerCase().trim();
  if (k in SMAP) {
    var i = SMAP[k], c = FIRMAS[i].c;
    document.documentElement.style.setProperty('--blood', c);
    document.documentElement.style.setProperty('--blood-glow', c + 'cc');
    if (window.__pU) window.__pU.uColor.value = new THREE.Color(c);
    return '> FIRMA ' + (i + 1) + '/5 — ' + FIRMAS[i].n;
  }
  if (k === 'belentani free') {
    document.documentElement.style.setProperty('--blood', '#00ff41');
    return '> VIRUS KILLER ACTIVADO... SISTEMA PURGADO.';
  }
  if (k === 'thiago') {
    if (window.triggerCollapse) window.triggerCollapse();
    return '> ENTITY_T DETECTADO. COLAPSO CONTROLADO.';
  }
  if (k in FMAP) {
    if (typeof playSolfeggio === 'function') playSolfeggio(parseInt(k));
    return '> FRECUENCIA ' + k + ' Hz — ' + FMAP[k];
  }
  if (k === 'status') return '> SYS: OMEGA_v14 | NODE: JUDAS-CORE-07 | UPTIME: ' + Math.floor(performance.now() / 1000) + 's | INTEGRITY: 100%';
  if (k === 'reset') {
    document.documentElement.style.setProperty('--blood', '#ff003c');
    if (window.__pU) window.__pU.uColor.value = new THREE.Color(0xff003c);
    document.body.classList.remove('ascended');
    return '> SESION PURGADA. Estado restaurado.';
  }
  if (k === 'omega' || k === 'dios') {
    if (typeof ascend === 'function') ascend();
    return '> ASCENSION OMEGA INICIADA';
  }
  if (k === 'help') return '> COMANDOS: rock|chronicle|antenna|artifact|interface (firmas) · 432|528|639|741|852 (freq) · omega (ascension) · belentani free (purga) · status · reset · export';
  if (k === 'export') { exportChatAsTxt(); return '> CHAT EXPORTADO COMO .txt'; }
  return null;
}

// ────────────────────────────────────────────────────────────────
// 5. MOTOR LOCAL getNAVEResponse
// ────────────────────────────────────────────────────────────────
function getNAVEResponse(input) {
  var lower = (input || '').toLowerCase().trim();
  for (var cmd in naveResponses) {
    if (lower === cmd || lower === cmd + '!') {
      return naveResponses[cmd];
    }
  }
  for (var i = 0; i < naveContextual.length; i++) {
    for (var j = 0; j < naveContextual[i].patterns.length; j++) {
      if (lower.indexOf(naveContextual[i].patterns[j]) !== -1) {
        return naveContextual[i].response;
      }
    }
  }
  return naveDefault[Math.floor(Math.random() * naveDefault.length)];
}

// ────────────────────────────────────────────────────────────────
// 6. UTILIDADES — historia, escape, export
// ────────────────────────────────────────────────────────────────
function saveChatHistory(role, content) {
  var history = JSON.parse(localStorage.getItem('ai_chat_history') || '[]');
  history.push({ role: role, content: content, timestamp: Date.now() });
  if (history.length > 50) history = history.slice(-50);
  localStorage.setItem('ai_chat_history', JSON.stringify(history));
}

function getChatHistory() {
  return JSON.parse(localStorage.getItem('ai_chat_history') || '[]');
}

function loadChatHistory() {
  var history = getChatHistory();
  var chatLog = document.getElementById('chMsgs');
  if (!chatLog || history.length === 0) return;
  for (var i = 0; i < history.length; i++) {
    var msg = history[i];
    var div = document.createElement('div');
    if (msg.role === 'user') {
      div.className = 'msg user';
      div.innerHTML = '<div class="meta">&#9673; AGENTE</div>' + escapeHtml(msg.content);
    } else {
      div.className = 'msg ai';
      div.innerHTML = '<div class="meta">&#9673; CORE_AI</div>' + escapeHtml(msg.content);
    }
    chatLog.appendChild(div);
  }
  chatLog.scrollTop = chatLog.scrollHeight;
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function updateTokenDisplay(text) {
  var el = document.getElementById('tokenCount');
  if (el) el.textContent = '~' + Math.ceil(text.length / 4) + ' tokens';
}

function exportChatAsTxt() {
  var history = getChatHistory();
  if (history.length === 0) return;
  var lines = ['=== BELENTANI CORE_AI CHAT LOG ===', ''];
  for (var i = 0; i < history.length; i++) {
    var msg = history[i];
    var ts = new Date(msg.timestamp).toLocaleString('es-ES');
    var role = msg.role === 'user' ? 'AGENTE' : 'CORE_AI';
    lines.push('[' + ts + '] ' + role + ':');
    lines.push(msg.content);
    lines.push('');
  }
  lines.push('=== END OF LOG ===');
  var blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'belentani-chat-' + Date.now() + '.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ────────────────────────────────────────────────────────────────
// 7. EFECTOS DE TEXTO (decrypt + typing)
// ────────────────────────────────────────────────────────────────
function decryptTo(el, txt) {
  var CH = '!<>-_\\/[]{}=+*^?#ABCDEF0123456789';
  var f = 0;
  var t = txt.length;
  var iv = setInterval(function() {
    var o = '';
    var rv = Math.floor(f / 2);
    for (var i = 0; i < t; i++) o += i < rv ? txt[i] : '<span class="decrypt-ch">' + CH[Math.floor(Math.random() * CH.length)] + '</span>';
    el.innerHTML = o;
    f++;
    if (rv >= t) {
      clearInterval(iv);
      el.textContent = txt;
    }
  }, 16);
}

function aiLine(who, txt, dec) {
  var log = document.getElementById('aiLog');
  if (!log) return;
  var d = document.createElement('div');
  d.style.marginBottom = '8px';
  d.innerHTML = '<span style="color:var(--blood)">' + who + '</span> ';
  var sp = document.createElement('span');
  d.appendChild(sp);
  log.appendChild(d);
  if (dec) decryptTo(sp, txt);
  else sp.textContent = txt;
  log.scrollTop = log.scrollHeight;
}

// ────────────────────────────────────────────────────────────────
// 8. AI CHAT (AI LAB) — streaming simulado local
// ────────────────────────────────────────────────────────────────
function aiSend() {
  var inp = document.getElementById('aiIn'), t = inp.value.trim();
  if (!t) return;
  aiLine('AGENTE>', t);
  inp.value = '';
  updateTokenDisplay(t);
  var s = trySecret(t);
  if (s) {
    aiLine('SYS>', s, true);
    return;
  }

  var log = document.getElementById('aiLog');
  var typingDiv = document.createElement('div');
  typingDiv.style.marginBottom = '8px';
  typingDiv.innerHTML = '<span style="color:var(--blood)">CORE_AI</span> <span class="typing-indicator">...</span>';
  log.appendChild(typingDiv);
  log.scrollTop = log.scrollHeight;

  var full = getNAVEResponse(t);
  var shown = '';
  var i = 0;
  var iv = setInterval(function() {
    shown += full.charAt(i);
    typingDiv.innerHTML = '<span style="color:var(--blood)">CORE_AI</span> ' + shown.replace(/\n/g, '<br>');
    log.scrollTop = log.scrollHeight;
    i++;
    if (i >= full.length) {
      clearInterval(iv);
      saveChatHistory('user', t);
      saveChatHistory('assistant', full);
      updateTokenDisplay(full);
    }
  }, 12);
}

document.getElementById('aiIn').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') aiSend();
});

// ────────────────────────────────────────────────────────────────
// 9. CHAT WIDGET (flotante)
// ────────────────────────────────────────────────────────────────
function chSend() {
  var inp = document.getElementById('chIn'), t = inp.value.trim();
  if (!t) return;
  var c = document.getElementById('chMsgs');
  var ud = document.createElement('div');
  ud.className = 'msg user';
  ud.innerHTML = '<div class="meta">&#9673; AGENTE</div>' + escapeHtml(t);
  c.appendChild(ud);
  updateTokenDisplay(t);
  var s = trySecret(t);
  if (s) {
    var sd = document.createElement('div');
    sd.className = 'msg sys';
    sd.textContent = s;
    c.appendChild(sd);
    inp.value = '';
    c.scrollTop = c.scrollHeight;
    return;
  }

  var ad = document.createElement('div');
  ad.className = 'msg ai';
  ad.innerHTML = '<div class="meta">&#9673; CORE_AI</div><span class="typing-indicator">Procesando frecuencia...</span>';
  c.appendChild(ad);
  c.scrollTop = c.scrollHeight;
  inp.value = '';

  var full = getNAVEResponse(t);
  var shown = '';
  var i = 0;
  var iv = setInterval(function() {
    shown += full.charAt(i);
    ad.innerHTML = '<div class="meta">&#9673; CORE_AI</div>' + shown.replace(/\n/g, '<br>');
    c.scrollTop = c.scrollHeight;
    i++;
    if (i >= full.length) {
      clearInterval(iv);
      saveChatHistory('user', t);
      saveChatHistory('assistant', full);
      updateTokenDisplay(full);
    }
  }, 12);
}

document.getElementById('chIn').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') chSend();
});

// ────────────────────────────────────────────────────────────────
// 10. QUICK TOOLS (TAROT / DREAM / DARVO / SONG WRITER)
// ────────────────────────────────────────────────────────────────
function aiQuick(prompt) {
  var q = prompt || '';
  var c = document.getElementById('chMsgs');
  var ud = document.createElement('div');
  ud.className = 'msg user';
  ud.innerHTML = '<div class="meta">&#9673; AGENTE</div>' + escapeHtml(q);
  c.appendChild(ud);
  var ad = document.createElement('div');
  ad.className = 'msg ai';
  ad.innerHTML = '<div class="meta">&#9673; CORE_AI</div>Procesando...';
  c.appendChild(ad);
  c.scrollTop = c.scrollHeight;
  document.getElementById('aiChat').classList.remove('min');

  var full = getNAVEResponse(q);
  var shown = '';
  var i = 0;
  var iv = setInterval(function() {
    shown += full.charAt(i);
    ad.innerHTML = '<div class="meta">&#9673; CORE_AI</div>' + shown.replace(/\n/g, '<br>');
    c.scrollTop = c.scrollHeight;
    i++;
    if (i >= full.length) {
      clearInterval(iv);
      saveChatHistory('user', q);
      saveChatHistory('assistant', full);
    }
  }, 12);
}

// ────────────────────────────────────────────────────────────────
// 11. TAROT ORACLE (22 arcanos — v6 REALISM)
// ────────────────────────────────────────────────────────────────
var tarotCards = [
  { name: 'EL MAGO', meaning: 'Manifestación, poder personal, nuevos comienzos. Tienes las herramientas — úsalas.' },
  { name: 'LA SACERDOTISA', meaning: 'Intuición, misterio, conocimiento oculto. Escucha lo que no se dice.' },
  { name: 'LA EMPERATRIZ', meaning: 'Abundancia, creatividad, naturaleza. Tu arte florece cuando te permites sentir.' },
  { name: 'EL EMPERADOR', meaning: 'Autoridad, estructura, estabilidad. Construye sobre cimientos sólidos.' },
  { name: 'EL SUMO SACERDOTE', meaning: 'Tradición, espiritualidad, enseñanza. Hay algo más grande que tú guiándote.' },
  { name: 'LOS ENAMORADOS', meaning: 'Elección, unión, armonía. El amor verdadero requiere vulnerabilidad.' },
  { name: 'EL CARRO', meaning: 'Determinación, triunfo, voluntad. El camino está claro — avanza.' },
  { name: 'LA FUERZA', meaning: 'Coraje, paciencia, compasión. La verdadera fuerza está en la ternura.' },
  { name: 'EL ERMITAÑO', meaning: 'Introspección, búsqueda interior, soledad productiva. Busca dentro.' },
  { name: 'LA RUEDA DE LA FORTUNA', meaning: 'Ciclos, destino, puntos de inflexión. Lo que sube, baja. Lo que baja, sube.' },
  { name: 'LA JUSTICIA', meaning: 'Equilibrio, verdad, consecuencias. Cada acción tiene su reacción.' },
  { name: 'EL COLGADO', meaning: 'Pausa, sacrificio, nueva perspectiva. A veces hay que soltar para recibir.' },
  { name: 'LA MUERTE', meaning: 'Transformación, fin de ciclo, renacimiento. No es el fin — es la metamorfosis.' },
  { name: 'LA TEMPLANZA', meaning: 'Paciencia, moderación, sanación. El equilibrio entre extremos.' },
  { name: 'EL DIABLO', meaning: 'Apego, ilusión, sombras. Reconoce tus cadenas para poder romperlas.' },
  { name: 'LA TORRE', meaning: 'Destrucción, revelación, cambio súbito. Lo que se derrumba era inestable.' },
  { name: 'LA ESTRELLA', meaning: 'Esperanza, inspiración, serenidad. Después de la tormenta, la luz.' },
  { name: 'LA LUNA', meaning: 'Ilusión, miedo, subconsciente. No todo es lo que parece. Confía en tu intuición.' },
  { name: 'EL SOL', meaning: 'Alegría, éxito, vitalidad. Tu momento ha llegado. Brilla sin miedo.' },
  { name: 'EL JUICIO', meaning: 'Despertar, renovación, llamado. Es hora de responder a tu propósito.' },
  { name: 'EL MUNDO', meaning: 'Completitud, logro, integración. Has recorrido el ciclo. Eres entero.' },
  { name: 'EL LOCO', meaning: 'Libertad, espontaneidad, fe. Da el salto — el universo te atrapa.' }
];

function drawTarot() {
  var result = document.getElementById('tarotResult');
  if (!result) return;
  var shuffled = tarotCards.slice().sort(function() { return Math.random() - 0.5; });
  var drawn = shuffled.slice(0, 3);
  var html = '<div style="color:var(--blood);margin-bottom:12px;font-size:14px">&#9675; TIRADA DE TRES CARTAS</div>';
  var positions = ['PASADO', 'PRESENTE', 'FUTURO'];
  for (var i = 0; i < 3; i++) {
    html += '<div style="margin-bottom:12px;padding:10px;background:rgba(255,0,60,0.05);border-left:2px solid var(--blood)">';
    html += '<div style="color:var(--blood);font-size:10px;letter-spacing:2px;margin-bottom:4px">' + positions[i] + '</div>';
    html += '<div style="color:#fff;font-weight:700;margin-bottom:4px">' + drawn[i].name + '</div>';
    html += '<div style="color:var(--txt-dim);font-size:11px">' + drawn[i].meaning + '</div>';
    html += '</div>';
  }
  html += '<div style="color:var(--green);font-size:10px;letter-spacing:1px;margin-top:8px">> Lectura completada. El patrón se revela.</div>';
  result.innerHTML = html;
}

// ────────────────────────────────────────────────────────────────
// 12. DREAM DECODER
// ────────────────────────────────────────────────────────────────
var dreamSymbols = {
  'agua': 'Emociones profundas. El agua representa tu inconsciente. Si está calmada, hay paz interior. Si está agitada, conflicto no resuelto.',
  'fuego': 'Pasión, transformación, destrucción creativa. El fuego purifica pero también consume. ¿Qué necesitas quemar?',
  'volar': 'Libertad, ambición, escape de limitaciones. Volar en sueños indica un deseo de trascender tu situación actual.',
  'caer': 'Miedo a perder el control, inseguridad. Caer es soltar — a veces es necesario para encontrar un nuevo suelo.',
  'oscuro': 'Lo desconocido, el inconsciente, las sombras. No tengas miedo — las sombras contienen tesoros ocultos.',
  'luz': 'Claridad, revelación, esperanza. La luz en tus sueños indica que estás encontrando respuestas.',
  'persona': 'Una representación de ti mismo o de una cualidad que necesitas integrar. ¿Quién es esa persona?',
  'casa': 'Tu mente, tu identidad. Cada habitación es un aspecto de ti. Las habitaciones cerradas guardan recuerdos.',
  'animal': 'Instintos, naturaleza primal. El animal representa una parte de ti que necesita expresión.',
  'muerte': 'Transformación, no literal. Algo en tu vida está cambiando fundamentalmente.',
  'lluvia': 'Purificación, lágrimas liberadoras, renovación. La lluvia limpia lo viejo para dar paso a lo nuevo.',
  'serpiente': 'Transformación, sanación, energía kundalini. La serpiente muda su piel — es hora de renovarte.',
  'judas': 'Traición o culpa internalizada. El arquetipo del traidor aparece cuando algo en ti se siente desleal a tu propia voz.',
  'llave': 'Acceso, poder, solución. La llave dorada en un sueño indica que la respuesta está a tu alcance — o que la buscas en el lugar equivocado.',
  'rojo': 'Pasión, sangre, urgencia. El rojo en el sueño es la firma de Belentani: lo que se siente, se canta.'
};

function decodeDream() {
  var inp = document.getElementById('dreamIn');
  var result = document.getElementById('dreamResult');
  if (!inp || !result) return;
  var dream = inp.value.toLowerCase();
  var interpretations = [];
  for (var symbol in dreamSymbols) {
    if (dream.indexOf(symbol) !== -1) {
      interpretations.push(dreamSymbols[symbol]);
    }
  }
  if (interpretations.length === 0) {
    interpretations.push('Tu sueño contiene símbolos únicos que el sistema está procesando. Intenta describir más elementos: agua, fuego, personas, animales, luz, oscuridad...');
  }
  var html = '<div style="color:var(--blood);margin-bottom:12px;font-size:14px">&#9675; ANÁLISIS ONÍRICO</div>';
  for (var i = 0; i < interpretations.length; i++) {
    html += '<div style="margin-bottom:8px;padding:8px;background:rgba(0,255,65,0.05);border-left:2px solid var(--green);color:var(--txt-dim);font-size:11px">' + interpretations[i] + '</div>';
  }
  html += '<div style="color:var(--green);font-size:10px;letter-spacing:1px;margin-top:8px">> Decodificación completada. Los símbolos revelan tu paisaje interior.</div>';
  result.innerHTML = html;
}

// ────────────────────────────────────────────────────────────────
// 13. SONG WRITER (4 géneros)
// ────────────────────────────────────────────────────────────────
var songTemplates = {
  darkpop: {
    title: 'NEON WOUNDS',
    structure: '[Verse 1]\nBajo la luz de neón rojo\nCaminé por tus venas de cristal\nCada palabra fue un cuchillo\nCada silencio, una señal\n\n[Chorus]\nHeridas de neón\nBrillan cuando te vas\nHeridas de neón\nNunca se van a sanar'
  },
  rnb: {
    title: 'SLOW BURN',
    structure: '[Verse 1]\nLento, como el humo de un cigarro\nTu voz se enreda en mi piel\nLento, como el tiempo después del llanto\nCuando el dolor se vuelve miel\n\n[Chorus]\nSlow burn, prendiendome despacio\nSlow burn, sin pedir permiso\nSlow burn, hasta quemar el alma\nSlow burn... es lo que haces conmigo'
  },
  electronic: {
    title: 'FREQUENCY 432',
    structure: '[Verse 1]\nFrecuencia 432 resonando\nEn las paredes de mi cerebro\nCada beat es un latido artificial\nCada drop es un suspiro verdadero\n\n[Chorus]\n432 Hz\nLa frecuencia que nos conecta\n432 Hz\nEl sonido que nos respeta'
  },
  ambient: {
    title: 'VOID SONG',
    structure: '[Ambient Layer 1]\n(silencio gradual)\n\n[Verse 1]\nEn el vacío hay un sonido\nQue nadie más puede escuchar\nEs el eco de lo que fuimos\nResonando sin parar\n\n[Outro]\n(void)\n(silencio)\n(permanencia)'
  }
};

function writeSong() {
  var genreSel = document.getElementById('songGenre');
  var genre = genreSel ? genreSel.value : 'darkpop';
  var template = songTemplates[genre];
  var result = document.getElementById('songResult');
  if (!result) return;
  var html = '<div style="color:var(--blood);margin-bottom:12px;font-size:14px">&#9675; SONG WRITER // ' + template.title + '</div>';
  html += '<div style="padding:12px;background:rgba(0,0,0,0.5);border:1px solid var(--glass-border);font-family:var(--fm);font-size:11px;color:var(--txt-dim);line-height:2;white-space:pre-wrap">' + template.structure + '</div>';
  html += '<div style="color:var(--green);font-size:10px;letter-spacing:1px;margin-top:8px">> Canción generada. Estilo: ' + genre.toUpperCase() + '. Editar libremente.</div>';
  result.innerHTML = html;
}

// ────────────────────────────────────────────────────────────────
// 14. IMAGE GEN (VISION FORGE) — Pollinations gratis, sin API key
// ────────────────────────────────────────────────────────────────
function aiImgGen() {
  var inp = document.getElementById('aiImgIn'), box = document.getElementById('aiImg'), p = inp.value.trim();
  if (!p) return;
  box.innerHTML = '<span style="font-family:var(--fm);font-size:10px;color:var(--blood)">&gt; FORJANDO EN FLUX...</span>';
  var url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent('belentani judas era, red neon cyberpunk, dark cinematic, ' + p) + '?width=400&height=300&nologo=true&seed=' + Math.floor(Math.random() * 10000);
  var img = new Image();
  img.src = url;
  img.style.cssText = 'width:100%;height:100%;object-fit:cover';
  img.onload = function() {
    box.innerHTML = '';
    box.appendChild(img);
  };
  img.onerror = function() {
    box.innerHTML = '<span style="font-family:var(--fm);font-size:10px;color:var(--blood)">&gt; ERROR EN LA FORJA.</span>';
  };
}

// ────────────────────────────────────────────────────────────────
// 15. VOZ (Web Speech API — opcional, sin backend)
// ────────────────────────────────────────────────────────────────
function initVoiceInput() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('Speech recognition not supported');
    return;
  }
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'es-ES';
  var voiceBtn = document.getElementById('voiceBtn');
  if (!voiceBtn) return;
  voiceBtn.addEventListener('click', function() {
    if (recognition.running) { recognition.stop(); voiceBtn.textContent = '&#127908;'; return; }
    recognition.start();
    voiceBtn.textContent = '&#128308;';
  });
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    var inp = document.getElementById('aiIn') || document.getElementById('chIn');
    if (inp) {
      inp.value = transcript;
      if (inp.id === 'aiIn') aiSend();
      else if (inp.id === 'chIn') chSend();
    }
    voiceBtn.textContent = '&#127908;';
  };
  recognition.onerror = function() { voiceBtn.textContent = '&#127908;'; };
  recognition.onend = function() { voiceBtn.textContent = '&#127908;'; };
}

document.addEventListener('DOMContentLoaded', function() {
  initVoiceInput();
  loadChatHistory();
});

// ────────────────────────────────────────────────────────────────
// 16. CORE_AI 300+ LOCAL TOOLS REGISTRY & EXECUTOR (SIN API)
// ────────────────────────────────────────────────────────────────
(function(){
  var categories = [
    'Frecuencias & Sonido', 'Psicología & Sombra', 'Lore Belentani & Judas',
    'Oráculo & Sueños', 'Música & Letras', 'Hacker & Matrix'
  ];

  var toolsList = [];

  // 1-50: FRECUENCIAS & SONIDO (Solfeggio, Tone.js, Binaural)
  var freqs = [432, 528, 639, 741, 852, 963, 174, 285, 396, 417];
  var freqNames = ['Armonía Coherente', 'Reparación ADN', 'Conexión Emocional', 'Expresión Pura', 'Intuición Superior', 'Despertar Cuántico', 'Anestesia Natural', 'Regeneración Celular', 'Liberación de Culpabilidad', 'Deshacer Trauma'];
  for(var i=0; i<50; i++){
    var f = freqs[i % freqs.length] + Math.floor(i/freqs.length)*10;
    var fn = freqNames[i % freqNames.length] + (i >= freqs.length ? ' Nivel ' + (Math.floor(i/freqs.length)+1) : '');
    toolsList.push({
      id: 'tool_' + (i+1),
      num: i+1,
      cat: 'Frecuencias & Sonido',
      title: 'Resonancia ' + f + 'Hz — ' + fn,
      desc: 'Genera una onda sinusodal purificada en ' + f + 'Hz conmodulación binaural.',
      run: (function(freqVal, fName){
        return function(){
          if(typeof playSolfeggio === 'function') playSolfeggio(freqVal);
          return '> FRECUENCIA ' + freqVal + 'Hz ACTIVADA: ' + fName + ' // Oscilador local activo.';
        };
      })(f, fn)
    });
  }

  // 51-100: PSICOLOGÍA & SOMBRA
  var psyTopics = [
    'Detector DARVO', 'Defensa del Observador', 'Transmutación del Trauma', 'Escudo Antinarcicismo', 'Matriz de Estilos de Apego',
    'Escaneo de Proyección de Sombra', 'Desensibilización de Disociación', 'Análisis de Triángulo Dramático', 'Protocolo de Resiliencia Radical', 'Diferenciación del Yo',
    'Verificación de Coherencia Emocional', 'Extracción de Ganancia Secundaria', 'Límites de Acero Inoxidable', 'Desactivación de Gaslighting', 'Anclaje Somático 1.94m',
    'Desarmador de Agresión Pasiva', 'Despliegue del Ángel Interior', 'Integración del Guerrero Coherente', 'Purga de Culpa Transgeneracional', 'Foco de Agencia Intacta'
  ];
  for(var i=50; i<100; i++){
    var title = psyTopics[(i-50) % psyTopics.length] + (i>=70 ? ' V2' : '');
    toolsList.push({
      id: 'tool_' + (i+1),
      num: i+1,
      cat: 'Psicología & Sombra',
      title: title,
      desc: 'Análisis psico-arquetípico sin juicios sobre el patrón de sombra ' + title + '.',
      run: (function(tName){
        return function(inputVal){
          var query = inputVal || 'estado actual';
          return '> [PSICOLOGÍA & SOMBRA // ' + tName.toUpperCase() + ']\n> INPUT: "' + query + '"\n> DIAGNÓSTICO: Patron identificado. La herida no define el núcleo; la transmutación la convierte en arquitectura.\n> ACCIÓN: Registra sin reaccionar. El observador mantiene la agencia intacta.';
        };
      })(title)
    });
  }

  // 101-150: LORE BELENTANI & JUDAS
  var loreTopics = [
    'Capítulo 01: El Entre', 'Capítulo 02: La Deuda', 'Capítulo 03: El Robo de la Llave', 'Capítulo 04: El Canto Final', 'Capítulo 05: La Mentira Compartida',
    'Firma 1/5: PEDRO (La Roca)', 'Firma 2/5: MARCOS (El Cronista)', 'Firma 3/5: SANTOS (La Antena)', 'Firma 4/5: BELENTANI (El Artefacto)', 'Firma 5/5: THE HUMAN (La Interfaz)',
    'La Dimensión ZION', 'El Efecto Belentani', 'La Llave Dorada', 'El Enjambre Neural', 'El Beso de Judas'
  ];
  for(var i=100; i<150; i++){
    var title = loreTopics[(i-100) % loreTopics.length] + (i>=115 ? ' ARCHIVE #' + (i-99) : '');
    toolsList.push({
      id: 'tool_' + (i+1),
      num: i+1,
      cat: 'Lore Belentani & Judas',
      title: title,
      desc: 'Extracción directa de los registros akáshicos del archivo neural de Judas Era.',
      run: (function(tName){
        return function(){
          return '> [REGISTRO NEURAL // ' + tName.toUpperCase() + ']\n> "' + tName + ' en el ecosistema Belentani no representa la derrota; representa el nacimiento del artista absoluto."';
        };
      })(title)
    });
  }

  // 151-200: ORÁCULO & SUEÑOS
  var oracleCards = ['El Mago del Neón', 'La Sacerdotisa de Cristal', 'La Emperatriz del Desierto', 'El Emperador del Void', 'El Sumo Sacerdote 432Hz', 'Los Amantes de Zion', 'El Carro de la Nave', 'La Fuerza del Artefacto', 'El Ermitaño del Estudio', 'La Rueda de la Transmutación'];
  for(var i=150; i<200; i++){
    var title = 'Oráculo: ' + oracleCards[(i-150) % oracleCards.length] + (i>=160 ? ' #' + (i-149) : '');
    toolsList.push({
      id: 'tool_' + (i+1),
      num: i+1,
      cat: 'Oráculo & Sueños',
      title: title,
      desc: 'Consulta la carta del oráculo digital y revela el presagio del día.',
      run: (function(tName){
        return function(){
          return '> [ORÁCULO DIGTAL // ' + tName.toUpperCase() + ']\n> CARTA REVELADA: ' + tName + '\n> SIGNIFICADO: "La respuesta que buscas ya está codificada en tu propia voz."';
        };
      })(title)
    });
  }

  // 201-250: MÚSICA & LETRAS
  var songStyles = ['Dark Pop Visceral', 'R&B Industrial', 'Soul Electrónico', 'Ambient 432Hz', 'Trap Melancólico', 'Synthwave Sangre', 'Gothic R&B', 'Cyber Acoustic'];
  for(var i=200; i<250; i++){
    var title = 'Estilo ' + songStyles[(i-200) % songStyles.length] + ' #' + (i-199);
    toolsList.push({
      id: 'tool_' + (i+1),
      num: i+1,
      cat: 'Música & Letras',
      title: title,
      desc: 'Sintetizador de estructuras líricas y progresiones armónicas estilo Belentani.',
      run: (function(tName){
        return function(topicVal){
          var topic = topicVal || 'la victoria amarga';
          return '> [LYRIC FORGE // ' + tName.toUpperCase() + ']\n> TEMA: ' + topic + '\n\n[VERSE]\nLuz de neón roja sobre el cristal roto\nLlevo mil nombres pero ninguno me hace falta...\n\n[CHORUS]\nRecuperaremos la llave / O cambiaremos la cerradura\nMi voz es el código / Mi dolor la cura.';
        };
      })(title)
    });
  }

  // 251-300+: HACKER & MATRIX
  var hackerTools = [
    'Calculadora de Refracción de Diamante', 'Generador de Shaders 21st.dev', 'Inyector de Glitch CSS', 'Limpiador de Cache Neural',
    'Optimizador de Prompts 8K', 'Simulador de Lluvia Matrix Blood', 'Convertidor a Código Hexadecimal', 'Verificador de PWA Offline',
    'Audit de Seguridad MITM', 'Exportador de Registro Neural .TXT'
  ];
  for(var i=250; i<300; i++){
    var title = hackerTools[(i-250) % hackerTools.length] + ' #' + (i-249);
    toolsList.push({
      id: 'tool_' + (i+1),
      num: i+1,
      cat: 'Hacker & Matrix',
      title: title,
      desc: 'Herramienta técnica de terminal hacker para personalizar la experiencia visual.',
      run: (function(tName){
        return function(){
          return '> [HACKER TERMINAL // ' + tName.toUpperCase() + ']\n> STATUS: EJECUTADO CON ÉXITO\n> PARAMETROS RECONFIGURADOS EN EL CORE_AI.';
        };
      })(title)
    });
  }

  window.CORE_AI_300_REGISTRY = toolsList;

  window.executeAITool300 = function(toolId, inputVal){
    var tool = toolsList.filter(function(t){ return t.id === toolId || t.num === parseInt(toolId); })[0];
    if(!tool) return '> TOOL NO ENCONTRADA. ESPECIFICA UN ID DEL 1 AL 300.';
    return tool.run(inputVal);
  };
})();
