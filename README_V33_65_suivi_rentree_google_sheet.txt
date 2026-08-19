# V33.65 — Suivi de rentrée relié au Google Sheet

Progressions CE2 :
- correction du 0/0 : le module réutilise maintenant la même liste que Vue élèves ;
- lecture de la feuille `suivi_rentree` via l'API Apps Script ;
- enregistrement de Fiche / Assurance / Coop / montant / nom sur le chèque / note dans Google Sheet ;
- copie locale conservée comme secours si le réseau ou Apps Script est indisponible ;
- bouton « Qui manque quoi ? » alimenté par les données synchronisées ;
- état de synchronisation affiché dans le bloc.

API Apps Script V2.5 :
- nouvelles actions `suivi_rentree` et `save_suivi_rentree` ;
- protection de ces deux actions avec `TABLET_DEVICE_KEY` ;
- prise en compte de CHAM et de la colonne `photo` dans `eleves` ;
- compatibilité conservée avec les anciennes actions Maître Hibou / Progressions CE2.

Google Sheet attendu :
- eleves : prenom | initiale | naissance | sexe | actif | CHAM | photo
- suivi_rentree : prenom | fiche_renseignements | assurance | coop_mode | coop_montant | nom_cheque | note

Après remplacement de Code.gs : créer une nouvelle version du déploiement Web App Apps Script.
