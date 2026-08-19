PATCH Progressions CE2 — V33.81 — Questions des élèves
17/08/2026

Ce patch est à appliquer sur ta base Progressions CE2 V33.79.

Fichiers à copier/remplacer à la racine du projet :
- index.html              (à remplacer)
- questions-eleves.css   (nouveau)
- questions-eleves.js    (nouveau)

Fonctionnement :
- l'illustration des deux élèves du bloc « Suivi des élèves » devient le bouton d'accès ;
- ouverture d'une popup « Questions des élèves » ;
- filtres : Toutes / Nouvelles / À expliquer / Expliquées + matière ;
- affichage lisible : prénom, matière, question corrigée, date/heure, visibilité, statut ;
- réponse IA et question originale accessibles dans le détail ;
- actions directes : À expliquer, Expliquée, Privée / Classe ;
- les questions « Vedette » sont préservées ;
- badge du nombre de questions à traiter sur l'illustration ;
- cache local de 5 minutes pour limiter les appels Apps Script ;
- balise <title> mise à jour en V33.81.

Pré-requis : API Maître Hibou / Progressions V2.7.5 déployée.

Important : conserver tous les autres fichiers du projet. Ce ZIP est un PATCH, pas l'archive complète.
