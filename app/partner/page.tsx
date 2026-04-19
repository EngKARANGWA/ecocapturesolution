import type { Metadata } from 'next';
import { Leaf, Building2, Handshake, Microscope, type LucideIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PartnerForm from '@/components/PartnerForm';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description:
    'Partner with EcoCapture Solutions Ltd - we work with greenhouse operators, industries, NGOs, and researchers to scale affordable CO₂ capture and sustainable agriculture across Africa.',
  keywords: [
    'partner EcoCapture',
    'climate partnership Africa',
    'greenhouse CO2 partnership Rwanda',
    'carbon capture partnership',
    'NGO climate Africa',
    'sustainable agriculture partnership',
    'invest climate tech Rwanda',
  ],
  alternates: { canonical: '/partner' },
  openGraph: {
    title: 'Partner With EcoCapture Solutions Ltd',
    description:
      'Join EcoCapture as a greenhouse operator, industry partner, NGO, or researcher. Scale affordable CO₂ capture across Africa.',
    url: '/partner',
    images: [{ url: '/assets/projects/partnership.jpg.png', width: 1200, height: 630, alt: 'Partner with EcoCapture' }],
  },
};

interface PartnerType {
  Icon: LucideIcon;
  label: string;
  desc: string;
}

const partnerTypes: PartnerType[] = [
  {
    Icon: Leaf,
    label: 'Greenhouse Operators',
    desc: 'Deploy CO₂ enrichment to boost yields and sustainability in your facility.',
  },
  {
    Icon: Building2,
    label: 'Industries',
    desc: 'Reduce your emissions and support local agriculture through CO₂ capture.',
  },
  {
    Icon: Handshake,
    label: 'NGOs & Donors',
    desc: 'Amplify your impact on food security and climate through scalable tech.',
  },
  {
    Icon: Microscope,
    label: 'Researchers',
    desc: 'Collaborate on field trials, technology development, and impact measurement.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Partner With Us', item: 'https://ecocapturesolution.vercel.app/partner' },
  ],
};

export default function Partner() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader title="Partner With Us" subtitle="Join us in building Africa's climate-smart future. Together we scale faster." />

      {/* Partner types */}
      <section className="pt-12 sm:pt-16 md:pt-24 pb-4 sm:pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Who We Work With</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Partnership Opportunities</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">We partner with organisations that share our vision for a carbon-neutral Africa.</p>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((p) => (
              <div key={p.label} className="bg-eco-lighter rounded-2xl p-5 sm:p-7 border border-eco-primary/10 text-center hover:-translate-y-1 transition-transform duration-300">
                <p.Icon className="w-10 h-10 text-eco-primary mx-auto mb-4" />
                <h3 className="font-bold text-eco-dark text-base mb-2">{p.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + contact */}
      <section className="pt-4 sm:pt-6 pb-10 sm:pb-14 md:pb-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
          <PartnerForm />
        </div>
      </section>
    </>
  );
}
