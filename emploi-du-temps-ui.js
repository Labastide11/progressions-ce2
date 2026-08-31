
(() => {
  if(!window.PROGRESSIONS_EDT_DATA){
    console.error('Données des emplois du temps absentes.');
    return;
  }
  const periods = {
    rentree:{title:'Rentrée — Semaines 1 et 2 (sans CHAM)',note:'Emploi du temps de secours pour les deux premières semaines, tant que la date de démarrage de la CHAM n’est pas confirmée. Toute la classe reste réunie le mardi et le jeudi.',hours:['9 h 10','4 h 35','1 h 30','2 h 30','2 h','1 h','1 h 15'],minutes:[550,275,90,150,120,60,75],days:{},mode:'rentree'},
    p1:{title:'Période 1',note:'Installation des routines. EPS en classe, sans créneau sportif extérieur. Français et mathématiques restent prioritaires.',hours:['9 h 10','4 h 35','1 h 30','2 h 30','2 h','1 h','1 h 15'],minutes:[550,275,90,150,120,60,75],days:{}},
    p2:{title:'Période 2 — Piscine le vendredi',note:'Vendredi après-midi réservé à la piscine de Grazailles. Le complément de mathématiques est déplacé sur un créneau commun.',hours:['9 h 10','4 h 35','1 h 15','3 h','1 h 45','1 h','1 h 15'],minutes:[550,275,75,180,105,60,75],days:{vendredi:'pool'}},
    p3:{title:'Période 3 — Cavayère le lundi matin',note:'Lundi matin : course d’orientation et sandball. Les apprentissages fondamentaux manqués sont redistribués uniquement sur des temps de classe entière.',hours:['9 h 10','4 h 35','1 h 15','3 h 30','1 h 30','45 min','1 h 15'],minutes:[550,275,75,210,90,45,75],days:{lundi:'cavayere'}},
    p4:{title:'Période 4 — Domec le lundi après-midi',note:'Lundi après-midi : gymnastique et lutte. Les matinées fondamentales sont inchangées.',hours:['9 h 10','4 h 35','1 h 15','3 h 15','1 h 30','45 min','1 h 30'],minutes:[550,275,75,195,90,45,90],days:{lundi:'domec'}},
    p5:{title:'Période 5 — Rééquilibrage annuel',note:'Période longue consacrée au rééquilibrage des arts, sciences, histoire-géographie et EMC, sans réduire français ni mathématiques.',hours:['9 h 10','4 h 35','1 h 30','2 h 08','2 h 07','1 h 19','1 h 11'],minutes:[550,275,90,128,127,79,71],days:{}}
  };
  const base={
    lundi:[['9h–9h15','Quoi de neuf ?','Oral structuré','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Dictée de mots + dictée flash 1','Orthographe et vocabulaire','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Problèmes du jour','2 problèmes courts — oral / ardoise','maths'],['11h15–12h','Mathématiques','Calcul mental (5 min) + nouvel apprentissage','maths'],['12h–14h','Cantine ou repas à la maison','Pause méridienne','lunch'],['14h–14h15','Quart d’heure de lecture','Lecture offerte ou lecture autonome — retour au calme','french'],['14h15–15h45','EPS / QLM selon période','','eps'],['15h45–16h','Récréation','','break'],['16h–16h25','Anglais','','english'],['16h25–17h','QLM / EMC','','history']],
    mardi:[['9h–9h15','Copie','','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Dictée flash 2 + étude de la langue','10 min de dictée puis DRAS','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Problèmes du jour','2 problèmes courts — oral / ardoise','maths'],['11h15–12h','Mathématiques','Calcul mental (5 min) + nouvel apprentissage','maths'],['12h–14h','Cantine ou repas à la maison','Pause méridienne','lunch'],['14h–14h15','Quart d’heure de lecture','Lecture offerte ou lecture autonome — retour au calme','french'],['14h15–14h30','Anglais','Rituel oral court avant le départ CHAM','english'],['14h30–15h45','CHAM au conservatoire','Non-CHAM : arts, plan de travail, consolidation','cham'],['15h45–16h','Récréation','','break'],['16h–16h30','CHAM au conservatoire','Poursuite des ateliers non-CHAM','cham'],['16h30–16h45','Anglais','Réactivation orale en classe entière','english'],['16h45–17h','Bilan de journée','Parole aux élèves et préparation du lendemain','emc']],
    jeudi:[['9h–9h15','Devinette','','french'],['9h15–10h','Lecture-compréhension','','french'],['10h–10h45','Dictée flash 3 + production d’écrit court','10 min de dictée puis DRAS et écriture','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Problèmes du jour','2 problèmes courts — oral / ardoise','maths'],['11h15–12h','Mathématiques','Calcul mental (5 min) + nouvel apprentissage','maths'],['12h–14h','Cantine ou repas à la maison','Pause méridienne','lunch'],['14h–14h15','Quart d’heure de lecture','Lecture offerte ou lecture autonome — retour au calme','french'],['14h15–15h','Sciences / QLM','Classe entière','science'],['15h–16h','Chant choral CHAM','Non-CHAM : arts ou consolidation','cham'],['16h–16h15','Récréation adaptée','','break'],['16h15–16h40','Anglais','Classe entière','english'],['16h40–17h','Vocabulaire / production écrite','','french']],
    vendredi:[['9h–9h30','Un jour, une actu','Oral, compréhension, EMC','french'],['9h30–10h','Lecture et vocabulaire','','french'],['10h–10h45','Dictée bilan + correction raisonnée','Réemploi en production d’écrit court','french'],['10h45–11h','Récréation','','break'],['11h–11h15','Problèmes du jour','2 problèmes courts — oral / ardoise','maths'],['11h15–12h','Résolution de problèmes','2 problèmes + recherche, procédures et correction','maths'],['12h–14h','Cantine ou repas à la maison','Pause méridienne','lunch'],['14h–14h15','Quart d’heure de lecture','Lecture offerte ou lecture autonome — retour au calme','french'],['14h15–14h45','Mathématiques','Calcul mental, grandeurs, géométrie ou données','maths'],['14h45–15h45','EPS / projet selon période','','eps'],['15h45–16h','Récréation','','break'],['16h–16h40','Production écrite / QLM','','mixed'],['16h40–17h','Conseil et bilan de semaine','','emc']]
  };
  const detailedWeeks={
    rentree1:{
      title:'Semaine 1 — Accueillir, rassurer et apprendre à se connaître',
      dates:'Du mardi 1er au vendredi 4 septembre 2026',
      note:'Académie de Montpellier — zone C. La première semaine commence le mardi : aucun lundi fictif. Tous les élèves sont présents ; la CHAM n’est pas encore appliquée.',
      days:[
        ['Mardi 1er septembre 2026',[
          ['9h–9h30','Accueil — découverte de la classe','Accueil individualisé, installation, découverte de la classe et jeu rapide pour apprendre les prénoms.','Comprendre l’organisation de la classe et adopter les premières routines.','common'],
          ['9h30–10h','Oral — faire connaissance','Portrait chinois « Mon portrait », puis présentation orale en binômes pour apprendre à se connaître.','Écouter autrui, attendre son tour et prendre la parole à bon escient.','emc'],
          ['10h–10h45','Lecture — compréhension orale','Lecture offerte de rentrée, anticipation à partir de la couverture puis compréhension orale.','Reformuler les informations essentielles d’un texte entendu.','french'],
          ['11h–11h20','Calcul mental — diagnostic','Calcul mental diagnostique sur ardoise.','Mobiliser les premiers faits numériques et expliciter une procédure.','maths'],
          ['11h20–12h','Numération — diagnostic','Défis diagnostiques : lire, écrire et comparer des nombres.','Lire, écrire, représenter et comparer des nombres entiers.','maths'],
          ['14h–14h15','Quart d’heure de lecture','Lecture offerte : entrée dans une œuvre suivie, sans questionnaire.','Écouter, se construire des images mentales et manifester sa compréhension.','french'],
          ['14h15–14h40','Production d’écrit — projet de CE2','Écrire : « Ce que j’aimerais apprendre en CE2 ».','Produire des phrases cohérentes et lisibles.','french'],
          ['14h40–15h15','Arts plastiques — porte-manteau','Créer son étiquette et commencer une production « palette de couleurs » pour le porte-manteau.','Expérimenter, produire et présenter une réalisation plastique.','arts'],
          ['15h15–15h45','Méthodologie — matériel et rangement','Découvrir les cahiers, classeurs, casiers, règles de rangement et premières responsabilités.','Utiliser les outils de la classe avec autonomie.','common'],
          ['16h–16h30','EMC — règles de la classe','Élaborer les règles de la classe à partir de post-it : ce qui aide à apprendre / ce qui gêne.','Comprendre le sens des règles collectives.','emc'],
          ['16h30–17h','Anglais — saluer et prendre congé','Découverte et compréhension orale : Hello / Hi / Good morning / Goodbye / See you on…','ANG-P1-01 · Comprendre une salutation familière ; ANG-P1-02 · Saluer et prendre congé.','english']
        ]],
        ['Jeudi 3 septembre 2026',[
          ['9h–9h15','Oral — devinette et justification','Devinette de rentrée et prise de parole justifiée.','Formuler une réponse et la justifier oralement.','french'],
          ['9h15–10h','Lecture — consignes et indices','Défi de rentrée en lecture : lire une consigne, chercher des indices et coopérer.','Lire silencieusement et prélever des informations explicites.','french'],
          ['10h–10h45','Grammaire — la phrase','Réviser la phrase : majuscule, point et ordre des mots.','Identifier une phrase et respecter ses marques essentielles.','french'],
          ['11h–11h15','Calcul mental — nombres et compléments','Calcul mental : nombres et compléments.','Calculer mentalement avec des nombres simples.','maths'],
          ['11h15–12h','Numération — diagnostic ludique','Défis diagnostiques de numération présentés comme des jeux, sans notation.','Décomposer, ranger et comparer des nombres.','maths'],
          ['14h–14h15','Quart d’heure de lecture','Lecture offerte : poursuivre le texte commencé et échanger brièvement sur une impression.','Écouter avec attention et reformuler un élément marquant.','french'],
          ['14h15–14h45','Espace — se repérer dans l’école','Se repérer dans l’école.','Se repérer dans un espace proche et respecter les règles de sécurité.','science'],
          ['14h45–15h45','Éducation musicale — chant et rythme','Rentrée en musique : écoute, chant collectif et jeux rythmiques.','Mémoriser et interpréter un chant ; reproduire un rythme.','arts'],
          ['16h–16h30','Lecture — découverte de la bibliothèque','Découvrir la bibliothèque et choisir un livre.','Choisir un ouvrage et adopter une posture de lecteur.','french'],
          ['16h30–17h','Bilan — apprentissages du jour','Compléter « Ce que j’ai appris aujourd’hui ».','Faire le bilan d’une journée de travail.','common']
        ]],
        ['Vendredi 4 septembre 2026',[
          ['9h–9h30','EMI — comprendre l’actualité','Découverte du rituel « Un jour, une actu » et échange sur les attentes de l’année.','Écouter, comprendre et exprimer une réaction pertinente.','french'],
          ['9h30–10h','Lecture — reformulation','Lecture entendue puis reformulation.','Identifier les personnages, le lieu et les actions principales.','french'],
          ['10h–10h45','Orthographe — dictée et copie','Dictée diagnostique courte puis copie soignée d’un texte de rentrée.','Copier lisiblement en respectant la mise en page et la ponctuation.','french'],
          ['11h–11h15','Calcul mental — doubles et compléments','Calcul mental : doubles et compléments.','Mémoriser et utiliser des faits numériques simples.','maths'],
          ['11h15–12h','Géométrie — diagnostic','Diagnostic de géométrie.','Reconnaître, nommer et reproduire des figures simples.','maths'],
          ['14h–14h15','Quart d’heure de lecture','Lecture offerte : écouter pour le plaisir et anticiper la suite.','Écouter une œuvre et formuler une hypothèse.','french'],
          ['14h15–14h45','EPS — jeux coopératifs','Jeux collectifs de coopération.','Coopérer, respecter les règles et tenir un rôle.','eps'],
          ['14h45–15h30','Sciences — observer et questionner','Observer, questionner et formuler une hypothèse.','Pratiquer une démarche d’investigation.','science'],
          ['15h30–15h45','Anglais — saluer et se présenter','Saluer et dire son prénom.','Utiliser quelques formules simples pour communiquer.','english'],
          ['16h–16h30','EMC — responsabilités','Attribuer les responsabilités de classe.','S’engager dans la vie collective.','emc'],
          ['16h30–17h','Bilan — première semaine','Bilan de la première semaine : portrait d’un camarade « Je vous présente » et expression des besoins.','Exprimer une réussite, une difficulté et un besoin.','common']
        ]]
      ]
    },
    rentree2:{
      title:'Semaine 2 — Installer les outils et les premières routines',
      dates:'Du lundi 7 au vendredi 11 septembre 2026',
      note:'Académie de Montpellier — zone C. La classe entière est prévue sur tous les créneaux. Les adaptations CHAM seront ajoutées uniquement lorsque le dispositif commencera réellement.',
      days:[
        ['Lundi 7 septembre 2026',[
          ['9h–9h15','Oral — Quoi de neuf ?','« Quoi de neuf ? » : règles d’écoute et de prise de parole.','Participer à des échanges dans des situations variées.','french'],
          ['9h15–10h','Lecture — compréhension','Lecture-compréhension : personnages, lieu et actions.','Comprendre un texte et identifier ses informations essentielles.','french'],
          ['10h–10h25','Orthographe — dictée diagnostique','Dictée diagnostique courte, présentée comme un point de départ pour progresser.','Écrire sous la dictée en mobilisant les correspondances graphophonologiques.','french'],
          ['10h25–10h45','Orthographe — correction et copie','Correction et copie soignée.','Réviser son écrit et copier avec exactitude.','french'],
          ['11h–11h15','Problèmes — oral et calcul mental','Problème oral et calcul mental.','Chercher, représenter et expliquer une procédure.','maths'],
          ['11h15–12h','Numération — diagnostic jusqu’à 999','Évaluation diagnostique positive : lire, écrire, décomposer et comparer jusqu’à 999.','Utiliser diverses représentations des nombres entiers.','maths'],
          ['14h–14h15','Quart d’heure de lecture','Lecture offerte : retrouver les personnages et rappeler l’épisode précédent.','Mémoriser et reformuler les éléments essentiels d’un récit.','french'],
          ['14h15–14h45','Temps — calendrier','Journée, semaine, mois et calendrier de septembre.','Se repérer dans le temps et utiliser un calendrier.','history'],
          ['14h45–15h30','EPS — relais et coopération','Relais et jeux de coopération.','Coopérer et produire une performance mesurée.','eps'],
          ['15h30–15h45','Retour au calme — bilan EPS','Verbaliser une règle respectée et préparer la reprise en classe.','Identifier une réussite et adopter une posture calme.','common'],
          ['16h–16h30','EMC — droits et devoirs','Droits et devoirs de l’élève.','Comprendre les principes de la vie collective.','emc'],
          ['16h30–17h','Méthodologie — agenda et cartable','Agenda, cartable et bilan des apprentissages.','Organiser son travail personnel.','common']
        ]],
        ['Mardi 8 septembre 2026',[
          ['9h–9h15','Copie — méthode et soin','Rituel de copie.','Copier rapidement et avec exactitude.','french'],
          ['9h15–10h','Lecture — prélever un indice','Trouver un indice dans un texte pour justifier une réponse.','Prélever une information explicite et justifier sa réponse.','french'],
          ['10h–10h25','Orthographe — dictée de mots','Dictée de mots.','Mémoriser l’orthographe de mots fréquents.','french'],
          ['10h25–10h45','Production d’écrit — se présenter','Produire trois phrases pour se présenter.','Écrire un texte court cohérent.','french'],
          ['11h–11h15','Calcul mental — additions et soustractions','Additions et soustractions mentales.','Calculer mentalement en utilisant des procédures adaptées.','maths'],
          ['11h15–12h','Calcul posé — addition','Réviser l’addition posée.','Poser et calculer une addition avec ou sans retenue.','maths'],
          ['14h–14h15','Quart d’heure de lecture','Lecture offerte : écouter un nouvel épisode puis donner une impression en une phrase.','Écouter et exprimer une réaction personnelle simple.','french'],
          ['14h15–14h30','Anglais — saluer et se présenter','Saluer, demander et donner son prénom.','Prendre part à un échange bref et ritualisé.','english'],
          ['14h30–15h15','Arts plastiques — projet collectif','Finaliser les palettes porte-manteaux et réaliser une affiche collective de rentrée.','Coopérer dans un projet artistique.','arts'],
          ['15h15–15h45','Méthodologie — défis coopératifs','Défis de rentrée en équipes : lecture de consignes, logique, coopération et découverte des outils.','Choisir un outil adapté et terminer une tâche.','common'],
          ['16h–16h15','Anglais — réactivation orale','Reprendre les salutations et les prénoms sous forme de jeu rapide.','Réutiliser les formules apprises dans un échange bref.','english'],
          ['16h15–16h30','Arts — présenter sa production','Présenter l’affiche collective ou une palette et écouter les retours.','Décrire une réalisation et écouter les autres.','arts'],
          ['16h30–17h','Bilan — rangement et progrès','Classement et bilan individuel.','Ranger et identifier ses progrès.','common']
        ]],
        ['Jeudi 10 septembre 2026',[
          ['9h–9h15','Oral — chercher et justifier','Devinette : chercher et justifier.','Formuler une hypothèse et argumenter brièvement.','french'],
          ['9h15–10h','Lecture — chronologie du récit','Remettre les événements d’un texte dans l’ordre.','Comprendre la chronologie d’un récit.','french'],
          ['10h–10h25','Orthographe — dictée préparée','Dictée préparée courte.','Mobiliser les régularités orthographiques étudiées.','french'],
          ['10h25–10h45','Grammaire — affirmation et négation','Phrase affirmative et phrase négative.','Identifier et transformer des formes de phrases.','french'],
          ['11h–11h15','Calcul mental — suites et compléments','Suites de nombres et compléments.','Poursuivre une suite et calculer mentalement.','maths'],
          ['11h15–12h','Géométrie — segments','Tracer et mesurer des segments.','Utiliser la règle graduée avec précision.','maths'],
          ['14h–14h15','Quart d’heure de lecture','Lecture offerte : poursuivre l’œuvre et relever oralement un mot ou une image marquante.','Écouter, enrichir son vocabulaire et partager une impression.','french'],
          ['14h15–14h45','Sciences — dessin d’observation','Dessin d’observation et découverte du matériel scientifique de la classe.','Observer, décrire et représenter fidèlement.','science'],
          ['14h45–15h45','Éducation musicale — chant et rythme','Échauffement vocal, chant et rythme.','Interpréter un chant et reproduire un rythme.','arts'],
          ['16h–16h30','Numérique — prise en main de Maître Hibou','Découverte guidée de Maître Hibou, des tablettes et des règles d’usage responsable.','Utiliser un outil numérique de façon responsable.','common'],
          ['16h30–17h','Lecture — autonomie','Lecture autonome et présentation d’un livre.','Lire et partager une première impression de lecture.','french']
        ]],
        ['Vendredi 11 septembre 2026',[
          ['9h–9h30','EMI — comprendre l’actualité','« Un jour, une actu ».','Comprendre un document oral et exprimer un point de vue.','french'],
          ['9h30–10h','Lecture — fluence diagnostique','Lecture fluence diagnostique.','Lire à voix haute avec exactitude et fluidité.','french'],
          ['10h–10h25','Orthographe — bilan de mots','Dictée des mots de la semaine.','Réinvestir l’orthographe mémorisée.','french'],
          ['10h25–10h45','Production d’écrit — objectifs de CE2','Écrire « Mes attentes et mes objectifs pour le CE2 » puis relire avec une grille simple.','Produire un texte court organisé.','french'],
          ['11h–11h15','Calcul mental — bilan','Bilan de calcul mental.','Mobiliser rapidement des procédures de calcul.','maths'],
          ['11h15–12h','Problèmes — situation additive','Résoudre un problème additif.','Résoudre un problème et expliciter sa démarche.','maths'],
          ['14h–14h15','Quart d’heure de lecture','Lecture offerte : écouter la suite et résumer l’épisode en une phrase.','Reformuler brièvement un passage entendu.','french'],
          ['14h15–14h45','EPS — coopération et rôles','Jeux collectifs avec rôles.','Coopérer, respecter les règles et arbitrer simplement.','eps'],
          ['14h45–15h30','Espace — réaliser un plan','Représenter la classe ou l’école par un plan simple.','Produire et lire une représentation d’un espace proche.','history'],
          ['15h30–15h45','Anglais — interaction orale','Jeu oral de salutations en binômes.','Interagir dans un échange bref.','english'],
          ['16h–16h30','EMC — conseil de classe','Conseil de classe : réussites et améliorations.','Exprimer un avis et écouter celui des autres.','emc'],
          ['16h30–17h','Bilan — objectif personnel','Présentation des objectifs de P1 et choix d’un premier objectif personnel.','Se projeter dans les apprentissages à venir.','common']
        ]]
      ]
    }
  };
  const p1DetailedWeeks=window.PROGRESSIONS_EDT_DATA.p1DetailedWeeks;

  // V31.33 — Séances P1 reliées au DRAS, aux dictées Charivari et au vocabulaire spiralaire.
  const p1LessonPlans={
    s1monday:{week:1,title:'Dictée de mots + dictée flash 1 — Le cheval et le fermier',duration:'45 min',domain:'Orthographe · vocabulaire · oral',objectives:['Encoder des mots réguliers','Mémoriser 8 mots, dont 5 prioritaires','Comprendre et réemployer fermier, autour et chemin'],words:'cheval, voiture, chemin, chien, animal, fermier, chaleur, autour',priority:'cheval, voiture, chemin, chien, animal',phases:[['10 min','Dictée de mots','Dicter les mots prioritaires, puis correction immédiate.'],['10 min','Dictée flash 1','Dicter la phrase 1a de la série, puis repérer les mots connus.'],['5 min','Écoute et évocation','Présenter la scène du cheval et du fermier ; faire formuler ce que les élèves imaginent.'],['10 min','Encodage','Segmenter cheval, chemin, chien et chaleur ; observer le groupe de lettres ch.'],['15 min','Vocabulaire','Classer fermier dans les métiers, relier ferme / fermier / fermière, manipuler autour et comparer chemin, rue et sentier.'],['10 min','Réemploi oral','Produire une phrase contenant deux mots de la liste.'],['5 min','Trace','Copier les 8 mots ; étoiler les 5 mots prioritaires.']],spiral:'Les mots seront repris dans le DRAS, la dictée flash et une phrase de production écrite.',assessment:'Observation de l’encodage et phrase orale correcte.',dys:'5 mots prioritaires, syllabes matérialisées et modèles visuels disponibles.'},
    s1tuesday:{week:1,title:'Dictée flash 2 + DRAS — Reconnaître une phrase correcte',duration:'45 min',domain:'Grammaire · production de phrases',objectives:['Reconnaître une phrase correcte','Justifier avec le sens, la majuscule et le point','Réemployer les mots de la dictée'],phases:[['10 min','Dictée flash','Dicter la phrase b de la série, puis correction collective rapide.'],['5 min','Rappel oral','Redire les mots de la veille dans une phrase.'],['10 min','Tri','Trier quatre énoncés : phrases correctes ou groupes de mots.'],['15 min','DRAS','Déplacer ou ajouter des groupes pour réparer les non-phrases.'],['10 min','Production','Écrire une phrase avec cheval, chemin ou fermier.'],['5 min','Institutionnalisation','Une phrase a du sens, commence par une majuscule et se termine par un signe.']],spiral:'Les productions deviennent les phrases de la dictée flash.',assessment:'Ardoise : corriger une non-phrase.',dys:'Étiquettes-mots manipulables et phrase à compléter.'},
    s1thursday:{week:1,title:'Dictée flash 3 + DRAS + production d’écrit court — De l’affirmation à la négation',duration:'45 min',domain:'Grammaire · oral · dictée flash',objectives:['Reconnaître la négation','Transformer une phrase affirmative','Repérer le verbe encadré par ne… pas'],phases:[['10 min','Dictée flash 3','Dicter la phrase 1c de la série, puis correction rapide.'],['5 min','Phrase support','Le chien tourne autour du fermier.'],['10 min','Comparaison','Comparer avec : Le chien ne tourne pas autour du fermier.'],['15 min','DRAS','Ajouter puis supprimer ne… pas sur plusieurs phrases de la semaine.'],['10 min','Oral','Dire ce que le cheval, le chien ou le fermier ne fait pas.'],['5 min','Trace','Encadrer ne… pas et souligner le verbe.']],spiral:'La phrase négative sera reprise dans la dictée bilan et en production écrite.',assessment:'Transformer deux phrases.',dys:'Étiquettes ne / pas déjà préparées ; une seule transformation écrite.'},
    s1friday:{week:1,title:'Charivari — série 1 « Le cheval et le fermier » — dictée bilan et réemploi écrit',duration:'45 min',domain:'Dictée · relecture · production écrite',objectives:['Écrire les mots appris','Respecter majuscule, segmentation et point','Réemployer le vocabulaire dans une phrase nouvelle'],phases:[['5 min','Préparation','Rappeler les 5 critères de réussite.'],['15 min','Dictée','Un cheval tire une voiture sur le chemin. Le chien tourne autour du fermier. Le fermier encourage l’animal.'],['10 min','Relecture guidée','Majuscule, point, mots appris, séparation des mots.'],['10 min','Production','Écrire une nouvelle phrase avec autour ou chemin.'],['5 min','Bilan','Colorier les critères réussis.']],spiral:'Les mots non stabilisés passent dans la liste de réactivation.',assessment:'Mots appris, phrase correcte et relecture.',dys:'Dictée courte : Un cheval tire une voiture. Le chien tourne sur le chemin.'},

    s2monday:{week:2,title:'Dictée de mots + dictée flash 1 — Les métiers',duration:'45 min',domain:'Orthographe · vocabulaire',objectives:['Mémoriser les mots de la semaine','Classer personne, lieu, objet et action','Réemployer facteur, atelier et distribuer'],words:'élève, facteur, lettre, planche, atelier, menuisier, distribuer, diriger',priority:'élève, facteur, lettre, planche, atelier',phases:[['5 min','Réactivation','Réutiliser fermier dans une phrase et rappeler sa famille.'],['10 min','Découverte','Lire et expliquer les 8 nouveaux mots.'],['15 min','Classement','Personnes : facteur, menuisier, élève ; lieu : atelier ; objets : lettre, planche ; actions : distribuer, diriger.'],['10 min','Vocabulaire','Relier distribution / distribuer / distributeur et employer atelier.'],['5 min','Trace','Copier la liste et étoiler les mots prioritaires.']],spiral:'Les verbes serviront aux transformations DRAS et les noms à la production écrite.',assessment:'Classement lexical et phrase orale.',dys:'5 mots prioritaires et pictogrammes personne / lieu / objet / action.'},
    s2tuesday:{week:2,title:'Dictée flash 2 + DRAS — Repérer le verbe conjugué',duration:'45 min',domain:'Grammaire · manipulation',objectives:['Repérer le verbe par transformation','Observer le mot qui change avec le temps ou le sujet','Réemployer distribuer et diriger'],phases:[['10 min','Dictée flash','Dicter la phrase b de la série, puis repérer le verbe qui change.'],['5 min','Phrase support','Le facteur distribue une lettre.'],['15 min','DRAS','Ajouter la négation, changer le temps, remplacer le sujet.'],['10 min','Comparaison','Le facteur distribue / distribuait ; les facteurs distribuent.'],['10 min','Entraînement','Repérer le verbe dans trois phrases sur les métiers.'],['5 min','Trace','Le verbe est le mot qui change quand le temps ou le sujet change.']],spiral:'Le verbe repéré sera repris jeudi pour trouver l’infinitif.',assessment:'Repérage et justification orale.',dys:'Une transformation à la fois et code couleur sujet/verbe.'},
    s2thursday:{week:2,title:'Dictée flash 3 + DRAS + production d’écrit court — Trouver l’infinitif',duration:'45 min',domain:'Grammaire · vocabulaire verbal',objectives:['Donner l’infinitif d’un verbe conjugué','Utiliser la formulation « il faut… »','Enrichir le lexique des actions'],phases:[['10 min','Dictée flash','Dicter la phrase c de la série, puis écrire une phrase courte avec un infinitif.'],['5 min','Réactivation','Repérer distribue dans la phrase support.'],['15 min','Manipulation','Il distribue → il faut distribuer ; il dirige → il faut diriger.'],['10 min','Tri','Associer cloue/clouer, scie/scier, rabote/raboter, joue/jouer.'],['10 min','Oral','Mimer un verbe puis donner son infinitif.'],['5 min','Trace','Le verbe a une forme conjuguée et une forme à l’infinitif.']],spiral:'Les infinitifs seront réutilisés comme consignes en production écrite.',assessment:'Associer quatre formes conjuguées à leur infinitif.',dys:'Deux paires seulement, avec cartes illustrées.'},
    s2friday:{week:2,title:'Charivari — série 5 « Les métiers » — dictée bilan et phrase sur un métier',duration:'45 min',domain:'Dictée · écriture',objectives:['Écrire les mots appris','Identifier le verbe de la phrase dictée','Produire une phrase sur un métier'],phases:[['5 min','Réactivation lexicale','Relire le classement personne / lieu / objet / action.'],['15 min','Dictée','Chaque jour, le facteur distribue les lettres. Dans son atelier, le menuisier scie une planche. Le maître dirige ses élèves.'],['10 min','DRAS de relecture','Souligner un verbe et écrire son infinitif.'],['10 min','Production','Choisir un métier et écrire : qui ? fait quoi ? où ?'],['5 min','Partage oral','Lire deux productions et repérer le vocabulaire repris.']],spiral:'Les mots des semaines 1 et 2 restent disponibles dans la banque de mots.',assessment:'Mots appris, verbe et phrase produite.',dys:'Deux phrases dictées ; banque de verbes pour la production.'},

    s3monday:{week:3,title:'Dictée de mots + dictée flash 1 — Christophe et les nuages',duration:'45 min',domain:'Orthographe · vocabulaire · oral',objectives:['Mémoriser 8 mots','Observer singulier et pluriel','Étudier paysage, sommeil et nuage'],words:'nuage, ciel, chapeau, paysage, sommeil, dame, main, pied',priority:'nuage, ciel, chapeau, paysage, sommeil',phases:[['10 min','Dictée flash 1','Dicter la phrase a de la série, puis correction immédiate.'],['5 min','Réactivation','Employer atelier ou distribuer dans une phrase.'],['10 min','Découverte','Lire les mots et évoquer une scène dans le ciel.'],['15 min','Vocabulaire','Familles : pays/paysage/paysagiste ; nuage/nuageux ; dormir/sommeil.'],['10 min','Nombre','un nuage/des nuages ; un paysage/des paysages ; un chapeau/des chapeaux.'],['5 min','Trace','Liste commune et mots prioritaires.']],spiral:'Les mots seront réutilisés en description orale puis dans la dictée.',assessment:'Trouver un mot de la même famille.',dys:'5 mots et pluriels particuliers fournis.'},
    s3tuesday:{week:3,title:'Dictée flash 2 + DRAS — Repérer le groupe sujet',duration:'45 min',domain:'Grammaire · oral',objectives:['Repérer d’abord le verbe','Identifier tout le groupe sujet','Justifier en demandant qui fait l’action'],phases:[['10 min','Dictée flash','Dicter la phrase b de la série, puis encadrer le groupe sujet.'],['5 min','Phrase support','Christophe regarde les nuages.'],['10 min','Repérage du verbe','Changer le temps : regardait / regardera.'],['15 min','Sujet','Qui regarde ? Christophe. Étendre : Le jeune Christophe regarde les nuages.'],['10 min','Entraînement','Les nuages imitent des paysages. Ses yeux se ferment.'],['5 min','Trace','Le sujet indique qui fait l’action ou de qui l’on parle.']],spiral:'Les sujets seront remplacés par des pronoms jeudi.',assessment:'Encadrer le sujet dans trois phrases.',dys:'Phrases courtes et question « qui est-ce qui ? » affichée.'},
    s3thursday:{week:3,title:'Dictée flash 3 + DRAS + production d’écrit court — Remplacer le sujet',duration:'45 min',domain:'Grammaire · oral · vocabulaire',objectives:['Remplacer par il, elle, ils ou elles','Tenir compte du genre et du nombre','Réemployer les mots de la semaine'],phases:[['10 min','Dictée flash','Dicter la phrase c de la série, puis réécrire une phrase en remplaçant le sujet.'],['5 min','Réactivation','Repérer le sujet dans Les nuages imitent des paysages.'],['15 min','Substitution','Christophe → il ; la dame → elle ; les nuages → ils ; les dames → elles.'],['10 min','Accord oral','Comparer Le nuage imite / Les nuages imitent.'],['10 min','Production orale','Décrire un nuage, puis remplacer son sujet par un pronom.'],['5 min','Trace','Tableau il / elle / ils / elles.']],spiral:'Les pronoms apparaissent dans la dictée bilan pour éviter les répétitions.',assessment:'Quatre remplacements.',dys:'Deux remplacements avec pictogrammes singulier/pluriel.'},
    s3friday:{week:3,title:'Dictée bilan 3 et description d’un paysage',duration:'45 min',domain:'Dictée · production écrite',objectives:['Écrire les mots appris','Marquer les pluriels réguliers','Réutiliser le vocabulaire dans une description'],phases:[['5 min','Oral','Décrire rapidement un paysage de nuages.'],['15 min','Dictée','Christophe regarde les nuages dans le ciel. Ils imitent des chapeaux et des paysages. Ses yeux se ferment et le sommeil le gagne.'],['10 min','Relecture','Chercher les sujets et contrôler singulier/pluriel.'],['10 min','Production','Écrire deux phrases décrivant un paysage, avec nuage et un mot déjà appris.'],['5 min','Mise en commun','Surligner les mots réemployés.']],spiral:'Un mot de S1 ou S2 doit être réutilisé dans la production.',assessment:'Mots, pluriels, sujet/pronom et réemploi lexical.',dys:'Deux phrases dictées et amorce : Dans le ciel, je vois…'},

    s4monday:{week:4,title:'Dictée de mots + dictée flash 1 — La pluie',duration:'45 min',domain:'Orthographe · vocabulaire',objectives:['Mémoriser les mots de la semaine','Consolider singulier/pluriel','Étudier parapluie, rentrer et froid'],words:'pluie, matin, chemin, manteau, nuage, parapluie, froid, rentrer',priority:'pluie, matin, chemin, manteau, nuage',phases:[['10 min','Dictée flash 1','Dicter la phrase a de la série, puis correction immédiate.'],['5 min','Réactivation','Retrouver la famille de paysage et nuage.'],['10 min','Découverte','Lire la liste et classer météo / vêtements / temps / déplacement.'],['15 min','Vocabulaire','Parapluie et parasol ; sortir/rentrer ; froid/chaud et refroidir.'],['10 min','Orthographe','un nuage/des nuages ; le manteau/les manteaux.'],['5 min','Trace','Liste et phrase personnelle avec deux mots.']],spiral:'La météo devient support d’oral, de DRAS et d’écriture.',assessment:'Classement et phrase personnelle.',dys:'5 mots et images associées.'},
    s4tuesday:{week:4,title:'Dictée flash 2 + DRAS — Consolider verbe, infinitif et sujet',duration:'45 min',domain:'Grammaire · évaluation formative',objectives:['Repérer le verbe','Donner l’infinitif','Identifier le groupe sujet'],phases:[['10 min','Dictée flash','Dicter la phrase b de la série, puis analyser verbe, infinitif et sujet.'],['5 min','Phrase support','La pluie tombe depuis le matin.'],['10 min','Verbe','Changer le temps et trouver tombe.'],['10 min','Infinitif','Il faut tomber.'],['10 min','Sujet','Qui tombe ? La pluie.'],['10 min','Transfert','Les nuages annoncent le mauvais temps. Marie ferme son manteau.']],spiral:'Toutes les procédures DRAS de P1 sont réunies.',assessment:'Mini-évaluation sans note sur trois phrases.',dys:'Une phrase à la fois, lecture orale et surlignage.'},
    s4thursday:{week:4,title:'Dictée flash 3 + vocabulaire spiralaire + production d’écrit court',duration:'20 min',domain:'Vocabulaire · oral',objectives:['Ranger des mots dans l’ordre alphabétique','Réactiver les familles et contraires','Employer un mot dans une phrase nouvelle'],phases:[['10 min','Dictée flash','Dicter la phrase c de la série, puis écrire une phrase météo avec un mot réactivé.'],['5 min','Réactivation','Donner le contraire de froid et de rentrer.'],['8 min','Alphabet','Ranger chemin, froid, manteau, matin, nuage, parapluie, pluie, rentrer.'],['5 min','Réemploi','Créer une phrase météo avec un mot de S1 à S3.'],['2 min','Trace','Ajouter la phrase à la banque de mots de la classe.']],spiral:'Les anciens mots restent visibles et disponibles pour parler et écrire.',assessment:'Ordre alphabétique et emploi pertinent.',dys:'Quatre mots seulement, initiales matérialisées.'},
    s4friday:{week:4,title:'Charivari — série 4 « La pluie » — dictée bilan et bilan DRAS P1',duration:'45 min',domain:'Dictée · évaluation',objectives:['Mobiliser les mots étudiés','Contrôler pluriels et accords simples','Réinvestir les procédures DRAS'],phases:[['5 min','Préparation','Rappeler les critères et les mots prioritaires.'],['15 min','Dictée','La pluie tombe depuis le matin. Elle forme de la boue sur le chemin. Les nuages annoncent le mauvais temps. Marie ferme son manteau pour ne pas avoir froid.'],['10 min','Relecture ciblée','Repérer sujets, verbes et marques du pluriel.'],['10 min','Bilan DRAS','Analyser une phrase de la dictée.'],['5 min','Autoévaluation','Choisir : acquis, en cours ou à renforcer.']],spiral:'Les erreurs déterminent les ateliers de la semaine 5.',assessment:'Bilan distinct : mots, pluriel, verbe/infinitif, sujet/pronom.',dys:'Deux phrases ou dictée à trous ; mêmes compétences ciblées.'},

    s5monday:{week:5,title:'Réactivation personnalisée des mots de P1',duration:'45 min',domain:'Orthographe · vocabulaire',objectives:['Reprendre les mots non stabilisés','Classer et relier les mots des quatre semaines','Préparer la seconde chance'],phases:[['10 min','Diagnostic personnel','Chaque élève choisit 3 à 5 mots encore fragiles.'],['15 min','Ateliers','Familles, contraires, classement et encodage.'],['10 min','Oral','Employer deux mots provenant de semaines différentes.'],['10 min','Mémoire','Créer une carte-mot avec illustration, famille et phrase.']],spiral:'Aucune nouvelle liste : les mots reviennent sous une autre forme.',assessment:'Carte-mot et phrase orale.',dys:'3 mots ciblés, répétitions espacées et lecture audio par l’enseignant.'},
    s5tuesday:{week:5,title:'Ateliers DRAS de remédiation',duration:'45 min',domain:'Grammaire · manipulation',objectives:['Réparer une phrase','Repérer verbe et sujet','Trouver l’infinitif et remplacer le sujet'],phases:[['10 min','Atelier phrase','Réparer les nuages dans le ciel.'],['10 min','Atelier négation','Transformer Le chien tourne autour du fermier.'],['10 min','Atelier verbe','distribue → distribuer ; regarde → regarder.'],['10 min','Atelier sujet','les nuages → ils ; la pluie → elle.'],['5 min','Bilan','Nommer la manipulation utilisée : déplacer, remplacer, ajouter ou supprimer.']],spiral:'Les mêmes phrases changent de fonction selon la manipulation.',assessment:'Observation ciblée par compétence.',dys:'Deux ateliers prioritaires au lieu de quatre.'},
    s5friday:{week:5,title:'Dictée de seconde chance et production spiralaire',duration:'45 min',domain:'Évaluation · écriture',objectives:['Montrer les progrès réalisés','Réutiliser des mots de plusieurs semaines','Se relire avec une grille courte'],phases:[['5 min','Préparation','Choisir ses trois points de vigilance.'],['12 min','Dictée','Le facteur distribue une lettre. Les nuages annoncent la pluie. Le chien ne tourne pas autour du fermier.'],['10 min','Relecture','Mots personnels, majuscule/point, pluriel.'],['13 min','Production','Écrire trois phrases contenant au moins quatre mots appris en P1.'],['5 min','Valorisation','Lire une phrase et nommer les mots réemployés.']],spiral:'La production finale mélange volontairement les quatre univers lexicaux.',assessment:'Progression individuelle et transfert en écriture.',dys:'Dictée à trous avec banque de mots et production à partir d’amorces.'}
  };


  // V31.45 — Séances détaillées de mathématiques P1, sans manuel.
  function mathExercisePack(title){
    const pack=(oral,ardoise,answers,challenge='',challengeAnswer='')=>[
      {kind:'consigne',title:'À l’oral',items:oral},
      {kind:'exercise',title:'Sur l’ardoise',items:ardoise},
      {kind:'correction',title:'Correction',items:answers},
      ...(challenge?[{kind:'challenge',title:'Défi',items:[challenge]},{kind:'correction',title:'Correction du défi',items:[challengeAnswer]}]:[])
    ];
    const t=title.toLowerCase();
    if(t.includes('tables d’addition')&&t.includes('compléments à 10')) return pack(
      ['Donne deux façons de faire 10.','Quel nombre manque dans 7 + … = 10 ?','Explique comment tu retrouves 8 + 5.'],
      ['6 + 4 = …','7 + 3 = …','8 + 5 = …','9 + 6 = …','10 − 7 = …','10 − 4 = …'],
      ['6 + 4 = 10','7 + 3 = 10','8 + 5 = 13','9 + 6 = 15','10 − 7 = 3','10 − 4 = 6'],
      'Écris trois additions différentes dont le résultat est 10.','Exemples : 1 + 9, 2 + 8, 3 + 7.'
    );
    if(t.includes('lire et écrire les nombres')) return pack(
      ['Lis : 3 407 ; 8 090 ; 9 999.','Dans 5 284, que vaut le chiffre 2 ?','Quel nombre vient juste après 6 999 ?'],
      ['Écris en chiffres : trois-mille-quarante-deux.','Écris en lettres : 7 306.','Écris le nombre composé de 4 milliers, 8 dizaines et 5 unités.','Quel est le chiffre des centaines dans 6 742 ?'],
      ['3 042','sept-mille-trois-cent-six','4 085','7'],
      'Trouve un nombre de 4 chiffres dont le chiffre des centaines est 0 et celui des dizaines est 7.','Exemple : 5 073.'
    );
    if(t.includes('ajouter ou retrancher 9')&&!t.includes('19')) return pack(
      ['Pour ajouter 9, que peux-tu faire avec 10 ?','Calcule mentalement 34 + 9.','Calcule mentalement 52 − 9.'],
      ['27 + 9 = …','46 + 9 = …','71 − 9 = …','93 − 9 = …','58 + 9 = …'],
      ['27 + 9 = 36','46 + 9 = 55','71 − 9 = 62','93 − 9 = 84','58 + 9 = 67'],
      'Explique deux stratégies pour calculer 68 + 9.','68 + 10 − 1 = 77.'
    );
    if(t.includes('décomposer un nombre')) return pack(
      ['Décompose 3 482 en milliers, centaines, dizaines et unités.','Peut-on écrire 3 482 de deux façons différentes ?'],
      ['5 307 = … + … + …','7 640 = … + … + …','Écris 4 205 sous forme additive.','Quel nombre correspond à 6 000 + 300 + 20 + 9 ?'],
      ['5 307 = 5 000 + 300 + 7','7 640 = 7 000 + 600 + 40','4 205 = 4 000 + 200 + 5','6 329'],
      'Décompose 8 472 de trois façons différentes.','8 000 + 400 + 70 + 2 ; 8 400 + 72 ; 8 470 + 2.'
    );
    if(t.includes('compléments à 10 et à 100')) return pack(
      ['Quel est le complément de 6 à 10 ?','Quel est le complément de 70 à 100 ?','Comment passer de 38 à 100 ?'],
      ['4 + … = 10','63 + … = 100','… + 28 = 100','90 − 37 = …','100 − 46 = …'],
      ['6','37','72','53','54'],
      'Trouve le complément à 100 de 58 sans poser l’opération.','42.'
    );
    if(t.includes('comparer deux nombres')) return pack(
      ['Quel nombre est le plus grand : 4 305 ou 4 350 ? Pourquoi ?','Que signifie le signe < ?'],
      ['3 908 … 3 890','6 102 … 6 120','7 000 … 6 999','5 432 … 5 432','Range : 2 450 ; 2 405 ; 2 540.'],
      ['3 908 > 3 890','6 102 < 6 120','7 000 > 6 999','5 432 = 5 432','2 405 < 2 450 < 2 540'],
      'Trouve un nombre compris entre 4 599 et 4 610.','Exemple : 4 605.'
    );
    if(t.includes('composer, décomposer et comparer')) return pack(
      ['Compose un nombre avec 6 milliers, 4 centaines et 2 unités.','Quel est le plus grand : 6 402 ou 6 420 ?'],
      ['7 305 = … + … + …','Compose : 8 milliers, 3 dizaines, 6 unités.','5 809 … 5 890','Range : 4 099 ; 4 909 ; 4 990.'],
      ['7 305 = 7 000 + 300 + 5','8 036','5 809 < 5 890','4 099 < 4 909 < 4 990'],
      'Invente un nombre plus grand que 3 450 et plus petit que 3 500.','Exemple : 3 472.'
    );
    if(t.includes('comprendre la question')) return pack(
      ['Écoute le problème. Quelle est la question ?','Quelles données sont utiles ?','Faut-il calculer ou seulement lire une information ?'],
      ['Lina a 18 billes et en gagne 7. Combien en a-t-elle maintenant ? Écris seulement l’opération.','Dans une boîte, il y a 24 crayons rouges et 12 bleus. Combien de crayons en tout ? Écris la question en tes mots.','Paul a 30 €. Il dépense 8 €. Quelle information cherche-t-on ?'],
      ['18 + 7','On cherche le nombre total de crayons.','On cherche l’argent qui reste à Paul.'],
      'Invente une question possible avec les nombres 15 et 9.','Exemple : Combien y a-t-il d’objets en tout ?'
    );
    if(t.includes('9 et 19')) return pack(
      ['Pour ajouter 19, ajoute 20 puis enlève 1.','Calcule 42 + 19.','Calcule 80 − 19.'],
      ['36 + 19 = …','54 − 19 = …','67 + 9 = …','92 − 9 = …','48 + 19 = …'],
      ['55','35','76','83','67'],
      'Calcule 125 + 19 et explique.','144, car 125 + 20 − 1.'
    );
    if(t.includes('encadrer entre deux dizaines')) return pack(
      ['Entre quelles dizaines se trouve 347 ?','Entre quelles centaines se trouve 2 348 ?'],
      ['… < 476 < … (dizaines)','… < 1 732 < … (centaines)','… < 9 999 < … (centaines)','Encadre 2 405 entre deux dizaines.'],
      ['470 < 476 < 480','1 700 < 1 732 < 1 800','9 900 < 9 999 < 10 000','2 400 < 2 405 < 2 410'],
      'Quel nombre est exactement au milieu de 3 400 et 3 500 ?','3 450.'
    );
    if(t.includes('compléments à 100')) return pack(
      ['Combien faut-il ajouter à 65 pour obtenir 100 ?','Décompose 100 en 30 et …'],
      ['25 + … = 100','47 + … = 100','… + 68 = 100','100 − 39 = …','100 − 72 = …'],
      ['75','53','32','61','28'],
      'Trouve quatre paires de nombres qui font 100.','Exemples : 10+90, 20+80, 35+65, 47+53.'
    );
    if(t.includes('poser une addition')) return pack(
      ['Que faut-il aligner dans une addition posée ?','Dans quelle colonne écrit-on les unités ?'],
      ['Pose et calcule : 247 + 132.','Pose et calcule : 368 + 457.','Pose et calcule : 2 405 + 376.','Estime d’abord : 598 + 203.'],
      ['379','825','2 781','Environ 800 ; résultat exact 801.'],
      'Trouve et corrige l’erreur : 245 + 38 = 625.','Les unités et dizaines sont mal alignées ; résultat 283.'
    );
    if(t.includes('mesurer une longueur')) return pack(
      ['Où placer le zéro de la règle ?','Combien de millimètres dans 1 cm ?'],
      ['Mesure sur ta fiche les segments A, B et C.','Écris 4 cm 7 mm en millimètres.','Écris 63 mm en cm et mm.','Quel segment est le plus long ?'],
      ['Mesures selon la fiche','47 mm','6 cm 3 mm','Réponse selon la fiche'],
      'Trace un segment de 5 cm 5 mm.','La longueur attendue est 55 mm.'
    );
    if(t.includes('résoudre un problème additif en une étape')) return pack(
      ['Quels mots peuvent indiquer qu’on cherche un total ?','Comment vérifier si la réponse est vraisemblable ?'],
      ['Une classe compte 18 filles et 9 garçons. Combien d’élèves ?','Noé avait 42 images. Il en donne 15. Combien lui en reste-t-il ?','Un bus transporte 36 personnes puis 8 montent. Combien y en a-t-il ?'],
      ['18 + 9 = 27 élèves','42 − 15 = 27 images','36 + 8 = 44 personnes'],
      'Invente un problème qui se résout par 50 − 18.','Exemple : 50 bonbons, 18 mangés, 32 restent.'
    );
    if(t.includes('poser une soustraction')) return pack(
      ['Que faut-il aligner ?','Comment vérifier une soustraction ?'],
      ['Pose et calcule : 584 − 231.','Pose et calcule : 703 − 268.','Pose et calcule : 1 000 − 475.','Vérifie 435 + 268.'],
      ['353','435','525','703'],
      'Trouve l’erreur : 642 − 318 = 334.','642 − 318 = 324.'
    );
    if(t.includes('tracer un segment')) return pack(
      ['Quelle différence entre une droite et un segment ?','Où placer les extrémités ?'],
      ['Trace [AB] de 6 cm.','Trace [CD] de 3 cm 5 mm.','Trace [EF] plus long que [AB] de 2 cm.','Mesure ton segment [CD].'],
      ['AB = 6 cm','CD = 3,5 cm','EF = 8 cm','CD doit mesurer 3,5 cm'],
      'Trace deux segments différents de même longueur.','Toute paire correcte de 4 cm, par exemple.'
    );
    if(t.includes('19 et 29')) return pack(
      ['Pour ajouter 29, ajoute 30 puis enlève 1.','Calcule 64 − 29.'],
      ['45 + 29 = …','83 − 29 = …','126 + 19 = …','200 − 19 = …','71 + 29 = …'],
      ['74','54','145','181','100'],
      'Calcule 398 + 29 sans poser.','427.'
    );
    if(t.includes('point, droite, segment')) return pack(
      ['Une droite a-t-elle des extrémités ?','Comment nomme-t-on un segment ?'],
      ['Place trois points A, B et C alignés.','Trace la droite (AB).','Trace le segment [AC].','Place D qui n’est pas aligné avec A et B.'],
      ['Vérification sur la figure','La droite passe par A et B','Le segment relie A à C','D doit être hors de la droite (AB)'],
      'Peux-tu placer quatre points alignés et un cinquième non aligné ?','Oui, toute figure correcte.'
    );
    if(t.includes('addition et soustraction')) return pack(
      ['Comment choisir entre addition et soustraction ?','Quelle estimation peux-tu faire avant de calculer ?'],
      ['Pose : 428 + 367.','Pose : 905 − 478.','Pose : 2 306 + 589.','Pose : 1 200 − 675.'],
      ['795','427','2 895','525'],
      'Quel calcul permet de vérifier 905 − 478 = 427 ?','427 + 478 = 905.'
    );
    if(t.includes('fraction simple')) return pack(
      ['Que signifie partager en parts égales ?','Dans 1/4, que signifie 4 ?'],
      ['Colorie 1/2 d’un rectangle.','Colorie 3/4 d’une bande.','Écris la fraction correspondant à 2 parts coloriées sur 3.','Quel est le plus grand : 1/2 ou 1/4 ?'],
      ['Une moitié coloriée','Trois quarts coloriés','2/3','1/2'],
      'Dessine deux représentations différentes de 1/2.','Exemples : rectangle partagé verticalement ou horizontalement.'
    );
    if(t.includes('deux étapes')) return pack(
      ['Quelle est la première question cachée ?','Comment garder la trace des deux calculs ?'],
      ['Une bibliothèque a 125 livres. Elle en reçoit 38 puis en prête 27. Combien en reste-t-il ?','Un magasin vend 46 ballons le matin et 39 l’après-midi. Il en avait 120. Combien reste-t-il de ballons ?'],
      ['125 + 38 = 163 ; 163 − 27 = 136 livres','46 + 39 = 85 ; 120 − 85 = 35 ballons'],
      'Écris une phrase-réponse complète pour le premier problème.','Il reste 136 livres dans la bibliothèque.'
    );
    if(t.includes('angle droit')) return pack(
      ['Cite trois objets qui possèdent un angle droit.','À quoi sert le petit carré dans une figure ?'],
      ['Repère les angles droits sur les figures projetées.','Vérifie avec ton gabarit.','Trace un angle droit à partir d’un point A.','Dessine une figure avec exactement deux angles droits.'],
      ['Correction visuelle projetée','Le gabarit doit coïncider','Deux demi-droites perpendiculaires','Plusieurs réponses possibles'],
      'Un triangle peut-il avoir deux angles droits ?','Non.'
    );
    if(t.includes('composer une somme en euros')) return pack(
      ['Quelles pièces peux-tu utiliser pour faire 5 € ?','Peut-on composer 8 € de plusieurs façons ?'],
      ['Compose 7 € avec le moins de pièces possible.','Compose 12 € de deux façons.','Tu as 20 € et tu achètes un livre à 13 €. Quelle monnaie reçoit-on ?','Quel montant : 10 € + 2 € + 50 c + 20 c ?'],
      ['5 € + 2 €','10 € + 2 € ; ou 5 € + 5 € + 2 €','7 €','12,70 €'],
      'Trouve trois façons de composer 15 €.','Exemples : 10+5 ; 5+5+5 ; 10+2+2+1.'
    );
    if(t.includes('solides et données')) return pack(
      ['Combien de faces possède un cube ?','Quelle différence entre une face et une arête ?'],
      ['Complète : cube = … faces, … arêtes, … sommets.','Quel solide roule : cube, boule ou pavé ?','Lis le tableau projeté et donne le solide qui a 6 faces carrées.','Combien de sommets a un pavé droit ?'],
      ['6 faces, 12 arêtes, 8 sommets','La boule','Le cube','8 sommets'],
      'Dessine le patron simple d’un cube ou reconnais-le parmi trois propositions.','Le patron doit comporter 6 carrés correctement assemblés.'
    );
    if(t.includes('bilan')||t.includes('évaluation')||t.includes('remédiation')||t.includes('ateliers')||t.includes('consolidation')||t.includes('défi coopératif')||t.includes('jeu de réinvestissement')) return pack(
      ['Choisis la stratégie la plus efficace.','Explique une réponse à ton voisin.'],
      ['7 + 8 = …','64 + 19 = …','Complément de 37 à 100 : …','3 405 … 3 450','Pose 426 + 187.'],
      ['15','83','63','3 405 < 3 450','613'],
      'Choisis un exercice et explique toutes les étapes de ta méthode.','La correction dépend de l’exercice choisi ; la procédure doit être complète.'
    );
    return pack(['Écoute la consigne et reformule-la.'],['Réalise l’exercice 1.','Réalise l’exercice 2.','Explique ta stratégie.'],['Correction collective guidée.']);
  }
  function buildP1MathLesson(week,title,duration,domain,objectives,phases,assessment,dys){return {week,title,duration,domain,objectives,phases,slides:mathExercisePack(title),spiral:'La séance réactive les acquis précédents et prépare la séance suivante.',assessment,dys};}
  Object.assign(p1LessonPlans,{
    m1a:buildP1MathLesson(1,"Calcul mental — Tables d’addition et compléments à 10","15 min","Automatismes",["Restituer des faits additifs", "Trouver rapidement un complément à 10"],[["3 min", "Rituel", "Afficher cinq calculs très simples et recueillir les procédures."], ["5 min", "Jeu oral", "Chaîne des compléments : 7 et combien pour faire 10 ?"], ["5 min", "Ardoise", "Tables d’addition puis compléments mélangés."], ["2 min", "Bilan", "Noter les faits encore hésitants."]],"Réussir au moins 4 calculs sur 5.","Réduire à trois calculs, utiliser une bande de 10 et autoriser les jetons."),
    m1b:buildP1MathLesson(1,"Numération — Lire et écrire les nombres jusqu’à 10 000","45 min","Numération",["Lire des nombres jusqu’à 10 000", "Passer de l’écriture chiffrée à l’écriture en lettres et inversement"],[["5 min", "Situation de départ", "Présenter des étiquettes-prix ou des scores compris entre 1 000 et 10 000."], ["10 min", "Manipulation", "Construire les nombres avec plaques de milliers, centaines, dizaines et unités."], ["10 min", "Mise en mots", "Lire les nombres en séparant les classes et repérer les zéros intermédiaires."], ["15 min", "Entraînement", "Dictée de nombres, puis écriture en lettres de deux nombres."], ["5 min", "Trace", "Rappeler la valeur de chaque chiffre selon sa position."]],"Lire et écrire correctement quatre nombres variés.","Tableau de numération disponible, nombres limités à 4 chiffres et lecture par groupes."),
    m1c:buildP1MathLesson(1,"Calcul mental — Ajouter ou retrancher 9","15 min","Automatismes",["Utiliser +10 puis −1", "Utiliser −10 puis +1"],[["3 min", "Découverte", "Comparer 34+9 avec 34+10−1."], ["5 min", "Oral", "Faire verbaliser la stratégie sur quatre exemples."], ["5 min", "Ardoise", "Calculs mélangés +9 et −9."], ["2 min", "Bilan", "Écrire la stratégie en mots."]],"Choisir et expliquer une procédure efficace.","Utiliser une droite numérique et limiter aux nombres inférieurs à 100."),
    m1d:buildP1MathLesson(1,"Numération — Décomposer un nombre de plusieurs façons","45 min","Numération",["Décomposer selon les unités de numération", "Produire plusieurs écritures additives d’un même nombre"],[["5 min", "Défi", "Comment fabriquer 3 482 avec le matériel ?"], ["12 min", "Manipulation", "Construire puis échanger 10 unités contre 1 dizaine, etc."], ["10 min", "Écritures", "3 482 = 3 000 + 400 + 80 + 2 puis autres décompositions."], ["13 min", "Entraînement", "Compléter des décompositions à trous et en inventer une."], ["5 min", "Trace", "Un même nombre peut avoir plusieurs décompositions équivalentes."]],"Produire deux décompositions correctes.","Matériel base 10, tableau de numération et décomposition canonique d’abord."),
    m1e:buildP1MathLesson(1,"Calcul mental — Compléments à 10 et à 100","15 min","Automatismes",["Automatiser les compléments à 10", "S’appuyer sur les dizaines pour compléter à 100"],[["3 min", "Rappel", "Compléments à 10 avec les doigts ou cartes."], ["5 min", "Passage à 100", "30 + ? = 100, puis 63 + ? = 100."], ["5 min", "Ardoise", "Cinq compléments variés."], ["2 min", "Autoévaluation", "Colorier vert, orange ou rouge selon l’aisance."]],"4 réponses justes sur 5.","Bande numérique, dizaines entières d’abord, puis nombres comme 63."),
    m1f:buildP1MathLesson(1,"Numération — Comparer deux nombres","45 min","Numération",["Comparer deux nombres jusqu’à 10 000", "Justifier avec la valeur de position"],[["5 min", "Problème", "Quel stade peut accueillir le plus de personnes ?"], ["10 min", "Manipulation", "Comparer d’abord le nombre de milliers, puis centaines, dizaines et unités."], ["10 min", "Institutionnalisation", "Introduire ou rappeler <, > et = avec une justification orale."], ["15 min", "Entraînement", "Comparer, ranger puis insérer un nombre entre deux autres."], ["5 min", "Trace", "On compare les chiffres de gauche à droite."]],"Comparer cinq paires et justifier une réponse.","Tableau de numération et symboles accompagnés des mots plus petit/plus grand."),
    m1g:buildP1MathLesson(1,"Calcul mental — Bilan de la semaine","15 min","Évaluation formative",["Mobiliser tables, compléments et stratégie ±9", "Identifier un objectif personnel"],[["2 min", "Préparation", "Rappeler les trois familles de calculs."], ["6 min", "Mini-bilan", "Six calculs courts sans chronomètre stressant."], ["5 min", "Correction", "Faire expliciter deux procédures."], ["2 min", "Objectif", "Choisir le calcul à retravailler."]],"Résultats et stratégie notés séparément.","Quatre calculs, temps majoré, droite numérique autorisée."),
    m1h:buildP1MathLesson(1,"Numération — Composer, décomposer et comparer","45 min","Consolidation",["Réinvestir la lecture et l’écriture des nombres jusqu’à 10 000", "Décomposer un nombre", "Comparer et ranger en justifiant"],[["5 min", "Réactivation", "Lire 2 405 et 3 080 puis rappeler la valeur de chaque chiffre."], ["10 min", "Composer et décomposer", "Construire 3 482 puis écrire 3 000 + 400 + 80 + 2 ; proposer une autre décomposition."], ["10 min", "Comparer", "Comparer 2 709 et 2 790 puis 4 050 et 4 005 en verbalisant la position décisive."], ["10 min", "Ranger", "Ranger 1 908 ; 1 890 ; 1 980 ; 1 809 du plus petit au plus grand."], ["5 min", "Défi", "Trouver un nombre compris entre 3 450 et 3 500 et justifier."], ["5 min", "Bilan", "Faire formuler : je lis de gauche à droite et je regarde la valeur des chiffres."]],"Observation formative pendant la consolidation ; aucune note.","Tableau de numération, matériel base 10 et nombres réduits si nécessaire."),
    m1i:buildP1MathLesson(1,"Problèmes — Comprendre la question","35 min","Résolution de problèmes",["Identifier ce que l’on cherche", "Distinguer données utiles et inutiles"],[["5 min", "Lecture", "Lire un problème sans montrer la question."], ["8 min", "Anticipation", "Inventer une question possible puis comparer avec la vraie question."], ["10 min", "Tri", "Surligner ce que l’on sait et entourer ce que l’on cherche."], ["8 min", "Recherche", "Choisir un schéma ou une opération sans forcément calculer."], ["4 min", "Trace", "Avant de calculer, je reformule la question."]],"Reformuler la question avec ses propres mots.","Lecture orale, pictogramme « je cherche », données réduites."),
    m2a:buildP1MathLesson(2,"Calcul mental — Ajouter ou retrancher 9 et 19","15 min","Automatismes",["Utiliser un nombre rond voisin", "Expliquer +20−1 ou −20+1"],[["3 min", "Rappel", "Reprendre la stratégie de ±9."], ["5 min", "Extension", "Passer à +19 et −19."], ["5 min", "Ardoise", "Six calculs gradués."], ["2 min", "Bilan", "Nommer la compensation utilisée."]],"Procédure correcte sur quatre calculs.","Droite numérique et nombres inférieurs à 100."),
    m2b:buildP1MathLesson(2,"Numération — Encadrer entre deux dizaines puis deux centaines","45 min","Numération",["Trouver les dizaines qui encadrent un nombre", "Étendre la procédure aux centaines"],[["5 min", "Situation", "Placer 347 sur une droite graduée."], ["10 min", "Manipulation", "Repérer 340 et 350, puis 300 et 400."], ["10 min", "Langage", "Écrire 340 < 347 < 350 et lire l’encadrement."], ["15 min", "Entraînement", "Encadrements variés et nombres à compléter."], ["5 min", "Trace", "Les bornes sont les multiples voisins."]],"Encadrer correctement quatre nombres.","Droites graduées partiellement complétées."),
    m2c:buildP1MathLesson(2,"Calcul mental — Compléments à 100","15 min","Automatismes",["Décomposer pour compléter à la dizaine puis à 100", "Automatiser les compléments fréquents"],[["3 min", "Exemple", "67 → 70 puis 100."], ["5 min", "Manipulation orale", "Dire les deux bonds."], ["5 min", "Mini-test", "Cinq compléments à 100."], ["2 min", "Correction", "Comparer les stratégies."]],"4 sur 5 ou procédure correcte.","Tableau des dizaines et schéma en deux bonds."),
    m2d:buildP1MathLesson(2,"Calcul posé — Poser une addition","45 min","Nombres et calcul",["Aligner unités, dizaines, centaines et milliers", "Calculer avec ou sans retenue"],[["5 min", "Problème déclencheur", "Additionner deux quantités trop grandes pour le calcul mental."], ["10 min", "Manipulation", "Représenter les deux nombres avec le matériel base 10."], ["10 min", "Technique", "Poser les nombres dans un tableau de numération et commencer par les unités."], ["15 min", "Entraînement", "Deux additions sans retenue puis deux avec retenue simple."], ["5 min", "Vérification", "Estimer l’ordre de grandeur du résultat."]],"Alignement correct et retenue comprise.","Gabarit quadrillé, couleurs par rang et matériel disponible."),
    m2e:buildP1MathLesson(2,"Calcul mental — Tables d’addition","15 min","Automatismes",["Restituer les faits additifs", "Utiliser doubles et presque doubles"],[["3 min", "Rappel", "Doubles de 1 à 10."], ["5 min", "Stratégie", "6+7 = 6+6+1."], ["5 min", "Évaluation flash", "Dix faits additifs."], ["2 min", "Bilan", "Repérer trois faits à mémoriser."]],"Progression individuelle plutôt que vitesse seule.","Cinq faits, cartes de doubles et temps supplémentaire."),
    m2f:buildP1MathLesson(2,"Mesures — Mesurer une longueur en cm et mm","45 min","Grandeurs et mesures",["Placer correctement le zéro de la règle", "Lire une mesure en cm et mm"],[["5 min", "Erreur à analyser", "Observer une règle mal placée."], ["10 min", "Manipulation", "Mesurer plusieurs objets de classe."], ["10 min", "Précision", "Lire les graduations entre deux centimètres."], ["15 min", "Entraînement", "Mesurer des segments et comparer les résultats en binômes."], ["5 min", "Trace", "Le zéro doit coïncider avec le début de l’objet."]],"Mesure exacte à 1 mm près sur trois segments.","Règle agrandie, segments démarrant à zéro puis décalés."),
    m2g:buildP1MathLesson(2,"Calcul mental — Compléments et ±9/19","15 min","Évaluation formative",["Mobiliser deux familles de procédures", "Choisir une stratégie adaptée"],[["2 min", "Préparation", "Nommer les stratégies possibles."], ["7 min", "Bilan", "Huit calculs variés."], ["4 min", "Correction", "Expliquer un calcul choisi."], ["2 min", "Objectif", "Noter la stratégie à renforcer."]],"Exactitude et justification séparées.","Cinq calculs avec droite numérique autorisée."),
    m2h:buildP1MathLesson(2,"Numération — Comparer et encadrer","45 min","Évaluation courte",["Comparer des nombres", "Encadrer aux dizaines et centaines"],[["5 min", "Rappel", "Relire les symboles et les bornes."], ["20 min", "Évaluation", "Comparer, ranger et encadrer."], ["10 min", "Manipulation corrective", "Reprendre une réponse avec la droite numérique."], ["5 min", "Autoévaluation", "Cocher les compétences maîtrisées."], ["5 min", "Organisation", "Préparer les ateliers de remédiation."]],"Barème par compétence.","Moins d’items et droites graduées fournies."),
    m2i:buildP1MathLesson(2,"Problèmes — Résoudre un problème additif en une étape","35 min","Résolution de problèmes",["Choisir addition ou soustraction", "Représenter la situation"],[["5 min", "Compréhension", "Lire et reformuler la question."], ["8 min", "Représentation", "Dessiner un schéma en barres ou une collection."], ["10 min", "Recherche", "Choisir l’opération et calculer."], ["7 min", "Mise en commun", "Comparer deux procédures."], ["5 min", "Réponse", "Rédiger une phrase-réponse avec l’unité."]],"Schéma, opération et réponse cohérents.","Nombres réduits, matériel de manipulation et phrase-réponse à compléter."),
    m3a:buildP1MathLesson(3,"Calcul mental — Expliquer sa stratégie","15 min","Automatismes",["Choisir une procédure connue", "Dire les étapes de son calcul"],[["3 min", "Calcul du jour", "Proposer 48+19."], ["5 min", "Échanges", "Recueillir plusieurs méthodes."], ["5 min", "Ardoise", "Trois calculs avec justification orale."], ["2 min", "Bilan", "Choisir la méthode la plus économique."]],"Capacité à expliquer, même en cas d’erreur de calcul.","Phrase-guide : « J’ai d’abord…, puis… »."),
    m3b:buildP1MathLesson(3,"Calcul posé — Poser une soustraction","45 min","Nombres et calcul",["Aligner les rangs", "Comprendre un échange dizaine-unités"],[["5 min", "Situation", "Calculer une différence difficile mentalement."], ["12 min", "Manipulation", "Retirer avec le matériel, puis échanger une dizaine contre dix unités."], ["10 min", "Technique", "Traduire l’échange dans l’écriture posée."], ["13 min", "Entraînement", "Une soustraction sans échange puis deux avec échange simple."], ["5 min", "Vérification", "Contrôler par addition ou estimation."]],"Technique comprise et résultat vraisemblable.","Matériel base 10, gabarit et nombres à trois chiffres maximum."),
    m3c:buildP1MathLesson(3,"Calcul mental — Tables et compléments","15 min","Automatismes",["Réactiver les faits additifs", "Faire le lien entre addition et complément"],[["3 min", "Cartes rapides", "Faits additifs."], ["5 min", "Familles", "8+5=13 donc 13−8=5."], ["5 min", "Ardoise", "Calculs mélangés."], ["2 min", "Bilan", "Noter un fait à mémoriser."]],"Réussite sur les faits déjà entraînés.","Cartes de référence autorisées."),
    m3d:buildP1MathLesson(3,"Mesures — Tracer un segment de longueur donnée","45 min","Grandeurs et mesures",["Utiliser une règle graduée avec précision", "Tracer puis vérifier une longueur"],[["5 min", "Démonstration", "Placer le zéro, marquer l’extrémité puis tracer."], ["10 min", "Essais guidés", "Tracer 4 cm, 6,5 cm et 32 mm."], ["10 min", "Contrôle croisé", "Mesurer le segment d’un camarade."], ["15 min", "Programme de construction", "Tracer trois segments nommés."], ["5 min", "Trace", "Étapes d’un tracé précis."]],"Longueur respectée à 1 mm près.","Segments en cm entiers, règle avec zéro repéré."),
    m3e:buildP1MathLesson(3,"Calcul mental — Ajouter ou retrancher 19 et 29","15 min","Automatismes",["Compenser avec 20 ou 30", "Adapter la procédure au signe"],[["3 min", "Rappel", "±19."], ["5 min", "Extension", "+29 = +30−1 ; −29 = −30+1."], ["5 min", "Mini-test", "Six calculs."], ["2 min", "Correction", "Verbaliser deux stratégies."]],"4 calculs réussis et stratégie correcte.","Droite numérique, seulement +19/+29 dans un premier temps."),
    m3f:buildP1MathLesson(3,"Géométrie — Point, droite, segment et alignement","45 min","Espace et géométrie",["Distinguer point, droite et segment", "Vérifier un alignement avec la règle"],[["5 min", "Observation", "Comparer plusieurs dessins géométriques."], ["10 min", "Vocabulaire", "Nommer points, droites et segments avec les conventions."], ["10 min", "Manipulation", "Tendre une ficelle puis utiliser la règle pour vérifier l’alignement."], ["15 min", "Entraînement", "Tracer une droite, un segment et trois points alignés."], ["5 min", "Trace", "Définitions illustrées."]],"Vocabulaire exact et tracés corrects.","Fiches avec gros points, règle antidérapante et gestes modélisés."),
    m3g:buildP1MathLesson(3,"Calcul mental — Bilan","15 min","Évaluation formative",["Mobiliser tables, compléments et compensations", "Identifier ses progrès"],[["2 min", "Installation", "Rappeler qu’on évalue aussi la méthode."], ["7 min", "Bilan", "Huit calculs."], ["4 min", "Correction", "Coder les familles d’erreurs."], ["2 min", "Objectif", "Choisir un entraînement."]],"Suivi individuel par famille de calculs.","Cinq calculs et outils autorisés selon le PAP."),
    m3h:buildP1MathLesson(3,"Calcul posé — Addition et soustraction","45 min","Évaluation courte",["Choisir et poser l’opération", "Vérifier le résultat"],[["5 min", "Lecture", "Identifier addition ou soustraction dans deux situations."], ["20 min", "Évaluation", "Deux additions et deux soustractions."], ["10 min", "Vérification", "Estimer puis contrôler une opération."], ["5 min", "Correction ciblée", "Reprendre l’alignement ou l’échange."], ["5 min", "Bilan", "Cocher les compétences."]],"Opération, pose, calcul et contrôle évalués séparément.","Un item de chaque type, gabarit quadrillé."),
    m3i:buildP1MathLesson(3,"Fractions — Représenter et nommer une fraction simple","35 min","Fractions",["Comprendre une fraction comme partage équitable", "Nommer demi, tiers et quart"],[["5 min", "Situation", "Partager équitablement une bande entre 2, 3 puis 4 élèves."], ["10 min", "Manipulation", "Plier et colorier des bandes."], ["8 min", "Langage", "Une part sur quatre se note 1/4 et se lit un quart."], ["8 min", "Association", "Relier dessins, écritures et mots."], ["4 min", "Trace", "Le dénominateur indique le nombre de parts égales."]],"Associer correctement trois représentations.","Parts prétracées, manipulation concrète et vocabulaire limité à demi/quart."),
    m4a:buildP1MathLesson(4,"Calcul mental — Tables, compléments et ±9/19/29","15 min","Consolidation",["Réactiver les trois familles d’automatismes de P1", "Choisir une stratégie efficace"],[["3 min", "Tables d’addition", "Proposer 7+6, 8+5 et 9+4 ; faire expliciter un double ou presque-double."], ["4 min", "Compléments", "Faire 6+…=10, 70+…=100 et 63+…=100."], ["5 min", "Compensation", "Calculer 34+9, 52−19 et 47+29 en passant par un nombre rond."], ["3 min", "Bilan", "Chaque élève nomme la stratégie qu’il doit encore automatiser."]],"Observation des procédures, sans nouvelle évaluation formelle.","Moins de calculs, droite numérique ou cartes de référence si besoin."),
    m4b:buildP1MathLesson(4,"Problèmes — Résoudre un problème additif en deux étapes","45 min","Résolution de problèmes",["Organiser deux calculs successifs", "Conserver le sens des résultats intermédiaires"],[["5 min", "Lecture", "Reformuler ce que l’on cherche."], ["10 min", "Schéma", "Construire une représentation avec deux étapes."], ["12 min", "Recherche", "Effectuer le premier calcul puis nommer son résultat."], ["10 min", "Seconde étape", "Utiliser ce résultat pour répondre."], ["5 min", "Mise en commun", "Comparer les ordres de calcul possibles."], ["3 min", "Trace", "J’écris ce que signifie chaque résultat."]],"Deux étapes cohérentes et phrase-réponse.","Nombres simples, étapes matérialisées par deux cadres."),
    m4c:buildP1MathLesson(4,"Calcul mental — Remédiation ciblée","15 min","Remédiation",["Renforcer une famille de calculs", "Utiliser un outil adapté puis s’en détacher"],[["3 min", "Groupes", "Répartir selon tables, compléments ou compensation."], ["8 min", "Ateliers", "Cartes, droite numérique ou jeu de dés."], ["2 min", "Défi final", "Deux calculs sans outil."], ["2 min", "Bilan", "Noter le progrès."]],"Observation individualisée.","Atelier très guidé avec matériel."),
    m4d:buildP1MathLesson(4,"Mesures — Mesurer et tracer des segments","45 min","Évaluation pratique",["Mesurer en cm et mm", "Tracer une longueur donnée"],[["5 min", "Rappel gestuel", "Placer le zéro et maintenir la règle."], ["20 min", "Évaluation", "Mesurer trois segments et en tracer deux."], ["10 min", "Contrôle", "Vérifier avec une seconde mesure."], ["5 min", "Correction", "Analyser les écarts."], ["5 min", "Bilan", "Identifier le geste à améliorer."]],"Précision du geste et résultat.","Moins de segments, longueurs entières en cm."),
    m4e:buildP1MathLesson(4,"Calcul mental — Atelier ciblé","15 min","Remédiation",["Automatiser un objectif personnel", "Expliquer une stratégie"],[["3 min", "Choix", "Chaque élève rejoint son atelier."], ["8 min", "Jeu", "Memory de compléments, bataille de sommes ou parcours ±9."], ["2 min", "Test", "Deux calculs."], ["2 min", "Retour", "Dire ce qui aide."]],"Validation différée possible.","Outils et tutorat."),
    m4f:buildP1MathLesson(4,"Géométrie — Reconnaître et vérifier un angle droit","45 min","Espace et géométrie",["Reconnaître visuellement un angle droit", "Vérifier avec une équerre ou un gabarit"],[["5 min", "Chasse aux angles", "Repérer des angles droits dans la classe."], ["10 min", "Construction du sens", "Comparer à un coin de feuille."], ["10 min", "Outil", "Apprendre à placer l’équerre."], ["15 min", "Entraînement", "Vérifier puis marquer les angles droits de figures."], ["5 min", "Trace", "Le carré indique un angle droit vérifié."]],"Placement correct de l’équerre.","Gabarit cartonné avant l’équerre."),
    m4g:buildP1MathLesson(4,"Calcul mental — Consolidation","15 min","Automatismes",["Stabiliser les acquis", "Préparer la seconde chance"],[["3 min", "Rappel", "Choisir sa stratégie."], ["7 min", "Calculs", "Série différenciée."], ["3 min", "Correction", "Auto-correction codée."], ["2 min", "Bilan", "Décider si une reprise est nécessaire."]],"Suivi sans nouvelle note.","Série courte et outil de référence."),
    m4h:buildP1MathLesson(4,"Calcul posé — Évaluation addition et soustraction","45 min","Évaluation",["Poser et calculer les deux opérations", "Contrôler la vraisemblance"],[["5 min", "Préparation", "Relire les critères."], ["22 min", "Évaluation", "Opérations variées."], ["8 min", "Contrôle", "Estimation ou opération inverse."], ["5 min", "Relecture", "Alignement, retenues, signe."], ["5 min", "Bilan", "Repérer la compétence acquise."]],"Critères séparés pour la pose et le calcul.","Deux opérations, gabarit et temps majoré."),
    m4i:buildP1MathLesson(4,"Monnaie — Composer une somme en euros","35 min","Grandeurs et mesures",["Reconnaître billets et pièces", "Composer une même somme de plusieurs façons"],[["5 min", "Observation", "Nommer les pièces et billets factices."], ["10 min", "Manipulation", "Composer 7 €, 12 € puis 25 €."], ["8 min", "Défi", "Trouver deux compositions différentes."], ["8 min", "Jeu marchand", "Payer exactement un objet."], ["4 min", "Trace", "Une somme peut être composée de différentes manières."]],"Composer trois sommes exactes.","Sommes inférieures à 10 €, pièces limitées."),
    m5a:buildP1MathLesson(5,"Calcul mental — Ateliers selon les besoins","15 min","Remédiation",["Reprendre une compétence non validée", "Mesurer un progrès"],[["3 min", "Orientation", "Choisir l’atelier à partir du bilan."], ["8 min", "Atelier", "Tables, compléments ou compensation."], ["2 min", "Validation", "Trois calculs ciblés."], ["2 min", "Bilan", "Reporter le résultat dans le suivi."]],"Validation différée individualisée.","Outils maintenus si prévus dans les adaptations."),
    m5b:buildP1MathLesson(5,"Problèmes — Une ou deux étapes","45 min","Consolidation",["Comprendre la question", "Résoudre un problème additif en une ou deux étapes", "Expliquer le rôle de chaque calcul"],[["5 min", "Lecture", "Lire un problème et reformuler précisément ce que l’on cherche."], ["10 min", "Problème à une étape", "Résoudre une transformation simple et comparer les représentations proposées."], ["15 min", "Problème à deux étapes", "Chercher d’abord une information intermédiaire puis utiliser ce résultat pour répondre."], ["10 min", "Mise en commun", "Faire expliciter ce que signifie chaque calcul et vérifier la phrase-réponse."], ["5 min", "Bilan", "Rappeler : je comprends, je représente, je calcule, je réponds."]],"Petite trace formative par observation ; aucune évaluation supplémentaire.","Un seul problème à la fois, nombres simplifiés et schéma partiellement fourni."),
    m5c:buildP1MathLesson(5,"Calcul mental — Jeu de réinvestissement","15 min","Automatismes",["Réinvestir sans nouvelle difficulté", "Coopérer et verbaliser"],[["3 min", "Règles", "Présenter le jeu par équipes."], ["9 min", "Défi", "Cartes calculs avec justification obligatoire."], ["2 min", "Correction", "Valider collectivement."], ["1 min", "Bilan", "Féliciter la stratégie, pas seulement la vitesse."]],"Observation de la procédure.","Cartes de niveau adapté."),
    m5d:buildP1MathLesson(5,"Fractions — Représenter et nommer des fractions simples","45 min","Fractions · consolidation",["Représenter une fraction simple", "Nommer une fraction simple"],[["5 min", "Manipulation", "Replier une bande en parts égales."], ["15 min", "Évaluation", "Colorier, écrire et nommer des demis, tiers et quarts."], ["10 min", "Jeu d’association", "Images, écritures et mots."], ["10 min", "Remédiation", "Reprendre avec le matériel."], ["5 min", "Trace", "Expliquer le rôle du dénominateur."]],"Parts égales et correspondance correcte.","Demi et quart seulement, modèles prépartagés."),
    m5e:buildP1MathLesson(5,"Calcul mental — Bilan personnel","15 min","Métacognition",["Identifier ses automatismes solides", "Choisir un objectif pour P2"],[["3 min", "Lecture du suivi", "Observer ses résultats des semaines précédentes."], ["6 min", "Défi personnel", "Calculs adaptés à l’objectif."], ["4 min", "Correction", "Comparer avec une ancienne tentative."], ["2 min", "Objectif P2", "Écrire une phrase simple."]],"Progrès individuel.","Objectif formulé oralement ou avec pictogrammes."),
    m5f:buildP1MathLesson(5,"Solides et données — Décrire un solide, lire un tableau","45 min","Géométrie et données",["Décrire cube, pavé ou boule avec un vocabulaire simple", "Prélever une information dans un tableau"],[["5 min", "Manipulation", "Trier des objets selon leur forme."], ["10 min", "Description", "Face, arête et sommet pour cube et pavé."], ["10 min", "Tableau", "Reporter le nombre de faces, arêtes et sommets."], ["15 min", "Lecture", "Répondre à des questions à partir du tableau."], ["5 min", "Bilan", "Relier objet, description et données."]],"Décrire un solide et lire deux informations.","Solides réels, tableau très aéré et questions lues."),
    m5g:buildP1MathLesson(5,"Calcul mental — Défi coopératif","15 min","Réinvestissement",["Mobiliser les stratégies de P1", "Coopérer sans compétition excessive"],[["3 min", "Organisation", "Former des équipes équilibrées."], ["9 min", "Défi", "Chaque réponse doit être accompagnée d’une stratégie."], ["2 min", "Retour", "Partager une méthode efficace."], ["1 min", "Bilan", "Valoriser l’entraide."]],"Participation et justification.","Rôle de lecteur ou manipulateur possible."),
    m5h:buildP1MathLesson(5,"Ateliers — Monnaie, géométrie et données","45 min","Réinvestissement",["Réinvestir plusieurs domaines", "Choisir l’outil approprié"],[["5 min", "Présentation", "Expliquer les trois ateliers."], ["30 min", "Rotation", "Monnaie : composer ; géométrie : angle droit/alignement ; données : lire un tableau."], ["5 min", "Correction", "Valider une tâche par atelier."], ["5 min", "Bilan", "Choisir sa réussite de P1."]],"Pas de nouvelle évaluation lourde.","Deux ateliers seulement, consignes illustrées."),
    m5i:buildP1MathLesson(5,"Bilan mathématique — Lire ses progrès et préparer P2","35 min","Métacognition",["Identifier ses réussites", "Formuler un objectif réaliste"],[["5 min", "Portfolio", "Choisir deux productions réussies."], ["10 min", "Lecture des compétences", "Comparer « je découvre / je m’entraîne / validé »."], ["10 min", "Entretien ou binôme", "Expliquer une réussite et une difficulté."], ["5 min", "Objectif P2", "Écrire ou dicter son objectif."], ["5 min", "Valorisation", "Présenter une stratégie utile à la classe."]],"Capacité à parler de ses apprentissages.","Choix parmi des objectifs illustrés et réponse orale acceptée.")
  });

  const p1TimetableUpdates={
    p1s1:{'10h–10h45':'s1monday','10h–10h45|Mardi':'s1tuesday','10h–10h45|Jeudi':'s1thursday','10h–10h45|Vendredi':'s1friday'},
    p1s2:{'10h–10h45':'s2monday','10h–10h45|Mardi':'s2tuesday','10h–10h45|Jeudi':'s2thursday','10h–10h45|Vendredi':'s2friday'},
    p1s3:{'10h–10h45':'s3monday','10h–10h45|Mardi':'s3tuesday','10h–10h45|Jeudi':'s3thursday','10h–10h45|Vendredi':'s3friday'},
    p1s4:{'10h–10h45':'s4monday','10h–10h45|Mardi':'s4tuesday','16h40–17h|Jeudi':'s4thursday','10h–10h45|Vendredi':'s4friday'},
    p1s5:{'10h–10h45':'s5monday','10h–10h45|Mardi':'s5tuesday','10h–10h45|Vendredi':'s5friday'}
  };
  const p1SessionLabels={
    s1monday:'DICTÉE DE MOTS + DICTÉE FLASH 1 + VOCABULAIRE — Charivari série 1 « Le cheval et le fermier » : découvrir 8 mots, encoder ch et approfondir fermier, autour, chemin.',
    s1tuesday:'DICTÉE FLASH 2 (10 MIN) + ÉTUDE DE LA LANGUE — DRAS — Reconnaître et réparer une phrase correcte à partir du corpus de la semaine.',
    s1thursday:'DICTÉE FLASH 3 (10 MIN) + DRAS + PRODUCTION D’ÉCRIT COURT — Transformer une phrase affirmative en phrase négative et repérer le verbe.',
    s1friday:'DICTÉE BILAN — DICTÉE DE PHRASES CHARIVARI — Série 1 adaptée : relecture guidée et phrase de réemploi du vocabulaire.',
    s2monday:'DICTÉE DE MOTS + DICTÉE FLASH 1 + VOCABULAIRE — Charivari série 5 « Les métiers » : apprendre les mots et classer personne, lieu, objet, action.',
    s2tuesday:'DICTÉE FLASH 2 (10 MIN) + ÉTUDE DE LA LANGUE — DRAS — Repérer le verbe conjugué par changement de temps, de sujet et par la négation.',
    s2thursday:'DICTÉE FLASH 3 (10 MIN) + DRAS + PRODUCTION D’ÉCRIT COURT — Retrouver l’infinitif et enrichir le vocabulaire des actions.',
    s2friday:'DICTÉE BILAN — DICTÉE DE PHRASES CHARIVARI — Série 5 adaptée et production d’une phrase sur un métier.',
    s3monday:'DICTÉE DE MOTS + DICTÉE FLASH 1 + VOCABULAIRE — Charivari série 6 « Christophe et les nuages » : apprendre les mots et étudier paysage, sommeil, nuage.',
    s3tuesday:'DICTÉE FLASH 2 (10 MIN) + ÉTUDE DE LA LANGUE — DRAS — Repérer le groupe sujet après avoir identifié le verbe.',
    s3thursday:'DICTÉE FLASH 3 (10 MIN) + DRAS + PRODUCTION D’ÉCRIT COURT — Remplacer le sujet par il, elle, ils ou elles et réemployer les mots à l’oral.',
    s3friday:'DICTÉE BILAN — DICTÉE DE PHRASES CHARIVARI — Série 6 adaptée et courte description d’un paysage.',
    s4monday:'DICTÉE DE MOTS + DICTÉE FLASH 1 + VOCABULAIRE — Charivari série 4 « La pluie » : apprendre les mots et étudier parapluie, rentrer, froid.',
    s4tuesday:'DICTÉE FLASH 2 (10 MIN) + ÉTUDE DE LA LANGUE — DRAS — Consolider le repérage du verbe, de l’infinitif et du groupe sujet.',
    s4thursday:'DICTÉE FLASH 3 (10 MIN) + VOCABULAIRE SPIRALAIRE + PRODUCTION D’ÉCRIT COURT — Ordre alphabétique, familles, synonymes, contraires et réemploi des mots des quatre semaines.',
    s4friday:'DICTÉE BILAN — DICTÉE DE PHRASES CHARIVARI — Série 4 adaptée, relecture et bilan DRAS de la période.',
    s5monday:'RÉACTIVATION DES MOTS + VOCABULAIRE — Reprendre 3 à 5 mots fragiles, leurs familles et leur emploi en contexte.',
    s5tuesday:'DRAS DE REMÉDIATION — Phrase, négation, verbe, infinitif, sujet et pronom à partir des phrases déjà dictées.',
    s5friday:'DICTÉE DE SECONDE CHANCE + PRODUCTION ÉCRITE — Réutiliser les mots de toute la P1.'
  };

  // V35.80 — suppression du bloc hebdomadaire français redondant.


  Object.assign(p1TimetableUpdates.p1s1,{'11h–11h15':'m1a','11h15–12h':'m1b','11h–11h15|Mardi':'m1c','11h15–12h|Mardi':'m1d','11h–11h15|Jeudi':'m1e','11h15–12h|Jeudi':'m1f','11h–11h15|Vendredi':'m1g','11h15–12h|Vendredi':'m1h','14h–14h35|Vendredi':'m1i'});
  Object.assign(p1TimetableUpdates.p1s2,{'11h–11h15':'m2a','11h15–12h':'m2b','11h–11h15|Mardi':'m2c','11h15–12h|Mardi':'m2d','11h–11h15|Jeudi':'m2e','11h15–12h|Jeudi':'m2f','11h–11h15|Vendredi':'m2g','11h15–12h|Vendredi':'m2h','14h–14h35|Vendredi':'m2i'});
  Object.assign(p1TimetableUpdates.p1s3,{'11h–11h15':'m3a','11h15–12h':'m3b','11h–11h15|Mardi':'m3c','11h15–12h|Mardi':'m3d','11h–11h15|Jeudi':'m3e','11h15–12h|Jeudi':'m3f','11h–11h15|Vendredi':'m3g','11h15–12h|Vendredi':'m3h','14h–14h35|Vendredi':'m3i'});
  Object.assign(p1TimetableUpdates.p1s4,{'11h–11h15':'m4a','11h15–12h':'m4b','11h–11h15|Mardi':'m4c','11h15–12h|Mardi':'m4d','11h–11h15|Jeudi':'m4e','11h15–12h|Jeudi':'m4f','11h–11h15|Vendredi':'m4g','11h15–12h|Vendredi':'m4h','14h–14h35|Vendredi':'m4i'});
  Object.assign(p1TimetableUpdates.p1s5,{'11h–11h15':'m5a','11h15–12h':'m5b','11h–11h15|Mardi':'m5c','11h15–12h|Mardi':'m5d','11h–11h15|Jeudi':'m5e','11h15–12h|Jeudi':'m5f','11h–11h15|Vendredi':'m5g','11h15–12h|Vendredi':'m5h','14h–14h35|Vendredi':'m5i'});
  Object.assign(p1SessionLabels,{
    m1a:"Calcul mental — Tables d’addition et compléments à 10 — Restituer des faits additifs.",
    m1b:"Numération — Lire et écrire les nombres jusqu’à 10 000 — Lire des nombres jusqu’à 10 000.",
    m1c:"Calcul mental — Ajouter ou retrancher 9 — Utiliser +10 puis −1.",
    m1d:"Numération — Décomposer un nombre de plusieurs façons — Décomposer selon les unités de numération.",
    m1e:"Calcul mental — Compléments à 10 et à 100 — Automatiser les compléments à 10.",
    m1f:"Numération — Comparer deux nombres — Comparer deux nombres jusqu’à 10 000.",
    m1g:"Calcul mental — Bilan de la semaine — Mobiliser tables, compléments et stratégie ±9.",
    m1h:"Numération — Composer, décomposer et comparer — Mobiliser lecture, écriture, décomposition et comparaison.",
    m1i:"Problèmes — Comprendre la question — Identifier ce que l’on cherche.",
    m2a:"Calcul mental — Ajouter ou retrancher 9 et 19 — Utiliser un nombre rond voisin.",
    m2b:"Numération — Encadrer entre deux dizaines puis deux centaines — Trouver les dizaines qui encadrent un nombre.",
    m2c:"Calcul mental — Compléments à 100 — Décomposer pour compléter à la dizaine puis à 100.",
    m2d:"Calcul posé — Poser une addition — Aligner unités, dizaines, centaines et milliers.",
    m2e:"Calcul mental — Tables d’addition — Restituer les faits additifs.",
    m2f:"Mesures — Mesurer une longueur en cm et mm — Placer correctement le zéro de la règle.",
    m2g:"Calcul mental — Compléments et ±9/19 — Mobiliser deux familles de procédures.",
    m2h:"Numération — Comparer et encadrer — Comparer des nombres.",
    m2i:"Problèmes — Résoudre un problème additif en une étape — Choisir addition ou soustraction.",
    m3a:"Calcul mental — Expliquer sa stratégie — Choisir une procédure connue.",
    m3b:"Calcul posé — Poser une soustraction — Aligner les rangs.",
    m3c:"Calcul mental — Tables et compléments — Réactiver les faits additifs.",
    m3d:"Mesures — Tracer un segment de longueur donnée — Utiliser une règle graduée avec précision.",
    m3e:"Calcul mental — Ajouter ou retrancher 19 et 29 — Compenser avec 20 ou 30.",
    m3f:"Géométrie — Point, droite, segment et alignement — Distinguer point, droite et segment.",
    m3g:"Calcul mental — Bilan — Mobiliser tables, compléments et compensations.",
    m3h:"Calcul posé — Addition et soustraction — Choisir et poser l’opération.",
    m3i:"Problèmes — Choisir l’opération et justifier — Réinvestir addition et soustraction dans une situation simple.",
    m4a:"Calcul mental — Évaluation courte — Mobiliser les automatismes de P1.",
    m4b:"Problèmes — Résoudre un problème additif en deux étapes — Organiser deux calculs successifs.",
    m4c:"Calcul mental — Remédiation ciblée — Renforcer une famille de calculs.",
    m4d:"Mesures — Mesurer et tracer des segments — Mesurer en cm et mm.",
    m4e:"Calcul mental — Atelier ciblé — Automatiser un objectif personnel.",
    m4f:"Géométrie — Reconnaître et vérifier un angle droit — Reconnaître visuellement un angle droit.",
    m4g:"Calcul mental — Consolidation — Stabiliser les acquis.",
    m4h:"Calcul posé — Évaluation addition et soustraction — Poser et calculer les deux opérations.",
    m4i:"Fractions — Découvrir le partage de l’unité — Reconnaître une moitié, un tiers et un quart.",
    m5a:"Calcul mental — Ateliers selon les besoins — Reprendre une compétence non validée.",
    m5b:"Problèmes — Une ou deux étapes — Comprendre la question.",
    m5c:"Calcul mental — Jeu de réinvestissement — Réinvestir sans nouvelle difficulté.",
    m5d:"Fractions — Évaluation et consolidation — Représenter une fraction simple.",
    m5e:"Calcul mental — Bilan personnel — Identifier ses automatismes solides.",
    m5f:"Solides et données — Décrire un solide, lire un tableau — Décrire cube, pavé ou boule avec un vocabulaire simple.",
    m5g:"Calcul mental — Défi coopératif — Mobiliser les stratégies de P1.",
    m5h:"Ateliers — Monnaie, géométrie et données — Réinvestir plusieurs domaines.",
    m5i:"Bilan mathématique — Lire ses progrès et préparer P2 — Identifier ses réussites."
  });

  p1DetailedWeeks.forEach(week=>week.days.forEach(([day,rows])=>rows.forEach(row=>{
    const dayName=day.split(' ')[0];
    const map=p1TimetableUpdates[week.key]||{};
    const id=map[`${row[0]}|${dayName}`]||((dayName==='Lundi')?map[row[0]]:null);
    if(id){row[2]=p1SessionLabels[id];row[6]=id;if(id.startsWith('m')) row[1]=p1LessonPlans[id].domain+' — '+p1LessonPlans[id].title.split(' — ').slice(1).join(' — ');}
  })));



  // V31.48 — Réutilisation structurée des leçons Maître Hibou en mathématiques.
  const hibouMathMap={
    m1a:['complements.html','Compléments à 10 et à 100'],m1b:['nombres-jusqua-10000.html','Nombres jusqu’à 10 000'],m1c:['calcul-mental-addition.html','Calcul mental : addition'],m1d:['valeur-position-chiffres.html','Valeur et position des chiffres'],m1e:['complements.html','Compléments à 10 et à 100'],m1f:['comparer-ranger-encadrer.html','Comparer, ranger et encadrer'],m1g:['calcul-mental-addition.html','Calcul mental : addition'],m1h:['comparer-ranger-encadrer.html','Comparer, ranger et encadrer'],m1i:['problemes-additifs.html','Problèmes additifs'],
    m2a:['calcul-mental-addition.html','Calcul mental : addition'],m2b:['comparer-ranger-encadrer.html','Comparer, ranger et encadrer'],m2c:['complements.html','Compléments à 10 et à 100'],m2d:['addition-posee.html','Addition posée'],m2e:['calcul-mental-addition.html','Calcul mental : addition'],m2f:['longueurs.html','Mesurer des longueurs'],m2g:['calcul-mental-addition.html','Calcul mental : addition'],m2h:['comparer-ranger-encadrer.html','Comparer, ranger et encadrer'],m2i:['problemes-additifs.html','Problèmes additifs'],
    m3a:['calcul-mental-addition.html','Calcul mental : addition'],m3b:['soustraction-posee.html','Soustraction posée'],m3c:['complements.html','Compléments'],m3d:['droites-segments-milieu.html','Droites, segments et milieu'],m3e:['calcul-mental-addition.html','Calcul mental : addition'],m3f:['points-alignes.html','Points alignés'],m3g:['calcul-mental-soustraction.html','Calcul mental : soustraction'],m3h:['addition-posee.html','Addition posée'],m3i:['problemes-additifs.html','Problèmes additifs'],
    m4a:['calcul-mental-addition.html','Calcul mental : addition'],m4b:['problemes-plusieurs-etapes.html','Problèmes à plusieurs étapes'],m4c:['calcul-mental-soustraction.html','Calcul mental : soustraction'],m4d:['longueurs.html','Mesurer des longueurs'],m4e:['complements.html','Compléments'],m4f:['angle-droit.html','Reconnaître un angle droit'],m4g:['calcul-mental-addition.html','Calcul mental : addition'],m4h:['soustraction-posee.html','Soustraction posée'],m4i:['fractions-parts-tout.html','Fractions : parts d’un tout'],
    m5a:['complements.html','Compléments'],m5b:['problemes-plusieurs-etapes.html','Problèmes à plusieurs étapes'],m5c:['calcul-mental-addition.html','Calcul mental : addition'],m5d:['fractions-parts-tout.html','Fractions : parts d’un tout'],m5e:['calcul-mental-soustraction.html','Calcul mental : soustraction'],m5f:['solides.html','Reconnaître et décrire les solides'],m5g:['tables-multiplication.html','Tables de multiplication'],m5h:['tableaux-donnees.html','Lire des tableaux de données'],m5i:['nombres-jusqua-10000.html','Nombres jusqu’à 10 000']
  };
  const annualMathHibouPlan=[
    ['P1 — Installer les fondamentaux','Nombres jusqu’à 10 000 ; valeur des chiffres ; comparaison et encadrement ; compléments ; addition et soustraction posées ; problèmes additifs ; longueurs, segments, alignement et angle droit. Fractions en semaines 4 et 5 : partage de l’unité, moitié, tiers, quart, lecture et représentation.'],
    ['P2 — Consolider et introduire la multiplication','Doubles et moitiés ; multiplier par 10 et 100 ; ligne numérique ; sens de la multiplication ; tables ; problèmes de comparaison et multiplicatifs ; heure et durées ; polygones et mesures. Fractions réactivées par le partage équitable en semaines 3 et 6.'],
    ['P3 — Structurer les fractions','Multiplication posée par un chiffre ; problèmes à plusieurs étapes ; monnaie, prix et périmètre. Fractions en semaines 2 à 5 : lire et écrire, représenter, placer sur une ligne graduée, comprendre numérateur et dénominateur.'],
    ['P4 — Approfondir','Multiplication posée et division ; symétrie, données et durées. Fractions en semaines 1, 2, 3 et 5 : comparer à dénominateur identique, reconnaître des équivalences simples, compléter l’unité et résoudre des problèmes.'],
    ['P5 — Réinvestir et automatiser','Problèmes mixtes, prix, durées, mesures, données et géométrie. Fractions en semaines 2, 4 et 6 : mobiliser toutes les représentations, résoudre des problèmes mixtes, puis évaluer et consolider avec Maître Hibou.']
  ];
  Object.entries(hibouMathMap).forEach(([id,meta])=>{const l=p1LessonPlans[id];if(!l)return;l.hibou={file:meta[0],title:meta[1],url:'hibou/lecons/'+meta[0]};const slide={kind:'hibou',title:'🦉 Leçon Maître Hibou — '+meta[1],items:['Observe la leçon, lis les exemples et réponds à la question interactive.'],url:l.hibou.url};l.slides.splice(1,0,slide);l.spiral='La leçon Maître Hibou est réutilisée en classe entière, puis retrouvée en entraînement individuel. '+l.spiral;});
  const fractionsAnnualPlan=[
    ['P1','Semaine 4','Comprendre le partage d’une unité en parts égales','Manipuler bandes, disques ou feuilles pliées ; reconnaître 1/2, 1/3 et 1/4.','fractions-parts-tout.html'],
    ['P1','Semaine 5','Lire et représenter 1/2, 1/3 et 1/4','Dessiner, colorier et associer représentation, formulation orale et écriture fractionnaire.','fractions-parts-tout.html'],
    ['P2','Semaine 3','Réactiver le partage équitable','Partager 12 objets entre 2, 3 ou 4 personnes et verbaliser la part de chacun.','problemes-division.html'],
    ['P2','Semaine 6','Utiliser une fraction dans une situation concrète','Résoudre des situations avec pizza, chocolat, bande ou collection.','fractions-parts-tout.html'],
    ['P3','Semaine 2','Lire et écrire des fractions simples','Associer dessin, écriture fractionnaire et formulation orale.','fractions-parts-tout.html'],
    ['P3','Semaine 3','Représenter une fraction d’une unité','Compléter et colorier bandes, disques et quadrillages.','fractions-parts-tout.html'],
    ['P3','Semaine 4','Placer une fraction sur une ligne graduée','Placer 1/2, 1/4, 2/4 et 3/4 sur une bande-unité graduée.','fractions-bande-graduee.html'],
    ['P3','Semaine 5','Comprendre numérateur et dénominateur','Expliquer le nombre de parts prises et le nombre de parts égales de l’unité.','fractions-parts-tout.html'],
    ['P4','Semaine 1','Comparer des fractions de même dénominateur','Comparer 1/4, 2/4 et 3/4 avec des bandes superposables.','comparer-fractions.html'],
    ['P4','Semaine 2','Reconnaître des fractions équivalentes simples','Établir par pliage et superposition que 1/2 = 2/4.','fractions-equivalentes.html'],
    ['P4','Semaine 3','Compléter une unité','Trouver la fraction manquante, par exemple 3/4 + ? = 1.','calculer-fractions.html'],
    ['P4','Semaine 5','Résoudre des problèmes avec des fractions','Utiliser une fraction d’un tout, d’une longueur ou d’une collection.','calculer-fractions.html'],
    ['P5','Semaine 2','Mobiliser toutes les représentations','Passer du dessin à l’écriture, à la bande graduée et à la situation-problème.','fractions-bande-graduee.html'],
    ['P5','Semaine 4','Résoudre des problèmes mixtes','Choisir entre partage, fraction d’une unité ou fraction d’une collection.','calculer-fractions.html'],
    ['P5','Semaine 6','Évaluer et consolider','Bilan projeté, correction raisonnée et reprise différenciée dans Maître Hibou.','calculer-fractions.html']
  ];
  function renderFractionsAnnualPlan(){return `<article class="lesson-card lesson-card--wide fractions-annual-card"><h3>🍰 Progression spiralaire des fractions — P1 à P5</h3><p>Les fractions ne forment pas un bloc isolé : elles reviennent par manipulation, représentation, verbalisation, problèmes et entraînement dans Maître Hibou.</p><div class="fractions-annual-table"><div class="fractions-row fractions-head"><span>Période</span><span>Moment</span><span>Compétence</span><span>Séance collective</span><span>Ressource Hibou</span></div>${fractionsAnnualPlan.map(x=>`<div class="fractions-row"><span><strong>${x[0]}</strong></span><span>${x[1]}</span><span>${x[2]}</span><span>${x[3]}</span><span>🦉 ${mathResourceTitles[x[4]]||x[4]}</span></div>`).join('')}</div></article>`;}
  function renderAnnualMathPlan(){return `<article class="lesson-card lesson-card--wide"><h3>🗓️ Découpage mathématique annuel prévu avec Maître Hibou</h3><div class="annual-math-plan">${annualMathHibouPlan.map(x=>`<section><strong>${x[0]}</strong><p>${x[1]}</p></section>`).join('')}</div></article>${renderFractionsAnnualPlan()}`;}



  const p1CharivariCorpus={
    1:{
      name:'Charivari — série 1 « Le cheval et le fermier »',
      flashes:[
        ['1a','Sur le chemin de l’église, des chevaux tirent des voitures de fortune.'],
        ['1b','La chaleur est lourde. Le chien tourne autour du fermier.'],
        ['1c','Le fermier encourage les animaux qui tournent autour de lui.']
      ],
      final:'Par une lourde chaleur, un cheval tire une voiture de fortune sur le chemin de l’église. Un chien tourne autour de lui. Le fermier encourage l’animal.',
      words:'une église, une fortune, une voiture, un chemin, un cheval, autour, une chaleur, un chien, un fermier, lourd, encourager, un animal, beau / belle',
      rules:'Pluriel des mots en -al et -eau ; et / est ; présent des verbes du 1er groupe ; présent de être et avoir.'
    },
    2:{
      name:'Charivari — série 5 « Les métiers »',
      flashes:[
        ['5a','L’institutrice dirige ses élèves dans sa classe. Joues-tu bien dans la cour de récréation ?'],
        ['5b','À l’atelier, le menuisier cloue, scie et rabote des planches ; il manie la scie avec adresse.'],
        ['5c','Le facteur passe chaque jour, de bonne heure. Il nous distribue une lettre.']
      ],
      final:'Chaque jour, le facteur distribue les lettres dans les maisons. Il passe de bonne heure. À l’atelier, le menuisier cloue, scie et rabote des planches ; il manie la scie avec adresse. L’instituteur dirige ses élèves dans sa classe. Joues-tu bien dans la cour de récréation ?',
      words:'un instituteur / une institutrice, diriger, bien, la cour de récréation, un élève, de l’adresse, clouer, un menuisier, une planche, raboter, scier, manier, un atelier, distribuer, un facteur, une heure, une lettre, un jour',
      rules:'Féminin des noms en -teur / -trice ; ces / ses ; phrase interrogative ; cour / cours / court ; a / à ; et / est ; s / ss ; présent des verbes du 1er groupe.'
    },
    3:{
      name:'Charivari — série 6 « Christophe et les nuages »',
      flashes:[
        ['6a','Christophe se couche sur le dos et regarde les nuages dans le ciel. L’un imite un chapeau, l’autre une vieille dame.'],
        ['6b','Les nuages imitent des bœufs, des géants, des chapeaux, des vieilles dames, des paysages.'],
        ['6c','Tu parles tout bas avec eux. Tu remues tes pieds et tes mains. Tes yeux se ferment, le sommeil te gagne.']
      ],
      final:'Christophe se couche sur le dos et regarde les nuages dans le ciel. Ces nuages imitent des bœufs, des géants, des chapeaux, des vieilles dames, des paysages. Il parle tout bas avec eux. Il remue les pieds et les mains. Ses yeux se ferment, le sommeil le gagne.',
      words:'un chapeau, le ciel, une dame, un dos, l’autre, l’un, se coucher, vieil / vieille / vieux, un bœuf, un géant, un paysage, un pied, le sommeil, tout bas, une main, un œil / des yeux, eux',
      rules:'et / est ; ces / ses ; présent des verbes du 1er groupe, notamment les verbes en -ier et -uer.'
    },
    4:{
      name:'Charivari — série 4 « La pluie »',
      flashes:[
        ['4a','Un nuage bas annonce le mauvais temps. Il a l’air de nous suivre. Rentrons.'],
        ['4b','Pendant que tu fermes ton manteau pour ne pas avoir froid, Marie abrite son petit frère sous un vaste parapluie bleu.'],
        ['4c','La pluie tombe depuis le matin. Elle forme de la boue sur le chemin. On rentre.']
      ],
      final:'La pluie tombe depuis le matin. Elle forme de la boue sur le chemin. Pendant que tu abrites ton petit frère sous un vaste parapluie bleu, Marie ferme son manteau pour ne pas avoir froid. Les nuages sont bas, ils annoncent encore du mauvais temps. Ils ont l’air de nous suivre. On rentre.',
      words:'annoncer, mauvais / mauvaise, rentrer, suivre, le temps, un nuage, bas / basse, avoir, un frère, froid / froide, un manteau, un parapluie, pour, vaste, petit, pendant, s’abriter, bleu, la boue, depuis, la pluie, un matin',
      rules:'Présent des verbes du 1er groupe ; avoir l’air ; son / sont ; m devant m, b, p ; boue / bout ; distinction ils ont / ils sont dans la dictée finale.'
    },
    5:{
      name:'Réactivation des séries Charivari de P1',
      flashes:[
        ['Reprise 1','Le facteur distribue une lettre.'],
        ['Reprise 2','Les nuages annoncent la pluie.'],
        ['Reprise 3','Le chien ne tourne pas autour du fermier.']
      ],
      final:'Le facteur distribue une lettre. Les nuages annoncent la pluie. Le chien ne tourne pas autour du fermier.',
      words:'Chaque élève reprend trois à cinq mots encore fragiles parmi les séries 1, 5, 6 et 4.',
      rules:'Réactivation ciblée : phrase, négation, verbe et infinitif, sujet et pronom, singulier et pluriel.'
    }
  };
  // V34.84 — Programmation explicite des dictées CE2, période 1.
  // Les corpus, dictées flash et dictées bilans existants restent inchangés.
  const p1DictationProgramming=(window.DICTEES_CE2&&window.DICTEES_CE2.p1)||{};

  function p1DictationBankData(week){
    const p=p1DictationProgramming[week]; if(!p)return null;
    return {...p,orthography:p.orthographeCible,orthographyWords:p.motsCibles,grammar:p.grammaireCible,grammarExamples:p.exempleGrammaire};
  }

  function renderP1DictationProgramming(week){
    const p=p1DictationBankData(week); if(!p)return '';
    const flashes=p.flashes.length?`<ol>${p.flashes.map(x=>`<li><strong>${x[0]} :</strong> ${x[1]}</li>`).join('')}</ol>`:'<p><em>Pas encore de série de trois dictées flash cette semaine.</em></p>';
    const bilan=p.final?`<p><strong>Dictée bilan :</strong> ${p.final}</p>`:`<p><strong>Bilan :</strong> ${p.note||'Observation formative.'}</p>`;
    return `<details class="dictation-programming-compact">
      <summary>
        <span>📝 <strong>Dictée — semaine ${week}</strong></span>
        <span class="dictation-programming-compact__summary">${p.theme} · ${p.priority||'priorités à définir'} · ${p.orthography}</span>
        <span class="dictation-programming-compact__toggle">Voir le détail</span>
      </summary>
      <div class="dictation-programming-compact__body">
        <div><strong>Thème :</strong> ${p.theme}</div>
        <div><strong>Banque de mots :</strong> ${p.words}</div>
        <div><strong>5 mots prioritaires :</strong> ${p.priority}</div>
        <div><strong>Orthographe :</strong> ${p.orthography}</div>
        <div><strong>Mots / exemples :</strong> ${p.orthographyWords||'À préciser avec le corpus.'}</div>
        <div><strong>Grammaire :</strong> ${p.grammar}</div>
        <div><strong>Exemple élève :</strong> ${p.grammarExamples||'À partir d’une phrase de la semaine.'}</div>
        <div><strong>Réactivation :</strong> ${p.reactivationWords||p.reactivation||'—'}</div>
        ${p.ecritureDRAS?`<div><strong>DRAS — phrase de départ :</strong> ${p.ecritureDRAS.phraseDepart}</div><div><strong>Production d’écrit :</strong> ${p.ecritureDRAS.production}</div><div><strong>Mots à employer :</strong> ${p.ecritureDRAS.motsAEmployer}</div>`:''}
        ${p.support?`<div><strong>Support :</strong> ${p.support}</div>`:''}
        <div><strong>Dictées flash :</strong>${flashes}</div>
        <div class="dictation-programming-compact__final">${bilan}</div>
      </div>
    </details>`;
  }

  function renderDictationDrasGuide(p,mode){
    const d=p&&p.ecritureDRAS; if(!d)return '';
    if(mode==='tuesday'){
      return `<div class="dictation-dras-guide">
        <div class="dictation-dras-guide__title">🧩 DRAS — à partir du corpus</div>
        <div class="dictation-dras-guide__phrase"><strong>Phrase DRAS de départ :</strong> « ${d.phraseDepart} »</div>
        <div><strong>D — Déplacer :</strong> ${d.deplacer}</div>
        <div><strong>R — Remplacer :</strong> ${d.remplacer}</div>
      </div>`;
    }
    if(mode==='thursday'){
      return `<div class="dictation-dras-guide">
        <div class="dictation-dras-guide__title">✍️ DRAS + production d’écrit</div>
        <div class="dictation-dras-guide__phrase"><strong>Phrase DRAS de départ :</strong> « ${d.phraseDepart} »</div>
        <div><strong>S — Supprimer :</strong> ${d.supprimer}</div>
        <div><strong>A — Ajouter :</strong> ${d.ajouter}</div>
        <div><strong>Production :</strong> ${d.production}</div>
        <div><strong>Mots à employer :</strong> ${d.motsAEmployer}</div>
      </div>`;
    }
    if(mode==='friday'){
      return `<div class="dictation-dras-guide">
        <div class="dictation-dras-guide__title">🔎 Relecture DRAS</div>
        <div class="dictation-dras-guide__phrase"><strong>Phrase DRAS de référence :</strong> « ${d.phraseDepart} »</div>
        <div>Relire la production et vérifier : <strong>sens, accords, précision et vocabulaire de la semaine</strong>.</div>
        <div><strong>Mots attendus / disponibles :</strong> ${d.motsAEmployer}</div>
      </div>`;
    }
    return '';
  }

  function p1DictationTimetableGuide(week,day,row){
    if(!row || row[0]!=='10h–10h45') return '';
    const rowText=((row[1]||'')+' '+(row[2]||'')).toLowerCase();
    if(rowText.includes('copie') && !/dictée|orthographe|grammaire|dras/.test(rowText)) return '';
    const p=p1DictationBankData(week); if(!p)return '';
    const dayName=String(day||'').split(' ')[0];
    if(dayName==='Lundi'){
      return `<div class="dictation-timetable-guide">
        <div class="dictation-timetable-guide__title">📝 ${p.theme}</div>
        <div><strong>Banque :</strong> ${p.words}</div>
        <div><strong>Prioritaires :</strong> ${p.priority}</div>
        <div><strong>Point orthographique :</strong> ${p.orthography}</div>
        <div><strong>Mots concernés :</strong> ${p.orthographyWords||'À relever avec la classe.'}</div>
      </div>`;
    }
    if(dayName==='Mardi'){
      const flash=p.flashes[1]||'Dictée flash 2 à construire à partir des mots observés.';
      return `<div class="dictation-timetable-guide">
        <div class="dictation-timetable-guide__title">✍️ Flash 2</div>
        <div>${flash}</div>
        <div><strong>Grammaire :</strong> ${p.grammar}</div>
        <div><strong>À faire dire / manipuler :</strong> ${p.grammarExamples||'À partir de la phrase du jour.'}</div>
        ${renderDictationDrasGuide(p,'tuesday')}
      </div>`;
    }
    if(dayName==='Jeudi'){
      const flash=p.flashes[2]||'Dictée flash 3 à construire à partir des mots observés.';
      return `<div class="dictation-timetable-guide">
        <div class="dictation-timetable-guide__title">✍️ Flash 3</div>
        <div>${flash}</div>
        <div><strong>Réactivation :</strong> ${p.reactivationWords||p.reactivation||'—'}</div>
        <div><strong>Point de vigilance :</strong> ${p.orthographyWords||p.orthography}</div>
        ${renderDictationDrasGuide(p,'thursday')}
      </div>`;
    }
    if(dayName==='Vendredi'){
      return `<div class="dictation-timetable-guide">
        <div class="dictation-timetable-guide__title">✅ Dictée bilan</div>
        <div>${p.final||p.note||'Bilan formatif de la semaine.'}</div>
        <div><strong>À surveiller :</strong> ${p.orthographyWords||p.orthography}</div>
        <div><strong>Mots à reprendre si besoin :</strong> ${p.reactivationWords||'selon les réussites observées'}</div>
        ${renderDictationDrasGuide(p,'friday')}
      </div>`;
    }
    return '';
  }

  function renderP1DictationOverview(){
    const rows=Object.keys(p1DictationProgramming).map(Number).sort((a,b)=>a-b).map(week=>{
      const p=p1DictationBankData(week);
      return `<tr><td><strong>S${week}</strong></td><td>${p.theme}</td><td>${p.orthography}</td><td>${p.orthographyWords||'—'}</td><td>${p.grammar}</td><td>${p.reactivationWords||p.reactivation}</td></tr>`;
    }).join('');
    return `<details class="dashboard-collapse dashboard-collapse--dictation" data-dashboard-panel="dictation-overview-p1"${dashboardPanelOpenAttr_('dictation-overview-p1')}>
      <summary><span>🗓️ <strong>Progression des dictées P1</strong></span><span class="dashboard-collapse__summary">Vue d’ensemble de la période</span><span class="dashboard-collapse__toggle">Afficher</span></summary>
      <div class="dashboard-collapse__body"><div class="detail-table-wrap"><table class="detail-table">
      <thead><tr><th>Semaine</th><th>Thème</th><th>Orthographe</th><th>Mots concernés / exemples</th><th>Grammaire</th><th>Mots à réactiver</th></tr></thead>
      <tbody>${rows}</tbody></table></div></div></details>`;
  }

  function renderP1Corpus(weekNumber){
    const corpus=p1CharivariCorpus[weekNumber];
    if(!corpus)return '';
    return `<article class="lesson-card lesson-card--wide"><h3>📚 Corpus Charivari intégré — ${corpus.name}</h3>
      <div class="charivari-corpus">
        ${corpus.flashes.map(item=>`<div class="charivari-line"><strong>${item[0]}</strong><p>${item[1]}</p></div>`).join('')}
        <div class="charivari-line charivari-final"><strong>Dictée finale originale</strong><p>${corpus.final}</p></div>
        <div class="charivari-line"><strong>Mots proposés dans le fichier original</strong><p>${corpus.words}</p></div>
        <div class="charivari-line"><strong>Règles et conjugaison associées</strong><p>${corpus.rules}</p></div>
      </div>
      <p class="lesson-note"><strong>Utilisation dans notre progression :</strong> ce corpus sert de matériau au DRAS, au vocabulaire, à l’oral et à la production d’écrit. La dictée réellement donnée reste la version adaptée indiquée dans le déroulement de la séance.</p>
    </article>`;
  }
  function p1LessonButton(id){return id?`<button type="button" class="lesson-open" data-open-p1-lesson="${id}">📘 Ouvrir la séance complète</button>`:'';}
  function studentInstruction(text){
    const replacements=[
      [/^Afficher /i,'Observe '],[/^Présenter /i,'Observe '],[/^Faire verbaliser /i,'Explique '],
      [/^Rappeler /i,'Rappelle-toi : '],[/^Lire /i,'Lis '],[/^Construire /i,'Construis '],
      [/^Comparer /i,'Compare '],[/^Compléter /i,'Complète '],[/^Écrire /i,'Écris '],
      [/^Repérer /i,'Repère '],[/^Choisir /i,'Choisis '],[/^Mesurer /i,'Mesure '],
      [/^Tracer /i,'Trace '],[/^Résoudre /i,'Résous '],[/^Reformuler /i,'Reformule '],
      [/^Noter /i,'Repère '],[/^Observer /i,'Observe '],[/^Nommer /i,'Nomme '],
      [/^Colorier /i,'Colorie '],[/^Entourer /i,'Entoure '],[/^Surligner /i,'Surligne ']
    ];
    let out=text;
    replacements.some(([rx,repl])=>{if(rx.test(out)){out=out.replace(rx,repl);return true;}return false;});
    return out;
  }
  function renderP1Lesson(id,mode='teacher',step=0){
    const lesson=p1LessonPlans[id]; if(!lesson)return;
    const content=document.getElementById('timetableContent');
    const projectionSlides=lesson.slides&&lesson.slides.length?lesson.slides:lesson.phases.map(p=>({kind:'phase',title:p[1],items:[studentInstruction(p[2])],time:p[0]}));
    step=Math.max(0,Math.min(Number(step)||0,projectionSlides.length-1));
    const support=lesson.hibou?('Maître Hibou — '+lesson.hibou.title):(lesson.week===1?'Charivari — série 1 « Le cheval et le fermier »':lesson.week===2?'Charivari — série 5 « Les métiers »':lesson.week===3?'Charivari — série 6 « Christophe et les nuages »':lesson.week===4?'Charivari — série 4 « La pluie »':'Réactivation des dictées Charivari de P1');
    const modeBar=`<div class="lesson-mode-bar" role="group" aria-label="Choisir l’affichage"><button type="button" class="lesson-mode-btn ${mode==='teacher'?'is-active':''}" data-lesson-mode="teacher" data-lesson-id="${id}">👩‍🏫 Déroulement enseignant</button><button type="button" class="lesson-mode-btn ${mode==='student'?'is-active':''}" data-lesson-mode="student" data-lesson-id="${id}">📽️ Projection élèves</button></div>`;
    if(mode==='student'){
      const slide=projectionSlides[step];
      const isCorrection=slide.kind==='correction';
      content.innerHTML=`<section class="lesson-view lesson-view--student"><div class="detail-top"><div><span class="detail-zone">P1 · diaporama élèves ${isCorrection?'· correction':''}</span><h2>${lesson.title}</h2><p>${lesson.domain} · ${lesson.duration}</p></div><button class="detail-back" type="button" data-back-p1-week="${lesson.week}">← Retour à la semaine ${lesson.week}</button></div>${modeBar}
        <div class="student-projection"><section class="student-objective"><span>Aujourd’hui, nous allons…</span><ul>${lesson.objectives.map(x=>`<li>${x}</li>`).join('')}</ul></section>
        <section class="student-phase ${isCorrection?'student-phase--correction':''} ${slide.kind==='hibou'?'student-phase--hibou':''}"><div class="student-phase-count">Diapo ${step+1} / ${projectionSlides.length}</div>${slide.time?`<time>${slide.time}</time>`:''}<h3>${slide.title}</h3>${slide.kind==='hibou'?`<iframe class="hibou-lesson-frame" src="${slide.url}" title="${slide.title}"></iframe>`:`<ol class="projection-exercises">${slide.items.map(x=>`<li>${x}</li>`).join('')}</ol>`}${isCorrection?'<div class="correction-mark">✓ Correction</div>':''}</section>
        <nav class="student-step-nav"><button type="button" data-lesson-student-step="${step-1}" data-lesson-id="${id}" ${step===0?'disabled':''}>← Diapo précédente</button><button type="button" data-lesson-student-step="${step+1}" data-lesson-id="${id}" ${step===projectionSlides.length-1?'disabled':''}>Diapo suivante →</button></nav></div></section>`;
      return;
    }
    content.innerHTML=`<section class="lesson-view"><div class="detail-top"><div><span class="detail-zone">P1 · fiche de préparation enseignant</span><h2>${lesson.title}</h2><p>${lesson.domain} · ${lesson.duration}</p><p><strong>Support :</strong> ${support}</p></div><button class="detail-back" type="button" data-back-p1-week="${lesson.week}">← Retour à la semaine ${lesson.week}</button></div>${modeBar}
      <div class="lesson-grid"><article class="lesson-card"><h3>🎯 Objectifs</h3><ul>${lesson.objectives.map(x=>`<li>${x}</li>`).join('')}</ul></article>
      ${lesson.words?`<article class="lesson-card"><h3>📝 Mots de la semaine</h3><p>${lesson.words}</p><p><strong>Parcours prioritaire :</strong> ${lesson.priority}</p></article>`:''}
      ${renderP1DictationProgramming(lesson.week+2)}
      ${renderP1Corpus(lesson.week)}
      <article class="lesson-card lesson-card--wide"><h3>🧭 Déroulement enseignant</h3><ol class="lesson-steps">${lesson.phases.map(p=>`<li><time>${p[0]}</time><div><strong>${p[1]}</strong><p>${p[2]}</p></div></li>`).join('')}</ol></article>
      ${lesson.hibou?`<article class="lesson-card lesson-card--wide hibou-reuse-card"><h3>🦉 Travail Maître Hibou réutilisé</h3><p><strong>${lesson.hibou.title}</strong></p><p>Cette leçon existante sert de synthèse collective et de prolongement individuel. Elle n’est pas recréée dans Progressions CE2.</p><a class="hibou-open-link" href="${lesson.hibou.url}" target="_blank" rel="noopener">Ouvrir la leçon Maître Hibou ↗</a></article>`:''}
      ${lesson.slides?`<article class="lesson-card lesson-card--wide"><h3>🧮 Exercices projetés et corrections</h3><div class="teacher-slide-list">${lesson.slides.map((sl,i)=>`<section class="teacher-slide ${sl.kind==='correction'?'is-correction':''} ${sl.kind==='hibou'?'is-hibou':''}"><strong>Diapo ${i+1} — ${sl.title}</strong>${sl.kind==='hibou'?`<p>Leçon intégrée : ${sl.url}</p>`:`<ol>${sl.items.map(x=>`<li>${x}</li>`).join('')}</ol>`}</section>`).join('')}</div></article>`:''}
      ${lesson.hibou?renderAnnualMathPlan():''}
      <article class="lesson-card"><h3>🔁 Réinvestissement spiralaire</h3><p>${lesson.spiral}</p></article>
      <article class="lesson-card"><h3>✅ Observation / évaluation</h3><p>${lesson.assessment}</p></article>
      <article class="lesson-card"><h3>🧩 Adaptations</h3><p>${lesson.dys}</p></article></div></section>`;
  }

  const p2DetailedWeeks=window.PROGRESSIONS_EDT_DATA.p2DetailedWeeks;
  const p3DetailedWeeks=window.PROGRESSIONS_EDT_DATA.p3DetailedWeeks;
  const p4DetailedWeeks=window.PROGRESSIONS_EDT_DATA.p4DetailedWeeks;
  const p5DetailedWeeks=window.PROGRESSIONS_EDT_DATA.p5DetailedWeeks;

  // V34.64 — Verrou calendrier : une date sans classe ne peut jamais afficher de créneau pédagogique.
  const schoolCalendar=window.CALENDRIER_SCOLAIRE_2026_2027||{daysOff:[]};
  const daysOffByDate=new Map((schoolCalendar.daysOff||[]).map(item=>[item.date,item]));
  const frenchMonths={janvier:1,fevrier:2,'février':2,mars:3,avril:4,mai:5,juin:6,juillet:7,aout:8,'août':8,septembre:9,octobre:10,novembre:11,decembre:12,'décembre':12};
  function isoFromFrenchDayLabel(label){
    const txt=String(label||'').toLowerCase().replace(/1er/g,'1').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const m=txt.match(/(?:lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
    if(!m)return null;
    const month=frenchMonths[m[2]]||frenchMonths[m[2].normalize('NFD').replace(/[\u0300-\u036f]/g,'')];
    if(!month)return null;
    return `${m[3]}-${String(month).padStart(2,'0')}-${String(Number(m[1])).padStart(2,'0')}`;
  }
  function calendarDayOff(dateOrLabel){
    const iso=/^\d{4}-\d{2}-\d{2}$/.test(String(dateOrLabel||''))?String(dateOrLabel):isoFromFrenchDayLabel(dateOrLabel);
    return iso?daysOffByDate.get(iso)||null:null;
  }
  function lockCalendarWeeks(period,weeks){
    (weeks||[]).forEach(week=>{
      const removed=[];
      week.days=(week.days||[]).filter(([dayLabel])=>{
        const off=calendarDayOff(dayLabel);
        if(!off)return true;
        removed.push(`${off.icon||'📅'} ${dayLabel} — ${off.label} : pas de classe, aucun créneau pédagogique.`);
        console.warn(`[Calendrier scolaire] ${period} ${week.key||''} : créneaux supprimés pour ${dayLabel} (${off.label}).`);
        return false;
      });
      week.calendarLockNote=removed.join(' · ');
    });
  }
  lockCalendarWeeks('p1',p1DetailedWeeks);
  lockCalendarWeeks('p2',p2DetailedWeeks);
  lockCalendarWeeks('p3',p3DetailedWeeks);
  lockCalendarWeeks('p4',p4DetailedWeeks);
  lockCalendarWeeks('p5',p5DetailedWeeks);
  window.ProgressionsSchoolCalendarGuard={
    isDayOff(dateOrLabel){return !!calendarDayOff(dateOrLabel);},
    canSchedule(dateOrLabel){return !calendarDayOff(dateOrLabel);},
    getDayOff(dateOrLabel){return calendarDayOff(dateOrLabel);}
  };
  function calendarNotice(data){
    const notes=[data&&data.holiday,data&&data.calendarLockNote].filter(Boolean);
    return notes.length?`<div class="holiday-note">📅 ${notes.join(' · ')}</div>`:'';
  }
  const labels=['Français','Mathématiques','Langue vivante','EPS','Arts','Sciences','Histoire-géographie-EMC'];
  const annual=['330 h','165 h','49 h 30','99 h','66 h','36 h 40','45 h 50'];
  const subjectClasses=['french','maths','english','eps','arts','science','history'];
  const subjectIcons=['📚','➗','🇬🇧','🏃','🎨','🔬','🌍'];
  function altered(day,key,mode,period){
    const rows=base[day].map(x=>[...x]);
    if(mode==='rentree'&&day==='mardi') return [
      ...rows.slice(0,7),
      ['14h15–14h30','Anglais','Rituel oral court en classe entière','english'],
      ['14h30–15h45','Arts et projets de rentrée','Classe entière : coopération, création, règles de vie','arts'],
      ['15h45–16h','Récréation','','break'],
      ['16h–16h30','Ateliers de rentrée','Classe entière : lecture, jeux mathématiques, découverte des outils','common'],
      ['16h30–17h','Bilan de journée','Parole aux élèves et préparation du lendemain','emc']
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
    if(['p2','p3','p4','p5'].includes(period)&&day==='jeudi'){
      const readingSlot=rows.find(slot=>slot[0]==='9h15–10h');
      if(readingSlot){
        readingSlot[1]='Lecture — œuvre complète';
        readingSlot[2]='Créneau réservé : étude suivie d’une œuvre complète · support à définir';
        readingSlot[3]='french';
      }
    }
    return rows;
  }
  function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function statusKey(week,day,time){return `progressionsCE2.edt.${week}.${day}.${time}`;}
  function statusSelect(key){
    const current=localStorage.getItem(key)||'Prévu';
    return `<select class="detail-status" data-status-key="${esc(key)}">${['Prévu','Réalisé','Reporté'].map(v=>`<option${v===current?' selected':''}>${v}</option>`).join('')}</select>`;
  }
  function dayStatusToolbar(){
    return `<div class="day-status-toolbar" aria-label="Modifier rapidement le statut de la journée"><span>Statut de la journée :</span><button type="button" data-set-day-status="Prévu">Tout prévu</button><button type="button" data-set-day-status="Réalisé">Tout réalisé</button><button type="button" data-set-day-status="Reporté">Tout reporté</button></div>`;
  }
  // V35.75 — panneaux de pilotage repliables pour accéder rapidement au jour.
  function dashboardPanelOpenAttr_(key){
    try{return localStorage.getItem(`progressionsCE2.dashboardPanel.${key}`)==='open'?' open':'';}catch(e){return '';}
  }
  function bindDashboardPanels_(root){
    root.querySelectorAll('details[data-dashboard-panel]').forEach(panel=>{
      if(panel.dataset.dashboardPanelBound==='1') return;
      panel.dataset.dashboardPanelBound='1';
      panel.addEventListener('toggle',()=>{
        try{localStorage.setItem(`progressionsCE2.dashboardPanel.${panel.dataset.dashboardPanel}`,panel.open?'open':'closed');}catch(e){}
      });
    });
  }
  function renderWeekFocusPanel_(focus,evalCount){
    return `<details class="dashboard-collapse dashboard-collapse--focus" data-dashboard-panel="week-focus"${dashboardPanelOpenAttr_('week-focus')}>
      <summary><span>🎯 <strong>Intention de la semaine</strong></span><span class="dashboard-collapse__summary">${esc(focus)}</span><span class="dashboard-collapse__badge">${evalCount} temps de suivi répartis</span><span class="dashboard-collapse__toggle">Afficher</span></summary>
      <div class="dashboard-collapse__body p1-focus"><div><strong>🎯 Intention de la semaine</strong><p>${focus}</p></div><span>${evalCount} temps de suivi répartis</span></div>
    </details>`;
  }
  function bindStatusControls(root){
    bindDashboardPanels_(root);
    root.querySelectorAll('[data-status-key]').forEach(sel=>sel.addEventListener('change',()=>localStorage.setItem(sel.dataset.statusKey,sel.value)));
    root.querySelectorAll('[data-set-day-status]').forEach(btn=>btn.addEventListener('click',()=>{
      const status=btn.dataset.setDayStatus;
      const daySection=btn.closest('.detail-day');
      if(!daySection) return;
      const selects=[...daySection.querySelectorAll('[data-status-key]')];
      if(!selects.length) return;
      if(status!=='Prévu'&&!window.confirm(`Passer les ${selects.length} séances de cette journée en « ${status} » ?`)) return;
      selects.forEach(sel=>{
        sel.value=status;
        localStorage.setItem(sel.dataset.statusKey,status);
      });
      btn.classList.add('is-applied');
      window.setTimeout(()=>btn.classList.remove('is-applied'),650);
    }));
  }
  // V31.49 — Programme annuel de mathématiques, relié aux ressources Maître Hibou.

  const dailyProblemBank={"p1":{"1":{"type":"EF+/EF-","label":"Transformation — recherche de l’état final","page":4,"problems":["Rachel avait 13 billes. Diego lui en donne 7. Combien Rachel a-t-elle de billes maintenant ?","Combien Lana a-t-elle de balles maintenant ? Lana avait 9 balles. Gabriel lui en donne 6.","Zineb avait 18 cartes. A la récréation elle en perd 4. Combien Zineb a-t-elle de cartes maintenant ?","Ayoub avait 15 billes. Léa lui en donne 6. Combien Ayoub a-t-il de billes maintenant ?","David avait 19 petites voitures. Il en donne 7 à Emmy. Combien David a-t-il de petites voitures maintenant ?","Au petit-déjeuner, Maxime a mangé 9 fraises. A midi, il en mange 7. Combien Maxime a-t-il mangé de fraises au total ?","Indique combien il reste de fruits. Il y avait 10 fruits. Les enfants en ont mangé 7.","Dans la classe il y avait 8 stylos rouges. La maitresse en a commandé 8 autres. Combien y aura-t-il de stylos rouges ?","Combien reste-t-il de cerceaux ? A la piscine, Diego jette 15 cerceaux dans l’eau et Iris en récupère 6.","Le maitre prépare 20 feuilles, les élèves en utilisent 13. Combien de feuilles reste-t-il ?"]},"2":{"type":"Tr+/Tr-","label":"Transformation — recherche de la transformation","page":5,"problems":["Combien Adam a-t-il donné de billes à Léna ? Il avait 28 billes, il en a donné à Léna. Il lui en reste 12.","Combien Nino a-t-il gagné de cartes ? Il en avait 36 avant, maintenant il en a 50.","Livia avait 18 euros. Elle reçoit de l’argent de la part de sa tante. Elle a maintenant 29 euros. Combien sa tante lui a-t-elle donné ?","Il y avait 32 clémentines pour le gouter. Il en reste 11. Combien de clémentines ont été mangées ?","Calcule combien d’élèves sont descendus du bus. Il y avait 37 élèves dans le bus. Des élèves sont descendus et il reste maintenant 16 élèves dans le bus.","Combien Nina a-t-elle perdu de billes ? Nina avait 28 billes avant la récréation. Après la récréation il lui en reste 12.","Ce matin Yanis avait 23 billes. A la récréation, il en a gagné. Maintenant, il en a 32. Combien a-t-il gagné de billes à la récréation ?","Combien Lana a-t-elle reçu de figurines ? Lana collectionne les figurines. Elle en avait 19. Elle en a reçu d’autres, maintenant elle en a 28.","Maman lit un livre de 85 pages. Il lui reste 37 pages à lire. Trouve combien elle a déjà lu de pages.","Combien Maria a-t-elle reçu d’argent ? Elle avait 24 euros. Elle reçoit de l’argent. Maintenant, elle a 35 euros."]},"3":{"type":"EI+","label":"Transformation — recherche de l’état initial après un gain","page":6,"problems":["Lenny avait des billes. Il en reçoit 12. Maintenant il en a 26. Trouve combien Lenny avait de billes au départ.","Gabriel a des fleurs. Rachel lui en donne 8. Maintenant Gabriel a 17 fleurs. Combien de fleurs avait Gabriel au début ?","Combien de fleurs y avait-il avant les vacances ? Il y avait des fleurs dans le jardin. 23 fleurs ont poussé pendant les vacances. Maintenant il y a 50 fleurs.","Ce matin, des voitures étaient garées sur le parking. 20 voitures sont arrivées dans l’après-midi, maintenant il y a 35 voitures. Précise combien il y avait de voitures ce matin.","Combien Maxime avait-il de cartes avant la recréation ? Maxime avait des cartes. A la récréation il en gagne 17. Maintenant il en a 26.","Dans la matinée, la boulangère a encaissé 37 euros. A midi, elle a 50 euros dans sa caisse. Combien la boulangère avait-elle d’argent ce matin ?","Les élèves empruntent 34 livres à la bibliothèque. Il y a maintenant 73 livres dans la classe. Combien y avait-il de livres avant la sortie à la bibliothèque ?","Maman est fermière. Elle a acheté 19 poules. Maintenant il y a 27 poules dans la basse-cour. Combien y avait-il de poules dans la basse-cour avant l’achat ?","A l’arrêt, 26 personnes montent dans le tramway. Il y a maintenant 53 personnes dans le tramway. Combien y avait-il de personnes avant l’arrêt ?","La maitresse a commandé 14 stylos. Maintenant il y en a 23. Combien y avait-t-il de stylos avant la commande ?"]},"4":{"type":"EI-","label":"Transformation — recherche de l’état initial après une perte","page":7,"problems":["Léa avait des billes. A la récréation elle en donne 10 à David. Maintenant elle en a 24. Combien Léa avait-elle de billes avant la récréation ?","Diego donne 8 balles à Emmy. Maintenant il lui en reste 16. Combien Diego avait-il de balles avant d’en donner à Emmy ?","Pour le gouter, Rachel mange 5 cerises. Il lui en reste 45. Combien Rachel avait-elle de cerises avant de gouter ?","Papi est fleuriste. Aujourd’hui il a vendu 56 roses. A la fin de la journée, il lui en reste 6. Combien papi avait-il de roses ce matin ?","La maitresse a commandé 15 stylos. Elle en a maintenant 45. Combien la maitresse avait-elle de stylo avant la commande ?","Mila a déjà utilisé 19 pages de son cahier. Il lui reste 31 pages vierges. Combien le cahier contenait-il de pages vierges au début ?","Indique combien la boulangère avait de baguettes. La boulangère a vendu 37 baguettes, il lui en reste 12.","18 élèves descendent du bus. Il reste 30 élèves dans le bus. Combien y avait-il d’élèves au départ ?","Le Géant de Cornouailles a cueilli des fraises dans son jardin. Il en offre 45 à ses amis et il lui en reste 17. Combien a-t-il cueilli de fraises ?","M. Lagaffe fait tomber une pile d’assiettes. 8 assiettes se cassent. Maintenant, il ne lui reste que 14 assiettes. Combien avait-il d’assiettes dans sa pile ?"]},"5":{"type":"MA","label":"Multiplication — addition réitérée","page":8,"problems":["La maitresse distribue 4 jetons à chacun des 6 élèves. Précise combien elle distribue de jetons en tout.","Dans un parking, le stationnement coûte 5 € par jour. Combien doit-on payer pour stationner 3 jours ?","Une pizza coûte 9 euros. Cherche combien coûteront 4 pizzas.","Sur chacun des neuf bureaux il y a 4 stylos. Calcule combien il y a de stylos en tout.","Combien peut-on transporter de passagers avec 5 minibus ? Un minibus peut transporter 8 passagers.","Zineb achète 6 livres. Chaque livre coûte 5 euros. Combien Zineb doit-elle payer ?","Trouve combien il y a de joueuses en tout. Pour la finale de football féminin, il y a 10 équipes de 11 joueuses.","Combien faut-il de pommes pour préparer 4 gâteaux ? Pour un gâteau il faut 5 pommes.","Fanny achète 7 bouquets de roses. Dans chaque bouquet il y a 5 roses. Combien Fanny a-t-elle de roses en tout ?","Combien coûtent 10 lots de cahiers ? 1 lot de cahiers coûte 5 €."]},"6":{"type":"MR","label":"Multiplication — configuration rectangulaire","page":9,"problems":["Une feuille a 4 carreaux sur sa largeur et 7 carreaux sur sa longueur. Trouve combien il y a de carreaux sur la feuille.","Indique combien il y a de carreaux de chocolat. Une tablette de chocolat a 5 carreaux sur sa largeur et 9 carreaux sur sa longueur.","Une feuille a 8 carreaux sur sa longueur et 5 sur sa largeur. Précise combien il y a de carreaux sur la feuille.","Les élèves de la classe ont planté 5 rangées de 10 fleurs. Combien ont-ils planté de fleurs ?","Une tablette de chocolat a 10 barres de 6 carreaux. Combien y a-t-il de carreaux de chocolat ?","Les jardiniers ont planté 5 rangées de 9 fleurs. Combien ont-ils planté de fleurs ?","Calcule le nombre total de carreaux. Le carrelage de la cuisine a 9 carreaux sur sa longueur et 4 carreaux sur sa largeur.","Combien y a-t-il d’élèves dans la classe ? Dans la classe, il y a 4 rangées de 7 élèves.","Le carrelage de la salle de classe a 10 carreaux sur sa longueur et 8 carreaux sur sa largeur. Combien y a-t-il de carreaux en tout ?","Dans une grande boîte d’œufs, il y a 6 rangées de 3 œufs. Donne le nombre d’œufs qu’il y a dans boîte."]},"7":{"type":"révisions EF+/EF- ; Tr+/Tr- ; MA/MR ; EI+/EI- EI-   Combien y avait-il de passagers avant l’arrêt ? A l’arrêt, 17 passagers descendent du tramway. Il reste 36 passagers.","label":"révisions EF+/EF- ; Tr+/Tr- ; MA/MR ; EI+/EI- EI-   Combien y avait-il de passagers avant l’arrêt ? A l’arrêt, 17 passagers descendent du tramway. Il reste 36 passagers.","page":10,"problems":["Combien y avait-il de passagers avant l’arrêt ? A l’arrêt, 17 passagers descendent du tramway. Il reste 36 passagers.","Calcule combien d’élèves sont descendus du bus. Il y avait 56 élèves dans le bus. Des élèves sont descendus et il reste maintenant 25 élèves.","Papi achète trois bouquets de cinq tulipes. Combien Papi a-t-il de fleurs en tout ?","Mamie est jardinière. Elle a planté 4 rangées de 6 salades. Combien a-t-elle planté de salades en tout ?","48 élèves étaient dans le bus. 33 élèves sont descendus pour aller au théâtre. Combien reste-t-il d’élèves dans le bus ?","Papa travaille dans une tour. Il sort de son bureau et monte 7 étages pour porter un document à l’étage 24. A quel étage est son bureau ?","Maman veut offrir des fleurs à ses parents. Elle achète trois bouquets de 9 roses. Combien achète-t-elle de fleurs en tout ?","Lenny a une collection de 55 perles. Emmy lui en donne 15. Combien Lenny a-t-il de perles maintenant ?","A Grenoble, 74 personnes prennent le train. A Lyon, 27 personnes descendent. Combien reste-t-il de passagers ?","Indique combien de fleurs Diego a ramassé dans l’après-midi. Il en a ramassé 15 le matin, le soir il en a 55."]}},"p2":{"1":{"type":"EI+","label":"Transformation — recherche de l’état initial après un gain","page":11,"problems":["Iris reçoit 17 euros de sa tante. Elle a maintenant 39 euros. Trouve combien elle avait d’argent avant.","Combien Diego avait-il de billes avant la récréation ? A la récréation, Diego a gagné 15 billes. Maintenant, il en a 46.","La grand-mère de Gabriel lui donne 14 euros. Maintenant, il a 20 euros. Combien avait-il d’argent avant ?","Maman travaille dans une tour. Elle sort de son bureau et monte 5 étages pour porter un document à l’étage 20. A quel étage est son bureau ?","Combien de tomates y avait-il la semaine dernière ? Il y a 18 nouvelles tomates dans le jardin. Cela en fait 49 au total.","L’équipe de handball a marqué 20 points lors de la deuxième mi-temps. Elle finit le match avec 41 points. Combien avait-t-elle marqué de points lors de la première mi-temps ?","Pour le rallye de mathématiques, les élèves ont répondu à deux exercices. Le second exercice a rapporté 24 points. Au total, les élèves ont gagné 50 points. Combien de points leur a rapporté le premier exercice ?","Mia reçoit 15 euros de sa tante. Elle a maintenant 28 euros. Combien avait-elle d’argent avant ?","Indique combien de cartes Iris avait avant la récréation. A la récréation, elle a gagné 7 cartes. Maintenant, elle en a 40.","La grand-mère d’Ayoub lui donne 18 euros. Maintenant, il a 38 euros. Combien Ayoub avait-il d'euros avant le cadeau de sa grand-mère ?"]},"2":{"type":"EI-","label":"Transformation — recherche de l’état initial après une perte","page":12,"problems":["Diego avait des billes. Il en donne 15 à Zineb. Maintenant Diego a 25 billes. Combien avait-il de billes avant ?","A la récréation, la maitresse a distribué des fruits. Les élèves ont mangé 24 fruits. Il en reste 6. Combien de fruits y avait-il en tout ?","Indique combien de billes David avait au début de la récréation. Pendant la récréation, David a perdu 24 billes. Maintenant, il lui reste 8 billes.","Papa est allé au marché. Il a dépensé 34 euros. Il revient avec 16 euros. Combien d’argent avait-il pris pour aller au marché ?","Léa avait des billes. Elle en a donné 16 à Lenny. Maintenant Léa a 28 billes. Combien avait-elle de billes avant ?","Nino prend 42 tranches de pain dans le sac à pain pour les distribuer aux enfants de la cantine. Il reste 13 tranches de pain dans le sac à pain.","Iris a des fleurs. Elle en offre 8 à Gabriel. Il lui en reste maintenant 27. Combien Iris avait-t-elle de fleurs au départ ?","Combien de billes Emmy avait-elle au départ ? Emmy a perdu 14 billes. Maintenant, il lui reste 19 billes.","Combien Maxime avait-il de perles ? Il a utilisé 32 perles pour réaliser un collier et il lui reste 21 perles.","La cantinière n’avait pas assez de yaourts pour tous les enfants de la cantine. Elle en a commandé 23. Maintenant elle en a 65. Combien la cantinière avait- elle de yaourts avant la commande ?"]},"3":{"type":"Tr+/Tr-","label":"Transformation — recherche de la transformation","page":13,"problems":["David a 45 fraises. Après en avoir donné à ses copains, il lui en reste 8. Combien David a-t-il donné de fraises ?","Combien Lana a-t-elle utilisé de perles ? Elle avait 50 perles. Elle a fabriqué un collier. Il lui reste 21 perles.","Dans un verger, il y a 42 arbres. La tempête casse des arbres. Il reste 28 arbres debout. Trouve combien d’arbres ont été cassés pendant la tempête.","A la rentrée, la maitresse a commandé 120 feutres. A la fin de l’année, elle en compte 34. Combien la maitresse a-t-elle distribué de feutres pendant l’année ?","Indique combien papi a dépensé au marché. Il va au marché avec 54 € et revient avec 13 €.","Papa est boulanger. Ce matin, il avait 28 euros dans sa caisse. Le soir, il compte 568 euros. Combien papa a-t-il gagné dans la journée ?","Diego a 45 cartes. Il en gagne à la récréation. Maintenant, il en a 78. Cherche combien Diego a gagné de cartes pendant la récréation.","Au départ du tramway, il y a 67 passagers. Au dernier arrêt, il y a 89 passagers. Combien de passagers sont montés durant le trajet ?","Pour arriver au sommet de la tour, il faut monter 250 marches. Les visiteurs ont déjà monté 125 marches. Quelle quantité de de marches doivent-ils encore monter ?","Dans un magasin, il y avait 68 sacs de croquettes. En fin de journée, il en reste 34. Quelle quantité de de sacs de croquettes ont été vendus pendant la journée ?"]},"4":{"type":"EI+/EI-","label":"EI+/EI-","page":14,"problems":["L’oiseau a mangé 13 graines. Il en reste 45. Combien y avait-il de graines avant son repas ?","A la fin de l’année, il y a 25 élèves dans la classe. 6 élèves se sont inscrits pendant l’année. Combien y avait-il d’élèves en début d’année ?","Lana la pirate a gagné 45 pièces d’or. Elle en a maintenant 67. Combien avait-elle de pièces d’or au départ ?","L’oiseau a mangé 29 graines. Il en reste 8. Combien y avait-il de graines au départ ?","Papi coupe 34 fleurs dans son jardin. Il en reste 65. Combien y avait-il de fleurs au début ?","Indique combien Léa avait d’argent avant son anniversaire. Léa a reçu 15 euros pour son anniversaire. Elle a maintenant 33 €.","David a distribué 27 jetons. Il lui en reste 28. Combien David avait-il de jetons avant la distribution ?","Le train démarre. Au premier arrêt, 42 passagers montent. Il y a maintenant 75 passagers. Combien y avait-il de passagers au départ ?","43 personnes descendent du train. Il reste 73 personnes. Combien y avait-il de personnes au départ ?","Mamie a payé 26 € au marché. Il lui reste 19 €. Combien avait-elle d’argent au départ ?"]},"5":{"type":"P/T","label":"Partie–tout","page":15,"problems":["Combien Nino a-t-il de billes bleues ? Nino a 53 billes. 17 billes sont rouges et les autres sont bleues.","Dans la classe il y a 29 élèves. 13 d’entre eux portent des baskets. Combien d’élèves ne portent pas de baskets ?","Emmy a gagné 27 billes jaunes et 19 billes vertes. Combien a-t-elle gagné de billes en tout ?","Dans la boite il y a 56 jetons. 17 jetons sont noirs, les autres sont blancs. Précise combien il y a de jetons blancs dans la boite.","Dans la boite il y a 72 jetons jaunes et rouges. 39 sont rouges. Combien y a-t-il de jetons jaunes dans la boite ?","Indique combien Mamie a donné de billes en tout. Elle en a donné 27 à Iris et 26 à Maxime.","Combien y a-t-il d’élèves dans la cour de récréation ? Il y a 56 élèves de CP et 53 élèves de CE1.","Dans l’école, il y a 84 chaises rouges ou bleues. 37 chaises sont rouges. Combien y a-t-il de chaises bleues dans l’école ?","Pendant la sortie en forêt, la classe a ramassé 72 feuilles. 39 feuilles sont rouges, les autres sont jaunes. Quelle quantité de feuilles jaunes ont été ramassées ?","Ayoub a 28 euros et Mia a 19 euros. Combien Ayoub et Mia ont-ils ensemble ?"]},"6":{"type":"DV","label":"Division — valeur d’une part","page":16,"problems":["Lana distribue équitablement 48 cartes à 6 joueurs. Combien chaque joueur reçoit-il de cartes ?","Gabriel range 24 voitures dans 4 boites. Il met le même nombre de voitures dans chaque boite. Combien met-il de voitures dans chaque boite ?","Le maitre achète 20 livres qui coûtent tous le même prix. Il paye 100 euros. Combien coûte 1 livre ?","Quelle quantité de billes y a-t-il dans chaque paquet ? Diego a 48 billes. Il constitue 6 paquets identiques de billes.","Rachel a 70 perles. Elle réalise 7 colliers identiques. Combien utilise-t-elle de perles pour chaque collier ?","Papi range 45 noisettes dans 5 paquets. Il met autant de noisettes dans chaque paquet. Combien met-il de noisettes par paquet ?","Maman est fleuriste. Elle reçoit 30 fleurs. Elle assemble 6 bouquets identiques. Combien met-elle de fleurs par bouquet ?","Combien y a-t-il d’élèves à chaque table ? 48 élèves mangent à la cantine. Il y a 6 tables identiques.","Calcule combien il y a de personnes dans chaque minibus. Il y a 5 minibus identiques et 45 personnes à transporter.","Il y a 90 chaises pour 9 tables. Il faut mettre le même nombre de chaises autour de chaque table. Combien y aura-t-il de chaises autour de chaque table ?"]},"7":{"type":"révisions EI+/EI- ; Tr+/Tr- ; P/T ; DV EI+   A la fin de l’année, Zineb lit 75 mots en une minute. Elle lit 25 mots de plus qu’au début de l’année. Combien de mots lisait-elle au début de l’année ?","label":"révisions EI+/EI- ; Tr+/Tr- ; P/T ; DV EI+   A la fin de l’année, Zineb lit 75 mots en une minute. Elle lit 25 mots de plus qu’au début de l’année. Combien de mots lisait-elle au début de l’année ?","page":17,"problems":["A la fin de l’année, Zineb lit 75 mots en une minute. Elle lit 25 mots de plus qu’au début de l’année. Combien de mots lisait-elle au début de l’année ?","Gabriel a acheté une poupée à 24 euros. Il lui reste 14 euros. Combien avait-il d’euros au début ?","Dans un bouquet, il y a 56 fleurs : 21 roses et des marguerites. Indique combien il y a de marguerites dans le bouquet.","Quelle quantité de fraises mamie peut-elle mettre sur chaque tartelette ? Mamie a 48 fraises et veut préparer 8 tartelettes.","Combien y a-t-il d’arbres dans la forêt ? Dans la forêt, il y a 123 sapins, 24 châtaigniers et 16 chênes.","Dans le bus, il y avait 32 passagers. A Grenoble, d’autres passagers montent dans le bus. Il y a maintenant 51 passagers. Combien de passagers sont montés dans le bus à Grenoble ?","5 amis se partagent équitablement 55 noisettes. Quelle quantité de noisettes chaque ami reçoit-il ?","Maxime a 76 euros et son amie Emmy a 36 euros. Combien ont-ils d’euros en tout ?","Léa a un collier de 48 perles : 15 perles roses et des bleues. Cherche combien il y a de perles bleues dans le collier.","Papi a 68 cerises. Il en utilise pour cuisiner un dessert, il lui en reste maintenant 15. Combien a-t-il utilisé de cerises pour son dessert ?"]}},"p3":{"1":{"type":"C","label":"Comparaison — recherche de l’écart","page":18,"problems":["Dans une boutique, un jouet coûte 62 €. Il coûte 54 € dans une autre boutique. De combien est-il moins cher dans la 2ème boutique ?","Papi a 68 ans. Papa a 30 ans. Combien d’années Papi a-t-il en plus ?","Maman a 35 ans. Tata a 42 ans. Combien d’années maman a-t-elle en moins ?","Gabriel mesure 124 cm et Zineb mesure 132 cm. De combien de cm Gabriel est-il plus petit ?","Dans un zoo, une lionne pèse 110 kg. Le lion pèse 160 kg. Combien de kilos le lion pèse-t-il en plus ?","Diego rangé ses pièces de Lego par couleur. Il a compté 154 pièces rouges et 120 pièces bleues. Calcule combien il y a de pièces rouges en plus.","Léa collectionne des images de football. Elle en a 53. Son ami Maxime en a 35. Combien Maxime a-t-il d’images de moins que Léa ?","Le chien de Lila mange 450 grammes de croquettes par jour. Son chat mange 50 grammes de croquettes. Combien de grammes de croquettes son chat mange-t-il de moins que son chien chaque jour ?","Pendant l’entrainement au cross, Ayoub a couru pendant 15 minutes et Emmy pendant 21 minutes. Combien Emmy a-t-elle couru de minutes en plus ?","En classe, nous lisons tous le même livre. Ayoub en est à la page 157. Mia en est à la page 87. Combien Ayoub a-t-il lu de pages de plus que Mia ?"]},"2":{"type":"CE","label":"Comparaison — recherche d’un état","page":19,"problems":["Ayoub a 58 billes. Iris en a 31 en moins. Combien Iris a-t-elle de billes ?","Dans sa tirelire, Lila a 53 euros. Thomas a 25 euros de moins. Combien Thomas a-t-il d’argent ?","Il y a 122 roses dans le jardin. Il y a 18 tulipes de moins que de roses. Calcule combien il y a de tulipes dans le jardin.","Papi a 60 ans. Tatie a 28 ans de moins que lui. Quel est l’âge de tatie ?","David a 39 billes. Mia en a 21 de plus. Combien Mia a-t-elle de billes ?","Dans sa tirelire, Rachel a 17 euros. Lenny en a 25 de plus. Combien Lenny a-t-il d’euros ?","Papa a 48 ans. Son cousin Nino a 15 ans de plus. Quel âge a Nino ?","Il y a 60 roses dans le jardin. Il y a 43 tulipes de moins que de roses. Précise combien il y a de tulipes dans le jardin.","Rachel mesure 139 centimètres. Sa sœur mesure 10 centimètres de plus. Quelle est la taille de sa sœur ?","Nino mesure 123 centimètres. Lana mesure 8 centimètres de plus. Quelle est la taille de Lana ?"]},"3":{"type":"EF+/EF- ; EI+/EI-","label":"EF+/EF- ; EI+/EI-","page":20,"problems":["Rachel avait 37 billes. A la récréation, elle en a gagné 15. Combien a-t-elle de billes maintenant ?","Lana et Gabriel achètent des gommettes, ils en utilisent 12, il leur en reste 9. Combien avaient-ils acheté de gommettes ?","Nino a des cartes. Pour son anniversaire, il en reçoit 35. Il en a maintenant 59. Combien avait-il de cartes avant son anniversaire ?","Le maitre a pris 29 cerceaux dans la caisse de matériel. Il en a laissé 14. Combien y avait-il de cerceaux dans la caisse ?","Mia a 39 points. Elle gagne 11 points de plus. Combien a-t-elle de points maintenant ?","Maxime paye 19 euros pour acheter un jeu. Il lui reste 38 euros. Combien Maxime avait d’argent avant d’acheter son jeu ?","Le bus transporte 28 personnes. 19 personnes de plus montent. Indique combien il y a de passagers dans le bus maintenant.","Il y a 71 élèves dans l’école. 26 élèves partent au ski. Combien reste-t-il d’élèves dans l’école ?","Combien le directeur a-t-il acheté de mandarines pour le gouter de Noël ? Les élèves ont mangé 68 mandarines et il en reste 12.","Le petit Poucet a emporté 42 petits cailloux. Il en a semé 15 le long du chemin. Combien lui en reste-t-il ?"]},"4":{"type":"MA","label":"Multiplication — addition réitérée","page":21,"problems":["Un cahier coûte 5 €. Combien coûtent 10 cahiers ?","Il y a 8 roses dans un bouquet. Combien faut-il de roses pour 5 bouquets ?","Il y a 4 raisins secs dans un cookie. Combien faut-il de raisins secs pour 6 cookies ?","Combien coûtent en tout 9 tickets de cinéma ? Un ticket de cinéma coûte 6 €.","Chaque semaine, le poissonnier vend 30 kg de poissons. Combien vend-il de kg de poissons en 4 semaines ?","Le directeur a commandé 7 paquets de 50 enveloppes. Combien recevra-il d’enveloppes ?","A la ferme il y a 12 vaches. Calcule combien il y a de pattes.","Au magasin il y a 6 sachets de 8 pommes. Combien cela fait-il de pommes en tout ?","Combien Léa a-t-elle de billes ? Elle a 5 paquets de 9 billes.","Indique combien il y a d’enfants dans la cour de récréation. Il y a 8 groupes de 5 enfants."]},"5":{"type":"révisions C ; CE ; EF+/EF- ; EI+/EI- ; MA CE   Combien Mia a-t-elle ramassé de fleurs ? Lenny a cueilli 52 fleurs. Mia en a ramassé 25 de plus que lui.","label":"révisions C ; CE ; EF+/EF- ; EI+/EI- ; MA CE   Combien Mia a-t-elle ramassé de fleurs ? Lenny a cueilli 52 fleurs. Mia en a ramassé 25 de plus que lui.","page":22,"problems":["Combien Mia a-t-elle ramassé de fleurs ? Lenny a cueilli 52 fleurs. Mia en a ramassé 25 de plus que lui.","Combien coûtent 5 tickets de cinéma ? Un ticket de cinéma coûte 9 €.","Dans la salle de spectacle Première, il y a 26 places libres. Dans la salle de spectacle Lepont, il y a 17 places libres. Calcule combien il y a de places libres en plus dans la salle Première.","Dans le zoo de City, il y a 25 flamands roses. Dans le zoo de Town, il y en a 41. Précise combien il y a de flamands roses en moins dans le zoo de City.","Gabriel a ramassé 142 champignons. Il en a utilisé 38 pour une omelette. Combien lui en reste-il ?","Le village de Léa est à 56 km de Grenoble. Celui de Maxime est à 46km de Grenoble. Combien de kilomètres en moins Maxime doit-il parcourir pour aller à Grenoble ?","Rachel a perdu 14 billes à la récréation. Elle en a maintenant 34. Quelle quantité de billes avait-elle au début de la récréation ?","Combien Maxime a-t-il de feutres ? Lana a 23 feutres. Maxime en a 16 de moins.","Il y a 7 roses dans un bouquet. Combien faut-il de roses pour 6 bouquets ?","Ayoub a mangé 45 petits pois. Zineb en a mangé 12 de plus. Combien Zineb a-t-elle mangé de petits pois ?"]}},"p4":{"1":{"type":"MR","label":"Multiplication — configuration rectangulaire","page":23,"problems":["Une tablette de chocolat a 7 carreaux sur sa largeur et 8 carreaux sur sa longueur. Combien la tablette contient-elle de carreaux ?","Une feuille a 6 carreaux sur sa largeur et 8 sur sa longueur. Précise combien il y a de carreaux sur la feuille.","Dans la classe, il y a 3 rangées de 7 bureaux. Combien y a-t-il de bureaux dans la classe ?","Combien y a-t-il de carreaux sur la feuille ? Une feuille a 10 carreaux sur sa largeur et 12 carreaux sur sa longueur.","L’immeuble de mamie a 9 étages. A chaque étage, il y a 8 fenêtres. Combien y a-t-il de fenêtres en tout ?","Dans la classe il y a 5 rangées de 6 bureaux. Indique combien il y a de bureaux en tout.","Cherche combien il y a de carreaux de chocolat. Une tablette de chocolat a 5 carreaux sur sa largeur et 9 carreaux sur sa longueur.","Une feuille a 5 carreaux sur sa largeur et 7 carreaux sur sa longueur. Combien y a-t-il de carreaux sur la feuille ?","Indique combien le tableau contient de cases. Il a 6 lignes et 8 colonnes.","Le plateau d’un jeu d’échec est formé d’un quadrillage de 8 cases sur 8. Combien y a-t-il de cases sur le plateau ?"]},"2":{"type":"DN","label":"Division — nombre de parts","page":24,"problems":["Dans la classe, il y a 28 élèves. On veut faire des équipes de 4 élèves. Combien y aura-t-il équipes ?","Léa veut coller 36 images dans son album. Elle peut mettre 4 images par page. Combien va-t-elle remplir de pages ?","Le parking du supermarché comporte 120 places. Chaque rangée a 12 places. Calcule le nombre de rangées.","A l’anniversaire de David il y a 24 personnes. Il prévoit des tables de 8 personnes. Combien faut-il de tables ?","De combien de sacs Emmy a-t-elle besoin ? Elle a 60 billes. Elle veut remplir des sacs de 10 billes.","Diego a 40 €. Il veut acheter des livres qui coûtent 5 € chacun. Combien peut-il acheter de livres ?","On a 16 œufs. On veut les ranger dans des boites de 4. De combien de boites a-t-on besoin ?","Indique combien la fleuriste a composé de bouquets. La fleuriste a composé des bouquets de 8 roses. Elle a utilisé 48 roses.","De combien de boites a-t-on besoin ? On veut ranger 36 œufs dans des boites de 6.","On divise la classe de 25 élèves en 5 équipes. Combien y aura-t-il d’élèves par équipe ?"]},"3":{"type":"DV","label":"Division — valeur d’une part","page":25,"problems":["Iris distribue équitablement 30 ballons gonflables à 6 enfants. Combien chaque enfant recevra-t-il de ballons ?","6 enfants jouent aux cartes avec 54 cartes. Combien chaque enfant recevra-t-il de cartes ?","5 livres coûtent 45 euros. Calcule le prix d’un livre.","6 enfants se partagent 42 cubes. Combien chaque enfant aura-t-il de cubes ?","Combien chaque enfant recevra-t-il de fraises ? Lenny partage 48 fraises entre 6 enfants.","Nino a acheté 8 pochettes de cartes. Cela lui fait 40 cartes. Quelle quantité de cartes y avait-il par pochette ?","Pour le spectacle de fin d’année, les élèves doivent installer 45 chaises sur 5 rangées. Indique combien il y a de chaises par rangées.","3 enfants jouent avec un jeu de 54 cartes. Combien chaque enfant reçoit-il de cartes en début de partie ?","Précise combien chaque enfant aura de cubes. Mia, Nino, Maxime et Emmy ont 36 cubes. Ils se les partagent équitablement.","Lenny a 48 images qu’il range dans 6 enveloppes. Il met le même nombre d’images dans chaque enveloppe. Combien d’images met-il dans chaque enveloppe ?"]},"4":{"type":"CEx","label":"Comparaison multiplicative","page":26,"problems":["Dans sa ruche madame Dusse a 120 abeilles. Dans la ruche de Monsieur Popeye il y en a 4 fois plus. Combien y a-t-il d’abeilles dans la ruche de monsieur Popeye ?","Lors d’une rencontre de basket, l’équipe de Grenoble a marqué 25 points. L’équipe de Nantes a marqué 2 fois plus de points. Combien l’équipe de Nantes a- t-elle marqué de points ?","A la fin de l’automne, dans le jardin de madame Rousse, 50 feuilles sont tombées. Monsieur Brun, son voisin, a plus de travail car il a 3 fois plus de feuilles à ramasser. Combien monsieur Brun devra-t-il ramasser de feuilles ?","Rachel a 24 barrettes. Sa sœur a 4 fois moins de barrettes. Combien sa sœur a-t-elle de barrettes ?","Mamie a donné 90 croquettes à son gros chat et 3 fois moins à son petit chaton. Combien le petit chaton a-t-il reçu de croquettes ?","Zineb a construit une tour avec 30 planchettes. David a construit une tour 4 fois plus grande. Combien David a-t-il utilisé de planchettes ?","Lors d’un entraînement de ski de fond, Diego a parcouru 1200m. Son amie Zineb a parcouru 3 fois plus. Quelle distance a parcouru Zineb ?","Lors d’un incendie, les pompiers ont utilisé 24 000 l d’eau. Lors des entraînements, ils utilisent 2 fois moins d’eau. Combien les pompiers utilisent-ils de litres d’eau pour un entrainement ?","Une gazelle pèse en moyenne 20 kg. Une girafe est 40 fois plus lourde. Combien pèse une girafe ?","Dans l’école de Lenny, les élèves récupèrent des piles pour les faire recycler. Ils en ont récupéré 120. Dans l’école d’Emmy, ils en ont récupéré 3 fois moins. Quelle quantité de piles ont été récupérées dans l’école d’Emmy ?"]},"5":{"type":"C","label":"Comparaison — recherche de l’écart","page":27,"problems":["Dans une boutique, un jouet coûte 76 euros. Il coûte 84 euros dans un autre magasin. De combien est-il plus cher dans le deuxième magasin ?","Le chêne du parc a 329 ans. Le platane de la cour a 84 ans. De combien d’années le platane est-il plus jeune ?","Pour aller au gymnase, Emmy fait 450 pas. Pour aller à la cantine, elle en fait 89. Combien de pas fait-elle en moins pour aller à la cantine ?","Au courseton, Iris court 1575 mètres et Nino court 1485 mètres. Quelle distance Nino court-il en moins ?","La Tour Eiffel mesure 300 mètres. La statue de la Liberté mesure 93 mètres. Combien la Tour Eiffel mesure-t-elle de plus que la statue de la Liberté ?","En mathématiques, les CE2 ont effectué l’activité du fourmilion. Un groupe a dénombré 637 cubes. Un autre groupe a dénombré 843 cubes. Quelle quantité de cubes le deuxième groupe a-t-il en plus ?","Nino a utilisé 76 pages de son cahier. Gabriel en a utilisé 54. Combien Gabriel a-t-il utilisé de pages en moins ?","Un immeuble a 80 fenêtres. Une maison a 18 fenêtres. Combien de fenêtres l’immeuble a-t-il en plus ?","En fluence, Rachel a lu 92 mots en septembre et 124 en décembre. Combien Rachel a-t-elle lu de mots en plus en décembre ?","David a 53 euros. Rachel a 64 euros. Combien d’euros Rachel a-t-elle en plus ?"]},"6":{"type":"CE*","label":"Comparaison — énoncé à traduire","page":28,"problems":["Lenny pèse 22 kg. Il pèse 3 kg de plus que Léa. Combien pèse Léa ?","Cherche quelle est la hauteur de la tour Perret de Grenoble. La tour Eiffel mesure 300 mètres. Elle mesure 202 mètres de plus que la tour Perret.","Dans une école, il y a 87 élèves. Cela fait 26 de plus qu’à l’école voisine. Trouve le nombre d’élèves de l’école voisine.","Le club de tennis de Saint Martin d’Hères commande 65 balles. C’est 25 de moins que le club de Gières. Combien le club de Gières a-t-il commandé de balles de tennis ?","Pour aller à Lyon, Lana parcourt 62 km. Elle parcourt 24 km de moins que sa cousine. Quelle distance sa cousine doit-elle parcourir ?","À quelle place Nino est-il arrivé ? A la course, Emmy est arrivée à la place 65. Elle est arrivée 6 places devant Nino.","Iris a 23 cartes. Elle en a 19 de moins que son frère Gabriel. Combien Gabriel a-t-il de cartes ?","Calcule combien Maxime a de billes. Mia a 127 billes. Elle en a 22 de plus que Maxime.","Un VTT coûte 185 € chez Vitsport. Cela fait 25 € de moins que chez Sportgo. Quel est le prix du VTT chez Sportgo ?","La jument de mamie pèse 949 kg. Elle pèse 640 kg de plus que son poulain. Quel est le poids du poulain ?"]},"7":{"type":"révisions C ; CE ; CEx ; MR ; DV/DN MR   Dans une salle de cinéma, il y a 15 rangées de 10 sièges. Précise combien il y a de sièges dans la salle.","label":"révisions C ; CE ; CEx ; MR ; DV/DN MR   Dans une salle de cinéma, il y a 15 rangées de 10 sièges. Précise combien il y a de sièges dans la salle.","page":29,"problems":["Dans une salle de cinéma, il y a 15 rangées de 10 sièges. Précise combien il y a de sièges dans la salle.","Pour la fête de l’école, les parents ont acheté 60 bonbons. Ils remplissent des paquets de 4 bonbons. Combien de paquets pourront-ils remplir ?","Quelle quantité de feutres Lenny a-t-il de moins que Zineb ? Lenny a 28 feutres. Zineb en a 36.","David a 25 cartes. Ayoub en a 3 fois plus. Combien Ayoub a-t-il de cartes ?","Quelle est la différence d’âge entre Nino et Léa ? Nino a 37 ans. Léa a 14 ans.","Lors de la cérémonie du 8 mai, il y a 10 rangées de 9 militaires. Précise combien il y a de militaires en tout.","Le carrelage de la cuisine est composé de 10 rangées de 11. Indique combien il y a de carreaux.","Combien Emmy a-t-elle de billes ? Gabriel a 21 billes. Emmy en a 3 fois moins.","Trouve combien Iris a de perles. Maxime a 21 perles. Iris en a 16 de plus.","Le maitre a dépensé 49 euros pour acheter 7 livres identiques. Quel est le prix d’un livre ?"]}},"p5":{"1":{"type":"MA","label":"Multiplication — addition réitérée","page":30,"problems":["Combien y a-t-il d’appartements dans l’immeuble ? Dans un immeuble, il y a 15 appartements par étage. L’immeuble compte 6 étages.","Un paquet de bonbons coûte 4 €. Pour l’anniversaire de son fils, papa achète 6 paquets. Combien va-t-il payer ?","Maman est infirmière, elle achète 3 boîtes de 20 pansements. Combien aura-t-elle de pansements ?","Un livre coûte 8 €. Combien coûtent 20 livres ?","Chaque élève utilise 5 cahiers par an. Cette année, il y a 23 élèves. Combien la maitresse doit-elle commander de cahiers ?","Indique le nombre d’œufs prévu par la pâtissière pour préparer ses gâteaux. Elle prévoit 20 boites de 6 œufs.","Combien de litres de lait le fermier obtient-il chaque jour ? Dans la ferme, il y a 7 vaches. Chacune donne 20 litres de lait par jour.","La pâtissière prépare un gâteau aux pralines. Elle utilise 4 sachets de 10 pralines. Combien de pralines utilise-t-elle ?","Chaque élève utilise 4 crayons à papier par an. Cette année, il y a 25 élèves. Combien la maitresse doit-elle commander de crayons à papier ?","L’infirmier achète 8 boîtes de 12 pansements. Combien aura-t-il de pansements ?"]},"2":{"type":"MR","label":"Multiplication — configuration rectangulaire","page":31,"problems":["Mamie est jardinière, elle plante 30 lignes de 15 roses. Combien a-t-elle planté de roses au total ?","Dans une boite de perles, il y a 14 rangées de 8 perles. Trouve combien il y a de perles dans la boite.","Combien y a-t-il de voitures ? Dans un parking, il y a 8 rangées de 30 voitures.","Dans une salle de cinéma, il y a 10 fauteuils par rangées. Il y a 5 rangées. Combien y a-t-il de fauteuils au total ?","Maman est boulangère. Elle a installé 3 rangées de 9 pâtisseries. Combien a-t-elle installé de pâtisseries au total ?","Dans une classe, le plafond est composé de 6 rangées de 22 dalles. Combien y a-t-il de dalles au total ?","Au stade, il y a 8 rangées de 12 places libres Combien y a-t-il de places libres ?","Précise combien il y a de fauteuils occupés dans une salle de cinéma. Il y a 8 fauteuils par rangées. Il y a 6 rangées occupées.","Dans un parking, il y a 10 rangées de 8 voitures. Indique combien il y a de voitures.","Dans la cuisine, le carrelage est composé de 8 lignes de 12 carreaux. Combien y a-t-il de carreaux au total ?"]},"3":{"type":"DV","label":"Division — valeur d’une part","page":32,"problems":["Papi partage 150 euros entre ses 3 petits-enfants. Chaque enfant reçoit la même somme. Combien d’euros chaque enfant reçoit-il ?","Gabriel a ramassé 45 fraises dans le jardin. Il les partage entre les 5 membres de la famille. Combien chacun aura-t-il de fraises ?","Pour jouer à la bataille, 4 élèves se partagent 52 cartes. Combien chaque joueur reçoit-il de cartes ?","Pour jouer à Poule, renard, vipère, les 48 élèves de CE2 doivent se répartir en 3 équipes. Combien y aura-t-il de joueurs dans chaque équipe ?","Les pirates ont trouvé un coffre rempli de 96 pierres précieuses. Les 8 pirates se partagent équitablement ce trésor. Combien chaque pirate reçoit-t-il de pierres précieuses ?","Papi emmène ses 8 petits-enfants à la foire. Il achète 40 jetons pour les manèges. Combien chaque enfant aura-t-il de jetons ? Chacun en reçoit la même quantité.","Sur la table, il y a une barquette de 24 fraises. Les 4 membres de la famille veulent en manger autant chacun. Combien chacun en aura-t-il ?","Le bibliothécaire doit ranger 240 livres sur 6 étagères. Il veut en mettre autant sur chacune. Combien y aura-t-il de livres sur chaque étagère ?","L’équipe féminine de hockey a reçu une prime de 3000 euros à partager entre les 20 joueuses. Combien chaque joueuse reçoit-elle d’euros ?","Le directeur a commandé 300 cubes. Il doit en donner autant à chacune des 6 classes. Combien chaque classe aura-t-elle de cubes ?"]},"4":{"type":"DN","label":"Division — nombre de parts","page":33,"problems":["Mamie est fermière, elle récupère 72 œufs dans le poulailler. Elle les range dans des boites de 6. De combien de boites a-t-elle besoin ?","Pour la kermesse, le maitre a 125 €. Il veut acheter des sachets de ballons gonflables à 5 €. Combien de paquets peut-il acheter ?","Iris a une boite de 240 perles. Elle a besoin de 10 perles pour fabriquer un bracelet. Quelle quantité de bracelets peut-elle fabriquer ?","Pour mettre des rideaux aux fenêtres de la salle polyvalente, le maire a commandé 30 mètres de tissu. Il faut 2 mètres de tissu par fenêtre. Combien y a-t-il de fenêtres dans la salle polyvalente ?","Au gymnase, il y a une caisse avec 42 balles de tennis. Chaque joueuse prend 6 balles et il ne reste plus de balle dans la caisse. Indique combien il y a de joueuses.","Il y a 21 planches pour le jeu de loto. Chaque joueur joue avec 3 planches. Quel est le nombre de personnes pouvant jouer ?","Des enfants jouent aux cartes avec un jeu de 24 cartes. Les cartes sont toutes distribuées et chaque joueur reçoit 6 cartes. Calcule combien il y a de joueurs.","40 élèves participent à une rencontre sportive. La directrice veut faire des équipes de 8. Combien y aura-t-il d’équipes ?","Avec 32 papillotes, combien peut-on remplir de sachets de 4 papillotes ?","Lenny a une boite de 180 perles. Il a besoin de 18 perles pour fabriquer un collier. Combien de colliers peut-il fabriquer ?"]},"5":{"type":"EF+/EF- ; EI+/EI-","label":"EF+/EF- ; EI+/EI-","page":34,"problems":["Iris joue au jeu de l’oie. Elle vient d’avancer de 8 cases et se trouve maintenant sur la case 64. De quelle case est-elle partie ?","Il restait 16 cahiers. La maitresse reçoit 90 nouveaux cahiers. Précise combien il y a de cahiers en tout maintenant.","Mme Durand donne 35 € à sa fille qui a maintenant 72 €. Combien avait-elle avant ?","Papa est boulanger. Il sort 24 croissants du four. Il a maintenant 134 croissants à vendre. Combien avait-il de croissants avant ?","Pour acheter une voiture qui coûte 5000 euros, papa et maman ont emprunté 4000 euros à la banque. Combien d’économies avaient-ils ?","Un motard a parcouru 197 km le matin, puis 90 km l’après-midi. Combien a-t-il parcouru de km en tout ?","Au cinéma, 75 personnes sont déjà installées. Un groupe de 31 personnes arrive. Combien y a-t-il de spectateurs maintenant ?","Mamie est conductrice de camion. Hier elle a parcouru 105 km. Aujourd’hui elle a parcouru 45 km. Combien a-t-elle parcouru de km en tout ?","Il restait 15 cahiers. Le maitre reçoit 85 nouveaux cahiers. Combien y a-t-il de cahiers maintenant ?","Combien coûte le sweat-shirt en solde ? Il coûtait 35 €. La réduction est de 15 €."]},"6":{"type":"P/T","label":"Partie–tout","page":35,"problems":["Pour son restaurant, Lenny achète 15 courgettes, 16 aubergines et 17 carottes. Combien a-t-il acheté de légumes en tout ?","Rachel a 24 stylos dans sa réserve : des bleus et des noirs. Elle en a 7 bleus. Combien a-t-elle de stylos noirs ?","Au cirque, les jongleuses utilisent 25 balles bleues et 38 balles jaunes. Combien de balles utilisent-elles en tout ?","Au cours de danse, il y a 27 élèves. 17 sont des femmes. Combien y a-t-il d’hommes ?","Dans la boulangerie, il y 22 brioches au chocolat et 35 à la praline. Quelle quantité de brioches y a-t-il en tout ?","Dans le magasin, il y a 237 clients dont 112 femmes. Combien y a-t-il d’hommes dans le magasin ?","Dans une école de 327 élèves, 211 enfants portent un bijou. Combien d’enfants ne portent pas de bijou ?","A la compétition de danse, il y a 126 participants dont 80 filles. Combien de garçons participent à la compétition de danse ?","Dans une école, 78 élèves de cycle 2 et 83 élèves de cycle 3 ont des lunettes. Combien d’élèves ont des lunettes dans l’école ?","Dans un restaurant, il y a 88 desserts : des tartes aux fraises et des tartes aux pommes. Il y a 46 tartes aux fraises. Trouve combien il y a de tartes aux pommes."]},"7":{"type":"C ; CE/CE*","label":"C ; CE/CE*","page":36,"problems":["Cherche la hauteur de la statue de la Liberté à New York. La tour Eiffel mesure 300 mètres. Elle mesure 207 mètres de plus que la statue de la Liberté.","Emmy a 23 ans. Ayoub a 7 ans de plus. Quel est l’âge d’Ayoub ?","Quelle est la différence d’âge entre Nino et Léa ? Nino a 48 ans. Léa a 29 ans.","Emmy a 41 images. Maxime en a 32. Combien d’images Emmy a-t-elle de plus que Maxime ?","Lenny pèse 41 kg. Il pèse 6 kg de moins que Léa. Combien pèse Léa ?","Dans une boutique, un jouet vaut 27 €. Dans la deuxième boutique il est en promotion et coûte 19 €. De combien est-il moins cher dans la 2ème boutique ?","Dans l'école, il y a 78 élèves. Cela fait 19 de plus qu'à l’école maternelle. Trouve le nombre d’élèves de l’école maternelle.","Le club de tennis de Grenoble commande 105 balles. C’est 30 de moins que le club d'Echirolles. Combien le club d'Echirolles a-t-il commandé de balles de tennis ?","Papi a 57 ans. Tatie a 32 ans de moins que lui. Quel est l’âge de tatie ?","Le chêne du parc a 412 ans. Le platane de la cour a 56 ans. De combien d’années le chêne est-il plus vieux ?"]},"8":{"type":"révisions MA/MR ; DV/DN ; EI- ; P/T ; TR+ ; C ; CE*  MA   Le maitre a commandé 10 paquets de 15 stylos. Combien a-t-il commandé de stylos ?","label":"révisions MA/MR ; DV/DN ; EI- ; P/T ; TR+ ; C ; CE*  MA   Le maitre a commandé 10 paquets de 15 stylos. Combien a-t-il commandé de stylos ?","page":37,"problems":["Le maitre a commandé 10 paquets de 15 stylos. Combien a-t-il commandé de stylos ?","Pour le courseton, Emmy a parcouru 5 000 mètres, elle a effectué 10 tours. Quelle est la longueur d’un tour ?","Emmy a 39 €. Elle veut s’acheter des livres qui coûtent 13 € chacun. Combien peut-elle acheter de livres ?","Au cinéma, il y a 12 rangées de 35 sièges. Quel est le nombre de personnes pouvant s’asseoir dans le cinéma ?","Pour la fête de l’école, les organisateurs ont acheté pour 350 € de boissons et 125 € de frites. Combien les organisateurs ont-ils dépensé en tout ?","Indique combien Iris a de perles. David a 38 perles. Il en a 15 de plus qu’Iris.","A la fin du match de rugby, le FCG a gagné 57 points à 12. Combien l’équipe du FCG a-t-elle marqué de points en plus ?","A la mi-temps, l’équipe féminine de rugby avait 33 points. A la fin du match, elle a 54 points. Combien l’équipe féminine a-t-elle marqué de points en deuxième mi-temps ?","Il y a 67 pizzas, soit au fromage, soit aux champignons. Il y a 23 pizzas au fromage. Précise combien il y a de pizzas aux champignons.","Les élèves ont utilisé 84 tubes de colle. Il reste 41 tubes dans le placard. Combien la maitresse en avait-elle prévu au début de l’année ?"]},"9":{"type":"révisions MA/MR ; DN/DV ; P ; CE/ CE* ; CEx ; EI+  MA   Pour soigner les enfants, l’infirmier commande 12 boîtes de 100 pansements chacune. Combien aura-t-il de pansements ?","label":"révisions MA/MR ; DN/DV ; P ; CE/ CE* ; CEx ; EI+  MA   Pour soigner les enfants, l’infirmier commande 12 boîtes de 100 pansements chacune. Combien aura-t-il de pansements ?","page":37,"problems":["Pour soigner les enfants, l’infirmier commande 12 boîtes de 100 pansements chacune. Combien aura-t-il de pansements ?","Dans la bibliothèque il y a 350 livres. On a rangé 50 livres par étagère. Combien y a-t-il d’étagères ?","Dans la boite il y a 1000 perles dorées et argentées. Il y a 650 perles dorées. Combien y a-t-il de perles argentées ?","Indique combien Iris a de perles. Lenny a 43 perles. Iris en a 18 de moins.","David a ramassé 36 châtaignes. Iris en a ramassé quatre fois plus. Combien Iris a-t-elle ramassé de châtaignes ?","Au cinéma il y a 12 rangées de 23 places. Combien de spectateurs peuvent s’asseoir ?","Lors d’un match de basket, 93 points ont été marqués. L’équipe handisport de Grenoble a marqué 47 points. Combien l’équipe handisport d’Echirolles a-t-elle marqué de points ? Quelle équipe a gagné ?","Indique combien Iris a de perles. David a 302 perles. Il en a 18 de moins qu’Iris.","Pendant le tournoi de cartes, Camille gagne 27 cartes. A la fin elle a 154 cartes. Combien avait-elle de cartes au début ?","C’est le dernier jour d’école, le maitre a apporté 100 bonbons pour ses 25 élèves. Combien de bonbons aura chaque élève ?"]}}};

  function problemBankWeek(period, weekIndex){
    const weeks=dailyProblemBank[period]||{};
    const keys=Object.keys(weeks).map(Number).sort((a,b)=>a-b);
    if(!keys.length) return null;
    const chosen=keys[Math.min(weekIndex-1,keys.length-1)];
    return weeks[String(chosen)];
  }

  function dailyProblemsBlock(items, title){
    return `<div class="daily-problems"><strong>🧩 ${title}</strong><ol>${items.map(p=>`<li>${p}</li>`).join('')}</ol></div>`;
  }

  function integrateDailyProblems(period,weeks){
    weeks.forEach((week,weekIndex)=>{
      const source=problemBankWeek(period,weekIndex+1);
      if(!source) return;
      week.problemPlan={
        title:`10 problèmes par semaine — ${source.label}`,
        source:`Banque DSDEN38, page ${source.page}`,
        count:10
      };
      const allocation={lundi:[0,2],mardi:[2,4],jeudi:[4,6],vendredi:[6,10]};
      week.days.forEach(([dayName,rows])=>{
        const day=dayName.toLowerCase();
        const key=Object.keys(allocation).find(k=>day.startsWith(k));
        if(!key) return;
        const [start,end]=allocation[key];
        const set=source.problems.slice(start,end);
        const mathsRows=rows.filter(r=>r[4]==='maths');
        if(!mathsRows.length) return;
        const shortRow=mathsRows[0];
        if(key==='vendredi'){
          shortRow[2]=dailyProblemsBlock(set.slice(0,2),'Problèmes 7 et 8 — rituel oral / ardoise');
          shortRow[3]=`Résoudre des problèmes de type ${source.label} ; reformuler, représenter et choisir une opération.`;
          shortRow[5]='Rituel quotidien';
          const longRow=mathsRows[1]||shortRow;
          longRow[2]=dailyProblemsBlock(set.slice(2),'Problèmes 9 et 10 — séance longue')+
            `<p><strong>Mise en commun :</strong> comparer les procédures, expliciter le calcul et rédiger la phrase-réponse.</p>`+
            `<p class="problem-source">Source : banque DSDEN38 « 10 problèmes par semaine au CE2 », p. ${source.page}.</p>`+
            `<div class="lesson-note">Le calcul mental est maintenu 5 minutes au début des autres séances de mathématiques.</div>`+
            longRow[2];
          longRow[3]=`Enseignement explicite de la résolution de problèmes : comprendre, modéliser, calculer, répondre et vérifier.`;
          longRow[5]='Séance structurée';
        } else {
          shortRow[2]=dailyProblemsBlock(set,`Problèmes du jour — ${source.label}`);
          shortRow[3]=`Résoudre deux problèmes courts de même structure ; verbaliser la situation et justifier l’opération.`;
          shortRow[5]='Oral / ardoise, correction immédiate';
          const longRow=mathsRows[1];
          if(longRow) longRow[2]=`<div class="math-five-min">⚡ Calcul mental — 5 minutes</div>`+longRow[2];
        }
      });
    });
  }

  integrateDailyProblems('p1',p1DetailedWeeks);

  // V31.64 — Créneau réservé à l'étude d'une œuvre complète en P2 à P5.
  // Le support précis sera choisi après inventaire des ouvrages disponibles en classe.
  function reserveWholeWorkReadingSlot(period,weeks){
    (weeks||[]).forEach((week)=>{
      (week.days||[]).forEach((day)=>{
        const dayLabel=String(day[0]||'').toLowerCase();
        if(!dayLabel.startsWith('jeudi')) return;
        const sessions=day[1]||[];
        const slot=sessions.find((row)=>row && row[0]==='9h15–10h');
        if(!slot) return;
        slot[1]='Lecture — œuvre complète';
        slot[2]='Créneau réservé à l’étude suivie d’une œuvre complète. Titre et parcours à préciser après vérification des ouvrages disponibles dans la classe.';
        slot[3]=`LIT-${period.toUpperCase()} · Lire, comprendre et interpréter progressivement une œuvre complète.`;
        slot[4]='french';
        slot[5]='Créneau bloqué — support à définir';
      });
    });
  }
  reserveWholeWorkReadingSlot('p2',p2DetailedWeeks);
  reserveWholeWorkReadingSlot('p3',p3DetailedWeeks);
  reserveWholeWorkReadingSlot('p4',p4DetailedWeeks);
  reserveWholeWorkReadingSlot('p5',p5DetailedWeeks);

  integrateDailyProblems('p2',p2DetailedWeeks);
  integrateDailyProblems('p3',p3DetailedWeeks);
  integrateDailyProblems('p4',p4DetailedWeeks);
  integrateDailyProblems('p5',p5DetailedWeeks);

  const annualMathWeeks={
    p2:[
      ['Doubles et moitiés usuels','doubles-moitie.html','Multiplier par 10 et par 100','multiplier-10-100.html','Placer des nombres sur une ligne graduée','ligne-numerique.html','Résoudre un problème de comparaison','problemes-comparaison.html'],
      ['Réactiver doubles, moitiés et ×10','doubles-moitie.html','Comprendre le sens de la multiplication','sens-multiplication.html','Construire les tables de 2, 5 et 10','tables-multiplication.html','Résoudre un problème multiplicatif','problemes-multiplicatifs.html'],
      ['Mémoriser les tables de 2, 5 et 10','tables-multiplication.html','Réactiver le partage équitable','problemes-division.html','Additionner par décomposition puis poser','addition-posee.html','Résoudre un problème additif ou multiplicatif','problemes-multiplicatifs.html'],
      ['Calculer avec les tables de 2 à 5','tables-multiplication.html','Poser une soustraction avec échange','soustraction-posee.html','Convertir et comparer des longueurs','longueurs.html','Résoudre un problème à plusieurs étapes','problemes-plusieurs-etapes.html'],
      ['Automatiser les tables de 2 à 5 et 10','tables-multiplication.html','Reconnaître des fractions de même dénominateur','fractions-parts-tout.html','Mesurer et calculer un périmètre','perimetre.html','Résoudre des problèmes de groupement et partage','problemes-division.html'],
      ['Calculer mentalement des produits simples','tables-multiplication.html','Utiliser une fraction dans une situation concrète','fractions-parts-tout.html','Reconnaître et décrire les polygones','polygones.html','Résoudre un problème de partage équitable','problemes-division.html'],
      ['Bilan des automatismes de P2','tables-multiplication.html','Reproduire une figure par symétrie','symetrie.html','Lire l’heure et les minutes','lire-heure.html','Lire un tableau à double entrée','tableaux-donnees.html']
    ],
    p3:[
      ['Réactiver les tables de multiplication','tables-multiplication.html','Poser une multiplication par un chiffre','multiplication-posee-1chiffre.html','Utiliser la monnaie et calculer un prix','calculer-prix.html','Résoudre un problème multiplicatif','problemes-multiplicatifs.html'],
      ['Calculer des produits avec décomposition','multiplication-posee-1chiffre.html','Lire et écrire des fractions simples','fractions-parts-tout.html','Utiliser la monnaie et calculer un prix','calculer-prix.html','Résoudre un problème à plusieurs étapes','problemes-plusieurs-etapes.html'],
      ['Automatiser les tables de 3, 4 et 5','tables-multiplication.html','Représenter une fraction d’une unité','fractions-parts-tout.html','Calculer le périmètre d’un polygone','perimetre.html','Calculer un prix et rendre la monnaie','calculer-prix.html'],
      ['Calculer mentalement ×10, ×100 et produits proches','multiplier-10-100.html','Placer une fraction sur une ligne graduée','fractions-bande-graduee.html','Se repérer sur un quadrillage','quadrillage-reperage.html','Résoudre des problèmes de longueur et de périmètre','perimetre.html'],
      ['Bilan calcul et multiplication','multiplication-posee-1chiffre.html','Comprendre numérateur et dénominateur','fractions-parts-tout.html','Mesurer et comparer des contenances','contenances.html','Résoudre un problème mixte en deux étapes','problemes-plusieurs-etapes.html']
    ],
    p4:[
      ['Réactiver multiplication et tables','tables-multiplication.html','Comparer des fractions de même dénominateur','comparer-fractions.html','Multiplier par un nombre à deux chiffres','multiplication-posee-2chiffres.html','Résoudre un problème de multiplication','problemes-multiplicatifs.html'],
      ['Calcul mental : produits et compléments','tables-multiplication.html','Reconnaître des fractions équivalentes simples','fractions-equivalentes.html','Comprendre et utiliser la division','sens-division.html','Résoudre un problème de partage ou groupement','problemes-division.html'],
      ['Calcul mental : quotient exact simple','sens-division.html','Compléter une unité avec des fractions simples','calculer-fractions.html','Construire le symétrique d’une figure','symetrie.html','Résoudre un problème à plusieurs étapes','problemes-plusieurs-etapes.html'],
      ['Calcul mental : durées usuelles','calculer-durees.html','Calculer une durée','calculer-durees.html','Lire et construire un diagramme en barres','diagrammes-barres.html','Résoudre un problème de durée','calculer-durees.html'],
      ['Automatismes mixtes de P4','multiplication-posee-2chiffres.html','Résoudre des problèmes avec des fractions simples','calculer-fractions.html','Décrire et construire des solides','solides.html','Résoudre un problème mêlant calcul et mesure','problemes-plusieurs-etapes.html'],
      ['Bilan et remédiation de P4','problemes-plusieurs-etapes.html','Consolider division et fractions','problemes-division.html','Consolider symétrie, données et durées','diagrammes-barres.html','Défi mathématique coopératif','tableaux-donnees.html']
    ],
    p5:[
      ['Réactiver tous les automatismes','tables-multiplication.html','Résoudre un problème mixte','problemes-plusieurs-etapes.html','Calculer des prix','calculer-prix.html','Lire un tableau de données','tableaux-donnees.html'],
      ['Calcul mental : multiplication et division','sens-division.html','Mobiliser toutes les représentations des fractions','fractions-bande-graduee.html','Calculer des durées','calculer-durees.html','Lire un diagramme en barres','diagrammes-barres.html'],
      ['Calcul mental : fractions usuelles','fractions-equivalentes.html','Comparer et calculer avec des fractions simples','calculer-fractions.html','Calculer des périmètres','perimetre.html','Résoudre un problème de mesure','problemes-plusieurs-etapes.html'],
      ['Calcul mental : monnaie et compléments','monnaie.html','Résoudre des problèmes mixtes avec des fractions','calculer-fractions.html','Reproduire une figure symétrique','symetrie.html','Résoudre un problème à deux étapes','problemes-plusieurs-etapes.html'],
      ['Calcul mental : tables et produits','tables-multiplication.html','Consolider la multiplication posée','multiplication-posee-2chiffres.html','Construire et décrire des figures','quadrilateres.html','Résoudre un problème multiplicatif','problemes-multiplicatifs.html'],
      ['Calcul mental : quotients exacts','sens-division.html','Évaluer et consolider les fractions','calculer-fractions.html','Se repérer sur un quadrillage','quadrillage-reperage.html','Résoudre un problème de déplacement','quadrillage-reperage.html'],
      ['Calcul mental : heure et durées','calculer-durees.html','Calculer une durée ou un horaire','calculer-durees.html','Mesurer masses et contenances','masses.html','Résoudre un problème de grandeurs','contenances.html'],
      ['Calcul mental : fractions et nombres','comparer-fractions.html','Consolider les fractions','calculer-fractions.html','Décrire des solides et leurs patrons','solides.html','Lire et interpréter des données','diagrammes-barres.html'],
      ['Automatismes différenciés','complements.html','Ateliers de résolution de problèmes','problemes-plusieurs-etapes.html','Ateliers de géométrie','angle-droit.html','Ateliers de mesures','longueurs.html'],
      ['Bilan des compétences mathématiques','problemes-plusieurs-etapes.html','Remédiation ciblée à partir de Maître Hibou','nombres-jusqua-10000.html','Défi coopératif de fin d’année','tableaux-donnees.html','Préparer l’autonomie en CM1','multiplication-posee-2chiffres.html'],
      ['Jeux de calcul et stratégies','tables-multiplication.html','Parcours autonome Maître Hibou','problemes-plusieurs-etapes.html','Défis géométriques','polygones.html','Bilan personnel et valorisation des progrès','tableaux-donnees.html']
    ]
  };
  const mathResourceTitles={
    'doubles-moitie.html':'Doubles et moitiés','multiplier-10-100.html':'Multiplier par 10 et 100','ligne-numerique.html':'Ligne numérique','problemes-comparaison.html':'Problèmes de comparaison','sens-multiplication.html':'Sens de la multiplication','tables-multiplication.html':'Tables de multiplication','problemes-multiplicatifs.html':'Problèmes multiplicatifs','addition-posee.html':'Addition posée','soustraction-posee.html':'Soustraction posée','longueurs.html':'Longueurs','problemes-plusieurs-etapes.html':'Problèmes à plusieurs étapes','fractions-parts-tout.html':'Fractions : parts d’un tout','perimetre.html':'Périmètre','problemes-division.html':'Problèmes de division','sens-division.html':'Sens de la division','polygones.html':'Polygones','symetrie.html':'Symétrie','lire-heure.html':'Lire l’heure','tableaux-donnees.html':'Tableaux de données','multiplication-posee-1chiffre.html':'Multiplication posée par un chiffre','calculer-prix.html':'Calculer des prix','fractions-bande-graduee.html':'Fractions sur bande graduée','comparer-fractions.html':'Comparer des fractions','cercle.html':'Cercle','quadrillage-reperage.html':'Repérage sur quadrillage','contenances.html':'Contenances','multiplication-posee-2chiffres.html':'Multiplication posée par deux chiffres','fractions-equivalentes.html':'Fractions équivalentes','calculer-fractions.html':'Calculer avec des fractions','calculer-durees.html':'Calculer des durées','diagrammes-barres.html':'Diagrammes en barres','quadrilateres.html':'Quadrilatères','solides.html':'Solides','monnaie.html':'Monnaie','masses.html':'Masses','complements.html':'Compléments','nombres-jusqua-10000.html':'Nombres jusqu’à 10 000','angle-droit.html':'Angle droit'
  };
  function buildAnnualMathSlides(title,file){
    const t=(title+' '+file).toLowerCase();
    const set=(oral,ardoise,corr,defi,dcorr)=>[
      {kind:'consigne',title:'🗣️ Recherche et oral collectif',items:oral},
      {kind:'hibou',title:'🦉 Ressource Maître Hibou — '+(mathResourceTitles[file]||title),items:['Observer la règle et les exemples déjà connus dans Maître Hibou.','Répondre collectivement à la question interactive.'],url:'hibou/lecons/'+file},
      {kind:'exercise',title:'📝 Exercices sur ardoise',items:ardoise},
      {kind:'correction',title:'✅ Correction projetée',items:corr},
      {kind:'challenge',title:'⭐ Défi ou transfert',items:[defi]},
      {kind:'correction',title:'✅ Correction du défi',items:[dcorr]}
    ];
    if(t.includes('table')) return set(['Donne le résultat de 4 × 5 puis explique comment tu le retrouves.','Quelle multiplication correspond à 3 groupes de 6 ?'],['2 × 8 = …','5 × 7 = …','4 × 6 = …','3 × 9 = …','10 × 12 = …'],['16','35','24','27','120'],'Trouve deux produits différents égaux à 24.','3 × 8 et 4 × 6.');
    if(t.includes('multiplication-posee')) return set(['Décompose 23 × 4 en 20 × 4 et 3 × 4.','Pourquoi commence-t-on par les unités ?'],['34 × 3','127 × 4','46 × 12'],['102','508','552'],'Calcule 205 × 6 en expliquant chaque étape.','1 230.');
    if(t.includes('division')||t.includes('partage')||t.includes('groupement')) return set(['Partage 24 jetons entre 4 élèves.','Combien de groupes de 5 peut-on faire avec 30 objets ?'],['18 ÷ 3 = …','35 ÷ 5 = …','42 ÷ 6 = …','32 objets en paquets de 4 : … paquets'],['6','7','7','8 paquets'],'27 élèves forment des équipes de 4. Combien d’équipes complètes et combien d’élèves restent ?','6 équipes complètes et 3 élèves restent.');
    if(t.includes('fraction')) return set(['Montre une moitié puis un quart d’une bande.','Entre 1/2 et 1/4, quelle fraction est la plus grande ?'],['Colorie mentalement 3/4 d’une bande.','Compare 2/6 … 5/6.','Complète : 1/2 = …/4.','1/4 + 2/4 = …'],['Trois parts sur quatre','2/6 < 5/6','1/2 = 2/4','3/4'],'Trouve deux écritures de la fraction un demi.','1/2 = 2/4 = 3/6.');
    if(t.includes('durée')||t.includes('heure')) return set(['Il est 9 h 20. Quelle heure sera-t-il dans 40 minutes ?','Combien de minutes dans 2 heures ?'],['8 h 45 + 30 min = …','De 10 h 15 à 11 h = … min','2 h 10 = … min','150 min = … h … min'],['9 h 15','45 min','130 min','2 h 30'],'Un film commence à 14 h 35 et dure 1 h 25. À quelle heure finit-il ?','16 h 00.');
    if(t.includes('prix')||t.includes('monnaie')) return set(['Compose 7 € 50 avec le moins de pièces et billets possible.','Quel rendu sur 20 € pour un achat de 13 € ?'],['4 € 80 + 2 € 35 = …','10 € − 6 € 70 = …','Deux objets coûtent 3 € 50 chacun : …','Rendu sur 20 € pour 14 € 60 : …'],['7 € 15','3 € 30','7 €','5 € 40'],'Un livre coûte 8 € 75 et un jeu 12 € 40. Total ?','21 € 15.');
    if(t.includes('périmètre')||t.includes('longueur')||t.includes('masse')||t.includes('contenance')) return set(['Quel instrument et quelle unité choisir ?','Explique la différence entre longueur et périmètre.'],['Périmètre d’un rectangle de 6 cm sur 3 cm.','2 m = … cm','1 kg 250 g = … g','2 L = … cL'],['18 cm','200 cm','1 250 g','200 cL'],'Un carré a un périmètre de 24 cm. Quelle est la longueur d’un côté ?','6 cm.');
    if(t.includes('symétr')||t.includes('polygone')||t.includes('quadrilat')||t.includes('cercle')||t.includes('solide')||t.includes('quadrillage')||t.includes('angle')) return set(['Nomme la figure et justifie avec ses propriétés.','Quel instrument faut-il utiliser ?'],['Un carré possède … côtés égaux et … angles droits.','Un triangle rectangle possède … angle droit.','Un cube possède … faces.','Sur quadrillage : avance de 3 cases à droite et 2 vers le haut.'],['4 et 4','1','6','Point déplacé de (+3 ; +2)'],'Décris une figure sans la nommer pour que la classe la retrouve.','La correction dépend de la description : propriétés nécessaires et suffisantes.');
    if(t.includes('diagramme')||t.includes('tableau')) return set(['Quelle information donne le titre ?','Comment repérer la valeur la plus grande ?'],['Lun. 12, mar. 18, jeu. 15 : quel jour a la plus grande valeur ?','Quel est l’écart entre 18 et 12 ?','Total des trois valeurs ?'],['Mardi','6','45'],'Invente une question à laquelle on répond avec ces données.','Exemple : combien y a-t-il d’unités au total ?');
    if(t.includes('problème')) return set(['Reformule la question.','Choisis les données utiles et annonce l’opération avant de calculer.'],['Une classe possède 28 livres et en achète 17. Combien en a-t-elle ?','6 boîtes contiennent 8 feutres chacune. Combien de feutres ?','72 images sont partagées entre 9 élèves. Combien chacun ?'],['45 livres','48 feutres','8 images'],'Un magasin reçoit 5 cartons de 24 cahiers et en vend 37. Combien en reste-t-il ?','5 × 24 = 120 ; 120 − 37 = 83 cahiers.');
    return set(['Explique la stratégie la plus rapide.','Propose une autre procédure.'],['48 + 29 = …','100 − 37 = …','6 × 8 = …','84 ÷ 7 = …'],['77','63','48','12'],'Invente un calcul utilisant la stratégie du jour.','Plusieurs réponses possibles, à justifier.');
  }
  const annualMathLessons={};
  function installAnnualMathProgram(period,weeks){
    const plans=annualMathWeeks[period]||[];
    weeks.forEach((week,wi)=>{
      const spec=plans[wi]||plans[plans.length-1]; if(!spec)return;
      const topics=[]; for(let i=0;i<spec.length;i+=2) topics.push({title:spec[i],file:spec[i+1]});
      const mathRows=[]; week.days.forEach(([day,rows])=>rows.forEach(row=>{if((row[1]||'').toLowerCase().includes('math'))mathRows.push({day,row});}));
      mathRows.forEach((entry,ri)=>{
        const topic=topics[Math.floor(ri/2)%topics.length];
        const isMental=/11h.?11h15|calcul mental|automatismes/i.test(entry.row[0]+' '+entry.row[2]);
        const id=period+'w'+(wi+1)+'m'+(ri+1);
        const title=isMental?'Rituel de calcul — '+topic.title:topic.title;
        entry.row[2]=title;
        entry.row[3]=(isMental?'Calculer mentalement et verbaliser une stratégie. ':'Comprendre, représenter, s’entraîner et expliquer. ')+'Ressource Maître Hibou : '+(mathResourceTitles[topic.file]||topic.title)+'.';
        entry.row[5]=isMental?'Observation ardoise et verbalisation':'Ardoise, correction projetée et entraînement Hibou';
        entry.row[6]=id;
        annualMathLessons[id]={id,period,week:wi+1,title,duration:isMental?'15 min':'45 min',file:topic.file,resourceTitle:mathResourceTitles[topic.file]||topic.title,slides:buildAnnualMathSlides(topic.title,topic.file),teacher:['Réactiver la procédure connue avec une question orale.','Faire chercher tous les élèves sur ardoise avant toute correction.','Ouvrir la ressource Maître Hibou pour stabiliser le vocabulaire et la méthode.','Projeter la correction une réponse à la fois.','Prévoir ensuite le même repère en autonomie dans Maître Hibou.']};
      });
    });
  }
  installAnnualMathProgram('p2',p2DetailedWeeks); installAnnualMathProgram('p3',p3DetailedWeeks); installAnnualMathProgram('p4',p4DetailedWeeks); installAnnualMathProgram('p5',p5DetailedWeeks);
  function annualMathLessonButton(id){return id&&annualMathLessons[id]?`<button type="button" class="lesson-open" data-open-annual-math="${id}">📽️ Ouvrir la séance de maths</button>`:'';}
  function renderAnnualMathLesson(id,mode='teacher',step=0){
    const l=annualMathLessons[id]; if(!l)return; const content=document.getElementById('timetableContent');
    const backFn=l.period==='p2'?'renderP2Week':l.period==='p3'?'renderP3Week':'renderLaterPeriodWeek';
    const backAttr=`data-back-annual-math="${l.period}|${l.week}"`;
    if(mode==='student'){
      const slide=l.slides[Math.max(0,Math.min(step,l.slides.length-1))];
      content.innerHTML=`<section class="lesson-view student-projector"><div class="detail-top"><div><span class="detail-zone">Projection élèves — ${l.period.toUpperCase()} semaine ${l.week}</span><h2>${l.title}</h2></div><button class="detail-back" type="button" ${backAttr}>← Retour à la semaine</button></div><div class="lesson-mode-tabs"><button data-open-annual-math-mode="teacher" data-annual-math-id="${id}">👩‍🏫 Déroulement enseignant</button><button class="is-active" data-open-annual-math-mode="student" data-annual-math-id="${id}">📽️ Projection élèves</button></div><article class="projector-slide ${slide.kind}"><div class="slide-counter">${step+1} / ${l.slides.length}</div><h3>${slide.title}</h3><ul>${slide.items.map(x=>`<li>${x}</li>`).join('')}</ul>${slide.url?`<a class="hibou-open-link" href="${slide.url}" target="_blank" rel="noopener">🦉 Ouvrir la leçon Maître Hibou</a>`:''}</article><div class="projector-nav"><button ${step===0?'disabled':''} data-annual-math-step="${step-1}" data-annual-math-id="${id}">← Précédente</button><button ${step===l.slides.length-1?'disabled':''} data-annual-math-step="${step+1}" data-annual-math-id="${id}">Suivante →</button></div></section>`;
    }else{
      content.innerHTML=`<section class="lesson-view"><div class="detail-top"><div><span class="detail-zone">Fiche enseignant — ${l.period.toUpperCase()} semaine ${l.week}</span><h2>${l.title}</h2><p>${l.duration} · continuité classe entière → Maître Hibou</p></div><button class="detail-back" type="button" ${backAttr}>← Retour à la semaine</button></div><div class="lesson-mode-tabs"><button class="is-active" data-open-annual-math-mode="teacher" data-annual-math-id="${id}">👩‍🏫 Déroulement enseignant</button><button data-open-annual-math-mode="student" data-annual-math-id="${id}">📽️ Projection élèves</button></div><div class="lesson-grid"><article class="lesson-card"><h3>Déroulement</h3><ol>${l.teacher.map(x=>`<li>${x}</li>`).join('')}</ol></article><article class="lesson-card"><h3>🦉 Ressource réutilisée</h3><p><strong>${l.resourceTitle}</strong></p><a class="hibou-open-link" href="hibou/lecons/${l.file}" target="_blank" rel="noopener">Ouvrir dans Maître Hibou</a></article>${l.slides.map(sl=>`<article class="lesson-card"><h3>${sl.title}</h3><ul>${sl.items.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('')}</div></section>`;
    }
  }

  // V31.62 — Séances de mathématiques explicites et projetables pour les deux premières semaines.
  const rentreeMathLessons = {"Calcul mental — diagnostic":{"duration":"20 min","objective":"utiliser des stratégies simples pour calculer mentalement et expliquer comment nous faisons.","success":["Je cherche sans écrire une opération posée.","Je peux expliquer au moins une stratégie."],"prep":["Ardoises et feutres","Cartes-nombres facultatives"],"phases":[["2 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à choisir une stratégie de calcul mental et à expliquer notre démarche. »"],["4 min","Réactivation orale","Faire compter de 2 en 2 puis demander les doubles de 2, 3, 4 et 5."],["8 min","Recherche sur ardoise","Proposer successivement 5+3, 7+2, 10−4, 6+6 et 9+5. Laisser 20 secondes puis demander une justification."],["4 min","Mise en commun","Comparer compter, utiliser un double, compléter à 10. Nommer les stratégies sans classer les élèves."],["2 min","Bilan","Faire compléter : « Pour calculer mentalement, je peux… »"]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à calculer sans poser l’opération","à choisir une stratégie","à expliquer comment nous avons trouvé"]],["oral","Échauffement oral",["Compte de 2 en 2 de 0 à 20.","Donne le double de 3, puis de 5."]],["exercise","À toi sur l’ardoise",["5 + 3 = …","7 + 2 = …","10 − 4 = …","6 + 6 = …","9 + 5 = …"]],["correction","Correction et stratégies",["5 + 3 = 8","7 + 2 = 9","10 − 4 = 6","6 + 6 = 12 : j’utilise un double","9 + 5 = 14 : je fais 9 + 1 + 4"]],["bilan","Je retiens",["Je peux compter, utiliser un double ou passer par 10.","Une stratégie expliquée vaut mieux qu’une réponse devinée."]]]},"Numération — diagnostic":{"duration":"40 min","objective":"lire, écrire et comparer des nombres pour montrer les stratégies que nous connaissons déjà.","success":["Je lis un nombre sans oublier les centaines ou les dizaines.","Je compare en regardant d’abord le chiffre de plus grande valeur."],"prep":["Ardoises","Tableau de numération projeté"],"phases":[["3 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à utiliser un tableau de numération pour lire, écrire et comparer des nombres. »"],["7 min","Modélisation","Placer 347 dans le tableau C-D-U et verbaliser 3 centaines, 4 dizaines, 7 unités."],["15 min","Pratique guidée","Lire 205, écrire quatre-cent-trente-deux, décomposer 681, comparer 458 et 485."],["10 min","Pratique autonome","Quatre exercices projetés, une réponse par ardoise."],["5 min","Correction et bilan","Faire verbaliser la procédure : centaines, puis dizaines, puis unités."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à lire et écrire des nombres","à les décomposer","à les comparer avec une méthode"]],["model","Regardons ensemble",["347 = 3 centaines + 4 dizaines + 7 unités","347 = 300 + 40 + 7"]],["exercise","Sur l’ardoise",["Écris en chiffres : quatre-cent-trente-deux.","Décompose 681.","Compare avec < ou > : 458 … 485.","Range du plus petit au plus grand : 309 ; 390 ; 319."]],["correction","Correction",["432","681 = 600 + 80 + 1","458 < 485","309 < 319 < 390"]],["bilan","La méthode",["Je regarde d’abord les centaines.","Si elles sont égales, je regarde les dizaines, puis les unités."]]]},"Calcul mental — nombres et compléments":{"duration":"15 min","objective":"trouver rapidement le nombre qui manque pour atteindre 10.","success":["Je connais plusieurs décompositions de 10.","Je peux expliquer comment je trouve le complément."],"prep":["Ardoises","Dix jetons ou doigts"],"phases":[["2 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à trouver rapidement les compléments à 10. »"],["4 min","Manipulation","Montrer 6 jetons et demander combien il en manque pour faire 10."],["6 min","Ardoise","Faire compléter 7+…=10, 3+…=10, …+8=10, 10−6."],["3 min","Bilan","Construire la liste des paires qui font 10."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à compléter un nombre pour faire 10","à mémoriser les paires qui font 10"]],["oral","Complète oralement",["6 et … font 10.","9 et … font 10.","4 et … font 10."]],["exercise","Sur l’ardoise",["7 + … = 10","3 + … = 10","… + 8 = 10","10 − 6 = …"]],["correction","Correction",["7 + 3 = 10","3 + 7 = 10","2 + 8 = 10","10 − 6 = 4"]],["bilan","Je retiens",["0+10, 1+9, 2+8, 3+7, 4+6, 5+5"]]]},"Numération — diagnostic ludique":{"duration":"45 min","objective":"décomposer, ranger et comparer des nombres en utilisant la valeur de chaque chiffre.","success":["Je sais dire ce que vaut chaque chiffre.","Je justifie un rangement ou une comparaison."],"prep":["Ardoises","Étiquettes C-D-U","Cartes-nombres"],"phases":[["3 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à utiliser la valeur des chiffres pour décomposer et ranger des nombres. »"],["8 min","Modélisation","Construire 526 avec les étiquettes puis écrire 500+20+6."],["15 min","Défis guidés","Composer 704, décomposer 390, comparer 628 et 682."],["12 min","Défi de rangement","Ranger 405, 450, 354, 540 et faire justifier."],["7 min","Correction et trace orale","Reprendre la méthode C-D-U."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à comprendre la valeur des chiffres","à décomposer et ranger des nombres"]],["model","Exemple",["526 = 5 centaines + 2 dizaines + 6 unités","526 = 500 + 20 + 6"]],["exercise","Défis sur l’ardoise",["Compose : 7 centaines, 0 dizaine, 4 unités.","Décompose 390.","Compare : 628 … 682.","Range : 405 ; 450 ; 354 ; 540."]],["correction","Correction",["704","390 = 300 + 90","628 < 682","354 < 405 < 450 < 540"]],["bilan","La règle",["La position d’un chiffre indique sa valeur.","Je compare d’abord les centaines."]]]},"Calcul mental — doubles et compléments":{"duration":"15 min","objective":"utiliser les doubles connus et les compléments à 10 pour calculer plus vite.","success":["Je reconnais un double.","Je passe par 10 lorsque cela m’aide."],"prep":["Ardoises"],"phases":[["2 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à nous appuyer sur les doubles et sur 10. »"],["4 min","Réactivation","Doubles de 2 à 10 en rythme."],["6 min","Ardoise","8+8, 7+8, 9+6, 10−7."],["3 min","Correction","Faire expliciter 7+8 = 7+7+1 et 9+6 = 10+5."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à utiliser les doubles","à passer par 10"]],["oral","Doubles flash",["2+2 ; 4+4 ; 6+6 ; 8+8 ; 10+10"]],["exercise","Sur l’ardoise",["8 + 8 = …","7 + 8 = …","9 + 6 = …","10 − 7 = …"]],["correction","Correction",["16","15 : 7+7+1","15 : 10+5","3"]],["bilan","Je retiens",["Un double connu peut aider pour un presque-double.","Avec 9, je peux compléter à 10."]]]},"Géométrie — diagnostic":{"duration":"45 min","objective":"reconnaître, nommer et reproduire des figures simples avec soin.","success":["Je reconnais carré, rectangle et triangle.","J’utilise la règle pour tracer des côtés droits."],"prep":["Ardoises ou feuilles","Règles","Figures projetées"],"phases":[["3 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à décrire une figure avant de la reproduire. »"],["8 min","Observation guidée","Comparer carré, rectangle, triangle : nombre de côtés et d’angles."],["15 min","Reconnaissance","Projeter cinq figures et demander leur nom avec justification."],["14 min","Reproduction","Reproduire un rectangle de 6 cm sur 3 cm puis ajouter une diagonale."],["5 min","Bilan","Faire citer les instruments et les critères de soin."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à reconnaître des figures","à les décrire","à les reproduire avec la règle"]],["oral","Observe et explique",["Combien de côtés a un triangle ?","Qu’est-ce qui distingue un carré d’un rectangle ?"]],["exercise","À tracer",["Trace un segment de 6 cm.","Construis un rectangle de 6 cm sur 3 cm.","Trace une diagonale."]],["correction","Correction attendue",["Le segment mesure exactement 6 cm.","Le rectangle a 4 côtés et 4 angles droits.","La diagonale relie deux sommets opposés."]],["bilan","Je vérifie",["Ma règle ne bouge pas.","Mes traits commencent et finissent aux bons points."]]]},"Problèmes — oral et calcul mental":{"duration":"15 min","objective":"comprendre une situation, dire ce que l’on cherche et choisir un calcul.","success":["Je reformule la question.","Je choisis une opération et je l’explique."],"prep":["Ardoises"],"phases":[["2 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à comprendre un problème avant de calculer. »"],["4 min","Problème oral","Lina a 12 billes et en gagne 5. Combien en a-t-elle maintenant ?"],["5 min","Méthode","Faire dire : ce que je sais, ce que je cherche, l’opération."],["4 min","Transfert","Proposer 18 oiseaux, 7 s’envolent. Combien restent-ils ?"]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à écouter un problème","à dire ce que nous cherchons","à choisir une opération"]],["problem","Problème 1",["Lina a 12 billes. Elle en gagne 5. Combien en a-t-elle maintenant ?"]],["method","Les trois questions",["Que savons-nous ?","Que cherchons-nous ?","Quelle opération peut nous aider ?"]],["correction","Correction",["12 + 5 = 17","Lina a maintenant 17 billes."]],["problem","Problème 2",["18 oiseaux sont sur un arbre. 7 s’envolent. Combien en reste-t-il ?"]]]},"Numération — diagnostic jusqu’à 999":{"duration":"45 min","objective":"lire, écrire, décomposer et comparer des nombres jusqu’à 999.","success":["Je connais la valeur des centaines, dizaines et unités.","J’écris une comparaison correcte."],"prep":["Ardoises","Tableau C-D-U projeté"],"phases":[["3 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à utiliser le tableau C-D-U pour maîtriser les nombres jusqu’à 999. »"],["8 min","Modélisation","Placer 608 et montrer le rôle du zéro."],["17 min","Pratique guidée","Lire 740, écrire 509, décomposer 836, comparer 697 et 679."],["12 min","Pratique autonome","Ranger quatre nombres puis encadrer 472 entre deux dizaines."],["5 min","Correction","Faire verbaliser la méthode."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à lire et écrire jusqu’à 999","à décomposer et comparer"]],["model","Attention au zéro",["608 = 6 centaines, 0 dizaine et 8 unités","608 = 600 + 8"]],["exercise","Sur l’ardoise",["Écris en chiffres : cinq-cent-neuf.","Décompose 836.","Compare : 697 … 679.","Range : 702 ; 720 ; 270 ; 207.","Encadre 472 entre deux dizaines."]],["correction","Correction",["509","836 = 800 + 30 + 6","697 > 679","207 < 270 < 702 < 720","470 < 472 < 480"]],["bilan","Je retiens",["Le zéro garde une place vide.","Je compare centaines, puis dizaines, puis unités."]]]},"Calcul mental — additions et soustractions":{"duration":"15 min","objective":"calculer mentalement de petites additions et soustractions en choisissant une stratégie.","success":["Je ne pose pas l’opération.","Je peux décomposer ou passer par 10."],"prep":["Ardoises"],"phases":[["2 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à décomposer les nombres pour calculer mentalement. »"],["4 min","Modélisation","23+5 = 20+(3+5) ; 34−4 = 30."],["6 min","Entraînement","16+3, 27+5, 42−2, 35−7."],["3 min","Correction","Comparer les stratégies."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à décomposer pour calculer","à choisir une stratégie efficace"]],["model","Exemples",["23 + 5 = 20 + 8 = 28","34 − 4 = 30"]],["exercise","Sur l’ardoise",["16 + 3 = …","27 + 5 = …","42 − 2 = …","35 − 7 = …"]],["correction","Correction",["19","32 : 27+3+2","40","28 : 35−5−2"]],["bilan","Je retiens",["Je peux atteindre une dizaine ronde pour simplifier le calcul."]]]},"Calcul posé — addition":{"duration":"45 min","objective":"poser une addition en alignant unités, dizaines et centaines.","success":["J’aligne les chiffres par colonnes.","Je commence par les unités.","Je vérifie mon résultat."],"prep":["Ardoises quadrillées ou cahier","Tableau C-D-U"],"phases":[["3 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à poser une addition sans mélanger les colonnes. »"],["10 min","Modélisation explicite","Poser 243+125 : verbaliser alignement, unités, dizaines, centaines."],["12 min","Pratique guidée","Faire 326+142 avec la classe."],["15 min","Pratique autonome","247+131 puis 368+457 pour les élèves prêts."],["5 min","Correction et vérification","Estimer l’ordre de grandeur et comparer au résultat."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à aligner les chiffres","à additionner colonne par colonne","à vérifier notre résultat"]],["model","Je regarde le modèle",["243 + 125","Unités sous unités, dizaines sous dizaines, centaines sous centaines.","Je commence par la colonne des unités."]],["exercise","À poser",["326 + 142","247 + 131","Défi : 368 + 457"]],["correction","Correction",["326 + 142 = 468","247 + 131 = 378","368 + 457 = 825"]],["bilan","Ma checklist",["Chiffres bien alignés ?","Calcul commencé par les unités ?","Résultat vraisemblable ?"]]]},"Calcul mental — suites et compléments":{"duration":"15 min","objective":"poursuivre une suite régulière et trouver des compléments à 10 ou à une dizaine.","success":["Je trouve la règle de la suite.","Je complète jusqu’à la dizaine suivante."],"prep":["Ardoises"],"phases":[["2 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à repérer une règle qui se répète. »"],["4 min","Suites orales","5,10,15… puis 42,44,46…"],["6 min","Ardoise","Compléter trois suites et 27+…=30, 46+…=50."],["3 min","Correction","Faire verbaliser la règle."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à trouver la règle d’une suite","à compléter jusqu’à une dizaine"]],["oral","Continue",["5 ; 10 ; 15 ; … ; …","42 ; 44 ; 46 ; … ; …"]],["exercise","Sur l’ardoise",["100 ; 90 ; 80 ; … ; …","7 ; 17 ; 27 ; … ; …","27 + … = 30","46 + … = 50"]],["correction","Correction",["70 ; 60","37 ; 47","3","4"]],["bilan","Je retiens",["Je cherche ce qui change entre deux nombres."]]]},"Géométrie — segments":{"duration":"45 min","objective":"tracer et mesurer un segment avec précision.","success":["Je place deux points.","Je relie les points à la règle.","Je mesure depuis le zéro."],"prep":["Règles graduées","Crayons bien taillés","Feuilles ou cahier"],"phases":[["3 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à tracer un segment d’une longueur exacte. »"],["8 min","Modélisation","Montrer comment placer A, mesurer depuis 0, placer B et tracer [AB]."],["12 min","Pratique guidée","Tracer [CD] de 5 cm ensemble."],["17 min","Pratique autonome","Tracer 3 cm, 7 cm et mesurer un segment projeté."],["5 min","Correction","Vérification croisée par binômes."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à tracer un segment","à mesurer depuis le zéro","à vérifier sa longueur"]],["method","Les étapes",["1. Je place le point A.","2. Je mets le zéro de la règle sur A.","3. Je marque B à la bonne longueur.","4. Je trace [AB]."]],["exercise","À tracer",["Trace [AB] de 3 cm.","Trace [CD] de 7 cm.","Compare les deux segments."]],["correction","Correction attendue",["[AB] mesure 3 cm.","[CD] mesure 7 cm.","[CD] est plus long de 4 cm."]],["bilan","Je vérifie",["Le zéro était-il bien placé ?","Mes extrémités sont-elles précises ?"]]]},"Calcul mental — bilan":{"duration":"15 min","objective":"mobiliser rapidement les stratégies travaillées et identifier celle qui nous aide le plus.","success":["Je réponds sans précipitation.","Je peux nommer ma stratégie."],"prep":["Ardoises"],"phases":[["2 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à choisir rapidement parmi les stratégies de la semaine. »"],["8 min","Bilan flash","6+4, 8+7, 27+3, 46−6, double de 9, moitié de 16."],["3 min","Correction","Demander une stratégie différente pour deux calculs."],["2 min","Autoévaluation","Pouce : facile, encore à entraîner, besoin d’aide."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à choisir la bonne stratégie","à repérer ce que nous devons encore entraîner"]],["exercise","Bilan sur l’ardoise",["6 + 4","8 + 7","27 + 3","46 − 6","Double de 9","Moitié de 16"]],["correction","Correction",["10","15","30","40","18","8"]],["bilan","Je fais le point",["Je sais utiliser les compléments à 10.","Je sais utiliser les doubles et les moitiés.","Je sais atteindre une dizaine ronde."]]]},"Problèmes — situation additive":{"duration":"45 min","objective":"résoudre un problème additif en suivant une démarche claire.","success":["Je reformule la question.","Je représente ou écris l’opération.","Je rédige une phrase-réponse."],"prep":["Ardoises ou cahier","Schéma en barres projeté"],"phases":[["3 min","Annonce explicite","Dire : « Aujourd’hui, nous allons apprendre à résoudre un problème en quatre étapes. »"],["8 min","Lecture et reformulation","Lire : Mila a 24 cartes. Elle en gagne 13. Combien en a-t-elle maintenant ?"],["10 min","Modélisation","Construire un schéma simple : quantité de départ + gain = quantité finale."],["12 min","Recherche guidée","Calculer 24+13 et écrire la phrase-réponse."],["8 min","Transfert autonome","32 élèves sont dans un bus, 9 descendent. Combien restent-ils ?"],["4 min","Bilan","Réciter les quatre étapes."]],"slides":[["objectif","Aujourd’hui, nous allons apprendre…",["à comprendre un problème","à choisir une opération","à rédiger une réponse"]],["method","Les quatre étapes",["1. Je lis et je reformule.","2. Je cherche les informations utiles.","3. Je représente ou je calcule.","4. J’écris une phrase-réponse."]],["problem","Problème guidé",["Mila a 24 cartes. Elle en gagne 13. Combien en a-t-elle maintenant ?"]],["correction","Correction",["24 + 13 = 37","Mila a maintenant 37 cartes."]],["problem","À toi",["32 élèves sont dans un bus. 9 descendent. Combien reste-t-il d’élèves ?"]],["correction","Correction",["32 − 9 = 23","Il reste 23 élèves dans le bus."]]]}};

  // V35.52 — P1 complète : vraies fiches de maths pour les semaines 1 et 2.
  // Les semaines 3 à 7 utilisent déjà p1LessonPlans (m1a à m5i).
  function buildP1EarlyMathLesson_(title,duration,objective,success,prep,phases,hibou,exercises,correction,challenge){
    const slides=[
      ['objectif','🎯 Aujourd’hui, nous allons apprendre…',[objective]],
      ['exercise','📝 Recherche / ardoise',exercises],
      ['correction','✅ Correction',correction],
      ['challenge','⭐ Petit défi',[challenge]]
    ];
    if(hibou){
      slides.splice(1,0,['hibou','🦉 Leçon Maître Hibou — '+hibou.title,['Observer la règle et un exemple dans Maître Hibou.','Répondre oralement à la question de vérification.'],hibou.url]);
    }
    return {title,duration,objective,success,prep,phases,hibou,slides};
  }

  const p1EarlyMathLessons={
    'p1r1-cal1':buildP1EarlyMathLesson_(
      'Calcul mental — Petits calculs connus et compléments simples','15 min',
      'calculer mentalement de petites additions et soustractions et expliquer une stratégie.',
      ['Je réponds sans poser l’opération.','Je peux expliquer comment j’ai trouvé.'],
      ['Ardoises et feutres'],
      [['2 min','Échauffement','Compter de 2 en 2 puis donner quelques doubles simples.'],['8 min','Ardoise','Proposer 5+3, 7+2, 10−4, 6+6, 9+5.'],['3 min','Mise en commun','Comparer compter, double et passage par 10.'],['2 min','Bilan','Nommer une stratégie efficace.']],
      {file:'calcul-mental-addition.html',title:'Calcul mental : addition',url:'hibou/lecons/calcul-mental-addition.html'},
      ['5 + 3 = …','7 + 2 = …','10 − 4 = …','6 + 6 = …'],['8','9','6','12'],'Trouve deux façons de calculer 9 + 6.'),

    'p1r1-num1':buildP1EarlyMathLesson_(
      'Numération — Lire, écrire, comparer et ranger','45 min',
      'lire, écrire et comparer des nombres en utilisant la valeur des chiffres.',
      ['Je lis et j’écris correctement un nombre.','Je compare en regardant d’abord le chiffre de plus grande valeur.'],
      ['Ardoises','Tableau C-D-U','Étiquettes-nombres facultatives'],
      [['5 min','Calcul mental','Compléments simples et doubles.'],['10 min','Nombre mystère','Faire chercher à partir de 2 ou 3 indices.'],['10 min','Dictée de nombres','Dicter 47, 103, 218 puis demander la valeur d’un chiffre.'],['10 min','Comparer et ranger','Comparer 128, 182, 108.'],['5 min','Défi','Avec 2, 5 et 8 : plus grand puis plus petit nombre.'],['5 min','Bilan','Faire verbaliser la stratégie de comparaison.']],
      {file:'nombres-jusqua-10000.html',title:'Nombres jusqu’à 10 000',url:'hibou/lecons/nombres-jusqua-10000.html'},
      ['Écris : cent trois.','Compare : 128 … 182.','Range : 128 ; 182 ; 108.'],['103','128 < 182','108 < 128 < 182'],'Avec 2, 5 et 8, fabrique le plus grand nombre possible.'),

    'p1r1-cal2':buildP1EarlyMathLesson_(
      'Calcul mental — Additions et soustractions simples','15 min',
      'choisir une stratégie simple pour additionner ou soustraire mentalement.',
      ['Je calcule sans opération posée.','Je peux passer par une dizaine ronde.'],
      ['Ardoises'],
      [['2 min','Réactivation','Doubles de 2 à 10.'],['8 min','Ardoise','16+3, 27+5, 42−2, 35−7.'],['3 min','Correction expliquée','Faire expliciter les décompositions.'],['2 min','Bilan','Choisir une stratégie à retenir.']],
      {file:'calcul-mental-soustraction.html',title:'Calcul mental : soustraction',url:'hibou/lecons/calcul-mental-soustraction.html'},
      ['16 + 3 = …','27 + 5 = …','42 − 2 = …','35 − 7 = …'],['19','32','40','28'],'Calcule 39 + 6 sans poser.'),

    'p1r1-num2':buildP1EarlyMathLesson_(
      'Numération — Manipuler, lire et écrire des nombres','45 min',
      'construire un nombre avec centaines, dizaines et unités puis passer entre plusieurs écritures.',
      ['Je sais ce que vaut chaque chiffre.','Je passe de 526 à 500 + 20 + 6.'],
      ['Ardoises','Matériel base 10 ou étiquettes C-D-U','Tableau de numération'],
      [['5 min','Situation de départ','Construire 326 avec le matériel ou les étiquettes.'],['10 min','Manipulation guidée','Faire varier une centaine, une dizaine puis une unité.'],['15 min','Ardoise','Lire, écrire et décomposer plusieurs nombres.'],['10 min','Jeu du nombre caché','Donner la décomposition et retrouver le nombre.'],['5 min','Bilan','Verbaliser C-D-U.']],
      {file:'valeur-position-chiffres.html',title:'Valeur et position des chiffres',url:'hibou/lecons/valeur-position-chiffres.html'},
      ['326 = … + … + …','Écris 4 centaines, 2 dizaines et 7 unités.','Quel nombre : 500 + 30 + 8 ?'],['300 + 20 + 6','427','538'],'Change seulement le chiffre des dizaines dans 538.'),

    'p1r1-cal3':buildP1EarlyMathLesson_(
      'Calcul mental — Jeu collectif de calculs simples','15 min',
      'répondre rapidement à des calculs simples et écouter les stratégies des autres.',
      ['Je participe sans crier la réponse.','Je peux expliquer une procédure.'],
      ['Ardoises','Cartes calcul facultatives'],
      [['3 min','Calcul flash','Cinq calculs très courts.'],['7 min','Jeu collectif','Un calcul, trois stratégies possibles.'],['3 min','Défi par deux','Inventer un calcul dont le résultat vaut 20.'],['2 min','Bilan','Retenir une stratégie entendue.']],
      {file:'calcul-mental-addition.html',title:'Calcul mental : addition',url:'hibou/lecons/calcul-mental-addition.html'},
      ['8 + 7 = …','14 − 6 = …','9 + 9 = …'],['15','8','18'],'Invente une addition égale à 20.'),

    'p1r1-pro1':buildP1EarlyMathLesson_(
      'Problèmes — Comprendre la question avant de calculer','45 min',
      'identifier ce que l’on sait, ce que l’on cherche et choisir une opération.',
      ['Je reformule la question.','Je distingue les données utiles.','Je choisis un calcul et je l’explique.'],
      ['Ardoises','Jetons ou cubes','Énoncés projetés'],
      [['5 min','Problème oral','Lina a 12 billes et en gagne 5. Combien en a-t-elle ?'],['10 min','Méthode','Faire dire : je sais / je cherche / je calcule.'],['15 min','Manipulation','Résoudre deux petits problèmes avec jetons ou dessin.'],['10 min','Mise en commun','Comparer addition et soustraction selon la situation.'],['5 min','Bilan','Écrire une phrase-réponse orale complète.']],
      {file:'problemes-additifs.html',title:'Problèmes additifs',url:'hibou/lecons/problemes-additifs.html'},
      ['12 billes + 5 billes : combien maintenant ?','18 oiseaux, 7 s’envolent : combien restent ?'],['12 + 5 = 17','18 − 7 = 11'],'Explique sans calculer quelle opération tu choisirais pour 25 cartes, 8 perdues.'),

     'p1r1-geo1':buildP1EarlyMathLesson_(
      'Géométrie — Point, droite, segment et alignement','30 min',
      'reconnaître un point, une droite et un segment puis vérifier si des points sont alignés.',
      ['Je distingue une droite d’un segment.','Je vérifie un alignement avec la règle.'],
      ['Règles','Ardoises ou feuilles','Points et tracés projetés'],
      [['5 min','Observation','Faire distinguer un point, une droite et un segment sur trois dessins simples.'],['8 min','Manipulation','Placer A et B, tracer [AB], puis prolonger pour faire apparaître la droite (AB).'],['10 min','Alignement','Projeter trois groupes de points et vérifier avec la règle lesquels sont alignés.'],['5 min','Défi','Placer un point C aligné avec A et B.'],['2 min','Bilan','Faire employer les mots point, droite, segment, aligné.']],
      {file:'droites-segments-milieu.html',title:'Droites et segments',url:'hibou/lecons/droites-segments-milieu.html'},
      ['Nomme : A ; [AB] ; (AB).','Les points A, B et C sont-ils alignés ?'],['A est un point ; [AB] est un segment ; (AB) est une droite.','Je vérifie avec la règle.'],'Place un point D sur la droite (AB), mais en dehors du segment [AB].'),

    'p1r2-cal1':buildP1EarlyMathLesson_(
      'Calcul mental — Compléments à 10 et additions simples','15 min',
      'trouver rapidement les compléments à 10 et les utiliser pour additionner.',
      ['Je connais les paires qui font 10.','Je peux passer par 10 pour calculer.'],
      ['Ardoises','Jetons ou doigts'],
      [['3 min','Compléments oraux','6 et combien pour faire 10 ?'],['7 min','Ardoise','7+…=10 ; …+8=10 ; 9+5.'],['3 min','Mise en commun','Montrer 9+5 = 10+4.'],['2 min','Bilan','Réciter les paires de 10.']],
      {file:'complements.html',title:'Compléments à 10 et à 100',url:'hibou/lecons/complements.html'},
      ['7 + … = 10','… + 8 = 10','9 + 5 = …'],['3','2','14'],'Trouve trois additions différentes qui font 10.'),

    'p1r2-num1':buildP1EarlyMathLesson_(
      'Numération — Lire et écrire jusqu’à 10 000','45 min',
      'lire et écrire des nombres jusqu’à 10 000 en utilisant milliers, centaines, dizaines et unités.',
      ['Je repère la valeur de chaque chiffre.','Je passe de l’écriture chiffrée à l’écriture en lettres.'],
      ['Ardoises','Tableau M-C-D-U','Étiquettes de numération'],
      [['5 min','Réactivation','Lire 347 puis 608.'],['10 min','Modélisation','Placer 2 405 dans M-C-D-U.'],['15 min','Pratique guidée','Lire, écrire et décomposer des nombres à 4 chiffres.'],['10 min','Pratique autonome','Quatre nombres sur ardoise.'],['5 min','Bilan','Faire expliciter le rôle du zéro.']],
      {file:'nombres-jusqua-10000.html',title:'Nombres jusqu’à 10 000',url:'hibou/lecons/nombres-jusqua-10000.html'},
      ['Écris en chiffres : deux-mille-quarante-cinq.','Décompose 3 608.','Lis 7 090.'],['2 045','3 000 + 600 + 8','sept-mille-quatre-vingt-dix'],'Quel chiffre vaut 500 dans 5 327 ?'),

    'p1r2-num2':buildP1EarlyMathLesson_(
      'Numération — Comparer et ranger des nombres','30 min',
      'comparer et ranger des nombres en utilisant la valeur de position.',
      ['Je compare d’abord les milliers ou centaines.','J’utilise correctement < et >.'],
      ['Ardoises','Cartes-nombres'],
      [['5 min','Réactivation','Comparer 347 et 374.'],['10 min','Duel de nombres','Deux nombres : choisir le plus grand et justifier.'],['10 min','Rangement','Ranger quatre nombres.'],['5 min','Bilan','Formuler la méthode.']],
      {file:'comparer-ranger-encadrer.html',title:'Comparer, ranger et encadrer',url:'hibou/lecons/comparer-ranger-encadrer.html'},
      ['628 … 682','405 ; 450 ; 354 ; 540'],['628 < 682','354 < 405 < 450 < 540'],'Trouve un nombre entre 450 et 500.'),

    'p1r2-cal2':buildP1EarlyMathLesson_(
      'Calcul mental — Automatismes additifs','15 min',
      'mobiliser doubles, compléments et décompositions pour calculer plus vite.',
      ['Je reconnais une stratégie connue.','Je donne ma réponse puis ma procédure.'],
      ['Ardoises'],
      [['3 min','Doubles flash','4+4, 6+6, 8+8.'],['7 min','Calculs','7+8, 9+6, 13+7, 18−8.'],['3 min','Comparaison de stratégies','Faire expliquer deux procédures.'],['2 min','Bilan','Choisir son automatisme le plus solide.']],
      {file:'calcul-mental-addition.html',title:'Calcul mental : addition',url:'hibou/lecons/calcul-mental-addition.html'},
      ['7 + 8 = …','9 + 6 = …','13 + 7 = …','18 − 8 = …'],['15','15','20','10'],'Calcule 19 + 7 en passant par 20.'),

    'p1r2-num3':buildP1EarlyMathLesson_(
      'Numération — Décomposer un nombre de plusieurs façons','45 min',
      'décomposer et recomposer un nombre en utilisant la valeur de chaque chiffre.',
      ['Je donne la décomposition canonique.','Je trouve au moins une autre décomposition correcte.'],
      ['Ardoises','Tableau M-C-D-U','Matériel base 10 facultatif'],
      [['5 min','Modélisation','526 = 500 + 20 + 6.'],['10 min','Manipulation','526 = 5 centaines + 2 dizaines + 6 unités.'],['15 min','Décompositions variées','Ex. 526 = 400 + 120 + 6.'],['10 min','Recomposition','Retrouver le nombre à partir d’une somme.'],['5 min','Bilan','Relier position et valeur.']],
      {file:'valeur-position-chiffres.html',title:'Valeur et position des chiffres',url:'hibou/lecons/valeur-position-chiffres.html'},
      ['Décompose 704.','Décompose 1 250.','Quel nombre : 2 000 + 300 + 40 + 9 ?'],['700 + 4','1 000 + 200 + 50','2 349'],'Trouve deux décompositions différentes de 630.'),

    'p1r2-cal3':buildP1EarlyMathLesson_(
      'Calcul mental — Bilan léger des automatismes de rentrée','15 min',
      'mobiliser plusieurs stratégies de calcul mental et repérer celles qui restent fragiles.',
      ['Je choisis une stratégie adaptée.','Je peux dire ce que je dois encore entraîner.'],
      ['Ardoises'],
      [['2 min','Annonce','Préciser qu’il s’agit d’un repérage sans note.'],['8 min','Six calculs variés','Doubles, compléments, petites additions et soustractions.'],['3 min','Auto-positionnement','Choisir facile / à revoir / difficile.'],['2 min','Bilan','Fixer un petit objectif.']],
      {file:'complements.html',title:'Compléments à 10 et à 100',url:'hibou/lecons/complements.html'},
      ['6 + 6','7 + … = 10','19 + 5','30 − 7'],['12','3','24','23'],'Choisis le calcul le plus difficile et explique pourquoi.'),

    'p1r2-pro1':buildP1EarlyMathLesson_(
      'Problèmes — Résoudre et expliquer sa démarche','45 min',
      'résoudre un problème additif simple et présenter une démarche compréhensible.',
      ['Je dis ce que je cherche.','Je choisis l’opération.','Je formule une phrase-réponse.'],
      ['Ardoises','Jetons ou schémas','Énoncés projetés'],
      [['5 min','Lecture du problème','Lire puis reformuler sans calculer.'],['10 min','Recherche individuelle','Laisser choisir dessin, jetons ou calcul.'],['10 min','Mise en commun','Comparer deux procédures.'],['15 min','Deuxième problème','Transférer la méthode.'],['5 min','Bilan','Rappeler les trois étapes : chercher, calculer, répondre.']],
      {file:'problemes-additifs.html',title:'Problèmes additifs',url:'hibou/lecons/problemes-additifs.html'},
      ['La classe a 18 livres et en reçoit 7. Combien maintenant ?','25 cartes, 9 sont données. Combien restent ?'],['18 + 7 = 25','25 − 9 = 16'],'Invente une phrase-réponse complète pour le deuxième problème.'),

     'p1r2-geo1':buildP1EarlyMathLesson_(
      'Géométrie — Point, droite, segment et alignement','30 min',
      'consolider le vocabulaire point, droite, segment et utiliser la règle pour vérifier un alignement.',
      ['Je nomme correctement point, droite et segment.','Je justifie un alignement avec la règle.'],
      ['Règles','Feuilles ou cahier','Figures projetées'],
      [['5 min','Réactivation','Nommer A, [AB] et (AB).'],['8 min','Tracé guidé','Placer A et B puis tracer le segment [AB] et la droite (AB).'],['10 min','Alignements','Tester plusieurs triplets de points avec la règle et justifier.'],['5 min','Production','Construire trois points alignés puis un quatrième non aligné.'],['2 min','Bilan','Rappeler les conventions de notation.']],
      {file:'points-alignes.html',title:'Points alignés',url:'hibou/lecons/points-alignes.html'},
      ['Trace le segment [AB].','Trace la droite (CD).','Vérifie si E, F et G sont alignés.'],['Le segment a deux extrémités.','La droite se prolonge des deux côtés.','La règle permet de vérifier l’alignement.'],'Construis trois points alignés et un point qui ne l’est pas.')
  };

  Object.assign(rentreeMathLessons,p1EarlyMathLessons);

  const p1EarlyMathSlotMap={
    'p1r1|Mardi|11h–11h15':'p1r1-cal1',
    'p1r1|Mardi|11h15–12h':'p1r1-num1',
    'p1r1|Jeudi|11h–11h15':'p1r1-cal2',
    'p1r1|Jeudi|11h15–12h':'p1r1-num2',
    'p1r1|Vendredi|11h–11h15':'p1r1-cal3',
    'p1r1|Vendredi|11h15–12h':'p1r1-pro1',
    'p1r1|Vendredi|14h15–14h45':'p1r1-geo1',
    'p1r2|Lundi|11h–11h15':'p1r2-cal1',
    'p1r2|Lundi|11h15–12h':'p1r2-num1',
    'p1r2|Mardi|11h30–12h':'p1r2-num2',
    'p1r2|Jeudi|11h–11h15':'p1r2-cal2',
    'p1r2|Jeudi|11h15–12h':'p1r2-num3',
    'p1r2|Vendredi|11h–11h15':'p1r2-cal3',
    'p1r2|Vendredi|11h15–12h':'p1r2-pro1',
    'p1r2|Vendredi|14h15–14h45':'p1r2-geo1'
  };


  // V35.53 — correspondance explicite créneau -> fiche pour toute la P1.
  // Aucun créneau d'évaluation (nationale ou de référence) n'est mappé.
  const p1MathLessonSlotMap={
    // Semaine 3
    'p1s1|Lundi|11h–11h15':'m1a',
    'p1s1|Lundi|11h15–12h':'m1b',
    'p1s1|Mardi|11h–11h15':'m1c',
    'p1s1|Mardi|11h15–12h':'m1d',
    'p1s1|Vendredi|11h–11h15':'m1g',
    'p1s1|Vendredi|11h15–12h':'m1h',
    'p1s1|Vendredi|14h–14h35':'m1i',

    // Semaine 4
    'p1s2|Lundi|11h–11h15':'m2a',
    'p1s2|Lundi|11h15–12h':'m2b',
    'p1s2|Mardi|11h–11h15':'m2c',
    'p1s2|Mardi|11h15–12h':'m2d',
    'p1s2|Jeudi|11h–11h15':'m2e',
    'p1s2|Jeudi|11h15–12h':'m2f',
    'p1s2|Vendredi|11h–11h15':'m2g',
    'p1s2|Vendredi|11h15–12h':'m2h',
    'p1s2|Vendredi|14h–14h35':'m2i',

    // Semaine 5
    'p1s3|Lundi|11h–11h15':'m3a',
    'p1s3|Lundi|11h15–12h':'m3b',
    'p1s3|Mardi|11h–11h15':'m3c',
    'p1s3|Mardi|11h15–12h':'m3d',
    'p1s3|Jeudi|11h–11h15':'m3e',
    'p1s3|Jeudi|11h15–12h':'m3f',
    'p1s3|Vendredi|11h–11h15':'m3g',
    'p1s3|Vendredi|11h15–12h':'m3h',
    'p1s3|Vendredi|14h–14h35':'m3i',

    // Semaine 6 : le 9 octobre 11h15–12h est une évaluation, donc sans fiche.
    'p1s4|Lundi|11h–11h15':'m4a',
    'p1s4|Lundi|11h15–12h':'m4b',
    'p1s4|Mardi|11h–11h15':'m4c',
    'p1s4|Mardi|11h15–12h':'m4d',
    'p1s4|Jeudi|11h–11h15':'m4e',
    'p1s4|Jeudi|11h15–12h':'m4f',
    'p1s4|Vendredi|11h–11h15':'m4g',
    'p1s4|Vendredi|14h–14h35':'m4i',

    // Semaine 7
    'p1s5|Lundi|11h–11h15':'m5a',
    'p1s5|Lundi|11h15–12h':'m5b',
    'p1s5|Mardi|11h–11h15':'m5c',
    'p1s5|Mardi|11h15–12h':'m5d',
    'p1s5|Jeudi|11h–11h15':'m5e',
    'p1s5|Jeudi|11h15–12h':'m5f',
    'p1s5|Vendredi|11h–11h15':'m5g',
    'p1s5|Vendredi|11h15–12h':'m5h',
    'p1s5|Vendredi|14h–14h35':'m5i'
  };

  function p1MathLessonIdForSlot(weekKey,day,row){
    if(row[4]!=='maths')return '';
    if(/Évaluations? nationales?|Évaluation P1 ciblée/i.test(String(row[1]||'')+' '+String(row[2]||'')))return '';
    const dayName=String(day||'').split(' ')[0];
    return p1MathLessonSlotMap[`${weekKey}|${dayName}|${row[0]}`]||'';
  }

  function p1EarlyMathButton(weekKey,day,row){
    if(row[4]!=='maths')return '';
    if(/Évaluations? nationales?/i.test(String(row[1]||'')+' '+String(row[2]||'')))return '';
    const dayName=String(day||'').split(' ')[0];
    const lessonKey=p1EarlyMathSlotMap[`${weekKey}|${dayName}|${row[0]}`];
    return lessonKey?`<button type="button" class="lesson-open" data-open-rentree-math="${weekKey}|${lessonKey}">📘 Ouvrir la séance complète</button>`:'';
  }

  function rentreeMathId(key,row){ return key+'|'+String(row[1]||''); }
  function rentreeMathButton(key,row){ const id=rentreeMathId(key,row); return row[4]==='maths'&&rentreeMathLessons[row[1]]?`<button type="button" class="lesson-open" data-open-rentree-math="${id}">📽️ Séance de maths détaillée</button>`:''; }
  function renderRentreeMathLesson(id,mode='teacher',step=0){
    const [weekKey,...titleParts]=String(id||'').split('|'); const lessonKey=titleParts.join('|'); const l=rentreeMathLessons[lessonKey]; if(!l)return; const title=l.title||lessonKey;
    const content=document.getElementById('timetableContent');
    if(mode==='student'){
      const s=l.slides[Math.max(0,Math.min(step,l.slides.length-1))];
      content.innerHTML=`<section class="lesson-view student-projector"><div class="detail-top"><div><span class="detail-zone">Projection élèves — P1</span><h2>${title}</h2></div><button class="detail-back" type="button" data-back-rentree-math="${weekKey}">← Retour à la semaine</button></div><div class="lesson-mode-tabs"><button data-open-rentree-math-mode="teacher" data-rentree-math-id="${id}">👩‍🏫 Déroulement enseignant</button><button class="is-active" data-open-rentree-math-mode="student" data-rentree-math-id="${id}">📽️ Projection élèves</button></div><article class="projector-slide ${s[0]}"><div class="slide-counter">${step+1} / ${l.slides.length}</div><h3>${s[1]}</h3><ul>${s[2].map(x=>`<li>${x}</li>`).join('')}</ul>${s[0]==='hibou'&&s[3]?`<p><a class="hibou-open-link" href="${s[3]}" target="_blank" rel="noopener">🦉 Ouvrir la leçon Maître Hibou ↗</a></p>`:''}</article><div class="projector-nav"><button ${step===0?'disabled':''} data-rentree-math-step="${step-1}" data-rentree-math-id="${id}">← Précédente</button><button ${step===l.slides.length-1?'disabled':''} data-rentree-math-step="${step+1}" data-rentree-math-id="${id}">Suivante →</button></div></section>`;
    }else{
      content.innerHTML=`<section class="lesson-view"><div class="detail-top"><div><span class="detail-zone">Fiche enseignant — P1</span><h2>${title}</h2><p>${l.duration} · enseignement explicite · projection TBI</p></div><button class="detail-back" type="button" data-back-rentree-math="${weekKey}">← Retour à la semaine</button></div><div class="lesson-mode-tabs"><button class="is-active" data-open-rentree-math-mode="teacher" data-rentree-math-id="${id}">👩‍🏫 Déroulement enseignant</button><button data-open-rentree-math-mode="student" data-rentree-math-id="${id}">📽️ Projection élèves</button></div><div class="lesson-grid"><article class="lesson-card"><h3>🎯 Objectif explicite</h3><p><strong>Aujourd’hui, nous allons apprendre à ${l.objective}</strong></p><h4>Critères de réussite</h4><ul>${l.success.map(x=>`<li>${x}</li>`).join('')}</ul></article><article class="lesson-card"><h3>🧰 À préparer</h3><ul>${l.prep.map(x=>`<li>${x}</li>`).join('')}</ul></article><article class="lesson-card lesson-card--wide"><h3>Déroulement détaillé</h3><ol>${l.phases.map(x=>`<li><strong>${x[0]} — ${x[1]}</strong><br>${x[2]}</li>`).join('')}</ol></article>${l.hibou?`<article class="lesson-card lesson-card--wide hibou-reuse-card"><h3>🦉 Leçon Maître Hibou reliée</h3><p><strong>${l.hibou.title}</strong></p><p>La leçon existante est utilisée comme synthèse ou prolongement ; elle n’est pas dupliquée dans Progressions.</p><a class="hibou-open-link" href="${l.hibou.url}" target="_blank" rel="noopener">Ouvrir la leçon Maître Hibou ↗</a></article>`:''}<article class="lesson-card lesson-card--wide"><h3>Diaporama prévu</h3><p>${l.slides.length} écrans : objectif, modélisation ou oral, exercices, correction et bilan.</p></article></div></section>`;
    }
  }


  function compactWeekDateLabel(raw){
    const months={janvier:'janv.',février:'févr.',mars:'mars',avril:'avr.',mai:'mai',juin:'juin',juillet:'juil.',août:'août',septembre:'sept.',octobre:'oct.',novembre:'nov.',décembre:'déc.'};
    const clean=String(raw||'')
      .replace(/^Du\s+/i,'')
      .replace(/\s+202[0-9]$/,'')
      .replace(/1er/g,'1')
      .trim();

    // Ex. « mardi 1 au vendredi 4 septembre » -> « 1–4 sept. »
    let m=clean.match(/^(?:lundi|mardi|mercredi|jeudi|vendredi)\s+(\d+)\s+au\s+(?:lundi|mardi|mercredi|jeudi|vendredi)\s+(\d+)\s+([a-zéûôîàèùç]+)$/i);
    if(m){
      const a=m[1], b=m[2], mb=m[3].toLowerCase();
      return `${a}–${b} ${months[mb]||mb}`;
    }

    // Ex. « lundi 28 septembre au vendredi 2 octobre » -> « 28 sept.–2 oct. »
    m=clean.match(/^(?:lundi|mardi|mercredi|jeudi|vendredi)\s+(\d+)\s+([a-zéûôîàèùç]+)\s+au\s+(?:lundi|mardi|mercredi|jeudi|vendredi)\s+(\d+)\s+([a-zéûôîàèùç]+)$/i);
    if(m){
      const a=m[1], ma=m[2].toLowerCase(), b=m[3], mb=m[4].toLowerCase();
      return `${a} ${months[ma]||ma}–${b} ${months[mb]||mb}`;
    }

    // Repli de sécurité : retirer tout nom de jour restant.
    return clean
      .replace(/\b(lundi|mardi|mercredi|jeudi|vendredi)\b\s*/gi,'')
      .replace(/\s+au\s+/i,'–')
      .replace(/\s{2,}/g,' ')
      .trim();
  }

  function compactWeekButton(w,i,activeKey,attr){
    return `<button type="button" class="${activeKey===w.key?'is-active':''}" ${attr}="${i+1}" title="${w.dates}">S${i+1} · ${compactWeekDateLabel(w.dates)}</button>`;
  }

  function detailWeekSelector(period,activeKey=''){
    if(period==='rentree'){
      return `<nav class="detail-week-nav detail-week-nav--compact" aria-label="Semaines détaillées de la rentrée">
        <button type="button" class="${activeKey==='rentree1'?'is-active':''}" data-open-detail="rentree1" title="Semaine 1 — Accueillir et observer">S1 · rentrée</button>
        <button type="button" class="${activeKey==='rentree2'?'is-active':''}" data-open-detail="rentree2" title="Semaine 2 — Commencer la progression P1">S2 · progression P1</button>
      </nav>`;
    }
    const defs={
      p1:[p1DetailedWeeks,'data-open-p1-week','Période 1'],
      p2:[p2DetailedWeeks,'data-open-p2-week','Période 2'],
      p3:[p3DetailedWeeks,'data-open-p3-week','Période 3'],
      p4:[p4DetailedWeeks,'data-open-p4-week','Période 4'],
      p5:[p5DetailedWeeks,'data-open-p5-week','Période 5']
    };
    const def=defs[period];
    if(!def) return '';
    const [weeks,attr,label]=def;
    return `<nav class="detail-week-nav detail-week-nav--compact detail-week-nav--${period}" aria-label="Semaines détaillées de la ${label.toLowerCase()}">${weeks.map((w,i)=>compactWeekButton(w,i,activeKey,attr)).join('')}</nav>`;
  }

  // V31.60 — Guides courts pour conduire les séances des deux premières semaines.
  function rentreeSessionGuide(row){
    const title=String(row[1]||'');
    const session=String(row[2]||'');
    const skill=String(row[3]||'');
    const text=(title+' '+session).toLowerCase();
    let launch='Présenter brièvement l’objectif et rappeler la consigne de travail.';
    let activity='Faire réaliser l’activité annoncée, d’abord individuellement ou en binôme selon la séance.';
    let share='Mettre en commun quelques réponses ou procédures, puis reformuler l’essentiel.';
    let close='Conclure par une phrase-bilan, une trace courte ou un rangement guidé.';
    let material='Tableau, ardoises et matériel habituel de la classe.';
    let attention='Observer les élèves sans multiplier les consignes ni allonger la correction.';

    if(/accueil|découverte de la classe|matériel|rangement|agenda|cartable|méthodologie/.test(text)){
      launch='Montrer le lieu ou l’outil concerné et faire expliciter son utilité.';
      activity='Faire essayer concrètement : prendre, utiliser, classer puis ranger.';
      share='Faire verbaliser la procédure efficace et corriger collectivement les oublis.';
      close='Répéter la routine une dernière fois et afficher le repère utile.';
      material='Cahiers, classeurs, casiers, agenda et étiquettes de rangement.';
      attention='Faire pratiquer réellement la routine plutôt que la décrire trop longtemps.';
    } else if(/lecture|emi/.test(text)){
      launch='Observer le support, annoncer le but de lecture et recueillir quelques hypothèses.';
      activity='Lire ou écouter, puis répondre à deux ou trois questions ciblées.';
      share='Faire justifier les réponses avec un mot, une phrase ou un indice du texte.';
      close='Reformuler ensemble ce qu’il faut retenir de la lecture.';
      material='Album, texte court ou document projeté ; ardoise si nécessaire.';
      attention='Privilégier la compréhension et la reformulation, sans questionnaire trop long.';
    } else if(/orthographe|dictée|copie|grammaire|production d’écrit/.test(text)){
      launch='Rappeler le point d’attention du jour et proposer un exemple très court.';
      activity='Faire écrire, manipuler ou corriger une première production.';
      share='Comparer deux ou trois propositions et faire expliquer les choix.';
      close='Faire relire avec un critère unique puis conserver une courte trace.';
      material='Ardoise ou cahier, phrase modèle, mots utiles affichés.';
      attention='Ne pas corriger tous les points à la fois ; cibler l’objectif annoncé.';
    } else if(/calcul|numération|géométrie|problème/.test(text)){
      launch='Proposer une question courte à l’oral et faire chercher sans donner la procédure.';
      activity='Faire résoudre deux ou trois exemples sur ardoise ou avec du matériel.';
      share='Comparer les procédures et afficher une correction progressive.';
      close='Faire formuler la stratégie utile et proposer un dernier exemple rapide.';
      material='Ardoises, feutres, matériel de numération ou instruments selon la séance.';
      attention='Distinguer l’erreur de calcul de la compréhension de la démarche.';
    } else if(/anglais/.test(text)){
      if(/saluer et prendre congé|hello \/ goodbye/.test(text)){
        return `<details class="rentree-guide" open><summary>🧭 Guide de séance — 30 min</summary><div class="rentree-guide__grid"><div><strong>🎯 Compétences</strong><p>ANG-P1-01 — Reconnaître une salutation familière.<br>ANG-P1-02 — Saluer quelqu’un et prendre congé dans un échange très simple.</p></div><div><strong>1. Mise en situation — 3 min</strong><p>Entrer dans la séance uniquement en anglais : <em>Hello! Hi! Good morning!</em> Accompagner chaque formule d’un geste et faire comprendre sans traduire immédiatement.</p></div><div><strong>2. Compréhension orale — 7 min</strong><p><a href="https://www.youtube.com/watch?v=Fw0rdSHzWFY" target="_blank" rel="noopener noreferrer">▶️ Vidéo : Greeting — Good morning / Goodbye</a><br>1re écoute : écouter sans consigne. 2e écoute : lever la main ou faire un geste quand on entend <em>Hello / Good morning / Goodbye</em>. Passages utiles : 0:06–0:52 puis 3:44–5:05.</p></div><div><strong>3. Répéter et discriminer — 5 min</strong><p>Faire répéter en chœur puis par demi-classe : <em>Hello! Hi! Good morning! Goodbye!</em> Faire choisir la formule adaptée à une arrivée le matin ou à un départ.</p></div><div><strong>4. Mini-dialogues — 10 min</strong><p>En binômes : A : <em>Good morning!</em> — B : <em>Hello!</em> puis A : <em>Goodbye!</em> — B : <em>See you on Thursday!</em> Inverser les rôles. Ne pas donner de support écrit au premier essai.</p></div><div><strong>5. Réinvestissement — 3 min</strong><p>Faire jouer deux ou trois binômes devant la classe. Les autres repèrent la salutation et la prise de congé.</p></div><div><strong>6. Bilan — 2 min</strong><p>Rituel de sortie : chaque élève répond à une salutation ou dit au revoir. Faire verbaliser en français quand on utilise <em>Good morning</em> et <em>Goodbye</em>.</p></div><div><strong>🧰 Matériel</strong><p>TBI ou écran pour la vidéo ; aucun écrit nécessaire. Éventuellement 4 cartes : Hello / Hi / Good morning / Goodbye.</p></div><div class="rentree-guide__attention"><strong>⚠️ Point d’attention</strong><p>Priorité à la compréhension et à l’interaction orale. Ne pas exiger une prononciation parfaite ; chercher une parole intelligible et une réponse adaptée à la situation.</p></div></div></details>`;
      }
      launch='Faire écouter puis répéter le modèle oral avec gestes ou images.';
      activity='Faire pratiquer en chœur, puis en binômes dans un mini-dialogue.';
      share='Faire jouer deux ou trois binômes devant la classe.';
      close='Reprendre une dernière fois la formulation en rituel collectif.';
      material='Images, étiquettes ou support audio ; aucun écrit long.';
      attention='Valoriser l’oral, le rythme et l’audace plutôt que la perfection.';
    } else if(/emc|oral|bilan|responsabilités/.test(text)){
      launch='Poser une question simple et rappeler les règles de prise de parole.';
      activity='Laisser un court temps de réflexion, puis organiser les échanges.';
      share='Reformuler les idées, les classer et chercher un accord collectif.';
      close='Énoncer la décision ou la règle retenue en une phrase claire.';
      material='Affiche, post-it ou bâton de parole selon la séance.';
      attention='Distribuer la parole et éviter que quelques élèves occupent tout l’échange.';
    } else if(/arts|musique/.test(text)){
      launch='Présenter le support, la contrainte et le temps disponible.';
      activity='Laisser expérimenter, produire ou répéter par étapes.';
      share='Observer quelques réalisations ou écouter un passage collectif.';
      close='Faire verbaliser un choix, une difficulté ou une réussite.';
      material='Matériel artistique ou musical prévu pour l’activité.';
      attention='Donner peu de contraintes et prévoir un temps réel de rangement.';
    } else if(/eps/.test(text)){
      launch='Présenter l’espace, le but du jeu et une règle de sécurité.';
      activity='Faire une première manche courte, ajuster, puis recommencer.';
      share='Faire verbaliser une stratégie de coopération ou de réussite.';
      close='Retour au calme et rappel d’une règle respectée.';
      material='Matériel EPS nécessaire, plots et chasubles si besoin.';
      attention='Réduire les temps d’attente et faire jouer tous les élèves.';
    } else if(/sciences|espace|temps|calendrier/.test(text)){
      launch='Partir d’une observation, d’un document ou d’une question concrète.';
      activity='Faire chercher, classer, manipuler ou émettre des hypothèses.';
      share='Comparer les résultats et construire une réponse commune.';
      close='Garder une trace simple : phrase, schéma ou repère sur le calendrier.';
      material='Document projeté, objets à observer ou calendrier selon la séance.';
      attention='Faire distinguer ce que l’on observe de ce que l’on suppose.';
    }
    return `<details class="rentree-guide"><summary>🧭 Guide de séance</summary><div class="rentree-guide__grid"><div><strong>🎯 Objectif</strong><p>${skill}</p></div><div><strong>1. Lancement</strong><p>${launch}</p></div><div><strong>2. Activité</strong><p>${activity}</p></div><div><strong>3. Mise en commun</strong><p>${share}</p></div><div><strong>4. Bilan</strong><p>${close}</p></div><div><strong>🧰 Matériel</strong><p>${material}</p></div><div class="rentree-guide__attention"><strong>⚠️ Point d’attention</strong><p>${attention}</p></div></div></details>`;
  }



  // V31.68 — Repères de progression pédagogique visibles dans l'emploi du temps.
  const pedagogySequenceSubjects=['Histoire','Sciences','Géographie','EMC','Questionner le monde'];
  const pedagogySequenceCache=new Map();

  function periodWeeks(period){
    if(period==='rentree') return Object.values(detailedWeeks);
    if(period==='p1') return p1DetailedWeeks;
    if(period==='p2') return p2DetailedWeeks;
    if(period==='p3') return p3DetailedWeeks;
    if(period==='p4') return p4DetailedWeeks;
    if(period==='p5') return p5DetailedWeeks;
    return [];
  }

  function sequenceSubject(subject){
    const value=String(subject||'');
    return pedagogySequenceSubjects.find(name=>value.includes(name))||'';
  }

  function buildSequenceMap(period){
    if(pedagogySequenceCache.has(period)) return pedagogySequenceCache.get(period);
    const map=new Map();
    const counters={};
    const totals={};
    const weeks=periodWeeks(period);
    weeks.forEach(week=>week.days.forEach(([day,rows])=>rows.forEach(row=>{
      const subject=sequenceSubject(row[1]);
      if(subject) totals[subject]=(totals[subject]||0)+1;
    })));
    weeks.forEach(week=>week.days.forEach(([day,rows])=>rows.forEach(row=>{
      const subject=sequenceSubject(row[1]);
      if(!subject) return;
      counters[subject]=(counters[subject]||0)+1;
      map.set(`${week.key}|${day}|${row[0]}|${subject}`,{index:counters[subject],total:totals[subject]});
    })));
    pedagogySequenceCache.set(period,map);
    return map;
  }

  function pedagogicalStage(row,sequenceInfo){
    const text=`${row[1]||''} ${row[2]||''} ${row[5]||''}`.toLowerCase();
    if(/évaluation|mini-test|test final|dictée évaluée|dictée-bilan|bilan individuel|validation orale|validation différée|mesure initiale|diagnostique/.test(text)) return {label:'Évaluation',kind:'evaluation'};
    if(/remédiation|seconde chance|aide ciblée|reprendre les erreurs|réparer/.test(text)) return {label:'Remédiation',kind:'remediation'};
    if(/réinvest|réemploi|transfert|mobiliser|en contexte/.test(text)) return {label:'Réinvestissement',kind:'reinvestment'};
    if(/consolid|stabiliser|automatis|entraînement|s’entraîner|exercices guidés|plan de travail/.test(text)) return {label:'Consolidation',kind:'consolidation'};
    if(/structur|trace écrite|synthèse|formaliser|mise en commun/.test(text)) return {label:'Structuration',kind:'structuration'};
    if(/nouvel apprentissage|nouvelle notion|découvrir|qu’est-ce|première|introduire|installer|construire la charte|situer /.test(text) || (sequenceInfo&&sequenceInfo.index===1)) return {label:'Découverte / nouvelle notion',kind:'discovery'};
    if(/rituel|quoi de neuf|devinette|un jour, une actu|quart d’heure/.test(text)) return {label:'Rituel',kind:'routine'};
    return {label:'Entraînement',kind:'practice'};
  }

  // V35.67 — badges d’évaluation harmonisés avec l’Espace Parents.
  // La couleur du bloc reste celle de la matière ; pour une évaluation,
  // on affiche un badge rouge transversal + un badge de sous-domaine.
  function evaluationDomainBadge_(row){
    const text=`${row?.[1]||''} ${row?.[2]||''} ${row?.[3]||''} ${row?.[5]||''}`.toLowerCase();
    const code=String(row?.[3]||'').toUpperCase();
    let icon='📚', label='Évaluation', kind='generic';

    if(/dictée|mots appris|orthographe lexicale/.test(text) || /ORT-/.test(code)){
      icon='✏️'; label=/dictée|mots appris/.test(text)?'Dictée / mots appris':'Orthographe'; kind='french';
    } else if(/compréhension|lecture/.test(text) || /COM-|LEC-/.test(code)){
      icon='📖'; label='Lecture / compréhension'; kind='french';
    } else if(/lexique|vocabulaire/.test(text) || /VOC-/.test(code)){
      icon='🧠'; label='Lexique / vocabulaire'; kind='french';
    } else if(/production d[’']?écrit|production écrite|écriture/.test(text) || /ECR-/.test(code)){
      icon='✍️'; label='Production d’écrits'; kind='french';
    } else if(/grammaire/.test(text) || /GRA-/.test(code)){
      icon='📚'; label='Grammaire'; kind='french';
    } else if(/conjugaison/.test(text) || /CONJ-/.test(code)){
      icon='⏳'; label='Conjugaison'; kind='french';
    } else if(/problème/.test(text) || /PRO-/.test(code)){
      icon='🧩'; label='Problèmes'; kind='maths';
    } else if(/calcul|opération|addition|soustraction|multiplication|division/.test(text) || /CAL-|OPE-/.test(code)){
      icon='➕'; label='Calcul / opérations'; kind='maths';
    } else if(/géométr|symétr|solide/.test(text) || /GEO-|SYM-|SOL-/.test(code)){
      icon='📐'; label='Géométrie'; kind='maths';
    } else if(/fraction/.test(text) || /FRA-/.test(code)){
      icon='🍰'; label='Fractions'; kind='maths';
    } else if(/numération|nombre/.test(text) || /NUM-/.test(code)){
      icon='🔢'; label='Numération'; kind='maths';
    } else if(/mesure|temps|durée/.test(text) || /MES-|TEM-/.test(code)){
      icon='📏'; label='Grandeurs / mesures'; kind='maths';
    } else if(/donnée|graphique|tableau/.test(text) || /DON-/.test(code)){
      icon='📊'; label='Données'; kind='maths';
    } else if(/histoire/.test(text) || /HIS-/.test(code)){
      icon='🏺'; label='Histoire / repères temporels'; kind='history';
    } else if(/géographie/.test(text) || /GEOG-/.test(code)){
      icon='🗺️'; label='Géographie'; kind='history';
    } else if(/science/.test(text) || /SCI-/.test(code)){
      icon='🔬'; label='Sciences'; kind='science';
    } else if(/anglais/.test(text) || /ANG-/.test(code)){
      icon='🇬🇧'; label='Anglais'; kind='english';
    } else if(/emc/.test(text) || /EMC-/.test(code)){
      icon='🤝'; label='EMC'; kind='emc';
    }
    return {icon,label,kind};
  }

  function pedagogyMarkers(period,weekKey,day,row){
    const subject=sequenceSubject(row[1]);
    const sequenceInfo=subject?buildSequenceMap(period).get(`${weekKey}|${day}|${row[0]}|${subject}`):null;
    const stage=pedagogicalStage(row,sequenceInfo);
    const sequence=sequenceInfo?`<span class="pedagogy-badge pedagogy-sequence">Séance ${sequenceInfo.index}/${sequenceInfo.total}</span>`:'';
    if(stage.kind==='evaluation'){
      const domain=evaluationDomainBadge_(row);
      return `<div class="pedagogy-markers evaluation-markers"><span class="edt-eval-badge">📝 Évaluation</span><span class="edt-domain-badge edt-domain-${domain.kind}">${domain.icon} ${domain.label}</span>${sequence}</div>`;
    }
    return `<div class="pedagogy-markers"><span class="pedagogy-badge pedagogy-${stage.kind}">${stage.label}</span>${sequence}</div>`;
  }

  function renderDetailedWeek(key){
    const data=detailedWeeks[key];
    const content=document.getElementById('timetableContent');
    content.innerHTML=`<section class="detail-view"><div class="detail-top"><div><span class="detail-zone">Académie de Montpellier — zone C</span><h2>${data.title}</h2><p>${data.dates}</p></div><button class="detail-back" type="button" data-back-summary>← Retour à l’emploi du temps</button></div>${detailWeekSelector('rentree',key)}<div class="timetable-note">${data.note}</div>${renderP2DictationProgramming(data.frenchPlan,week)}${renderAnnualEnglishPlan(data.englishPlan)}${data.days.map(([day,rows])=>`<section class="detail-day"><div class="detail-day-head"><h3>${day}</h3>${dayStatusToolbar()}</div><div class="detail-table-wrap"><table class="detail-table"><thead><tr><th>Horaire</th><th>Domaine / activité</th><th>Compétence reliée à Progressions CE2</th><th>Séance détaillée</th><th>Statut</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="detail-time">${r[0]}</td><td><span class="detail-subject ${r[4]}">${r[1]}</span></td><td class="detail-competence-cell">${r[3]}</td><td class="detail-session-cell detail-session-wide">${pedagogyMarkers('rentree',key,day,r)}${r[2]}${notebookCue_(r)}${rentreeMathButton(key,r)}${rentreeSessionGuide(r)}</td><td>${statusSelect(statusKey(key,day,r[0]))}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</section>`;
    bindStatusControls(content);
  }




  // V35.50 — tableau de bord à 5 colonnes :
  // Horaire | Domaine | Compétence | Séance détaillée + suivi | Statut
  function dashboardFollowBadge_(suivi,evalPattern){
    const value=String(suivi==null?'':suivi).trim();
    if(!value)return '';
    const badge=(evalPattern||/Évaluation|Mini-test|Dictée évaluée/i).test(value)
      ?'eval-badge':'follow-badge';
    return `<div class="dashboard-follow"><span class="${badge}">${value}</span></div>`;
  }

  function dashboardSessionCell_(sessionHtml,suivi,evalPattern){
    return `<td class="detail-session-cell detail-session-wide">${sessionHtml}${dashboardFollowBadge_(suivi,evalPattern)}</td>`;
  }

  function notebookCue_(row){
    const text=((row&&row[1]||'')+' '+(row&&row[2]||'')).toLowerCase();
    if(text.includes('cahier du jour') || text.includes('mon cahier d’écrivain')) return '';
    if(/\bcopie\b|copie différée|copie-bilan|copie de réinvestissement/.test(text)) return '<div class="notebook-cue notebook-cue--copy">📘 Support : <strong>Cahier du jour</strong></div>';
    if(/production d[’']écrit|production écrite|écriture courte|rédiger|amélioration du texte/.test(text)) return '<div class="notebook-cue notebook-cue--writer">✍️ Support : <strong>Mon cahier d’écrivain</strong></div>';
    return '';
  }


  function sessionDocumentsButton(meta){
    const docs=meta&&Array.isArray(meta.documents)?meta.documents:[];
    if(!docs.length)return '';
    return `<div class="session-documents">${docs.map(doc=>{
      const title=String(doc&&doc.titre||'Document').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const url=String(doc&&doc.url||'');
      if(!/^https:\/\/drive\.google\.com\//i.test(url))return '';
      return `<a class="session-document-link" href="${url}" target="_blank" rel="noopener noreferrer" title="Ouvrir ${title} dans Google Drive">📄 ${title}</a>`;
    }).join('')}</div>`;
  }

  function p1ActivityLabel(row){
    const subject=(row[1]||'').toLowerCase();
    const session=(row[2]||'').toLowerCase();
    if(!subject.includes('français')) return row[1];
    if(session.includes('dictée bilan') || session.includes('dictée finale')) return 'Dictée bilan — phrases';
    if(session.includes('dictée de mots') && session.includes('dictée flash')) return 'Dictée de mots + dictée flash 1';
    if(session.includes('dictée flash 2')) return 'Dictée flash 2 + étude de la langue — DRAS';
    if(session.includes('dictée flash 3')) return 'Dictée flash 3 + production d’écrit court — DRAS';
    if(session.includes('mon cahier d’écrivain') && (session.includes('trois mots') || session.includes('écriture courte') || session.includes('une phrase') || session.includes('plusieurs phrases'))) return 'Français — Écrits courts';
    if(session.includes('production') || session.includes('rédiger') || session.includes('réécrire') || session.includes('finaliser') || session.includes('amélioration du texte')) return 'Français — Production d’écrits';
    if(session.includes('dictée de phrase') || session.includes('dictée préparée')) return 'Dictée de phrase';
    if(session.includes('dictée de mots') || session.includes('mots de la semaine')) return 'Dictée de mots';
    if(session.includes('orthographe') || session.includes('encoder') || session.includes('mémoriser les premiers mots')) return 'Orthographe et dictée';
    if(session.includes('grammaire') || session.includes('phrase affirmative') || session.includes('phrase négative') || session.includes('verbe') || session.includes('groupe sujet') || session.includes('infinitif')) return 'Étude de la langue — DRAS';
    if(session.includes('vocabulaire') || session.includes('dictionnaire') || session.includes('famille de mots') || session.includes('ordre alphabétique')) return 'Vocabulaire spiralaire';
    if(session.includes('lecture') || session.includes('fluence')) return 'Lecture-compréhension';
    if(session.includes('quoi de neuf') || session.includes('devinette') || session.includes('reformulation orale') || session.includes('oral')) return 'Langage oral';
    if(session.includes('copie')) return 'Copie — Cahier du jour';
    if(subject.includes('emi')) return 'Oral / EMI';
    return 'Français';
  }

  // V31.52 — Programmation annuelle d'anglais CE2 intégrée à partir de la programmation CE1/CE2 année 2.
  const annualEnglishPlans={
    p1:[
      {theme:'Saluer et prendre congé',formulas:'Hello / Hi / Good morning / Goodbye / See you on…',culture:'Formules selon le moment de la journée',phonology:'Le h de hello ; les deux sons de good et shoe',activity:'Rituel quotidien, vidéo Muzzy, mini-dialogues'},
      {theme:'Comprendre les consignes de classe',formulas:'Stand up! Sit down! Listen! Look! Be quiet! Show me…',culture:'Codes de la classe anglophone',phonology:'Accentuation et intonation de l’impératif',activity:'Simon says et chant Listen carefully'},
      {theme:'Se présenter',formulas:'What’s your name? My name’s…',culture:'Prénoms anglophones',phonology:'Distinguer [eɪ] de name et [aɪ] de like',activity:'The Hello Song et dialogues en binômes'},
      {theme:'Les nombres jusqu’à 20',formulas:'What number is it? It’s… / Before / After / My favourite number is…',culture:'Jeux de cour et comptines numériques',phonology:'Diphtongues de eight et five',activity:'Bingo, domino, memory, Ten in a bed'},
      {theme:'Halloween et bilan P1',formulas:'What’s this? It’s a… / How many… are there? There is / There are…',culture:'Halloween dans les pays anglophones',phonology:'Pluriels [s] et [z] ; th de this',activity:'Witches Witches, dénombrement et bricolage oralement guidé'}
    ],
    p2:[
      {theme:'Dire comment on va',formulas:'How are you? I’m happy / sad / tired, thank you.',culture:'Codes sociaux de la prise de nouvelles',phonology:'h de how ; accentuation de la réponse',activity:'Hello, How Are You? et dialogue ritualisé'},
      {theme:'Les couleurs',formulas:'What colour is it? It’s… / Is it…? Yes, it is. No, it isn’t.',culture:'Le rouge au Royaume-Uni : bus, letter box, flag',phonology:'r anglais de red, green, purple',activity:'Jazz chant, bingo et objets de la classe'},
      {theme:'Exprimer une préférence',formulas:'What’s your favourite colour? My favourite colour is…',culture:'Sondage de classe',phonology:'Intonation de la question',activity:'Survey et restitution orale'},
      {theme:'Christmas : formes et couleurs',formulas:'Merry Christmas! How many shapes are there? What colour is the star?',culture:'Christmas cards et traditions britanniques',phonology:'Réactivation des pluriels et couleurs',activity:'Chant, information gap et carte de vœux'},
      {theme:'Christmas : suivre des instructions',formulas:'Fold, cut, colour, glue… / There is / There are…',culture:'Carte de vœux anglophone',phonology:'Rythme des consignes courtes',activity:'Fabrication guidée et jeu d’écoute'},
      {theme:'Réactivation P2',formulas:'How are you? What colour is it? What’s your favourite colour?',culture:'Réemploi des codes sociaux',phonology:'Prononciation ciblée selon les besoins',activity:'Ateliers oraux et jeu de rôle'},
      {theme:'Bilan oral P2',formulas:'Dialogue court mêlant salutation, émotion et couleur',culture:'Évaluation en situation de communication',phonology:'Intelligibilité globale',activity:'Mini-dialogue évalué sans lecture'}
    ],
    p3:[
      {theme:'Les métiers',formulas:'Are you a…? Yes, I am / No, I’m not.',culture:'Métiers britanniques : bobby, lollipop person',phonology:'Intonation de la question fermée',activity:'Devinettes et survey'},
      {theme:'Dire le métier souhaité',formulas:'What do you want to be? I want to be a…',culture:'Métiers et égalité filles-garçons',phonology:'Rythme de I want to be',activity:'Dialogue et portrait métier'},
      {theme:'La famille et la possession',formulas:'Have you got any brothers or sisters? Yes, I have / No, I haven’t.',culture:'Vocabulaire familial',phonology:'th de mother ; pluriels',activity:'My Family, sondage et jeu des familles'},
      {theme:'Présenter quelqu’un et localiser',formulas:'This is… / Where is…? … is in the kitchen.',culture:'La maison britannique',phonology:'th de this ; accentuation des pièces',activity:'Hide and seek et information gap'},
      {theme:'Météo et bilan P3',formulas:'What’s the weather like? It’s sunny / cloudy / rainy…',culture:'Formulation britannique et américaine',phonology:'w et th de weather',activity:'Chant météo, rituel et dialogue bilan'}
    ],
    p4:[
      {theme:'Les jours et la date',formulas:'What day is it today? Today is…',culture:'La semaine dans le monde anglophone',phonology:'Accent sur la première syllabe ; day',activity:'Today is Monday et jeu du furet'},
      {theme:'Yesterday et tomorrow comme blocs mémorisés',formulas:'What day was it yesterday? What day will it be tomorrow?',culture:'Rituel de date',phonology:'Rythme des groupes mémorisés',activity:'Chaîne orale sans analyse grammaticale'},
      {theme:'La nourriture et les goûts',formulas:'Do you like…? Yes, I do / No, I don’t. I like…',culture:'Aliments de The Very Hungry Caterpillar',phonology:'[aɪ] de like ; intonation montante',activity:'Album, sondage et memory'},
      {theme:'Réinvestir jours et nourriture',formulas:'On Monday, I eat… / Do you like…?',culture:'Repas et album d’Eric Carle',phonology:'Enchaînement oral',activity:'Today is Monday et menu collectif'},
      {theme:'Easter',formulas:'Happy Easter! How many eggs are there? There is / There are…',culture:'Egg hunt, hot cross buns',phonology:'[e] de egg ; [iː] de Easter',activity:'Egg hunt et lecture culturelle'},
      {theme:'Bilan P4',formulas:'Date, météo et goûts dans un échange bref',culture:'Traditions étudiées',phonology:'Intelligibilité et rythme',activity:'Jeu de rôle et écoute'}
    ],
    p5:[
      {theme:'Les instruments et can',formulas:'What instrument can you play? I can play the…',culture:'Instruments et pratiques musicales',phonology:'can / can’t',activity:'The Music Man et sondage'},
      {theme:'Interroger sur une capacité',formulas:'Can you play the…? Yes, I can / No, I can’t.',culture:'Musique anglophone',phonology:'Accentuation de can’t',activity:'Guess who et écoute'},
      {theme:'Les animaux de la ferme',formulas:'What is it? It’s a… / Is it a…?',culture:'Onomatopées anglaises',phonology:'[iː] et [ɪ]',activity:'Old MacDonald, memory et domino'},
      {theme:'Demander poliment',formulas:'Can you give me the yellow duck, please?',culture:'Politesse dans l’échange',phonology:'Rythme de la demande',activity:'Jeu de marchand et consignes'},
      {theme:'Le corps et les actions',formulas:'Touch your… / Clap your hands / Stamp your feet.',culture:'Action songs',phonology:'knee / knees ; foot / feet',activity:'Simon says et Body Song'},
      {theme:'Décrire un personnage',formulas:'I have got… / It has got… / Have you got…?',culture:'Monstres et personnages d’albums',phonology:'h de have ; pluriels',activity:'Guess who avec monstres'},
      {theme:'Réactivation can / have got',formulas:'I can… / I have got…',culture:'Portrait oral',phonology:'Contraste des deux structures',activity:'Présentation en binômes'},
      {theme:'Projet oral final',formulas:'Se présenter, exprimer un goût, une capacité et décrire',culture:'Réinvestissement annuel',phonology:'Fluidité et intelligibilité',activity:'Carte d’identité orale'},
      {theme:'Compréhension d’un album',formulas:'Repérer personnages, actions et mots connus',culture:'Littérature enfantine anglophone',phonology:'Écoute de plusieurs voix',activity:'Album et images séquentielles'},
      {theme:'Bilan annuel',formulas:'Mini-dialogue autonome',culture:'Ce que je connais du monde anglophone',phonology:'Autoévaluation',activity:'Jeu oral et bilan'},
      {theme:'Valorisation et jeux de révision',formulas:'Réemploi libre des formulations',culture:'Chants et jeux préférés de l’année',phonology:'Prononcer pour être compris',activity:'Ateliers tournants'}
    ]
  };

  function englishCompetencyCode(period,weekIndex){
    const n=Math.min(6,Math.max(1,Math.ceil((weekIndex+1)*6/(annualEnglishPlans[period]?.length||6))));
    return `ANG-${period.toUpperCase()}-0${n}`;
  }
  function applyAnnualEnglishProgression(period,weeks){
    const plans=annualEnglishPlans[period]||[];
    weeks.forEach((week,wi)=>{
      const plan=plans[Math.min(wi,plans.length-1)]; if(!plan)return;
      let englishRows=[];
      week.days.forEach(([day,rows])=>rows.forEach(r=>{if(r[1]==='Anglais') englishRows.push(r)}));
      englishRows.forEach((r,ri)=>{
        r[2]=ri===0?`${plan.theme} — découverte et compréhension orale. ${plan.formulas}`:`${plan.theme} — réactivation, jeu oral et interaction. ${plan.activity}`;
        r[3]=`${englishCompetencyCode(period,wi)} · Comprendre et produire : ${plan.formulas} Culture : ${plan.culture}. Phonologie : ${plan.phonology}.`;
        r[5]=ri===0?'Écoute, répétition et interaction':'Réinvestissement oral';
      });
      week.englishPlan=plan;
    });
  }
  applyAnnualEnglishProgression('p1',p1DetailedWeeks);
  applyAnnualEnglishProgression('p2',p2DetailedWeeks);
  applyAnnualEnglishProgression('p3',p3DetailedWeeks);
  applyAnnualEnglishProgression('p4',p4DetailedWeeks);
  applyAnnualEnglishProgression('p5',p5DetailedWeeks);

  function renderAnnualEnglishPlan(plan){
    if(!plan)return '';
    return `<details class="dashboard-collapse dashboard-collapse--english" data-dashboard-panel="english-week"${dashboardPanelOpenAttr_('english-week')}>
      <summary><span>🇬🇧 <strong>Progression d’anglais</strong></span><span class="dashboard-collapse__summary">${plan.theme}</span><span class="dashboard-collapse__toggle">Afficher</span></summary>
      <div class="dashboard-collapse__body english-week-plan"><div class="english-week-plan__head"><span>🇬🇧 Progression d’anglais de la semaine</span><strong>${plan.theme}</strong></div><div class="english-week-plan__grid"><div><b>Formulations</b><p>${plan.formulas}</p></div><div><b>Lexique / culture</b><p>${plan.culture}</p></div><div><b>Phonologie</b><p>${plan.phonology}</p></div><div><b>Support / activité</b><p>${plan.activity}</p></div></div><p class="english-week-plan__note">Rituels permanents : salutations, consignes de classe et réactivation des formulations déjà apprises. L’écrit reste une trace courte au service de l’oral.</p></div></details>`;
  }

  function renderP1Week(week){
    const data=p1DetailedWeeks[week-1]||p1DetailedWeeks[0];
    const content=document.getElementById('timetableContent');
    const evalCount=data.days.reduce((n,[,rows])=>n+rows.filter(r=>/Évaluation|Mini-test|validation|Mesure (initiale|intermédiaire)|Dictée évaluée/i.test(r[5]||'')).length,0);
    content.innerHTML=`<section class="detail-view"><div class="detail-top"><div><span class="detail-zone">Académie de Montpellier — zone C</span><h2>${data.title}</h2><p>${data.dates}</p></div><button class="detail-back" type="button" data-back-summary>← Retour à l’emploi du temps</button></div>${detailWeekSelector('p1',data.key)}${calendarNotice(data)}${week===1?renderP1DictationOverview():''}${renderP1DictationProgramming(week)}${renderWeekFocusPanel_(data.focus,evalCount)}${renderAnnualFrenchPlan(data.frenchPlan)}${renderAnnualEnglishPlan(data.englishPlan)}${data.days.map(([day,rows])=>`<section class="detail-day"><div class="detail-day-head"><h3>${day}</h3>${dayStatusToolbar()}</div><div class="detail-table-wrap"><table class="detail-table detail-table--p1"><thead><tr><th>Horaire</th><th>Domaine / activité</th><th>Compétence reliée à Progressions CE2</th><th>Séance détaillée</th><th>Statut</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="detail-time">${r[0]}</td><td><span class="detail-subject ${r[4]}">${p1ActivityLabel(r)}</span></td><td class="detail-competence-cell">${r[3]}</td>${dashboardSessionCell_(`${pedagogyMarkers('p1',data.key,day,r)}${r[2]}${notebookCue_(r)}${sessionDocumentsButton(r[7])}${p1DictationTimetableGuide(week,day,r)}${p1LessonButton(r[6]||p1MathLessonIdForSlot(data.key,day,r))}${p1EarlyMathButton(data.key,day,r)}`,r[5],/Évaluation|Mini-test|Dictée évaluée/i)}<td>${statusSelect(statusKey(data.key,day,r[0]))}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</section>`;
    bindStatusControls(content);
  }

  // V31.45 — programmation annuelle ritualisée : dictée, EDL par DRAS et vocabulaire spécifique.
  const annualFrenchPlans=window.DICTEES_CE2_ANNUAL||{p2:[],p3:[],p4:[],p5:[]};

  function applyAnnualFrenchRitual(period,weeks){
    const plans=annualFrenchPlans[period]||[];
    weeks.forEach((week,idx)=>{
      const plan=plans[idx]; if(!plan)return;
      week.frenchPlan=plan;
      week.days.forEach(([day,rows])=>{
        const dayName=day.split(' ')[0];
        rows.forEach(row=>{
          const time=row[0];
          if(time==='10h–10h45' && dayName==='Lundi'){
            row[1]='Dictée de mots + dictée flash 1';
            row[2]=`${plan.support} — découverte des 8 mots, encodage, observation orthographique et première phrase préparatoire.`;
            row[5]='Mémorisation et observation formative';
          }
          if(time==='10h–10h45' && dayName==='Mardi'){
            row[1]='Dictée flash 2 + étude de la langue — DRAS';
            row[2]=`${plan.flash[1]} Puis manipulations DRAS : déplacer, remplacer, ajouter et supprimer pour comprendre la notion prévue.`;
            row[5]='10 min de dictée puis entraînement EDL';
          }
          if(time==='10h–10h45' && dayName==='Jeudi'){
            row[1]='Dictée flash 3 + EDL — DRAS + production d’écrit court';
            row[2]=`${plan.flash[2]} Puis transformation DRAS et rédaction d’une ou deux phrases réemployant le vocabulaire de la semaine dans <strong>Mon cahier d’écrivain</strong>.`;
            row[5]='10 min de dictée + écrit court';
          }
          if(time==='16h40–17h' && dayName==='Jeudi'){
            row[1]='Vocabulaire — séance spécifique';
            row[2]=`Étudier en profondeur : ${plan.vocab.join(' ; ')}. Réemploi oral puis préparation d’une phrase personnelle.`;
            row[5]='Trace lexicale et réemploi';
          }
          if(time==='10h–10h45' && dayName==='Vendredi'){
            row[1]='Dictée bilan de phrases + correction raisonnée';
            row[2]=`${plan.final} Relecture avec une grille ciblée, puis correction et justification des choix.`;
            row[5]='Dictée bilan hebdomadaire';
          }
        });
      });
    });
  }
  applyAnnualFrenchRitual('p2',p2DetailedWeeks);
  applyAnnualFrenchRitual('p3',p3DetailedWeeks);
  applyAnnualFrenchRitual('p4',p4DetailedWeeks);
  applyAnnualFrenchRitual('p5',p5DetailedWeeks);

  function renderAnnualFrenchPlan(plan){
    if(!plan)return '';
    return `<section class="annual-french-plan"><h3>✍️ Français ritualisé — ${plan.support}</h3>
      <div class="annual-french-grid">
        <div><strong>Lundi</strong><span>Dictée de mots + flash 1</span><p>${plan.flash[0]}</p></div>
        <div><strong>Mardi</strong><span>Flash 2 + EDL par le DRAS</span><p>${plan.flash[1]}</p></div>
        <div><strong>Jeudi</strong><span>Flash 3 + DRAS + production courte</span><p>${plan.flash[2]}</p></div>
        <div><strong>Vendredi</strong><span>Dictée bilan</span><p>${plan.final}</p></div>
      </div>
      <p><strong>8 mots :</strong> ${plan.words.join(', ')}</p>
      <p><strong>5 mots prioritaires :</strong> ${plan.priority.join(', ')}</p>
      <p><strong>Vocabulaire — séance spécifique :</strong> ${plan.vocab.join(' • ')}</p>
    </section>`;
  }

  function p2DictationBankData(week){
    return (annualFrenchPlans.p2||[])[week-1]||null;
  }
  function renderP2DictationProgramming(plan,week){
    if(!plan)return '';
    return `<details class="dictation-programming-compact"><summary>
      <span>📝 <strong>Dictée — P2 · semaine ${week}</strong></span>
      <span class="dictation-programming-compact__summary">${plan.support} · ${plan.priority.join(', ')} · ${plan.orthographeCible}</span>
      <span class="dictation-programming-compact__toggle">Voir le détail</span></summary>
      <div class="dictation-programming-compact__body">
      <div><strong>Banque :</strong> ${plan.words.join(', ')}</div>
      <div><strong>5 prioritaires :</strong> ${plan.priority.join(', ')}</div>
      <div><strong>Orthographe :</strong> ${plan.orthographeCible}</div>
      <div><strong>Mots / exemples :</strong> ${plan.motsCibles}</div>
      <div><strong>Grammaire :</strong> ${plan.grammaireCible}</div>
      <div><strong>Exemple élève :</strong> ${plan.exempleGrammaire}</div>
      <div><strong>Réactivation :</strong> ${plan.reactivationWords}</div>
      ${plan.ecritureDRAS?`<div><strong>DRAS — phrase de départ :</strong> ${plan.ecritureDRAS.phraseDepart}</div><div><strong>Production d’écrit :</strong> ${plan.ecritureDRAS.production}</div><div><strong>Mots à employer :</strong> ${plan.ecritureDRAS.motsAEmployer}</div>`:''}
      <div class="dictation-programming-compact__final"><strong>Bilan :</strong> ${plan.final}</div>
      </div></details>`;
  }
  function p2DictationTimetableGuide(week,day,row){
    if(!row||row[0]!=='10h–10h45')return '';
    const p=p2DictationBankData(week); if(!p)return '';
    const d=String(day||'').split(' ')[0];
    if(d==='Lundi')return `<div class="dictation-timetable-guide"><div class="dictation-timetable-guide__title">📝 ${p.support}</div><div><strong>Banque :</strong> ${p.words.join(', ')}</div><div><strong>Prioritaires :</strong> ${p.priority.join(', ')}</div><div><strong>Point orthographique :</strong> ${p.orthographeCible}</div><div><strong>Mots concernés :</strong> ${p.motsCibles}</div><div><strong>Réactivation :</strong> ${p.reactivationWords}</div></div>`;
    if(d==='Mardi')return `<div class="dictation-timetable-guide"><div class="dictation-timetable-guide__title">✍️ Flash 2</div><div>${p.flash[1]}</div><div><strong>Grammaire :</strong> ${p.grammaireCible}</div><div><strong>Manipulation :</strong> ${p.exempleGrammaire}</div>${renderDictationDrasGuide(p,'tuesday')}</div>`;
    if(d==='Jeudi')return `<div class="dictation-timetable-guide"><div class="dictation-timetable-guide__title">✍️ Flash 3</div><div>${p.flash[2]}</div><div><strong>Réactivation :</strong> ${p.reactivationWords}</div><div><strong>Vigilance :</strong> ${p.motsCibles}</div>${renderDictationDrasGuide(p,'thursday')}</div>`;
    if(d==='Vendredi')return `<div class="dictation-timetable-guide"><div class="dictation-timetable-guide__title">✅ Dictée bilan</div><div>${p.final}</div><div><strong>À surveiller :</strong> ${p.motsCibles}</div><div><strong>Mots à reprendre :</strong> ${p.reactivationWords}</div>${renderDictationDrasGuide(p,'friday')}</div>`;
    return '';
  }

  function renderP2Week(week){
    const data=p2DetailedWeeks[week-1]||p2DetailedWeeks[0];
    const content=document.getElementById('timetableContent');
    const evalCount=data.days.reduce((n,[,rows])=>n+rows.filter(r=>/Évaluation|Mini-test|validation|Mesure (initiale|intermédiaire)|Dictée/i.test(r[5]||'')).length,0);
    content.innerHTML=`<section class="detail-view"><div class="detail-top"><div><span class="detail-zone">Académie de Montpellier — zone C</span><h2>${data.title}</h2><p>${data.dates}</p></div><button class="detail-back" type="button" data-back-summary>← Retour à l’emploi du temps</button></div>${detailWeekSelector('p2',data.key)}${data.holiday?`<div class="holiday-note">📅 ${data.holiday}</div>`:''}${renderWeekFocusPanel_(data.focus,evalCount)}${renderAnnualFrenchPlan(data.frenchPlan)}${renderAnnualEnglishPlan(data.englishPlan)}${data.days.map(([day,rows])=>`<section class="detail-day"><div class="detail-day-head"><h3>${day}</h3>${dayStatusToolbar()}</div><div class="detail-table-wrap"><table class="detail-table detail-table--p1"><thead><tr><th>Horaire</th><th>Domaine / activité</th><th>Compétence reliée à Progressions CE2</th><th>Séance détaillée</th><th>Statut</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="detail-time">${r[0]}</td><td><span class="detail-subject ${r[4]}">${r[1]}</span></td><td class="detail-competence-cell">${r[3]}</td>${dashboardSessionCell_(`${pedagogyMarkers('p2',data.key,day,r)}${r[2]}${p2DictationTimetableGuide(week,day,r)}${annualMathLessonButton(r[6])}`,r[5],/Évaluation|Mini-test|Dictée/i)}<td>${statusSelect(statusKey(data.key,day,r[0]))}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</section>`;
    bindStatusControls(content);
  }
  function p3DictationBankData(week){
    return (annualFrenchPlans.p3||[])[week-1]||null;
  }

  function renderP3DictationProgramming(plan,week){
    if(!plan)return '';
    return `<details class="dictation-programming-compact">
      <summary>
        <span>📝 <strong>Dictée — P3 · semaine ${week}</strong></span>
        <span class="dictation-programming-compact__summary">${plan.support} · ${plan.priority.join(', ')} · ${plan.orthographeCible}</span>
        <span class="dictation-programming-compact__toggle">Voir le détail</span>
      </summary>
      <div class="dictation-programming-compact__body">
        <div><strong>Banque :</strong> ${plan.words.join(', ')}</div>
        <div><strong>5 prioritaires :</strong> ${plan.priority.join(', ')}</div>
        <div><strong>Orthographe :</strong> ${plan.orthographeCible}</div>
        <div><strong>Mots / exemples :</strong> ${plan.motsCibles}</div>
        <div><strong>Grammaire :</strong> ${plan.grammaireCible}</div>
        <div><strong>Exemple élève :</strong> ${plan.exempleGrammaire}</div>
        <div><strong>Réactivation :</strong> ${plan.reactivationWords}</div>
        ${plan.ecritureDRAS?`<div><strong>DRAS — phrase de départ :</strong> ${plan.ecritureDRAS.phraseDepart}</div><div><strong>Production d’écrit :</strong> ${plan.ecritureDRAS.production}</div><div><strong>Mots à employer :</strong> ${plan.ecritureDRAS.motsAEmployer}</div>`:''}
        <div><strong>Flash 1 :</strong> ${plan.flash[0]}</div>
        <div><strong>Flash 2 :</strong> ${plan.flash[1]}</div>
        <div><strong>Flash 3 :</strong> ${plan.flash[2]}</div>
        <div class="dictation-programming-compact__final"><strong>Dictée bilan :</strong> ${plan.final}</div>
      </div>
    </details>`;
  }

  function p3DictationTimetableGuide(week,day,row){
    if(!row||row[0]!=='10h–10h45')return '';
    const p=p3DictationBankData(week); if(!p)return '';
    const d=String(day||'').split(' ')[0];
    if(d==='Lundi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">📝 ${p.support}</div>
      <div><strong>Banque :</strong> ${p.words.join(', ')}</div>
      <div><strong>Prioritaires :</strong> ${p.priority.join(', ')}</div>
      <div><strong>Point orthographique :</strong> ${p.orthographeCible}</div>
      <div><strong>Mots concernés :</strong> ${p.motsCibles}</div>
      <div><strong>Réactivation :</strong> ${p.reactivationWords}</div>
    </div>`;
    if(d==='Mardi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">✍️ Flash 2</div>
      <div>${p.flash[1]}</div>
      <div><strong>Grammaire :</strong> ${p.grammaireCible}</div>
      <div><strong>Manipulation :</strong> ${p.exempleGrammaire}</div>
      ${renderDictationDrasGuide(p,'tuesday')}
    </div>`;
    if(d==='Jeudi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">✍️ Flash 3</div>
      <div>${p.flash[2]}</div>
      <div><strong>Réactivation :</strong> ${p.reactivationWords}</div>
      <div><strong>Vigilance :</strong> ${p.motsCibles}</div>
      ${renderDictationDrasGuide(p,'thursday')}
    </div>`;
    if(d==='Vendredi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">✅ Dictée bilan</div>
      <div>${p.final}</div>
      <div><strong>À surveiller :</strong> ${p.motsCibles}</div>
      <div><strong>Mots à reprendre :</strong> ${p.reactivationWords}</div>
      ${renderDictationDrasGuide(p,'friday')}
    </div>`;
    return '';
  }

  function renderP3Week(week){
    const data=p3DetailedWeeks[week-1]||p3DetailedWeeks[0];
    const content=document.getElementById('timetableContent');
    const evalCount=data.days.reduce((n,[,rows])=>n+rows.filter(r=>/Évaluation|Mini-test|Dictée évaluée|Validation/i.test(r[5]||'')).length,0);
    content.innerHTML=`<section class="detail-view"><div class="detail-top"><div><span class="detail-zone">Académie de Montpellier — zone C</span><h2>${data.title}</h2><p>${data.dates}</p></div><button class="detail-back" type="button" data-back-summary>← Retour à l’emploi du temps</button></div>${detailWeekSelector('p3',data.key)}${calendarNotice(data)}${renderWeekFocusPanel_(data.focus,evalCount)}${renderP3DictationProgramming(data.frenchPlan,week)}${renderAnnualEnglishPlan(data.englishPlan)}${data.days.map(([day,rows])=>`<section class="detail-day"><div class="detail-day-head"><h3>${day}</h3>${dayStatusToolbar()}</div><div class="detail-table-wrap"><table class="detail-table detail-table--p1"><thead><tr><th>Horaire</th><th>Domaine / activité</th><th>Compétence reliée à Progressions CE2</th><th>Séance détaillée</th><th>Statut</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="detail-time">${r[0]}</td><td><span class="detail-subject ${r[4]}">${r[1]}</span></td><td class="detail-competence-cell">${r[3]}</td>${dashboardSessionCell_(`${pedagogyMarkers('p3',data.key,day,r)}${r[2]}${p3DictationTimetableGuide(week,day,r)}${annualMathLessonButton(r[6])}`,r[5],/Évaluation|Mini-test|Dictée évaluée/i)}<td>${statusSelect(statusKey(data.key,day,r[0]))}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</section>`;
    bindStatusControls(content);
  }
  function laterPeriodDictationBankData(period,week){
    return (annualFrenchPlans[period]||[])[week-1]||null;
  }

  function renderLaterPeriodDictationProgramming(period,plan,week){
    if(!plan)return '';
    const label=String(period||'').toUpperCase();
    return `<details class="dictation-programming-compact">
      <summary>
        <span>📝 <strong>Dictée — ${label} · semaine ${week}</strong></span>
        <span class="dictation-programming-compact__summary">${plan.support} · ${plan.priority.join(', ')} · ${plan.orthographeCible||'orthographe de la semaine'}</span>
        <span class="dictation-programming-compact__toggle">Voir le détail</span>
      </summary>
      <div class="dictation-programming-compact__body">
        <div><strong>Banque :</strong> ${plan.words.join(', ')}</div>
        <div><strong>5 prioritaires :</strong> ${plan.priority.join(', ')}</div>
        <div><strong>Orthographe :</strong> ${plan.orthographeCible||'—'}</div>
        <div><strong>Mots / exemples :</strong> ${plan.motsCibles||'—'}</div>
        <div><strong>Grammaire :</strong> ${plan.grammaireCible||'—'}</div>
        <div><strong>Exemple élève :</strong> ${plan.exempleGrammaire||'—'}</div>
        <div><strong>Réactivation :</strong> ${plan.reactivationWords||plan.reactivation||'—'}</div>
        ${plan.ecritureDRAS?`<div><strong>DRAS — phrase de départ :</strong> ${plan.ecritureDRAS.phraseDepart}</div><div><strong>Production d’écrit :</strong> ${plan.ecritureDRAS.production}</div><div><strong>Mots à employer :</strong> ${plan.ecritureDRAS.motsAEmployer}</div>`:''}
        <div class="dictation-programming-compact__final"><strong>Dictée bilan :</strong> ${plan.final}</div>
      </div>
    </details>`;
  }

  function laterPeriodDictationTimetableGuide(period,week,day,row){
    if(!row||row[0]!=='10h–10h45')return '';
    const p=laterPeriodDictationBankData(period,week); if(!p)return '';
    const d=String(day||'').split(' ')[0];
    if(d==='Lundi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">📝 ${p.support}</div>
      <div><strong>Banque :</strong> ${p.words.join(', ')}</div>
      <div><strong>Prioritaires :</strong> ${p.priority.join(', ')}</div>
      <div><strong>Point orthographique :</strong> ${p.orthographeCible||'—'}</div>
      <div><strong>Mots concernés :</strong> ${p.motsCibles||'—'}</div>
      <div><strong>Réactivation :</strong> ${p.reactivationWords||'—'}</div>
    </div>`;
    if(d==='Mardi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">✍️ Flash 2</div>
      <div>${p.flash[1]}</div>
      <div><strong>Grammaire :</strong> ${p.grammaireCible||'—'}</div>
      <div><strong>Manipulation :</strong> ${p.exempleGrammaire||'—'}</div>
      ${renderDictationDrasGuide(p,'tuesday')}
    </div>`;
    if(d==='Jeudi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">✍️ Flash 3</div>
      <div>${p.flash[2]}</div>
      <div><strong>Réactivation :</strong> ${p.reactivationWords||'—'}</div>
      <div><strong>Vigilance :</strong> ${p.motsCibles||'—'}</div>
      ${renderDictationDrasGuide(p,'thursday')}
    </div>`;
    if(d==='Vendredi')return `<div class="dictation-timetable-guide">
      <div class="dictation-timetable-guide__title">✅ Dictée bilan</div>
      <div>${p.final}</div>
      <div><strong>À surveiller :</strong> ${p.motsCibles||'—'}</div>
      <div><strong>Mots à reprendre :</strong> ${p.reactivationWords||'—'}</div>
      ${renderDictationDrasGuide(p,'friday')}
    </div>`;
    return '';
  }

  function renderLaterPeriodWeek(period,week){
    const source=period==='p4'?p4DetailedWeeks:p5DetailedWeeks;
    const data=source[week-1]||source[0];
    const content=document.getElementById('timetableContent');
    const evalCount=data.days.reduce((n,[,rows])=>n+rows.filter(r=>/Évaluation|Mini-test|Dictée évaluée|Validation/i.test(r[5]||'')).length,0);
    content.innerHTML=`<section class="detail-view"><div class="detail-top"><div><span class="detail-zone">Académie de Montpellier — zone C</span><h2>${data.title}</h2><p>${data.dates}</p></div><button class="detail-back" type="button" data-back-summary>← Retour à l’emploi du temps</button></div>${detailWeekSelector(period,data.key)}${calendarNotice(data)}${renderWeekFocusPanel_(data.focus,evalCount)}${(period==='p4'||period==='p5')?renderLaterPeriodDictationProgramming(period,data.frenchPlan,week):renderAnnualFrenchPlan(data.frenchPlan)}${renderAnnualEnglishPlan(data.englishPlan)}${data.days.map(([day,rows])=>`<section class="detail-day"><div class="detail-day-head"><h3>${day}</h3>${dayStatusToolbar()}</div><div class="detail-table-wrap"><table class="detail-table detail-table--p1"><thead><tr><th>Horaire</th><th>Domaine / activité</th><th>Compétence reliée à Progressions CE2</th><th>Séance détaillée</th><th>Statut</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="detail-time">${r[0]}</td><td><span class="detail-subject ${r[4]}">${r[1]}</span></td><td class="detail-competence-cell">${r[3]}</td>${dashboardSessionCell_(`${pedagogyMarkers(period,data.key,day,r)}${r[2]}${(period==='p4'||period==='p5')?laterPeriodDictationTimetableGuide(period,week,day,r):''}${annualMathLessonButton(r[6])}`,r[5],/Évaluation|Mini-test|Dictée évaluée/i)}<td>${statusSelect(statusKey(data.key,day,r[0]))}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</section>`;
    bindStatusControls(content);
  }
  function render(p){
    const data=periods[p];
    const content=document.getElementById('timetableContent');
    const cards=Object.keys(base).map(day=>`<article class="timetable-day"><h3>${day[0].toUpperCase()+day.slice(1)}</h3>${altered(day,data.days[day],data.mode,p).map(s=>`<div class="slot ${s[3]}"><time>${s[0]}</time><div><strong>${s[1]}</strong>${s[2]?`<small>${s[2]}</small>`:''}</div></div>`).join('')}</article>`).join('');
    const legend=labels.map((label,i)=>`<span class="subject-chip ${subjectClasses[i]}">${subjectIcons[i]} ${label}</span>`).join('');
    const weights=labels.map((label,i)=>{
      const pct=(data.minutes[i]/1320*100).toFixed(1).replace('.',',');
      return `<div class="weight-row ${subjectClasses[i]}"><div class="weight-label"><span>${subjectIcons[i]} ${label}</span><strong>${data.hours[i]} · ${pct} %</strong></div><div class="weight-track"><span style="width:${data.minutes[i]/1320*100}%"></span></div></div>`;
    }).join('');
    const detailEnabled=['rentree','p1','p2','p3','p4','p5'].includes(p);
    content.innerHTML=`<section class="timetable-summary-head"><div><h2>${data.title}</h2></div><div class="timetable-summary-actions"><button type="button" class="detail-launch ${detailEnabled?'':'is-disabled'}" ${detailEnabled?`data-open-detail-hub="${p}"`:'disabled'}>📋 Voir une proposition détaillée</button><button type="button" class="pe-launch ${['p1','p2','p3','p4','p5'].includes(p)?'':'is-disabled'}" ${['p1','p2','p3','p4','p5'].includes(p)?`data-open-parcours="${p}"`:'disabled'}>🧒 Parcours de l’élève</button></div></section><div class="timetable-note">${data.note}<br>${data.mode==='rentree'?'<strong>Organisation spéciale :</strong> aucun départ CHAM prévu ; tous les créneaux se déroulent en classe entière.':'<strong>Principe CHAM :</strong> aucune nouvelle notion ni évaluation commune pendant les absences du mardi et du jeudi.'}</div><div class="subject-legend" aria-label="Légende des matières">${legend}${data.mode==='rentree'?'':'<span class="subject-chip cham">🎵 CHAM</span>'}<span class="subject-chip break">☕ Récréation</span></div><div class="timetable-grid">${cards}</div><section class="weights-wrap"><div class="weights-title"><div><h3>Poids horaire des disciplines</h3><p>Répartition hebdomadaire nette de cette période, sur 22 heures d’enseignement.</p></div><strong>Français + maths : ${((data.minutes[0]+data.minutes[1])/1320*100).toFixed(1).replace('.',',')} %</strong></div><div class="weights-grid">${weights}</div></section><section class="hours-wrap"><h3>Contrôle annuel des volumes</h3><table class="hours-table"><thead><tr><th>Discipline</th><th>Moyenne hebdomadaire nette</th><th>Cible annuelle nette</th></tr></thead><tbody>${labels.map((l,i)=>`<tr class="subject-table-row ${subjectClasses[i]}"><td>${subjectIcons[i]} ${l}</td><td>${data.hours[i]}</td><td>${annual[i]}</td></tr>`).join('')}</tbody><tfoot><tr><td><strong>Total</strong></td><td><strong>22 h</strong></td><td class="ok">792 h sur l’année</td></tr></tfoot></table></section>`;
  }
  window.ProgressionsEDT = {
    periods,
    openWeek(period='p1',weekNumber=1){
      const modal=document.getElementById('timetableModal');
      const tabs=document.getElementById('timetableTabs');
      const content=document.getElementById('timetableContent');
      if(!modal||!content)return false;
      modal.classList.add('timetable-modal--direct');
      modal.classList.remove('timetable-modal--tbi','hidden');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
      tabs?.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x.dataset.period===period));
      const week=Math.max(1,Number(weekNumber)||1);
      if(period==='p1')renderP1Week(week);
      else if(period==='p2')renderP2Week(week);
      else if(period==='p3')renderP3Week(week);
      else if(period==='p4'||period==='p5')renderLaterPeriodWeek(period,week);
      else renderDetailedWeek('rentree1');
      content.scrollTop=0;
      return true;
    },
    getDayRows(day, period='p1'){
      const selected=periods[period]||periods.p1;
      if(!base[day]) return [];
      const key=selected.days && selected.days[day] ? selected.days[day] : '';
      return altered(day,key,selected.mode||'',period).map(row=>[...row]);
    }
  };

  function init(){
    const openSummary=document.getElementById('openTimetableSummaryBtn'), openSummaryPeriods=[...document.querySelectorAll('[data-open-summary-period]')], openDetail=document.getElementById('openTimetableDetailBtn'), openTbi=document.getElementById('openTbiViewBtn'), close=document.getElementById('closeTimetableBtn'), modal=document.getElementById('timetableModal'), tabs=document.getElementById('timetableTabs');
    // V35.56 — mémorise le contexte d'ouverture de la fenêtre.
    // Depuis « Progressions par période », la navigation RENTREE/P1…P5 doit
    // rester dans les emplois du temps détaillés et ne jamais retomber
    // automatiquement sur la vue synthétique.
    let periodNavigationMode='summary';
    const renderDetailedPeriod=(period)=>{
      if(period==='rentree') renderDetailedWeek('rentree1');
      else if(period==='p1') renderP1Week(1);
      else if(period==='p2') renderP2Week(1);
      else if(period==='p3') renderP3Week(1);
      else if(period==='p4') renderLaterPeriodWeek('p4',1);
      else if(period==='p5') renderLaterPeriodWeek('p5',1);
      else render(period);
    };
    const renderPeriodNavigation=(period)=>{
      if(periodNavigationMode==='detail') renderDetailedPeriod(period);
      else render(period);
    };
    if((!openSummary&&!openSummaryPeriods.length&&!openDetail)||!modal) return;
    const content=document.getElementById('timetableContent');
    content.addEventListener('click',e=>{
      const rentreeMath=e.target.closest('[data-open-rentree-math]');
      if(rentreeMath){renderRentreeMathLesson(rentreeMath.dataset.openRentreeMath,'teacher',0);content.scrollTop=0;return;}
      const rentreeMathMode=e.target.closest('[data-open-rentree-math-mode]');
      if(rentreeMathMode){renderRentreeMathLesson(rentreeMathMode.dataset.rentreeMathId,rentreeMathMode.dataset.openRentreeMathMode,0);content.scrollTop=0;return;}
      const rentreeMathStep=e.target.closest('[data-rentree-math-step]');
      if(rentreeMathStep&&!rentreeMathStep.disabled){renderRentreeMathLesson(rentreeMathStep.dataset.rentreeMathId,'student',Number(rentreeMathStep.dataset.rentreeMathStep));content.scrollTop=0;return;}
      const rentreeMathBack=e.target.closest('[data-back-rentree-math]');
      if(rentreeMathBack){
        const backKey=rentreeMathBack.dataset.backRentreeMath||'';
        if(/^p1r[12]$/.test(backKey)){
          renderP1Week(Number(backKey.slice(-1)));
        }else{
          renderDetailedWeek(backKey);
        }
        content.scrollTop=0;
        return;
      }
      const annualMath=e.target.closest('[data-open-annual-math]');
      if(annualMath){renderAnnualMathLesson(annualMath.dataset.openAnnualMath,'teacher',0);content.scrollTop=0;return;}
      const annualMathMode=e.target.closest('[data-open-annual-math-mode]');
      if(annualMathMode){renderAnnualMathLesson(annualMathMode.dataset.annualMathId,annualMathMode.dataset.openAnnualMathMode,0);content.scrollTop=0;return;}
      const annualMathStep=e.target.closest('[data-annual-math-step]');
      if(annualMathStep&&!annualMathStep.disabled){renderAnnualMathLesson(annualMathStep.dataset.annualMathId,'student',Number(annualMathStep.dataset.annualMathStep));content.scrollTop=0;return;}
      const annualMathBack=e.target.closest('[data-back-annual-math]');
      if(annualMathBack){const [period,week]=annualMathBack.dataset.backAnnualMath.split('|');period==='p2'?renderP2Week(Number(week)):period==='p3'?renderP3Week(Number(week)):renderLaterPeriodWeek(period,Number(week));content.scrollTop=0;return;}
      const lesson=e.target.closest('[data-open-p1-lesson]');
      if(lesson){renderP1Lesson(lesson.dataset.openP1Lesson,'teacher',0);content.scrollTop=0;return;}
      const lessonMode=e.target.closest('[data-lesson-mode]');
      if(lessonMode){renderP1Lesson(lessonMode.dataset.lessonId,lessonMode.dataset.lessonMode,0);content.scrollTop=0;return;}
      const studentStep=e.target.closest('[data-lesson-student-step]');
      if(studentStep&&!studentStep.disabled){renderP1Lesson(studentStep.dataset.lessonId,'student',Number(studentStep.dataset.lessonStudentStep));content.scrollTop=0;return;}
      const lessonBack=e.target.closest('[data-back-p1-week]');
      if(lessonBack){renderP1Week(Number(lessonBack.dataset.backP1Week));content.scrollTop=0;return;}
      const parcours=e.target.closest('[data-open-parcours]');
      if(parcours&&window.ProgressionsParcoursEleve){window.ProgressionsParcoursEleve.renderPeriod(content,parcours.dataset.openParcours);content.scrollTop=0;return;}
      if(e.target.closest('[data-pe-back]')){render('p1');content.scrollTop=0;return;}
      const detail=e.target.closest('[data-open-detail]');
      if(detail){renderDetailedWeek(detail.dataset.openDetail);content.scrollTop=0;return;}
      const hub=e.target.closest('[data-open-detail-hub]');
      if(hub){hub.dataset.openDetailHub==='rentree'?renderDetailedWeek('rentree1'):hub.dataset.openDetailHub==='p1'?renderP1Week(1):hub.dataset.openDetailHub==='p2'?renderP2Week(1):hub.dataset.openDetailHub==='p3'?renderP3Week(1):hub.dataset.openDetailHub==='p4'?renderLaterPeriodWeek('p4',1):renderLaterPeriodWeek('p5',1);content.scrollTop=0;return;}
      const p1week=e.target.closest('[data-open-p1-week]');
      if(p1week){renderP1Week(Number(p1week.dataset.openP1Week));content.scrollTop=0;return;} const p2week=e.target.closest('[data-open-p2-week]'); if(p2week){renderP2Week(Number(p2week.dataset.openP2Week));content.scrollTop=0;return;} const p3week=e.target.closest('[data-open-p3-week]'); if(p3week){renderP3Week(Number(p3week.dataset.openP3Week));content.scrollTop=0;return;} const p4week=e.target.closest('[data-open-p4-week]'); if(p4week){renderLaterPeriodWeek('p4',Number(p4week.dataset.openP4Week));content.scrollTop=0;return;} const p5week=e.target.closest('[data-open-p5-week]'); if(p5week){renderLaterPeriodWeek('p5',Number(p5week.dataset.openP5Week));content.scrollTop=0;return;}
      if(e.target.closest('[data-back-summary]')){const active=tabs.querySelector('.is-active');periodNavigationMode='summary';render(active?active.dataset.period:'rentree');content.scrollTop=0;}
    });
    tabs.innerHTML=Object.keys(periods).map((p,i)=>`<button class="timetable-tab ${i===0?'is-active':''}" data-period="${p}">${p.toUpperCase()}</button>`).join('');
    tabs.addEventListener('click',e=>{const b=e.target.closest('[data-period]');if(!b)return;tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));renderPeriodNavigation(b.dataset.period);content.scrollTop=0;});
    const shut=()=>{modal.classList.add('hidden');modal.classList.remove('timetable-modal--direct','timetable-modal--tbi');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
    const showModal=(direct=false,tbi=false)=>{modal.classList.toggle('timetable-modal--direct',!!direct);modal.classList.toggle('timetable-modal--tbi',!!tbi);modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
    if(openSummary) openSummary.addEventListener('click',()=>{periodNavigationMode='summary';showModal(false);tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x.dataset.period==='rentree'));render('rentree')});
    openSummaryPeriods.forEach(btn=>btn.addEventListener('click',()=>{
      const period=btn.dataset.openSummaryPeriod||'p1';
      periodNavigationMode='detail';
      showModal(true);
      tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x.dataset.period===period));
      renderDetailedPeriod(period);
      content.scrollTop=0;
    }));
    if(openDetail) openDetail.addEventListener('click',()=>{periodNavigationMode='detail';showModal(false);tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x.dataset.period==='p1'));renderP1Week(1);content.scrollTop=0});
    if(openTbi) openTbi.addEventListener('open-tbi-view',()=>{showModal(true,true);tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x.dataset.period==='p1'));render('p1');content.scrollTop=0;});
    close.addEventListener('click',shut); modal.addEventListener('click',e=>{if(e.target===modal)shut()}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))shut()});
    render('rentree');
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
