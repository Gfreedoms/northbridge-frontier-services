'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

const ICON_CARDS = [
  { icon: 'fa-house-chimney', label: 'Home & Residential Security' },
  { icon: 'fa-building-shield', label: 'Corporate & Commercial Security' },
  { icon: 'fa-video', label: 'CCTV Installation' },
  { icon: 'fa-lock', label: 'Storage of Valuables' },
  { icon: 'fa-car-side', label: 'Security Escorts' },
  { icon: 'fa-dog', label: 'Security Dogs' },
];

const PACKAGES = [
  {
    image: '/images/residential-gate.jpg',
    alt: 'Security guard controlling a residential gate',
    title: 'Residential Guarding Plan',
    desc: 'Guarding, gate control, visitor verification and patrols designed around your home or compound.',
    linkA: 'See Residential Security',
    linkB: 'Get a Quote',
  },
  {
    image: '/images/commercial-guard-patrol.jpg',
    alt: 'Security guard patrolling a commercial premises',
    title: 'Corporate Security Package',
    desc: 'Entrance control, visitor registration, vehicle checks and incident reporting for your business premises.',
    linkA: 'See Corporate Security',
    linkB: 'Get a Quote',
  },
  {
    image: '/images/cctv-camera-closeup.jpg',
    alt: 'Close-up of a CCTV security camera',
    title: 'CCTV Installation Package',
    desc: 'Site survey, camera coverage planning, cabling, recorder setup and system testing, handled end to end.',
    linkA: 'See CCTV Installation',
    linkB: 'Get a Quote',
  },
  {
    image: '/images/vault-safe-storage.jpg',
    alt: 'Secure vault for storage of valuables',
    title: 'Valuables Storage Plan',
    desc: 'Agreed custody terms, consignment records and confidential handling for your valuable goods.',
    linkA: 'See Storage Service',
    linkB: 'Get a Quote',
  },
  {
    image: '/images/escort-chauffeur-suv.jpg',
    alt: 'Security escort vehicle with chauffeur',
    title: 'Security Escort Service',
    desc: 'Planned journeys for goods and valuable assets, with agreed collection, timing and handover.',
    linkA: 'See Escort Services',
    linkB: 'Get a Quote',
  },
  {
    image: '/images/security-dog-handler.jpg',
    alt: 'Security dog handler on patrol',
    title: 'Security Dog Deployment',
    desc: 'Dog and handler teams assessed for site suitability, complementing guarding and CCTV.',
    linkA: 'See Dog Services',
    linkB: 'Get a Quote',
  },
];

function getVisibleCount() {
  if (typeof window === 'undefined') return 3;
  const w = window.innerWidth;
  if (w <= 600) return 1;
  if (w <= 992) return 2;
  return 3;
}

export default function Services() {
  const [visible, setVisible] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setVisible(getVisibleCount());
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setVisible(getVisibleCount()), 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pageCount = Math.max(1, Math.ceil(PACKAGES.length / visible));

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  return (
    <section id="services" className="section nb-services">
      <div className="container">
        <h2 className="section-heading">How Can We Help Protect What Matters?</h2>

        <ul className="nb-services-grid">
          {ICON_CARDS.map((item) => (
            <li className="nb-services-grid-item" key={item.label}>
              <a href="#services" className="nb-services-icon-card">
                <span className="icon-badge nb-services-icon-badge">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                </span>
                <span className="nb-services-icon-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nb-services-packages">
          <h2 className="section-heading section-heading--left nb-services-packages-heading">
            Explore Our Security Packages
          </h2>

          <div className="nb-services-carousel">
            <div className="nb-services-carousel-viewport">
              <ul
                className="nb-services-carousel-track"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {PACKAGES.map((pkg) => (
                  <li className="nb-services-carousel-slide" key={pkg.title}>
                    <article className="card nb-services-card">
                      <Image
                        src={withBasePath(pkg.image)}
                        alt={pkg.alt}
                        className="nb-services-card-img"
                        width={800}
                        height={600}
                      />
                      <div className="nb-services-card-body">
                        <h3 className="nb-services-card-title">{pkg.title}</h3>
                        <p className="nb-services-card-desc">{pkg.desc}</p>
                        <ul className="nb-services-card-links">
                          <li>
                            <a href="#contact" className="nb-services-card-link">
                              <i className="fa-solid fa-circle-right" aria-hidden="true"></i>
                              <span>{pkg.linkA}</span>
                            </a>
                          </li>
                          <li>
                            <a href="#contact" className="nb-services-card-link">
                              <i className="fa-solid fa-circle-right" aria-hidden="true"></i>
                              <span>{pkg.linkB}</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nb-services-dots" role="tablist" aria-label="Security package pages">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className="nb-services-dot"
                  role="tab"
                  aria-label={`Show security packages, page ${i + 1} of ${pageCount}`}
                  aria-current={i === currentPage}
                  onClick={() => setCurrentPage(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
