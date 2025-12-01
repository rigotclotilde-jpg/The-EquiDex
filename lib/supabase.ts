import { createClient } from '@supabase/supabase-js';

// Récupération sécurisée des variables d'environnement.
// On utilise directement process.env.VITE_... qui sera remplacé par la valeur textuelle lors du build par Vite.
// Cela évite les erreurs de runtime si import.meta.env n'est pas défini.

// @ts-ignore
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
// @ts-ignore
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http');

if (!isConfigured) {
    console.warn(
        "🚨 Supabase non configuré correctement. \n" +
        "L'application passera en mode dégradé (DÉMO)."
    );
}

// Mode Démo / Fallback
const urlToUse = isConfigured ? supabaseUrl : 'https://demo.supabase.co';
const keyToUse = isConfigured ? supabaseAnonKey : 'demo-key';

export const supabase = createClient(urlToUse, keyToUse, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});