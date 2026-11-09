import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

const VALUES = [
  {
    icon: 'fa-handshake',
    title: 'Integrity',
    desc: 'Integrity guides how we handle our responsibilities.',
  },
  {
    icon: 'fa-binoculars',
    title: 'Vigilance',
    desc: 'Vigilance supports attentive security work.',
    photo: true,
  },
  {
    icon: 'fa-user-shield',
    title: 'Confidentiality',
    desc: 'Confidentiality shapes the handling of client information.',
  },
  {
    icon: 'fa-user-tie',
    title: 'Professionalism',
    desc: 'Professionalism guides our conduct and communication.',
  },
  {
    icon: 'fa-clipboard-check',
    title: 'Accountability',
    desc: 'Accountability guides our conduct and communication.',
  },
];

export default function Values() {
  return (
    <section className="section" style={{ background: 'var(--color-bg)' }} id="values">
      <div className="container">
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Our Values</span>
        <h2 className="section-heading">What Guides Our Work</h2>

        <div className="nb-aboutpage-values-row">
          {VALUES.map((value) => (
            <article
              className={`nb-aboutpage-value-card${value.photo ? ' nb-aboutpage-value-card--photo' : ''}`}
              key={value.title}
            >
              {value.photo && (
                <div className="nb-aboutpage-value-card-bg">
                  <Image
                    src={withBasePath('/images/control-room-monitoring.jpg')}
                    alt=""
                    fill
                    sizes="220px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <span className="icon-badge">
                <i className={`fa-solid ${value.icon}`} aria-hidden="true"></i>
              </span>
              <h3 className="nb-aboutpage-value-title">{value.title}</h3>
              <p className="nb-aboutpage-value-desc">{value.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
