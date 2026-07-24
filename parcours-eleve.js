(function(){
'use strict';
const DATA=window.PROGRESSIONS_PARCOURS_ELEVE||{};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key=(period,obj)=>`progressionsCE2.parcours.${period}.${obj}`;
const stages=[
  {id:'decouvre',icon:'🌱',label:'Je découvre'},
  {id:'entraine',icon:'🔧',label:'Je m’entraîne'},
  {id:'pret',icon:'⭐',label:'Je me sens prêt'},
  {id:'valide',icon:'✅',label:'Validé'}
];
function selected(period,id){return localStorage.getItem(key(period,id))||'';}
function objectiveCard(period,o,index){
  const active=selected(period,o.id);
  return `<article class="pe-objective-card">
    <div class="pe-objective-number">${index+1}</div>
    <div class="pe-objective-main">
      <h3>${esc(o.texte)}</h3>
      <p><strong>${esc(o.semaines)}</strong></p>
      <details class="pe-learning-details"><summary>Ce que je vais apprendre</summary><ul>${(o.savoirFaire||[]).map(item=>`<li>${esc(item)}</li>`).join('')}</ul></details>
    </div>
    <div class="pe-stage-row" role="group" aria-label="Progression pour l’objectif ${index+1}">
      ${stages.map(s=>`<button type="button" class="pe-stage ${active===s.id?'is-active':''} ${s.id==='valide'?'is-teacher':''}" data-pe-stage="${s.id}" data-pe-objective="${o.id}"><span>${s.icon}</span><small>${s.label}</small></button>`).join('')}
    </div>
  </article>`;
}
function evaluationTable(rows){return `<div class="pe-table-wrap"><table class="pe-eval-table"><thead><tr><th>Moment prévu</th><th>Ce qui pourra être évalué</th><th>Comment ?</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.moment)}</td><td>${esc(r.contenu)}</td><td>${esc(r.forme)}</td></tr>`).join('')}</tbody></table></div>`;}
function renderP1(container){
  const d=DATA.p1;
  container.innerHTML=`<section class="pe-view" data-pe-root="p1">
    <div class="pe-toolbar no-print">
      <button type="button" class="pe-back" data-pe-back>← Retour à la vue synthétique</button>
      <div class="pe-toolbar-actions"><button type="button" class="pe-reset" data-pe-reset>↺ Effacer les coches</button><button type="button" class="pe-print" data-pe-print>🖨️ Imprimer le livret</button></div>
    </div>
    <section class="pe-page pe-page-one">
      <header class="pe-header"><span class="pe-kicker">PARCOURS ÉLÈVE · CE2</span><h2>${esc(d.titre)}</h2><p>${esc(d.sousTitre)}</p></header>
      <div class="pe-identity"><label>Prénom : <span></span></label><strong>Classe : CE2</strong><strong>Période : 1</strong></div>
      <div class="pe-explanation"><strong>Mes 5 grands objectifs</strong><p>Ils sont travaillés plusieurs fois pendant la période. Je peux avancer progressivement.</p></div>
      <div class="pe-objectives">${d.objectifs.map((o,i)=>objectiveCard('p1',o,i)).join('')}</div>
      <div class="pe-legend"><div><b>🌱 Je découvre</b><span>Je commence à comprendre.</span></div><div><b>🔧 Je m’entraîne</b><span>Je fais des exercices et je demande de l’aide.</span></div><div><b>⭐ Je me sens prêt</b><span>Je pense pouvoir réussir seul.</span></div><div><b>✅ Validé</b><span>L’enseignant confirme ma réussite.</span></div></div>
      <p class="pe-note"><strong>Important :</strong> les évaluations sont réparties pendant la période. Je ne suis pas évalué sur tout en même temps.</p>
    </section>
    <section class="pe-page pe-page-two">
      <header class="pe-header pe-header-small"><span class="pe-kicker">PÉRIODE 1</span><h2>Mes évaluations et mon bilan</h2><p>Je sais ce qui pourra être évalué et je réfléchis à mes progrès.</p></header>
      <h3 class="pe-section-title">Au cours de la période, je pourrai être évalué sur…</h3>
      ${evaluationTable(d.evaluations)}
      <h3 class="pe-section-title">Mon bilan personnel</h3>
      <div class="pe-bilan-grid">
        <label><strong>Ma plus grande réussite</strong><span>Ce dont je suis fier :</span><textarea aria-label="Ma plus grande réussite"></textarea></label>
        <label><strong>Ce qui reste difficile</strong><span>Ce que je dois encore travailler :</span><textarea aria-label="Ce qui reste difficile"></textarea></label>
        <label><strong>Une aide qui m’a été utile</strong><span>Une méthode, un outil ou une personne :</span><textarea aria-label="Une aide utile"></textarea></label>
        <label><strong>Mon prochain objectif</strong><span>Ce que je veux réussir ensuite :</span><textarea aria-label="Mon prochain objectif"></textarea></label>
      </div>
      <div class="pe-signatures"><div><strong>Le regard de l’enseignant</strong><span></span></div><div><strong>Signature de l’élève</strong><span></span></div><div><strong>Signature de la famille</strong><span></span></div></div>
    </section>
  </section>`;
  bind(container,'p1');
}
function bind(container,period){
  container.querySelectorAll('[data-pe-stage]').forEach(btn=>btn.addEventListener('click',()=>{
    const obj=btn.dataset.peObjective, stage=btn.dataset.peStage;
    localStorage.setItem(key(period,obj),stage);
    container.querySelectorAll(`[data-pe-objective="${obj}"]`).forEach(b=>b.classList.toggle('is-active',b.dataset.peStage===stage));
  }));
  container.querySelector('[data-pe-print]')?.addEventListener('click',()=>{document.body.classList.add('printing-parcours');window.print();setTimeout(()=>document.body.classList.remove('printing-parcours'),300)});
  container.querySelector('[data-pe-reset]')?.addEventListener('click',()=>{DATA[period].objectifs.forEach(o=>localStorage.removeItem(key(period,o.id)));renderP1(container)});
}
window.ProgressionsParcoursEleve={renderP1};
})();
