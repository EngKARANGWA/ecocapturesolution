import {
  Wind, Leaf, Sprout, Users, TrendingUp, DollarSign, Zap,
  ArrowUpRight, MapPin, Calendar, Briefcase, Handshake,
  FileText, UserCheck, UserX, Clock, CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import sql from '@/lib/db';

export const revalidate = 0;

const impactStats = [
  { label: 'CO₂ Captured',      value: '120+',    unit: 'tonnes',  icon: Wind,   color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100',       trend: '+12t this month'     },
  { label: 'Plants Grown',       value: '45,000+', unit: 'plants',  icon: Leaf,   color: 'text-eco-primary', bg: 'bg-eco-light', border: 'border-eco-primary/10', trend: '+3,200 this season'  },
  { label: 'Biochar Produced',   value: '18',      unit: 'tonnes',  icon: Sprout, color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-100',      trend: '+2t this month'      },
  { label: 'Farmers Supported',  value: '150+',    unit: 'farmers', icon: Users,  color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100',     trend: '+18 this quarter'    },
];

const performance = [
  { label: 'Cost Efficiency vs Global Average', value: '~60%', sub: 'lower operating cost', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Greenhouse ROI for Partners',       value: '2-3×', sub: 'return on investment',  icon: TrendingUp, color: 'text-blue-600',  bg: 'bg-blue-50'  },
  { label: 'Fertilizer Savings for Farmers',    value: '40%',  sub: 'less chemical spend',   icon: Zap,        color: 'text-amber-600', bg: 'bg-amber-50' },
];

const recentNews = [
  { title: "Accepted into FasterCapital's EquityPilot Program",        tag: 'Funding',     date: 'Oct 2025' },
  { title: "Rwanda's First Circular Economy Biochar Plant Launched",    tag: 'Milestone',   date: 'Aug 2025' },
  { title: 'Partnership with Unipod for Greenhouse CO₂ Enrichment',    tag: 'Partnership', date: 'Jul 2025' },
  { title: 'Featured at Climate Tech Africa Summit - Nairobi',          tag: 'Event',       date: 'Jun 2025' },
];

const tagColors: Record<string, string> = {
  Funding:     'bg-blue-100 text-blue-700',
  Milestone:   'bg-eco-light text-eco-dark',
  Partnership: 'bg-eco-light text-eco-dark',
  Event:       'bg-amber-100 text-amber-700',
};

const APP_STATUS_ICON: Record<string, React.ElementType> = {
  new:         Clock,
  reviewed:    FileText,
  shortlisted: UserCheck,
  rejected:    UserX,
};
const APP_STATUS_COLOR: Record<string, string> = {
  new:         'bg-blue-100 text-blue-700',
  reviewed:    'bg-amber-100 text-amber-700',
  shortlisted: 'bg-eco-light text-eco-dark',
  rejected:    'bg-red-100 text-red-500',
};

export default async function DashboardPage() {
  // ── Live DB counts ──────────────────────────────────────────────
  let totalApps = 0, newApps = 0, shortlisted = 0;
  let openPositions = 0, closedPositions = 0;
  let activePartners = 0, totalPartners = 0;
  let recentApps: { id: string; data: Record<string, string>; status: string; submittedAt: string; openingTitle: string | null }[] = [];

  try {
    const [appCounts, openingCounts, partnerCounts, latestApps] = await Promise.all([
      sql`SELECT
            COUNT(*)                                          AS total,
            COUNT(*) FILTER (WHERE status = 'new')           AS new,
            COUNT(*) FILTER (WHERE status = 'shortlisted')   AS shortlisted
          FROM applications`,
      sql`SELECT
            COUNT(*) FILTER (WHERE status = 'open')   AS open,
            COUNT(*) FILTER (WHERE status = 'closed') AS closed
          FROM openings`,
      sql`SELECT
            COUNT(*)                                          AS total,
            COUNT(*) FILTER (WHERE status = 'active')        AS active
          FROM partners`,
      sql`SELECT a.id, a.data, a.status, a.submitted_at AS "submittedAt", o.title AS "openingTitle"
          FROM applications a
          LEFT JOIN openings o ON o.id = a.opening_id
          ORDER BY a.submitted_at DESC
          LIMIT 5`,
    ]);

    totalApps      = Number(appCounts[0].total);
    newApps        = Number(appCounts[0].new);
    shortlisted    = Number(appCounts[0].shortlisted);
    openPositions  = Number(openingCounts[0].open);
    closedPositions= Number(openingCounts[0].closed);
    activePartners = Number(partnerCounts[0].active);
    totalPartners  = Number(partnerCounts[0].total);
    recentApps     = latestApps as typeof recentApps;
  } catch {
    // DB unavailable — show zeros
  }

  const liveStats = [
    {
      label: 'Applications',
      value: totalApps,
      sub: `${newApps} new · ${shortlisted} shortlisted`,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      href: '/dashboard/careers',
      badge: newApps > 0 ? `${newApps} new` : null,
      badgeColor: 'bg-blue-500',
    },
    {
      label: 'Open Positions',
      value: openPositions,
      sub: `${closedPositions} closed`,
      icon: Briefcase,
      color: 'text-eco-primary',
      bg: 'bg-eco-light',
      border: 'border-eco-primary/10',
      href: '/dashboard/careers',
      badge: null,
      badgeColor: '',
    },
    {
      label: 'Active Partners',
      value: activePartners,
      sub: `${totalPartners} total`,
      icon: Handshake,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      href: '/dashboard/partners',
      badge: null,
      badgeColor: '',
    },
    {
      label: 'Shortlisted',
      value: shortlisted,
      sub: 'ready for interview',
      icon: UserCheck,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100',
      href: '/dashboard/careers',
      badge: null,
      badgeColor: '',
    },
  ];

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">EcoCapture Solutions Ltd · Kigali, Rwanda</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm shrink-0">
          <Calendar className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* ── Live platform stats ── */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Platform Activity</h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {liveStats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className={`bg-white rounded-2xl border ${s.border} p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all no-underline group relative`}
            >
              {s.badge && (
                <span className={`absolute top-3 right-3 ${s.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                  {s.badge}
                </span>
              )}
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className={`text-4xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent Applications + Impact ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent applications feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Applications</h2>
            <Link href="/dashboard/careers" className="text-xs text-eco-primary font-semibold hover:text-eco-dark transition-colors no-underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {recentApps.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-sm">No applications yet.</div>
          ) : (
            <div className="space-y-2">
              {recentApps.map((app) => {
                const name  = app.data['Full Name']     ?? 'Unknown';
                const email = app.data['Email Address'] ?? '';
                const StatusIcon = APP_STATUS_ICON[app.status] ?? FileText;
                return (
                  <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-eco-light flex items-center justify-center shrink-0 text-eco-primary font-bold text-sm">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-tight truncate">{name}</p>
                      <p className="text-xs text-gray-400 truncate">{app.openingTitle ?? email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize flex items-center gap-1 ${APP_STATUS_COLOR[app.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        <StatusIcon className="w-3 h-3" />
                        {app.status}
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:block">
                        {new Date(app.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Business Performance */}
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

      {/* ── Impact Metrics ── */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Key Impact Metrics</h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {impactStats.map((s) => (
            <div key={s.label} className={`bg-white rounded-2xl border ${s.border} p-5 shadow-card`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <span className="text-xs font-semibold flex items-center gap-1 text-green-600">
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

        {/* Active Pilot */}
        <div className="bg-eco-dark text-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">Active Pilot</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Karongi Pilot</h3>
          <p className="text-green-200 text-sm leading-relaxed mb-4">
            Africa&apos;s first integrated carbon-to-agriculture loop — CO₂ capture, greenhouse enrichment, and biochar production.
          </p>
          <div className="space-y-2 text-sm text-green-200/80">
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-green-400 shrink-0" />Karongi District, Western Province</div>
            <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-green-400 shrink-0" />Launched 2023 – ongoing</div>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-white border-b border-white/40 hover:border-white pb-0.5 transition-colors no-underline">
            View project details <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

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
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5 ${tagColors[n.tag]}`}>{n.tag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick shortcuts ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Manage Applications', href: '/dashboard/careers',  desc: `${totalApps} total · ${newApps} new`,     icon: FileText,   color: 'text-blue-600',    bg: 'bg-blue-50'  },
          { label: 'Manage Partners',     href: '/dashboard/partners', desc: `${activePartners} active partners`,        icon: Handshake,  color: 'text-amber-600',   bg: 'bg-amber-50' },
          { label: 'Form Builder',        href: '/dashboard/forms',    desc: 'Edit public forms',                        icon: CheckCircle2,color: 'text-eco-primary', bg: 'bg-eco-light'},
          { label: 'View Public Site',    href: '/',                   desc: 'See live website',                         icon: ArrowUpRight,color: 'text-gray-600',   bg: 'bg-gray-100' },
        ].map((q) => (
          <Link key={q.href} href={q.href}
            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-card hover:border-eco-primary/30 hover:bg-eco-light/40 transition-all no-underline group">
            <div className={`w-9 h-9 rounded-xl ${q.bg} flex items-center justify-center shrink-0`}>
              <q.icon className={`w-4 h-4 ${q.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-eco-primary transition-colors leading-tight">{q.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{q.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
