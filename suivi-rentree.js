
(()=>{
'use strict';

const ROSTER_KEY='progressions_ce2_classe_v1';
const META_KEY='progressions_ce2_classe_meta_v1';
const API_URL_KEY='hibou_sync_api_url_v25754';
const DEVICE_KEY='hibou_sync_device_key_v25754';

function norm(v){
  return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}
function esc(v){
  return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function schoolYear(){
  const d=new Date(), y=d.getFullYear(), m=d.getMonth();
  const start=m>=7?y:y-1;
  return `${start}-${start+1}`;
}
const STORE_KEY='progressions_suivi_rentree_'+schoolYear()+'_v1';
let remoteState='loading';
let remoteMessage='Connexion au Google Sheet…';

function readJson(k,f){
  try{
    const v=JSON.parse(localStorage.getItem(k)||'null');
    return v??f;
  }catch(e){ return f; }
}
function writeJson(k,v){
  try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){}
}
function readText(k){
  try{return String(localStorage.getItem(k)||'').trim();}catch(e){return '';}
}
function apiConfig(){return {url:readText(API_URL_KEY),key:readText(DEVICE_KEY)};}
function apiConfigured(){
  const c=apiConfig();
  return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(c.url)&&c.key.length>=16;
}
function jsonp(params){
  return new Promise((resolve,reject)=>{
    const c=apiConfig();
    if(!apiConfigured())return reject(new Error('Synchronisation Google Sheet non configurée.'));
    const cb='progressionsRentree_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const s=document.createElement('script');
    let done=false;
    const finish=(err,data)=>{
      if(done)return;
      done=true;
      clearTimeout(timer);
      try{delete window[cb]}catch(e){}
      s.remove();
      err?reject(err):resolve(data);
    };
    const timer=setTimeout(()=>finish(new Error('Délai de connexion dépassé.')),20000);
    window[cb]=data=>{
      if(!data||data.ok===false)return finish(new Error((data&&data.error)||'Réponse API invalide.'));
      finish(null,data);
    };
    const q=new URLSearchParams({...params,device_key:c.key,tablet_key:c.key,callback:cb,_:Date.now()});
    s.src=c.url+'?'+q.toString();
    s.onerror=()=>finish(new Error('Réponse Apps Script indisponible.'));
    document.head.appendChild(s);
  });
}
function roster(){
  let r=readJson(ROSTER_KEY,[]);
  if(!Array.isArray(r)||!r.length){
    const meta=window.ENSEIGNANT_ELEVES_META||{};
    r=Object.values(meta).map(x=>x&&x.prenom).filter(Boolean);
  }
  return [...new Set((Array.isArray(r)?r:[]).map(x=>String(x||'').trim()).filter(Boolean))]
    .sort((a,b)=>a.localeCompare(b,'fr',{sensitivity:'base'}));
}
function defaultRecord(name){
  return {name,fiche:false,assurance:false,coop:'pending',amount:'',chequeName:'',note:'',updatedAt:''};
}
function store(){
  const raw=readJson(STORE_KEY,{year:schoolYear(),students:{}});
  if(!raw.students||typeof raw.students!=='object')raw.students={};
  raw.year=schoolYear();
  return raw;
}
function save(data){ writeJson(STORE_KEY,data); }
function getRecord(data,name){
  const k=norm(name);
  return {...defaultRecord(name),...(data.students[k]||{}),name};
}
function setRecord(data,name,patch){
  const k=norm(name);
  data.students[k]={...getRecord(data,name),...patch,name,updatedAt:new Date().toISOString()};
  save(data);
}
function isCoopAnswered(r){ return ['cash','cheque','none'].includes(r.coop); }
function isComplete(r){ return !!r.fiche && !!r.assurance && isCoopAnswered(r); }
function missingLabels(r){
  const a=[];
  if(!r.fiche)a.push('fiche de renseignements');
  if(!r.assurance)a.push('assurance');
  if(!isCoopAnswered(r))a.push('coopérative');
  return a;
}
function mergeRemoteStudents(students){
  if(!Array.isArray(students))return;
  const data=store();
  const remoteNames=[];
  students.forEach(row=>{
    const name=String((row&&row.prenom)||'').trim();
    if(!name)return;
    remoteNames.push(name);
    data.students[norm(name)]={
      ...defaultRecord(name),
      ...(data.students[norm(name)]||{}),
      name,
      fiche:!!row.fiche_renseignements,
      assurance:!!row.assurance,
      coop:String(row.coop_mode||'pending'),
      amount:String(row.coop_montant||''),
      chequeName:String(row.nom_cheque||''),
      note:String(row.note||''),
      updatedAt:new Date().toISOString()
    };
  });
  save(data);
  if(remoteNames.length){
    writeJson(ROSTER_KEY,[...new Set(remoteNames)].sort((a,b)=>a.localeCompare(b,'fr',{sensitivity:'base'})));
  }
}
async function syncFromSheet(showError=false){
  if(!apiConfigured()){
    remoteState='local';
    remoteMessage='Google Sheet non configuré — copie locale utilisée';
    renderPanel();
    if(showError)alert('La synchronisation Google Sheet n’est pas configurée sur cet ordinateur.');
    return false;
  }
  remoteState='loading';
  remoteMessage='Connexion au Google Sheet…';
  renderPanel();
  try{
    const data=await jsonp({action:'suivi_rentree'});
    mergeRemoteStudents(data.students||[]);
    remoteState='online';
    remoteMessage=`Google Sheet synchronisé · ${(data.students||[]).length} élèves`;
    renderPanel();
    return true;
  }catch(e){
    remoteState='local';
    remoteMessage='Google Sheet indisponible — copie locale conservée';
    renderPanel();
    if(showError)alert('Synchronisation impossible. La copie locale est conservée.\\n'+e.message);
    return false;
  }
}
async function saveRecordRemote(name,r){
  if(!apiConfigured())return false;
  try{
    await jsonp({
      action:'save_suivi_rentree',
      prenom:name,
      fiche_renseignements:r.fiche?'1':'0',
      assurance:r.assurance?'1':'0',
      coop_mode:r.coop||'pending',
      coop_montant:r.amount||'',
      nom_cheque:r.chequeName||'',
      note:r.note||''
    });
    remoteState='online';
    remoteMessage='Google Sheet synchronisé';
    renderPanel();
    return true;
  }catch(e){
    remoteState='local';
    remoteMessage='Modification gardée localement — Google Sheet à resynchroniser';
    renderPanel();
    return false;
  }
}
function calc(){
  const names=roster(), data=store();
  let complete=0, fiche=0, assurance=0, coop=0;
  const missing=[];
  names.forEach(name=>{
    const r=getRecord(data,name);
    if(isComplete(r))complete++;
    if(!r.fiche)fiche++;
    if(!r.assurance)assurance++;
    if(!isCoopAnswered(r))coop++;
    const labels=missingLabels(r);
    if(labels.length)missing.push({name,labels});
  });
  return {names,data,total:names.length,complete,follow:names.length-complete,fiche,assurance,coop,missing};
}

const panel=document.getElementById('rentreePanel');
const manageModal=document.getElementById('rentreeManagerModal');
const missingModal=document.getElementById('rentreeMissingModal');
const list=document.getElementById('rentreeStudentsList');
const missingBody=document.getElementById('rentreeMissingBody');

function renderPanel(){
  if(!panel)return;
  const s=calc();
  const summary=document.getElementById('rentreeSummary');
  const complete=document.getElementById('rentreeCompleteCount');
  const fiche=document.getElementById('rentreeFicheCount');
  const assurance=document.getElementById('rentreeAssuranceCount');
  const coop=document.getElementById('rentreeCoopCount');
  if(summary)summary.textContent=s.total?`${s.complete} dossier${s.complete>1?'s':''} complet${s.complete>1?'s':''} · ${s.follow} à suivre`:'Liste élèves en attente';
  if(complete)complete.textContent=`✅ ${s.complete}/${s.total} complets`;
  if(fiche)fiche.textContent=`📄 ${s.fiche} fiche${s.fiche>1?'s':''}`;
  if(assurance)assurance.textContent=`🛡️ ${s.assurance} assurance${s.assurance>1?'s':''}`;
  if(coop)coop.textContent=`💶 ${s.coop} coop`;
  panel.classList.toggle('is-complete',s.total>0&&s.follow===0);
  const sync=document.getElementById('rentreeSyncState');
  if(sync){
    sync.textContent=(remoteState==='loading'?'⏳ ':remoteState==='online'?'☁️ ':'💾 ')+remoteMessage;
    sync.dataset.state=remoteState;
  }
  [fiche,assurance,coop].forEach((el,i)=>{
    if(!el)return;
    const value=[s.fiche,s.assurance,s.coop][i];
    el.classList.toggle('is-ok',value===0);
  });
}

function coopLabel(v){
  return ({pending:'Non remis',cash:'Espèces',cheque:'Chèque',none:'Pas de participation'})[v]||'Non remis';
}

function renderManager(){
  if(!list)return;
  const s=calc();
  document.getElementById('rentreeYearLabel').textContent=`Année scolaire ${schoolYear()}`;
  document.getElementById('rentreeManagerSummary').textContent=`${s.complete}/${s.total} dossiers complets`;
  list.innerHTML=s.names.map(name=>{
    const r=getRecord(s.data,name);
    const extraVisible=r.coop==='cash'||r.coop==='cheque';
    return `
      <article class="rentree-student ${isComplete(r)?'is-complete':''}" data-rentree-student="${esc(name)}">
        <div class="rentree-student__name">${esc(name)}</div>
        <label class="rentree-check"><input type="checkbox" data-field="fiche" ${r.fiche?'checked':''}> Fiche reçue</label>
        <label class="rentree-check"><input type="checkbox" data-field="assurance" ${r.assurance?'checked':''}> Assurance reçue</label>
        <div class="rentree-field">
          <select data-field="coop" aria-label="Coopérative pour ${esc(name)}">
            <option value="pending" ${r.coop==='pending'?'selected':''}>Coop : non remis</option>
            <option value="cash" ${r.coop==='cash'?'selected':''}>Coop : espèces</option>
            <option value="cheque" ${r.coop==='cheque'?'selected':''}>Coop : chèque</option>
            <option value="none" ${r.coop==='none'?'selected':''}>Pas de participation</option>
          </select>
        </div>
        <div class="rentree-field">
          <input data-field="note" value="${esc(r.note)}" placeholder="Note éventuelle…" aria-label="Note pour ${esc(name)}">
        </div>
        <div class="rentree-extra" ${extraVisible?'':'hidden'}>
          <div class="rentree-field">
            <label>Montant</label>
            <input data-field="amount" inputmode="decimal" value="${esc(r.amount)}" placeholder="ex. 15 €">
          </div>
          <div class="rentree-field" data-cheque-field ${r.coop==='cheque'?'':'hidden'}>
            <label>Nom sur le chèque</label>
            <input data-field="chequeName" value="${esc(r.chequeName)}" placeholder="si différent de l’élève">
          </div>
          <div class="rentree-field">
            <label>Situation</label>
            <input data-rentree-situation value="${isComplete(r)?'Dossier complet':'Incomplet'}" readonly>
          </div>
        </div>
      </article>`;
  }).join('') || '<div class="rentree-missing-empty">La liste des élèves n’est pas encore disponible.</div>';

  list.querySelectorAll('[data-rentree-student]').forEach(card=>{
    const name=card.dataset.rentreeStudent;
    card.querySelectorAll('[data-field]').forEach(input=>{
      const evt=(input.type==='text'||input.tagName==='INPUT')?'change':'change';
      input.addEventListener(evt,()=>{
        const field=input.dataset.field;
        let value=input.type==='checkbox'?input.checked:input.value;
        const data=store();
        setRecord(data,name,{[field]:value});
        const rec=getRecord(data,name);
        saveRecordRemote(name,rec);
        card.classList.toggle('is-complete',isComplete(rec));
        const situation=card.querySelector('[data-rentree-situation]');
        if(situation)situation.value=isComplete(rec)?'Dossier complet':'Incomplet';
        if(field==='coop'){
          const extra=card.querySelector('.rentree-extra');
          const cheque=card.querySelector('[data-cheque-field]');
          if(extra)extra.hidden=!(value==='cash'||value==='cheque');
          if(cheque)cheque.hidden=value!=='cheque';
        }
        renderPanel();
        document.getElementById('rentreeManagerSummary').textContent=`${calc().complete}/${calc().total} dossiers complets`;
      });
    });
  });
}

function missingText(){
  const s=calc();
  if(!s.missing.length)return 'Tous les dossiers de rentrée sont complets.';
  return ['À relancer / vérifier :',...s.missing.map(x=>`• ${x.name} : ${x.labels.join(' + ')}`)].join('\n');
}
function renderMissing(){
  if(!missingBody)return;
  const s=calc();
  document.getElementById('rentreeMissingSummary').textContent=`${s.follow} élève${s.follow>1?'s':''} à suivre`;
  if(!s.missing.length){
    missingBody.innerHTML='<div class="rentree-missing-empty">✅ Tous les dossiers sont complets.</div>';
    return;
  }
  missingBody.innerHTML=`
    <div class="rentree-missing-top">
      <span class="rentree-stat">📄 ${s.fiche} fiche${s.fiche>1?'s':''}</span>
      <span class="rentree-stat">🛡️ ${s.assurance} assurance${s.assurance>1?'s':''}</span>
      <span class="rentree-stat">💶 ${s.coop} coop</span>
    </div>
    ${s.missing.map(x=>`<div class="rentree-missing-item"><strong>${esc(x.name)}</strong> <span>— ${esc(x.labels.join(' · '))}</span></div>`).join('')}
  `;
}

function openModal(el){
  if(!el)return;
  el.classList.remove('hidden');
  el.setAttribute('aria-hidden','false');
}
function closeModal(el){
  if(!el)return;
  el.classList.add('hidden');
  el.setAttribute('aria-hidden','true');
}

document.getElementById('rentreeManageBtn')?.addEventListener('click',async()=>{openModal(manageModal);await syncFromSheet(false);renderManager()});
document.getElementById('rentreeMissingBtn')?.addEventListener('click',async()=>{openModal(missingModal);await syncFromSheet(false);renderMissing()});
document.getElementById('rentreeCloseManage')?.addEventListener('click',()=>closeModal(manageModal));
document.getElementById('rentreeCloseMissing')?.addEventListener('click',()=>closeModal(missingModal));
document.getElementById('rentreeDoneBtn')?.addEventListener('click',()=>closeModal(manageModal));
document.getElementById('rentreeCopyBtn')?.addEventListener('click',async()=>{
  const txt=missingText();
  try{
    await navigator.clipboard.writeText(txt);
    const b=document.getElementById('rentreeCopyBtn');
    const old=b.textContent;b.textContent='✓ Liste copiée';
    setTimeout(()=>b.textContent=old,1400);
  }catch(e){
    window.prompt('Copiez la liste :',txt);
  }
});
[manageModal,missingModal].forEach(m=>{
  m?.addEventListener('click',e=>{if(e.target===m)closeModal(m)});
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeModal(manageModal);closeModal(missingModal)}
});
window.addEventListener('progressions-roster-updated',()=>{renderPanel();if(!manageModal?.classList.contains('hidden'))renderManager()});
window.addEventListener('storage',e=>{if(e.key===ROSTER_KEY||e.key===STORE_KEY)renderPanel()});

renderPanel();
syncFromSheet(false);

window.ProgressionsSuiviRentree={
  refresh:renderPanel,
  open:()=>{renderManager();openModal(manageModal)},
  missing:()=>{renderMissing();openModal(missingModal)},
  sync:()=>syncFromSheet(true)
};
})();
