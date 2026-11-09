import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

export default function AboutHero() {
  return (
    <section className="nb-aboutpage-hero">
      <Image
        src={withBasePath('/images/hero-kampala-mosque-wide.jpg')}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="nb-aboutpage-hero-overlay"></div>
      <div className="container nb-aboutpage-hero-inner">
        <nav className="nb-aboutpage-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="nb-aboutpage-breadcrumb-sep">/</span>
          <span className="nb-aboutpage-breadcrumb-current">About Us</span>
        </nav>
        <h1 className="nb-aboutpage-hero-heading">About Northbridge Frontier Services</h1>
        <p className="nb-aboutpage-hero-subheading">
          Security solutions for homes, businesses and valuable assets in Uganda.
        </p>
      </div>
    </section>
  );
}
