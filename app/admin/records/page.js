'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { SERVICE_TYPES, STATUS_OPTIONS, serviceLabel } from '@/lib/services';

export default function AdminRecordsPage() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  useEffect(() => {
    let active = true;
    supabase
      .from('nb_service_records')
      .select('id, tracking_number, service_type, status, created_at, nb_clients(full_name, phone)')
      .order('created_at', { ascending: false })
      .limit(500)
      .then(({ data }) => {
        if (active) {
          setRecords(data || []);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (serviceFilter && r.service_type !== serviceFilter) return false;
      if (!q) return true;
      return (
        r.tracking_number?.toLowerCase().includes(q) ||
        r.nb_clients?.full_name?.toLowerCase().includes(q) ||
        r.nb_clients?.phone?.toLowerCase().includes(q)
      );
    });
  }, [records, search, statusFilter, serviceFilter]);

  return (
    <>
      <div className="nb-admin-page-header">
        <div>
          <h1>Records</h1>
          <p>{loading ? 'Loading…' : `${filtered.length} of ${records.length} records`}</p>
        </div>
        <Link href="/admin/records/new" className="btn btn--primary btn--sm">
          <i className="fa-solid fa-plus" aria-hidden="true"></i> New Record
        </Link>
      </div>

      <div className="nb-admin-card">
        <div className="nb-admin-filters">
          <input
            type="text"
            placeholder="Search tracking #, client name, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 260 }}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option value={s.value} key={s.value}>{s.label}</option>
            ))}
          </select>
          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
            <option value="">All services</option>
            {SERVICE_TYPES.map((s) => (
              <option value={s.value} key={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="nb-admin-empty">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="nb-admin-empty">No matching records.</p>
        ) : (
          <div className="nb-admin-table-wrap">
            <table className="nb-admin-table">
              <thead>
                <tr>
                  <th>Tracking #</th>
                  <th>Client</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <Link href={`/admin/records/view/?id=${r.id}`}>{r.tracking_number}</Link>
                    </td>
                    <td>{r.nb_clients?.full_name}</td>
                    <td>{r.nb_clients?.phone}</td>
                    <td>{serviceLabel(r.service_type)}</td>
                    <td>
                      <span className={`nb-admin-badge nb-admin-badge--${r.status}`}>{r.status.replace('_', ' ')}</span>
                    </td>
                    <td>{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
