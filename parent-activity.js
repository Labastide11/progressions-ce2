// V36.04 — Activité Espace Parents : correction chargement + séparation parents/tests.
(function(){
  'use strict';

  const ENDPOINT = 'https://script.google.com/macros/s/AKfycby5ZFxvBE-o7oO4Xc4mTZ7iQ5XjYe1_qiSsLnvEUxcR0ULsYtNQV41FgsLTaFA1PRmNLQ/exec';

  const $ = id => document.getElementById(id);

  const modal = $('parentActivityModal');
  const openBtn = $('parentActivityBtn');
  const closeBtn = $('parentActivityClose');
  const refreshBtn = $('parentActivityRefresh');
  const includeTests = $('parentActivityIncludeTests');

  if (!modal || !openBtn) return;

  const pageLabels = {
    'accueil': 'Accueil',
    'infos-classe': 'Infos de la classe',
    'devoirs': 'Devoirs',
    'emploi-du-temps': 'Emploi du temps',
    'ce-que-nous-apprenons': 'Ce que nous apprenons',
    'materiel-scolaire': 'Matériel scolaire',
    'cahier-famille-ecole': 'Cahier famille-école',
    'prochainement': 'Prochainement',
    'aider-mon-enfant': 'Aider mon enfant',
    'ecrans-numerique': 'Écrans & numérique',
    'ressources-utiles': 'Ressources utiles'
  };

  const langLabels = {
    'fr': 'Français',
    'es': 'Español',
    'en': 'English',
    'ar': 'العربية'
  };

  const deviceLabels = {
    'mobile': 'Mobile',
    'tablette': 'Tablette',
    'ordinateur': 'Ordinateur'
  };

  let lastData = null;

  function escapeHtml(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#39;'
    })[c]);
  }

  function jsonp(){
    return new Promise((resolve, reject) => {
      const callback = 'parentsStatsCb_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');

      const timer = setTimeout(() => finish(new Error('Délai dépassé')), 12000);

      function finish(err, data){
        clearTimeout(timer);
        try { delete window[callback]; } catch(e) {}
        script.remove();
        if (err) reject(err);
        else resolve(data);
      }

      window[callback] = data => finish(null, data);

      script.onerror = () => finish(new Error('Chargement impossible'));

      script.src =
        ENDPOINT +
        '?mode=stats&callback=' + encodeURIComponent(callback) +
        '&_=' + Date.now();

      document.head.appendChild(script);
    });
  }

  function number(value){
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function normalizeItems(value){
    if (Array.isArray(value)){
      return value.map(item => ({
        label: String(item.label ?? item.name ?? item.key ?? ''),
        value: number(item.value ?? item.count ?? item.total)
      }));
    }

    if (value && typeof value === 'object'){
      return Object.keys(value)
        .map(key => ({
          label: key,
          value: number(value[key])
        }))
        .sort((a,b) => b.value - a.value);
    }

    return [];
  }

  function normalizeGroup(group){
    group = group || {};

    return {
      today: number(group.today ?? group.aujourdhui),
      week: number(group.week ?? group.sevenDays ?? group.semaine),
      pages: normalizeItems(group.pages),
      languages: normalizeItems(group.languages ?? group.langues),
      devices: normalizeItems(group.devices ?? group.appareils),
      hours: normalizeItems(group.hours ?? group.horaires)
    };
  }

  function mergeGroups(a, b){
    function mergeItems(x, y){
      const map = {};
      [...x, ...y].forEach(item => {
        map[item.label] = (map[item.label] || 0) + item.value;
      });

      return Object.keys(map)
        .map(label => ({ label, value: map[label] }))
        .sort((m,n) => n.value - m.value);
    }

    return {
      today: a.today + b.today,
      week: a.week + b.week,
      pages: mergeItems(a.pages, b.pages),
      languages: mergeItems(a.languages, b.languages),
      devices: mergeItems(a.devices, b.devices),
      hours: mergeItems(a.hours, b.hours)
    };
  }

  function displayLabel(kind, label){
    if (kind === 'pages') return pageLabels[label] || label;
    if (kind === 'languages') return langLabels[label] || label;
    if (kind === 'devices') return deviceLabels[label] || label;
    return label;
  }

  function renderBars(id, items, kind){
    const root = $(id);
    if (!root) return;

    if (!items.length){
      root.innerHTML = '<p>Aucune donnée.</p>';
      return;
    }

    const max = Math.max(1, ...items.map(item => item.value));

    root.innerHTML = items.slice(0,8).map(item => {
      const width = Math.round((item.value / max) * 100);

      return (
        '<div class="parent-activity-bar">' +
          '<span>' + escapeHtml(displayLabel(kind, item.label)) + '</span>' +
          '<i><b style="width:' + width + '%"></b></i>' +
          '<strong>' + item.value + '</strong>' +
        '</div>'
      );
    }).join('');
  }

  function render(){
    if (!lastData) return;

    const parents = normalizeGroup(lastData.parent || lastData.parents || lastData);
    const tests = normalizeGroup(lastData.tests || lastData.enseignant_test || {});

    const include = !!(includeTests && includeTests.checked);
    const shown = include ? mergeGroups(parents, tests) : parents;

    if ($('parentActivityToday')) $('parentActivityToday').textContent = shown.today;
    if ($('parentActivityWeek')) $('parentActivityWeek').textContent = shown.week;
    if ($('parentActivityTests')) $('parentActivityTests').textContent = tests.week;

    renderBars('parentActivityPages', shown.pages, 'pages');
    renderBars('parentActivityLanguages', shown.languages, 'languages');
    renderBars('parentActivityDevices', shown.devices, 'devices');
    renderBars('parentActivityHours', shown.hours, 'hours');

    const status = $('parentActivityStatus');
    if (status){
      const stamp =
        lastData.updatedAt ||
        lastData.generatedAt ||
        lastData.updated ||
        '';

      status.textContent =
        'Données actualisées' +
        (stamp ? ' à ' + String(stamp).slice(11,16) : '') +
        '.' +
        (include
          ? ' Visites test incluses.'
          : ' Visites test exclues.');
    }
  }

  async function load(){
    const status = $('parentActivityStatus');

    if (status){
      status.textContent = 'Chargement des statistiques…';
    }

    try {
      lastData = await jsonp();
      render();
    } catch(err){
      if (status){
        status.textContent =
          'Impossible de charger les statistiques. Vérifie le déploiement Analytics.';
      }
    }
  }

  function open(){
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    load();
  }

  function close(){
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', open);

  if (closeBtn){
    closeBtn.addEventListener('click', close);
  }

  if (refreshBtn){
    refreshBtn.addEventListener('click', load);
  }

  if (includeTests){
    includeTests.addEventListener('change', render);
  }

  modal.addEventListener('click', event => {
    if (event.target === modal) close();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')){
      close();
    }
  });

})();
