(function(){
  'use strict';
  const STORAGE_KEY='progressions_ce2_classe_meta_v1';
  const $=id=>document.getElementById(id);
  const openBtn=$('openChamBtn'), modal=$('chamModal'), closeBtn=$('closeChamBtn');
  const list=$('chamStudentList'), count=$('chamCount');
  if(!openBtn||!modal||!closeBtn||!list||!count) return;

  const read=(k,d)=>{ try{return JSON.parse(localStorage.getItem(k)||'')||d;}catch(e){return d;} };
  const norm=v=>String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const isYes=v=>v===true||v===1||['oui','true','vrai','yes','1','x','cham'].includes(norm(v));

  const portraitFor=(prenom,sexe)=>{
    if(window.ProgressionsStudentPhotos)return window.ProgressionsStudentPhotos.get(prenom,sexe);
    const value=norm(sexe);
    if(['fille','feminin','female','f'].includes(value)||value.startsWith('fill')||value.startsWith('femin')) return 'assets/portraits/portrait_fille.png';
    if(['garcon','masculin','male','m','g'].includes(value)||value.startsWith('garc')||value.startsWith('mascul')) return 'assets/portraits/portrait_garcon.png';
    return 'assets/portraits/portrait_neutre.png';
  };
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmtDate=v=>{
    if(!v) return '';
    const s=String(v).trim();
    const m=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    let d=null;
    if(m) d=new Date(+m[3],+m[2]-1,+m[1]); else { const raw=new Date(s); if(!isNaN(raw)) d=raw; }
    if(!d||isNaN(d)) return s;
    return new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(d);
  };
  function getChamStudents(){
    const meta=Object.values(read(STORAGE_KEY,{})).filter(Boolean);
    return meta.filter(r=>r.prenom && isYes(r.cham)).sort((a,b)=>String(a.prenom).localeCompare(String(b.prenom),'fr',{sensitivity:'base'}));
  }
  function render(){
    const students=getChamStudents();
    count.textContent=String(students.length);
    if(!students.length){
      list.innerHTML='<div class="cham-empty">Aucun élève CHAM renseigné dans le Google Sheet.</div>';
      return;
    }
    list.innerHTML=students.map(s=>{
      const birth=fmtDate(s.naissance||'');
      const portrait=portraitFor(s.prenom,s.sexe||'');
      return `<article class="cham-card"><div class="cham-card__portrait"><img src="${portrait}" alt="Portrait de ${esc(s.prenom)}"></div><div class="cham-card__main"><strong>${esc(s.prenom)}</strong>${birth?`<small>🎂 ${esc(birth)}</small>`:''}</div></article>`;
    }).join('');
  }
  function open(){ render(); modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
  function close(){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
  openBtn.addEventListener('click',open);
  closeBtn.addEventListener('click',close);
  modal.addEventListener('click',e=>{ if(e.target===modal) close(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape' && !modal.classList.contains('hidden')) close(); });
  window.addEventListener('storage',()=>{ if(!modal.classList.contains('hidden')) render(); });
})();