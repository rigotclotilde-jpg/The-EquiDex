-- Migration: 2026-01-03 - Ensure `profiles` table exists and is populated from auth.users

BEGIN;

-- 1) Create profiles table if it doesn't exist (id should be the auth user id)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  email text,
  full_name text,
  role text DEFAULT 'cavalier',
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2) Create function to insert into profiles when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_auth_user_created()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  -- If a profile already exists, do nothing
  IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = NEW.id) THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, points, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.user_metadata ->> 'full_name', NEW.email),
    COALESCE(NEW.user_metadata ->> 'role', 'cavalier'),
    0,
    now()
  );

  RETURN NEW;
END;
$$;

-- 3) Attach trigger to auth.users (follows standard Supabase approach)
-- Ensure trigger doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created') THEN

    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_auth_user_created();
  END IF;
END$$;

-- 4) Backfill existing auth.users into profiles table for any missing profiles
INSERT INTO public.profiles (id, email, full_name, role, points, created_at)
SELECT u.id, u.email, COALESCE(u.user_metadata ->> 'full_name', u.email) as full_name,
       COALESCE(u.user_metadata ->> 'role', 'cavalier') as role, 0, now()
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

COMMIT;

-- Notes:
-- Run this migration using Supabase CLI or psql against the DB.
-- This ensures that every auth.user has an associated profile row and future signups are automatically populated.