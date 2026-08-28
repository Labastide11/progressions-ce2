(function(){
'use strict';
const STORAGE='progressions_ce2_parcours_outil_v2';
const LEGACY_STORAGE='progressions_ce2_parcours_outil_v1';
const ROSTER='progressions_ce2_classe_v1';
const ROSTER_META='progressions_ce2_classe_meta_v1';
const TRACKING='progressions_ce2_suivi_eleves_v1';
const fields=['masteredNotes','needs','goals','supports','nextSteps','bilan','updatedAt'];
const ids={masteredNotes:'poMasteredNotes',needs:'poNeeds',goals:'poGoals',supports:'poSupports',nextSteps:'poNextSteps',bilan:'poBilan',updatedAt:'poUpdatedAt'};
const modal=document.getElementById('parcoursOutilModal');
const studentSelect=document.getElementById('poStudentSelect');
const periodSelect=document.getElementById('poPeriodSelect');
const status=document.getElementById('poStatus');
let db=load();
let currentStudent='';
let autosaveTimer=null;

function load(){
  try{
    const current=JSON.parse(localStorage.getItem(STORAGE)||'null');
    if(current&&typeof current==='object')return current;
    const legacy=JSON.parse(localStorage.getItem(LEGACY_STORAGE)||'{}')||{};
    const migrated={};
    Object.entries(legacy).forEach(([key,r])=>{migrated[key]={
      masteredNotes:'',needs:r.needs||'',goals:r.goals||'',supports:r.actions||'',nextSteps:'',bilan:r.bilan||'',updatedAt:r.updatedAt||today(),
      successes:r.successes?[{id:uid(),date:r.updatedAt||today(),text:r.successes}]:[],
      comments:r.notes?[{id:uid(),date:r.updatedAt||today(),text:r.notes}]:[],savedAt:new Date().toISOString()
    };});
    if(Object.keys(migrated).length)localStorage.setItem(STORAGE,JSON.stringify(migrated));
    return migrated;
  }catch(e){return {};}
}
function saveDb(){localStorage.setItem(STORAGE,JSON.stringify(db));}
function today(){return new Date().toISOString().slice(0,10);}
function uid(){return 'po_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);}
function esc(value){return String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function norm(value){return String(value||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function roster(){try{const r=JSON.parse(localStorage.getItem(ROSTER)||'[]');return Array.isArray(r)?r.filter(Boolean):[];}catch(e){return [];}}
function rosterMeta(){try{return JSON.parse(localStorage.getItem(ROSTER_META)||'{}')||{};}catch(e){return {};}}
function tracking(){try{return JSON.parse(localStorage.getItem(TRACKING)||'{}')||{};}catch(e){return {};}}
function key(){return `${currentStudent}__${periodSelect.value}`;}
function emptyRecord(){return {masteredNotes:'',needs:'',goals:'',supports:'',nextSteps:'',bilan:'',updatedAt:today(),successes:[],comments:[],savedAt:''};}
function record(){return db[key()]||emptyRecord();}
function getMeta(student){const all=rosterMeta();return all[norm(student)]||{};}
function portraitFor(student){const sexe=getMeta(student).sexe||'';if(window.ProgressionsStudentPhotos)return window.ProgressionsStudentPhotos.get(student,sexe);const sex=norm(sexe);if(sex.startsWith('f'))return 'assets/portraits/portrait_fille.png';if(sex.startsWith('g')||sex.startsWith('m'))return 'assets/portraits/portrait_garcon.png';return 'assets/portraits/portrait_neutre.png';}
function parseDate(value){if(!value)return null;const d=new Date(value);if(!Number.isNaN(d.getTime()))return d;const m=String(value).match(/^(\d{2})\/(\d{2})\/(\d{4})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/);if(!m)return null;return new Date(Number(m[3]),Number(m[2])-1,Number(m[1]),Number(m[4]||0),Number(m[5]||0),Number(m[6]||0));}
function formatDate(value){if(!value)return 'Jamais';const d=parseDate(value);return d?new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(d).replace(',',' à'):String(value);}
function dateTime(value){const d=parseDate(value);return d?d.getTime():0;}
function countLines(value){return String(value||'').split(/\n+/).map(x=>x.trim()).filter(Boolean).length;}
function skillCatalog(){
  const catalog={};
  const all=window.PROGRESSIONS||{};
  Object.values(all).forEach(subject=>{
    (subject&&Array.isArray(subject.annualCompetencies)?subject.annualCompetencies:[]).forEach(skill=>{
      if(skill&&skill.code)catalog[String(skill.code)]={title:skill.title||skill.competence||skill.code,domain:skill.domain||skill.domaine||''};
    });
    ['p1Competencies','p2Competencies','p3Competencies','p4Competencies','p5Competencies'].forEach(key=>{
      (subject&&Array.isArray(subject[key])?subject[key]:[]).forEach(skill=>{
        if(skill&&skill.code)catalog[String(skill.code)]={title:skill.title||skill.competence||skill.code,domain:skill.domain||skill.domaine||''};
      });
    });
  });
  return catalog;
}
function localMasteredSkills(){
  const data=tracking();
  const catalog=skillCatalog();
  const results=[];
  Object.entries(data).forEach(([compound,item])=>{
    const split=String(compound).split('|');
    if(split.length<2||norm(split[0])!==norm(currentStudent))return;
    const code=split.slice(1).join('|');
    const level=String(item&&item.level||'').toLowerCase();
    if(!['acquis','acquise','maitrisee','maîtrisée'].includes(level))return;
    const ref=catalog[code]||{};
    results.push({code,title:item.title||item.competence||ref.title||code,domain:ref.domain||'',date:item.date||'',source:'Suivi enseignant',medaille:''});
  });
  return results;
}
function remoteMasteredSkills(){
  let rows=[];
  try{rows=JSON.parse(localStorage.getItem('progressions_ce2_hibou_preuves_v1')||'[]')||[];}catch(e){rows=[];}
  return rows.filter(row=>norm(row&&row.prenom)===norm(currentStudent)).map(row=>({
    code:Array.isArray(row._codes)&&row._codes.length?row._codes.join(', '):'',
    title:String(row.competence||'Ceinture validée').trim(),
    domain:String(row.domaine||row.matiere||'').trim(),
    date:String(row.date||'').trim(),
    source:'Maître Hibou · Google Sheet',
    medaille:String(row.medaille||'').trim(),
    validations:String(row.validations||'').trim()
  })).filter(item=>item.title);
}
function masteredSkills(){
  const merged=new Map();
  [...localMasteredSkills(),...remoteMasteredSkills()].forEach(item=>{
    const identity=norm(item.code||item.title)+'|'+norm(item.title);
    const previous=merged.get(identity);
    if(!previous||item.source.startsWith('Maître Hibou'))merged.set(identity,item);
  });
  return [...merged.values()].sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||String(a.title).localeCompare(String(b.title),'fr'));
}
function fillIdentity(){
  const meta=getMeta(currentStudent);
  const sex=norm(meta.sexe);
  const isGirl=sex.startsWith('f');
  const isBoy=sex.startsWith('g')||sex.startsWith('m');
  document.getElementById('poStudentNameLabel').textContent=currentStudent||'—';
  document.getElementById('poStudentPortrait').src=portraitFor(currentStudent);
  const parts=[];
  if(meta.naissance) parts.push((isGirl?'Née':isBoy?'Né':'Né(e)')+' le '+String(meta.naissance));
  if(meta.cham===true||['oui','true','1','x'].includes(norm(meta.cham))) parts.push('🎵 CHAM');
  if(meta.ulis===true||['oui','true','1','x','ulis'].includes(norm(meta.ulis))) parts.push('🧩 ULIS');
  const metaNode=document.getElementById('poStudentMeta');
  metaNode.textContent=parts.join('  •  ')||'Informations de classe non renseignées';
  const label=document.querySelector('.po-student-heading span');
  if(label) label.textContent=isGirl?'Élève suivie':isBoy?'Élève suivi':'Élève';
}
function renderMastered(){
  const items=masteredSkills();
  const box=document.getElementById('poMasteredSkills');
  box.innerHTML=items.length?items.map(item=>{
    const details=[item.medaille,item.validations,item.date?formatDate(item.date):'',item.source].filter(Boolean).join(' · ');
    return `<div class="po-skill ${item.source&&item.source.startsWith('Maître Hibou')?'po-skill--hibou':''}"><span>${esc(item.code||'✓')}</span><div><strong>${esc(item.title)}</strong>${details?`<small>${esc(details)}</small>`:''}</div></div>`;
  }).join(''):'<p class="po-empty-hint">Aucune compétence acquise dans le suivi enseignant et aucune ceinture Maître Hibou synchronisée.</p>';
  document.getElementById('poMasteredCount').textContent=String(items.length);
}
function remoteRecentAchievements(){
  let rows=[];
  try{rows=JSON.parse(localStorage.getItem('progressions_ce2_hibou_reussites_v1')||'[]')||[];}catch(e){rows=[];}
  return rows.filter(row=>norm(row&&row.prenom)===norm(currentStudent)).map(row=>({
    id:String(row.event_id||row.id||uid()),
    date:String(row.date||'').trim(),
    text:String(row.texte||row.label||row.competence||row.activite||'Réussite').trim(),
    type:String(row.type||row.categorie||'réussite').trim(),
    result:String(row.resultat||row.score_label||row.medaille||'').trim(),
    source:String(row.source||'Maître Hibou · Google Sheet').trim(),
    remote:true
  })).filter(item=>item.text&&item.date);
}
function recentAchievements(){
  const manual=(record().successes||[]).map(item=>({...item,type:'Réussite observée',result:'',source:'Enseignant',remote:false}));
  const merged=new Map();
  [...manual,...remoteRecentAchievements()].forEach(item=>{
    const identity=[norm(item.text),String(item.date||'').slice(0,16),norm(item.type)].join('|');
    if(!merged.has(identity)||item.remote)merged.set(identity,item);
  });
  return [...merged.values()].sort((a,b)=>dateTime(b.date)-dateTime(a.date)).slice(0,5);
}
function remoteAchievementRow(item){
  const meta=[item.type,item.result,item.source].filter(Boolean).join(' · ');
  return `<div class="po-entry po-entry--remote"><div class="po-entry__date">${esc(formatDate(item.date))}</div><div class="po-entry__body"><strong>${esc(item.text)}</strong>${meta?`<small>${esc(meta)}</small>`:''}</div></div>`;
}
function entryRow(type,item){
  const success=type==='success';
  return `<div class="po-entry" data-${type}-id="${esc(item.id)}"><input type="date" value="${esc(item.date||today())}" aria-label="Date"><textarea rows="2" placeholder="${success?'Décrire la réussite observée…':'Noter une observation utile au suivi…'}">${esc(item.text||'')}</textarea><button type="button" class="po-entry-delete no-print" title="Supprimer">×</button></div>`;
}
function renderEntries(){
  const r=record();
  const successList=document.getElementById('poSuccessList');
  const commentsList=document.getElementById('poCommentsList');
  const recent=recentAchievements();
  successList.innerHTML=recent.map(item=>item.remote?remoteAchievementRow(item):entryRow('success',item)).join('');
  commentsList.innerHTML=(r.comments||[]).map(item=>entryRow('comment',item)).join('');
  document.getElementById('poSuccessEmpty').hidden=Boolean(recent.length);
  document.getElementById('poCommentsEmpty').hidden=Boolean((r.comments||[]).length);
  document.getElementById('poCommentsCount').textContent=String((r.comments||[]).length);
  bindEntryEvents();
}
function fill(){
  const r=record();fillIdentity();
  fields.forEach(f=>{const el=document.getElementById(ids[f]);if(el)el.value=r[f]||'';});
  renderEntries();renderMastered();
  document.getElementById('poGoalsCount').textContent=String(countLines(r.goals));
  document.getElementById('poLastSaved').textContent=formatDate(r.savedAt);
  status.textContent='';
}
function collectEntries(type){return [...document.querySelectorAll(`[data-${type}-id]`)].map(row=>({id:row.dataset[type+'Id']||uid(),date:row.querySelector('input').value||today(),text:row.querySelector('textarea').value.trim()})).filter(item=>item.text);}
function collect(){const r={};fields.forEach(f=>{const el=document.getElementById(ids[f]);r[f]=el?el.value:'';});r.successes=collectEntries('success');r.comments=collectEntries('comment');r.savedAt=new Date().toISOString();return r;}
function persist(show=true){if(!currentStudent)return;db[key()]=collect();saveDb();if(show){status.textContent='✓ Parcours enregistré localement';setTimeout(()=>{status.textContent='';},1800);}document.getElementById('poLastSaved').textContent=formatDate(db[key()].savedAt);document.getElementById('poGoalsCount').textContent=String(countLines(db[key()].goals));document.getElementById('poCommentsCount').textContent=String(db[key()].comments.length);}
function scheduleSave(){clearTimeout(autosaveTimer);status.textContent='Modification en cours…';autosaveTimer=setTimeout(()=>persist(false),700);}
function populateRoster(preselected){const names=roster();const previous=preselected||currentStudent;studentSelect.innerHTML='';if(!names.length){studentSelect.innerHTML='<option value="">Aucun élève disponible</option>';currentStudent='';return;}names.sort((a,b)=>String(a).localeCompare(String(b),'fr',{sensitivity:'base'}));studentSelect.innerHTML=names.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('');currentStudent=names.includes(previous)?previous:names[0];studentSelect.value=currentStudent;}
function open(student){populateRoster(student);modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';fill();}
function close(){persist(false);modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function addEntry(type){persist(false);const r=record();const list=type==='success'?(r.successes||(r.successes=[])):(r.comments||(r.comments=[]));list.push({id:uid(),date:today(),text:''});db[key()]=r;saveDb();renderEntries();const selector=type==='success'?'[data-success-id]':'[data-comment-id]';const rows=document.querySelectorAll(selector);rows[rows.length-1]?.querySelector('textarea')?.focus();}
function bindEntryEvents(){document.querySelectorAll('.po-entry input,.po-entry textarea').forEach(el=>el.addEventListener('input',scheduleSave));document.querySelectorAll('.po-entry-delete').forEach(btn=>btn.onclick=()=>{btn.closest('.po-entry')?.remove();persist(false);renderEntries();});}
function exportJson(){persist(false);const payload={version:'32.84',eleve:currentStudent,periode:periodSelect.options[periodSelect.selectedIndex]?.text||periodSelect.value,competences_maitrisees:masteredSkills(),...record()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`parcours_${currentStudent||'eleve'}_${periodSelect.value}.json`.replace(/\s+/g,'_');a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);status.textContent='✓ Fiche exportée';}
studentSelect?.addEventListener('change',()=>{persist(false);currentStudent=studentSelect.value;fill();});
periodSelect?.addEventListener('change',()=>{persist(false);fill();});
document.getElementById('poForm')?.addEventListener('input',e=>{if(!e.target.closest('.po-entry'))scheduleSave();});
document.getElementById('poSaveBtn')?.addEventListener('click',()=>persist(true));
document.getElementById('poAddSuccessBtn')?.addEventListener('click',()=>addEntry('success'));
document.getElementById('poAddCommentBtn')?.addEventListener('click',()=>addEntry('comment'));
document.getElementById('poExportBtn')?.addEventListener('click',exportJson);
document.getElementById('poPrintBtn')?.addEventListener('click',()=>{persist(false);document.body.classList.add('po-printing');window.print();setTimeout(()=>document.body.classList.remove('po-printing'),400);});
document.getElementById('closeParcoursOutilBtn')?.addEventListener('click',close);
modal?.addEventListener('click',e=>{if(e.target===modal)close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
window.addEventListener('progressions-roster-updated',()=>{if(!modal.classList.contains('hidden')){const selected=currentStudent;populateRoster(selected);fill();}});
window.addEventListener('progressions-hibou-proofs-updated',()=>{if(!modal.classList.contains('hidden')){renderMastered();renderEntries();}});
window.addEventListener('progressions-hibou-recent-updated',()=>{if(!modal.classList.contains('hidden'))renderEntries();});
window.ParcoursOutil={open,close,openForStudent:open};
})();
