PATCH PROGRESSIONS CE2 — V33.83 — DIAGNOSTIC QUESTIONS

Fichiers à copier à la racine du projet :
- index.html (remplace la version précédente)
- questions-eleves.js (remplace la version précédente)
- questions-eleves.css (remplace la version précédente)

Corrections V33.83 :
1. L’ouverture de « Questions des élèves » force désormais une lecture fraîche de l’API.
2. Une erreur API reste affichée : elle n’est plus remplacée par « 0 question affichée ».
3. « Aucune question » n’apparaît que si l’API a réellement répondu correctement avec 0 résultat pour le filtre.
4. Une ancienne API qui renvoie la liste des élèves à la place des questions est détectée explicitement.
5. Une réponse contenant des lignes mais aucun champ de question exploitable produit un diagnostic explicite.
6. Nouveau cache V33.83 pour ne pas réutiliser les données de diagnostic des versions précédentes.
7. <title> et versions CSS/JS passent à V33.83.

API attendue : V2.7.5 déployée comme application Web.
