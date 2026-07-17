(function(){
  const state={subject:'francais',period:'all'};
  const grid=document.getElementById('progressionGrid');
  const title=document.getElementById('subjectTitle');
  const subtitle=document.getElementById('subjectSubtitle');
  const icon=document.getElementById('subjectIcon');
  const routines=document.getElementById('routinesList');
  const labels=['Période 1','Période 2','Période 3','Période 4','Période 5'];
  const classes=['p1','p2','p3','p4','p5'];

  function render(){
    const data=window.PROGRESSIONS[state.subject];
    title.textContent=data.title; subtitle.textContent=data.subtitle; icon.textContent=data.icon;
    routines.innerHTML=data.routines.map(x=>`<li>${x}</li>`).join('');
    grid.innerHTML=data.rows.map(row=>{
      if(state.period==='all'){
        return `<article class="domain-card"><h3 class="domain-title">${row[0]}</h3><div class="annual-grid">${row.slice(1).map((text,i)=>`<section class="period-cell ${classes[i]}"><h4>${labels[i]}</h4><p>${text}</p></section>`).join('')}</div></article>`;
      }
      const index=classes.indexOf(state.period);
      return `<article class="domain-card"><h3 class="domain-title">${row[0]}</h3><div class="single-period ${state.period}">${row[index+1]}</div></article>`;
    }).join('');
  }

  document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active'); state.subject=btn.dataset.subject; render();
  }));
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active'); state.period=btn.dataset.period; render();
  }));
  document.getElementById('printBtn').addEventListener('click',()=>window.print());
  render();
})();
