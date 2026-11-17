import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from '@/lib/contact';

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
            <a href={`tel:${CONTACT_PHONE_TEL}`} className="nb-contactpage-channel-value">
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>

          <div className="nb-contactpage-channel">
            <span className="icon-badge">
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            </span>
            <span className="nb-contactpage-channel-label">Email Us</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="nb-contactpage-channel-value">
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="nb-contactpage-channel">
            <span className="icon-badge">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            </span>
            <span className="nb-contactpage-channel-label">Find Us</span>
            <span className="nb-contactpage-channel-value">
              {CONTACT_ADDRESS}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
