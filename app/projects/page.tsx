import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, TrendingUp, Leaf, Sprout, Wind } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Projects & Pilots',
  description:
    'Explore EcoCapture\'s pilot projects including the Karongi pilot - real results, real photos, and key outcomes from our CO₂ capture and biochar programme in Rwanda.',
  keywords: [
    'EcoCapture Karongi pilot',
    'CO2 capture pilot Rwanda',
    'biochar pilot Africa',
    'EcoCapture project results',
    'carbon capture pilot East Africa',
  ],
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'EcoCapture Projects & Pilots — Real Results in Rwanda',
    description: 'Real pilot results: Karongi CO₂ capture and biochar project outcomes, photos, and key learnings.',
    url: '/projects',
    images: [{ url: '/assets/projects/greenhouse.jpg', width: 1200, height: 630, alt: 'EcoCapture pilot project' }],
  },
};

const outcomes = [
  { icon: Wind,     value: '120+',   unit: 'tonnes', label: 'CO₂ Captured',       color: 'text-blue-500',   bg: 'bg-blue-50 border-blue-100' },
  { icon: Leaf,     value: '45,000+', unit: 'plants', label: 'Crops Grown',        color: 'text-eco-primary', bg: 'bg-eco-light border-eco-primary/10' },
  { icon: Sprout,   value: '18',     unit: 'tonnes', label: 'Biochar Produced',   color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-100' },
  { icon: TrendingUp, value: '30%',  unit: 'increase', label: 'Crop Yield Boost', color: 'text-green-600',  bg: 'bg-green-50 border-green-100' },
];

const photos = [
  { src: '/assets/projects/co2-capture.jpg',      alt: 'CO₂ capture machine at the Karongi pilot site' },
  { src: '/assets/projects/greenhouse.jpg',        alt: 'Greenhouse with CO₂ enrichment running' },
  { src: '/assets/projects/biochar.png',           alt: 'Biochar produced from greenhouse biomass' },
  { src: '/assets/projects/farmer supported.png',  alt: 'Farmers supported with biochar fertilizers' },
  { src: '/assets/projects/biochar fertilizer.png', alt: 'Biochar fertilizer ready for distribution' },
  { src: '/assets/projects/circular economy.jpg',  alt: 'Circular economy model in action' },
];

const projectSchema = {
  '@context': 'https://schema.org',
  '@type': 'ResearchProject',
  name: 'EcoCapture Karongi Pilot — Rwanda',
  description: "Africa's first integrated carbon-to-agriculture loop: CO₂ capture, greenhouse enrichment, and biochar production in Karongi District, Rwanda.",
  url: 'https://ecocapturesolution.vercel.app/projects',
  image: 'https://ecocapturesolution.vercel.app/assets/projects/greenhouse.jpg',
  location: { '@type': 'Place', name: 'Karongi District', address: { '@type': 'PostalAddress', addressLocality: 'Karongi', addressRegion: 'Western Province', addressCountry: 'RW' } },
  founder: { '@type': 'Organization', name: 'EcoCapture Solutions Ltd' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Projects & Pilots', item: 'https://ecocapturesolution.vercel.app/projects' },
  ],
};

export default function Projects() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader
        title="Projects & Pilots"
        subtitle="Real work, real results - on the ground in Rwanda."
      />

      {/* Karongi pilot intro */}
      <section className="pt-12 sm:pt-16 md:pt-24 pb-4 sm:pb-6 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          <div>
            <div className="flex items-center gap-2 text-eco-primary text-sm font-bold uppercase tracking-widest mb-4">
              Flagship Pilot
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
              The Karongi Pilot
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Our first full pilot was launched in the Karongi district of Rwanda - a region where
              smallholder farmers face both climate stress and low productivity. We deployed our
              CO₂ capture unit alongside a greenhouse enrichment system and a biochar production facility,
              creating Africa's first integrated carbon-to-agriculture loop.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-eco-primary shrink-0" />
                <span>Karongi District, Western Province, Rwanda</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-eco-primary shrink-0" />
                <span>Launched 2023 - ongoing</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-eco-primary shrink-0" />
                <span>150+ farmers directly benefiting from biochar fertilizers</span>
              </div>
            </div>
          </div>
          <div className="relative h-60 sm:h-72 md:h-80 lg:h-[26rem] rounded-3xl overflow-hidden shadow-card-hover">
            <Image
              src="/assets/projects/greenhouse.jpg"
              alt="Karongi pilot greenhouse"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eco-dark/50 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="bg-eco-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Karongi, Rwanda
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key outcomes */}
      <section className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Key Outcomes</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">What We Achieved</h2>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {outcomes.map((o) => (
              <div key={o.label} className={`rounded-2xl border p-6 text-center ${o.bg}`}>
                <o.icon className={`w-7 h-7 mx-auto mb-3 ${o.color}`} />
                <p className={`text-3xl font-black ${o.color}`}>{o.value}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{o.unit}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">On the Ground</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Pilot in Pictures</h2>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((p) => (
              <div key={p.src} className="relative h-52 md:h-64 rounded-2xl overflow-hidden shadow-card group">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                  {p.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="pt-4 sm:pt-6 pb-10 sm:pb-14 md:pb-20 px-4 bg-eco-lighter">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-10 bg-eco-primary rounded-full" />
            <span className="text-eco-primary font-semibold uppercase tracking-widest text-sm">What We Learned</span>
          </div>
          <div className="space-y-5">
            {[
              'Local maintenance and operator training is critical to long-term sustainability.',
              'Farmers adopt biochar rapidly once they see improved yields - no persuasion needed.',
              'The CO₂-to-greenhouse pipeline works best within 200m of the capture unit.',
              'Biochar produced from local biomass performs comparably to commercial fertilizers at a fraction of the cost.',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-eco-primary/10 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-eco-primary flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-8 sm:py-10 md:py-14 px-4 bg-eco-dark text-white text-center">
        {/* Wave — lighter section curves into the dark CTA */}
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
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Start a Pilot in Your Region?</h2>
          <p className="text-green-200 mb-8">
            We are expanding to new sites across East Africa. If you have a greenhouse, industrial facility, or farming community - let&apos;s talk.
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
