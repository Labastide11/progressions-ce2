// V34.97 — Moteur annuel commun des devoirs CE2.
window.DEVOIRS_ENGINE_CE2={
  version:'34.97',
  maxMinutes:10,
  maxCoreTasks:2,
  categories:{
    lecture:{label:'Lecture',icon:'📖'},
    francais:{label:'Français',icon:'📝'},
    maths:{label:'Mathématiques',icon:'🔢'},
    preparation:{label:'Préparation',icon:'🧠'},
    poesie:{label:'Poésie',icon:'🎭'},
    famille:{label:'Défi famille',icon:'👨‍👩‍👧'}
  },
  subjects:{
    lecture:{label:'Lecture',icon:'📖',tone:'reading'},
    orthographe:{label:'Orthographe',icon:'📝',tone:'french'},
    grammaire:{label:'Grammaire',icon:'🧩',tone:'french'},
    ecriture:{label:'Écriture',icon:'✍️',tone:'french'},
    numeration:{label:'Numération',icon:'🔢',tone:'maths'},
    'calcul-mental':{label:'Calcul mental',icon:'➕',tone:'maths'},
    mathematiques:{label:'Mathématiques',icon:'🔢',tone:'maths'},
    preparation:{label:'Préparation',icon:'🧠',tone:'prep'},
    poesie:{label:'Poésie',icon:'🎭',tone:'poetry'},
    histoire:{label:'Histoire',icon:'⏳',tone:'discovery'},
    geographie:{label:'Géographie',icon:'🌍',tone:'discovery'},
    sciences:{label:'Sciences',icon:'🔬',tone:'science'}
  },
  actionRule:'Le titre associe toujours une matière identifiable à un verbe d’action.',
  autonomyRule:'Le cahier est une aide, jamais une condition.',
  familyRule:'Le défi famille reste facultatif, court, ludique et sans pénalisation.'
};
