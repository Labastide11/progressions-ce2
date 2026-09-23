/* V36.91 — Cahier journal : source canonique = emploi du temps détaillé + dictée du jour visible.
   Le journal reprend la journée datée et ajoute, au premier bloc du matin,
   la dictée issue de la banque annuelle DICTEES_CE2 (P1 à P5). */
(function (global) {
  'use strict';
  const MONTHS = {
    janvier: 0, fevrier: 1, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
    juillet: 6, aout: 7, août: 7, septembre: 8, octobre: 9, novembre: 10, decembre: 11, décembre: 11
  };
  const PERIODS = ['p1','p2','p3','p4','p5'];

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
    const m = clean.match(/(?:lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
    if (!m) return '';
    const month = MONTHS[m[2]];
    if (month === undefined) return '';
    return `${m[3]}-${String(month + 1).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
  }
  function weekContextForDate(date) {
    const data = global.PROGRESSIONS_EDT_DATA || {};
    const target = String(date || '').slice(0, 10);
    for (const period of PERIODS) {
      const weeks = data[period + 'DetailedWeeks'];
      if (!Array.isArray(weeks)) continue;
      for (let wi = 0; wi < weeks.length; wi++) {
        const week = weeks[wi];
        if (!week || !Array.isArray(week.days)) continue;
        for (const dayEntry of week.days) {
          if (!Array.isArray(dayEntry) || !Array.isArray(dayEntry[1])) continue;
          if (dateKeyFromFrenchLabel(dayEntry[0]) === target) {
            return { period, weekIndex: wi, week, dayEntry };
          }
        }
      }
    }
    return null;
  }
  function planForContext(ctx) {
    const bank = global.DICTEES_CE2 || {};
    if (!ctx) return null;
    if (ctx.period === 'p1') return bank.p1 && bank.p1[ctx.weekIndex + 1] || null;
    const arr = bank[ctx.period];
    return Array.isArray(arr) ? (arr[ctx.weekIndex] || null) : null;
  }
  function listWords(value) {
    if (Array.isArray(value)) return value.join(', ');
    return String(value || '').trim();
  }
  function flashesFor(plan) {
    if (!plan) return [];
    const src = Array.isArray(plan.flashes) ? plan.flashes : (Array.isArray(plan.flash) ? plan.flash : []);
    return src.map(item => Array.isArray(item) ? item[item.length - 1] : item).filter(Boolean);
  }
  function dictationForDate(date) {
    const ctx = weekContextForDate(date);
    const plan = planForContext(ctx);
    if (!ctx || !plan) return null;
    const dow = new Date(String(date).slice(0,10) + 'T12:00:00').getDay();
    const flash = flashesFor(plan);
    let label = 'Dictée du jour';
    let text = '';

    if (dow === 1) {
      const words = listWords(plan.priority || plan.words);
      label = 'Dictée de mots du jour';
      text = words && !/^pas de banque/i.test(words) ? words : (plan.note || 'Dictée diagnostique très courte.');
    } else if (dow === 2) {
      text = flash[0] || plan.final || listWords(plan.words);
    } else if (dow === 4) {
      text = flash[1] || flash[0] || plan.final || listWords(plan.words);
    } else if (dow === 5) {
      text = flash[2] || flash[1] || flash[0] || plan.final || listWords(plan.words);
      if (plan.final && text !== plan.final) text += `\n⭐ Dictée bilan : ${plan.final}`;
    }
    if (!text) return null;
    return { label, text, theme: plan.theme || plan.support || '', correction: 'Correction juste en dessous dans le cahier du jour.' };
  }
  function appendDictation(rows, date) {
    const dictee = dictationForDate(date);
    if (!dictee || !Array.isArray(rows)) return rows;
    const target = rows.find(function(row){
      if (!Array.isArray(row)) return false;
      const time = String(row[0] || '');
      const title = normalizeText(`${row[1] || ''} ${row[2] || ''}`);
      return /^9h/.test(time) && !title.includes('evaluation nationale') && !title.includes('photographe');
    });
    if (!target) return rows;
    const header = `✍️ ${dictee.label}${dictee.theme ? ' — ' + dictee.theme : ''}`;
    const block = `📌 ${header.toUpperCase()} : ${dictee.text} — ✅ CORRECTION : ${dictee.correction}`;
    const current = String(target[2] || '').trim();
    if (!normalizeText(current).includes(normalizeText(dictee.text))) {
      target[2] = current ? `${current}\n\n${block}` : block;
    }
    return rows;
  }
  function rowsForDate(date) {
    const target = String(date || '').slice(0, 10);
    if (!target) return [];
    const ctx = weekContextForDate(target);
    if (!ctx) return [];
    const rows = ctx.dayEntry[1];
    const adapted = rows.map(function (row) {
      if (!Array.isArray(row)) return row;
      const copy = row.slice();
      copy[3] = row[4] || row[3] || 'common';
      return copy;
    });
    return appendDictation(adapted, target);
  }
  function install() {
    if (!global.ProgressionsEDT) return false;
    global.ProgressionsEDT.getDetailedDayRows = rowsForDate;
    global.ProgressionsEDT.getDictationForDate = dictationForDate;
    return true;
  }
  if (!install()) document.addEventListener('DOMContentLoaded', install, { once: true });
})(window);
