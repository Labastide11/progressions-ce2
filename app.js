(function(){
  'use strict';
  const STORAGE_KEY='progressions_ce2_suivi_v2';
  const state={subject:'francais',period:'all',mode:'reference'};
  const grid=document.getElementById('progressionGrid');
  const title=document.getElementById('subjectTitle');
  const subtitle=document.getElementById('subjectSubtitle');
  const icon=document.getElementById('subjectIcon');
  const routines=document.getElementById('routinesList');
  const dashboard=document.getElementById('dashboard');
  const labels=['Période 1','Période 2','Période 3','Période 4','Période 5'];
  const classes=['p1','p2','p3','p4','p5'];
  const statusLabels={
    afaire:'À faire', encours:'En cours', travaille:'Travaillé', reprendre:'À reprendre', stabilise:'Stabilisé'
  };
  let saved=loadSaved();

  function loadSaved(){
    try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(e){return {};}
  }
  function persist(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(saved));}catch(e){alert('La sauvegarde locale est impossible dans ce navigateur.');}
  }
  function key(subject,rowIndex,periodIndex){return `${subject}|${rowIndex}|${periodIndex}`;}
  function entry(subject,rowIndex,periodIndex){
    const k=key(subject,rowIndex,periodIndex);
    if(!saved[k]) saved[k]={status:'afaire',steps:{present:false,practice:false,reuse:false,check:false},retention:'',note:''};
    return saved[k];
  }
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function defaultRetention(domain,text){
    const clean=String(text||'').replace(/\s+/g,' ').trim();
    const first=clean.split(/(?<=[.!?])\s+/)[0].replace(/[.!]$/,'');
    const templates={
      'Lecture — fluence':'Je sais lire à voix haute avec fluidité, respecter la ponctuation et mettre le ton.',
      'Lecture — compréhension':'Je sais expliquer ce que j’ai compris et justifier mes réponses avec le texte.',
      'Culture littéraire':'Je sais parler d’une œuvre, reconnaître son genre et faire des liens avec d’autres lectures.',
      'Écriture — copie':'Je sais copier avec soin, respecter la présentation et me relire.',
      'Production d’écrits':'Je sais organiser mes idées, écrire un texte cohérent puis l’améliorer.',
      'Oral':'Je sais écouter, prendre la parole clairement et respecter les échanges.',
      'Vocabulaire':'Je sais comprendre, classer et réutiliser des mots nouveaux.',
      'Grammaire — phrase':'Je sais observer une phrase et utiliser les mots de la grammaire pour l’analyser.',
      'Conjugaison':'Je sais reconnaître le temps d’un verbe et conjuguer les verbes étudiés.',
      'Orthographe grammaticale':'Je sais raisonner pour réaliser les accords étudiés.',
      'Orthographe lexicale — dictée':'Je sais mémoriser l’orthographe des mots et utiliser des régularités pour écrire.',
      'Nombres entiers':'Je sais lire, écrire, comparer et décomposer les nombres étudiés.',
      'Fractions':'Je sais représenter, nommer et comparer les fractions étudiées.',
      'Calcul mental':'Je sais choisir une stratégie de calcul mental efficace.',
      'Calcul posé — opérations':'Je sais poser une opération, estimer et vérifier mon résultat.',
      'Résolution de problèmes':'Je sais comprendre un problème, choisir une représentation et expliquer ma démarche.',
      'Longueurs — périmètres':'Je sais mesurer, choisir une unité et résoudre des problèmes de longueur ou de périmètre.',
      'Masses — contenances':'Je sais mesurer, comparer et choisir une unité adaptée.',
      'Monnaie — durées':'Je sais utiliser la monnaie et calculer des durées dans des situations simples.',
      'Géométrie plane':'Je sais reconnaître, décrire et construire les figures étudiées.',
      'Symétrie':'Je sais reconnaître un axe et compléter une figure symétrique.',
      'Solides':'Je sais reconnaître, décrire et représenter les solides étudiés.',
      'Données':'Je sais lire, organiser et interpréter des données dans un tableau ou un graphique.'
    };
    return templates[domain] || `Je sais expliquer et utiliser ce que j’ai appris : ${first}.`;
  }

  function render(){
    const data=window.PROGRESSIONS[state.subject];
    title.textContent=data.title; subtitle.textContent=data.subtitle; icon.textContent=data.icon;
    routines.innerHTML=data.routines.map(x=>`<li>${esc(x)}</li>`).join('');
    dashboard.classList.toggle('hidden',state.mode!=='suivi');
    grid.classList.toggle('is-followup',state.mode==='suivi');
    if(state.mode==='reference') renderReference(data); else renderFollowup(data);
    updateDashboard();
  }

  function renderReference(data){
    grid.innerHTML=data.rows.map(row=>{
      if(state.period==='all'){
        return `<article class="domain-card"><h3 class="domain-title">${esc(row[0])}</h3><div class="annual-grid">${row.slice(1).map((text,i)=>`<section class="period-cell ${classes[i]}"><h4>${labels[i]}</h4><p>${esc(text)}</p></section>`).join('')}</div></article>`;
      }
      const index=classes.indexOf(state.period);
      return `<article class="domain-card"><h3 class="domain-title">${esc(row[0])}</h3><div class="single-period ${state.period}">${esc(row[index+1])}</div></article>`;
    }).join('');
  }

  function renderFollowup(data){
    const periodIndices=state.period==='all'?[0,1,2,3,4]:[classes.indexOf(state.period)];
    grid.innerHTML=data.rows.map((row,rowIndex)=>{
      const cards=periodIndices.map(periodIndex=>followupCard(row,rowIndex,periodIndex)).join('');
      return `<article class="domain-card followup-domain"><h3 class="domain-title">${esc(row[0])}</h3><div class="followup-periods ${state.period==='all'?'all':''}">${cards}</div></article>`;
    }).join('');
    bindFollowupEvents();
  }

  function followupCard(row,rowIndex,periodIndex){
    const e=entry(state.subject,rowIndex,periodIndex);
    const retention=e.retention || defaultRetention(row[0],row[periodIndex+1]);
    return `<section class="followup-card ${classes[periodIndex]}" data-key="${key(state.subject,rowIndex,periodIndex)}">
      <div class="followup-head"><span>${labels[periodIndex]}</span><select class="status-select status-${e.status}" aria-label="État d'avancement">
        ${Object.entries(statusLabels).map(([value,label])=>`<option value="${value}" ${e.status===value?'selected':''}>${label}</option>`).join('')}
      </select></div>
      <p class="planned"><strong>Ce qui est prévu</strong>${esc(row[periodIndex+1])}</p>
      <fieldset class="checklist"><legend>Ma checklist</legend>
        ${step('present','Notion présentée',e.steps.present)}
        ${step('practice','Entraînement réalisé',e.steps.practice)}
        ${step('reuse','Réinvestissement prévu ou réalisé',e.steps.reuse)}
        ${step('check','Vérification ou observation réalisée',e.steps.check)}
      </fieldset>
      <label class="retention"><span>🦉 Je sais / J’ai retenu</span><textarea data-field="retention" rows="3">${esc(retention)}</textarea></label>
      <label class="teacher-note"><span>📝 Ma note</span><textarea data-field="note" rows="2" placeholder="Adaptation, difficulté, reprise, projet…">${esc(e.note)}</textarea></label>
    </section>`;
  }
  function step(name,label,checked){return `<label class="check-row"><input type="checkbox" data-step="${name}" ${checked?'checked':''}><span>${label}</span></label>`;}

  function bindFollowupEvents(){
    grid.querySelectorAll('.followup-card').forEach(card=>{
      const k=card.dataset.key;
      const e=saved[k];
      const select=card.querySelector('.status-select');
      select.addEventListener('change',()=>{e.status=select.value; select.className=`status-select status-${e.status}`; persist(); updateDashboard();});
      card.querySelectorAll('[data-step]').forEach(input=>input.addEventListener('change',()=>{e.steps[input.dataset.step]=input.checked; persist(); updateDashboard();}));
      card.querySelectorAll('[data-field]').forEach(area=>area.addEventListener('input',()=>{e[area.dataset.field]=area.value; persist();}));
    });
  }

  function visibleKeys(){
    const data=window.PROGRESSIONS[state.subject];
    const periods=state.period==='all'?[0,1,2,3,4]:[classes.indexOf(state.period)];
    const keys=[]; data.rows.forEach((_,ri)=>periods.forEach(pi=>keys.push(key(state.subject,ri,pi))));
    return keys;
  }
  function updateDashboard(){
    if(state.mode!=='suivi') return;
    const counts={afaire:0,encours:0,travaille:0,reprendre:0,stabilise:0};
    const keys=visibleKeys();
    keys.forEach(k=>{const e=saved[k]||{status:'afaire'}; counts[e.status]=(counts[e.status]||0)+1;});
    const done=counts.travaille+counts.stabilise;
    const percent=keys.length?Math.round(done/keys.length*100):0;
    document.getElementById('progressPercent').textContent=percent+' %';
    document.getElementById('progressBar').style.width=percent+'%';
    document.getElementById('stats').innerHTML=Object.entries(statusLabels).map(([k,label])=>`<div class="stat stat-${k}"><strong>${counts[k]||0}</strong><span>${label}</span></div>`).join('');
  }

  document.querySelectorAll('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('is-active')); btn.classList.add('is-active'); state.mode=btn.dataset.mode; render();
  }));
  document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('is-active')); btn.classList.add('is-active'); state.subject=btn.dataset.subject; render();
  }));
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('is-active')); btn.classList.add('is-active'); state.period=btn.dataset.period; render();
  }));
  document.getElementById('printBtn').addEventListener('click',()=>window.print());
  document.getElementById('exportBtn').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify({version:2,exportedAt:new Date().toISOString(),data:saved},null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='sauvegarde_progressions_ce2.json'; a.click(); URL.revokeObjectURL(a.href);
  });
  document.getElementById('importInput').addEventListener('change',event=>{
    const file=event.target.files[0]; if(!file)return;
    const reader=new FileReader(); reader.onload=()=>{try{const payload=JSON.parse(reader.result); saved=payload.data||payload; persist(); render(); alert('Sauvegarde importée.');}catch(e){alert('Ce fichier de sauvegarde n’est pas valide.');}}; reader.readAsText(file); event.target.value='';
  });
  document.getElementById('resetBtn').addEventListener('click',()=>{
    if(!confirm('Réinitialiser uniquement la matière et la période actuellement affichées ?')) return;
    visibleKeys().forEach(k=>delete saved[k]); persist(); render();
  });
  render();
})();
