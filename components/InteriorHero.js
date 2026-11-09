import Image from 'next/image';
import Link from 'next/link';
import { withBasePath } from '@/lib/basePath';

/**
 * Shared hero banner for every interior page (About, Contact, and future
 * pages) — full-bleed photo, dark overlay, breadcrumb, heading, subheading.
 * Extracted from the About page once a second page needed the identical
 * pattern (see docs/contact-page-brief.md).
 */
export default function InteriorHero({ image, alt = '', breadcrumbCurrent, heading, subheading }) {
  return (
    <section className="nb-interior-hero">
      <Image
        src={withBasePath(image)}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="nb-interior-hero-overlay"></div>
      <div className="container nb-interior-hero-inner">
        <nav className="nb-interior-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="nb-interior-breadcrumb-sep">/</span>
          <span className="nb-interior-breadcrumb-current">{breadcrumbCurrent}</span>
        </nav>
        <h1 className="nb-interior-hero-heading">{heading}</h1>
        <p className="nb-interior-hero-subheading">{subheading}</p>
      </div>
    </section>
  );
}
