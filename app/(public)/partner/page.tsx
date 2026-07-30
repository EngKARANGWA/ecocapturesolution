import type { Metadata } from 'next';
import { Leaf, Building2, Handshake, Microscope, Landmark, School, Users, Briefcase, type LucideIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PartnerForm from '@/components/PartnerForm';
import { getPartnerGroups } from '@/lib/site-content';

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
    Icon: Landmark,
    label: 'Government',
    desc: 'Support climate-aligned pilots, public programs, and policy collaboration.',
  },
  {
    Icon: School,
    label: 'Universities',
    desc: 'Work with us on research, trials, and student-led innovation projects.',
  },
  {
    Icon: Handshake,
    label: 'NGOs',
    desc: 'Extend impact to farmers, communities, and climate resilience programs.',
  },
  {
    Icon: Building2,
    label: 'Corporate Partners',
    desc: 'Reduce emissions, support circular carbon use, and unlock shared value.',
  },
  {
    Icon: Users,
    label: 'Investors',
    desc: 'Back the scale-up of integrated carbon technologies and climate infrastructure.',
  },
  {
    Icon: Microscope,
    label: 'Research Institutions',
    desc: 'Collaborate on technical validation, field trials, and publication-ready data.',
  },
  {
    Icon: Leaf,
    label: 'Agriculture & Greenhouse Partners',
    desc: 'Deploy CO₂ enrichment and biochar solutions to improve yields and soil health.',
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
  const partnerGroups = getPartnerGroups();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader title="Partner With Us" subtitle="Work with EcoCapture across investment, research, public programs, and commercial deployment." />

      {/* Partner types */}
      <section className="pt-4 sm:pt-5 pb-4 sm:pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Who We Work With</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Partnership categories</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">We work with organizations that want to support integrated climate technology and measurable impact.</p>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {partnerTypes.map((p) => (
              <div key={p.label} className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <p.Icon className="w-10 h-10 text-eco-primary mx-auto mb-4" />
                <h3 className="font-bold text-eco-dark text-base mb-2">{p.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-3 sm:pt-4 pb-6 sm:pb-8 md:pb-10 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.95fr] gap-8 sm:gap-10 lg:gap-14 items-start">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">Why partner with EcoCapture?</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to build connected carbon technologies that capture emissions, improve agriculture, and create practical climate value.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {partnerGroups.map((group) => (
                <div key={group.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card">
                  <h3 className="font-semibold text-gray-900 mb-2">{group.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{group.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="text-xs font-medium bg-eco-light text-eco-dark px-2.5 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a partnership inquiry</h2>
              <p className="text-gray-500 text-sm mb-6">Tell us what type of collaboration you have in mind and we’ll follow up.</p>
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
