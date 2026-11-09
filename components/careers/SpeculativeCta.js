import Link from 'next/link';

export default function SpeculativeCta() {
  return (
    <section className="section nb-careerspage-cta">
      <div className="container">
        <h2 className="section-heading">Want to Be Considered if Something Opens?</h2>
        <p className="nb-careerspage-cta-body">
          You&apos;re welcome to send your details through our contact form. Start your message with
          &ldquo;Speculative job enquiry&rdquo; so it&apos;s easy to tell apart from a security-service
          request, then pick whichever service area is closest to your interest.
        </p>
        <Link href="/contact" className="btn btn--primary">
          Go to Contact Form
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
    </section>
  );
}
