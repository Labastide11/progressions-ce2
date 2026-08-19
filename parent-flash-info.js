(function(){
'use strict';
const $=id=>document.getElementById(id);
const MAX=220;

function api(){return window.ProgressionsParentsPublication||null}

function buildModal(){
  if($('parentFlashAdminModal'))return;
  const root=document.createElement('div');
  root.id='parentFlashAdminModal';
  root.className='parent-flash-admin hidden';
  root.innerHTML=`<section class="parent-flash-admin__panel" role="dialog" aria-modal="true" aria-labelledby="parentFlashAdminTitle">
    <header class="parent-flash-admin__head">
      <div>
        <span class="parent-flash-admin__kicker">Espace Parents</span>
        <h2 id="parentFlashAdminTitle">📢 Info de dernière minute</h2>
        <p>Ce message s'affiche en bandeau défilant sur l'accueil Parents et en haut de « Infos de la classe ».</p>
      </div>
      <button class="parent-flash-admin__close" id="parentFlashAdminClose" type="button" aria-label="Fermer">×</button>
    </header>
    <div class="parent-flash-admin__body">
      <label for="parentFlashAdminText">Message publié</label>
      <textarea id="parentFlashAdminText" maxlength="${MAX}" placeholder="Ex. Demain, pensez à apporter une gourde."></textarea>
      <div class="parent-flash-admin__meta">
        <span id="parentFlashAdminCount">0 / ${MAX}</span>
        <span>Conseil : une phrase courte est plus lisible sur téléphone.</span>
      </div>
      <div class="parent-flash-admin__preview" id="parentFlashAdminPreview" hidden>
        <strong>⚡ Aperçu</strong><span id="parentFlashAdminPreviewText"></span>
      </div>
      <div class="parent-flash-admin__actions">
        <button type="button" class="parent-flash-admin__btn parent-flash-admin__btn--ghost" id="parentFlashAdminClear">Effacer</button>
        <button type="button" class="parent-flash-admin__btn" id="parentFlashAdminSave">Enregistrer</button>
        <button type="button" class="parent-flash-admin__btn parent-flash-admin__btn--publish" id="parentFlashAdminPublish">📦 Générer la mise à jour Parents</button>
      </div>
      <p class="parent-flash-admin__note">Le bouton « Générer la mise à jour Parents » crée le petit ZIP à déposer dans ton dépôt GitHub. La page Parents reste ainsi 100 % autonome.</p>
      <div class="parent-flash-admin__status" id="parentFlashAdminStatus"></div>
    </div>
  </section>`;
  document.body.appendChild(root);

  root.addEventListener('click',e=>{if(e.target===root)close()});
  $('parentFlashAdminClose').onclick=close;
  $('parentFlashAdminText').addEventListener('input',refreshPreview);
  $('parentFlashAdminSave').onclick=save;
  $('parentFlashAdminClear').onclick=clearMessage;
  $('parentFlashAdminPublish').onclick=publish;
}
function refreshPreview(){
  const ta=$('parentFlashAdminText');
  const text=String(ta?.value||'');
  $('parentFlashAdminCount').textContent=`${text.length} / ${MAX}`;
  const preview=$('parentFlashAdminPreview');
  const out=$('parentFlashAdminPreviewText');
  preview.hidden=!text.trim();
  if(out)out.textContent=text.trim();
}
function setStatus(text,kind=''){
  const s=$('parentFlashAdminStatus');
  if(!s)return;
  s.textContent=text;
  s.dataset.kind=kind;
}
function open(){
  buildModal();
  const a=api();
  $('parentFlashAdminText').value=a?.getUrgentMessage?.()||'';
  refreshPreview();
  setStatus('');
  $('parentFlashAdminModal').classList.remove('hidden');
  setTimeout(()=>$('parentFlashAdminText')?.focus(),40);
}
function close(){$('parentFlashAdminModal')?.classList.add('hidden')}
function save(){
  const a=api(); if(!a){setStatus('Module de publication indisponible.','error');return}
  const msg=a.setUrgentMessage($('parentFlashAdminText').value);
  $('parentFlashAdminText').value=msg;
  refreshPreview();
  setStatus(msg?'Message enregistré sur cet appareil.':'Message effacé sur cet appareil.','ok');
}
function clearMessage(){
  $('parentFlashAdminText').value='';
  refreshPreview();
  save();
}
function publish(){
  const a=api(); if(!a){setStatus('Module de publication indisponible.','error');return}
  a.setUrgentMessage($('parentFlashAdminText').value);
  a.downloadParentsUpdate();
  setStatus('ZIP Parents généré. Dépose son contenu sur GitHub pour publier le message.','ok');
}
function addQuickButton(){
  const timer=$('timerQuickBtn');
  if(!timer||$('parentFlashQuickBtn'))return;
  const b=document.createElement('button');
  b.id='parentFlashQuickBtn';
  b.type='button';
  b.className='home-panel__deco-btn quick-label-btn parent-flash-quick-btn';
  b.dataset.label='Info Parents';
  b.setAttribute('aria-label','Administrer l’info Parents');
  b.innerHTML='<span class="quick-label-btn__icon"><img src="assets/parents/icon_info_parents.png" alt=""></span>';
  timer.insertAdjacentElement('afterend',b);
  b.onclick=open;
}
function init(){buildModal();addQuickButton()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();