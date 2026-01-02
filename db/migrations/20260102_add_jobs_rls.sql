-- Migration: 2026-01-02 - Enforce RLS on `jobs` so only 'pro' owners can create/update
-- IMPORTANT: Ensure your `profiles` table contains `id` (UUID) and `role` ('cavalier' | 'pro').
-- Ensure `jobs.user_id` references `profiles.id` (UUID) for policies to work.

BEGIN;

-- 1) Enable Row Level Security on jobs
ALTER TABLE IF EXISTS public.jobs ENABLE ROW LEVEL SECURITY;

-- 2) Allow public SELECT (listing) of jobs - adjust as needed
CREATE POLICY IF NOT EXISTS "Allow select on jobs" ON public.jobs
  FOR SELECT
  USING (true);

-- 3) Allow authenticated users with role = 'pro' to INSERT their own job
CREATE POLICY IF NOT EXISTS "Pro owners can insert jobs" ON public.jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'pro')
  );

-- 4) Allow authenticated pro owners to UPDATE their own job
CREATE POLICY IF NOT EXISTS "Pro owners can update their jobs" ON public.jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'pro')
  );

-- 5) Allow owners to DELETE their own job (optional)
CREATE POLICY IF NOT EXISTS "Owners can delete their jobs" ON public.jobs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

COMMIT;

-- NOTES:
-- - Run this migration with the Supabase CLI (`supabase db query < file.sql`) or using `psql` against your DB.
-- - After applying, test by attempting a create as a non-pro account (should fail) and as a pro account (should succeed).
