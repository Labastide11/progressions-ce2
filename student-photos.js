(function(){
'use strict';
const PHOTO_DIR='assets/photos-eleves/';
const PHOTOS={
  'aaron':'Aaron.JPG','akshiga':'Akshiga.JPG','anissa':'Anissa.JPG','boy':'Boy.JPG',
  'chris-yoan':'Chris-Yoan.JPG','chris yoan':'Chris-Yoan.JPG','hiba':'hiba.JPG',
  'ibrahim':'Ibrahim.JPG','neyla':'Neyla.JPG','nordine':'Nordine.JPG','rofrane':'Rofrane.JPG',
  'sara':'Sara.JPG','tiffany':'Tiffany.JPG','youssef':'Youssef.JPG','zoe':'Zoe.JPG',
  'adam':'adam.JPG','amine':'amine.JPG','badr':'badr.JPG','elea':'elea.JPG',
  'melanie':'melanie.JPG','stefanie':'stefanie.JPG','stephanie':'stefanie.JPG'
};
function norm(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'-').replace(/\s+/g,' ');}
function fallback(sexe){
  const s=norm(sexe);
  if(['fille','feminin','female','f'].includes(s)||s.startsWith('fill')||s.startsWith('femin'))return 'assets/portraits/portrait_fille.png';
  if(['garcon','masculin','male','m','g'].includes(s)||s.startsWith('garc')||s.startsWith('mascul'))return 'assets/portraits/portrait_garcon.png';
  return 'assets/portraits/portrait_neutre.png';
}
function get(prenom,sexe){const file=PHOTOS[norm(prenom)];return file?PHOTO_DIR+file:fallback(sexe);}
function onError(img,sexe){if(!img)return;img.onerror=null;img.src=fallback(sexe);}
window.ProgressionsStudentPhotos={get,fallback,onError,has:prenom=>!!PHOTOS[norm(prenom)]};
})();
