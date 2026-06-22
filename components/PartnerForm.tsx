'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, CheckCircle, ChevronDown } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://ecocapturesolution.onrender.com';

type FieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';

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

const inputCls = 'w-full px-4 py-3 border-b-2 border-gray-200 focus:border-eco-primary bg-gray-50 rounded-t-lg text-sm focus:outline-none focus:bg-white transition-all';

export default function PartnerForm() {
  const [schema, setSchema]   = useState<FormSchema | null>(null);
  const [values, setValues]   = useState<Record<string, string>>({});
  const [status, setStatus]   = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg]   = useState('');

  useEffect(() => {
    fetch(`${API}/api/forms/partners`)
      .then((r) => r.json())
      .then(setSchema)
      .catch(() => setErrMsg('Could not load form. Please refresh.'));
  }, []);

  function set(id: string, val: string) {
    setValues((v) => ({ ...v, [id]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!schema) return;
    setStatus('submitting'); setErrMsg('');

    const payload: Record<string, string> = {};
    for (const field of schema.fields) {
      payload[field.label] = values[field.id] ?? '';
    }

    try {
      const res = await fetch(`${API}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) { setStatus('success'); setValues({}); }
      else { const d = await res.json().catch(() => ({})); setErrMsg(d.error ?? 'Submission failed.'); setStatus('error'); }
    } catch {
      setErrMsg('Network error. Please try again.'); setStatus('error');
    }
  }

  const formCard = !schema && !errMsg ? (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-12 text-center text-gray-400 text-sm">Loading form…</div>
  ) : errMsg && !schema ? (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center text-red-500 text-sm">{errMsg}</div>
  ) : status === 'success' ? (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <div className="h-2 bg-eco-primary" />
      <div className="p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-eco-light rounded-full mb-5">
          <CheckCircle className="w-8 h-8 text-eco-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Received!</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          Thank you for reaching out. Our team will get back to you within 48 hours.
        </p>
        <button type="button" onClick={() => setStatus('idle')}
          className="text-eco-primary font-semibold text-sm hover:text-eco-dark transition-colors underline underline-offset-2">
          Submit another inquiry
        </button>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <div className="h-2 bg-eco-primary" />
      <div className="px-6 py-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{schema!.title}</h2>
        <p className="text-gray-500 text-sm mt-1">{schema!.description}</p>
        <p className="text-xs text-gray-400 mt-3">Fields marked <span className="text-red-500">*</span> are required.</p>
      </div>

      <form onSubmit={handleSubmit} className="divide-y divide-gray-50">
        {schema!.fields.map((field, i) => (
          <div key={field.id} className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-eco-light text-eco-primary text-xs font-bold shrink-0">
                {i + 1}
              </span>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {(field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'url') && (
              <input type={field.type} required={field.required} placeholder={field.placeholder}
                value={values[field.id] ?? ''} onChange={(e) => set(field.id, e.target.value)}
                className={inputCls} />
            )}

            {field.type === 'textarea' && (
              <textarea required={field.required} placeholder={field.placeholder} rows={4}
                value={values[field.id] ?? ''} onChange={(e) => set(field.id, e.target.value)}
                className={inputCls + ' resize-y'} />
            )}

            {field.type === 'select' && (
              <div className="relative">
                <select required={field.required} title={field.label} aria-label={field.label}
                  value={values[field.id] ?? ''} onChange={(e) => set(field.id, e.target.value)}
                  className={inputCls + ' appearance-none cursor-pointer'}>
                  <option value="">Choose an option</option>
                  {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            )}
          </div>
        ))}

        <div className="px-6 py-6">
          {status === 'error' && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{errMsg}</p>
          )}
          <button type="submit" disabled={status === 'submitting'}
            className="bg-eco-primary text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm hover:shadow-md disabled:opacity-60">
            {status === 'submitting' ? 'Submitting…' : 'Submit Inquiry'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {formCard}

      {/* WhatsApp QR + contact */}
      <div className="flex flex-col gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sm:p-8 text-center">
          <h3 className="font-bold text-gray-900 mb-1">Connect Instantly on WhatsApp</h3>
          <p className="text-gray-500 text-sm mb-6">Scan the QR code to message us directly.</p>
          <Image src="/assets/projects/WhatsApp_QR_Code_EcoCapture.png" alt="WhatsApp QR"
            width={180} height={180} className="rounded-2xl mx-auto border border-gray-100 shadow-sm" />
        </div>
        <div className="bg-eco-lighter rounded-2xl border border-eco-primary/10 p-5 sm:p-7 space-y-3">
          <h3 className="font-bold text-eco-dark text-base mb-4">Partnerships Team Contact</h3>
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-eco-primary shrink-0 mt-0.5" />
            <span>Norrseken Kigali, Kigali, Rwanda</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-eco-primary shrink-0 mt-0.5" />
            <span>+250 781 392 398</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-eco-primary shrink-0 mt-0.5" />
            <a href="mailto:partnerships@ecocapturesolutions.com" className="text-eco-primary font-medium hover:underline break-all">
              partnerships@ecocapturesolutions.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
