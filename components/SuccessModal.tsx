'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
  title?: string;
  message?: string;
  replyNote?: string;
}

export default function SuccessModal({
  onClose,
  title = 'Thank you!',
  message = 'Your submission has been sent.',
  replyNote = '48 hours',
}: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header — logo band */}
        <div className="bg-eco-lighter border-b border-eco-primary/10 flex items-center justify-center py-5 px-6">
          <Image
            src="/assets/logos/logo-ecocapture.png"
            alt="EcoCapture Solutions Ltd"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col items-center text-center px-5 sm:px-8 py-8 sm:py-10">
          {/* Checkmark circle */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[6px] border-eco-primary flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-eco-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {message}{' '}
            {replyNote && (
              <>
                Our team will get back to you within{' '}
                <span className="font-semibold text-eco-primary">{replyNote}</span>.
              </>
            )}
          </p>

          <button
            onClick={onClose}
            className="mt-8 bg-eco-primary hover:bg-eco-dark text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors shadow-sm hover:shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
