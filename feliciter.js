
(function(){
'use strict';
const $=id=>document.getElementById(id), norm=v=>String(v||'').trim();
const modal=$('feliciterModal'); if(!modal)return;
const openBtn=$('openFeliciterBtn'), closeBtn=$('closeFeliciterBtn');
const studentSelect=$('feliciterStudent'), modeStudent=$('feliciterModeStudent'), modeClass=$('feliciterModeClass');
const studentField=$('feliciterStudentField'), message=$('feliciterMessage'), previewRecipient=$('feliciterPreviewRecipient'), previewMessage=$('feliciterPreviewMessage'), ticket=$('feliciterTicket'), previewDate=ticket.querySelector('.feliciter-ticket__date');
const historyKey='progressions_ce2_felicitations_v1'; let mode='student', motif='progres', background='fete', tbiView=null;
const templates={
 efforts:n=>`${n}, tes efforts réguliers méritent d’être félicités. Tu t’appliques et tu ne renonces pas.`,
 progres:n=>`${n}, tu as fait de beaux progrès. Ton travail et ta confiance grandissent chaque jour.`,
 comportement:n=>`${n}, ton comportement positif et respectueux contribue au bien-être de la classe.`,
 entraide:n=>`${n}, ton aide et ta gentillesse envers les autres sont précieuses.`,
 perseverance:n=>`${n}, ta persévérance est remarquable. Tu continues même lorsque le travail est difficile.`
};
const classTemplates={
 efforts:'La classe, vos efforts réguliers et votre application méritent d’être félicités.',
 progres:'La classe, vous avez fait de beaux progrès. Continuez à avancer ensemble avec confiance.',
 comportement:'La classe, votre comportement positif et respectueux rend le travail agréable pour tous.',
 entraide:'La classe, votre entraide et votre solidarité sont précieuses. Bravo pour cet esprit collectif.',
 perseverance:'La classe, votre persévérance est remarquable. Vous continuez même lorsque le travail est difficile.'
};
function roster(){const a=window.ProgressionsRoster?.getMeta?.();if(Array.isArray(a)&&a.length)return a;try{return Object.values(JSON.parse(localStorage.getItem('progressions_ce2_classe_meta_v1')||'{}')||{});}catch(e){return [];}}
function fillStudents(){const rows=roster().filter(x=>x&&x.prenom).sort((a,b)=>String(a.prenom).localeCompare(String(b.prenom),'fr'));studentSelect.innerHTML=rows.map(x=>`<option value="${String(x.prenom).replace(/"/g,'&quot;')}">${x.prenom}</option>`).join('');if(!rows.length)studentSelect.innerHTML='<option value="">Aucun élève disponible</option>';}
function recipientName(){return mode==='class'?'Toute la classe':(studentSelect.value||'Cet élève');}
function defaultMessage(){const name=recipientName();return mode==='class'?classTemplates[motif]:templates[motif](name);}
function applyBackground(target){if(!target)return;target.classList.remove('background-fete','background-ecole','background-reussite','background-aucun');target.classList.add('background-'+background);}
function formatToday(){return new Intl.DateTimeFormat('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date()).replace(/^./,c=>c.toUpperCase());}
function updatePreview(){previewRecipient.textContent=mode==='class'?'Pour toute la classe':`Pour ${recipientName()}`;previewMessage.textContent=norm(message.value)||defaultMessage();if(previewDate)previewDate.textContent=formatToday();ticket.className='feliciter-ticket';applyBackground(ticket.closest('.feliciter-preview-card'));}
function setMode(next){mode=next;modeStudent.classList.toggle('is-active',mode==='student');modeClass.classList.toggle('is-active',mode==='class');studentField.hidden=mode==='class';message.value=defaultMessage();updatePreview();}
function saveHistory(){let h=[];try{h=JSON.parse(localStorage.getItem(historyKey)||'[]')||[];}catch(e){}h.unshift({date:new Date().toISOString(),recipient:recipientName(),motif,message:message.value});localStorage.setItem(historyKey,JSON.stringify(h.slice(0,20)));renderHistory();}
function renderHistory(){let h=[];try{h=JSON.parse(localStorage.getItem(historyKey)||'[]')||[];}catch(e){}const el=$('feliciterHistoryList');el.innerHTML=h.length?h.slice(0,5).map(x=>`<div class="feliciter-history-item"><strong>${new Date(x.date).toLocaleDateString('fr-FR')}</strong> · ${x.recipient} · ${x.motif}</div>`).join(''):'<div class="feliciter-history-item">Aucun billet créé pour le moment.</div>';}

function stripIds(node){if(node.nodeType!==1)return;node.removeAttribute('id');node.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));}
function ensureTbiView(){
  if(tbiView)return tbiView;
  const view=document.createElement('section');
  view.className='feliciter-tbi hidden';
  view.setAttribute('aria-hidden','true');
  view.innerHTML='<div class="feliciter-tbi__toolbar"><button type="button" data-feliciter-fullscreen>⛶ Plein écran</button><button type="button" data-feliciter-tbi-close>✕ Fermer</button></div><div class="feliciter-tbi__stage"></div>';
  document.body.appendChild(view);
  view.querySelector('[data-feliciter-tbi-close]').addEventListener('click',closeTbi);
  view.querySelector('[data-feliciter-fullscreen]').addEventListener('click',async()=>{try{if(!document.fullscreenElement)await view.requestFullscreen();else await document.exitFullscreen();}catch(e){console.warn('Plein écran indisponible',e);}});
  tbiView=view;
  return view;
}
function openTbi(){
  updatePreview();saveHistory();
  const view=ensureTbiView(),stage=view.querySelector('.feliciter-tbi__stage');
  applyBackground(stage);
  const clone=ticket.cloneNode(true);stripIds(clone);clone.classList.add('feliciter-tbi__ticket');
  stage.replaceChildren(clone);
  view.classList.remove('hidden');view.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeTbi(){
  if(!tbiView)return;
  tbiView.classList.add('hidden');tbiView.setAttribute('aria-hidden','true');
  if(document.fullscreenElement===tbiView)document.exitFullscreen().catch(()=>{});
  if(modal.classList.contains('hidden'))document.body.classList.remove('modal-open');
}

function open(){fillStudents();setMode('student');renderHistory();modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
openBtn?.addEventListener('click',open);closeBtn?.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(tbiView&&!tbiView.classList.contains('hidden')){closeTbi();return;}if(!modal.classList.contains('hidden'))close()});
modeStudent.addEventListener('click',()=>setMode('student'));modeClass.addEventListener('click',()=>setMode('class'));studentSelect.addEventListener('change',()=>{message.value=defaultMessage();updatePreview()});message.addEventListener('input',updatePreview);
document.querySelectorAll('.feliciter-motif').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.feliciter-motif').forEach(x=>x.classList.remove('is-active'));b.classList.add('is-active');motif=b.dataset.motif;message.value=defaultMessage();updatePreview()}));
document.querySelectorAll('.feliciter-theme').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.feliciter-theme').forEach(x=>x.classList.remove('is-active'));b.classList.add('is-active');background=b.dataset.background||'aucun';updatePreview()}));
$('generateFeliciterBtn').addEventListener('click',()=>{updatePreview();saveHistory();$('generateFeliciterBtn').textContent='✓ Billet prêt';setTimeout(()=>$('generateFeliciterBtn').textContent='✨ Générer le billet',1400)});
$('printFeliciterBtn').addEventListener('click',openTbi);
$('clearFeliciterBtn').addEventListener('click',()=>{message.value=defaultMessage();updatePreview()});
window.addEventListener('progressions-roster-updated',fillStudents);
})();
