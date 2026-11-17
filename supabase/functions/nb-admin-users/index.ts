import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10';
import { CORS_HEADERS, json } from '../_shared/cors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const VALID_ROLES = ['staff', 'admin', 'super_admin'];

function generateTempPassword() {
  const raw = crypto.randomUUID().replace(/-/g, '');
  return `${raw.slice(0, 10)}!A1`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user: caller },
    } = await authClient.auth.getUser();
    if (!caller) return json({ error: 'Not authenticated' }, 401);

    const { data: callerProfile } = await authClient
      .from('nb_profiles')
      .select('role')
      .eq('id', caller.id)
      .single();
    if (callerProfile?.role !== 'super_admin') {
      return json({ error: 'Only a Super Admin can manage staff accounts' }, 403);
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body = await req.json();

    if (body.action === 'create') {
      const { full_name, email, role } = body;
      if (!full_name || !email || !VALID_ROLES.includes(role)) {
        return json({ error: 'full_name, email, and a valid role are required' }, 400);
      }

      const tempPassword = generateTempPassword();
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
      });
      if (createError || !created?.user) {
        return json({ error: createError?.message || 'Could not create the account' }, 500);
      }

      const { error: profileError } = await admin.from('nb_profiles').insert({
        id: created.user.id,
        full_name,
        email,
        role,
      });
      if (profileError) {
        await admin.auth.admin.deleteUser(created.user.id);
        return json({ error: profileError.message }, 500);
      }

      return json({ ok: true, temp_password: tempPassword });
    }

    if (body.action === 'reset_password') {
      const { userId } = body;
      if (!userId) return json({ error: 'userId is required' }, 400);

      const tempPassword = generateTempPassword();
      const { error } = await admin.auth.admin.updateUserById(userId, { password: tempPassword });
      if (error) return json({ error: error.message }, 500);

      return json({ ok: true, temp_password: tempPassword });
    }

    if (body.action === 'delete') {
      const { userId } = body;
      if (!userId) return json({ error: 'userId is required' }, 400);

      if (userId === caller.id) {
        return json({ error: 'You cannot remove your own account' }, 400);
      }

      const { data: target } = await admin.from('nb_profiles').select('role').eq('id', userId).single();
      if (target?.role === 'super_admin') {
        const { count } = await admin
          .from('nb_profiles')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'super_admin');
        if ((count ?? 0) <= 1) {
          return json({ error: 'Cannot remove the last remaining Super Admin' }, 400);
        }
      }

      // Deleting the auth user cascades to the nb_profiles row (on delete cascade).
      const { error } = await admin.auth.admin.deleteUser(userId);
      if (error) return json({ error: error.message }, 500);

      return json({ ok: true });
    }

    return json({ error: `Unknown action: ${body.action}` }, 400);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500);
  }
});
