PATCH V34.63 — Calendrier scolaire dans les devoirs P1 à P5

Fichiers à remplacer / ajouter :
- parents.js
- parents.css
- parents.html
- data/calendrier-scolaire-2026-2027.js (nouveau)

Modifications :
- calendrier scolaire 2026-2027 Zone C / académie de Montpellier intégré ;
- bandeaux de vacances affichés dans la dernière semaine de classe avant chaque congé ;
- jours fériés / jours sans classe pertinents affichés dans la semaine concernée ;
- tout devoir placé par erreur sur un jour sans classe est automatiquement masqué ;
- le vendredi 7 mai 2027 sans classe est pris en compte ;
- titre HTML mis à jour en V34.63.

Vacances Zone C intégrées : Toussaint, Noël, hiver, printemps, été.
Jours sans classe affichés : 11 novembre 2026, 6 mai 2027, 7 mai 2027, 17 mai 2027.

Règle pédagogique conservée : ne pas charger artificiellement le dernier soir avant les vacances.
