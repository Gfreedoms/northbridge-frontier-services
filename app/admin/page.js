'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { serviceLabel, SERVICE_TYPES } from '@/lib/services';

const STATUS_STATS = ['pending_assessment', 'agreed', 'active', 'completed'];
const STATUS_STAT_LABEL = {
  pending_assessment: 'Pending Assessment',
  agreed: 'Agreed',
  active: 'Active',
  completed: 'Completed',
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [byService, setByService] = useState({});
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data: records } = await supabase
        .from('nb_service_records')
        .select('id, tracking_number, service_type, status, created_at, nb_clients(full_name)')
        .order('created_at', { ascending: false })
        .limit(500);

      if (!active || !records) return;

      const statusCounts = {};
      const serviceCounts = {};
      records.forEach((r) => {
        statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
        serviceCounts[r.service_type] = (serviceCounts[r.service_type] || 0) + 1;
      });

      setCounts(statusCounts);
      setByService(serviceCounts);
      setRecent(records.slice(0, 10));
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const maxServiceCount = Math.max(1, ...Object.values(byService));

  return (
    <>
      <div className="nb-admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of all service records.</p>
        </div>
      </div>

      <div className="nb-admin-stats">
        {STATUS_STATS.map((s) => (
          <div className="nb-admin-stat" key={s}>
            <div className="nb-admin-stat-value">{loading ? '—' : counts[s] || 0}</div>
            <div className="nb-admin-stat-label">{STATUS_STAT_LABEL[s]}</div>
          </div>
        ))}
      </div>

      <div className="nb-admin-record-grid">
        <div className="nb-admin-card">
          <h2>Recent Records</h2>
          {loading ? (
            <p className="nb-admin-empty">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="nb-admin-empty">No records yet.</p>
          ) : (
            <div className="nb-admin-table-wrap">
              <table className="nb-admin-table">
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <Link href={`/admin/records/view/?id=${r.id}`}>{r.tracking_number}</Link>
                      </td>
                      <td>{r.nb_clients?.full_name}</td>
                      <td>{serviceLabel(r.service_type)}</td>
                      <td>
                        <span className={`nb-admin-badge nb-admin-badge--${r.status}`}>{r.status.replace('_', ' ')}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="nb-admin-card">
          <h2>Records by Service Type</h2>
          {loading ? (
            <p className="nb-admin-empty">Loading…</p>
          ) : (
            <div className="nb-admin-barchart">
              {SERVICE_TYPES.map((s) => (
                <div className="nb-admin-barchart-row" key={s.value}>
                  <span>{s.label}</span>
                  <div className="nb-admin-barchart-track">
                    <div
                      className="nb-admin-barchart-fill"
                      style={{ width: `${((byService[s.value] || 0) / maxServiceCount) * 100}%` }}
                    />
                  </div>
                  <span>{byService[s.value] || 0}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
