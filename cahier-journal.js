/* V36.00 — Cahier journal synthétique : statuts compacts */
(function(){
'use strict';
const API='https://script.google.com/macros/s/AKfycbz25e9hIn7jgZuI2gzLNwqinvo_zTegoicJSeEzNaHDEfCTrEz52MIJREvFM5rvx7Yswg/exec';
const DEVICE_KEY_STORAGE='hibou_sync_device_key_v25754';
function professionalKey(){try{return String(localStorage.getItem(DEVICE_KEY_STORAGE)||'').trim()}catch(e){return ''}}
const $=id=>document.getElementById(id), modal=$('journalModal'), openBtn=$('openJournalBtn'); if(!modal||!openBtn)return;
const panel=modal.querySelector('.journal-panel');
const closeBtn=$('closeJournalBtn'), todayView=$('journalTodayView'), weekView=$('journalWeekView'), archivesView=$('journalArchivesView'), summary=$('journalSummary'), status=$('journalStatus'), weekLabel=$('journalWeekLabel');
const fields={learned:$('journalLearned'),deferred:$('journalDeferred'),review:$('journalReview'),events:$('journalEvents'),changes:$('journalChanges'),next:$('journalNext')};
const PEDAGOGY_BANK=[...(window.CE2_LEARNING_PAIRS||[]),
  {keys:['copie'],pairs:[
    ['Amener les élèves à copier par groupes de mots en respectant la présentation et en se relisant.','Copier avec efficacité, dans une écriture lisible, et se relire.'],
    ['Développer des stratégies de mémorisation pour copier sans revenir au modèle lettre par lettre.','Mémoriser puis copier des mots ou groupes de mots avec exactitude.'],
    ['Faire respecter la mise en page, la ponctuation et l’orthographe du texte modèle.','Respecter la présentation, la ponctuation et l’orthographe lors d’une copie.']
  ]},
  {keys:['lecture-compréhension','lecture compréhension','étude de texte','lecture – compréhension'],pairs:[
    ['Amener les élèves à construire le sens d’un texte et à justifier leurs réponses.','Lire et comprendre un texte adapté à son âge ; prélever des informations explicites.'],
    ['Faire identifier les personnages, les lieux, les actions et les relations de cause à effet.','Identifier les informations essentielles et établir des liens entre elles.'],
    ['Développer des stratégies de compréhension avant, pendant et après la lecture.','Mobiliser des stratégies de lecture pour contrôler sa compréhension.']
  ]},
  {keys:['fluence','lecture-fluence','lecture – fluence'],pairs:[
    ['Développer une lecture orale exacte, fluide et expressive.','Lire à voix haute avec fluidité après préparation.'],
    ['Amener les élèves à respecter la ponctuation et les groupes de sens.','Adapter son débit et son intonation à la ponctuation et au sens.']
  ]},
  {keys:['dictée','orthographe'],pairs:[
    ['Faire mobiliser les connaissances orthographiques et grammaticales en situation de dictée.','Écrire sous la dictée en respectant les correspondances graphophonologiques et les accords étudiés.'],
    ['Développer la vigilance orthographique et les procédures de relecture.','Repérer et corriger des erreurs à l’aide des outils de la classe.'],
    ['Consolider la mémorisation de mots fréquents et réguliers.','Orthographier correctement les mots fréquents et les mots appris.']
  ]},
  {keys:['problèmes du jour','problème','problèmes'],pairs:[
    ['Amener les élèves à représenter une situation et à choisir une procédure adaptée.','Résoudre des problèmes en utilisant les nombres entiers et le calcul.'],
    ['Faire expliciter les étapes de résolution et vérifier la vraisemblance du résultat.','Chercher, raisonner, calculer et communiquer une démarche de résolution.'],
    ['Développer l’usage de schémas, dessins ou écritures mathématiques pour modéliser.','Modéliser une situation-problème et interpréter le résultat obtenu.']
  ]},
  {keys:['calcul mental','mathématiques','calcul'],pairs:[
    ['Consolider les procédures de calcul mental et développer l’automatisation.','Calculer mentalement avec des nombres entiers et mobiliser des faits numériques mémorisés.'],
    ['Faire comparer plusieurs procédures et choisir la plus efficace.','Utiliser des propriétés des nombres et des opérations pour calculer efficacement.'],
    ['Réinvestir les connaissances numériques dans une situation d’entraînement.','Mobiliser ses connaissances en numération et en calcul pour résoudre une tâche.']
  ]},
  {keys:['grammaire','étude de la langue','conjugaison'],pairs:[
    ['Amener les élèves à observer le fonctionnement de la phrase et à manipuler ses constituants.','Identifier les principaux constituants d’une phrase simple.'],
    ['Faire expliciter les régularités de la langue à partir de manipulations.','Raisonner sur la langue et mobiliser les notions grammaticales étudiées.']
  ]},
  {keys:['production écrite','écriture','atelier d’écriture'],pairs:[
    ['Accompagner la planification, la rédaction et la révision d’un texte court.','Rédiger un texte cohérent, organisé et adapté à la consigne.'],
    ['Faire enrichir le vocabulaire et améliorer l’enchaînement des phrases.','Réviser et améliorer son écrit en utilisant les outils disponibles.']
  ]},
  {keys:['anglais'],pairs:[
    ['Faire comprendre et réemployer des expressions usuelles dans une situation de communication.','Comprendre des mots familiers et s’exprimer oralement en continu ou en interaction.'],
    ['Développer l’écoute, la mémorisation et la prononciation.','Reproduire un modèle oral et utiliser des formulations mémorisées.']
  ]},
  {keys:['sciences','questionner le monde'],pairs:[
    ['Amener les élèves à questionner, observer et expérimenter pour construire une explication.','Pratiquer une démarche scientifique : questionner, expérimenter, observer et conclure.'],
    ['Faire formuler des hypothèses et confronter les résultats aux prévisions.','Communiquer des observations et tirer une conclusion simple.']
  ]},
  {keys:['histoire','géographie','histoire-géographie'],pairs:[
    ['Construire des repères temporels et spatiaux à partir de documents variés.','Se repérer dans le temps et dans l’espace ; lire et comprendre des documents.'],
    ['Faire décrire, comparer et expliquer des situations historiques ou géographiques.','Prélever des informations et utiliser un vocabulaire précis pour décrire et expliquer.']
  ]},
  {keys:['emc','vie de classe','bilan de journée','coopération'],pairs:[
    ['Développer l’écoute, la coopération et le respect des règles de la vie collective.','Participer à un échange, écouter autrui et respecter les règles communes.'],
    ['Amener les élèves à exprimer un avis argumenté et à prendre en compte celui des autres.','Construire une culture du jugement et s’engager dans la vie collective.']
  ]},
  {keys:['eps','sport'],pairs:[
    ['Faire agir les élèves en sécurité, coopérer et adapter leurs actions à la situation.','Développer sa motricité et apprendre à s’exprimer en utilisant son corps.'],
    ['Amener les élèves à respecter des règles, des rôles et des partenaires.','Partager des règles, assumer des rôles et coopérer dans une activité physique.']
  ]},
  {keys:['arts','arts visuels','musique','cham'],pairs:[
    ['Favoriser l’expression, l’expérimentation et la réalisation d’une production personnelle ou collective.','Expérimenter, produire, créer et présenter une réalisation.'],
    ['Développer l’écoute, la sensibilité et le vocabulaire artistique.','Exprimer ses émotions et porter un regard sensible sur une œuvre ou une production.']
  ]}
];
const PEDAGOGY_FALLBACKS={
  'Français':['Faire mobiliser les connaissances et stratégies de français nécessaires à la tâche.','Comprendre, s’exprimer à l’oral, lire ou écrire selon la situation proposée.'],
  'Mathématiques':['Faire mobiliser des connaissances numériques, géométriques ou de résolution de problèmes.','Chercher, modéliser, représenter, raisonner, calculer et communiquer.'],
  'Anglais':['Faire comprendre et réemployer des formulations simples en anglais.','Écouter et comprendre ; s’exprimer oralement en interaction ou en continu.'],
  'Sciences':['Amener les élèves à observer, questionner et expliquer un phénomène.','Pratiquer une démarche scientifique et communiquer ses résultats.'],
  'Histoire-Géographie':['Construire des repères et exploiter des documents pour comprendre une situation.','Se repérer dans le temps et l’espace et prélever des informations.'],
  'EMC':['Développer l’écoute, le respect et la participation à la vie collective.','Respecter autrui, coopérer et participer à un échange.'],
  'EPS':['Faire adapter ses actions et coopérer dans le respect des règles.','Développer sa motricité et partager des règles et des rôles.'],
  'Vie de classe':['Organiser la vie collective et favoriser la coopération.','Participer à la vie de la classe et respecter les règles communes.']
};
const PEDAGOGY_PREFS_KEY='progressions_ce2_cahier_pedagogy_v2';
const SESSION_META_PREFS_KEY='progressions_ce2_cahier_session_meta_v1';
let monday=startOfWeek(new Date()), sessions=[], remoteSessions=[], active='today';
const PRE_RENTREE_DATE='2026-08-31';
const SCHOOL_YEAR_START_DATE='2026-09-01';
function iso(d){return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)}
function startOfWeek(d){const x=new Date(d);x.setHours(12,0,0,0);const day=x.getDay()||7;x.setDate(x.getDate()-day+1);return x}
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x}
function frDate(value,opts={weekday:'long',day:'numeric',month:'long'}){return new Intl.DateTimeFormat('fr-FR',opts).format(new Date(value+'T12:00:00')).replace(/^./,c=>c.toUpperCase())}
function key(){return `progressions_ce2_journal_week_${iso(monday)}`}
function archivesKey(){return 'progressions_ce2_journal_archives_v1'}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function setStatus(msg){status.textContent=msg}
function normalizeDate(value){
  if(!value)return '';
  if(value instanceof Date&&!isNaN(value))return iso(value);
  const text=String(value).trim();
  const direct=text.match(/^\d{4}-\d{2}-\d{2}/);
  if(direct)return direct[0];
  const parsed=new Date(text);
  return isNaN(parsed)?'':iso(parsed);
}
function specialDayLabel(date){
  const d=normalizeDate(date);
  if(!d)return '';
  if(d===PRE_RENTREE_DATE)return 'Journée de pré-rentrée';
  if(d<SCHOOL_YEAR_START_DATE)return 'Vacances d’été';
  return '';
}
function isClosedSchoolDay(date){return !!specialDayLabel(date)}
function weekSpecialMessage(list){
  const labels=[...new Set((Array.isArray(list)?list:[]).map(item=>specialDayLabel(item&&item.date)).filter(Boolean))];
  if(!labels.length)return '';
  if(labels.length===1)return labels[0];
  if(labels.includes('Vacances d’été')&&labels.includes('Journée de pré-rentrée'))return 'Semaine spéciale : vacances d’été et pré-rentrée';
  return `Semaine spéciale : ${labels.join(' · ')}`;
}
function sessionKey(s){return [normalizeDate(s.date),s.horaire||'',s.domaine||'',s.activite||'',Number(s.ordre||0)].join('|')}
function dedupeSessions(list){
  const map=new Map();
  (Array.isArray(list)?list:[]).forEach(s=>{const item={...s,date:normalizeDate(s.date)};const key=sessionKey(item);if(key&&!map.has(key))map.set(key,item)});
  return [...map.values()].sort((a,b)=>String(a.date).localeCompare(String(b.date))+(Number(a.ordre||0)-Number(b.ordre||0)));
}
function periodForDate(date){
  const d=new Date(date+'T12:00:00');
  const m=d.getMonth()+1, day=d.getDate();
  if(m===9&&day<=13)return 'rentree';
  if((m===9&&day>13)||m===10)return 'p1';
  if(m===11||m===12)return 'p2';
  if(m===1||m===2)return 'p3';
  if(m===3||m===4)return 'p4';
  return 'p5';
}
function timetableDaySessions(date){
  const specialLabel=specialDayLabel(date);
  if(specialLabel){
    return [{
      date,
      horaire:'Toute la journée',
      domaine:'Vie de classe',
      activite:specialLabel,
      objectifMaitre:'',
      competenceEleve:'',
      statut:'',
      remarque:'',
      ordre:1,
      source:'special'
    }];
  }
  const api=window.ProgressionsEDT;
  if(!api||typeof api.getDayRows!=='function')return [];
  const dayNames=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
  const day=dayNames[new Date(date+'T12:00:00').getDay()];
  const rawRows=api.getDayRows(day,periodForDate(date))||[];
  // Une seule récréation le matin et une seule l'après-midi.
  // Certaines anciennes trames contenaient deux lignes de récréation l'après-midi.
  const seenBreaks={morning:false,afternoon:false};
  const rows=rawRows.filter(row=>{
    const label=normalizeText(`${row?.[1]||''} ${row?.[3]||''}`);
    if(!label.includes('recre'))return true;
    const hourMatch=String(row?.[0]||'').match(/(\d{1,2})\s*h/);
    const hour=hourMatch?Number(hourMatch[1]):0;
    const period=hour>=12?'afternoon':'morning';
    if(seenBreaks[period])return false;
    seenBreaks[period]=true;
    return true;
  });
  const labels={french:'Français',maths:'Mathématiques',english:'Anglais',eps:'EPS',arts:'Arts',science:'Sciences',history:'Histoire-Géographie',emc:'EMC',cham:'CHAM',break:'Récréation',lunch:'Pause méridienne',mixed:'Activité transversale',common:'Vie de classe'};
  return rows.map((row,index)=>({
    date,
    horaire:row[0]||'',
    domaine:labels[row[3]]||'Vie de classe',
    activite:row[1]||'Activité',
    objectifMaitre:'',
    competenceEleve:'',
    statut:'',
    remarque:'',
    ordre:index+1,
    source:'emploi-du-temps'
  }));
}
function slotKey(s){return [normalizeDate(s.date),String(s.horaire||'').trim()].join('|')}
function mergeSessionLayers(...layers){
  const map=new Map();
  layers.forEach(layer=>(Array.isArray(layer)?layer:[]).forEach(item=>{
    const value={...item,date:normalizeDate(item.date)};
    const k=slotKey(value);
    if(!k)return;
    if(isClosedSchoolDay(value.date)&&value.source!=='special')return;
    const previous=map.get(k)||{};
    map.set(k,{...previous,...value,ordre:previous.ordre||value.ordre||0});
  }));
  return [...map.values()].sort((a,b)=>String(a.date).localeCompare(String(b.date))+(timeSortValue(a.horaire)-timeSortValue(b.horaire))+(Number(a.ordre||0)-Number(b.ordre||0)));
}
function localDaySessions(date){
  if(isClosedSchoolDay(date))return [];
  try{
    const raw=JSON.parse(localStorage.getItem(`progressions_ce2_programme_du_jour_${date}`)||'null');
    if(!Array.isArray(raw))return [];
    const labels={french:'Français',maths:'Mathématiques',english:'Anglais',eps:'EPS',arts:'Arts',science:'Sciences',history:'Histoire-Géographie',emc:'EMC',cham:'CHAM',break:'Récréation',lunch:'Pause méridienne',mixed:'Activité transversale',common:'Vie de classe'};
    return raw.filter(x=>!x.hidden).map((x,index)=>({
      date,
      horaire:x.time||'',
      domaine:labels[x.kind]||'Vie de classe',
      activite:x.title||'Activité',
      objectifMaitre:x.objective||x.detail||'',
      competenceEleve:x.competence||x.detail||'',
      statut:x.status||(x.done?'Réalisée':''),
      remarque:x.remark||'',
      ordre:index+1,
      source:'local'
    }));
  }catch(e){return []}
}
function timetableWeekSessions(){return [0,1,2,3,4].flatMap(n=>timetableDaySessions(iso(addDays(monday,n))))}
function localWeekSessions(){return [0,1,2,3,4].flatMap(n=>localDaySessions(iso(addDays(monday,n))))}

async function journalApi(payload,timeoutMs=12000){
  const deviceKey=professionalKey();
  if(!deviceKey)throw new Error('Clé professionnelle absente sur cet appareil.');
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeoutMs);
  const body={...payload,device_key:deviceKey,tablet_key:deviceKey,key:deviceKey};
  try{
    const response=await fetch(API,{method:'POST',cache:'no-store',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body),signal:controller.signal});
    const data=await response.json();
    if(!data||data.success!==true)throw new Error(data&&data.error||'Réponse API invalide');
    return data;
  }finally{clearTimeout(timer)}
}
function updateLabel(){weekLabel.textContent=`Semaine du ${frDate(iso(monday),{day:'numeric',month:'long'})} au ${frDate(iso(addDays(monday,4)),{day:'numeric',month:'long',year:'numeric'})}`}
function loadSummary(){let v={};try{v=JSON.parse(localStorage.getItem(key())||'{}')}catch(e){};Object.keys(fields).forEach(k=>fields[k].value=v[k]||'')}
function saveSummary(){const v={};Object.keys(fields).forEach(k=>v[k]=fields[k].value.trim());localStorage.setItem(key(),JSON.stringify(v));return v}
async function loadWeek(){
  updateLabel();
  loadSummary();
  const base=timetableWeekSessions();
  const local=dedupeSessions(localWeekSessions());
  sessions=mergeSessionLayers(base,local);
  cleanupSyntheticStatusPrefs();
  const specialWeekMessage=weekSpecialMessage(sessions);
  setStatus(specialWeekMessage||`${sessions.length} séance(s) préparée(s) depuis l’emploi du temps · synchronisation…`);
  render();
  try{
    const data=await journalApi({action:'semaine',dateDebut:iso(monday)});
    remoteSessions=data&&data.success&&Array.isArray(data.seances)?data.seances:[];
    sessions=mergeSessionLayers(base,remoteSessions,local);
    cleanupSyntheticStatusPrefs();
    setStatus(weekSpecialMessage(sessions)||'');
  }catch(e){
    remoteSessions=[];
    sessions=mergeSessionLayers(base,local);
    cleanupSyntheticStatusPrefs();
    setStatus(weekSpecialMessage(sessions)||`${sessions.length} séance(s) affichée(s) depuis l’emploi du temps et la sauvegarde locale`);
  }
  render();
}
function refreshFromProgramme(date){
  const first=iso(monday), last=iso(addDays(monday,4));
  if(date&&date<first||date&&date>last)return;
  const base=timetableWeekSessions();
  const local=dedupeSessions(localWeekSessions());
  sessions=mergeSessionLayers(base,remoteSessions,local);
  cleanupSyntheticStatusPrefs();
  setStatus('✓ Actualisé depuis le Programme du jour');
  render();
}
function groupByDate(){const map={};sessions.forEach(s=>{const d=normalizeDate(s.date);if(d)(map[d]||(map[d]=[])).push(s)});return map}
function domainClass(value){const v=String(value||'').toLowerCase();if(v.includes('français')||v.includes('lecture')||v.includes('dictée'))return 'is-french';if(v.includes('math'))return 'is-maths';if(v.includes('anglais'))return 'is-english';if(v.includes('récré'))return 'is-break';if(v.includes('pause méridienne')||v.includes('cantine')||v.includes('repas'))return 'is-lunch';if(v.includes('eps')||v.includes('sport'))return 'is-eps';if(v.includes('science'))return 'is-science';if(v.includes('histoire')||v.includes('géo'))return 'is-history';if(v.includes('emc'))return 'is-emc';if(v.includes('cham')||v.includes('musique'))return 'is-cham';if(v.includes('art'))return 'is-arts';return 'is-common'}
function dayClass(date){const d=new Date(date+'T12:00:00').getDay();return ({1:'day-blue',2:'day-green',4:'day-orange',5:'day-red'})[d]||'day-blue'}
function isNonTeachingTime(s){const text=normalizeText(`${s.domaine||''} ${s.activite||''}`);return text.includes('recre')||text.includes('pause meridienne')||text.includes('cantine')||text.includes('repas a la maison')||text.includes('pre-rentree')||text.includes('pre rentree')}
function normalizeText(value){return String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,"'")}

function isRoutineActivity(s){
  const text=normalizeText(`${s.activite||''} ${s.domaine||''}`);
  return ['copie','quart d heure de lecture','quart d’heure de lecture','lecture personnelle','calcul mental','problemes du jour','probleme du jour','rituel','quoi de neuf','devinette','un jour une actu'].some(label=>text.includes(normalizeText(label)));
}
function nonTeachingLabel(s){
  const text=normalizeText(`${s.domaine||''} ${s.activite||''}`);
  if(text.includes('pre-rentree')||text.includes('pre rentree'))return 'Journée de pré-rentrée';
  return text.includes('recre')?'Récréation':'Pause méridienne';
}

function getPedagogyEntry(s){
  const haystack=normalizeText(`${s.activite||''} ${s.domaine||''}`);
  const found=PEDAGOGY_BANK.find(entry=>entry.keys.some(key=>haystack.includes(normalizeText(key))));
  if(found)return found;
  const fallback=PEDAGOGY_FALLBACKS[s.domaine]||PEDAGOGY_FALLBACKS['Vie de classe'];
  return {keys:[],pairs:[fallback]};
}
function pedagogyPrefKey(s){return sessionKey(s)}
function readSessionMetaPrefs(){try{return JSON.parse(localStorage.getItem(SESSION_META_PREFS_KEY)||'{}')}catch(e){return {}}}
function saveSessionMetaPrefs(prefs){localStorage.setItem(SESSION_META_PREFS_KEY,JSON.stringify(prefs))}
function sessionMetaKey(s){return sessionKey(s)}
function activityMemoryKey(s){return normalizeText(`${s.domaine||''}|${s.activite||''}`)}
const SUBDOMAIN_OPTIONS={
  'Mathématiques':['Numération','Calcul mental','Calcul posé','Résolution de problèmes','Géométrie','Grandeurs et mesures','Organisation et gestion de données'],
  'Français':['Langage oral','Lecture-compréhension','Lecture-fluence','Copie','Production d’écrits','Grammaire','Conjugaison','Orthographe','Lexique'],
  'Anglais':['Compréhension orale','Expression orale','Interaction orale','Lexique et culture'],
  'Sciences':['Matière, mouvement, énergie, information','Le vivant','Objets techniques','Questionner le monde'],
  'Histoire-Géographie':['Histoire','Géographie','Repérage dans le temps','Repérage dans l’espace'],
  'EMC':['Respect d’autrui','Règles et droit','Jugement','Engagement'],
  'EPS':['Performance','Adaptation des déplacements','Expression corporelle','Affrontement et coopération'],
  'Arts':['Arts plastiques','Éducation musicale','Histoire des arts'],
  'Vie de classe':['Coopération','Organisation de la classe','Conseil d’élèves']
};
const PHASE_OPTIONS=['Découverte','Recherche','Manipulation','Mise en commun','Institutionnalisation','Entraînement','Réinvestissement','Remédiation','Révision','Évaluation','Projet'];
function canonicalDomain(value){const v=normalizeText(value);if(v.includes('math'))return 'Mathématiques';if(v.includes('francais')||v.includes('lecture')||v.includes('dictee'))return 'Français';if(v.includes('anglais'))return 'Anglais';if(v.includes('science')||v.includes('questionner'))return 'Sciences';if(v.includes('histoire')||v.includes('geo'))return 'Histoire-Géographie';if(v.includes('emc'))return 'EMC';if(v.includes('eps')||v.includes('sport'))return 'EPS';if(v.includes('art')||v.includes('musique')||v.includes('cham'))return 'Arts';return 'Vie de classe'}
function displayDomainLabel(value){const domain=canonicalDomain(value);return domain==='Mathématiques'?'Maths':domain}
function inferSubdomain(s){const t=normalizeText(`${s.activite||''} ${s.domaine||''}`);if(t.includes('probleme'))return 'Résolution de problèmes';if(t.includes('geometr'))return 'Géométrie';if(t.includes('grandeur')||t.includes('mesure')||t.includes('monnaie')||t.includes('heure'))return 'Grandeurs et mesures';if(t.includes('calcul mental'))return 'Calcul mental';if(t.includes('calcul pose')||t.includes('operation'))return 'Calcul posé';if(t.includes('numeration')||t.includes('nombre'))return 'Numération';if(t.includes('copie'))return 'Copie';if(t.includes('fluence')||t.includes('lecture orale'))return 'Lecture-fluence';if(t.includes('lecture')||t.includes('comprehension')||t.includes('etude de texte'))return 'Lecture-compréhension';if(t.includes('production')||t.includes('ecriture')||t.includes('atelier d\'ecriture'))return 'Production d’écrits';if(t.includes('grammaire'))return 'Grammaire';if(t.includes('conjugaison'))return 'Conjugaison';if(t.includes('dictee')||t.includes('orthographe'))return 'Orthographe';if(t.includes('lexique')||t.includes('vocabulaire'))return 'Lexique';if(t.includes('oral')||t.includes('quoi de neuf')||t.includes('debat'))return 'Langage oral';const domain=canonicalDomain(s.domaine);return (SUBDOMAIN_OPTIONS[domain]||[])[0]||domain}
function inferPhase(s){const t=normalizeText(`${s.activite||''} ${s.remarque||''} ${s.statut||''}`);if(t.includes('remediation'))return 'Remédiation';if(t.includes('evaluation')||t.includes('bilan'))return 'Évaluation';if(t.includes('decouverte'))return 'Découverte';if(t.includes('recherche'))return 'Recherche';if(t.includes('manipulation'))return 'Manipulation';if(t.includes('revision'))return 'Révision';if(t.includes('reinvestissement'))return 'Réinvestissement';return 'Entraînement'}
function sequenceOptions(current){const values=[''];for(let n=1;n<=20;n++)values.push(`Séance ${n}`);return selectOptionsSimple(values,current)}
function selectOptionsSimple(values,current){const unique=[...new Set(values.filter(Boolean))];return unique.map(value=>`<option value="${esc(value)}" ${value===current?'selected':''}>${esc(value)}</option>`).join('')}
function inferActivity(s,subdomain){const activity=String(s.activite||'').trim();const a=normalizeText(activity),d=normalizeText(canonicalDomain(s.domaine));if(activity&&a!==d&&a!=='activite')return activity;return ''}
function sessionMetaFor(s){const prefs=readSessionMetaPrefs(), exact=prefs[sessionMetaKey(s)]||{}, remembered=prefs[`activity:${activityMemoryKey(s)}`]||{};const subdomain=exact.subdomain||remembered.subdomain||inferSubdomain(s);return {subdomain,activity:exact.activity!==undefined?exact.activity:inferActivity(s,subdomain),sequence:exact.sequence||'',phase:exact.phase||remembered.phase||inferPhase(s),remark:exact.remark||s.remarque||''}}
function readPedagogyPrefs(){try{return JSON.parse(localStorage.getItem(PEDAGOGY_PREFS_KEY)||'{}')}catch(e){return {}}}
function savePedagogyPrefs(prefs){localStorage.setItem(PEDAGOGY_PREFS_KEY,JSON.stringify(prefs))}
function pedagogyFor(s){
  const entry=getPedagogyEntry(s), prefs=readPedagogyPrefs(), saved=prefs[pedagogyPrefKey(s)]||{};
  const initialObjective=String(s.objectifMaitre||'').trim();
  const initialCompetence=String(s.competenceEleve||'').trim();
  const pair=entry.pairs.find(p=>p[0]===saved.objective)||entry.pairs[0];
  return {
    entry,
    objective:saved.objective||initialObjective||pair[0],
    competence:saved.competence||initialCompetence||(saved.objective&&pair?pair[1]:pair[1])
  };
}
function selectOptions(values,current){
  const unique=[...new Set(values.filter(Boolean))];
  return unique.map(value=>`<option value="${esc(value)}" ${value===current?'selected':''}>${esc(value)}</option>`).join('')+`<option value="__custom__">✏️ Formulation personnalisée…</option>`;
}

const SYNTHETIC_STATUS_OPTIONS=['Prévue','Réalisée','Reportée','Annulée'];
const SYNTHETIC_STATUS_PREFS_KEY='progressions_ce2_journal_status_v35_84';
const SYNTHETIC_DAY_REMARKS_KEY='progressions_ce2_journal_day_remarks_v35_84';
function readSyntheticStatusPrefs(){try{return JSON.parse(localStorage.getItem(SYNTHETIC_STATUS_PREFS_KEY)||'{}')}catch(e){return {}}}
function saveSyntheticStatusPrefs(v){localStorage.setItem(SYNTHETIC_STATUS_PREFS_KEY,JSON.stringify(v))}
function cleanupSyntheticStatusPrefs(){
  const prefs=readSyntheticStatusPrefs();
  const liveSlots=new Map(sessions.map(s=>[slotKey(s),sessionKey(s)]));
  let changed=false;
  Object.keys(prefs).forEach(oldKey=>{
    const parts=String(oldKey).split('|');
    if(parts.length<2)return;
    const oldSlot=[parts[0],parts[1]].join('|');
    const liveKey=liveSlots.get(oldSlot);
    if(liveKey&&liveKey!==oldKey){delete prefs[oldKey];changed=true}
  });
  if(changed)saveSyntheticStatusPrefs(prefs);
}

function syntheticStatusFor(s){
  const prefs=readSyntheticStatusPrefs(), k=sessionKey(s);
  const explicit=String(prefs[k]||s.statut||'').trim();
  if(/^réalis/i.test(explicit))return 'Réalisée';
  if(/^report/i.test(explicit))return 'Reportée';
  if(/^annul/i.test(explicit))return 'Annulée';
  return 'Prévue';
}
function statusClass(value){
  const v=normalizeText(value);
  if(v.startsWith('real'))return 'is-realized';
  if(v.startsWith('report'))return 'is-deferred';
  if(v.startsWith('annul'))return 'is-cancelled';
  return 'is-planned';
}
function statusLabel(value){
  if(value==='Réalisée')return '✓ Fait';
  if(value==='Reportée')return '↪ Reporté';
  if(value==='Annulée')return '× Annulé';
  return '○ Prévu';
}
function statusSelectHtml(s){
  if(isNonTeachingTime(s))return '';
  const key=sessionKey(s), current=syntheticStatusFor(s);
  return `<select class="journal-status-select ${statusClass(current)}" data-status-key="${esc(key)}" aria-label="Statut de la séance">${SYNTHETIC_STATUS_OPTIONS.map(v=>`<option value="${esc(v)}" ${v===current?'selected':''}>${statusLabel(v)}</option>`).join('')}</select>`;
}
function bindSyntheticStatusSelectors(root){
  root.querySelectorAll('.journal-status-select').forEach(select=>{
    select.addEventListener('change',()=>{
      const prefs=readSyntheticStatusPrefs();
      prefs[select.dataset.statusKey]=select.value;
      saveSyntheticStatusPrefs(prefs);
      const session=sessions.find(item=>sessionKey(item)===select.dataset.statusKey);
      if(session)session.statut=select.value;
      select.classList.remove('is-planned','is-realized','is-deferred','is-cancelled');
      select.classList.add(statusClass(select.value));
      setStatus(`Statut : ${select.value}`);
      render();
    });
  });
}
function readDayRemarks(){try{return JSON.parse(localStorage.getItem(SYNTHETIC_DAY_REMARKS_KEY)||'{}')}catch(e){return {}}}
function dayRemark(date){return readDayRemarks()[date]||''}
function bindDayRemarks(root){
  root.querySelectorAll('.journal-day-remark-input').forEach(input=>{
    input.addEventListener('change',()=>{
      const remarks=readDayRemarks();
      remarks[input.dataset.date]=input.value.trim();
      localStorage.setItem(SYNTHETIC_DAY_REMARKS_KEY,JSON.stringify(remarks));
      setStatus('Remarque de la journée enregistrée');
    });
  });
}
function compactSessionHtml(s){
  const key=sessionKey(s), meta=sessionMetaFor(s), domain=canonicalDomain(s.domaine), nonTeaching=isNonTeachingTime(s);
  if(nonTeaching){
    return `<div class="journal-compact-row ${domainClass(`${s.domaine} ${s.activite}`)} is-non-teaching" data-session-key="${esc(key)}">
      <div class="journal-compact-time">${esc(s.horaire)}</div>
      <div class="journal-compact-subject">${esc(nonTeachingLabel(s))}</div>
      <div class="journal-compact-activity"></div>
      <div class="journal-compact-status"></div>
    </div>`;
  }
  return `<div class="journal-compact-row ${domainClass(domain)} ${statusClass(syntheticStatusFor(s))}" data-session-key="${esc(key)}">
    <div class="journal-compact-time">${esc(s.horaire)}</div>
    <div class="journal-compact-subject">${esc(displayDomainLabel(domain))}</div>
    <div class="journal-compact-activity"><input class="journal-activity-input" data-meta-key="${esc(key)}" data-meta-field="activity" value="${esc(meta.activity||'')}" placeholder="Activité" aria-label="Activité de la séance"></div>
    <div class="journal-compact-status">${statusSelectHtml(s)}</div>
  </div>`;
}
function compactDayHtml(date,list){
  const rows=list.slice().sort((a,b)=>(a.ordre||0)-(b.ordre||0));
  return `<article class="journal-day journal-day--compact ${dayClass(date)}">
    <header><h3>📅 ${frDate(date)}</h3></header>
    <div class="journal-compact-headings"><span>Horaire</span><span>Matière</span><span>Activité</span><span>Statut</span></div>
    <div class="journal-sessions">${rows.length?rows.map(compactSessionHtml).join(''):'<div class="journal-empty">Aucune séance</div>'}</div>
    <label class="journal-day-remark"><span>📝 Remarque de la journée</span><textarea class="journal-day-remark-input" data-date="${esc(date)}" placeholder="Une remarque générale pour la journée…">${esc(dayRemark(date))}</textarea></label>
  </article>`;
}
function weekCellHtml(s){
  const meta=sessionMetaFor(s), nonTeaching=isNonTeachingTime(s);
  if(nonTeaching)return `<div class="journal-week-cell is-non-teaching ${domainClass(`${s.domaine} ${s.activite}`)}"><span class="journal-week-cell__subject">${esc(nonTeachingLabel(s))}</span></div>`;
  return `<div class="journal-week-cell ${domainClass(s.domaine)} ${statusClass(syntheticStatusFor(s))}" data-session-key="${esc(sessionKey(s))}">
    <div class="journal-week-cell__subject">${esc(displayDomainLabel(canonicalDomain(s.domaine)))}</div>
    <input class="journal-week-cell__activity journal-activity-input" data-meta-key="${esc(sessionKey(s))}" data-meta-field="activity" value="${esc(meta.activity||'')}" aria-label="Activité">
    ${statusSelectHtml(s)}
  </div>`;
}
function timeSortValue(value){
  const m=String(value||'').match(/(\d{1,2})\s*h\s*(\d{0,2})/i);
  return m?(Number(m[1])*60+Number(m[2]||0)):9999;
}
function renderSyntheticWeek(map){
  const days=[0,1,3,4].map(n=>iso(addDays(monday,n)));
  const times=[...new Set(days.flatMap(d=>(map[d]||[]).map(s=>s.horaire).filter(Boolean)))].sort((a,b)=>timeSortValue(a)-timeSortValue(b));
  const byDayTime={};
  days.forEach(d=>{byDayTime[d]={};(map[d]||[]).forEach(s=>{(byDayTime[d][s.horaire]||(byDayTime[d][s.horaire]=[])).push(s)})});
  const head=`<div class="journal-week-grid__head journal-week-grid__corner"><span class="journal-week-grid__weekday">Horaire</span></div>`+days.map(d=>`<div class="journal-week-grid__head"><span class="journal-week-grid__weekday">${esc(frDate(d,{weekday:'long'}).toUpperCase())}</span><span class="journal-week-grid__date">${esc(frDate(d,{day:'numeric',month:'long'}))}</span></div>`).join('');
  const body=times.map(time=>{
    const cells=days.map(d=>`<div class="journal-week-grid__slot">${(byDayTime[d][time]||[]).map(weekCellHtml).join('')}</div>`).join('');
    return `<div class="journal-week-grid__time">${esc(time)}</div>${cells}`;
  }).join('');
  const remarks=`<div class="journal-week-remarks-title">📝 Remarques de la journée</div>`+days.map(d=>`<label class="journal-week-day-remark"><span>${frDate(d,{weekday:'long'})}</span><textarea class="journal-day-remark-input" data-date="${esc(d)}" placeholder="Remarque…">${esc(dayRemark(d))}</textarea></label>`).join('');
  return `<div class="journal-week-grid">${head}${body}</div><div class="journal-week-remarks">${remarks}</div>`;
}

function sessionHtml(s){
  const nonTeaching=isNonTeachingTime(s), pedagogy=pedagogyFor(s), key=pedagogyPrefKey(s), meta=sessionMetaFor(s), domain=canonicalDomain(s.domaine);
  const realized=String(s.statut||'').toLowerCase().startsWith('réalis');
  const statusBadge=nonTeaching?'':`<span class="journal-real-status ${realized?'is-realized':'is-planned'}">${realized?'✓ Réalisée':'Prévue'}</span>`;
  const objectives=pedagogy.entry.pairs.map(pair=>pair[0]);
  const competences=pedagogy.entry.pairs.map(pair=>pair[1]);
  if(pedagogy.objective&&!objectives.includes(pedagogy.objective))objectives.unshift(pedagogy.objective);
  if(pedagogy.competence&&!competences.includes(pedagogy.competence))competences.unshift(pedagogy.competence);
  const routine=isRoutineActivity(s);
  const domainLabelHtml=nonTeaching?'':`<div class="journal-domain-label"><strong>${esc(displayDomainLabel(domain))}</strong></div>`;
  const subdomainHtml=nonTeaching?'':`<div class="journal-subdomain"><select class="journal-meta-select journal-subdomain-select" data-meta-key="${esc(key)}" data-meta-field="subdomain" aria-label="Choisir la sous-matière">${selectOptionsSimple(SUBDOMAIN_OPTIONS[domain]||[meta.subdomain],meta.subdomain)}</select></div>`;
  const activityHtml=nonTeaching?'':`<div class="journal-activity"><input class="journal-activity-input" data-meta-key="${esc(key)}" data-meta-field="activity" value="${esc(meta.activity)}" placeholder="Saisir l’activité" aria-label="Activité de la séance"></div>`;
  const sequenceHtml=nonTeaching?'':routine
    ?`<div class="journal-sequence journal-sequence--routine"><select class="journal-meta-select" data-meta-key="${esc(key)}" data-meta-field="phase" aria-label="Nature de la séance">${selectOptionsSimple(PHASE_OPTIONS,meta.phase)}</select></div>`
    :`<div class="journal-sequence"><select class="journal-meta-select" data-meta-key="${esc(key)}" data-meta-field="sequence" aria-label="Position de la séance dans la séquence">${sequenceOptions(meta.sequence)}</select><select class="journal-meta-select" data-meta-key="${esc(key)}" data-meta-field="phase" aria-label="Nature de la séance">${selectOptionsSimple(PHASE_OPTIONS,meta.phase)}</select></div>`;
  const pedagogyHtml=nonTeaching?'':`<div class="journal-objective"><select class="journal-pedagogy-select" data-pedagogy-key="${esc(key)}" data-pedagogy-field="objective" aria-label="Choisir l’objectif du maître">${selectOptions(objectives,pedagogy.objective)}</select></div><div class="journal-competence"><select class="journal-pedagogy-select" data-pedagogy-key="${esc(key)}" data-pedagogy-field="competence" aria-label="Choisir la compétence travaillée">${selectOptions(competences,pedagogy.competence)}</select></div>`;
  const remarkHtml=nonTeaching?'':`<div class="journal-remark"><textarea class="journal-remark-input" data-session-key="${esc(key)}" aria-label="Remarque sur la séance" placeholder="Adaptation, groupe, matériel, report…">${esc(meta.remark||'')}</textarea></div>`;
  if(nonTeaching){
    return `<div class="journal-session ${domainClass(`${s.domaine} ${s.activite}`)} is-non-teaching" data-session-key="${esc(key)}"><div class="journal-time">${esc(s.horaire)}</div><div class="journal-non-teaching-label">${esc(nonTeachingLabel(s))}</div></div>`;
  }
  return `<div class="journal-session ${domainClass(s.domaine)} ${realized?'is-realized':''}" data-session-key="${esc(key)}"><div class="journal-time"><span>${esc(s.horaire)}</span>${statusBadge}</div>${domainLabelHtml}${subdomainHtml}${activityHtml}${sequenceHtml}${pedagogyHtml}${remarkHtml}</div>`;
}
function bindPedagogySelectors(root){
  root.querySelectorAll('.journal-pedagogy-select').forEach(select=>{
    select.addEventListener('change',()=>{
      const key=select.dataset.pedagogyKey, field=select.dataset.pedagogyField;
      let value=select.value;
      if(value==='__custom__'){
        value=window.prompt(field==='objective'?'Saisir l’objectif du maître :':'Saisir la compétence travaillée :','')?.trim()||'';
        if(!value){render();return}
      }
      const prefs=readPedagogyPrefs();
      prefs[key]=prefs[key]||{};
      prefs[key][field]=value;
      if(field==='objective'){
        const session=sessions.find(item=>sessionKey(item)===key);
        if(session){const entry=getPedagogyEntry(session), pair=entry.pairs.find(p=>p[0]===value);if(pair)prefs[key].competence=pair[1]}
      }
      savePedagogyPrefs(prefs);
      render();
      setStatus('Objectif et compétence mémorisés pour cette séance');
    });
  });
}
function bindSessionMetaSelectors(root){
  root.querySelectorAll('.journal-meta-select, .journal-activity-input').forEach(select=>{
    select.addEventListener('change',()=>{
      const key=select.dataset.metaKey, field=select.dataset.metaField, value=select.value.trim();
      const prefs=readSessionMetaPrefs();prefs[key]=prefs[key]||{};prefs[key][field]=value;
      const session=sessions.find(item=>sessionKey(item)===key);
      if(session&&field==='activity')session.activite=value;
      if(session&&(field==='subdomain'||field==='phase')){const memoryKey=`activity:${activityMemoryKey(session)}`;prefs[memoryKey]=prefs[memoryKey]||{};prefs[memoryKey][field]=value}
      saveSessionMetaPrefs(prefs);render();setStatus('Ajustement de la séance mémorisé');
    });
  });
}
function bindRemarkInputs(root){
  root.querySelectorAll('.journal-remark-input').forEach(input=>{
    input.addEventListener('change',()=>{
      const session=sessions.find(item=>sessionKey(item)===input.dataset.sessionKey);
      if(session){
        session.remarque=input.value.trim();
        const prefs=readSessionMetaPrefs();
        prefs[sessionMetaKey(session)]=prefs[sessionMetaKey(session)]||{};
        prefs[sessionMetaKey(session)].remark=session.remarque;
        saveSessionMetaPrefs(prefs);
        setStatus('Remarque enregistrée pour cette séance');
      }
    });
  });
}
function columnHeadings(){return `<div class="journal-column-headings"><span>Horaire</span><span>Matière</span><span>Sous-matière</span><span>Activité</span><span>Séance</span><span>Objectif du maître</span><span>Compétence élève</span><span>Remarque</span></div>`}
function dayHtml(date,list){return `<article class="journal-day ${dayClass(date)}"><header><h3>📅 ${frDate(date)}</h3></header>${columnHeadings()}<div class="journal-sessions">${list.length?list.sort((a,b)=>(a.ordre||0)-(b.ordre||0)).map(sessionHtml).join(''):'<div class="journal-empty">Aucune journée enregistrée</div>'}</div></article>`}
function renderToday(){const map=groupByDate(), today=iso(new Date()), date=(today>=iso(monday)&&today<=iso(addDays(monday,4)))?today:iso(monday);todayView.innerHTML=`<div class="journal-today">${compactDayHtml(date,map[date]||[])}</div>`;bindSessionMetaSelectors(todayView);bindSyntheticStatusSelectors(todayView);bindDayRemarks(todayView)}
function renderWeek(){const map=groupByDate();weekView.innerHTML=renderSyntheticWeek(map);bindSessionMetaSelectors(weekView);bindSyntheticStatusSelectors(weekView);bindDayRemarks(weekView)}
function getArchives(){try{return JSON.parse(localStorage.getItem(archivesKey())||'[]')}catch(e){return []}}
function renderArchives(){const a=getArchives();archivesView.innerHTML=a.length?a.map((x,i)=>`<article class="journal-archive-card"><div><strong>Semaine du ${esc(frDate(x.dateDebut,{day:'numeric',month:'long',year:'numeric'}))}</strong><small>${x.count} séance(s) · archivée le ${esc(x.archivedAt)}</small></div><button type="button" data-open-archive="${i}">Consulter</button></article>`).join(''):'<div class="journal-empty">Aucune semaine archivée sur cet appareil.</div>';archivesView.querySelectorAll('[data-open-archive]').forEach(b=>b.onclick=()=>{const x=a[Number(b.dataset.openArchive)];monday=new Date(x.dateDebut+'T12:00:00');setTab('week');loadWeek()})}
function render(){renderToday();renderWeek();renderArchives();summary.classList.add('hidden')}
function applyViewMode(){if(!panel)return;panel.classList.remove('journal-panel--portrait');panel.classList.add('journal-panel--wide','journal-panel--landscape')}
function setTab(tab){active=tab;document.querySelectorAll('.journal-tab').forEach(b=>b.classList.toggle('is-active',b.dataset.journalTab===tab));todayView.classList.toggle('hidden',tab!=='today');weekView.classList.toggle('hidden',tab!=='week');archivesView.classList.toggle('hidden',tab!=='archives');summary.classList.add('hidden');applyViewMode()}
function textExport(){const map=groupByDate(), lines=[`CAHIER JOURNAL — CE2`,`École La Gravette`,weekLabel.textContent,''];[0,1,3,4].forEach(n=>{const d=iso(addDays(monday,n));lines.push(frDate(d).toUpperCase());(map[d]||[]).forEach(s=>{const meta=sessionMetaFor(s);lines.push(`${s.horaire} — ${canonicalDomain(s.domaine)} — ${meta.activity||'Activité'} — ${syntheticStatusFor(s)}`)});const remark=dayRemark(d);if(remark)lines.push(`Remarque de la journée : ${remark}`);lines.push('')});return lines.join('\n')}
async function copy(){try{await navigator.clipboard.writeText(textExport());setStatus('Cahier journal copié !')}catch(e){setStatus('Copie impossible') }}
async function archive(){const remarks=[0,1,3,4].map(n=>{const d=iso(addDays(monday,n)),r=dayRemark(d);return r?`${frDate(d)} : ${r}`:''}).filter(Boolean).join('\n');const payload={action:'archiverSemaine',dateDebut:iso(monday),dateFin:iso(addDays(monday,4)),periode:'',synthese:remarks,apprentissagesRealises:'',seancesReportees:sessions.filter(s=>syntheticStatusFor(s)==='Reportée').map(s=>`${s.date} ${s.horaire} ${sessionMetaFor(s).activity}`).join('\n'),pointsAReprendre:'',evenementsParticuliers:remarks,absencesOuChangements:'',aPrevoirSemaineSuivante:''};setStatus('Archivage en cours…');try{await journalApi(payload);const a=getArchives().filter(x=>x.dateDebut!==payload.dateDebut);a.unshift({dateDebut:payload.dateDebut,count:sessions.length,archivedAt:new Intl.DateTimeFormat('fr-FR',{dateStyle:'short',timeStyle:'short'}).format(new Date())});localStorage.setItem(archivesKey(),JSON.stringify(a));setStatus('Semaine archivée dans Google Sheet');renderArchives()}catch(e){setStatus(e&&e.message?e.message:'Erreur d’archivage') }}
function open(){monday=startOfWeek(new Date());modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';loadWeek();setTab('today')}
function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
window.addEventListener('progressions:programme-du-jour-updated',e=>refreshFromProgramme(e&&e.detail&&e.detail.date));
openBtn.onclick=open;closeBtn.onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});document.querySelectorAll('.journal-tab').forEach(b=>b.onclick=()=>setTab(b.dataset.journalTab));$('journalPreviousWeekBtn').onclick=()=>{monday=addDays(monday,-7);loadWeek()};$('journalNextWeekBtn').onclick=()=>{monday=addDays(monday,7);loadWeek()};$('journalCurrentWeekBtn').onclick=()=>{monday=startOfWeek(new Date());loadWeek()};$('journalCopyBtn').onclick=copy;$('journalPrintBtn').onclick=()=>window.print();$('journalPdfBtn').onclick=()=>window.print();$('journalArchiveBtn').onclick=archive;Object.values(fields).forEach(f=>f.addEventListener('change',saveSummary));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close()});
})();