import '../styles/interior-hero.css';
import '../styles/contact-page.css';

import Header from '@/components/Header';
import InteriorHero from '@/components/InteriorHero';
import ContactChannels from '@/components/contact/ContactChannels';
import ContactForm from '@/components/contact/ContactForm';
import ContactClosingNote from '@/components/contact/ContactClosingNote';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us — Northbridge Frontier Services',
  description:
    'Get in touch with Northbridge Frontier Services — call, email, or send an enquiry about home security, corporate security, CCTV, storage, escorts or security dogs.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <InteriorHero
        image="/images/security-gatehouse-entrance.jpg"
        breadcrumbCurrent="Contact"
        heading="Contact Us"
        subheading="Tell us what you need — service required, general location, and preferred start date."
      />
      <ContactChannels />
      <ContactForm />
      <ContactClosingNote />
      <Footer />
    </>
  );
}
