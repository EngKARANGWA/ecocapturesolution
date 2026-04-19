import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Settings2, Leaf, Sprout, Recycle, ChevronDown, AlertTriangle, Lightbulb, ArrowRight, type LucideIcon } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export const metadata: Metadata = {
  title: 'EcoCapture Solutions Ltd — Climate Tech for Africa',
  description:
    "EcoCapture Solutions Ltd captures CO₂ and turns it into opportunity for Africa's farmers and industries. Greenhouse enrichment, biochar fertilizers, and circular carbon economy — built in Rwanda.",
  keywords: [
    'EcoCapture Solutions',
    'CO2 capture Africa',
    'climate tech Rwanda',
    'biochar fertilizer',
    'greenhouse CO2 enrichment',
    'carbon capture technology',
    'sustainable farming Africa',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'EcoCapture Solutions Ltd — Climate Tech for Africa',
    description:
      "Turning CO₂ into Opportunity for Africa's Future. Affordable CO₂ capture for agriculture, industry, and climate action.",
    url: '/',
    images: [{ url: '/assets/hero/hero-ecocapture-new.png', width: 1200, height: 630, alt: 'EcoCapture hero' }],
  },
};

interface Initiative {
  Icon: LucideIcon;
  img: string;
  alt: string;
  title: string;
  desc: string;
}

const initiatives: Initiative[] = [
  {
    Icon: Settings2,
    img: '/assets/projects/co2-capture.jpg',
    alt: 'CO₂ Capture Technology',
    title: 'CO₂ Capture Technology',
    desc: 'Compact, modular machines that capture CO₂ from industrial sources at low cost.',
  },
  {
    Icon: Leaf,
    img: '/assets/projects/greenhouse.jpg',
    alt: 'Greenhouse CO₂ Enrichment',
    title: 'Greenhouse Enrichment',
    desc: 'Boost plant growth by up to 30% using captured CO₂, improving yields and quality.',
  },
  {
    Icon: Sprout,
    img: '/assets/projects/biochar.png',
    alt: 'Biochar Fertilizers',
    title: 'Biochar Fertilizers',
    desc: 'Convert greenhouse waste biomass into advanced, carbon-rich fertilizers.',
  },
  {
    Icon: Recycle,
    img: '/assets/projects/circular economy.jpg',
    alt: 'Circular Economy',
    title: 'Circular Economy',
    desc: 'Transforming agricultural waste into valuable products for a sustainable future.',
  },
];

const team = [
  { img: '/assets/team/team-kevin.jpg',      name: 'Kevin Iraguha',               role: 'Founder & CEO' },
  { img: '/assets/team/team-jean.jpg',       name: 'Mutabazi Jean de Dieu',       role: 'Environmental Chemist' },
  { img: '/assets/team/team-arthur.jpg',     name: 'Kayijuka Arthur',             role: 'Environmental Chemist' },
  { img: '/assets/team/team-chanceline.jpg', name: 'Chanceline Neza Nsengimana',  role: 'IT Specialist' },
  { img: '/assets/team/team-joseph.jpg',     name: 'Rutayisire Joseph',           role: 'Botany & Zoology Expert' },
];

const partners = [
  { href: 'https://www.tonyelumelufoundation.org/', img: '/assets/partners/partner-tef.png',    alt: 'Tony Elumelu Foundation' },
  { href: 'https://unipod.rw/',                    img: '/assets/partners/partner-unipod.png', alt: 'Unipod' },
  { href: 'https://fastercapital.com/',            img: '/assets/partners/fastercapital.png',  alt: 'FasterCapital' },
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EcoCapture Solutions Ltd',
  url: 'https://ecocapturesolution.vercel.app',
  logo: 'https://ecocapturesolution.vercel.app/assets/logos/logo-ecocapture.png',
  description:
    "EcoCapture Solutions Ltd turns CO₂ into opportunity for Africa's farmers and industries through affordable carbon capture technology, greenhouse CO₂ enrichment, and biochar fertilizers — built in Rwanda.",
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Norrseken Kigali',
    addressLocality: 'Kigali',
    addressCountry: 'RW',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+250-781-392-398',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  ],
  email: 'info@ecocapturesolutions.com',
  sameAs: ['https://www.linkedin.com/company/ecocapture-solutions-ltd/'],
  areaServed: 'Africa',
  knowsAbout: ['CO2 capture', 'carbon sequestration', 'biochar', 'sustainable agriculture', 'greenhouse farming', 'circular economy'],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-hero bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-eco-dark/95 via-eco-dark/80 to-eco-primary/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            {/* Badge */}

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight mb-6">
              Turning CO₂ Emissions into<br />
              <span className="text-green-300">Agricultural Growth</span>
            </h1>

            <p className="text-green-200 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Affordable carbon capture for Africa&apos;s future - built in Africa, for the world.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/technology" className="bg-eco-primary hover:bg-white hover:text-eco-dark text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all no-underline">
                See How It Works
              </Link>
              <Link
                href="/partner"
                className="border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold text-base transition-all no-underline"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-eco-primary py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          <AnimatedCounter target={120}   suffix="+"  label="Tonnes CO₂ Captured"  variant="light" />
          <AnimatedCounter target={45000} suffix="+"  label="Plants Grown"          variant="light" />
          <AnimatedCounter target={18}    suffix="t"  label="Biochar Produced"      variant="light" />
          <AnimatedCounter target={150}   suffix="+"  label="Farmers Supported"     variant="light" />
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="py-10 sm:py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">A Crisis With Two Faces</h2>
            <div className="w-12 h-1 bg-red-400 mx-auto mt-5 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-card">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Climate Change Is Accelerating</h3>
              <p className="text-gray-500 leading-relaxed">
                CO₂ emissions from industry and agriculture are rising fast. Africa is one of the most
                vulnerable continents - yet it contributes least to the problem. The planet cannot wait.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-orange-100 shadow-card">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5">
                <Sprout className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Agricultural Productivity Is Still Low</h3>
              <p className="text-gray-500 leading-relaxed">
                Millions of African farmers struggle with poor soil, high fertilizer costs, and low yields.
                Food insecurity grows while resources go to waste. There has to be a better way.
              </p>
            </div>
          </div>
          <div className="mt-6 sm:mt-10 bg-white rounded-2xl p-8 border border-eco-primary/20 shadow-card">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-5">
              <Lightbulb className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-eco-dark font-semibold text-lg leading-snug">
              What if the CO₂ causing climate change could also solve the farming crisis?
            </p>
</div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="pt-10 sm:pt-16 md:pt-24 pb-4 sm:pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">The Solution</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How It Works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Four simple steps that turn a climate problem into an agricultural solution.</p>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: Settings2,
                title: 'Capture CO₂',
                desc: 'Our compact machines capture CO₂ directly from industrial sources at low cost.',
                color: 'bg-blue-50 border-blue-100',
                iconColor: 'text-blue-500',
                numColor: 'text-blue-200',
              },
              {
                step: '02',
                icon: ArrowRight,
                title: 'Deliver to Greenhouses',
                desc: 'The captured CO₂ is piped into greenhouses where it feeds plants directly.',
                color: 'bg-eco-light border-eco-primary/10',
                iconColor: 'text-eco-primary',
                numColor: 'text-eco-primary/20',
              },
              {
                step: '03',
                icon: Leaf,
                title: 'Improve Plant Growth',
                desc: 'Plants grow up to 30% faster and produce higher-quality crops — more food, less waste.',
                color: 'bg-green-50 border-green-100',
                iconColor: 'text-green-600',
                numColor: 'text-green-200',
              },
              {
                step: '04',
                icon: Sprout,
                title: 'Convert Biomass to Biochar',
                desc: 'Leftover biomass is converted into biochar fertilizer, locking carbon in the soil permanently.',
                color: 'bg-amber-50 border-amber-100',
                iconColor: 'text-amber-600',
                numColor: 'text-amber-200',
              },
            ].map((s) => (
              <div key={s.step} className={`rounded-2xl border p-7 ${s.color} flex flex-col`}>
                <span className={`text-5xl font-black mb-4 ${s.numColor}`}>{s.step}</span>
                <s.icon className={`w-7 h-7 mb-3 ${s.iconColor}`} />
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-10">
            <Link href="/technology" className="inline-flex items-center gap-2 text-eco-primary font-semibold hover:text-eco-dark transition-colors no-underline border-b-2 border-eco-primary hover:border-eco-dark pb-0.5">
              Explore the technology in detail →
            </Link>
          </div>
        </div>
      </section>

      {/* ── INITIATIVES ── */}
      <section className="pb-4 sm:pb-6 pt-0 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Initiatives</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Four interconnected solutions building a circular carbon economy.</p>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={item.img} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-sm">
                    <item.Icon className="w-5 h-5 text-eco-primary" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-10">
            <Link href="/solutions" className="inline-flex items-center gap-2 text-eco-primary font-semibold hover:text-eco-dark transition-colors no-underline border-b-2 border-eco-primary hover:border-eco-dark pb-0.5">
              See all solutions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">The People</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Meet Our Team</h2>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {team.map((m) => (
              <div key={m.name} className="group text-center w-36 sm:w-40">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image src={m.img} alt={m.name} fill className="object-cover object-top rounded-full border-4 border-white shadow-md group-hover:border-eco-light transition-colors duration-300" />
                </div>
                <p className="font-semibold text-gray-900 text-sm leading-tight">{m.name}</p>
                <p className="text-eco-primary text-xs mt-1 font-medium">{m.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-10">
            <Link href="/about" className="inline-flex items-center gap-2 text-eco-primary font-semibold hover:text-eco-dark transition-colors no-underline border-b-2 border-eco-primary hover:border-eco-dark pb-0.5">
              Meet the full team →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="pt-4 sm:pt-6 pb-8 sm:pb-14 md:pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Backed By</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-8 sm:mb-12">Our Partners</h2>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {partners.map((p) => (
              <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer" className="group block" aria-label={p.alt}>
                <Image src={p.img} alt={p.alt} width={140} height={80} className="h-16 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 sm:py-16 md:py-24 px-4 bg-gradient-to-br from-eco-dark via-eco-primary to-eco-medium">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-green-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            Made in Africa. Built for the World.
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to Build Africa&apos;s Climate-Smart Future?
          </h2>
          <p className="text-green-200 text-lg mb-10">
            Join us as a partner, investor, or collaborator and help scale affordable CO₂ capture across Africa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/partner" className="bg-white text-eco-dark px-8 py-3.5 rounded-full font-semibold text-base hover:bg-green-50 shadow-lg hover:shadow-xl transition-all no-underline">
              Partner With Us
            </Link>
            <Link href="/contact" className="border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold text-base transition-all no-underline">
              Contact Us
            </Link>
            <Link href="/careers" className="border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold text-base transition-all no-underline">
              Join the Future
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
