// V35.26 — badge ancré directement sur l'image du hibou
(function(){
  'use strict';

  const ENDPOINT='https://script.google.com/macros/s/AKfycby5ZFxvBE-o7oO4Xc4mTZ7iQ5XjYe1_qiSsLnvEUxcR0ULsYtNQV41FgsLTaFA1PRmNLQ/exec';
  const SEEN_KEY='parentActivityLastSeenTotalV1';
  const POLL_MS=60*1000;

  const modal=document.getElementById('parentActivityModal');
  const btn=document.getElementById('parentActivityBtn');
  const closeBtn=document.getElementById('parentActivityClose');
  const status=document.getElementById('parentActivityStatus');
  const today=document.getElementById('parentActivityToday');
  const week=document.getElementById('parentActivityWeek');

  let loadedAt=0;
  let lastFocus=null;
  let latestTotal=null;
  let pollTimer=null;

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function ensureBadge(){
    if(!btn)return null;
    const anchor=btn.querySelector('.parent-activity-icon-wrap') || btn;
    let badge=anchor.querySelector('.parent-activity-badge');
    if(!badge){
      badge=document.createElement('span');
      badge.className='parent-activity-badge';
      badge.setAttribute('aria-label','');
      badge.hidden=true;
      anchor.appendChild(badge);
    }
    return badge;
  }

  function getSeenTotal(){
    try{
      const raw=localStorage.getItem(SEEN_KEY);
      if(raw===null)return null;
      const n=Number(raw);
      return Number.isFinite(n)&&n>=0?n:null;
    }catch(e){return null;}
  }

  function setSeenTotal(n){
    try{localStorage.setItem(SEEN_KEY,String(Math.max(0,Number(n)||0)));}catch(e){}
  }

  function updateBadge(total){
    const badge=ensureBadge();
    if(!badge)return;

    total=Math.max(0,Number(total)||0);
    latestTotal=total;

    let seen=getSeenTotal();

    // Premiere utilisation : on ne considere pas tout l'historique comme nouveau.
    if(seen===null){
      setSeenTotal(total);
      seen=total;
    }

    const diff=Math.max(0,total-seen);
    if(diff<=0){
      badge.hidden=true;
      badge.textContent='';
      badge.setAttribute('aria-label','');
      return;
    }

    badge.hidden=false;
    badge.textContent=diff>99?'99+':String(diff);
    badge.setAttribute('aria-label',diff+' nouvelle'+(diff>1?'s':'')+' visite'+(diff>1?'s':''));
  }

  function markAllSeen(){
    if(latestTotal===null)return;
    setSeenTotal(latestTotal);
    updateBadge(latestTotal);
  }

  function bars(id,items){
    const el=document.getElementById(id); if(!el)return;
    const rows=Array.isArray(items)?items:[];
    if(!rows.length){el.innerHTML='<div class="parent-activity-empty">Pas encore de données.</div>';return;}
    const max=Math.max(...rows.map(x=>Number(x.count)||0),1);
    el.innerHTML=rows.map(x=>{
      const n=Number(x.count)||0;
      const w=Math.max(4,Math.round(n/max*100));
      return `<div class="parent-activity-bar"><span class="parent-activity-bar-label" title="${esc(x.label)}">${esc(x.label)}</span><span class="parent-activity-track"><span class="parent-activity-fill" style="width:${w}%"></span></span><span class="parent-activity-count">${n}</span></div>`;
    }).join('');
  }

  async function fetchStats(render){
    const r=await fetch(ENDPOINT+'?mode=stats&t='+Date.now(),{cache:'no-store'});
    if(!r.ok)throw new Error('HTTP '+r.status);
    const data=await r.json();
    if(!data||data.ok!==true)throw new Error(data?.error||'Réponse invalide');

    updateBadge(data.totalVisits||0);

    if(render){
      today.textContent=Number(data.today||0);
      week.textContent=Number(data.sevenDays||0);
      bars('parentActivityPages',data.pages);
      bars('parentActivityLanguages',data.languages);
      bars('parentActivityDevices',data.devices);
      bars('parentActivityHours',data.hours);
      loadedAt=Date.now();
      status.classList.remove('is-error');
      status.textContent='Données actualisées à '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})+'.';
    }
    return data;
  }

  async function loadStats(force=false){
    if(!status)return;
    if(!force && Date.now()-loadedAt<60000){
      markAllSeen();
      return;
    }
    status.classList.remove('is-error');
    status.textContent='Actualisation des statistiques…';
    try{
      await fetchStats(true);
      markAllSeen();
    }catch(err){
      status.textContent='Statistiques indisponibles pour le moment. Vérifie le déploiement Apps Script.';
      status.classList.add('is-error');
      console.warn('[ParentActivity]',err);
    }
  }

  async function pollBadge(){
    try{
      // Si la popup est ouverte, son rafraichissement gere deja les compteurs.
      if(modal && !modal.classList.contains('hidden'))return;
      await fetchStats(false);
    }catch(err){
      console.warn('[ParentActivity badge]',err);
    }
  }

  function open(){
    if(!modal)return;
    lastFocus=document.activeElement;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    closeBtn?.focus({preventScroll:true});
    loadStats(false);
  }

  function close(){
    if(!modal)return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    lastFocus?.focus?.({preventScroll:true});
  }

  // V35.24 : ouverture UNIQUEMENT au clic.
  btn?.addEventListener('click',open);

  closeBtn?.addEventListener('click',close);
  modal?.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal?.classList.contains('hidden'))close();});
  document.getElementById('parentActivityRefresh')?.addEventListener('click',()=>loadStats(true));

  ensureBadge();

  // Premier controle discret, puis actualisation automatique du badge.
  setTimeout(pollBadge,1200);
  pollTimer=setInterval(pollBadge,POLL_MS);

  window.openParentActivity=open;
})();
