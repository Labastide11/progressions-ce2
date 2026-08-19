(function(){
  'use strict';
  const ROSTER_KEY='progressions_ce2_classe_meta_v1';
  const HISTORY_KEY='progressions_ce2_random_history_v1';
  const $=id=>document.getElementById(id);
  const openBtn=$('openRandomStudentBtn');
  const modal=$('randomStudentModal');
  const closeBtn=$('closeRandomStudentBtn');
  const drawBtn=$('drawRandomStudentBtn');
  const againBtn=$('drawAnotherStudentBtn');
  const validateBtn=$('validateRandomStudentBtn');
  const resetBtn=$('resetRandomStudentHistoryBtn');
  const result=$('randomStudentResult');
  const historyList=$('randomStudentHistoryList');
  const historyCount=$('randomStudentHistoryCount');
  if(!openBtn||!modal||!closeBtn||!drawBtn||!againBtn||!validateBtn||!resetBtn||!result||!historyList||!historyCount)return;

  let selectedStudent=null;
  const norm=v=>String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today=()=>{
    const d=new Date();
    return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
  };
  const readJson=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'')||fallback;}catch(e){return fallback;}};
  const portraitFor=sexe=>{
    const value=norm(sexe);
    if(['fille','feminin','female','f'].includes(value)||value.startsWith('fill')||value.startsWith('femin'))return 'assets/portraits/portrait_fille.png';
    if(['garcon','masculin','male','m','g'].includes(value)||value.startsWith('garc')||value.startsWith('mascul'))return 'assets/portraits/portrait_garcon.png';
    return 'assets/portraits/portrait_neutre.png';
  };
  function students(){
    const apiRows=window.ProgressionsRoster?.getMeta?.();
    const local=readJson(ROSTER_KEY,{});
    const rows=Array.isArray(apiRows)&&apiRows.length?apiRows:Object.values(local||{});
    return rows.filter(r=>r&&r.prenom).sort((a,b)=>String(a.prenom).localeCompare(String(b.prenom),'fr',{sensitivity:'base'})||String(a.nom||'').localeCompare(String(b.nom||''),'fr',{sensitivity:'base'}));
  }
  function keyFor(s){return [s.prenom,s.nom].map(norm).join('|');}
  function displayName(s){return [s.prenom,String(s.nom||'').toUpperCase()].filter(Boolean).join(' ');}
  function loadHistory(){
    const data=readJson(HISTORY_KEY,{date:today(),items:[]});
    if(!data||data.date!==today()||!Array.isArray(data.items))return {date:today(),items:[]};
    return data;
  }
  function saveHistory(data){localStorage.setItem(HISTORY_KEY,JSON.stringify(data));}
  function renderHistory(){
    const rows=students();
    const data=loadHistory();
    const validKeys=new Set(rows.map(keyFor));
    data.items=data.items.filter(item=>item&&validKeys.has(item.key));
    saveHistory(data);
    historyCount.textContent=`${data.items.length} / ${rows.length}`;
    if(!data.items.length){
      historyList.innerHTML='<p class="random-student-history__empty">Aucun passage validé.</p>';
      return;
    }
    historyList.innerHTML=data.items.map((item,index)=>`<div class="random-student-history__item">
      <span class="random-student-history__number">${index+1}</span>
      <span class="random-student-history__name">${esc(item.name)}</span>
      <button type="button" class="random-student-history__remove" data-history-key="${esc(item.key)}" aria-label="Retirer ${esc(item.name)} de l’historique">×</button>
    </div>`).join('');
  }
  function setPlaceholder(message){
    selectedStudent=null;
    result.innerHTML=`<div class="random-student-placeholder">${esc(message)}</div>`;
    validateBtn.classList.add('hidden');
    againBtn.classList.add('hidden');
    drawBtn.classList.remove('hidden');
  }
  function choose(){
    const rows=students();
    if(!rows.length){setPlaceholder('Aucun élève disponible. Actualise d’abord la liste de la classe.');return;}
    const history=loadHistory();
    const passed=new Set(history.items.map(item=>item.key));
    let pool=rows.filter(s=>!passed.has(keyFor(s)));
    if(!pool.length){
      result.innerHTML='<div class="random-student-complete"><strong>🎉 Toute la classe est passée aujourd’hui !</strong><span>Réinitialise la journée pour commencer un nouveau tour.</span></div>';
      selectedStudent=null;
      drawBtn.classList.add('hidden');
      validateBtn.classList.add('hidden');
      againBtn.classList.add('hidden');
      return;
    }
    if(selectedStudent&&pool.length>1){
      const withoutCurrent=pool.filter(s=>keyFor(s)!==keyFor(selectedStudent));
      if(withoutCurrent.length)pool=withoutCurrent;
    }
    selectedStudent=pool[Math.floor(Math.random()*pool.length)];
    result.innerHTML=`<div class="random-student-card">
      <img src="${portraitFor(selectedStudent.sexe||'')}" alt="Portrait de ${esc(selectedStudent.prenom)}">
      <span>Élève choisi</span>
      <strong>${esc(displayName(selectedStudent))}</strong>
    </div>`;
    drawBtn.classList.add('hidden');
    validateBtn.classList.remove('hidden');
    againBtn.classList.remove('hidden');
  }
  function validatePassage(){
    if(!selectedStudent)return;
    const data=loadHistory();
    const key=keyFor(selectedStudent);
    if(!data.items.some(item=>item.key===key))data.items.push({key,name:displayName(selectedStudent),time:new Date().toISOString()});
    saveHistory(data);
    renderHistory();
    const remaining=students().length-data.items.length;
    result.innerHTML=`<div class="random-student-confirmed"><strong>✓ Passage validé</strong><span>${esc(displayName(selectedStudent))}</span><small>${remaining>0?remaining+' élève'+(remaining>1?'s':'')+' encore disponible'+(remaining>1?'s':'')+'.':'Toute la classe est passée aujourd’hui.'}</small></div>`;
    selectedStudent=null;
    validateBtn.classList.add('hidden');
    againBtn.classList.add('hidden');
    drawBtn.textContent=remaining>0?'🎲 Tirer l’élève suivant':'🎉 Tour terminé';
    drawBtn.disabled=remaining<=0;
    drawBtn.classList.remove('hidden');
  }
  function resetHistory(){
    if(!window.confirm('Réinitialiser tous les passages enregistrés pour aujourd’hui ?'))return;
    saveHistory({date:today(),items:[]});
    drawBtn.disabled=false;
    drawBtn.textContent='🎲 Tirer un élève';
    setPlaceholder('La liste du jour a été réinitialisée.');
    renderHistory();
  }
  async function open(){
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    selectedStudent=null;
    drawBtn.disabled=false;
    drawBtn.textContent='🎲 Tirer un élève';
    setPlaceholder('Clique sur le bouton pour choisir un élève.');
    try{await window.ProgressionsRoster?.refresh?.();}catch(e){}
    renderHistory();
    if(students().length&&loadHistory().items.length>=students().length){
      drawBtn.disabled=true;
      drawBtn.textContent='🎉 Tour terminé';
    }
    drawBtn.focus();
  }
  function close(){
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    openBtn.focus();
  }
  openBtn.addEventListener('click',open);
  closeBtn.addEventListener('click',close);
  drawBtn.addEventListener('click',choose);
  againBtn.addEventListener('click',choose);
  validateBtn.addEventListener('click',validatePassage);
  resetBtn.addEventListener('click',resetHistory);
  historyList.addEventListener('click',event=>{
    const button=event.target.closest('[data-history-key]');
    if(!button)return;
    const data=loadHistory();
    data.items=data.items.filter(item=>item.key!==button.dataset.historyKey);
    saveHistory(data);
    drawBtn.disabled=false;
    drawBtn.textContent='🎲 Tirer un élève';
    renderHistory();
  });
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
})();
