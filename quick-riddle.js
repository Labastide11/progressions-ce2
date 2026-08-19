(() => {
  'use strict';

  /* Première banque de réactivation construite à partir des progressions CE2.
     Chaque réponse attendue est courte, précise et liée à une notion étudiée. */
  const RIDDLES = [
    // PÉRIODE 1 — premières notions, dictées et repères fondamentaux
    {p:'p1',d:'Dictée · semaine 1',q:'Je suis un animal que l’on peut monter et qui vit souvent dans une écurie. Qui suis-je ?',a:'le cheval'},
    {p:'p1',d:'Dictée · semaine 2',q:'Je distribue les lettres et les colis dans les boîtes aux lettres. Qui suis-je ?',a:'le facteur'},
    {p:'p1',d:'Dictée · semaine 2',q:'Je suis le lieu où le menuisier travaille avec ses outils. Qui suis-je ?',a:'l’atelier'},
    {p:'p1',d:'Dictée · semaine 3',q:'Je flotte dans le ciel. Je peux être blanc, gris et annoncer la pluie. Qui suis-je ?',a:'un nuage'},
    {p:'p1',d:'Dictée · semaine 4',q:'Je suis un vêtement chaud porté lorsqu’il fait froid ou qu’il pleut. Qui suis-je ?',a:'le manteau'},
    {p:'p1',d:'Français · grammaire',q:'Je suis un ensemble de mots qui commence par une majuscule et se termine par un point. Qui suis-je ?',a:'une phrase'},
    {p:'p1',d:'Français · grammaire',q:'Dans la phrase, je dis ce que fait le sujet ou dans quel état il se trouve. Qui suis-je ?',a:'le verbe'},
    {p:'p1',d:'Français · grammaire',q:'Dans une phrase, je désigne qui fait l’action. Qui suis-je ?',a:'le sujet'},
    {p:'p1',d:'Français · vocabulaire',q:'Je suis un livre qui donne l’orthographe, la définition et parfois la nature des mots. Qui suis-je ?',a:'le dictionnaire'},
    {p:'p1',d:'Mathématiques · géométrie',q:'Je suis une portion de droite limitée par deux points. Qui suis-je ?',a:'un segment'},
    {p:'p1',d:'Mathématiques · géométrie',q:'Je ressemble au coin parfaitement droit d’une feuille. Qui suis-je ?',a:'un angle droit'},
    {p:'p1',d:'Mathématiques · nombres',q:'Je consiste à séparer un nombre en milliers, centaines, dizaines et unités. Qui suis-je ?',a:'la décomposition'},
    {p:'p1',d:'Sciences · matière',q:'Je garde une forme propre quand on me pose. Je ne coule pas. Que suis-je ?',a:'un solide'},
    {p:'p1',d:'Sciences · matière',q:'Je coule et je prends la forme du récipient qui me contient. Que suis-je ?',a:'un liquide'},
    {p:'p1',d:'EMI · information',q:'Je peux être vérifié et je ne dépends pas de ce que pense une personne. Qui suis-je ?',a:'un fait'},
    {p:'p1',d:'EMI · information',q:'J’exprime ce qu’une personne pense ou ressent. Qui suis-je ?',a:'une opinion'},
    {p:'p1',d:'EPS · course longue',q:'Je suis la vitesse régulière que l’on choisit pour courir longtemps sans s’épuiser. Qui suis-je ?',a:'l’allure'},

    // PÉRIODE 2 — familles de mots, présent, vivant, natation, recherche
    {p:'p2',d:'Français · vocabulaire',q:'Je suis la partie commune que l’on retrouve dans plusieurs mots de la même famille. Qui suis-je ?',a:'le radical'},
    {p:'p2',d:'Français · vocabulaire',q:'Je suis un petit élément placé avant le radical pour former un nouveau mot. Qui suis-je ?',a:'un préfixe'},
    {p:'p2',d:'Français · vocabulaire',q:'Je suis un mot qui a presque le même sens qu’un autre. Qui suis-je ?',a:'un synonyme'},
    {p:'p2',d:'Français · vocabulaire',q:'Je suis un mot dont le sens s’oppose à celui d’un autre. Qui suis-je ?',a:'un contraire'},
    {p:'p2',d:'Français · grammaire',q:'Je désigne une personne, un animal, un lieu ou une chose sans donner de nom particulier. Qui suis-je ?',a:'un nom commun'},
    {p:'p2',d:'Français · grammaire',q:'Je donne un nom particulier à une personne, une ville ou un pays et je commence par une majuscule. Qui suis-je ?',a:'un nom propre'},
    {p:'p2',d:'Français · conjugaison',q:'Je suis le temps utilisé pour raconter ce qui se passe maintenant ou habituellement. Qui suis-je ?',a:'le présent'},
    {p:'p2',d:'Mathématiques · fractions',q:'Dans une fraction, je suis le nombre écrit sous la barre et j’indique en combien de parts égales le tout est partagé. Qui suis-je ?',a:'le dénominateur'},
    {p:'p2',d:'Mathématiques · calcul',q:'Je suis le résultat obtenu lorsqu’on partage un nombre en deux parts égales. Qui suis-je ?',a:'la moitié'},
    {p:'p2',d:'Mathématiques · espace',q:'Je suis une ligne avec des graduations sur laquelle on place des nombres. Qui suis-je ?',a:'une droite graduée'},
    {p:'p2',d:'Sciences · vivant',q:'Je nais, je grandis, je me nourris et je peux me reproduire. Qui suis-je ?',a:'un être vivant'},
    {p:'p2',d:'Sciences · plante',q:'Je suis la première partie d’une plante qui sort souvent de la graine et s’enfonce dans la terre. Qui suis-je ?',a:'la racine'},
    {p:'p2',d:'Sciences · développement animal',q:'Je suis une étape de la vie de certains animaux avant l’âge adulte, comme la chenille. Qui suis-je ?',a:'la larve'},
    {p:'p2',d:'EMI · recherche',q:'Je suis le mot important que l’on tape dans un moteur de recherche pour trouver une information. Qui suis-je ?',a:'un mot-clé'},
    {p:'p2',d:'EMI · source',q:'Je suis la personne ou l’organisme à l’origine d’un document. Qui suis-je ?',a:'l’auteur'},
    {p:'p2',d:'EPS · natation',q:'Je consiste à mettre entièrement la tête ou le corps sous l’eau. Qui suis-je ?',a:'l’immersion'},

    // PÉRIODE 3 — groupe nominal, futur, milieux, orientation, médias
    {p:'p3',d:'Français · grammaire',q:'Je suis placé devant le nom et j’indique souvent son genre et son nombre. Qui suis-je ?',a:'le déterminant'},
    {p:'p3',d:'Français · grammaire',q:'J’apporte une précision sur un nom, par exemple sa couleur ou sa taille. Qui suis-je ?',a:'l’adjectif'},
    {p:'p3',d:'Français · grammaire',q:'Je suis formé autour d’un nom, souvent accompagné d’un déterminant et parfois d’un adjectif. Qui suis-je ?',a:'le groupe nominal'},
    {p:'p3',d:'Français · conjugaison',q:'Je suis le temps utilisé pour parler de ce qui arrivera plus tard. Qui suis-je ?',a:'le futur'},
    {p:'p3',d:'Français · littérature',q:'Je suis un récit ancien qui explique parfois le monde et met en scène des dieux ou des héros. Qui suis-je ?',a:'un mythe'},
    {p:'p3',d:'Français · compréhension',q:'Je suis une information que le texte ne dit pas directement mais que le lecteur peut comprendre grâce aux indices. Qui suis-je ?',a:'une inférence'},
    {p:'p3',d:'Mathématiques · géométrie',q:'Je suis une figure obtenue lorsqu’une moitié correspond exactement à l’autre comme dans un miroir. Qui suis-je ?',a:'une figure symétrique'},
    {p:'p3',d:'Mathématiques · solides',q:'Je suis une surface plane qui limite un solide. Qui suis-je ?',a:'une face'},
    {p:'p3',d:'Sciences · alimentation',q:'Je relie des êtres vivants en montrant qui mange qui. Qui suis-je ?',a:'une chaîne alimentaire'},
    {p:'p3',d:'Sciences · milieu de vie',q:'Je suis l’endroit où vit un être vivant et où il trouve ce dont il a besoin. Qui suis-je ?',a:'un milieu de vie'},
    {p:'p3',d:'Sciences · biodiversité',q:'Je désigne la variété des êtres vivants présents dans un milieu. Qui suis-je ?',a:'la biodiversité'},
    {p:'p3',d:'EPS · orientation',q:'Je représente un lieu vu de dessus et je permet de retrouver son chemin. Qui suis-je ?',a:'un plan'},
    {p:'p3',d:'EPS · orientation',q:'Je suis le chemin précis à suivre pour aller d’un point à un autre. Qui suis-je ?',a:'un itinéraire'},
    {p:'p3',d:'EMI · vérification',q:'Je suis une fausse information fabriquée pour tromper ou faire rire. Qui suis-je ?',a:'un canular'},
    {p:'p3',d:'EMI · publicité',q:'Je cherche à donner envie d’acheter un produit ou un service. Qui suis-je ?',a:'une publicité'},
    {p:'p3',d:'Arts · musique',q:'Je suis un groupe d’instruments qui produisent le son de manière proche, comme les cordes ou les vents. Qui suis-je ?',a:'une famille d’instruments'},

    // PÉRIODE 4 — imparfait, théâtre, corps, données, image
    {p:'p4',d:'Français · conjugaison',q:'Je suis un temps du passé souvent utilisé pour décrire ou raconter une action qui dure. Qui suis-je ?',a:'l’imparfait'},
    {p:'p4',d:'Français · littérature',q:'Je suis un texte destiné à être joué par des comédiens devant un public. Qui suis-je ?',a:'une scène de théâtre'},
    {p:'p4',d:'Français · vocabulaire',q:'Dans l’expression « avoir la tête dans les nuages », les mots ne sont pas utilisés au sens réel. De quel sens s’agit-il ?',a:'le sens figuré'},
    {p:'p4',d:'Français · grammaire',q:'Je peux souvent être déplacé ou supprimé dans une phrase et je précise le lieu, le temps ou la manière. Qui suis-je ?',a:'un complément de phrase'},
    {p:'p4',d:'Français · grammaire',q:'Je suis un mot invariable qui précise souvent comment, quand ou où se déroule une action. Qui suis-je ?',a:'un adverbe'},
    {p:'p4',d:'Mathématiques · données',q:'Je représente des nombres à l’aide de rectangles dont la longueur permet de comparer les valeurs. Qui suis-je ?',a:'un diagramme en barres'},
    {p:'p4',d:'Mathématiques · mesures',q:'Je suis l’instrument utilisé pour mesurer précisément un angle droit. Qui suis-je ?',a:'une équerre'},
    {p:'p4',d:'Sciences · mouvement',q:'Je suis la zone où deux os se rencontrent et peuvent bouger l’un par rapport à l’autre. Qui suis-je ?',a:'une articulation'},
    {p:'p4',d:'Sciences · effort',q:'Je suis le nombre de battements du cœur mesurés en une minute. Qui suis-je ?',a:'le pouls'},
    {p:'p4',d:'Sciences · mouvement',q:'Je me contracte pour tirer sur les os et permettre le mouvement. Qui suis-je ?',a:'un muscle'},
    {p:'p4',d:'Sciences · apprentissage',q:'Je suis l’organe qui permet de penser, mémoriser et apprendre. Qui suis-je ?',a:'le cerveau'},
    {p:'p4',d:'EMI · image',q:'Je suis le choix de ce que l’on montre ou non dans une photographie. Qui suis-je ?',a:'le cadrage'},
    {p:'p4',d:'EMI · image',q:'Je suis le texte placé sous ou près d’une image pour l’expliquer. Qui suis-je ?',a:'une légende'},
    {p:'p4',d:'EVAR · relations',q:'Je signifie donner librement son accord après avoir compris ce qui est proposé. Qui suis-je ?',a:'le consentement'},
    {p:'p4',d:'EPS · gymnastique',q:'Je suis une position stable que l’on tient sans tomber. Qui suis-je ?',a:'un équilibre'},

    // PÉRIODE 5 — synthèse, passé composé, technique, environnement, médias
    {p:'p5',d:'Français · conjugaison',q:'Je suis un temps du passé formé avec un auxiliaire et un participe passé. Qui suis-je ?',a:'le passé composé'},
    {p:'p5',d:'Français · écriture',q:'Je suis une partie d’un texte séparée des autres par un retour à la ligne. Qui suis-je ?',a:'un paragraphe'},
    {p:'p5',d:'Français · grammaire',q:'Je change selon le sujet : au singulier ou au pluriel, ma terminaison doit convenir. Qui suis-je ?',a:'le verbe'},
    {p:'p5',d:'Français · vocabulaire',q:'Je suis l’étude des éléments qui composent un mot et aident à en comprendre le sens. Qui suis-je ?',a:'la morphologie'},
    {p:'p5',d:'Mathématiques · calcul',q:'Je suis une opération qui permet de partager une quantité en parts égales ou de former des groupes. Qui suis-je ?',a:'la division'},
    {p:'p5',d:'Mathématiques · problèmes',q:'Je suis un dessin organisé qui montre les quantités et leurs relations pour aider à résoudre un problème. Qui suis-je ?',a:'un schéma en barres'},
    {p:'p5',d:'Sciences · objets techniques',q:'Je suis ce qui explique pourquoi un objet a été inventé et à quoi il sert. Qui suis-je ?',a:'le besoin'},
    {p:'p5',d:'Sciences · matériaux',q:'Je suis une matière choisie pour fabriquer un objet, comme le bois, le métal ou le plastique. Qui suis-je ?',a:'un matériau'},
    {p:'p5',d:'Sciences · programmation',q:'Je suis une suite ordonnée d’instructions permettant d’obtenir un résultat. Qui suis-je ?',a:'un programme'},
    {p:'p5',d:'Sciences · énergie',q:'Je permets à un objet de fonctionner, de produire de la lumière, de la chaleur ou du mouvement. Qui suis-je ?',a:'l’énergie'},
    {p:'p5',d:'EMI · sécurité',q:'Je suis une information secrète qui protège l’accès à un compte. Qui suis-je ?',a:'un mot de passe'},
    {p:'p5',d:'EMI · données',q:'Je suis une information qui permet d’identifier une personne, comme son nom ou son adresse. Qui suis-je ?',a:'une donnée personnelle'},
    {p:'p5',d:'Arts · bande dessinée',q:'Je suis une suite d’images organisées pour raconter une histoire. Qui suis-je ?',a:'une bande dessinée'},
    {p:'p5',d:'EPS · relais',q:'Je suis l’objet que les coureurs se transmettent pendant une course de relais. Qui suis-je ?',a:'le témoin'},
    {p:'p5',d:'Géographie · production',q:'Je représente toutes les étapes suivies par un produit, de sa fabrication jusqu’à son utilisation. Qui suis-je ?',a:'la chaîne de production'},
    {p:'p5',d:'EVAR · protection',q:'Je suis une personne majeure vers qui un enfant peut se tourner lorsqu’il a besoin d’aide. Qui suis-je ?',a:'un adulte de confiance'}
  ];

  const PERIOD_LABELS = {
    p1:'PÉRIODE 1', p2:'PÉRIODE 2', p3:'PÉRIODE 3', p4:'PÉRIODE 4', p5:'PÉRIODE 5'
  };
  const DOMAIN_LABELS = {
    francais:'FRANÇAIS', mathematiques:'MATHÉMATIQUES', sciences:'SCIENCES', eps:'EPS',
    emi:'EMI', evar:'EVAR', arts:'ARTS', geographie:'GÉOGRAPHIE'
  };
  const $ = (id) => document.getElementById(id);
  let current = null;
  const usedByFilter = new Map();

  function domainOf(riddle) {
    const source = String(riddle.d || '').toLowerCase();
    if (source.startsWith('dictée') || source.startsWith('français')) return 'francais';
    if (source.startsWith('mathématiques')) return 'mathematiques';
    if (source.startsWith('sciences')) return 'sciences';
    if (source.startsWith('eps')) return 'eps';
    if (source.startsWith('emi')) return 'emi';
    if (source.startsWith('evar')) return 'evar';
    if (source.startsWith('arts')) return 'arts';
    if (source.startsWith('géographie')) return 'geographie';
    return 'francais';
  }

  function detailLabel(riddle) {
    const raw = String(riddle.d || '').trim();
    const domainLabel = DOMAIN_LABELS[riddle.domain] || '';
    if (!raw) return '';
    const parts = raw.split(/\s*·\s*/);
    if (parts[0] && parts[0].localeCompare(domainLabel, 'fr', {sensitivity:'base'}) === 0) {
      return parts.slice(1).join(' · ').trim();
    }
    return raw;
  }

  function filterValues() {
    return {
      period: $('quickRiddlePeriod')?.value || 'p1',
      domain: $('quickRiddleDomain')?.value || 'all'
    };
  }

  function filtered() {
    const {period, domain} = filterValues();
    return RIDDLES
      .map((r, i) => ({...r, i, domain:domainOf(r)}))
      .filter(r => (period === 'all' || r.p === period) && (domain === 'all' || r.domain === domain));
  }

  function filterKey() {
    const {period, domain} = filterValues();
    return `${period}|${domain}`;
  }

  function chooseWithoutImmediateRepeat(pool) {
    const key = filterKey();
    let used = usedByFilter.get(key) || new Set();
    let available = pool.filter(item => !used.has(item.i));
    if (!available.length) {
      used = new Set();
      usedByFilter.set(key, used);
      available = pool;
    }
    const choice = available[Math.floor(Math.random() * available.length)];
    used.add(choice.i);
    usedByFilter.set(key, used);
    return choice;
  }

  function renderNoResult() {
    current = null;
    const {period, domain} = filterValues();
    const periodLabel = period === 'all' ? 'TOUTES LES PÉRIODES' : PERIOD_LABELS[period];
    const domainLabel = domain === 'all' ? 'TOUS LES DOMAINES' : DOMAIN_LABELS[domain];
    $('quickRiddleTheme').textContent = `${periodLabel} · ${domainLabel}`;
    $('quickRiddleQuestion').textContent = 'Aucune devinette n’est encore disponible pour cette combinaison.';
    $('quickRiddleAnswer').textContent = '';
    $('quickRiddleAnswer').classList.add('hidden');
    $('showQuickRiddleAnswerBtn').disabled = true;
    $('showQuickRiddleAnswerBtn').textContent = '👁 Voir la réponse';
  }

  function draw() {
    const pool = filtered();
    if (!pool.length) {
      renderNoResult();
      return;
    }
    current = chooseWithoutImmediateRepeat(pool);
    const detail = detailLabel(current);
    $('quickRiddleTheme').textContent = [PERIOD_LABELS[current.p], DOMAIN_LABELS[current.domain], detail ? detail.toUpperCase() : ''].filter(Boolean).join(' · ');
    $('quickRiddleQuestion').textContent = current.q;
    $('quickRiddleAnswer').textContent = `Réponse : ${current.a}`;
    $('quickRiddleAnswer').classList.add('hidden');
    $('showQuickRiddleAnswerBtn').disabled = false;
    $('showQuickRiddleAnswerBtn').textContent = '👁 Voir la réponse';
  }

  function toggleAnswer() {
    if (!current) return;
    const answer = $('quickRiddleAnswer');
    const hidden = answer.classList.toggle('hidden');
    $('showQuickRiddleAnswerBtn').textContent = hidden ? '👁 Voir la réponse' : '🙈 Cacher la réponse';
  }

  function open() {
    const modal = $('quickRiddleModal');
    modal?.classList.remove('hidden');
    modal?.setAttribute('aria-hidden', 'false');
    if (!current) draw();
  }

  function close() {
    const modal = $('quickRiddleModal');
    modal?.classList.add('hidden');
    modal?.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('openQuickRiddleBtn')?.addEventListener('click', open);
    $('closeQuickRiddleBtn')?.addEventListener('click', close);
    $('newQuickRiddleBtn')?.addEventListener('click', draw);
    $('showQuickRiddleAnswerBtn')?.addEventListener('click', toggleAnswer);
    ['quickRiddlePeriod','quickRiddleDomain'].forEach((id) => {
      $(id)?.addEventListener('change', () => {
        current = null;
        draw();
      });
    });
    $('quickRiddleModal')?.addEventListener('click', (event) => {
      if (event.target === $('quickRiddleModal')) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !$('quickRiddleModal')?.classList.contains('hidden')) close();
    });
  });
})();
