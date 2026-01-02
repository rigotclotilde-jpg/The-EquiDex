import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
// Les clés sont chargées depuis le fichier .env (sécurisé)
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || process.env.VITE_SUPABASE_ANON_KEY || '';

// V├®rification de la configuration
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http');

if (!isConfigured) {
    console.warn(
        "ÔÜá´©Å Supabase n'est pas configur├® (cl├®s manquantes ou incorrectes dans .env). " +
        "L'application bascule en mode D├ëMO avec des donn├®es simul├®es."
    );
}

// Valeurs par d├®faut pour ├®viter le crash de createClient
// L'API (services/api.ts) g├®rera les erreurs de requ├¬te pour basculer sur les donn├®es mock
const url = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const key = isConfigured ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(url, key);
