import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sprout, Factory, LineChart, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    "EcoCapture's CO₂ capture solutions for farmers, industries, and carbon credit buyers across Africa - improve yields, reduce emissions, and generate verified carbon credits.",
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

const audiences = [
  {
    icon: Sprout,
    tag: 'For Farmers',
    title: 'Grow More. Spend Less.',
    headline: 'Better crops with CO₂ and biochar - at a fraction of the cost.',
    body: 'We deliver CO₂ directly into your greenhouse so your plants grow faster and produce more. We also supply biochar fertilizer made from agricultural waste - improving your soil health and reducing your dependence on expensive chemical fertilizers.',
    benefits: [
      'Up to 30% higher crop yields',
      'Shorter harvest cycles',
      'Affordable biochar fertilizer',
      'Improved soil fertility long-term',
      'Reduced chemical input costs',
    ],
    img: '/assets/projects/farmer supported.png',
    alt: 'Farmers benefiting from EcoCapture',
    cta: 'Talk to Our Team',
    ctaHref: '/contact',
    color: 'bg-eco-light border-eco-primary/10',
    tagColor: 'bg-eco-primary text-white',
  },
  {
    icon: Factory,
    tag: 'For Industries',
    title: 'Turn Emissions Into Value.',
    headline: 'Reduce your CO₂ footprint and support local agriculture at the same time.',
    body: 'If your facility produces CO₂ emissions, we can capture them before they reach the atmosphere. That captured CO₂ goes into local greenhouses - improving food production while cutting your carbon output. You reduce costs, meet sustainability targets, and support the communities around you.',
    benefits: [
      'Measurable emissions reduction',
      'Low-cost capture infrastructure',
      'CSR and sustainability reporting ready',
      'Support local food systems',
      'Scalable to your facility size',
    ],
    img: '/assets/projects/co2-capture.jpg',
    alt: 'Industrial CO2 capture',
    cta: 'Explore Partnership',
    ctaHref: '/partner',
    color: 'bg-blue-50 border-blue-100',
    tagColor: 'bg-blue-600 text-white',
  },
  {
    icon: LineChart,
    tag: 'For Carbon Credit Buyers',
    title: 'Invest in Verified Carbon Removal.',
    headline: 'Real, permanent carbon removal you can measure and report.',
    body: 'Our biochar permanently sequesters carbon in agricultural soil - this is not a temporary offset, it is durable carbon removal. For corporates, investors, and organisations looking to meet net-zero targets with high-integrity credits, EcoCapture offers traceable, measurable, and Africa-based carbon removal.',
    benefits: [
      'Permanent carbon sequestration via biochar',
      'Traceable and measurable removal',
      'Supports smallholder farmers in Africa',
      'High-integrity, verifiable credits',
      'Aligned with net-zero goals',
    ],
    img: '/assets/projects/circular economy.jpg',
    alt: 'Carbon credits and circular economy',
    cta: 'Get In Touch',
    ctaHref: '/contact',
    color: 'bg-purple-50 border-purple-100',
    tagColor: 'bg-purple-600 text-white',
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
        subtitle="We capture CO₂ and turn it into value - for farmers, industries, and the climate."
      />

      {/* Core message bar */}
      <section className="py-10 px-4 bg-eco-light border-b border-eco-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-eco-dark font-semibold text-lg">
            One technology. Three solutions. Climate solution · Agriculture solution · Business opportunity.
          </p>
        </div>
      </section>

      {/* Audience sections */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {audiences.map((a, i) => (
            <div key={a.tag} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Image */}
              <div className={`relative h-72 md:h-[22rem] rounded-3xl overflow-hidden shadow-card-hover ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <Image src={a.img} alt={a.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${a.tagColor}`}>
                  {a.tag}
                </span>
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-5 border ${a.color}`}>
                  <a.icon className="w-5 h-5 text-eco-primary" />
                  <span className="text-eco-dark text-sm font-bold">{a.tag}</span>
                </div>
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
      <section className="py-20 px-4 bg-eco-light">
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
