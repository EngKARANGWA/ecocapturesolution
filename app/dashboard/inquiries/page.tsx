'use client';

import { useState, useEffect } from 'react';
import { Mail, User, ChevronDown, ChevronUp, Trash2, Check, AlertCircle, Inbox } from 'lucide-react';

import { getAuthHeaders } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://ecocapturesolution.onrender.com';

interface Inquiry {
  id: string;
  data: Record<string, string>;
  status: 'new' | 'read' | 'archived';
  submittedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new:      'bg-blue-100 text-blue-700',
  read:     'bg-gray-100 text-gray-500',
  archived: 'bg-eco-light text-eco-dark',
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

function ConfirmModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl shadow-card-hover w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function InquiriesManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
  }

  async function load() {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`${API}/api/inquiries`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      } else {
        setFetchError(data?.error ?? 'Unexpected response from server');
        setInquiries([]);
      }
    } catch {
      setFetchError('Cannot reach server. Click Retry.');
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`${API}/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`${API}/api/inquiries/${deleteId}`, { method: 'DELETE', headers: getAuthHeaders() });
    showToast('Inquiry removed');
    setDeleteId(null);
    load();
  }

  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const archivedCount = inquiries.filter((i) => i.status === 'archived').length;

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Partnership Inquiries</h1>
        <p className="text-gray-500 text-sm mt-1">Organisations that reached out through the public partner form</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Inquiries', value: inquiries.length, color: 'text-gray-900' },
          { label: 'New',             value: newCount,         color: 'text-blue-600' },
          { label: 'Archived',        value: archivedCount,    color: 'text-eco-primary' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Inquiries list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Inbox</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : fetchError ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-red-500 text-sm">{fetchError}</p>
            <button type="button" onClick={load} className="px-4 py-2 bg-eco-primary text-white text-sm rounded-xl hover:bg-eco-dark transition-colors">Retry</button>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-3">
            <Inbox className="w-8 h-8 text-gray-200" />
            No inquiries yet. Submissions from the &quot;Partner With Us&quot; form will show up here.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {inquiries.map((inq) => {
              const entries = Object.entries(inq.data);
              const findEntry = (re: RegExp) => entries.find(([key]) => re.test(key));
              const primary = findEntry(/name/i) ?? entries[0] ?? ['', ''];
              const secondary = findEntry(/email|website|contact|phone/i) ?? entries.find((e) => e[0] !== primary[0]) ?? ['', ''];
              const [, primaryValue] = primary;
              const [secondaryLabel, secondaryValue] = secondary;
              const isExpanded = expanded === inq.id;

              return (
                <div key={inq.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-eco-primary/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-eco-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-semibold text-gray-900 text-sm">{primaryValue || 'Untitled inquiry'}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[inq.status] ?? 'bg-gray-100 text-gray-500'}`}>
                          {inq.status}
                        </span>
                      </div>
                      {secondaryValue && (
                        <p className="text-xs text-gray-500">{secondaryLabel}: {secondaryValue}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Submitted {new Date(inq.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={inq.status}
                        title="Update status"
                        aria-label="Update inquiry status"
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary cursor-pointer"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : inq.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 text-xs flex items-center gap-1"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(inq.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 ml-12 space-y-3 bg-gray-50/60 rounded-xl p-4 border border-gray-100">
                      {entries.map(([key, val]) => (
                        <div key={key}>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{key}</p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{val}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-eco-lighter border border-eco-primary/10 rounded-2xl p-5 flex items-start gap-3">
        <Mail className="w-5 h-5 text-eco-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-eco-dark">Inquiries also arrive by email</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Every submission is also sent to{' '}
            <a href="mailto:partnerships@ecocapturesolutions.com" className="text-eco-primary hover:underline">
              partnerships@ecocapturesolutions.com
            </a>
          </p>
        </div>
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <ConfirmModal title="Remove Inquiry" onClose={() => setDeleteId(null)}>
          <p className="text-gray-600 text-sm mb-6">This will permanently remove the inquiry. This action cannot be undone.</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => setDeleteId(null)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="button" onClick={handleDelete} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors">
              Remove
            </button>
          </div>
        </ConfirmModal>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
