'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Briefcase, MapPin, Tag, Mail, X, Check, AlertCircle, User, ChevronDown, ChevronUp } from 'lucide-react';

import { getAuthHeaders } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://ecocapturesolution.onrender.com';

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
  openingId: string | null;
  openingTitle: string | null;
  data: Record<string, string>;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  submittedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new:        'bg-blue-100 text-blue-700',
  reviewed:   'bg-amber-100 text-amber-700',
  shortlisted:'bg-eco-light text-eco-dark',
  rejected:   'bg-red-100 text-red-500',
};

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const EMPTY: Omit<Opening, 'id' | 'createdAt'> = {
  title: '', type: 'Full-time', location: 'Kigali, Rwanda', desc: '', tags: [], status: 'open',
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

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl shadow-card-hover w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button type="button" onClick={onClose} title="Close" className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function CareersManagement() {
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [viewingAppsFor, setViewingAppsFor] = useState<string | null>(null);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Opening | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
  }

  async function load() {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch('/api/openings');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOpenings(data);
      } else {
        setFetchError(data?.error ?? 'Unexpected response from server');
        setOpenings([]);
      }
    } catch {
      setFetchError('Cannot reach server. Click Retry.');
      setOpenings([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function loadApplications() {
    setAppsLoading(true);
    try {
      const res = await fetch(`${API}/api/applications`, { headers: getAuthHeaders() });
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch {
      setApplications([]);
    } finally {
      setAppsLoading(false);
    }
  }
  useEffect(() => { loadApplications(); }, []);

  async function updateAppStatus(id: string, status: string) {
    await fetch(`${API}/api/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status }),
    });
    loadApplications();
  }

  function openAdd() {
    setForm(EMPTY);
    setTagsInput('');
    setEditing(null);
    setModal('add');
  }

  function openEdit(o: Opening) {
    setForm({ title: o.title, type: o.type, location: o.location, desc: o.desc, tags: o.tags, status: o.status });
    setTagsInput(o.tags.join(', '));
    setEditing(o);
    setModal('edit');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (modal === 'add') {
        await fetch(`${API}/api/openings`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify(payload) });
        showToast('Opening added successfully');
      } else if (editing) {
        await fetch(`${API}/api/openings/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify(payload) });
        showToast('Opening updated successfully');
      }
      await load();
      setModal(null);
    } catch {
      showToast('Something went wrong', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(o: Opening) {
    await fetch(`${API}/api/openings/${o.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status: o.status === 'open' ? 'closed' : 'open' }),
    });
    showToast(`Position ${o.status === 'open' ? 'closed' : 'reopened'}`);
    load();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`${API}/api/openings/${deleteId}`, { method: 'DELETE', headers: getAuthHeaders() });
    showToast('Opening deleted');
    setDeleteId(null);
    load();
  }

  const openCount   = openings.filter((o) => o.status === 'open').length;
  const closedCount = openings.filter((o) => o.status === 'closed').length;

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
          <p className="text-gray-500 text-sm mt-1">Post and manage job openings on the public careers page</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-eco-primary text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Opening
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Openings', value: openings.length, color: 'text-gray-900' },
          { label: 'Open',           value: openCount,       color: 'text-eco-primary' },
          { label: 'Closed',         value: closedCount,     color: 'text-red-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Openings list with inline applicants panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Job Openings</h2>
          {!appsLoading && (
            <div className="flex gap-2 text-xs font-semibold">
              <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                {applications.filter(a => a.status === 'new').length} new applications
              </span>
              <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                {applications.length} total
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : fetchError ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-red-500 text-sm">{fetchError}</p>
            <button type="button" onClick={load} className="px-4 py-2 bg-eco-primary text-white text-sm rounded-xl hover:bg-eco-dark transition-colors">Retry</button>
          </div>
        ) : openings.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">No openings yet. Add one above.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {openings.map((o) => {
              const apps = applications.filter(a => a.openingId === o.id);
              const newCount = apps.filter(a => a.status === 'new').length;
              const isPanelOpen = viewingAppsFor === o.id;

              return (
                <div key={o.id}>
                  {/* Opening row */}
                  <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Link
                          href={`/dashboard/careers/${o.id}`}
                          className="font-semibold text-gray-900 hover:text-eco-primary transition-colors no-underline"
                        >
                          {o.title}
                        </Link>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${o.status === 'open' ? 'bg-eco-light text-eco-dark' : 'bg-gray-100 text-gray-500'}`}>
                          {o.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{o.type}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{o.location}</span>
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{o.tags.join(', ')}</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{o.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Applicants button */}
                      <button
                        type="button"
                        onClick={() => setViewingAppsFor(isPanelOpen ? null : o.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          isPanelOpen
                            ? 'bg-eco-primary text-white border-eco-primary'
                            : 'bg-eco-light text-eco-dark border-eco-primary/20 hover:bg-eco-primary hover:text-white hover:border-eco-primary'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        {appsLoading ? '…' : `${apps.length} applicant${apps.length !== 1 ? 's' : ''}`}
                        {newCount > 0 && !isPanelOpen && (
                          <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                            {newCount} new
                          </span>
                        )}
                        {isPanelOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      <button type="button" onClick={() => toggleStatus(o)} title={o.status === 'open' ? 'Close position' : 'Reopen position'}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                        {o.status === 'open' ? <ToggleRight className="w-5 h-5 text-eco-primary" /> : <ToggleLeft className="w-5 h-5" />}
                      </button>
                      <button type="button" onClick={() => openEdit(o)} title="Edit opening"
                        className="p-2 rounded-lg hover:bg-eco-light transition-colors text-gray-400 hover:text-eco-primary">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => setDeleteId(o.id)} title="Delete opening"
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inline applicants panel */}
                  {isPanelOpen && (
                    <div className="border-t border-eco-primary/10 bg-gray-50/60">
                      {apps.length === 0 ? (
                        <div className="px-8 py-6 text-sm text-gray-400">No applications received for this position yet.</div>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {apps.map((app) => {
                            const name = app.data['Full Name'] ?? 'Unknown';
                            const email = app.data['Email Address'] ?? '';
                            const phone = app.data['Phone Number'] ?? '';
                            const coverLetter = app.data['Cover Letter / Message'] ?? '';
                            const isExpanded = expandedApp === app.id;
                            return (
                              <div key={app.id} className="px-8 py-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-9 h-9 rounded-full bg-eco-primary/10 flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-eco-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                      <span className="font-semibold text-gray-900 text-sm">{name}</span>
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[app.status] ?? 'bg-gray-100 text-gray-500'}`}>
                                        {app.status}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{email}{phone ? ` · ${phone}` : ''}</p>
                                    {!isExpanded && coverLetter && (
                                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{coverLetter}</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <select
                                      value={app.status}
                                      title="Update status"
                                      aria-label="Update application status"
                                      onChange={(e) => updateAppStatus(app.id, e.target.value)}
                                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary cursor-pointer"
                                    >
                                      <option value="new">New</option>
                                      <option value="reviewed">Reviewed</option>
                                      <option value="shortlisted">Shortlisted</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                    <button
                                      type="button"
                                      onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                                      className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-400 text-xs flex items-center gap-1"
                                    >
                                      {isExpanded ? <><ChevronUp className="w-3.5 h-3.5" /> Hide</> : <><ChevronDown className="w-3.5 h-3.5" /> View</>}
                                    </button>
                                  </div>
                                </div>

                                {isExpanded && (
                                  <div className="mt-3 ml-12 space-y-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                    {Object.entries(app.data).map(([key, val]) => (
                                      <div key={key}>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{key}</p>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{val}</p>
                                      </div>
                                    ))}
                                    <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                                      Submitted: {new Date(app.submittedAt).toLocaleString()}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Submissions info */}
      <div className="bg-eco-lighter border border-eco-primary/10 rounded-2xl p-5 flex items-start gap-3">
        <Mail className="w-5 h-5 text-eco-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-eco-dark">Received applications go to your email</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Applications submitted via the public careers page are sent to{' '}
            <a href="mailto:careers@ecocapturesolutions.com" className="text-eco-primary hover:underline">
              careers@ecocapturesolutions.com
            </a>
            {' '}via Formspree.
          </p>
        </div>
      </div>

      {/* Add / Edit modal */}
      {(modal === 'add' || modal === 'edit') && (
        <Modal title={modal === 'add' ? 'Add New Opening' : 'Edit Opening'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Agricultural Field Officer"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                <select
                  value={form.type}
                  title="Employment type"
                  aria-label="Employment type"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
                >
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  value={form.status}
                  title="Position status"
                  aria-label="Position status"
                  onChange={(e) => setForm({ ...form, status: e.target.value as 'open' | 'closed' })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Kigali, Rwanda"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                required
                rows={3}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                placeholder="Role description…"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Agriculture, Field Work, Community"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="flex-1 bg-eco-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors disabled:opacity-60">
                {saving ? 'Saving…' : modal === 'add' ? 'Add Opening' : 'Save Changes'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <Modal title="Delete Opening" onClose={() => setDeleteId(null)}>
          <p className="text-gray-600 text-sm mb-6">This will permanently remove the job opening. This action cannot be undone.</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => setDeleteId(null)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="button" onClick={handleDelete} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
