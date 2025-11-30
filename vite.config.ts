import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement (y compris API_KEY sur Vercel)
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Remplace process.env.API_KEY par sa valeur réelle lors du build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Empêche le crash "ReferenceError: process is not defined" dans le navigateur
      'process.env': {},
    }
  };
});