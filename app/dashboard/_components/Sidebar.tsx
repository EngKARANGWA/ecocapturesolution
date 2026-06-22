'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Handshake,
  FileSliders,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const navItems = [
  { href: '/dashboard',          label: 'Overview',      icon: LayoutDashboard },
  { href: '/dashboard/careers',  label: 'Applications',  icon: Briefcase },
  { href: '/dashboard/partners', label: 'Partners',      icon: Handshake },
  { href: '/dashboard/forms',    label: 'Form Builder',  icon: FileSliders },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch(`${API}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    router.push('/login');
    router.refresh();
  }

  return (
    <aside className="w-64 bg-eco-dark text-white flex flex-col min-h-screen shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logos/logo-ecocapture.png"
            alt="EcoCapture"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <div>
            <p className="font-bold text-sm leading-tight">EcoCapture</p>
            <p className="text-green-300 text-xs">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                isActive
                  ? 'bg-eco-primary text-white'
                  : 'text-green-100/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer links */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-green-100/60 hover:bg-white/10 hover:text-white transition-all no-underline"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          View Public Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300/70 hover:bg-red-500/20 hover:text-red-200 transition-all text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
