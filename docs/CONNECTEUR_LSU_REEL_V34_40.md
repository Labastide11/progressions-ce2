# V34.40 — Connecteur LSU réel en lecture seule

## Objet

Cette version branche le moteur LSU V1 sur la structure réelle renvoyée par l'action Apps Script `student_snapshot`, **sans créer d'interface et sans aucune écriture**.

Le module `lsu-real-connector.js` est chargé uniquement sur `mon-suivi.html`. Son chargement ne déclenche **aucun appel réseau**. Un diagnostic est lancé uniquement sur demande explicite (pour l'instant depuis la console de développement ou par un futur écran).

## Sources utilisées

- `snapshot.evaluation_traces` → preuves enseignantes A ou traces formatives B selon `source` et `evaluation_id` ;
- `snapshot.reussites` → Maître Hibou C lorsque `source` identifie Hibou ou qu'un `mastery_status` est présent ;
- `snapshot.competences` + `snapshot.records` → D, comptés à titre informatif seulement ;
- `snapshot.questions` → ignorées par le moteur LSU.

## Semestres

- S1 = P1 + P2 ;
- S2 = P3 + P4 + P5 ;
- pour les codes annuels (`ART-ANN-*`, `MUS-ANN-*`) sans période, le connecteur utilise la date de la trace afin d'éviter qu'une même observation soit injectée dans les deux semestres.

## Lecture seule garantie

Le connecteur :

- appelle seulement `action=student_snapshot` ;
- ne contient aucun `POST` ;
- ne contient aucune action `save_*`, `enregistrer_*` ou `update_*` ;
- ne modifie pas `localStorage` ;
- ne crée ni ne modifie aucune trace dans Google Sheets ;
- ne valide aucun niveau à la place de l'enseignant.

## Utilisation de diagnostic (console navigateur)

Sur `mon-suivi.html`, ouvrir les outils de développement puis exécuter :

```js
const rapport = await LSURealConnector.diagnosticStudent('Prénom', 'S1');
LSURealConnector.consoleDiagnostic(rapport);
```

Le résultat est un objet en mémoire contenant, pour chaque matière :

- le positionnement suggéré ;
- la couverture documentaire ;
- solides / consolidation / priorité / non documenté ;
- tendance et confiance ;
- vigilances structurantes ;
- synthèse textuelle ;
- détail compétence par compétence.

`rapport.markdown` contient une version lisible du rapport de diagnostic.

## Important

V34.40 n'affiche rien dans l'interface. Elle ne lance pas automatiquement de diagnostic au chargement de la page. Cette version sert uniquement à éprouver le moteur sur de vraies données avant de concevoir l'écran LSU.
