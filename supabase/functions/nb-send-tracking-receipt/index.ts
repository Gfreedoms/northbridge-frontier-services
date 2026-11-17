import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10';
import { CORS_HEADERS, json } from '../_shared/cors.ts';
import { brandedEmail, sendEmail } from '../_shared/email.ts';

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://REPLACE-ME.github.io/northbridge-frontier-services';

function digitsOnly(v: string) {
  return (v || '').replace(/\D/g, '');
}

// Public/anonymous callable — never trust the client-supplied documentId or
// tracking number alone. Independently re-verify the caller actually owns
// this record (same last-4-digits-of-phone / exact-id_number check
// nb_track_record uses) before looking up or emailing anything.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  try {
    const { trackingNumber, verifyValue } = await req.json();
    if (!trackingNumber || !verifyValue) {
      return json({ error: 'trackingNumber and verifyValue are required' }, 400);
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: record } = await supabase
      .from('nb_service_records')
      .select('id, tracking_number, client_id')
      .eq('tracking_number', trackingNumber)
      .single();
    // Identical "not found" response whether the tracking number doesn't
    // exist or the second factor is wrong — never distinguish the two.
    if (!record) return json({ error: 'not_found' }, 404);

    const { data: client } = await supabase
      .from('nb_clients')
      .select('full_name, phone, id_number, email')
      .eq('id', record.client_id)
      .single();
    if (!client) return json({ error: 'not_found' }, 404);

    const phoneMatch =
      digitsOnly(client.phone).length >= 4 &&
      digitsOnly(client.phone).slice(-4) === digitsOnly(verifyValue).slice(-4) &&
      digitsOnly(verifyValue).length >= 4;
    const idMatch = client.id_number && client.id_number === verifyValue;

    if (!phoneMatch && !idMatch) return json({ error: 'not_found' }, 404);

    if (!client.email) return json({ error: 'no_email_on_file' }, 400);

    const { data: doc } = await supabase
      .from('nb_documents')
      .select('id, doc_type')
      .eq('service_record_id', record.id)
      .order('generated_at', { ascending: false })
      .limit(1)
      .single();
    if (!doc) return json({ error: 'no_document' }, 404);

    const docUrl = `${SITE_URL}/doc/?id=${doc.id}`;

    await sendEmail({
      to: client.email,
      subject: `Your document — ${record.tracking_number} — Northbridge Frontier Services`,
      html: brandedEmail(
        'Your Document Is Ready',
        `<p>Hello ${client.full_name},</p>
         <p>As requested, here is your ${doc.doc_type.replace('_', ' ')} for tracking number <strong>${record.tracking_number}</strong>.</p>
         <p><a href="${docUrl}" style="color:#BA0C2F;font-weight:600;">View / Download Document</a></p>`
      ),
    });

    await supabase.from('nb_documents').update({ emailed_at: new Date().toISOString() }).eq('id', doc.id);

    return json({ ok: true });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500);
  }
});
