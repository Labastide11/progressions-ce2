PATCH PROGRESSIONS CE2 — V33.82

Correction de la fenêtre « Questions des élèves » :
- n'affiche plus les élèves comme de fausses questions (« Question sans texte ») ;
- ignore toute entrée qui ne contient ni Question corrigée ni Question originale ;
- détecte le cas où une ancienne API renvoie la liste des élèves à la place des questions ;
- vide l'ancien cache de la V33.81 grâce à une nouvelle clé de cache ;
- affiche alors un message demandant de redéployer l'API V2.7.5.

Installation :
1. Copier index.html à la racine en remplaçant l'ancien.
2. Copier questions-eleves.js à la racine en remplaçant l'ancien.
3. questions-eleves.css est inclus par commodité ; il est identique visuellement à la V33.81.
4. Vérifier que l'API Apps Script V2.7.5 a bien été déployée comme nouvelle version du déploiement Web.

Titre HTML : V33.82 — Progressions CE2 — Ma classe au quotidien
