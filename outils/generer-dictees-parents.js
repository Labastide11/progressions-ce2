// Progressions CE2 V34.96 — régénère la projection publique datée des dictées.
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
global.window=global;
function load(rel){const p=path.join(root,rel);vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});}
load('dictees-ce2.js');
for(const p of ['p1','p2','p3','p4','p5'])load(`data/devoirs-${p}.js`);
const src=global.DICTEES_CE2||{},out={version:'34.96',schoolYear:'2026-2027',periods:{}};
const list=p=>Array.isArray(src[p])?src[p]:Object.keys(src[p]||{}).sort((a,b)=>Number(a)-Number(b)).map(k=>src[p][k]);
const hw=p=>global[`DEVOIRS_${p.toUpperCase()}`]||{weeks:[]};
const dow=iso=>new Date(iso+'T12:00:00').getDay();
for(const p of ['p1','p2','p3','p4','p5']){
  const weeks=hw(p).weeks||[];
  out.periods[p]=list(p).map((d,i)=>{
    const w=weeks[i]||{},items=(w.items||[]).map(x=>String(x&&x.due||'')).filter(x=>x&&(!w.start||x>=w.start)&&(!w.end||x<=w.end));
    const th=items.filter(x=>dow(x)===4).sort(),beforeFri=items.filter(x=>dow(x)!==5).sort();
    return {week:i+1,start:w.start||'',end:w.end||'',reviewDue:th.at(-1)||beforeFri.at(-1)||'',hasFinal:Boolean(String(d.final||'').trim()),theme:d.theme||d.support||'',words:Array.isArray(d.words)?d.words.join(', '):(d.words||''),priority:Array.isArray(d.priority)?d.priority.join(', '):(d.priority||'')};
  });
}
const body=`/* Projection publique datée des dictées — générée depuis les sources Progressions CE2. */\nwindow.PARENTS_DICTEES_CE2 = ${JSON.stringify(out,null,2)};\n`;
fs.writeFileSync(path.join(root,'data','parents-dictees.js'),body,'utf8');
console.log('data/parents-dictees.js généré.');
