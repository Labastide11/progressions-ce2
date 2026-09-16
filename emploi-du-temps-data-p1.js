/* V36.78 — P1 : liens fiche élève + correction Sciences « L’air prend-il de la place ? » ajoutés au jeudi 17/09 + sciences rééquilibrées */
(function(global){
  'use strict';
  const data=global.PROGRESSIONS_EDT_DATA=global.PROGRESSIONS_EDT_DATA||{};
  data.p1Base = {
  "lundi": [
    [
      "9h–9h15",
      "Quoi de neuf ?",
      "Oral structuré",
      "french"
    ],
    [
      "9h15–10h",
      "Lecture-compréhension",
      "",
      "french"
    ],
    [
      "10h–10h45",
      "Dictée / orthographe / étude de la langue",
      "Majuscule intégrée dans le créneau ; aucune durée ajoutée",
      "french"
    ],
    [
      "10h45–11h",
      "Récréation",
      "",
      "break"
    ],
    [
      "11h–11h15",
      "Calcul mental",
      "Rituel court inclus dans le créneau",
      "maths"
    ],
    [
      "11h15–12h",
      "Mathématiques",
      "Nouvel apprentissage / entraînement",
      "maths"
    ],
    [
      "12h–14h",
      "Cantine ou repas à la maison",
      "Pause méridienne",
      "lunch"
    ],
    [
      "14h–14h15",
      "Quart d’heure de lecture",
      "Lecture autonome — retour au calme",
      "french"
    ],
    [
      "14h15–15h",
      "Histoire / QLM",
      "Classe entière",
      "history"
    ],
    [
      "15h–15h45",
      "EPS",
      "Séance de 45 min",
      "eps"
    ],
    [
      "15h45–16h",
      "Récréation",
      "",
      "break"
    ],
    [
      "16h–16h25",
      "Anglais",
      "",
      "english"
    ],
    [
      "16h25–17h",
      "EMC / méthodologie",
      "Vie de classe, autonomie, règles, coopération",
      "emc"
    ]
  ],
  "mardi": [
    [
      "9h–9h15",
      "Copie",
      "",
      "french"
    ],
    [
      "9h15–10h",
      "Lecture-compréhension",
      "",
      "french"
    ],
    [
      "10h–10h45",
      "Étude de la langue / production d’écrit",
      "DRAS, écrits courts et majuscule intégrée",
      "french"
    ],
    [
      "10h45–11h",
      "Récréation",
      "",
      "break"
    ],
    [
      "11h–11h15",
      "Calcul mental",
      "Rituel court inclus dans le créneau",
      "maths"
    ],
    [
      "11h15–12h",
      "Mathématiques",
      "Nouvel apprentissage / entraînement",
      "maths"
    ],
    [
      "12h–14h",
      "Cantine ou repas à la maison",
      "Pause méridienne",
      "lunch"
    ],
    [
      "14h–14h15",
      "Quart d’heure de lecture",
      "Lecture autonome — retour au calme",
      "french"
    ],
    [
      "14h15–14h45",
      "Chants / expression corporelle",
      "Chant collectif, jeux rythmiques et mouvements simples en lien avec la pulsation.",
      "arts"
    ],
    [
      "14h45–15h45",
      "CHAM / arts",
      "Non-CHAM : arts, projet, lecture culturelle ; aucune nouvelle notion fondamentale",
      "cham"
    ],
    [
      "15h45–16h",
      "Récréation",
      "",
      "break"
    ],
    [
      "16h–16h45",
      "CHAM / numérique / méthodologie",
      "Ateliers non fondamentaux",
      "cham"
    ],
    [
      "16h45–17h",
      "Bilan de journée",
      "Parole aux élèves et préparation du lendemain",
      "emc"
    ]
  ],
  "jeudi": [
    [
      "9h–9h15",
      "Devinette",
      "",
      "french"
    ],
    [
      "9h15–10h",
      "Lecture-compréhension",
      "",
      "french"
    ],
    [
      "10h–10h45",
      "Étude de la langue / vocabulaire / écrit court",
      "Majuscule intégrée ; contenus de français regroupés le matin",
      "french"
    ],
    [
      "10h45–11h",
      "Récréation",
      "",
      "break"
    ],
    [
      "11h–11h15",
      "Calcul mental",
      "Rituel court inclus dans le créneau",
      "maths"
    ],
    [
      "11h15–12h",
      "Mathématiques",
      "Nouvel apprentissage / entraînement",
      "maths"
    ],
    [
      "12h–14h",
      "Cantine ou repas à la maison",
      "Pause méridienne",
      "lunch"
    ],
    [
      "14h–14h15",
      "Quart d’heure de lecture",
      "Lecture autonome — retour au calme",
      "french"
    ],
    [
      "14h15–15h",
      "Sciences / QLM",
      "Classe entière",
      "science"
    ],
    [
      "15h–15h45",
      "Arts / musique / CHAM",
      "Pratique artistique ; aucune nouvelle notion fondamentale",
      "arts"
    ],
    [
      "15h45–16h",
      "Récréation",
      "",
      "break"
    ],
    [
      "16h–16h25",
      "Anglais",
      "Classe entière",
      "english"
    ],
    [
      "16h25–17h",
      "EMC / numérique / culture",
      "Pas de français ou maths nouveaux",
      "emc"
    ]
  ],
  "vendredi": [
    [
      "9h–9h30",
      "Un jour, une actu",
      "Oral, compréhension, EMI",
      "french"
    ],
    [
      "9h30–10h",
      "Lecture et vocabulaire",
      "",
      "french"
    ],
    [
      "10h–10h45",
      "Dictée / production d’écrit",
      "Réemploi, écrits courts, majuscule intégrée",
      "french"
    ],
    [
      "10h45–11h",
      "Récréation",
      "",
      "break"
    ],
    [
      "11h–11h15",
      "Calcul mental",
      "Rituel court inclus dans le créneau",
      "maths"
    ],
    [
      "11h15–12h",
      "Mathématiques",
      "Problèmes / géométrie / mesures / fractions selon la progression",
      "maths"
    ],
    [
      "12h–14h",
      "Cantine ou repas à la maison",
      "Pause méridienne",
      "lunch"
    ],
    [
      "14h–14h15",
      "Quart d’heure de lecture",
      "Lecture autonome — retour au calme",
      "french"
    ],
    [
      "14h15–15h15",
      "EPS",
      "Séance de 60 min maximum",
      "eps"
    ],
    [
      "15h15–15h45",
      "Arts / projet / lecture documentaire",
      "Activité non fondamentale",
      "arts"
    ],
    [
      "15h45–16h",
      "Récréation",
      "",
      "break"
    ],
    [
      "16h–16h40",
      "Géographie / Histoire",
      "QLM espace / temps",
      "history"
    ],
    [
      "16h40–17h",
      "EMC / conseil",
      "Bilan et vie collective",
      "emc"
    ]
  ]
};
  data.p1DetailedWeeks = [
  {
    "key": "p1r1",
    "title": "Semaine 1 — Accueillir, installer les routines et observer",
    "dates": "Du mardi 1er au vendredi 4 septembre 2026",
    "focus": "Prendre le temps d'accueillir la classe, installer les outils et les habitudes de travail, observer les acquis sans lancer d'évaluation lourde.",
    "days": [
      [
        "Mardi 1 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Accueil, présentation de la classe et premiers échanges.",
            "OR-P1-01 · Écouter une consigne jusqu’au bout ; OR-P1-03 · Respecter les règles d’un échange.",
            "french",
            "Observation de rentrée"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture-compréhension : découvrir un texte court et échanger sur ce qui a été compris.",
            "LEC-P1-01 · Décoder un mot inconnu ; COM-P1-01 · Identifier les personnages.",
            "french",
            "Observation diagnostique légère",
            null,
            {
              "documents": [
                {
                  "titre": "La nouvelle école",
                  "url": "https://drive.google.com/file/d/10FaGFzRs5MB-lyOt7vwrnw3oG_fI8TAb/view",
                  "type": "pdf"
                }
              ]
            }
          ],
          [
            "10h–10h25",
            "Français — Copie",
            "Cahier du jour — Découverte du cahier, installation de la date et copie courte soignée.",
            "ECR-P1-01 · Copier sans erreur ; ECR-P1-04 · Se relire.",
            "french",
            "Observation — copie"
          ],
          [
            "10h25–10h45",
            "Français — Écrits courts",
            "Mon cahier d’écrivain — Trois mots pour ma rentrée : choisir 3 mots parmi content, école, copains, classe, maître, cartable, jouer, apprendre, découvrir, revoir, puis construire une phrase complète. Exemple : « content – copains – classe » → « Je suis content de retrouver mes copains dans ma nouvelle classe. » Relire puis améliorer la phrase avec un premier geste DRAS simple : ajouter un mot ou remplacer un mot.",
            "ECR-P1-05 · Écrire une phrase correcte.",
            "french",
            "Premier écrit"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Suite numérique jusqu’à 100 : compter en avant à partir de 1 puis d’un nombre donné, en franchissant les dizaines.",
            "Réactivation CE1 — Maîtriser la suite numérique jusqu’à 100.",
            "maths",
            "Repérage sans note"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Numération : lire, écrire, comparer et ranger des nombres.",
            "NUM-P1-01 · Lire des nombres jusqu’à 999 ; NUM-P1-02 · Écrire des nombres jusqu’à 999 ; NUM-P1-04 · Comparer deux nombres.",
            "maths",
            "Manipulation / ardoise"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou.<br>🦉 <strong>Ritej · Sayf · Khadidja · Rayan</strong><br>2 tablettes + 2 PC ; les autres lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Éducation musicale — chants / expression corporelle",
            "Après le quart d’heure de lecture : échauffement vocal, chant collectif, jeux rythmiques et mouvements simples pour sentir et maintenir la pulsation.",
            "MUS-ANN-01 · Chanter avec justesse et expressivité ; MUS-ANN-02 · Écouter et tenir sa place dans une production collective ; mobiliser le corps pour suivre une pulsation.",
            "arts",
            "Pratique collective"
          ],
          [
            "14h45–15h45",
            "Vie de classe / arts",
            "Découvrir les espaces, construire les règles de vie et réaliser une première production collective.",
            "EMC-P1-01 · Comprendre et respecter les règles de la classe.",
            "arts",
            "Classe entière — aucune notion nouvelle indispensable"
          ],
          [
            "16h–16h45",
            "Pages de garde des cahiers",
            "Coloriage et mise en couleur des pages de garde des cahiers ; prendre le temps de soigner et personnaliser ses outils.",
            "Compétences transversales : soin, autonomie et organisation du matériel.",
            "arts",
            "Activité calme de fin de journée"
          ],
          [
            "16h45–17h",
            "Temps d’échange avec la classe",
            "Échanger librement sur cette première journée : impressions, questions, réussites et besoins pour le lendemain.",
            "OR-P1-03 · Respecter les règles d’un échange ; OR-P1-04 · Prendre la parole de façon compréhensible.",
            "emc",
            "Échange collectif"
          ]
        ]
      ],
      [
        "Jeudi 3 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Rituel Devinette — 3 nouvelles : 1) Cartable : « Je t’accompagne tous les jours ; je transporte cahiers et trousse. » 2) Trousse : « Je suis souvent dans le cartable ; je garde crayons, gomme et ciseaux. » 3) Cahier : « J’ai beaucoup de pages ; on écrit sur moi toute l’année. »",
            "OR-P1-01 ; OR-P1-03.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture-compréhension : repérer personnages, lieu et informations explicites.",
            "COM-P1-01 · Identifier les personnages ; COM-P1-02 · Repérer le lieu et le moment.",
            "french",
            "Trace très courte",
            null,
            {
              "documents": [
                {
                  "titre": "La nouvelle école",
                  "url": "https://drive.google.com/file/d/10FaGFzRs5MB-lyOt7vwrnw3oG_fI8TAb/view",
                  "type": "pdf"
                }
              ]
            }
          ],
          [
            "10h–10h25",
            "Français — Dictée",
            "Cahier du jour — Dictée diagnostique très courte puis correction collective raisonnée.",
            "ORT-P1-01 · Transcrire les sons d’un mot.",
            "french",
            "Diagnostic sans note"
          ],
          [
            "10h25–10h45",
            "Français — Production d’écrits",
            "Mon cahier d’écrivain — Reprendre la phrase déjà écrite dans « Trois mots pour ma rentrée ». Relire l’exemple de départ si nécessaire : « content – copains – classe » → « Je suis content de retrouver mes copains dans ma nouvelle classe. » Montrer un seul geste DRAS : ajouter une précision OU remplacer un mot par un mot plus précis. Chaque élève améliore ensuite sa propre phrase et la recopie avec majuscule et point.",
            "ECR-P1-05 · Écrire une phrase correcte ; ECR-P1-06 · Améliorer un écrit court.",
            "french",
            "Premier écrit — DRAS"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Suite numérique jusqu’à 100 : trouver le nombre juste avant et juste après, puis compléter des suites à trous.",
            "Réactivation CE1 — Maîtriser la suite numérique jusqu’à 100.",
            "maths",
            "Ardoise"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Numération : manipuler, lire et écrire des nombres.",
            "NUM-P1-01 ; NUM-P1-02.",
            "maths",
            "Manipulation"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou.<br>🦉 <strong>Selma · Anis · Hamza · Assya</strong><br>2 tablettes + 2 PC ; les autres lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Sciences / QLM",
            "<strong>Sciences — Eau et huile · Séance unique</strong><br><br><strong>🎯 Objectif :</strong> comprendre qu’en sciences, on part d’une question, on propose des hypothèses, on réalise une expérience, on observe puis on conclut.<br><br><strong>🧰 Matériel :</strong> un récipient transparent, de l’eau, un peu d’huile et une cuillère ou un bâtonnet.<br><br><strong>1. Situation de départ — 5 min</strong><br>Montrer séparément l’eau et l’huile, sans les mélanger. Dire : « Voici de l’eau. Voici de l’huile. À votre avis, que va-t-il se passer si je verse l’huile dans l’eau puis que je mélange ? »<br><em>Action des élèves :</em> écouter, observer et reformuler la question.<br><strong>Question à écrire dans le cahier :</strong> « Que se passe-t-il lorsqu’on mélange de l’eau et de l’huile ? »<br><br><strong>2. Nos hypothèses — 10 min</strong><br>Faire proposer 2 ou 3 hypothèses sans dire si elles sont justes ou fausses. Exemples possibles : « Elles vont se mélanger. » ; « L’huile va rester au-dessus. » ; « L’huile va aller au fond. »<br><em>Action des élèves :</em> dessiner ou écrire ce qu’ils pensent qu’il va se passer.<br><strong>Consigne :</strong> « Dessine ou écris ce que tu penses qu’il va se passer. »<br><br><strong>3. L’expérience — 10 min</strong><br>Verser l’huile dans l’eau. Faire observer une première fois sans mélanger, puis mélanger quelques secondes et laisser reposer.<br><strong>Questions :</strong> « Qu’est-ce que vous voyez ? » puis « Est-ce que l’eau et l’huile restent mélangées ? »<br><br><strong>4. Observer et décrire — 10 min</strong><br>Faire distinguer ce que l’on pensait de ce que l’on observe réellement. Demander : « Voyez-vous encore deux liquides ? » ; « Où se trouve l’huile ? » ; « Que se passe-t-il après quelques instants ? »<br><strong>Réponse attendue :</strong> l’eau et l’huile se séparent progressivement ; l’huile reste au-dessus de l’eau.<br><strong>Trace dans le cahier :</strong> « Après avoir mélangé l’eau et l’huile, elles se séparent de nouveau. L’huile reste au-dessus de l’eau. » Ajouter un petit dessin légendé eau / huile.<br><br><strong>5. Mise en commun — 5 min</strong><br>Reprendre les hypothèses de départ. Dire : « Certaines hypothèses correspondaient à ce que nous avons observé, d’autres non. En sciences, l’expérience sert à vérifier nos idées. »<br><br><strong>6. Ce que nous retenons — 5 min</strong><br><strong>Conclusion :</strong> « Quand on mélange de l’eau et de l’huile, elles ne restent pas mélangées. Après un moment, elles se séparent et l’huile reste au-dessus de l’eau. »<br><br><strong>📒 Organisation du cahier :</strong> Question → Hypothèses → Expérience → Observation → Ce que nous retenons.",
            "SCI-P1-01 · Formuler une question ; SCI-P1-02 · Proposer une hypothèse.",
            "science",
            "Séance unique — Mélanges eau / huile et démarche scientifique"
          ],
          [
            "15h–15h45",
            "Éducation musicale / arts",
            "Chant, écoute et production collective de rentrée.",
            "MUS-ANN-01/02 ; ART-ANN-01.",
            "arts",
            "Classe entière"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "<strong>Anglais — Hello! · Réactivation orale</strong><br><br><strong>🎯 Objectif :</strong> réactiver les salutations et produire un mini-dialogue simple : <em>Hello / Hi / How are you? / I’m good / Goodbye / See you.</em><br><br><strong>1. Rituel d’entrée — 3 min</strong><br>Dire « Hello! » à la classe puis faire répondre collectivement. Enchaîner avec quelques élèves : « Hello, …! » / « Hi! »<br><em>Action des élèves :</em> répondre sans lire, avec une intonation naturelle.<br><br><strong>2. Écoute de la vidéo — 5 min</strong><br>Lancer la vidéo une première fois sans interrompre. Demander ensuite : « Quels mots avez-vous reconnus ? »<br><strong>Réponses attendues :</strong> <em>Hello, How are you?, good, great…</em><br><br><strong>3. Répéter et mimer — 5 min</strong><br>Reprendre les expressions entendues avec des gestes : <em>Hello! / How are you? / I’m good! / I’m great!</em><br><em>Action des élèves :</em> répéter collectivement, puis par demi-classe.<br><br><strong>4. Mini-dialogues par deux — 8 min</strong><br>Modèle au tableau :<br><strong>A:</strong> « Hello! How are you? »<br><strong>B:</strong> « I’m good, thank you! »<br><strong>A:</strong> « Goodbye! »<br><strong>B:</strong> « See you! »<br>Faire jouer le dialogue par binômes, puis inverser les rôles.<br><br><strong>5. Retour collectif — 4 min</strong><br>Faire passer 2 ou 3 binômes devant la classe. Terminer tous ensemble par : « Goodbye! See you tomorrow! »<br><br><strong>✅ Réussite attendue :</strong> l’élève comprend une salutation simple et peut répondre avec une formule courte.",
            "ANG-P1-01 · Saluer et prendre congé ; ANG-P1-02 · Comprendre et produire des salutations simples.",
            "english",
            "Réinvestissement oral — vidéo + interaction",
            null,
            {
              "documents": [
                {
                  "titre": "Hello! — Super Simple Songs",
                  "url": "https://www.youtube.com/watch?v=tVlcKp3bWH8",
                  "type": "video"
                }
              ]
            }
          ],
          [
            "16h25–17h",
            "Vocabulaire spiralaire",
            "<strong>Vocabulaire — Comprendre un mot grâce au contexte</strong><br><br><strong>🎯 Objectif :</strong> comprendre qu’on peut utiliser les autres mots d’une phrase comme indices pour trouver le sens d’un mot ; découvrir très simplement l’idée de famille de mots.<br><br><strong>🧰 Matériel :</strong> quelques objets réellement présents dans la classe : cahier, règle, ardoise, trousse, tableau, gomme… Aucun support écrit obligatoire.<br><br><strong>1. Jeu des phrases-indices — 10 min</strong><br>Dire une phrase sans prononcer le mot à trouver. Exemples : « Je l’ouvre pour écrire mes leçons. » → <strong>cahier</strong> ; « Je l’utilise pour tracer un trait droit. » → <strong>règle</strong> ; « Je garde mes crayons et ma gomme dedans. » → <strong>trousse</strong>.<br><em>Action des élèves :</em> écouter, proposer le mot et montrer l’objet si possible.<br><strong>Relance :</strong> « Qu’est-ce qui t’a permis de trouver ? »<br><br><strong>2. Comment as-tu trouvé ? — 5 min</strong><br>Faire verbaliser les indices utiles dans la phrase. Exemple : pour « règle », les mots <em>tracer</em> et <em>trait droit</em> donnent des indices.<br><strong>Idée à faire émerger :</strong> les mots qui entourent un mot peuvent nous aider à comprendre son sens.<br><br><strong>3. Petit défi en équipes — 10 min</strong><br>Former deux équipes ou jouer rangée contre rangée. Une phrase-indice est donnée ; 1 point si le mot est trouvé et 1 point supplémentaire si l’équipe explique quel indice l’a aidée.<br><strong>Exemples :</strong> « J’efface le crayon à papier. » → <strong>gomme</strong> ; « On écrit dessus devant toute la classe. » → <strong>tableau</strong> ; « On peut écrire dessus puis effacer. » → <strong>ardoise</strong>.<br><br><strong>4. Première famille de mots — 5 min</strong><br>Écrire au tableau : <strong>classe – classer – classement</strong>.<br>Demander : « Qu’est-ce qui se ressemble dans ces mots ? » puis « Est-ce qu’ils parlent complètement de choses différentes ou ont-ils une idée en commun ? »<br><strong>Réponse attendue :</strong> ils ont une partie commune (<em>class-</em>) et leur sens est lié.<br><em>Ne pas chercher à formaliser davantage pour cette première séance.</em><br><br><strong>5. Petite trace — 5 min</strong><br><strong>À retenir :</strong> « Quand je ne connais pas un mot, je peux utiliser les autres mots de la phrase pour comprendre son sens. »<br>Si le temps le permet : « Des mots de la même famille ont une partie commune et un sens lié. »<br><br><strong>🎲 Esprit de la séance :</strong> oral, manipulation, devinettes et jeu ; aucune fiche longue en fin de journée.",
            "VOC-P1-01 · Comprendre un mot grâce au contexte.",
            "french",
            "Découverte / jeu oral"
          ]
        ]
      ],
      [
        "Vendredi 4 septembre 2026",
        [
          [
            "9h–9h30",
            "Français / EMC",
            "Un jour, une actu : découvrir le rituel et distinguer information et opinion dans un exemple simple.",
            "EMI-P1-01 · Identifier une information simple.",
            "french",
            "Oral collectif"
          ],
          [
            "9h30–10h",
            "Français",
            "Lecture et vocabulaire : reprendre le texte de la semaine et expliquer quelques mots.",
            "COM-P1-01 à 03 ; VOC-P1-01.",
            "french",
            "Réinvestissement",
            null,
            {
              "documents": [
                {
                  "titre": "La nouvelle école",
                  "url": "https://drive.google.com/file/d/10FaGFzRs5MB-lyOt7vwrnw3oG_fI8TAb/view",
                  "type": "pdf"
                }
              ]
            }
          ],
          [
            "10h–10h45",
            "Français — Écrits courts",
            "Mon cahier d’écrivain — Raconter un moment de la rentrée en une ou deux phrases. Exemple : « Jeudi, j’ai découvert la bibliothèque de l’école. » Faire d’abord écrire, puis relire avec un guidage court : « Est-ce que ma phrase raconte bien un moment ? Puis-je ajouter une précision ou remplacer un mot ? » Choisir un seul geste DRAS si cela améliore réellement le texte.",
            "ECR-P1-05 · Produire une ou plusieurs phrases cohérentes.",
            "french",
            "Premier écrit"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Suite numérique jusqu’à 100 : compter à rebours sur de petites plages et franchir une dizaine en reculant.",
            "Réactivation CE1 — Maîtriser la suite numérique jusqu’à 100.",
            "maths",
            "Jeu / observation"
          ],
          [
            "11h15–12h",
            "Mathématiques — Résolution de problèmes",
            "Résolution de petits problèmes oraux et manipulation.",
            "PRO-P1-01 · Comprendre la question d’un problème.",
            "maths",
            "Recherche guidée"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou.<br>🦉 <strong>Imène · Bilal · Younis · Fahd</strong><br>2 tablettes + 2 PC ; les autres lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Mathématiques — Géométrie",
            "Repérage géométrique : reconnaître un point, une droite et un segment ; vérifier quelques alignements.",
            "GEO-P1-01 · Reconnaître un point, une droite et un segment ; GEO-P1-02 · Vérifier un alignement.",
            "maths",
            "Manipulation"
          ],
          [
            "14h45–15h45",
            "EPS",
            "Jeux collectifs de coopération et règles de sécurité.",
            "EPS-P1-01 à 03.",
            "eps",
            "Observation pratique",
            "p1r1fridayeps"
          ],
          [
            "16h–16h40",
            "QLM / EMC",
            "Se repérer dans l’école et identifier les adultes et lieux ressources.",
            "EMC-P1-01 ; repères de l’école.",
            "history",
            "Découverte"
          ],
          [
            "16h40–17h",
            "Conseil et bilan de semaine",
            "Exprimer une réussite, une question et un besoin pour la semaine suivante.",
            "OR-P1-03 ; OR-P1-04.",
            "emc",
            "Bilan collectif"
          ]
        ]
      ]
    ]
  },
  {
    "key": "p1r2",
    "title": "Semaine 2 — Évaluations nationales et routines légères",
    "dates": "Du lundi 7 au vendredi 11 septembre 2026",
    "focus": "Installer les routines tout en répartissant les premières passations nationales CE2. Les séances ordinaires restent légères et les évaluations de classe sont évitées pendant la campagne.",
    "days": [
      [
        "Lundi 7 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Quoi de neuf ? : écouter les camarades, prendre la parole puis reformuler une information donnée par un camarade.",
            "OR-P1-01 ; OR-P1-03.",
            "french",
            "Réalisé"
          ],
          [
            "9h15–9h45",
            "Vie de classe",
            "Présentation des métiers de la classe : explication des responsabilités, fonctionnement sur une semaine et découverte des cartes avec la photo des élèves pour attribuer les métiers.",
            "EMC-P1-01 · Participer à la vie de la classe et assumer une responsabilité.",
            "emc",
            "Organisation de la classe"
          ],
          [
            "9h45–10h45",
            "Évaluations nationales CE2",
            "Passation des évaluations nationales CE2 pendant la seconde partie de la matinée.",
            "Repères nationaux de début d’année.",
            "french",
            "Évaluation nationale"
          ],
          [
            "11h–12h",
            "Évaluations nationales CE2",
            "Reprise et poursuite des évaluations nationales CE2 jusqu’à 12h.",
            "Repères nationaux de début d’année.",
            "maths",
            "Évaluation nationale"
          ],
          [
            "14h–14h15",
            "Quart d’heure de dessin",
            "Temps calme de dessin libre pour permettre aux élèves de décompresser après les évaluations de la matinée.",
            "Compétences transversales · concentration, expression personnelle et retour au calme.",
            "arts",
            "Temps de décompression"
          ],
          [
            "14h15–15h",
            "Histoire",
            "Découvrir la frise chronologique et distinguer passé / présent.",
            "HIS-P1-01 · Se repérer sur une frise chronologique.",
            "history",
            "Manipulation de repères"
          ],
          [
            "15h–15h45",
            "EPS",
            "Découverte du dojo de l’école : découverte du lieu, règles de fonctionnement et de sécurité, puis activité motrice sur le tatami.",
            "EPS-P1-01 à 04.",
            "eps",
            "Découverte du dojo"
          ],
          [
            "16h–17h",
            "Méthodologie / Vie de classe",
            "Faire ses devoirs dans de bonnes conditions : où s’installer ? avec quel matériel ? comment s’organiser ? Présentation et explication de l’Espace Parents pour retrouver les devoirs et les informations utiles de la classe.",
            "EMC-P1-01 · Développer son autonomie et organiser son travail personnel.",
            "emc",
            "Méthodologie — autonomie"
          ]
        ]
      ],
      [
        "Mardi 8 septembre 2026",
        [
          [
            "9h–9h15",
            "Français — Copie",
            "Cahier du jour — Copie : posture, soin et copie d’une courte phrase.",
            "ECR-P1-01 · Copier sans erreur.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture à voix haute : exactitude et respect de la ponctuation.",
            "LEC-P1-01 à 03.",
            "french",
            "Repérage individuel"
          ],
          [
            "10h–10h45",
            "Français",
            "Mon cahier d’écrivain — DRAS : reconnaître une phrase et manipuler l’ordre des mots pour produire une phrase correcte.",
            "GRA-P1-01 · Reconnaître une phrase.",
            "french",
            "Manipulations DRAS"
          ],
          [
            "11h–11h30",
            "Évaluations nationales CE2 — Mathématiques · séance 1",
            "Passation collective. Temps de travail effectif annoncé : 17 minutes.",
            "Repères nationaux de début d’année — mathématiques.",
            "maths",
            "Évaluation nationale · séance 1/2"
          ],
          [
            "11h30–12h",
            "Mathématiques — Numération",
            "Reprise courte : comparer et ranger des nombres à partir de manipulations simples.",
            "NUM-P1-04 · Comparer deux nombres.",
            "maths",
            "Consolidation légère"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou.<br>🦉 <strong>Mohamed Z. · Ritej · Sayf · Khadidja</strong><br>2 tablettes + 2 PC ; les autres lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Éducation musicale — chants / expression corporelle",
            "Après le quart d’heure de lecture : échauffement vocal, chant collectif, jeux rythmiques et mouvements simples pour sentir et maintenir la pulsation.",
            "MUS-ANN-01 · Chanter avec justesse et expressivité ; MUS-ANN-02 · Écouter et tenir sa place dans une production collective ; mobiliser le corps pour suivre une pulsation.",
            "arts",
            "Pratique collective"
          ],
          [
            "14h45–16h45",
            "CHAM / ateliers",
            "CHAM au conservatoire ; non-CHAM : arts, lecture, jeux mathématiques et découverte des outils.",
            "Compétences déjà travaillées.",
            "cham",
            "Aucune notion nouvelle ni évaluation commune"
          ],

          [
            "16h45–17h",
            "Bilan de journée",
            "Retour collectif sur les apprentissages et préparation du lendemain.",
            "OR-P1-04.",
            "emc",
            "Oral collectif"
          ]
        ]
      ],
      [
        "Jeudi 10 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Rituel Devinette — 2 nouvelles + 1 déjà vue : 1) Règle : « Je suis longue et droite ; je mesure et j’aide à tracer. » 2) Gomme : « Je deviens plus petite quand on m’utilise ; j’efface le crayon. » 3) 🔁 Cartable : retrouver la réponse à partir d’indices reformulés.",
            "OR-P1-02 ; OR-P1-03.",
            "french",
            "Observation"
          ],
          [
            "9h15–9h40",
            "Évaluations nationales CE2 — Français · séance 2",
            "Passation collective. Temps de travail effectif annoncé : 16 à 18 minutes.",
            "Repères nationaux de début d’année — français.",
            "french",
            "Évaluation nationale · séance 2/3"
          ],
          [
            "9h40–10h",
            "Français",
            "Lecture-compréhension : reprise courte sur les informations explicites.",
            "COM-P1-03 ; COM-P1-04.",
            "french",
            "Réinvestissement léger"
          ],
          [
            "10h–10h45",
            "Français",
            "Mon cahier d’écrivain — DRAS : transformer une phrase affirmative en phrase négative, puis revenir à l’affirmative.",
            "GRA-P1-02 · Repérer la négation ; GRA-P1-03 · Transformer une phrase affirmative ou négative.",
            "french",
            "Manipulations"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Suite numérique jusqu’à 100 : nombre précédent / suivant, passages de dizaines, puis petits calculs additifs.",
            "Réactivation CE1 — Maîtriser la suite numérique jusqu’à 100 ; CAL-P1-01 · Restituer les tables d’addition.",
            "maths",
            "Ardoise"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Décomposer un nombre et utiliser différentes écritures.",
            "NUM-P1-03 · Décomposer un nombre.",
            "maths",
            "Manipulation"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou.<br>🦉 <strong>Yaman · Rayan · Selma · Anis</strong><br>2 tablettes + 2 PC ; les autres lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Sciences / QLM",
            "<strong>Sciences — L’air existe-t-il ?</strong><br><br><strong>🎯 Objectif :</strong> mettre en évidence l’existence de l’air même lorsqu’on ne le voit pas.<br><br><strong>🧰 Matériel :</strong> sacs transparents, ballons, éventails ou feuilles cartonnées.<br><br><strong>1. Question — 5 min</strong><br>Demander : « Est-ce qu’il y a quelque chose dans ce sac quand il paraît vide ? » Recueillir les idées des élèves.<br><br><strong>2. Manipulation — 15 min</strong><br>Capturer de l’air dans un sac puis le fermer. Le presser doucement. Gonfler ensuite un ballon et comparer avec le ballon dégonflé.<br><strong>Exemple :</strong> le sac se gonfle et résiste quand on appuie : il contient bien quelque chose.<br><br><strong>3. Mise en commun — 15 min</strong><br>Faire formuler ce qui prouve la présence de l’air : le sac prend du volume, le ballon se gonfle, on sent l’air déplacé par un éventail.<br><br><strong>4. Trace — 10 min</strong><br>Écrire : « L’air est invisible, mais il existe. On peut le capturer et sentir ses effets. »",
            "SCI-P1-01 · Se questionner ; SCI-P1-02 · Manipuler ; SCI-P1-03 · Observer et garder une trace.",
            "science",
            "Air 1/3 — Mettre en évidence l’existence de l’air"
          ],
          [
            "15h–15h45",
            "CHAM / arts",
            "Chant choral ; non-CHAM : arts et consolidation.",
            "MUS-ANN-01/02 ; compétences déjà travaillées.",
            "cham",
            "Aucune notion nouvelle ni évaluation commune"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Réinvestir salutations et présentation.",
            "ANG-P1-01 ; ANG-P1-02.",
            "english",
            "Jeu oral"
          ],
          [
            "16h25–17h",
            "Français",
            "Vocabulaire : comprendre un mot grâce au contexte.",
            "VOC-P1-01.",
            "french",
            "Recherche guidée"
          ]
        ]
      ],
      [
        "Vendredi 11 septembre 2026",
        [
          [
            "9h–9h30",
            "Français / EMI",
            "Un jour, une actu : identifier le sujet principal d’une information simple.",
            "EMI-P1-01 · Identifier une information simple.",
            "french",
            "Oral collectif"
          ],
          [
            "9h30–10h",
            "Français",
            "Lecture et vocabulaire : reformuler l’essentiel d’un texte court.",
            "COM-P1-05 · Reformuler l’essentiel ; VOC-P1-01.",
            "french",
            "Trace courte"
          ],
          [
            "10h–10h45",
            "Français — Écrits courts",
            "Mon cahier d’écrivain — Écriture courte : produire plusieurs phrases cohérentes et se relire.",
            "ECR-P1-04 ; ECR-P1-05.",
            "french",
            "Production courte"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Repérage flash : suite numérique jusqu’à 100, avant / après, passages de dizaines et petits calculs.",
            "Réactivation CE1 — Maîtriser la suite numérique jusqu’à 100 ; CAL-P1-01 · Restituer les tables d’addition.",
            "maths",
            "Repérage individuel"
          ],
          [
            "11h15–12h",
            "Mathématiques — Résolution de problèmes",
            "Comprendre la question puis résoudre un problème additif simple en expliquant sa démarche.",
            "PRO-P1-01 · Comprendre la question d’un problème ; PRO-P1-02 · Résoudre un problème additif en une étape.",
            "maths",
            "Recherche / mise en commun"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou.<br>🦉 <strong>Hamza · Assya · Imène · Bilal</strong><br>2 tablettes + 2 PC ; les autres lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Mathématiques — Géométrie",
            "Géométrie : reconnaître point, droite et segment puis vérifier un alignement.",
            "GEO-P1-01 · Reconnaître un point, une droite et un segment ; GEO-P1-02 · Vérifier un alignement.",
            "maths",
            "Manipulation"
          ],
          [
            "14h45–15h45",
            "EPS",
            "Jeux collectifs : coopérer et respecter les règles.",
            "EPS-P1-01 à 04.",
            "eps",
            "Observation pratique"
          ],
          [
            "16h–16h40",
            "Géographie",
            "Se repérer sur une carte simple et situer la France.",
            "GEOG-P1-01 · Se repérer sur une carte.",
            "history",
            "Découverte"
          ],
          [
            "16h40–17h",
            "Conseil et bilan de semaine",
            "Choisir une réussite et identifier un objectif pour la semaine suivante.",
            "EMC-P1-01 ; OR-P1-04.",
            "emc",
            "Bilan collectif"
          ]
        ]
      ]
    ]
  },
  {
    "key": "p1s1",
    "title": "Semaine 3 — Reprise complète des apprentissages",
    "dates": "Du lundi 14 au vendredi 18 septembre 2026",
    "focus": "Les évaluations nationales sont terminées : reprise d’un rythme ordinaire, fondamentaux le matin et autres disciplines l’après-midi.",
    "days": [
      [
        "Lundi 14 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Quoi de neuf ? : réactiver les règles d’écoute et présenter un camarade en cinq informations.",
            "OR-P1-01 · Écouter une consigne jusqu’au bout ; OR-P1-03 · Respecter les règles d’un échange.",
            "french",
            "Observation formative"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture-compréhension : identifier personnages, lieu, informations explicites et justifier une réponse avec un indice du texte.",
            "COM-P1-01 ; COM-P1-02 ; COM-P1-04 ; COM-P1-05.",
            "french",
            "Réinvestissement léger"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Cahier du jour — Dictée diagnostique ciblée puis première liste de mots fréquents à mémoriser.",
            "ORT-P1-01 · Transcrire les sons d’un mot ; ORT-P1-02 · Écrire les mots fréquents étudiés.",
            "french",
            "Dictée diagnostique ciblée"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Suite numérique jusqu’à 100 en réactivation courte, puis tables d’addition et compléments à 10.",
            "Réactivation CE1 — Maîtriser la suite numérique jusqu’à 100 ; CAL-P1-01 · Restituer les tables d’addition ; CAL-P1-02 · Trouver un complément à 10 ou 100.",
            "maths",
            "Repérage individuel"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Lire et écrire des nombres jusqu’à 999.",
            "NUM-P1-01 · Lire des nombres jusqu’à 999 ; NUM-P1-02 · Écrire des nombres jusqu’à 999.",
            "maths",
            "Ardoise + correction immédiate"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Histoire / QLM",
            "Se repérer dans le temps : frise chronologique, ordre des événements et repères étudiés.",
            "HIS-P1-01 à 04.",
            "history",
            "Apprentissage"
          ],
          [
            "15h–15h45",
            "EPS",
            "Jeux de coopération puis course longue : trouver une allure régulière et tenir plusieurs minutes.",
            "EPS-P1-01 · Gérer son allure ; EPS-P1-01 · Maintenir un effort.",
            "eps",
            "Observation des allures"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Hello / Goodbye : comprendre et utiliser les salutations.",
            "ANG-P1-01 · Comprendre une salutation familière ; ANG-P1-02 · Saluer et prendre congé.",
            "english",
            "Jeu oral"
          ],
          [
            "16h25–17h",
            "EMC",
            "Construire la charte de classe définitive : pourquoi avons-nous des règles communes ?",
            "EMC-P1-01 · Comprendre l’utilité d’une règle commune.",
            "emc",
            "Débat et exemples"
          ]
        ]
      ],
      [
        "Mardi 15 septembre 2026",
        [
          [
            "9h–9h30",
            "Français — Lecture-compréhension — Vocabulaire",
            "Autour du texte « Renart vole des poissons » — Reprendre le vocabulaire qui a gêné la compréhension. À partir des illustrations, identifier puis écrire les mots correspondants en s’aidant de la banque de mots. Fiche différenciée en 3 niveaux. Objectif : « Comprendre les mots du texte pour mieux comprendre l’histoire. »",
            "COM-P1-04 · Retrouver une information explicite ; enrichir et mobiliser le vocabulaire pour comprendre un texte.",
            "french",
            "Entraînement différencié — 3 niveaux",
            null,
            {
              "documents": [
                {
                  "titre": "Renart — fiche élève noir et blanc",
                  "url": "https://drive.google.com/file/d/1kmdJo1ZNnEyZxOUvQtmjbv_H-hv62_oX/view",
                  "type": "image"
                },
                {
                  "titre": "Renart — fiche couleur",
                  "url": "https://drive.google.com/file/d/1inMFJ1TxsCpjQmo7PdJM8LAm39hl455D/view",
                  "type": "image"
                },
                {
                  "titre": "Renart — correction couleur",
                  "url": "https://drive.google.com/file/d/1QoqYiWnEnqjKhHQ_ENziqWhxfVlV1MxP/view",
                  "type": "image"
                }
              ]
            }
          ],
          [
            "9h30–10h",
            "Français — Lecture-compréhension",
            "Lecture documentaire — « Le wombat » : lire le texte, repérer les informations importantes puis répondre aux questions de compréhension.",
            "COM-P1-04 · Retrouver une information explicite.",
            "french",
            "Lecture documentaire — questions de compréhension",
            null,
            {
              "documents": [
                {
                  "titre": "Lecture documentaire — Le wombat",
                  "url": "https://drive.google.com/file/d/1AHdlmT6PXaakqHYhnpxbHq2P1G38C3PP/view",
                  "type": "pdf"
                }
              ]
            }
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : reconnaître une phrase correcte. Complément intégré au matin : Lecture offerte et reformulation orale.",
            "GRA-P1-01 · Reconnaître une phrase correcte. ; OR-P1-02 · Reformuler un message entendu.",
            "french",
            "Manipulations"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Ajouter ou retrancher 1 et 10 dans les nombres jusqu’à 100 ; verbaliser le nombre obtenu.",
            "Réactivation CE1 — Se repérer dans la suite numérique jusqu’à 100 et utiliser la valeur des dizaines et unités.",
            "maths",
            "Ardoise"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Décomposer un nombre de plusieurs façons.",
            "NUM-P1-03 · Décomposer un nombre.",
            "maths",
            "Trace dans le cahier"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Éducation musicale — chants / expression corporelle",
            "Après le quart d’heure de lecture : échauffement vocal, chant collectif, jeux rythmiques et mouvements simples pour sentir et maintenir la pulsation.",
            "MUS-ANN-01 · Chanter avec justesse et expressivité ; MUS-ANN-02 · Écouter et tenir sa place dans une production collective ; mobiliser le corps pour suivre une pulsation.",
            "arts",
            "Pratique collective"
          ],
          [
            "14h45–15h45",
            "Arts / consolidation",
            "Finaliser les productions de porte-manteaux ; ateliers de lecture et calcul pour toute la classe.",
            "ART-ANN-01 · Expérimenter plusieurs outils ; ART-ANN-02 · Composer avec lignes, formes et couleurs.",
            "arts",
            "Pas d’évaluation commune"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h45",
            "Numérique / méthodologie",
            "Organisation, outils numériques, projet de classe ou ateliers autonomes non fondamentaux.",
            "Compétences transversales.",
            "common",
            "Ateliers"
          ],

          [
            "16h45–17h",
            "Bilan de journée",
            "Retour sur les apprentissages et préparation du lendemain.",
            "OR-P1-04 ; EMC-P1-01.",
            "emc",
            "Bilan"
          ]
        ]
      ],
      [
        "Jeudi 17 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Rituel Devinette — 2 nouvelles + 1 déjà vue : 1) Tableau : « Toute la classe me regarde ; on écrit ou projette sur moi. » 2) Récréation : « Je ne suis pas une matière ; on sort pour jouer, parler et bouger. » 3) 🔁 Trousse : retrouver et justifier la réponse.",
            "OR-P1-04 · Donner une réponse en lien avec le sujet.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français — Lecture / fluence",
            "Lire par groupes de mots, respecter la ponctuation puis reformuler l’essentiel d’un texte court.",
            "LEC-P1-03 ; LEC-P1-04 ; COM-P1-05.",
            "french",
            "Entraînement guidé"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : phrase affirmative et phrase négative. Complément intégré au matin : Vocabulaire : regrouper des mots par thème.",
            "GRA-P1-02 · Reconnaître une phrase négative ; GRA-P1-03 · Transformer une phrase affirmative en phrase négative. ; VOC-P1-02 · Regrouper des mots par thème.",
            "french",
            "Exercices guidés"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Compléments à 10 et à 100 ; faits additifs rapides.",
            "CAL-P1-01 ; CAL-P1-02.",
            "maths",
            "Ardoise"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Comparer, ranger et décomposer des nombres jusqu’à 999.",
            "NUM-P1-03 ; NUM-P1-04.",
            "maths",
            "Manipulation"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Sciences / QLM",
            "<strong>Sciences — L’air prend-il de la place ?</strong><br><br><strong>🎯 Objectif :</strong> comprendre que l’air occupe un espace.<br><br><strong>🧰 Matériel :</strong> bassine d’eau, gobelet transparent, mouchoir en papier.<br><br><strong>1. Défi — 5 min</strong><br>Placer un mouchoir au fond d’un gobelet. Demander : « Peut-on plonger le gobelet dans l’eau sans mouiller le mouchoir ? »<br><br><strong>2. Hypothèses — 5 min</strong><br>Les élèves prévoient ce qui va se passer et justifient leur idée.<br><br><strong>3. Expérience — 15 min</strong><br>Retourner le gobelet verticalement et l’enfoncer dans l’eau sans l’incliner. Ressortir puis vérifier le mouchoir. Incliner ensuite le gobelet sous l’eau : des bulles s’échappent et l’eau entre.<br><br><strong>4. Explication — 10 min</strong><br>Relier les bulles à l’air qui sort du gobelet. Tant que l’air reste dans le gobelet, il empêche l’eau de prendre sa place.<br><br><strong>5. Trace — 10 min</strong><br>Écrire : « L’air occupe de la place. Quand l’air sort du gobelet, l’eau peut entrer. »",
            "SCI-P1-02 · Mettre en œuvre une expérience simple ; SCI-P1-03 · Observer ; SCI-P1-05 · Conclure.",
            "science",
            "Air 2/3 — Montrer que l’air occupe de la place",
            null,
            {
              "documents": [
                {
                  "titre": "Sciences — L’air prend-il de la place ? — Fiche élève CE2",
                  "url": "https://drive.google.com/file/d/1jzDH15KmElNgmO28ua2MTdz5kjpXGqQT/view?usp=drivesdk",
                  "type": "pdf"
                },
                {
                  "titre": "Sciences — L’air prend-il de la place ? — Correction CE2",
                  "url": "https://drive.google.com/file/d/1UsFx5ggG9IlVRlgP2ZPf7HckfVegvJKr/view?usp=drivesdk",
                  "type": "pdf"
                }
              ]
            }
          ],
          [
            "15h–15h45",
            "Arts / musique",
            "Chanter avec le groupe et maintenir une pulsation.",
            "MUS-ANN-01 · Chanter avec le groupe ; MUS-ANN-02 · Maintenir une pulsation.",
            "arts",
            "Observation"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Réinvestir les salutations et les prénoms.",
            "ANG-P1-01 à 03.",
            "english",
            "Dialogue bref"
          ],
          [
            "16h25–17h",
            "EMC / numérique / culture",
            "Activité de culture, citoyenneté, numérique ou méthodologie ; aucun nouvel apprentissage de français ou mathématiques.",
            "EMC-P1-01 à 05 ; compétences transversales.",
            "emc",
            "Classe entière"
          ]
        ]
      ],
      [
        "Vendredi 18 septembre 2026",
        [
          [
            "9h–9h30",
            "Français / EMI",
            "Un jour, une actu : distinguer une information d’une anecdote et exprimer un avis argumenté.",
            "EMI-P1-01 · Distinguer une information d’une anecdote ; OR-P1-04.",
            "french",
            "Échange oral"
          ],
          [
            "9h30–10h",
            "Français",
            "Lecture : répondre puis montrer l’indice dans le texte.",
            "COM-P1-05 · Justifier une réponse avec un indice.",
            "french",
            "Petite trace formative"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Cahier du jour — Dictée préparée — La Grande Muraille. Les 10 mots du bilan sont annoncés aux élèves : une frontière, une invasion, le nord, une structure, l’homme, une longueur, une tour de guet, important, contre, jamais.",
            "ORT-P1-01 à 03 ; ECR-P1-04 · Relire et corriger sa copie.",
            "french",
            "Entraînement — sans bilan formel"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Réactivation : suite numérique jusqu’à 100, compléments à 10 et petits faits additifs.",
            "Réactivation CE1 — Maîtriser la suite numérique jusqu’à 100 ; CAL-P1-01 ; CAL-P1-02.",
            "maths",
            "Entraînement"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Composer et décomposer des nombres ; comparer. Complément intégré au matin : Comprendre la question d’un problème.",
            "NUM-P1-01 à 04. ; PRO-P1-01 · Comprendre la question d’un problème.",
            "maths",
            "Consolidation — sans contrôle formel"
          ],
          [
            "11h30 · heure prévue",
            "Sécurité — Exercice incendie",
            "Interruption de la séance pour l’exercice incendie.",
            "Appliquer la procédure d’évacuation.",
            "emc",
            "Événement école"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h15",
            "EPS",
            "Jeux collectifs : occuper un espace libre et respecter les règles.",
            "EPS-P1-01 · Occuper un espace libre ; EPS-P1-01 · Respecter les règles d’un jeu.",
            "eps",
            "Observation"
          ],
          [
            "15h15–15h45",
            "Arts / projet / lecture documentaire",
            "Projet court, activité artistique ou lecture documentaire liée aux apprentissages de la semaine.",
            "Compétences culturelles et transversales.",
            "arts",
            "Projet"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h40",
            "Histoire",
            "Ordonner des événements et les placer sur une frise chronologique.",
            "HIS-P1-01 · Ordonner des événements dans le temps ; HIS-P1-02 · Utiliser une frise chronologique.",
            "history",
            "Frise / cartes à ordonner"
          ],
          [
            "16h40–17h",
            "EMC",
            "Conseil : assumer une responsabilité et prendre soin du matériel.",
            "EMC-P1-03 ; EMC-P1-05.",
            "emc",
            "Observation formative"
          ]
        ]
      ]
    ]
  },
  {
    "key": "p1s2",
    "title": "Semaine 4 — Stabiliser les routines et fixer les premiers objectifs",
    "dates": "Du lundi 21 au vendredi 25 septembre 2026",
    "focus": "Poursuivre la numération, installer le verbe et la chronologie du récit, puis valider quelques acquis déjà entraînés.",
    "days": [
      [
        "Lundi 21 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Quoi de neuf ? : reformuler l’idée d’un camarade et vérifier que l’on a bien compris.",
            "OR-P1-02 · Reformuler un message entendu ; OR-P1-03.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture : remettre les événements d’un récit dans l’ordre.",
            "COM-P1-03 · Remettre les événements dans l’ordre.",
            "french",
            "Étiquettes puis écrit"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Cahier du jour — Orthographe : mots fréquents et mots invariables de la semaine.",
            "ORT-P1-02 ; ORT-P1-03.",
            "french",
            "Dictée préparée"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Ajouter et retrancher 9 ou 19.",
            "CAL-P1-03.",
            "maths",
            "Ardoise"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Encadrer un nombre entre deux dizaines puis deux centaines.",
            "NUM-P1-05 · Encadrer un nombre.",
            "maths",
            "Entraînement"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Histoire",
            "Identifier et remettre dans l’ordre les grandes périodes de l’Histoire.",
            "HIS-P1-03 · Identifier les grandes périodes historiques.",
            "history",
            "Classement / frise"
          ],
          [
            "15h–15h45",
            "EPS",
            "Course longue : maintenir un effort et observer ses résultats.",
            "EPS-P1-01 ; EPS-P1-01 · Observer ses résultats.",
            "eps",
            "Fiche de progrès"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Rituels : salutations et prénoms.",
            "ANG-P1-01 à 03.",
            "english",
            "Observation formative orale"
          ],
          [
            "16h25–17h",
            "EMC / méthodologie",
            "Règles, responsabilités, coopération ou autonomie.",
            "EMC-P1-01 à 05.",
            "emc",
            "Échange"
          ]
        ]
      ],
      [
        "Mardi 22 septembre 2026",
        [
          [
            "9h–9h15",
            "Français — Copie",
            "Cahier du jour — Copie : utiliser de façon autonome la méthode et la grille de relecture installées.",
            "ECR-P1-03 ; ECR-P1-04.",
            "french",
            "Petite trace formative"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture : chronologie et connecteurs temporels.",
            "COM-P1-03.",
            "french",
            "Petite trace formative"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : repérer le verbe conjugué par transformation. Complément intégré au matin : Mon cahier d’écrivain — Écrire une phrase correcte à partir d’une image.",
            "GRA-P1-04 · Repérer le verbe conjugué. ; ECR-P1-05 · Écrire une phrase correcte.",
            "french",
            "Manipulations"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Compléments à 100.",
            "CAL-P1-02.",
            "maths",
            "Petite trace formative"
          ],
          [
            "11h15–12h",
            "Mathématiques — Calcul posé",
            "Poser une addition en alignant les chiffres.",
            "OPE-P1-01 · Poser une addition.",
            "maths",
            "Nouvel apprentissage"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Éducation musicale — chants / expression corporelle",
            "Après le quart d’heure de lecture : échauffement vocal, chant collectif, jeux rythmiques et mouvements simples pour sentir et maintenir la pulsation.",
            "MUS-ANN-01 · Chanter avec justesse et expressivité ; MUS-ANN-02 · Écouter et tenir sa place dans une production collective ; mobiliser le corps pour suivre une pulsation.",
            "arts",
            "Pratique collective"
          ],
          [
            "14h45–15h45",
            "Arts / consolidation",
            "Composer avec des matières naturelles ; ateliers de consolidation pour toute la classe.",
            "ART-ANN-03 · Utiliser des matières naturelles.",
            "arts",
            "Pas d’évaluation commune"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h45",
            "Numérique / méthodologie",
            "Organisation, outils numériques, projet de classe ou ateliers autonomes non fondamentaux.",
            "Compétences transversales.",
            "common",
            "Ateliers"
          ],

          [
            "16h45–17h",
            "Bilan de journée",
            "Retour sur les apprentissages et préparation du lendemain.",
            "OR-P1-04 ; EMC-P1-01.",
            "emc",
            "Bilan"
          ]
        ]
      ],
      [
        "Jeudi 24 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Rituel Devinette — 2 nouvelles + 1 déjà vue : 1) Crayon : « Je laisse une trace grise ; on peut m’effacer. » 2) Bibliothèque : « Je garde beaucoup de livres ; on vient y choisir une lecture. » 3) 🔁 Cahier : expliquer quels indices permettent de trouver.",
            "OR-P1-04.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Fluence : lire par groupes de mots.",
            "LEC-P1-03 · Lire par groupes de mots.",
            "french",
            "Entraînement chronométré"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : donner l’infinitif d’un verbe conjugué. Complément intégré au matin : Vocabulaire : comprendre un mot grâce au contexte.",
            "GRA-P1-05 · Donner l’infinitif d’un verbe conjugué. ; VOC-P1-01 · Comprendre un mot grâce au contexte.",
            "french",
            "Tri et transformation"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Tables d’addition.",
            "CAL-P1-01.",
            "maths",
            "Petite trace formative"
          ],
          [
            "11h15–12h",
            "Mathématiques — Grandeurs et mesures",
            "Mesurer une longueur en cm et mm.",
            "MES-P1-01 · Mesurer une longueur en cm et mm.",
            "maths",
            "Manipulation"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Sciences / QLM",
            "<strong>Sciences — Peut-on comprimer l’air ?</strong><br><br><strong>🎯 Objectif :</strong> découvrir que l’air enfermé peut être comprimé.<br><br><strong>🧰 Matériel :</strong> seringues sans aiguille, éventuellement petites éponges pour comparer.<br><br><strong>1. Question — 5 min</strong><br>Boucher l’extrémité d’une seringue contenant de l’air et demander : « Que va-t-il se passer si on pousse le piston ? »<br><br><strong>2. Manipulation — 15 min</strong><br>Les élèves poussent doucement le piston d’une seringue bouchée puis le relâchent. Comparer avec une seringue ouverte.<br><strong>Exemple :</strong> seringue ouverte : le piston avance facilement ; seringue bouchée : il résiste car l’air est enfermé.<br><br><strong>3. Observation — 10 min</strong><br>Faire verbaliser : le même air occupe moins de place lorsque l’on pousse le piston.<br><br><strong>4. Trace — 15 min</strong><br>Schéma avant / après et phrase : « L’air peut être comprimé : on peut réduire la place qu’il occupe quand il est enfermé. »",
            "SCI-P1-02 · Expérimenter ; SCI-P1-03 · Observer ; SCI-P1-04 · Comparer.",
            "science",
            "Air 3/3 — Découvrir la compressibilité de l’air"
          ],
          [
            "15h–15h45",
            "Arts / musique",
            "Chant et pulsation.",
            "MUS-ANN-01/02.",
            "arts",
            "Observation continue"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Dire le temps qu’il fait.",
            "ANG-P1-05 · Dire le temps qu’il fait.",
            "english",
            "Rituel oral"
          ],
          [
            "16h25–17h",
            "EMC / numérique / culture",
            "Activité de culture, citoyenneté, numérique ou méthodologie ; aucun nouvel apprentissage de français ou mathématiques.",
            "EMC-P1-01 à 05 ; compétences transversales.",
            "emc",
            "Classe entière"
          ]
        ]
      ],
      [
        "Vendredi 25 septembre 2026",
        [
          [
            "9h–9h30",
            "Français / EMI",
            "Un jour, une actu : fait ou opinion ?",
            "EMI-P1-02 · Distinguer un fait d’une opinion.",
            "french",
            "Oral collectif"
          ],
          [
            "9h30–10h",
            "Français",
            "Lecture : informations explicites et chronologie.",
            "COM-P1-03 ; COM-P1-04.",
            "french",
            "Petite trace formative"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : phrase correcte, négation et verbe.",
            "GRA-P1-01 à 04.",
            "french",
            "Petite trace formative"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental : compléments et ±9/19.",
            "CAL-P1-02 ; CAL-P1-03.",
            "maths",
            "Suivi des automatismes"
          ],
          [
            "11h15–12h",
            "Mathématiques — Numération",
            "Nombres : comparer et encadrer. Complément intégré au matin : Résoudre un problème additif en une étape.",
            "NUM-P1-04 ; NUM-P1-05. ; PRO-P1-02 · Résoudre un problème additif en une étape.",
            "maths",
            "Petite trace formative"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h15",
            "EPS",
            "Jeux collectifs : faire une passe utile.",
            "EPS-P1-01 · Faire une passe utile ; EPS-P1-01.",
            "eps",
            "Observation"
          ],
          [
            "15h15–15h45",
            "Arts / projet / lecture documentaire",
            "Projet court, activité artistique ou lecture documentaire liée aux apprentissages de la semaine.",
            "Compétences culturelles et transversales.",
            "arts",
            "Projet"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h40",
            "Géographie",
            "Localiser la France à différentes échelles.",
            "GEOG-P1-01 · Localiser la France à différentes échelles.",
            "history",
            "Cartes"
          ],
          [
            "16h40–17h",
            "EMC",
            "Droits et devoirs.",
            "EMC-P1-02 · Distinguer un droit et un devoir.",
            "emc",
            "Classement de situations"
          ]
        ]
      ]
    ]
  },
  {
    "key": "p1s3",
    "title": "Semaine 5 — Relier et réinvestir",
    "dates": "Du lundi 28 septembre au vendredi 2 octobre 2026",
    "focus": "Faire fonctionner ensemble les notions : sujet-verbe, écriture de plusieurs phrases, problèmes et premières fractions.",
    "days": [
      [
        "Lundi 28 septembre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Quoi de neuf ? : préparer une réponse complète.",
            "OR-P1-04.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture : justifier une réponse avec un indice précis.",
            "COM-P1-05.",
            "french",
            "Écrit court"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Orthographe : singulier et pluriel dans le groupe nominal.",
            "ORT-P1-04 · Repérer le singulier et le pluriel.",
            "french",
            "Manipulations"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental : stratégie personnelle et explicitation.",
            "CAL-P1-01 à 03.",
            "maths",
            "Entretien flash"
          ],
          [
            "11h15–12h",
            "Mathématiques — Calcul posé",
            "Poser une soustraction sans puis avec échange simple.",
            "OPE-P1-02 · Poser une soustraction.",
            "maths",
            "Nouvel apprentissage"
          ],
          [
            "11h30 · heure prévue",
            "Sécurité — PPMS attentat",
            "Interruption de la séance pour l’exercice PPMS.",
            "Appliquer les consignes du PPMS.",
            "emc",
            "Événement école"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Histoire",
            "Associer quelques repères historiques étudiés à leur période.",
            "HIS-P1-04 · Associer un repère historique à une période.",
            "history",
            "Oral + cartes"
          ],
          [
            "15h–15h45",
            "EPS",
            "Course longue : gérer son allure et comparer ses résultats.",
            "EPS-P1-01 à 03.",
            "eps",
            "Évaluation pratique"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Météo : comprendre puis produire une phrase.",
            "ANG-P1-04 ; ANG-P1-05.",
            "english",
            "Observation formative orale"
          ],
          [
            "16h25–17h",
            "EMC / méthodologie",
            "Règles, responsabilités, coopération ou autonomie.",
            "EMC-P1-01 à 05.",
            "emc",
            "Échange"
          ]
        ]
      ],
      [
        "Mardi 29 septembre 2026",
        [
          [
            "9h–9h15",
            "Français — Copie",
            "Cahier du jour — Copie : groupes de mots, présentation et correction.",
            "ECR-P1-02 à 04.",
            "french",
            "Petite trace formative — copie"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture fluence : groupes de mots et ponctuation.",
            "LEC-P1-03 ; LEC-P1-04 · Respecter la ponctuation.",
            "french",
            "Mesure intermédiaire"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : repérer le groupe sujet. Complément intégré au matin : Mon cahier d’écrivain — Écrire plusieurs phrases sur un même sujet.",
            "GRA-P1-06 · Repérer le groupe sujet. ; ECR-P1-06 · Enchaîner plusieurs phrases sur un même sujet.",
            "french",
            "Manipulations"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Tables d’addition et compléments.",
            "CAL-P1-01 ; CAL-P1-02.",
            "maths",
            "Ardoise"
          ],
          [
            "11h15–12h",
            "Mathématiques — Grandeurs et mesures",
            "Tracer un segment de longueur donnée.",
            "MES-P1-02 · Tracer un segment de longueur donnée.",
            "maths",
            "Production instrumentée"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Éducation musicale — chants / expression corporelle",
            "Après le quart d’heure de lecture : échauffement vocal, chant collectif, jeux rythmiques et mouvements simples pour sentir et maintenir la pulsation.",
            "MUS-ANN-01 · Chanter avec justesse et expressivité ; MUS-ANN-02 · Écouter et tenir sa place dans une production collective ; mobiliser le corps pour suivre une pulsation.",
            "arts",
            "Pratique collective"
          ],
          [
            "14h45–15h45",
            "Arts / consolidation",
            "Observer une œuvre représentant la nature puis produire.",
            "ART-ANN-03 · Observer une œuvre représentant la nature ; ART-ANN-01 à 03.",
            "arts",
            "Carnet d’arts"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h45",
            "Numérique / méthodologie",
            "Organisation, outils numériques, projet de classe ou ateliers autonomes non fondamentaux.",
            "Compétences transversales.",
            "common",
            "Ateliers"
          ],

          [
            "16h45–17h",
            "Bilan de journée",
            "Retour sur les apprentissages et préparation du lendemain.",
            "OR-P1-04 ; EMC-P1-01.",
            "emc",
            "Bilan"
          ]
        ]
      ],
      [
        "Jeudi 1er octobre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Rituel Devinette — 2 nouvelles + 1 déjà vue : 1) Ardoise : « On écrit sur moi puis on m’efface pour recommencer. » 2) Agenda : « Je garde les dates, les devoirs et les choses à ne pas oublier. » 3) 🔁 Règle : reformuler le raisonnement d’un camarade.",
            "OR-P1-02 ; OR-P1-04.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Compréhension : personnages, lieu, chronologie et indice.",
            "COM-P1-01 à 05.",
            "french",
            "Lecture longue guidée"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : remplacer le groupe sujet par un pronom. Complément intégré au matin : Mots de la même famille.",
            "GRA-P1-07 · Remplacer le groupe sujet par un pronom. ; VOC-P1-03 · Reconnaître des mots de la même famille.",
            "french",
            "Transformations"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Ajouter ou retrancher 19 et 29.",
            "CAL-P1-03.",
            "maths",
            "Petite trace formative"
          ],
          [
            "11h15–12h",
            "Mathématiques — Géométrie",
            "Point, droite, segment et alignement.",
            "GEO-P1-01 · Reconnaître un point, une droite et un segment ; GEO-P1-02 · Vérifier un alignement.",
            "maths",
            "Manipulation"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Sciences / QLM",
            "<strong>Sciences — La lumière traverse-t-elle tous les matériaux ?</strong><br><br><strong>🎯 Objectif :</strong> distinguer transparent, translucide et opaque à partir d’essais simples.<br><br><strong>🧰 Matériel :</strong> lampe de poche, feuille de papier, carton, papier calque, plastique transparent, tissu.<br><br><strong>1. Question — 5 min</strong><br>Demander : « La lumière peut-elle traverser tous les objets ? »<br><br><strong>2. Prévisions — 5 min</strong><br>Classer rapidement quelques matériaux selon ce que les élèves pensent observer.<br><br><strong>3. Tests — 20 min</strong><br>Éclairer chaque matériau avec une lampe et observer ce qui passe de l’autre côté.<br><strong>Exemples :</strong> plastique transparent : la lumière passe nettement ; calque : elle passe mais diffuse ; carton : elle ne traverse pas.<br><br><strong>4. Classement et trace — 15 min</strong><br>Construire trois colonnes : transparent / translucide / opaque. Écrire une définition courte pour chacune.",
            "SCI-P1-02 · Tester ; SCI-P1-03 · Observer ; SCI-P1-04 · Comparer et classer.",
            "science",
            "Lumière 1/3 — Transparent, translucide, opaque"
          ],
          [
            "15h–15h45",
            "Arts / musique",
            "Chant collectif et maintien de la pulsation.",
            "MUS-ANN-01/02.",
            "arts",
            "Évaluation par observation"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Météo et dialogue court.",
            "ANG-P1-01 à 05.",
            "english",
            "Réinvestissement"
          ],
          [
            "16h25–17h",
            "EMC / numérique / culture",
            "Activité de culture, citoyenneté, numérique ou méthodologie ; aucun nouvel apprentissage de français ou mathématiques.",
            "EMC-P1-01 à 05 ; compétences transversales.",
            "emc",
            "Classe entière"
          ]
        ]
      ],
      [
        "Vendredi 2 octobre 2026",
        [
          [
            "9h–9h30",
            "Français / EMI",
            "Reconnaître différents médias.",
            "EMI-P1-03 · Reconnaître différents médias.",
            "french",
            "Classement"
          ],
          [
            "9h30–10h",
            "Français",
            "Fluence : lecture préparée avec ponctuation.",
            "LEC-P1-01 à 04.",
            "french",
            "Petite trace formative"
          ],
          [
            "10h–10h45",
            "Français — Production d’écrits",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Mon cahier d’écrivain — Production écrite : corriger puis améliorer plusieurs phrases.",
            "ECR-P1-04 à 06.",
            "french",
            "Petite trace formative — écriture"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental.",
            "CAL-P1-01 à 03.",
            "maths",
            "Suivi des automatismes"
          ],
          [
            "11h15–12h",
            "Mathématiques — Calcul posé",
            "Addition et soustraction posées. Complément intégré au matin : Représenter et nommer une fraction simple.",
            "OPE-P1-01 ; OPE-P1-02. ; FRA-P1-01 · Représenter une fraction simple ; FRA-P1-02 · Nommer une fraction simple.",
            "maths",
            "Petite trace formative"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h15",
            "EPS",
            "Jeux collectifs : espace, passes et règles.",
            "EPS-P1-01 à 06.",
            "eps",
            "Évaluation pratique"
          ],
          [
            "15h15–15h45",
            "Arts / projet / lecture documentaire",
            "Projet court, activité artistique ou lecture documentaire liée aux apprentissages de la semaine.",
            "Compétences culturelles et transversales.",
            "arts",
            "Projet"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h40",
            "Géographie",
            "Lire une carte de densité et localiser de grandes villes.",
            "GEOG-P1-02 · Lire une carte de densité ; GEOG-P1-03 · Localiser Paris et quelques grandes villes.",
            "history",
            "Carte légendée"
          ],
          [
            "16h40–17h",
            "EMC",
            "Coopérer dans un travail collectif.",
            "EMC-P1-04 · Coopérer dans un travail collectif.",
            "emc",
            "Observation formative"
          ]
        ]
      ]
    ]
  },
  {
    "key": "p1s4",
    "title": "Semaine 6 — Finir les séquences et recueillir une première trace",
    "dates": "Du lundi 5 au vendredi 9 octobre 2026",
    "focus": "Achever les séquences en cours ; recueillir une première évaluation de référence seulement lorsqu’un apprentissage a été suffisamment entraîné.",
    "days": [
      [
        "Lundi 5 octobre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Quoi de neuf ? : écoute, reformulation et réponse dans le sujet.",
            "OR-P1-01 à 04.",
            "french",
            "Bilan oral par observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Compréhension complète d’un récit court.",
            "COM-P1-01 à 05.",
            "french",
            "Petite trace formative — lecture"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Cahier du jour — Orthographe : mots étudiés et marques du pluriel.",
            "ORT-P1-02 à 04.",
            "french",
            "Dictée évaluée"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental : tables, compléments, ±9/19/29.",
            "CAL-P1-01 à 03.",
            "maths",
            "Suivi des automatismes"
          ],
          [
            "11h15–12h",
            "Mathématiques — Résolution de problèmes",
            "Résoudre un problème additif en deux étapes.",
            "PRO-P1-03 · Résoudre un problème additif en deux étapes.",
            "maths",
            "Recherche guidée"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Histoire",
            "Évaluation de référence : construire et lire une frise chronologique.",
            "HIS-P1-02 ; HIS-P1-03.",
            "history",
            "Évaluation de référence — frise + cartes"
          ],
          [
            "15h–15h45",
            "EPS",
            "Défi final de course longue puis lecture de ses progrès.",
            "EPS-P1-01 à 03.",
            "eps",
            "Évaluation pratique finale"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Mini-dialogues : saluer, se présenter, parler de la météo.",
            "ANG-P1-01 à 05.",
            "english",
            "Observation formative orale"
          ],
          [
            "16h25–17h",
            "EMC / méthodologie",
            "Règles, responsabilités, coopération ou autonomie.",
            "EMC-P1-01 à 05.",
            "emc",
            "Échange"
          ]
        ]
      ],
      [
        "Mardi 6 octobre 2026",
        [
          [
            "9h–9h15",
            "Français — Copie",
            "Cahier du jour — Copie-bilan.",
            "ECR-P1-01 à 04.",
            "french",
            "Petite trace formative — copie"
          ],
          [
            "9h15–10h",
            "Français",
            "Fluence : lecture finale pour un premier groupe.",
            "LEC-P1-01 à 04.",
            "french",
            "Petite trace formative"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Évaluation de compréhension P1 — Le carnet retrouvé : identifier les personnages et retrouver des informations explicites dans un texte court. Complément intégré au matin : Mon cahier d’écrivain — Réécrire un texte court après retour de l’enseignant.",
            "COM-P1-01 · Identifier les personnages ; COM-P1-04 · Prélever une information explicite. ; ECR-P1-04 à 06.",
            "french",
            "Évaluation ciblée — Compréhension P1",
            null,
            {
              "documents": [
                {
                  "titre": "Compréhension P1 — Le carnet retrouvé",
                  "url": "https://drive.google.com/file/d/1-vh0HueECCJFy-bO_Bd8rMz5TxCQA3Wo/view?usp=drivesdk",
                  "type": "pdf"
                }
              ]
            }
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental : reprise ciblée selon les résultats.",
            "CAL-P1-01 à 03.",
            "maths",
            "Remédiation"
          ],
          [
            "11h15–12h",
            "Mathématiques — Grandeurs et mesures",
            "Mesurer et tracer des segments.",
            "MES-P1-01 ; MES-P1-02.",
            "maths",
            "Petite trace formative"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Éducation musicale — chants / expression corporelle",
            "Après le quart d’heure de lecture : échauffement vocal, chant collectif, jeux rythmiques et mouvements simples pour sentir et maintenir la pulsation.",
            "MUS-ANN-01 · Chanter avec justesse et expressivité ; MUS-ANN-02 · Écouter et tenir sa place dans une production collective ; mobiliser le corps pour suivre une pulsation.",
            "arts",
            "Pratique collective"
          ],
          [
            "14h45–15h45",
            "Arts / consolidation",
            "Finaliser la production sur la nature ; ateliers de remédiation pour toute la classe.",
            "ART-ANN-01 à 04.",
            "arts",
            "Présentation des productions"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h45",
            "Numérique / méthodologie",
            "Organisation, outils numériques, projet de classe ou ateliers autonomes non fondamentaux.",
            "Compétences transversales.",
            "common",
            "Ateliers"
          ],

          [
            "16h45–17h",
            "Bilan de journée",
            "Retour sur les apprentissages et préparation du lendemain.",
            "OR-P1-04 ; EMC-P1-01.",
            "emc",
            "Bilan"
          ]
        ]
      ],
      [
        "Jeudi 8 octobre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Rituel Devinette — 2 nouvelles + 1 déjà vue : 1) Ciseaux : « J’ai deux lames et deux anneaux ; je découpe le papier. » 2) Colle : « Je sers à fixer une feuille ou une image sans agrafe. » 3) 🔁 Gomme : répondre de façon autonome et justifier.",
            "OR-P1-03 ; OR-P1-04.",
            "french",
            "Observation"
          ],
          [
            "9h15–10h",
            "Français",
            "Fluence : lecture finale pour un second groupe.",
            "LEC-P1-01 à 04.",
            "french",
            "Petite trace formative"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Vocabulaire : ordre alphabétique. Complément intégré au matin : Chercher un mot dans le dictionnaire.",
            "VOC-P1-04 · Ranger des mots dans l’ordre alphabétique. ; VOC-P1-05 · Chercher un mot dans le dictionnaire.",
            "french",
            "Entraînement"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental ciblé.",
            "CAL-P1-01 à 03.",
            "maths",
            "Remédiation"
          ],
          [
            "11h15–12h",
            "Mathématiques — Géométrie",
            "Reconnaître et vérifier un angle droit.",
            "GEO-P1-03 · Reconnaître un angle droit.",
            "maths",
            "Équerre"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Sciences / QLM",
            "<strong>Sciences — Comment se forme une ombre ?</strong><br><br><strong>🎯 Objectif :</strong> comprendre qu’une ombre apparaît lorsqu’un objet opaque bloque la lumière.<br><br><strong>🧰 Matériel :</strong> lampes de poche, petits objets opaques, feuille blanche ou mur clair.<br><br><strong>1. Défi — 5 min</strong><br>Demander aux élèves de produire l’ombre d’un objet sur une feuille.<br><br><strong>2. Manipulation — 15 min</strong><br>Tester plusieurs positions de la lampe, de l’objet et de l’écran. Faire varier la distance lampe-objet.<br><strong>Exemple :</strong> rapprocher l’objet de la lampe agrandit généralement l’ombre projetée.<br><br><strong>3. Mise en commun — 10 min</strong><br>Identifier les trois éléments nécessaires : une source lumineuse, un objet opaque et un écran ou une surface qui reçoit l’ombre.<br><br><strong>4. Trace — 15 min</strong><br>Faire un schéma légendé lampe → objet → ombre et écrire : « Une ombre se forme lorsqu’un objet opaque bloque une partie de la lumière. »",
            "SCI-P1-02 · Expérimenter ; SCI-P1-03 · Observer ; SCI-P1-05 · Expliquer simplement.",
            "science",
            "Lumière 2/3 — Comprendre la formation d’une ombre"
          ],
          [
            "15h–15h45",
            "Arts / musique",
            "Chant et pulsation : interprétation collective.",
            "MUS-ANN-01/02.",
            "arts",
            "Évaluation par observation"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Repères culturels sur l’Angleterre.",
            "ANG-P1-06 · Identifier quelques repères sur l’Angleterre et Halloween.",
            "english",
            "Carte culturelle"
          ],
          [
            "16h25–17h",
            "EMC / numérique / culture",
            "Activité de culture, citoyenneté, numérique ou méthodologie ; aucun nouvel apprentissage de français ou mathématiques.",
            "EMC-P1-01 à 05 ; compétences transversales.",
            "emc",
            "Classe entière"
          ]
        ]
      ],
      [
        "Vendredi 9 octobre 2026",
        [
          [
            "9h–9h30",
            "Français / EMI",
            "Identifier le but d’un document.",
            "EMI-P1-04 · Identifier le but d’un document.",
            "french",
            "Analyse courte"
          ],
          [
            "9h30–10h",
            "Français",
            "Évaluation lexique / vocabulaire P1 : classer des mots qui vont ensemble et ranger des mots dans l’ordre alphabétique.",
            "VOC-P1-02 · Regrouper des mots par thème ; VOC-P1-04 · Ranger des mots dans l’ordre alphabétique.",
            "french",
            "Évaluation ciblée — Lexique P1",
            null,
            {
              "documents": [
                {
                  "titre": "Lexique / vocabulaire P1 — Évaluation 1",
                  "url": "https://drive.google.com/file/d/1gzmXZRIwOgYY8wwR8KCninkzy6vN0xcu/view?usp=drivesdk",
                  "type": "image"
                }
              ]
            }
          ],
          [
            "10h–10h45",
            "Français — Production d’écrits",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Mon cahier d’écrivain — Production écrite : plusieurs phrases cohérentes.",
            "ECR-P1-05 ; ECR-P1-06.",
            "french",
            "Petite trace formative — écriture"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental de consolidation.",
            "CAL-P1-01 à 03.",
            "maths",
            "Suivi"
          ],
          [
            "11h15–12h",
            "Mathématiques — Problèmes / Calcul",
            "Évaluation P1 ciblée : comprendre la question d’un problème et poser une addition. Complément intégré au matin : Composer une somme en euros.",
            "PRO-P1-01 ; OPE-P1-01 ; MON-P1-01 · Composer une somme en euros.",
            "maths",
            "Évaluation de référence — Mathématiques P1"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h15",
            "EPS",
            "Jeux collectifs : évaluation des choix et des règles.",
            "EPS-P1-01 à 06.",
            "eps",
            "Évaluation pratique"
          ],
          [
            "15h15–15h45",
            "Arts / projet / lecture documentaire",
            "Projet court, activité artistique ou lecture documentaire liée aux apprentissages de la semaine.",
            "Compétences culturelles et transversales.",
            "arts",
            "Projet"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h40",
            "Géographie",
            "Espaces densément et faiblement peuplés.",
            "GEOG-P1-04 · Identifier les espaces densément peuplés ; GEOG-P1-04 · Identifier les espaces faiblement peuplés.",
            "history",
            "Comparaison de cartes"
          ],
          [
            "16h40–17h",
            "EVAR / EMC",
            "Intimité, respect et adultes de confiance.",
            "EVAR-P1-01 à 04.",
            "emc",
            "Échanges sans évaluation écrite"
          ]
        ]
      ]
    ]
  },
  {
    "key": "p1s5",
    "title": "Semaine 7 — Dernières traces de référence et remédiation",
    "dates": "Du lundi 12 au vendredi 16 octobre 2026",
    "focus": "Limiter la charge : deux situations QLM de référence maximum, puis réinvestissement et remédiation ciblée.",
    "days": [
      [
        "Lundi 12 octobre 2026",
        [
          [
            "Horaire selon passage",
            "Photographe scolaire",
            "Passage du photographe ; les séances peuvent être légèrement décalées sans supprimer une notion essentielle.",
            "Vie de l’école.",
            "common",
            "Événement école"
          ],
          [
            "9h–9h15",
            "Français",
            "Bilan oral de période : écouter, reformuler, répondre.",
            "OR-P1-01 à 04.",
            "french",
            "Petite trace formative"
          ],
          [
            "9h15–10h",
            "Français",
            "Ateliers de compréhension selon les besoins.",
            "COM-P1-01 à 05.",
            "french",
            "Remédiation ou validation différée"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Cahier du jour — Bilan des mots appris — La Grande Muraille. Écrire les 10 mots annoncés et travaillés.",
            "ORT-P1-01 à 04 ; ECR-P1-04.",
            "french",
            "Remédiation ciblée"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Ateliers de calcul mental selon les résultats.",
            "CAL-P1-01 à 03.",
            "maths",
            "Remédiation / validation différée"
          ],
          [
            "11h15–12h",
            "Mathématiques — Résolution de problèmes",
            "Problèmes additifs à une ou deux étapes.",
            "PRO-P1-01 à 03.",
            "maths",
            "Petite trace formative"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Histoire",
            "Retour sur la frise : reprendre les repères encore fragiles et expliciter les erreurs.",
            "HIS-P1-02 ; HIS-P1-03.",
            "history",
            "Remédiation / validation différée"
          ],
          [
            "15h–15h45",
            "EPS",
            "Jeux collectifs et rôles : tournoi régulé.",
            "EPS-P1-01 à 06.",
            "eps",
            "Bilan par observation"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Évaluation orale des élèves non encore entendus.",
            "ANG-P1-01 à 05.",
            "english",
            "Observation formative orale"
          ],
          [
            "16h25–17h",
            "EMC / méthodologie",
            "Règles, responsabilités, coopération ou autonomie.",
            "EMC-P1-01 à 05.",
            "emc",
            "Échange"
          ]
        ]
      ],
      [
        "Mardi 13 octobre 2026",
        [
          [
            "Horaire selon passage",
            "Photographe scolaire",
            "Passage du photographe ; les séances peuvent être légèrement décalées sans supprimer une notion essentielle.",
            "Vie de l’école.",
            "common",
            "Événement école"
          ],
          [
            "9h–9h15",
            "Français — Copie",
            "Cahier du jour — Copie de réinvestissement.",
            "ECR-P1-01 à 04.",
            "french",
            "Remédiation / validation différée"
          ],
          [
            "9h15–10h",
            "Français",
            "Fluence : derniers passages individuels et ateliers autonomes.",
            "LEC-P1-01 à 04.",
            "french",
            "Petite trace formative"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Grammaire : ateliers de remédiation phrase, verbe et sujet. Complément intégré au matin : Mon cahier d’écrivain — Finaliser et présenter un petit texte.",
            "GRA-P1-01 à 07. ; ECR-P1-05 ; ECR-P1-06.",
            "french",
            "Remédiation ciblée"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental en jeu.",
            "CAL-P1-01 à 03.",
            "maths",
            "Réinvestissement"
          ],
          [
            "11h15–12h",
            "Mathématiques — Fractions",
            "Fractions simples : représenter et nommer.",
            "FRA-P1-01 ; FRA-P1-02.",
            "maths",
            "Petite trace formative"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–14h45",
            "Éducation musicale — chants / expression corporelle",
            "Après le quart d’heure de lecture : échauffement vocal, chant collectif, jeux rythmiques et mouvements simples pour sentir et maintenir la pulsation.",
            "MUS-ANN-01 · Chanter avec justesse et expressivité ; MUS-ANN-02 · Écouter et tenir sa place dans une production collective ; mobiliser le corps pour suivre une pulsation.",
            "arts",
            "Pratique collective"
          ],
          [
            "14h45–15h45",
            "Arts / consolidation",
            "Projet artistique et ateliers de reprise pour toute la classe.",
            "ART-ANN-01 à 04.",
            "arts",
            "Pas d’évaluation commune"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h45",
            "Numérique / méthodologie",
            "Organisation, outils numériques, projet de classe ou ateliers autonomes non fondamentaux.",
            "Compétences transversales.",
            "common",
            "Ateliers"
          ],

          [
            "16h45–17h",
            "Bilan de journée",
            "Retour sur les apprentissages et préparation du lendemain.",
            "OR-P1-04 ; EMC-P1-01.",
            "emc",
            "Bilan"
          ]
        ]
      ],
      [
        "Jeudi 15 octobre 2026",
        [
          [
            "9h–9h15",
            "Français",
            "Rituel Devinette — 2 nouvelles + 1 déjà vue : 1) Dictionnaire : « Je contiens beaucoup de mots rangés dans l’ordre alphabétique et j’aide à comprendre leur sens. » 2) Horloge : « Je suis dans la classe ; mes aiguilles indiquent l’heure. » 3) 🔁 Tableau : devinette-bilan, réponse complète et justification.",
            "OR-P1-04.",
            "french",
            "Réinvestissement"
          ],
          [
            "9h15–10h",
            "Français",
            "Lecture autonome et retour sur les stratégies efficaces.",
            "LEC-P1-01 à 04 ; COM-P1-01 à 05.",
            "french",
            "Métacognition"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Dictionnaire : ordre alphabétique et recherche d’un mot. Complément intégré au matin : Respecter les règles d’un échange en ligne.",
            "VOC-P1-04 ; VOC-P1-05. ; EMI-P1-05 · Respecter les règles d’un échange en ligne.",
            "french",
            "Petite trace formative"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Calcul mental : bilan personnel.",
            "CAL-P1-01 à 03.",
            "maths",
            "Petite trace formative"
          ],
          [
            "11h15–12h",
            "Mathématiques — Géométrie / données",
            "Décrire un solide usuel et lire un tableau simple.",
            "SOL-P1-01 · Décrire un solide usuel ; DON-P1-01 · Lire un tableau simple.",
            "maths",
            "Petite trace formative"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h",
            "Sciences / QLM",
            "<strong>Sciences — Lumière et ombres : réinvestissement</strong><br><br><strong>🎯 Objectif :</strong> réutiliser les notions transparent / translucide / opaque et expliquer simplement la formation d’une ombre.<br><br><strong>1. Classement — 10 min</strong><br>Présenter 6 matériaux ou dessins d’objets et demander de les classer dans les trois catégories.<br><br><strong>2. Situation-problème — 15 min</strong><br>Présenter un dessin avec une lampe, un objet et plusieurs positions possibles pour l’ombre. Demander de choisir la position correcte et de justifier.<br><br><strong>3. Petite expérience — 10 min</strong><br>Par groupes, produire une ombre nette puis modifier sa taille en déplaçant la lampe ou l’objet.<br><br><strong>4. Bilan — 10 min</strong><br>Trace courte : « Les objets opaques bloquent la lumière et peuvent former une ombre. Les matériaux transparents laissent passer la lumière. »",
            "SCI-P1-03 · Observer ; SCI-P1-04 · Classer ; SCI-P1-05 · Tirer une conclusion.",
            "science",
            "Lumière 3/3 — Réinvestissement et bilan"
          ],
          [
            "15h–15h45",
            "Arts / musique",
            "Présentation du chant et maintien collectif de la pulsation.",
            "MUS-ANN-01/02.",
            "arts",
            "Bilan collectif"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h25",
            "Anglais",
            "Jeu culturel sur l’Angleterre et Halloween.",
            "ANG-P1-06.",
            "english",
            "Réinvestissement"
          ],
          [
            "16h25–17h",
            "EMC / numérique / culture",
            "Activité de culture, citoyenneté, numérique ou méthodologie ; aucun nouvel apprentissage de français ou mathématiques.",
            "EMC-P1-01 à 05 ; compétences transversales.",
            "emc",
            "Classe entière"
          ]
        ]
      ],
      [
        "Vendredi 16 octobre 2026",
        [
          [
            "9h–9h30",
            "Français / EMI",
            "Un jour, une actu : bilan des notions d’information et de média.",
            "EMI-P1-01 à 05.",
            "french",
            "Réinvestissement sans grosse évaluation"
          ],
          [
            "9h30–10h",
            "Français",
            "Lecture plaisir et conseil de lecteur.",
            "LEC-P1-01 à 04 ; LIT-P1-01 · Entrer dans son parcours de lecteur ; OR-P1-04.",
            "french",
            "Valorisation"
          ],
          [
            "10h–10h45",
            "Français",
            "✍️ Majuscule du jour — 5 min incluses dans ce créneau : observer le geste, tracer puis réemployer la lettre dans un mot. Portfolio : choisir une réussite et expliquer ses progrès.",
            "ECR-P1-04 ; compétences de français travaillées en P1.",
            "french",
            "Bilan individuel"
          ],
          [
            "11h–11h15",
            "Mathématiques — Calcul mental",
            "Défi de calcul mental coopératif.",
            "CAL-P1-01 à 03.",
            "maths",
            "Jeu bilan"
          ],
          [
            "11h15–12h",
            "Mathématiques — Mesures / géométrie / données",
            "Monnaie, géométrie et données : ateliers de réinvestissement. Complément intégré au matin : Lecture des progrès et objectifs de P2.",
            "MON-P1-01 ; GEO-P1-01 à 03 ; DON-P1-01. ; Compétences mathématiques de P1.",
            "maths",
            "Pas de nouvelle évaluation lourde"
          ],
          [
            "14h–14h15",
            "Quart d’heure de lecture",
            "Lecture autonome + rotation Maître Hibou ; les autres élèves lisent en autonomie.",
            "LIT-P1-01 · Entrer dans son parcours de lecteur.",
            "french",
            "Rituel quotidien"
          ],
          [
            "14h15–15h15",
            "EPS",
            "Jeux collectifs choisis et arbitrés par les élèves.",
            "EPS-P1-01 à 06.",
            "eps",
            "Valorisation"
          ],
          [
            "15h15–15h45",
            "Arts / projet / lecture documentaire",
            "Projet court, activité artistique ou lecture documentaire liée aux apprentissages de la semaine.",
            "Compétences culturelles et transversales.",
            "arts",
            "Projet"
          ],
          [
            "15h45–16h",
            "Récréation",
            "Récréation de l’après-midi.",
            "",
            "break",
            "Pause"
          ],
          [
            "16h–16h40",
            "Géographie",
            "Évaluation de référence : se repérer en France et lire une carte de population.",
            "GEOG-P1-01 ; GEOG-P1-02.",
            "history",
            "Évaluation de référence — Géographie"
          ],
          [
            "16h40–17h",
            "EMC",
            "Observation structurée : règles de la classe et de l’école, droits/devoirs, responsabilités et coopération.",
            "EMC-P1-01 à 05.",
            "emc",
            "Trace EMC par observation"
          ]
        ]
      ]
    ]
  }
];
  data.p1StructureVersion = '36.67';
  data.validateP1Schedule = function(){
    const problems=[];
    const parse=t=>{const m=String(t).match(/(\d{1,2})h(?:(\d{2}))?[–-](\d{1,2})h(?:(\d{2}))?/);if(!m)return null;return [(+m[1])*60+(+(m[2]||0)),(+m[3])*60+(+(m[4]||0))];};
    (data.p1DetailedWeeks||[]).forEach(w=>(w.days||[]).forEach(([label,rows])=>{
      const md=String(label).replace(/1er/g,'1').match(/(d{1,2})s+(septembre|octobre)s+2026/i); const future=md && (md[2].toLowerCase()==='octobre' || Number(md[1])>=14); if(!future)return;
      rows.forEach(r=>{const span=parse(r[0]);const cat=String(r[4]||'').toLowerCase();if(span&&cat==='eps'&&(span[1]-span[0])>60)problems.push(label+' : EPS > 60 min ('+r[0]+')');if(span&&span[0]>=14*60+15&&(cat==='maths'||cat==='french'))problems.push(label+' : fondamental après 14h15 ('+r[0]+' '+r[1]+')');});
    }));
    if(problems.length) console.warn('[P1 structure]',problems);
    return problems;
  };
  data.validateP1Schedule();

})(window);
