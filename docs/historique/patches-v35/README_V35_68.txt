Progressions CE2 — V35.68

Rappels des événements de l’école — septembre / octobre 2026.

Comportement :
- J-1 : popup « Demain » ;
- Jour J : popup « Aujourd’hui » ;
- fermeture uniquement par le bouton « J’ai lu » ;
- après validation, le rappel ne réapparaît plus dans la journée ;
- J-1 et Jour J sont mémorisés séparément ;
- événements multiples regroupés dans une seule popup.

Architecture / sécurité :
- aucune connexion Google Agenda depuis Progressions CE2 ;
- aucun OAuth / token dans le dépôt ;
- aucune donnée élève ;
- les événements scolaires utiles sont copiés localement dans `evenements-ecole.js`.

Fichiers ajoutés :
- evenements-ecole.js
- rappels-evenements.js
- rappels-evenements.css

Fichiers modifiés :
- index.html
- CHANGELOG.md

Version affichée dans l’onglet : V35.68.
