DB migration: Row-Level Security for `stables`

This directory contains SQL migrations that can be applied to your Supabase/Postgres database.

Migration file:
- `db/migrations/20260102_add_stables_rls.sql`: Enables RLS on `stables` and adds policies so that:
  - Any client can SELECT stables
  - Only authenticated users with `profiles.role = 'pro'` can INSERT/UPDATE a stable where `user_id = auth.uid()`
  - Owners can DELETE their own stable
- `db/migrations/20260102_add_jobs_rls.sql`: Enables RLS on `jobs` and adds policies so that:
  - Any client can SELECT jobs
  - Only authenticated users with `profiles.role = 'pro'` can INSERT/UPDATE a job where `user_id = auth.uid()`
  - Owners can DELETE their own job

How to apply (Supabase CLI):
1. Make sure you are authenticated and your project is set in the CLI:
   - `supabase login`
   - `supabase init` (if not already configured)

2. Run the migration SQL:
   - `supabase db query < db/migrations/20260102_add_stables_rls.sql`

How to apply (psql):
1. Set `SUPABASE_DB_URL` or your Postgres connection string (from Supabase project settings -> Database -> Connection string)
2. Run:
   - `psql "$SUPABASE_DB_URL" -f db/migrations/20260102_add_stables_rls.sql`

Testing:
- Create or login as a non-pro user and attempt to insert or update a stable -> it should fail with a DB permission or RLS policy error.
- Create or set the role of the test user to `pro` and then perform the same operations -> they should succeed.

Notes:
- Ensure `stables.user_id` is stored as the same UUID type as `profiles.id` and that your `profiles` table accurately reflects user roles.
- For stricter security, you may want to add policies restricting SELECT to published or public listings only.
