Progressions CE2 — PATCH V34.65

Correctif ciblé : mode test devoirs.

Cause identifiée : parents.js utilisait la variable CAL pour le calendrier scolaire sans l'avoir déclarée. Cette erreur JavaScript pouvait interrompre l'affichage des devoirs et empêcher le mode test enseignant de fonctionner correctement.

Correction :
- déclaration robuste de CAL depuis window.CALENDRIER_SCOLAIRE_2026_2027 ;
- valeurs de secours si le calendrier n'est pas chargé ;
- version parents.html / parents.js mise à jour en V34.65.

Aucune modification des contenus de devoirs, évaluations, périodes ou du verrouillage calendrier/EDT V34.64.
