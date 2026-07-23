(()=>{
  'use strict';
  const data=window.EVALUATIONS_CE2||{};
  const openBtn=document.getElementById('openEvaluationsBtn');
  const modal=document.getElementById('evaluationsModal');
  const closeBtn=document.getElementById('closeEvaluationsBtn');
  const list=document.getElementById('evaluationsList');
  const subjectFilter=document.getElementById('evaluationSubjectFilter');
  const periodFilter=document.getElementById('evaluationPeriodFilter');
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
  function periodCard(subject,period,ev){
    const key=currentKey(subject,period),saved=plan[key]||{};
    const status=saved.status||ev.status||'draft';
    const allSkills=periodSkills(subject,period);
    const configured=Array.isArray(ev.skillCodes)?ev.skillCodes:[];
    const byCode=new Map(allSkills.map(skill=>[skill.code,skill]));
    const skills=configured.length?configured.map(code=>byCode.get(code)).filter(Boolean):[];
    const included=saved.included||{};
    const skillRows=skills.length?skills.map(skill=>{
      const checked=included[skill.code]!==false;
      return `<label class="evaluation-skill"><input type="checkbox" data-eval-skill="${esc(skill.code)}" ${checked?'checked':''}><span class="evaluation-skill__code">${esc(skill.code)}</span><span>${esc(skill.title)}</span></label>`;
    }).join(''):'<p class="evaluation-empty">Les compétences de cette matrice ne sont pas encore arrêtées. Elles seront choisies au moment de finaliser la période.</p>';
    return `<article class="evaluation-card" data-eval-key="${esc(key)}" data-subject="${esc(subject)}" data-period="${esc(period)}">
      <header class="evaluation-card__head"><div><span class="evaluation-period">${period.toUpperCase()}</span><h3>${esc(ev.title)}</h3></div><select class="evaluation-status" aria-label="État de l’évaluation"><option value="draft" ${status==='draft'?'selected':''}>Matrice</option><option value="ready" ${status==='ready'?'selected':''}>Prête</option><option value="passed" ${status==='passed'?'selected':''}>Passée</option></select></header>
      <p>${esc(ev.description)}</p>
      <div class="evaluation-docs"><a class="btn btn--outline btn--compact" href="${esc(ev.studentDoc)}" download>📄 Fiche élève</a><a class="btn btn--outline btn--compact" href="${esc(ev.teacherDoc)}" download>👨‍🏫 Grille enseignant</a><button class="btn btn--light btn--compact" type="button" data-open-tracking ${skills.length?'':'disabled'}>👥 ${skills.length?`Renseigner l’évaluation (${skills.length})`:'Évaluation à finaliser'}</button></div>
      <details class="evaluation-skills"><summary>Compétences de cette évaluation <span>${skills.length||'à définir'}</span></summary><div class="evaluation-skill-list">${skillRows}</div></details>
      <label class="evaluation-note"><span>Note de préparation</span><textarea rows="2" placeholder="Adaptations, corpus réellement travaillé, notions reportées…">${esc(saved.note||'')}</textarea></label>
    </article>`;
  }
  function render(){
    const sf=subjectFilter.value||'francais',pf=periodFilter.value||'all';
    const cards=[];
    Object.entries(data).forEach(([subject,info])=>{
      if(sf!=='all'&&sf!==subject)return;
      Object.entries(info.periods||{}).forEach(([period,ev])=>{if(pf==='all'||pf===period)cards.push(periodCard(subject,period,ev));});
    });
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
    saveActive({subject,period,title,codes:unique,index:0});
    close();
    const subjectBtn=document.querySelector(`.tab[data-subject="${subject}"]`);if(subjectBtn)subjectBtn.click();
    const periodBtn=document.querySelector(`.filter[data-period="${period}"]`);if(periodBtn)periodBtn.click();
    const classBtn=document.querySelector('.mode-btn[data-mode="classe"]');if(classBtn)classBtn.click();
    const select=await waitFor('#classSkillSelect');
    if(!select){alert('Le suivi des élèves n’a pas pu être ouvert.');return;}
    const first=unique.find(code=>[...select.options].some(o=>o.value===code));
    if(!first){
      alert('Les compétences cochées ne sont pas disponibles dans le référentiel de cette période.');
      return;
    }
    const active=loadActive();active.index=unique.indexOf(first);saveActive(active);
    selectSkill(first);
    ensureNavigator();
    window.scrollTo({top:0,behavior:'smooth'});
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
    nav.innerHTML=`<div><span class="evaluation-tracking-nav__eyebrow">📝 Évaluation active</span><strong>${esc(active.title||'Évaluation')}</strong><small>Résultat ${index+1} sur ${available.length} — uniquement les compétences de cette évaluation</small></div><div class="evaluation-tracking-nav__actions"><button type="button" class="btn btn--outline btn--compact" data-eval-prev ${index===0?'disabled':''}>← Précédente</button><button type="button" class="btn btn--evaluations btn--compact" data-eval-next ${index===available.length-1?'disabled':''}>Suivante →</button><button type="button" class="btn btn--light btn--compact" data-eval-stop>Terminer la saisie</button></div>`;
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
      card.querySelectorAll('[data-eval-skill]').forEach(box=>box.addEventListener('change',()=>{const p=ensure();p.included=p.included||{};p.included[box.dataset.evalSkill]=box.checked;save();}));
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
  subjectFilter.addEventListener('change',render);periodFilter.addEventListener('change',render);

  const observer=new MutationObserver(()=>ensureNavigator());
  observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='classSkillSelect')setTimeout(ensureNavigator,0);});
  setTimeout(ensureNavigator,0);
})();
