import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables .env du dossier courant
  const env = loadEnv(mode, '.', '');
  
  // Priorité : Variable système (Vercel) > Fichier .env > Chaîne vide
  const apiKey = process.env.API_KEY || env.API_KEY || '';
  const supabaseUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || '';
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Injection sécurisée des variables dans le code client
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseKey),
    }
  };
});