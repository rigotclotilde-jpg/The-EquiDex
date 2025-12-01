import { createClient } from '@supabase/supabase-js';

// Les clés sont chargées depuis le fichier .env (sécurisé)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Vérification de la configuration
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http');

if (!isConfigured) {
    console.warn(
        "⚠️ Supabase n'est pas configuré (clés manquantes ou incorrectes dans .env). " +
        "L'application bascule en mode DÉMO avec des données simulées."
    );
}

// Valeurs par défaut pour éviter le crash de createClient
// L'API (services/api.ts) gérera les erreurs de requête pour basculer sur les données mock
const url = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const key = isConfigured ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(url, key);