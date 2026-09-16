# PATCH V36.39 — Suivi du comportement

## Fichiers du site à remplacer / ajouter
- `index.html`
- `suivi-comportement.html`
- `suivi-comportement.css`
- `suivi-comportement.js`

## Nouvelle page
Le bouton **Suivi du comportement** ouvre maintenant une vraie page de travail avec :

- les élèves sous forme de cartes avec leur portrait ;
- sélection automatique de la date du jour ;
- bouton **❌ +1** pour ajouter rapidement une croix ;
- bouton **＋ Observation** pour saisir un fait daté ;
- types : avertissement, observation positive, observation neutre ;
- nombre de croix visible directement sur chaque carte ;
- résumé de la journée : croix, élèves concernés, observations, observations positives ;
- historique récent par élève ;
- résumé des 4 dernières semaines pour distinguer les faits ponctuels des faits répétés ;
- affichage téléphone / tablette / PC responsive.

## Données
La page utilise la structure de l’onglet Google Sheets `comportement` :

`event_id | date | prenom | croix | observation | type | synchro`

Chaque couple **élève + date + type** possède un `event_id` stable. Une nouvelle croix modifie donc la ligne du jour au lieu de créer des doublons.

## Sécurité et synchronisation
Les saisies sont d’abord conservées localement afin qu’une coupure de connexion ne fasse pas perdre une observation.

Pour la synchronisation complète avec l’onglet `comportement`, déployer également le fichier Apps Script **V2.9.2 — suivi du comportement** fourni séparément. Après écriture, la page relit l’API et ne considère l’événement comme synchronisé que si son `event_id` est retrouvé dans le Sheet.

Aucune donnée de comportement n’est envoyée vers l’Espace Parents.

## Version
- Base : V36.38
- Nouvelle version : **V36.39**
