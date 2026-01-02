import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  // Utilise les variables d'environnement serveur si disponibles, sinon les VITE_* (fallback)
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

  if (!url || !key) {
    return res.status(500).json({ ok: false, error: 'Variables Supabase manquantes (SUPABASE_URL / ANON_KEY).' });
  }

  try {
    const supabase = createClient(url, key);

    // Essaye une requête simple : liste un enregistrement de 'jobs' (si la table existe)
    const { data, error } = await supabase.from('jobs').select('id').limit(1);

    if (error) {
      // Si la table n'existe pas, c'est encore une preuve de connexion mais retournons l'erreur pour debug
      return res.status(200).json({ ok: false, error: error.message, code: (error as any).code || null });
    }

    return res.status(200).json({ ok: true, rowCount: Array.isArray(data) ? data.length : 0 });
  } catch (err) {
    console.error('Supabase health check failed:', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
