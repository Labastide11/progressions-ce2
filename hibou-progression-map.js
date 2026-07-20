(function(){
  'use strict';
  const normalize=value=>String(value||'').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();

  const rows=[
    {codes:['GRA-P1-02','GRA-P1-03'], title:'Phrase affirmative ou négative', aliases:['Phrase affirmative ou négative','Phrase affirmative / négative','Reconnaître une phrase affirmative ou négative','Forme affirmative et négative','Ceinture blanche']},
    {codes:['GRA-P1-04'], title:'Le verbe conjugué', aliases:['Le verbe conjugué','Trouver le verbe','Repérer le verbe conjugué','Je reconnais un verbe','Ceinture jaune']},
    {codes:['GRA-P1-06'], title:'Le sujet du verbe', aliases:['Le sujet du verbe','Trouver le sujet','Repérer le groupe sujet','Ceinture orange']},
    {codes:['GRA-P2-01'], title:'Le nom commun', aliases:['Le nom commun','Reconnaître un nom','Reconnaître un nom commun','Je reconnais un nom commun','Ceinture verte']},
    {codes:['GRA-P3-01'], title:'Le déterminant', aliases:['Le déterminant','Reconnaître un déterminant','Identifier le déterminant','Ceinture bleue']},
    {codes:['GRA-P1-05'], title:'L’infinitif du verbe', aliases:['L’infinitif du verbe','Trouver l’infinitif','Donner l’infinitif','Ceinture marron']},
    {codes:['GRA-P3-02'], title:'L’adjectif', aliases:['L’adjectif','Reconnaître un adjectif','Identifier l’adjectif','Ceinture noire']},
    {codes:['GRA-P3-03'], title:'Le groupe nominal', aliases:['Le groupe nominal','Reconnaître le groupe nominal','Identifier le groupe nominal','Ceinture rouge']}
  ];

  const byCode={};
  const byAlias={};
  rows.forEach(row=>{
    row.aliases=[row.title].concat(row.aliases||[]);
    row.codes.forEach(code=>byCode[code]=row);
    row.aliases.forEach(alias=>byAlias[normalize(alias)]=row);
  });

  window.HIBOU_PROGRESSION_GRAMMAR={rows,byCode,byAlias,normalize};
})();
