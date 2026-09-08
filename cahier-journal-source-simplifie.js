/* V36.52 — Cahier journal : source canonique = emploi du temps simplifié.
   Ce fichier ajoute à ProgressionsEDT.getDetailedDayRows(date) la journée datée
   issue des mêmes données détaillées que l'emploi du temps simplifié.
   Le cahier-journal.js existant peut ainsi recopier la journée réelle sans
   retomber sur l'ancienne trame hebdomadaire générique. */
(function (global) {
  'use strict';

  const MONTHS = {
    janvier: 0, fevrier: 1, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
    juillet: 6, aout: 7, août: 7, septembre: 8, octobre: 9, novembre: 10, decembre: 11, décembre: 11
  };

  function normalizeText(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function dateKeyFromFrenchLabel(label) {
    const clean = normalizeText(label).replace(/\b1er\b/g, '1');
    const m = clean.match(
      /(?:lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(\d{1,2})\s+([a-z]+)\s+(\d{4})/
    );
    if (!m) return '';

    const monthName = m[2];
    const month = MONTHS[monthName];
    if (month === undefined) return '';

    return `${m[3]}-${String(month + 1).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
  }

  function detailedWeeks() {
    const data = global.PROGRESSIONS_EDT_DATA || {};
    const weeks = [];

    Object.keys(data).forEach(function (key) {
      if (!/DetailedWeeks$/i.test(key)) return;
      const value = data[key];
      if (Array.isArray(value)) weeks.push.apply(weeks, value);
    });

    return weeks;
  }

  function rowsForDate(date) {
    const target = String(date || '').slice(0, 10);
    if (!target) return [];

    const matches = [];

    detailedWeeks().forEach(function (week) {
      if (!week || !Array.isArray(week.days)) return;

      week.days.forEach(function (dayEntry) {
        if (!Array.isArray(dayEntry) || !Array.isArray(dayEntry[1])) return;
        if (dateKeyFromFrenchLabel(dayEntry[0]) !== target) return;
        matches.push(dayEntry[1]);
      });
    });

    if (!matches.length) return [];

    // Même principe que la vue simplifiée : si une date existe plusieurs fois,
    // conserver la version la plus complète.
    matches.sort(function (a, b) { return b.length - a.length; });

    // Compatibilité avec cahier-journal.js V36.48 :
    // le journal historique lit la famille visuelle dans row[3].
    // Dans les données actuelles elle est en row[4].
    // On renvoie donc une copie adaptée sans modifier les données sources.
    return matches[0].map(function (row) {
      if (!Array.isArray(row)) return row;
      const copy = row.slice();
      copy[3] = row[4] || row[3] || 'common';
      return copy;
    });
  }

  function install() {
    if (!global.ProgressionsEDT) return false;
    global.ProgressionsEDT.getDetailedDayRows = rowsForDate;
    return true;
  }

  if (!install()) {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  }
})(window);
