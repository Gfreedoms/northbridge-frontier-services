'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const MEGA_SERVICES = [
  {
    icon: 'fa-house-chimney',
    title: 'Home & Residential Security',
    desc: 'Guarding, gate control and visitor verification for your home.',
  },
  {
    icon: 'fa-building-shield',
    title: 'Corporate & Commercial Security',
    desc: 'Entrance control, patrols and incident reporting for your business.',
  },
  {
    icon: 'fa-video',
    title: 'CCTV Installation',
    desc: 'Site survey, equipment supply and system testing end to end.',
  },
  {
    icon: 'fa-lock',
    title: 'Storage of Valuables',
    desc: 'Agreed custody terms and confidential handling for valuable goods.',
  },
  {
    icon: 'fa-car-side',
    title: 'Security Escorts',
    desc: 'Planned journeys for goods and valuable assets.',
  },
  {
    icon: 'fa-dog',
    title: 'Security Dogs',
    desc: 'Dog and handler teams for deterrence and patrol support.',
  },
];

const CATEGORY_LINKS = [
  { icon: 'fa-house', label: 'Home Security' },
  { icon: 'fa-building-shield', label: 'Corporate Security' },
  { icon: 'fa-video', label: 'CCTV Installation' },
  { icon: 'fa-route', label: 'Storage & Escorts' },
  { icon: 'fa-dog', label: 'Security Dogs' },
];

const MOBILE_SERVICES = [
  { icon: 'fa-house-chimney', label: 'Home & Residential Security' },
  { icon: 'fa-building-shield', label: 'Corporate & Commercial Security' },
  { icon: 'fa-video', label: 'CCTV Installation' },
  { icon: 'fa-lock', label: 'Storage of Valuables' },
  { icon: 'fa-car-side', label: 'Security Escorts' },
  { icon: 'fa-dog', label: 'Security Dogs' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const megaWrapperRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (megaWrapperRef.current && !megaWrapperRef.current.contains(e.target)) {
        setIsMegaOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMegaOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && isMobileNavOpen) setIsMobileNavOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobileNavOpen]);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <header className={`nb-header${isScrolled ? ' is-scrolled' : ''}`} id="nb-header">
      {/* Utility bar */}
      <div className="nb-header-utility">
        <div className="container nb-header-utility-inner">
          <Link href="/" className="nb-header-logo" aria-label="Northbridge Frontier Services — Home">
            <span className="nb-header-logo-main">NORTHBRIDGE</span>
            <span className="nb-header-logo-sub">FRONTIER SERVICES</span>
          </Link>

          <nav className="nb-header-nav" aria-label="Primary">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li className="nb-header-has-mega" ref={megaWrapperRef}>
                <button
                  type="button"
                  className="nb-header-mega-trigger"
                  aria-expanded={isMegaOpen}
                  aria-controls="nb-header-mega"
                  onClick={() => setIsMegaOpen((v) => !v)}
                >
                  Services <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div
                  className={`nb-header-mega${isMegaOpen ? ' is-open' : ''}`}
                  id="nb-header-mega"
                  onMouseLeave={() => setIsMegaOpen(false)}
                >
                  <div className="nb-header-mega-grid">
                    {MEGA_SERVICES.map((item) => (
                      <Link href="/#services" className="nb-header-mega-item" key={item.title}>
                        <span className="icon-badge nb-header-mega-icon">
                          <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                        </span>
                        <span className="nb-header-mega-text">
                          <span className="nb-header-mega-title">{item.title}</span>
                          <span className="nb-header-mega-desc">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="nb-header-actions">
            <Link href="/contact" className="btn btn--dark btn--sm nb-header-callback">Request a Callback</Link>
            <button type="button" className="nb-header-icon-btn nb-header-search" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="nb-header-icon-btn nb-header-toggle"
              aria-label="Open navigation menu"
              aria-controls="nb-header-mobile-nav"
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((v) => !v)}
            >
              <i className={`fa-solid ${isMobileNavOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Red category band */}
      <div className="nb-header-category">
        <div className="container nb-header-category-inner">
          <ul className="nb-header-category-links">
            {CATEGORY_LINKS.map((item) => (
              <li key={item.label}>
                <Link href="/#services">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="nb-header-category-actions">
            <a href="#" className="btn btn--outline btn--sm nb-header-portal-btn">Client Portal</a>
            <Link href="/contact" className="btn btn--sm nb-header-quote-btn">Get a Quote</Link>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <nav
        id="nb-header-mobile-nav"
        className={`nb-header-mobile-nav${isMobileNavOpen ? ' is-open' : ''}`}
        aria-label="Mobile"
      >
        <ul>
          <li><Link href="/" onClick={closeMobileNav}><i className="fa-solid fa-house" aria-hidden="true"></i>Home</Link></li>
          <li className={`nb-header-mobile-accordion${isMobileServicesOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="nb-header-mobile-accordion-trigger"
              aria-expanded={isMobileServicesOpen}
              aria-controls="nb-header-mobile-services"
              onClick={() => setIsMobileServicesOpen((v) => !v)}
            >
              <span><i className="fa-solid fa-shield-halved" aria-hidden="true"></i>Services</span>
              <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </button>
            <div className="nb-header-mobile-submenu" id="nb-header-mobile-services">
              <ul className="nb-header-mobile-submenu-list">
                {MOBILE_SERVICES.map((item) => (
                  <li key={item.label}>
                    <Link href="/#services" onClick={closeMobileNav}>
                      <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li><Link href="/about" onClick={closeMobileNav}><i className="fa-solid fa-circle-info" aria-hidden="true"></i>About Us</Link></li>
          <li><Link href="/careers" onClick={closeMobileNav}><i className="fa-solid fa-briefcase" aria-hidden="true"></i>Careers</Link></li>
          <li><Link href="/contact" onClick={closeMobileNav}><i className="fa-solid fa-envelope" aria-hidden="true"></i>Contact</Link></li>
        </ul>
        <Link href="/contact" className="btn btn--primary nb-header-mobile-cta" onClick={closeMobileNav}>Request a Callback</Link>
      </nav>
    </header>
  );
}
