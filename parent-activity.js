// V35.23 — Popup Activité Espace Parents
(function(){
  'use strict';
  const ENDPOINT='https://script.google.com/macros/s/AKfycby5ZFxvBE-o7oO4Xc4mTZ7iQ5XjYe1_qiSsLnvEUxcR0ULsYtNQV41FgsLTaFA1PRmNLQ/exec';
  const modal=document.getElementById('parentActivityModal');
  const btn=document.getElementById('parentActivityBtn');
  const closeBtn=document.getElementById('parentActivityClose');
  const status=document.getElementById('parentActivityStatus');
  const today=document.getElementById('parentActivityToday');
  const week=document.getElementById('parentActivityWeek');
  let hoverTimer=null;
  let loadedAt=0;
  let lastFocus=null;

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function bars(id,items){
    const el=document.getElementById(id); if(!el)return;
    const rows=Array.isArray(items)?items:[];
    if(!rows.length){el.innerHTML='<div class="parent-activity-empty">Pas encore de données.</div>';return;}
    const max=Math.max(...rows.map(x=>Number(x.count)||0),1);
    el.innerHTML=rows.map(x=>{const n=Number(x.count)||0;const w=Math.max(4,Math.round(n/max*100));return `<div class="parent-activity-bar"><span class="parent-activity-bar-label" title="${esc(x.label)}">${esc(x.label)}</span><span class="parent-activity-track"><span class="parent-activity-fill" style="width:${w}%"></span></span><span class="parent-activity-count">${n}</span></div>`;}).join('');
  }
  async function loadStats(force=false){
    if(!status)return;
    if(!force && Date.now()-loadedAt<60000)return;
    status.classList.remove('is-error');status.textContent='Actualisation des statistiques…';
    try{
      const r=await fetch(ENDPOINT+'?mode=stats&t='+Date.now(),{cache:'no-store'});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const data=await r.json(); if(!data||data.ok!==true)throw new Error(data?.error||'Réponse invalide');
      today.textContent=Number(data.today||0);week.textContent=Number(data.sevenDays||0);
      bars('parentActivityPages',data.pages);bars('parentActivityLanguages',data.languages);bars('parentActivityDevices',data.devices);bars('parentActivityHours',data.hours);
      loadedAt=Date.now(); status.textContent='Données actualisées à '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})+'.';
    }catch(err){status.textContent='Statistiques indisponibles pour le moment. Vérifie le déploiement Apps Script.';status.classList.add('is-error');console.warn('[ParentActivity]',err);}
  }
  function open(){if(!modal)return;clearTimeout(hoverTimer);lastFocus=document.activeElement;modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeBtn?.focus({preventScroll:true});loadStats(false);}
  function close(){if(!modal)return;modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus?.({preventScroll:true});}
  btn?.addEventListener('click',open);
  btn?.addEventListener('mouseenter',()=>{clearTimeout(hoverTimer);hoverTimer=setTimeout(open,450);});
  btn?.addEventListener('mouseleave',()=>clearTimeout(hoverTimer));
  closeBtn?.addEventListener('click',close);
  modal?.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal?.classList.contains('hidden'))close();});
  document.getElementById('parentActivityRefresh')?.addEventListener('click',()=>loadStats(true));
  window.openParentActivity=open;
})();
