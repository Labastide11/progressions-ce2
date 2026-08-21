// V34.77 — Espace Parents : synthèse des apprentissages par période, 5 essentiels maximum par matière.
// Le référentiel enseignant reste inchangé : seule la présentation destinée aux familles est simplifiée.
// Les repères annuels transversaux Arts / éducation musicale sont affichés pour chaque période.
(function(){
'use strict';
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const EDT=window.PUBLIC_EDT,PROG=window.PROGRESSIONS||{},W=window.PARENTS_SEMAINE||{},H=window.PARENTS_TRAVAIL||{},L=window.PARENTS_VIE_CLASSE||{},I=window.PARENTS_INFOS||{},D1=window.DEVOIRS_P1||{weeks:[]},D2=window.DEVOIRS_P2||{weeks:[]},D3=window.DEVOIRS_P3||{weeks:[]},D4=window.DEVOIRS_P4||{weeks:[]},D5=window.DEVOIRS_P5||{weeks:[]},D={weeks:[...(D1.weeks||[]).map(w=>({...w,__period:'p1'})),...(D2.weeks||[]).map(w=>({...w,__period:'p2'})),...(D3.weeks||[]).map(w=>({...w,__period:'p3'})),...(D4.weeks||[]).map(w=>({...w,__period:'p4'})),...(D5.weeks||[]).map(w=>({...w,__period:'p5'}))].sort((a,b)=>String(a.start||'').localeCompare(String(b.start||'')))};
const CAL=window.CALENDRIER_SCOLAIRE_2026_2027||{daysOff:[],breaks:[]};
const subjectOrder=['francais','maths','anglais','sciences','histoire','geographie','eps','arts'];
const togetherOrder=['emc','evar','emi'];
const LEARNING_PERIOD_DATES={
  p1:{label:'Période 1',start:'2026-09-01',end:'2026-10-16'},
  p2:{label:'Période 2',start:'2026-11-02',end:'2026-12-18'},
  p3:{label:'Période 3',start:'2027-01-04',end:'2027-02-05'},
  p4:{label:'Période 4',start:'2027-02-22',end:'2027-04-02'},
  p5:{label:'Période 5',start:'2027-04-19',end:'2027-07-02'}
};
const PARENT_LEARNING_SUMMARIES={
  p1:{
    francais:[
      'Comprendre un texte court et retrouver les informations importantes.',
      'Lire à voix haute avec de plus en plus de fluidité.',
      'Écrire et copier quelques phrases correctes, puis se relire.',
      'Repérer le verbe et le sujet dans une phrase simple.',
      'Commencer à conjuguer au présent et enrichir son vocabulaire.'
    ],
    maths:[
      'Lire, écrire, décomposer et comparer les nombres.',
      'Calculer mentalement avec des stratégies simples.',
      'Poser et calculer des additions et des soustractions.',
      'Résoudre un problème simple et expliquer sa démarche.',
      'Utiliser les premiers outils et repères de géométrie.'
    ],
    anglais:[
      'Comprendre et utiliser quelques salutations courantes.',
      'Demander et dire son prénom.',
      'Comprendre et dire le temps qu’il fait.',
      'Oser prendre la parole avec des expressions très simples.',
      'Découvrir quelques repères culturels liés à l’Angleterre et à Halloween.'
    ],
    sciences:[
      'Se poser une question que l’on peut étudier.',
      'Réaliser une expérience simple en respectant les consignes.',
      'Observer et garder une trace des résultats.',
      'Comparer ce que l’on observe.',
      'Tirer une conclusion simple à partir des résultats.'
    ],
    histoire:[
      'Ordonner des événements dans le temps.',
      'Utiliser une frise chronologique.',
      'Reconnaître les grandes périodes historiques.',
      'Associer quelques repères historiques à la bonne période.'
    ],
    geographie:[
      'Localiser la France à différentes échelles.',
      'Lire une carte simple de la population.',
      'Localiser Paris et quelques grandes villes françaises.',
      'Comparer des espaces plus ou moins peuplés.',
      'Comprendre simplement pourquoi la population est inégalement répartie.'
    ],
    eps:[
      'Coopérer et respecter les règles dans les jeux collectifs.',
      'Courir longtemps en apprenant à gérer son allure.',
      'Agir en sécurité et tenir un rôle simple dans une activité.',
      'Observer ses résultats et repérer ses progrès.'
    ],
    arts:[
      'Expérimenter différents outils, gestes et matériaux.',
      'Réaliser une production en faisant des choix personnels.',
      'Observer une œuvre et parler de sa propre production.',
      'Mémoriser et interpréter un chant avec le groupe.',
      'Écouter une musique et en repérer quelques éléments simples.'
    ]
  },
  p2:{
    francais:[
      'Lire avec exactitude et comprendre l’essentiel d’un texte.',
      'Comprendre à qui renvoient les pronoms et les reprises dans un texte.',
      'Raconter des événements dans l’ordre et écrire de courts textes.',
      'Reconnaître les noms, les pronoms et le groupe sujet.',
      'Conjuguer au présent les verbes étudiés et consolider les premiers accords.'
    ],
    maths:[
      'Comprendre la valeur des chiffres et utiliser différentes écritures d’un nombre.',
      'Calculer mentalement avec doubles, moitiés et multiplication par 10 ou 100.',
      'Effectuer additions et soustractions posées, notamment avec retenue ou échange.',
      'Résoudre des problèmes de multiplication, de groupement ou de partage.',
      'Mesurer, lire l’heure et reconnaître les principales figures, solides et symétries.'
    ],
    anglais:[
      'Comprendre et dire les jours de la semaine.',
      'Comprendre les mois de l’année et dire une date avec un modèle.',
      'Exprimer simplement ce que l’on souhaite au petit-déjeuner.',
      'Prendre part à de très courts échanges oraux.',
      'Découvrir quelques traditions de Thanksgiving et de Christmas.'
    ],
    sciences:[
      'Reconnaître l’eau sous différents états.',
      'Observer et décrire un changement d’état de l’eau.',
      'Réaliser une expérience simple sur l’eau.',
      'Comparer le comportement d’objets dans l’eau.',
      'Tirer une conclusion à partir d’une expérience.'
    ],
    histoire:[
      'Comparer les habitats de différentes époques.',
      'Comparer l’alimentation et les objets de la vie quotidienne selon les époques.',
      'Repérer ce qui change dans les façons de vivre.',
      'Repérer aussi ce qui reste stable au fil du temps.'
    ],
    geographie:[
      'Reconnaître et décrire un paysage urbain.',
      'Comprendre les principales fonctions d’un quartier.',
      'Utiliser un plan pour localiser un lieu ou suivre un trajet.',
      'Comparer centre-ville et périphérie.',
      'Comprendre comment déplacements et aménagements répondent aux besoins des habitants.'
    ],
    eps:[
      'À la piscine : entrer dans l’eau et s’immerger avec davantage d’aisance.',
      'À la piscine : se déplacer sur une distance adaptée.',
      'À la piscine : apprendre à s’équilibrer et à flotter.',
      'À la piscine : enchaîner plusieurs actions aquatiques.',
      'Lors des sorties piscine du vendredi : respecter les règles de sécurité et gagner en autonomie.'
    ],
    arts:[
      'Expérimenter différents outils, gestes et matériaux.',
      'Réaliser une production en faisant des choix personnels.',
      'Observer une œuvre et parler de sa propre production.',
      'Mémoriser et interpréter un chant avec le groupe.',
      'Écouter une musique et en repérer quelques éléments simples.'
    ]
  },
  p3:{
    francais:[
      'Lire avec plus de fluidité et comprendre l’essentiel, y compris quelques informations implicites.',
      'Décrire un personnage ou un lieu dans un texte organisé.',
      'Repérer le groupe nominal, le déterminant, le nom et l’adjectif.',
      'Conjuguer au futur les verbes étudiés.',
      'Enrichir son vocabulaire et consolider les accords dans le groupe nominal.'
    ],
    maths:[
      'Approfondir la numération et commencer à placer des fractions sur une longueur.',
      'Mémoriser les tables de multiplication et trouver des quotients simples.',
      'Poser une multiplication par un chiffre.',
      'Résoudre des problèmes à plusieurs étapes, notamment multiplicatifs.',
      'Utiliser mesures, géométrie, symétrie et représentations de données.'
    ],
    anglais:[
      'Demander et dire son âge.',
      'Comprendre une question simple sur l’état ou l’émotion.',
      'Dire comment on se sent.',
      'Comprendre et donner une consigne simple liée au corps.',
      'Découvrir quelques repères culturels de Pancake Day.'
    ],
    sciences:[
      'Comprendre à quel besoin répond un objet technique.',
      'Identifier les principales parties d’un vélo et leur fonction.',
      'Comprendre simplement comment le mouvement est transmis sur un vélo.',
      'Repérer les éléments indispensables à la sécurité à vélo.',
      'Tester, régler et améliorer un objet simple.'
    ],
    histoire:[
      'Situer quelques figures et événements de l’Antiquité et du début du Moyen Âge.',
      'Associer un personnage historique à son époque.',
      'Prélever des informations dans des documents historiques.',
      'Présenter simplement un personnage ou raconter un événement étudié.'
    ],
    geographie:[
      'Reconnaître et décrire un espace rural.',
      'Découvrir différentes façons d’habiter le littoral et la montagne.',
      'Comparer plusieurs façons de se loger en France.',
      'Comparer l’accès aux services selon le lieu de vie.',
      'Localiser sur la carte de France les principaux espaces étudiés.'
    ],
    eps:[
      'Lors des sorties VTT à la Cavayère : maîtriser son vélo dans des situations variées.',
      'Adapter sa trajectoire au terrain.',
      'Adapter sa vitesse aux contraintes rencontrées.',
      'Respecter les règles de sécurité et d’organisation pendant les sorties.',
      'Gagner en autonomie et en confiance à vélo.'
    ],
    arts:[
      'Expérimenter différents outils, gestes et matériaux.',
      'Réaliser une production en faisant des choix personnels.',
      'Observer une œuvre et parler de sa propre production.',
      'Mémoriser et interpréter un chant avec le groupe.',
      'Écouter une musique et en repérer quelques éléments simples.'
    ]
  },
  p4:{
    francais:[
      'Comprendre l’implicite, les intentions des personnages et les liens de cause à conséquence.',
      'Lire avec expressivité des textes variés, notamment poésie et théâtre.',
      'Écrire puis améliorer un texte court en utilisant une grille de relecture.',
      'Manipuler les groupes dans la phrase et repérer certains compléments.',
      'Conjuguer à l’imparfait et consolider les accords déjà étudiés.'
    ],
    maths:[
      'Comparer et utiliser des fractions simples.',
      'Choisir une stratégie de calcul efficace et comprendre le sens de la division.',
      'Résoudre des problèmes de périmètre, de durée ou à partir de données.',
      'Utiliser monnaie, masses et durées dans des situations concrètes.',
      'Construire des figures avec règle et compas et poursuivre le travail sur la symétrie.'
    ],
    anglais:[
      'Comprendre et nommer des objets familiers.',
      'Demander et dire une quantité simple.',
      'Localiser un objet avec une expression connue.',
      'Participer à un court échange oral guidé.',
      'Associer quelques expressions écrites connues à des images.'
    ],
    sciences:[
      'Comprendre le rôle des articulations et des muscles dans le mouvement.',
      'Observer les effets d’un effort sur le pouls et la respiration.',
      'Identifier les réactions du corps pendant et après l’effort.',
      'Reconnaître des habitudes favorables à la santé.',
      'Expliquer simplement pourquoi une habitude est favorable ou défavorable à la santé.'
    ],
    histoire:[
      'Situer quelques figures et événements du Moyen Âge.',
      'Décrire quelques aspects de la vie au Moyen Âge.',
      'Comprendre simplement l’affirmation du pouvoir royal.',
      'Mettre en relation plusieurs documents historiques.'
    ],
    geographie:[
      'Identifier différents lieux et types d’activités professionnelles.',
      'Distinguer produire un bien et rendre un service.',
      'Lire un paysage pour comprendre comment on y travaille.',
      'Comprendre le rôle des transports et des aménagements dans une activité.'
    ],
    eps:[
      'Lors des séances à Domec : réaliser et enchaîner plusieurs actions gymniques.',
      'Présenter un petit enchaînement maîtrisé.',
      'En lutte : agir efficacement dans une opposition.',
      'Respecter les règles de sécurité, les rôles et son adversaire.',
      'Coopérer et gagner en maîtrise de soi pendant les séances.'
    ],
    arts:[
      'Expérimenter différents outils, gestes et matériaux.',
      'Réaliser une production en faisant des choix personnels.',
      'Observer une œuvre et parler de sa propre production.',
      'Mémoriser et interpréter un chant avec le groupe.',
      'Écouter une musique et en repérer quelques éléments simples.'
    ]
  },
  p5:{
    francais:[
      'Lire de façon autonome, fluide et adaptée au type de texte.',
      'Synthétiser plusieurs informations et vérifier sa compréhension.',
      'Planifier, écrire et réviser un texte plus long et organisé.',
      'Analyser une phrase simple en réutilisant les classes de mots étudiées.',
      'Consolider la conjugaison et les accords, notamment entre le sujet et le verbe.'
    ],
    maths:[
      'Mobiliser avec autonomie les nombres et les fractions étudiés.',
      'Choisir une opération, calculer efficacement et vérifier son résultat.',
      'Résoudre un problème complexe et expliquer clairement sa démarche.',
      'Convertir et utiliser les mesures et les durées.',
      'Réinvestir géométrie, symétrie, solides et organisation de données.'
    ],
    anglais:[
      'Demander et dire ce que l’on aime.',
      'Comprendre et décrire très simplement un animal.',
      'Suivre le fil d’une histoire courte.',
      'Raconter un court passage avec l’aide d’un modèle.',
      'Réutiliser quelques mots écrits et repères culturels connus.'
    ],
    sciences:[
      'Ordonner les étapes du cycle de vie d’un être vivant.',
      'Comparer le développement d’un végétal et d’un animal.',
      'Identifier les besoins essentiels des êtres vivants.',
      'Construire et comprendre une chaîne alimentaire simple.',
      'Comprendre quelques relations entre les êtres vivants et leur milieu.'
    ],
    histoire:[
      'Situer quelques figures et événements des Temps modernes.',
      'Repérer des transformations importantes entre Moyen Âge et Temps modernes.',
      'Croiser des informations sur une grande figure historique.',
      'Expliquer simplement une évolution historique étudiée.'
    ],
    geographie:[
      'Décrire un espace agricole ou touristique.',
      'Reconstituer le parcours simple d’un produit.',
      'Identifier les activités et services d’un territoire.',
      'Repérer les effets d’une activité sur le territoire et l’environnement.',
      'Comparer plusieurs espaces de travail en France.'
    ],
    eps:[
      'Réinvestir les habiletés motrices travaillées pendant l’année.',
      'Participer à des jeux collectifs en respectant règles, partenaires et adversaires.',
      'Mesurer ses progrès et chercher à améliorer sa performance.',
      'Choisir des stratégies adaptées à l’activité proposée.'
    ],
    arts:[
      'Expérimenter différents outils, gestes et matériaux.',
      'Réaliser une production en faisant des choix personnels.',
      'Observer une œuvre et parler de sa propre production.',
      'Mémoriser et interpréter un chant avec le groupe.',
      'Écouter une musique et en repérer quelques éléments simples.'
    ]
  }
};
const PARENT_TOGETHER_SUMMARIES={
  p1:{emc:['Respecter les règles de la classe et de l’école.','Comprendre ses droits et ses devoirs.','Prendre une petite responsabilité.','Coopérer et prendre soin du bien commun.']},
  p2:{emc:['Exprimer un désaccord sans blesser.','Distinguer conflit, violence et harcèlement.','Savoir demander l’aide d’un adulte.','Exprimer son ressenti et écouter celui des autres.','Utiliser le message clair pour chercher une solution.']},
  p3:{emc:['Comprendre la différence entre intérêt personnel et intérêt général.','Participer à une décision collective.','Proposer une action utile au groupe.','Prendre la parole et écouter lors d’un conseil.','Comprendre les conséquences de ses actes sur les autres.']},
  p4:{emc:['Comprendre que chacun a la même dignité.','Repérer quelques stéréotypes et respecter les différences.','Comprendre le sens de la devise républicaine.','Exprimer un point de vue et écouter celui des autres.']},
  p5:{emc:['Comprendre le rôle de quelques services rendus à la collectivité.','Connaître quelques missions de la commune.','Savoir alerter un adulte ou un service de secours.','Relier un écogeste à l’intérêt général.','Participer à un projet pour le bien commun.']}
};
function period(){return EDT.periodForDate(new Date())}
function periodKey(){const p=period();return p==='rentree'?'p1':p}
function comps(key){const s=PROG[key]||{},arr=s[periodKey()+'Competencies'];if(Array.isArray(arr)&&arr.length)return arr;if(key==='arts'&&Array.isArray(s.annualCompetencies))return s.annualCompetencies;return[]}
function parentLearningComps(key){const items=PARENT_LEARNING_SUMMARIES[periodKey()]?.[key];return Array.isArray(items)?items.slice(0,5).map(title=>({title})):comps(key).slice(0,5)}
function parentTogetherComps(key){const items=PARENT_TOGETHER_SUMMARIES[periodKey()]?.[key];return Array.isArray(items)?items.slice(0,5).map(title=>({title})):comps(key).slice(0,5)}
function renderList(id,items){const el=$(id),a=Array.isArray(items)?items.filter(Boolean):[];el.innerHTML=a.map(x=>`<li>${esc(x)}</li>`).join('');el.style.display=a.length?'block':'none'}
function renderPublished(){$('weekMessage').textContent=W.message||'Aucune information particulière publiée pour cette semaine.';renderList('weekItems',W.items);$('lifeMessage').textContent=L.message||'Les projets et moments de vie de classe seront ajoutés ici.';renderList('lifeItems',L.items);$('infoMessage').textContent=I.message||'Retrouvez ici les informations utiles.';const docs=Array.isArray(I.documents)?I.documents:[];$('documentsList').innerHTML=docs.length?docs.map(d=>{if(typeof d==='string')return `<div class="document-item">${esc(d)}</div>`;const label=esc(d.label||d.title||'Document'),url=String(d.url||'').trim();return `<div class="document-item">${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${label} ↗</a>`:label}</div>`}).join(''):'<div class="document-item">Aucun document particulier publié.</div>'}

function isoLocal(d){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`}
function dateFromIso(s){const [y,m,d]=String(s).split('-').map(Number);return new Date(y,m-1,d)}
function dueLabel(s){return frDate(dateFromIso(s),{weekday:'long',day:'numeric',month:'long'})}
function noSchoolDateSet(){return new Set((CAL.daysOff||[]).map(x=>String(x&&x.date||'')).filter(Boolean))}
function schoolCalendarEventsForWeek(week){
  if(!week)return [];
  const events=[];
  (CAL.daysOff||[]).forEach(ev=>{
    const date=String(ev&&ev.date||'');
    if(date&&date>=week.start&&date<=week.end){
      events.push({kind:'dayoff',date,icon:ev.icon||'📅',label:ev.label||'Jour sans classe'});
    }
  });
  (CAL.breaks||[]).forEach(br=>{
    const date=String(br&&br.lastSchoolDay||'');
    if(date&&date>=week.start&&date<=week.end){
      const resume=br.resume?` · reprise ${dueLabel(br.resume)}`:'';
      events.push({kind:'break',date,icon:'🏖️',label:`${br.label} — après la classe du ${dueLabel(date)}${resume}`});
    }
  });
  return events.sort((a,b)=>a.date.localeCompare(b.date));
}
function schoolCalendarHtml(week){
  const events=schoolCalendarEventsForWeek(week);
  if(!events.length)return '';
  return `<div class="homework-calendar-events">${events.map(ev=>`<div class="homework-calendar-event homework-calendar-event--${esc(ev.kind)}"><span class="homework-calendar-event__icon">${esc(ev.icon)}</span><span>${esc(ev.label)}</span></div>`).join('')}</div>`;
}
function holidayRevisionHtml(week){
  if(!week)return '';
  const breakEvent=(CAL.breaks||[]).find(br=>{
    const last=String(br&&br.lastSchoolDay||'');
    return last&&last>=week.start&&last<=week.end&&/(toussaint|no[eë]l)/i.test(String(br.label||''));
  });
  if(!breakEvent)return '';
  const label=String(breakEvent.label||'');
  const isNoel=/no[eë]l/i.test(label);
  const theme=isNoel?{
    icon:'🎄',
    name:'Noël',
    revision:'assets/revisions-vacances/noel-revisions.png',
    games:'assets/revisions-vacances/noel-jeux.png',
    gamesDetail:'Labyrinthe de calcul · code secret · intrus · défi logique',
    wish:'🎄 Je vous souhaite de très belles vacances et un joyeux Noël en famille !'
  }:{
    icon:'🍂',
    name:'Toussaint',
    revision:'assets/revisions-vacances/toussaint-revisions.png',
    games:'assets/revisions-vacances/toussaint-jeux.png',
    gamesDetail:'Coloriages · code secret · défi logique',
    wish:'🍂 Je vous souhaite de très belles vacances de la Toussaint !'
  };
  return `<section class="holiday-revisions" aria-label="Petites révisions facultatives des vacances de ${esc(theme.name)}">
    <div class="holiday-revisions__head">
      <div>
        <span class="holiday-revisions__eyebrow">${theme.icon} Facultatif</span>
        <h4>Mes petites révisions — si j’en ai envie</h4>
      </div>
    </div>
    <div class="holiday-revisions__message">
      <p><strong>Deux fiches sont proposées pour réactiver tranquillement quelques notions travaillées en classe :</strong> une page de révisions et une page de jeux.</p>
      <p><strong>Il n’est pas nécessaire de tout faire.</strong> Votre enfant peut choisir quelques activités, à son rythme et selon ses envies. L’objectif est simplement de garder quelques acquis en mémoire, <strong>sans transformer les vacances en temps scolaire</strong>.</p>
      <p>Lire, jouer, sortir, découvrir et se reposer restent essentiels pendant les vacances.</p>
      <p class="holiday-revisions__wish"><strong>${esc(theme.wish)}</strong></p>
    </div>
    <div class="holiday-revisions__pages">
      <a class="holiday-revisions__page" href="${theme.revision}" target="_blank" rel="noopener">
        <img src="${theme.revision}" alt="Aperçu de la page 1 de révisions des vacances de ${esc(theme.name)}">
        <span><b>📘 Page 1 — Je révise tranquillement</b><small>Lecture · Français · Mathématiques</small></span>
      </a>
      <a class="holiday-revisions__page" href="${theme.games}" target="_blank" rel="noopener">
        <img src="${theme.games}" alt="Aperçu de la page 2 de jeux des vacances de ${esc(theme.name)}">
        <span><b>🎨 Page 2 — Je joue et je réfléchis</b><small>${theme.gamesDetail}</small></span>
      </a>
    </div>
  </section>`;
}
function schoolBreakForDate(iso){
  return (CAL.breaks||[]).find(br=>{
    const start=String(br&&br.officialStart||'');
    const resume=String(br&&br.resume||'');
    return start&&iso>=start&&(!resume||iso<resume);
  })||null;
}
function schoolDayOffForDate(iso){
  return (CAL.daysOff||[]).find(ev=>String(ev&&ev.date||'')===iso)||null;
}
function allEvaluations(){
  const out=[],seen=new Set();
  (D.weeks||[]).forEach(w=>(w.items||[]).forEach(it=>(it.evaluations||[]).forEach(ev=>{
    if(!ev||!ev.date)return;
    const key=`${ev.date}|${ev.subject||''}`;
    if(seen.has(key))return;
    seen.add(key);out.push(ev);
  })));
  return out.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
}
function homeworkWeekCalendarHtml(week,sourceItems=[]){
  if(!week||!week.start)return '';
  const monday=dateFromIso(week.start);
  const items=Array.isArray(sourceItems)?sourceItems:[];
  const evals=allEvaluations();
  const days=Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return d});
  const cells=days.map(d=>{
    const iso=isoLocal(d),dow=d.getDay();
    const br=schoolBreakForDate(iso),off=schoolDayOffForDate(iso);
    const dayItems=items.filter(it=>String(it&&it.due||'')===iso);
    const dayEvals=evals.filter(ev=>String(ev&&ev.date||'')===iso);
    let kind='class',icon='🏫',status='Classe';
    if(br){kind='holiday';icon='🏖️';status=br.label||'Vacances scolaires';}
    else if(off){kind='dayoff';icon=off.icon||'📅';status=off.label||'Pas de classe';}
    else if(dow===0||dow===6){kind='weekend';icon='☕';status='Week-end';}
    else if(dow===3){kind='noclass';icon='🌿';status='Pas de classe';}
    else if(dayEvals.length){kind='evaluation';icon='📅';const subjects=[...new Set(dayEvals.map(x=>x.subject).filter(Boolean))];status=`${dayEvals.length} évaluation${dayEvals.length>1?'s':''}${subjects.length?` · ${subjects.join(' / ')}`:''}`;}
    else if(dayItems.length){kind='homework';icon='📚';status=dayItems.some(x=>x.evaluations?.length)?'Annonce des évaluations':'Petit travail prévu';}
    else {status='Classe · rien à préparer';}
    return `<div class="homework-week-calendar__day homework-week-calendar__day--${kind}"><div class="homework-week-calendar__date"><strong>${esc(frDate(d,{weekday:'long'}))}</strong><span>${esc(frDate(d,{day:'numeric',month:'short'}))}</span></div><div class="homework-week-calendar__status"><span aria-hidden="true">${icon}</span><small>${esc(status)}</small></div></div>`;
  }).join('');
  return `<section class="homework-week-calendar" aria-label="Calendrier de la semaine"><div class="homework-week-calendar__title">🗓️ La semaine en un coup d’œil</div><div class="homework-week-calendar__grid">${cells}</div></section>`;
}
function evaluationWeekLabel(it){
  const evaluations=Array.isArray(it&&it.evaluations)?it.evaluations:[];
  const dates=[...new Set(evaluations.map(ev=>String(ev&&ev.date||'')).filter(Boolean))].sort();
  if(dates.length===1)return `Pour ${dueLabel(dates[0])}`;
  if(!dates.length)return `Pour ${dueLabel(it.due)}`;
  const first=dateFromIso(dates[0]);
  const day=(first.getDay()+6)%7; // lundi = 0
  const monday=new Date(first);monday.setDate(first.getDate()-day);
  const friday=new Date(monday);friday.setDate(monday.getDate()+4);
  const sameMonth=monday.getMonth()===friday.getMonth()&&monday.getFullYear()===friday.getFullYear();
  const start=frDate(monday,sameMonth?{day:'numeric'}:{day:'numeric',month:'long'});
  const end=frDate(friday,{day:'numeric',month:'long'});
  return `Semaine du ${start} au ${end}`;
}
let homeworkTestWeekIndex=null;
function homeworkWeekFor(date){const iso=isoLocal(date),weeks=Array.isArray(D.weeks)?D.weeks:[];if(!weeks.length)return null;if(Number.isInteger(homeworkTestWeekIndex)&&weeks[homeworkTestWeekIndex])return weeks[homeworkTestWeekIndex];const current=weeks.find(w=>iso>=w.start&&iso<=w.end);if(current)return current;const next=weeks.find(w=>w.start>iso);if(next)return next;return weeks[weeks.length-1]}
function homeworkHibouHtml(value){
  if(!value)return'';
  const list=Array.isArray(value)?value:[value];
  const valid=list.filter(x=>x&&(typeof x==='string'||x.url));
  if(!valid.length)return'';
  const intro=(!Array.isArray(value)&&typeof value==='object'&&value.intro)?value.intro:'Leçons utiles dans Maître Hibou :';
  const links=valid.map(x=>{
    if(typeof x==='string')return `<span><b>${esc(x)}</b></span>`;
    return `<a class="homework-hibou-link" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(x.label||'Ouvrir la leçon')}</b> ↗</a>`;
  }).join(' <span aria-hidden="true">·</span> ');
  return `<div class="homework-hibou">🦉 ${esc(intro)} ${links}</div>`;
}
function homeworkEvaluationsHtml(list,periodTag=''){
  const evaluations=Array.isArray(list)?list:[];
  if(!evaluations.length)return '';
  const showCountBanner=['p1','p2','p4','p5'].includes(periodTag);
  const count=evaluations.length;
  const weekRange=periodTag==='p5'&&evaluations[0]?.date?(()=>{const first=dateFromIso([...evaluations].map(e=>e.date).filter(Boolean).sort()[0]);const day=(first.getDay()+6)%7;const monday=new Date(first);monday.setDate(first.getDate()-day);const friday=new Date(monday);friday.setDate(monday.getDate()+4);const same=monday.getMonth()===friday.getMonth();const a=frDate(monday,same?{day:'numeric'}:{day:'numeric',month:'long'});const b=frDate(friday,{day:'numeric',month:'long'});return `Semaine du ${a} au ${b}`;})():'';
  const title=periodTag==='p5'&&weekRange
    ? `📅 ${weekRange} : ${count} évaluation${count>1?'s':''} prévue${count>1?'s':''}`
    : showCountBanner
      ? `📅 Cette semaine : ${count} évaluation${count>1?'s':''} prévue${count>1?'s':''}`
      : `📅 Évaluation${count>1?'s':''} prévue${count>1?'s':''} cette semaine`;
  const titleClass=`homework-evaluations-title${showCountBanner?' homework-evaluations-title--count':''}`;
  return `<div class="homework-evaluations"><div class="${titleClass}">${title}</div>${evaluations.map(ev=>{
    const newSkills=Array.isArray(ev.newSkills)&&ev.newSkills.length?`<div class="homework-evaluation-skills homework-evaluation-skills--new"><b>🎯 Nouvelles compétences évaluées</b><ul>${ev.newSkills.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
    const reviewSkills=Array.isArray(ev.reviewSkills)&&ev.reviewSkills.length?`<div class="homework-evaluation-skills homework-evaluation-skills--review"><b>🔁 Déjà vu — rebrassage</b><p>Cette partie a déjà été travaillée : elle sert seulement à vérifier que l’acquis est bien consolidé.</p><ul>${ev.reviewSkills.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
    const scope=(!newSkills&&!reviewSkills&&Array.isArray(ev.scope)&&ev.scope.length)?`<ul>${ev.scope.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
    const prep=ev.preparation?`<p class="homework-evaluation-prep"><b>Pour se préparer :</b> ${esc(ev.preparation)}</p>`:'';
    const hibou=homeworkHibouHtml(ev.hibou);
    return `<section class="homework-evaluation"><div class="homework-evaluation-head"><strong>${esc(ev.subject||'Évaluation')}</strong><span>${esc(dueLabel(ev.date))}</span></div>${ev.title?`<h4>${esc(ev.title)}</h4>`:''}${newSkills}${reviewSkills}${scope}${prep}${hibou}</section>`;
  }).join('')}</div>`;
}
function homeworkEvaluationTodayHtml(ev){
  if(!ev)return '';
  const subject=ev.subject||'Évaluation';
  const oral=/oral/i.test(String(ev.title||''));
  const label=oral?`Aujourd’hui : bilan oral d’${subject}`:`Aujourd’hui : évaluation de ${subject}`;
  return `<article class="homework-card homework-card--today"><div class="homework-date">${esc(dueLabel(ev.date))}</div><div class="homework-today"><b>⭐ ${esc(label)}</b><p>Aucun devoir supplémentaire aujourd’hui. Cette information rappelle simplement l’évaluation prévue.</p></div></article>`;
}
function homeworkItemCard(it,compact=false,periodTag='',lightWeek=false){if(it&&it.evaluationToday)return homeworkEvaluationTodayHtml(it.evaluationToday);const evaluations=homeworkEvaluationsHtml(it.evaluations,periodTag);const challenge=(!lightWeek&&it.challenge)?`<div class="homework-block homework-challenge"><b>🎯 Défi du jour</b><p>${esc(it.challenge)}</p></div>`:'';const family=(!lightWeek&&it.family)?`<div class="homework-block homework-family"><b>👨‍👩‍👧 Défi famille <span>facultatif</span></b><p>${esc(it.family)}</p></div>`:'';const hibou=homeworkHibouHtml(it.hibou);const dateTitle=evaluationWeekLabel(it);return `<article class="homework-card${compact?' homework-card--compact':''}"><div class="homework-date">${esc(dateTitle)}</div>${evaluations}<div class="homework-block homework-routine"><b>${esc(it.routineIcon||'📚')} ${esc(it.routineTitle||'Je revois')}</b><p>${esc(it.routine||'')}</p></div>${challenge}${family}${hibou}</article>`}
function allEvaluationDates(){return [...new Set(allEvaluations().map(ev=>String(ev.date||'')).filter(Boolean))]}
function renderHomework(){const now=new Date(),week=homeworkWeekFor(now),cur=$('homeworkCurrent');if(!cur)return;if(!week){cur.innerHTML='<div class="homework-empty">Aucun devoir programmé.</div>';return}const sourceItems=Array.isArray(week.items)?week.items:[];let items=[...sourceItems];const periodTag=week.__period||'';const noSchool=noSchoolDateSet();items=items.filter(it=>!noSchool.has(String(it&&it.due||'')));const evalDates=allEvaluationDates();const weekEvalDates=evalDates.filter(d=>d>=week.start&&d<=week.end);const lightWeek=['p1','p2','p3','p4','p5'].includes(periodTag)&&weekEvalDates.length>0;if(lightWeek){items=items.filter(it=>{const hasOwnEvaluations=Array.isArray(it.evaluations)&&it.evaluations.length>0;return hasOwnEvaluations||!weekEvalDates.includes(String(it.due||''))})}const dayJItems=allEvaluations().filter(ev=>String(ev.date||'')>=week.start&&String(ev.date||'')<=week.end).map(ev=>({due:String(ev.date),evaluationToday:ev}));items=[...items,...dayJItems].sort((a,b)=>String(a.due||'').localeCompare(String(b.due||'')));const dates=`${esc(frDate(dateFromIso(week.start),{day:'numeric',month:'long'}))} au ${esc(frDate(dateFromIso(week.end),{day:'numeric',month:'long'}))}`;const head=`<div class="homework-week-head"><div><span>${esc(week.label||'Semaine en cours')}</span><h3>${dates}</h3>${week.theme?`<p class="homework-theme">${esc(week.theme)}</p>`:''}</div></div>`;const weekCalendar=homeworkWeekCalendarHtml(week,sourceItems);const calendar=schoolCalendarHtml(week);const holidayRevisions=holidayRevisionHtml(week);if(!items.length){cur.innerHTML=`${head}${weekCalendar}${calendar}<div class="homework-empty">🌱 ${esc(week.note||'Aucun devoir cette semaine.')}</div>${week.holiday?`<div class="homework-holiday">🏖️ ${esc(week.holiday)}</div>`:''}${holidayRevisions}`;return}cur.innerHTML=`${head}${weekCalendar}${calendar}${week.note?`<div class="homework-empty">${esc(week.note)}</div>`:''}${items.map(x=>homeworkItemCard(x,false,periodTag,lightWeek)).join('')}${week.holiday?`<div class="homework-holiday">🏖️ ${esc(week.holiday)}</div>`:''}${holidayRevisions}`}

function setupHomeworkTest(){
  const btn=$('homeworkTestHotspot'),bar=$('homeworkTestBar'),label=$('homeworkTestLabel'),prev=$('homeworkTestPrev'),next=$('homeworkTestNext'),reset=$('homeworkTestReset');
  if(!btn||!bar)return;
  let timer=null;
  const weeks=Array.isArray(D.weeks)?D.weeks:[];
  function currentAutoIndex(){const auto=homeworkWeekFor(new Date());return Math.max(0,weeks.indexOf(auto));}
  function refreshLabel(){const w=Number.isInteger(homeworkTestWeekIndex)?weeks[homeworkTestWeekIndex]:homeworkWeekFor(new Date());label.textContent=w?`${w.label||'Semaine'} · ${frDate(dateFromIso(w.start),{day:'numeric',month:'short'})} → ${frDate(dateFromIso(w.end),{day:'numeric',month:'short'})}`:'Aucune semaine';}
  function show(){bar.hidden=false;btn.setAttribute('aria-expanded','true');if(!Number.isInteger(homeworkTestWeekIndex))homeworkTestWeekIndex=currentAutoIndex();refreshLabel();renderHomework();}
  const start=()=>{clearTimeout(timer);timer=setTimeout(show,1200)};
  const cancel=()=>clearTimeout(timer);
  ['pointerdown','touchstart'].forEach(e=>btn.addEventListener(e,start,{passive:true}));
  ['pointerup','pointercancel','pointerleave','touchend'].forEach(e=>btn.addEventListener(e,cancel,{passive:true}));
  prev?.addEventListener('click',()=>{if(!weeks.length)return;if(!Number.isInteger(homeworkTestWeekIndex))homeworkTestWeekIndex=currentAutoIndex();homeworkTestWeekIndex=(homeworkTestWeekIndex-1+weeks.length)%weeks.length;refreshLabel();renderHomework();});
  next?.addEventListener('click',()=>{if(!weeks.length)return;if(!Number.isInteger(homeworkTestWeekIndex))homeworkTestWeekIndex=currentAutoIndex();homeworkTestWeekIndex=(homeworkTestWeekIndex+1)%weeks.length;refreshLabel();renderHomework();});
  reset?.addEventListener('click',()=>{homeworkTestWeekIndex=null;bar.hidden=true;btn.setAttribute('aria-expanded','false');renderHomework();});
}

function grouped(arr){const m=new Map();arr.forEach(c=>{const d=c.domain||'Objectifs de la période';if(!m.has(d))m.set(d,[]);m.get(d).push(c)});return m}
function learningCard(key){const s=PROG[key]||{},arr=parentLearningComps(key);if(!arr.length)return'';const inside=`<ul>${arr.map(c=>`<li>${esc(c.title||c.jeSais||c.code)}</li>`).join('')}</ul>`;return `<article class="learning-card"><h3>${esc(s.icon||'📘')} ${esc(s.title||key)}</h3><p>${arr.length} grand${arr.length>1?'s':''} apprentissage${arr.length>1?'s':''} à retenir pendant cette période.</p><details><summary>Voir l’essentiel</summary><p class="learning-parent-note">Voici les principaux apprentissages travaillés en classe. D’autres compétences sont également exercées au quotidien.</p>${inside}</details></article>`}
function learningPeriodDateText(){
  const meta=LEARNING_PERIOD_DATES[periodKey()]||LEARNING_PERIOD_DATES.p1;
  const a=dateFromIso(meta.start),b=dateFromIso(meta.end);
  const day=d=>d.getDate()===1?'1er':String(d.getDate());
  const month=d=>new Intl.DateTimeFormat('fr-FR',{month:'long'}).format(d);
  const startYear=a.getFullYear(),endYear=b.getFullYear();
  const range=startYear===endYear
    ? `du ${day(a)} ${month(a)} au ${day(b)} ${month(b)} ${endYear}`
    : `du ${day(a)} ${month(a)} ${startYear} au ${day(b)} ${month(b)} ${endYear}`;
  return `${meta.label} — ${range}`;
}
function renderLearning(){
  const periodDates=$('learningPeriodDates');
  if(periodDates)periodDates.textContent=learningPeriodDateText();
  $('learningGrid').innerHTML=subjectOrder.map(learningCard).join('');
}
function renderTogether(){$('togetherLearning').innerHTML=togetherOrder.map(key=>{const s=PROG[key]||{},arr=parentTogetherComps(key);if(!arr.length)return'';return `<article class="together-card"><h3>${esc(s.icon||'🤝')} ${esc(s.title||key)}</h3><ul>${arr.map(c=>`<li>${esc(c.title||c.jeSais||c.code)}</li>`).join('')}</ul></article>`}).join('')}

function frenchDateFromLabel(label){
  const months={janvier:0,fevrier:1,février:1,mars:2,avril:3,mai:4,juin:5,juillet:6,aout:7,août:7,septembre:8,octobre:9,novembre:10,decembre:11,décembre:11};
  const clean=String(label||'').toLowerCase();
  const m=clean.match(/(\d{1,2})\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)\s+(\d{4})/);
  if(!m)return null;
  return new Date(Number(m[3]),months[m[2]],Number(m[1]),12,0,0,0);
}
function plannedFamilyEvents(){
  const raw=window.PROGRESSIONS_EDT_DATA||{};
  const key=periodKey();
  const weeks=raw[`${key}DetailedWeeks`];
  if(!Array.isArray(weeks))return [];
  const today=new Date();today.setHours(0,0,0,0);
  const familyRx=/(sortie|visite|mus[ée]e|piscine|spectacle|rencontre|intervenant|tournoi|présentation du chant|journ[ée]e exceptionnelle|classe découverte|biblioth[èe]que|cin[ée]ma|photo de classe)/i;
  const out=[];
  weeks.forEach(w=>(w.days||[]).forEach(([dayLabel,rows])=>{
    const date=frenchDateFromLabel(dayLabel);
    if(!date||date<today)return;
    (rows||[]).forEach(row=>{
      const subject=String(row?.[1]||'').trim();
      const detail=String(row?.[2]||'').trim();
      const whole=[subject,detail,row?.[5]||''].join(' ');
      if(!familyRx.test(whole))return;
      out.push({date,label:detail||subject,subject});
    });
  }));
  const seen=new Set();
  return out.filter(e=>{
    const k=`${e.date.toISOString().slice(0,10)}|${e.label}`;
    if(seen.has(k))return false;
    seen.add(k);return true;
  }).sort((a,b)=>a.date-b.date).slice(0,8);
}
function infoLines(v){
  if(Array.isArray(v))return v.filter(Boolean);
  return String(v||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
}

function renderFlashTicker(){
  const ticker=$('parentsFlashTicker');
  if(!ticker)return;
  const msg=String(I.urgentMessage||'').trim();
  ticker.hidden=!msg;
  if(!msg)return;
  const a=$('parentsFlashTickerText'),b=$('parentsFlashTickerTextCopy');
  if(a)a.textContent=msg;
  if(b)b.textContent=msg;
  ticker.setAttribute('aria-label',`Information de dernière minute : ${msg}. Ouvrir les infos de la classe.`);
}

function renderClassInfo(){
  const important=infoLines(I.importantItems?.length?I.importantItems:W.items);
  $('parentsImportantList').innerHTML=important.length
    ? `<ul class="parents-info-list">${important.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`
    : '<div class="parents-info-empty">Aucun rappel important publié pour le moment.</div>';

  const automatic=plannedFamilyEvents();
  const manual=infoLines(I.upcomingItems?.length?I.upcomingItems:L.items);
  const autoHtml=automatic.map(e=>`<article class="parents-upcoming-item"><time>${esc(frDate(e.date,{weekday:'short',day:'numeric',month:'short'}))}</time><div>${e.subject?`<strong>${esc(e.subject)}</strong>`:''}<span>${esc(e.label)}</span></div></article>`).join('');
  const manualHtml=manual.map(x=>`<article class="parents-upcoming-item parents-upcoming-item--manual"><span class="parents-upcoming-dot">•</span><div><span>${esc(x)}</span></div></article>`).join('');
  $('parentsUpcomingList').innerHTML=(autoHtml||manualHtml)
    ? `${autoHtml}${manualHtml}`
    : '<div class="parents-info-empty">Aucune sortie ou rencontre familiale n’est programmée pour le moment.</div>';

  const docs=Array.isArray(I.documents)?I.documents:[];
  $('parentsDocumentsUseful').innerHTML=docs.length
    ? docs.map(d=>{
        if(typeof d==='string')return `<div class="parents-document-useful">${esc(d)}</div>`;
        const label=esc(d.label||d.title||'Document'),url=String(d.url||'').trim();
        return `<div class="parents-document-useful">${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${label}<span>↗</span></a>`:label}</div>`;
      }).join('')
    : '<div class="parents-info-empty">Aucun document utile publié pour le moment.</div>';
}

function frDate(d,opts={weekday:'long',day:'numeric',month:'long',year:'numeric'}){return new Intl.DateTimeFormat('fr-FR',opts).format(d).replace(/^./,c=>c.toUpperCase())}
function scheduleTargetDate(){
  const now=new Date();now.setHours(12,0,0,0);
  const todayData=EDT.rowsForDate(now);
  if(todayData.rows.length)return now;
  return EDT.nextClassDate(now);
}
function noClassHtml(d){
  const data=EDT.rowsForDate(d),info=data.noClass||EDT.noClassInfo?.(d);
  if(!info)return '<div class="homework-empty">Pas de classe prévue ce jour-là.</div>';
  const detail=info.type==='ferie'||info.type==='pont' ? `${info.label} — pas de classe` : (info.message||info.label);
  return `<div class="schedule-no-class schedule-no-class--${esc(info.type||'none')}"><span>${esc(info.icon||'📅')}</span><div><strong>${esc(detail)}</strong>${info.type==='vacances'?'<small>Les élèves ne sont pas attendus à l’école.</small>':''}</div></div>`;
}
function scheduleRowsHtml(d){
  const data=EDT.rowsForDate(d);
  if(!data.rows.length)return noClassHtml(d);
  return data.rows.map(r=>`<div class="schedule-row"><time>${esc(r[0])}</time><div><strong>${esc(r[1])}</strong>${r[2]?`<small>${esc(r[2])}</small>`:''}</div></div>`).join('');
}
function renderSchedule(){
  const today=new Date();today.setHours(12,0,0,0);
  const todayData=EDT.rowsForDate(today),todayInfo=todayData.noClass||null;
  const target=scheduleTargetDate();
  const periodTarget=target||today;
  $('schedulePeriod').textContent=EDT.periodLabel(EDT.periodForDate(periodTarget));
  if(!target){
    $('scheduleEyebrow').textContent='Calendrier scolaire';
    $('scheduleQuickHint').textContent=todayInfo?.label||'Pas de classe';
    $('scheduleViewMessage').textContent=todayInfo?.message||'Aucune prochaine journée de classe n’est encore programmée.';
    $('parentsScheduleToday').innerHTML=`<article class="schedule-day schedule-day--today"><h3>${esc(frDate(today,{weekday:'long',day:'numeric',month:'long'}))}</h3>${noClassHtml(today)}</article>`;
    $('parentsScheduleWeek').innerHTML='';
    return;
  }
  const isToday=isoLocal(target)===isoLocal(today);
  $('scheduleEyebrow').textContent=isToday?'Aujourd’hui':'Prochain jour de classe';
  $('scheduleQuickHint').textContent=isToday?frDate(target,{weekday:'long'}):`Prochain : ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}`;
  if(isToday){
    $('scheduleViewMessage').textContent=`Voici l’emploi du temps réel de ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}.`;
  }else if(todayInfo){
    const reason=todayInfo.type==='ferie'||todayInfo.type==='pont'?`${todayInfo.label} — pas de classe`:todayInfo.label;
    $('scheduleViewMessage').textContent=`${reason}. Prochain jour de classe : ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}.`;
  }else{
    $('scheduleViewMessage').textContent=`Pas de classe aujourd’hui. Prochain jour de classe : ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}.`;
  }
  $('parentsScheduleToday').innerHTML=`<article class="schedule-day schedule-day--today"><h3>${esc(frDate(target,{weekday:'long',day:'numeric',month:'long'}))}</h3>${scheduleRowsHtml(target)}</article>`;
  const monday=EDT.mondayOf(target),days=[0,1,3,4].map(n=>EDT.addDays(monday,n));
  $('parentsScheduleWeek').innerHTML=days.map(d=>`<article class="schedule-day${isoLocal(d)===isoLocal(target)?' schedule-day--selected':''}"><h3>${esc(frDate(d,{weekday:'long',day:'numeric',month:'long'}))}</h3>${scheduleRowsHtml(d)}</article>`).join('');
}
function showParentInfoPanel(target){
  const menu=$('parentsInfoMenu');
  if(!menu)return;
  const valid=['rappels','upcoming','material','help','digital','resources'];
  const selected=valid.includes(target)?target:'';
  menu.hidden=!!selected;
  document.querySelectorAll('[data-parent-info-panel]').forEach(panel=>panel.hidden=panel.dataset.parentInfoPanel!==selected);
  if(selected){
    history.replaceState(null,'',`#info-${selected}`);
    window.scrollTo({top:0,behavior:'instant'});
  }else{
    history.replaceState(null,'','#info');
    window.scrollTo({top:0,behavior:'instant'});
  }
}
function bindParentInfoNavigation(){
  document.querySelectorAll('[data-parent-info-target]').forEach(btn=>btn.addEventListener('click',()=>showParentInfoPanel(btn.dataset.parentInfoTarget)));
  document.querySelectorAll('[data-parent-info-menu]').forEach(btn=>btn.addEventListener('click',()=>showParentInfoPanel('')));
}

function showParentView(view){
  document.querySelectorAll('[data-parent-panel]').forEach(panel=>panel.hidden=panel.dataset.parentPanel!==view);
  document.querySelector('.parents-dashboard').hidden=!!view;
  if(view==='schedule')renderSchedule();
  if(view==='homework')renderHomework();
  if(view==='learning'){renderLearning();renderTogether()}if(view==='info'){renderClassInfo();showParentInfoPanel('')}
  if(view){
    history.replaceState(null,'',`#${view}`);
    window.scrollTo({top:0,behavior:'instant'});
  }else{
    history.replaceState(null,'',location.pathname+location.search);
    window.scrollTo({top:0,behavior:'instant'});
  }
}
function bindParentNavigation(){
  document.querySelectorAll('[data-parent-view]').forEach(btn=>btn.addEventListener('click',()=>showParentView(btn.dataset.parentView)));
  document.querySelectorAll('[data-parent-home]').forEach(btn=>btn.addEventListener('click',()=>showParentView('')));
  const hash=location.hash.replace('#','');
  if(hash.startsWith('info-')){showParentView('info');showParentInfoPanel(hash.slice(5));}
  else if(['schedule','homework','learning','info'].includes(hash))showParentView(hash);
}
function init(){const now=new Date(),p=period();$('parentsDate').textContent=frDate(now);renderPublished();renderFlashTicker();renderSchedule();bindParentInfoNavigation();bindParentNavigation();setupHomeworkTest()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
