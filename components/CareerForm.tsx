'use client';

import { useState } from 'react';
import SuccessModal from '@/components/SuccessModal';

const positions = [
  'Agricultural Field Officer',
  'Sustainability Project Manager',
  'Sales & Partnerships Coordinator',
];

export default function CareerForm() {
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
      {showModal && (
        <SuccessModal
          onClose={() => { setShowModal(false); setStatus('idle'); }}
          title="Application Sent!"
          message="Your application has been received."
          replyNote="5 business days"
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sm:p-8 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Jane Uwimana"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="jane@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Position Applying For</label>
          <select
            name="position"
            required
            aria-label="Position applying for"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
          >
            <option value="">Select a position…</option>
            {positions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell Us About Yourself</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your background, motivation, and relevant experience…"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-eco-primary focus:border-transparent transition"
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm">
            Something went wrong. Please try again or email us at{' '}
            <a href="mailto:careers@ecocapturesolutions.com" className="underline">
              careers@ecocapturesolutions.com
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-eco-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-eco-dark transition-colors shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Application'}
        </button>
      </form>
    </>
  );
}
