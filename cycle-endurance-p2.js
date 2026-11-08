/* Progressions CE2 — Cycle endurance, lundis après-midi P2 (2 nov. au 14 déc. 2026).
   La source d'origine est conservée ; on ne change que les séances EPS datées.
   Doit être chargé après emploi-du-temps-data-p2.js et avant emploi-du-temps-ui.js. */
(function (global) {
  'use strict';
  var data = global.PROGRESSIONS_EDT_DATA;
  if (!data || !Array.isArray(data.p2DetailedWeeks)) return;

  var progression = {
    '2 novembre 2026': {
      theme: 'Découvrir l’endurance : courir lentement et régulièrement',
      action: 'Échauffement progressif ; course et marche alternées ; retrouver une allure qui permet de parler ; retour au calme.'
    },
    '9 novembre 2026': {
      theme: 'Trouver son allure : ne pas partir trop vite',
      action: 'Jeu d’allures et course lente avec repères ; observer sa respiration ; retour au calme.'
    },
    '16 novembre 2026': {
      theme: 'Courir plus longtemps à allure régulière',
      action: 'Petites séquences de course adaptées aux élèves, séparées par des récupérations ; apprendre à gérer son effort.'
    },
    '23 novembre 2026': {
      theme: 'Gérer son effort sur un parcours balisé',
      action: 'Courir à son rythme sur un circuit sécurisé ; utiliser des repères de passage ; récupérer en marchant.'
    },
    '30 novembre 2026': {
      theme: 'Améliorer sa régularité',
      action: 'Parcours à allure personnelle ; comparer ses passages ; éviter les accélérations au départ ; retour au calme.'
    },
    '7 décembre 2026': {
      theme: 'Préparer un défi de course longue',
      action: 'Choisir un objectif réaliste ; enchaîner des temps de course à allure maîtrisée ; récupérer selon ses besoins.'
    },
    '14 décembre 2026': {
      theme: 'Défi endurance : courir à son rythme et mesurer ses progrès',
      action: 'Défi individuel non compétitif, adapté à chacun ; observer la régularité et les progrès ; bilan oral collectif.'
    }
  };


  var complements = {
    '2 novembre 2026': {subject: 'EMC — Coopérer et respecter les règles', activity: 'Identifier les règles d’un jeu collectif ; expliquer pourquoi on les respecte ; construire une affiche de classe.', objective: 'EMC-P2 · Respecter les règles collectives.', kind: 'emc'},
    '9 novembre 2026': {subject: 'Sciences — Les cinq sens', activity: 'Observer des situations et associer chaque sens à son organe ; expliquer comment nos sens nous renseignent.', objective: 'SCI-P2 · Identifier les cinq sens et leurs fonctions.', kind: 'science'},
    '16 novembre 2026': {subject: 'Arts plastiques — Le mouvement', activity: 'Observer des silhouettes en mouvement puis représenter un personnage qui court par le dessin.', objective: 'ART-P2 · Représenter le mouvement.', kind: 'arts'},
    '23 novembre 2026': {subject: 'EMC — Entraide et encouragements', activity: 'Distinguer encouragement et moquerie ; imaginer des phrases pour aider un camarade à persévérer.', objective: 'EMC-P2 · Coopérer et respecter autrui.', kind: 'emc'},
    '30 novembre 2026': {subject: 'Sciences — Les besoins du corps', activity: 'Identifier le rôle de l’eau, du repos et de l’activité physique dans la vie quotidienne.', objective: 'SCI-P2 · Reconnaître les besoins du corps.', kind: 'science'},
    '7 décembre 2026': {subject: 'Arts plastiques — Parcours et paysages', activity: 'Dessiner un parcours de course en utilisant des repères, puis présenter son dessin à un camarade.', objective: 'ART-P2 · Produire et expliquer une représentation.', kind: 'arts'},
    '14 décembre 2026': {subject: 'EMC — Mes progrès et ceux des autres', activity: 'Mettre des mots sur ses progrès, écouter les réussites des autres et construire un bilan collectif.', objective: 'EMC-P2 · Exprimer ses progrès avec respect.', kind: 'emc'}
  };

  data.p2DetailedWeeks.forEach(function (week) {
    if (!week || !Array.isArray(week.days)) return;
    week.days.forEach(function (day) {
      if (!Array.isArray(day) || !Array.isArray(day[1])) return;
      var date = String(day[0] || '').trim().toLowerCase();
      if (!/^lundi\s+/.test(date)) return;
      var key = Object.keys(progression).find(function (d) { return date.indexOf(d) !== -1; });
      if (!key) return;
      var lesson = progression[key];
      day[1].slice().forEach(function (row) {
        if (!Array.isArray(row)) return;
        var hour = String(row[0] || '');
        var title = String(row[1] || '');
        var kind = String(row[4] || '');
        if (!/^14h15/.test(hour) || !(/eps/i.test(kind) || /^eps$/i.test(title))) return;
        row[0] = '14h15–15h';
        row[1] = 'EPS — Cycle endurance';
        row[2] = '<strong>Préparation à la course longue — ' + lesson.theme + '.</strong><br>' +
          lesson.action + '<br><em>Sécurité : parcours reconnu et balisé, chaussures adaptées, hydratation, ' +
          'échauffement et retour au calme ; chacun adapte son rythme, sans obligation de performance.</em>';
        row[3] = 'EPS-P2-END · Adapter son allure, courir progressivement plus longtemps et respecter les règles de sécurité.';
        row[4] = 'eps';
        row[5] = 'Cycle endurance — ' + key;
        if (row.length > 6) row[6] = null;
        var extra = complements[key];
        var newRow = ['15h–15h45', extra.subject, extra.activity, extra.objective, extra.kind, 'Séance en classe'];
        var index = day[1].indexOf(row);
        if (index >= 0) day[1].splice(index + 1, 0, newRow);
      });
    });
  });
})(window);
