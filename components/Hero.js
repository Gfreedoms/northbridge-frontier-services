'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

const AUTOPLAY_MS = 6000;

const SLIDES = [
  {
    image: '/images/hero-kampala-aerial-skyline.jpg',
    alt: "Aerial view of Kampala's skyline at dusk",
    heading: 'Protecting What Matters, Uganda-Wide',
    subheading: 'Practical security solutions for homes, businesses and valuable assets.',
    ctaText: 'Explore Our Services',
    ctaHref: '#services',
  },
  {
    image: '/images/cctv-camera-closeup.jpg',
    alt: 'Close-up of a CCTV security camera',
    heading: 'CCTV Installed, Monitored, Supported',
    subheading: 'Site survey, equipment supply, cabling and handover guidance — all in one scope.',
    ctaText: 'Get a Quotation',
    ctaHref: '#contact',
  },
  {
    image: '/images/security-dog-handler.jpg',
    alt: 'Security dog and handler on patrol',
    heading: 'Security Dogs & Patrol Support',
    subheading: 'Dog and handler teams planned around your site, complementing guarding and CCTV.',
    ctaText: 'Learn About Dog Services',
    ctaHref: '#services',
  },
  {
    image: '/images/commercial-guard-patrol.jpg',
    alt: 'Uniformed security guard patrolling a commercial premises',
    heading: 'Corporate & Commercial Security',
    subheading: 'Entrance control, visitor registration, patrols and incident reporting for your premises.',
    ctaText: 'Request a Site Assessment',
    ctaHref: '#contact',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const heroRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
  }, [stop]);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    start();
  };

  return (
    <section
      className="nb-hero"
      id="hero"
      ref={heroRef}
      aria-roledescription="carousel"
      aria-label="Featured Northbridge services"
      onMouseEnter={stop}
      onMouseLeave={start}
      onFocus={stop}
      onBlur={start}
    >
      <div className="nb-hero-track">
        {SLIDES.map((slide, i) => (
          <div
            className={`nb-hero-slide${i === current ? ' is-active' : ''}`}
            data-index={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={i !== current}
            key={slide.heading}
          >
            <Image
              className="nb-hero-img"
              src={withBasePath(slide.image)}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="nb-hero-overlay"></div>
            <div className="container nb-hero-content">
              <h1 className="nb-hero-heading">{slide.heading}</h1>
              <p className="nb-hero-subheading">{slide.subheading}</p>
              <a href={slide.ctaHref} className="btn btn--primary nb-hero-cta">
                {slide.ctaText} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="nb-hero-arrow nb-hero-arrow--prev"
        aria-label="Previous slide"
        onClick={() => { goTo(current - 1); restart(); }}
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button
        type="button"
        className="nb-hero-arrow nb-hero-arrow--next"
        aria-label="Next slide"
        onClick={() => { goTo(current + 1); restart(); }}
      >
        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>

      <div className="nb-hero-dots" role="tablist" aria-label="Choose slide">
        {SLIDES.map((slide, i) => (
          <button
            type="button"
            key={slide.heading}
            className={`nb-hero-dot${i === current ? ' is-active' : ''}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            onClick={() => { goTo(i); restart(); }}
          />
        ))}
      </div>
    </section>
  );
}
