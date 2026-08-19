(function(){
  'use strict';
  const LEVELS=[
    {id:'renforcer',title:'À reprendre',subtitle:'Besoin prioritaire',icon:'🔴'},
    {id:'encours',title:'En cours d’apprentissage',subtitle:'Entraînement guidé',icon:'🟡'},
    {id:'acquis',title:'Compétence acquise',subtitle:'Autonomie ou tutorat',icon:'🟢'},
    {id:'none',title:'Non encore observé',subtitle:'À évaluer',icon:'⚪'}
  ];
  const STORAGE='progressions_ce2_groupes_besoin_v3285';
  let modal=null;
  let currentSkill=null;
  let groups={};

  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function api(){return window.ProgressionsRoster||null;}
  function loadSaved(){try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')||{};}catch(_){return {};}}
  function save(){const all=loadSaved();if(currentSkill)all[currentSkill.code]={updatedAt:new Date().toISOString(),groups};localStorage.setItem(STORAGE,JSON.stringify(all));}
  function initialGroups(){
    const roster=api()?.getNames?.()||[];
    const saved=loadSaved()[currentSkill.code];
    const valid=new Set(roster);
    const result={renforcer:[],encours:[],acquis:[],none:[]};
    if(saved&&saved.groups){
      LEVELS.forEach(l=>(saved.groups[l.id]||[]).forEach(name=>{if(valid.has(name)&&!Object.values(result).flat().includes(name))result[l.id].push(name);}));
    }
    roster.forEach(name=>{
      if(Object.values(result).flat().includes(name))return;
      const entry=api()?.getEntry?.(name,currentSkill.code)||{effectiveLevel:'none'};
      const level=result[entry.effectiveLevel]?entry.effectiveLevel:'none';
      result[level].push(name);
    });
    LEVELS.forEach(l=>result[l.id].sort((a,b)=>a.localeCompare(b,'fr',{sensitivity:'base'})));
    return result;
  }
  function ensureModal(){
    if(modal)return;
    modal=document.createElement('section');
    modal.className='gb-modal hidden';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML=`<div class="gb-backdrop" data-gb-close></div><article class="gb-panel" role="dialog" aria-modal="true" aria-labelledby="gbTitle"><header class="gb-header"><div><span class="gb-eyebrow">VUE DE CLASSE</span><h2 id="gbTitle">Créer les groupes par niveau</h2><p id="gbSkill"></p><p class="gb-intro">Les groupes sont proposés automatiquement à partir du suivi enseignant et des réussites dans Maître Hibou. Tu peux ensuite déplacer les élèves manuellement.</p></div><button type="button" class="gb-close" data-gb-close aria-label="Fermer">×</button></header><div class="gb-toolbar"><button type="button" class="btn btn--light" id="gbRebuild">↻ Recalculer depuis le suivi</button><button type="button" class="btn btn--outline" id="gbPrint">🖨 Imprimer / PDF</button><button type="button" class="btn btn--outline" id="gbCsv">⬇ Export CSV</button><span id="gbSaved">Ajustements enregistrés localement</span></div><p class="gb-help">Répartir les élèves selon leur maîtrise de cette compétence. Fais glisser un élève vers un autre groupe pour ajuster la proposition.</p><div class="gb-board" id="gbBoard"></div><footer class="gb-footer"><strong id="gbTotal"></strong><button type="button" class="btn btn--hibou" data-gb-close>Terminer</button></footer></article>`;
    document.body.appendChild(modal);
    modal.querySelectorAll('[data-gb-close]').forEach(b=>b.addEventListener('click',close));
    modal.querySelector('#gbRebuild').addEventListener('click',()=>{if(confirm('Recalculer les groupes à partir des niveaux actuels ? Les déplacements manuels seront remplacés.')){localStorage.removeItem(STORAGE);groups=initialGroups();render();}});
    modal.querySelector('#gbPrint').addEventListener('click',()=>window.print());
    modal.querySelector('#gbCsv').addEventListener('click',exportCsv);
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
  }
  function card(name,level){
    const entry=api()?.getEntry?.(name,currentSkill.code)||{};
    const source=entry.hibouProof&&entry.level==='none'?' · Maître Hibou':'';
    return `<article class="gb-student" draggable="true" data-student="${esc(name)}" data-level="${level}"><span class="gb-drag">⋮⋮</span><strong>${esc(name)}</strong>${entry.note?`<small>${esc(entry.note)}</small>`:''}${source?`<em>${source}</em>`:''}</article>`;
  }
  function render(){
    modal.querySelector('#gbSkill').innerHTML=`<strong>${esc(currentSkill.code)} — ${esc(currentSkill.title)}</strong><br>${esc(currentSkill.domain||'')}`;
    const board=modal.querySelector('#gbBoard');
    board.innerHTML=LEVELS.map(l=>`<section class="gb-column gb-column--${l.id}" data-drop-level="${l.id}"><header><span>${l.icon}</span><div><h3>${l.title}</h3><small>${l.subtitle}</small></div><b>${groups[l.id].length}</b></header><div class="gb-list">${groups[l.id].map(n=>card(n,l.id)).join('')||'<p class="gb-empty">Aucun élève</p>'}</div></section>`).join('');
    modal.querySelector('#gbTotal').textContent=`${Object.values(groups).flat().length} élèves répartis`;
    bindDrag();
  }
  function bindDrag(){
    let dragged='';
    modal.querySelectorAll('.gb-student').forEach(card=>{
      card.addEventListener('dragstart',e=>{dragged=card.dataset.student;card.classList.add('is-dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragged);});
      card.addEventListener('dragend',()=>{card.classList.remove('is-dragging');modal.querySelectorAll('.gb-column').forEach(c=>c.classList.remove('is-over'));});
    });
    modal.querySelectorAll('[data-drop-level]').forEach(col=>{
      col.addEventListener('dragover',e=>{e.preventDefault();col.classList.add('is-over');});
      col.addEventListener('dragleave',()=>col.classList.remove('is-over'));
      col.addEventListener('drop',e=>{e.preventDefault();col.classList.remove('is-over');const name=dragged||e.dataTransfer.getData('text/plain');move(name,col.dataset.dropLevel);});
    });
  }
  function move(name,target){
    if(!name||!groups[target])return;
    Object.keys(groups).forEach(k=>groups[k]=groups[k].filter(n=>n!==name));
    groups[target].push(name);groups[target].sort((a,b)=>a.localeCompare(b,'fr',{sensitivity:'base'}));
    api()?.setLevel?.(name,currentSkill.code,target);
    save();render();
    const status=modal.querySelector('#gbSaved');status.textContent='✓ Modification enregistrée';setTimeout(()=>status.textContent='Ajustements enregistrés localement',1500);
  }
  function exportCsv(){
    const rows=[['Compétence','Code','Groupe','Élève']];
    LEVELS.forEach(l=>groups[l.id].forEach(n=>rows.push([currentSkill.title,currentSkill.code,l.title,n])));
    const csv=rows.map(r=>r.map(v=>'"'+String(v||'').replace(/"/g,'""')+'"').join(';')).join('\n');
    const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`groupes_besoin_${currentSkill.code}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);
  }
  function open(){
    if(!api())return alert('Le suivi de classe n’est pas encore chargé.');
    currentSkill=api().getSelectedSkill?.();
    if(!currentSkill)return alert('Choisis d’abord une compétence.');
    ensureModal();groups=initialGroups();render();modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('gb-open');
  }
  function close(){if(!modal)return;modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('gb-open');api()?.refreshView?.();}
  window.GroupesBesoin={open,close};
})();
