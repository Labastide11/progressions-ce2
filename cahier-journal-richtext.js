/* V36.53 — Cahier journal : rendu propre du contenu enrichi des séances.
   Les données de l'emploi du temps peuvent contenir <strong>, <br>, <ol>, <li>, etc.
   Le Cahier journal les affichait jusqu'ici comme du texte brut.
   Ce correctif rend uniquement une petite liste de balises sûres et supprime
   tous les attributs potentiellement dangereux. */
(function () {
  'use strict';

  const ALLOWED_TAGS = new Set([
    'STRONG', 'B', 'EM', 'I', 'BR',
    'P', 'DIV', 'SPAN', 'UL', 'OL', 'LI'
  ]);

  function looksLikeRichHtml(text) {
    return /<\/?(?:strong|b|em|i|br|p|div|span|ul|ol|li)\b/i.test(String(text || ''));
  }

  function sanitizeFragment(html) {
    const template = document.createElement('template');
    template.innerHTML = String(html || '');

    const walker = document.createTreeWalker(
      template.content,
      NodeFilter.SHOW_ELEMENT
    );

    const elements = [];
    while (walker.nextNode()) elements.push(walker.currentNode);

    elements.forEach(function (el) {
      if (!ALLOWED_TAGS.has(el.tagName)) {
        el.replaceWith(document.createTextNode(el.textContent || ''));
        return;
      }

      // Le contenu vient de nos données pédagogiques : aucune action,
      // aucun lien et aucun attribut HTML n'est nécessaire dans le cahier.
      Array.from(el.attributes).forEach(function (attr) {
        el.removeAttribute(attr.name);
      });
    });

    return template.content.cloneNode(true);
  }

  function renderElement(el) {
    if (!el || el.dataset.richTextRendered === '1') return;

    const raw = el.textContent || '';
    if (!looksLikeRichHtml(raw)) {
      el.dataset.richTextRendered = '1';
      return;
    }

    el.replaceChildren(sanitizeFragment(raw));
    el.dataset.richTextRendered = '1';
  }

  function renderAll(root) {
    const scope = root && root.querySelectorAll ? root : document;

    scope.querySelectorAll(
      '.journal-session-text, .journal-week-cell__single-activity'
    ).forEach(renderElement);

    if (scope.matches && scope.matches(
      '.journal-session-text, .journal-week-cell__single-activity'
    )) {
      renderElement(scope);
    }
  }

  function start() {
    renderAll(document);

    const target = document.getElementById('journalModal') || document.body;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) renderAll(node);
        });
      });
    });

    observer.observe(target, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
