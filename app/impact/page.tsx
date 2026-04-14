import type { Metadata } from 'next';
import Image from 'next/image';
import { Wind, Leaf, Sprout, Users, Globe, DollarSign, TrendingUp, Zap, type LucideIcon } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Impact',
  description:
    "EcoCapture Solutions has captured 120+ tonnes of CO₂, grown 45,000+ plants, produced 18 tonnes of biochar, and supported 150+ farmers across East Africa — real impact, measurable results.",
  keywords: [
    'CO2 impact Africa',
    'carbon capture results',
    'biochar impact Rwanda',
    'farmer support East Africa',
    'climate impact Africa',
    'EcoCapture impact',
    'carbon neutral farming Rwanda',
  ],
  alternates: { canonical: '/impact' },
  openGraph: {
    title: 'EcoCapture Impact — 120t CO₂ Captured, 150+ Farmers Supported',
    description:
      '120+ tonnes of CO₂ captured, 45,000+ plants grown, 18 tonnes of biochar produced, 150+ farmers supported across East Africa.',
    url: '/impact',
    images: [{ url: '/assets/projects/farmer supported.png', width: 1200, height: 630, alt: 'Farmers supported by EcoCapture' }],
  },
};

interface Highlight {
  Icon: LucideIcon;
  img: string;
  alt: string;
  title: string;
  value: string;
  note: string;
  color: string;
  iconColor: string;
}

const highlights: Highlight[] = [
  {
    Icon: Wind,
    img: '/assets/projects/co2-capture.jpg',
    alt: 'CO₂ Captured',
    title: 'CO₂ Captured',
    value: '120 tonnes',
    note: 'Captured since 2023',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    Icon: Leaf,
    img: '/assets/projects/greenhouse.jpg',
    alt: 'Plants Grown',
    title: 'Plants Grown',
    value: '45,000+',
    note: 'Greenhouse crops supported',
    color: 'bg-eco-light border-eco-primary/10',
    iconColor: 'text-eco-primary',
  },
  {
    Icon: Sprout,
    img: '/assets/projects/biochar fertilizer.png',
    alt: 'Biochar Produced',
    title: 'Biochar Produced',
    value: '18 tonnes',
    note: 'Of biochar fertilizer',
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    Icon: Users,
    img: '/assets/projects/farmer supported.png',
    alt: 'Farmers Supported',
    title: 'Farmers Supported',
    value: '150+',
    note: 'Smallholder farmers',
    color: 'bg-orange-50 border-orange-100',
    iconColor: 'text-orange-500',
  },
];

export default function Impact() {
  return (
    <>
      <PageHeader title="Our Impact" subtitle="Real numbers, real lives changed - measuring our progress toward a carbon-neutral Africa." />

      {/* Stats band */}
      <section className="bg-eco-primary py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <AnimatedCounter target={120}   suffix="+"  label="Tonnes CO₂ Captured"  variant="light" />
          <AnimatedCounter target={45000} suffix="+"  label="Plants Grown"          variant="light" />
          <AnimatedCounter target={18}    suffix="t"  label="Biochar Produced"      variant="light" />
          <AnimatedCounter target={150}   suffix="+"  label="Farmers Supported"     variant="light" />
        </div>
      </section>

      {/* Highlight cards */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Breaking It Down</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Impact by the Numbers</h2>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className={`rounded-2xl border p-6 ${h.color} flex flex-col items-center text-center`}>
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-5">
                  <Image src={h.img} alt={h.alt} fill className="object-cover" />
                </div>
                <h.Icon className={`w-8 h-8 mb-2 ${h.iconColor}`} />
                <h3 className="font-bold text-gray-900 text-lg">{h.title}</h3>
                <p className="text-eco-primary font-bold text-2xl mt-1">{h.value}</p>
                <p className="text-gray-500 text-xs mt-1">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost efficiency + ROI */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-eco-primary text-sm font-semibold uppercase tracking-widest">Business Case</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Cost Efficiency & Return on Investment</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Our technology is not just good for the planet - it makes economic sense.</p>
            <div className="w-12 h-1 bg-eco-primary mx-auto mt-5 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-7">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Cost Efficiency</h3>
              <p className="text-3xl font-black text-eco-primary mb-2">~60%</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                lower operating cost compared to conventional CO₂ capture systems - achieved through modular design and local maintenance.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-7">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Return on Investment</h3>
              <p className="text-3xl font-black text-eco-primary mb-2">2–3×</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                estimated ROI for greenhouse operators deploying CO₂ enrichment, driven by higher yields and shorter harvest cycles.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-7">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Fertilizer Savings</h3>
              <p className="text-3xl font-black text-eco-primary mb-2">40%</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                reduction in chemical fertilizer spend for farmers using our biochar - improving margins for smallholder households.
              </p>
            </div>
          </div>

          <div className="bg-eco-dark text-white rounded-2xl p-8 text-center">
            <p className="text-green-200/70 text-xs font-bold uppercase tracking-widest mb-3"></p>
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              Every dollar invested in EcoCapture technology returns value in food production,
              carbon removal, and community economic growth.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-eco-lighter">
        <div className="max-w-3xl mx-auto text-center">
          <Globe className="w-16 h-16 text-eco-primary mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Building a Climate-Smart Africa</h2>
          <p className="text-gray-600 leading-relaxed">
            Every tonne of CO₂ we capture, every farmer we support, and every crop we help grow
            brings us closer to a carbon-neutral Africa. Our circular model means that impact
            compounds - captured CO₂ becomes fertilizer, which grows more crops, which generates
            more biomass, which creates more biochar.
          </p>
        </div>
      </section>
    </>
  );
}
