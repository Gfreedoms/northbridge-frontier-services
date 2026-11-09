import { notFound } from 'next/navigation';

import '../../styles/interior-hero.css';
import '../../styles/service-detail-page.css';
import '../../styles/services.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceDetail from '@/components/services/ServiceDetail';
import { SERVICES, getServiceBySlug } from '@/lib/servicesData';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.label} — Northbridge Frontier Services`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <ServiceDetail service={service} />
      <Footer />
    </>
  );
}
