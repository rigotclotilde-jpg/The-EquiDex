import { GoogleGenAI } from "@google/genai";
import { User, JobOffer, ChatMessage } from '../types';

// Simulation de la latence réseau (ex: 800ms)
const NETWORK_DELAY = 800;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- AI CONFIGURATION (SERVER SIDE SIMULATION) ---
// Initialisation sécurisée pour éviter le crash "White Screen" si la clé ou process.env manque
let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("API_KEY manquante. EquiBot sera désactivé.");
    }
} catch (error) {
    console.error("Erreur initialisation GoogleGenAI:", error);
}

// --- MOCK DATABASE ---

let MOCK_JOBS: JobOffer[] = [
    {
        id: 1,
        title: "Groom Haut Niveau (H/F)",
        company: "Haras de la Forêt",
        location: "78, Yvelines",
        type: "CDI",
        salary: "2500€ - 3000€ net",
        date: "Il y a 2 jours",
        ref: "REF-2025-045",
        start: "Dès que possible",
        description: "Le Haras de la Forêt, écurie de compétition 5* reconnue pour son excellence et ses résultats internationaux, recherche son/sa futur(e) Groom Maison & Concours pour compléter son équipe.",
        missions: [
            "Gestion quotidienne des soins aux chevaux.",
            "Préparation des chevaux pour le travail et les concours.",
            "Accompagnement en compétitions internationales."
        ],
        profile: [
            "Expérience significative (min. 3 ans).",
            "Permis Poids Lourd (C) indispensable."
        ],
        benefits: [
            "Logement individuel tout équipé",
            "Véhicule de fonction"
        ],
        perks: ["Logement sur place", "Véhicule fourni", "Primes concours"],
        isPremium: true,
        image: "https://picsum.photos/100/100?random=50"
    },
    {
        id: 2,
        title: "Cavalier Maison / Jeunes Chevaux",
        company: "Écurie d'Excellence",
        location: "14, Calvados",
        type: "Freelance",
        salary: "Selon profil",
        date: "Aujourd'hui",
        ref: "REF-2025-048",
        start: "Immédiat",
        description: "Cavalier(ère) confirmé(e) pour travail sur le plat et saut de jeunes chevaux (4 à 6 ans). Valorisation en cycles classiques.",
        missions: ["Débourrage", "Travail sur le plat", "Sortie en cycles classiques"],
        profile: ["Galop 7 minimum", "Expérience jeunes chevaux"],
        benefits: ["Possibilité de venir avec son cheval"],
        perks: ["Box pour 1 cheval", "Possibilité logement"],
        isPremium: true,
        image: "https://picsum.photos/100/100?random=51"
    },
    {
        id: 3,
        title: "Responsable d'Écurie",
        company: "Domaine Privé",
        location: "CH, Genève",
        type: "CDI",
        salary: "À débattre",
        date: "Il y a 5 jours",
        ref: "REF-SWISS-01",
        start: "Novembre 2025",
        description: "Gestion complète d'une écurie privée de 10 chevaux. Management d'une équipe de 2 palefreniers. Rigueur et discrétion exigées.",
        missions: ["Management équipe", "Gestion stocks", "Surveillance soins"],
        profile: ["Expérience management", "Anglais courant"],
        benefits: ["Logement de fonction haute qualité"],
        perks: ["Logement individuel", "Repas inclus"],
        isPremium: false,
        image: "https://picsum.photos/100/100?random=52"
    }
];

let CURRENT_USER: User | null = null;

// --- API SERVICE ---

export const api = {
    auth: {
        login: async (email: string, type: 'cavalier' | 'pro'): Promise<User> => {
            await delay(NETWORK_DELAY);
            // Simulation d'un utilisateur récupéré depuis la DB
            CURRENT_USER = {
                id: 'user_123',
                name: type === 'cavalier' ? "Sophie Dubois" : "Haras de la Forêt",
                email: email,
                type: type,
                points: 150,
                unlockedArticles: []
            };
            return CURRENT_USER;
        },
        logout: async (): Promise<void> => {
            await delay(NETWORK_DELAY / 2); // Logout est souvent plus rapide
            CURRENT_USER = null;
        },
        getSession: async (): Promise<User | null> => {
            await delay(NETWORK_DELAY);
            return CURRENT_USER;
        }
    },
    user: {
        updatePoints: async (pointsToDeduct: number, articleId: string): Promise<User> => {
            await delay(NETWORK_DELAY);
            if (!CURRENT_USER) throw new Error("Utilisateur non connecté");
            if (CURRENT_USER.points < pointsToDeduct) throw new Error("Solde insuffisant");

            // Mise à jour atomique simulée
            CURRENT_USER = {
                ...CURRENT_USER,
                points: CURRENT_USER.points - pointsToDeduct,
                unlockedArticles: [...CURRENT_USER.unlockedArticles, articleId]
            };
            return CURRENT_USER;
        }
    },
    jobs: {
        getAll: async (): Promise<JobOffer[]> => {
            await delay(NETWORK_DELAY);
            return [...MOCK_JOBS];
        },
        create: async (jobData: Omit<JobOffer, 'id' | 'date' | 'isPremium' | 'image' | 'perks'>): Promise<JobOffer> => {
            await delay(NETWORK_DELAY + 500); // Un peu plus long pour simuler l'écriture
            
            const newJob: JobOffer = {
                ...jobData,
                id: Date.now(),
                date: "À l'instant",
                isPremium: false,
                image: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`,
                perks: jobData.benefits.slice(0, 3)
            };
            
            MOCK_JOBS = [newJob, ...MOCK_JOBS];
            return newJob;
        }
    },
    chat: {
        sendMessage: async (history: ChatMessage[], newMessage: string): Promise<string> => {
            if (!ai) {
                return "Le service EquiBot est temporairement indisponible (Clé API manquante ou erreur configuration).";
            }

            // Dans une vraie Edge Function, ceci tourne sur un serveur sécurisé
            try {
                // Conversion de l'historique au format attendu par Gemini SDK
                const historyForModel = history
                    .filter(msg => msg.id !== 'welcome') // On ignore le message de bienvenue statique
                    .map(msg => ({
                        role: msg.role,
                        parts: [{ text: msg.text }]
                    }));

                // Création d'une session "chat" stateless pour ce tour de conversation
                const chat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    history: historyForModel,
                    config: {
                        systemInstruction: `You are "EquiBot", a world-class equestrian assistant for "The EquiDex". 
                        You are knowledgeable about horse care, riding disciplines (Show Jumping, Dressage, Eventing), 
                        stable management, and luxury equestrian equipment. 
                        Your tone is professional, encouraging, and refined. 
                        Keep answers concise but helpful.`,
                    },
                });

                const response = await chat.sendMessage({ message: newMessage });
                return response.text || "Je suis navré, je n'ai pas pu générer de réponse.";
            } catch (error) {
                console.error("AI Service Error:", error);
                return "Désolé, je rencontre des difficultés techniques pour joindre mon service d'intelligence.";
            }
        }
    }
};