(function(){
  'use strict';
  const STORAGE_KEY='progressions_ce2_classe_meta_v1';
  const ATTENDANCE_PREFIX='progressions_ce2_presences_';
  const SESSION_KEY='progressions_ce2_presence_session_v1';
  const $=id=>document.getElementById(id);
  const openBtn=$('openStudentListBtn');
  const modal=$('studentListModal');
  const closeBtn=$('closeStudentListBtn');
  const list=$('studentListContent');
  const count=$('studentListCount');
  const status=$('studentListStatus');
  const refreshBtn=$('refreshStudentListBtn');
  const drivePhotosBtn=$('studentListDrivePhotosBtn');
  const configureBtn=$('configureStudentListSyncBtn');
  const syncInfo=$('studentListSyncInfo');
  if(!openBtn||!modal||!closeBtn||!list||!count)return;

  const read=()=>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(e){return {};}};
  const norm=v=>String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const localDateKey=()=>{
    const d=new Date();
    return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
  };
  const attendanceKey=()=>ATTENDANCE_PREFIX+localDateKey();
  const defaultSession=()=>new Date().getHours()<13?'morning':'afternoon';
  let activeSession=localStorage.getItem(SESSION_KEY)||defaultSession();
  if(!['morning','afternoon'].includes(activeSession))activeSession=defaultSession();

  const readAttendance=()=>{try{return JSON.parse(localStorage.getItem(attendanceKey())||'{"morning":[],"afternoon":[]}')||{};}catch(e){return {morning:[],afternoon:[]};}};
  const writeAttendance=data=>localStorage.setItem(attendanceKey(),JSON.stringify({morning:Array.from(new Set(data.morning||[])),afternoon:Array.from(new Set(data.afternoon||[]))}));
  const studentKey=s=>norm([s.prenom,s.nom].filter(Boolean).join('|'));

  const portraitFor=sexe=>{
    const value=norm(sexe);
    if(['fille','feminin','female','f'].includes(value)||value.startsWith('fill')||value.startsWith('femin'))return 'assets/portraits/portrait_fille.png';
    if(['garcon','masculin','male','m','g'].includes(value)||value.startsWith('garc')||value.startsWith('mascul'))return 'assets/portraits/portrait_garcon.png';
    return 'assets/portraits/portrait_neutre.png';
  };
  const isYes=v=>v===true||v===1||['oui','true','vrai','yes','1','x','cham'].includes(norm(v));
  const genderClass=sexe=>{const value=norm(sexe);if(['fille','feminin','female','f'].includes(value)||value.startsWith('fill')||value.startsWith('femin'))return 'student-list-card--lavender';if(['garcon','masculin','male','m','g'].includes(value)||value.startsWith('garc')||value.startsWith('mascul'))return 'student-list-card--turquoise';return 'student-list-card--neutral';};
  const fmtDate=v=>{
    if(!v)return 'Date de naissance non renseignée';
    const s=String(v).trim();
    const m=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    let d=null;
    if(m)d=new Date(Number(m[3]),Number(m[2])-1,Number(m[1]));
    else{const raw=new Date(s);if(!isNaN(raw))d=raw;}
    if(!d||isNaN(d))return s;
    return new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'short',year:'numeric'}).format(d).replace(/^0/,'');
  };
  function students(){
    const apiRows=window.ProgressionsRoster?.getMeta?.();
    const rows=Array.isArray(apiRows)&&apiRows.length?apiRows:Object.values(read());
    return rows.filter(r=>r&&r.prenom).sort((a,b)=>{
      const firstName=String(a.prenom||'').localeCompare(String(b.prenom||''),'fr',{sensitivity:'base'});
      if(firstName!==0)return firstName;
      return String(a.nom||'').localeCompare(String(b.nom||''),'fr',{sensitivity:'base'});
    });
  }

  function ensureAttendanceToolbar(){
    let toolbar=$('studentAttendanceToolbar');
    if(toolbar)return toolbar;
    toolbar=document.createElement('div');
    toolbar.id='studentAttendanceToolbar';
    toolbar.className='student-attendance-toolbar';
    toolbar.innerHTML=`
      <div class="student-attendance-toolbar__mainline">
        <div class="student-attendance-switch" role="group" aria-label="Demi-journée">
          <button type="button" data-session="morning">☀️ Matin</button>
          <button type="button" data-session="afternoon">🌤️ Après-midi</button>
        </div>
        <div class="student-attendance-summary" aria-live="polite">
          <strong id="studentPresentCount">0 présents</strong>
          <span id="studentAbsentCount">0 absent</span>
        </div>
        <span class="student-month-birthdays" id="studentMonthBirthdays">🎂 Anniversaires du mois : —</span>
        <span class="student-attendance-copy">📄 Photocopies : <b id="studentCopyCount">0</b></span>
        <button type="button" class="student-attendance-reset" id="resetStudentAttendanceBtn">↺ Réinitialiser</button>
      </div>
      <p class="student-attendance-help">Clique sur le portrait d’un élève pour le marquer absent ou présent pour la demi-journée sélectionnée.</p>`;
    const body=modal.querySelector('.student-list-panel__body');
    body.insertBefore(toolbar,list);
    toolbar.querySelectorAll('[data-session]').forEach(btn=>btn.addEventListener('click',()=>{
      activeSession=btn.dataset.session;
      localStorage.setItem(SESSION_KEY,activeSession);
      render();
    }));
    toolbar.querySelector('#resetStudentAttendanceBtn').addEventListener('click',()=>{
      const label=activeSession==='morning'?'du matin':'de l’après-midi';
      if(!window.confirm(`Remettre tous les élèves présents pour la séance ${label} ?`))return;
      const data=readAttendance();
      data[activeSession]=[];
      writeAttendance(data);
      render();
    });
    return toolbar;
  }

  function parseStudentBirthDate(row){
    const raw=row&&(row.naissance||row.dateNaissance||row.date_naissance||row.birthDate||row.birthdate||row.ddn||'');
    if(!raw)return null;
    if(raw instanceof Date&&!isNaN(raw))return raw;
    const s=String(raw).trim();
    let d=null;
    const fr=s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
    if(fr)d=new Date(Number(fr[3]),Number(fr[2])-1,Number(fr[1]));
    else{
      const iso=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
      if(iso)d=new Date(Number(iso[1]),Number(iso[2])-1,Number(iso[3]));
      else{
        const parsed=new Date(s);
        if(!isNaN(parsed))d=parsed;
      }
    }
    return d&&!isNaN(d)?d:null;
  }

  function updateMonthBirthdays(rows){
    const el=$('studentMonthBirthdays');
    if(!el)return;
    const now=new Date();
    const month=now.getMonth();
    const year=now.getFullYear();
    const birthdays=rows.map(row=>{
      const d=parseStudentBirthDate(row);
      if(!d||d.getMonth()!==month)return null;
      return {prenom:String(row.prenom||'').trim(),day:d.getDate(),age:year-d.getFullYear()};
    }).filter(Boolean).sort((a,b)=>a.day-b.day||a.prenom.localeCompare(b.prenom,'fr'));
    el.textContent=birthdays.length
      ? `🎂 Anniversaires du mois : ${birthdays.map(b=>`${b.prenom} (le ${b.day}, ${b.age} ans)`).join(' · ')}`
      : '🎂 Aucun anniversaire ce mois-ci';
  }

  function updateSummary(rows,absentSet){
    const present=Math.max(0,rows.length-absentSet.size);
    const presentEl=$('studentPresentCount'), absentEl=$('studentAbsentCount'), copyEl=$('studentCopyCount');
    if(presentEl)presentEl.textContent=`${present} présent${present>1?'s':''}`;
    if(absentEl)absentEl.textContent=`${absentSet.size} absent${absentSet.size>1?'s':''}`;
    if(copyEl)copyEl.textContent=String(present);
    updateMonthBirthdays(rows);
    modal.querySelectorAll('[data-session]').forEach(btn=>btn.classList.toggle('is-active',btn.dataset.session===activeSession));
  }

  function toggleAttendance(key){
    const data=readAttendance();
    const values=new Set(data[activeSession]||[]);
    if(values.has(key))values.delete(key);else values.add(key);
    data[activeSession]=Array.from(values);
    writeAttendance(data);
    render();
  }

  function render(){
    ensureAttendanceToolbar();
    const rows=students();
    const attendance=readAttendance();
    const absentSet=new Set(attendance[activeSession]||[]);
    count.textContent=String(rows.length);
    if(status)status.textContent='';
    if(syncInfo){
      const raw=window.ProgressionsRoster?.getLastSync?.()||'';
      const date=raw?new Date(raw):null;
      const hasDate=date&&!isNaN(date);
      syncInfo.textContent=hasDate?'Actualisé à '+date.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}):'Jamais actualisé';
      syncInfo.title=hasDate?'Dernière actualisation : '+date.toLocaleString('fr-FR'):'';
      syncInfo.classList.toggle('is-never',!hasDate);
    }
    updateSummary(rows,absentSet);
    if(!rows.length){
      list.innerHTML='<div class="student-list-empty">Aucun élève n’est encore disponible. Recharge la liste depuis Google Sheets.</div>';
      return;
    }
    list.innerHTML=rows.map((s,index)=>{
      const key=studentKey(s);
      const absent=absentSet.has(key);
      const fullName=[s.prenom,String(s.nom||'').toUpperCase()].filter(Boolean).join(' ');
      const birth=fmtDate(s.naissance||'');
      const portrait=window.ProgressionsStudentPhotos?.get?.(s.prenom,s.sexe||'')||portraitFor(s.sexe||'');
      const cardClass=genderClass(s.sexe||'');
      const cham=isYes(s.cham);
      const ulis=isYes(s.ulis);
      const period=activeSession==='morning'?'ce matin':'cet après-midi';
      return `<article class="student-list-card ${cardClass}${cham?' is-cham':''}${ulis?' is-ulis':''}${absent?' is-absent':''}">
        <div class="student-list-card__number">${index+1}</div>
        <button class="student-list-card__portrait" type="button" data-attendance-key="${esc(key)}" aria-pressed="${absent?'true':'false'}" aria-label="${absent?'Remettre':'Marquer'} ${esc(s.prenom)} ${absent?'présent':'absent'} ${period}">
          <img src="${portrait}" alt="">
        </button>
        <div class="student-list-card__main">
          <div class="student-list-card__name"><strong>${esc(fullName)}</strong><span class="student-list-card__markers">${cham?'<span class="student-list-card__cham" title="Élève CHAM" aria-label="Élève CHAM">🎵</span>':''}${ulis?'<span class="student-list-card__ulis" title="Élève ULIS" aria-label="Élève ULIS">⭐</span>':''}</span></div>
          <span class="student-list-card__attendance-badge ${absent?'is-absent':'is-present'}">${absent?'🔴 Absent':'🟢 Présent'}</span>
          <small class="student-list-card__birth">${esc(birth)}</small>
        </div>
      </article>`;
    }).join('');
    list.querySelectorAll('[data-attendance-key]').forEach(btn=>btn.addEventListener('click',()=>toggleAttendance(btn.dataset.attendanceKey)));
  }

  async function open(){
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    render();
  }
  function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
  openBtn.addEventListener('click',open);
  if(refreshBtn)refreshBtn.addEventListener('click',async()=>{
    refreshBtn.disabled=true;refreshBtn.textContent='⏳ Actualisation…';
    try{await window.ProgressionsRoster?.refresh?.(true);}finally{refreshBtn.disabled=false;refreshBtn.textContent='🔄 Actualiser';render();}
  });
  if(drivePhotosBtn)drivePhotosBtn.addEventListener('click',()=>{
    const api=window.ProgressionsStudentPhotos;
    if(!api?.connect){
      if(status){status.hidden=false;status.textContent='Le module Photos Drive n’est pas disponible.';}
      return;
    }
    drivePhotosBtn.disabled=true;
    drivePhotosBtn.textContent='⏳ Photos Drive…';
    try{api.connect();}
    finally{setTimeout(()=>{drivePhotosBtn.disabled=false;drivePhotosBtn.textContent='📷 Photos Drive';},1200);}
  });
  if(configureBtn)configureBtn.addEventListener('click',()=>{window.ProgressionsRoster?.configure?.();render();});
  closeBtn.addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
  window.addEventListener('progressions-roster-updated',()=>{if(!modal.classList.contains('hidden'))render();});
  window.addEventListener('storage',e=>{if((e.key===STORAGE_KEY||e.key===attendanceKey())&&!modal.classList.contains('hidden'))render();});
})();
