(function(){
'use strict';
const META_KEY='progressions_ce2_classe_meta_v1',PROOFS_KEY='progressions_ce2_hibou_preuves_v1',SEEN_KEY='progressions_ce2_hibou_vues_v1',BIRTHDAY_SEEN_KEY='progressions_ce2_anniversaires_vus_v1';
const $=id=>document.getElementById(id),bell=$('memoBellBtn'),panel=$('memoPanel'),badge=$('memoBadge');
if(!bell||!panel)return;
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'')||d}catch(e){return d}},write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const parseDate=v=>{if(!v)return null;const m=String(v).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(m)return new Date(+m[3],+m[2]-1,+m[1]);const d=new Date(v);return isNaN(d)?null:d};
const birthdayKey=x=>`${x.prenom}|${x.date}`,proofKey=x=>`${x.prenom}|${x.competence}|${x.date||''}`;
function activeStudents(){
  const roster=window.ProgressionsRoster?.getMeta?.();
  if(Array.isArray(roster)&&roster.length)return roster.filter(e=>e&&e.prenom);
  const meta=read(META_KEY,{});
  if(Array.isArray(meta))return meta.filter(e=>e&&e.prenom);
  if(Array.isArray(meta.eleves))return meta.eleves.filter(e=>e&&e.prenom);
  return [];
}
const normName=s=>String(s||'').trim().toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function birthdays(){
  const seen=read(BIRTHDAY_SEEN_KEY,{}),now=new Date(),month=now.getMonth(),year=now.getFullYear();
  return activeStudents().map(e=>{
    const date=e.anniversaire||e.dateNaissance||e.date_naissance||e.naissance||e.birthDate||e.birthdate||e.ddn||'';
    const d=parseDate(date);
    if(!d||d.getMonth()!==month)return null;
    const prenom=e.prenom||e.nom||'';
    return {prenom,date,day:d.getDate(),age:year-d.getFullYear(),seen:!!seen[birthdayKey({prenom,date})]};
  }).filter(Boolean).sort((a,b)=>a.day-b.day||a.prenom.localeCompare(b.prenom,'fr'));
}
function proofs(){
  const seen=read(SEEN_KEY,{});
  const active=new Set(activeStudents().map(e=>normName(e.prenom||e.nom||'')));
  return (read(PROOFS_KEY,[])||[]).slice(-80).reverse()
    .filter(x=>active.has(normName(x.prenom||x.student||x.eleve||'')))
    .slice(0,20)
    .map(x=>({...x,seen:!!seen[proofKey(x)]}));
}
function item(title,detail,opts){return `<div class="memo-item ${opts.seen?'is-seen':''}"><div class="memo-item__main"><strong>${esc(title)}</strong><small>${esc(detail)}</small></div><button class="memo-seen-btn" data-kind="${opts.kind}" data-key="${esc(opts.key)}" type="button">${opts.seen?'↩ Revoir':'✓ Vu'}</button></div>`}
function render(){const b=birthdays(),h=proofs();$('memoBirthdays').innerHTML=b.length?b.map(x=>item(x.prenom,`le ${x.day}, ${x.age} ans`,{seen:x.seen,key:birthdayKey(x),kind:'birthday'})).join(''):'<div class="memo-empty">Aucun anniversaire ce mois-ci.</div>';$('memoBirthdayCount').textContent=b.length?String(b.length):'';$('memoHibou').innerHTML=h.length?h.map(x=>item(x.prenom||'Élève',`${x.competence||'Nouvelle réussite'}${x.medaille?' · '+x.medaille:''}`,{seen:x.seen,key:proofKey(x),kind:'proof'})).join(''):'<div class="memo-empty">Aucune nouvelle réussite.</div>';const unseenB=b.filter(x=>!x.seen).length,unseenH=h.filter(x=>!x.seen).length,count=unseenB+unseenH;$('memoHibouCount').textContent=unseenH?`${unseenH} nouvelle${unseenH>1?'s':''}`:'';badge.textContent=String(count);badge.classList.toggle('hidden',count===0);panel.querySelectorAll('.memo-seen-btn').forEach(btn=>btn.onclick=()=>{const store=btn.dataset.kind==='birthday'?BIRTHDAY_SEEN_KEY:SEEN_KEY,values=read(store,{});values[btn.dataset.key]=!values[btn.dataset.key];if(!values[btn.dataset.key])delete values[btn.dataset.key];write(store,values);render()});}
function open(){render();panel.classList.remove('hidden');panel.setAttribute('aria-hidden','false');bell.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'}
function close(){panel.classList.add('hidden');panel.setAttribute('aria-hidden','true');bell.setAttribute('aria-expanded','false');document.body.style.overflow=''}
bell.onclick=open;$('memoCloseBtn').onclick=close;panel.querySelectorAll('[data-memo-close]').forEach(x=>x.onclick=close);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.classList.contains('hidden'))close()});const seenAll=$('memoHibouSeenAllBtn');if(seenAll)seenAll.onclick=()=>{const values=read(SEEN_KEY,{});proofs().forEach(x=>values[proofKey(x)]=true);write(SEEN_KEY,values);render()};render();window.addEventListener('storage',render);setInterval(render,60000);
})();
