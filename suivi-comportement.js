(function(){
'use strict';

const STORE_KEY='progressions_ce2_comportement_v1';
const ROSTER_META_KEY='progressions_ce2_classe_meta_v1';
const ROSTER_NAMES_KEY='progressions_ce2_classe_v1';
const API_URL_KEY='hibou_sync_api_url_v25754';
const DEVICE_KEY='hibou_sync_device_key_v25754';
const $=id=>document.getElementById(id);
const grid=$('behStudentGrid'),dateInput=$('behDate'),searchInput=$('behSearch'),filterInput=$('behFilter');
const statusEl=$('behStatus'),historyEl=$('behHistory'),historyTitle=$('behHistoryTitle'),frequencyEl=$('behFrequency');
const modal=$('behModal'),form=$('behForm'),modalTitle=$('behModalTitle'),modalSubtitle=$('behModalSubtitle');
const formDate=$('behFormDate'),formCrosses=$('behFormCrosses'),typeInput=$('behType'),observationInput=$('behObservation'),deleteBtn=$('behDeleteBtn');
let selectedStudent='';
let modalStudent='';

function norm(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
function esc(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function localDateKey(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function frDate(iso){if(!iso)return '';const m=String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!m)return iso;return new Intl.DateTimeFormat('fr-FR',{weekday:'short',day:'numeric',month:'short',year:'numeric'}).format(new Date(Number(m[1]),Number(m[2])-1,Number(m[3])));}
function readJson(key,fallback){try{const v=JSON.parse(localStorage.getItem(key)||'');return v??fallback;}catch(_){return fallback;}}
function readRows(){const rows=readJson(STORE_KEY,[]);return Array.isArray(rows)?rows:[];}
function saveRows(rows){localStorage.setItem(STORE_KEY,JSON.stringify(rows));}
function setStatus(text,kind=''){statusEl.textContent=text;statusEl.className='beh-status'+(kind?' is-'+kind:'');}
function config(){return {url:String(localStorage.getItem(API_URL_KEY)||'').trim(),key:String(localStorage.getItem(DEVICE_KEY)||'').trim()};}
function apiConfigured(){const c=config();return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(c.url)&&c.key.length>=16;}

function roster(){
  const meta=readJson(ROSTER_META_KEY,{})||{};
  const names=readJson(ROSTER_NAMES_KEY,[])||[];
  const byName={};
  Object.values(meta).forEach(r=>{if(r&&r.prenom)byName[norm(r.prenom)]={...r};});
  (Array.isArray(names)?names:[]).forEach(name=>{const key=norm(name);if(!byName[key])byName[key]={prenom:String(name)};});
  return Object.values(byName).filter(r=>r.prenom).sort((a,b)=>String(a.prenom).localeCompare(String(b.prenom),'fr',{sensitivity:'base'}));
}
function fallbackPhoto(sexe){const s=norm(sexe);if(s.startsWith('f')||s.includes('fille'))return 'assets/portraits/portrait_fille.png';if(s.startsWith('m')||s.startsWith('g')||s.includes('garcon'))return 'assets/portraits/portrait_garcon.png';return 'assets/portraits/portrait_neutre.png';}
function photoFor(s){return window.ProgressionsStudentPhotos?.get?.(s.prenom,s.sexe||'')||fallbackPhoto(s.sexe||'');}
function eventId(prenom,date,type){return ['C',String(date||'').replace(/-/g,''),norm(prenom),norm(type||'avertissement')].join('-');}
function recordFor(prenom,date,type='avertissement',rows=readRows()){return rows.find(r=>r&&r.date===date&&norm(r.prenom)===norm(prenom)&&String(r.type||'avertissement')===type)||null;}
function allRecordsFor(prenom,rows=readRows()){return rows.filter(r=>norm(r.prenom)===norm(prenom)).sort((a,b)=>String(b.date).localeCompare(String(a.date)));}
function todayWarning(prenom,date,rows){return recordFor(prenom,date,'avertissement',rows);}
function observationsForDay(prenom,date,rows){return rows.filter(r=>r.date===date&&norm(r.prenom)===norm(prenom)&&String(r.observation||'').trim());}

function ensureDailyWarning(prenom,date,rows){
  let rec=recordFor(prenom,date,'avertissement',rows);
  if(!rec){rec={event_id:eventId(prenom,date,'avertissement'),date,prenom,croix:0,observation:'',type:'avertissement',synchro:'non',updated_at:new Date().toISOString()};rows.push(rec);}
  return rec;
}
function addCross(prenom){
  const date=dateInput.value||localDateKey();const rows=readRows();const rec=ensureDailyWarning(prenom,date,rows);
  rec.croix=Math.max(0,Number(rec.croix)||0)+1;rec.synchro='non';rec.updated_at=new Date().toISOString();saveRows(rows);selectedStudent=prenom;render();queueSync(rec);
}
function removeCross(prenom){
  const date=dateInput.value||localDateKey();const rows=readRows();const rec=recordFor(prenom,date,'avertissement',rows);if(!rec)return;
  rec.croix=Math.max(0,(Number(rec.croix)||0)-1);rec.synchro='non';rec.updated_at=new Date().toISOString();
  if(!rec.croix&&!String(rec.observation||'').trim())rows.splice(rows.indexOf(rec),1);
  saveRows(rows);selectedStudent=prenom;render();if(rec.croix||rec.observation)queueSync(rec);
}

function openObservation(prenom){
  modalStudent=prenom;selectedStudent=prenom;const date=dateInput.value||localDateKey();const rows=readRows();const warning=recordFor(prenom,date,'avertissement',rows);
  const positive=recordFor(prenom,date,'positif',rows);const neutral=recordFor(prenom,date,'observation',rows);
  const existing=(warning&&warning.observation?warning:null)||(positive&&positive.observation?positive:null)||(neutral&&neutral.observation?neutral:null);
  modalTitle.textContent='Observation — '+prenom;modalSubtitle.textContent='Les faits sont datés automatiquement.';formDate.textContent='📅 '+frDate(date);formCrosses.textContent='❌ '+String(Number(warning?.croix)||0)+' croix';
  typeInput.value=existing?.type||'avertissement';observationInput.value=existing?.observation||'';deleteBtn.hidden=!existing;
  modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>observationInput.focus(),20);renderHistory();
}
function closeModal(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';modalStudent='';}
function saveObservation(){
  const prenom=modalStudent;if(!prenom)return;const date=dateInput.value||localDateKey();const type=typeInput.value;const text=String(observationInput.value||'').trim();const rows=readRows();
  let rec=recordFor(prenom,date,type,rows);
  if(!rec){rec={event_id:eventId(prenom,date,type),date,prenom,croix:type==='avertissement'?(Number(recordFor(prenom,date,'avertissement',rows)?.croix)||0):0,observation:'',type,synchro:'non',updated_at:new Date().toISOString()};rows.push(rec);}
  rec.observation=text;rec.synchro='non';rec.updated_at=new Date().toISOString();
  if(type==='avertissement')rec.croix=Math.max(0,Number(rec.croix)||0);
  let toSync=rec;
  if(!text&&type!=='avertissement'){toSync={...rec,croix:0,observation:'',synchro:'non'};rows.splice(rows.indexOf(rec),1);}
  if(type==='avertissement'&&!text&&!rec.croix){toSync={...rec,croix:0,observation:'',synchro:'non'};rows.splice(rows.indexOf(rec),1);}
  saveRows(rows);selectedStudent=prenom;closeModal();render();queueSync(toSync);
}
function deleteObservation(){
  if(!modalStudent)return;const date=dateInput.value||localDateKey();const type=typeInput.value;const rows=readRows();const rec=recordFor(modalStudent,date,type,rows);if(!rec)return;
  let toSync=rec;
  if(type==='avertissement'&&(Number(rec.croix)||0)>0){rec.observation='';rec.synchro='non';rec.updated_at=new Date().toISOString();}
  else{toSync={...rec,croix:0,observation:'',synchro:'non'};rows.splice(rows.indexOf(rec),1);}
  saveRows(rows);closeModal();render();queueSync(toSync);
}

function daySummary(rows,date){
  const day=rows.filter(r=>r.date===date);const warning=day.filter(r=>r.type==='avertissement');
  return {crosses:warning.reduce((s,r)=>s+(Number(r.croix)||0),0),students:new Set(day.filter(r=>(Number(r.croix)||0)||String(r.observation||'').trim()).map(r=>norm(r.prenom))).size,observations:day.filter(r=>String(r.observation||'').trim()).length,positive:day.filter(r=>r.type==='positif'&&String(r.observation||'').trim()).length};
}
function renderSummary(rows,date){const s=daySummary(rows,date);$('behCrossTotal').textContent=s.crosses;$('behStudentsConcerned').textContent=s.students;$('behObservationCount').textContent=s.observations;$('behPositiveCount').textContent=s.positive;}
function render(){
  const rows=readRows(),date=dateInput.value||localDateKey(),students=roster();renderSummary(rows,date);
  const query=norm(searchInput.value),filter=filterInput.value;
  const visible=students.filter(s=>{
    if(query&&!norm(s.prenom).includes(query))return false;
    const warning=todayWarning(s.prenom,date,rows),obs=observationsForDay(s.prenom,date,rows);const cross=Number(warning?.croix)||0;
    if(filter==='warnings'&&!cross)return false;if(filter==='observations'&&!obs.length)return false;if(filter==='none'&&(cross||obs.length))return false;return true;
  });
  if(!students.length){grid.innerHTML='<div class="beh-empty" style="grid-column:1/-1">Aucun élève n’est disponible sur cet appareil. Ouvre d’abord « Ma classe » depuis l’accueil et actualise la liste depuis Google Sheets.</div>';setStatus('Liste de classe absente sur cet appareil.','error');renderHistory();return;}
  setStatus(`${students.length} élèves disponibles · ${frDate(date)} · ${apiConfigured()?'configuration de synchronisation détectée':'saisie conservée localement sur cet appareil'}`,'ok');
  grid.innerHTML=visible.map(s=>{
    const warning=todayWarning(s.prenom,date,rows);const crosses=Math.max(0,Number(warning?.croix)||0);const obs=observationsForDay(s.prenom,date,rows);const lastObs=obs.length?obs[obs.length-1]:null;const positive=obs.some(r=>r.type==='positif');
    return `<article class="beh-student${crosses?' has-warnings':''}${positive?' has-positive':''}" data-student="${esc(s.prenom)}">
      <div class="beh-photo"><img src="${esc(photoFor(s))}" alt="Portrait de ${esc(s.prenom)}" onerror="this.onerror=null;this.src='${esc(fallbackPhoto(s.sexe||''))}'"></div>
      <div class="beh-student__main"><div class="beh-name" title="${esc(s.prenom)}">${esc(s.prenom)}</div><div class="beh-crosses${crosses?'':' is-empty'}">${crosses?'❌'.repeat(Math.min(crosses,6))+(crosses>6?' ×'+crosses:''):'Aucune croix'}</div>
        <div class="beh-card-actions"><button class="beh-mini beh-mini--cross" type="button" data-add-cross="${esc(s.prenom)}">❌ +1</button><button class="beh-mini beh-mini--obs" type="button" data-add-observation="${esc(s.prenom)}">＋ Observation</button></div>
      </div>
      ${lastObs?`<button type="button" class="beh-last" data-open-history="${esc(s.prenom)}"><strong>${lastObs.type==='positif'?'✅':lastObs.type==='avertissement'?'⚠️':'📝'} ${esc(frDate(lastObs.date))}</strong> — ${esc(lastObs.observation)}</button>`:'<div class="beh-last">Aucune observation pour cette date.</div>'}
    </article>`;
  }).join('')||'<div class="beh-empty" style="grid-column:1/-1">Aucun élève ne correspond au filtre.</div>';
  grid.querySelectorAll('[data-add-cross]').forEach(b=>b.addEventListener('click',()=>addCross(b.dataset.addCross)));
  grid.querySelectorAll('[data-add-observation]').forEach(b=>b.addEventListener('click',()=>openObservation(b.dataset.addObservation)));
  grid.querySelectorAll('[data-open-history]').forEach(b=>b.addEventListener('click',()=>{selectedStudent=b.dataset.openHistory;renderHistory();document.querySelector('.beh-lower')?.scrollIntoView({behavior:'smooth',block:'start'});}));
  grid.querySelectorAll('.beh-student').forEach(card=>card.addEventListener('contextmenu',e=>{e.preventDefault();const name=card.dataset.student;if(confirm('Retirer une croix à '+name+' pour cette date ?'))removeCross(name);}));
  if(!selectedStudent&&students[0])selectedStudent=students[0].prenom;renderHistory();
}
function renderHistory(){
  if(!selectedStudent){historyTitle.textContent='Historique récent';historyEl.innerHTML='<div class="beh-empty">Clique sur un élève pour afficher son historique.</div>';frequencyEl.innerHTML='';return;}
  const all=allRecordsFor(selectedStudent);historyTitle.textContent='Historique — '+selectedStudent;
  const useful=all.filter(r=>(Number(r.croix)||0)||String(r.observation||'').trim()).slice(0,12);
  historyEl.innerHTML=useful.length?useful.map(r=>`<div class="beh-history-row"><div class="beh-history-row__date">${esc(frDate(r.date))}</div><div class="beh-history-row__cross">${r.croix?'❌ × '+Number(r.croix):r.type==='positif'?'✅ positif':'📝'}</div><div class="beh-history-row__text">${esc(r.observation||'Aucune précision')}</div></div>`).join(''):'<div class="beh-empty">Aucune observation enregistrée pour cet élève.</div>';
  const now=new Date();const cutoff=new Date(now.getFullYear(),now.getMonth(),now.getDate()-27);const cutoffKey=localDateKey(cutoff);const recent=all.filter(r=>r.date>=cutoffKey);const warningDays=new Set(recent.filter(r=>(Number(r.croix)||0)>0).map(r=>r.date));const crosses=recent.reduce((s,r)=>s+(Number(r.croix)||0),0);const obsDays=new Set(recent.filter(r=>String(r.observation||'').trim()).map(r=>r.date));
  frequencyEl.innerHTML=`<div class="beh-frequency__line"><span>Sur les 4 dernières semaines</span><strong>${warningDays.size} jour${warningDays.size>1?'s':''} avec croix</strong></div><div class="beh-frequency__line"><span>Total des croix</span><strong>${crosses}</strong></div><div class="beh-frequency__line"><span>Jours avec observation</span><strong>${obsDays.size}</strong></div><div class="beh-frequency__line"><span>Dernier fait daté</span><strong>${all[0]?esc(frDate(all[0].date)):'—'}</strong></div>`;
}

// Synchronisation différée : tant que l’API V2.9.2 n’est pas déployée, les saisies restent disponibles localement.
let syncTimer=null;

function bind(){
  dateInput.value=localDateKey();$('behTodayBtn').addEventListener('click',()=>{dateInput.value=localDateKey();render();});dateInput.addEventListener('change',render);searchInput.addEventListener('input',render);filterInput.addEventListener('change',render);
  $('behRefreshBtn').addEventListener('click',()=>refreshRemote(true));
  $('behModalClose').addEventListener('click',closeModal);$('behCancelBtn').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))closeModal();});
  form.addEventListener('submit',e=>{e.preventDefault();saveObservation();});deleteBtn.addEventListener('click',deleteObservation);
  window.addEventListener('storage',e=>{if([STORE_KEY,ROSTER_META_KEY,ROSTER_NAMES_KEY].includes(e.key))render();});
  render();
  if(apiConfigured())refreshRemote(false);
}

// Synchronisation Google Sheets V2.9.2. L’écriture POST est ensuite vérifiée par une lecture JSONP de l’event_id.
function jsonp(params){
  return new Promise((resolve,reject)=>{
    if(!apiConfigured()){reject(new Error('Synchronisation non configurée.'));return;}
    const c=config(),callback='progressionsComportement_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);
    const script=document.createElement('script');let done=false;
    const timer=setTimeout(()=>finish(new Error('Délai de synchronisation dépassé.')),12000);
    function finish(err,data){if(done)return;done=true;clearTimeout(timer);try{delete window[callback];}catch(_){window[callback]=undefined;}script.remove();err?reject(err):resolve(data);}
    window[callback]=data=>{if(!data||data.ok===false)finish(new Error(data?.error||'Réponse API invalide.'));else finish(null,data);};
    const q=new URLSearchParams({...params,device_key:c.key,tablet_key:c.key,callback,_:String(Date.now())});
    script.src=c.url+'?'+q.toString();script.async=true;script.referrerPolicy='no-referrer';script.onerror=()=>finish(new Error('API comportement indisponible.'));document.head.appendChild(script);
  });
}
function mergeRemote(remoteRows){
  if(!Array.isArray(remoteRows))return;const rows=readRows();const map=new Map(rows.map(r=>[String(r.event_id||''),r]));
  remoteRows.forEach(r=>{const id=String(r.event_id||'').trim();if(!id)return;const next={event_id:id,date:String(r.date||''),prenom:String(r.prenom||''),croix:Number(r.croix)||0,observation:String(r.observation||''),type:String(r.type||'observation'),synchro:'oui',updated_at:new Date().toISOString()};const local=map.get(id);if(local)Object.assign(local,next);else{rows.push(next);map.set(id,next);}});
  saveRows(rows);
}
async function refreshRemote(showMessage=false){
  if(!apiConfigured()){if(showMessage)setStatus('Synchronisation Google Sheets non configurée sur cet appareil.','error');return false;}
  try{const data=await jsonp({action:'get_comportement',limit:'5000'});mergeRemote(data.comportement||data.data||[]);if(showMessage)setStatus('Observations actualisées depuis Google Sheets.','ok');render();return true;}
  catch(err){if(showMessage)setStatus('Impossible de lire le suivi du comportement : '+String(err.message||err),'error');return false;}
}
async function syncOne(rec){
  if(!apiConfigured()||!rec)return false;const c=config();
  try{
    await fetch(c.url,{method:'POST',mode:'no-cors',cache:'no-store',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({action:'save_comportement',device_key:c.key,tablet_key:c.key,source:'progressions_ce2',comportement:[{event_id:rec.event_id,date:rec.date,prenom:rec.prenom,croix:Number(rec.croix)||0,observation:rec.observation||'',type:rec.type||'observation'}]})});
    await new Promise(r=>setTimeout(r,550));
    const check=await jsonp({action:'get_comportement',prenom:rec.prenom,date:rec.date,limit:'100'});const remote=(check.comportement||[]).find(x=>String(x.event_id||'')===String(rec.event_id||''));
    if(remote){const rows=readRows();const local=rows.find(x=>String(x.event_id||'')===String(rec.event_id||''));if(local){local.synchro='oui';saveRows(rows);}render();return true;}
  }catch(err){console.warn('Synchronisation comportement :',err);}
  return false;
}
function queueSync(rec){clearTimeout(syncTimer);syncTimer=setTimeout(()=>syncOne(rec),700);}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
