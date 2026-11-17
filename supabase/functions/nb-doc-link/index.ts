import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10';
import { CORS_HEADERS, json } from '../_shared/cors.ts';

const BUCKET = 'nb-documents';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  try {
    const { documentId } = await req.json();
    if (!documentId) return json({ error: 'documentId is required' }, 400);

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: doc, error: docError } = await supabase
      .from('nb_documents')
      .select('id, doc_type, file_path, nb_service_records(tracking_number)')
      .eq('id', documentId)
      .single();
    if (docError || !doc) return json({ error: 'not_found' }, 404);

    const { data: signed, error: signError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(doc.file_path, 3600);
    if (signError || !signed) return json({ error: 'could_not_sign' }, 500);

    return json({
      url: signed.signedUrl,
      trackingNumber: doc.nb_service_records.tracking_number,
      docType: doc.doc_type,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500);
  }
});
