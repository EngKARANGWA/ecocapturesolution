import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { getNewsItems } from '@/lib/site-content';

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

const tagColors: Record<string, string> = {
  'Company Update': 'bg-eco-light text-eco-dark',
  Projects: 'bg-blue-100 text-blue-700',
  Partnerships: 'bg-amber-100 text-amber-700',
  Events: 'bg-orange-100 text-orange-700',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'News & Updates', item: 'https://ecocapturesolution.vercel.app/news' },
  ],
};

export default async function News() {
  const articles = await getNewsItems();
  const [featured, ...rest] = articles;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader
        title="News & Updates"
        subtitle="Latest milestones, partnerships, and stories from EcoCapture."
      />

      <section className="py-4 sm:py-6 md:py-8 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Featured article */}
          <div className="bg-gradient-to-br from-eco-lighter to-eco-light border border-eco-primary/20 rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 shadow-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-eco-primary rounded-l-2xl" />
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                {featured.category}
              </span>
              <span className="bg-eco-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                {featured.date}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {featured.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {featured.body.replace('FasterCapital', '')}
              .
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
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[a.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {a.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{a.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug mb-3 flex-1">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.body}</p>
              </article>
            ))}
          </div>

          {/* Intro note */}
          <div className="mt-8 bg-eco-light rounded-2xl p-6 text-center">
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
