import Link from 'next/link';

export default function ValuesPointer() {
  return (
    <section className="section nb-careerspage-values">
      <div className="container">
        <p className="nb-careerspage-values-body">
          Our work is guided by integrity, vigilance, confidentiality, professionalism and
          accountability.{' '}
          <Link href="/about#values" className="nb-careerspage-values-link">
            Read more about our values
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
