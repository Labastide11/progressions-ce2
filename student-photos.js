(function(){
'use strict';

/* Progressions CE2 V35.29 — portraits élèves depuis Google Drive privé.
   - OAuth Google Identity Services côté navigateur.
   - Lecture seule Drive.
   - Le code n'interroge que le dossier configuré ci-dessous.
   - Les images téléchargées restent dans sessionStorage du navigateur et ne sont jamais envoyées vers GitHub. */

const CLIENT_ID='859027736300-ssed05d8tg7on7pqf44dtr27tu0rrdfl.apps.googleusercontent.com';
const FOLDER_ID='1ruw1lIc67VNkHqoZhz-EYkTSluifSZHR';
const SCOPE='https://www.googleapis.com/auth/drive.readonly';
const CACHE_KEY='progressions_ce2_drive_student_photos_v35_29';
const CACHE_META_KEY='progressions_ce2_drive_student_photos_meta_v35_29';
const GIS_SRC='https://accounts.google.com/gsi/client';

let tokenClient=null;
let busy=false;
let cache=readCache();

function norm(v){
  return String(v||'').trim().toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[’']/g,'-')
    .replace(/\s+/g,' ');
}
function fallback(sexe){
  const s=norm(sexe);
  if(['fille','feminin','female','f'].includes(s)||s.startsWith('fill')||s.startsWith('femin'))return 'assets/portraits/portrait_fille.png';
  if(['garcon','masculin','male','m','g'].includes(s)||s.startsWith('garc')||s.startsWith('mascul'))return 'assets/portraits/portrait_garcon.png';
  return 'assets/portraits/portrait_neutre.png';
}
function readCache(){
  try{
    const raw=sessionStorage.getItem(CACHE_KEY);
    const parsed=raw?JSON.parse(raw):{};
    return parsed&&typeof parsed==='object'?parsed:{};
  }catch(_){return {};}
}
function saveCache(next){
  cache=next||{};
  try{
    sessionStorage.setItem(CACHE_KEY,JSON.stringify(cache));
    sessionStorage.setItem(CACHE_META_KEY,JSON.stringify({savedAt:Date.now(),count:Object.keys(cache).length}));
  }catch(err){
    throw new Error('Le navigateur ne peut pas conserver les portraits dans cette session. '+(err&&err.message?err.message:''));
  }
}
function get(prenom,sexe){
  return cache[norm(prenom)]||fallback(sexe);
}
function has(prenom){return !!cache[norm(prenom)];}
function onError(img,sexe){if(!img)return;img.onerror=null;img.src=fallback(sexe);}
function clear(){
  cache={};
  try{sessionStorage.removeItem(CACHE_KEY);sessionStorage.removeItem(CACHE_META_KEY);}catch(_){}
  updateUi('idle');
}

function loadGis(){
  if(window.google&&window.google.accounts&&window.google.accounts.oauth2)return Promise.resolve();
  return new Promise((resolve,reject)=>{
    const existing=document.querySelector('script[data-progressions-gis]');
    if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',()=>reject(new Error('Google Identity Services indisponible.')),{once:true});return;}
    const s=document.createElement('script');
    s.src=GIS_SRC;s.async=true;s.defer=true;s.dataset.progressionsGis='1';
    s.onload=resolve;s.onerror=()=>reject(new Error('Impossible de charger Google Identity Services.'));
    document.head.appendChild(s);
  });
}

async function apiJson(url,token){
  const r=await fetch(url,{headers:{Authorization:'Bearer '+token}});
  if(!r.ok){let msg='';try{msg=(await r.json())?.error?.message||'';}catch(_){}throw new Error(msg||('Google Drive HTTP '+r.status));}
  return r.json();
}
async function blobToDataUrl(blob){
  return new Promise((resolve,reject)=>{const fr=new FileReader();fr.onload=()=>resolve(String(fr.result||''));fr.onerror=()=>reject(fr.error||new Error('Lecture image impossible'));fr.readAsDataURL(blob);});
}
async function fetchPhotoData(file,token){
  const r=await fetch('https://www.googleapis.com/drive/v3/files/'+encodeURIComponent(file.id)+'?alt=media',{headers:{Authorization:'Bearer '+token}});
  if(!r.ok)throw new Error('Impossible de lire '+file.name+' (HTTP '+r.status+').');
  return blobToDataUrl(await r.blob());
}
async function listFolderFiles(token){
  const q="'"+FOLDER_ID+"' in parents and trashed = false";
  const url='https://www.googleapis.com/drive/v3/files?pageSize=100&orderBy=name&q='+encodeURIComponent(q)+'&fields='+encodeURIComponent('files(id,name,mimeType,size)');
  const data=await apiJson(url,token);
  return (data.files||[]).filter(f=>/^image\//i.test(f.mimeType||'')||/\.(jpe?g|png|webp)$/i.test(f.name||''));
}
async function buildCache(token){
  const files=await listFolderFiles(token);
  if(!files.length)throw new Error('Aucune image trouvée dans le dossier Drive configuré.');
  const next={};
  for(const file of files){
    const stem=String(file.name||'').replace(/\.[^.]+$/,'');
    const key=norm(stem);
    if(!key)continue;
    const dataUrl=await fetchPhotoData(file,token);
    next[key]=dataUrl;
    // Alias historique : la photo est nommée stefanie.JPG mais l'élève peut être écrit Stéphanie.
    if(key==='stefanie')next['stephanie']=dataUrl;
    updateUi('loading',Object.keys(next).length+'/'+files.length);
  }
  saveCache(next);
  return Object.keys(next).length;
}

async function connect(){
  if(busy)return;
  busy=true;updateUi('loading','connexion…');
  try{
    await loadGis();
    if(!tokenClient){
      tokenClient=google.accounts.oauth2.initTokenClient({
        client_id:CLIENT_ID,
        scope:SCOPE,
        callback:async response=>{
          if(response&&response.error){busy=false;updateUi('error',response.error);return;}
          try{
            const count=await buildCache(response.access_token);
            updateUi('ready',count+' portraits');
            // Recharge la page : toutes les vues existantes utilisent alors immédiatement les images du cache de session.
            setTimeout(()=>location.reload(),350);
          }catch(err){busy=false;updateUi('error',err.message||String(err));}
        },
        error_callback:err=>{busy=false;updateUi('error',(err&&err.type)||'Connexion annulée');}
      });
    }
    tokenClient.requestAccessToken({prompt:''});
  }catch(err){busy=false;updateUi('error',err.message||String(err));}
}

function uiHost(){
  return document.querySelector('.header-actions')||document.querySelector('.page-context')||document.querySelector('.page-header')||document.body;
}
function ensureUi(){
  if(document.getElementById('progressionsDrivePhotosBtn'))return;
  const style=document.createElement('style');
  style.textContent=`
  .progressions-drive-photos{display:inline-flex;align-items:center;gap:.45rem;border:1px solid #cbd5e1;background:#fff;color:#183153;border-radius:999px;padding:.48rem .72rem;font:700 13px/1.1 system-ui,sans-serif;box-shadow:0 2px 10px rgba(15,23,42,.10);cursor:pointer;white-space:nowrap}
  .progressions-drive-photos:hover{background:#f8fafc}.progressions-drive-photos.is-ready{border-color:#86efac;background:#f0fdf4;color:#166534}.progressions-drive-photos.is-loading{opacity:.72;cursor:progress}.progressions-drive-photos.is-error{border-color:#fca5a5;background:#fef2f2;color:#991b1b}
  .progressions-drive-photos__dot{width:.52rem;height:.52rem;border-radius:50%;background:#94a3b8}.is-ready .progressions-drive-photos__dot{background:#22c55e}.is-loading .progressions-drive-photos__dot{background:#f59e0b}.is-error .progressions-drive-photos__dot{background:#ef4444}
  body>.progressions-drive-photos--floating{position:fixed;right:18px;bottom:18px;z-index:100000}
  `;
  document.head.appendChild(style);
  const b=document.createElement('button');
  b.type='button';b.id='progressionsDrivePhotosBtn';b.className='progressions-drive-photos';
  b.title='Charger les portraits privés depuis Google Drive';
  b.addEventListener('click',connect);
  const host=uiHost();
  if(host===document.body)b.classList.add('progressions-drive-photos--floating');
  host.appendChild(b);
  updateUi(Object.keys(cache).length?'ready':'idle');
}
function updateUi(state,detail){
  const b=document.getElementById('progressionsDrivePhotosBtn');if(!b)return;
  b.classList.remove('is-ready','is-loading','is-error');
  if(state==='ready')b.classList.add('is-ready');
  if(state==='loading')b.classList.add('is-loading');
  if(state==='error')b.classList.add('is-error');
  const count=Object.keys(cache).filter(k=>k!=='stephanie').length;
  let label='Photos Drive';
  if(state==='ready')label='Photos Drive · '+(detail||count+' chargées');
  else if(state==='loading')label='Photos Drive · '+(detail||'chargement…');
  else if(state==='error')label='Photos Drive · erreur';
  b.innerHTML='<span class="progressions-drive-photos__dot" aria-hidden="true"></span><span>'+escapeHtml(label)+'</span>';
  if(state==='error'&&detail)b.title=String(detail)+' — cliquer pour réessayer';
  else b.title=state==='ready'?'Portraits Drive disponibles pour cette session — cliquer pour actualiser':'Se connecter à Google pour charger les portraits privés';
  b.disabled=state==='loading';
}
function escapeHtml(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

window.ProgressionsStudentPhotos={get,fallback,onError,has,connect,clear,isReady:()=>Object.keys(cache).length>0};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureUi,{once:true});else ensureUi();
})();
