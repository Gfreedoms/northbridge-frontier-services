import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CtaBanner from '@/components/CtaBanner';
import AboutStats from '@/components/AboutStats';
import Promo from '@/components/Promo';
import Process from '@/components/Process';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <CtaBanner />
      <AboutStats />
      <Promo />
      <Process />
      <Footer />
    </>
  );
}
