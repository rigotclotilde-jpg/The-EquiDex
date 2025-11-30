
export type ArticleType = 'tabs' | 'accordion' | 'standard';

export interface ArticleData {
    id: string;
    type: ArticleType;
    title: string;
    date: string;
    category: string;
    intro: string;
    excerpt: string;
    image: string;
    content: any;
    expert?: string;
    isPremium?: boolean; // Nouvelle propriété
}

export const BLOG_POSTS_DATA: Record<string, ArticleData> = {
    '1': {
        id: '1',
        type: 'standard',
        title: "Anatomie du Sol : Guide des Différents Types de Sables",
        date: "10 Janvier 2025",
        category: "Infrastructures",
        excerpt: "C'est la couche de travail (le sable) qui assure l'interaction directe avec le sabot du cheval.",
        image: "https://images.unsplash.com/photo-1599054799131-1b0a305085e6?q=80&w=800&auto=format&fit=crop",
        intro: "Le sol d'une aire de travail (manège, carrière, rond de longe) est composé de plusieurs couches, mais c'est la couche de travail (le sable) qui assure l'interaction directe avec le sabot du cheval.",
        content: [
            { title: "Le Sable de Fontainebleau", text: "Réputé pour sa finesse et sa pureté (99% de silice). C'est la référence historique en France." },
            { title: "Les Sables Fibrés", text: "Mélange de sable microsilice et de fibres géotextiles. Ils offrent un amorti supérieur." },
            { title: "L'entretien", text: "Quel que soit le type de sable, l'arrosage et le hersage quotidiens sont indispensables." }
        ],
        isPremium: false
    },
    '2': {
        id: '2',
        type: 'standard',
        title: "Diplômes pour Travailler dans le Monde de l'Équitation",
        date: "15 Février 2025",
        category: "Métiers",
        excerpt: "Ces diplômes sont délivrés par le Ministère des Sports et la FFE pour encadrer et enseigner.",
        image: "https://images.unsplash.com/photo-1551884831-bbf3ddd77501?q=80&w=800&auto=format&fit=crop",
        intro: "Ces diplômes sont délivrés par le Ministère des Sports et la Fédération Française d'Équitation (FFE). Ils permettent d'encadrer et d'enseigner l'équitation contre rémunération.",
        content: [
            { title: "L'AE (Animateur d'Équitation)", text: "Le premier niveau professionnel." },
            { title: "Le BPJEPS (Moniteur)", text: "Le Brevet Professionnel est le diplôme roi." },
            { title: "Le DEJEPS (Entraîneur)", text: "Pour le perfectionnement sportif." }
        ],
        isPremium: false
    },
    '3': {
        id: '3',
        type: 'standard',
        title: "L'Écurie Active : Un Mode d'Hébergement au Service du Bien-Être",
        date: "20 Mars 2025",
        category: "Bien-être",
        excerpt: "L'Écurie Active vise à reproduire le plus fidèlement possible les conditions de vie du cheval à l'état naturel.",
        image: "https://images.unsplash.com/photo-1584464177119-90d2382c405c?q=80&w=800&auto=format&fit=crop",
        intro: "L'Écurie Active est un concept d'hébergement en groupe qui vise à reproduire le plus fidèlement possible les conditions de vie du cheval à l'état naturel.",
        content: [
            { title: "Séparer les ressources", text: "Le principe clé est d'éloigner les points d'intérêt pour obliger les chevaux à se déplacer." },
            { title: "La technologie", text: "Des automates (DAC/DAF) gèrent l'alimentation individuelle." }
        ],
        isPremium: false
    },
    '4': {
        id: '4',
        type: 'standard',
        title: "Les 15 Événements Équestres Majeurs en France",
        date: "25 Avril 2025",
        category: "Compétitions",
        excerpt: "Le CSO est la discipline la plus médiatisée et la plus soutenue par les marques de luxe en France.",
        image: "https://images.unsplash.com/photo-1537202360293-66b96502280d?q=80&w=800&auto=format&fit=crop",
        intro: "La France est une terre de cheval par excellence. Du saut d'obstacles prestigieux au complet en passant par les courses mythiques, voici les événements incontournables.",
        content: [
            { title: "Le Saut Hermès", text: "Le rendez-vous glamour et sportif au Grand Palais." },
            { title: "Jumping de La Baule", text: "Un stade équestre mythique en bord de mer." }
        ],
        isPremium: false
    },
    '5': {
        id: '5',
        type: 'standard',
        title: "L'Hippothérapie et les Bienfaits de la Médiation Équine",
        date: "30 Mai 2025",
        category: "Bien-être",
        excerpt: "Le cheval est aussi reconnu comme un formidable médiateur thérapeutique.",
        image: "https://images.unsplash.com/photo-1627926189912-32b4504df012?q=80&w=800&auto=format&fit=crop",
        intro: "Le cheval est de plus en plus reconnu comme un formidable médiateur thérapeutique.",
        content: [
            { title: "Thérapie par le mouvement", text: "Le pas du cheval reproduit le mouvement du bassin humain." },
            { title: "Miroir des émotions", text: "Le cheval réagit instantanément à notre état émotionnel." }
        ],
        isPremium: false
    },
    '6': {
        id: '6',
        type: 'standard',
        title: "L'Histoire du Monde Équin : De la Proie au Partenaire d'Élite",
        date: "05 Juillet 2025",
        category: "Histoire",
        excerpt: "L'histoire du cheval est une longue marche évolutive qui a débuté il y a des millions d'années.",
        image: "https://images.unsplash.com/photo-1598263720892-7f2122616f0b?q=80&w=800&auto=format&fit=crop",
        intro: "L'histoire du cheval est une longue marche évolutive qui a transformé les civilisations.",
        content: [
            { title: "Domestication", text: "Il y a environ 5500 ans dans les steppes eurasiennes." },
            { title: "Cheval de Guerre", text: "Le cheval a décidé du sort des empires pendant des millénaires." }
        ],
        isPremium: false
    },
    '7': {
        id: '7',
        type: 'standard',
        title: "Liste des Différents Niveaux de Galop (FFE)",
        date: "10 Août 2025",
        category: "Examens",
        excerpt: "Les Galops de Cavalier vont du niveau d'initiation (Galop 1) à l'autonomie en compétition (Galop 7).",
        image: "https://images.unsplash.com/photo-1542127233-a3b04c26428c?q=80&w=800&auto=format&fit=crop",
        intro: "Les Galops de Cavalier valident des compétences à pied, à cheval et théoriques.",
        content: [
            { title: "Galops 1 à 4", text: "Le socle de l'autonomie." },
            { title: "Galops 5 à 7", text: "Le perfectionnement et la compétition." }
        ],
        isPremium: false
    },
    '8': {
        id: '8',
        type: 'accordion',
        title: "La Maintenance Invisible : Guide des Outils pour l'Entretien des Sols Équestres",
        date: "15 Septembre 2025",
        category: "Infrastructures",
        excerpt: "Un sol de carrière de qualité est un investissement. Pour garantir sa performance technique, un entretien régulier est non négociable.",
        image: "https://images.unsplash.com/photo-1605096530668-37c222950529?q=80&w=800&auto=format&fit=crop",
        intro: "Un sol de carrière de qualité (fibré, sablé, ou même stabilisé) est un investissement majeur. Pour garantir sa performance technique et prévenir l'usure prématurée des tendons du cheval, un entretien régulier est non négociable. L'équipement de maintenance doit répondre à trois objectifs principaux : nivellement, décompactage et recompactage.",
        expert: "Un arrosage excessif sur un sol fibré peut être aussi néfaste que la sécheresse. Le taux d'humidité idéal se situe souvent entre 15% et 20% pour garantir la 'frappe' du pied sans glissade.",
        isPremium: true, // Article Premium
        content: [
            {
                title: "La Herse à Dents Rigides (ou à Lames)",
                image: "https://picsum.photos/800/400?random=81",
                body: [
                    { label: "Rôle", text: "Principal outil de travail en profondeur. Les dents (lames ou griffes) pénètrent le sable pour le décompacter (casser la couche superficielle dure) et l'aérer." },
                    { label: "Ajustement", text: "La profondeur des dents doit être réglée avec précision. Un travail trop profond peut remonter la sous-couche (ou couche de fondation), ce qui est préjudiciable." }
                ]
            },
            {
                title: "La Herse à Ressorts (ou à Dents Flexibles)",
                image: "https://picsum.photos/800/400?random=82",
                body: [
                    { label: "Rôle", text: "Outil de travail plus léger. Les dents sont montées sur des ressorts, offrant un décompactage plus superficiel et homogène." },
                    { label: "Avantages", text: "Particulièrement utile pour les sols fibrés, car elle a moins tendance à arracher les fibres géotextiles que les dents rigides." }
                ]
            },
            {
                title: "Le Niveleur (ou Gratte à Planche)",
                image: "https://picsum.photos/800/400?random=83",
                body: [
                    { label: "Rôle", text: "Outil passif de nivellement, souvent monté à l'arrière de la herse. Il sert à ramener le sable qui s'est accumulé contre les lices et à boucher les trous ou les bosses." }
                ]
            },
            {
                title: "Le Rouleau (Lisse ou à Profil)",
                image: "https://picsum.photos/800/400?random=84",
                body: [
                    { label: "Rôle", text: "Outil de finition indispensable pour le recompactage de la couche de travail. Il raffermit la surface (important pour le CSO) et assure une meilleure cohésion du sable." },
                    { label: "Types", text: "Rouleau Lisse (sols très fins) ou Rouleau à Mailles/Grilles (sols qui ont besoin d'être stabilisés sans être trop durs)." }
                ]
            },
            {
                title: "Le Système d'Arrosage Automatisé (Sub-irrigation)",
                image: "https://picsum.photos/800/400?random=85",
                body: [
                    { label: "Rôle", text: "Le summum de la technologie. Le sol est drainé et arrosé par le dessous, l'eau montant par capillarité." },
                    { label: "Avantages", text: "Assure un taux d'humidité constant et parfait sur toute la surface, quels que soient les aléas climatiques." }
                ]
            }
        ]
    },
    '9': {
        id: '9',
        type: 'tabs',
        title: "Top 20 des Compétitions et Circuits Équestres Mondiaux",
        date: "20 Octobre 2025",
        category: "Compétitions",
        excerpt: "Ces compétitions sont les plus prestigieuses et ont souvent lieu tous les quatre ans (cycle olympique).",
        image: "https://images.unsplash.com/photo-1549488346-628d3f6d2892?q=80&w=800&auto=format&fit=crop",
        intro: "L'équitation de haut niveau est rythmée par des événements sportifs d'exception. Du faste des Jeux Olympiques au glamour du Longines Global Champions Tour, voici une sélection des compétitions qui façonnent le calendrier équestre mondial, synonymes d'excellence, de luxe et de performance.",
        isPremium: true, // Article Premium
        content: {
            majors: {
                title: "Le Sommet de la Compétition",
                desc: "Ces compétitions sont les plus prestigieuses et ont souvent lieu selon un cycle quadriennal (cycle olympique).",
                image: "https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=80&w=1200&auto=format&fit=crop",
                expert: "Le CHIO d'Aix-la-Chapelle accueille chaque année plus de 350 000 spectateurs, un record mondial absolu.",
                data: [
                    { id: 1, name: "Jeux Olympiques (JO)", freq: "4 ans", disc: "CSO, Dressage, CCE", prestige: "La plus haute distinction sportive mondiale." },
                    { id: 2, name: "Championnats du Monde FEI", freq: "4 ans", disc: "Toutes FEI", prestige: "Le titre mondial par excellence." },
                    { id: 3, name: "Jeux Équestres Mondiaux", freq: "Anciennement", disc: "Toutes FEI", prestige: "Rassemblement historique." },
                    { id: 4, name: "Finale Coupe du Monde FEI", freq: "Annuel", disc: "CSO, Dressage", prestige: "L'aboutissement de la saison indoor." },
                    { id: 5, name: "CHIO Aix-la-Chapelle", freq: "Annuel", disc: "Multi", prestige: "Le \"Wimbledon\" de l'équitation." }
                ]
            },
            cso: {
                title: "Les Circuits de Prestige (CSO)",
                desc: "Le CSO est la discipline qui attire le plus de sponsors de luxe et génère les plus grandes dotations financières.",
                image: "https://images.unsplash.com/photo-1551884831-bbf3ddd77501?q=80&w=1200&auto=format&fit=crop",
                expert: "Le Grand Slam Rolex offre un bonus de 1 Million d'Euros au cavalier remportant trois majeurs consécutifs.",
                data: [
                    { id: 6, name: "Rolex Grand Slam", loc: "Aix, Calgary, Genève", sponsor: "Rolex", sponsorColor: "text-amber-700" },
                    { id: 7, name: "CHI de Genève", loc: "Genève, Suisse", sponsor: "Rolex", sponsorColor: "text-amber-700" },
                    { id: 10, name: "Longines Global Champions Tour", loc: "Monaco, Paris, Miami", sponsor: "Longines", sponsorColor: "text-blue-800" },
                    { id: 11, name: "Saut Hermès", loc: "Paris (Grand Palais)", sponsor: "Hermès", sponsorColor: "text-orange-600" }
                ]
            },
            cce: {
                title: "Les Géants du Complet (CCE 5*)",
                desc: "Le CCE est le triathlon équestre, un test d'endurance, de précision et de courage. Les CCI 5* sont les plus difficiles.",
                image: "https://images.unsplash.com/photo-1598555806655-b040e34b9281?q=80&w=1200&auto=format&fit=crop",
                expert: "Seuls 7 concours dans le monde détiennent le label 5 étoiles, le niveau de difficulté maximal en cross.",
                data: [
                    { id: 13, name: "Badminton Horse Trials", loc: "Royaume-Uni", feat: "Cross légendaire." },
                    { id: 14, name: "Burghley Horse Trials", loc: "Royaume-Uni", feat: "Le plus technique." },
                    { id: 15, name: "Kentucky Three-Day Event", loc: "États-Unis", feat: "\"The Best Weekend All Year\"." },
                    { id: 17, name: "Pau CCI 5*", loc: "France", feat: "Seul 5* en France." }
                ]
            },
            autres: {
                title: "Autres Majeurs & Courses",
                desc: "Ces événements complètent le tableau des compétitions équestres de luxe et de haute performance.",
                image: "https://images.unsplash.com/photo-1518118014377-526437d36a57?q=80&w=1200&auto=format&fit=crop",
                expert: "Le Prix de l'Arc de Triomphe est la course de gazon la mieux dotée d'Europe (5M€).",
                data: [
                    { id: 18, name: "Grand Prix d'Amérique", disc: "Trot Attelé", prestige: "Sommet mondial du Trot." },
                    { id: 19, name: "Prix de l'Arc de Triomphe", disc: "Galop Plat", prestige: "Événement mondain." },
                    { id: 20, name: "Winter Equestrian Festival", disc: "CSO / Hunter", prestige: "Lifestyle équestre (Floride)." }
                ]
            }
        }
    },
    '10': {
        id: '10',
        type: 'standard',
        title: "L'Équithérapie : Rigueur, Expertise et Éthique",
        date: "05 Novembre 2025",
        category: "Bien-être",
        excerpt: "L'équithérapie impose une rigueur professionnelle sans équivalent. La légitimité ne se décrète pas ; elle se construit par la double expertise et un engagement éthique absolu.",
        image: "https://images.unsplash.com/photo-1463852247062-1bbca38f7805?q=80&w=1200&auto=format&fit=crop",
        intro: "Accrochez-vous, chers lecteurs. Nous abordons l'un des sujets les plus profonds et les plus exigeants de la filière équine : l'équithérapie. Cet art du soin, où le cheval devient médiateur de la guérison, impose une <strong>rigueur professionnelle</strong> sans équivalent. Dans le paysage français, où le titre professionnel n'est pas formellement encadré, la légitimité ne se décrète pas ; elle se construit par la <strong>double expertise</strong> et un <strong>engagement éthique</strong> absolu.",
        isPremium: false,
        content: [
            {
                title: "I. Les Fondations du Soin : Maîtriser la Sémantique Thérapeutique",
                text: "Le premier impératif du professionnel est la précision terminologique. L'usage du cheval à des fins thérapeutiques n'est pas monolithique, et la confusion entre les disciplines engage la responsabilité du praticien.<h4>1. L'Équithérapie : L'Axe Psychique et Relationnel</h4><p>L'équithérapie est définie comme un <strong>soin psychique et corporel</strong> médiatisé par l'équidé. Elle est axée sur l'exploration et la gestion des émotions, la communication non verbale, l'estime de soi, et le travail sur les schémas comportementaux.</p><ul><li><strong>Les Domaines d'Action</strong> : Anxiété, dépression, troubles du spectre de l'autisme (TSA), troubles de l'attachement, ou réinsertion sociale.</li><li><strong>Le Rôle du Cheval</strong> : Le cheval sert de <strong>miroir émotionnel</strong>, obligeant le patient à l'ancrage et à la cohérence, car il réagit instantanément à la moindre tension ou incohérence.</li></ul><h4>2. L'Hippothérapie : L'Axe Physiologique et Moteur</h4><p>L'hippothérapie est, quant à elle, une pratique de <strong>réadaptation motrice</strong>. Elle utilise les propriétés biomécaniques du cheval en mouvement pour induire des réponses physiques.</p><ul><li><strong>La Mécanique du Soin</strong> : Le pas du cheval génère des oscillations tridimensionnelles (verticales, transversales, antéro-postérieures) qui simulent le mouvement du bassin humain à la marche. Ces mouvements stimulent le tonus musculaire, l'équilibre et la coordination.</li><li><strong>Les Bénéfices Ciblés</strong> : Amélioration de la posture, de la coordination, et de la mobilité pour des patients souffrant de déficiences neuromusculaires ou de paralysie cérébrale.</li></ul>"
            },
            {
                title: "II. Le Défis de la Légitimité : La Double Expertise Incontournable",
                text: "Puisque le titre d'équithérapeute <strong>n'est pas protégé par un diplôme d'État</strong> en France, la profession est contrainte de s'appuyer sur des fondations d'expertise rigoureuses pour garantir sa crédibilité et sa sécurité (critères E-E-A-T).<h4>1. L'Ancrage Clinique ou Social : La Priorité du Soin</h4><p>Il ne suffit pas de savoir monter ou manipuler un cheval pour être thérapeute. Le professionnel doit d'abord être un expert du soin et de la relation d'aide.</p><ul><li><strong>Le Prérequis</strong> : La légitimité repose sur la possession d'un diplôme initial dans les domaines du <strong>médical, paramédical ou social</strong> (Psychologue, Éducateur Spécialisé, Kinésithérapeute, etc.).</li><li><strong>L'Implication</strong> : Cette formation initiale permet de poser un <strong>diagnostic éclairé</strong>, d'établir un <strong>cadre thérapeutique</strong> sécurisé, et de maîtriser les outils d'évaluation de la progression du patient.</li><li><strong>La Collaboration</strong> : Un praticien responsable travaille systématiquement en lien avec l'équipe pluridisciplinaire du patient (médecin traitant, psychiatre, orthophoniste), inscrivant l'équithérapie dans une <strong>démarche globale de soins</strong>.</li></ul><h4>2. La Compétence Équine et la Formation Spécifique</h4><p>À cette base clinique doit s'ajouter la connaissance approfondie du partenaire équin.</p><ul><li><strong>Maîtrise Éthologique</strong> : Le thérapeute doit posséder une expertise en <strong>éthologie appliquée</strong> pour décoder les signaux comportementaux du cheval, garantir sa sécurité et celle du patient, et interpréter la dynamique de la relation.</li><li><strong>Protocoles d'Intervention</strong> : Une formation spécifique en équithérapie (souvent longue et exigeante) est nécessaire pour apprendre les protocoles adaptés aux différentes pathologies et pour sélectionner les exercices les plus pertinents.</li></ul>"
            },
            {
                title: "III. L'Enjeu Scientifique : Vers la Reconnaissance Formelle",
                text: "La pleine reconnaissance de la médiation équine passera par sa validation scientifique. Actuellement, la recherche mondiale montre une <strong>tendance positive</strong> mais exige une méthodologie de plus en plus fine.<ul><li><strong>Le Défi de la Méthode</strong> : L'un des plus grands défis réside dans la <strong>complexité méthodologique</strong> des études. La variabilité des facteurs (cheval, praticien, environnement, population ciblée) rend l'élimination des biais ardue.</li><li><strong>L'Appel à la Rigueur</strong> : La communauté scientifique appelle à développer davantage d'<strong>études longitudinales</strong> (suivi dans le temps) et <strong>multicentriques</strong> (protocoles harmonisés entre plusieurs centres) pour obtenir des résultats statistiquement significatifs et incontestables.</li><li><strong>Les Tendances Confirmées</strong> : Malgré ces difficultés, les revues de littérature confirment des bénéfices notables, notamment pour :<ul class='ml-6 mt-2'><li><strong>Les TSA</strong> : Amélioration des interactions sociales, diminution de l'irritabilité et de l'hypoactivité.</li><li><strong>La Santé Mentale</strong> : Réduction significative des symptômes de l'anxiété et de la dépression, et amélioration de l'estime de soi.</li></ul></li></ul>"
            },
            {
                title: "IV. Le Serment Éthique : L'Exigence du Partenaire de Soin",
                text: "L'éthique professionnelle exige que le cheval ne soit jamais instrumentalisé. Sa <strong>capacité à soigner</strong> dépend directement de son propre <strong>équilibre physique et psychique</strong>.<h4>1. Le Choix et l'Entretien du Cheval-Médiateur</h4><ul><li><strong>Sélection du Tempérament</strong> : Le cheval doit faire preuve d'une <strong>tolérance</strong> et d'une <strong>fiabilité</strong> absolues face aux imprévus et aux réactions inhabituelles des patients. La patience est son premier outil.</li><li><strong>Forme Physique et Mentale</strong> : Le cheval de médiation n'est pas un athlète de performance, mais il doit être en <strong>parfaite santé</strong> (physique et mentale). Son cadre de vie doit être adapté à ses besoins éthologiques : du temps libre en pâture, des interactions sociales avec ses congénères, et des périodes de repos suffisantes.</li></ul><h4>2. La Surveillance Proactive</h4><p>Le praticien a la responsabilité de détecter le moindre signe de surcharge ou de mal-être chez son partenaire.</p><ul><li><strong>Signes d'Alerte</strong> : Une surveillance constante est effectuée sur les signes d'<strong>apathie</strong>, de <strong>tensions faciales</strong> (oreilles en arrière, œil plissé) ou de <strong>comportements stéréotypés</strong> qui indiqueraient un stress chronique.</li><li><strong>Durée d'Intervention</strong> : Les séances sont souvent courtes, et le temps de travail total de l'animal est strictement limité pour préserver sa <strong>motivation et sa capacité à interagir avec justesse</strong>.</li></ul><p class='mt-6 font-bold'>En définitive, l'équithérapie est une vocation qui exige une formation initiale solide dans le soin et une expertise équestre sans faille. Dans l'attente d'un cadre légal plus clair, la légitimité du praticien repose entièrement sur sa transparence, son respect de la déontologie clinique et son engagement envers le bien-être inconditionnel de son cheval. C'est le prix de la confiance dans cette discipline fondamentale.</p>"
            }
        ]
    },
    '11': {
        id: '11',
        type: 'standard',
        title: "Association Hope : Se Reconstruire après le Cancer grâce au Cheval",
        date: "20 Novembre 2025",
        category: "Bien-être",
        excerpt: "Découvrez comment l'Association Hope utilise la médiation équine pour aider les femmes à se réapproprier leur corps et leur esprit après un cancer du sein.",
        image: "https://images.unsplash.com/photo-1598556851528-569611eb2342?q=80&w=1200&auto=format&fit=crop",
        intro: "Le combat contre le cancer ne s'arrête pas à la rémission médicale. Il faut ensuite se réapproprier son corps, son image et sa confiance. C'est la mission magnifique que s'est donnée l'<strong>Association Hope</strong> : accompagner les femmes après un cancer du sein à travers des stages de médiation équine.",
        isPremium: false,
        content: [
            {
                title: "Une Mission de Cœur : La Reconstruction",
                text: "Créée pour palier le vide de l'après-traitement, l'Association Hope propose une approche innovante. L'objectif n'est pas de devenir cavalière, mais d'utiliser le cheval comme un <strong>partenaire de guérison</strong>. <ul><li><strong>Le concept</strong> : Des stages en immersion alliant équithérapie et art-thérapie.</li><li><strong>Pour qui ?</strong> : Les femmes en rémission d'un cancer du sein, cherchant un second souffle.</li></ul>"
            },
            {
                title: "Le Cheval, Miroir des Émotions",
                text: "Pourquoi le cheval ? Animal de proie, hypersensible et non-jugeant, il perçoit nos émotions les plus enfouies. <p>Face à un animal de 500kg, on ne peut pas tricher. Le cheval oblige à l'ancrage, au moment présent. Pour des femmes dont le corps a été meurtri par la maladie, le contact avec la chaleur et la puissance bienveillante du cheval permet de :</p><ul><li>Retrouver l'estime de soi.</li><li>Oser s'imposer et lâcher prise.</li><li>Se reconnecter à ses sensations corporelles positives.</li></ul>"
            },
            {
                title: "Soutenir l'Association",
                text: "L'Association Hope vit grâce aux dons et aux partenariats. Chaque geste compte pour permettre à davantage de femmes de bénéficier de ces stages vitaux. <p>Vous pouvez les soutenir en faisant un don, en devenant bénévole ou simplement en partageant leur message d'espoir.</p><p><a href='https://hope-association.com/' target='_blank' style='color: #A38C62; text-decoration: underline; font-weight: bold;'>Visiter le site officiel de l'Association Hope</a></p>"
            }
        ]
    }
};
