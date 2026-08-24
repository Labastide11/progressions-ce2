// V34.97 — Refonte P1 : moteur annuel commun, consignes autonomes et lien classe → maison.
window.DEVOIRS_P1 = {
  "version": "34.97",
  "period": "p1",
  "schoolYear": "2026-2027",
  "principles": {
    "start": "2026-09-07",
    "maxMinutes": 10,
    "writtenWork": false,
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
    "autonomyRule": "Le cahier est une aide, jamais une condition : chaque devoir propose une solution de repli sans cahier."
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
      "theme": "Installer tranquillement la routine",
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
          "secondary": {
            "category": "maths",
            "subject": "calcul-mental",
            "subjectLabel": "Calcul mental",
            "icon": "➕",
            "action": "Je réactive",
            "title": "Calcul mental — Je réactive",
            "instruction": "Complète oralement : 7 + ? = 10 · 6 + ? = 10 · 9 + ? = 10 · 3 + ? = 10.",
            "help": "Tu peux montrer 10 avec tes doigts si besoin.",
            "duration": 2,
            "classLink": "Compléments à 10"
          },
          "family": "Si vous avez envie : « Fais 10 ! » Un adulte annonce un nombre entre 1 et 9 ; l’enfant donne son complément à 10, puis on échange les rôles.",
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
          "secondary": {
            "category": "francais",
            "subject": "grammaire",
            "subjectLabel": "Grammaire",
            "icon": "🧩",
            "action": "Je manipule",
            "title": "Grammaire — Je manipule",
            "instruction": "Choisis oralement le bon signe : « Quel âge as-tu… » · « Je vais à l’école… » · « Attention… »",
            "help": "Dis pourquoi tu choisis ?, . ou !",
            "duration": 2,
            "classLink": "Ponctuation"
          },
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
          "family": "Si vous avez envie : lecture duo. L’adulte lit une phrase, puis l’enfant lit la suivante."
        }
      ]
    },
    {
      "id": "s3",
      "label": "Semaine 3",
      "start": "2026-09-14",
      "end": "2026-09-18",
      "theme": "Compréhension, numération et automatismes",
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
          "family": "Si vous avez envie : le nombre mystère. Un adulte choisit un nombre entre 1 000 et 10 000 et donne trois indices ; puis on échange les rôles."
        },
        {
          "due": "2026-09-17",
          "category": "preparation",
          "subject": "orthographe",
          "subjectLabel": "Orthographe",
          "icon": "📝",
          "action": "Je prépare ma dictée",
          "title": "Orthographe — Je prépare ma dictée",
          "instruction": "Revois tous les mots de la dictée affichés ci-dessous. Épelle surtout les 5 mots prioritaires puis demande à quelqu’un de t’en faire retrouver 3 ou 4.",
          "help": "Tu peux lire le mot, le cacher, l’épeler puis vérifier. La liste est ici : pas besoin du cahier.",
          "duration": 5,
          "classLink": "Dictée · Le cheval et le fermier · mots du corpus",
          "routineIcon": "📝",
          "routineTitle": "Orthographe — Je prépare ma dictée",
          "routine": "Revois tous les mots de la dictée affichés ci-dessous. Épelle surtout les 5 mots prioritaires puis demande à quelqu’un de t’en faire retrouver 3 ou 4.",
          "notion": "Dictée · Le cheval et le fermier · mots du corpus",
          "challenge": "",
          "dictationStage": "final",
          "secondary": {
            "category": "maths",
            "subject": "calcul-mental",
            "subjectLabel": "Calcul mental",
            "icon": "➕",
            "action": "Je réactive",
            "title": "Calcul mental — Je réactive",
            "instruction": "Complète oralement : 70 + ? = 100 · 40 + ? = 100 · 90 + ? = 100 · 65 + ? = 100.",
            "help": "Cherche d’abord combien il manque pour arriver à la dizaine suivante, puis à 100.",
            "duration": 3,
            "classLink": "Compléments à 100"
          },
          "family": "Si vous avez envie : objectif 100. Un adulte annonce un nombre, l’enfant donne ce qu’il faut ajouter pour faire 100 ; puis on échange les rôles.",
          "hibou": {
            "label": "Trouver des compléments",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_math/lecons/complements.html",
            "intro": "Besoin d’aide ?"
          }
        },
        {
          "due": "2026-09-18",
          "category": "francais",
          "subject": "grammaire",
          "subjectLabel": "Grammaire",
          "icon": "🧩",
          "action": "Je revois les formes de phrases",
          "title": "Grammaire — Je revois les formes de phrases",
          "instruction": "Relis la leçon si tu as ton cahier. Puis explique oralement comment transformer une phrase affirmative en phrase négative.",
          "help": "Essaie avec : « Lina aime les pommes. » · « Nous jouons dehors. » · « Il regarde la télévision. »",
          "duration": 5,
          "classLink": "Phrase affirmative · phrase négative",
          "routineIcon": "🧩",
          "routineTitle": "Grammaire — Je revois les formes de phrases",
          "routine": "Relis la leçon si tu as ton cahier. Puis explique oralement comment transformer une phrase affirmative en phrase négative.",
          "notion": "Phrase affirmative · phrase négative",
          "challenge": "",
          "family": "Si vous avez envie : dis le contraire. Un adulte donne une phrase affirmative ; transforme-la à la forme négative, puis inversez les rôles.",
          "hibou": {
            "label": "Les formes de phrases",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-formes-phrases.html",
            "intro": "Pour revoir la leçon si besoin :"
          }
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
          "family": "Si vous avez envie : le journaliste. Après la lecture, quelqu’un pose seulement 3 questions : Qui ? Où ? Que s’est-il passé ?"
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
          "action": "Je commence à préparer ma dictée",
          "title": "Orthographe — Je commence à préparer ma dictée",
          "instruction": "Découvre ou revois les mots de la semaine affichés ci-dessous. Lis-les puis épelle les 5 mots prioritaires.",
          "help": "Ne cherche pas à tout apprendre d’un coup : 3 à 4 minutes suffisent aujourd’hui.",
          "duration": 4,
          "classLink": "Dictée · Les métiers · première mémorisation",
          "routineIcon": "📝",
          "routineTitle": "Orthographe — Je commence à préparer ma dictée",
          "routine": "Découvre ou revois les mots de la semaine affichés ci-dessous. Lis-les puis épelle les 5 mots prioritaires.",
          "notion": "Dictée · Les métiers · première mémorisation",
          "challenge": "",
          "dictationStage": "first",
          "secondary": {
            "category": "maths",
            "subject": "calcul-mental",
            "subjectLabel": "Calcul mental",
            "icon": "➕",
            "action": "Je réactive",
            "title": "Calcul mental — Je réactive",
            "instruction": "Calcule oralement : 24 + 9 · 31 + 9 · 52 − 9.",
            "help": "Pour +9, tu peux faire +10 puis −1. Pour −9, fais −10 puis +1.",
            "duration": 3,
            "classLink": "Ajouter / retrancher 9"
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
          "dictationStage": "final",
          "family": "Si vous avez envie : mime le verbe. Quelqu’un mime une action ; donne le verbe, puis inversez les rôles.",
          "hibou": {
            "label": "Le verbe",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-verbe.html",
            "intro": "Pour revoir la leçon si besoin :"
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
        },
        {
          "due": "2026-09-28",
          "category": "poesie",
          "subject": "poesie",
          "subjectLabel": "Poésie",
          "icon": "🎭",
          "action": "J’apprends progressivement",
          "title": "Poésie — J’apprends progressivement",
          "instruction": "Apprends seulement la première partie indiquée en classe. Lis-la plusieurs fois à voix haute puis essaie de la réciter sans regarder.",
          "help": "Si le cahier n’est pas disponible, récite simplement de mémoire la partie déjà apprise : aucun nouveau vers n’est exigé sans le texte.",
          "duration": 5,
          "classLink": "Poésie · mémorisation · mise en voix",
          "routineIcon": "🎭",
          "routineTitle": "Poésie — J’apprends progressivement",
          "routine": "Apprends seulement la première partie indiquée en classe. Lis-la plusieurs fois à voix haute puis essaie de la réciter sans regarder.",
          "notion": "Poésie · mémorisation · mise en voix",
          "challenge": "",
          "family": "Si vous avez envie : le mot disparu. Pendant la récitation, quelqu’un t’arrête et demande quel mot venait juste après."
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
          "dictationStage": "first",
          "family": "Si vous avez envie : la machine à verbes. Un adulte dit une forme conjuguée, tu donnes l’infinitif ; puis échangez les rôles.",
          "hibou": {
            "label": "Le verbe",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-verbe.html",
            "intro": "Pour revoir la leçon si besoin :"
          }
        },
        {
          "due": "2026-10-01",
          "category": "poesie",
          "subject": "poesie",
          "subjectLabel": "Poésie",
          "icon": "🎭",
          "action": "J’apprends progressivement",
          "title": "Poésie — J’apprends progressivement",
          "instruction": "Revois la première partie puis apprends la partie suivante indiquée en classe.",
          "help": "Commence par réciter ce que tu connais déjà. Si le cahier n’est pas disponible, n’apprends pas de nouveaux vers : consolide seulement la partie connue.",
          "duration": 5,
          "classLink": "Poésie · mémorisation progressive",
          "routineIcon": "🎭",
          "routineTitle": "Poésie — J’apprends progressivement",
          "routine": "Revois la première partie puis apprends la partie suivante indiquée en classe.",
          "notion": "Poésie · mémorisation progressive",
          "challenge": "",
          "dictationStage": "final",
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
          "due": "2026-10-03",
          "category": "preparation",
          "subject": "preparation",
          "subjectLabel": "Préparation",
          "icon": "🧠",
          "action": "Je regarde ce qui arrive",
          "title": "Préparation — Je regarde ce qui arrive",
          "instruction": "Trois petites évaluations sont annoncées à l’avance. Lis simplement les matières et ce qu’il faudra savoir faire. Les rappels courts arriveront au bon moment.",
          "help": "Il n’y a rien de nouveau à apprendre. L’objectif est seulement de savoir ce qui arrive et d’éviter les révisions de dernière minute.",
          "duration": 3,
          "classLink": "Annonce anticipée des évaluations",
          "routineIcon": "🧠",
          "routineTitle": "Préparation — Je regarde ce qui arrive",
          "routine": "Trois petites évaluations sont annoncées à l’avance. Lis simplement les matières et ce qu’il faudra savoir faire. Les rappels courts arriveront au bon moment.",
          "notion": "Annonce anticipée des évaluations",
          "challenge": "",
          "family": "",
          "evaluations": [
            {
              "date": "2026-10-05",
              "subject": "Histoire",
              "title": "Petite évaluation — 2 nouvelles compétences",
              "newSkills": [
                "utiliser une frise chronologique",
                "reconnaître les grandes périodes historiques"
              ],
              "preparation": "Revoir simplement la frise et le nom des grandes périodes. Quelques minutes suffisent."
            },
            {
              "date": "2026-10-06",
              "subject": "Français",
              "title": "Petite évaluation — 2 nouvelles compétences",
              "newSkills": [
                "repérer le verbe conjugué dans une phrase simple",
                "repérer le groupe sujet"
              ],
              "preparation": "Relire seulement les leçons « Le verbe » et « Le sujet du verbe », pendant le week-end ou la veille.",
              "hibou": [
                {
                  "label": "Le verbe",
                  "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-verbe.html"
                },
                {
                  "label": "Le sujet du verbe",
                  "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_lecons/lecons/grammaire-sujet-verbe.html"
                }
              ]
            },
            {
              "date": "2026-10-09",
              "subject": "Mathématiques",
              "title": "Petite évaluation — 2 nouvelles compétences",
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
          "due": "2026-10-07",
          "category": "preparation",
          "subject": "preparation",
          "subjectLabel": "Préparation",
          "icon": "🧠",
          "action": "Je prépare l’évaluation de mathématiques",
          "title": "Préparation — Je prépare l’évaluation de mathématiques",
          "instruction": "Explique oralement ce que l’on cherche dans un petit problème, puis pose une addition sur une feuille seulement si tu en as envie. Quelques minutes suffisent.",
          "help": "Sans feuille : invente un problème très court et explique quelle opération tu choisirais. Rien de nouveau à apprendre.",
          "duration": 5,
          "classLink": "Évaluation de vendredi · problème additif · addition posée",
          "routineIcon": "🧠",
          "routineTitle": "Préparation — Je prépare l’évaluation de mathématiques",
          "routine": "Explique oralement ce que l’on cherche dans un petit problème, puis pose une addition sur une feuille seulement si tu en as envie. Quelques minutes suffisent.",
          "notion": "Évaluation de vendredi · problème additif · addition posée",
          "challenge": "",
          "dictationStage": "first",
          "family": "",
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
        },
        {
          "due": "2026-10-08",
          "category": "preparation",
          "subject": "orthographe",
          "subjectLabel": "Orthographe",
          "icon": "📝",
          "action": "Je prépare ma dictée",
          "title": "Orthographe — Je prépare ma dictée",
          "instruction": "Revois les mots affichés ci-dessous. Épelle les 5 prioritaires puis fais-toi interroger oralement sur 3 ou 4 mots.",
          "help": "Lis → cache → épelle → vérifie. Quelques minutes suffisent.",
          "duration": 4,
          "classLink": "Dictée · La pluie · rappel avant bilan",
          "routineIcon": "📝",
          "routineTitle": "Orthographe — Je prépare ma dictée",
          "routine": "Revois les mots affichés ci-dessous. Épelle les 5 prioritaires puis fais-toi interroger oralement sur 3 ou 4 mots.",
          "notion": "Dictée · La pluie · rappel avant bilan",
          "challenge": "",
          "dictationStage": "final",
          "secondary": {
            "category": "maths",
            "subject": "calcul-mental",
            "subjectLabel": "Calcul mental",
            "icon": "➕",
            "action": "Je réactive",
            "title": "Calcul mental — Je réactive",
            "instruction": "Calcule oralement : 8 + ? = 10 · 60 + ? = 100 · 34 + 9 · 52 − 9.",
            "help": "Explique une stratégie, pas seulement la réponse.",
            "duration": 3,
            "classLink": "Automatismes de calcul P1"
          },
          "family": "Si vous avez envie : 5 calculs chacun. Un adulte pose 5 calculs, puis l’enfant en propose 5.",
          "hibou": {
            "label": "Trouver des compléments",
            "url": "https://labastide11.github.io/Maitre-Hibou/bibliotheque_math/lecons/complements.html",
            "intro": "Besoin d’aide ?"
          }
        },
        {
          "due": "2026-10-10",
          "category": "preparation",
          "subject": "preparation",
          "subjectLabel": "Préparation",
          "icon": "🧠",
          "action": "Je regarde ce qui arrive",
          "title": "Préparation — Je regarde ce qui arrive",
          "instruction": "Deux petites évaluations sont annoncées pour la semaine prochaine : sciences jeudi et géographie vendredi. Lis simplement ce qui sera observé.",
          "help": "Aucune fiche longue à apprendre. Des rappels courts et précis seront proposés mardi et mercredi.",
          "duration": 3,
          "classLink": "Annonce anticipée sciences · géographie",
          "routineIcon": "🧠",
          "routineTitle": "Préparation — Je regarde ce qui arrive",
          "routine": "Deux petites évaluations sont annoncées pour la semaine prochaine : sciences jeudi et géographie vendredi. Lis simplement ce qui sera observé.",
          "notion": "Annonce anticipée sciences · géographie",
          "challenge": "",
          "family": "",
          "evaluations": [
            {
              "date": "2026-10-15",
              "subject": "Sciences",
              "title": "Observation en situation — 2 nouvelles compétences",
              "newSkills": [
                "observer précisément les résultats d’une expérience",
                "tirer une conclusion à partir des résultats"
              ],
              "preparation": "Aucune fiche à apprendre : réexpliquer simplement une expérience réellement menée en classe suffit."
            },
            {
              "date": "2026-10-16",
              "subject": "Géographie",
              "title": "Petite évaluation — 2 nouvelles compétences",
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
          "subject": "calcul-mental",
          "subjectLabel": "Calcul mental",
          "icon": "➕",
          "action": "Je réactive une stratégie",
          "title": "Calcul mental — Je réactive une stratégie",
          "instruction": "Choisis une stratégie de calcul mental encore un peu difficile pour toi et explique-la oralement avec 3 à 5 petits calculs maximum.",
          "help": "Tu peux choisir : compléments à 10/100, +9 ou −9. Explique comment tu fais.",
          "duration": 4,
          "classLink": "Calcul mental · explicitation · consolidation",
          "routineIcon": "➕",
          "routineTitle": "Calcul mental — Je réactive une stratégie",
          "routine": "Choisis une stratégie de calcul mental encore un peu difficile pour toi et explique-la oralement avec 3 à 5 petits calculs maximum.",
          "notion": "Calcul mental · explicitation · consolidation",
          "challenge": "",
          "family": "Si vous avez envie : à toi de m’apprendre. Explique à quelqu’un une astuce de calcul apprise à l’école ; le parent joue l’élève et peut demander « Pourquoi ? »"
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
          "due": "2026-10-14",
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
