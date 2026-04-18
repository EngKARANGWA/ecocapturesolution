'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About' },
  { href: '/technology',  label: 'Technology' },
  { href: '/solutions',   label: 'Solutions' },
  { href: '/projects',    label: 'Projects' },
  { href: '/impact',      label: 'Impact' },
  { href: '/news',        label: 'News' },
  { href: '/careers',     label: 'Careers' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 no-underline group">
            <Image src="/assets/logos/logo-ecocapture.png" alt="EcoCapture" width={36} height={36} className="rounded-lg" />
            <span className="font-bold text-eco-dark text-base tracking-tight hidden sm:block group-hover:text-eco-primary transition-colors">
              EcoCapture
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  pathname === href
                    ? 'bg-eco-light text-eco-primary font-semibold'
                    : 'text-gray-600 hover:text-eco-primary hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/partner"
              className={`hidden lg:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all no-underline shadow-sm ${
                pathname === '/partner'
                  ? 'bg-eco-dark text-white'
                  : 'bg-eco-primary text-white hover:bg-eco-dark hover:shadow-md'
              }`}
            >
              Partner With Us
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 space-y-0.5 pb-4">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                  pathname === href
                    ? 'bg-eco-light text-eco-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-eco-primary'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 px-4">
              <Link
                href="/partner"
                className="block text-center bg-eco-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-eco-dark transition-colors no-underline"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
