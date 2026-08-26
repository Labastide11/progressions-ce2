(function(){
'use strict';
const KEYS={roster:'progressions_ce2_classe_v1',meta:'progressions_ce2_classe_meta_v1',tracking:'progressions_ce2_suivi_eleves_v1',recent:'progressions_ce2_hibou_reussites_v1',proofs:'progressions_ce2_hibou_preuves_v1',api:'hibou_sync_api_url_v25754',device:'hibou_sync_device_key_v25754',last:'progressions_ce2_sync_last_roster_v3279'};
const state={search:'',sort:'recent',filter:'all'};
const staticMeta={}; // V34.79 : aucune métadonnée élève embarquée dans GitHub
let roster=readJson(KEYS.roster,[]),meta={...staticMeta,...readJson(KEYS.meta,{})},tracking=readJson(KEYS.tracking,{}),recent=readJson(KEYS.recent,[]),proofs=readJson(KEYS.proofs,[]),syncState=roster.length?'cache':'loading';
const grid=document.getElementById('studentsGrid'),empty=document.getElementById('emptyState'),syncStatus=document.getElementById('syncStatus');
function readJson(k,f){try{const v=JSON.parse(localStorage.getItem(k)||'null');return v??f}catch(e){return f}}
function writeJson(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function read(k){try{return String(localStorage.getItem(k)||'').trim()}catch(e){return ''}}
function write(k,v){try{localStorage.setItem(k,String(v||''))}catch(e){}}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function norm(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function apiConfig(){return{url:read(KEYS.api),key:read(KEYS.device)}}
function configured(){const c=apiConfig();return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(c.url)&&c.key.length>=16}
function jsonp(params){return new Promise((resolve,reject)=>{const c=apiConfig();if(!configured())return reject(new Error('Synchronisation non configurée'));const cb='progressionsRoster_'+Date.now()+'_'+Math.random().toString(36).slice(2);const s=document.createElement('script');let done=false;const finish=(err,data)=>{if(done)return;done=true;clearTimeout(timer);try{delete window[cb]}catch(e){};s.remove();err?reject(err):resolve(data)};const timer=setTimeout(()=>finish(new Error('Délai de connexion dépassé')),20000);window[cb]=data=>{if(!data||data.ok===false)return finish(new Error(data&&data.error||'Réponse API invalide'));finish(null,data)};const q=new URLSearchParams({...params,device_key:c.key,tablet_key:c.key,callback:cb,_:Date.now()});s.src=c.url+'?'+q;s.onerror=()=>finish(new Error('Réponse JSONP indisponible'));document.head.appendChild(s)})}
function normalizeRoster(rows){
  const names=[];
  const next={};
  (Array.isArray(rows)?rows:[]).forEach(item=>{
    const x=typeof item==='string'?{prenom:item}:item||{};
    const name=String(x.prenom||x.name||'').trim();
    if(!name)return;
    names.push(name);
    const key=norm(name);
    const old=metaFor(name);
    next[key]={
      prenom:name,
      nom:x.nom||x.Nom||old.nom||'',
      sexe:x.sexe||x.Sexe||old.sexe||'',
      naissance:x.naissance||x.date_naissance||x.dateNaissance||x.anniversaire||x['Date de naissance']||old.naissance||'',
      cham:x.cham??x.CHAM??old.cham??''
    };
  });
  roster=[...new Set(names)].sort((a,b)=>a.localeCompare(b,'fr',{sensitivity:'base'}));
  meta={...staticMeta,...next};
  writeJson(KEYS.roster,roster);
  writeJson(KEYS.meta,next);
}
function rowsFrom(data,keys){if(Array.isArray(data))return data;if(!data||typeof data!=='object')return[];for(const k of keys){const v=data[k];if(Array.isArray(v))return v;if(v&&typeof v==='object'){const n=rowsFrom(v,keys);if(n.length)return n}}return[]}
async function refresh(showAlert=false){setBusy(true);try{if(!configured()){syncState=roster.length?'cache':'error';render();if(showAlert)alert('La synchronisation n’est pas configurée sur ce navigateur.');return}const data=await jsonp({action:'get_eleves'});normalizeRoster(Array.isArray(data)?data:data.eleves||[]);syncState='online';write(KEYS.last,new Date().toISOString());render();await Promise.allSettled([loadRecent(),loadProofs()]);render()}catch(e){syncState=roster.length?'cache':'error';render();if(showAlert)alert('Synchronisation impossible. La copie locale est conservée.\n'+e.message)}finally{setBusy(false)}}
async function loadRecent(){try{const data=await jsonp({action:'reussites',limit:250});recent=rowsFrom(data,['reussites','réussites','achievements','rows','results','data']);writeJson(KEYS.recent,recent);window.dispatchEvent(new CustomEvent('progressions-hibou-recent-updated'))}catch(e){}}
async function loadProofs(){for(const action of ['ceintures','competences']){try{const data=await jsonp({action});const rows=rowsFrom(data,['ceintures','competences','rows','results','data']);if(rows.length){proofs=rows;writeJson(KEYS.proofs,proofs);window.dispatchEvent(new CustomEvent('progressions-hibou-proofs-updated'));return}}catch(e){}}}
function setBusy(v){const b=document.getElementById('refreshBtn');if(b){b.disabled=v;b.textContent=v?'⏳ Connexion…':'↻ Actualiser'}}
function metaFor(n){
  const key=norm(n);
  const live=meta[key]||{};
  let fallback=staticMeta[key]||{};
  if(!fallback.prenom){
    fallback=Object.values(staticMeta).find(row=>row&&norm(row.prenom)===key)||{};
  }
  const pick=(a,b)=>{
    if(a===false||a===0)return a;
    if(a!==undefined&&a!==null&&String(a).trim()!=='')return a;
    return b;
  };
  return {
    prenom:pick(live.prenom,fallback.prenom||n),
    nom:pick(live.nom,fallback.nom||''),
    sexe:pick(live.sexe,fallback.sexe||''),
    naissance:pick(live.naissance,fallback.naissance||''),
    cham:pick(live.cham,fallback.cham??'')
  };
}
function portrait(n){
  const sexe=metaFor(n).sexe||'';
  if(window.ProgressionsStudentPhotos)return window.ProgressionsStudentPhotos.get(n,sexe);
  const s=norm(sexe);
  if(['fille','feminin','female','f'].includes(s)||s.startsWith('fill')||s.startsWith('femin'))return'assets/portraits/portrait_fille.png';
  if(['garcon','masculin','male','m','g'].includes(s)||s.startsWith('garc')||s.startsWith('mascul'))return'assets/portraits/portrait_garcon.png';
  return'assets/portraits/portrait_neutre.png';
}
function parseDate(v){if(typeof v==='number'&&Number.isFinite(v))return new Date(Math.round((v-25569)*86400000));const raw=String(v||'').trim();let m=raw.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);if(m)return new Date(+m[3],+m[2]-1,+m[1]);m=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);if(m)return new Date(+m[1],+m[2]-1,+m[3]);const d=new Date(raw);return Number.isNaN(d.getTime())?null:d}
function age(d){const n=new Date();let a=n.getFullYear()-d.getFullYear();if(n.getMonth()<d.getMonth()||(n.getMonth()===d.getMonth()&&n.getDate()<d.getDate()))a--;return a}
function birth(n){const m=metaFor(n),d=parseDate(m.naissance),cham=[true,1,'oui','true','1','x','cham'].includes(typeof m.cham==='string'?norm(m.cham):m.cham)?' · 🎵 CHAM':'';if(!d)return'🎂 Date non renseignée'+cham;return'🎂 '+new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(d)+' · '+age(d)+' ans'+cham}
function eventStudent(r){return String(r&&(r.prenom||r.eleve||r.name||r.student)||'').trim()}
function eventTime(r){const t=new Date(r&&(r.date||r.timestamp||r.datetime||r.created_at||r.createdAt)||0).getTime();return Number.isFinite(t)?t:0}
function activityText(r){if(!r)return'Aucune activité enregistrée';return String(r.texte||r.text||r.detail||r.activite||r.competence||r.ceinture||'Activité Maître Hibou').trim()}
function relative(t){if(!t)return'Aucune activité récente';const m=Math.floor(Math.max(0,Date.now()-t)/60000);if(m<1)return'À l’instant';if(m<60)return'Il y a '+m+' min';const h=Math.floor(m/60);if(h<24)return'Il y a '+h+' h';const d=Math.floor(h/24);if(d<7)return'Il y a '+d+' jour'+(d>1?'s':'');return new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(t))}
function proofCount(n){const set=new Set();proofs.forEach(r=>{if(norm(r&&(r.prenom||r.eleve||r.name))!==norm(n))return;set.add(norm(r.competence||r.title||r.ceinture)+'|'+norm(r.medaille||r.medal))});return set.size}
function needs(n){const p=n+'|';return Object.entries(tracking).some(([k,v])=>k.startsWith(p)&&v&&v.level==='renforcer')}
function info(n){const a=recent.filter(r=>norm(eventStudent(r))===norm(n)).sort((x,y)=>eventTime(y)-eventTime(x));return{name:n,activities:a,latest:a[0]||null,time:eventTime(a[0]),proofs:proofCount(n),needs:needs(n)}}
function filtered(){let x=roster.map(info);const q=norm(state.search);if(q)x=x.filter(i=>norm(i.name).includes(q));if(state.filter==='recent')x=x.filter(i=>i.time&&Date.now()-i.time<=604800000);if(state.filter==='inactive')x=x.filter(i=>!i.time||Date.now()-i.time>1209600000);if(state.filter==='ceintures')x=x.filter(i=>i.proofs>0);if(state.sort==='alpha')x.sort((a,b)=>a.name.localeCompare(b.name,'fr'));else if(state.sort==='needs')x.sort((a,b)=>Number(b.needs)-Number(a.needs)||b.time-a.time||a.name.localeCompare(b.name,'fr'));else x.sort((a,b)=>b.time-a.time||a.name.localeCompare(b.name,'fr'));return x}
function syncText(){const last=new Date(read(KEYS.last)||0).getTime();const source=syncState==='online'?'Google Sheets':syncState==='cache'?'copie locale':'connexion indisponible';return roster.length+' élève'+(roster.length>1?'s':'')+' · '+source+' · dernière actualisation : '+(last?relative(last).toLowerCase():'jamais')}
function card(i){const badges=[i.proofs?'🏅 '+i.proofs+' ceinture'+(i.proofs>1?'s':''):'',i.activities.length?'⭐ '+Math.min(99,i.activities.length)+' activité'+(i.activities.length>1?'s':''):''].filter(Boolean).join(' · ')||'Aucune activité enregistrée';return'<button class="student-card" type="button" data-student="'+esc(i.name)+'"><span class="student-avatar"><img src="'+esc(portrait(i.name))+'" alt="Portrait de '+esc(i.name)+'"></span><span class="student-content"><strong class="student-name">'+esc(i.name)+'</strong><span class="student-meta">'+esc(birth(i.name))+'</span><span class="student-badges">'+esc(badges)+'</span><span class="student-activity"><b>'+esc(activityText(i.latest))+'</b><em>'+esc(relative(i.time))+'</em></span></span><span class="student-arrow">›</span></button>'}
function render(){syncStatus.textContent=syncText();document.getElementById('allCount').textContent=roster.length;const rc=roster.map(info).filter(i=>i.time&&Date.now()-i.time<=604800000).length;document.getElementById('recentCount').textContent=rc;const items=filtered();grid.innerHTML=items.map(card).join('');empty.hidden=items.length>0;grid.hidden=items.length===0;document.getElementById('emptyMessage').textContent=roster.length?'Aucun élève ne correspond à ce filtre.':'La liste de classe n’est pas encore disponible.';grid.querySelectorAll('[data-student]').forEach(b=>b.onclick=()=>window.ParcoursOutil?.openForStudent(b.dataset.student))}
document.getElementById('searchInput').addEventListener('input',e=>{state.search=e.target.value;render()});document.getElementById('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});document.getElementById('quickFilters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;state.filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('is-active',x===b));render()});document.getElementById('refreshBtn').onclick=()=>refresh(true);document.getElementById('emptyRefreshBtn').onclick=()=>refresh(true);
render();if(configured())refresh(false);
window.addEventListener('progressions-roster-updated',()=>{roster=readJson(KEYS.roster,[]);meta=readJson(KEYS.meta,{});render()});
})();
