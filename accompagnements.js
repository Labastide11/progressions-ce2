(()=>{
  'use strict';
  const STORAGE_KEY='progressionsCE2.supports.v1';
  const modal=document.getElementById('supportsModal');
  if(!modal)return;
  const $=id=>document.getElementById(id);
  const fields={id:$('supportId'),student:$('supportStudent'),category:$('supportCategory'),device:$('supportDevice'),referent:$('supportReferent'),day:$('supportDay'),time:$('supportTime'),frequency:$('supportFrequency'),review:$('supportReview'),goal:$('supportGoal'),next:$('supportNext')};
  let items=load();
  const labels={interne:'Aide dans l’école',exterieur:'Accompagnement extérieur',inclusion:'Inclusion / dispositif'};
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function load(){try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(x)?x:[];}catch{return[];}}
  function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(items));}
  function formatDate(v){if(!v)return 'À définir';const [y,m,d]=v.split('-');return `${d}/${m}/${y}`;}
  function resetForm(){Object.values(fields).forEach(el=>{if(!el)return;if(el.tagName==='SELECT')el.selectedIndex=0;else el.value='';});$('cancelSupportEdit').classList.add('hidden');}
  function filtered(){const q=$('supportsSearch').value.trim().toLowerCase();const f=$('supportsFilter').value;return items.filter(x=>(f==='all'||x.category===f)&&(!q||Object.values(x).join(' ').toLowerCase().includes(q)));}
  function stats(){const counts={total:items.length,interne:0,exterieur:0,inclusion:0};items.forEach(x=>counts[x.category]=(counts[x.category]||0)+1);$('supportsStats').innerHTML=`<div class="supports-stat"><strong>${counts.total}</strong>suivi${counts.total>1?'s':''} actif${counts.total>1?'s':''}</div><div class="supports-stat"><strong>${counts.interne}</strong>dans l’école</div><div class="supports-stat"><strong>${counts.exterieur}</strong>extérieur${counts.exterieur>1?'s':''}</div><div class="supports-stat"><strong>${counts.inclusion}</strong>inclusion${counts.inclusion>1?'s':''}</div>`;}
  function render(){stats();const list=filtered();$('supportsList').innerHTML=list.length?list.map(x=>`<article class="support-card" data-category="${esc(x.category)}"><div class="support-card__head"><div><h4>${esc(x.student)}</h4><span class="support-card__badge">${esc(labels[x.category]||x.category)} · ${esc(x.device)}</span></div><div class="support-card__actions"><button class="support-edit" data-edit="${esc(x.id)}" title="Modifier">✏️</button><button class="support-delete" data-delete="${esc(x.id)}" title="Supprimer">🗑️</button></div></div><dl><dt>Créneau</dt><dd>${esc([x.day,x.time].filter(Boolean).join(' ' )||'À définir')} ${x.frequency?'· '+esc(x.frequency):''}</dd><dt>Référent</dt><dd>${esc(x.referent||'À définir')}</dd><dt>Objectif</dt><dd>${esc(x.goal||'Non renseigné')}</dd><dt>Prochaine action</dt><dd>${esc(x.next||'Non renseignée')}</dd><dt>Prochain bilan</dt><dd>${esc(formatDate(x.review))}</dd></dl></article>`).join(''):'<div class="supports-empty">Aucun accompagnement renseigné. Utilise le formulaire pour préparer le suivi RASED, extérieur ou ULIS.</div>';
    modal.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>edit(b.dataset.edit));
    modal.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>remove(b.dataset.delete));
  }
  function edit(id){const x=items.find(i=>i.id===id);if(!x)return;Object.entries(fields).forEach(([k,el])=>{if(el)el.value=x[k]||'';});$('cancelSupportEdit').classList.remove('hidden');fields.student.focus();}
  function remove(id){const x=items.find(i=>i.id===id);if(!x||!confirm(`Supprimer le suivi de ${x.student} ?`))return;items=items.filter(i=>i.id!==id);save();render();}
  function open(){modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');render();setTimeout(()=>fields.student.focus(),50);}
  function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');resetForm();}
  window.openSupportsModal=open;
  $('closeSupportsBtn').onclick=close;
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
  $('supportsSearch').oninput=render;$('supportsFilter').onchange=render;$('cancelSupportEdit').onclick=resetForm;
  $('supportsForm').onsubmit=e=>{e.preventDefault();const id=fields.id.value||String(Date.now());const record={id,student:fields.student.value.trim(),category:fields.category.value,device:fields.device.value.trim(),referent:fields.referent.value.trim(),day:fields.day.value,time:fields.time.value,frequency:fields.frequency.value.trim(),review:fields.review.value,goal:fields.goal.value.trim(),next:fields.next.value.trim(),updatedAt:new Date().toISOString()};if(!record.student||!record.device)return;const idx=items.findIndex(x=>x.id===id);if(idx>=0)items[idx]=record;else items.unshift(record);save();resetForm();render();};
  $('exportSupportsBtn').onclick=()=>{const headers=['Élève','Type','Dispositif','Référent','Jour','Horaire','Fréquence','Objectif pédagogique','Prochaine action','Prochain bilan'];const rows=items.map(x=>[x.student,labels[x.category],x.device,x.referent,x.day,x.time,x.frequency,x.goal,x.next,x.review]);const csv=[headers,...rows].map(r=>r.map(v=>'"'+String(v||'').replace(/"/g,'""')+'"').join(';')).join('\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='accompagnements_inclusions_ce2.csv';a.click();URL.revokeObjectURL(a.href);};
  render();
})();
