'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICES as SERVICES_DATA, getServiceBySlug } from '@/lib/servicesData';

const CONTACT_EMAIL = 'info@northbridgefrontier.ug'; // placeholder — replace with real address
const MESSAGE_MAX = 600;

const SERVICES = [...SERVICES_DATA.map((s) => s.label), 'Other / not sure yet'];

function SuccessPanel({ onReset }) {
  return (
    <div className="nb-contactpage-success">
      <svg className="nb-contactpage-success-check" viewBox="0 0 52 52" aria-hidden="true">
        <circle className="nb-contactpage-success-check-circle" cx="26" cy="26" r="23" />
        <path className="nb-contactpage-success-check-mark" d="M15 27 L23 34 L38 17" />
      </svg>
      <h3 className="nb-contactpage-success-heading">Your Enquiry Is Ready to Send</h3>
      <p className="nb-contactpage-success-body">
        We&apos;ve opened your email app with your details, addressed to our team. If it didn&apos;t
        open automatically, email us directly at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <button type="button" className="btn btn--outline-dark" onClick={onReset}>
        Send Another Enquiry
      </button>
    </div>
  );
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const prefillSlug = searchParams.get('service');
  const prefillService = prefillSlug ? getServiceBySlug(prefillSlug) : null;

  const [message, setMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Send Enquiry');
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    if (prefillService) setSelectedService(prefillService.label);
  }, [prefillService]);

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
    resetTimerRef.current = setTimeout(() => {
      setButtonLabel('Send Enquiry');
      setSubmitted(true);
    }, 600);

    window.location.href = mailtoUrl;
  };

  const handleReset = () => {
    formRef.current?.reset();
    setMessage('');
    setSelectedService('');
    setSubmitted(false);
  };

  return (
    <section className="section nb-contactpage-form-section" id="contact-form">
      <div className="container">
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Get In Touch</span>
        <h2 className="section-heading">Send Us an Enquiry</h2>

        {submitted ? (
          <SuccessPanel onReset={handleReset} />
        ) : (
          <>
            {prefillService && (
              <p className="nb-contactpage-prefill-note">
                <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                <span>
                  We&apos;ve pre-filled <strong>{prefillService.label}</strong> below — just add
                  your details.
                </span>
              </p>
            )}

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
                  <select
                    id="service"
                    name="service"
                    required
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
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
          </>
        )}
      </div>
    </section>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}
