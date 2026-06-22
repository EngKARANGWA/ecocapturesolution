import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe, Handshake, TrendingUp, Leaf, MapPin, Briefcase, ChevronDown } from 'lucide-react';
import CareerForm from '@/components/CareerForm';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join EcoCapture Solutions Ltd in Kigali, Rwanda. Open positions include Agricultural Field Officer, Sustainability Project Manager, and Sales & Partnerships Coordinator. Work in climate tech for Africa.',
  keywords: [
    'jobs Rwanda climate tech',
    'EcoCapture careers',
    'sustainability jobs Kigali',
    'agricultural jobs Rwanda',
    'climate jobs Africa',
    'green jobs East Africa',
  ],
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers at EcoCapture Solutions Ltd - Climate Jobs in Kigali',
    description:
      'Work in climate tech for Africa. Open roles in Kigali: Agricultural Field Officer, Sustainability Project Manager, Sales & Partnerships Coordinator.',
    url: '/careers',
    images: [{ url: '/assets/hero/hero-ecocapture-new.png', width: 1200, height: 630, alt: 'Work at EcoCapture' }],
  },
};

const perks = [
  {
    Icon: Globe,
    title: 'Real Climate Impact',
    desc: 'Every day you work here moves the needle on climate change and food security across Africa.',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-500',
    numColor: 'text-blue-200',
    num: '01',
  },
  {
    Icon: Handshake,
    title: 'Collaborative Team',
    desc: 'Work alongside chemists, engineers, farmers, and tech specialists in a cross-disciplinary environment.',
    color: 'bg-eco-light border-eco-primary/10',
    iconColor: 'text-eco-primary',
    numColor: 'text-eco-primary/20',
    num: '02',
  },
  {
    Icon: TrendingUp,
    title: 'Grow With Us',
    desc: 'Professional development through meaningful, real-world projects with measurable outcomes.',
    color: 'bg-green-50 border-green-100',
    iconColor: 'text-green-600',
    numColor: 'text-green-200',
    num: '03',
  },
  {
    Icon: Leaf,
    title: "Africa's Climate Movement",
    desc: "Be at the forefront of Africa's fastest-growing climate tech sector - built here, for the world.",
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-600',
    numColor: 'text-amber-200',
    num: '04',
  },
];

const openings = [
  {
    title: 'Agricultural Field Officer',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    desc: 'Work directly with farmers to implement sustainable practices and distribute biochar fertilizers across farming communities.',
    tags: ['Agriculture', 'Field Work', 'Community'],
  },
  {
    title: 'Sustainability Project Manager',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    desc: 'Lead climate-smart agriculture and CO₂ capture projects from planning through field implementation and impact reporting.',
    tags: ['Project Management', 'Climate', 'Leadership'],
  },
  {
    title: 'Sales & Partnerships Coordinator',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    desc: 'Drive market expansion, build relationships with greenhouse operators and agri-businesses, and grow farmer engagement.',
    tags: ['Sales', 'Partnerships', 'Business Development'],
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://ecocapturesolution.vercel.app/careers' },
  ],
};

export default function Careers() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-hero bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-eco-dark/95 via-eco-dark/80 to-eco-primary/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
          <div className="max-w-7xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
              Building Africa&apos;s{' '}
              <span className="text-green-300">Climate Smart</span> {' '} <br />
              Future With Us
            </h1>
            <p className="text-green-200 text-lg leading-relaxed mb-10 max-w-lg">
              Join a mission-driven team turning CO₂ into opportunity for farmers and industries across Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#openings" className="bg-eco-primary hover:bg-white hover:text-eco-dark text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all no-underline">
                See Open Roles
              </a>
              <a href="#apply" className="border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold text-base transition-all no-underline">
                Apply Now
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-eco-primary pt-12 pb-4 sm:pb-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
          {[
            { value: '3',      label: 'Open Positions' },
            { value: 'Kigali', label: 'Based in Rwanda' },
            { value: '2023',   label: 'Founded' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
              <p className="text-green-200 text-sm mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY ECOCAPTURE ── */}
      <section className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Why Join Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Why EcoCapture?</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">We believe innovation and sustainability go hand in hand.</p>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p) => (
              <div key={p.title} className={`rounded-2xl border p-7 ${p.color} flex flex-col`}>
                <span className={`text-5xl font-black mb-4 ${p.numColor}`}>{p.num}</span>
                <p.Icon className={`w-7 h-7 mb-3 ${p.iconColor}`} />
                <h3 className="font-bold text-gray-900 text-base mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section id="openings" className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Now Hiring</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Open Positions</h2>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="space-y-6">
            {openings.map((o) => (
              <div
                key={o.title}
                className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-gray-900 text-xl">{o.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-eco-light text-eco-dark text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> {o.type}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {o.location}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{o.desc}</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {o.tags.map((tag) => (
                      <span key={tag} className="text-xs text-eco-primary bg-eco-light px-2.5 py-1 rounded-full border border-eco-primary/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#apply"
                    className="inline-flex items-center gap-1.5 text-eco-primary font-semibold text-sm hover:text-eco-dark transition-colors no-underline border-b-2 border-eco-primary hover:border-eco-dark pb-0.5"
                  >
                    Apply for this role →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-eco-lighter rounded-2xl p-6 text-center border border-eco-primary/10">
            <p className="text-gray-700 text-sm">
              <strong>How to apply:</strong> Fill the form below or email your CV to{' '}
              <a href="mailto:careers@ecocapturesolutions.com" className="text-eco-primary font-semibold hover:underline">
                careers@ecocapturesolutions.com
              </a>{' '}
              with subject: <em>Application - [Position Name]</em>
            </p>
          </div>
        </div>
      </section>

      {/* ── APPLY FORM ── */}
      <section id="apply" className="pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-24 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Get Started</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Apply Now</h2>
            <p className="text-gray-500 mt-3 text-sm">Tell us about yourself and the role you&apos;re interested in.</p>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>
          <CareerForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-8 sm:py-10 md:py-14 px-4 bg-gradient-to-br from-eco-dark via-eco-primary to-eco-medium">
        <div className="absolute top-0 left-0 right-0 -translate-y-[99%] pointer-events-none" aria-hidden>
          <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,8 720,24 C960,40 1200,68 1440,28 L1440,72 L0,72 Z" fill="#2e7d32" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-green-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            Made in Africa. Built for the World.
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to Join the Mission?
          </h2>
          <p className="text-green-200 text-lg mb-10">
            Not seeing the right role? We&apos;re always looking for passionate people. Reach out and introduce yourself.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#apply" className="bg-white text-eco-dark px-8 py-3.5 rounded-full font-semibold text-base hover:bg-green-50 shadow-lg hover:shadow-xl transition-all no-underline">
              Apply Now
            </a>
            <Link href="/contact" className="border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold text-base transition-all no-underline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
