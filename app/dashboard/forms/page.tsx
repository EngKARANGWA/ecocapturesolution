'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Save, Check, AlertCircle, GripVertical, X, ChevronDown as SelectIcon } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type FieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
type TabKey = 'careers' | 'partners';

interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  options: string[];
}

interface FormSchema {
  title: string;
  description: string;
  fields: FormField[];
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text',     label: 'Short answer' },
  { value: 'email',    label: 'Email' },
  { value: 'tel',      label: 'Phone number' },
  { value: 'url',      label: 'Website URL' },
  { value: 'textarea', label: 'Long answer' },
  { value: 'select',   label: 'Dropdown' },
];

function newField(): FormField {
  return { id: `f_${Date.now()}`, label: '', type: 'text', placeholder: '', required: false, options: [] };
}

const inputCls = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition bg-white';

export default function FormsBuilder() {
  const [tab, setTab]         = useState<TabKey>('careers');
  const [schemas, setSchemas] = useState<Record<TabKey, FormSchema>>({
    careers:  { title: '', description: '', fields: [] },
    partners: { title: '', description: '', fields: [] },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/forms/careers`,  { credentials: 'include' }).then((r) => r.json()),
      fetch(`${API}/api/forms/partners`, { credentials: 'include' }).then((r) => r.json()),
    ])
      .then(([careers, partners]) => setSchemas({ careers, partners }))
      .catch(() => setError('Failed to load forms'))
      .finally(() => setLoading(false));
  }, []);

  const schema = schemas[tab];

  function patchSchema(patch: Partial<FormSchema>) {
    setSchemas((s) => ({ ...s, [tab]: { ...s[tab], ...patch } }));
  }

  function patchField(id: string, patch: Partial<FormField>) {
    patchSchema({ fields: schema.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
  }

  function addField() {
    patchSchema({ fields: [...schema.fields, newField()] });
  }

  function removeField(id: string) {
    patchSchema({ fields: schema.fields.filter((f) => f.id !== id) });
  }

  function move(id: string, dir: -1 | 1) {
    const arr = [...schema.fields];
    const i = arr.findIndex((f) => f.id === id);
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    patchSchema({ fields: arr });
  }

  function addOption(id: string) {
    const f = schema.fields.find((x) => x.id === id);
    if (f) patchField(id, { options: [...f.options, ''] });
  }

  function setOption(fieldId: string, i: number, val: string) {
    const f = schema.fields.find((x) => x.id === fieldId);
    if (!f) return;
    const opts = [...f.options];
    opts[i] = val;
    patchField(fieldId, { options: opts });
  }

  function removeOption(fieldId: string, i: number) {
    const f = schema.fields.find((x) => x.id === fieldId);
    if (f) patchField(fieldId, { options: f.options.filter((_, idx) => idx !== i) });
  }

  async function save() {
    setSaving(true); setError('');
    try {
      const res = await fetch(`${API}/api/forms/${tab}`, {
        method: 'PUT', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schema),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError('Save failed. Make sure you are logged in.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex-1 p-8 flex items-center justify-center text-gray-400 text-sm">Loading forms…</div>;
  }

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
          <p className="text-gray-500 text-sm mt-1">Design the public application and partnership forms</p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-eco-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm disabled:opacity-60 shrink-0"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {([['careers', 'Application Form'], ['partners', 'Partner Form']] as [TabKey, string][]).map(([key, label]) => (
          <button key={key} type="button" onClick={() => setTab(key)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === key ? 'bg-white text-eco-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Form info card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="h-2 bg-eco-primary" />
        <div className="p-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Form Title</label>
            <input value={schema.title} onChange={(e) => patchSchema({ title: e.target.value })} placeholder="Form title…" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
            <input value={schema.description} onChange={(e) => patchSchema({ description: e.target.value })} placeholder="Short subtitle…" className={inputCls} />
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {schema.fields.map((field, idx) => (
          <div key={field.id} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">

            {/* Field header bar */}
            <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100">
              <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-eco-light text-eco-primary text-xs font-bold shrink-0">
                {idx + 1}
              </span>
              <span className="flex-1 text-sm font-semibold text-gray-700 truncate">
                {field.label || <span className="text-gray-300 font-normal">Untitled field</span>}
              </span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(field.id, -1)} disabled={idx === 0} title="Move up"
                  className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-colors">
                  <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                </button>
                <button type="button" onClick={() => move(field.id, 1)} disabled={idx === schema.fields.length - 1} title="Move down"
                  className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-colors">
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>
                <button type="button" onClick={() => removeField(field.id)} title="Delete field"
                  className="p-1.5 rounded-lg hover:bg-red-100 transition-colors ml-1">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>

            {/* Field settings */}
            <div className="p-5 space-y-4">

              {/* Row 1: Label + Type + Required */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px_auto] gap-3 items-end">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Question Label</label>
                  <input
                    value={field.label}
                    onChange={(e) => patchField(field.id, { label: e.target.value })}
                    placeholder="Enter your question…"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Field Type</label>
                  <div className="relative">
                    <select value={field.type} title="Field type" aria-label="Field type"
                      onChange={(e) => patchField(field.id, { type: e.target.value as FieldType })}
                      className={inputCls + ' appearance-none cursor-pointer'}>
                      {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <SelectIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="pb-0.5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Required</label>
                  <button type="button" onClick={() => patchField(field.id, { required: !field.required })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${field.required ? 'bg-eco-primary' : 'bg-gray-200'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${field.required ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>

              {/* Row 2: Placeholder (not for select) */}
              {field.type !== 'select' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Placeholder Text</label>
                  <input
                    value={field.placeholder}
                    onChange={(e) => patchField(field.id, { placeholder: e.target.value })}
                    placeholder="Hint shown inside the input…"
                    className={inputCls}
                  />
                </div>
              )}

              {/* Row 3: Dropdown options */}
              {field.type === 'select' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Dropdown Options</label>
                  <div className="space-y-2">
                    {field.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-5 text-right shrink-0">{i + 1}.</span>
                        <input
                          value={opt}
                          onChange={(e) => setOption(field.id, i, e.target.value)}
                          placeholder={`Option ${i + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary transition bg-white"
                        />
                        <button type="button" onClick={() => removeOption(field.id, i)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                          <X className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addOption(field.id)}
                      className="flex items-center gap-1.5 text-xs text-eco-primary font-semibold hover:text-eco-dark transition-colors mt-1">
                      <Plus className="w-3.5 h-3.5" /> Add option
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add field */}
        <button type="button" onClick={addField}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-gray-200 text-sm font-semibold text-gray-400 hover:border-eco-primary hover:text-eco-primary transition-colors">
          <Plus className="w-4 h-4" /> Add New Field
        </button>
      </div>
    </div>
  );
}
