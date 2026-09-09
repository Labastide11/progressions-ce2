(function(){
'use strict';

/*
  Progressions CE2 V36.56 — portraits élèves anonymisés stockés sur GitHub.

  Source de vérité :
  - le Google Sheet privé conserve la correspondance prénom -> fichier anonyme
    dans la colonne "photo" (ex. ce2-05.png) ;
  - GitHub contient uniquement les images anonymisées dans assets/eleves/ ;
  - aucun service externe de stockage d'images n'est utilisé ;
  - si "photo" est vide ou si le fichier n'existe pas : avatar fille/garçon.

  Le module relit directement getElevesData/get_eleves afin de ne pas dépendre
  d'un ancien cache de métadonnées ayant perdu la colonne "photo".
*/

const VERSION='V36.56';
const PORTRAIT_DIR='assets/eleves/';
const META_KEY='progressions_ce2_classe_meta_v1';
const PHOTO_CACHE_KEY='progressions_ce2_photo_meta_v36_56';
const API_URL_KEY='hibou_sync_api_url_v25754';
const DEVICE_KEY='hibou_sync_device_key_v25754';

let liveMeta=readJson(PHOTO_CACHE_KEY,{});
let refreshPromise=null;

function norm(v){
  return String(v||'').trim().toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[’']/g,'-')
    .replace(/\s+/g,' ');
}

function readJson(key,fallback){
  try{
    const value=JSON.parse(localStorage.getItem(key)||'null');
    return value && typeof value==='object' ? value : fallback;
  }catch(_){
    return fallback;
  }
}

function writeJson(key,value){
  try{ localStorage.setItem(key,JSON.stringify(value)); }catch(_){}
}

function read(key){
  try{return String(localStorage.getItem(key)||'').trim();}catch(_){return '';}
}

function fallback(sexe){
  const s=norm(sexe);
  if(['fille','feminin','female','f'].includes(s)||s.startsWith('fill')||s.startsWith('femin')){
    return 'assets/portraits/portrait_fille.png';
  }
  if(['garcon','masculin','male','m','g'].includes(s)||s.startsWith('garc')||s.startsWith('mascul')){
    return 'assets/portraits/portrait_garcon.png';
  }
  return 'assets/portraits/portrait_neutre.png';
}

function cleanFilename(value){
  let name=String(value||'').trim();
  if(!name)return '';
  name=name.replace(/\\/g,'/').split('/').pop();
  if(!/^[A-Za-z0-9._-]+\.(?:png|jpe?g|webp)$/i.test(name))return '';
  return name;
}

function cachedRow(prenom){
  const key=norm(prenom);
  if(liveMeta[key])return liveMeta[key];

  const old=readJson(META_KEY,{});
  if(old[key]&&typeof old[key]==='object')return old[key];

  for(const row of Object.values(old)){
    if(row&&typeof row==='object'&&norm(row.prenom)===key)return row;
  }
  return {};
}

function get(prenom,sexe,photo){
  const row=cachedRow(prenom);
  const filename=cleanFilename(photo||row.photo||row.Photo||row.PHOTO||'');
  return filename
    ? PORTRAIT_DIR+encodeURIComponent(filename)
    : fallback(sexe||row.sexe||row.Sexe||'');
}

function has(prenom,photo){
  const row=cachedRow(prenom);
  return !!cleanFilename(photo||row.photo||row.Photo||row.PHOTO||'');
}

function onError(img,sexe){
  if(!img)return;
  img.onerror=null;
  img.src=fallback(sexe);
}

function configured(){
  const url=read(API_URL_KEY);
  const key=read(DEVICE_KEY);
  return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(url) && key.length>=16;
}

function jsonp(action){
  return new Promise((resolve,reject)=>{
    if(!configured())return reject(new Error('Synchronisation non configurée'));

    const url=read(API_URL_KEY);
    const key=read(DEVICE_KEY);
    const cb='progressionsPhotos_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const script=document.createElement('script');
    let done=false;

    const finish=(error,data)=>{
      if(done)return;
      done=true;
      clearTimeout(timer);
      try{delete window[cb];}catch(_){}
      script.remove();
      error?reject(error):resolve(data);
    };

    const timer=setTimeout(()=>finish(new Error('Délai de connexion dépassé')),15000);

    window[cb]=data=>{
      if(!data||data.ok===false)return finish(new Error(data&&data.error||'Réponse invalide'));
      finish(null,data);
    };

    const params=new URLSearchParams({
      action,
      device_key:key,
      tablet_key:key,
      callback:cb,
      _:Date.now()
    });

    script.src=url+'?'+params.toString();
    script.onerror=()=>finish(new Error('Réponse JSONP indisponible'));
    document.head.appendChild(script);
  });
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

function installRows(rows){
  const next={...liveMeta};

  (Array.isArray(rows)?rows:[]).forEach(raw=>{
    const row=typeof raw==='string'?{prenom:raw}:(raw||{});
    const prenom=String(row.prenom||row.name||'').trim();
    if(!prenom)return;

    const key=norm(prenom);
    const old=next[key]||{};

    next[key]={
      prenom,
      sexe:row.sexe||row.Sexe||row.SEXE||old.sexe||'',
      photo:cleanFilename(row.photo??row.Photo??row.PHOTO??old.photo??'')
    };
  });

  liveMeta=next;
  writeJson(PHOTO_CACHE_KEY,liveMeta);
  window.dispatchEvent(new CustomEvent('progressions-student-photos-updated'));
}

async function refresh(showFeedback=false){
  if(refreshPromise)return refreshPromise;

  refreshPromise=(async()=>{
    try{
      if(!configured())return false;

      let data=null;
      let rows=[];

      try{
        data=await jsonp('getElevesData');
        rows=extractRows(data);
      }catch(_){}

      if(!rows.length){
        data=await jsonp('get_eleves');
        rows=extractRows(data);
      }

      if(!rows.length)throw new Error('Aucune donnée élève reçue');

      installRows(rows);
      return true;
    }catch(error){
      console.warn('Photos élèves locales :',error);
      if(showFeedback){
        alert('Impossible d’actualiser les portraits.\n'+String(error&&error.message||error));
      }
      return false;
    }finally{
      refreshPromise=null;
    }
  })();

  return refreshPromise;
}

function updateDocumentTitle(){
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();

  if(page==='vue-eleves.html'){
    document.title=VERSION+' — Vue élèves — CE2 — Ma classe au quotidien';
  }else if(page==='index.html'||page===''){
    document.title=VERSION+' — Progressions CE2 — Ma classe au quotidien';
  }
}

function removeLegacyPhotoButton(){
  document.getElementById('studentListDrivePhotosBtn')?.remove();
}

function start(){
  updateDocumentTitle();
  removeLegacyPhotoButton();

  const observer=new MutationObserver(removeLegacyPhotoButton);
  observer.observe(document.documentElement,{childList:true,subtree:true});

  refresh(false);
}

window.ProgressionsStudentPhotos={
  version:VERSION,
  get,
  fallback,
  onError,
  has,
  refresh,
  isReady:()=>Object.values(liveMeta).some(row=>row&&cleanFilename(row.photo))
};

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',start,{once:true});
}else{
  start();
}

})();
