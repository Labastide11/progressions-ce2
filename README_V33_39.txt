# V33.39 — Espaces publics autonomes

- Espace Remplaçant : emploi du temps corrigé avec repli automatique sur l’emploi du temps hebdomadaire local ; aucune dépendance Google ni localStorage côté remplaçant.
- Nouvel espace Parents (`parents.html`) : semaine, apprentissages de la période depuis `data.js`, vie de classe / EMC-EVAR-EMI, travail à la maison, infos-documents et emploi du temps local.
- Bouton `🌐 Mettre à jour les espaces` : génération de ZIP séparés Remplaçant et Parents contenant uniquement les fichiers `data/` à publier.
- Les pages publiques n’appellent ni Google Sheet, ni Apps Script, ni API distante.
