// V36.71 — P1 : rituel maths (nombre en lettres + addition) à partir du 17/09, synchronisé avec l’emploi du temps.
window.DEVOIRS_P1 = {
  "version": "36.71",
  "period": "p1",
  "schoolYear": "2026-2027",
  "principles": {
    "start": "2026-09-07",
    "maxMinutes": 10,
    "writtenWork": true,
    "maxCoreTasks": 2,
    "formula": "Matière → verbe d’action → consigne autonome → aide/exemple → durée",
    "categories": [
      "lecture",
      "francais",
      "maths",
      "preparation",
      "poesie",
      "famille"
    ],
    "dictationRule": "Les mots viennent de dictees-ce2.js. Première rencontre puis rappel avant la dictée bilan ; aucune recopie manuelle de la banque dans les devoirs.",
    "evaluationRule": "Annonce anticipée puis rappel court ciblé. Jour J : information seulement, aucun devoir ajouté.",
    "autonomyRule": "Le cahier est une aide, jamais une condition : chaque devoir propose une solution de repli sans cahier.",
    "syncRule": "Les devoirs P1 sont alignés sur emploi-du-temps-data-p1.js V36.68. Le rituel maths renforce uniquement des apprentissages déjà travaillés en classe.",
    "writtenWorkRule": "Le travail écrit reste exceptionnel : en P1, seul le rituel maths demande d’écrire un nombre en lettres et de calculer une addition. Environ 5 minutes.",
    "mathRitualRule": "À partir du jeudi 17 septembre : rituel maths court, en principe deux fois par semaine hors journées d’évaluation. Toujours la même structure : 1 nombre jusqu’à 999 à écrire en lettres + 1 addition à calculer."
  },
  "weeks": [
    {
      "id": "s1",
      "label": "Semaine 1",
      "start": "2026-09-01",
      "end": "2026-09-04",
      "theme": "Installation de la classe",
      "note": "Aucun devoir à la maison. On découvre les outils, le fonctionnement de la classe et Maître Hibou.",
      "items": []
    },
    {
      "id": "s2",
      "label": "Semaine 2",
      "start": "2026-09-07",
      "end": "2026-09-11",
      "theme": "Évaluations nationales et routines légères",
      "note": "Les évaluations nationales ont occupé la semaine du 7 au 11 septembre. Les devoirs restent courts et ordinaires ; aucune préparation spécifique aux évaluations nationales n’est demandée.",
      "items": [
        {
          "due": "2026-09-08",
          "category": "lecture",
          "subject": "lecture",
          "subjectLabel": "Lecture",
          "icon": "📖",
          "action": "Je prépare ma lecture",
          "title": "Lecture — Je prépare ma lecture",
          "instruction": "Si tu as le petit texte travaillé lundi, relis-le à voix haute pendant quelques minutes. Sans le texte, raconte oralement ce dont tu te souviens : qui ? où ? que se passe-t-il ?",
          "help": "Cherche surtout à lire sans hésiter et à respecter les points. Sans cahier ni feuille, le rappel oral suffit.",
          "duration": 5,
          "classLink": "Lecture à voix haute · compréhension explicite",
          "routineIcon": "📖",
          "routineTitle": "Lecture — Je prépare ma lecture",
          "routine": "Si tu as le petit texte travaillé lundi, relis-le à voix haute pendant quelques minutes. Sans le texte, raconte oralement ce dont tu te souviens : qui ? où ? que se passe-t-il ?",
          "notion": "Lecture à voix haute · compréhension explicite",
          "challenge": "",
          "dictationStage": "first",
          "family": ""
        },
        {
          "due": "2026-09-10",
          "category": "preparation",
          "subject": "orthographe",
          "subjectLabel": "Orthographe",
          "icon": "📝",
          "action": "Je prépare les mots de la semaine",
          "title": "Orthographe — Je prépare les mots de la semaine",
          "instruction": "Lis les mots affichés ci-dessous, épelle les 5 mots prioritaires puis essaie d’en employer deux oralement dans une phrase.",
          "help": "La liste complète est affichée ici : aucun cahier n’est nécessaire.",
          "duration": 4,
          "classLink": "Mots fréquents · installation du rituel de dictée",
          "routineIcon": "📝",
          "routineTitle": "Orthographe — Je prépare les mots de la semaine",
          "routine": "Lis les mots affichés ci-dessous, épelle les 5 mots prioritaires puis essaie d’en employer deux oralement dans une phrase.",
          "notion": "Mots fréquents · installation du rituel de dictée",
          "challenge": "",
          "dictationStage": "final",
          "family": "",
          "hibou": {
            "label": "Trouver des compléments",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_math/lecons/complements.html",
            "intro": "Besoin d’aide ?"
          }
        },
        {
          "due": "2026-09-11",
          "category": "francais",
          "subject": "grammaire",
          "subjectLabel": "Grammaire",
          "icon": "🧩",
          "action": "Je revois la phrase",
          "title": "Grammaire — Je revois la phrase",
          "instruction": "Relis la leçon si tu as ton cahier. Puis explique oralement comment reconnaître une phrase.",
          "help": "Essaie sans cahier avec : « Le chien aboie. » · « Les élèves rangent leurs affaires. » Une phrase commence par une majuscule et se termine par un signe de ponctuation.",
          "duration": 5,
          "classLink": "Phrase · majuscule · ponctuation",
          "routineIcon": "🧩",
          "routineTitle": "Grammaire — Je revois la phrase",
          "routine": "Relis la leçon si tu as ton cahier. Puis explique oralement comment reconnaître une phrase.",
          "notion": "Phrase · majuscule · ponctuation",
          "challenge": "",
          "family": "",
          "hibou": {
            "label": "La phrase et la ponctuation",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-phrase-ponctuation.html",
            "intro": "Pour revoir la leçon si besoin :"
          }
        },
        {
          "due": "2026-09-14",
          "category": "lecture",
          "subject": "lecture",
          "subjectLabel": "Lecture",
          "icon": "📖",
          "action": "Je prépare ma lecture",
          "title": "Lecture — Je prépare ma lecture",
          "instruction": "Si tu as le passage indiqué en classe, lis-le à voix haute pendant environ 5 minutes. Sans le texte, raconte l’épisode ou l’idée principale avec tes mots.",
          "help": "Lis par groupes de mots et marque une petite pause aux signes de ponctuation.",
          "duration": 5,
          "classLink": "Fluence · groupes de sens",
          "routineIcon": "📖",
          "routineTitle": "Lecture — Je prépare ma lecture",
          "routine": "Si tu as le passage indiqué en classe, lis-le à voix haute pendant environ 5 minutes. Sans le texte, raconte l’épisode ou l’idée principale avec tes mots.",
          "notion": "Fluence · groupes de sens",
          "challenge": "",
          "family": ""
        }
      ]
    },
    {
      "id": "s3",
      "label": "Semaine 3",
      "start": "2026-09-14",
      "end": "2026-09-18",
      "theme": "Reprise complète des apprentissages",
      "note": "Les évaluations nationales sont terminées. On reprend un rythme ordinaire : lecture, français et mathématiques le matin, avec de courtes révisions à la maison.",
      "items": [
        {
          "due": "2026-09-15",
          "category": "lecture",
          "subject": "lecture",
          "subjectLabel": "Lecture",
          "icon": "📖",
          "action": "Je reformule",
          "title": "Lecture — Je reformule",
          "instruction": "Si tu as le texte travaillé en classe, relis-le. Puis dis oralement : qui sont les personnages ? où se passe l’histoire ? que se passe-t-il principalement ?",
          "help": "Sans le texte, raconte simplement ce dont tu te souviens. Une phrase par question suffit.",
          "duration": 5,
          "classLink": "Compréhension explicite · reformulation",
          "routineIcon": "📖",
          "routineTitle": "Lecture — Je reformule",
          "routine": "Si tu as le texte travaillé en classe, relis-le. Puis dis oralement : qui sont les personnages ? où se passe l’histoire ? que se passe-t-il principalement ?",
          "notion": "Compréhension explicite · reformulation",
          "challenge": "",
          "dictationStage": "first",
          "family": ""
        },
        {
          "due": "2026-09-17",
          "category": "preparation",
          "subject": "orthographe",
          "subjectLabel": "Orthographe",
          "icon": "📝",
          "action": "Je prépare ma dictée",
          "title": "Orthographe — Je prépare ma dictée",
          "instruction": "Revois les 10 mots de La Grande Muraille affichés ci-dessous. Épelle surtout les 5 mots prioritaires puis demande à quelqu’un de t’en faire retrouver 3 ou 4.",
          "help": "Tu peux lire le mot, le cacher, l’épeler puis vérifier. La liste est ici : pas besoin du cahier.",
          "duration": 5,
          "classLink": "Dictée · La Grande Muraille · 10 mots annoncés en classe",
          "routineIcon": "📝",
          "routineTitle": "Orthographe — Je prépare ma dictée",
          "routine": "Revois les 10 mots de La Grande Muraille affichés ci-dessous. Épelle surtout les 5 mots prioritaires puis demande à quelqu’un de t’en faire retrouver 3 ou 4.",
          "notion": "Dictée · La Grande Muraille · 10 mots annoncés en classe",
          "challenge": "",
          "dictationStage": "final",
          "family": "",
          "secondary": {
            "category": "maths",
            "subject": "maths",
            "subjectLabel": "Mathématiques",
            "icon": "➕",
            "action": "Je fais mon rituel maths",
            "title": "Rituel maths — Nombre + addition",
            "instruction": "Écris en lettres : 348. Puis calcule : 127 + 89.",
            "help": "Prends ton temps : pour le nombre, pense centaines, dizaines, unités. Pour l’addition, aligne bien les chiffres si tu la poses.",
            "duration": 5,
            "classLink": "Numération jusqu’à 999 · addition"
          }
        },
        {
          "due": "2026-09-18",
          "category": "francais",
          "subject": "grammaire",
          "subjectLabel": "Grammaire",
          "icon": "🧩",
          "action": "Je revois le verbe et son infinitif",
          "title": "Grammaire — Le verbe et son infinitif",
          "instruction": "Relis la leçon si tu as ton cahier. Puis, à l’oral, trouve le verbe conjugué et donne son infinitif.",
          "help": "Essaie avec : « Il chante. » → chanter · « Nous regardons. » → regarder · « Lina joue. » → jouer.",
          "duration": 5,
          "classLink": "Verbe conjugué · infinitif",
          "routineIcon": "🧩",
          "routineTitle": "Grammaire — Le verbe et son infinitif",
          "routine": "Trouve le verbe conjugué dans une phrase puis donne son infinitif.",
          "notion": "Verbe conjugué · infinitif",
          "challenge": "",
          "family": ""
        },
        {
          "due": "2026-09-21",
          "category": "lecture",
          "subject": "lecture",
          "subjectLabel": "Lecture",
          "icon": "📖",
          "action": "Je prépare ma lecture",
          "title": "Lecture — Je prépare ma lecture",
          "instruction": "Si tu as le passage indiqué, relis-le à voix haute pendant 5 minutes. Sans le texte, raconte l’essentiel de la lecture précédente.",
          "help": "Cherche à lire sans hésiter, par groupes de mots, en respectant la ponctuation.",
          "duration": 5,
          "classLink": "Fluence · compréhension",
          "routineIcon": "📖",
          "routineTitle": "Lecture — Je prépare ma lecture",
          "routine": "Si tu as le passage indiqué, relis-le à voix haute pendant 5 minutes. Sans le texte, raconte l’essentiel de la lecture précédente.",
          "notion": "Fluence · compréhension",
          "challenge": "",
          "family": ""
        }
      ]
    },
    {
      "id": "s4",
      "label": "Semaine 4",
      "start": "2026-09-21",
      "end": "2026-09-25",
      "theme": "Le verbe, la comparaison des nombres et le calcul mental",
      "items": [
        {
          "due": "2026-09-22",
          "category": "preparation",
          "subject": "orthographe",
          "subjectLabel": "Orthographe",
          "icon": "📝",
          "action": "Je revois les mots fréquents",
          "title": "Orthographe — Je revois les mots fréquents",
          "instruction": "Relis les mots fréquents et invariables travaillés lundi en classe. Choisis-en 5, épelle-les puis emploie-en deux oralement dans une phrase.",
          "help": "3 à 4 minutes suffisent. Le but est de consolider les mots réellement rencontrés en classe.",
          "duration": 4,
          "classLink": "Orthographe · mots fréquents et mots invariables de la semaine",
          "routineIcon": "📝",
          "routineTitle": "Orthographe — Je revois les mots fréquents",
          "routine": "Relis les mots fréquents et invariables travaillés lundi en classe. Choisis-en 5, épelle-les puis emploie-en deux oralement dans une phrase.",
          "notion": "Orthographe · mots fréquents et mots invariables de la semaine",
          "challenge": "",
          "secondary": {
            "category": "maths",
            "subject": "maths",
            "subjectLabel": "Mathématiques",
            "icon": "➕",
            "action": "Je fais mon rituel maths",
            "title": "Rituel maths — Nombre + addition",
            "instruction": "Écris en lettres : 271. Puis calcule : 134 + 52.",
            "help": "Prends ton temps : pour le nombre, pense centaines, dizaines, unités. Pour l’addition, aligne bien les chiffres si tu la poses.",
            "duration": 5,
            "classLink": "Numération jusqu’à 999 · addition"
          },
          "family": "Si vous avez envie : calcul éclair. Un adulte propose 3 calculs avec +9 ou −9, puis vous échangez les rôles."
        },
        {
          "due": "2026-09-24",
          "category": "francais",
          "subject": "grammaire",
          "subjectLabel": "Grammaire",
          "icon": "🧩",
          "action": "Je revois le verbe",
          "title": "Grammaire — Je revois le verbe",
          "instruction": "Relis la leçon si tu as ton cahier. Puis explique oralement comment reconnaître le verbe dans une phrase.",
          "help": "Essaie avec : « Le chien aboie. » · « Les élèves rangent leurs affaires. » · « Mon frère joue au ballon. »",
          "duration": 5,
          "classLink": "Identifier le verbe",
          "routineIcon": "🧩",
          "routineTitle": "Grammaire — Je revois le verbe",
          "routine": "Relis la leçon si tu as ton cahier. Puis explique oralement comment reconnaître le verbe dans une phrase.",
          "notion": "Identifier le verbe",
          "challenge": "",
          "family": "Si vous avez envie : mime le verbe. Quelqu’un mime une action ; donne le verbe, puis inversez les rôles.",
          "hibou": {
            "label": "Le verbe",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-verbe.html",
            "intro": "Pour revoir la leçon si besoin :"
          },
          "secondary": {
            "category": "maths",
            "subject": "maths",
            "subjectLabel": "Mathématiques",
            "icon": "➕",
            "action": "Je fais mon rituel maths",
            "title": "Rituel maths — Nombre + addition",
            "instruction": "Écris en lettres : 496. Puis calcule : 248 + 37.",
            "help": "Prends ton temps : pour le nombre, pense centaines, dizaines, unités. Pour l’addition, aligne bien les chiffres si tu la poses.",
            "duration": 5,
            "classLink": "Numération jusqu’à 999 · addition"
          }
        },
        {
          "due": "2026-09-25",
          "category": "francais",
          "subject": "grammaire",
          "subjectLabel": "Grammaire",
          "icon": "🧩",
          "action": "Je revois l’infinitif",
          "title": "Grammaire — Je revois l’infinitif",
          "instruction": "Explique oralement la différence entre un verbe conjugué et son infinitif.",
          "help": "Essaie avec : il chante → chanter · nous regardons → regarder · elles jouent → jouer.",
          "duration": 4,
          "classLink": "Verbe conjugué · infinitif",
          "routineIcon": "🧩",
          "routineTitle": "Grammaire — Je revois l’infinitif",
          "routine": "Explique oralement la différence entre un verbe conjugué et son infinitif.",
          "notion": "Verbe conjugué · infinitif",
          "challenge": "",
          "family": "Si vous avez envie : la machine à verbes. Un adulte dit « nous chantons », tu réponds « chanter », puis échangez les rôles.",
          "hibou": {
            "label": "Le verbe",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-verbe.html",
            "intro": "Pour revoir la leçon si besoin :"
          }
        }
      ]
    },
    {
      "id": "s5",
      "label": "Semaine 5",
      "start": "2026-09-28",
      "end": "2026-10-02",
      "theme": "Infinitif, sujet, mesure et compléments à 100",
      "items": [
        {
          "due": "2026-09-29",
          "category": "francais",
          "subject": "grammaire",
          "subjectLabel": "Grammaire",
          "icon": "🧩",
          "action": "Je revois l’infinitif",
          "title": "Grammaire — Je revois l’infinitif",
          "instruction": "Donne oralement l’infinitif de : je chante · nous regardons · ils jouent. Puis invente un autre exemple.",
          "help": "Si tu hésites, utilise « il faut… » : il faut chanter, il faut regarder, il faut jouer.",
          "duration": 4,
          "classLink": "Verbe conjugué · infinitif",
          "routineIcon": "🧩",
          "routineTitle": "Grammaire — Je revois l’infinitif",
          "routine": "Donne oralement l’infinitif de : je chante · nous regardons · ils jouent. Puis invente un autre exemple.",
          "notion": "Verbe conjugué · infinitif",
          "challenge": "",
          "family": "Si vous avez envie : la machine à verbes. Un adulte dit une forme conjuguée, tu donnes l’infinitif ; puis échangez les rôles.",
          "hibou": {
            "label": "Le verbe",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-verbe.html",
            "intro": "Pour revoir la leçon si besoin :"
          },
          "secondary": {
            "category": "maths",
            "subject": "maths",
            "subjectLabel": "Mathématiques",
            "icon": "➕",
            "action": "Je fais mon rituel maths",
            "title": "Rituel maths — Nombre + addition",
            "instruction": "Écris en lettres : 580. Puis calcule : 156 + 124.",
            "help": "Prends ton temps : pour le nombre, pense centaines, dizaines, unités. Pour l’addition, aligne bien les chiffres si tu la poses.",
            "duration": 5,
            "classLink": "Numération jusqu’à 999 · addition"
          }
        },
        {
          "due": "2026-10-01",
          "category": "maths",
          "subject": "maths",
          "subjectLabel": "Mathématiques",
          "icon": "➕",
          "action": "Je fais mon rituel maths",
          "title": "Rituel maths — Nombre + addition",
          "instruction": "Écris en lettres : 714. Puis calcule : 275 + 48.",
          "help": "Prends ton temps : pour le nombre, pense centaines, dizaines, unités. Pour l’addition, aligne bien les chiffres si tu la poses.",
          "duration": 5,
          "classLink": "Numération jusqu’à 999 · addition",
          "routineIcon": "➕",
          "routineTitle": "Rituel maths — Nombre + addition",
          "routine": "Écris en lettres : 714. Puis calcule : 275 + 48.",
          "notion": "Écrire un nombre en lettres · calculer une addition",
          "challenge": "",
          "family": ""
        },
        {
          "due": "2026-10-02",
          "category": "maths",
          "subject": "calcul-mental",
          "subjectLabel": "Calcul mental",
          "icon": "➕",
          "action": "Je réactive",
          "title": "Calcul mental — Je réactive",
          "instruction": "Complète oralement : 20 → ? · 35 → ? · 70 → ? · 85 → ? pour arriver à 100.",
          "help": "Exemple : de 35 à 100, il manque 65.",
          "duration": 3,
          "classLink": "Compléments à 100",
          "routineIcon": "➕",
          "routineTitle": "Calcul mental — Je réactive",
          "routine": "Complète oralement : 20 → ? · 35 → ? · 70 → ? · 85 → ? pour arriver à 100.",
          "notion": "Compléments à 100",
          "challenge": "",
          "secondary": {
            "category": "francais",
            "subject": "grammaire",
            "subjectLabel": "Grammaire",
            "icon": "🧩",
            "action": "Je revois le sujet",
            "title": "Grammaire — Je revois le sujet",
            "instruction": "Trouve le sujet : « Le petit chien court. » · « Les enfants chantent. » · « Ma sœur et moi préparons le repas. »",
            "help": "Demande-toi : qui est-ce qui fait l’action ?",
            "duration": 3,
            "classLink": "Groupe sujet"
          },
          "family": "Si vous avez envie : change le sujet. Quelqu’un dit « Le chien court. » Remplace le sujet et redis la phrase ; écoutez ce qui change.",
          "hibou": {
            "label": "Le sujet du verbe",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-sujet-verbe.html",
            "intro": "Pour revoir la leçon si besoin :"
          }
        },
        {
          "due": "2026-10-02",
          "category": "famille",
          "subject": "information",
          "subjectLabel": "Information",
          "icon": "📌",
          "action": "Je regarde ce qui arrive",
          "title": "À venir — évaluations de la semaine prochaine",
          "instruction": "Information seulement : histoire lundi, compréhension mardi, lexique et mathématiques vendredi. Aucun devoir supplémentaire n’est demandé aujourd’hui.",
          "help": "Les rappels courts seront proposés au bon moment. Rien de nouveau n’est à apprendre.",
          "duration": 0,
          "classLink": "Annonce anticipée · informations aux familles",
          "routineIcon": "🧠",
          "routineTitle": "Préparation — Je regarde ce qui arrive",
          "routine": "Information seulement : histoire lundi, compréhension mardi, lexique et mathématiques vendredi. Aucun devoir supplémentaire n’est demandé aujourd’hui.",
          "notion": "Annonce anticipée · informations aux familles",
          "challenge": "",
          "family": "",
          "evaluations": [
            {
              "date": "2026-10-05",
              "announceOn": "2026-10-02",
              "subject": "Histoire",
              "title": "Frise chronologique — première trace de référence",
              "newSkills": [
                "construire et lire une frise chronologique",
                "reconnaître les grandes périodes historiques"
              ],
              "preparation": "Revoir simplement la frise et le nom des grandes périodes. Quelques minutes suffisent."
            },
            {
              "date": "2026-10-06",
              "announceOn": "2026-10-02",
              "subject": "Français",
              "title": "Compréhension P1 — Le carnet retrouvé",
              "newSkills": [
                "identifier les personnages",
                "retrouver une information explicite"
              ],
              "preparation": "Relire tranquillement un petit texte et s’entraîner à retrouver les informations écrites clairement."
            },
            {
              "date": "2026-10-09",
              "announceOn": "2026-10-02",
              "subject": "Français",
              "title": "Lexique P1 — Classer des mots et ordre alphabétique",
              "newSkills": [
                "classer des mots qui vont ensemble",
                "ranger des mots dans l’ordre alphabétique"
              ],
              "preparation": "Revoir les petits exercices de classement et d’ordre alphabétique faits en classe."
            },
            {
              "date": "2026-10-09",
              "announceOn": "2026-10-02",
              "subject": "Mathématiques",
              "title": "Problèmes / calcul — première trace de référence",
              "newSkills": [
                "comprendre ce que l’on cherche dans un problème",
                "poser correctement une addition"
              ],
              "preparation": "Un problème très court et une addition posée suffisent.",
              "hibou": [
                {
                  "label": "Résoudre un problème de parties et de tout",
                  "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_math/lecons/problemes-additifs.html"
                },
                {
                  "label": "Poser une addition",
                  "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_math/lecons/addition-posee.html"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "s6",
      "label": "Semaine 6",
      "start": "2026-10-05",
      "end": "2026-10-09",
      "theme": "Consolider et préparer les petites évaluations",
      "items": [
        {
          "due": "2026-10-08",
          "category": "maths",
          "subject": "maths",
          "subjectLabel": "Mathématiques",
          "icon": "➕",
          "action": "Je fais mon rituel maths",
          "title": "Rituel maths — Nombre + addition",
          "instruction": "Écris en lettres : 609. Puis calcule : 368 + 157.",
          "help": "Prends ton temps : pour le nombre, pense centaines, dizaines, unités. Pour l’addition, aligne bien les chiffres si tu la poses.",
          "duration": 5,
          "classLink": "Numération jusqu’à 999 · addition",
          "routineIcon": "➕",
          "routineTitle": "Rituel maths — Nombre + addition",
          "routine": "Écris en lettres : 609. Puis calcule : 368 + 157.",
          "notion": "Écrire un nombre en lettres · calculer une addition",
          "challenge": "",
          "family": ""
        },
        {
          "due": "2026-10-08",
          "category": "preparation",
          "subject": "orthographe",
          "subjectLabel": "Orthographe",
          "icon": "📝",
          "action": "Je prépare ma dictée",
          "title": "Orthographe — Je prépare ma dictée",
          "instruction": "Revois les 10 mots de La Grande Muraille affichés ci-dessous. Épelle les 5 prioritaires puis fais-toi interroger oralement sur 3 ou 4 mots.",
          "help": "Lis → cache → épelle → vérifie. Quelques minutes suffisent.",
          "duration": 4,
          "classLink": "Bilan des mots appris · La Grande Muraille · lundi 12 octobre",
          "routineIcon": "📝",
          "routineTitle": "Orthographe — Je prépare ma dictée",
          "routine": "Revois les 10 mots de La Grande Muraille affichés ci-dessous. Épelle les 5 prioritaires puis fais-toi interroger oralement sur 3 ou 4 mots.",
          "notion": "Bilan des mots appris · La Grande Muraille · lundi 12 octobre",
          "challenge": "",
          "dictationStage": "final",
          "family": "Si vous avez envie : 5 calculs chacun. Un adulte pose 5 calculs, puis l’enfant en propose 5.",
          "hibou": {
            "label": "Trouver des compléments",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_math/lecons/complements.html",
            "intro": "Besoin d’aide ?"
          }
        },
        {
          "due": "2026-10-09",
          "category": "famille",
          "subject": "information",
          "subjectLabel": "Information",
          "icon": "📌",
          "action": "Je regarde ce qui arrive",
          "title": "À venir — évaluations de la semaine prochaine",
          "instruction": "Information seulement : lundi, bilan des mots de La Grande Muraille ; jeudi, sciences ; vendredi, géographie. Aucun devoir supplémentaire n’est demandé aujourd’hui.",
          "help": "Les rappels courts seront proposés au bon moment. Il n’y a rien de nouveau à apprendre.",
          "duration": 0,
          "classLink": "Annonce anticipée · informations aux familles",
          "routineIcon": "🧠",
          "routineTitle": "Préparation — Je regarde ce qui arrive",
          "routine": "Information seulement : lundi, bilan des mots de La Grande Muraille ; jeudi, sciences ; vendredi, géographie. Aucun devoir supplémentaire n’est demandé aujourd’hui.",
          "notion": "Annonce anticipée · informations aux familles",
          "challenge": "",
          "family": "",
          "evaluations": [
            {
              "date": "2026-10-12",
              "announceOn": "2026-10-09",
              "subject": "Français",
              "title": "Bilan des mots appris — La Grande Muraille",
              "newSkills": [
                "écrire correctement les 10 mots annoncés et travaillés"
              ],
              "preparation": "Revoir : une frontière, une invasion, le nord, une structure, l’homme, une longueur, une tour de guet, important, contre, jamais."
            },
            {
              "date": "2026-10-15",
              "announceOn": "2026-10-09",
              "subject": "Sciences",
              "title": "Eau et huile — observation et conclusion",
              "newSkills": [
                "observer précisément les résultats d’une expérience",
                "tirer une conclusion à partir des résultats"
              ],
              "preparation": "Aucune fiche à apprendre : réexpliquer simplement une expérience réellement menée en classe suffit."
            },
            {
              "date": "2026-10-16",
              "announceOn": "2026-10-09",
              "subject": "Géographie",
              "title": "France et population — lecture de carte",
              "newSkills": [
                "localiser la France à différentes échelles",
                "lire une carte simple de répartition de la population"
              ],
              "preparation": "Revoir seulement les cartes utilisées en classe et les deux compétences annoncées."
            }
          ]
        }
      ]
    },
    {
      "id": "s7",
      "label": "Semaine 7",
      "start": "2026-10-12",
      "end": "2026-10-16",
      "theme": "Consolider et valoriser les progrès",
      "items": [
        {
          "due": "2026-10-13",
          "category": "maths",
          "subject": "maths",
          "subjectLabel": "Mathématiques",
          "icon": "➕",
          "action": "Je fais mon rituel maths",
          "title": "Rituel maths — Nombre + addition",
          "instruction": "Écris en lettres : 875. Puis calcule : 425 + 286.",
          "help": "Prends ton temps : pour le nombre, pense centaines, dizaines, unités. Pour l’addition, aligne bien les chiffres si tu la poses.",
          "duration": 5,
          "classLink": "Numération jusqu’à 999 · addition",
          "routineIcon": "➕",
          "routineTitle": "Rituel maths — Nombre + addition",
          "routine": "Écris en lettres : 875. Puis calcule : 425 + 286.",
          "notion": "Écrire un nombre en lettres · calculer une addition",
          "challenge": "",
          "family": ""
        },
        {
          "due": "2026-10-13",
          "category": "preparation",
          "subject": "sciences",
          "subjectLabel": "Sciences",
          "icon": "🔬",
          "action": "J’explique une expérience",
          "title": "Sciences — J’explique une expérience",
          "instruction": "Réexplique oralement une expérience faite en classe : qu’avons-nous fait ? qu’as-tu observé ? quelle conclusion peut-on tirer ?",
          "help": "Sans cahier, utilise seulement tes souvenirs. Une réponse courte et claire suffit.",
          "duration": 4,
          "classLink": "Préparation évaluation jeudi · observer et conclure",
          "routineIcon": "🔬",
          "routineTitle": "Sciences — J’explique une expérience",
          "routine": "Réexplique oralement une expérience faite en classe : qu’avons-nous fait ? qu’as-tu observé ? quelle conclusion peut-on tirer ?",
          "notion": "Préparation évaluation jeudi · observer et conclure",
          "challenge": "",
          "family": ""
        },
        {
          "due": "2026-10-15",
          "category": "preparation",
          "subject": "geographie",
          "subjectLabel": "Géographie",
          "icon": "🌍",
          "action": "Je revois une carte",
          "title": "Géographie — Je revois une carte",
          "instruction": "Si tu as une carte de classe, observe-la : localise la France puis prélève une information simple. Sans carte, explique oralement où se situe la France et ce qu’une carte peut nous apprendre.",
          "help": "Le but n’est pas de réciter une fiche mais de savoir lire et expliquer une carte simple.",
          "duration": 4,
          "classLink": "Préparation évaluation vendredi · localiser · lire une carte",
          "routineIcon": "🌍",
          "routineTitle": "Géographie — Je revois une carte",
          "routine": "Si tu as une carte de classe, observe-la : localise la France puis prélève une information simple. Sans carte, explique oralement où se situe la France et ce qu’une carte peut nous apprendre.",
          "notion": "Préparation évaluation vendredi · localiser · lire une carte",
          "challenge": "",
          "family": ""
        }
      ],
      "holiday": "Vacances : lire pour le plaisir. Rien à rendre."
    }
  ]
};
