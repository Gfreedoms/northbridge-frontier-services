export default function ContactChannels() {
  return (
    <section className="section" style={{ paddingBottom: 'var(--space-3)' }}>
      <div className="container">
        <div className="nb-contactpage-channels">
          <div className="nb-contactpage-channel">
            <span className="icon-badge">
              <i className="fa-solid fa-phone" aria-hidden="true"></i>
            </span>
            <span className="nb-contactpage-channel-label">Call Us</span>
            {/* placeholder phone — replace with real number */}
            <a href="tel:+256700000000" className="nb-contactpage-channel-value">
              +256 700 000 000
            </a>
          </div>

          <div className="nb-contactpage-channel">
            <span className="icon-badge">
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            </span>
            <span className="nb-contactpage-channel-label">Email Us</span>
            {/* placeholder email — replace with real domain/email */}
            <a href="mailto:info@northbridgefrontier.ug" className="nb-contactpage-channel-value">
              info@northbridgefrontier.ug
            </a>
          </div>

          <div className="nb-contactpage-channel">
            <span className="icon-badge">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            </span>
            <span className="nb-contactpage-channel-label">Find Us</span>
            {/* placeholder address — replace with real HQ address when available */}
            <span className="nb-contactpage-channel-value">
              Northbridge Frontier Services Ltd, Uganda
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
