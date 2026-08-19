(()=>{'use strict';
const KEY='progressions_ce2_timer_v1',$=s=>document.querySelector(s);let tick=null,beeped=false;
const now=()=>Date.now(),read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}},fresh=()=>({mode:'idle',running:false,baseMs:0,startedAt:0,ended:false}),state=()=>read()||fresh();
function current(s){const e=s.running?now()-s.startedAt:0;return s.mode==='countdown'?Math.max(0,s.baseMs-e):s.mode==='stopwatch'?Math.max(0,s.baseMs+e):0}
function fmt(ms){const t=Math.max(0,Math.ceil(ms/1000)),h=Math.floor(t/3600),m=Math.floor(t%3600/60),sec=t%60;return h?`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
function write(s){localStorage.setItem(KEY,JSON.stringify(s));render()}
function sound(){try{const A=AudioContext||webkitAudioContext,c=new A();[0,.22,.44].forEach((d,i)=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=[880,660,880][i];g.gain.setValueAtTime(.001,c.currentTime+d);g.gain.exponentialRampToValueAtTime(.2,c.currentTime+d+.02);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d+.18);o.connect(g);g.connect(c.destination);o.start(c.currentTime+d);o.stop(c.currentTime+d+.2)});setTimeout(()=>c.close(),900)}catch(e){}}
function chosenMs(){return Math.max(0,(Number($('#timerCustomMinutes')?.value||0)*60+Number($('#timerCustomSeconds')?.value||0))*1000)}
function startCountdown(){const ms=chosenMs();if(ms<=0){$('#timerCustomMinutes')?.focus();return}write({mode:'countdown',running:true,baseMs:ms,startedAt:now(),ended:false});beeped=false}
function startStopwatch(){write({mode:'stopwatch',running:true,baseMs:0,startedAt:now(),ended:false});beeped=false}
function togglePause(){let s=state();if(s.mode==='idle'||s.ended)return;s.baseMs=current(s);s.running=!s.running;s.startedAt=s.running?now():0;write(s)}
function resetTimer(){localStorage.removeItem(KEY);beeped=false;render()}
function ensure(){if($('#timerModal'))return;document.body.insertAdjacentHTML('beforeend',`<div class="timer-modal hidden" id="timerModal" role="dialog" aria-modal="true" aria-labelledby="timerTitle"><section class="timer-dialog"><header class="timer-dialog__head"><img src="assets/home-v32-42/horloge.png" alt=""><div><h2 id="timerTitle">Gestion du temps</h2><p>Un affichage grand format, lisible par toute la classe.</p></div><button class="timer-close" id="timerClose" aria-label="Fermer">×</button></header><div class="timer-tools"><section class="timer-tool timer-tool--countdown"><h3>⏳ Minuteur</h3><p>Le temps diminue jusqu’à zéro.</p><div class="timer-countdown-circle" id="timerCountdownCircle" aria-live="polite"><span id="timerCountdownPreview">10:00</span></div><div class="timer-custom timer-custom--expanded"><strong>Durée personnalisée</strong><div><label>Minutes<input id="timerCustomMinutes" type="number" min="0" max="180" value="10" inputmode="numeric"></label><label>Secondes<input id="timerCustomSeconds" type="number" min="0" max="59" value="0" inputmode="numeric"></label></div><button id="timerCustomStart">▶ Démarrer le minuteur</button><button class="timer-tbi-btn" id="timerCountdownTbi" type="button">▣ Vue TBI du minuteur</button><div class="timer-inline-controls"><button id="timerCountdownPause" type="button">⏯ Pause / Reprendre</button><button id="timerCountdownReset" type="button">↺ Remettre à zéro</button></div></div></section><section class="timer-tool timer-tool--stopwatch"><h3>⏱️ Chronomètre</h3><p>Le temps augmente à partir de zéro.</p><div class="timer-stopwatch-preview" id="timerStopwatchPreview">00:00</div><button class="timer-stopwatch-start" id="timerStopwatchStart">▶ Démarrer le chronomètre</button><button class="timer-tbi-btn" id="timerStopwatchTbi" type="button">▣ Vue TBI du chronomètre</button><div class="timer-inline-controls"><button id="timerStopwatchPause" type="button">⏯ Pause / Reprendre</button><button id="timerStopwatchReset" type="button">↺ Remettre à zéro</button></div><small>Le compteur reste actif même lorsque vous fermez cette fenêtre.</small></section></div></section></div>`);
 document.querySelectorAll('#timerQuickBtn,[data-open-timer]').forEach(b=>b.addEventListener('click',open));
$('#timerClose').onclick=close;$('#timerModal').addEventListener('click',e=>{if(e.target.id==='timerModal')close()});
 $('#timerCustomStart').onclick=startCountdown;$('#timerStopwatchStart').onclick=startStopwatch;
 $('#timerCountdownPause').onclick=togglePause;$('#timerStopwatchPause').onclick=togglePause;
 $('#timerCountdownReset').onclick=resetTimer;$('#timerStopwatchReset').onclick=resetTimer;
 ['#timerCustomMinutes','#timerCustomSeconds'].forEach(sel=>$(sel).addEventListener('input',render));
 $('#timerCountdownTbi').onclick=()=>window.open('timer-projector.html?mode=countdown','progressions_timer_countdown_projection','width=1100,height=760');$('#timerStopwatchTbi').onclick=()=>window.open('timer-projector.html?mode=stopwatch','progressions_timer_stopwatch_projection','width=1100,height=760');window.ProgressionsTimer={open}}
function open(){render();$('#timerModal').classList.remove('hidden')}
function close(){$('#timerModal').classList.add('hidden')}
function render(){ensure();const s=state();let v=current(s);
 if(s.mode==='countdown'&&s.running&&v<=0){s.baseMs=0;s.running=false;s.ended=true;localStorage.setItem(KEY,JSON.stringify(s));if(!beeped){sound();beeped=true}}
 const chosen=chosenMs();
 const countDisplay=s.mode==='countdown'?(s.ended?'00:00':fmt(v)):fmt(chosen||600000);
 const swDisplay=s.mode==='stopwatch'?fmt(v):'00:00';
 $('#timerCountdownPreview').textContent=countDisplay;$('#timerStopwatchPreview').textContent=swDisplay;
 $('#timerCountdownCircle').classList.toggle('is-running',s.mode==='countdown'&&s.running);$('#timerCountdownCircle').classList.toggle('is-ended',s.mode==='countdown'&&s.ended);
}
function init(){ensure();render();tick=setInterval(render,250);window.addEventListener('storage',render);document.addEventListener('visibilitychange',render)}document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();})();
