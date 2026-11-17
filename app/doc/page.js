'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import '../styles/track-page.css';
import { supabase } from '@/lib/supabaseClient';

function DocPageInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [status, setStatus] = useState('loading'); // loading | invalid | error

  useEffect(() => {
    if (!id) {
      setStatus('invalid');
      return;
    }
    let active = true;
    supabase.functions
      .invoke('nb-doc-link', { body: { documentId: id } })
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data?.url) {
          setStatus('invalid');
          return;
        }
        window.location.replace(data.url);
      })
      .catch(() => {
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="nb-doc-status">
      {status === 'loading' && (
        <>
          <i className="fa-solid fa-file-circle-check" aria-hidden="true"></i>
          <h1 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Preparing your document…</h1>
          <p style={{ color: 'var(--color-muted)' }}>This will only take a moment.</p>
        </>
      )}
      {(status === 'invalid' || status === 'error') && (
        <>
          <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
          <h1 style={{ fontSize: '1.2rem', marginBottom: 8 }}>This link is no longer valid</h1>
          <p style={{ color: 'var(--color-muted)' }}>
            Please return to the tracking page, or contact our office quoting your tracking number.
          </p>
        </>
      )}
    </div>
  );
}

export default function DocPage() {
  return (
    <Suspense fallback={null}>
      <DocPageInner />
    </Suspense>
  );
}
