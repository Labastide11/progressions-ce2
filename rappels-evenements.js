/* Progressions CE2 — V35.68
   Popup de rappel école : affichage la veille et le jour même.
   La popup ne se ferme qu'avec « J'ai lu ». L'acquittement J-1 et Jour J est distinct.
*/
(function(){
  'use strict';

  const events = Array.isArray(window.PROGRESSIONS_EVENEMENTS_ECOLE)
    ? window.PROGRESSIONS_EVENEMENTS_ECOLE
    : [];
  if(!events.length) return;

  const STORAGE_PREFIX = 'progressions_ce2_rappel_ecole_v1_';
  const pad = n => String(n).padStart(2,'0');
  const localKey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const addDays = (date, amount) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate()+amount);
    return d;
  };
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const formatTime = event => {
    if(event.allDay) return 'Toute la journée';
    if(event.start && event.end) return `${event.start.replace(':','h')}–${event.end.replace(':','h')}`;
    if(event.start) return event.start.replace(':','h');
    return 'Horaire à préciser';
  };

  function collect(referenceDate){
    const today = localKey(referenceDate);
    const tomorrow = localKey(addDays(referenceDate,1));
    const todayEvents = events.filter(e => e.date === today);
    const tomorrowEvents = events.filter(e => e.date === tomorrow);
    if(todayEvents.length) return { phase:'today', date:today, events:todayEvents };
    if(tomorrowEvents.length) return { phase:'tomorrow', date:tomorrow, events:tomorrowEvents };
    return null;
  }

  function storageKey(reminder){
    const ids = reminder.events.map(e => e.id).sort().join('|');
    return `${STORAGE_PREFIX}${localKey(new Date())}_${reminder.phase}_${ids}`;
  }

  function alreadyRead(reminder){
    try{return localStorage.getItem(storageKey(reminder)) === '1';}catch(e){return false;}
  }
  function markRead(reminder){
    try{localStorage.setItem(storageKey(reminder),'1');}catch(e){}
  }

  function createModal(reminder){
    const existing=document.getElementById('schoolReminderModal');
    if(existing) existing.remove();

    const modal=document.createElement('div');
    modal.id='schoolReminderModal';
    modal.className='school-reminder-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-labelledby','schoolReminderTitle');

    const heading = reminder.phase === 'today' ? "📅 Aujourd'hui" : '📅 Demain';
    const intro = reminder.events.length > 1
      ? `${reminder.events.length} événements sont à retenir.`
      : 'Un événement est à retenir.';
    const items = reminder.events.map(event => `
      <article class="school-reminder-item">
        <span class="school-reminder-time">${esc(formatTime(event))}</span>
        <div class="school-reminder-copy">
          <strong>${esc(event.title)}</strong>
          ${event.location ? `<small>📍 ${esc(event.location)}</small>` : ''}
        </div>
      </article>`).join('');

    modal.innerHTML=`
      <section class="school-reminder-panel">
        <p class="school-reminder-kicker">Rappel école</p>
        <h2 id="schoolReminderTitle">${heading}</h2>
        <p class="school-reminder-intro">${esc(intro)}</p>
        <div class="school-reminder-list">${items}</div>
        <button class="school-reminder-ack" id="schoolReminderAck" type="button">✓ J'ai lu</button>
        <p class="school-reminder-note">Ce rappel ne réapparaîtra plus aujourd'hui après validation.</p>
      </section>`;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    const ack=document.getElementById('schoolReminderAck');
    ack.focus({preventScroll:true});
    ack.addEventListener('click',()=>{
      markRead(reminder);
      modal.remove();
      document.body.classList.remove('modal-open');
    },{once:true});
  }

  function run(referenceDate){
    const reminder=collect(referenceDate || new Date());
    if(!reminder || alreadyRead(reminder)) return;
    createModal(reminder);
  }

  function boot(){ window.setTimeout(()=>run(new Date()),450); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();

  // Outil de vérification manuel dans la console, sans modifier l'horloge du PC.
  window.ProgressionsSchoolReminders = {
    preview(dateString){
      const m=String(dateString||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if(!m) return false;
      const d=new Date(+m[1],+m[2]-1,+m[3],12,0,0);
      const reminder=collect(d);
      if(!reminder) return false;
      createModal(reminder);return true;
    }
  };
})();
