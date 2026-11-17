'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import '../styles/interior-hero.css';
import '../styles/track-page.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorHero from '@/components/InteriorHero';
import { supabase } from '@/lib/supabaseClient';
import { basePath } from '@/lib/basePath';
import { clientStatusLabel, serviceLabel } from '@/lib/services';

const TIMELINE_STEPS = ['pending_assessment', 'proposal_sent', 'agreed', 'active', 'completed'];

const SUMMARY_LABELS = {
  commodity: 'Commodity', quantity: 'Quantity',
  duty_schedule: 'Duty Schedule',
  camera_count: 'Cameras',
  escort_date: 'Escort Date',
  deployment_schedule: 'Deployment Schedule',
};

function TrackPageInner() {
  const searchParams = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('tn') || '');
  const [verifyValue, setVerifyValue] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  useEffect(() => {
    const tn = searchParams.get('tn');
    if (tn) setTrackingNumber(tn);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setNotFound(false);
    setActionNotice('');

    const { data } = await supabase.rpc('nb_track_record', {
      p_tracking_number: trackingNumber.trim(),
      p_verify_value: verifyValue.trim(),
    });

    setLoading(false);
    if (!data) {
      setNotFound(true);
      return;
    }
    setResult(data);
  };

  const handleViewPrint = async () => {
    if (!result?.document_id) return;
    setActionBusy(true);
    setActionNotice('');
    try {
      const { data, error } = await supabase.functions.invoke('nb-doc-link', {
        body: { documentId: result.document_id },
      });
      if (error || !data?.url) throw new Error('link no longer valid');
      window.open(data.url, '_blank', 'noopener,noreferrer');
    } catch {
      setActionNotice("That document's link is no longer valid — please contact our office.");
    } finally {
      setActionBusy(false);
    }
  };

  const handleEmailMe = async () => {
    setActionBusy(true);
    setActionNotice('');
    try {
      const { data, error } = await supabase.functions.invoke('nb-send-tracking-receipt', {
        body: { trackingNumber: trackingNumber.trim(), verifyValue: verifyValue.trim() },
      });
      if (error || data?.error) throw new Error(data?.error || 'failed');
      setActionNotice('Receipt emailed — please check your inbox.');
    } catch {
      setActionNotice('We could not email this receipt. Please contact our office.');
    } finally {
      setActionBusy(false);
    }
  };

  const handleWhatsApp = () => {
    const docUrl = `${window.location.origin}${basePath}/doc/?id=${result.document_id}`;
    const message = `My Northbridge Frontier Services document — tracking number ${result.tracking_number}: ${docUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const currentStepIndex = result ? TIMELINE_STEPS.indexOf(result.status) : -1;

  return (
    <>
      <Header />
      <InteriorHero
        image="/images/control-room-monitoring.jpg"
        breadcrumbCurrent="Track Your Request"
        heading="Track Your Request"
        subheading="Enter your tracking number and your phone number or ID to check status."
      />

      <section className="nb-track-section">
        <div className="container">
          <div className="nb-track-form-card">
            <form onSubmit={handleSubmit}>
              <div className="nb-track-field">
                <label htmlFor="tn">Tracking Number</label>
                <input
                  id="tn"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. NBF-2611-0001"
                  required
                />
              </div>
              <div className="nb-track-field">
                <label htmlFor="verify">Phone Number or ID Number</label>
                <input
                  id="verify"
                  value={verifyValue}
                  onChange={(e) => setVerifyValue(e.target.value)}
                  placeholder="Last 4 digits of your phone, or your exact ID number"
                  required
                />
              </div>
              <button type="submit" className="btn btn--primary nb-track-submit" disabled={loading}>
                {loading ? 'Checking…' : 'Check Status'}
              </button>
            </form>
          </div>

          {notFound && (
            <div className="nb-track-error">
              We couldn&apos;t find a record matching those details. Please double-check your tracking
              number and try again, or contact our office.
            </div>
          )}

          {result && (
            <div className="nb-track-result">
              <div className="nb-track-result-heading">
                <div>
                  <div className="nb-track-result-tracking">{result.tracking_number}</div>
                  <div className="nb-track-result-service">{serviceLabel(result.service_type)}</div>
                </div>
                <span className="nb-track-status-pill">{clientStatusLabel(result.status, result.service_type)}</span>
              </div>

              {result.summary && Object.keys(result.summary).length > 0 && (
                <dl className="nb-track-summary">
                  {Object.entries(result.summary).map(([key, value]) => (
                    <div className="nb-track-summary-row" key={key}>
                      <dt>{SUMMARY_LABELS[key] || key.replace(/_/g, ' ')}</dt>
                      <dd>{value || '—'}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="nb-track-timeline">
                {TIMELINE_STEPS.map((step, i) => (
                  <div key={step} className={`nb-track-timeline-item${i <= currentStepIndex ? ' is-reached' : ''}`}>
                    <span className="nb-track-timeline-dot" />
                    {clientStatusLabel(step, result.service_type)}
                  </div>
                ))}
              </div>

              {actionNotice && <div className="nb-admin-success" style={{ marginBottom: 16 }}>{actionNotice}</div>}

              {result.document_id && (
                <div className="nb-track-actions">
                  <button type="button" className="is-primary" onClick={handleViewPrint} disabled={actionBusy}>
                    <i className="fa-solid fa-print" aria-hidden="true"></i> View / Print
                  </button>
                  <button type="button" onClick={handleEmailMe} disabled={actionBusy}>
                    <i className="fa-solid fa-envelope" aria-hidden="true"></i> Email Me This Receipt
                  </button>
                  <button type="button" onClick={handleWhatsApp} disabled={actionBusy}>
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Share on WhatsApp
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackPageInner />
    </Suspense>
  );
}
