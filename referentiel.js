(function(){
  'use strict';

  const DATA = window.PROGRESSIONS || {};
  const periodLabels = {all:'Vue annuelle',p1:'Période 1',p2:'Période 2',p3:'Période 3',p4:'Période 4',p5:'Période 5'};
  const periodClasses = ['p1','p2','p3','p4','p5'];
  const state = {subject:'francais', period:'all', collapsed:new Set()};

  const els = {
    grid: document.getElementById('referenceGrid'),
    routines: document.getElementById('routinesList'),
    routinesSection: document.getElementById('routinesSection'),
    title: document.getElementById('currentSubjectTitle'),
    subtitle: document.getElementById('currentSubjectSubtitle'),
    icon: document.getElementById('currentSubjectIcon'),
    contentTitle: document.getElementById('contentTitle'),
    contentIntro: document.getElementById('contentIntro'),
    count: document.getElementById('referenceCount'),
    stats: document.getElementById('summaryStats'),
    toggleAll: document.getElementById('toggleAllBtn'),
    toggleRoutines: document.getElementById('toggleRoutinesBtn')
  };

  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function currentData(){ return DATA[state.subject] || DATA.francais || {rows:[],routines:[]}; }

  function rowsFor(data){ return Array.isArray(data.rows) ? data.rows.filter(row=>Array.isArray(row) && row.length) : []; }

  function competencyCount(data){
    const annual = Array.isArray(data.annualCompetencies) ? data.annualCompetencies.length : 0;
    if(annual) return annual;
    if(state.period === 'all'){
      return periodClasses.reduce((sum,p,index)=>sum + (Array.isArray(data[`p${index+1}Competencies`]) ? data[`p${index+1}Competencies`].length : 0),0);
    }
    const key = `${state.period}Competencies`;
    return Array.isArray(data[key]) ? data[key].length : 0;
  }

  function nonEmptyPeriods(row){ return row.slice(1,6).filter(value=>String(value||'').trim()).length; }

  function renderHeader(data, rows){
    els.title.textContent = data.title || state.subject;
    els.subtitle.textContent = data.subtitle || 'Programmes et repères du CE2';
    els.icon.textContent = data.icon || '📚';
    els.contentTitle.textContent = `${data.title || state.subject} — ${periodLabels[state.period]}`;
    els.contentIntro.textContent = state.period === 'all'
      ? 'Les apprentissages sont organisés par domaines et répartis sur les cinq périodes.'
      : `Les contenus prévus pour la ${periodLabels[state.period].toLowerCase()} sont regroupés par domaine.`;
    const skills = competencyCount(data);
    els.count.textContent = `${rows.length} rubrique${rows.length>1?'s':''}`;
    els.stats.innerHTML = `<span><strong>${rows.length}</strong> domaines</span><span><strong>${skills}</strong> compétences détaillées</span>`;
  }

  function periodCell(text, index){
    return `<section class="reference-period-cell reference-period-cell--${periodClasses[index]}">
      <h4>${periodLabels[periodClasses[index]]}</h4>
      <p>${esc(text || 'Aucun contenu renseigné pour cette période.')}</p>
    </section>`;
  }

  function renderRow(row, index){
    const name = String(row[0] || `Rubrique ${index+1}`);
    const key = `${state.subject}|${name}`;
    const isCollapsed = state.collapsed.has(key);
    let body = '';

    if(state.period === 'all'){
      body = `<div class="reference-annual-grid">${row.slice(1,6).map(periodCell).join('')}</div>`;
    }else{
      const periodIndex = periodClasses.indexOf(state.period);
      const text = row[periodIndex+1] || 'Aucun contenu renseigné pour cette période.';
      body = `<div class="reference-single-period reference-single-period--${state.period}">
        <span>${periodLabels[state.period]}</span>
        <p>${esc(text)}</p>
      </div>`;
    }

    return `<article class="reference-domain${isCollapsed?' is-collapsed':''}" data-domain-key="${esc(key)}">
      <button type="button" class="reference-domain__toggle" aria-expanded="${String(!isCollapsed)}">
        <span><strong>${esc(name)}</strong><small>${nonEmptyPeriods(row)} période${nonEmptyPeriods(row)>1?'s':''} renseignée${nonEmptyPeriods(row)>1?'s':''}</small></span>
        <span class="reference-domain__chevron">${isCollapsed?'▾':'▴'}</span>
      </button>
      <div class="reference-domain__content">${body}</div>
    </article>`;
  }

  function bindDomainButtons(){
    els.grid.querySelectorAll('.reference-domain').forEach(card=>{
      const btn = card.querySelector('.reference-domain__toggle');
      btn.addEventListener('click',()=>{
        const key = card.dataset.domainKey;
        const collapse = !card.classList.contains('is-collapsed');
        card.classList.toggle('is-collapsed',collapse);
        btn.setAttribute('aria-expanded',String(!collapse));
        card.querySelector('.reference-domain__chevron').textContent = collapse ? '▾' : '▴';
        if(collapse) state.collapsed.add(key); else state.collapsed.delete(key);
        updateToggleAll();
      });
    });
  }

  function renderRoutines(data){
    const routines = Array.isArray(data.routines) ? data.routines : [];
    els.routines.innerHTML = routines.length
      ? routines.map(item=>`<li>${esc(item)}</li>`).join('')
      : '<li>Aucun repère permanent renseigné.</li>';
  }

  function render(){
    const data = currentData();
    const rows = rowsFor(data);
    renderHeader(data, rows);
    els.grid.innerHTML = rows.length
      ? rows.map(renderRow).join('')
      : `<div class="reference-empty"><strong>Aucun contenu disponible</strong><p>Cette matière ne contient pas encore de rubrique annuelle exploitable.</p></div>`;
    renderRoutines(data);
    bindDomainButtons();
    updateToggleAll();

    document.querySelectorAll('[data-subject]').forEach(btn=>btn.classList.toggle('is-active',btn.dataset.subject===state.subject));
    document.querySelectorAll('[data-period]').forEach(btn=>btn.classList.toggle('is-active',btn.dataset.period===state.period));
  }

  function updateToggleAll(){
    const cards = [...els.grid.querySelectorAll('.reference-domain')];
    const allCollapsed = cards.length>0 && cards.every(card=>card.classList.contains('is-collapsed'));
    els.toggleAll.textContent = allCollapsed ? '▾ Tout déplier' : '▴ Tout replier';
    els.toggleAll.dataset.action = allCollapsed ? 'expand' : 'collapse';
  }

  document.querySelectorAll('[data-subject]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!DATA[btn.dataset.subject]) return;
    state.subject = btn.dataset.subject;
    state.collapsed.clear();
    render();
  }));

  document.querySelectorAll('[data-period]').forEach(btn=>btn.addEventListener('click',()=>{
    state.period = btn.dataset.period;
    render();
  }));

  els.toggleAll.addEventListener('click',()=>{
    const cards = [...els.grid.querySelectorAll('.reference-domain')];
    const collapse = els.toggleAll.dataset.action !== 'expand';
    cards.forEach(card=>{
      const key = card.dataset.domainKey;
      card.classList.toggle('is-collapsed',collapse);
      card.querySelector('.reference-domain__toggle').setAttribute('aria-expanded',String(!collapse));
      card.querySelector('.reference-domain__chevron').textContent = collapse ? '▾' : '▴';
      if(collapse) state.collapsed.add(key); else state.collapsed.delete(key);
    });
    updateToggleAll();
  });

  document.getElementById('printBtn').addEventListener('click',()=>window.print());

  els.toggleRoutines.addEventListener('click',()=>{
    const collapsed = els.routinesSection.classList.toggle('is-collapsed');
    els.toggleRoutines.textContent = collapsed ? '▾ Déplier' : '▴ Replier';
    els.toggleRoutines.setAttribute('aria-expanded',String(!collapsed));
  });

  render();
})();
