(function(){
'use strict';

/*
  Progressions CE2 V36.54 — portraits élèves locaux GitHub.

  Règle :
  - le Google Sheet privé conserve la correspondance prénom -> fichier anonymisé
    dans la colonne "photo" (ex. ce2-05.png) ;
  - GitHub ne contient que les avatars anonymisés dans assets/eleves/ ;
  - aucun accès Google Drive, aucun OAuth, aucun cache photo Drive ;
  - si la colonne photo est vide ou si le fichier n'existe pas,
    l'avatar fille/garçon déjà présent dans Progressions CE2 est utilisé.
*/

const META_KEY='progressions_ce2_classe_meta_v1';
const PORTRAIT_DIR='assets/eleves/';

function norm(v){
  return String(v||'').trim().toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[’']/g,'-')
    .replace(/\s+/g,' ');
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

function readMeta(){
  try{
    const parsed=JSON.parse(localStorage.getItem(META_KEY)||'{}');
    return parsed&&typeof parsed==='object'?parsed:{};
  }catch(_){
    return {};
  }
}

function metaFor(prenom){
  const wanted=norm(prenom);
  const meta=readMeta();

  if(meta[wanted]&&typeof meta[wanted]==='object')return meta[wanted];

  for(const row of Object.values(meta)){
    if(row&&typeof row==='object'&&norm(row.prenom)===wanted)return row;
  }
  return {};
}

function cleanFilename(value){
  let name=String(value||'').trim();
  if(!name)return '';

  // La feuille peut contenir un simple nom de fichier ou un ancien chemin.
  name=name.replace(/\\/g,'/').split('/').pop();

  // Refus de toute valeur qui ne soit pas un nom d'image simple.
  if(!/^[A-Za-z0-9._-]+\.(?:png|jpe?g|webp)$/i.test(name))return '';
  return name;
}

function photoFor(prenom){
  const row=metaFor(prenom);
  return cleanFilename(row.photo??row.Photo??row.PHOTO??'');
}

function get(prenom,sexe){
  const filename=photoFor(prenom);
  return filename ? PORTRAIT_DIR+encodeURIComponent(filename) : fallback(sexe);
}

function has(prenom){
  return !!photoFor(prenom);
}

function onError(img,sexe){
  if(!img)return;
  img.onerror=null;
  img.src=fallback(sexe);
}

/*
  Sécurité de secours :
  certains écrans historiques créent <img> sans appeler onError().
  Si un avatar local manque (cas des 2 élèves sans photo), on remplace
  automatiquement l'image cassée par l'avatar selon le sexe.
*/
document.addEventListener('error',function(event){
  const img=event.target;
  if(!(img instanceof HTMLImageElement))return;

  const src=String(img.getAttribute('src')||'');
  if(!src.includes('assets/eleves/'))return;

  const alt=String(img.getAttribute('alt')||'');
  const prenom=alt.replace(/^Portrait de\s+/i,'').trim();
  const row=metaFor(prenom);

  img.onerror=null;
  img.src=fallback(row.sexe||row.Sexe||'');
},true);

/*
  Nettoyage unique de l'ancien cache Drive.
  Il ne contient plus rien d'utile depuis la migration des portraits vers GitHub.
*/
try{
  sessionStorage.removeItem('progressions_ce2_drive_student_photos_v35_29');
  sessionStorage.removeItem('progressions_ce2_drive_student_photos_meta_v35_29');
}catch(_){}

window.ProgressionsStudentPhotos={
  get,
  fallback,
  onError,
  has,
  isReady:()=>Object.values(readMeta()).some(row=>row&&cleanFilename(row.photo??row.Photo??row.PHOTO??''))
};

})();
