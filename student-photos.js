(function(){
'use strict';

/*
  Progressions CE2 V36.55 — portraits élèves locaux GitHub.
  Source de vérité :
  - la ligne élève issue du Google Sheet fournit directement la colonne "photo";
  - GitHub contient uniquement les avatars anonymisés dans assets/eleves/;
  - aucun accès Google Drive / OAuth;
  - si aucune photo n'est renseignée, avatar fille/garçon par défaut.
*/

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

function cleanFilename(value){
  let name=String(value||'').trim();
  if(!name)return '';
  name=name.replace(/\\/g,'/').split('/').pop();
  if(!/^[A-Za-z0-9._-]+\.(?:png|jpe?g|webp)$/i.test(name))return '';
  return name;
}

/*
  V36.55 : "photo" est transmis directement depuis la ligne élève.
  On ne dépend donc plus d'un ancien cache localStorage qui pouvait ne pas
  contenir la nouvelle colonne H du Sheet.
*/
function get(prenom,sexe,photo){
  const filename=cleanFilename(photo);
  return filename ? PORTRAIT_DIR+encodeURIComponent(filename) : fallback(sexe);
}

function onError(img,sexe){
  if(!img)return;
  img.onerror=null;
  img.src=fallback(sexe);
}

window.ProgressionsStudentPhotos={
  get,
  fallback,
  onError,
  has:photo=>!!cleanFilename(photo),
  isReady:()=>true
};

})();
