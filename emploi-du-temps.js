
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
  const detailedWeeks={
    rentree1:{
      title:'Semaine 1 — Accueillir et observer',
      dates:'Du mardi 1er au vendredi 4 septembre 2026',
      note:'Académie de Montpellier — zone C. La première semaine commence le mardi : aucun lundi fictif. Tous les élèves sont présents ; la CHAM n’est pas encore appliquée.',
      days:[
        ['Mardi 1er septembre 2026',[
          ['9h–9h30','Organisation','Accueil, installation et découverte de la classe.','Comprendre l’organisation de la classe et adopter les premières routines.','common'],
          ['9h30–10h','EMC','Se présenter et construire les premières règles de prise de parole.','Écouter autrui, attendre son tour et prendre la parole à bon escient.','emc'],
          ['10h–10h45','Français','Lecture offerte et compréhension orale.','Reformuler les informations essentielles d’un texte entendu.','french'],
          ['11h–11h20','Mathématiques','Calcul mental diagnostique sur ardoise.','Mobiliser les premiers faits numériques et expliciter une procédure.','maths'],
          ['11h20–12h','Mathématiques','Défis diagnostiques : lire, écrire et comparer des nombres.','Lire, écrire, représenter et comparer des nombres entiers.','maths'],
          ['14h–14h30','Français','Écrire : « Ce que j’aimerais apprendre en CE2 ».','Produire des phrases cohérentes et lisibles.','french'],
          ['14h30–15h15','Arts','Créer son étiquette ou son portrait de rentrée.','Expérimenter, produire et présenter une réalisation plastique.','arts'],
          ['15h15–15h45','Organisation','Découvrir les cahiers, le casier et les responsabilités.','Utiliser les outils de la classe avec autonomie.','common'],
          ['16h–16h30','EMC','Élaborer les premières règles de vie.','Comprendre le sens des règles collectives.','emc'],
          ['16h30–17h','Organisation','Bilan de la journée et rangement.','Identifier ce qui a été appris et préparer son matériel.','common']
        ]],
        ['Jeudi 3 septembre 2026',[
          ['9h–9h15','Français','Devinette de rentrée et prise de parole justifiée.','Formuler une réponse et la justifier oralement.','french'],
          ['9h15–10h','Français','Lecture diagnostique courte.','Lire silencieusement et prélever des informations explicites.','french'],
          ['10h–10h45','Français','Réviser la phrase : majuscule, point et ordre des mots.','Identifier une phrase et respecter ses marques essentielles.','french'],
          ['11h–11h15','Mathématiques','Calcul mental : nombres et compléments.','Calculer mentalement avec des nombres simples.','maths'],
          ['11h15–12h','Mathématiques','Diagnostic de numération.','Décomposer, ranger et comparer des nombres.','maths'],
          ['14h–14h45','Questionner le monde','Se repérer dans l’école.','Se repérer dans un espace proche et respecter les règles de sécurité.','science'],
          ['14h45–15h45','Arts / Musique','Chant collectif et jeux rythmiques.','Mémoriser et interpréter un chant ; reproduire un rythme.','arts'],
          ['16h–16h30','Français','Découvrir la bibliothèque et choisir un livre.','Choisir un ouvrage et adopter une posture de lecteur.','french'],
          ['16h30–17h','Organisation','Compléter « Ce que j’ai appris aujourd’hui ».','Faire le bilan d’une journée de travail.','common']
        ]],
        ['Vendredi 4 septembre 2026',[
          ['9h–9h30','Français / EMI','Découverte du rituel « Un jour, une actu ».','Écouter, comprendre et exprimer une réaction pertinente.','french'],
          ['9h30–10h','Français','Lecture entendue puis reformulation.','Identifier les personnages, le lieu et les actions principales.','french'],
          ['10h–10h45','Français','Copie diagnostique d’un court texte.','Copier lisiblement en respectant la mise en page et la ponctuation.','french'],
          ['11h–11h15','Mathématiques','Calcul mental : doubles et compléments.','Mémoriser et utiliser des faits numériques simples.','maths'],
          ['11h15–12h','Mathématiques','Diagnostic de géométrie.','Reconnaître, nommer et reproduire des figures simples.','maths'],
          ['14h–14h45','EPS','Jeux collectifs de coopération.','Coopérer, respecter les règles et tenir un rôle.','eps'],
          ['14h45–15h30','Questionner le monde','Observer, questionner et formuler une hypothèse.','Pratiquer une démarche d’investigation.','science'],
          ['15h30–15h45','Anglais','Saluer et dire son prénom.','Utiliser quelques formules simples pour communiquer.','english'],
          ['16h–16h30','EMC','Attribuer les responsabilités de classe.','S’engager dans la vie collective.','emc'],
          ['16h30–17h','Organisation','Bilan de la première semaine.','Exprimer une réussite, une difficulté et un besoin.','common']
        ]]
      ]
    },
    rentree2:{
      title:'Semaine 2 — Commencer la progression P1',
      dates:'Du lundi 7 au vendredi 11 septembre 2026',
      note:'Académie de Montpellier — zone C. La classe entière est prévue sur tous les créneaux. Les adaptations CHAM seront ajoutées uniquement lorsque le dispositif commencera réellement.',
      days:[
        ['Lundi 7 septembre 2026',[
          ['9h–9h15','Français','« Quoi de neuf ? » : règles d’écoute et de prise de parole.','Participer à des échanges dans des situations variées.','french'],
          ['9h15–10h','Français','Lecture-compréhension : personnages, lieu et actions.','Comprendre un texte et identifier ses informations essentielles.','french'],
          ['10h–10h25','Français','Dictée diagnostique courte.','Écrire sous la dictée en mobilisant les correspondances graphophonologiques.','french'],
          ['10h25–10h45','Français','Correction et copie soignée.','Réviser son écrit et copier avec exactitude.','french'],
          ['11h–11h15','Mathématiques','Problème oral et calcul mental.','Chercher, représenter et expliquer une procédure.','maths'],
          ['11h15–12h','Mathématiques','Lire, écrire et décomposer jusqu’à 999.','Utiliser diverses représentations des nombres entiers.','maths'],
          ['14h–14h45','Questionner le monde','Journée, semaine, mois et calendrier de septembre.','Se repérer dans le temps et utiliser un calendrier.','history'],
          ['14h45–15h30','EPS','Relais et jeux de coopération.','Coopérer et produire une performance mesurée.','eps'],
          ['15h30–15h45','Français','Lecture autonome.','Maintenir une attention de lecteur sur un temps défini.','french'],
          ['16h–16h30','EMC','Droits et devoirs de l’élève.','Comprendre les principes de la vie collective.','emc'],
          ['16h30–17h','Organisation','Agenda, cartable et bilan des apprentissages.','Organiser son travail personnel.','common']
        ]],
        ['Mardi 8 septembre 2026',[
          ['9h–9h15','Français','Rituel de copie.','Copier rapidement et avec exactitude.','french'],
          ['9h15–10h','Français','Trouver un indice dans un texte pour justifier une réponse.','Prélever une information explicite et justifier sa réponse.','french'],
          ['10h–10h25','Français','Dictée de mots.','Mémoriser l’orthographe de mots fréquents.','french'],
          ['10h25–10h45','Français','Produire trois phrases pour se présenter.','Écrire un texte court cohérent.','french'],
          ['11h–11h15','Mathématiques','Additions et soustractions mentales.','Calculer mentalement en utilisant des procédures adaptées.','maths'],
          ['11h15–12h','Mathématiques','Réviser l’addition posée.','Poser et calculer une addition avec ou sans retenue.','maths'],
          ['14h–14h30','Anglais','Saluer, demander et donner son prénom.','Prendre part à un échange bref et ritualisé.','english'],
          ['14h30–15h15','Arts','Réaliser une affiche collective de rentrée.','Coopérer dans un projet artistique.','arts'],
          ['15h15–15h45','Organisation','Ateliers d’autonomie et remédiation.','Choisir un outil adapté et terminer une tâche.','common'],
          ['16h–16h30','Français','Lecture offerte.','Écouter et comprendre un texte littéraire.','french'],
          ['16h30–17h','Organisation','Classement et bilan individuel.','Ranger et identifier ses progrès.','common']
        ]],
        ['Jeudi 10 septembre 2026',[
          ['9h–9h15','Français','Devinette : chercher et justifier.','Formuler une hypothèse et argumenter brièvement.','french'],
          ['9h15–10h','Français','Remettre les événements d’un texte dans l’ordre.','Comprendre la chronologie d’un récit.','french'],
          ['10h–10h25','Français','Dictée préparée courte.','Mobiliser les régularités orthographiques étudiées.','french'],
          ['10h25–10h45','Français','Phrase affirmative et phrase négative.','Identifier et transformer des formes de phrases.','french'],
          ['11h–11h15','Mathématiques','Suites de nombres et compléments.','Poursuivre une suite et calculer mentalement.','maths'],
          ['11h15–12h','Mathématiques','Tracer et mesurer des segments.','Utiliser la règle graduée avec précision.','maths'],
          ['14h–14h45','Questionner le monde','Dessin d’observation.','Observer, décrire et représenter fidèlement.','science'],
          ['14h45–15h45','Arts / Musique','Échauffement vocal, chant et rythme.','Interpréter un chant et reproduire un rythme.','arts'],
          ['16h–16h30','Numérique','Découverte de Maître Hibou et des règles d’usage.','Utiliser un outil numérique de façon responsable.','common'],
          ['16h30–17h','Français','Lecture autonome et présentation d’un livre.','Lire et partager une première impression de lecture.','french']
        ]],
        ['Vendredi 11 septembre 2026',[
          ['9h–9h30','Français / EMI','« Un jour, une actu ».','Comprendre un document oral et exprimer un point de vue.','french'],
          ['9h30–10h','Français','Lecture fluence diagnostique.','Lire à voix haute avec exactitude et fluidité.','french'],
          ['10h–10h25','Français','Dictée des mots de la semaine.','Réinvestir l’orthographe mémorisée.','french'],
          ['10h25–10h45','Français','Écrire le bilan des deux premières semaines.','Produire un texte court organisé.','french'],
          ['11h–11h15','Mathématiques','Bilan de calcul mental.','Mobiliser rapidement des procédures de calcul.','maths'],
          ['11h15–12h','Mathématiques','Résoudre un problème additif.','Résoudre un problème et expliciter sa démarche.','maths'],
          ['14h–14h45','EPS','Jeux collectifs avec rôles.','Coopérer, respecter les règles et arbitrer simplement.','eps'],
          ['14h45–15h30','Questionner le monde','Représenter la classe ou l’école par un plan simple.','Produire et lire une représentation d’un espace proche.','history'],
          ['15h30–15h45','Anglais','Jeu oral de salutations en binômes.','Interagir dans un échange bref.','english'],
          ['16h–16h30','EMC','Conseil de classe : réussites et améliorations.','Exprimer un avis et écouter celui des autres.','emc'],
          ['16h30–17h','Organisation','Présentation des objectifs de P1.','Se projeter dans les apprentissages à venir.','common']
        ]]
      ]
    }
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
  function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function statusKey(week,day,time){return `progressionsCE2.edt.${week}.${day}.${time}`;}
  function statusSelect(key){
    const current=localStorage.getItem(key)||'Prévu';
    return `<select class="detail-status" data-status-key="${esc(key)}">${['Prévu','Réalisé','Reporté'].map(v=>`<option${v===current?' selected':''}>${v}</option>`).join('')}</select>`;
  }
  function renderDetailedWeek(key){
    const data=detailedWeeks[key];
    const content=document.getElementById('timetableContent');
    content.innerHTML=`<section class="detail-view"><div class="detail-top"><div><span class="detail-zone">Académie de Montpellier — zone C</span><h2>${data.title}</h2><p>${data.dates}</p></div><button class="detail-back" type="button" data-back-summary>← Retour à la vue synthétique</button></div><div class="timetable-note">${data.note}</div>${data.days.map(([day,rows])=>`<section class="detail-day"><h3>${day}</h3><div class="detail-table-wrap"><table class="detail-table"><thead><tr><th>Horaire</th><th>Matière</th><th>Séance proposée</th><th>Compétence reliée à Progressions CE2</th><th>Statut</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="detail-time">${r[0]}</td><td><span class="detail-subject ${r[4]}">${r[1]}</span></td><td>${r[2]}</td><td>${r[3]}</td><td>${statusSelect(statusKey(key,day,r[0]))}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</section>`;
    content.querySelectorAll('[data-status-key]').forEach(sel=>sel.addEventListener('change',()=>localStorage.setItem(sel.dataset.statusKey,sel.value)));
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
    content.innerHTML=`<h2>${data.title}</h2><div class="timetable-note">${data.note}<br>${data.mode==='rentree'?'<strong>Organisation spéciale :</strong> aucun départ CHAM prévu ; tous les créneaux se déroulent en classe entière.':'<strong>Principe CHAM :</strong> aucune nouvelle notion ni évaluation commune pendant les absences du mardi et du jeudi.'}</div><div class="subject-legend" aria-label="Légende des matières">${legend}${data.mode==='rentree'?'':'<span class="subject-chip cham">🎵 CHAM</span>'}<span class="subject-chip break">☕ Récréation</span></div><div class="timetable-grid">${cards}</div><section class="weights-wrap"><div class="weights-title"><div><h3>Poids horaire des disciplines</h3><p>Répartition hebdomadaire nette de cette période, sur 22 heures d’enseignement.</p></div><strong>Français + maths : ${((data.minutes[0]+data.minutes[1])/1320*100).toFixed(1).replace('.',',')} %</strong></div><div class="weights-grid">${weights}</div></section><section class="hours-wrap"><h3>Contrôle annuel des volumes</h3><table class="hours-table"><thead><tr><th>Discipline</th><th>Moyenne hebdomadaire nette</th><th>Cible annuelle nette</th></tr></thead><tbody>${labels.map((l,i)=>`<tr class="subject-table-row ${subjectClasses[i]}"><td>${subjectIcons[i]} ${l}</td><td>${data.hours[i]}</td><td>${annual[i]}</td></tr>`).join('')}</tbody><tfoot><tr><td><strong>Total</strong></td><td><strong>22 h</strong></td><td class="ok">792 h sur l’année</td></tr></tfoot></table></section><section class="detail-entry"><div><h3>Proposition pédagogique détaillée</h3><p>${data.mode==='rentree'?'Choisis une des deux semaines de rentrée pour afficher chaque séance et sa compétence associée.':'Cette période sera détaillée progressivement à partir des progressions et des évaluations.'}</p></div>${data.mode==='rentree'?'<div class="detail-week-buttons"><button type="button" data-open-detail="rentree1">📋 Semaine 1 — Accueillir et observer</button><button type="button" data-open-detail="rentree2">📋 Semaine 2 — Commencer la progression P1</button></div>':'<button type="button" class="detail-disabled" disabled>📋 Voir une proposition détaillée — à construire</button>'}</section>`;
  }
  function init(){
    const open=document.getElementById('openTimetableBtn'), close=document.getElementById('closeTimetableBtn'), modal=document.getElementById('timetableModal'), tabs=document.getElementById('timetableTabs');
    if(!open||!modal) return;
    const content=document.getElementById('timetableContent');
    content.addEventListener('click',e=>{
      const detail=e.target.closest('[data-open-detail]');
      if(detail){renderDetailedWeek(detail.dataset.openDetail);content.scrollTop=0;return;}
      if(e.target.closest('[data-back-summary]')){const active=tabs.querySelector('.is-active');render(active?active.dataset.period:'rentree');content.scrollTop=0;}
    });
    tabs.innerHTML=Object.keys(periods).map((p,i)=>`<button class="timetable-tab ${i===0?'is-active':''}" data-period="${p}">${p.toUpperCase()}</button>`).join('');
    tabs.addEventListener('click',e=>{const b=e.target.closest('[data-period]');if(!b)return;tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));render(b.dataset.period)});
    const shut=()=>{modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
    open.addEventListener('click',()=>{modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';render('rentree')});
    close.addEventListener('click',shut); modal.addEventListener('click',e=>{if(e.target===modal)shut()}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))shut()});
    render('rentree');
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
