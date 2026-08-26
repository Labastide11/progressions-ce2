(function(){
  'use strict';
  const STORAGE_KEY='progressions_ce2_classe_meta_v1';
  const ATTENDANCE_PREFIX='progressions_ce2_presences_';
  const SESSION_KEY='progressions_ce2_presence_session_v1';
  const $=id=>document.getElementById(id);
  const openBtn=$('openChamBtn'), modal=$('chamModal'), closeBtn=$('closeChamBtn');
  const list=$('chamStudentList'), count=$('chamCount');
  if(!openBtn||!modal||!closeBtn||!list||!count) return;

  const read=(k,d)=>{ try{return JSON.parse(localStorage.getItem(k)||'')||d;}catch(e){return d;} };
  const norm=v=>String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const isYes=v=>v===true||v===1||['oui','true','vrai','yes','1','x','cham'].includes(norm(v));
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const studentKey=s=>norm([s.prenom,s.nom].filter(Boolean).join('|'));
  const localDateKey=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
  const attendanceKey=()=>ATTENDANCE_PREFIX+localDateKey();
  const defaultSession=()=>new Date().getHours()<13?'morning':'afternoon';
  const activeSession=()=>{const v=localStorage.getItem(SESSION_KEY)||defaultSession();return ['morning','afternoon'].includes(v)?v:defaultSession();};
  const readAttendance=()=>read(attendanceKey(),{morning:[],afternoon:[]});
  const writeAttendance=data=>localStorage.setItem(attendanceKey(),JSON.stringify({morning:Array.from(new Set(data.morning||[])),afternoon:Array.from(new Set(data.afternoon||[]))}));

  const portraitFor=sexe=>{
    const value=norm(sexe);
    if(['fille','feminin','female','f'].includes(value)||value.startsWith('fill')||value.startsWith('femin')) return 'assets/portraits/portrait_fille.png';
    if(['garcon','masculin','male','m','g'].includes(value)||value.startsWith('garc')||value.startsWith('mascul')) return 'assets/portraits/portrait_garcon.png';
    return 'assets/portraits/portrait_neutre.png';
  };
  const fmtDate=v=>{
    if(!v) return 'Date non renseignée';
    const raw=String(v).trim();
    const m=raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    let d=null;
    if(m)d=new Date(+m[3],+m[2]-1,+m[1]); else {const parsed=new Date(raw);if(!isNaN(parsed))d=parsed;}
    if(!d||isNaN(d))return raw;
    return new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'short',year:'numeric'}).format(d).replace(/^0/,'');
  };
  function getChamStudents(){
    const apiRows=window.ProgressionsRoster?.getMeta?.();
    const meta=Array.isArray(apiRows)&&apiRows.length?apiRows:Object.values(read(STORAGE_KEY,{})).filter(Boolean);
    return meta.filter(r=>r&&r.prenom&&isYes(r.cham)).sort((a,b)=>String(a.prenom).localeCompare(String(b.prenom),'fr',{sensitivity:'base'}));
  }
  function toggleAttendance(key){
    const session=activeSession();
    const data=readAttendance();
    const values=new Set(data[session]||[]);
    if(values.has(key))values.delete(key);else values.add(key);
    data[session]=Array.from(values);writeAttendance(data);render();
  }
  function render(){
    const students=getChamStudents();
    const absentSet=new Set(readAttendance()[activeSession()]||[]);
    count.textContent=String(students.length);
    if(!students.length){list.innerHTML='<div class="cham-empty">Aucun élève CHAM renseigné dans le Google Sheet.</div>';return;}
    list.innerHTML=students.map(s=>{
      const key=studentKey(s), absent=absentSet.has(key), birth=fmtDate(s.naissance||'');
      const portrait=window.ProgressionsStudentPhotos?.get?.(s.prenom,s.sexe||'')||portraitFor(s.sexe||'');
      return `<article class="cham-card${absent?' is-absent':''}">
        <button class="cham-card__portrait" type="button" data-cham-attendance-key="${esc(key)}" aria-pressed="${absent?'true':'false'}" aria-label="${absent?'Remettre':'Marquer'} ${esc(s.prenom)} ${absent?'présent':'absent'}">
          <img src="${portrait}" alt="Portrait de ${esc(s.prenom)}">
        </button>
        <div class="cham-card__main">
          <strong>${esc(s.prenom)}</strong>
          <span class="cham-card__attendance-badge ${absent?'is-absent':'is-present'}">${absent?'🔴 Absent':'🟢 Présent'}</span>
          <small class="cham-card__birth">${esc(birth)}</small>
        </div>
      </article>`;
    }).join('');
    list.querySelectorAll('[data-cham-attendance-key]').forEach(btn=>btn.addEventListener('click',()=>toggleAttendance(btn.dataset.chamAttendanceKey)));
  }
  function open(){render();modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
  function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
  openBtn.addEventListener('click',open);closeBtn.addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
  window.addEventListener('progressions-roster-updated',()=>{if(!modal.classList.contains('hidden'))render();});
  window.addEventListener('storage',()=>{if(!modal.classList.contains('hidden'))render();});
})();
