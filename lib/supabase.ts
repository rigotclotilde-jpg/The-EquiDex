import { createClient } from '@supabase/supabase-js';

// Configuration Supabase avec vos clés spécifiques
// Si les variables d'environnement ne sont pas trouvées (ex: en local sans .env), on utilise ces valeurs par défaut.
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rphxncuuxcimmioacxpl.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHhuY3V1eGNpbW1pb2FjeHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NTE0NTEsImV4cCI6MjA4MDAyNzQ1MX0.vrGFy9iqKB2cU01T4ZlG7t6usD2CiGLyHiQBJHI_3d0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);