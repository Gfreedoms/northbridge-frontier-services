export default function AboutCta() {
  return (
    <section className="section nb-aboutpage-cta" style={{ background: 'var(--color-bg)' }}>
      <div className="container nb-aboutpage-cta-copy">
        <h2 className="section-heading">Beyond the Standard Profile?</h2>
        <p>
          If your requirements extend beyond the services described in this profile, contact us to
          discuss them. Additional assignments are considered according to suitability, available
          resources and applicable authorisations.
        </p>
        <a href="#contact" className="btn btn--primary">
          Get in Touch
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    </section>
  );
}
