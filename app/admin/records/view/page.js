'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { STATUS_OPTIONS, serviceLabel } from '@/lib/services';
import DocumentActions from '@/components/admin/DocumentActions';

function RecordViewInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [record, setRecord] = useState(null);
  const [client, setClient] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const load = async () => {
    if (!id) return;
    const { data: recordRow } = await supabase.from('nb_service_records').select('*').eq('id', id).single();
    if (!recordRow) {
      setLoading(false);
      return;
    }
    const { data: clientRow } = await supabase.from('nb_clients').select('*').eq('id', recordRow.client_id).single();
    const { data: historyRows } = await supabase
      .from('nb_status_history')
      .select('*')
      .eq('service_record_id', id)
      .order('changed_at', { ascending: false });

    setRecord(recordRow);
    setClient(clientRow);
    setHistory(historyRows || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdatingStatus(true);
    await supabase.from('nb_service_records').update({ status: newStatus }).eq('id', id);
    await load();
    setUpdatingStatus(false);
  };

  if (loading) return <p className="nb-admin-empty">Loading…</p>;
  if (!record || !client) return <p className="nb-admin-empty">Record not found.</p>;

  const d = record.details || {};

  return (
    <>
      <div className="nb-admin-page-header">
        <div>
          <h1>{record.tracking_number}</h1>
          <p>{serviceLabel(record.service_type)} · Registered {new Date(record.created_at).toLocaleDateString()}</p>
        </div>
        <div className="nb-admin-field" style={{ marginBottom: 0, minWidth: 220 }}>
          <label htmlFor="status">Status</label>
          <select id="status" value={record.status} onChange={handleStatusChange} disabled={updatingStatus}>
            {STATUS_OPTIONS.map((s) => (
              <option value={s.value} key={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="nb-admin-record-grid">
        <div>
          <div className="nb-admin-card">
            <h2>Client</h2>
            <div className="nb-admin-review-row"><dt>Full Name</dt><dd>{client.full_name}</dd></div>
            <div className="nb-admin-review-row"><dt>Phone</dt><dd>{client.phone}</dd></div>
            <div className="nb-admin-review-row"><dt>ID</dt><dd>{client.id_type.replace('_', ' ')} — {client.id_number}</dd></div>
            {client.email && <div className="nb-admin-review-row"><dt>Email</dt><dd>{client.email}</dd></div>}
            {client.address && <div className="nb-admin-review-row"><dt>Address</dt><dd>{client.address}</dd></div>}
          </div>

          <div className="nb-admin-card">
            <h2>Service Particulars</h2>
            {Object.keys(d).length === 0 ? (
              <p className="nb-admin-empty">No details on file.</p>
            ) : (
              Object.entries(d).map(([key, value]) => (
                <div className="nb-admin-review-row" key={key}>
                  <dt>{key.replace(/_/g, ' ')}</dt>
                  <dd>{value || '—'}</dd>
                </div>
              ))
            )}
          </div>

          <DocumentActions record={record} client={client} />
        </div>

        <div className="nb-admin-card">
          <h2>Status History</h2>
          {history.length === 0 ? (
            <p className="nb-admin-empty">No history yet.</p>
          ) : (
            <div className="nb-admin-timeline">
              {history.map((h) => (
                <div className="nb-admin-timeline-item" key={h.id}>
                  <span className="nb-admin-timeline-dot" />
                  <div>
                    <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{h.status.replace('_', ' ')}</div>
                    <div className="nb-admin-timeline-meta">{new Date(h.changed_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function RecordViewPage() {
  return (
    <Suspense fallback={<p className="nb-admin-empty">Loading…</p>}>
      <RecordViewInner />
    </Suspense>
  );
}
