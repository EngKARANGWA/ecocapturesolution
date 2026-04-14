import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Latest news, milestones, and partnerships from EcoCapture Solutions Ltd - including our FasterCapital funding, Rwanda biochar plant launch, Unipod greenhouse partnership, and Tony Elumelu Foundation recognition.',
  keywords: [
    'EcoCapture news',
    'climate tech Rwanda news',
    'FasterCapital EcoCapture',
    'Tony Elumelu Foundation 2025',
    'biochar Rwanda news',
    'CO2 capture Africa news',
  ],
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'EcoCapture News & Updates',
    description:
      'Latest milestones and partnerships from EcoCapture Solutions Ltd - Rwanda climate tech.',
    url: '/news',
    images: [{ url: '/assets/hero/hero-ecocapture-new.png', width: 1200, height: 630, alt: 'EcoCapture news' }],
  },
};

const articles = [
  {
    title: "EcoCapture Accepted into FasterCapital's EquityPilot Program",
    body: "EcoCapture Solutions Ltd has been accepted into the EquityPilot program of FasterCapital and is seeking a capital of $150,000 to scale up its CO₂ capture and AgriCarbon greenhouse projects. This milestone strengthens our efforts to expand sustainable carbon capture technology across East Africa and accelerate the transition toward a greener economy.",
    date: 'October 2025',
    tag: 'Funding',
    featured: true,
    link: 'https://www.fastercapital.com',
    linkLabel: 'FasterCapital',
  },
  {
    title: "EcoCapture Launches Rwanda's First Circular Economy Biochar Plant",
    body: 'Our new facility in Kigali is turning agricultural waste into high-value biochar, supporting local farmers and reducing emissions.',
    date: 'August 2025',
    tag: 'Milestone',
  },
  {
    title: 'EcoCapture Partners with Unipod for Greenhouse CO₂ Enrichment',
    body: 'We are excited to announce a partnership with Unipod to deploy CO₂ enrichment technology in their greenhouses.',
    date: 'July 2025',
    tag: 'Partnership',
  },
  {
    title: 'Climate Tech Africa Summit: EcoCapture Solutions Ltd Featured',
    body: 'Our CEO, Kevin Iraguha, shared insights on affordable CO₂ capture at the 2025 summit in Nairobi.',
    date: 'June 2025',
    tag: 'Event',
  },
  {
    title: 'EcoCapture is among TEF 2025 contestants',
    body: 'We are proud to announce support from the Tony Elumelu Foundation to scale our CO₂ capture pilots in Rwanda.',
    date: 'April 2025',
    tag: 'Award',
  },
];

const tagColors: Record<string, string> = {
  Funding:     'bg-blue-100 text-blue-700',
  Milestone:   'bg-eco-light text-eco-dark',
  Partnership: 'bg-purple-100 text-purple-700',
  Event:       'bg-amber-100 text-amber-700',
  Award:       'bg-orange-100 text-orange-700',
};

export default function News() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHeader
        title="News & Updates"
        subtitle="Latest milestones, partnerships, and stories from EcoCapture."
      />

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Featured article */}
          <div className="bg-gradient-to-br from-eco-lighter to-eco-light border border-eco-primary/20 rounded-2xl p-8 mb-12 shadow-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-eco-primary rounded-l-2xl" />
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[featured.tag]}`}>
                {featured.tag}
              </span>
              <span className="bg-eco-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                {featured.date}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {featured.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {featured.body.replace('FasterCapital', '')}
              {featured.link && (
                <a href={featured.link} target="_blank" rel="noopener noreferrer"
                  className="text-eco-primary font-semibold hover:underline">
                  {featured.linkLabel}
                </a>
              )}.
            </p>
          </div>

          {/* Article grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((a) => (
              <article
                key={a.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[a.tag]}`}>
                    {a.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{a.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug mb-3 flex-1">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.body}</p>
              </article>
            ))}
          </div>

          {/* Intro note */}
          <div className="mt-14 bg-eco-light rounded-2xl p-7 text-center">
            <p className="text-eco-dark font-medium leading-relaxed text-sm">
              EcoCapture Solutions is proud to expand our farmer support program, delivering
              high-quality biochar-based fertilizers to communities across East Africa -
              making sustainable farming a reality for more households.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
