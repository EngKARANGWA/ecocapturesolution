import type { Metadata } from 'next';
import { Globe, Handshake, TrendingUp, Leaf, type LucideIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

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

interface Perk {
  Icon: LucideIcon;
  text: string;
}

const perks: Perk[] = [
  { Icon: Globe,      text: 'Real-world impact on climate change and food security' },
  { Icon: Handshake,  text: 'Collaborative, cross-disciplinary team environment' },
  { Icon: TrendingUp, text: 'Professional growth through meaningful projects' },
  { Icon: Leaf,       text: "Be part of Africa's growing climate tech movement" },
];

const openings = [
  {
    title: 'Agricultural Field Officer',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    desc: 'Work directly with farmers to implement sustainable practices and distribute biochar fertilizers across farming communities.',
  },
  {
    title: 'Sustainability Project Manager',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    desc: 'Lead climate-smart agriculture and CO₂ capture projects from planning through field implementation and impact reporting.',
  },
  {
    title: 'Sales & Partnerships Coordinator',
    type: 'Full-time',
    location: 'Kigali, Rwanda',
    desc: 'Drive market expansion, build relationships with greenhouse operators and agri-businesses, and grow farmer engagement.',
  },
];

export default function Careers() {
  return (
    <>
      <PageHeader title="Work With Us" subtitle="Join a mission-driven team turning CO₂ into opportunity across Africa." />

      {/* Why join */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why EcoCapture?</h2>
            <p className="text-gray-500 mt-2">We believe innovation and sustainability go hand in hand.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {perks.map((p) => (
              <div key={p.text} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p.Icon className="w-6 h-6 text-eco-primary shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Now Hiring</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Open Positions</h2>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="space-y-5">
            {openings.map((o) => (
              <div key={o.title} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-gray-900 text-lg">{o.title}</h3>
                  <div className="flex gap-2">
                    <span className="bg-eco-light text-eco-dark text-xs font-semibold px-3 py-1 rounded-full">{o.type}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">📍 {o.location}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{o.desc}</p>
                <a href="mailto:careers@ecocapturesolutions.com" className="inline-flex items-center gap-1.5 text-eco-primary font-semibold text-sm hover:text-eco-dark transition-colors no-underline">
                  Apply now →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-eco-lighter rounded-2xl p-6 text-center border border-eco-primary/10">
            <p className="text-gray-700 text-sm">
              <strong>How to apply:</strong> Send your CV and a short cover letter to{' '}
              <a href="mailto:careers@ecocapturesolutions.com" className="text-eco-primary font-semibold hover:underline">
                careers@ecocapturesolutions.com
              </a>{' '}
              with subject: <em>Application – [Position Name]</em>
            </p>
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Apply Now</h2>
            <p className="text-gray-500 mt-2 text-sm">Tell us about yourself and the role you&apos;re interested in.</p>
          </div>
          <form action="mailto:careers@ecocapturesolutions.com" method="POST" encType="text/plain"
            className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
              <input type="text" name="name" required placeholder="Jane Uwimana"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input type="email" name="email" required placeholder="jane@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Position Applying For</label>
              <input type="text" name="position" required placeholder="e.g. Agricultural Field Officer"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell Us About Yourself</label>
              <textarea name="message" required rows={5} placeholder="Your background, motivation, and relevant experience…"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
            </div>
            <button type="submit" className="w-full bg-eco-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm hover:shadow-md">
              Send Application
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
