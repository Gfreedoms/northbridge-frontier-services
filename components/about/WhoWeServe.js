const CLIENTS = [
  { icon: 'fa-house', label: 'Homeowners' },
  { icon: 'fa-key', label: 'Landlords' },
  { icon: 'fa-building-user', label: 'Property Managers' },
  { icon: 'fa-shop', label: 'Commercial Businesses' },
  { icon: 'fa-warehouse', label: 'Warehouse Operators' },
  { icon: 'fa-landmark', label: 'Institutions' },
  { icon: 'fa-people-group', label: 'Organisations' },
];

export default function WhoWeServe() {
  return (
    <section className="section" id="who-we-serve">
      <div className="container">
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Clients</span>
        <h2 className="section-heading">Who We Serve</h2>
        <p
          style={{
            maxWidth: 'min(100%, 65ch)',
            margin: '0 auto var(--space-4)',
            textAlign: 'center',
            color: 'var(--color-muted)',
          }}
        >
          We welcome enquiries from homeowners, landlords, property managers, commercial businesses,
          warehouse operators, institutions and organisations seeking protection for their premises
          or valuable assets.
        </p>

        <ul className="nb-services-grid nb-aboutpage-clients-grid">
          {CLIENTS.map((client) => (
            <li className="nb-services-grid-item" key={client.label}>
              <span className="nb-services-icon-card">
                <span className="icon-badge nb-services-icon-badge">
                  <i className={`fa-solid ${client.icon}`} aria-hidden="true"></i>
                </span>
                <span className="nb-services-icon-label">{client.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
