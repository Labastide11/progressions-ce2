PATCH V34.67 — Espace Parents : calendrier hebdomadaire complet des devoirs

Fichiers modifiés :
- parents.js
- parents.css
- parents.html

Nouveautés :
- Chaque semaine de devoirs affiche maintenant les 7 jours, du lundi au dimanche.
- Lundi, mardi, jeudi et vendredi restent visibles comme jours de classe.
- Le mercredi affiche explicitement « Pas de classe ».
- Samedi et dimanche affichent « Week-end ».
- Les jours fériés et journées sans classe sont affichés explicitement.
- Les vacances scolaires utilisent une couleur bleu-turquoise spécifique et apparaissent également sur les jours du week-end concernés.
- Les jours de classe sans devoir affichent « Classe · rien à préparer » : aucun trou visuel dans la semaine.
- Les jours d'évaluation et les jours avec petit travail sont signalés dans le mini-calendrier, tandis que les détails complets restent affichés sous le calendrier.

Règles conservées :
- semaine avec évaluation allégée ;
- pas de Jour J, Défi du jour ou Défi famille pendant une semaine d'évaluation ;
- pas de devoir supplémentaire le jour même de l'évaluation ;
- jours sans classe = aucun devoir associé ;
- mode test enseignant conservé.
