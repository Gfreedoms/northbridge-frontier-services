'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { SERVICE_TYPES, ID_TYPES, SERVICE_FIELDS, serviceLabel } from '@/lib/services';

const STEPS = ['Service Type', 'Client Details', 'Service Details', 'Review'];

const EMPTY_CLIENT = { full_name: '', id_type: 'national_id', id_number: '', phone: '', email: '', address: '' };

export default function NewRecordPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState('');
  const [client, setClient] = useState(EMPTY_CLIENT);
  const [details, setDetails] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fields = serviceType ? SERVICE_FIELDS[serviceType] : [];

  const canAdvance = () => {
    if (step === 0) return !!serviceType;
    if (step === 1) return client.full_name && client.id_number && client.phone;
    if (step === 2) return fields.every((f) => !f.required || details[f.name]);
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const { data: clientRow, error: clientError } = await supabase
        .from('nb_clients')
        .insert(client)
        .select('id')
        .single();
      if (clientError) throw clientError;

      const { data: recordRow, error: recordError } = await supabase
        .from('nb_service_records')
        .insert({ client_id: clientRow.id, service_type: serviceType, details })
        .select('id')
        .single();
      if (recordError) throw recordError;

      router.push(`/admin/records/view/?id=${recordRow.id}`);
    } catch (err) {
      setError(err.message || 'Something went wrong while saving this record.');
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="nb-admin-page-header">
        <div>
          <h1>New Record</h1>
          <p>Register a client and their service request.</p>
        </div>
      </div>

      <div className="nb-admin-wizard-steps">
        {STEPS.map((label, i) => (
          <div key={label} className={`nb-admin-wizard-step${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}>
            <span className="nb-admin-wizard-step-num">{i < step ? '✓' : i + 1}</span>
            {label}
          </div>
        ))}
      </div>

      {error && <div className="nb-admin-error">{error}</div>}

      <div className="nb-admin-card">
        {step === 0 && (
          <div className="nb-admin-wizard-service-grid">
            {SERVICE_TYPES.map((s) => (
              <button
                key={s.value}
                type="button"
                className={`nb-admin-wizard-service-option${serviceType === s.value ? ' is-selected' : ''}`}
                onClick={() => setServiceType(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="nb-admin-field-row">
              <div className="nb-admin-field">
                <label>Full Name</label>
                <input value={client.full_name} onChange={(e) => setClient({ ...client, full_name: e.target.value })} />
              </div>
              <div className="nb-admin-field">
                <label>Phone</label>
                <input value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
              </div>
            </div>
            <div className="nb-admin-field-row">
              <div className="nb-admin-field">
                <label>ID Type</label>
                <select value={client.id_type} onChange={(e) => setClient({ ...client, id_type: e.target.value })}>
                  {ID_TYPES.map((t) => (
                    <option value={t.value} key={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="nb-admin-field">
                <label>ID Number</label>
                <input value={client.id_number} onChange={(e) => setClient({ ...client, id_number: e.target.value })} />
              </div>
            </div>
            <div className="nb-admin-field-row">
              <div className="nb-admin-field">
                <label>Email (optional)</label>
                <input type="email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
              </div>
              <div className="nb-admin-field">
                <label>Address (optional)</label>
                <input value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {fields.map((f) => (
              <div className="nb-admin-field" key={f.name}>
                <label>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    placeholder={f.placeholder}
                    value={details[f.name] || ''}
                    onChange={(e) => setDetails({ ...details, [f.name]: e.target.value })}
                  />
                ) : (
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={details[f.name] || ''}
                    onChange={(e) => setDetails({ ...details, [f.name]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </>
        )}

        {step === 3 && (
          <dl>
            <div className="nb-admin-review-row">
              <dt>Service Type</dt>
              <dd>{serviceLabel(serviceType)}</dd>
            </div>
            <div className="nb-admin-review-row">
              <dt>Client</dt>
              <dd>{client.full_name}</dd>
            </div>
            <div className="nb-admin-review-row">
              <dt>Phone</dt>
              <dd>{client.phone}</dd>
            </div>
            <div className="nb-admin-review-row">
              <dt>ID</dt>
              <dd>{client.id_type.replace('_', ' ')} — {client.id_number}</dd>
            </div>
            {fields.map((f) => (
              <div className="nb-admin-review-row" key={f.name}>
                <dt>{f.label}</dt>
                <dd>{details[f.name] || '—'}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="nb-admin-wizard-actions">
          <button
            type="button"
            className="btn btn--outline-dark"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn--primary" onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()}>
              Next
            </button>
          ) : (
            <button type="button" className="btn btn--primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Saving…' : 'Create Record'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
