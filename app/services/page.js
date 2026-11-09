import '../styles/interior-hero.css';
import '../styles/services-hub-page.css';

import Link from 'next/link';
import Header from '@/components/Header';
import InteriorHero from '@/components/InteriorHero';
import Process from '@/components/Process';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import { SERVICES } from '@/lib/servicesData';

export const metadata = {
  title: 'Our Services — Northbridge Frontier Services',
  description:
    'Home and corporate security, CCTV installation, storage of valuable goods, security escorts and security dog services for Uganda.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <InteriorHero
        image="/images/guard-entrance.jpg"
        breadcrumbCurrent="Services"
        heading="Our Services"
        subheading="Security solutions for homes, businesses and valuable assets in Uganda."
      />

      <section className="section">
        <div className="container">
          <div className="nb-serviceshub-intro">
            <span className="eyebrow nb-serviceshub-intro-eyebrow">What We Do</span>
            <h2 className="section-heading">Six Ways We Help Protect What Matters</h2>
            <p>
              We provide security services for households, businesses and organisations across
              Uganda — covering home and corporate security, CCTV camera installation, storage of
              valuable goods, security escorts and security dog services. Each assignment begins
              with understanding your requirements, then agreeing on the service, deployment or
              installation arrangements, responsibilities and communication.
            </p>
          </div>

          <ul className="nb-serviceshub-grid">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="card nb-serviceshub-card">
                  <span className="icon-badge nb-serviceshub-card-icon">
                    <i className={`fa-solid ${service.icon}`} aria-hidden="true"></i>
                  </span>
                  <h3 className="nb-serviceshub-card-title">{service.label}</h3>
                  <p className="nb-serviceshub-card-desc">{service.cardDesc}</p>
                  <span className="nb-serviceshub-card-link">
                    Learn More <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <CtaBanner />
      <Footer />
    </>
  );
}
