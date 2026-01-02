import { GoogleGenAI } from "@google/genai";
import { User, JobOffer, ChatMessage } from '../types';
import { supabase } from '../lib/supabase';

// --- AI HELPER ---
const getApiKey = () => {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY || '';
};

// Initialisation "Lazy" : on ne crée l'instance que quand on en a besoin
const getAI = () => {
    const key = getApiKey();
    if (!key) {
        console.warn("⚠️ Clé API Gemini manquante. Vérifiez vos variables d'environnement (API_KEY).");
        return null;
    }
    return new GoogleGenAI({ apiKey: key });
};

// --- API SERVICE ---

export const api = {
    auth: {
        login: async (email: string, type: 'cavalier' | 'pro'): Promise<User> => {
            await new Promise(r => setTimeout(r, 500));

            try {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('email', email)
                    .maybeSingle();

                if (error) throw error;

                if (!profile) {
                    console.warn(`⚠️ Aucun profil trouvé pour ${email}. Mode Démo.`);
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
            } catch (err) {
                console.warn("Erreur Supabase (Mode hors ligne probable):", err);
                return {
                    id: 'offline_user',
                    name: "Utilisateur Hors-Ligne",
                    email: email,
                    type: type,
                    points: 0,
                    unlockedArticles: []
                };
            }
        },
        logout: async (): Promise<void> => {
            await supabase.auth.signOut();
        },
        getSession: async (): Promise<User | null> => {
            try {
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
            } catch (error) {
                return null;
            }
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
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error || !data) return [];

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
            } catch (error) {
                console.warn("Erreur chargement jobs:", error);
                return [];
            }
        },
        create: async (jobData: Omit<JobOffer, 'id' | 'date' | 'isPremium' | 'image' | 'perks'>): Promise<JobOffer> => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Non connecté');

            // Verify user's role is 'pro'
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profileError || !profile) {
                throw new Error('Profil introuvable. Veuillez vérifier votre compte.');
            }

            if (profile.role !== 'pro') {
                throw new Error('Accès refusé — seuls les comptes professionnels peuvent créer des offres d\'emploi.');
            }

            const { data, error } = await supabase
                .from('jobs')
                .insert([{ ...jobData, user_id: user.id }])
                .select()
                .single();

            if (error) throw error;
            return { ...jobData, id: data.id, date: "À l'instant", isPremium: false, image: "https://picsum.photos/100/100?random=99", perks: [] };
        }
    },
    // --- STABLES (Annuaire) ---
    stables: {
        getAll: async (): Promise<any[]> => {
            try {
                // Select associated profile (owner) so we can filter by owner role
                const { data, error } = await supabase
                    .from('stables')
                    .select('*, profiles(id, role)')
                    .order('created_at', { ascending: false });

                if (error || !data) return [];

                // Only return stables whose owner profile has role === 'pro'
                const proStables = data.filter((s: any) => s.profiles && s.profiles.role === 'pro');
                return proStables;
            } catch (error) {
                console.warn('Erreur chargement stables:', error);
                return [];
            }
        },
        getByOwner: async (ownerId: string) => {
            try {
                const { data, error } = await supabase
                    .from('stables')
                    .select('*')
                    .eq('user_id', ownerId)
                    .single();

                if (error) return null;
                return data;
            } catch (error) {
                console.warn('Erreur getByOwner:', error);
                return null;
            }
        },
        upsert: async (stableData: any) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Non connecté');

            // Ensure the current user has a 'pro' role before allowing upsert
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profileError || !profile) {
                throw new Error('Profil introuvable. Veuillez vérifier votre compte.');
            }

            if (profile.role !== 'pro') {
                throw new Error('Accès refusé — seuls les comptes professionnels peuvent créer ou modifier une fiche écurie.');
            }

            const payload = { ...stableData, user_id: user.id };
            const { data, error } = await supabase
                .from('stables')
                .upsert(payload, { onConflict: 'user_id' })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    },
    chat: {
        sendMessage: async (history: ChatMessage[], newMessage: string): Promise<string> => {
            try {
                const resp = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ history, message: newMessage })
                });

                if (!resp.ok) {
                    const err = await resp.json().catch(() => null);
                    console.error('Server chat error', err);
                    return 'Désolé, je rencontre des difficultés techniques pour joindre mon écurie de données. Veuillez vérifier votre connexion ou réessayer plus tard.';
                }

                const data = await resp.json();
                return data.text || "Je n'ai pas réussi à formuler une réponse. Veuillez réessayer.";
            } catch (error) {
                console.error('Chat fetch error:', error);
                return 'Erreur de communication avec le serveur EquiDex.';
            }
        }
    }
};