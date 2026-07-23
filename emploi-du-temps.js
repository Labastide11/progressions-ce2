
(() => {
  const periods = {
    rentree:{title:'Rentrée — Semaines 1 et 2 (sans CHAM)',note:'Emploi du temps de secours pour les deux premières semaines, tant que la date de démarrage de la CHAM n’est pas confirmée. Toute la classe reste réunie le mardi et le jeudi.',hours:['9 h 10','4 h 35','1 h 30','2 h 30','2 h','1 h','1 h 15'],minutes:[550,275,90,150,120,60,75],days:{},mode:'rentree'},
    p1:{title:'Période 1 — Emploi du temps de référence',note:'Installation des routines. EPS en classe, sans créneau sportif extérieur. Français et mathématiques restent prioritaires.',hours:['9 h 10','4 h 35','1 h 30','2 h 30','2 h','1 h','1 h 15'],minutes:[550,275,90,150,120,60,75],days:{}},
    p2:{title:'Période 2 — Piscine le vendredi',note:'Vendredi après-midi réservé à la piscine de Grazailles. Le complément de mathématiques est déplacé sur un créneau commun.',hours:['9 h 10','4 h 35','1 h 15','3 h','1 h 45','1 h','1 h 15'],minutes:[550,275,75,180,105,60,75],days:{vendredi:'pool'}},
    p3:{title:'Période 3 — Cavayère le lundi matin',note:'Lundi matin : course d’orientation et sandball. Les apprentissages fondamentaux manqués sont redistribués uniquement sur des temps de classe entière.',hours:['9 h 10','4 h 35','1 h 15','3 h 30','1 h 30','45 min','1 h 15'],minutes:[550,275,75,210,90,45,75],days:{lundi:'cavayere'}},
    p4:{title:'Période 4 — Domec le lundi après-midi',note:'Lundi après-midi : gymnastique et lutte. Les matinées fondamentales sont inchangées.',hours:['9 h 10','4 h 35','1 h 15','3 h 15','1 h 30','45 min','1 h 30'],minutes:[550,275,75,195,90,45,90],days:{lundi:'domec'}},
    p5:{title:'Période 5 — Rééquilibrage annuel',note:'Période longue consacrée au rééquilibrage des arts, sciences, histoire-géographie et EMC, sans réduire français ni mathématiques.',hours:['9 h 10','4 h 35','1 h 30','2 h 08','2 h 07','1 h 19','1 h 11'],minutes:[550,275,90,128,127,79,71],days:{}}
  };
  const base={
    lundi:[['9h–9h15','Quoi de neuf ?','Oral structuré','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Dictée, orthographe, DRAS','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Nouvel apprentissage','maths'],['14h–15h45','EPS / QLM selon période','','eps'],['15h45–16h','Récréation','','break'],['16h–16h25','Anglais','','english'],['16h25–17h','QLM / EMC','','history']],
    mardi:[['9h–9h15','Copie','','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Étude de la langue et DRAS','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Nouvel apprentissage','maths'],['14h–14h30','Anglais','Classe entière','english'],['14h30–15h45','CHAM au conservatoire','Non-CHAM : arts, plan de travail, consolidation','cham'],['15h45–16h','Récréation','','break'],['16h–16h30','CHAM au conservatoire','Poursuite des ateliers non-CHAM','cham'],['16h30–17h','Retour classe entière','Bilan, lecture offerte, activité commune','emc']],
    jeudi:[['9h–9h15','Devinette','','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Étude de la langue et DRAS','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Nouvel apprentissage','maths'],['14h–15h','Sciences / QLM','Classe entière','science'],['15h–16h','Chant choral CHAM','Non-CHAM : arts ou consolidation','cham'],['16h–16h15','Récréation adaptée','','break'],['16h15–16h40','Anglais','Classe entière','english'],['16h40–17h','Vocabulaire / production écrite','','french']],
    vendredi:[['9h–9h30','Un jour, une actu','Oral, compréhension, EMC','french'],['9h30–10h','Lecture et vocabulaire','','french'],['10h–10h45','Dictée-bilan / production écrite','','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Calcul mental','','maths'],['11h15–12h','Mathématiques','Problèmes ou géométrie','maths'],['14h–14h35','Mathématiques','Complément hebdomadaire','maths'],['14h35–15h45','EPS / projet selon période','','eps'],['15h45–16h','Récréation','','break'],['16h–16h40','Production écrite / QLM','','mixed'],['16h40–17h','Conseil et bilan de semaine','','emc']]
  };
  const labels=['Français','Mathématiques','Langue vivante','EPS','Arts','Sciences','Histoire-géographie-EMC'];
  const annual=['330 h','165 h','49 h 30','99 h','66 h','36 h 40','45 h 50'];
  const subjectClasses=['french','maths','english','eps','arts','science','history'];
  const subjectIcons=['📚','➗','🇬🇧','🏃','🎨','🔬','🌍'];
  function altered(day,key,mode){
    const rows=base[day].map(x=>[...x]);
    if(mode==='rentree'&&day==='mardi') return [
      ...rows.slice(0,7),
      ['14h30–15h45','Arts et projets de rentrée','Classe entière : coopération, création, règles de vie','arts'],
      ['15h45–16h','Récréation','','break'],
      ['16h–16h30','Ateliers de rentrée','Classe entière : lecture, jeux mathématiques, découverte des outils','common'],
      ['16h30–17h','Bilan de journée','Lecture offerte, parole aux élèves, préparation du lendemain','emc']
    ];
    if(mode==='rentree'&&day==='jeudi') return [
      ...rows.slice(0,7),
      ['15h–16h','Éducation musicale / arts','Classe entière : chant, rythme, création','arts'],
      ['16h–16h15','Récréation','','break'],
      ['16h15–16h40','Anglais','Classe entière','english'],
      ['16h40–17h','Vocabulaire / production écrite','','french']
    ];
    if(key==='pool'&&day==='vendredi') return rows.slice(0,6).concat([['14h–17h','Piscine de Grazailles','Trajet, vestiaires, séance et retour','eps']]);
    if(key==='cavayere'&&day==='lundi') return [['9h–12h','Cavayère','Course d’orientation et sandball','eps'],['14h–14h45','Lecture-compréhension','Rattrapage classe entière','french'],['14h45–15h30','Dictée / DRAS','Classe entière','french'],['15h30–15h45','Retour au calme','','eps'],['15h45–16h','Récréation','','break'],['16h–16h35','Mathématiques','Entraînement / complément','maths'],['16h35–17h','QLM / bilan','','history']];
    if(key==='domec'&&day==='lundi') return rows.slice(0,6).concat([['14h–17h','Domec','Gymnastique et lutte','eps']]);
    return rows;
  }
  function render(p){
    const data=periods[p];
    const content=document.getElementById('timetableContent');
    const cards=Object.keys(base).map(day=>`<article class="timetable-day"><h3>${day[0].toUpperCase()+day.slice(1)}</h3>${altered(day,data.days[day],data.mode).map(s=>`<div class="slot ${s[3]}"><time>${s[0]}</time><div><strong>${s[1]}</strong>${s[2]?`<small>${s[2]}</small>`:''}</div></div>`).join('')}</article>`).join('');
    const legend=labels.map((label,i)=>`<span class="subject-chip ${subjectClasses[i]}">${subjectIcons[i]} ${label}</span>`).join('');
    const weights=labels.map((label,i)=>{
      const pct=(data.minutes[i]/1320*100).toFixed(1).replace('.',',');
      return `<div class="weight-row ${subjectClasses[i]}"><div class="weight-label"><span>${subjectIcons[i]} ${label}</span><strong>${data.hours[i]} · ${pct} %</strong></div><div class="weight-track"><span style="width:${data.minutes[i]/1320*100}%"></span></div></div>`;
    }).join('');
    content.innerHTML=`<h2>${data.title}</h2><div class="timetable-note">${data.note}<br>${data.mode==='rentree'?'<strong>Organisation spéciale :</strong> aucun départ CHAM prévu ; tous les créneaux se déroulent en classe entière.':'<strong>Principe CHAM :</strong> aucune nouvelle notion ni évaluation commune pendant les absences du mardi et du jeudi.'}</div><div class="subject-legend" aria-label="Légende des matières">${legend}${data.mode==='rentree'?'':'<span class="subject-chip cham">🎵 CHAM</span>'}<span class="subject-chip break">☕ Récréation</span></div><div class="timetable-grid">${cards}</div><section class="weights-wrap"><div class="weights-title"><div><h3>Poids horaire des disciplines</h3><p>Répartition hebdomadaire nette de cette période, sur 22 heures d’enseignement.</p></div><strong>Français + maths : ${((data.minutes[0]+data.minutes[1])/1320*100).toFixed(1).replace('.',',')} %</strong></div><div class="weights-grid">${weights}</div></section><section class="hours-wrap"><h3>Contrôle annuel des volumes</h3><table class="hours-table"><thead><tr><th>Discipline</th><th>Moyenne hebdomadaire nette</th><th>Cible annuelle nette</th></tr></thead><tbody>${labels.map((l,i)=>`<tr class="subject-table-row ${subjectClasses[i]}"><td>${subjectIcons[i]} ${l}</td><td>${data.hours[i]}</td><td>${annual[i]}</td></tr>`).join('')}</tbody><tfoot><tr><td><strong>Total</strong></td><td><strong>22 h</strong></td><td class="ok">792 h sur l’année</td></tr></tfoot></table></section>`;
  }
  function init(){
    const open=document.getElementById('openTimetableBtn'), close=document.getElementById('closeTimetableBtn'), modal=document.getElementById('timetableModal'), tabs=document.getElementById('timetableTabs');
    if(!open||!modal) return;
    tabs.innerHTML=Object.keys(periods).map((p,i)=>`<button class="timetable-tab ${i===0?'is-active':''}" data-period="${p}">${p.toUpperCase()}</button>`).join('');
    tabs.addEventListener('click',e=>{const b=e.target.closest('[data-period]');if(!b)return;tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));render(b.dataset.period)});
    const shut=()=>{modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
    open.addEventListener('click',()=>{modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';render('rentree')});
    close.addEventListener('click',shut); modal.addEventListener('click',e=>{if(e.target===modal)shut()}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))shut()});
    render('rentree');
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
