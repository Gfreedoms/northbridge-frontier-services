'use client';

import { useRef, useState } from 'react';

const CONTACT_EMAIL = 'info@northbridgefrontier.ug'; // placeholder — replace with real address
const MESSAGE_MAX = 600;

const SERVICES = [
  'Home & Residential Security',
  'Corporate & Commercial Security',
  'CCTV Installation',
  'Storage of Valuables',
  'Security Escorts',
  'Security Dogs',
  'Other / not sure yet',
];

export default function ContactForm() {
  const [message, setMessage] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Send Enquiry');
  const formRef = useRef(null);
  const resetTimerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const service = data.get('service');
    const location = data.get('location');
    const startDate = data.get('startDate');
    const msg = data.get('message');

    const subject = `Enquiry from ${name} — ${service}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Service needed: ${service}`,
      `General location: ${location}`,
      startDate ? `Preferred start date: ${startDate}` : null,
      '',
      msg || '(no additional message)',
    ].filter(Boolean);

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    setButtonLabel('Opening your email app…');
    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setButtonLabel('Send Enquiry'), 2000);

    window.location.href = mailtoUrl;
  };

  return (
    <section className="section nb-contactpage-form-section" id="contact-form">
      <div className="container">
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Get In Touch</span>
        <h2 className="section-heading">Send Us an Enquiry</h2>

        <form className="nb-contactpage-form" ref={formRef} onSubmit={handleSubmit} noValidate={false}>
          <div className="nb-contactpage-field-row">
            <div className="nb-contactpage-field">
              <label htmlFor="name">Full name <span className="nb-contactpage-required">*</span></label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="nb-contactpage-field">
              <label htmlFor="email">Email <span className="nb-contactpage-required">*</span></label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>

          <div className="nb-contactpage-field-row">
            <div className="nb-contactpage-field">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="nb-contactpage-field">
              <label htmlFor="service">Service needed <span className="nb-contactpage-required">*</span></label>
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled>Select a service</option>
                {SERVICES.map((s) => (
                  <option value={s} key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="nb-contactpage-field-row">
            <div className="nb-contactpage-field">
              <label htmlFor="location">General location <span className="nb-contactpage-required">*</span></label>
              <input type="text" id="location" name="location" placeholder="e.g. Kampala, Nakawa" required />
            </div>
            <div className="nb-contactpage-field">
              <label htmlFor="startDate">Preferred start date</label>
              <input type="date" id="startDate" name="startDate" />
            </div>
          </div>

          <div className="nb-contactpage-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              maxLength={MESSAGE_MAX}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Anything else that would help us understand what you need"
            />
            <span className="nb-contactpage-char-count">{message.length} / {MESSAGE_MAX}</span>
          </div>

          <div className="nb-contactpage-submit-row">
            <button type="submit" className="btn btn--primary">
              {buttonLabel}
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
            <span className="nb-contactpage-submit-helper">
              This opens your email app with the details above, addressed to our team.
            </span>
            <span className="nb-contactpage-submit-fallback">
              If nothing opens, email us directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
