'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Briefcase, MapPin, Tag, Calendar, Users,
  Eye, X, ChevronDown, Check, AlertCircle, ToggleLeft, ToggleRight, Pencil,
} from 'lucide-react';

interface Opening {
  id: string;
  title: string;
  type: string;
  location: string;
  desc: string;
  tags: string[];
  status: 'open' | 'closed';
  createdAt: string;
}

interface Application {
  id: string;
  openingId: string;
  data: Record<string, string>;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  submittedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new:         'bg-blue-100 text-blue-700',
  reviewed:    'bg-amber-100 text-amber-700',
  shortlisted: 'bg-eco-light text-eco-dark',
  rejected:    'bg-red-100 text-red-500',
};

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 ${type === 'success' ? 'bg-eco-primary text-white' : 'bg-red-500 text-white'}`}>
      {type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </div>
  );
}

export default function OpeningDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [opening, setOpening] = useState<Opening | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
  }

  async function load() {
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/openings/${id}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Failed to load'); return; }
      setOpening(data.opening);
      setApplications(data.applications);
    } catch {
      setError('Cannot reach server.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, [id]);

  async function toggleStatus() {
    if (!opening) return;
    const next = opening.status === 'open' ? 'closed' : 'open';
    await fetch(`/api/openings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    showToast(`Position ${next === 'open' ? 'reopened' : 'closed'}`);
    load();
  }

  async function updateAppStatus(appId: string, status: string) {
    await fetch('/api/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: appId, status }),
    });
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: status as Application['status'] } : a));
    if (viewingApp?.id === appId) setViewingApp(prev => prev ? { ...prev, status: status as Application['status'] } : null);
    showToast('Status updated');
  }

  const newCount = applications.filter(a => a.status === 'new').length;
  const shortlistedCount = applications.filter(a => a.status === 'shortlisted').length;

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center text-gray-400 text-sm">
        Loading position…
      </div>
    );
  }

  if (error || !opening) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-sm">{error || 'Opening not found'}</p>
        <button onClick={() => router.back()} className="text-eco-primary text-sm hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">

      {/* Back + Header */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-eco-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to openings
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{opening.title}</h1>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${opening.status === 'open' ? 'bg-eco-light text-eco-dark' : 'bg-gray-100 text-gray-500'}`}>
                {opening.status === 'open' ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-eco-primary" />{opening.type}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-eco-primary" />{opening.location}</span>
              <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-eco-primary" />{opening.tags?.join(', ')}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-eco-primary" />
                Posted {new Date(opening.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleStatus}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {opening.status === 'open'
                ? <><ToggleRight className="w-4 h-4 text-eco-primary" /> Close position</>
                : <><ToggleLeft className="w-4 h-4" /> Reopen position</>}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/dashboard/careers`)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-eco-primary text-white text-sm font-semibold hover:bg-eco-dark transition-colors"
            >
              <Pencil className="w-4 h-4" /> Edit in list
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        <h2 className="font-bold text-gray-900 mb-3">Position Description</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{opening.desc}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Applicants', value: applications.length, color: 'text-gray-900' },
          { label: 'New',             value: newCount,             color: 'text-blue-600' },
          { label: 'Shortlisted',     value: shortlistedCount,     color: 'text-eco-primary' },
          { label: 'Reviewed',        value: applications.filter(a => a.status === 'reviewed').length, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <Users className="w-5 h-5 text-eco-primary" />
          <h2 className="font-bold text-gray-900">Applicants</h2>
          {newCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {newCount} new
            </span>
          )}
        </div>

        {applications.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">No applications received yet for this position.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Applicant</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date Applied</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map((app) => {
                  const name  = app.data['Full Name']      ?? '—';
                  const email = app.data['Email Address']  ?? '—';
                  const phone = app.data['Phone Number']   ?? '—';
                  return (
                    <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Applicant */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-eco-light flex items-center justify-center shrink-0 text-eco-primary font-bold text-sm">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900">{name}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{email}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{phone}</p>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {new Date(app.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>

                      {/* Status dropdown */}
                      <td className="px-6 py-4">
                        <div className="relative inline-flex items-center gap-1">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[app.status] ?? 'bg-gray-100 text-gray-500'}`}>
                            {app.status}
                          </span>
                          <select
                            value={app.status}
                            title="Change status"
                            aria-label="Change application status"
                            onChange={(e) => updateAppStatus(app.id, e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </td>

                      {/* View button */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => setViewingApp(app)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-eco-light text-eco-dark text-xs font-semibold hover:bg-eco-primary hover:text-white transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Applicant detail modal */}
      {viewingApp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-2xl shadow-card-hover w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            <div className="h-2 bg-eco-primary shrink-0" />

            {/* Modal header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {viewingApp.data['Full Name'] ?? 'Applicant'}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Applied {new Date(viewingApp.submittedAt).toLocaleString()}
                </p>
              </div>
              <button type="button" onClick={() => setViewingApp(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status bar */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-3 shrink-0">
              <span className="text-xs font-medium text-gray-500">Status:</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[viewingApp.status] ?? 'bg-gray-100 text-gray-500'}`}>
                {viewingApp.status}
              </span>
              <select
                value={viewingApp.status}
                title="Update status"
                aria-label="Update application status"
                onChange={(e) => updateAppStatus(viewingApp.id, e.target.value)}
                className="ml-auto text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary cursor-pointer"
              >
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* All fields */}
            <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
              {Object.entries(viewingApp.data).map(([key, val]) => (
                <div key={key} className="px-6 py-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{key}</p>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{val}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end shrink-0">
              <button type="button" onClick={() => setViewingApp(null)}
                className="px-5 py-2.5 rounded-full bg-eco-primary text-white text-sm font-semibold hover:bg-eco-dark transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
