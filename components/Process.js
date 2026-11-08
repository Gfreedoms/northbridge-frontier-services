const STEPS = [
  {
    title: 'Tell Us What You Need',
    desc: 'Contact us with the service required, your general location and preferred start date.',
  },
  {
    title: 'Discuss the Assignment',
    desc: 'We review your requirements and arrange a site assessment or further discussion where appropriate.',
  },
  {
    title: 'Receive a Quotation',
    desc: 'The quotation sets out the proposed service, resources, fees and relevant conditions.',
  },
  {
    title: 'Agree the Service Arrangements',
    desc: 'Before work begins, we confirm the scope, responsibilities, communication and handover procedures.',
  },
];

export default function Process() {
  return (
    <section id="process" className="section nb-process">
      <div className="container">
        <h2 className="section-heading">How It Works</h2>

        <ol className="nb-process-grid">
          {STEPS.map((step, i) => (
            <li className="nb-process-grid-item" key={step.title}>
              <article className="card nb-process-card">
                <span className="nb-process-step-badge" aria-hidden="true">{i + 1}</span>
                <h3 className="nb-process-step-title">{step.title}</h3>
                <p className="nb-process-step-desc">{step.desc}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
