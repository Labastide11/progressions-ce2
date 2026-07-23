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
  const labels={ready:'Prête',draft:'Matrice',passed:'Passée'};
  let plan={};
  try{plan=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(e){plan={};}
  const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const save=()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(plan));}catch(e){}};
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
  function periodSkills(subject,period){const direct=window.PROGRESSIONS?.[subject]?.[period+'Competencies'];if(Array.isArray(direct))return direct;const exact=skillsFor(subject,period);return exact.length?exact:allSkillsFallback(subject,period);}
  function currentKey(subject,period){return subject+'|'+period;}
  function periodCard(subject,period,ev){
    const key=currentKey(subject,period),saved=plan[key]||{};
    const status=saved.status||ev.status||'draft';
    const skills=periodSkills(subject,period);
    const included=saved.included||{};
    const skillRows=skills.length?skills.map(skill=>{
      const checked=included[skill.code]!==false;
      return `<label class="evaluation-skill"><input type="checkbox" data-eval-skill="${esc(skill.code)}" ${checked?'checked':''}><span class="evaluation-skill__code">${esc(skill.code)}</span><span>${esc(skill.title)}</span></label>`;
    }).join(''):'<p class="evaluation-empty">Les compétences de cette période seront lues dans le référentiel lors de la finalisation.</p>';
    return `<article class="evaluation-card" data-eval-key="${esc(key)}" data-subject="${esc(subject)}" data-period="${esc(period)}">
      <header class="evaluation-card__head"><div><span class="evaluation-period">${period.toUpperCase()}</span><h3>${esc(ev.title)}</h3></div><select class="evaluation-status" aria-label="État de l’évaluation"><option value="draft" ${status==='draft'?'selected':''}>Matrice</option><option value="ready" ${status==='ready'?'selected':''}>Prête</option><option value="passed" ${status==='passed'?'selected':''}>Passée</option></select></header>
      <p>${esc(ev.description)}</p>
      <div class="evaluation-docs"><a class="btn btn--outline btn--compact" href="${esc(ev.studentDoc)}" download>📄 Fiche élève</a><a class="btn btn--outline btn--compact" href="${esc(ev.teacherDoc)}" download>👨‍🏫 Grille enseignant</a><button class="btn btn--light btn--compact" type="button" data-open-tracking>👥 Saisir les résultats</button></div>
      <details class="evaluation-skills"><summary>Compétences reliées <span>${skills.length||'à définir'}</span></summary><div class="evaluation-skill-list">${skillRows}</div></details>
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
  function bind(){
    list.querySelectorAll('.evaluation-card').forEach(card=>{
      const key=card.dataset.evalKey,subject=card.dataset.subject,period=card.dataset.period;
      const ensure=()=>plan[key]||(plan[key]={});
      card.querySelector('.evaluation-status').addEventListener('change',e=>{ensure().status=e.target.value;save();});
      card.querySelector('.evaluation-note textarea').addEventListener('input',e=>{ensure().note=e.target.value;save();});
      card.querySelectorAll('[data-eval-skill]').forEach(box=>box.addEventListener('change',()=>{const p=ensure();p.included=p.included||{};p.included[box.dataset.evalSkill]=box.checked;save();}));
      card.querySelector('[data-open-tracking]').addEventListener('click',()=>{
        close();
        const subjectBtn=document.querySelector(`.tab[data-subject="${subject}"]`);if(subjectBtn)subjectBtn.click();
        const periodBtn=document.querySelector(`.filter[data-period="${period}"]`);if(periodBtn)periodBtn.click();
        const classBtn=document.querySelector('.mode-btn[data-mode="classe"]');if(classBtn)classBtn.click();
        window.scrollTo({top:0,behavior:'smooth'});
      });
    });
  }
  if(!openBtn||!modal)return;
  openBtn.addEventListener('click',open);closeBtn.addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
  subjectFilter.addEventListener('change',render);periodFilter.addEventListener('change',render);
})();
