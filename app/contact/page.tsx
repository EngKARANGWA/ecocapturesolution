import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, type LucideIcon } from 'lucide-react';
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
      <PageHeader title="Contact Us" subtitle="Whether you're a farmer, investor, partner, or climate enthusiast - we'd love to hear from you." />

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Left — info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {infoBlocks.map((b) => (
                  <div key={b.title} className="bg-eco-lighter rounded-2xl p-5 border border-gray-100">
                    <b.Icon className="w-6 h-6 text-eco-primary mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">{b.title}</h3>
                    {b.lines.map((l) => (
                      <p key={l} className="text-gray-600 text-sm break-all">{l}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* LinkedIn */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <a
                  href="https://www.linkedin.com/company/ecocapture-solutions-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#0A66C2] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#004182] transition-colors no-underline"
                >
                  <Image src="/assets/projects/linkedin.jpg" alt="LinkedIn" width={24} height={24} className="rounded w-6 h-6 object-cover" />
                  EcoCapture on LinkedIn
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h2>
              <form action="https://formspree.io/f/xeozdbad" method="POST" autoComplete="off" className="space-y-5">
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
