
export type ArticleType = 'tabs' | 'accordion' | 'standard';

export interface ArticleData {
    id: string;
    type: ArticleType;
    title: string;
    date: string;
    category: string;
    intro: string;
    excerpt: string; // Ajouté pour la liste
    image: string;   // Unifié (imageUrl vs image)
    content: any;
    expert?: string;
}

export const BLOG_POSTS_DATA: Record<string, ArticleData> = {
    '1': {
        id: '1',
        type: 'standard',
        title: "Anatomie du Sol : Guide des Différents Types de Sables",
        date: "10 Janvier 2025",
        category: "Infrastructures",
        excerpt: "C'est la couche de travail (le sable) qui assure l'interaction directe avec le sabot du cheval.",
        image: "https://picsum.photos/600/400?random=1",
        intro: "Le sol d'une aire de travail (manège, carrière, rond de longe) est composé de plusieurs couches, mais c'est la couche de travail (le sable) qui assure l'interaction directe avec le sabot du cheval.",
        content: [
            { title: "Le Sable de Fontainebleau", text: "Réputé pour sa finesse et sa pureté (99% de silice). C'est la référence historique en France." },
            { title: "Les Sables Fibrés", text: "Mélange de sable microsilice et de fibres géotextiles. Ils offrent un amorti supérieur." },
            { title: "L'entretien", text: "Quel que soit le type de sable, l'arrosage et le hersage quotidiens sont indispensables." }
        ]
    },
    '2': {
        id: '2',
        type: 'standard',
        title: "Diplômes pour Travailler dans le Monde de l'Équitation",
        date: "15 Février 2025",
        category: "Métiers",
        excerpt: "Ces diplômes sont délivrés par le Ministère des Sports et la FFE pour encadrer et enseigner.",
        image: "https://picsum.photos/600/400?random=2",
        intro: "Ces diplômes sont délivrés par le Ministère des Sports et la Fédération Française d'Équitation (FFE). Ils permettent d'encadrer et d'enseigner l'équitation contre rémunération.",
        content: [
            { title: "L'AE (Animateur d'Équitation)", text: "Le premier niveau professionnel." },
            { title: "Le BPJEPS (Moniteur)", text: "Le Brevet Professionnel est le diplôme roi." },
            { title: "Le DEJEPS (Entraîneur)", text: "Pour le perfectionnement sportif." }
        ]
    },
    '3': {
        id: '3',
        type: 'standard',
        title: "L'Écurie Active : Un Mode d'Hébergement au Service du Bien-Être",
        date: "20 Mars 2025",
        category: "Bien-être",
        excerpt: "L'Écurie Active vise à reproduire le plus fidèlement possible les conditions de vie du cheval à l'état naturel.",
        image: "https://picsum.photos/600/400?random=3",
        intro: "L'Écurie Active est un concept d'hébergement en groupe qui vise à reproduire le plus fidèlement possible les conditions de vie du cheval à l'état naturel.",
        content: [
            { title: "Séparer les ressources", text: "Le principe clé est d'éloigner les points d'intérêt pour obliger les chevaux à se déplacer." },
            { title: "La technologie", text: "Des automates (DAC/DAF) gèrent l'alimentation individuelle." }
        ]
    },
    '4': {
        id: '4',
        type: 'standard',
        title: "Les 15 Événements Équestres Majeurs en France",
        date: "25 Avril 2025",
        category: "Compétitions",
        excerpt: "Le CSO est la discipline la plus médiatisée et la plus soutenue par les marques de luxe en France.",
        image: "https://picsum.photos/600/400?random=4",
        intro: "La France est une terre de cheval par excellence. Du saut d'obstacles prestigieux au complet en passant par les courses mythiques, voici les événements incontournables.",
        content: [
            { title: "Le Saut Hermès", text: "Le rendez-vous glamour et sportif au Grand Palais." },
            { title: "Jumping de La Baule", text: "Un stade équestre mythique en bord de mer." }
        ]
    },
    '5': {
        id: '5',
        type: 'standard',
        title: "L'Hippothérapie et les Bienfaits de la Médiation Équine",
        date: "30 Mai 2025",
        category: "Bien-être",
        excerpt: "Le cheval est aussi reconnu comme un formidable médiateur thérapeutique.",
        image: "https://picsum.photos/600/400?random=5",
        intro: "Le cheval est de plus en plus reconnu comme un formidable médiateur thérapeutique.",
        content: [
            { title: "Thérapie par le mouvement", text: "Le pas du cheval reproduit le mouvement du bassin humain." },
            { title: "Miroir des émotions", text: "Le cheval réagit instantanément à notre état émotionnel." }
        ]
    },
    '6': {
        id: '6',
        type: 'standard',
        title: "L'Histoire du Monde Équin : De la Proie au Partenaire d'Élite",
        date: "05 Juillet 2025",
        category: "Histoire",
        excerpt: "L'histoire du cheval est une longue marche évolutive qui a débuté il y a des millions d'années.",
        image: "https://picsum.photos/600/400?random=6",
        intro: "L'histoire du cheval est une longue marche évolutive qui a transformé les civilisations.",
        content: [
            { title: "Domestication", text: "Il y a environ 5500 ans dans les steppes eurasiennes." },
            { title: "Cheval de Guerre", text: "Le cheval a décidé du sort des empires pendant des millénaires." }
        ]
    },
    '7': {
        id: '7',
        type: 'standard',
        title: "Liste des Différents Niveaux de Galop (FFE)",
        date: "10 Août 2025",
        category: "Examens",
        excerpt: "Les Galops de Cavalier vont du niveau d'initiation (Galop 1) à l'autonomie en compétition (Galop 7).",
        image: "https://picsum.photos/600/400?random=7",
        intro: "Les Galops de Cavalier valident des compétences à pied, à cheval et théoriques.",
        content: [
            { title: "Galops 1 à 4", text: "Le socle de l'autonomie." },
            { title: "Galops 5 à 7", text: "Le perfectionnement et la compétition." }
        ]
    },
    '8': {
        id: '8',
        type: 'accordion',
        title: "La Maintenance Invisible : Guide des Outils pour l'Entretien des Sols Équestres",
        date: "15 Septembre 2025",
        category: "Infrastructures",
        excerpt: "Un sol de carrière de qualité est un investissement. Pour garantir sa performance technique, un entretien régulier est non négociable.",
        image: "https://picsum.photos/600/400?random=8",
        intro: "Un sol de carrière de qualité (fibré, sablé, ou même stabilisé) est un investissement majeur. Pour garantir sa performance technique et prévenir l'usure prématurée des tendons du cheval, un entretien régulier est non négociable. L'équipement de maintenance doit répondre à trois objectifs principaux : nivellement, décompactage et recompactage.",
        expert: "Un arrosage excessif sur un sol fibré peut être aussi néfaste que la sécheresse. Le taux d'humidité idéal se situe souvent entre 15% et 20% pour garantir la 'frappe' du pied sans glissade.",
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
        image: "https://picsum.photos/600/400?random=9",
        intro: "L'équitation de haut niveau est rythmée par des événements sportifs d'exception. Du faste des Jeux Olympiques au glamour du Longines Global Champions Tour, voici une sélection des compétitions qui façonnent le calendrier équestre mondial, synonymes d'excellence, de luxe et de performance.",
        content: {
            majors: {
                title: "Le Sommet de la Compétition",
                desc: "Ces compétitions sont les plus prestigieuses et ont souvent lieu selon un cycle quadriennal (cycle olympique).",
                image: "https://picsum.photos/1200/600?random=91",
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
                image: "https://picsum.photos/1200/600?random=92",
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
                image: "https://picsum.photos/1200/600?random=93",
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
                image: "https://picsum.photos/1200/600?random=94",
                expert: "Le Prix de l'Arc de Triomphe est la course de gazon la mieux dotée d'Europe (5M€).",
                data: [
                    { id: 18, name: "Grand Prix d'Amérique", disc: "Trot Attelé", prestige: "Sommet mondial du Trot." },
                    { id: 19, name: "Prix de l'Arc de Triomphe", disc: "Galop Plat", prestige: "Événement mondain." },
                    { id: 20, name: "Winter Equestrian Festival", disc: "CSO / Hunter", prestige: "Lifestyle équestre (Floride)." }
                ]
            }
        }
    }
};
