(function(){
'use strict';
const $=id=>document.getElementById(id);
const R_LAST='progressions_ce2_remplacant_publication_last_v1',R_INFO='progressions_ce2_remplacant_publication_infos_v1',P_LAST='progressions_ce2_parents_publication_last_v1',P_DATA='progressions_ce2_parents_publication_v1';
const ROSTER_KEY='progressions_ce2_classe_v1',ROSTER_META_KEY='progressions_ce2_classe_meta_v1',META_KEY='progressions_ce2_cahier_session_meta_v1',PED_KEY='progressions_ce2_cahier_pedagogy_v2',PROGRAM_PREFIX='progressions_ce2_programme_du_jour_',JOURNAL_PREFIX='progressions_ce2_journal_week_';
const defaults={schoolHours:'9h00–12h00 / 14h00–17h00',breaks:'10h45–11h00 / 15h45–16h00',duties:'Consulter les indications laissées sur le bureau ou affichées dans la classe.',dismissal:'Vérifier les habitudes de sortie, cantine et prises en charge indiquées pour la journée.',materials:'Les cahiers, manuels et outils habituels sont ceux utilisés dans la classe.',other:'En cas de doute, se rapprocher de la direction ou d’un collègue de l’école.'};
const parentDefaults={urgentMessage:'',importantItems:'',upcomingItems:'',documents:'',weekMessage:'',weekItems:'',homeMessage:'',homeItems:'',lifeMessage:'',lifeItems:'',infoMessage:''};
const safeJson=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch(e){return fallback}},norm=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function currentRoster(){const names=safeJson(ROSTER_KEY,[]),meta=safeJson(ROSTER_META_KEY,{}),fallback=Array.isArray(window.REMPLACANT_ELEVES)?window.REMPLACANT_ELEVES:[];if(!Array.isArray(names)||!names.length)return fallback;return names.map(name=>{const m=meta[norm(name)]||{};return{prenom:String(name),initiale:m.initiale||'',sexe:m.sexe||'',cham:String(m.cham||'').toLowerCase()==='oui'||m.cham===true}})}
function collectByPrefix(prefix){const out={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||!k.startsWith(prefix))continue;const suffix=k.slice(prefix.length);try{out[suffix]=JSON.parse(localStorage.getItem(k)||'null')}catch(e){}}return out}
function rInfos(){return{...defaults,...safeJson(R_INFO,{})}}
function pInfo(){
  const stored=safeJson(P_DATA,{});
  return{
    ...parentDefaults,
    ...stored,
    urgentMessage:stored.urgentMessage||stored.weekMessage||'',
    importantItems:stored.importantItems||stored.weekItems||'',
    upcomingItems:stored.upcomingItems||stored.lifeItems||''
  };
}
function jsFile(name,value){return `// Généré depuis Progressions CE2 — ${new Date().toLocaleString('fr-FR')}\nwindow.${name} = ${JSON.stringify(value,null,2)};\n`}
function remplaFiles(){const programmes=collectByPrefix(PROGRAM_PREFIX),summaries=collectByPrefix(JOURNAL_PREFIX),cahier={sessionMeta:safeJson(META_KEY,{}),pedagogyPrefs:safeJson(PED_KEY,{}),summaries};return{'data/remplacant-eleves.js':jsFile('REMPLACANT_ELEVES',currentRoster()),'data/remplacant-programme.js':jsFile('REMPLACANT_PROGRAMMES',programmes),'data/remplacant-cahier-journal.js':jsFile('REMPLACANT_CAHIER',cahier),'data/remplacant-infos-pratiques.js':jsFile('REMPLACANT_INFOS',rInfos())}}
const lines=s=>String(s||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
function parentFiles(){const v=pInfo(),docs=lines(v.documents).map(x=>{const m=x.match(/^(.*?)\s*\|\s*(https?:\/\/\S+)$/);return m?{label:m[1],url:m[2]}:x});return{'data/parents-semaine.js':jsFile('PARENTS_SEMAINE',{titre:'Cette semaine',message:v.weekMessage,items:lines(v.weekItems)}),'data/parents-travail.js':jsFile('PARENTS_TRAVAIL',{message:v.homeMessage,items:lines(v.homeItems)}),'data/parents-vie-classe.js':jsFile('PARENTS_VIE_CLASSE',{message:v.lifeMessage,items:lines(v.lifeItems)}),'data/parents-infos.js':jsFile('PARENTS_INFOS',{urgentMessage:v.urgentMessage,importantItems:lines(v.importantItems),upcomingItems:lines(v.upcomingItems),message:v.infoMessage||'',documents:docs})}}
const te=new TextEncoder(),crcTable=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0}function concatBytes(parts){const size=parts.reduce((n,p)=>n+p.length,0),out=new Uint8Array(size);let o=0;for(const p of parts){out.set(p,o);o+=p.length}return out}
function zipBlob(files){const localParts=[],centralParts=[];let offset=0,count=0;Object.entries(files).forEach(([name,text])=>{const nb=te.encode(name),db=te.encode(text),crc=crc32(db),lh=new Uint8Array(30+nb.length),lv=new DataView(lh.buffer);lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0x0800,true);lv.setUint32(14,crc,true);lv.setUint32(18,db.length,true);lv.setUint32(22,db.length,true);lv.setUint16(26,nb.length,true);lh.set(nb,30);localParts.push(lh,db);const ch=new Uint8Array(46+nb.length),cv=new DataView(ch.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x0800,true);cv.setUint32(16,crc,true);cv.setUint32(20,db.length,true);cv.setUint32(24,db.length,true);cv.setUint16(28,nb.length,true);cv.setUint32(42,offset,true);ch.set(nb,46);centralParts.push(ch);offset+=lh.length+db.length;count++});const central=concatBytes(centralParts),end=new Uint8Array(22),ev=new DataView(end.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,count,true);ev.setUint16(10,count,true);ev.setUint32(12,central.length,true);ev.setUint32(16,offset,true);return new Blob([...localParts,central,end],{type:'application/zip'})}
function download(files,name){const blob=zipBlob(files),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function saveR(){const f=$('spacesPublishInfos');if(f)localStorage.setItem(R_INFO,JSON.stringify(Object.fromEntries(new FormData(f).entries())))}function saveP(){const f=$('spacesParentsForm');if(f)localStorage.setItem(P_DATA,JSON.stringify(Object.fromEntries(new FormData(f).entries())))}
function fill(){const r=rInfos(),rf=$('spacesPublishInfos');if(rf)Object.keys(r).forEach(k=>{if(rf.elements[k])rf.elements[k].value=r[k]||''});const p=pInfo(),pf=$('spacesParentsForm');if(pf)Object.keys(p).forEach(k=>{if(pf.elements[k])pf.elements[k].value=p[k]||''});refresh()}
function formatLast(key){const raw=localStorage.getItem(key);if(!raw)return'Aucune préparation générée sur cet appareil.';return'Dernière préparation : '+new Intl.DateTimeFormat('fr-FR',{dateStyle:'short',timeStyle:'short'}).format(new Date(raw))}
function refresh(){if($('spacesPublishLast'))$('spacesPublishLast').textContent=formatLast(R_LAST);if($('spacesParentsLast'))$('spacesParentsLast').textContent=formatLast(P_LAST)}
function buildModal(){const root=document.createElement('div');root.id='spacesPublishModal';root.className='spaces-publish-modal hidden';root.innerHTML=`<section class="spaces-publish-panel" role="dialog" aria-modal="true"><header class="spaces-publish-head"><div><h2>🌐 Mettre à jour les espaces</h2><p>Prépare uniquement les petits fichiers publics. Aucun accès Google n’est donné aux visiteurs.</p></div><button class="spaces-publish-close" id="spacesPublishClose" aria-label="Fermer">×</button></header><article class="spaces-publish-card"><h3>🧑‍🏫 Espace Remplaçant</h3><p>Élèves · emploi du temps local · programme du jour · cahier journal · infos pratiques.</p><form id="spacesPublishInfos" class="spaces-publish-form"><label>Horaires de l’école<textarea name="schoolHours"></textarea></label><label>Récréations<textarea name="breaks"></textarea></label><label>Services<textarea name="duties"></textarea></label><label>Sortie / cantine<textarea name="dismissal"></textarea></label><label>Outils et matériel<textarea name="materials"></textarea></label><label>Autres informations utiles<textarea name="other"></textarea></label></form><div class="spaces-publish-row"><span class="spaces-publish-status" id="spacesPublishLast"></span><button class="spaces-publish-action" id="spacesPublishRemplacant" type="button">📦 Générer le ZIP Remplaçant</button></div></article><article class="spaces-publish-card"><h3>👨‍👩‍👧 Espace Parents</h3><p>Les apprentissages de la période sont automatiques. Tu publies seulement ce qui change dans la vie de la classe.</p><form id="spacesParentsForm" class="spaces-publish-form"><label class="spaces-publish-urgent">⚡ Info de dernière minute — affichée tout en haut<textarea name="urgentMessage" placeholder="Ex. Demain, pensez à apporter une gourde. Laisser vide s’il n’y a rien d’urgent."></textarea></label><label>📢 Important — rappels du cahier de liaison<textarea name="importantItems" placeholder="Un rappel par ligne : mot à signer, matériel, autorisation…"></textarea></label><label>📅 À venir — compléments manuels<textarea name="upcomingItems" placeholder="Un événement par ligne si nécessaire. Les sorties et temps forts repérés dans Progressions CE2 s’ajoutent automatiquement."></textarea></label><label>📎 Ressources utiles<textarea name="documents" placeholder="Un document par ligne. Pour un lien : Libellé | https://..."></textarea></label></form><div class="spaces-publish-row"><span class="spaces-publish-status" id="spacesParentsLast"></span><button class="spaces-publish-action" id="spacesPublishParents" type="button">📦 Générer le ZIP Parents</button></div></article></section>`;document.body.appendChild(root);root.onclick=e=>{if(e.target===root)close()};$('spacesPublishClose').onclick=close;$('spacesPublishRemplacant').onclick=()=>{saveR();download(remplaFiles(),'Mise_a_jour_espace_remplacant.zip');localStorage.setItem(R_LAST,new Date().toISOString());refresh()};$('spacesPublishParents').onclick=()=>{saveP();download(parentFiles(),'Mise_a_jour_espace_parents.zip');localStorage.setItem(P_LAST,new Date().toISOString());refresh()};fill()}
function open(){fill();$('spacesPublishModal').classList.remove('hidden')}function close(){saveR();saveP();$('spacesPublishModal').classList.add('hidden')}
function addQuickButton(){const anchor=$('openDailyProgramQuickBtn');if(!anchor||$('spacesPublishQuickBtn'))return;const b=document.createElement('button');b.id='spacesPublishQuickBtn';b.type='button';b.className='home-panel__deco-btn quick-label-btn spaces-publish-btn';b.setAttribute('aria-label','Mettre à jour les espaces');b.dataset.label='Mettre à jour les espaces';b.innerHTML='<span class="quick-label-btn__icon" aria-hidden="true">🌐</span>';anchor.insertAdjacentElement('afterend',b);b.onclick=open}
function getUrgentMessage(){return String(pInfo().urgentMessage||'')}
function setUrgentMessage(message){
  const current={...safeJson(P_DATA,{})};
  current.urgentMessage=String(message||'').trim();
  localStorage.setItem(P_DATA,JSON.stringify(current));
  const form=$('spacesParentsForm');
  if(form?.elements?.urgentMessage)form.elements.urgentMessage.value=current.urgentMessage;
  return current.urgentMessage;
}
function downloadParentsUpdate(){
  download(parentFiles(),'Mise_a_jour_espace_parents.zip');
  localStorage.setItem(P_LAST,new Date().toISOString());
  refresh();
}
window.ProgressionsParentsPublication={
  getUrgentMessage,
  setUrgentMessage,
  downloadParentsUpdate,
  openFullParentsPanel:open
};
function init(){buildModal();addQuickButton()}document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
