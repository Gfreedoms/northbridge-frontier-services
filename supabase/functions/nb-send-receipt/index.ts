import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10';
import { CORS_HEADERS, json } from '../_shared/cors.ts';
import { brandedEmail, sendEmail } from '../_shared/email.ts';

// Update once Northbridge has a real deployed URL (currently the GitHub
// Pages path). Set as the SITE_URL edge function secret.
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://REPLACE-ME.github.io/northbridge-frontier-services';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  try {
    const { documentId } = await req.json();
    if (!documentId) return json({ error: 'documentId is required' }, 400);

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: doc, error: docError } = await supabase
      .from('nb_documents')
      .select('id, doc_type, service_record_id, nb_service_records(tracking_number, client_id)')
      .eq('id', documentId)
      .single();
    if (docError || !doc) return json({ error: 'Document not found' }, 404);

    const { data: client, error: clientError } = await supabase
      .from('nb_clients')
      .select('full_name, email')
      .eq('id', doc.nb_service_records.client_id)
      .single();
    if (clientError || !client?.email) return json({ error: 'No email on file for this client' }, 400);

    const docUrl = `${SITE_URL}/doc/?id=${doc.id}`;
    const trackingNumber = doc.nb_service_records.tracking_number;

    await sendEmail({
      to: client.email,
      subject: `Your document — ${trackingNumber} — Northbridge Frontier Services`,
      html: brandedEmail(
        'Your Document Is Ready',
        `<p>Hello ${client.full_name},</p>
         <p>Your ${doc.doc_type.replace('_', ' ')} for tracking number <strong>${trackingNumber}</strong> is ready.</p>
         <p><a href="${docUrl}" style="color:#BA0C2F;font-weight:600;">View / Download Document</a></p>
         <p>This link stays valid for a short time and refreshes automatically each time it's opened.</p>`
      ),
    });

    await supabase.from('nb_documents').update({ emailed_at: new Date().toISOString() }).eq('id', documentId);

    return json({ ok: true });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500);
  }
});
