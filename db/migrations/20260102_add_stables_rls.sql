-- Migration: 2026-01-02 - Enforce RLS on `stables` so only 'pro' owners can create/update
-- IMPORTANT: Ensure your `profiles` table contains `id` (UUID) and `role` ('cavalier' | 'pro').
-- Ensure `stables.user_id` references `profiles.id` (UUID) for policies to work.

BEGIN;

-- 1) Enable Row Level Security on stables
ALTER TABLE IF EXISTS public.stables ENABLE ROW LEVEL SECURITY;

-- 2) Allow public SELECT (listing) of stables - adjust as needed
CREATE POLICY IF NOT EXISTS "Allow select on stables" ON public.stables
  FOR SELECT
  USING (true);

-- 3) Allow authenticated users with role = 'pro' to INSERT their own stable
CREATE POLICY IF NOT EXISTS "Pro owners can insert stables" ON public.stables
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'pro')
  );

-- 4) Allow authenticated pro owners to UPDATE their own stable
CREATE POLICY IF NOT EXISTS "Pro owners can update their stables" ON public.stables
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'pro')
  );

-- 5) Allow owners to DELETE their own stable (optional)
CREATE POLICY IF NOT EXISTS "Owners can delete their stables" ON public.stables
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

COMMIT;

-- NOTES:
-- - Run this migration with the Supabase CLI (`supabase db query < file.sql`) or using `psql` against your DB.
-- - After applying, test by attempting an upsert as a non-pro account (should fail) and as a pro account (should succeed).
