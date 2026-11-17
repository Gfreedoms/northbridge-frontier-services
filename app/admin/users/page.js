'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ROLES = [
  { value: 'staff', label: 'Staff' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

function NewUserModal({ onClose, onCreated }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('staff');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { data, error: fnError } = await supabase.functions.invoke('nb-admin-users', {
        body: { action: 'create', full_name: fullName, email, role },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setTempPassword(data.temp_password);
      onCreated();
    } catch (err) {
      setError(err.message || 'Could not create this account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="nb-admin-modal-backdrop">
      <div className="nb-admin-modal">
        <h2 style={{ marginBottom: 16 }}>{tempPassword ? 'Account Created' : 'New Staff Account'}</h2>

        {error && <div className="nb-admin-error">{error}</div>}

        {tempPassword ? (
          <>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
              Share this temporary password with {fullName} now — it will not be shown again.
            </p>
            <div className="nb-admin-temp-password">{tempPassword}</div>
            <button type="button" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
              Done — I&apos;ve copied it
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="nb-admin-field">
              <label>Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="nb-admin-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="nb-admin-field">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {ROLES.map((r) => (
                  <option value={r.value} key={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button type="button" className="btn btn--outline-dark" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary" disabled={submitting} style={{ flex: 1, justifyContent: 'center' }}>
                {submitting ? 'Creating…' : 'Create'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [myRole, setMyRole] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [notice, setNotice] = useState('');

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: me } = await supabase.from('nb_profiles').select('role').eq('id', user.id).single();
    setMyRole(me?.role || null);

    const { data } = await supabase.from('nb_profiles').select('*').order('created_at', { ascending: true });
    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleResetPassword = async (u) => {
    setBusyId(u.id);
    setNotice('');
    const { data, error } = await supabase.functions.invoke('nb-admin-users', {
      body: { action: 'reset_password', userId: u.id },
    });
    setBusyId(null);
    if (error || data?.error) {
      setNotice(`Could not reset password for ${u.full_name}.`);
      return;
    }
    setNotice(`New temporary password for ${u.full_name}: ${data.temp_password}`);
  };

  const handleDelete = async (u) => {
    setBusyId(u.id);
    setNotice('');
    const { data, error } = await supabase.functions.invoke('nb-admin-users', {
      body: { action: 'delete', userId: u.id },
    });
    setBusyId(null);
    if (error || data?.error) {
      setNotice(data?.error || `Could not remove ${u.full_name}.`);
      return;
    }
    await load();
  };

  if (myRole === undefined || loading) return <p className="nb-admin-empty">Loading…</p>;

  if (myRole !== 'super_admin') {
    return <p className="nb-admin-empty">Only a Super Admin can manage staff accounts.</p>;
  }

  return (
    <>
      <div className="nb-admin-page-header">
        <div>
          <h1>Team</h1>
          <p>Staff accounts with access to the admin panel.</p>
        </div>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus" aria-hidden="true"></i> New User
        </button>
      </div>

      {notice && <div className="nb-admin-success">{notice}</div>}

      <div className="nb-admin-card">
        <div className="nb-admin-table-wrap">
          <table className="nb-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.full_name}</td>
                  <td>{u.email}</td>
                  <td><span className="nb-admin-badge">{u.role.replace('_', ' ')}</span></td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button type="button" className="btn btn--outline-dark btn--sm" disabled={busyId === u.id} onClick={() => handleResetPassword(u)}>
                      Reset Password
                    </button>
                    <button type="button" className="btn btn--outline-dark btn--sm" disabled={busyId === u.id} onClick={() => handleDelete(u)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <NewUserModal
          onClose={() => {
            setShowModal(false);
            load();
          }}
          onCreated={load}
        />
      )}
    </>
  );
}
