PATCH V34.64 — Verrouillage calendrier / emploi du temps

Fichiers à remplacer :
- index.html
- emploi-du-temps-ui.js
- data/calendrier-scolaire-2026-2027.js

Modifications :
- le calendrier scolaire commun est chargé avant l’interface de l’emploi du temps ;
- toute journée déclarée sans classe est automatiquement bloquée dans les vues détaillées P1 à P5 ;
- si des créneaux sont ajoutés par erreur sur un jour sans classe, ils sont supprimés à l’affichage et un avertissement est écrit dans la console ;
- une API ProgressionsSchoolCalendarGuard.canSchedule(date) permet aux évolutions futures de vérifier une date avant d’y programmer une séance ;
- les bandeaux « pas de classe / jour férié » sont affichés dans toutes les périodes quand une semaine porte une information calendrier ;
- ajout du lundi de Pâques 29 mars 2027 et des principaux jours fériés de l’année scolaire au calendrier commun ;
- aucune progression, séance ou date d’évaluation n’est déplacée par ce patch.
