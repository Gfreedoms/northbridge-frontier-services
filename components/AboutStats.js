import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

export default function AboutStats() {
  return (
    <section className="nb-about section" id="about">
      <div className="container nb-about-inner">
        <div className="nb-about-media">
          <Image
            src={withBasePath('/images/business-handshake.jpg')}
            alt="Northbridge security representative shaking hands with a client after agreeing a service plan"
            className="nb-about-img"
            width={700}
            height={500}
          />
        </div>

        <div className="nb-about-content">
          <span className="eyebrow nb-about-eyebrow">Who We Are</span>
          <h2 className="nb-about-heading">Protecting Uganda&apos;s Homes &amp; Businesses</h2>
          <p className="nb-about-text">
            Northbridge Frontier Services Ltd provides security services for households, businesses and
            organisations in Uganda — covering home and corporate security, CCTV installation, storage of
            valuable goods, security escorts and security dog services. Every assignment starts with
            understanding your requirements, then agreeing the service, deployment and communication
            needed to support it.
          </p>

          <div className="nb-about-stats">
            <div className="nb-about-stat">
              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              <span>6 Core Security Services</span>
            </div>
            <div className="nb-about-stat">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <span>Uganda-Wide Coverage</span>
            </div>
          </div>

          <a href="/about" className="btn btn--primary nb-about-btn">
            Explore Who We Are
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
