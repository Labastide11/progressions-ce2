/* Progressions CE2 V34.87 — Banque annuelle unique des dictées */
(function(){
'use strict';

const p1={
1:{theme:'Rentrée — diagnostic très court',words:'Pas de banque à mémoriser.',priority:'Aucun mot prioritaire.',orthographeCible:'Observer l’encodage des sons, la segmentation et les premières stratégies orthographiques.',motsCibles:'Mots observés dans les productions spontanées des élèves ; pas de liste imposée.',grammaireCible:'Phrase simple, majuscule, ponctuation et relecture.',exempleGrammaire:'Une phrase commence par une majuscule et se termine par un point.',reactivation:'Aucune : état des lieux de rentrée.',reactivationWords:'—',flashes:[],final:'',note:'Observation formative et correction collective raisonnée.'},
2:{theme:'Installer le rituel de dictée',words:'avec, dans, pour, mais, très, aussi, alors, parce que',priority:'avec, dans, pour, mais, très',orthographeCible:'Mémoriser progressivement des mots fréquents et stabiliser les correspondances sons/graphies.',motsCibles:'avec, dans, pour, mais, très, aussi, alors, parce que',grammaireCible:'Reconnaître une phrase ; phrase affirmative et phrase négative.',exempleGrammaire:'« Le chat dort. » / « Le chat ne dort pas. »',reactivation:'Réutiliser les mots rencontrés pendant S1 et commencer une banque commune visible par tous.',reactivationWords:'2 mots du diagnostic de S1 + avec, dans, pour, mais, très',flashes:[],final:'',note:'Semaine d’installation : une petite liste commune est affichée pour que l’élève puisse travailler même sans son cahier.'},
3:{support:'Charivari — série 1 « Le cheval et le fermier »',theme:'Le cheval et le fermier',words:'cheval, voiture, chemin, chien, animal, fermier, chaleur, autour',priority:'cheval, voiture, chemin, chien, animal',orthographeCible:'Encoder les sons et mémoriser les mots fréquents ; observer ch.',motsCibles:'cheval, chemin, chien, chaleur',grammaireCible:'Phrase correcte ; phrase affirmative et phrase négative.',exempleGrammaire:'Transformer une phrase du corpus en phrase négative puis revenir à l’affirmative.',reactivation:'Première banque structurée.',reactivationWords:'—',flashes:[['1a','Sur le chemin de l’église, des chevaux tirent des voitures de fortune.'],['1b','La chaleur est lourde. Le chien tourne autour du fermier.'],['1c','Le fermier encourage les animaux qui tournent autour de lui.']],final:'Par une lourde chaleur, un cheval tire une voiture de fortune sur le chemin de l’église. Un chien tourne autour de lui. Le fermier encourage l’animal.'},
4:{support:'Charivari — série 5 « Les métiers »',theme:'Les métiers',words:'élève, facteur, lettre, planche, atelier, menuisier, distribuer, diriger',priority:'élève, facteur, lettre, planche, atelier',orthographeCible:'Stabiliser l’orthographe lexicale des mots de métiers et des mots fréquents.',motsCibles:'élève, facteur, lettre, planche, atelier, menuisier, distribuer, diriger',grammaireCible:'Repérer le verbe conjugué et retrouver son infinitif.',exempleGrammaire:'Entourer le verbe conjugué puis donner son infinitif.',reactivation:'Réemployer des mots de la semaine précédente.',reactivationWords:'fermier + 1 mot parmi cheval, voiture, chemin, chien, animal, chaleur, autour',flashes:[['5a','L’institutrice dirige ses élèves dans sa classe. Joues-tu bien dans la cour de récréation ?'],['5b','À l’atelier, le menuisier cloue, scie et rabote des planches ; il manie la scie avec adresse.'],['5c','Le facteur passe chaque jour, de bonne heure. Il nous distribue une lettre.']],final:'Chaque jour, le facteur distribue les lettres dans les maisons. À l’atelier, le menuisier cloue, scie et rabote des planches. L’instituteur dirige ses élèves dans sa classe.'},
5:{support:'Charivari — série 6 « Christophe et les nuages »',theme:'Christophe et les nuages',words:'nuage, ciel, chapeau, paysage, sommeil, dame, main, pied',priority:'nuage, ciel, chapeau, paysage, sommeil',orthographeCible:'Singulier/pluriel ; observer notamment le pluriel en -eaux.',motsCibles:'chapeau → chapeaux ; noms au singulier et au pluriel de la banque.',grammaireCible:'Repérer le groupe sujet et le remplacer par un pronom.',exempleGrammaire:'Remplacer « Christophe » ou un groupe nominal par il / ils.',reactivation:'Réemployer au moins deux mots déjà appris.',reactivationWords:'2 mots parmi les banques S3 et S4, en privilégiant les mots fragiles.',flashes:[['6a','Christophe se couche sur le dos et regarde les nuages dans le ciel. L’un imite un chapeau, l’autre une vieille dame.'],['6b','Les nuages imitent des bœufs, des géants, des chapeaux, des vieilles dames, des paysages.'],['6c','Tu parles tout bas avec eux. Tu remues tes pieds et tes mains. Tes yeux se ferment, le sommeil te gagne.']],final:'Christophe se couche sur le dos et regarde les nuages dans le ciel. Ces nuages imitent des bœufs, des géants, des chapeaux, des vieilles dames et des paysages.'},
6:{support:'Charivari — série 4 « La pluie »',theme:'La pluie',words:'pluie, matin, chemin, manteau, nuage, parapluie, froid, rentrer',priority:'pluie, matin, chemin, manteau, nuage',orthographeCible:'Consolider le pluriel ; observer son/sont et les régularités rencontrées.',motsCibles:'manteau → manteaux ; son / sont dans les phrases ; mots de la banque à sécuriser.',grammaireCible:'Consolider verbe, infinitif, sujet et pronom.',exempleGrammaire:'Trouver sujet, verbe, infinitif puis remplacer le sujet par un pronom.',reactivation:'Réutiliser au moins deux mots déjà mémorisés.',reactivationWords:'2 mots déjà appris, choisis parmi ceux encore hésitants.',flashes:[['4a','Un nuage bas annonce le mauvais temps. Il a l’air de nous suivre. Rentrons.'],['4b','Pendant que tu fermes ton manteau pour ne pas avoir froid, Marie abrite son petit frère sous un vaste parapluie bleu.'],['4c','La pluie tombe depuis le matin. Elle forme de la boue sur le chemin. On rentre.']],final:'La pluie tombe depuis le matin. Elle forme de la boue sur le chemin. Les nuages sont bas et annoncent encore du mauvais temps.'},
7:{support:'Réactivation des séries Charivari de P1',theme:'Réactivation personnalisée de la période 1',words:'Chaque élève reprend trois à cinq mots encore fragiles parmi les séries précédentes.',priority:'3 à 5 mots personnalisés par élève.',orthographeCible:'Reprendre les graphies et régularités encore fragiles.',motsCibles:'Mots réellement fragiles repérés dans les banques S3 à S6.',grammaireCible:'Phrase, négation, verbe/infinitif, sujet/pronom, singulier/pluriel.',exempleGrammaire:'Reprendre une phrase antérieure et refaire l’analyse grammaticale.',reactivation:'Réactivation personnalisée.',reactivationWords:'3 à 5 mots personnalisés parmi S3 à S6.',flashes:[['Reprise 1','Le facteur distribue une lettre.'],['Reprise 2','Les nuages annoncent la pluie.'],['Reprise 3','Le chien ne tourne pas autour du fermier.']],final:'Le facteur distribue une lettre. Les nuages annoncent la pluie. Le chien ne tourne pas autour du fermier.'}
};

const annualFrenchPlans={
    p2:[
      {support:'Charivari — série 2 « Pierre et sa ferme »',flash:['Pierre est grand et gros. Il a un visage d’ange et un air malin. À l’école, il est fort en grammaire.','Pierre et moi, nous sommes dans la même classe. Chaque mercredi, nous allons au village proche.','Pierre a une ferme à la campagne avec une poule et des cochons.'],final:'Pierre est grand et gros. Il a un visage d’ange et un air malin. À l’école, il est fort en grammaire. Nous sommes dans la même classe. Chaque mercredi, nous allons au village proche. Il a une ferme à la campagne avec des poules et un cochon.',words:['école','classe','village','ferme','poule','cochon','campagne','chaque'],priority:['école','classe','ferme','poule','cochon'],vocab:['village : lieu, famille et emploi en contexte','campagne : sens, contraire ville, champ lexical','malin : synonymes, nuances et phrase personnelle']},
      {support:'Charivari — série 3 « Une rencontre à la sortie de l’usine »',flash:['Le directeur rencontre des visiteurs à la sortie de l’usine.','Mon père a mangé du fromage et un œuf : il est un peu malade. Mon oncle joue de la musique à un mariage.','Bonjour, comment va votre famille ? — Ça va ! — Au revoir, bonne journée !'],final:'À la sortie de l’usine, le directeur rencontre un visiteur. — Bonjour ! Comment va votre famille ? — Mon père a mangé du fromage et un œuf : il est un peu malade. Mon oncle joue de la musique à un mariage. — Au revoir et bonne journée !',words:['directeur','visiteur','usine','fromage','œuf','malade','famille','journée'],priority:['directeur','visiteur','usine','famille','journée'],vocab:['visiteur : famille visiter, visite','usine : lieu de production, classement des lieux','journée : famille jour, emploi oral puis écrit']},
      {support:'Charivari — série 7 « Novembre et la tempête »',flash:['C’est le mois de novembre. Souvent, le vent souffle et c’est la tempête ! Vivement le mois de mai !','Les derniers orages inondent les champs et la route. L’arbre plie et les feuilles tombent.','Au moment de rentrer à l’abri, nous pensons au mois de mai. Nous ferons des bouquets de muguet blanc.'],final:'Au mois de novembre, le vent souffle souvent en tempête. Les arbres plient et les feuilles tombent. Parfois, un dernier orage inonde les champs et les routes. C’est le moment de rentrer. Vivement le mois de mai et le muguet blanc qui fera des bouquets !',words:['novembre','vent','tempête','orage','feuille','champ','abri','bouquet'],priority:['vent','tempête','orage','feuille','abri'],vocab:['tempête : définition et intensité','abri : famille abriter et situations','bouquet : sens propre et classements']},
      {support:'Charivari — série 8 « Le cheval artiste »',flash:['C’est un cheval artiste. La nuit, il quitte son écurie et va jusqu’à l’atelier où travaillent les soldats.','Il trempe sa queue dans un pot de couleur. Il fait sauter sur lui mille gouttes bleues.','Il trempe encore sa queue dans un autre pot et mille gouttes jaunes sautent sur lui. Il est fier !'],final:'C’est un cheval artiste. La nuit, il quitte son écurie et traverse la cour jusqu’à l’atelier où travaillent les soldats. Il trempe sa queue dans un pot de couleur. Il fait sauter sur lui mille petites gouttes bleues. Il la trempe encore dans un autre pot et mille petites gouttes jaunes sautent sur lui. Il est fier !',words:['artiste','écurie','atelier','couleur','goutte','queue','jaune','fier'],priority:['artiste','écurie','couleur','goutte','fier'],vocab:['artiste : famille art, artistique','écurie : lieu et champ lexical du cheval','fier : synonymes, contraire et nuances']},
      {support:'Charivari — série 9 « Le match au stade »',flash:['Où sommes-nous ? Sur le stade qui grandit chaque année.','Tu bondis vivement sur le ballon. Il franchit le milieu du terrain et tu réussis à faire une passe à ton fidèle camarade.','Est-ce parce que le joueur est adroit ou parce qu’il a de la chance ? Plus tard, il frappe la balle et marque un but.'],final:'Où sommes-nous ? Sur le stade qui grandit chaque année. Éric bondit vivement sur le ballon. Il franchit le milieu du terrain et réussit à faire des passes à son fidèle camarade. Est-ce parce qu’il est adroit ou qu’il a de la chance ? Plus tard, il frappe la balle et marque deux buts.',words:['stade','ballon','terrain','passe','camarade','adroit','chance','but'],priority:['stade','ballon','terrain','camarade','but'],vocab:['adroit : synonymes habile, précis','terrain : polysémie et contexte','camarade : mots proches et emploi oral']},
      {support:'Charivari — série 10 « La fête foraine »',flash:['Nicolas manie une fine canne pour remonter les petits canards jaunes. Il aura bientôt un beau cadeau.','Valérie a envie de faire un tour sur les chevaux de bois mais Nicolas préfère la pêche à la ligne.','Les manèges enfantins arrivent sur la petite place. Un large drapeau tricolore flotte à la porte de la mairie.'],final:'Un manège enfantin arrive sur la petite place. De larges drapeaux tricolores flottent à la porte de la mairie. Valérie s’approche des chevaux de bois : elle a envie d’en faire un tour. C’est la pêche à la ligne que Nicolas préfère. Il manie avec joie les fines gaules pour remonter un petit canard jaune. Il aura bientôt de beaux cadeaux.',words:['cadeau','canard','pêche','ligne','manège','drapeau','mairie','place'],priority:['cadeau','canard','manège','drapeau','mairie'],vocab:['manège : sens et famille','tricolore : préfixe tri- et couleurs','mairie : famille maire, municipal']},
      {support:'Charivari — série 11 « Mademoiselle Guimard »',flash:['Mademoiselle Guimard était très grande avec une jolie petite coiffe noire.','Quand elle parlait, son nez remuait. Pourtant, je la trouvais laide à voir.','J’approchais de mes six ans et j’allais à l’école dans la classe enfantine que dirigeait mademoiselle Guimard.'],final:'J’approchais de mes six ans et j’allais à l’école dans la classe enfantine que dirigeait mademoiselle Guimard. Mademoiselle Guimard était très grande, avec de jolies petites boucles noires et, quand elle parlait, son nez remuait. Pourtant, je la trouvais laide à voir.',words:['mademoiselle','grande','jolie','coiffe','noire','parlait','pourtant','classe'],priority:['grande','jolie','noire','parlait','classe'],vocab:['coiffe : sens, famille coiffer','pourtant : connecteur et emploi','enfantine : famille enfant et suffixe']}
    ],
    p3:[
      {support:'Charivari — série 12 « Le bonhomme de neige »',flash:['Des gamins pétrissaient une grosse boule de neige, la posaient délicatement sur une couche bien unie et la poussaient avec prudence.','Le gamin la poussait d’abord de la main droite, puis de la main gauche, puis avec ses deux mains, puis enfin avec ses pieds et ses mains.','Tu accourais. Vous unissiez vos efforts, et bientôt, l’énorme bloc creusé de deux yeux devenait un bonhomme imposant.'],final:'Un gamin pétrissait entre ses mains une grosse boule de neige, la posait délicatement sur une couche bien unie et la poussait avec prudence. D’autres gamins accouraient. Ils unissaient leurs efforts, et bientôt, l’énorme bloc creusé de deux yeux devenait un bonhomme imposant.',words:['boule','neige','gamin','délicatement','prudence','effort','énorme','bonhomme'],priority:['boule','neige','gamin','effort','bonhomme'],vocab:['pétrir : action, mime et synonymes','prudence : famille prudent et contraire','imposant : sens et nuances']},
      {support:'Charivari — série 13 « La pieuvre »',flash:['La pieuvre est une cousine de l’escargot, mais elle n’a pas de coquille pour se protéger. Elle se faufile dans les failles des rochers.','Les pieuvres sont des cousines des escargots mais elles n’ont pas de coquille pour se protéger, alors elles se faufilent dans les trous des rochers.','Une fois cachées, les requins ou les hommes n’ont aucune chance de les trouver !'],final:'Sais-tu que les pieuvres sont des cousines des escargots ? Comme elles n’ont pas de coquille pour se protéger, elles se faufilent dans les failles des rochers. Elles se cachent, et les requins ou les hommes ne peuvent plus les trouver !',words:['pieuvre','escargot','coquille','faille','rocher','protéger','requin','cacher'],priority:['pieuvre','coquille','rocher','protéger','requin'],vocab:['faille : sens dans un rocher','se faufiler : mime, synonyme se glisser','protéger : famille protection, protecteur']},
      {support:'Charivari — série 14 « Les dauphins »',flash:['Les dauphins sont des mammifères très joueurs. On dit qu’ils sont aussi intelligents que les hommes.','Ils communiquent entre eux par des sifflements. On dit que des dauphins ont sauvé des marins de la noyade.','Le dauphin peut nager jusqu’à plus de deux-cents mètres de fond et rester sous l’eau pendant environ huit minutes.'],final:'Le dauphin est un mammifère très joueur. On dit qu’il est aussi intelligent que l’homme. Les dauphins sifflent pour communiquer. Ils nagent très bien et peuvent rester sous l’eau jusqu’à dix minutes.',words:['dauphin','mammifère','joueur','intelligent','communiquer','sifflement','marin','nager'],priority:['dauphin','mammifère','communiquer','marin','nager'],vocab:['mammifère : classement scientifique','communiquer : famille communication','noyade : sens et prévention']},
      {support:'Charivari — série 15 « La fourmilière »',flash:['Les fourmis forment des colonies dans des nids qui ressemblent à de véritables villes souterraines.','La plupart sont des ouvrières : elles fabriquent et réparent le nid pendant que les soldats gardent l’entrée.','La reine est très grosse et pond des millions d’œufs. La survie de la fourmilière dépend d’elle.'],final:'Dans les fourmilières, les fourmis vivent en colonies. Les ouvrières fabriquent le nid ou le réparent pendant que les soldats gardent l’entrée. Les autres vont chercher la nourriture pour la reine.',words:['fourmi','colonie','nid','souterrain','ouvrière','soldat','reine','fourmilière'],priority:['fourmi','nid','ouvrière','reine','fourmilière'],vocab:['colonie : groupe d’animaux','souterrain : préfixe sous-','survie : famille vivre, survivre']},
      {support:'Charivari — série 16 « Les rapaces »',flash:['L’aigle est un rapace. Cet oiseau puissant et rapide chasse d’autres oiseaux et de petits animaux.','Les aigles, les buses et les faucons sont des rapaces. Ces oiseaux puissants et rapides chassent d’autres oiseaux ainsi que de petits animaux.','Tous les rapaces ont un bec crochu, des serres acérées et une vue perçante qui leur permet de repérer un lapin à cinq kilomètres.'],final:'Les rapaces, puissants et rapides, chassent les oiseaux et d’autres petits animaux. Ils ont tous un bec crochu, des serres acérées et une bonne vue. Ainsi, ils peuvent repérer un lapin à cinq kilomètres !',words:['aigle','rapace','puissant','rapide','chasser','bec','serre','repérer'],priority:['aigle','rapace','chasser','bec','repérer'],vocab:['rapace : catégorie et exemples','acéré : sens, synonymes tranchant, pointu','repérer : famille repère et emploi']}
    ],
    p4:[
      {support:'Charivari — série 17 « Les mammifères »',flash:['Les mammifères sont des animaux étonnants : certains grimpent, d’autres courent ou creusent des terriers.','Il y a des mammifères qui volent, comme la chauve-souris, ou qui vivent dans l’eau, comme le phoque. Il y en a même qui pondent des œufs !','Pourtant, ils ont tous des poils et des poumons pour respirer. Enfin, ils allaitent tous leurs petits.'],final:'Les mammifères paraissent tous différents : il y en a qui grimpent, d’autres qui courent, volent ou nagent. Mais tous ont des poils et des poumons pour respirer, et tous allaitent leurs petits.',words:['mammifère','étonnant','grimper','terrier','chauve-souris','phoque','poumon','respirer'],priority:['mammifère','terrier','phoque','poumon','respirer'],vocab:['terrier : habitat et champ lexical','respirer : famille respiration','étonnant : synonymes surprenant, remarquable']},
      {support:'Charivari — série 18 « Le kangourou »',flash:['La femelle kangourou a une poche sur le ventre pour transporter ses petits. Les bébés s’y nourrissent et s’y abritent du danger.','La queue du kangourou lui permet de rester en équilibre quand il saute.','Il a une tête allongée et de grosses dents aplaties qui lui servent à broyer l’herbe.'],final:'Les kangourous ont une grande queue qui leur permet de garder l’équilibre quand ils sautent. Ils broient l’herbe avec leurs grosses dents aplaties. Les femelles ont une poche sur le ventre pour transporter leurs petits. Les bébés s’y nourrissent et s’y abritent du danger.',words:['kangourou','femelle','poche','ventre','danger','équilibre','sauter','broyer'],priority:['kangourou','poche','danger','équilibre','sauter'],vocab:['équilibre : sens propre et figuré','broyer : action, synonymes écraser','abriter : famille abri et réemploi']},
      {support:'Charivari — série 19 « Les félins chasseurs »',flash:['Les félins sont des carnivores. Ce sont des chasseurs féroces et efficaces.','Ils traquent leur proie en s’approchant prudemment et silencieusement. Tout à coup, ils fondent sur elle et la tuent d’un coup de dents.','Le tigre suit sa proie. Il s’approche prudemment. Il ne remue plus. Soudain, il fond sur elle.'],final:'Les félins suivent leur proie en s’approchant prudemment et silencieusement. Tout à coup, ils fondent sur elle et la tuent d’un coup de dents. Ce sont des chasseurs efficaces.',words:['félin','carnivore','chasseur','féroce','efficace','proie','prudemment','silencieusement'],priority:['félin','carnivore','chasseur','proie','féroce'],vocab:['proie : relation prédateur-proie','féroce : synonymes et nuances','efficace : sens et contraire inefficace']},
      {support:'Charivari — série 20 « Les chauves-souris »',flash:['Les chauves-souris sont des mammifères volants couverts de fourrure.','Elles habitent le monde entier mais tu ne les verras pas souvent voler.','Elles sont de plus en plus rares parce que l’homme détruit leurs abris et leurs proies.'],final:'Les chauves-souris sont des mammifères volants couverts de fourrure. Elles se suspendent la tête en bas pour se reposer pendant le jour. Elles sont de plus en plus rares parce que les hommes détruisent leurs abris.',words:['chauve-souris','mammifère','volant','fourrure','monde','rare','détruire','abri'],priority:['chauve-souris','fourrure','rare','détruire','abri'],vocab:['rare : contraire fréquent, commun','fourrure : définition et classement','détruire : famille destruction, contraire construire']},
      {support:'Charivari — série 21 « Les éléphants »',flash:['L’éléphant est le plus gros mammifère terrestre. Il pèse cinq tonnes, plus que six voitures.','Les éléphants sont les plus gros mammifères terrestres. Ils pèsent plus que six voitures.','Ils modifient beaucoup les paysages dans lesquels ils vivent : ils déracinent les arbres et fertilisent le sol.'],final:'Les éléphants sont les plus gros mammifères terrestres. Ils pèsent plus que six voitures. Ils modifient beaucoup le paysage dans lequel ils vivent : ils créent des passages dans la brousse et déracinent les arbres.',words:['éléphant','mammifère','terrestre','tonne','paysage','déraciner','fertiliser','sol'],priority:['éléphant','terrestre','tonne','paysage','sol'],vocab:['terrestre : famille terre et contraires','déraciner : préfixe dé- et famille racine','fertiliser : sens dans le contexte']},
      {support:'Charivari — série 22 « Chameaux et dromadaires »',flash:['Les chameaux et les dromadaires vivent dans les déserts de sable. Aujourd’hui, très peu vivent à l’état sauvage.','Avec la peau, on fait des chaussures, les poils donnent de la laine et les bouses séchées servent de combustible.','La graisse stockée dans leur bosse les protège des rayons du soleil et ils transpirent peu pour économiser l’eau.'],final:'Les chameaux et les dromadaires vivent dans les déserts de sable. Ils sont protégés des rayons du soleil par leurs bosses et ils transpirent peu pour économiser l’eau. Les hommes utilisent leur peau, leurs poils et la bouse séchée.',words:['chameau','dromadaire','désert','sable','sauvage','laine','bosse','économiser'],priority:['chameau','dromadaire','désert','sable','bosse'],vocab:['désert : sens, paysages et famille','combustible : définition en contexte','économiser : plusieurs contextes d’emploi']}
    ],
    p5:[
      {support:'Le voyage — 1 « La tour Eiffel »',flash:['La tour Eiffel se trouve à Paris, en bordure de la Seine.','Elle a été construite pour l’Exposition universelle de 1889.','Elle est devenue le symbole de la capitale française.'],final:'La tour Eiffel est située à Paris, en bordure de la Seine. Construite pour l’Exposition universelle de 1889, elle est devenue le symbole de la capitale française.',words:['mètre','hauteur','tour','bordure','Seine','exposition','monument','symbole'],priority:['hauteur','tour','Seine','monument','symbole'],vocab:['monument : définition et exemples','symbole : sens et réemploi','bordure : famille bord et position']},
      {support:'Le voyage — 2 « La tour de Londres »',flash:['La tour de Londres est une forteresse historique.','Elle est composée de plusieurs bâtiments sur la rive de la Tamise.','Deux murailles entourent la tour et le château servait autrefois de prison.'],final:'La tour de Londres est une forteresse historique située sur la rive de la Tamise. Plusieurs bâtiments et deux murailles composent cet ancien château, autrefois utilisé comme prison.',words:['forteresse','Tamise','bâtiment','rive','château','muraille','prison','plusieurs'],priority:['forteresse','Tamise','château','muraille','prison'],vocab:['forteresse : famille fort et fonction','muraille : synonymes mur, rempart','rive : sens géographique']},
      {support:'Le voyage — 3 « Le Colisée »',flash:['Le Colisée est un amphithéâtre romain datant de l’Antiquité.','Il se trouve dans le centre-ville de Rome, en Italie.','On y organisait des combats de gladiateurs et des courses de chars.'],final:'Le Colisée est un amphithéâtre romain datant de l’Antiquité. Situé au centre de Rome, il accueillait des spectacles, des combats de gladiateurs et des courses de chars.',words:['amphithéâtre','Antiquité','centre-ville','spectacle','combat','gladiateur','course','char'],priority:['amphithéâtre','Antiquité','spectacle','gladiateur','char'],vocab:['amphithéâtre : définition et forme','gladiateur : contexte historique','Antiquité : repère temporel']},
      {support:'Le voyage — 4 « La statue de la Liberté »',flash:['La statue de la Liberté se dresse à l’entrée du port de New York.','Cette sculpture monumentale a été offerte par la France aux États-Unis.','Elle mesure plus de quarante-six mètres et elle est recouverte de cuivre.'],final:'La statue de la Liberté est une sculpture monumentale située à l’entrée du port de New York. Offerte par la France aux États-Unis, elle mesure plus de quarante-six mètres et est recouverte de cuivre.',words:['statue','sculpture','île','entrée','port','New York','cuivre','ériger'],priority:['statue','sculpture','île','port','cuivre'],vocab:['sculpture : famille sculpter, sculpteur','ériger : synonymes dresser, construire','liberté : sens et valeurs']},
      {support:'Le voyage — 5 « La Grande Muraille »',flash:['La Grande Muraille marque une ancienne frontière de la Chine.','Des tours de guet et des bastions se dressent sur toute sa longueur.','Des millions d’ouvriers ont participé à sa construction.'],final:'La Grande Muraille a été construite pour défendre la frontière nord de la Chine. Des tours de guet et des bastions jalonnent cette immense structure architecturale.',words:['muraille','frontière','Chine','invasion','structure','longueur','tour de guet','bastion'],priority:['muraille','frontière','Chine','tour de guet','bastion'],vocab:['frontière : sens géographique','bastion : rôle défensif','architectural : famille architecture']},
      {support:'Le voyage — 6 « Le Taj Mahal »',flash:['Le Taj Mahal est un magnifique mausolée de marbre blanc.','Il se trouve à Agra, au nord de l’Inde.','Un empereur l’a fait construire pour honorer la mémoire de son épouse.'],final:'Le Taj Mahal est un magnifique mausolée de marbre blanc situé à Agra, en Inde. Un empereur l’a fait construire pour honorer la mémoire de son épouse.',words:['mausolée','marbre','Inde','empereur','mémoire','épouse','façade','dôme'],priority:['mausolée','marbre','Inde','empereur','dôme'],vocab:['mausolée : définition','honorer : famille honneur','façade : partie d’un bâtiment']},
      {support:'Le voyage — 7 « Le Machu Picchu »',flash:['Le Machu Picchu est une ancienne cité inca.','Elle a été construite dans les Andes, à plus de deux mille mètres d’altitude.','Une partie de la ville était dédiée au dieu Soleil.'],final:'Le Machu Picchu est une ancienne cité inca construite dans les Andes, au Pérou. Située à plus de deux mille mètres d’altitude, elle possède des temples et des terrasses de culture.',words:['Andes','montagne','Pérou','altitude','cité','peuple','temple','terrasse'],priority:['Andes','Pérou','altitude','cité','temple'],vocab:['altitude : définition et mesure','cité : synonymes ville, agglomération','terrasse : sens selon le contexte']},
      {support:'Le voyage — 8 « L’île de Pâques »',flash:['L’île de Pâques se trouve dans l’océan Pacifique.','Elle est célèbre pour ses statues impressionnantes appelées les Moaïs.','Ces statues ont été taillées dans la roche d’un volcan.'],final:'L’île de Pâques, appelée aussi Rapa Nui, se trouve dans l’océan Pacifique. Elle est célèbre pour ses immenses statues, les Moaïs, taillées dans la roche volcanique.',words:['île','Pâques','navigateur','océan','statue','Moaï','volcan','côte'],priority:['île','océan','statue','Moaï','volcan'],vocab:['navigateur : famille naviguer','volcan : champ lexical','impressionnant : synonymes et intensité']},
      {support:'Le voyage — 9 « Le Christ Rédempteur »',flash:['Le Christ Rédempteur domine la ville de Rio de Janeiro.','Cette statue monumentale se trouve au sommet du mont Corcovado.','Elle a été conçue par un sculpteur français et un architecte brésilien.'],final:'Le Christ Rédempteur est une statue monumentale qui domine Rio de Janeiro, au Brésil. Située au sommet du mont Corcovado, elle est devenue le symbole de la ville.',words:['Christ','statue','Rio de Janeiro','Brésil','mont','socle','symbole','architecte'],priority:['statue','Brésil','mont','symbole','architecte'],vocab:['dominer : sens spatial et figuré','socle : partie d’un monument','architecte : métier et famille']},
      {support:'Le voyage — 10 « La pyramide de Khéops »',flash:['La pyramide de Khéops se situe près du Caire, en Égypte.','Elle a été construite avec d’énormes pierres de taille.','Des couloirs conduisent à plusieurs salles et à la chambre du roi.'],final:'La pyramide de Khéops se situe près du Caire, en Égypte. Construite il y a plus de quarante-cinq siècles, elle renferme des couloirs, des salles et la chambre du pharaon.',words:['pyramide','Caire','Égypte','siècle','ouvrier','pierre','couloir','pharaon'],priority:['pyramide','Égypte','siècle','couloir','pharaon'],vocab:['pharaon : contexte historique','siècle : durée et repère','renfermer : sens dans le texte']},
      {support:'Le voyage — 11 « Le Sphinx de Gizeh »',flash:['Le Sphinx possède un corps de lion et une tête humaine.','Il se trouve devant les pyramides de Gizeh, en Égypte.','Cette statue antique veille sur le site depuis des milliers d’années.'],final:'Le Sphinx de Gizeh est une immense statue au corps de lion et à la tête humaine. Placé devant les pyramides d’Égypte, il semble garder ce site antique depuis des milliers d’années.',words:['Sphinx','corps','lion','tête','pyramide','Gizeh','antique','garde'],priority:['Sphinx','lion','pyramide','Gizeh','antique'],vocab:['sphinx : description et culture','antique : famille Antiquité','veiller : plusieurs sens et emploi']}
    ]
  };

const p2Meta=[
{orthographeCible:'Accord déterminant–nom au pluriel ; homophone a / à.',motsCibles:'poule → poules ; cochon → cochons ; « il a » / « à l’école ».',grammaireCible:'Nom commun / nom propre et accord dans le groupe nominal.',exempleGrammaire:'Repérer les noms dans « Pierre a une ferme à la campagne avec des poules et un cochon. »',reactivation:'Réactiver 3 mots de P1.',reactivationWords:'fermier, nuage, chemin'},
{orthographeCible:'Mots en -eur ; graphème œu ; homophone et / est.',motsCibles:'directeur, visiteur, œuf ; « il est malade » / « et bonne journée ».',grammaireCible:'Reconnaître et employer les noms ; consolider le présent.',exempleGrammaire:'Comparer « Le visiteur est malade. » et « Le directeur et le visiteur parlent. »',reactivation:'Réactiver 3 mots antérieurs.',reactivationWords:'ferme, cochon, campagne'},
{orthographeCible:'m devant m, b, p ; consolidation du pluriel.',motsCibles:'tempête ; arbres, feuilles, champs, routes, bouquets.',grammaireCible:'Accord déterminant–nom et repérage du verbe.',exempleGrammaire:'Passer de « l’arbre plie » à « les arbres plient ».',reactivation:'Réactiver 3 mots déjà appris.',reactivationWords:'école, famille, journée'},
{orthographeCible:'Graphèmes c / qu / g pour les sons [k] et [g].',motsCibles:'couleur, écurie, queue, goutte.',grammaireCible:'Présent des verbes en -er ; sujet et verbe.',exempleGrammaire:'Comparer « il trempe » / « ils trempent ».',reactivation:'Réactiver 3 mots antérieurs.',reactivationWords:'tempête, feuille, chemin'},
{orthographeCible:'s / ss et distinction ou / où.',motsCibles:'passe ; « Où sommes-nous ? » / « adroit ou chanceux ? ».',grammaireCible:'Phrase interrogative et accord sujet–verbe.',exempleGrammaire:'Transformer une affirmation sur le match en question.',reactivation:'Réactiver 3 mots antérieurs.',reactivationWords:'atelier, journée, orage'},
{orthographeCible:'Pluriel des noms en -eau ; homophone a / à.',motsCibles:'cadeau → cadeaux ; drapeau → drapeaux ; « a envie » / « à la porte ».',grammaireCible:'Accord dans le groupe nominal et repérage du verbe.',exempleGrammaire:'Passer de « un beau cadeau » à « de beaux cadeaux ».',reactivation:'Réactiver 3 mots antérieurs.',reactivationWords:'ballon, terrain, passe'},
{orthographeCible:'Accords dans le groupe nominal ; observation de l’imparfait.',motsCibles:'grande, jolie, noire → jolies petites boucles noires ; parlait, approchais, allait.',grammaireCible:'Accord nom–adjectif et observation des formes verbales.',exempleGrammaire:'Comparer « une jolie coiffe noire » et « de jolies boucles noires ».',reactivation:'Boucle de consolidation P2.',reactivationWords:'3 à 5 mots fragiles de P2 + au moins 1 mot de P1.'}
];
annualFrenchPlans.p2.forEach((plan,i)=>Object.assign(plan,p2Meta[i]||{}));

const p3Meta=[
{
  orthographeCible:'m devant m, b, p ; accents et orthographe lexicale.',
  motsCibles:'bonhomme, imposant ; délicatement, énorme ; prudence.',
  grammaireCible:'Accord sujet–verbe à l’imparfait et marques du pluriel.',
  exempleGrammaire:'Comparer « le gamin poussait » / « les gamins poussaient ».',
  reactivation:'Réactiver des mots de P2 dans une phrase à l’imparfait.',
  reactivationWords:'tempête, cadeau, directeur'
},
{
  orthographeCible:'Accents ; familles de mots ; pluriel des noms.',
  motsCibles:'protéger → protection ; coquille, faille, rocher ; pieuvre → pieuvres.',
  grammaireCible:'Accord dans le groupe nominal et reprise pronominale.',
  exempleGrammaire:'Passer de « la pieuvre cachée » à « les pieuvres cachées » puis reprendre par elles.',
  reactivation:'Réactiver 3 mots déjà appris.',
  reactivationWords:'bonhomme, neige, effort'
},
{
  orthographeCible:'Familles de mots ; suffixes ; accords dans le groupe nominal.',
  motsCibles:'communiquer → communication ; sifflement ; mammifère ; intelligent.',
  grammaireCible:'Accord nom–adjectif et sujet–verbe au présent.',
  exempleGrammaire:'Comparer « le dauphin intelligent nage » / « les dauphins intelligents nagent ».',
  reactivation:'Réactiver des mots de P3 et P2.',
  reactivationWords:'protéger, rocher, cadeau'
},
{
  orthographeCible:'Préfixe sous- ; familles de mots ; pluriel régulier.',
  motsCibles:'souterrain ; fourmi → fourmis ; ouvrière → ouvrières ; survivre → survie.',
  grammaireCible:'Accords dans le groupe nominal et emploi du présent.',
  exempleGrammaire:'Transformer « l’ouvrière fabrique le nid » en « les ouvrières fabriquent les nids ».',
  reactivation:'Réactiver 3 mots antérieurs.',
  reactivationWords:'mammifère, communiquer, coquille'
},
{
  orthographeCible:'Accords dans le groupe nominal ; orthographe lexicale de mots complexes.',
  motsCibles:'puissant → puissants ; rapide → rapides ; rapace ; repérer ; acéré.',
  grammaireCible:'Chaîne d’accords nom–adjectif et sujet–verbe.',
  exempleGrammaire:'Comparer « l’oiseau puissant chasse » / « les oiseaux puissants chassent ».',
  reactivation:'Boucle de consolidation P3.',
  reactivationWords:'3 à 5 mots fragiles de P3 + 1 mot de P2'
}
];
annualFrenchPlans.p3.forEach((plan,i)=>Object.assign(plan,p3Meta[i]||{}));

/* V34.89 — Chaîne pédagogique : corpus de dictée → DRAS → production d’écrit.
   Chaque activité d’écriture réemploie volontairement le vocabulaire de la dictée. */
const p1Dras={
  1:{phraseDepart:'Une phrase de l’élève observée pendant le diagnostic.',supprimer:'Supprimer un mot inutile si la phrase reste compréhensible.',deplacer:'Déplacer un groupe court et vérifier que la phrase garde du sens.',remplacer:'Remplacer un mot trop vague par un mot plus précis.',ajouter:'Ajouter une précision utile.',production:'Réécrire une phrase correcte avec majuscule et point.',motsAEmployer:'mots réellement relevés dans les productions des élèves'},
  2:{phraseDepart:'Le chat dort dans la classe.',supprimer:'Supprimer « dans la classe ».',deplacer:'Déplacer « dans la classe » au début.',remplacer:'Remplacer « le chat » par un nom rencontré en classe.',ajouter:'Ajouter un mot pour préciser comment il dort.',production:'Écrire une phrase affirmative puis sa forme négative.',motsAEmployer:'avec, dans, pour, mais, très, aussi'},
  3:{phraseDepart:'Le chien tourne autour du fermier.',supprimer:'Supprimer « autour du fermier » et observer ce qui change.',deplacer:'Déplacer « autour du fermier » au début de la phrase.',remplacer:'Remplacer « le chien » par « les chiens » et faire les accords nécessaires.',ajouter:'Ajouter un adjectif à chien ou fermier.',production:'Écrire une nouvelle phrase contenant chemin et fermier.',motsAEmployer:'cheval, chemin, chien, fermier'},
  4:{phraseDepart:'Le facteur distribue une lettre dans le village.',supprimer:'Supprimer « dans le village ».',deplacer:'Déplacer « dans le village » au début.',remplacer:'Remplacer « le facteur » par « les facteurs » puis ajuster le verbe.',ajouter:'Ajouter un complément avec atelier ou classe.',production:'Écrire deux phrases sur un métier avec distribuer ou diriger.',motsAEmployer:'facteur, lettre, atelier, distribuer, diriger'},
  5:{phraseDepart:'Le nuage ressemble à un grand chapeau.',supprimer:'Supprimer « grand » puis comparer la précision.',deplacer:'Déplacer un complément choisi dans une phrase flash.',remplacer:'Remplacer « le nuage » par « les nuages » et faire les accords.',ajouter:'Ajouter un adjectif à paysage ou chapeau.',production:'Écrire deux phrases avec nuage et paysage.',motsAEmployer:'nuage, chapeau, paysage, ciel'},
  6:{phraseDepart:'La pluie tombe depuis le matin sur le chemin.',supprimer:'Supprimer « depuis le matin ».',deplacer:'Déplacer « sur le chemin » au début.',remplacer:'Remplacer « la pluie » par « les nuages » et modifier la phrase.',ajouter:'Ajouter un adjectif à manteau ou parapluie.',production:'Écrire deux phrases sur le mauvais temps avec pluie, nuage et chemin.',motsAEmployer:'pluie, nuage, chemin, manteau, parapluie'},
  7:{phraseDepart:'Le facteur distribue une lettre.',supprimer:'Choisir un groupe que l’on peut supprimer dans une phrase déjà travaillée.',deplacer:'Déplacer un groupe dans une ancienne phrase.',remplacer:'Remplacer un sujet singulier par un sujet pluriel.',ajouter:'Ajouter un adjectif ou un complément.',production:'Réécrire une ancienne phrase en utilisant au moins deux mots encore fragiles.',motsAEmployer:'3 à 5 mots personnalisés parmi les banques P1'}
};
Object.keys(p1Dras).forEach(k=>{ if(p1[k]) p1[k].ecritureDRAS=p1Dras[k]; });

const p2Dras=[
  {phraseDepart:'Pierre a une ferme à la campagne.',supprimer:'Supprimer « à la campagne ».',deplacer:'Déplacer « à la campagne » au début.',remplacer:'Remplacer « une ferme » par « des fermes » puis adapter la phrase.',ajouter:'Ajouter poule ou cochon dans un groupe complément.',production:'Décrire la ferme de Pierre en deux phrases.',motsAEmployer:'ferme, campagne, poule, cochon, village'},
  {phraseDepart:'Le directeur rencontre un visiteur à la sortie de l’usine.',supprimer:'Supprimer « à la sortie de l’usine ».',deplacer:'Déplacer ce groupe au début.',remplacer:'Remplacer « un visiteur » par « des visiteurs » et vérifier les accords.',ajouter:'Ajouter une précision avec famille ou journée.',production:'Écrire un court dialogue de deux répliques à la sortie de l’usine.',motsAEmployer:'directeur, visiteur, usine, famille, journée'},
  {phraseDepart:'Le vent souffle pendant la tempête.',supprimer:'Supprimer « pendant la tempête ».',deplacer:'Déplacer « pendant la tempête » au début.',remplacer:'Remplacer « le vent » par « les orages » et adapter le verbe.',ajouter:'Ajouter un adjectif à vent, feuille ou champ.',production:'Écrire deux phrases sur une tempête en réemployant un mot ancien.',motsAEmployer:'vent, tempête, orage, feuille, abri + un ancien mot'},
  {phraseDepart:'Le cheval artiste trempe sa queue dans la couleur.',supprimer:'Supprimer « dans la couleur ».',deplacer:'Déplacer « la nuit » ou un complément de lieu au début.',remplacer:'Remplacer « le cheval » par « les chevaux » et accorder.',ajouter:'Ajouter une couleur ou une précision sur les gouttes.',production:'Inventer deux phrases racontant ce que fait le cheval artiste.',motsAEmployer:'artiste, écurie, couleur, goutte, queue'},
  {phraseDepart:'Le camarade adroit fait une passe sur le terrain.',supprimer:'Supprimer « sur le terrain ».',deplacer:'Déplacer le complément de lieu.',remplacer:'Remplacer « le camarade » par « les camarades » et ajuster le verbe.',ajouter:'Ajouter un adjectif à ballon ou camarade.',production:'Raconter une action de match en deux phrases, dont une question.',motsAEmployer:'stade, ballon, terrain, passe, camarade'},
  {phraseDepart:'Le garçon gagne un beau cadeau à la fête foraine.',supprimer:'Supprimer « à la fête foraine ».',deplacer:'Déplacer ce complément au début.',remplacer:'Remplacer « un beau cadeau » par « de beaux cadeaux ».',ajouter:'Ajouter manège, drapeau ou place.',production:'Écrire deux phrases pour raconter une visite à la fête foraine.',motsAEmployer:'cadeau, manège, drapeau, place, pêche'},
  {phraseDepart:'Mademoiselle Guimard portait une jolie coiffe noire.',supprimer:'Supprimer un adjectif et comparer la précision.',deplacer:'Déplacer un complément de la phrase du corpus.',remplacer:'Remplacer « une jolie coiffe noire » par « de jolies coiffes noires ».',ajouter:'Ajouter une précision sur la classe.',production:'Écrire un petit portrait en deux ou trois phrases.',motsAEmployer:'mademoiselle, grande, jolie, coiffe, noire'}
];
annualFrenchPlans.p2.forEach((plan,i)=>plan.ecritureDRAS=p2Dras[i]);

const p3Dras=[
  {phraseDepart:'Le gamin pousse délicatement une énorme boule de neige.',supprimer:'Supprimer « délicatement » puis comparer l’effet.',deplacer:'Déplacer un complément de lieu ou de manière.',remplacer:'Remplacer « le gamin » par « les gamins » et accorder le verbe.',ajouter:'Ajouter un adjectif à boule ou bonhomme.',production:'Décrire la construction du bonhomme en deux phrases.',motsAEmployer:'gamin, neige, délicatement, énorme, bonhomme'},
  {phraseDepart:'La pieuvre se cache dans une faille du rocher.',supprimer:'Supprimer « du rocher » puis observer la précision perdue.',deplacer:'Déplacer « dans une faille du rocher » au début.',remplacer:'Remplacer « la pieuvre » par « les pieuvres » et faire les accords.',ajouter:'Ajouter un groupe avec requin ou coquille.',production:'Écrire deux phrases expliquant comment la pieuvre se protège.',motsAEmployer:'pieuvre, coquille, faille, rocher, protéger'},
  {phraseDepart:'Le dauphin intelligent nage près du bateau.',supprimer:'Supprimer « intelligent » puis comparer.',deplacer:'Déplacer « près du bateau » au début.',remplacer:'Remplacer « le dauphin » par « les dauphins » et faire tous les accords.',ajouter:'Ajouter un complément avec mammifère ou marin.',production:'Écrire deux phrases avec mammifère et communiquer.',motsAEmployer:'dauphin, mammifère, intelligent, communiquer, marin'},
  {phraseDepart:'L’ouvrière fabrique le nid souterrain de la colonie.',supprimer:'Supprimer « souterrain » puis comparer.',deplacer:'Déplacer un complément choisi avec la classe.',remplacer:'Remplacer « l’ouvrière » par « les ouvrières » et accorder le verbe.',ajouter:'Ajouter une précision sur reine ou soldat.',production:'Expliquer en deux phrases le rôle d’une fourmi dans la fourmilière.',motsAEmployer:'fourmi, colonie, souterrain, ouvrière, fourmilière'},
  {phraseDepart:'L’aigle puissant repère rapidement sa proie.',supprimer:'Supprimer « puissant » ou « rapidement » et comparer.',deplacer:'Déplacer un complément dans une phrase du corpus.',remplacer:'Remplacer « l’aigle puissant » par « les aigles puissants » et accorder.',ajouter:'Ajouter une précision avec bec ou serre.',production:'Décrire un rapace en deux ou trois phrases en réemployant un mot de P2.',motsAEmployer:'aigle, rapace, puissant, rapide, repérer + un mot de P2'}
];
annualFrenchPlans.p3.forEach((plan,i)=>plan.ecritureDRAS=p3Dras[i]);


const p4Meta=[
{
  orthographeCible:'Accord sujet–verbe au présent ; pluriel des noms et adjectifs.',
  motsCibles:'oiseau → oiseaux ; rapide → rapides ; puissant → puissants ; repérer.',
  grammaireCible:'Identifier le sujet et accorder le verbe avec lui.',
  exempleGrammaire:'Comparer « l’oiseau vole » / « les oiseaux volent » puis changer le sujet.',
  reactivation:'Réactiver des accords déjà travaillés en P3.',
  reactivationWords:'aigle, rapace, puissant'
},
{
  orthographeCible:'Accord dans le groupe nominal ; adjectifs qualificatifs.',
  motsCibles:'petite, grande, sombre, brillante ; nom + adjectif au singulier et au pluriel.',
  grammaireCible:'Chaîne d’accords déterminant–nom–adjectif.',
  exempleGrammaire:'Passer de « une petite étoile brillante » à « de petites étoiles brillantes ».',
  reactivation:'Réactiver 3 mots de P3.',
  reactivationWords:'fourmi, colonie, souterrain'
},
{
  orthographeCible:'Homophones grammaticaux fréquents ; marques du pluriel.',
  motsCibles:'a / à ; et / est ; son / sont dans les phrases du corpus.',
  grammaireCible:'Choisir l’homophone grâce au sens et à la fonction dans la phrase.',
  exempleGrammaire:'Comparer « il a peur » / « il va à la maison » puis « il est calme » / « Paul et Léa ».',
  reactivation:'Réactiver des homophones vus en P2 et P3.',
  reactivationWords:'cadeau, tempête, bonhomme'
},
{
  orthographeCible:'Accord sujet–verbe à l’imparfait ; terminaison -aient.',
  motsCibles:'ils regardaient, ils avançaient, ils cherchaient ; sujet pluriel + verbe.',
  grammaireCible:'Consolider le sujet, le verbe et l’accord à l’imparfait.',
  exempleGrammaire:'Passer de « l’enfant regardait » à « les enfants regardaient ».',
  reactivation:'Réactiver des mots du champ lexical déjà rencontrés.',
  reactivationWords:'nuage, chemin, paysage'
},
{
  orthographeCible:'Accords en chaîne dans la phrase ; orthographe lexicale plus fine.',
  motsCibles:'groupe nominal sujet + adjectif + verbe ; mots complexes du corpus de la semaine.',
  grammaireCible:'Faire tous les accords nécessaires lors d’une transformation.',
  exempleGrammaire:'Remplacer un sujet singulier par un sujet pluriel et vérifier déterminant, nom, adjectif et verbe.',
  reactivation:'Boucle de consolidation P4.',
  reactivationWords:'3 à 5 mots fragiles de P4 + 2 mots de P3'
}
];
annualFrenchPlans.p4.forEach((plan,i)=>Object.assign(plan,p4Meta[i]||{}));

const p4Dras=[
{
  phraseDepart:'L’oiseau puissant repère sa proie dans le ciel.',
  supprimer:'Supprimer « dans le ciel » puis comparer la précision.',
  deplacer:'Déplacer « dans le ciel » au début de la phrase.',
  remplacer:'Remplacer « l’oiseau puissant » par « les oiseaux puissants » et accorder le verbe.',
  ajouter:'Ajouter un adjectif à proie ou ciel.',
  production:'Décrire un oiseau en deux phrases en utilisant au moins trois mots de la banque.',
  motsAEmployer:'oiseau, puissant, rapide, repérer'
},
{
  phraseDepart:'Une petite étoile brillante éclaire la nuit sombre.',
  supprimer:'Supprimer un adjectif et observer ce que la phrase perd.',
  deplacer:'Déplacer « dans la nuit sombre » ou un complément du corpus.',
  remplacer:'Remplacer « une petite étoile brillante » par « de petites étoiles brillantes ».',
  ajouter:'Ajouter une précision de lieu ou de manière.',
  production:'Écrire deux phrases descriptives en faisant au moins deux accords dans le groupe nominal.',
  motsAEmployer:'étoile, petite, brillante, sombre'
},
{
  phraseDepart:'Le garçon a peur et il reste près de la porte.',
  supprimer:'Supprimer un groupe complément sans casser le sens principal.',
  deplacer:'Déplacer le complément de lieu au début de la phrase.',
  remplacer:'Remplacer un homophone par une autre construction et justifier le choix.',
  ajouter:'Ajouter une seconde proposition avec est ou sont.',
  production:'Écrire deux phrases contenant au moins deux homophones étudiés.',
  motsAEmployer:'a / à, et / est, son / sont + 2 mots de la banque'
},
{
  phraseDepart:'Les enfants regardaient les nuages au-dessus du chemin.',
  supprimer:'Supprimer « au-dessus du chemin » puis comparer.',
  deplacer:'Déplacer le complément au début de la phrase.',
  remplacer:'Remplacer « les enfants » par « l’enfant » et adapter le verbe.',
  ajouter:'Ajouter un adjectif à nuages ou chemin.',
  production:'Écrire deux phrases à l’imparfait avec un sujet pluriel.',
  motsAEmployer:'enfants, regardaient, nuages, chemin'
},
{
  phraseDepart:'Les jeunes explorateurs attentifs observent le paysage.',
  supprimer:'Supprimer « attentifs » puis comparer.',
  deplacer:'Déplacer un complément de la phrase du corpus.',
  remplacer:'Remplacer « les jeunes explorateurs attentifs » par un sujet singulier et faire tous les accords.',
  ajouter:'Ajouter un complément et un adjectif.',
  production:'Écrire un court paragraphe de trois phrases en réemployant quatre mots de la période.',
  motsAEmployer:'4 mots de P4 + 2 mots réactivés de P3'
}
];
annualFrenchPlans.p4.forEach((plan,i)=>plan.ecritureDRAS=p4Dras[i]);


const p5Meta=[
{
  orthographeCible:'Réactivation des accords dans le groupe nominal ; noms propres et majuscules.',
  motsCibles:'Tour Eiffel, Paris ; monument, célèbre, immense ; accords nom–adjectif.',
  grammaireCible:'Groupe nominal enrichi et accord déterminant–nom–adjectif.',
  exempleGrammaire:'Passer de « un monument célèbre » à « des monuments célèbres ».',
  reactivation:'Réactiver accords et pluriels de P4.',
  reactivationWords:'oiseau, puissant, étoiles'
},
{
  orthographeCible:'Accord sujet–verbe ; orthographe lexicale des noms propres et mots culturels.',
  motsCibles:'Londres, Tamise, tour, célèbre ; sujet singulier/pluriel.',
  grammaireCible:'Accorder le verbe avec un groupe sujet enrichi.',
  exempleGrammaire:'Comparer « la tour domine » / « les tours dominent ».',
  reactivation:'Réactiver 3 mots de la semaine précédente.',
  reactivationWords:'Paris, monument, célèbre'
},
{
  orthographeCible:'Réactivation des homophones grammaticaux ; pluriels et accords.',
  motsCibles:'Rome, Colisée ; a / à, et / est, son / sont dans les phrases.',
  grammaireCible:'Choisir l’homophone grâce au sens de la phrase.',
  exempleGrammaire:'Justifier le choix dans « Le Colisée est à Rome. »',
  reactivation:'Réactiver des homophones de P2/P4.',
  reactivationWords:'a / à, et / est, son / sont'
},
{
  orthographeCible:'Accord sujet–verbe au présent et au futur ; noms propres.',
  motsCibles:'New York, statue, liberté, visiteurs ; ils visiteront / elle domine.',
  grammaireCible:'Changer le temps ou le sujet sans perdre les accords.',
  exempleGrammaire:'Transformer « la statue domine » en « les statues domineront ».',
  reactivation:'Réactiver 3 mots culturels déjà rencontrés.',
  reactivationWords:'Londres, Rome, monument'
},
{
  orthographeCible:'Familles de mots et dérivation ; accords dans la phrase.',
  motsCibles:'Chine, muraille, construire → construction ; long → longueur.',
  grammaireCible:'Identifier le nom, le verbe et les mots d’une même famille.',
  exempleGrammaire:'Relier construire / construction et long / longueur dans des phrases.',
  reactivation:'Réactiver 3 mots de P5.',
  reactivationWords:'statue, visiteurs, liberté'
},
{
  orthographeCible:'Accords dans le groupe nominal ; orthographe lexicale des mots complexes.',
  motsCibles:'Taj Mahal, Inde, marbre, magnifique, blanc → blanche/blancs/blanches.',
  grammaireCible:'Accord de l’adjectif avec le nom.',
  exempleGrammaire:'Comparer « un monument blanc » / « une façade blanche » / « des pierres blanches ».',
  reactivation:'Réactiver 3 mots de P5.',
  reactivationWords:'muraille, construction, Rome'
},
{
  orthographeCible:'Réactivation générale : accords, pluriels, homophones, mots invariables.',
  motsCibles:'Machu Picchu, Pérou, montagne, ancien, cité ; accords et mots fréquents.',
  grammaireCible:'Relecture grammaticale complète d’une phrase.',
  exempleGrammaire:'Repérer sujet, verbe, accords et mots invariables dans une phrase du corpus.',
  reactivation:'Réactivation cumulative P5.',
  reactivationWords:'4 mots fragiles des semaines précédentes'
},
{
  orthographeCible:'Pluriel et accords ; noms propres géographiques.',
  motsCibles:'île de Pâques, statues, géantes, pierre ; accord nom–adjectif.',
  grammaireCible:'Transformer une phrase du singulier au pluriel.',
  exempleGrammaire:'Passer de « une statue géante » à « des statues géantes ».',
  reactivation:'Réactiver 3 mots antérieurs.',
  reactivationWords:'montagne, cité, ancien'
},
{
  orthographeCible:'Accord sujet–verbe et enrichissement du groupe nominal.',
  motsCibles:'Rio, Christ Rédempteur, montagne, immense ; adjectifs et sujet.',
  grammaireCible:'Accorder le verbe avec un groupe sujet enrichi.',
  exempleGrammaire:'Comparer « le monument immense domine » / « les monuments immenses dominent ».',
  reactivation:'Réactiver 3 mots de P5.',
  reactivationWords:'statue, pierre, géante'
},
{
  orthographeCible:'Familles de mots ; mots d’origine savante ; pluriels.',
  motsCibles:'Égypte, pyramide, pharaon, tombeau ; construire / construction.',
  grammaireCible:'Enrichir une phrase avec adjectifs et compléments.',
  exempleGrammaire:'Développer « La pyramide se dresse. » avec deux groupes supplémentaires.',
  reactivation:'Réactiver les familles de mots rencontrées.',
  reactivationWords:'construire, construction, monument'
},
{
  orthographeCible:'Synthèse annuelle : accords, homophones, pluriels, mots invariables et lexique culturel.',
  motsCibles:'Sphinx, Gizeh, désert, ancien ; + mots fragiles de P5.',
  grammaireCible:'Relecture autonome : sujet/verbe, accords du GN, ponctuation, homophones.',
  exempleGrammaire:'Corriger collectivement une phrase volontairement fautive en justifiant chaque correction.',
  reactivation:'Boucle finale de consolidation.',
  reactivationWords:'5 mots fragiles de P5 + 3 mots issus de P3/P4'
}
];
annualFrenchPlans.p5.forEach((plan,i)=>Object.assign(plan,p5Meta[i]||{}));

const p5Dras=[
{
  phraseDepart:'La Tour Eiffel est un monument célèbre de Paris.',
  supprimer:'Supprimer « de Paris » puis observer la perte d’information.',
  deplacer:'Déplacer « à Paris » ou un complément du corpus au début.',
  remplacer:'Remplacer « un monument célèbre » par « des monuments célèbres » et accorder.',
  ajouter:'Ajouter un adjectif ou un complément pour mieux décrire la tour.',
  production:'Écrire deux phrases pour présenter la Tour Eiffel.',
  motsAEmployer:'Tour Eiffel, Paris, monument, célèbre'
},
{
  phraseDepart:'La grande tour domine la Tamise à Londres.',
  supprimer:'Supprimer « à Londres » puis comparer.',
  deplacer:'Déplacer « à Londres » au début.',
  remplacer:'Remplacer « la grande tour » par « les grandes tours » et accorder le verbe.',
  ajouter:'Ajouter une précision sur la Tamise.',
  production:'Présenter Londres ou sa tour en deux phrases.',
  motsAEmployer:'Londres, Tamise, tour, célèbre'
},
{
  phraseDepart:'Le Colisée est à Rome et il accueille de nombreux visiteurs.',
  supprimer:'Supprimer un complément sans perdre l’idée principale.',
  deplacer:'Déplacer « à Rome » au début.',
  remplacer:'Remplacer « le Colisée » par « les monuments » et refaire les accords.',
  ajouter:'Ajouter une phrase avec a ou à correctement choisi.',
  production:'Écrire deux phrases sur Rome en utilisant au moins deux homophones étudiés.',
  motsAEmployer:'Rome, Colisée, visiteurs, a / à, et / est'
},
{
  phraseDepart:'La statue de la Liberté domine le port de New York.',
  supprimer:'Supprimer « de New York » puis comparer.',
  deplacer:'Déplacer « dans le port » au début.',
  remplacer:'Remplacer « la statue » par « les statues » et accorder.',
  ajouter:'Ajouter un complément avec visiteurs.',
  production:'Écrire deux phrases au présent puis transformer l’une d’elles au futur.',
  motsAEmployer:'New York, statue, liberté, visiteurs'
},
{
  phraseDepart:'La Grande Muraille traverse une longue région de Chine.',
  supprimer:'Supprimer « de Chine » puis comparer.',
  deplacer:'Déplacer un complément de lieu au début.',
  remplacer:'Remplacer « la longue muraille » par « les longues murailles ».',
  ajouter:'Ajouter un mot de la famille de construire.',
  production:'Écrire deux phrases utilisant construire et construction.',
  motsAEmployer:'Chine, muraille, construire, construction'
},
{
  phraseDepart:'Le Taj Mahal est un magnifique monument de marbre blanc.',
  supprimer:'Supprimer un adjectif et observer ce que la description perd.',
  deplacer:'Déplacer un complément de lieu.',
  remplacer:'Remplacer « un monument blanc » par « une façade blanche » puis par le pluriel.',
  ajouter:'Ajouter un adjectif précis.',
  production:'Décrire le Taj Mahal en deux ou trois phrases.',
  motsAEmployer:'Taj Mahal, Inde, marbre, magnifique, blanc'
},
{
  phraseDepart:'Le Machu Picchu est une ancienne cité dans la montagne.',
  supprimer:'Supprimer « dans la montagne ».',
  deplacer:'Déplacer le complément de lieu au début.',
  remplacer:'Remplacer « une ancienne cité » par « des anciennes cités » et corriger si nécessaire.',
  ajouter:'Ajouter un adjectif et un complément.',
  production:'Écrire trois phrases courtes pour présenter le Machu Picchu.',
  motsAEmployer:'Machu Picchu, Pérou, montagne, ancien, cité'
},
{
  phraseDepart:'Une statue géante se dresse sur l’île de Pâques.',
  supprimer:'Supprimer « sur l’île de Pâques » puis comparer.',
  deplacer:'Déplacer ce complément au début.',
  remplacer:'Remplacer « une statue géante » par « des statues géantes ».',
  ajouter:'Ajouter une précision sur la pierre.',
  production:'Décrire les statues de l’île de Pâques en deux phrases.',
  motsAEmployer:'île de Pâques, statue, géante, pierre'
},
{
  phraseDepart:'Le Christ Rédempteur immense domine Rio depuis la montagne.',
  supprimer:'Supprimer « depuis la montagne ».',
  deplacer:'Déplacer le complément de lieu au début.',
  remplacer:'Remplacer le sujet singulier par un sujet pluriel et refaire les accords.',
  ajouter:'Ajouter un adjectif ou une précision sur Rio.',
  production:'Écrire deux phrases descriptives avec un groupe nominal enrichi.',
  motsAEmployer:'Rio, Christ Rédempteur, montagne, immense'
},
{
  phraseDepart:'La pyramide de Khéops est un ancien tombeau de pharaon.',
  supprimer:'Supprimer « de pharaon » puis comparer.',
  deplacer:'Déplacer un complément au début.',
  remplacer:'Remplacer « la pyramide » par « les pyramides » et accorder.',
  ajouter:'Ajouter un mot de la famille de construire.',
  production:'Écrire trois phrases sur la pyramide en enrichissant chaque phrase.',
  motsAEmployer:'Égypte, pyramide, pharaon, tombeau, construction'
},
{
  phraseDepart:'Le Sphinx de Gizeh veille dans le désert depuis très longtemps.',
  supprimer:'Supprimer un complément et observer la précision perdue.',
  deplacer:'Déplacer « dans le désert » au début.',
  remplacer:'Remplacer un groupe nominal par un autre et refaire tous les accords.',
  ajouter:'Ajouter un adjectif et un mot invariable.',
  production:'Écrire un petit paragraphe de trois phrases en réemployant cinq mots de P5.',
  motsAEmployer:'Sphinx, Gizeh, désert, ancien + 2 mots fragiles de P5'
}
];
annualFrenchPlans.p5.forEach((plan,i)=>plan.ecritureDRAS=p5Dras[i]);

window.DICTEES_CE2={version:'34.94',p1,p2:annualFrenchPlans.p2,p3:annualFrenchPlans.p3,p4:annualFrenchPlans.p4,p5:annualFrenchPlans.p5};
window.DICTEES_CE2_ANNUAL=annualFrenchPlans;
})();
