export default function Footer() {
  return (
    <footer className="nb-footer">
      <div className="container">
        <div className="nb-footer-grid">
          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Residential</h3>
            <ul className="nb-footer-links">
              <li><a href="#services" className="nb-footer-link">Home &amp; Residential Security</a></li>
              <li><a href="#services" className="nb-footer-link">Storage of Valuable Goods</a></li>
            </ul>
          </div>

          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Corporate</h3>
            <ul className="nb-footer-links">
              <li><a href="#services" className="nb-footer-link">Corporate &amp; Commercial Security</a></li>
              <li><a href="#services" className="nb-footer-link">CCTV Camera Installation</a></li>
            </ul>
          </div>

          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Specialist</h3>
            <ul className="nb-footer-links">
              <li><a href="#services" className="nb-footer-link">Security Escorts</a></li>
              <li><a href="#services" className="nb-footer-link">Security Dogs</a></li>
            </ul>
          </div>

          <div className="nb-footer-col">
            <h3 className="nb-footer-col-title">Company</h3>
            <ul className="nb-footer-links">
              <li><a href="#about" className="nb-footer-link">Who We Are</a></li>
              <li><a href="#about" className="nb-footer-link">Mission &amp; Vision</a></li>
              <li><a href="#about" className="nb-footer-link">Our Values</a></li>
              {/* stub: careers page not yet built, phase 2 */}
              <li><a href="#" className="nb-footer-link">Careers</a></li>
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

          <ul className="nb-footer-social">
            <li>
              <a href="#" className="nb-footer-social-link" aria-label="Northbridge on Facebook">
                <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#" className="nb-footer-social-link" aria-label="Northbridge on X">
                <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#" className="nb-footer-social-link" aria-label="Northbridge on LinkedIn">
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#" className="nb-footer-social-link" aria-label="Northbridge on Instagram">
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
