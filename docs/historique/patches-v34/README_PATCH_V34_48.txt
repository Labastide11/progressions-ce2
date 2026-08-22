Progressions CE2 — V34.48 — Étape 1 : Calendrier Parents fiable

Objectif : l’Espace Parents ne doit plus afficher de journée de classe fictive.

Modifications :
- `public-emploi-du-temps.js` ne génère plus d’emploi du temps de secours ;
- seules les journées présentes dans les données détaillées sont considérées comme des jours de classe ;
- les vacances portent leur nom ;
- les jours fériés portent leur nom ;
- le 7 mai 2027 est identifié comme pont de l’Ascension ;
- les semaines 1 et 2 de septembre sont désormais de vraies semaines détaillées P1 ;
- la prochaine journée affichée est recherchée dans le calendrier réel ;
- aucune donnée des 34 semaines P1→P5 déjà détaillées n’a été supprimée.

Fichiers modifiés :
- public-emploi-du-temps.js
- emploi-du-temps-data-p1.js
- parents.js
- parents.css
- parents.html
- titres HTML V34.48
- CHANGELOG.md
