import '../styles/about-page.css';

import Header from '@/components/Header';
import AboutHero from '@/components/about/AboutHero';
import AboutIntro from '@/components/about/AboutIntro';
import MissionVision from '@/components/about/MissionVision';
import Values from '@/components/about/Values';
import WhoWeServe from '@/components/about/WhoWeServe';
import AboutCta from '@/components/about/AboutCta';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us — Northbridge Frontier Services',
  description:
    'Northbridge Frontier Services Ltd — our mission, vision, values, and who we serve across Uganda.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutHero />
      <AboutIntro />
      <MissionVision />
      <Values />
      <WhoWeServe />
      <AboutCta />
      <Footer />
    </>
  );
}
