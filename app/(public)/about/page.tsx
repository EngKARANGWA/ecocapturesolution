import type { Metadata } from 'next';
import Image from 'next/image';
import { Target, Rocket } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about EcoCapture Solutions Ltd - a Rwandan climate-tech startup turning CO₂ into opportunity for African farmers and industries. Meet our team, vision, mission, and partners.',
  keywords: [
    'EcoCapture team',
    'climate tech Rwanda',
    'carbon capture startup Africa',
    'Kevin Iraguha EcoCapture',
    'sustainable agriculture Rwanda',
    'CO2 capture company Africa',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About EcoCapture Solutions Ltd',
    description:
      'A Rwandan climate-tech startup turning CO₂ into opportunity for African farmers and industries. Meet our team and story.',
    url: '/about',
    images: [{ url: '/assets/hero/hero-ecocapture-new.png', width: 1200, height: 630, alt: 'EcoCapture team' }],
  },
};

const team = [
  { img: '/assets/team/team-kevin.jpg',      name: 'Kevin Iraguha',               role: 'Founder & CEO',           sub: 'Mechanical & Business' },
  { img: '/assets/team/team-jean.jpg',       name: 'Mutabazi Jean de Dieu',       role: 'Environmental Chemist',   sub: '' },
  { img: '/assets/team/team-arthur.jpg',     name: 'Kayijuka Arthur',             role: 'Environmental Chemist',   sub: '' },
  { img: '/assets/team/team-chanceline.jpg', name: 'Chanceline Neza Nsengimana',  role: 'IT Specialist',           sub: '' },
  { img: '/assets/team/team-joseph.jpg',     name: 'Rutayisire Joseph',           role: 'Botany & Zoology Expert', sub: '' },
];

const advisors = [
  { img: '/assets/team/team-bernard.jpg', name: 'Dr Bernard Munyazikwiye', role: 'Technical Advisor' },
  { img: '/assets/team/team-vincent.png', name: 'Mr. Niyigaba Vincent',    role: 'Renewable Energy Advisor' },
];

const partners = [
  { href: 'https://www.tonyelumelufoundation.org/', img: '/assets/partners/partner-tef.png',    alt: 'Tony Elumelu Foundation' },
  { href: 'https://unipod.rw/',                    img: '/assets/partners/partner-unipod.png', alt: 'Unipod' },
  { href: 'https://fastercapital.com/',            img: '/assets/partners/fastercapital.png',  alt: 'FasterCapital' },
];

function TeamCard({ img, name, role, sub }: { img: string; name: string; role: string; sub?: string }) {
  return (
    <div className="group text-center">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
        <Image src={img} alt={name} fill className="object-cover object-top rounded-full border-4 border-white shadow-md group-hover:border-eco-light transition-colors duration-300" />
      </div>
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-eco-primary text-sm mt-0.5 font-medium">{role}</p>
      {sub && <p className="text-gray-400 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://ecocapturesolution.vercel.app/about' },
  ],
};

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader title="About Us" subtitle="Building Africa's climate-smart future, one CO₂ molecule at a time." />

      {/* Core message */}
      <section className="pt-10 sm:pt-14 md:pt-16 pb-4 sm:pb-6 px-4 bg-eco-light border-b border-eco-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-eco-dark text-xl md:text-2xl font-semibold leading-relaxed">
            A Rwandan climate-tech startup turning{' '}
            <span className="text-eco-primary">CO₂ into opportunity</span>{' '}
            for African farmers and industries.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-eco-primary font-semibold uppercase tracking-widest text-sm">Our Story</span>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            EcoCapture Solutions Ltd was founded with one mission: transform CO₂ from a climate
            threat into a growth engine for farmers and industries across Africa. Our locally built
            technology captures CO₂ efficiently, powers greenhouse farming, and supports sustainable
            fertilizer production - all at a fraction of global costs.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            <div className="bg-eco-light rounded-2xl p-7 border border-eco-primary/10">
              <Target className="w-8 h-8 text-eco-primary mb-3" />
              <h3 className="font-bold text-eco-dark text-xl mb-2">Our Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A carbon-neutral Africa where farmers thrive with climate-smart technology.
              </p>
            </div>
            <div className="bg-eco-light rounded-2xl p-7 border border-eco-primary/10">
              <Rocket className="w-8 h-8 text-eco-primary mb-3" />
              <h3 className="font-bold text-eco-dark text-xl mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Provide affordable CO₂ capture solutions that create value for agriculture, industry, and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">The People</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Meet Our Team</h2>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-10 justify-center">
            {team.map((m) => <TeamCard key={m.name} {...m} />)}
          </div>
          <div className="mt-16">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-10">Advisors</p>
            <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-10 justify-center">
              {advisors.map((a) => <TeamCard key={a.name} {...a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Backed By</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-12">Our Partners</h2>
          <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-10 justify-center items-center">
            {partners.map((p) => (
              <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer" className="group" aria-label={p.alt}>
                <Image src={p.img} alt={p.alt} width={140} height={80} className="h-16 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
