(()=>{
  'use strict';
  const overlay=document.getElementById('projectionOverlay');
  const stage=document.getElementById('projectionStage');
  const source=document.getElementById('timetableContent');
  const projectBtn=document.getElementById('projectTimetableBtn');
  const closeBtn=document.getElementById('projectionCloseBtn');
  const fullBtn=document.getElementById('projectionFullscreenBtn');
  const title=document.getElementById('projectionTitle');
  let placeholder=null;

  const dayName=()=>['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'][new Date().getDay()];
  function highlightToday(root){
    const today=dayName();
    root.querySelectorAll('th,td,h2,h3,h4,.day-title,.detail-day').forEach(el=>{
      if((el.textContent||'').trim().toLowerCase().startsWith(today)) el.classList.add('is-current-day');
    });
  }
  function openProjection(){
    if(!source||!overlay||!stage)return;
    placeholder=document.createComment('timetable-content-placeholder');
    source.parentNode.insertBefore(placeholder,source);
    stage.appendChild(source);
    highlightToday(source);
    const visibleTitle=source.querySelector('h2,h3');
    if(title) title.textContent=visibleTitle?.textContent?.trim()||'Emploi du temps CE2';
    overlay.classList.remove('hidden');overlay.setAttribute('aria-hidden','false');document.body.classList.add('projection-active');
    setTimeout(()=>fullBtn?.focus(),20);
  }
  function closeProjection(){
    if(placeholder?.parentNode){placeholder.parentNode.insertBefore(source,placeholder);placeholder.remove();}
    source?.querySelectorAll('.is-current-day').forEach(el=>el.classList.remove('is-current-day'));
    overlay.classList.add('hidden');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('projection-active');
    if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
    projectBtn?.focus();
  }
  async function fullscreen(){
    try{if(!document.fullscreenElement) await overlay.requestFullscreen(); else await document.exitFullscreen();}catch(e){console.warn('Plein écran indisponible',e);}
  }
  projectBtn?.addEventListener('click',openProjection);
  closeBtn?.addEventListener('click',closeProjection);
  fullBtn?.addEventListener('click',fullscreen);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.classList.contains('hidden'))closeProjection();});
  document.addEventListener('fullscreenchange',()=>{if(fullBtn)fullBtn.textContent=document.fullscreenElement?'▣ Quitter le plein écran':'⛶ Plein écran';});
})();
