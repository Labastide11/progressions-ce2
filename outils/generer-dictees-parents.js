const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'); global.window=global;
vm.runInThisContext(fs.readFileSync(path.join(root,'dictees-ce2.js'),'utf8'));
const src=global.DICTEES_CE2||{},out={version:String(src.version||''),schoolYear:'2026-2027',periods:{}};
for(const p of ['p1','p2','p3','p4','p5']){
 const raw=src[p]||{},list=Array.isArray(raw)?raw:Object.keys(raw).sort((a,b)=>Number(a)-Number(b)).map(k=>raw[k]);
 out.periods[p]=list.map((d,i)=>({week:i+1,theme:d.theme||d.support||'',words:Array.isArray(d.words)?d.words.join(', '):(d.words||''),priority:Array.isArray(d.priority)?d.priority.join(', '):(d.priority||'')}));
}
fs.writeFileSync(path.join(root,'data','parents-dictees.js'),`/* Projection publique générée depuis dictees-ce2.js. */\nwindow.PARENTS_DICTEES_CE2 = ${JSON.stringify(out,null,2)};\n`,'utf8');
console.log('data/parents-dictees.js généré.');
