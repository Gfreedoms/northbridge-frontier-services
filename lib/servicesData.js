/**
 * Single source of truth for the 6 core services. Content traced to
 * ../docs/features.md (itself extracted from the company profile) —
 * nothing here is invented. Consumed by Header, Services.js (home page),
 * ContactForm, the Services hub page, and the service detail template so
 * every link, label and dropdown option stays in sync.
 */

export const SERVICES = [
  {
    slug: 'home-residential-security',
    label: 'Home & Residential Security',
    shortLabel: 'Home Security',
    icon: 'fa-house-chimney',
    heroImage: '/images/residential-gate.jpg',
    heroAlt: 'Security guard controlling a residential gate',
    tagline: 'Guarding, gate control and visitor verification for your home or compound.',
    cardDesc: 'Guarding, gate control, visitor verification and patrols within agreed areas.',
    bullets: [
      'Guarding, gate control, visitor verification and patrols within agreed areas.',
      'Helps residents manage access and identify suspicious activity.',
      'For apartments and compounds: coordination with property managers for resident access, deliveries, visitors and vehicle movement.',
      'Site instructions define what personnel monitor, record and report.',
    ],
    suitedFor: ['Private homes', 'Apartment buildings', 'Residential compounds', 'Managed estates'],
  },
  {
    slug: 'corporate-commercial-security',
    label: 'Corporate & Commercial Security',
    shortLabel: 'Corporate Security',
    icon: 'fa-building-shield',
    heroImage: '/images/commercial-guard-patrol.jpg',
    heroAlt: 'Security guard patrolling a commercial premises',
    tagline: 'Entrance control, patrols and incident reporting for your business premises.',
    cardDesc: 'Entrance and exit control, visitor registration, vehicle checks and incident reporting.',
    bullets: [
      'Security arrangements for workplaces, commercial buildings and operational premises.',
      'Duties agreed around the nature of the business, property layout and movement of staff, customers, suppliers and goods.',
      'Entrance and exit control, visitor registration, vehicle checks, patrols, loading-area monitoring and incident reporting.',
      'Property movement checks carried out per agreed client procedures.',
    ],
    suitedFor: ['Offices', 'Shops', 'Warehouses', 'Commercial compounds', 'Institutional premises'],
  },
  {
    slug: 'cctv-installation',
    label: 'CCTV Installation',
    shortLabel: 'CCTV Installation',
    icon: 'fa-video',
    heroImage: '/images/cctv-camera-closeup.jpg',
    heroAlt: 'Close-up of a CCTV security camera',
    tagline: 'Site survey, equipment supply and system testing, handled end to end.',
    cardDesc: 'Site survey, camera coverage planning, equipment supply, cabling and system testing.',
    bullets: [
      'Improves visibility across entrances, compounds, work areas and other agreed locations.',
      'Camera placement and specifications selected around your property and monitoring requirements.',
      'Can include site survey, camera coverage planning, equipment supply, cabling, recorder setup and system testing.',
      'Options include recording capacity, night viewing, remote access and backup power.',
      'Handover includes guidance on viewing and recording functions; maintenance and technical support can be included in scope.',
    ],
    note: 'Remote viewing depends on compatible equipment and connectivity.',
    suitedFor: null,
  },
  {
    slug: 'storage-of-valuables',
    label: 'Storage of Valuables',
    shortLabel: 'Storage of Valuables',
    icon: 'fa-lock',
    heroImage: '/images/vault-safe-storage.jpg',
    heroAlt: 'Secure vault for storage of valuables',
    tagline: 'Agreed custody terms and confidential handling for valuable goods.',
    cardDesc: 'Agreed custody terms, consignment records and confidential handling for valuable goods.',
    bullets: [
      'Storage under agreed custody terms for accepted valuable goods.',
      'Pre-acceptance discussion covers the nature of goods, declared value, packaging, storage period and special handling.',
      'Consignment records and receipts identify goods or sealed packages and the custody basis.',
      'Access and release instructions ensure handover to an authorised person.',
      'Service agreement confirms availability, acceptance conditions, fees, responsibilities and insurance arrangements.',
    ],
    confidentialNote:
      'Information about stored goods and security arrangements is handled with discretion. Sensitive details are discussed directly with the company.',
    suitedFor: null,
  },
  {
    slug: 'security-escorts',
    label: 'Security Escorts',
    shortLabel: 'Security Escorts',
    icon: 'fa-car-side',
    heroImage: '/images/escort-chauffeur-suv.jpg',
    heroAlt: 'Security escort vehicle with chauffeur',
    tagline: 'Planned journeys for goods and valuable assets.',
    cardDesc: 'Planned collection, timing, personnel and handover for journeys involving valuable assets.',
    bullets: [
      'Support for agreed journeys and movement of goods or valuable assets.',
      'Each assignment discussed in advance — nature of movement and client requirements.',
      'Planning covers collection and destination points, timing, personnel, communication and handover responsibilities.',
      'Service agreement clarifies vehicle escort versus other transport or custody arrangements.',
    ],
    note: 'Subject to assessment, confirmed coverage and applicable authorisations — advance enquiries are encouraged.',
    suitedFor: null,
  },
  {
    slug: 'security-dogs',
    label: 'Security Dogs',
    shortLabel: 'Security Dogs',
    icon: 'fa-dog',
    heroImage: '/images/security-dog-handler.jpg',
    heroAlt: 'Security dog handler on patrol',
    tagline: 'Dog and handler teams for deterrence and patrol support.',
    cardDesc: 'Dog and handler teams assessed for site suitability, complementing guarding and CCTV.',
    bullets: [
      'Additional deterrence and patrol support at suitable premises.',
      'Planned around the property, areas requiring protection and the presence of staff, residents or visitors.',
      'Dog and handler arrangements agreed per assignment.',
      'Site suitability and safe interaction with occupants and the public assessed before deployment.',
      'Complements guarding and other measures at compounds, warehouses and commercial premises.',
    ],
    suitedFor: null,
  },
];

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

export function getServiceByLabel(label) {
  return SERVICES.find((s) => s.label === label) || null;
}
