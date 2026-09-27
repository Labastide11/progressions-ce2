// V35.65 — Cache-busting mobile : badges thématiques et couleurs spécifiques chargés avec index V35.65.
// V35.56 — Page Devoirs : suppression du bloc introductif fixe pour afficher directement les devoirs.
// V35.60 — Mobile : coup d’œil en grille 2 × 2 (lundi/mardi puis jeudi/vendredi), sans scroll horizontal.
// V35.51 — Synchronisation avec Progressions CE2 V36.70 : évaluations P1 lues depuis devoirs-p1.js, dictées et dates réalignées.
// V35.38 — Rappels de rentrée affichés dans l’Espace Parents jusqu’au 18 septembre 2026.
// V35.32 — Double badge des évaluations : 📝 Évaluation + sous-matière précise.
// V35.29 — Le bandeau « Cette semaine » affiche uniquement les évaluations dont la date réelle appartient à la semaine affichée.
// Les évaluations annoncées à l’avance mais prévues la semaine suivante sont séparées dans un bloc « À venir ».
// V35.26 — Synchronisation canonique des évaluations de français avec Progressions CE2 V35.63.
// Les anciennes annonces de français présentes dans les fichiers de devoirs sont ignorées pour éviter les dates et contenus périmés.
// V35.25 — Espace Parents : Info Flash, Rappels et À venir alimentés par l’API V2.9.
// V34.93 — synthèse des apprentissages par période, 5 essentiels maximum par matière.
// Le référentiel enseignant reste inchangé : seule la présentation destinée aux familles est simplifiée.
// Les repères annuels transversaux Arts / éducation musicale sont affichés pour chaque période.
(function(){
'use strict';
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const EDT=window.PUBLIC_EDT,PROG=window.PROGRESSIONS||{},W=window.PARENTS_SEMAINE||{},H=window.PARENTS_TRAVAIL||{},L=window.PARENTS_VIE_CLASSE||{},I=window.PARENTS_INFOS||{},D1=window.DEVOIRS_P1||{weeks:[]},D2=window.DEVOIRS_P2||{weeks:[]},D3=window.DEVOIRS_P3||{weeks:[]},D4=window.DEVOIRS_P4||{weeks:[]},D5=window.DEVOIRS_P5||{weeks:[]},D={weeks:[...(D1.weeks||[]).map(w=>({...w,__period:'p1'})),...(D2.weeks||[]).map(w=>({...w,__period:'p2'})),...(D3.weeks||[]).map(w=>({...w,__period:'p3'})),...(D4.weeks||[]).map(w=>({...w,__period:'p4'})),...(D5.weeks||[]).map(w=>({...w,__period:'p5'}))].sort((a,b)=>String(a.start||'').localeCompare(String(b.start||'')))};
const CAL=window.CALENDRIER_SCOLAIRE_2026_2027||{daysOff:[],breaks:[]};

// V35.51 — P1 : les évaluations de français viennent désormais de data/devoirs-p1.js.
// P2 à P5 conservent ici leurs annonces canoniques jusqu’à leur migration vers la même source unique.
const PARENTS_FRENCH_EVALUATIONS=[
  {date:'2026-11-24',announceOn:'2026-11-20',subject:'Français',title:'Compréhension P2 — La balade au parc',scope:['Comprendre un mot grâce au contexte.','Identifier ce que remplace un pronom.'],preparation:'Lire un petit texte puis expliquer avec ses mots ce que l’on comprend.'},
  {date:'2026-12-08',announceOn:'2026-12-04',subject:'Français',title:'Lexique P2 — Familles de mots et synonymes/contraires',scope:['Reconnaître des mots de la même famille.','Trouver des synonymes et des contraires.'],preparation:'Revoir les familles de mots, les synonymes et les contraires travaillés en classe.'},
  {date:'2026-12-14',announceOn:'2026-12-07',subject:'Français',title:'Bilan des mots appris — L’Île de Pâques',scope:['Écrire correctement les 10 mots annoncés et travaillés.'],preparation:'Revoir : tailler, une paroi, un cratère, un volcan, l’intérieur, aligner, la côte, la mer, le long, un dos.'},
  {date:'2026-12-15',announceOn:'2026-12-11',subject:'Français',title:'Production d’écrits 1 — Raconter dans l’ordre',scope:['Écrire 1 à 3 phrases compréhensibles.','Raconter les événements dans le bon ordre.'],preparation:'Aucune leçon à apprendre : relire simplement les connecteurs D’abord, Puis, Enfin.'},
  {date:'2027-02-02',announceOn:'2027-01-29',subject:'Français',title:'Compréhension P3 — Le chat sous l’abri',scope:['Repérer l’idée importante.','Faire une inférence simple et la justifier avec le texte.'],preparation:'Lire attentivement et penser à chercher les indices dans le texte.'},
  {date:'2027-02-04',announceOn:'2027-01-28',subject:'Français',title:'Bilan des mots appris — L’Opéra de Sydney',scope:['Écrire correctement les 10 mots annoncés et travaillés.'],preparation:'Revoir : accueillir, un magasin, un souvenir, un hall, une répétition, un studio, un spectacle, un théâtre, un coquillage, un restaurant.'},
  {date:'2027-03-16',announceOn:'2027-03-12',subject:'Français',title:'Compréhension P4 — Le mystérieux sac bleu',scope:['Comprendre une information implicite.','Comprendre ce que ressent ou veut faire un personnage.'],preparation:'Lire attentivement et justifier ses réponses avec les indices du texte.'},
  {date:'2027-03-30',announceOn:'2027-03-26',subject:'Français',title:'Production d’écrits 2 — Ajouter une précision et corriger',scope:['Écrire 1 à 3 phrases.','Ajouter une précision utile.','Corriger les erreurs signalées.'],preparation:'Aucune leçon à apprendre : penser à relire et à améliorer une phrase.'},
  {date:'2027-04-01',announceOn:'2027-03-30',subject:'Français',title:'Lexique P4 — Sens des mots et expressions',scope:['Comprendre le sens d’un mot grâce à la phrase.','Comprendre une expression au sens figuré.'],preparation:'Revoir quelques mots et expressions rencontrés en classe.'},
  {date:'2027-04-01',announceOn:'2027-03-25',subject:'Français',title:'Bilan des mots appris — Angkor Vat',scope:['Écrire correctement les 10 mots annoncés et travaillés.'],preparation:'Revoir : un tombeau, un chantier, un millier, un océan, un bassin, une paroi, un moine, le droit, un symbole, sculpter.'},
  {date:'2027-05-20',announceOn:'2027-05-18',subject:'Français',title:'Compréhension P5 — Pourquoi les hérissons sortent-ils surtout la nuit ?',scope:['Rassembler plusieurs informations.','Relire pour vérifier et corriger sa compréhension.'],preparation:'Lire attentivement un petit documentaire et revenir au texte pour vérifier ses réponses.'},
  {date:'2027-06-01',announceOn:'2027-05-28',subject:'Français',title:'Lexique P5 — Réseaux lexicaux et morphologie',scope:['Relier des mots selon leur sens ou leur famille.','Comprendre comment les mots sont construits.'],preparation:'Revoir les familles de mots et les regroupements de vocabulaire travaillés dans l’année.'},
  {date:'2027-06-08',announceOn:'2027-06-04',subject:'Français',title:'Production d’écrits 3 — Écrire, relire et améliorer',scope:['Écrire 3 à 5 phrases.','Améliorer son texte.','Corriger les éléments signalés.'],preparation:'Aucune leçon à apprendre : penser à écrire, relire puis améliorer son texte.'}
];
function isFrenchEvaluation(ev){
  const subject=String(ev&&ev.subject||'').toLowerCase();
  const title=String(ev&&ev.title||'').toLowerCase();
  return /^fran[cç]ais/.test(subject)||/(compréhension|lexique|vocabulaire|production d[’']écrits|mots appris|orthographe|grammaire|conjugaison)/.test(title);
}
function stripStaleFrenchEvaluations(item,sourceWeek){
  if(!item||typeof item!=='object')return item;
  const clone={...item};
  // V35.51 : P1 est désormais la source commune ; on conserve ses évaluations de français.
  if(String(sourceWeek&&sourceWeek.__period||'')==='p1')return clone;
  if(Array.isArray(clone.evaluations))clone.evaluations=clone.evaluations.filter(ev=>!isFrenchEvaluation(ev));
  return clone;
}
function canonicalFrenchAdvanceAnnouncementsForWeek(week){
  if(!week)return [];
  const start=String(week.start||''),end=String(week.end||'');
  return PARENTS_FRENCH_EVALUATIONS
    .filter(ev=>ev.announceOn&&ev.announceOn>=start&&ev.announceOn<=end&&String(ev.date||'')>end)
    .sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
}
function evaluationsForDisplayedWeek(week){
  if(!week)return [];
  const start=String(week.start||''),end=String(week.end||'');
  return allEvaluations()
    .filter(ev=>String(ev&&ev.date||'')>=start&&String(ev&&ev.date||'')<=end)
    .sort((a,b)=>String(a.date||'').localeCompare(String(b.date||''))||String(a.subject||'').localeCompare(String(b.subject||''),'fr'));
}

let remindersTestMode=false;

// V35.25 — Informations familles dynamiques via API Apps Script V2.9.
// Lecture publique uniquement : aucune clé professionnelle n’est exposée dans le site Parents.
const PARENTS_INFO_API_URL='https://script.google.com/macros/s/AKfycbydzPTQ9ZLEPYezHou2-O4IK24ip51sLTpe9qdi2xREuQvDBKRlVqsYYDiKLrzAODc/exec';
let parentsApiLoaded=false;
let parentsApiMessages=[];

function currentParentsDictations(){
  return window.PARENTS_DICTEES_CE2||{periods:{}};
}
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
      'Découvrir la démarche scientifique avec une expérience courte sur l’eau et l’huile.',
      'Mettre en évidence que l’air existe même s’il est invisible.',
      'Comprendre que l’air occupe de la place et peut être comprimé.',
      'Classer des matériaux selon qu’ils sont transparents, translucides ou opaques.',
      'Comprendre comment se forme une ombre et réinvestir les observations dans un petit bilan.'
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
    if(isFrenchEvaluation(ev)&&String(w&&w.__period||'')!=='p1')return;
    const key=`${ev.date}|${ev.subject||''}|${ev.title||''}`;
    if(seen.has(key))return;
    seen.add(key);out.push(ev);
  })));
  PARENTS_FRENCH_EVALUATIONS.forEach(ev=>{
    const key=`${ev.date}|${ev.subject||''}|${ev.title||''}`;
    if(seen.has(key))return;
    seen.add(key);out.push(ev);
  });
  return out.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
}
// V35.55 — Dans « La semaine en un coup d’œil », on affiche des badges thématiques simples et parlants.
const WEEK_GLANCE_SUBJECTS={
  francais:{label:'Français',icon:'📘',aliases:/fran[cç]ais|lecture|compr[ée]hension|lexique|vocabulaire|orthographe|dict[ée]e|production d[’']?[ée]crits?/i},
  maths:{label:'Mathématiques',icon:'🧮',aliases:/math[ée]mat|calcul|num[ée]ration|g[ée]om[ée]tr|mesure|probl[èe]me|fraction/i},
  english:{label:'Anglais',icon:'🇬🇧',aliases:/anglais|english/i},
  eps:{label:'Sport',icon:'🏃',aliases:/eps|sport|piscine|natation|domec|vtt|sandball/i},
  arts:{label:'Arts',icon:'🎨',aliases:/arts?|artistique|musique|chant/i},
  science:{label:'Sciences',icon:'🔬',aliases:/sciences?|questionner le monde|qlm/i},
  history:{label:'Histoire',icon:'🏺',aliases:/histoire|g[ée]ographie|temps|espace/i},
  emc:{label:'EMC',icon:'🤝',aliases:/emc|enseignement moral|citoyen/i},
  cham:{label:'CHAM',icon:'🎵',aliases:/cham/i}
};
const WEEK_GLANCE_HOMEWORK_BADGES={
  lecture:{label:'📖 Lecture',tone:'homework'},
  dictee:{label:'📝 Dictée',tone:'homework'},
  maths:{label:'➕ Maths',tone:'homework'},
  vocabulaire:{label:'🧠 Vocabulaire',tone:'homework'},
  ecriture:{label:'✍️ Écriture',tone:'homework'},
  anglais:{label:'🇬🇧 Anglais',tone:'homework'},
  lecon:{label:'📚 Leçon',tone:'homework'},
  sport:{label:'🏃 Sport',tone:'sport'}
};
function weekGlanceSubjectKey(value){
  const raw=String(value||'').trim();
  if(!raw)return '';
  const normalized=raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  if(['francais','french'].includes(normalized))return 'francais';
  if(['maths','mathematiques','mathematique'].includes(normalized))return 'maths';
  if(['anglais','english'].includes(normalized))return 'english';
  if(['eps','sport'].includes(normalized))return 'eps';
  if(['arts','art'].includes(normalized))return 'arts';
  if(['sciences','science','qlm'].includes(normalized))return 'science';
  if(['histoire','geographie','geo'].includes(normalized))return 'history';
  if(['emc'].includes(normalized))return 'emc';
  if(['cham'].includes(normalized))return 'cham';
  for(const [key,meta] of Object.entries(WEEK_GLANCE_SUBJECTS))if(meta.aliases.test(raw))return key;
  return '';
}
function homeworkBadgeKindFromText(value){
  const raw=String(value||'').trim();
  if(!raw)return '';
  const text=raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  if(/dictee|prepare ma dictee|mots appris|liste de mots|10 mots|mots annonces|epelle/.test(text))return 'dictee';
  if(/lecture|comprehension|reformule|texte|personnages|histoire|lire/.test(text))return 'lecture';
  if(/vocabulaire|lexique|ordre alphabetique|synonyme|contraire/.test(text))return 'vocabulaire';
  if(/math|calcul|addition|soustraction|multiplication|division|numeration|probleme|geometrie|mesure|rituel maths|nombre/.test(text))return 'maths';
  if(/ecriture|production d'ecrits|copie|redige|phrase/.test(text))return 'ecriture';
  if(/anglais|english/.test(text))return 'anglais';
  if(/lecon|poesie|chant|histoire|sciences|questionner le monde/.test(text))return 'lecon';
  return '';
}
function weekGlanceItemHomeworkKinds(dayItems){
  const kinds=[];
  const addKind=kind=>{if(kind&&!kinds.includes(kind))kinds.push(kind);};
  (dayItems||[]).forEach(it=>{
    const values=[it?.subject,it?.subjectLabel,it?.title,it?.routineTitle,it?.classLink,it?.notion,it?.text,it?.help,it?.body,it?.content];
    values.forEach(v=>addKind(homeworkBadgeKindFromText(v)));
    const secondaryList=Array.isArray(it?.secondary)?it.secondary:[it?.secondary].filter(Boolean);
    secondaryList.forEach(sec=>[sec?.subject,sec?.subjectLabel,sec?.title,sec?.text,sec?.help,sec?.body].forEach(v=>addKind(homeworkBadgeKindFromText(v))));
  });
  return kinds;
}
function weekGlancePhysicalKey(d){
  try{
    const data=EDT?.rowsForDate?EDT.rowsForDate(d):null;
    return physicalActivityReminderMeta(data?.rows||[])?'eps':'';
  }catch(_){return '';}
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
    const physicalKey=weekGlancePhysicalKey(d);
    let kind='class',icon='🏫',status='Classe';
    if(br){kind='holiday';icon='🏖️';status=br.label||'Vacances scolaires';}
    else if(off){kind='dayoff';icon=off.icon||'📅';status=off.label||'Pas de classe';}
    else if(dow===0||dow===6){kind='weekend';icon='☕';status='Week-end';}
    else if(dow===3){kind='noclass';icon='🌿';status='Pas de classe';}
    else if(dayEvals.length){
      kind='evaluation';icon='📝';status=`${dayEvals.length} évaluation${dayEvals.length>1?'s':''}`;
    }
    else if(dayItems.length){
      kind='homework';icon='📚';status='À préparer';
    }
    else if(physicalKey){
      kind='activity';icon='🏃';status='Sport';
    }
    else {status='Classe · rien à préparer';}
    const taskKinds=weekGlanceItemHomeworkKinds(dayItems);
    const taskBadges=taskKinds.map(k=>({key:k,meta:WEEK_GLANCE_HOMEWORK_BADGES[k]})).filter(x=>x.meta).map(({key,meta})=>`<span class="homework-week-calendar__homework-badge homework-week-calendar__homework-badge--${esc(key)}">${esc(meta.label)}</span>`).join('');
    const sportBadge=physicalKey&&![0,3,6].includes(dow)&&!br&&!off?`<span class="homework-week-calendar__sport-badge">${esc(WEEK_GLANCE_HOMEWORK_BADGES.sport.label)}</span>`:'';
    const evalMarker=dayEvals.length?`<span class="homework-week-calendar__eval-badge">📝 ${dayEvals.length>1?`${dayEvals.length} évaluations`:'Évaluation'}</span>`:'';
    const isSpecialDay=Boolean(br||off||dow===0||dow===6||dow===3);
    const specialStatus=isSpecialDay?`<div class="homework-week-calendar__status"><span aria-hidden="true">${icon}</span><small>${esc(status)}</small></div>`:'';
    const badges=(taskBadges||sportBadge||evalMarker)?`<div class="homework-week-calendar__badges">${taskBadges}${sportBadge}${evalMarker}</div>`:'';
    const dayContent=`<div class="homework-week-calendar__date"><strong>${esc(`${frDate(d,{weekday:'long'})} ${frDate(d,{day:'numeric',month:'short'})}`)}</strong></div>${specialStatus}${badges}`;
    const canJump=Boolean(dayItems.length||dayEvals.length);
    return canJump
      ? `<a class="homework-week-calendar__day homework-week-calendar__day--${kind} homework-week-calendar__day--link" data-dow="${dow}" href="#devoirs-${esc(iso)}" aria-label="Voir les devoirs de ${esc(frDate(d,{weekday:'long',day:'numeric',month:'long'}))}">${dayContent}</a>`
      : `<div class="homework-week-calendar__day homework-week-calendar__day--${kind}" data-dow="${dow}">${dayContent}</div>`;
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
// V35.30 — École à 4 jours : les échéances de devoirs sont toujours rattachées à un jour de classe.
// Jours autorisés : lundi, mardi, jeudi, vendredi. Mercredi → jeudi ; samedi/dimanche → lundi suivant.
function homeworkNextClassDueIso(value){
  const iso=String(value||'').trim();
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso))return iso;
  const d=dateFromIso(iso);
  const day=d.getDay();
  let offset=0;
  if(day===3)offset=1;      // mercredi → jeudi
  else if(day===6)offset=2; // samedi → lundi
  else if(day===0)offset=1; // dimanche → lundi
  return offset?isoLocal(EDT.addDays(d,offset)):iso;
}
function homeworkItemsForDisplayedWeek(week){
  if(!week)return [];
  const weeks=Array.isArray(D.weeks)?D.weeks:[];
  const out=[];
  weeks.forEach(sourceWeek=>{
    (Array.isArray(sourceWeek&&sourceWeek.items)?sourceWeek.items:[]).forEach(raw=>{
      const it=stripStaleFrenchEvaluations(raw,sourceWeek);
      const originalDue=String(it&&it.due||'');
      const normalizedDue=homeworkNextClassDueIso(originalDue);
      if(!normalizedDue||normalizedDue<week.start||normalizedDue>week.end)return;
      out.push({...it,due:normalizedDue,__originalDue:originalDue,__sourceWeek:sourceWeek});
    });
  });
  return out;
}

let homeworkTestWeekIndex=null;
function homeworkWeekFor(date){const iso=isoLocal(date),weeks=Array.isArray(D.weeks)?D.weeks:[];if(!weeks.length)return null;if(Number.isInteger(homeworkTestWeekIndex)&&weeks[homeworkTestWeekIndex])return weeks[homeworkTestWeekIndex];const current=weeks.find(w=>iso>=w.start&&iso<=w.end);if(current)return current;const next=weeks.find(w=>w.start>iso);if(next)return next;return weeks[weeks.length-1]}
function dictationPeriodForWeek(week){
  if(!week)return '';
  if(/^p[1-5]$/.test(String(week.__period||'')))return String(week.__period);
  const start=String(week.start||'');
  for(const [key,range] of Object.entries(LEARNING_PERIOD_DATES)){
    if(start&&start>=range.start&&start<=range.end)return key;
  }
  return '';
}
function parentDictationForWeek(week){
  if(!week)return null;
  const data=currentParentsDictations();
  const period=dictationPeriodForWeek(week);
  const list=(((data||{}).periods||{})[period]||[]);
  if(!period||!list.length)return null;

  // V34.86 : la liaison principale se fait par les dates réelles de la semaine.
  const start=String(week.start||''),end=String(week.end||'');
  const byDates=list.find(d=>String(d&&d.start||'')===start&&String(d&&d.end||'')===end);
  if(byDates)return byDates;

  // Repli de sécurité par numéro de semaine.
  const label=String(week.label||'');
  const match=label.match(/(?:semaine|sem\.?|s)\s*(\d+)/i);
  if(match){
    const n=Number(match[1]);
    return list.find(d=>Number(d&&d.week)===n)||null;
  }
  return null;
}
function dictationReviewHtml(week,item){
  if(!week||!item)return '';
  const d=parentDictationForWeek(week); if(!d)return '';
  const stage=String(item.dictationStage||'');
  if(!stage && String(item.due||'')!==String(d.reviewDue||''))return '';

  const words=String(d.words||'').trim(),priority=String(d.priority||'').trim();
  if(!words||/pas de banque à mémoriser/i.test(words))return '';

  const title=stage==='first'
    ? (d.hasFinal?'📝 Je commence à préparer ma dictée':'📝 Je découvre les mots de la semaine')
    : (d.hasFinal?'📝 Je prépare ma dictée':'📝 Je revois les mots de la semaine');

  return `<div class="homework-block homework-dictation-review">
    <b>${title}</b>
    ${d.theme?`<p class="homework-dictation-theme">${esc(d.theme)}</p>`:''}
    <p><strong>Mots :</strong> ${esc(words)}</p>
    ${priority?`<p><strong>⭐ Prioritaires :</strong> ${esc(priority)}</p>`:''}
    <small>Lis, épelle et mémorise les mots. Le cahier n’est pas indispensable : la liste est ici.</small>
  </div>`;
}
function homeworkHibouHtml(value){
  if(!value)return'';
  const list=Array.isArray(value)?value:[value];
  const valid=list.filter(x=>x&&(typeof x==='string'||x.url));
  if(!valid.length)return'';
  const intro=(!Array.isArray(value)&&typeof value==='object'&&value.intro)?value.intro:'Leçons utiles dans Maître Hibou :';
  const resourceIcon=(!Array.isArray(value)&&typeof value==='object'&&value.icon)?String(value.icon):'🦉';
  const links=valid.map(x=>{
    if(typeof x==='string')return `<span><b>${esc(x)}</b></span>`;
    return `<a class="homework-hibou-link" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(x.label||'Ouvrir la leçon')}</b> ↗</a>`;
  }).join(' <span aria-hidden="true">·</span> ');
  return `<div class="homework-hibou">${esc(resourceIcon)} ${esc(intro)} ${links}</div>`;
}

// V35.32 — Double badge des évaluations : nature + domaine précis.
// La couleur de matière reste portée par l'interface ; le second badge précise la sous-matière.
function evaluationDomainMeta(ev){
  const subject=String(ev&&ev.subject||'').toLowerCase();
  const title=String(ev&&ev.title||'').toLowerCase();
  const skills=[...(Array.isArray(ev&&ev.newSkills)?ev.newSkills:[]),...(Array.isArray(ev&&ev.reviewSkills)?ev.reviewSkills:[]),...(Array.isArray(ev&&ev.scope)?ev.scope:[])].join(' ').toLowerCase();
  const text=`${subject} ${title} ${skills}`;
  const meta=(key,label,tone)=>({key,label,tone});

  // Français — le domaine précis prime sur le simple nom de matière.
  if(/dict[ée]e|mots appris|autodict[ée]e|10 mots/.test(text))return meta('dictee','✏️ Dictée / mots appris','francais');
  if(/compr[ée]hension|lecture|texte|inférence|information explicite|implicite/.test(text))return meta('lecture','📖 Lecture / compréhension','francais');
  if(/lexique|vocabulaire|famille de mots|synonyme|contraire|ordre alphab[ée]tique/.test(text))return meta('lexique','🧠 Lexique / vocabulaire','francais');
  if(/production d[’']?[ée]crits|production écrite|écrire .*phrase|raconter dans l'ordre|améliorer son texte/.test(text))return meta('ecriture','✍️ Production d’écrits','francais');
  if(/orthographe/.test(text))return meta('orthographe','🔤 Orthographe','francais');
  if(/grammaire|groupe nominal|sujet|verbe/.test(text)&&/fran[cç]ais/.test(subject))return meta('grammaire','📚 Grammaire','francais');
  if(/conjugaison|présent|futur|imparfait|passé composé/.test(text)&&/fran[cç]ais/.test(subject))return meta('conjugaison','⏳ Conjugaison','francais');
  if(/fluence|lecture orale|oral/.test(text)&&/fran[cç]ais/.test(subject))return meta('fluence','🗣️ Lecture orale / fluence','francais');

  // Mathématiques — domaines CE2 lisibles par les familles.
  if(/probl[èe]me/.test(text)&&/(calcul|addition|soustraction|multiplication|division|op[ée]ration)/.test(text))return meta('problemes-calcul','🧩 Problèmes / calcul','maths');
  if(/fraction/.test(text))return meta('fractions','🍰 Fractions','maths');
  if(/num[ée]ration|nombres?|d[ée]composer|comparer/.test(text)&&/(math|num)/.test(text))return meta('numeration','🔢 Numération','maths');
  if(/g[ée]om[ée]tr|triangle|cercle|sym[ée]trie|solide/.test(text))return meta('geometrie','📐 Géométrie','maths');
  if(/dur[ée]e|heure|temps|mesure|longueur|masse|monnaie|p[ée]rim[èe]tre/.test(text)&&/(math|temps|mesure)/.test(text))return meta('mesures','📏 Grandeurs / mesures','maths');
  if(/donn[ée]es|tableau|graphique/.test(text))return meta('donnees','📊 Données','maths');
  if(/calcul|op[ée]ration|addition|soustraction|multiplication|division|tables?/.test(text))return meta('calcul','➕ Calcul / opérations','maths');
  if(/probl[èe]me/.test(text))return meta('problemes','🧩 Problèmes','maths');

  // Autres matières.
  if(/histoire|chronolog|frise|grandes p[ée]riodes/.test(text))return meta('histoire','🏺 Histoire / repères temporels','histoire');
  if(/g[ée]ographie/.test(text))return meta('geographie','🌍 Géographie','geographie');
  if(/sciences?|questionner le monde/.test(text))return meta('sciences','🔬 Sciences','sciences');
  if(/anglais|english/.test(text))return meta('anglais','🇬🇧 Anglais','anglais');
  if(/eps|sport|natation|piscine/.test(text))return meta('eps','🏃 EPS / Sport','eps');
  if(/arts?|musique|arts visuels/.test(text))return meta('arts','🎨 Arts','arts');
  if(/emc|enseignement moral|citoyen/.test(text))return meta('emc','🤝 EMC','emc');

  const raw=String(ev&&ev.subject||'Autre domaine').trim();
  return meta('autre',`📚 ${raw}`,'autre');
}
function evaluationBadgesHtml(ev){
  const d=evaluationDomainMeta(ev);
  return `<div class="homework-evaluation-badges" aria-label="Type et domaine de l'évaluation"><span class="homework-evaluation-badge homework-evaluation-badge--evaluation">📝 Évaluation</span><span class="homework-evaluation-badge homework-evaluation-badge--domain homework-evaluation-badge--tone-${esc(d.tone)}">${esc(d.label)}</span></div>`;
}

function homeworkEvaluationsHtml(list,periodTag='',titleOverride=''){
  const evaluations=Array.isArray(list)?list:[];
  if(!evaluations.length)return '';
  const showCountBanner=['p1','p2','p4','p5'].includes(periodTag);
  const count=evaluations.length;
  const weekRange=periodTag==='p5'&&evaluations[0]?.date?(()=>{const first=dateFromIso([...evaluations].map(e=>e.date).filter(Boolean).sort()[0]);const day=(first.getDay()+6)%7;const monday=new Date(first);monday.setDate(first.getDate()-day);const friday=new Date(monday);friday.setDate(monday.getDate()+4);const same=monday.getMonth()===friday.getMonth();const a=frDate(monday,same?{day:'numeric'}:{day:'numeric',month:'long'});const b=frDate(friday,{day:'numeric',month:'long'});return `Semaine du ${a} au ${b}`;})():'';
  const title=titleOverride || (periodTag==='p5'&&weekRange
    ? `📅 ${weekRange} : ${count} évaluation${count>1?'s':''} prévue${count>1?'s':''}`
    : showCountBanner
      ? `📅 Cette semaine : ${count} évaluation${count>1?'s':''} prévue${count>1?'s':''}`
      : `📅 Évaluation${count>1?'s':''} prévue${count>1?'s':''} cette semaine`);
  const titleClass=`homework-evaluations-title${showCountBanner?' homework-evaluations-title--count':''}`;
  return `<div class="homework-evaluations"><div class="${titleClass}">${title}</div>${evaluations.map(ev=>{
    const newSkills=Array.isArray(ev.newSkills)&&ev.newSkills.length?`<div class="homework-evaluation-skills homework-evaluation-skills--new"><b>🎯 Nouvelles compétences évaluées</b><ul>${ev.newSkills.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
    const reviewSkills=Array.isArray(ev.reviewSkills)&&ev.reviewSkills.length?`<div class="homework-evaluation-skills homework-evaluation-skills--review"><b>🔁 Déjà vu — rebrassage</b><p>Cette partie a déjà été travaillée : elle sert seulement à vérifier que l’acquis est bien consolidé.</p><ul>${ev.reviewSkills.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
    const scope=(!newSkills&&!reviewSkills&&Array.isArray(ev.scope)&&ev.scope.length)?`<ul>${ev.scope.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
    const prep=ev.preparation?`<p class="homework-evaluation-prep"><b>Pour se préparer :</b> ${esc(ev.preparation)}</p>`:'';
    const hibou=homeworkHibouHtml(ev.hibou);
    return `<section class="homework-evaluation"><div class="homework-evaluation-head"><strong>${esc(ev.subject||'Évaluation')}</strong><span>${esc(dueLabel(ev.date))}</span></div>${evaluationBadgesHtml(ev)}${ev.title?`<h4>${esc(ev.title)}</h4>`:''}${newSkills}${reviewSkills}${scope}${prep}${hibou}</section>`;
  }).join('')}</div>`;
}
function homeworkEvaluationTodayHtml(ev){
  if(!ev)return '';
  const subject=ev.subject||'Évaluation';
  const title=String(ev.title||'').trim();
  const oral=/oral/i.test(title);
  const label=title
    ? `Aujourd’hui : ${subject} — ${title}`
    : oral?`Aujourd’hui : bilan oral d’${subject}`:`Aujourd’hui : évaluation de ${subject}`;
  const anchor=ev.date?` id="devoirs-${esc(ev.date)}"`:'';
  return `<article${anchor} class="homework-card homework-card--today"><div class="homework-date">${esc(dueLabel(ev.date))}</div><div class="homework-today">${evaluationBadgesHtml(ev)}<b>⭐ ${esc(label)}</b><p>Aucun devoir supplémentaire aujourd’hui. Cette information rappelle simplement l’évaluation prévue.</p></div></article>`;
}
function homeworkSubjectMeta(task){
  const engine=window.DEVOIRS_ENGINE_CE2||{};
  const subjects=engine.subjects||{};
  return subjects[String(task&&task.subject||'')]||{label:String(task&&task.subjectLabel||'Je revois'),icon:String(task&&task.icon||task&&task.routineIcon||'📚'),tone:'neutral'};
}
function homeworkStructuredBlock(task,extraClass=''){
  if(!task)return '';
  const meta=homeworkSubjectMeta(task);
  const title=String(task.title||`${meta.label} — ${task.action||'Je revois'}`);
  const instruction=String(task.instruction||task.routine||'');
  const help=String(task.help||'');
  const duration=Number(task.duration||0);
  const durationLabel=String(task.durationLabel||'').trim();
  const classLink=String(task.classLink||task.notion||'');
  return `<div class="homework-block homework-task homework-task--${esc(meta.tone||'neutral')} ${extraClass}">
    <b>${esc(meta.icon||'📚')} ${esc(title)}</b>
    <p>${esc(instruction)}</p>
    ${help?`<div class="homework-help"><strong>💡 Pour t’aider :</strong> ${esc(help)}</div>`:''}
    <div class="homework-task-meta">
      ${durationLabel?`<span>⏱️ ${esc(durationLabel)}</span>`:(duration?`<span>⏱️ ${duration} min environ</span>`:'')}
      ${classLink?`<span>↪ En classe : ${esc(classLink)}</span>`:''}
    </div>
  </div>`;
}
function homeworkOnlineReadingHtml(it){
  if(String(it&&it.due||'')!=='2026-09-14')return '';
  return `<details class="homework-online-reading">
    <summary>📖 Texte à lire en ligne — <strong>Le kangourou</strong></summary>
    <div class="homework-online-reading__content">
      <p>Le kangourou est un mammifère qui vit en Australie. Il a une poche sur le ventre et fait la taille d’un homme. Il peut même le dépasser.</p>
      <p>À la naissance, le petit n’est pas terminé. Il ne fait que 3 cm et n’a pas de fourrure. Il grimpe alors dans la poche de la maman, dans laquelle il y a des tétines. Il boit son lait et finit de grandir.</p>
      <p>Le kangourou habite dans des prairies humides. Il vit en bande : sa bande s’appelle « un mob ».</p>
      <p>C’est un animal nocturne. Il dort le jour dans des trous creusés dans la terre. Il profite des heures fraîches et de la nuit pour se nourrir.</p>
      <p>Le kangourou est herbivore (il mange de l’herbe et des feuilles).</p>
      <p>Le kangourou a de longues pattes arrière puissantes qui lui permettent de se déplacer en sautant. Il peut faire des bonds jusqu’à 10 mètres de long et 3,2 mètres de haut.</p>
    </div>
  </details>`;
}
function homeworkItemCard(it,compact=false,periodTag='',lightWeek=false,week=null){if(it&&it.evaluationToday)return homeworkEvaluationTodayHtml(it.evaluationToday);const evaluations=homeworkEvaluationsHtml(it.evaluations,periodTag);const structured=Boolean(it&&(it.subject||it.instruction||it.action));const main=structured?homeworkStructuredBlock(it,'homework-task--main'):`<div class="homework-block homework-routine"><b>${esc(it.routineIcon||'📚')} ${esc(it.routineTitle||'Je revois')}</b><p>${esc(it.routine||'')}</p></div>`;const secondary=structured&&it.secondary?homeworkStructuredBlock(it.secondary,'homework-task--secondary'):'';const challenge=(!structured&&!lightWeek&&it.challenge)?`<div class="homework-block homework-challenge"><b>🎯 Petit défi</b><p>${esc(it.challenge)}</p></div>`:'';const family=(!lightWeek&&it.family)?`<div class="homework-block homework-family"><b>👨‍👩‍👧 Défi famille <span>facultatif</span></b><p>${esc(it.family)}</p></div>`:'';const hibou=homeworkHibouHtml(it.hibou);const dictation=dictationReviewHtml(it.__sourceWeek||week,it);const onlineReading=homeworkOnlineReadingHtml(it);const dateTitle=evaluationWeekLabel(it);const anchor=it&&it.due?` id="devoirs-${esc(it.due)}"`:'';return `<article${anchor} class="homework-card${compact?' homework-card--compact':''}"><div class="homework-date">${esc(dateTitle)}</div>${evaluations}${main}${dictation}${secondary}${onlineReading}${family}${hibou}</article>`}

function physicalActivityReminderMeta(rows){
  const subjects=(Array.isArray(rows)?rows:[]).map(r=>String(r?.[1]||'')).filter(Boolean);
  const joined=subjects.join(' · ').toLowerCase();
  if(!joined)return null;
  if(/\b(natation|piscine)\b/.test(joined)){
    return {icon:'🏊',title:'Natation',message:'Pense à préparer ton maillot, ta serviette et les affaires demandées pour la piscine.'};
  }
  if(/\bdomec\b/.test(joined)){
    return {icon:'🏟️',title:'EPS — Domec',message:'Pense à préparer une tenue de sport adaptée pour la séance à Domec.'};
  }
  if(/\beps\b/.test(joined)){
    return {icon:'🏃',title:'EPS',message:'Pense à prévoir une tenue adaptée pour l’activité physique.'};
  }
  return null;
}
function physicalActivityReminderDate(activityDate){
  const d=new Date(activityDate);d.setHours(12,0,0,0);
  const day=d.getDay();
  if(day===1)return EDT.addDays(d,-3); // lundi → vendredi : rappel pour le week-end
  if(day===2)return EDT.addDays(d,-1); // mardi → lundi
  if(day===4)return EDT.addDays(d,-1); // jeudi → mercredi
  if(day===5)return EDT.addDays(d,-1); // vendredi → jeudi
  return EDT.addDays(d,-1);
}
function homeworkPhysicalReminders(week){
  if(!week||!EDT?.rowsForDate)return [];
  const start=dateFromIso(week.start),end=dateFromIso(week.end);
  const scanStart=EDT.addDays(start,-1),scanEnd=EDT.addDays(end,3);
  const reminders=[],seen=new Set();
  for(let d=new Date(scanStart);d<=scanEnd;d=EDT.addDays(d,1)){
    const data=EDT.rowsForDate(d);
    const meta=physicalActivityReminderMeta(data?.rows||[]);
    if(!meta)continue;
    const reminderDate=physicalActivityReminderDate(d);
    const reminderIso=isoLocal(reminderDate);
    if(reminderIso<week.start||reminderIso>week.end)continue;
    const activityIso=isoLocal(d),key=`${activityIso}|${meta.title}`;
    if(seen.has(key))continue;
    seen.add(key);
    const activityLabel=frDate(d,{weekday:'long',day:'numeric',month:'long'});
    const when=d.getDay()===1?'lundi (rappel du week-end)':activityLabel;
    reminders.push({...meta,activityDate:activityIso,reminderDate:reminderIso,when});
  }
  return reminders.sort((a,b)=>a.reminderDate.localeCompare(b.reminderDate));
}
function homeworkPhysicalRemindersHtml(week){
  const reminders=homeworkPhysicalReminders(week);
  if(!reminders.length)return '';
  return `<section class="homework-practical-reminders" aria-label="Rappels pratiques pour les activités physiques">
    <div class="homework-practical-reminders__head"><strong>🎒 Rappels pratiques</strong><span>Ne comptent pas comme devoirs</span></div>
    ${reminders.map(r=>`<div class="homework-practical-reminder">
      <span class="homework-practical-reminder__icon" aria-hidden="true">${esc(r.icon)}</span>
      <div><strong>${esc(r.title)} ${esc(r.when)}</strong><p>${esc(r.message)}</p></div>
    </div>`).join('')}
  </section>`;
}
function allEvaluationDates(){return [...new Set(allEvaluations().map(ev=>String(ev.date||'')).filter(Boolean))]}

// V35.47 — La page Devoirs présente deux semaines : la semaine de référence et la suivante.
function homeworkNextWeek(week){
  if(!week)return null;
  const weeks=Array.isArray(D.weeks)?D.weeks:[];
  const idx=weeks.indexOf(week);
  if(idx>=0&&weeks[idx+1])return weeks[idx+1];
  return weeks.find(w=>String(w.start||'')>String(week.end||''))||null;
}
function homeworkWeekSectionHtml(week,{future=false}={}){
  if(!week)return '';
  const sourceItems=homeworkItemsForDisplayedWeek(week);
  const weekEvaluations=evaluationsForDisplayedWeek(week);
  const advanceAnnouncements=canonicalFrenchAdvanceAnnouncementsForWeek(week);
  let items=[...sourceItems];
  const periodTag=week.__period||'';
  const noSchool=noSchoolDateSet();
  items=items.filter(it=>!noSchool.has(String(it&&it.due||'')));
  const evalDates=allEvaluationDates();
  const weekEvalDates=evalDates.filter(d=>d>=week.start&&d<=week.end);
  const lightWeek=['p1','p2','p3','p4','p5'].includes(periodTag)&&weekEvalDates.length>0;
  if(lightWeek){
    items=items.filter(it=>{
      const hasOwnEvaluations=Array.isArray(it.evaluations)&&it.evaluations.length>0;
      return hasOwnEvaluations||!weekEvalDates.includes(String(it.due||''));
    });
  }
  const dayJItems=allEvaluations()
    .filter(ev=>String(ev.date||'')>=week.start&&String(ev.date||'')<=week.end)
    .map(ev=>({due:String(ev.date),evaluationToday:ev}));
  items=[...items,...dayJItems].sort((a,b)=>String(a.due||'').localeCompare(String(b.due||'')));

  const sectionLabel=future?'Semaine prochaine':'Cette semaine';
  const anticipation=future?'<p class="homework-week-ahead-note">👀 <strong>Pour anticiper :</strong> ces devoirs sont affichés à l’avance pour faciliter l’organisation familiale.</p>':'';
  const weekCalendar=homeworkWeekCalendarHtml(week,sourceItems);
  const calendar=schoolCalendarHtml(week);
  const holidayRevisions=holidayRevisionHtml(week);
  const weekEvaluationsHtml=homeworkEvaluationsHtml(weekEvaluations,periodTag);
  const advanceTitle=advanceAnnouncements.length?`📌 À venir : ${advanceAnnouncements.length} évaluation${advanceAnnouncements.length>1?'s':''} annoncée${advanceAnnouncements.length>1?'s':''} à l’avance`:'';
  const advanceAnnouncementsHtml=homeworkEvaluationsHtml(advanceAnnouncements,periodTag,advanceTitle);
  const weekNote=String(week.note||'').trim();
  const isPostEvaluationNote=/évaluations nationales sont terminées|on reprend un rythme ordinaire/i.test(weekNote);
  const visibleWeekNote=isPostEvaluationNote?'':weekNote;
  const content=items.length
    ? `${visibleWeekNote?`<div class="homework-empty">${esc(visibleWeekNote)}</div>`:''}${items.map(x=>homeworkItemCard(x,false,periodTag,lightWeek,week)).join('')}`
    : `<div class="homework-empty">🌱 ${esc(visibleWeekNote||'Aucun devoir cette semaine.')}</div>`;
  return `<section class="homework-two-week-section${future?' homework-two-week-section--next':''}" aria-label="${sectionLabel}">${anticipation}${weekCalendar}${calendar}${weekEvaluationsHtml}${advanceAnnouncementsHtml}${content}${week.holiday?`<div class="homework-holiday">🏖️ ${esc(week.holiday)}</div>`:''}${holidayRevisions}</section>`;
}
function renderHomework(){
  const now=new Date(),week=homeworkWeekFor(now),cur=$('homeworkCurrent');
  if(!cur)return;
  if(!week){cur.innerHTML='<div class="homework-empty">Aucun devoir programmé.</div>';return;}
  const nextWeek=homeworkNextWeek(week);
  cur.innerHTML=`${homeworkWeekSectionHtml(week)}${nextWeek?homeworkWeekSectionHtml(nextWeek,{future:true}):''}`;
}

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
  const familyRx=/(sortie|visite|mus[ée]e|piscine|natation|spectacle|rencontre|intervenant|journ[ée]e exceptionnelle|classe découverte|biblioth[èe]que|cin[ée]ma|photo de classe|cavay[èe]re|domec|gdvb)/i;
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

function parentApiText(item){
  const title=String(item?.titre||'').trim();
  const message=String(item?.message||'').trim();
  if(title&&message)return `${title} — ${message}`;
  return message||title;
}
function parentApiItems(type){
  if(!parentsApiLoaded)return null;
  return parentsApiMessages.filter(item=>String(item?.type||'').toLowerCase()===type);
}
function loadParentsInfoApi(){
  return new Promise(resolve=>{
    const callback=`__parentsInfoV3525_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script=document.createElement('script');
    let finished=false;
    const cleanup=()=>{
      try{delete window[callback]}catch(e){window[callback]=undefined}
      script.remove();
    };
    const finish=ok=>{
      if(finished)return;
      finished=true;
      clearTimeout(timer);
      cleanup();
      resolve(ok);
    };
    window[callback]=data=>{
      if(data&&data.ok===true&&Array.isArray(data.messages)){
        parentsApiMessages=data.messages;
        parentsApiLoaded=true;
        finish(true);
      }else{
        console.warn('V35.25 : réponse API Infos Parents invalide',data);
        finish(false);
      }
    };
    script.onerror=()=>{
      console.warn('V35.25 : API Infos Parents indisponible, maintien des données de secours.');
      finish(false);
    };
    const sep=PARENTS_INFO_API_URL.includes('?')?'&':'?';
    script.src=`${PARENTS_INFO_API_URL}${sep}action=infos_parents&callback=${encodeURIComponent(callback)}&_=${Date.now()}`;
    script.async=true;
    document.head.appendChild(script);
    const timer=setTimeout(()=>finish(false),8000);
  });
}

function renderFlashTicker(){
  const ticker=$('parentsFlashTicker');
  if(!ticker)return;
  const remote=parentApiItems('flash');
  const msg=remote===null
    ? ''
    : remote.map(parentApiText).filter(Boolean).join(' • ');
  ticker.hidden=!msg;
  if(!msg)return;
  const a=$('parentsFlashTickerText'),b=$('parentsFlashTickerTextCopy');
  if(a)a.textContent=msg;
  if(b)b.textContent=msg;
  ticker.setAttribute('aria-label',`Information de dernière minute : ${msg}. Ouvrir les infos de la classe.`);
}

// V35.43 — Rappels unifiés : permanent + « En ce moment ».
function isoToday(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function isoShiftDays(iso,days){
  const m=String(iso||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!m)return '';
  const d=new Date(Number(m[1]),Number(m[2])-1,Number(m[3]),12,0,0);
  d.setDate(d.getDate()+Number(days||0));
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function isOneWeekAdvanceEvent(item){
  const text=String(item?.text||'').toLocaleLowerCase('fr');
  return /\b(sortie|réunion|reunion|rencontre)\b/.test(text);
}
function normalizeReminderItem(item,source='rappel'){
  if(typeof item==='string')return {text:item,start:'',end:'',source};
  return {
    text:String(item?.text||item?.label||parentApiText(item)||'').trim(),
    start:String(item?.start||item?.date_debut||'').trim(),
    end:String(item?.end||item?.date_fin||'').trim(),
    priority:String(item?.priority||item?.priorite||'Normal'),
    source
  };
}
function itemVisibleNow(item,today){
  if(remindersTestMode)return true;
  const start=item.start||'';
  const end=item.end||start||'';

  if(!start&&!end)return false;

  // Sorties / réunions / rencontres : apparition 7 jours avant.
  const visibleStart=(start&&isOneWeekAdvanceEvent(item))?isoShiftDays(start,-7):start;

  if(visibleStart&&today<visibleStart)return false;
  if(end&&today>end)return false;
  return true;
}
function reminderCollections(){
  // Repères permanents : pas de date de début/fin.
  const permanentDefaults=[
    {text:'🎒 Merci de vérifier régulièrement que la trousse reste complète.',start:'',end:'',source:'permanent'}
  ];

  // Informations ponctuelles de rentrée.
  const datedDefaults=[
    {
      text:'🏫 Réunion d’information sur la coopérative scolaire — Lundi 7 septembre, de 17h05 à 17h15, sous le préau des CE2. Le Directeur présentera le fonctionnement de la coopérative scolaire : à quoi elle sert, comment elle est financée et de quelle manière elle permet de soutenir les projets, sorties et activités proposés aux élèves au cours de l’année.',
      start:'2026-08-31',
      end:'2026-09-07',
      source:'rappel'
    },
    {
      text:'👨‍🏫 Réunion de rentrée avec l’enseignant — Lundi 7 septembre, de 17h15 à 18h15, dans la classe de votre enfant. Cette réunion permettra de présenter le fonctionnement de la classe, l’organisation de l’année, les apprentissages, les devoirs et les outils utilisés. Je présenterai également l’application « Espace Parents » et son fonctionnement, afin que chacun puisse l’utiliser facilement. Un temps sera enfin consacré aux premières questions des familles.',
      start:'2026-08-31',
      end:'2026-09-07',
      source:'rappel'
    },
    {text:'🔵 Évaluations nationales CE2 — du 7 au 18 septembre 2026.',start:'2026-09-01',end:'2026-09-18',source:'rappel'},
    {text:'📘 Les évaluations nationales sont terminées. On reprend un rythme ordinaire : lecture, français et mathématiques le matin, avec de courtes révisions à la maison.',start:'2026-09-14',end:'2026-09-18',source:'rappel'},
    {text:'📝 Merci de remplir, dater et signer la fiche de renseignements.',start:'2026-09-01',end:'2026-09-18',source:'rappel'}
  ];

  const today=isoToday();
  const remoteReminders=parentApiItems('rappel');
  const remoteUpcoming=parentApiItems('avenir');

  let localItems=[];
  if(remoteReminders===null||remindersTestMode){
    const raw=Array.isArray(I.importantItems)&&I.importantItems.length?I.importantItems:infoLines(W.items);
    localItems=raw.map(item=>normalizeReminderItem(item,'rappel'));
  }

  const apiReminderItems=(remoteReminders!==null&&!remindersTestMode)
    ? remoteReminders.map(item=>normalizeReminderItem(item,'rappel'))
    : [];

  // Les anciennes entrées « avenir » sont désormais absorbées dans « En ce moment ».
  // Elles doivent être datées pour être affichées automatiquement.
  const apiUpcomingItems=(remoteUpcoming!==null&&!remindersTestMode)
    ? remoteUpcoming.map(item=>normalizeReminderItem(item,'avenir'))
    : [];

  const evaluationStatusText='🔵 Les évaluations nationales sont terminées. Je suis en train d’enregistrer les résultats numériquement. Vous serez informés lorsqu’ils seront disponibles.';

  const all=[...permanentDefaults,...datedDefaults,...apiReminderItems,...apiUpcomingItems,...localItems]
    .map(item=>{
      const text=String(item&&item.text||'');
      return /évaluations nationales/i.test(text)
        ? {...item,text:evaluationStatusText}
        : item;
    })
    .filter(item=>item.text);

  const permanent=[];
  const current=[];
  const seen=new Set();

  all.forEach(item=>{
    const key=String(item.text||'').toLocaleLowerCase('fr').replace(/\s+/g,' ').trim();
    if(!key||seen.has(key))return;
    seen.add(key);

    if(!item.start&&!item.end){
      permanent.push(item);
      return;
    }
    if(itemVisibleNow(item,today))current.push(item);
  });

  return {permanent,current};
}
function renderReminderList(id,items,emptyText){
  const root=$(id);
  if(!root)return;
  root.innerHTML=items.length
    ? `<ul class="parents-info-list">${items.map(x=>`<li>${esc(x.text)}</li>`).join('')}</ul>`
    : `<div class="parents-info-empty">${esc(emptyText)}</div>`;
}
function renderClassInfo(){
  const groups=reminderCollections();
  renderReminderList('parentsPermanentList',groups.permanent,'Aucun rappel permanent publié pour le moment.');
  renderReminderList('parentsCurrentList',groups.current,'Aucune information ponctuelle à signaler pour le moment.');

  // V35.20 — ne plus afficher l'ancien lien « mots aux parents » devenu obsolète.
  const docs=(Array.isArray(I.documents)?I.documents:[]).filter(d=>{
    const label=String(typeof d==='string'?d:(d?.label||d?.title||''));
    return !/(mots|palabras)\s+aux\s+parents|espace\s+parents\s*&\s*ma[iî]tre\s+hibou/i.test(label);
  });
  $('parentsDocumentsUseful').innerHTML=docs.length
    ? docs.map(d=>{
        if(typeof d==='string')return `<div class="parents-document-useful">${esc(d)}</div>`;
        const label=esc(d.label||d.title||'Document'),url=String(d.url||'').trim();
        return `<div class="parents-document-useful">${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${label}<span>↗</span></a>`:label}</div>`;
      }).join('')
    : '<div class="parents-info-empty">Aucun document utile publié pour le moment.</div>';
}


function setupRemindersTest(){
  const btn=$('remindersTestHotspot'),bar=$('remindersTestBar'),label=$('remindersTestLabel'),reset=$('remindersTestReset');
  if(!btn||!bar)return;
  let timer=null;
  let fired=false;
  function refresh(){
    if(label)label.textContent=remindersTestMode?'Tous les rappels · mode test':'Affichage automatique';
    bar.hidden=!remindersTestMode;
    btn.setAttribute('aria-expanded',remindersTestMode?'true':'false');
    renderClassInfo();
  }
  function activate(){
    fired=true;
    remindersTestMode=true;
    refresh();
  }
  function start(e){
    fired=false;
    clearTimeout(timer);
    timer=setTimeout(activate,3000);
  }
  function cancel(e){
    clearTimeout(timer);
    if(fired){e?.preventDefault?.();fired=false;}
  }
  btn.addEventListener('pointerdown',start);
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>btn.addEventListener(ev,cancel));
  btn.addEventListener('click',e=>{if(remindersTestMode||fired)e.preventDefault();});
  reset?.addEventListener('click',()=>{remindersTestMode=false;refresh();});
}

function frDate(d,opts={weekday:'long',day:'numeric',month:'long',year:'numeric'}){return new Intl.DateTimeFormat('fr-FR',opts).format(d).replace(/^./,c=>c.toUpperCase())}
// V35.21 — emploi du temps cible : structure + matieres, descriptions detaillees en francais.
function scheduleTr(text){
  const i18n=window.PARENTS_I18N;
  return i18n&&typeof i18n.translateSchedule==='function'?i18n.translateSchedule(String(text??''),i18n.lang):String(text??'');
}
function scheduleTargetDate(){
  const now=new Date();now.setHours(12,0,0,0);
  const todayData=EDT.rowsForDate(now);
  if(todayData.rows.length)return now;
  return EDT.nextClassDate(now);
}
function noClassHtml(d){
  const data=EDT.rowsForDate(d),info=data.noClass||EDT.noClassInfo?.(d);
  if(!info)return `<div class="homework-empty">${esc(scheduleTr('Pas de classe prévue ce jour-là.'))}</div>`;
  const detail=info.type==='ferie'||info.type==='pont' ? `${info.label} — pas de classe` : (info.message||info.label);
  return `<div class="schedule-no-class schedule-no-class--${esc(info.type||'none')}"><span>${esc(info.icon||'📅')}</span><div><strong>${esc(scheduleTr(detail))}</strong>${info.type==='vacances'?`<small>${esc(scheduleTr('Les élèves ne sont pas attendus à l’école.'))}</small>`:''}</div></div>`;
}
// V35.33 — badges d'évaluation dans l'emploi du temps détaillé Parents.
function scheduleRowEvaluation(d,row){
  const iso=isoLocal(d);
  const text=`${row?.[1]||''} ${row?.[2]||''}`.toLowerCase();
  // Une ligne ordinaire ne reçoit jamais de badge, même si une autre évaluation a lieu le même jour.
  if(!/évaluation|evaluation|bilan|contrôle|controle/.test(text))return null;
  const candidates=allEvaluations().filter(ev=>String(ev?.date||'')===iso);
  if(!candidates.length)return null;
  if(candidates.length===1)return candidates[0];

  // Quand plusieurs évaluations ont lieu le même jour (ex. 1er avril), on cherche le domaine qui correspond à la ligne.
  const score=(ev)=>{
    const d=evaluationDomainMeta(ev);
    const hay=`${ev?.subject||''} ${ev?.title||''} ${ev?.scope||''} ${d?.label||''}`.toLowerCase();
    let n=0;
    const tests=[
      [/dictée|dictee|mots appris|mots annoncés|mots annonces/,/dictée|dictee|mots appris|mots annoncés|mots annonces/],
      [/lexique|vocabulaire|famille de mots|synonyme|contraire/,/lexique|vocabulaire|famille de mots|synonyme|contraire/],
      [/compréhension|comprehension|lecture/,/compréhension|comprehension|lecture/],
      [/production|écrit|ecrit|rédaction|redaction/,/production|écrit|ecrit|rédaction|redaction/],
      [/géométr|geometr|triangle|cercle|symétr/,/géométr|geometr|triangle|cercle|symétr/],
      [/temps|mesure|durée|duree|heure|longueur|masse/,/temps|mesure|durée|duree|heure|longueur|masse/],
      [/problème|probleme/,/problème|probleme/],
      [/calcul|opération|operation|addition|soustraction|multiplication|division|tables?/,/calcul|opération|operation|addition|soustraction|multiplication|division|tables?/],
      [/histoire|chronolog|frise/,/histoire|chronolog|frise/],
      [/science/,/science/]
    ];
    tests.forEach(([a,b])=>{if(a.test(text)&&b.test(hay))n+=3;});
    const subj=weekGlanceSubjectKey(ev?.subject||'');
    if(subj&&weekGlanceSubjectKey(text)===subj)n+=1;
    return n;
  };
  return [...candidates].sort((a,b)=>score(b)-score(a))[0]||null;
}
// V35.34 — emploi du temps Parents : mêmes couleurs et mêmes icônes matières que Progressions CE2.
function scheduleRowSubjectMeta(row){
  const raw=`${row?.[1]||''} ${row?.[2]||''}`;
  const key=weekGlanceSubjectKey(raw);
  if(key&&WEEK_GLANCE_SUBJECTS[key])return {key,...WEEK_GLANCE_SUBJECTS[key]};
  // Quelques libellés transversaux de l'EDT ne contiennent pas toujours le nom explicite de la matière.
  if(/vie de classe|temps d[’']?[ée]change|conseil|r[èe]gles de vie/i.test(raw))return {key:'emc',...WEEK_GLANCE_SUBJECTS.emc};
  if(/r[ée]cr[ée]ation|pause|cantine|accueil/i.test(raw))return {key:'break',label:'Pause',icon:'☕'};
  return {key:'common',label:'Classe',icon:'🏫'};
}
function scheduleRowsHtml(d){
  const data=EDT.rowsForDate(d);
  if(!data.rows.length)return noClassHtml(d);
  return data.rows.map(r=>{
    const ev=scheduleRowEvaluation(d,r);
    const badges=ev?evaluationBadgesHtml(ev):'';
    const meta=scheduleRowSubjectMeta(r);
    const cls=` schedule-row--subject-${meta.key}${ev?' schedule-row--evaluation':''}`;
    const icon=meta.key==='common'||meta.key==='break'?'':`<span class="schedule-subject-icon schedule-subject-icon--${meta.key}" aria-hidden="true">${meta.icon}</span>`;
    return `<div class="schedule-row${cls}"><time>${esc(r[0])}</time><div>${badges}<strong class="schedule-subject-title">${icon}<span>${esc(scheduleTr(r[1]))}</span></strong>${r[2]?`<small>${esc(r[2])}</small>`:''}</div></div>`;
  }).join('');
}
let scheduleWeekOffset=0;
function scheduleBaseTarget(){
  const t=scheduleTargetDate();
  return t||new Date();
}
function scheduleDisplayedMonday(){
  const base=EDT.mondayOf(scheduleBaseTarget());
  return EDT.addDays(base,scheduleWeekOffset*7);
}
function scheduleWeekLabelFromMonday(monday){
  const friday=EDT.addDays(monday,4);
  const sameMonth=monday.getMonth()===friday.getMonth();
  const left=frDate(monday,sameMonth?{day:'numeric'}:{day:'numeric',month:'short'});
  const right=frDate(friday,{day:'numeric',month:'short'});
  return `Semaine du ${left} au ${right}`;
}
function scheduleAvailableWeeks(){
  const raw=window.PROGRESSIONS_EDT_DATA||{};
  const weeks=[];
  ['p1','p2','p3','p4','p5'].forEach(k=>{
    const arr=raw[`${k}DetailedWeeks`];
    if(!Array.isArray(arr))return;
    arr.forEach(w=>{
      const days=Array.isArray(w?.days)?w.days:[];
      const dates=days.map(d=>frenchDateFromLabel(d?.[0])).filter(Boolean).sort((a,b)=>a-b);
      if(!dates.length)return;
      const monday=EDT.mondayOf(dates[0]);
      const iso=isoLocal(monday);
      if(!weeks.some(x=>x.iso===iso))weeks.push({iso,monday});
    });
  });
  return weeks.sort((a,b)=>a.monday-b.monday);
}
function refreshScheduleWeekNav(){
  const prev=$('schedulePrevWeek'),next=$('scheduleNextWeek'),sel=$('scheduleWeekSelect');
  if(!prev||!next||!sel)return;
  const weeks=scheduleAvailableWeeks();
  const current=scheduleDisplayedMonday();
  const currentIso=isoLocal(current);
  sel.innerHTML=weeks.map(w=>`<option value="${esc(w.iso)}"${w.iso===currentIso?' selected':''}>${esc(scheduleWeekLabelFromMonday(w.monday))}</option>`).join('');
  const idx=weeks.findIndex(w=>w.iso===currentIso);
  prev.disabled=idx<=0;
  next.disabled=idx<0||idx>=weeks.length-1;
}
function setupScheduleWeekNav(){
  const prev=$('schedulePrevWeek'),next=$('scheduleNextWeek'),sel=$('scheduleWeekSelect');
  if(!prev||!next||!sel||prev.dataset.bound==='1')return;
  prev.dataset.bound=next.dataset.bound=sel.dataset.bound='1';
  prev.addEventListener('click',()=>{scheduleWeekOffset-=1;renderSchedule();});
  next.addEventListener('click',()=>{scheduleWeekOffset+=1;renderSchedule();});
  sel.addEventListener('change',()=>{
    const chosen=dateFromIso(sel.value);
    const base=EDT.mondayOf(scheduleBaseTarget());
    scheduleWeekOffset=Math.round((chosen-base)/(7*86400000));
    renderSchedule();
  });
}
function renderSchedule(){
  const today=new Date();today.setHours(12,0,0,0);
  const todayData=EDT.rowsForDate(today),todayInfo=todayData.noClass||null;
  const target=scheduleTargetDate();
  const periodTarget=target||today;
  $('schedulePeriod').textContent=scheduleTr(EDT.periodLabel(EDT.periodForDate(periodTarget)));
  if(!target){
    $('scheduleEyebrow').textContent=scheduleTr('Calendrier scolaire');
    $('scheduleQuickHint').textContent=scheduleTr(todayInfo?.label||'Pas de classe');
    $('scheduleViewMessage').textContent=scheduleTr(todayInfo?.message||'Aucune prochaine journée de classe n’est encore programmée.');
    $('parentsScheduleToday').innerHTML=`<article class="schedule-day schedule-day--today"><h3>${esc(scheduleTr(frDate(today,{weekday:'long',day:'numeric',month:'long'})))}</h3>${noClassHtml(today)}</article>`;
    $('parentsScheduleWeek').innerHTML='';
    return;
  }
  const isToday=isoLocal(target)===isoLocal(today);
  $('scheduleEyebrow').textContent=scheduleTr(isToday?'Aujourd’hui':'Prochain jour de classe');
  $('scheduleQuickHint').textContent=isToday?scheduleTr(frDate(target,{weekday:'long'})):scheduleTr(`Prochain : ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}`);
  const targetLabel=scheduleTr(frDate(target,{weekday:'long',day:'numeric',month:'long'}));
  if(isToday){
    $('scheduleViewMessage').textContent=`${scheduleTr('Voici l’emploi du temps réel de')} ${targetLabel}.`;
  }else if(todayInfo){
    const reason=todayInfo.type==='ferie'||todayInfo.type==='pont'?`${todayInfo.label} — pas de classe`:todayInfo.label;
    $('scheduleViewMessage').textContent=`${scheduleTr(reason)}. ${scheduleTr('Prochain jour de classe')} : ${targetLabel}.`;
  }else{
    $('scheduleViewMessage').textContent=`${scheduleTr('Pas de classe aujourd’hui.')} ${scheduleTr('Prochain jour de classe')} : ${targetLabel}.`;
  }
  const monday=scheduleDisplayedMonday(),days=[0,1,3,4].map(n=>EDT.addDays(monday,n));
  const focus=scheduleWeekOffset===0?target:days[0];
  $('parentsScheduleToday').innerHTML=`<article class="schedule-day schedule-day--today"><h3>${esc(scheduleTr(frDate(focus,{weekday:'long',day:'numeric',month:'long'})))}</h3>${scheduleRowsHtml(focus)}</article>`;
  $('parentsScheduleWeek').innerHTML=days.map(d=>`<article class="schedule-day${isoLocal(d)===isoLocal(focus)?' schedule-day--selected':''}"><h3>${esc(scheduleTr(frDate(d,{weekday:'long',day:'numeric',month:'long'})))}</h3>${scheduleRowsHtml(d)}</article>`).join('');
  setupScheduleWeekNav();
  refreshScheduleWeekNav();
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


function ensureHolidaySheetModal(){
  let modal=document.querySelector('.holiday-sheet-modal');
  if(modal)return modal;
  modal=document.createElement('div');
  modal.className='holiday-sheet-modal';
  modal.hidden=true;
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label','Fiche de vacances agrandie');
  modal.innerHTML='<div class="holiday-sheet-modal__dialog"><img class="holiday-sheet-modal__image" alt=""><button class="holiday-sheet-modal__close" type="button" aria-label="Fermer la fiche">×</button></div>';
  document.body.appendChild(modal);
  const close=()=>{
    modal.hidden=true;
    document.body.classList.remove('holiday-sheet-modal-open');
    modal.querySelector('.holiday-sheet-modal__image').removeAttribute('src');
  };
  modal.querySelector('.holiday-sheet-modal__close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()});
  modal._closeHolidaySheet=close;
  return modal;
}
function openHolidaySheet(link){
  const img=link.querySelector('img');
  const src=link.getAttribute('href')||img?.getAttribute('src');
  if(!src)return;
  const modal=ensureHolidaySheetModal();
  const full=modal.querySelector('.holiday-sheet-modal__image');
  full.src=src;
  full.alt=img?.alt||'Fiche de vacances agrandie';
  modal.hidden=false;
  document.body.classList.add('holiday-sheet-modal-open');
  modal.querySelector('.holiday-sheet-modal__close').focus({preventScroll:true});
}
function bindHolidayRevisionPreviews(){
  document.addEventListener('click',e=>{
    const link=e.target.closest('.holiday-revisions__page');
    if(!link)return;
    e.preventDefault();
    openHolidaySheet(link);
  });
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
function init(){
  const now=new Date(),p=period();
  $('parentsDate').textContent=frDate(now);
  renderPublished();
  renderFlashTicker();
  renderSchedule();
  bindParentInfoNavigation();
  bindParentNavigation();
  bindHolidayRevisionPreviews();
  setupHomeworkTest();
  setupRemindersTest();
  loadParentsInfoApi().then(ok=>{
    if(!ok)return;
    renderFlashTicker();
    renderClassInfo();
  });
}
// V35.20 — régénérer uniquement l'emploi du temps lors d'un changement de langue.
window.addEventListener('parentslanguagechange',()=>{
  try{renderSchedule()}catch(e){console.warn('V35.20: rafraîchissement emploi du temps impossible',e)}
});
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
