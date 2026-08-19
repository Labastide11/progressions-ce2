(() => {
  'use strict';
  const STORAGE_KEY = 'progressions_ce2_home_density';
  const button = document.getElementById('homeDensityToggle');
  const label = document.getElementById('homeDensityToggleLabel');
  if (!button || !label) return;

  function apply(mode) {
    const compact = mode === 'compact';
    document.body.classList.toggle('home-compact', compact);
    button.setAttribute('aria-pressed', String(compact));
    label.textContent = compact ? 'Vue normale' : 'Vue compacte';
    button.classList.toggle('is-compact', compact);
    try { localStorage.setItem(STORAGE_KEY, compact ? 'compact' : 'normal'); } catch (_) {}
  }

  let initial = 'normal';
  try { initial = localStorage.getItem(STORAGE_KEY) || 'normal'; } catch (_) {}
  apply(initial);
  button.addEventListener('click', () => apply(document.body.classList.contains('home-compact') ? 'normal' : 'compact'));
})();
