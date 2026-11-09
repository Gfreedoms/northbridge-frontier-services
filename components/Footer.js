import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="nb-footer">
      <div className="container">
        <div className="nb-footer-grid">
          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Residential</h3>
            <ul className="nb-footer-links">
              <li><Link href="/services/home-residential-security" className="nb-footer-link">Home &amp; Residential Security</Link></li>
              <li><Link href="/services/storage-of-valuables" className="nb-footer-link">Storage of Valuable Goods</Link></li>
            </ul>
          </div>

          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Corporate</h3>
            <ul className="nb-footer-links">
              <li><Link href="/services/corporate-commercial-security" className="nb-footer-link">Corporate &amp; Commercial Security</Link></li>
              <li><Link href="/services/cctv-installation" className="nb-footer-link">CCTV Camera Installation</Link></li>
            </ul>
          </div>

          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Specialist</h3>
            <ul className="nb-footer-links">
              <li><Link href="/services/security-escorts" className="nb-footer-link">Security Escorts</Link></li>
              <li><Link href="/services/security-dogs" className="nb-footer-link">Security Dogs</Link></li>
            </ul>
          </div>

          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Company</h3>
            <ul className="nb-footer-links">
              <li><Link href="/about#who-we-are" className="nb-footer-link">Who We Are</Link></li>
              <li><Link href="/about#mission" className="nb-footer-link">Mission &amp; Vision</Link></li>
              <li><Link href="/about#values" className="nb-footer-link">Our Values</Link></li>
              <li><Link href="/services" className="nb-footer-link">All Services</Link></li>
              <li><Link href="/careers" className="nb-footer-link">Careers</Link></li>
            </ul>
          </div>

          <div className="nb-footer-col nb-footer-col--contact">
            <h3 className="nb-footer-col-title">Contact</h3>
            <ul className="nb-footer-contact-list">
              <li className="nb-footer-contact-item">
                <i className="fa-solid fa-location-dot nb-footer-contact-icon" aria-hidden="true"></i>
                {/* placeholder address — replace with real HQ address when available */}
                <span>Northbridge Frontier Services Ltd, Uganda</span>
              </li>
              <li className="nb-footer-contact-item">
                <i className="fa-solid fa-phone nb-footer-contact-icon" aria-hidden="true"></i>
                {/* placeholder phone — replace with real number */}
                <span>+256 700 000 000</span>
              </li>
              <li className="nb-footer-contact-item">
                <i className="fa-solid fa-envelope nb-footer-contact-icon" aria-hidden="true"></i>
                {/* placeholder email — replace with real domain/email */}
                <span>info@northbridgefrontier.ug</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="nb-footer-divider" />

        <div className="nb-footer-bottom">
          <p className="nb-footer-copyright">&copy; 2026 Northbridge Frontier Services Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
