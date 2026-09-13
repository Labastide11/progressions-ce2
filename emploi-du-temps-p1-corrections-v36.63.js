/* V36.63 — Correctifs P1 : horaires réalistes, lecture 14h, routines intégrées, événements école */
(function (global) {
  'use strict';

  const data = global.PROGRESSIONS_EDT_DATA = global.PROGRESSIONS_EDT_DATA || {};
  const weeks = Array.isArray(data.p1DetailedWeeks) ? data.p1DetailedWeeks : [];
  if (!weeks.length) return;

  function eachDay(callback) {
    weeks.forEach(week => {
      if (!week || !Array.isArray(week.days)) return;
      week.days.forEach(dayEntry => {
        if (!Array.isArray(dayEntry) || !Array.isArray(dayEntry[1])) return;
        callback(dayEntry[0], dayEntry[1], week);
      });
    });
  }

  function startsWithTime(row, prefix) {
    return Array.isArray(row) && String(row[0] || '').startsWith(prefix);
  }

  function textOf(row) {
    return (String(row[1] || '') + ' ' + String(row[2] || '') + ' ' + String(row[5] || '')).toLowerCase();
  }

  function removeInjectedRoutines(rows) {
    // Supprime la fausse ligne de 5 min qui ajoutait du temps à la journée.
    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i];
      if (!Array.isArray(row)) continue;
      const subject = String(row[1] || '');
      if (subject.includes('Routine écriture — Majuscule')) {
        rows.splice(i, 1);
      }
    }

    // Retire la routine maths V36.62 ajoutée devant une séance déjà minutée.
    rows.forEach(row => {
      if (!Array.isArray(row)) return;
      const activity = String(row[2] || '');
      if (!activity.includes('Routine maths — 10 à 15 min')) return;

      const marker = '<br><br>';
      const cut = activity.indexOf(marker);
      if (cut >= 0) {
        row[2] = activity.slice(cut + marker.length);
      }
    });
  }

  function integrateCapitalRoutine(rows) {
    // La majuscule reste travaillée, mais DANS un créneau existant.
    const target = rows.find(row => {
      if (!Array.isArray(row)) return false;
      const s = String(row[1] || '').toLowerCase();
      return s.includes('copie') || s.includes('dictée') ||
             s.includes('écrits courts') || s.includes('production d’écrits') ||
             (String(row[0] || '').startsWith('10h') && s.includes('français'));
    });

    if (!target) return;
    const activity = String(target[2] || '');
    if (activity.includes('Majuscule du jour')) return;

    target[2] =
      '<strong>✍️ Majuscule du jour — 5 min incluses dans ce créneau.</strong> ' +
      'Observer le geste, tracer 3 à 5 fois puis réemployer la lettre dans un mot. ' +
      'Ce temps remplace 5 minutes de l’activité prévue : il ne s’ajoute pas à l’emploi du temps.<br><br>' +
      activity;
  }

  function hasReading(rows) {
    return rows.some(row =>
      Array.isArray(row) &&
      String(row[0] || '') === '14h–14h15' &&
      String(row[1] || '').toLowerCase().includes('lecture')
    );
  }

  function isFrom14SeptemberOnward(label) {
    const text = String(label || '').toLowerCase();
    if (text.includes('octobre 2026')) return true;
    const match = text.match(/(\d{1,2})\s+septembre\s+2026/);
    return !!match && Number(match[1]) >= 14;
  }

  function addReadingAndRebalance(label, rows) {
    // Ne touche pas aux journées déjà réellement vécues avant le 14 septembre.
    if (!isFrom14SeptemberOnward(label) || hasReading(rows)) return;

    const firstAfternoon = rows.findIndex(row =>
      Array.isArray(row) && /^14h/.test(String(row[0] || ''))
    );
    if (firstAfternoon < 0) return;

    const reading = [
      '14h–14h15',
      'Quart d’heure de lecture',
      'Lecture autonome + rotation Maître Hibou. 2 tablettes + 2 PC ; les autres élèves lisent en autonomie.',
      'LIT-P1-01 · Entrer dans son parcours de lecteur.',
      'french',
      'Rituel quotidien'
    ];

    const day = String(label || '').toLowerCase();

    // LUNDI : EPS 1h45 -> 1h30. On conserve le reste de l’après-midi.
    if (day.startsWith('lundi')) {
      const eps = rows.find(row =>
        Array.isArray(row) &&
        String(row[0] || '') === '14h–15h45' &&
        String(row[1] || '').toLowerCase().includes('eps')
      );
      if (eps) eps[0] = '14h15–15h45';
    }

    // MARDI : préserver 30 min d’anglais, donc décaler le bloc suivant.
    if (day.startsWith('mardi')) {
      const english = rows.find(row =>
        Array.isArray(row) &&
        String(row[0] || '') === '14h–14h30' &&
        String(row[1] || '').toLowerCase().includes('anglais')
      );
      if (english) english[0] = '14h15–14h45';

      const next = rows.find(row =>
        Array.isArray(row) &&
        String(row[0] || '') === '14h30–15h45'
      );
      if (next) next[0] = '14h45–15h45';
    }

    // JEUDI : sciences 14h–15h -> 14h15–15h.
    if (day.startsWith('jeudi')) {
      const science = rows.find(row =>
        Array.isArray(row) &&
        String(row[0] || '') === '14h–15h'
      );
      if (science) science[0] = '14h15–15h';
    }

    // VENDREDI : problème / maths 14h–14h35 -> 14h15–14h45.
    if (day.startsWith('vendredi')) {
      const maths = rows.find(row =>
        Array.isArray(row) &&
        String(row[0] || '') === '14h–14h35'
      );
      if (maths) maths[0] = '14h15–14h45';

      const eps = rows.find(row =>
        Array.isArray(row) &&
        String(row[0] || '') === '14h35–15h45' &&
        String(row[1] || '').toLowerCase().includes('eps')
      );
      if (eps) eps[0] = '14h45–15h45';
    }

    rows.splice(firstAfternoon, 0, reading);
  }

  function ensureAfternoonBreak(label, rows) {
    if (!isFrom14SeptemberOnward(label)) return;
    const exists = rows.some(row =>
      Array.isArray(row) && String(row[0] || '') === '15h45–16h'
    );
    if (exists) return;

    const insertAt = rows.findIndex(row =>
      Array.isArray(row) && /^16h/.test(String(row[0] || ''))
    );
    if (insertAt < 0) return;

    rows.splice(insertAt, 0, [
      '15h45–16h',
      'Récréation',
      'Récréation de l’après-midi.',
      '',
      'break',
      'Pause'
    ]);
  }

  function addEventMarker(label, rows) {
    const date = String(label || '').toLowerCase();

    if (date.includes('vendredi 18 septembre 2026')) {
      if (!rows.some(row => textOf(row).includes('exercice incendie'))) {
        const idx = rows.findIndex(row => startsWithTime(row, '11h15'));
        rows.splice(idx >= 0 ? idx + 1 : rows.length, 0, [
          '11h30 · heure prévue',
          'Sécurité — Exercice incendie',
          'Exercice incendie de l’école. Prévoir l’interruption de la séance en cours et la reprise seulement si le temps le permet.',
          'Sécurité : connaître et appliquer la procédure d’évacuation.',
          'emc',
          'Événement école'
        ]);
      }
    }

    if (date.includes('lundi 28 septembre 2026')) {
      if (!rows.some(row => textOf(row).includes('ppms'))) {
        const idx = rows.findIndex(row => startsWithTime(row, '11h15'));
        rows.splice(idx >= 0 ? idx + 1 : rows.length, 0, [
          '11h30 · heure prévue',
          'Sécurité — PPMS attentat',
          'Exercice PPMS attentat. La séance de mathématiques est interrompue ; reprise uniquement si le temps disponible le permet.',
          'Sécurité : connaître et appliquer les consignes du PPMS.',
          'emc',
          'Événement école'
        ]);
      }
    }

    if (date.includes('lundi 12 octobre 2026') || date.includes('mardi 13 octobre 2026')) {
      if (!rows.some(row => textOf(row).includes('photographe'))) {
        rows.unshift([
          'Horaire selon passage',
          'Photographe scolaire',
          'Passage du photographe scolaire. Les séances de la journée peuvent être légèrement décalées ; aucune nouvelle notion indispensable ne doit dépendre de ce créneau.',
          'Vie de l’école.',
          'common',
          'Événement école'
        ]);
      }
    }
  }

  function reduceAssessmentLoad(label, rows) {
    const date = String(label || '').toLowerCase();

    if (date.includes('lundi 5 octobre 2026')) {
      rows.forEach(row => {
        if (!Array.isArray(row)) return;
        if (String(row[5] || '').includes('Dictée évaluée')) {
          row[5] = 'Dictée préparée — trace formative';
        }
        if (String(row[1] || '').toLowerCase().includes('histoire') &&
            String(row[5] || '').includes('Évaluation de référence')) {
          row[5] = 'Trace formative — frise et repères';
          row[2] = String(row[2] || '').replace('Évaluation de référence :', 'Réinvestissement :');
        }
      });
    }

    if (date.includes('vendredi 9 octobre 2026')) {
      rows.forEach(row => {
        if (!Array.isArray(row)) return;
        const subject = String(row[1] || '').toLowerCase();
        if ((subject.includes('français') || subject.includes('vocabulaire')) &&
            String(row[5] || '').includes('Évaluation ciblée')) {
          row[5] = 'Trace formative — Lexique P1';
        }
        if (subject.includes('eps') && String(row[5] || '').toLowerCase().includes('évaluation')) {
          row[5] = 'Observation pratique — jeux collectifs';
        }
      });
    }
  }

  function fixWording(rows) {
    rows.forEach(row => {
      if (!Array.isArray(row)) return;
      row[2] = String(row[2] || '').replace('Je contient beaucoup de mots', 'Je contiens beaucoup de mots');

      // Évite les doublons manifestes de codes EPS sans inventer un nouveau code.
      if (String(row[1] || '').toLowerCase().includes('eps')) {
        const comp = String(row[3] || '');
        if ((comp.match(/EPS-P1-01/g) || []).length > 1) {
          row[3] = 'EPS-P1-01 à 06 · Compétences observées selon la situation.';
        }
      }
    });
  }

  eachDay((label, rows) => {
    removeInjectedRoutines(rows);
    integrateCapitalRoutine(rows);
    addReadingAndRebalance(label, rows);
    ensureAfternoonBreak(label, rows);
    addEventMarker(label, rows);
    reduceAssessmentLoad(label, rows);
    fixWording(rows);
  });

  // Marqueur de version pour diagnostic.
  data.p1CorrectionsVersion = '36.63';
})(window);
