PATCH PROGRESSIONS CE2 — V33.84 — DIAGNOSTIC API
================================================

But : identifier exactement l'API Apps Script appelée par Progressions CE2.

Fichiers à copier à la racine du projet :
- index.html (remplace l'ancien)
- questions-eleves.js (remplace l'ancien)
- questions-eleves.css (remplace l'ancien)

Nouveautés V33.84 :
- affiche l'API actuellement enregistrée dans ce navigateur (URL abrégée) ;
- interroge action=diagnostic_questions pour afficher la version réellement déployée ;
- teste directement action=get_questions_classe ;
- indique clairement : OK, liste des élèves reçue, format inattendu ou erreur de connexion ;
- bouton « 🔎 Tester l'API » pour relancer le diagnostic sans recharger la page ;
- lecture des questions V33.83 conservée ;
- nouveau cache V33.84 ;
- balise <title> mise à jour en V33.84.

Résultat attendu avec l'API correcte :
Version détectée : 2.7.5
Test classe : OK — ... question(s) testée(s)
