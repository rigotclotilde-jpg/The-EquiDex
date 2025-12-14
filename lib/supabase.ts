import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
// Les cl├®s sont charg├®es depuis le fichier .env (s├®curis├®)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

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
