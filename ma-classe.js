(function(){
'use strict';

const VERSION='V36.57';
const ROSTER_KEY='progressions_ce2_classe_v1';
const META_KEY='progressions_ce2_classe_meta_v1';
const LAST_SYNC_KEY='progressions_ce2_sync_last_roster_v3279';
const ATTENDANCE_PREFIX='progressions_ce2_presences_';
const SESSION_KEY='progressions_ce2_presence_session_v1';
const API_URL_KEY='hibou_sync_api_url_v25754';
const DEVICE_KEY='hibou_sync_device_key_v25754';
const TIMEOUT=20000;

const $=id=>document.getElementById(id);
const grid=$('studentsGrid');
const refreshBtn=$('refreshClassBtn');
const configureBtn=$('configureClassBtn');
const syncInfo=$('syncInfo');
const resetBtn=$('resetAttendanceBtn');

let activeSession=read(SESSION_KEY)||(new Date().getHours()<13?'morning':'afternoon');
if(!['morning','afternoon'].includes(activeSession))activeSession='morning';

function read(key){try{return String(localStorage.getItem(key)||'').trim();}catch(_){return '';}}
function write(key,value){try{localStorage.setItem(key,String(value||''));}catch(_){}}
function readJson(key,fallback){try{const v=JSON.parse(localStorage.getItem(key)||'null');return v??fallback;}catch(_){return fallback;}}
function writeJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}}
function norm(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function esc(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function yes(v){return v===true||v===1||['oui','true','vrai','yes','1','x','cham'].includes(norm(v));}

function localDateKey(){
  const d=new Date();
  return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
}
function attendanceKey(){return ATTENDANCE_PREFIX+localDateKey();}
function readAttendance(){
  const d=readJson(attendanceKey(),{morning:[],afternoon:[]})||{};
  return {morning:Array.isArray(d.morning)?d.morning:[],afternoon:Array.isArray(d.afternoon)?d.afternoon:[]};
}
function saveAttendance(data){
  writeJson(attendanceKey(),{
    morning:[...new Set(data.morning||[])],
    afternoon:[...new Set(data.afternoon||[])]
  });
}
function studentKey(s){return norm([s.prenom,s.nom].filter(Boolean).join('|'));}

function config(){
  return {url:read(API_URL_KEY),key:read(DEVICE_KEY)};
}
function configured(){
  const c=config();
  return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(c.url)&&c.key.length>=16;
}
function configure(){
  const current=config();
  let url=prompt('URL de la nouvelle API Apps Script (se termine par /exec) :',current.url||'');
  if(url===null)return false;
  let key=prompt('Clé tablette TABLET_DEVICE_KEY :',current.key||'');
  if(key===null)return false;
  url=String(url||'').trim();
  key=String(key||'').trim();
  if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(url)){
    alert('URL invalide : elle doit se terminer par /exec.');
    return false;
  }
  if(key.length<16){
    alert('Clé tablette trop courte.');
    return false;
  }
  write(API_URL_KEY,url);
  write(DEVICE_KEY,key);
  return true;
}

function jsonpAttempt(action,attempt){
  return new Promise((resolve,reject)=>{
    if(!configured())return reject(new Error('Synchronisation non configurée.'));
    const c=config();
    const callback='maClasse_'+Date.now()+'_'+Math.random().toString(36).slice(2,9);
    const script=document.createElement('script');
    let done=false;

    const finish=(error,data)=>{
      if(done)return;
      done=true;
      clearTimeout(timer);
      try{delete window[callback];}catch(_){}
      script.remove();
      error?reject(error):resolve(data);
    };

    const timer=setTimeout(()=>finish(new Error('Délai de connexion au Google Sheet dépassé.')),TIMEOUT);

    window[callback]=data=>{
      if(!data||data.ok===false){
        return finish(new Error(data&&data.error?String(data.error):'Réponse API invalide.'));
      }
      finish(null,data);
    };

    const q=new URLSearchParams({
      action,
      device_key:c.key,
      tablet_key:c.key,
      callback,
      attempt:String(attempt||1),
      _:String(Date.now())
    });

    script.async=true;
    script.referrerPolicy='no-referrer';
    script.src=c.url+'?'+q.toString();
    script.onerror=()=>finish(new Error('La synchronisation n’a pas répondu.'));
    document.head.appendChild(script);
  });
}

async function jsonp(action){
  let last=null;
  for(let attempt=1;attempt<=2;attempt++){
    try{return await jsonpAttempt(action,attempt);}
    catch(error){last=error;if(attempt<2)await new Promise(r=>setTimeout(r,800));}
  }
  throw last||new Error('Connexion impossible.');
}

function extractRows(value){
  if(Array.isArray(value))return value;
  if(!value||typeof value!=='object')return [];
  if(Array.isArray(value.eleves))return value.eleves;
  if(Array.isArray(value.students))return value.students;
  if(Array.isArray(value.data))return value.data;
  if(value.data&&Array.isArray(value.data.eleves))return value.data.eleves;
  if(value.result&&Array.isArray(value.result.eleves))return value.result.eleves;
  return [];
}

function normalizeRow(raw,old={}){
  const source=typeof raw==='string'?{prenom:raw}:(raw||{});
  const prenom=String(source.prenom||source.name||old.prenom||'').trim();
  return {
    prenom,
    nom:source.nom||source.Nom||source.NOM||source.nom_famille||source.nomFamille||old.nom||'',
    initiale:source.initiale||source.Initiale||source.INITIALE||old.initiale||'',
    sexe:source.sexe||source.Sexe||source.SEXE||old.sexe||'',
    naissance:source.naissance||source.date_naissance||source.dateNaissance||source.anniversaire||source.date_de_naissance||source['Date de naissance']||old.naissance||'',
    actif:source.actif??source.Actif??source.ACTIF??old.actif??'',
    cham:source.cham??source.CHAM??old.cham??'',
    ulis:source.ulis??source.ULIS??old.ulis??'',
    photo:source.photo||source.Photo||source.PHOTO||old.photo||''
  };
}

function rowsFromCache(){
  const meta=readJson(META_KEY,{})||{};
  const names=readJson(ROSTER_KEY,[])||[];
  const rows=[];

  if(Array.isArray(names)){
    names.forEach(name=>{
      const key=norm(name);
      const old=meta[key]||Object.values(meta).find(r=>r&&norm(r.prenom)===key)||{};
      rows.push(normalizeRow({prenom:name},old));
    });
  }
  if(!rows.length){
    Object.values(meta).forEach(row=>{
      if(row&&row.prenom)rows.push(normalizeRow(row,row));
    });
  }
  return sortRows(rows);
}

function sortRows(rows){
  return [...rows]
    .filter(r=>r&&r.prenom)
    .sort((a,b)=>String(a.prenom).localeCompare(String(b.prenom),'fr',{sensitivity:'base'}));
}

function saveRows(rows){
  const sorted=sortRows(rows);
  const meta={};
  sorted.forEach(row=>{meta[norm(row.prenom)]=row;});
  writeJson(ROSTER_KEY,sorted.map(r=>r.prenom));
  writeJson(META_KEY,meta);
  write(LAST_SYNC_KEY,new Date().toISOString());
  window.dispatchEvent(new CustomEvent('progressions-roster-updated'));
  return sorted;
}

async function refresh(showFeedback=true){
  if(!configured()){
    if(showFeedback&&configure())return refresh(true);
    render(rowsFromCache());
    return false;
  }

  refreshBtn.disabled=true;
  refreshBtn.textContent='⏳ Actualisation…';
  if(syncInfo)syncInfo.textContent='Connexion à Google Sheets…';

  try{
    let response=null;
    let rows=[];
    try{
      response=await jsonp('getElevesData');
      rows=extractRows(response);
    }catch(_){}

    if(!rows.length){
      response=await jsonp('get_eleves');
      rows=extractRows(response);
    }
    if(!rows.length)throw new Error('Aucune donnée élève reçue.');

    const oldMeta=readJson(META_KEY,{})||{};
    const normalized=rows
      .map(raw=>{
        const source=typeof raw==='string'?{prenom:raw}:(raw||{});
        const name=String(source.prenom||source.name||'').trim();
        const old=oldMeta[norm(name)]||{};
        return normalizeRow(source,old);
      })
      .filter(r=>r.prenom);

    const saved=saveRows(normalized);

    // Le module photo peut conserver son cache propre ; on lui signale que
    // les nouvelles valeurs "photo" sont disponibles dans META_KEY.
    window.ProgressionsStudentPhotos?.refresh?.(false);
    render(saved);

    if(showFeedback)alert(`${saved.length} élèves actualisés.`);
    return true;
  }catch(error){
    console.warn('Ma classe :',error);
    render(rowsFromCache());
    if(showFeedback)alert('Synchronisation impossible.\n'+String(error&&error.message||error));
    return false;
  }finally{
    refreshBtn.disabled=false;
    refreshBtn.textContent='🔄 Actualiser';
  }
}

function parseBirth(row){
  const raw=row.naissance||'';
  if(!raw)return null;
  const s=String(raw).trim();
  let d=null;
  const fr=s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
  if(fr)d=new Date(Number(fr[3]),Number(fr[2])-1,Number(fr[1]));
  else{
    const iso=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if(iso)d=new Date(Number(iso[1]),Number(iso[2])-1,Number(iso[3]));
    else{
      const parsed=new Date(s);
      if(!isNaN(parsed))d=parsed;
    }
  }
  return d&&!isNaN(d)?d:null;
}
function formatBirth(row){
  const d=parseBirth(row);
  if(!d)return row.naissance||'Date non renseignée';
  return new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'short',year:'numeric'}).format(d).replace(/^0/,'');
}
function isGirl(sexe){
  const s=norm(sexe);
  return ['fille','feminin','female','f'].includes(s)||s.startsWith('fill')||s.startsWith('femin');
}
function fallbackPortrait(sexe){
  if(isGirl(sexe))return 'assets/portraits/portrait_fille.png';
  const s=norm(sexe);
  if(['garcon','masculin','male','m','g'].includes(s)||s.startsWith('garc')||s.startsWith('mascul'))return 'assets/portraits/portrait_garcon.png';
  return 'assets/portraits/portrait_neutre.png';
}
function portrait(row){
  return window.ProgressionsStudentPhotos?.get?.(row.prenom,row.sexe||'',row.photo||'')||fallbackPortrait(row.sexe||'');
}

function updateBirthdays(rows){
  const el=$('monthBirthdays');
  const now=new Date();
  const birthdays=rows.map(row=>{
    const d=parseBirth(row);
    if(!d||d.getMonth()!==now.getMonth())return null;
    return {prenom:row.prenom,day:d.getDate(),age:now.getFullYear()-d.getFullYear()};
  }).filter(Boolean).sort((a,b)=>a.day-b.day||a.prenom.localeCompare(b.prenom,'fr'));

  el.textContent=birthdays.length
    ? `🎂 Anniversaires du mois : ${birthdays.map(b=>`${b.prenom} (le ${b.day}, ${b.age} ans)`).join(' · ')}`
    : '🎂 Aucun anniversaire ce mois-ci';
}

function updateSyncInfo(){
  const raw=read(LAST_SYNC_KEY);
  const d=raw?new Date(raw):null;
  syncInfo.textContent=d&&!isNaN(d)
    ? 'Actualisé à '+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})
    : 'Données locales';
}

function render(rows=rowsFromCache()){
  rows=sortRows(rows);
  const attendance=readAttendance();
  const absentSet=new Set(attendance[activeSession]||[]);

  document.querySelectorAll('[data-session]').forEach(btn=>
    btn.classList.toggle('is-active',btn.dataset.session===activeSession)
  );

  const present=Math.max(0,rows.length-absentSet.size);
  $('presentCount').textContent=`${present} présent${present>1?'s':''}`;
  $('absentCount').textContent=`${absentSet.size} absent${absentSet.size>1?'s':''}`;
  $('copyCount').textContent=String(present);
  updateBirthdays(rows);
  updateSyncInfo();

  if(!rows.length){
    grid.innerHTML='<div class="empty-state">Aucun élève disponible. Utilise « Actualiser » ou « Configurer » dans le bandeau.</div>';
    return;
  }

  grid.innerHTML=rows.map((row,index)=>{
    const key=studentKey(row);
    const absent=absentSet.has(key);
    const cham=yes(row.cham);
    const ulis=yes(row.ulis);
    const girl=isGirl(row.sexe);

    return `<article class="student-card ${girl?'is-girl':'is-boy'} ${absent?'is-absent':''}">
      <span class="student-number">${index+1}</span>
      <button class="student-photo" type="button" data-attendance-key="${esc(key)}" aria-pressed="${absent?'true':'false'}" aria-label="${absent?'Remettre':'Marquer'} ${esc(row.prenom)} ${absent?'présent':'absent'}">
        <img src="${esc(portrait(row))}" alt="" onerror="window.ProgressionsStudentPhotos?.onError?.(this,'${esc(row.sexe||'')}')">
      </button>
      <div class="student-main">
        <div class="student-name-line">
          <strong class="student-name">${esc(row.prenom)}</strong>
          <span class="student-markers">
            ${ulis?'<span class="student-marker" title="ULIS">⭐</span>':''}
            ${cham?'<span class="student-marker" title="CHAM">🎵</span>':''}
          </span>
        </div>
        <span class="attendance-badge ${absent?'is-absent':''}">${absent?'🔴 Absent':'🟢 Présent'}</span>
        <small class="student-birth">${esc(formatBirth(row))}</small>
      </div>
    </article>`;
  }).join('');

  grid.querySelectorAll('[data-attendance-key]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const data=readAttendance();
      const set=new Set(data[activeSession]||[]);
      const key=btn.dataset.attendanceKey;
      set.has(key)?set.delete(key):set.add(key);
      data[activeSession]=[...set];
      saveAttendance(data);
      render(rows);
    });
  });
}

document.querySelectorAll('[data-session]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    activeSession=btn.dataset.session;
    write(SESSION_KEY,activeSession);
    render();
  });
});

resetBtn.addEventListener('click',()=>{
  const label=activeSession==='morning'?'du matin':'de l’après-midi';
  if(!confirm(`Remettre tous les élèves présents pour la séance ${label} ?`))return;
  const data=readAttendance();
  data[activeSession]=[];
  saveAttendance(data);
  render();
});

refreshBtn.addEventListener('click',()=>refresh(true));
configureBtn.addEventListener('click',()=>{
  if(configure()){
    refresh(true);
  }
});

window.addEventListener('storage',event=>{
  if([ROSTER_KEY,META_KEY,attendanceKey()].includes(event.key))render();
});
window.addEventListener('progressions-student-photos-updated',()=>render());

document.title=VERSION+' — Progressions CE2 — Ma classe';
render();
if(configured())refresh(false);

})();
