'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import SuccessModal from '@/components/SuccessModal';

export default function PartnerForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xeozdbad', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        setStatus('success');
        setShowModal(true);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      {showModal && <SuccessModal onClose={() => { setShowModal(false); setStatus('idle'); }} />}

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Start a Conversation</h2>
        <p className="text-gray-500 text-sm mb-8">
          Fill in the form and our partnerships team will get back to you within 48 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Jane Uwimana"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="jane@organisation.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation</label>
            <input
              type="text"
              name="organization"
              required
              placeholder="Your organisation name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How Would You Like to Partner?
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Describe your interest and how we can collaborate…"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white resize-y focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm">
              Something went wrong. Please try again or email us directly at{' '}
              <a href="mailto:partnerships@ecocapturesolutions.com" className="underline">
                partnerships@ecocapturesolutions.com
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-eco-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Submit Inquiry'}
          </button>
        </form>
      </div>

      {/* QR + contact — kept here so the layout is preserved */}
      <div className="flex flex-col gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sm:p-8 text-center">
          <h3 className="font-bold text-gray-900 mb-1">Connect Instantly on WhatsApp</h3>
          <p className="text-gray-500 text-sm mb-6">Scan the QR code to message us directly.</p>
          <Image
            src="/assets/projects/WhatsApp_QR_Code_EcoCapture.png"
            alt="EcoCapture WhatsApp QR Code"
            width={180}
            height={180}
            className="rounded-2xl mx-auto border border-gray-100 shadow-sm"
          />
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
            <a
              href="mailto:partnerships@ecocapturesolutions.com"
              className="text-eco-primary font-medium hover:underline break-all"
            >
              partnerships@ecocapturesolutions.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
