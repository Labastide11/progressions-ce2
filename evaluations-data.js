window.EVALUATIONS_CE2 = {
  francais: {
    label: 'Français',
    icon: '✏️',
    periods: {
      p1: {
        title: 'Période 1 — Verbe et groupe sujet',
        status: 'ready',
        description: 'Évaluation P1 volontairement courte : 2 nouvelles compétences essentielles seulement. Les autres apprentissages de la période restent suivis au fil des séances et ne donnent pas lieu à un contrôle systématique.',
        studentDoc: 'assets/evaluations/francais/Francais_P1_eleve_DRAS_verrouillee.docx',
        teacherDoc: 'assets/evaluations/francais/Francais_P1_grille_enseignant_DRAS_verrouillee.docx',
        skillCodes: ['GRA-P1-04','GRA-P1-06']
      },
      p2: {
        title: 'Période 2 — Présent et récit chronologique',
        status: 'ready',
        description: 'Évaluation P2 courte et progressive : 2 nouvelles compétences essentielles, accompagnées d’une compétence P1 en rebrassage. Les autres apprentissages de la période restent suivis au fil des séances.',
        studentDoc: 'assets/evaluations/francais/Francais_P2_eleve_DRAS_verrouillee.docx',
        teacherDoc: 'assets/evaluations/francais/Francais_P2_grille_enseignant_DRAS_verrouillee.docx',
        newSkillCodes: ['CONJ-P2-02','ECR-P2-04'],
        reviewSkillCodes: ['GRA-P1-04'],
        skillCodes: ['CONJ-P2-02','ECR-P2-04','GRA-P1-04']
      },
      p3: {
        title: 'Période 3 — Groupe nominal et futur',
        status: 'ready',
        description: 'Évaluation P3 courte et progressive : 2 nouvelles compétences essentielles — identifier le groupe nominal et conjuguer les verbes en -er au futur — plus un rebrassage P2 du présent des verbes en -er.',
        studentDoc: 'assets/evaluations/francais/Francais_P3_eleve_DRAS_verrouillee.docx',
        teacherDoc: 'assets/evaluations/francais/Francais_P3_grille_enseignant_DRAS_verrouillee.docx',
        newSkillCodes: ['GRA-P3-03','CONJ-P3-02'],
        reviewSkillCodes: ['CONJ-P2-02'],
        skillCodes: ['GRA-P3-03','CONJ-P3-02','CONJ-P2-02']
      },
      p4: {
        title: 'Période 4 — Groupes dans la phrase et imparfait',
        status: 'ready',
        description: 'Évaluation P4 ciblée : 2 nouvelles compétences essentielles — manipuler les groupes dans la phrase (fondamental LSU) et conjuguer les verbes en -er à l’imparfait — plus 2 rebrassages P3 sur le futur et le groupe nominal.',
        studentDoc: 'assets/evaluations/francais/Francais_P4_eleve_DRAS_verrouillee.docx',
        teacherDoc: 'assets/evaluations/francais/Francais_P4_grille_enseignant_DRAS_verrouillee.docx',
        newSkillCodes: ['GRA-P4-02','CONJ-P4-02'],
        reviewSkillCodes: ['CONJ-P3-02','GRA-P3-03'],
        skillCodes: ['GRA-P4-02','CONJ-P4-02','CONJ-P3-02','GRA-P3-03']
      },
      p5: {
        title: 'Période 5 — Accord sujet-verbe et révision autonome',
        status: 'ready',
        description: 'Évaluation P5 ciblée : 2 nouvelles compétences essentielles — accorder le sujet et le verbe, puis réviser/améliorer un texte (fondamental LSU) — plus 2 rebrassages P4 sur l’imparfait et la manipulation des groupes dans la phrase.',
        studentDoc: 'assets/evaluations/francais/Francais_P5_eleve_DRAS_verrouillee.docx',
        teacherDoc: 'assets/evaluations/francais/Francais_P5_grille_enseignant_DRAS_verrouillee.docx',
        newSkillCodes: ['ORT-P5-01','ECR-P5-04'],
        reviewSkillCodes: ['CONJ-P4-02','GRA-P4-02'],
        skillCodes: ['ORT-P5-01','ECR-P5-04','CONJ-P4-02','GRA-P4-02']
      },
    }
  },
  maths: {
    label: 'Mathématiques',
    icon: '📐',
    periods: {
      p1: {
        title: 'Période 1 — Comprendre un problème et poser une addition',
        status: 'ready',
        description: 'Évaluation P1 volontairement courte : 2 nouvelles compétences essentielles seulement, dont le fondamental LSU « comprendre la question d’un problème ». Les autres notions travaillées sont suivies en classe sans contrôle systématique.',
        studentDoc: 'assets/evaluations/maths/Maths_P1_eleve_verrouillee.docx',
        teacherDoc: 'assets/evaluations/maths/Maths_P1_grille_enseignant_verrouillee.docx',
        skillCodes: ['PRO-P1-01','OPE-P1-01']
      },
      p2: {
        title: 'Période 2 — Valeur des chiffres et soustraction',
        status: 'ready',
        description: 'Trace ciblée du semestre 1 : 2 compétences maximum, valeur d’un chiffre et soustraction avec échange. Les autres domaines sont évalués à d’autres moments du semestre.',
        studentDoc: 'assets/evaluations/maths/Maths_P2_eleve_verrouillee.docx',
        teacherDoc: 'assets/evaluations/maths/Maths_P2_grille_enseignant_verrouillee.docx',
        newSkillCodes: ['NUM-P2-02','OPE-P2-02'],
        reviewSkillCodes: [],
        skillCodes: ['NUM-P2-02','OPE-P2-02']
      },
      p3: {
        title: 'Période 3 — Tables et multiplication posée',
        status: 'ready',
        description: 'Dernière trace ciblée du semestre 1 : 2 compétences maximum, tables de multiplication et multiplication posée. La géométrie et le temps font l’objet d’une petite trace distincte en janvier.',
        studentDoc: 'assets/evaluations/maths/Maths_P3_eleve_verrouillee.docx',
        teacherDoc: 'assets/evaluations/maths/Maths_P3_grille_enseignant_verrouillee.docx',
        newSkillCodes: ['CAL-P3-01','OPE-P3-01'],
        reviewSkillCodes: [],
        skillCodes: ['CAL-P3-01','OPE-P3-01']
      },
      p4: {
        title: 'Période 4 — Stratégies de calcul et sens de la division',
        status: 'ready',
        description: 'Trace ciblée du semestre 2 : 2 compétences maximum, choisir une stratégie de calcul efficace et comprendre le sens de la division. Les autres sous-domaines sont répartis jusqu’en juin.',
        studentDoc: 'assets/evaluations/maths/Maths_P4_eleve_verrouillee.docx',
        teacherDoc: 'assets/evaluations/maths/Maths_P4_grille_enseignant_verrouillee.docx',
        newSkillCodes: ['CAL-P4-02','OPE-P4-02'],
        reviewSkillCodes: [],
        skillCodes: ['CAL-P4-02','OPE-P4-02']
      },
      p5: {
        title: 'Période 5 — Représentations des nombres et problème complexe',
        status: 'ready',
        description: 'Trace de synthèse du semestre 2 : 2 compétences maximum, représentations des nombres et problème complexe. Des traces distinctes en mai et début juin couvrent mesures/fractions puis géométrie/données.',
        studentDoc: 'assets/evaluations/maths/Maths_P5_eleve_verrouillee.docx',
        teacherDoc: 'assets/evaluations/maths/Maths_P5_grille_enseignant_verrouillee.docx',
        newSkillCodes: ['NUM-P5-01','PRO-P5-02'],
        reviewSkillCodes: [],
        skillCodes: ['NUM-P5-01','PRO-P5-02']
      }
    }
  },
  emc: {
    label: 'EMC',
    icon: '🤝',
    periods: {
      p1: {
        title: 'Période 1 — Poser le cadre commun',
        status: 'ready',
        traceType: 'Observation en classe',
        traceSource: 'observation_classe',
        formalAssessment: false,
        familyAnnouncement: false,
        description: 'Trace de référence sans contrôle papier : règles de la classe et de l’école, droits et devoirs, responsabilités, coopération et soin du bien commun.',
        skillCodes: ['EMC-P1-01','EMC-P1-02','EMC-P1-03','EMC-P1-04','EMC-P1-05']
      },
      p2: {
        title: 'Période 2 — Le message clair',
        status: 'ready',
        traceType: 'Mise en situation + observation',
        traceSource: 'observation_classe',
        formalAssessment: false,
        familyAnnouncement: false,
        description: 'Observation ciblée, sans contrôle papier : 2 compétences essentielles seulement — exprimer son ressenti et écouter l’autre, puis utiliser le message clair pour chercher une solution.',
        newSkillCodes: ['EMC-P2-04','EMC-P2-05'],
        reviewSkillCodes: [],
        skillCodes: ['EMC-P2-04','EMC-P2-05']
      },
      p3: {
        title: 'Période 3 — Conseil d’élèves et bien commun',
        status: 'ready',
        traceType: 'Conseil d’élèves',
        traceSource: 'observation_classe',
        formalAssessment: false,
        familyAnnouncement: false,
        description: 'Observation ciblée, sans contrôle papier : 2 nouvelles compétences essentielles — participer à une décision collective et prendre la parole en écoutant les autres — avec un bref rebrassage P2 sur l’expression du ressenti et l’écoute.',
        newSkillCodes: ['EMC-P3-03','EMC-P3-04'],
        reviewSkillCodes: ['EMC-P2-04'],
        skillCodes: ['EMC-P3-03','EMC-P3-04','EMC-P2-04']
      },
      p4: {
        title: 'Période 4 — Débat réglé : les 4 coins',
        status: 'ready',
        traceType: 'Débat réglé',
        traceSource: 'observation_classe',
        formalAssessment: false,
        familyAnnouncement: false,
        description: 'Observation ciblée pendant un débat réglé : respecter les différences et l’égalité, puis exprimer un point de vue argumenté en écoutant les autres. Une compétence de décision collective P3 peut être reprise en rebrassage.',
        newSkillCodes: ['EMC-P4-01','EMC-P4-03'],
        reviewSkillCodes: ['EMC-P3-04'],
        skillCodes: ['EMC-P4-01','EMC-P4-03','EMC-P3-04']
      },
      p5: {
        title: 'Période 5 — Secours et engagement',
        status: 'ready',
        traceType: 'Oral + observation',
        traceSource: 'observation_classe',
        formalAssessment: false,
        familyAnnouncement: false,
        description: 'Observation ciblée, sans contrôle papier : alerter correctement un adulte ou un service de secours, puis relier un écogeste à l’intérêt général. La participation orale déjà travaillée revient ponctuellement en rebrassage.',
        newSkillCodes: ['EMC-P5-03', 'EMC-P5-04'],
        reviewSkillCodes: ['EMC-P3-04'],
        skillCodes: ['EMC-P5-03', 'EMC-P5-04', 'EMC-P3-04']
      }
    }
  },
  histoire: {
    label: 'Histoire',
    icon: '🏺',
    periods: {
      p1: {
        title: 'Période 1 — Construire et lire une frise chronologique',
        status: 'ready',
        traceType: 'Frise + cartes à ordonner',
        traceSource: 'evaluation_papier',
        description: 'Évaluation P1 courte : utiliser une frise chronologique et reconnaître les grandes périodes historiques. Les autres repères sont observés dans le travail quotidien.',
        skillCodes: ['HIS-P1-02','HIS-P1-03']
      },
      p2: {
        title: 'Période 2 — Comparer la vie quotidienne à différentes époques',
        status: 'ready',
        traceType: 'Documents + tableau comparatif',
        traceSource: 'evaluation_papier',
        description: 'Évaluation courte : comparer des habitats de différentes époques et repérer changements/permanences. Une frise P1 revient en rebrassage pour vérifier la consolidation.',
        newSkillCodes: ['HIS-P2-01','HIS-P2-04'],
        reviewSkillCodes: ['HIS-P1-02'],
        skillCodes: ['HIS-P2-01','HIS-P2-04','HIS-P1-02']
      },
      p3: {
        title: 'Période 3 — Lire des documents et raconter l’essentiel',
        status: 'ready',
        traceType: 'Dossier documentaire + frise',
        traceSource: 'evaluation_papier',
        description: 'Évaluation courte : prélever des informations dans des documents historiques (fondamental LSU) et présenter avec ses mots un personnage ou un événement étudié. La frise, déjà vue en P1, revient brièvement en rebrassage.',
        newSkillCodes: ['HIS-P3-03','HIS-P3-04'],
        reviewSkillCodes: ['HIS-P1-02'],
        skillCodes: ['HIS-P3-03','HIS-P3-04','HIS-P1-02']
      },
      p4: {
        title: 'Période 4 — Enquêter sur le Moyen Âge',
        status: 'ready',
        traceType: 'Dossier documentaire + explication',
        traceSource: 'evaluation_papier',
        description: 'Évaluation ciblée : mettre en relation plusieurs documents et expliquer simplement l’affirmation du pouvoir royal. Le prélèvement d’informations dans un document historique, déjà travaillé en P3, revient en rebrassage.',
        newSkillCodes: ['HIS-P4-04','HIS-P4-03'],
        reviewSkillCodes: ['HIS-P3-03'],
        skillCodes: ['HIS-P4-04','HIS-P4-03','HIS-P3-03']
      },
      p5: {
        title: 'Période 5 — Transformations et grande figure historique',
        status: 'ready',
        traceType: 'Présentation courte + documents',
        traceSource: 'observation_classe',
        description: 'Situation courte : identifier une transformation importante entre Moyen Âge et Temps modernes et croiser des informations sur une grande figure historique. Le prélèvement d’informations dans un document, déjà travaillé en P3, revient en rebrassage.',
        newSkillCodes: ['HIS-P5-02', 'HIS-P5-03'],
        reviewSkillCodes: ['HIS-P3-03'],
        skillCodes: ['HIS-P5-02', 'HIS-P5-03', 'HIS-P3-03']
      }
    }
  },
  geographie: {
    label: 'Géographie',
    icon: '🗺️',
    periods: {
      p1: {
        title: 'Période 1 — Se repérer en France et lire une carte de population',
        status: 'ready',
        traceType: 'Carte + réponses courtes',
        traceSource: 'evaluation_papier',
        description: 'Évaluation P1 courte : localiser la France à différentes échelles et lire une carte simple de répartition de la population. Les autres repères sont observés au fil des activités.',
        skillCodes: ['GEOG-P1-01','GEOG-P1-02']
      },
      p2: {
        title: 'Période 2 — Habiter la ville : paysage et plan',
        status: 'ready',
        traceType: 'Photographie + plan',
        traceSource: 'evaluation_papier',
        description: 'Évaluation courte : reconnaître/décrire un paysage urbain et utiliser un plan pour se repérer. La localisation de la France, vue en P1, revient brièvement en rebrassage.',
        newSkillCodes: ['GEOG-P2-01','GEOG-P2-04'],
        reviewSkillCodes: ['GEOG-P1-01'],
        skillCodes: ['GEOG-P2-01','GEOG-P2-04','GEOG-P1-01']
      },
      p3: {
        title: 'Période 3 — Habiter la campagne, le littoral et la montagne',
        status: 'ready',
        traceType: 'Photographies + carte',
        traceSource: 'evaluation_papier',
        description: 'Évaluation courte : reconnaître/décrire un espace rural et décrire différentes façons d’habiter un littoral ou la montagne. La localisation de la France, vue en P1, revient brièvement en rebrassage.',
        newSkillCodes: ['GEOG-P3-01','GEOG-P3-02'],
        reviewSkillCodes: ['GEOG-P1-01'],
        skillCodes: ['GEOG-P3-01','GEOG-P3-02','GEOG-P1-01']
      },
      p4: {
        title: 'Période 4 — Travailler en France : observer un territoire',
        status: 'ready',
        traceType: 'Paysage + documents courts',
        traceSource: 'evaluation_papier',
        description: 'Évaluation ciblée : lire un paysage pour comprendre comment un espace est utilisé pour travailler, puis expliquer le rôle des transports et des aménagements. La description d’un espace rural P3 revient brièvement en rebrassage.',
        newSkillCodes: ['GEOG-P4-03','GEOG-P4-04'],
        reviewSkillCodes: ['GEOG-P3-01'],
        skillCodes: ['GEOG-P4-03','GEOG-P4-04','GEOG-P3-01']
      },
      p5: {
        title: 'Période 5 — Parcours d’un produit et effets sur le territoire',
        status: 'ready',
        traceType: 'Dossier documentaire + explication',
        traceSource: 'evaluation_papier',
        description: 'Évaluation ciblée : reconstituer le parcours simple d’un produit et repérer les effets d’une activité sur un territoire et son environnement. La lecture d’un paysage de travail P4 revient en rebrassage.',
        newSkillCodes: ['GEOG-P5-02', 'GEOG-P5-04'],
        reviewSkillCodes: ['GEOG-P4-03'],
        skillCodes: ['GEOG-P5-02', 'GEOG-P5-04', 'GEOG-P4-03']
      }
    }
  },
  sciences: {
    label: 'Sciences',
    icon: '🔬',
    periods: {
      p1: {
        title: 'Période 1 — Mener une petite investigation scientifique',
        status: 'ready',
        traceType: 'Manipulation + observations + conclusion',
        traceSource: 'observation_classe',
        description: 'Observation P1 courte en situation réelle : observer précisément les résultats d’une expérience et tirer une conclusion. SCI-P1-05 est un fondamental LSU.',
        skillCodes: ['SCI-P1-03','SCI-P1-05']
      },
      p2: {
        title: 'Période 2 — Les états et changements d’état de l’eau',
        status: 'ready',
        traceType: 'Expérience + observation',
        traceSource: 'observation_classe',
        description: 'Observation ciblée : identifier les états de l’eau et décrire un changement d’état. La capacité à tirer une conclusion, travaillée en P1, est reprise en rebrassage.',
        newSkillCodes: ['SCI-P2-01','SCI-P2-02'],
        reviewSkillCodes: ['SCI-P1-05'],
        skillCodes: ['SCI-P2-01','SCI-P2-02','SCI-P1-05']
      },
      p3: {
        title: 'Période 3 — Comprendre comment fonctionne un VTT',
        status: 'ready',
        traceType: 'VTT réel + oral pratique',
        traceSource: 'observation_classe',
        description: 'Observation pratique ciblée : identifier les principales parties du vélo et leur fonction, puis expliquer simplement la transmission du mouvement. Tirer une conclusion à partir d’une observation, déjà travaillé en P1, revient en rebrassage.',
        newSkillCodes: ['SCI-P3-02','SCI-P3-03'],
        reviewSkillCodes: ['SCI-P1-05'],
        skillCodes: ['SCI-P3-02','SCI-P3-03','SCI-P1-05']
      },
      p4: {
        title: 'Période 4 — Observer les effets de l’effort sur mon corps',
        status: 'ready',
        traceType: 'Mesures avant/après + oral',
        traceSource: 'observation_classe',
        description: 'Observation pratique ciblée : mesurer les effets d’un effort sur le pouls et la respiration, puis justifier une habitude favorable à la santé. La capacité à tirer une conclusion à partir de résultats revient en rebrassage.',
        newSkillCodes: ['SCI-P4-02','SCI-P4-05'],
        reviewSkillCodes: ['SCI-P1-05'],
        skillCodes: ['SCI-P4-02','SCI-P4-05','SCI-P1-05']
      },
      p5: {
        title: 'Période 5 — Besoins du vivant et chaîne alimentaire',
        status: 'ready',
        traceType: 'Cartes + observation/document + oral',
        traceSource: 'observation_classe',
        description: 'Observation/document ciblé : identifier les besoins d’un être vivant à partir d’observations et construire une chaîne alimentaire simple. Tirer une conclusion à partir d’observations, déjà travaillé auparavant, revient en rebrassage.',
        newSkillCodes: ['SCI-P5-03', 'SCI-P5-04'],
        reviewSkillCodes: ['SCI-P1-05'],
        skillCodes: ['SCI-P5-03', 'SCI-P5-04', 'SCI-P1-05']
      }
    }
  },
  anglais: {
    label: 'Anglais',
    icon: '🇬🇧',
    periods: {
      p2: {
        title: 'Semestre 1 — Petit bilan oral',
        status: 'ready',
        description: 'Bilan oral très court : 2 nouvelles compétences de P2 et un mini-rebrassage P1. Le reste de l’anglais est observé naturellement pendant les rituels et activités.',
        newSkillCodes: ['ANG-P2-01','ANG-P2-05'],
        reviewSkillCodes: ['ANG-P1-03'],
        skillCodes: ['ANG-P2-01','ANG-P2-05','ANG-P1-03']
      },
      p5: {
        title: 'Semestre 2 — Bilan oral ciblé',
        status: 'ready',
        description: 'Bilan oral court : 2 nouvelles compétences — décrire brièvement un animal et suivre le fil d’une histoire courte (fondamental LSU) — avec un bref rebrassage d’une formulation orale déjà connue. Les autres acquis restent observés pendant les activités.',
        studentDoc: 'assets/evaluations/anglais/Anglais_S2_support_eleve.docx',
        teacherDoc: 'assets/evaluations/anglais/Anglais_S2_grille_enseignant.docx',
        newSkillCodes: ['ANG-P5-03','ANG-P5-04'],
        reviewSkillCodes: ['ANG-P3-04'],
        skillCodes: ['ANG-P5-03','ANG-P5-04','ANG-P3-04']
      }
    }
  }

};
