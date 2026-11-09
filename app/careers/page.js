import '../styles/interior-hero.css';
import '../styles/careers-page.css';

import Header from '@/components/Header';
import InteriorHero from '@/components/InteriorHero';
import NoOpenPositions from '@/components/careers/NoOpenPositions';
import SpeculativeCta from '@/components/careers/SpeculativeCta';
import ValuesPointer from '@/components/careers/ValuesPointer';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Careers — Northbridge Frontier Services',
  description: 'Careers at Northbridge Frontier Services — currently no open positions.',
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <InteriorHero
        image="/images/security-team-colleagues.jpg"
        breadcrumbCurrent="Careers"
        heading="Careers at Northbridge"
        subheading="Join a team focused on practical security solutions, attentive service and clear accountability."
      />
      <NoOpenPositions />
      <SpeculativeCta />
      <ValuesPointer />
      <Footer />
    </>
  );
}
