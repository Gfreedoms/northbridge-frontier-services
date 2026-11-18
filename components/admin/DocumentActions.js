'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { pdf } from '@react-pdf/renderer';
import { supabase } from '@/lib/supabaseClient';
import { basePath } from '@/lib/basePath';
import { docTypeForService } from '@/lib/services';
import { toWhatsAppDigits } from '@/lib/phone';
import { receiptDocumentFor } from '@/components/pdf/ReceiptDocument';

const BUCKET = 'nb-documents';

export default function DocumentActions({ record, client }) {
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [busyDocId, setBusyDocId] = useState(null);
  const [error, setError] = useState('');
  const [mailtoFallback, setMailtoFallback] = useState(null); // { docId, url }

  const loadDocuments = async () => {
    const { data } = await supabase
      .from('nb_documents')
      .select('*')
      .eq('service_record_id', record.id)
      .order('generated_at', { ascending: false });
    setDocuments(data || []);
    setLoadingDocs(false);
  };

  useEffect(() => {
    loadDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record.id]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    try {
      const docType = docTypeForService(record.service_type);
      const trackingUrl = `${window.location.origin}${basePath}/track/?tn=${encodeURIComponent(record.tracking_number)}`;
      const qrDataUrl = await QRCode.toDataURL(trackingUrl, { margin: 1, width: 240 });

      const doc = receiptDocumentFor(docType, { record, client, qrDataUrl });
      const blob = await pdf(doc).toBlob();

      // One document per record — a stable path + upsert:true overwrites the
      // same file in place instead of piling up a new one on every click.
      const filePath = `${record.id}/${docType}.pdf`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(filePath, blob, {
        contentType: 'application/pdf',
        upsert: true,
      });
      if (uploadError) throw uploadError;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const existing = documents[0];
      if (existing) {
        const { error: updateError } = await supabase
          .from('nb_documents')
          .update({ doc_type: docType, file_path: filePath, generated_by: user?.id, generated_at: new Date().toISOString() })
          .eq('id', existing.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('nb_documents').insert({
          service_record_id: record.id,
          doc_type: docType,
          file_path: filePath,
          generated_by: user?.id,
        });
        if (insertError) throw insertError;
      }

      await loadDocuments();
    } catch (err) {
      setError(err.message || 'Could not generate the document.');
    } finally {
      setGenerating(false);
    }
  };

  const handleViewPrint = async (doc) => {
    setBusyDocId(doc.id);
    setError('');
    try {
      const { data, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(doc.file_path, 1800);
      if (signError) throw signError;
      window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err.message || 'Could not open this document.');
    } finally {
      setBusyDocId(null);
    }
  };

  const handleEmail = async (doc) => {
    setBusyDocId(doc.id);
    setError('');
    setMailtoFallback(null);
    try {
      const { error: fnError } = await supabase.functions.invoke('nb-send-receipt', {
        body: { documentId: doc.id },
      });
      if (fnError) throw fnError;
      await supabase.from('nb_documents').update({ emailed_at: new Date().toISOString() }).eq('id', doc.id);
      await loadDocuments();
    } catch {
      // Don't call window.open() here — by this point we're past an await,
      // so Chrome's popup blocker silently kills it with no error shown.
      // Surface a real link instead so the admin's own click opens it.
      if (client.email) {
        const mailtoUrl = `mailto:${client.email}?subject=${encodeURIComponent(`Your ${record.tracking_number} document — Northbridge Frontier Services`)}&body=${encodeURIComponent(
          'Please find your document attached. If you did not receive an attachment, contact our office quoting your tracking number.'
        )}`;
        setMailtoFallback({ docId: doc.id, url: mailtoUrl });
        setError('Could not send automatically — use the link below to open an email draft instead.');
      } else {
        setError('This client has no email on file, and the email service could not be reached.');
      }
    } finally {
      setBusyDocId(null);
    }
  };

  const handleMailtoFallbackClick = async (doc) => {
    await supabase.from('nb_documents').update({ emailed_at: new Date().toISOString() }).eq('id', doc.id);
    await loadDocuments();
    setMailtoFallback(null);
  };

  const handleWhatsApp = async (doc) => {
    setBusyDocId(doc.id);
    setError('');
    try {
      const digits = toWhatsAppDigits(client.phone);
      if (!digits) {
        setError('This client has no usable phone number on file.');
        return;
      }
      const docUrl = `${window.location.origin}${basePath}/doc/?id=${doc.id}`;
      const message = `Hello ${client.full_name}, here is your document for tracking number ${record.tracking_number}: ${docUrl}`;
      window.open(`https://wa.me/${digits}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      await supabase.from('nb_documents').update({ whatsapp_shared_at: new Date().toISOString() }).eq('id', doc.id);
      await loadDocuments();
    } finally {
      setBusyDocId(null);
    }
  };

  return (
    <div className="nb-admin-card">
      <h2>Documents</h2>

      {error && <div className="nb-admin-error">{error}</div>}

      <button type="button" className="btn btn--primary btn--sm" onClick={handleGenerate} disabled={generating} style={{ marginBottom: 16 }}>
        {generating ? 'Generating…' : 'Generate Document'}
      </button>

      {loadingDocs ? (
        <p className="nb-admin-empty">Loading…</p>
      ) : documents.length === 0 ? (
        <p className="nb-admin-empty">No documents generated yet.</p>
      ) : (
        documents.map((doc) => (
          <div key={doc.id} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
            <p style={{ fontWeight: 600, marginBottom: 8, textTransform: 'capitalize' }}>
              {doc.doc_type.replace('_', ' ')} — {new Date(doc.generated_at).toLocaleString()}
            </p>
            <div className="nb-admin-doc-actions">
              <button type="button" className="is-primary" onClick={() => handleViewPrint(doc)} disabled={busyDocId === doc.id}>
                <i className="fa-solid fa-print" aria-hidden="true"></i> View / Print
              </button>
              <button type="button" onClick={() => handleEmail(doc)} disabled={busyDocId === doc.id}>
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                {doc.emailed_at ? 'Re-send Email' : 'Email to Client'}
              </button>
              <button type="button" onClick={() => handleWhatsApp(doc)} disabled={busyDocId === doc.id}>
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Share on WhatsApp
              </button>
            </div>
            {mailtoFallback?.docId === doc.id && (
              <a
                href={mailtoFallback.url}
                onClick={() => handleMailtoFallbackClick(doc)}
                className="btn btn--outline-dark btn--sm"
                style={{ marginTop: 10, display: 'inline-flex' }}
              >
                <i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i> Open Email Draft
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}
