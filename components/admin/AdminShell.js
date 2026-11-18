'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-gauge', exact: true },
  { href: '/admin/records', label: 'Records', icon: 'fa-folder-open' },
  { href: '/admin/records/new', label: 'New Record', icon: 'fa-plus' },
  { href: '/admin/users', label: 'Team', icon: 'fa-users', superAdminOnly: true },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState(undefined); // undefined = loading
  const [profile, setProfile] = useState(null);

  const isLoginPage = pathname?.startsWith('/admin/login');

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!active) return;
      setSession(newSession);
    });

    return () => {
      active = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session === undefined) return;

    if (!session && !isLoginPage) {
      router.replace('/admin/login/');
      return;
    }
    if (session && isLoginPage) {
      router.replace('/admin/');
    }
  }, [session, isLoginPage, router]);

  useEffect(() => {
    if (!session?.user?.id) {
      setProfile(null);
      return;
    }
    let active = true;
    supabase
      .from('nb_profiles')
      .select('id, full_name, role, email')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        if (data) {
          setProfile(data);
          return;
        }
        // A session exists but there's no matching nb_profiles row — this
        // account isn't Northbridge staff (e.g. a stray session left behind
        // by a sister app sharing this Supabase project/origin). Sign out
        // instead of hanging on "Loading" forever.
        supabase.auth.signOut().then(() => {
          if (active) setSession(null);
        });
      });
    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  if (isLoginPage) return children;

  if (session === undefined || (session && !profile)) {
    return (
      <div className="nb-admin-shell" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-muted)' }}>Loading…</p>
      </div>
    );
  }

  if (!session) return null; // redirect effect above is already in flight

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/admin/login/');
  };

  return (
    <div className="nb-admin-shell">
      <aside className="nb-admin-sidebar">
        <div className="nb-admin-sidebar-brand">
          NORTHBRIDGE
          <small>Records &amp; Tracking</small>
        </div>
        <nav className="nb-admin-nav">
          {NAV_ITEMS.filter((item) => !item.superAdminOnly || profile?.role === 'super_admin').map((item) => {
            const isActive = item.exact ? pathname === item.href || pathname === `${item.href}/` : pathname?.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={isActive ? 'is-active' : ''}>
                <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="nb-admin-main">
        <header className="nb-admin-topbar">
          <div />
          <div className="nb-admin-topbar-user">
            <span>{profile?.full_name}</span>
            <span className="nb-admin-topbar-role">{profile?.role?.replace('_', ' ')}</span>
            <button type="button" className="nb-admin-logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </header>
        <main className="nb-admin-content">{children}</main>
      </div>
    </div>
  );
}
