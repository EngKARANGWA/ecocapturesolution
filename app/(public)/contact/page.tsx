import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Globe, ExternalLink, MessageCircle, type LucideIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact EcoCapture Solutions Ltd - based at Norrseken Kigali, Rwanda. Reach us by phone (+250 781 392 398), email, or our contact form for partnerships, inquiries, and collaboration.',
  keywords: [
    'EcoCapture contact',
    'EcoCapture Kigali',
    'climate tech contact Rwanda',
    'carbon capture company Rwanda contact',
    'EcoCapture phone email',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact EcoCapture Solutions Ltd',
    description:
      'Get in touch with EcoCapture Solutions Ltd in Kigali, Rwanda - for partnerships, investments, and inquiries.',
    url: '/contact',
    images: [{ url: '/assets/hero/hero-ecocapture-new.png', width: 1200, height: 630, alt: 'Contact EcoCapture' }],
  },
};

interface InfoBlock {
  Icon: LucideIcon;
  title: string;
  lines: string[];
}

const infoBlocks: InfoBlock[] = [
  {
    Icon: MapPin,
    title: 'Office Address',
    lines: ['EcoCapture Solutions Ltd', 'Norrseken Kigali', 'Kigali, Rwanda'],
  },
  {
    Icon: Phone,
    title: 'Phone',
    lines: ['+250 781 392 398', 'WhatsApp available'],
  },
  {
    Icon: Mail,
    title: 'Email',
    lines: [
      'ecocapturesolutions@gmail.com',
      'info@ecocapturesolutions.com',
      'partnerships@ecocapturesolutions.com',
    ],
  },
  {
    Icon: Clock,
    title: 'Office Hours',
    lines: ['Mon – Fri: 9:00 AM – 5:00 PM', 'Saturday: By appointment', 'Sunday: Closed'],
  },
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'EcoCapture Solutions Ltd',
  image: 'https://ecocapturesolution.vercel.app/assets/logos/logo-ecocapture.png',
  url: 'https://ecocapturesolution.vercel.app',
  telephone: '+250-781-392-398',
  email: 'ecocapturesolutions@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Norrseken Kigali',
    addressLocality: 'Kigali',
    addressRegion: 'Kigali Province',
    addressCountry: 'RW',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -1.9441, longitude: 30.0619 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '17:00' },
  ],
  sameAs: ['https://www.linkedin.com/company/ecocapture-solutions-ltd/'],
  description: 'EcoCapture Solutions Ltd is a climate tech company in Kigali, Rwanda, specialising in CO₂ capture, greenhouse enrichment, and biochar fertilizer production for African farmers and industries.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecocapturesolution.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://ecocapturesolution.vercel.app/contact' },
  ],
};

export default function Contact() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHeader title="Contact Us" subtitle="Reach out for partnerships, product enquiries, media requests, or project collaboration." />

      <section className="py-4 sm:py-6 md:py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 sm:gap-10 lg:gap-14">

            {/* Left — info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact details</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {infoBlocks.map((b) => (
                  <div key={b.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                    <b.Icon className="w-6 h-6 text-eco-primary mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">{b.title}</h3>
                    {b.lines.map((l) => (
                      <p key={l} className="text-gray-600 text-sm break-all">{l}</p>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <a href="https://www.linkedin.com/company/ecocapture-solutions-ltd/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#0A66C2] text-white px-5 py-3 rounded-xl font-medium text-sm hover:bg-[#004182] transition-colors no-underline">
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </a>
                <a href="https://wa.me/250781392398" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl font-medium text-sm hover:bg-green-700 transition-colors no-underline">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <div className="mt-8 bg-eco-light rounded-3xl border border-eco-primary/10 p-5">
                <div className="flex items-center gap-2 mb-3 text-eco-primary font-semibold text-sm uppercase tracking-widest">
                  <Globe className="w-4 h-4" /> Find us
                </div>
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                  <iframe
                    title="EcoCapture location"
                    src="https://www.google.com/maps?q=Norrseken%20Kigali%20Rwanda&output=embed"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a message</h2>
              <form action="https://formspree.io/f/xeozdbad" method="POST" autoComplete="off" className="space-y-4 bg-white rounded-3xl border border-gray-100 shadow-card p-6 sm:p-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                  <input type="text" name="name" required placeholder="Jane Uwimana"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" name="email" required placeholder="jane@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" name="phone" required placeholder="+250 700 000 000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea name="message" required rows={5} placeholder="Tell us how we can help…"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white resize-y focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition" />
                </div>
                <button type="submit" className="w-full bg-eco-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm hover:shadow-md">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
