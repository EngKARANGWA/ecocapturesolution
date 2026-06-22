'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import {
  Plus, Pencil, Trash2, ExternalLink, Mail, X, Check, AlertCircle, Globe,
  Building2, Link2, Image as ImageIcon, Layers, ToggleLeft as StatusIcon, ChevronDown,
} from 'lucide-react';

import { getAuthHeaders } from '@/lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://ecocapturesolution.onrender.com';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  type: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const PARTNER_TYPES = ['NGO & Donor', 'Investor', 'Greenhouse Operator', 'Industry', 'Research', 'Technology'];
const EMPTY: Omit<Partner, 'id' | 'createdAt'> = {
  name: '', logo: '', website: '', type: 'NGO & Donor', status: 'active',
};

/* ── Toast ── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 ${type === 'success' ? 'bg-eco-primary text-white' : 'bg-red-500 text-white'}`}>
      {type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </div>
  );
}

/* ── Confirm-only modal (delete) ── */
function ConfirmModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl shadow-card-hover w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ── Google-Forms-style partner modal ── */
interface FormField {
  num: number;
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  hint?: string;
  content: React.ReactNode;
}

function PartnerFormModal({
  mode, form, saving, onClose, onSubmit, onChange,
}: {
  mode: 'add' | 'edit';
  form: Omit<Partner, 'id' | 'createdAt'>;
  saving: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  onChange: (patch: Partial<Omit<Partner, 'id' | 'createdAt'>>) => void;
}) {
  const inputCls = 'w-full px-4 py-3 border-b-2 border-gray-200 focus:border-eco-primary bg-gray-50 rounded-t-lg text-sm focus:outline-none focus:bg-white transition-all';
  const selectCls = inputCls + ' appearance-none cursor-pointer';

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState('');

  async function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setUploadErr('');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) onChange({ logo: data.url });
      else setUploadErr(data.error ?? 'Upload failed');
    } catch {
      setUploadErr('Upload failed. Try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  const fields: FormField[] = [
    {
      num: 1, icon: <Building2 className="w-4 h-4" />, label: 'Organisation Name', required: true,
      content: (
        <input required value={form.name} onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Tony Elumelu Foundation" className={inputCls} />
      ),
    },
    {
      num: 2, icon: <Link2 className="w-4 h-4" />, label: 'Website URL',
      content: (
        <input type="url" value={form.website} onChange={(e) => onChange({ website: e.target.value })}
          placeholder="https://example.com" className={inputCls} />
      ),
    },
    {
      num: 3, icon: <ImageIcon className="w-4 h-4" />, label: 'Partner Logo',
      content: (
        <div className="space-y-3">
          {/* Preview */}
          {form.logo && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.logo} alt="Logo preview" className="w-12 h-12 object-contain rounded-lg bg-white border border-gray-100 p-1" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{form.logo.split('/').pop()}</p>
                <p className="text-xs text-gray-400 mt-0.5">Current logo</p>
              </div>
              <button type="button" onClick={() => onChange({ logo: '' })}
                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                <X className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          )}

          {/* File picker button */}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFilePick} />
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 hover:border-eco-primary text-sm font-medium text-gray-500 hover:text-eco-primary transition-colors w-full justify-center disabled:opacity-50">
            <ImageIcon className="w-4 h-4" />
            {uploading ? 'Uploading…' : 'Browse from device'}
          </button>

          {uploadErr && <p className="text-xs text-red-500">{uploadErr}</p>}

          {/* Manual URL fallback */}
          <div>
            <p className="text-xs text-gray-400 mb-1.5">Or paste a URL / path</p>
            <input value={form.logo} onChange={(e) => onChange({ logo: e.target.value })}
              placeholder="https://example.com/logo.png or /assets/partners/logo.png"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eco-primary transition bg-white" />
          </div>
        </div>
      ),
    },
    {
      num: 4, icon: <Layers className="w-4 h-4" />, label: 'Partner Type', required: true,
      content: (
        <div className="relative">
          <select value={form.type} title="Partner Type" aria-label="Partner Type"
            onChange={(e) => onChange({ type: e.target.value })} className={selectCls}>
            {PARTNER_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      ),
    },
    {
      num: 5, icon: <StatusIcon className="w-4 h-4" />, label: 'Status', required: true,
      content: (
        <div className="relative">
          <select value={form.status} title="Status" aria-label="Status"
            onChange={(e) => onChange({ status: e.target.value as 'active' | 'inactive' })} className={selectCls}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl shadow-card-hover w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">

        {/* Google Forms colour bar */}
        <div className="h-2 bg-eco-primary shrink-0" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {mode === 'add' ? 'Add New Partner' : 'Edit Partner'}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Fields marked <span className="text-red-500">*</span> are required
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable questions */}
        <form id="partner-form" onSubmit={onSubmit} className="overflow-y-auto flex-1 divide-y divide-gray-50">
          {fields.map((f) => (
            <div key={f.num} className="px-6 py-5 hover:bg-gray-50/60 transition-colors">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-eco-light text-eco-primary text-xs font-bold shrink-0">
                  {f.num}
                </span>
                <span className="flex items-center gap-1.5">
                  {f.icon}
                  {f.label}
                  {f.required && <span className="text-red-500 ml-0.5">*</span>}
                </span>
              </label>
              {f.hint && <p className="text-xs text-gray-400 mb-2 ml-8">{f.hint}</p>}
              {f.content}
            </div>
          ))}
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="partner-form"
            disabled={saving}
            className="flex-1 bg-eco-primary text-white py-2.5 rounded-full font-semibold text-sm hover:bg-eco-dark transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : mode === 'add' ? 'Add Partner' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Partner logo ── */
function PartnerLogo({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className="w-16 h-16 rounded-xl bg-eco-light flex items-center justify-center">
        <Globe className="w-7 h-7 text-eco-primary/40" />
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
      <Image src={src} alt={name} width={56} height={56} className="object-contain" onError={() => setErr(true)} />
    </div>
  );
}

/* ══════════════════════════════════════════
   Page
══════════════════════════════════════════ */
export default function PartnersManagement() {
  const [partners, setPartners]   = useState<Partner[]>([]);
  const [loading, setLoading]     = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [modal, setModal]         = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing]     = useState<Partner | null>(null);
  const [form, setForm]           = useState(EMPTY);
  const [saving, setSaving]       = useState(false);
  const [deleteId, setDeleteId]   = useState<string | null>(null);
  const [toast, setToast]         = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
  }

  async function load() {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch('/api/partners');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPartners(data);
      } else {
        setFetchError(data?.error ?? 'Unexpected response from server');
        setPartners([]);
      }
    } catch {
      setFetchError('Cannot reach server. Click Retry.');
      setPartners([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm(EMPTY);
    setEditing(null);
    setModal('add');
  }

  function openEdit(p: Partner) {
    setForm({ name: p.name, logo: p.logo, website: p.website, type: p.type, status: p.status });
    setEditing(p);
    setModal('edit');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === 'add') {
        await fetch(`${API}/api/partners`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify(form) });
        showToast('Partner added successfully');
      } else if (editing) {
        await fetch(`${API}/api/partners/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify(form) });
        showToast('Partner updated successfully');
      }
      await load();
      setModal(null);
    } catch {
      showToast('Something went wrong', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`${API}/api/partners/${deleteId}`, { method: 'DELETE', headers: getAuthHeaders() });
    showToast('Partner removed');
    setDeleteId(null);
    load();
  }

  const activeCount   = partners.filter((p) => p.status === 'active').length;
  const inactiveCount = partners.filter((p) => p.status === 'inactive').length;

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage partner organisations displayed on the public site</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-eco-primary text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Partners', value: partners.length, color: 'text-gray-900' },
          { label: 'Active',         value: activeCount,     color: 'text-eco-primary' },
          { label: 'Inactive',       value: inactiveCount,   color: 'text-gray-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Partners grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-12 text-center text-gray-400 text-sm">Loading…</div>
      ) : fetchError ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-12 text-center space-y-3">
          <p className="text-red-500 text-sm">{fetchError}</p>
          <button type="button" onClick={load} className="px-4 py-2 bg-eco-primary text-white text-sm rounded-xl hover:bg-eco-dark transition-colors">Retry</button>
        </div>
      ) : partners.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-12 text-center text-gray-400 text-sm">No partners yet. Add one above.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p) => (
            <div key={p.id} className={`bg-white rounded-2xl border shadow-card p-5 flex flex-col gap-4 ${p.status === 'inactive' ? 'border-gray-100 opacity-60' : 'border-gray-100'}`}>
              <div className="flex items-start gap-4">
                <PartnerLogo src={p.logo} name={p.name} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-eco-primary font-medium">{p.type}</p>
                  <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 ${p.status === 'active' ? 'bg-eco-light text-eco-dark' : 'bg-gray-100 text-gray-400'}`}>
                    {p.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {p.website && (
                <a href={p.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-eco-primary transition-colors no-underline truncate">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  {p.website.replace(/^https?:\/\//, '')}
                </a>
              )}

              <div className="flex gap-2 pt-1 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-eco-light hover:text-eco-primary transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(p.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inquiries info */}
      <div className="bg-eco-lighter border border-eco-primary/10 rounded-2xl p-5 flex items-start gap-3">
        <Mail className="w-5 h-5 text-eco-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-eco-dark">Partnership inquiries go to your email</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Organisations that fill the public partner form send their inquiry to{' '}
            <a href="mailto:partnerships@ecocapturesolutions.com" className="text-eco-primary hover:underline">
              partnerships@ecocapturesolutions.com
            </a>
          </p>
        </div>
      </div>

      {/* Add / Edit — Google Forms modal */}
      {(modal === 'add' || modal === 'edit') && (
        <PartnerFormModal
          mode={modal}
          form={form}
          saving={saving}
          onClose={() => setModal(null)}
          onSubmit={handleSubmit}
          onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <ConfirmModal title="Remove Partner" onClose={() => setDeleteId(null)}>
          <p className="text-gray-600 text-sm mb-6">This will remove the partner from the dashboard and public site. This action cannot be undone.</p>
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
