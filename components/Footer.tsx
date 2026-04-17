import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

const companyLinks = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About Us' },
  { href: '/technology',  label: 'Technology' },
  { href: '/solutions',   label: 'Solutions' },
  { href: '/projects',    label: 'Projects & Pilots' },
  { href: '/impact',      label: 'Impact' },
  { href: '/news',        label: 'News & Updates' },
];

const getInvolved = [
  { href: '/careers', label: 'Careers' },
  { href: '/partner', label: 'Partner With Us' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Footer() {
  return (
    <footer className="relative bg-eco-dark text-white">

      {/* Wave top — white page content curves into the green footer */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 no-underline group">
              <Image src="/assets/logos/logo-ecocapture.png" alt="EcoCapture" width={42} height={42} className="rounded-xl" />
              <span className="font-bold text-xl text-white group-hover:text-green-200 transition-colors">
                EcoCapture Solutions Ltd
              </span>
            </Link>
            <p className="text-green-200 text-sm leading-relaxed max-w-sm mb-6">
              Turning CO₂ into opportunity for Africa&apos;s future. Affordable carbon capture
              for agriculture, industry, and climate action - built in Africa, for Africa.
            </p>
            <a
              href="https://www.linkedin.com/company/ecocapture-solutions-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors no-underline"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Follow on LinkedIn
            </a>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-xs uppercase tracking-widest">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-green-200 hover:text-white text-sm transition-colors no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved + Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-xs uppercase tracking-widest">Get Involved</h3>
            <ul className="space-y-3 mb-7">
              {getInvolved.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-green-200 hover:text-white text-sm transition-colors no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mb-3 text-xs uppercase tracking-widest">Contact</h3>
            <div className="space-y-2 text-green-200 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                Kigali, Rwanda
              </p>
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                +250 781 392 398
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="break-all">ecocapturesolutions@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-green-300 text-sm">&copy; 2025 EcoCapture Solutions Ltd. All rights reserved.</p>
          <p className="text-green-500 text-xs">Proudly building climate tech in Africa for Africa.</p>
        </div>
      </div>
    </footer>
  );
}
