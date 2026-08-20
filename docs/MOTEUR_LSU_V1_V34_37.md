# Moteur de synthèse LSU V1 — V34.37

Ce module est volontairement **indépendant de l’interface**. Il n’est chargé par aucune page HTML en V34.37.

## Principes codés

- S1 = P1 + P2 ; S2 = P3 + P4 + P5.
- A = évaluation de référence ou observation ciblée liée à une évaluation.
- B = trace formative : cahier du jour, exercice de séance, observation quotidienne.
- C = Maître Hibou : progression/autonomie/répétition.
- D = récompenses/records : information, jamais décision LSU.
- Aucune moyenne arithmétique des niveaux.
- Une trace C ne peut jamais remplacer ou écraser une preuve A.
- Des traces B/C récentes et concordantes peuvent provoquer `a_reexaminer_progression` ou `a_surveilleur`, sans modifier automatiquement le niveau A.
- Une ancienne difficulté n’abaisse pas éternellement une maîtrise récente consolidée.
- `Dépassé` à l’échelle matière exige des traces explicites de transfert ; le moteur ne le déduit pas d’un simple taux de réussite.
- Une couverture < 40 % ne produit pas de suggestion matière.
- Une compétence `lsuCore` durablement fragile peut produire une vigilance pédagogique si la difficulté est répétée dans le temps.

## Entrées prévues

Le moteur accepte directement les structures déjà produites par Progressions CE2 / Apps Script :
- `traces_evaluations` : `competence_code`, `niveau_lsu`, `source`, `evaluation_id`, `date`...
- parcours Maître Hibou : `competence_code`, `mastery_status`, `help_used`, `learning_session_id`, `date`...

## API JavaScript

- `LSUSynthesisEngine.summarizeCompetence(...)`
- `LSUSynthesisEngine.summarizeSubject(...)`
- `LSUSynthesisEngine.normalizeLevel(...)`
- `LSUSynthesisEngine.classifyTeachingTrace(...)`

Le module fonctionne dans le navigateur (`window.LSUSynthesisEngine`) et sous Node.js (`require`).

## Compétences structurantes

Le moteur sait déjà lire :

```js
{ code: '...', lsuCore: true, lsuCoreGroup: 'comprehension' }
```

ou un dictionnaire `coreByCode` fourni à `summarizeSubject`.

En V34.37, le moteur est prêt pour ces marqueurs mais **aucun marquage massif n’est imposé dans `data.js`** : cela permettra de valider séparément les codes canoniques structurants avant branchement.

## Tests

`node tools/test_lsu_engine.js`

Les 8 scénarios couvrent : preuve forte unique, progression consolidée, rôle des traces B, rôle de Maître Hibou, Hibou seul insuffisant, vigilance structurante, profil matière avec vigilance, couverture insuffisante.
