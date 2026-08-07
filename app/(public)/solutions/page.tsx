import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sprout, Factory, CheckCircle, BarChart3, type LucideIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    "EcoCapture's climate technology solutions for direct air capture, biomethane upgrading, CO₂ recovery, biochar, and greenhouse enrichment across Africa.",
  keywords: [
    'CO2 capture solutions Africa',
    'biochar fertilizer farmers Rwanda',
    'industrial CO2 reduction Africa',
    'carbon credits Africa',
    'sustainable agriculture solutions',
    'carbon capture for industries',
  ],
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'EcoCapture Solutions - For Farmers, Industries & Carbon Credit Buyers',
    description: 'CO₂ capture solutions clearly separated by who benefits: farmers, industries, and carbon credit buyers.',
    url: '/solutions',
    images: [{ url: '/assets/projects/co2-capture.jpg', width: 1200, height: 630, alt: 'EcoCapture solutions' }],
  },
};

interface Audience {
  icon?: LucideIcon;
  tag?: string;
  title: string;
  headline: string;
  body: string;
  benefits: string[];
  img: string;
  alt: string;
  cta: string;
  ctaHref: string;
  color: string;
  tagColor: string;
}

const audiences: Audience[] = [
  {
    icon: Factory,
    tag: 'For Industries',
    title: 'Carbon Capture & Utilization',
    headline: '',
    body: 'Capture CO₂ from industrial emissions and biomethane upgrading before it enters the atmosphere. Our modular systems recover carbon for valuable reuse, helping organizations reduce emissions and accelerate the transition to a circular carbon economy.',
    benefits: [
      'Multi-source CO₂ capture',
      'High-purity carbon recovery',
      'Sustainable carbon utilization',
    ],
    img: '/assets/projects/solution1.jpeg',
    alt: 'Farmers benefiting from EcoCapture',
    cta: 'Talk to Our Team',
    ctaHref: '/contact',
    color: 'bg-eco-light border-eco-primary/10',
    tagColor: 'bg-eco-primary text-white',
  },
  {
    icon: Sprout,
    tag: 'For Biogas Producers',
    title: 'Biomethane Upgrading',
    headline: '',
    body: 'Upgrade raw biogas into renewable biomethane while recovering CO₂ for productive use. Our integrated technology improves energy quality, reduces emissions, and maximizes the value of every cubic meter of biogas.',
    benefits: [
      'Renewable biomethane production',
      'CO₂ recovery and utilization',
      'Efficient and scalable upgrading',
    ],
    img: '/assets/projects/biomas.jpeg',
    alt: 'Biomethane upgrading facility',
    cta: 'Explore Partnership',
    ctaHref: '/partner',
    color: 'bg-eco-light border-eco-primary/10',
    tagColor: 'bg-eco-primary text-white',
  },
  {
    icon: Sprout,
    tag: 'For Farmers',
    title: 'Biochar & Carbon Removal',
    headline: '',
    body: 'Transform agricultural residues into premium biochar that permanently stores carbon while restoring soil health and increasing agricultural productivity.',
    benefits: [
      'Durable carbon sequestration',
      'Healthier soils and higher yields',
      'Verified climate impact',
    ],
    img: '/assets/projects/solution3.jpeg',
    alt: 'Biochar and carbon removal',
    cta: 'Get In Touch',
    ctaHref: '/contact',
    color: 'bg-eco-light border-eco-primary/10',
    tagColor: 'bg-eco-primary text-white',
  },
  {
    icon: BarChart3,
    tag: 'For Climate Partners',
    title: 'Carbon Credits & MRV',
    headline: '',
    body: 'Provide transparent measurement, monitoring, reporting, and verification of carbon reductions and removals, enabling organizations to demonstrate impact and access high-integrity carbon markets.',
    benefits: [
      'Accurate monitoring and reporting',
      'High-integrity carbon credits',
      'Compliance and sustainability support',
    ],
    img: '/assets/projects/chartstatistic.jpeg',
    alt: 'Carbon credits monitoring and verification',
    cta: 'Get In Touch',
    ctaHref: '/contact',
    color: 'bg-eco-light border-eco-primary/10',
    tagColor: 'bg-eco-primary text-white',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://ecocapturesolution.vercel.app/solutions' },
  ],
};

export default function Solutions() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader
        title="Our Solutions"
        subtitle="We capture, recover, and reuse carbon through integrated technologies designed for Africa's food and energy systems."
      />

      {/* Core message bar */}
      <section className="pt-4 pb-3 px-4 bg-eco-light border-b border-eco-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-eco-dark font-semibold text-lg">
            One technology. Three solutions. Climate solution · Agriculture solution · Business opportunity.
          </p>
        </div>
      </section>

      {/* Audience sections */}
      <section className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-4">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
          {audiences.map((a, i) => (
            <div key={a.title} className={`grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Image */}
              <div className={`relative h-56 sm:h-64 md:h-[22rem] rounded-3xl overflow-hidden shadow-card-hover ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <Image src={a.img} alt={a.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {a.tag && (
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${a.tagColor}`}>
                    {a.tag}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                {(a.icon || a.tag) && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-5 border ${a.color}`}>
                    {a.icon && <a.icon className="w-5 h-5 text-eco-primary" />}
                    {a.tag && <span className="text-eco-dark text-sm font-bold">{a.tag}</span>}
                  </div>
                )}
                <h2 className="text-3xl font-bold text-gray-900 mb-1">{a.title}</h2>
                <p className="text-eco-primary font-semibold mb-4">{a.headline}</p>
                <p className="text-gray-500 leading-relaxed mb-6">{a.body}</p>
                <ul className="space-y-2 mb-7">
                  {a.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-eco-primary shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={a.ctaHref}
                  className="inline-flex items-center gap-2 bg-eco-primary hover:bg-eco-dark text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-sm hover:shadow-md no-underline"
                >
                  {a.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pt-3 sm:pt-4 pb-10 sm:pb-12 md:pb-14 px-4 bg-eco-light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Not sure which solution fits you?</h2>
          <p className="text-gray-500 mb-8">Tell us about your situation and we will find the right approach together.</p>
          <Link href="/contact" className="inline-block bg-eco-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-eco-dark transition-colors shadow-sm hover:shadow-md no-underline">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
