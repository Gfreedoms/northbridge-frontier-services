import Link from 'next/link';
import InteriorHero from '@/components/InteriorHero';
import { SERVICES } from '@/lib/servicesData';

export default function ServiceDetail({ service }) {
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <InteriorHero
        image={service.heroImage}
        alt={service.heroAlt}
        breadcrumbCurrent={service.label}
        heading={service.label}
        subheading={service.tagline}
      />

      <section className="section">
        <div className="container nb-servicedetail-overview">
          <div className="nb-servicedetail-overview-copy">
            <span className="eyebrow">What&apos;s Included</span>
            <h2 className="section-heading section-heading--left">{service.label}</h2>
            <ul className="nb-servicedetail-bullets">
              {service.bullets.map((bullet) => (
                <li key={bullet}>
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="nb-servicedetail-aside">
            {service.suitedFor && (
              <div className="nb-servicedetail-suited">
                <p className="nb-servicedetail-suited-title">Suited For</p>
                <ul className="nb-servicedetail-suited-list">
                  {service.suitedFor.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-check" aria-hidden="true"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.confidentialNote && (
              <div className="nb-servicedetail-callout">
                <i className="fa-solid fa-user-shield" aria-hidden="true"></i>
                <p>{service.confidentialNote}</p>
              </div>
            )}

            {service.note && (
              <div className="nb-servicedetail-callout">
                <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
                <p>{service.note}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section nb-servicedetail-request">
        <div className="container">
          <h2 className="section-heading nb-servicedetail-request-heading">
            Request {service.label}
          </h2>
          <p className="nb-servicedetail-request-copy">
            Go to the contact form and we&apos;ll pre-fill this service for you — just add your
            details, general location and preferred start date.
          </p>
          <Link href={`/contact?service=${service.slug}`} className="btn btn--primary">
            Request This Service
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <p className="nb-servicedetail-cross-caption">
            Many clients combine services — for example residential guarding with CCTV, or
            business access control with surveillance and security dogs.
          </p>
          <h2 className="section-heading">Explore Other Services</h2>
          <ul className="nb-services-grid nb-servicedetail-cross-grid">
            {otherServices.map((item) => (
              <li className="nb-services-grid-item" key={item.slug}>
                <Link href={`/services/${item.slug}`} className="nb-services-icon-card">
                  <span className="icon-badge nb-services-icon-badge">
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                  </span>
                  <span className="nb-services-icon-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
