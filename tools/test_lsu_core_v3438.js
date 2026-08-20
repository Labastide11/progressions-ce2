const fs=require('fs');
const txt=fs.readFileSync('data.js','utf8');
const selected=[["LEC-P2-01", "lecture"], ["LEC-P5-01", "lecture"], ["COM-P2-05", "comprehension"], ["COM-P4-01", "comprehension"], ["ECR-P2-04", "ecriture"], ["ECR-P5-04", "ecriture"], ["GRA-P4-02", "langue"], ["ORT-P5-02", "langue"], ["NUM-P2-02", "nombres"], ["NUM-P5-01", "nombres"], ["CAL-P3-01", "calcul"], ["CAL-P4-02", "calcul"], ["PRO-P1-01", "problemes"], ["PRO-P5-02", "problemes"], ["ANG-P2-05", "expression_orale"], ["ANG-P5-04", "comprehension_orale"], ["SCI-P1-05", "raisonnement_scientifique"], ["HIS-P3-03", "lecture_documents"]];
for(const [code,group] of selected){
 const marker='"code": "'+code+'"';
 const i=txt.indexOf(marker);
 if(i<0) throw new Error('Code absent: '+code);
 const chunk=txt.slice(i,i+260);
 if(!chunk.includes('"lsuCore": true')) throw new Error('lsuCore absent: '+code);
 if(!chunk.includes('"lsuCoreGroup": "'+group+'"')) throw new Error('Groupe incorrect: '+code);
}
const all=(txt.match(/"lsuCore"\s*:\s*true/g)||[]).length;
if(all!==selected.length) throw new Error('Nombre lsuCore inattendu: '+all);
console.log('OK — 18 compétences structurantes LSU canoniques validées.');
