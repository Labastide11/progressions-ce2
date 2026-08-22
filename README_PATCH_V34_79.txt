V34.79 — Sécurisation des métadonnées élèves

OBJECTIF
Retirer du dépôt GitHub public les métadonnées élèves qui étaient embarquées dans data/enseignant-eleves-meta.js.

MODIFICATIONS
- suppression de data/enseignant-eleves-meta.js ;
- suppression de son chargement dans index.html et vue-eleves.html ;
- app.js et vue-eleves.js utilisent désormais uniquement les métadonnées synchronisées dans progressions_ce2_classe_meta_v1 ;
- suivi-rentree.js n’utilise plus le fichier statique comme liste de secours ;
- les métadonnées (prénom, initiale, naissance, sexe, CHAM, photo) viennent de l’API V2.8.2 protégée par la clé appareil ;
- mise à jour des balises <title> en V34.79.

COMPATIBILITÉ
- Maître Hibou : aucune modification nécessaire ;
- API : nécessite V2.8.2 confidentialité croisée, déjà validée ;
- Google Sheet : aucune modification ;
- Espace Remplaçant : aucune modification.

IMPORTANT POUR LE PATCH
Si vous appliquez seulement le patch ZIP sur un dossier V34.78 existant, supprimez manuellement data/enseignant-eleves-meta.js avant le commit GitHub.
