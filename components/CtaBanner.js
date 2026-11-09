import Image from 'next/image';
import Link from 'next/link';
import { withBasePath } from '@/lib/basePath';

export default function CtaBanner() {
  return (
    <section className="nb-cta">
      <Image
        src={withBasePath('/images/office-building-glass.jpg')}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="nb-cta-overlay"></div>
      <div className="container nb-cta-inner">
        <div className="nb-cta-content">
          <h2 className="nb-cta-heading">Security Planned Around Your Site</h2>
          <p className="nb-cta-text">
            A site assessment identifies the areas requiring attention and the right arrangement. The
            agreed plan sets out duty locations, service hours, reporting lines and escalation contacts
            — combining guarding with CCTV and security dogs where appropriate.
          </p>
          <Link href="/contact" className="btn btn--primary nb-cta-btn">
            Request a Site Assessment
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="nb-cta-graphic">
          <div className="nb-cta-circle">
            <i className="fa-solid fa-magnifying-glass-location" aria-hidden="true"></i>
            <span className="nb-cta-circle-label">For a Tailored Security Plan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
