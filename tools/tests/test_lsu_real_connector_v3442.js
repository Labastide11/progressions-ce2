'use strict';
const fs=require('fs');
const path=require('path');
const src=fs.readFileSync(path.join(__dirname,'..','..','lsu-real-connector.js'),'utf8');
const checks=[
  ["VERSION 1.0.3", /const VERSION='1\.0\.3'/],
  ["timeout 60 s", /Number\(options\.timeoutMs\)\|\|60000/],
  ["late grace 120 s", /Number\(options\.lateGraceMs\)\|\|120000/],
  ["late callback guard", /globalThis\[cb\]=\(\)=>\{\}/],
  ["public getStudentSnapshot alias", /getStudentSnapshot:jsonpSnapshot/],
  ["no POST", !/fetch\([^\n]*method\s*:\s*['\"]POST/i.test(src)],
  ["no save action", !/save_evaluation_trace|enregistrer_trace_evaluation/.test(src)]
];
let ok=true;
for(const [name,test] of checks){
  const pass=typeof test==='boolean'?test:test.test(src);
  console.log((pass?'OK':'FAIL')+' — '+name);
  ok=ok&&pass;
}
if(!ok)process.exit(1);
