import { GoogleGenAI } from "@google/genai";
import { User, JobOffer, ChatMessage } from '../types';
import { supabase } from '../lib/supabase';

// --- AI CONFIGURATION ---
let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
} catch (error) {
    console.error("Erreur initialisation GoogleGenAI:", error);
}

// --- API SERVICE ---

export const api = {
    auth: {
        login: async (email: string, type: 'cavalier' | 'pro'): Promise<User> => {
            // Vérifie si l'utilisateur existe dans la table 'profiles'
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', email)
                .single();

            if (error || !profile) {
                // Mode Démo si pas de base de données configurée ou utilisateur inconnu
                console.warn("Utilisateur non trouvé ou erreur DB, mode démo activé");
                return {
                    id: 'demo_user',
                    name: type === 'cavalier' ? "Utilisateur Démo" : "Écurie Démo",
                    email: email,
                    type: type,
                    points: 100,
                    unlockedArticles: []
                };
            }

            return {
                id: profile.id,
                name: profile.full_name || email,
                email: profile.email,
                type: profile.role as 'cavalier' | 'pro',
                points: profile.points || 0,
                unlockedArticles: []
            };
        },
        logout: async (): Promise<void> => {
            await supabase.auth.signOut();
        },
        getSession: async (): Promise<User | null> => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return null;

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            
            if (!profile) return null;

            return {
                id: profile.id,
                name: profile.full_name || session.user.email || '',
                email: profile.email || session.user.email || '',
                type: profile.role as 'cavalier' | 'pro',
                points: profile.points || 0,
                unlockedArticles: []
            };
        }
    },
    user: {
        updatePoints: async (pointsToDeduct: number, articleId: string): Promise<User> => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Non connecté");

            const { data: profile } = await supabase.from('profiles').select('points').eq('id', user.id).single();
            
            if (!profile || profile.points < pointsToDeduct) {
                throw new Error("Solde insuffisant");
            }

            const newPoints = profile.points - pointsToDeduct;
            const { data: updatedProfile, error } = await supabase
                .from('profiles')
                .update({ points: newPoints })
                .eq('id', user.id)
                .select()
                .single();

            if (error) throw error;

            return {
                id: updatedProfile.id,
                name: updatedProfile.full_name,
                email: updatedProfile.email,
                type: updatedProfile.role,
                points: updatedProfile.points,
                unlockedArticles: [articleId]
            };
        }
    },
    jobs: {
        getAll: async (): Promise<JobOffer[]> => {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error || !data) {
                return [];
            }
            
            return data.map((job: any) => ({
                id: job.id,
                title: job.title,
                company: job.company,
                location: job.location || "France",
                type: job.type || "CDI",
                salary: job.salary || "Non spécifié",
                date: new Date(job.created_at).toLocaleDateString(),
                description: job.description || "",
                missions: ["Voir description détaillée"],
                profile: ["Voir description détaillée"],
                benefits: [],
                perks: [],
                isPremium: false,
                image: `https://picsum.photos/100/100?random=${job.id}`
            }));
        },
        create: async (jobData: Omit<JobOffer, 'id' | 'date' | 'isPremium' | 'image' | 'perks'>): Promise<JobOffer> => {
            const { data: { user } } = await supabase.auth.getUser();
            
            const { data, error } = await supabase
                .from('jobs')
                .insert([
                    {
                        title: jobData.title,
                        company: jobData.company,
                        location: jobData.location,
                        type: jobData.type,
                        salary: jobData.salary,
                        description: jobData.description,
                        user_id: user?.id
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            return {
                ...jobData,
                id: data.id,
                date: "À l'instant",
                isPremium: false,
                image: "https://picsum.photos/100/100?random=99",
                perks: []
            };
        }
    },
    chat: {
        sendMessage: async (history: ChatMessage[], newMessage: string): Promise<string> => {
            if (!ai) return "Service indisponible (Clé manquante).";

            try {
                const historyForModel = history
                    .filter(msg => msg.id !== 'welcome')
                    .map(msg => ({
                        role: msg.role,
                        parts: [{ text: msg.text }]
                    }));

                const chat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    history: historyForModel,
                });

                const response = await chat.sendMessage({ message: newMessage });
                return response.text || "Erreur de réponse.";
            } catch (error) {
                console.error("AI Error:", error);
                return "Erreur technique.";
            }
        }
    }
};