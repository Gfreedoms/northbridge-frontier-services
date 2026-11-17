import { createClient } from '@supabase/supabase-js';

// Shared Supabase project with Colbis House (colbishouse.com). Every object
// this app creates — tables, functions, triggers, policies, the storage
// bucket — is prefixed nb_ (or nb-documents for the bucket) so nothing here
// ever collides with or touches Colbis House's data. See
// supabase/migrations/nb_tracking_schema.sql.
const SUPABASE_URL = 'https://gazztvptpycbthfzfkki.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_PUBLISHABLE_KEY && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.error(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY is not set — copy .env.local.example to .env.local ' +
    'and fill in the Colbis House Supabase project\'s publishable (anon) key ' +
    '(Supabase dashboard → Settings → API).'
  );
}

// Fall back to a placeholder so `next build`'s static export (which
// evaluates this module once in Node, with no .env.local, to produce every
// page's initial HTML shell) doesn't crash — createClient() throws on a
// falsy key. The placeholder never reaches a real request in the browser,
// where the console.error above already fires if the real key is missing.
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY || 'build-placeholder-key', {
  auth: { persistSession: true, autoRefreshToken: true },
});
