(()=>{
  'use strict';
  const data=window.EVALUATIONS_CE2||{};
  const openBtn=document.getElementById('openEvaluationsBtn');
  const modal=document.getElementById('evaluationsModal');
  const closeBtn=document.getElementById('closeEvaluationsBtn');
  const list=document.getElementById('evaluationsList');
  const subjectFilter=document.getElementById('evaluationSubjectFilter');
  const periodFilter=document.getElementById('evaluationPeriodFilter');
  const semesterFilter=document.getElementById('evaluationSemesterFilter');
  const STORAGE_KEY='progressions_ce2_evaluation_plan_v1';
  const ACTIVE_KEY='progressions_ce2_active_evaluation_v1';
  let plan={};
  try{plan=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(e){plan={};}
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const save=()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(plan));}catch(e){}};
  const saveActive=value=>{try{value?sessionStorage.setItem(ACTIVE_KEY,JSON.stringify(value)):sessionStorage.removeItem(ACTIVE_KEY);}catch(e){}};
  const loadActive=()=>{try{return JSON.parse(sessionStorage.getItem(ACTIVE_KEY)||'null');}catch(e){return null;}};

  function skillsFor(subject,period){
    const ref=window.SKILLS?.[subject]||window.PROGRESSIONS_SKILLS?.[subject]||null;
    if(Array.isArray(ref))return ref.filter(x=>String(x.period||'').toLowerCase()===period);
    if(ref&&Array.isArray(ref[period]))return ref[period];
    if(ref&&Array.isArray(ref.skills))return ref.skills.filter(x=>String(x.period||'').toLowerCase()===period);
    return [];
  }
  function allSkillsFallback(subject,period){
    const candidates=[];
    const walk=value=>{
      if(!value)return;
      if(Array.isArray(value)){value.forEach(walk);return;}
      if(typeof value==='object'){
        if(value.code&&value.title){
          const code=String(value.code).toUpperCase();
          if(code.includes('-'+period.toUpperCase()+'-'))candidates.push(value);
        }
        Object.values(value).forEach(walk);
      }
    };
    walk(window.PROGRESSIONS?.[subject]);
    const seen=new Set();
    return candidates.filter(x=>!seen.has(x.code)&&seen.add(x.code));
  }
  function periodSkills(subject,period){
    const direct=window.PROGRESSIONS?.[subject]?.[period+'Competencies'];
    if(Array.isArray(direct))return direct;
    const exact=skillsFor(subject,period);
    return exact.length?exact:allSkillsFallback(subject,period);
  }
  function currentKey(subject,period){return subject+'|'+period;}
  function semesterForPeriod(period){
    return (period==='p1'||period==='p2')?'s1':(period==='p3'||period==='p4'||period==='p5')?'s2':'';
  }
  function semesterLabel(period){
    return semesterForPeriod(period)==='s1'?'Semestre 1 — LSU S1':'Semestre 2 — LSU S2';
  }
  const PERIOD_LABELS={p1:'Période 1',p2:'Période 2',p3:'Période 3',p4:'Période 4',p5:'Période 5'};
  const SUBJECT_META={
    francais:{label:'Français',icon:'📘',order:1},
    maths:{label:'Mathématiques',icon:'🔢',order:2},
    anglais:{label:'Anglais',icon:'🇬🇧',order:3},
    histoire:{label:'Histoire',icon:'🏺',order:4},
    geographie:{label:'Géographie',icon:'🗺️',order:5},
    sciences:{label:'Sciences',icon:'🔬',order:6},
    emc:{label:'EMC',icon:'🤝',order:7}
  };
  function subjectBadge(subject){
    const meta=SUBJECT_META[subject]||{label:subject,icon:'📚'};
    return `<span class="evaluation-subject evaluation-subject--${esc(subject)}">${meta.icon} ${esc(meta.label)}</span>`;
  }
  function allowedPeriodsForSemester(semester){
    if(semester==='s1')return ['p1','p2'];
    if(semester==='s2')return ['p3','p4','p5'];
    return ['p1','p2','p3','p4','p5'];
  }
  function syncPeriodFilterWithSemester(){
    if(!periodFilter)return;
    const semester=semesterFilter?.value||'all';
    const previous=periodFilter.value||'all';
    const allowed=allowedPeriodsForSemester(semester);
    const allLabel=semester==='s1'?'Toutes les périodes du S1':semester==='s2'?'Toutes les périodes du S2':'Toutes les périodes';
    periodFilter.innerHTML=`<option value="all">${allLabel}</option>`+allowed.map(period=>`<option value="${period}">${PERIOD_LABELS[period]}</option>`).join('');
    periodFilter.value=allowed.includes(previous)?previous:'all';
  }
  const FR_MONTHS={janvier:0,'février':1,fevrier:1,mars:2,avril:3,mai:4,juin:5,juillet:6,'août':7,aout:7,septembre:8,octobre:9,novembre:10,'décembre':11,decembre:11};
  function parseFrenchDay(label){
    const m=String(label||'').toLowerCase().match(/(\d{1,2})(?:er)?\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)\s+(20\d{2})/i);
    if(!m)return null;
    const month=FR_MONTHS[m[2].toLowerCase()];
    if(month==null)return null;
    const d=new Date(Number(m[3]),month,Number(m[1]));d.setHours(0,0,0,0);return d;
  }
  function codeSetFromText(text){
    const src=String(text||'').replace(/[–—]/g,'-');
    const found=new Set();
    (src.match(/[A-Z]{2,6}-P\d-\d{2}/g)||[]).forEach(c=>found.add(c));
    const range=/([A-Z]{2,6}-P\d)-(\d{2})\s*(?:à|a)\s*(?:(?:[A-Z]{2,6}-P\d)-)?(\d{2})/gi;
    let m;
    while((m=range.exec(src))){
      const a=Number(m[2]),b=Number(m[3]);
      for(let n=Math.min(a,b);n<=Math.max(a,b);n++)found.add(`${m[1].toUpperCase()}-${String(n).padStart(2,'0')}`);
    }
    src.split(/[;·]/).forEach(chunk=>{
      const head=chunk.match(/([A-Z]{2,6}-P\d)-(\d{2})((?:\s*\/\s*\d{2})+)/i);
      if(!head)return;
      const prefix=head[1].toUpperCase();found.add(`${prefix}-${head[2]}`);
      (head[3].match(/\d{2}/g)||[]).forEach(n=>found.add(`${prefix}-${n}`));
    });
    return found;
  }
  function evaluationWeekNumber(week){
    const m=String(week?.title||'').match(/Semaine\s+(\d+)/i);return m?Number(m[1]):Number(String(week?.key||'').match(/s(\d+)$/)?.[1]||1);
  }
  function subjectMatchesRow(subject,row){
    const kind=String(row?.[4]||'').toLowerCase(), name=String(row?.[1]||'').toLowerCase();
    if(subject==='francais')return kind==='french'||name.includes('français');
    if(subject==='maths')return kind==='maths'||name.includes('math');
    if(subject==='anglais')return kind==='english'||name.includes('anglais');
    if(subject==='histoire')return kind==='history'||name.includes('histoire');
    if(subject==='geographie')return name.includes('géographie')||name.includes('geographie')||kind==='geography';
    if(subject==='sciences')return kind==='science'||name.includes('sciences')||name.includes('science');
    if(subject==='emc')return kind==='emc'||name.includes('emc');
    return false;
  }
  function findEvaluationSchedule(subject,period,codes){
    const weeks=window.PROGRESSIONS_EDT_DATA?.[period+'DetailedWeeks'];
    if(!Array.isArray(weeks)||!weeks.length)return null;
    const wanted=new Set(codes||[]), candidates=[];
    weeks.forEach((week,weekIndex)=>{
      let overlap=0, rows=0;const matchingDays=[];
      (week.days||[]).forEach(([day,dayRows])=>(dayRows||[]).forEach(row=>{
        if(!subjectMatchesRow(subject,row))return;
        const text=`${row?.[2]||''} ${row?.[5]||''}`.toLowerCase();
        const tracePattern=subject==='emc'?/évaluation|évaluer|validation|valider|mini-test|test|bilan|observation|mise en situation|débat|conseil/:/évaluation|évaluer|validation|valider|mini-test|test|bilan/;
        if(/sans nouvelle évaluation/.test(text)||!tracePattern.test(text))return;
        const rowCodes=codeSetFromText(row?.[3]);
        let hit=0;wanted.forEach(code=>{if(rowCodes.has(code))hit++;});
        if(!hit)return;
        overlap+=hit;rows++;matchingDays.push({day,time:row?.[0]||'',activity:row?.[2]||'',hit});
      }));
      if(!rows)return;
      const title=String(week.title||'').toLowerCase();
      const intentBonus=/valider|validation|évaluer|évaluation/.test(title)?12:/bilan/.test(title)?8:0;
      const lateBonus=weekIndex*.35;
      candidates.push({week,weekIndex,weekNumber:evaluationWeekNumber(week),overlap,rows,matchingDays,score:overlap*4+rows*2+intentBonus+lateBonus});
    });
    if(!candidates.length)return null;
    candidates.sort((a,b)=>b.score-a.score||b.weekIndex-a.weekIndex);
    const best=candidates[0];
    const start=parseFrenchDay(best.week.days?.[0]?.[0]);
    const end=parseFrenchDay(best.week.days?.[best.week.days.length-1]?.[0]);
    const today=new Date();today.setHours(0,0,0,0);
    let state='upcoming',label='À venir',icon='🟢';
    if(start&&end&&today>=start&&today<=end){state='current';label='Cette semaine';icon='🟠';}
    else if(end&&today>end){state='past';label='Passée';icon='🔵';}
    const first=best.matchingDays[0]||null;
    return {...best,start,end,state,label,icon,first};
  }
  function scheduleBlock(subject,period,ev){
    const schedule=findEvaluationSchedule(subject,period,ev.skillCodes||[]);
    if(!schedule)return `<div class="evaluation-schedule evaluation-schedule--missing"><div><span class="evaluation-schedule__label">📅 Programmation</span><strong>Repère non trouvé automatiquement</strong></div><button class="evaluation-schedule__link" type="button" data-open-eval-week data-eval-period="${esc(period)}" data-eval-week="1">Voir la période →</button></div>`;
    const first=schedule.first?`<small>Premier créneau repéré : ${esc(schedule.first.day)} · ${esc(schedule.first.time)}</small>`:'';
    const scheduleTitle=ev.traceType?'📅 Trace prévue':'📅 Évaluation prévue';
    return `<div class="evaluation-schedule evaluation-schedule--${schedule.state}"><div class="evaluation-schedule__main"><span class="evaluation-schedule__label">${scheduleTitle}</span><strong>Semaine ${schedule.weekNumber} · ${esc(schedule.week.dates||'')}</strong>${first}</div><span class="evaluation-auto-status evaluation-auto-status--${schedule.state}">${schedule.icon} ${schedule.label}</span><button class="evaluation-schedule__link" type="button" data-open-eval-week data-eval-period="${esc(period)}" data-eval-week="${schedule.weekIndex+1}">Voir dans l’emploi du temps →</button></div>`;
  }
  function periodCard(subject,period,ev){
    const key=currentKey(subject,period),saved=plan[key]||{};
    const status=saved.status||ev.status||'draft';
    const allSkills=periodSkills(subject,period);
    const configured=Array.isArray(ev.skillCodes)?ev.skillCodes:[];
    const everySubjectSkill=[];
    ['p1','p2','p3','p4','p5'].forEach(p=>periodSkills(subject,p).forEach(s=>everySubjectSkill.push(s)));
    const byCode=new Map([...allSkills,...everySubjectSkill].map(skill=>[skill.code,skill]));
    const skills=configured.length?configured.map(code=>byCode.get(code)).filter(Boolean):[];
    const included=saved.included||{};
    const selectedCount=skills.filter(skill=>included[skill.code]!==false).length;
    const skillRows=skills.length?skills.map(skill=>{
      const checked=included[skill.code]!==false;
      return `<label class="evaluation-skill"><input type="checkbox" data-eval-skill="${esc(skill.code)}" ${checked?'checked':''}><span class="evaluation-skill__code">${esc(skill.code)}</span><span>${esc(skill.title)}</span></label>`;
    }).join(''):'<p class="evaluation-empty">Les compétences de cette matrice ne sont pas encore arrêtées. Elles seront choisies au moment de finaliser la période.</p>';
    const semester=semesterForPeriod(period);
    const traceBadge=ev.traceType?`<span class="evaluation-trace-type">🎯 ${esc(ev.traceType)}</span>`:'';
    const docs=[];
    if(ev.studentDoc)docs.push(`<a class="btn btn--outline btn--compact" href="${esc(ev.studentDoc)}" download>📄 Fiche élève</a>`);
    if(ev.teacherDoc)docs.push(`<a class="btn btn--outline btn--compact" href="${esc(ev.teacherDoc)}" download>👨‍🏫 Grille enseignant</a>`);
    const actionLabel=ev.traceType?'Renseigner la trace':'Renseigner l’évaluation';
    docs.push(`<button class="btn btn--light btn--compact" type="button" data-open-tracking ${skills.length?'':'disabled'}>👥 ${skills.length?`${actionLabel} (${selectedCount})`:'Évaluation à finaliser'}</button>`);
    return `<article class="evaluation-card" data-eval-key="${esc(key)}" data-subject="${esc(subject)}" data-period="${esc(period)}" data-semester="${esc(semester)}">
      <header class="evaluation-card__head"><div><div class="evaluation-card__markers">${subjectBadge(subject)}<span class="evaluation-period">${period.toUpperCase()}</span><span class="evaluation-semester evaluation-semester--${esc(semester)}">🟣 ${esc(semesterLabel(period))}</span></div><h3>${esc(ev.title)}</h3></div><select class="evaluation-status" aria-label="État de l’évaluation"><option value="draft" ${status==='draft'?'selected':''}>Matrice</option><option value="ready" ${status==='ready'?'selected':''}>Prête</option><option value="passed" ${status==='passed'?'selected':''}>Passée</option></select></header>
      <p>${esc(ev.description)}</p>
      ${traceBadge}
      ${scheduleBlock(subject,period,ev)}
      <div class="evaluation-docs">${docs.join('')}</div>
      <details class="evaluation-skills"><summary>${ev.traceType?'Compétences visées par cette trace':'Compétences de cette évaluation'} <span>${skills.length?selectedCount:'à définir'}</span></summary><div class="evaluation-skill-list">${skillRows}</div></details>
      <label class="evaluation-note"><span>Note de préparation</span><textarea rows="2" placeholder="Adaptations, corpus réellement travaillé, notions reportées…">${esc(saved.note||'')}</textarea></label>
    </article>`;
  }
  function render(){
    const sf=subjectFilter.value||'all',pf=periodFilter.value||'all',semf=semesterFilter?.value||'all';
    const cards=[];
    Object.entries(data)
      .sort(([a],[b])=>(SUBJECT_META[a]?.order||99)-(SUBJECT_META[b]?.order||99))
      .forEach(([subject,info])=>{
        if(sf!=='all'&&sf!==subject)return;
        Object.entries(info.periods||{}).forEach(([period,ev])=>{
          if(pf!=='all'&&pf!==period)return;
          if(semf!=='all'&&semf!==semesterForPeriod(period))return;
          cards.push(periodCard(subject,period,ev));
        });
      });
    list.classList.toggle('evaluations-list--single',cards.length===1);
    list.classList.toggle('evaluations-list--multiple',cards.length>1);
    list.innerHTML=cards.join('')||'<p class="evaluation-empty">Aucune évaluation disponible pour ce filtre.</p>';
    bind();
  }
  function open(){modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');render();setTimeout(()=>closeBtn.focus(),0);}
  function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');openBtn.focus();}

  function waitFor(selector,timeout=2500){
    return new Promise(resolve=>{
      const found=document.querySelector(selector);if(found){resolve(found);return;}
      const obs=new MutationObserver(()=>{const el=document.querySelector(selector);if(el){obs.disconnect();resolve(el);}});
      obs.observe(document.body,{childList:true,subtree:true});
      setTimeout(()=>{obs.disconnect();resolve(document.querySelector(selector));},timeout);
    });
  }
  function selectSkill(code){
    const select=document.getElementById('classSkillSelect');
    if(!select)return false;
    const exists=[...select.options].some(o=>o.value===code);
    if(!exists)return false;
    select.value=code;
    select.dispatchEvent(new Event('change',{bubbles:true}));
    return true;
  }
  async function openTracking(subject,period,title,codes){
    const unique=[...new Set(codes.filter(Boolean))];
    if(!unique.length){alert('Aucune compétence n’est cochée pour cette évaluation.');return;}
    const stamp=new Date();
    const ev=data?.[subject]?.periods?.[period]||{};
    saveActive({id:'eval-'+subject+'-'+period+'-'+stamp.getTime(),subject,period,title,codes:unique,index:0,startedAt:stamp.toISOString(),date:stamp.toISOString().slice(0,10),source:ev.traceSource||'evaluation_papier',traceType:ev.traceType||''});
    // V34.12 — la saisie d’évaluation vit réellement dans mon-suivi.html.
    // On conserve le contexte en sessionStorage puis on ouvre la page dédiée.
    location.href='mon-suivi.html';
  }


  function ensureNavigator(){
    const active=loadActive();
    const tracking=document.querySelector('.class-tracking');
    const select=document.getElementById('classSkillSelect');
    if(!active||!tracking||!select){document.getElementById('evaluationTrackingNav')?.remove();return;}
    if(active.subject!==document.querySelector('.tab.is-active')?.dataset.subject||active.period!==document.querySelector('.filter.is-active')?.dataset.period){
      document.getElementById('evaluationTrackingNav')?.remove();return;
    }
    const available=active.codes.filter(code=>[...select.options].some(o=>o.value===code));
    if(!available.length){document.getElementById('evaluationTrackingNav')?.remove();return;}
    let index=available.indexOf(select.value);
    if(index<0){index=Math.min(active.index||0,available.length-1);selectSkill(available[index]);return;}
    active.codes=available;active.index=index;saveActive(active);
    let nav=document.getElementById('evaluationTrackingNav');
    if(!nav){nav=document.createElement('section');nav.id='evaluationTrackingNav';nav.className='evaluation-tracking-nav card';tracking.prepend(nav);}
    nav.innerHTML=`<div><span class="evaluation-tracking-nav__eyebrow">📝 Évaluation active</span><strong>${esc(active.title||'Évaluation')}</strong><small>Résultat ${index+1} sur ${available.length} — chaque niveau saisi est conservé dans l’historique</small></div><div class="evaluation-tracking-nav__actions"><button type="button" class="btn btn--outline btn--compact" data-eval-prev ${index===0?'disabled':''}>← Précédente</button><button type="button" class="btn btn--evaluations btn--compact" data-eval-next ${index===available.length-1?'disabled':''}>Suivante →</button><button type="button" class="btn btn--light btn--compact" data-eval-stop>Terminer la saisie</button></div>`;
    nav.querySelector('[data-eval-prev]').onclick=()=>{if(index>0)selectSkill(available[index-1]);};
    nav.querySelector('[data-eval-next]').onclick=()=>{if(index<available.length-1)selectSkill(available[index+1]);};
    nav.querySelector('[data-eval-stop]').onclick=()=>{saveActive(null);nav.remove();};
  }

  function bind(){
    list.querySelectorAll('.evaluation-card').forEach(card=>{
      const key=card.dataset.evalKey,subject=card.dataset.subject,period=card.dataset.period;
      const ensure=()=>plan[key]||(plan[key]={});
      card.querySelector('.evaluation-status').addEventListener('change',e=>{ensure().status=e.target.value;save();});
      card.querySelector('.evaluation-note textarea').addEventListener('input',e=>{ensure().note=e.target.value;save();});
      const refreshSkillCount=()=>{
        const total=card.querySelectorAll('[data-eval-skill]').length;
        const selected=card.querySelectorAll('[data-eval-skill]:checked').length;
        const count=card.querySelector('.evaluation-skills summary span');
        const tracking=card.querySelector('[data-open-tracking]');
        if(count)count.textContent=total?String(selected):'à définir';
        if(tracking&&total){const action=card.querySelector('.evaluation-trace-type')?'Renseigner la trace':'Renseigner l’évaluation';tracking.textContent=`👥 ${action} (${selected})`;}
      };
      card.querySelectorAll('[data-eval-skill]').forEach(box=>box.addEventListener('change',()=>{const p=ensure();p.included=p.included||{};p.included[box.dataset.evalSkill]=box.checked;save();refreshSkillCount();}));
      const edtBtn=card.querySelector('[data-open-eval-week]');
      if(edtBtn)edtBtn.addEventListener('click',()=>{
        const targetPeriod=edtBtn.dataset.evalPeriod||period;
        const week=Number(edtBtn.dataset.evalWeek)||1;
        close();
        if(window.ProgressionsEDT?.openWeek)window.ProgressionsEDT.openWeek(targetPeriod,week);
        else document.querySelector(`[data-open-summary-period="${targetPeriod}"]`)?.click();
      });
      const trackingBtn=card.querySelector('[data-open-tracking]');
      if(trackingBtn&&!trackingBtn.disabled)trackingBtn.addEventListener('click',()=>{
        const codes=[...card.querySelectorAll('[data-eval-skill]:checked')].map(box=>box.dataset.evalSkill);
        const title=card.querySelector('h3')?.textContent?.trim()||`${subject} ${period.toUpperCase()}`;
        openTracking(subject,period,title,codes);
      });
    });
  }

  if(!openBtn||!modal)return;
  openBtn.addEventListener('click',open);closeBtn.addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
  subjectFilter.addEventListener('change',render);
  periodFilter.addEventListener('change',render);
  syncPeriodFilterWithSemester();
  semesterFilter?.addEventListener('change',()=>{syncPeriodFilterWithSemester();render();});

  // Mise à jour ciblée du navigateur d'évaluation.
  // Ne pas observer tout le DOM : ensureNavigator() modifie lui-même le DOM,
  // ce qui créait une boucle de MutationObserver et ralentissait Firefox.
  document.addEventListener('change',e=>{
    if(e.target&&e.target.id==='classSkillSelect')setTimeout(ensureNavigator,0);
  });
  document.addEventListener('click',e=>{
    const control=e.target.closest?.('.tab[data-subject], .filter[data-period], .mode-btn[data-mode]');
    if(control)setTimeout(ensureNavigator,0);
  });
  setTimeout(ensureNavigator,0);
})();
