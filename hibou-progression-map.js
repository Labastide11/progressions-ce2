(function(){
  'use strict';
  const normalize=value=>String(value||'').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();

  const rows=[
    // Grammaire
    {domain:'francais',codes:['GRA-P1-02','GRA-P1-03'], title:'Phrase affirmative ou négative', aliases:['Phrase affirmative / négative','Reconnaître une phrase affirmative ou négative','Forme affirmative et négative','grammaire_blanche_phrase_negative','Grammaire ceinture blanche']},
    {domain:'francais',codes:['GRA-P1-04'], title:'Le verbe conjugué', aliases:['Trouver le verbe','Repérer le verbe conjugué','Je reconnais un verbe','grammaire_jaune_verbe','Grammaire ceinture jaune']},
    {domain:'francais',codes:['GRA-P1-06'], title:'Le sujet du verbe', aliases:['Trouver le sujet','Repérer le groupe sujet','grammaire_orange_sujet','Grammaire ceinture orange']},
    {domain:'francais',codes:['GRA-P2-01'], title:'Le nom commun', aliases:['Reconnaître un nom','Reconnaître un nom commun','Je reconnais un nom commun','grammaire_verte_nom','Grammaire ceinture verte']},
    {domain:'francais',codes:['GRA-P3-01'], title:'Le déterminant', aliases:['Reconnaître un déterminant','Identifier le déterminant','grammaire_bleue_determinant','Grammaire ceinture bleue']},
    {domain:'francais',codes:['GRA-P1-05'], title:'L’infinitif du verbe', aliases:['Trouver l’infinitif','Donner l’infinitif','grammaire_marron_infinitif','Grammaire ceinture marron']},
    {domain:'francais',codes:['GRA-P3-02'], title:'L’adjectif', aliases:['Reconnaître un adjectif','Identifier l’adjectif','grammaire_noire_adjectif','Grammaire ceinture noire']},
    {domain:'francais',codes:['GRA-P3-03'], title:'Le groupe nominal', aliases:['Reconnaître le groupe nominal','Identifier le groupe nominal','grammaire_rouge_groupe_nominal','Grammaire ceinture rouge']},

    // Calcul mental
    {domain:'maths',codes:['CAL-P1-01','CAL-P2-01'], title:'Premiers calculs', aliases:['Petits nombres','Premiers automatismes de calcul mental','maths_blanche_petits_nombres','Maths ceinture blanche','Ceinture blanche Premiers calculs','Je sais effectuer mentalement des additions et des soustractions simples reconnaître des nombres proches et utiliser les doubles et les moitiés']},
    {domain:'maths',codes:['CAL-P1-01'], title:'Dizaines entières', aliases:['Dizaines','Ajouter et retrancher des dizaines entières','Ajouter ou enlever des dizaines entières','maths_jaune_dizaines','Maths ceinture jaune','Ceinture jaune Dizaines entières']},
    {domain:'maths',codes:['CAL-P2-03'], title:'Calculs sans retenue', aliases:['Sans retenue','Additions et soustractions sans retenue','maths_orange_sans_retenue','Maths ceinture orange','Ceinture orange Calculs sans retenue']},
    {domain:'maths',codes:['CAL-P2-03','CAL-P4-02'], title:'Calculs avec retenue', aliases:['Avec retenue','Additions et soustractions avec retenue','maths_vert_clair_avec_retenue','Maths ceinture vert clair','Ceinture vert clair Calculs avec retenue']},
    {domain:'maths',codes:['CAL-P1-02'], title:'Complément à la dizaine', aliases:['Complément dizaine','Complement dizaine','Complément à la dizaine suivante','Trouver le complément à la dizaine suivante','maths_vert_fonce_complement_dizaine','Maths ceinture vert foncé','Ceinture vert foncé Complément à la dizaine']},
    {domain:'maths',codes:['CAL-P1-03'], title:'Ajouter ou retrancher 9', aliases:['Ajouter / retrancher 9','Plus ou moins 9','Plus moins 9','maths_bleu_clair_plus_moins_9','Maths ceinture bleu clair','Ceinture bleu clair Ajouter ou retrancher 9']},
    {domain:'maths',codes:['CAL-P4-02'], title:'Ajouter ou retrancher 11', aliases:['Ajouter / retrancher 11','Plus ou moins 11','Plus moins 11','maths_bleu_fonce_plus_moins_11','Maths ceinture bleu foncé','Ceinture bleu foncé Ajouter ou retrancher 11']},
    {domain:'maths',codes:['CAL-P1-01'], title:'Centaines entières', aliases:['Centaines','Ajouter et retrancher des centaines entières','maths_rose_centaines','Maths ceinture rose','Ceinture rose Centaines entières']},
    {domain:'maths',codes:['CAL-P1-02'], title:'Complément à la centaine', aliases:['Complément centaine','Complement centaine','Complément à la centaine suivante','Trouver le complément à la centaine suivante','maths_beige_complement_centaine','Maths ceinture beige','Ceinture beige Complément à la centaine']},
    {domain:'maths',codes:['CAL-P3-01'], title:'Tables de 1, 2 et 10', aliases:['Tables 1 2 10','Tables x1 x2 x10','Tables de multiplication de 1 2 et 10','maths_violet_tables_1_2_10','Maths ceinture violette','Ceinture violette Tables de 1 2 et 10']},
    {domain:'maths',codes:['CAL-P3-01'], title:'Tables de 3, 4 et 5', aliases:['Tables 3 4 5','Tables x3 x4 x5','Tables de multiplication de 3 4 et 5','maths_marron_tables_3_4_5','Maths ceinture marron','Ceinture marron Tables de 3 4 et 5']},
    {domain:'maths',codes:['CAL-P3-01'], title:'Tables de 6 et 7', aliases:['Tables 6 7','Tables x6 x7','Tables de multiplication de 6 et 7','maths_rouge_tables_6_7','Maths ceinture rouge','Ceinture rouge Tables de 6 et 7']},
    {domain:'maths',codes:['CAL-P3-01','CAL-P3-02'], title:'Tables de 8 et 9', aliases:['Tables 8 9','Tables x8 x9','Tables de multiplication de 8 et 9','maths_gris_tables_8_9','Maths ceinture grise','Ceinture grise Tables de 8 et 9']},
    {domain:'maths',codes:['CAL-P2-02'], title:'Multiplier par 10, 100 ou 1 000', aliases:['Multiplier par 10 100 1000','Multiplier par 10 100 ou 1000','maths_noir_multiplier_10_100_1000','Maths ceinture noire','Ceinture noire Multiplier par 10 100 ou 1000']}
  ];

  const byCode={};
  const byAlias={};
  rows.forEach(row=>{
    row.aliases=[row.title].concat(row.aliases||[]);
    row.codes.forEach(code=>byCode[code]=row);
    row.aliases.forEach(alias=>byAlias[normalize(alias)]=row);
  });

  const api={rows,byCode,byAlias,normalize};
  window.HIBOU_PROGRESSION=api;
  // Compatibilité avec le nom utilisé dans les versions précédentes de l'application.
  window.HIBOU_PROGRESSION_GRAMMAR=api;
})();
