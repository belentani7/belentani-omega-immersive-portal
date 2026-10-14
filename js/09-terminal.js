
// TERMINAL MODULE — Plan 400 Pasos (281-300)
(function(){
  var term=document.getElementById('term');
  var inp=document.getElementById('termIn');
  if(!term||!inp)return;

  // Command history
  var history=JSON.parse(localStorage.getItem('term_history')||'[]');
  var histIdx=-1;

  // Known commands for tab completion
  var knownCmds=['help','clear','sysinfo','neofetch','matrix','export','color','rock','chronicle','antenna','artifact','interface','status','reset','omega','belentani free','432','528','639','741','852'];

  // Colored output: color map per command type
  var cmdColors={
    rock:'#ff6b6b',chronicle:'#ffd93d',antenna:'#6bcb77',artifact:'#4d96ff',interface:'#ff6ec7',
    status:'#ffd93d',omega:'#c9b1ff','belentani free':'#00ffcc',
    '432':'#ff6b6b','528':'#6bcb77','639':'#ffd93d','741':'#ff6ec7','852':'#4d96ff',
    neofetch:'#00ffcc',sysinfo:'#4d96ff',matrix:'#c9b1ff',export:'#ffd93d',color:'#ff6ec7',
    help:'#a0a0a0',clear:'#a0a0a0',reset:'#ff6b6b'
  };
  var defaultColor='var(--blood)';

  // ESC to close terminal
  document.addEventListener('keydown',function(e){
    if(e.key==='`'){
      e.preventDefault();
      term.classList.toggle('on');
      if(term.classList.contains('on'))inp.focus();
    }
    if(e.key==='Escape'&&term.classList.contains('on')){
      term.classList.remove('on');
    }
    // Up/Down command history
    if(term.classList.contains('on')){
      if(e.key==='ArrowUp'){
        e.preventDefault();
        if(histIdx<history.length-1){histIdx++;inp.value=history[histIdx]||''}
      }
      if(e.key==='ArrowDown'){
        e.preventDefault();
        if(histIdx>0){histIdx--;inp.value=history[histIdx]||''}else{histIdx=-1;inp.value=''}
      }
      // Tab completion
      if(e.key==='Tab'){
        e.preventDefault();
        var v=inp.value.trim().toLowerCase();
        if(v){
          var match=knownCmds.filter(function(c){return c.indexOf(v)===0});
          if(match.length===1){inp.value=match[0]}
          else if(match.length>1){
            appendLine(match.join('  '),null,'#a0a0a0');
          }
        }
      }
    }
  });

  // Smooth clear: lines fade out before clearing
  function smoothClear(){
    var lines=term.querySelectorAll('.tline');
    if(!lines.length){term.innerHTML='<div class="tline" style="color:var(--blood)">&gt; Terminal purgada.</div>';return}
    lines.forEach(function(l,i){l.style.transition='opacity 0.3s ease '+(i*0.03)+'s';l.style.opacity='0'});
    setTimeout(function(){term.innerHTML='<div class="tline" style="color:var(--blood)">&gt; Terminal purgada.</div>'},lines.length*30+350);
  }

  function appendLine(text,color){
    var d=document.createElement('div');
    d.className='tline';
    d.style.color=color||defaultColor;
    d.textContent='> '+text;
    term.appendChild(d);
  }

  // sysinfo command
  function sysinfo(){
    var lines=[
      '═══ SYSINFO ═══',
      'Browser: '+(navigator.userAgent.split(') ').pop()||navigator.userAgent),
      'Platform: '+navigator.platform,
      'Language: '+navigator.language,
      'Screen: '+screen.width+'x'+screen.height+' ('+screen.colorDepth+'bit)',
      'Viewport: '+window.innerWidth+'x'+window.innerHeight,
      'Memory: '+(navigator.deviceMemory||'?')+' GB',
      'Cores: '+(navigator.hardwareConcurrency||'?'),
      'Uptime: '+((performance.now()/1000/60).toFixed(1))+' min',
      'Cookies: '+(navigator.cookieEnabled?'On':'Off'),
      'Online: '+(navigator.onLine?'Yes':'No'),
      '════════════════'
    ];
    lines.forEach(function(l){appendLine(l,'#4d96ff')});
  }

  // neofetch command
  function neofetch(){
    var lines=[
      '        .--.        ',
      '       |o_o |       ',
      '       |:_/ |       ',
      '      //   \\ \\      ',
      '     (|     | )     ',
      '    /\'\\_   _/`\\    ',
      '    \\___)=(___/    ',
      '──────────────────',
      '  OS: Belentani Ω v13',
      '  Browser: '+navigator.userAgent.split(') ').pop(),
      '  Screen: '+screen.width+'x'+screen.height,
      '  Memory: '+(navigator.deviceMemory||'?')+' GB',
      '  Cores: '+(navigator.hardwareConcurrency||'?'),
      '  Freq: 432 Hz',
      '  Status: ◉ ACTIVE',
      '──────────────────'
    ];
    lines.forEach(function(l,i){
      var color=i<7?'#00ffcc':'#c9b1ff';
      appendLine(l,color);
    });
  }

  // matrix toggle
  var matrixOn=false;
  function toggleMatrix(){
    var mx=document.querySelector('.matrix-rain')||document.querySelector('#matrixCanvas');
    if(!mx){appendLine('Matrix rain no disponible.',null,'#ffd93d');return}
    matrixOn=!matrixOn;
    mx.style.opacity=matrixOn?'0.15':'0.05';
    appendLine('Matrix rain: '+(matrixOn?'ON (0.15)':'OFF (0.05)'),null,'#c9b1ff');
  }

  // export terminal log
  function exportLog(){
    var lines=term.querySelectorAll('.tline');
    var txt='';
    lines.forEach(function(l){txt+=l.textContent+'\n'});
    var blob=new Blob([txt],{type:'text/plain'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='belentani-terminal-'+Date.now()+'.txt';
    a.click();
    appendLine('Log exportado como '+a.download,null,'#ffd93d');
  }

  // Main command handler
  window.termCmd=function(){
    var t=inp.value.trim();
    if(!t)return;

    // Save to history
    if(history.length===0||history[history.length-1]!==t){
      history.push(t);
      if(history.length>50)history.shift();
      localStorage.setItem('term_history',JSON.stringify(history));
    }
    histIdx=-1;

    var cmd=t.split(' ')[0].toLowerCase();
    var arg=t.split(' ').slice(1).join(' ');
    var color=cmdColors[cmd]||defaultColor;
    appendLine(t,'#ff6b6b');

    var secret=trySecret(t);
    if(secret){appendLine(secret,null,color)}
    else if(cmd==='help'){
      appendLine('COMANDOS: rock|chronicle|antenna|artifact|interface',null,color);
      appendLine('432|528|639|741|852 · omega · belentani free',null,color);
      appendLine('status · reset · clear · sysinfo · neofetch',null,color);
      appendLine('matrix · export · color [hex]',null,color);
    }
    else if(cmd==='clear'){smoothClear()}
    else if(cmd==='sysinfo'){sysinfo()}
    else if(cmd==='neofetch'){neofetch()}
    else if(cmd==='matrix'){toggleMatrix()}
    else if(cmd==='export'){exportLog()}
    else if(cmd==='color'){
      if(arg&&/^#?[0-9a-fA-F]{3,8}$/.test(arg)){
        var hex=arg.charAt(0)==='#'?arg:'#'+arg;
        term.style.setProperty('--term-color',hex);
        appendLine('Terminal color cambiado a '+hex,null,hex);
      }else{
        appendLine('Uso: color #hex (ej: color #00ffcc)',null,'#ffd93d');
      }
    }
    else{
      appendLine('Comando no reconocido. Escribe help.',null,'#a0a0a0');
    }
    inp.value='';
    term.scrollTop=term.scrollHeight;
  };

  // Enter key handler
  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'){window.termCmd()}
  });
})();
