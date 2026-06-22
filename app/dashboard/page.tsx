import {
  Wind,
  Leaf,
  Sprout,
  Users,
  TrendingUp,
  DollarSign,
  Zap,
  ArrowUpRight,
  MapPin,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    label: 'CO₂ Captured',
    value: '120+',
    unit: 'tonnes',
    icon: Wind,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    trend: '+12t this month',
    trendUp: true,
  },
  {
    label: 'Plants Grown',
    value: '45,000+',
    unit: 'plants',
    icon: Leaf,
    color: 'text-eco-primary',
    bg: 'bg-eco-light',
    border: 'border-eco-primary/10',
    trend: '+3,200 this season',
    trendUp: true,
  },
  {
    label: 'Biochar Produced',
    value: '18',
    unit: 'tonnes',
    icon: Sprout,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    trend: '+2t this month',
    trendUp: true,
  },
  {
    label: 'Farmers Supported',
    value: '150+',
    unit: 'farmers',
    icon: Users,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    trend: '+18 this quarter',
    trendUp: true,
  },
];

const performance = [
  { label: 'Cost Efficiency vs Global Average', value: '~60%', sub: 'lower operating cost', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Greenhouse ROI for Partners',       value: '2-3×', sub: 'return on investment',  icon: TrendingUp,  color: 'text-blue-600',  bg: 'bg-blue-50'  },
  { label: 'Fertilizer Savings for Farmers',    value: '40%',  sub: 'less chemical spend',   icon: Zap,         color: 'text-amber-600', bg: 'bg-amber-50' },
];

const recentNews = [
  { title: "Accepted into FasterCapital's EquityPilot Program", tag: 'Funding',     date: 'Oct 2025' },
  { title: "Rwanda's First Circular Economy Biochar Plant Launched", tag: 'Milestone', date: 'Aug 2025' },
  { title: 'Partnership with Unipod for Greenhouse CO₂ Enrichment', tag: 'Partnership', date: 'Jul 2025' },
  { title: 'Featured at Climate Tech Africa Summit - Nairobi',       tag: 'Event',     date: 'Jun 2025' },
];

const tagColors: Record<string, string> = {
  Funding:     'bg-blue-100 text-blue-700',
  Milestone:   'bg-eco-light text-eco-dark',
  Partnership: 'bg-eco-light text-eco-dark',
  Event:       'bg-amber-100 text-amber-700',
  Award:       'bg-orange-100 text-orange-700',
};

const quickLinks = [
  { label: 'View Impact Page',    href: '/impact',    desc: 'Public impact numbers' },
  { label: 'View Projects',       href: '/projects',  desc: 'Karongi pilot & more' },
  { label: 'View News',           href: '/news',      desc: 'All announcements' },
  { label: 'View Career Openings',href: '/careers',   desc: '3 open positions' },
  { label: 'View Partners',       href: '/partner',   desc: 'Partnership opportunities' },
  { label: 'Contact Page',        href: '/contact',   desc: 'Reach the team' },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">EcoCapture Solutions Ltd Kigali, Rwanda</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm shrink-0">
          <Calendar className="w-3.5 h-3.5" />
          Last updated: October 2025
        </div>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Key Impact Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className={`bg-white rounded-2xl border ${s.border} p-5 shadow-card`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${s.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                  <TrendingUp className="w-3 h-3" />
                  {s.trend}
                </span>
              </div>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.unit}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent News */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent News</h2>
            <Link href="/news" className="text-xs text-eco-primary font-semibold hover:text-eco-dark transition-colors no-underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentNews.map((n) => (
              <div key={n.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5 ${tagColors[n.tag]}`}>
                  {n.tag}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Business Performance</h2>
          <div className="space-y-4">
            {performance.map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center shrink-0`}>
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <div>
                  <p className={`text-xl font-black ${p.color}`}>{p.value}</p>
                  <p className="text-xs text-gray-500 leading-tight">{p.sub}</p>
                  <p className="text-xs text-gray-400">{p.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Active Pilot */}
        <div className="bg-eco-dark text-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">Active Pilot</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Karongi Pilot</h3>
          <p className="text-green-200 text-sm leading-relaxed mb-4">
            Africa's first integrated carbon-to-agriculture loop CO₂ capture, greenhouse enrichment, and biochar production.
          </p>
          <div className="space-y-2 text-sm text-green-200/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-green-400 shrink-0" />
              Karongi District, Western Province
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-green-400 shrink-0" />
              Launched 2023 - ongoing
            </div>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-white border-b border-white/40 hover:border-white pb-0.5 transition-colors no-underline"
          >
            View project details <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Quick Links</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickLinks.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-eco-primary/30 hover:bg-eco-light/50 transition-all no-underline group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-eco-primary transition-colors">{q.label}</p>
                  <p className="text-xs text-gray-400">{q.desc}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-eco-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
