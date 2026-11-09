import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

export default function Promo() {
  return (
    <section className="nb-promo">
      <Image
        src={withBasePath('/images/security-dog-handler.jpg')}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="nb-promo-overlay"></div>
      <div className="container nb-promo-inner">
        <div className="nb-promo-content">
          <h2 className="nb-promo-heading">Northbridge Dog &amp; Patrol Support</h2>
          <p className="nb-promo-text">
            Deterrence and patrol support planned around your property, complementing guarding and CCTV.
          </p>
          <a href="/contact" className="btn btn--primary nb-promo-btn">
            Request a Quotation
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
