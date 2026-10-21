(function(){
  var MAIL='a.nabilnassor@gmail.com',LI='https://www.linkedin.com/in/nabil-nassor-884708237/',SECS=12;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var el=document.createElement('div');el.className='outro';el.setAttribute('role','dialog');el.setAttribute('aria-label','Get in touch');el.setAttribute('aria-hidden','true');
  el.innerHTML='<button class="o-x" type="button" aria-label="Close">'+
    '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg></button>'+
    '<div class="o-float" aria-hidden="true"><img class="o-art" src="img/outro-net.webp" alt=""></div>'+
    '<div class="o-body"><h2 class="o-h" aria-label="Fish caught on the net">'+
    '<span class="w w-fish" aria-hidden="true"><i>f</i><i>i</i><i>s</i><i>h</i></span> '+
    '<span class="w w-caught" aria-hidden="true"><i>c</i><i>a</i><i>u</i><i>g</i><i>h</i><i>t</i></span><br>'+
    '<span class="w w-on" aria-hidden="true">on the</span> <span class="w w-net" aria-hidden="true">net</span>'+
    '<svg class="o-fish" viewBox="0 0 64 32" aria-hidden="true"><path d="M2 16C12 4 30 3 44 14l16-10v24L44 18C30 29 12 28 2 16z" fill="currentColor"/><circle cx="14" cy="14" r="1.8" fill="#f4f2ec"/></svg></h2>'+
    '<p class="o-p">Let\u2019s not part ways here, let\u2019s stay in touch.</p>'+
    '<div class="o-links"><a class="o-mail" href="mailto:'+MAIL+'">'+MAIL+'</a><a href="'+LI+'" target="_blank" rel="noopener">LinkedIn</a></div></div>'+
    '<p class="o-count" aria-live="off">Closing in <span class="o-n">'+SECS+'</span>s</p>'+
    '<span class="o-bar"><i></i></span>';
  document.body.appendChild(el);
  try{var fl=document.createElement('link');fl.rel='stylesheet';fl.href='https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,400;1,9..144,700&family=Caveat:wght@600&display=swap';document.head.appendChild(fl)}catch(e){}
  var n=el.querySelector('.o-n'),bar=el.querySelector('.o-bar i'),open=false,armed=true,timer=0,t0=0,hold=0,prevFocus=null,scrolled=false;

  function atEnd(){var d=document.documentElement;return window.scrollY+window.innerHeight>=d.scrollHeight-3}
  function tickCount(){
    var left=Math.max(0,SECS-(performance.now()-t0)/1000);
    n.textContent=Math.ceil(left);
    bar.style.transform='scaleX('+(left/SECS).toFixed(4)+')';
    if(left<=0){close();return}
    timer=setTimeout(tickCount,80);
  }
  function show(){
    if(open)return;open=true;armed=false;prevFocus=document.activeElement;
    el.classList.add('on');el.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('outro-open');
    t0=performance.now();clearTimeout(timer);tickCount();
    setTimeout(function(){var x=el.querySelector('.o-x');if(x)x.focus({preventScroll:true})},50);
  }
  function close(){
    if(!open)return;open=false;clearTimeout(timer);
    el.classList.remove('on');el.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('outro-open');
    if(prevFocus&&prevFocus.focus)try{prevFocus.focus({preventScroll:true})}catch(e){}
  }
  el.querySelector('.o-x').addEventListener('click',close);
  el.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;el.style.setProperty('--px',(e.clientX/window.innerWidth-.5).toFixed(3));el.style.setProperty('--py',(e.clientY/window.innerHeight-.5).toFixed(3))},{passive:true});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  /* tap on the faded page behind (outside the content) also closes */
  el.addEventListener('click',function(e){if(e.target===el)close()});
  /* pause the countdown while the person hovers the content */
  el.querySelector('.o-body').addEventListener('mouseenter',function(){if(open&&!el._paused){clearTimeout(timer);el._paused=performance.now()}});
  el.querySelector('.o-body').addEventListener('mouseleave',function(){if(open&&el._paused){t0+=performance.now()-el._paused;el._paused=0;tickCount()}});

  function check(){
    var d=document.documentElement;
    if(window.scrollY>8)scrolled=true;
    if(!scrolled||d.scrollHeight<window.innerHeight+8)return; /* only after the visitor has scrolled, and only on pages that scroll */
    if(open)return;
    if(atEnd()){
      if(armed&&!hold)hold=setTimeout(function(){hold=0;if(atEnd()&&armed)show()},450);
    }else{
      if(hold){clearTimeout(hold);hold=0}
      if(window.scrollY+window.innerHeight<d.scrollHeight-260)armed=true;
    }
  }
  window.addEventListener('scroll',check,{passive:true});
  window.addEventListener('resize',check);
  window.addEventListener('wheel',check,{passive:true});
  window.addEventListener('touchend',function(){setTimeout(check,60)},{passive:true});
})();
