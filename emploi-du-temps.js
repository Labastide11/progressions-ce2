
(() => {
  const periods = {
    p1:{title:'Période 1 — Emploi du temps de référence',note:'Installation des routines. EPS en classe, sans créneau sportif extérieur. Français et mathématiques restent prioritaires.',hours:['9 h 10','4 h 35','1 h 30','2 h 30','2 h','1 h','1 h 15'],days:{}},
    p2:{title:'Période 2 — Piscine le vendredi',note:'Vendredi après-midi réservé à la piscine de Grazailles. Le complément de mathématiques est déplacé sur un créneau commun.',hours:['9 h 10','4 h 35','1 h 15','3 h','1 h 45','1 h','1 h 15'],days:{vendredi:'pool'}},
    p3:{title:'Période 3 — Cavayère le lundi matin',note:'Lundi matin : course d’orientation et sandball. Les apprentissages fondamentaux manqués sont redistribués uniquement sur des temps de classe entière.',hours:['9 h 10','4 h 35','1 h 15','3 h 30','1 h 30','45 min','1 h 15'],days:{lundi:'cavayere'}},
    p4:{title:'Période 4 — Domec le lundi après-midi',note:'Lundi après-midi : gymnastique et lutte. Les matinées fondamentales sont inchangées.',hours:['9 h 10','4 h 35','1 h 15','3 h 15','1 h 30','45 min','1 h 30'],days:{lundi:'domec'}},
    p5:{title:'Période 5 — Rééquilibrage annuel',note:'Période longue consacrée au rééquilibrage des arts, sciences, histoire-géographie et EMC, sans réduire français ni mathématiques.',hours:['9 h 10','4 h 35','1 h 30','2 h 08','2 h 07','1 h 19','1 h 11'],days:{}}
  };
  const base={
    lundi:[['9h–9h15','Quoi de neuf ?','Oral structuré','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Dictée, orthographe, DRAS','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Nouvel apprentissage','maths'],['14h–15h45','EPS / QLM selon période','','eps'],['15h45–16h','Récréation','','break'],['16h–16h25','Anglais','','common'],['16h25–17h','QLM / EMC','','common']],
    mardi:[['9h–9h15','Copie','','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Étude de la langue et DRAS','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Nouvel apprentissage','maths'],['14h–14h30','Anglais','Classe entière','common'],['14h30–15h45','CHAM au conservatoire','Non-CHAM : arts, plan de travail, consolidation','cham'],['15h45–16h','Récréation','','break'],['16h–16h30','CHAM au conservatoire','Poursuite des ateliers non-CHAM','cham'],['16h30–17h','Retour classe entière','Bilan, lecture offerte, activité commune','common']],
    jeudi:[['9h–9h15','Devinette','','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Étude de la langue et DRAS','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Nouvel apprentissage','maths'],['14h–15h','Sciences / QLM','Classe entière','common'],['15h–16h','Chant choral CHAM','Non-CHAM : arts ou consolidation','cham'],['16h–16h15','Récréation adaptée','','break'],['16h15–16h40','Anglais','Classe entière','common'],['16h40–17h','Vocabulaire / production écrite','','french']],
    vendredi:[['9h–9h30','Un jour, une actu','Oral, compréhension, EMC','french'],['9h30–10h','Lecture et vocabulaire','','french'],['10h–10h45','Dictée-bilan / production écrite','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Problèmes ou géométrie','maths'],['14h–14h35','Mathématiques','Complément hebdomadaire','maths'],['14h35–15h45','EPS / projet selon période','','eps'],['15h45–16h','Récréation','','break'],['16h–16h40','Production écrite / QLM','','common'],['16h40–17h','Conseil et bilan de semaine','','common']]
  };
  const labels=['Français','Mathématiques','Langue vivante','EPS','Arts','Sciences','Histoire-géographie-EMC'];
  const annual=['330 h','165 h','49 h 30','99 h','66 h','36 h 40','45 h 50'];
  function altered(day,key){
    const rows=base[day].map(x=>[...x]);
    if(key==='pool'&&day==='vendredi') return rows.slice(0,6).concat([['14h–17h','Piscine de Grazailles','Trajet, vestiaires, séance et retour','eps']]);
    if(key==='cavayere'&&day==='lundi') return [['9h–12h','Cavayère','Course d’orientation et sandball','eps'],['14h–14h45','Lecture-compréhension','Rattrapage classe entière','french'],['14h45–15h30','Dictée / DRAS','Classe entière','french'],['15h30–15h45','Retour au calme','','common'],['15h45–16h','Récréation','','break'],['16h–16h35','Mathématiques','Entraînement / complément','maths'],['16h35–17h','QLM / bilan','','common']];
    if(key==='domec'&&day==='lundi') return rows.slice(0,6).concat([['14h–17h','Domec','Gymnastique et lutte','eps']]);
    return rows;
  }
  function render(p){
    const data=periods[p];
    const content=document.getElementById('timetableContent');
    const cards=Object.keys(base).map(day=>`<article class="timetable-day"><h3>${day[0].toUpperCase()+day.slice(1)}</h3>${altered(day,data.days[day]).map(s=>`<div class="slot ${s[3]}"><time>${s[0]}</time><div><strong>${s[1]}</strong>${s[2]?`<small>${s[2]}</small>`:''}</div></div>`).join('')}</article>`).join('');
    content.innerHTML=`<h2>${data.title}</h2><div class="timetable-note">${data.note}<br><strong>Principe CHAM :</strong> aucune nouvelle notion ni évaluation commune pendant les absences du mardi et du jeudi.</div><div class="timetable-grid">${cards}</div><section class="hours-wrap"><h3>Équilibre horaire de la période</h3><table class="hours-table"><thead><tr><th>Discipline</th><th>Moyenne hebdomadaire nette</th><th>Cible annuelle nette</th></tr></thead><tbody>${labels.map((l,i)=>`<tr><td>${l}</td><td>${data.hours[i]}</td><td>${annual[i]}</td></tr>`).join('')}</tbody><tfoot><tr><td><strong>Total</strong></td><td><strong>22 h</strong></td><td class="ok">792 h sur l’année</td></tr></tfoot></table></section>`;
  }
  function init(){
    const open=document.getElementById('openTimetableBtn'), close=document.getElementById('closeTimetableBtn'), modal=document.getElementById('timetableModal'), tabs=document.getElementById('timetableTabs');
    if(!open||!modal) return;
    tabs.innerHTML=Object.keys(periods).map((p,i)=>`<button class="timetable-tab ${i===0?'is-active':''}" data-period="${p}">${p.toUpperCase()}</button>`).join('');
    tabs.addEventListener('click',e=>{const b=e.target.closest('[data-period]');if(!b)return;tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));render(b.dataset.period)});
    const shut=()=>{modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
    open.addEventListener('click',()=>{modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';render('p1')});
    close.addEventListener('click',shut); modal.addEventListener('click',e=>{if(e.target===modal)shut()}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))shut()});
    render('p1');
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
