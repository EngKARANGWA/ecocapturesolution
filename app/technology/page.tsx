import { Fragment } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Settings2, Leaf, Sprout, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'Discover how EcoCapture captures CO₂ and turns it into agricultural growth - simple, affordable, and built for Africa.',
  keywords: [
    'CO2 capture machine Africa',
    'greenhouse CO2 integration Rwanda',
    'biochar production technology',
    'carbon capture how it works',
    'EcoCapture technology',
  ],
  alternates: { canonical: '/technology' },
  openGraph: {
    title: 'EcoCapture Technology - How We Capture CO₂ for Farming',
    description: 'Simple, affordable CO₂ capture technology: capture → deliver to greenhouses → grow crops → produce biochar. Built in Africa.',
    url: '/technology',
    images: [{ url: '/assets/projects/co2-capture.jpg', width: 1200, height: 630, alt: 'EcoCapture CO2 machine' }],
  },
};

const steps = [
  {
    number: '01',
    icon: Settings2,
    title: 'CO₂ Capture Machine',
    headline: 'We capture CO₂ from the air and reuse it for farming.',
    body: 'Our compact, modular machines are designed to capture CO₂ directly from industrial emission points - factories, kilns, and processing plants. They are built to work in African conditions: low-cost to operate, easy to maintain, and scalable from a single site to an entire region.',
    highlights: ['Low operating cost', 'Modular & scalable', 'Locally maintainable', 'Industrial-grade capture'],
    img: '/assets/projects/co2-capture.jpg',
    alt: 'CO₂ capture machine',
    imgLeft: false,
  },
  {
    number: '02',
    icon: Leaf,
    title: 'Greenhouse Integration',
    headline: 'Captured CO₂ goes straight into greenhouses to feed plants.',
    body: 'Instead of releasing CO₂ into the atmosphere, we pipe it directly into greenhouses. Plants absorb it and grow up to 30% faster, produce better quality crops, and harvest in shorter cycles. This turns a climate problem into a food production solution.',
    highlights: ['30% faster plant growth', 'Better crop quality', 'Shorter harvest cycles', 'Reduced water usage'],
    img: '/assets/projects/greenhouse.jpg',
    alt: 'Greenhouse CO₂ enrichment',
    imgLeft: true,
  },
  {
    number: '03',
    icon: Sprout,
    title: 'Biochar Production',
    headline: 'Leftover biomass becomes biochar - carbon locked in the soil forever.',
    body: 'The plant waste from our greenhouses does not go to landfill. We convert it into biochar - a carbon-rich material that improves soil health, retains water, and boosts crop yields for years. This is permanent carbon removal: the carbon captured from the air stays in the ground.',
    highlights: ['Permanent carbon storage', 'Improved soil fertility', 'Affordable for smallholder farmers', 'Waste-to-value model'],
    img: '/assets/projects/biochar.png',
    alt: 'Biochar fertilizer production',
    imgLeft: false,
  },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How EcoCapture CO₂ Capture Technology Works',
  description: 'EcoCapture captures CO₂ from industrial sources, delivers it to greenhouses to boost crop growth, then converts plant waste into biochar fertilizer — permanently locking carbon in the soil.',
  image: 'https://ecocapturesolution.vercel.app/assets/projects/co2-capture.jpg',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'CO₂ Capture', text: 'Compact, modular machines capture CO₂ directly from industrial emission points such as factories, kilns, and processing plants.' },
    { '@type': 'HowToStep', position: 2, name: 'Greenhouse Integration', text: 'Captured CO₂ is piped into greenhouses where plants absorb it, growing up to 30% faster with better crop quality and shorter harvest cycles.' },
    { '@type': 'HowToStep', position: 3, name: 'Biochar Production', text: 'Plant waste from the greenhouses is converted into biochar — a carbon-rich soil amendment that improves fertility and permanently stores carbon.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Technology', item: 'https://ecocapturesolution.vercel.app/technology' },
  ],
};

export default function Technology() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader
        title="How It Works"
        subtitle="Simple technology. Real impact. No complexity - just CO₂ captured and turned into food and fertile soil."
      />

      {/* Core message */}
      <section className="py-16 px-4 bg-eco-light border-b border-eco-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-eco-dark text-xl md:text-2xl font-semibold leading-relaxed">
            We capture CO₂ and turn it into{' '}
            <span className="text-eco-primary">agricultural productivity</span>{' '}
            and{' '}
            <span className="text-eco-primary">permanent carbon removal.</span>
          </p>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20 md:space-y-28">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center ${s.imgLeft ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Image */}
              <div className={`relative h-56 sm:h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-card-hover ${s.imgLeft ? 'lg:col-start-2' : ''}`}>
                <Image src={s.img} alt={s.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-eco-dark/40 to-transparent" />
                <span className="absolute bottom-4 left-4 text-7xl font-black text-white/10 leading-none select-none">
                  {s.number}
                </span>
              </div>

              {/* Text */}
              <div className={s.imgLeft ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-eco-light rounded-xl flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-eco-primary" />
                  </div>
                  <span className="text-eco-primary text-sm font-bold uppercase tracking-widest">{s.title}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                  {s.headline}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">{s.body}</p>
                <ul className="space-y-2">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-eco-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Circular economy summary */}
      <section className="py-10 sm:py-14 md:py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">The Full Circle</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-5">
            Every step feeds the next
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-gray-700">
            {['Capture CO₂', 'Enrich Greenhouse', 'Grow Crops', 'Convert Biomass', 'Produce Biochar', 'Improve Soil'].map((step, i, arr) => (
              <Fragment key={step}>
                <span className="bg-eco-light text-eco-dark px-4 py-2 rounded-full border border-eco-primary/10">
                  {step}
                </span>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-eco-primary/40" />}
              </Fragment>
            ))}
          </div>
          <p className="text-gray-500 mt-8 max-w-xl mx-auto leading-relaxed">
            This circular model means every tonne of CO₂ we capture compounds into more food, more fertile soil,
            and more carbon removed - permanently.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4 bg-eco-dark">
        {/* Wave — gray-50 section curves into the dark CTA */}
        <div aria-hidden className="absolute top-0 left-0 right-0 -translate-y-[99%] pointer-events-none">
          <svg
            viewBox="0 0 1440 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32 C240,64 480,8 720,24 C960,40 1200,68 1440,28 L1440,72 L0,72 Z"
              fill="#1b5e20"
            />
          </svg>
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-green-200/70 text-xs font-bold uppercase tracking-widest mb-3">Made in Africa. Built for the World.</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to deploy this technology?
          </h2>
          <p className="text-green-200 mb-8">
            We work with greenhouse operators, industries, and agricultural businesses across East Africa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/partner" className="bg-eco-primary hover:bg-white hover:text-eco-dark text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all shadow-lg no-underline">
              Partner With Us
            </Link>
            <Link href="/contact" className="border-2 border-white/40 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold text-sm transition-all no-underline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
