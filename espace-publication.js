(function(){
'use strict';
const $=id=>document.getElementById(id);
const P_LAST='progressions_ce2_parents_publication_last_v1',P_DATA='progressions_ce2_parents_publication_v1';
const parentDefaults={urgentMessage:'',importantItems:'',upcomingItems:'',documents:'',weekMessage:'',weekItems:'',homeMessage:'',homeItems:'',lifeMessage:'',lifeItems:'',infoMessage:''};
const safeJson=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch(e){return fallback}};
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
const lines=s=>String(s||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
function parentFiles(){
  const v=pInfo(),docs=lines(v.documents).map(x=>{const m=x.match(/^(.*?)\s*\|\s*(https?:\/\/\S+)$/);return m?{label:m[1],url:m[2]}:x});
  return{
    'data/parents-semaine.js':jsFile('PARENTS_SEMAINE',{titre:'Cette semaine',message:v.weekMessage,items:lines(v.weekItems)}),
    'data/parents-travail.js':jsFile('PARENTS_TRAVAIL',{message:v.homeMessage,items:lines(v.homeItems)}),
    'data/parents-vie-classe.js':jsFile('PARENTS_VIE_CLASSE',{message:v.lifeMessage,items:lines(v.lifeItems)}),
    'data/parents-infos.js':jsFile('PARENTS_INFOS',{urgentMessage:v.urgentMessage,importantItems:lines(v.importantItems),upcomingItems:lines(v.upcomingItems),message:v.infoMessage||'',documents:docs})
  };
}
const te=new TextEncoder(),crcTable=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0}
function concatBytes(parts){const size=parts.reduce((n,p)=>n+p.length,0),out=new Uint8Array(size);let o=0;for(const p of parts){out.set(p,o);o+=p.length}return out}
function zipBlob(files){
  const localParts=[],centralParts=[];let offset=0,count=0;
  Object.entries(files).forEach(([name,text])=>{const nb=te.encode(name),db=te.encode(text),crc=crc32(db),lh=new Uint8Array(30+nb.length),lv=new DataView(lh.buffer);lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0x0800,true);lv.setUint32(14,crc,true);lv.setUint32(18,db.length,true);lv.setUint32(22,db.length,true);lv.setUint16(26,nb.length,true);lh.set(nb,30);localParts.push(lh,db);const ch=new Uint8Array(46+nb.length),cv=new DataView(ch.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x0800,true);cv.setUint32(16,crc,true);cv.setUint32(20,db.length,true);cv.setUint32(24,db.length,true);cv.setUint16(28,nb.length,true);cv.setUint32(42,offset,true);ch.set(nb,46);centralParts.push(ch);offset+=lh.length+db.length;count++});
  const central=concatBytes(centralParts),end=new Uint8Array(22),ev=new DataView(end.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,count,true);ev.setUint16(10,count,true);ev.setUint32(12,central.length,true);ev.setUint32(16,offset,true);return new Blob([...localParts,central,end],{type:'application/zip'});
}
function download(files,name){const blob=zipBlob(files),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function saveP(){const f=$('spacesParentsForm');if(f)localStorage.setItem(P_DATA,JSON.stringify(Object.fromEntries(new FormData(f).entries())))}
function fill(){const p=pInfo(),pf=$('spacesParentsForm');if(pf)Object.keys(p).forEach(k=>{if(pf.elements[k])pf.elements[k].value=p[k]||''});refresh()}
function formatLast(){const raw=localStorage.getItem(P_LAST);if(!raw)return'Aucune préparation générée sur cet appareil.';return'Dernière préparation : '+new Intl.DateTimeFormat('fr-FR',{dateStyle:'short',timeStyle:'short'}).format(new Date(raw))}
function refresh(){if($('spacesParentsLast'))$('spacesParentsLast').textContent=formatLast()}
function buildModal(){
  const root=document.createElement('div');root.id='spacesPublishModal';root.className='spaces-publish-modal hidden';
  root.innerHTML=`<section class="spaces-publish-panel" role="dialog" aria-modal="true"><header class="spaces-publish-head"><div><h2>🌐 Mettre à jour l’espace Parents</h2><p>Prépare uniquement les petits fichiers publics destinés aux familles.</p></div><button class="spaces-publish-close" id="spacesPublishClose" aria-label="Fermer">×</button></header><article class="spaces-publish-card"><h3>👨‍👩‍👧 Espace Parents</h3><p>Les apprentissages de la période sont automatiques. Tu publies seulement ce qui change dans la vie de la classe.</p><form id="spacesParentsForm" class="spaces-publish-form"><label class="spaces-publish-urgent">⚡ Info de dernière minute — affichée tout en haut<textarea name="urgentMessage" placeholder="Ex. Demain, pensez à apporter une gourde. Laisser vide s’il n’y a rien d’urgent."></textarea></label><label>📢 Important — rappels du cahier de liaison<textarea name="importantItems" placeholder="Un rappel par ligne : mot à signer, matériel, autorisation…"></textarea></label><label>📅 À venir — compléments manuels<textarea name="upcomingItems" placeholder="Un événement par ligne si nécessaire. Les sorties et temps forts repérés dans Progressions CE2 s’ajoutent automatiquement."></textarea></label><label>📎 Ressources utiles<textarea name="documents" placeholder="Un document par ligne. Pour un lien : Libellé | https://..."></textarea></label></form><div class="spaces-publish-row"><span class="spaces-publish-status" id="spacesParentsLast"></span><button class="spaces-publish-action" id="spacesPublishParents" type="button">📦 Générer le ZIP Parents</button></div></article></section>`;
  document.body.appendChild(root);root.onclick=e=>{if(e.target===root)close()};$('spacesPublishClose').onclick=close;$('spacesPublishParents').onclick=()=>{saveP();download(parentFiles(),'Mise_a_jour_espace_parents.zip');localStorage.setItem(P_LAST,new Date().toISOString());refresh()};fill();
}
function open(){fill();$('spacesPublishModal').classList.remove('hidden')}
function close(){saveP();$('spacesPublishModal').classList.add('hidden')}
function addQuickButton(){const anchor=$('openDailyProgramQuickBtn');if(!anchor||$('spacesPublishQuickBtn'))return;const b=document.createElement('button');b.id='spacesPublishQuickBtn';b.type='button';b.className='home-panel__deco-btn quick-label-btn spaces-publish-btn';b.setAttribute('aria-label','Mettre à jour l’espace Parents');b.dataset.label='Mettre à jour l’espace Parents';b.innerHTML='<span class="quick-label-btn__icon" aria-hidden="true">🌐</span>';anchor.insertAdjacentElement('afterend',b);b.onclick=open}
function getUrgentMessage(){return String(pInfo().urgentMessage||'')}
function setUrgentMessage(message){const current={...safeJson(P_DATA,{})};current.urgentMessage=String(message||'').trim();localStorage.setItem(P_DATA,JSON.stringify(current));const form=$('spacesParentsForm');if(form?.elements?.urgentMessage)form.elements.urgentMessage.value=current.urgentMessage;return current.urgentMessage}
function downloadParentsUpdate(){download(parentFiles(),'Mise_a_jour_espace_parents.zip');localStorage.setItem(P_LAST,new Date().toISOString());refresh()}
window.ProgressionsParentsPublication={getUrgentMessage,setUrgentMessage,downloadParentsUpdate,openFullParentsPanel:open};
function init(){buildModal();addQuickButton()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
