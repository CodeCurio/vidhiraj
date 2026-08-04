'use client';

import { useState, useEffect, useActionState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { submitInquiry } from '@/app/actions/inquiry';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia', 'Canada',
  'Japan', 'UAE', 'Singapore', 'Italy', 'Netherlands', 'Spain', 'Brazil', 'Mexico',
  'South Africa', 'Saudi Arabia', 'Kuwait', 'Qatar', 'New Zealand', 'Switzerland',
  'China', 'South Korea', 'Malaysia', 'Thailand', 'Indonesia', 'India', 'Other',
];

type FormState = { success: boolean; error?: string } | null;

interface Props {
  delaySeconds?: number;
  enabled?: boolean;
}

export default function EnquiryPopup({ delaySeconds = 15, enabled = true }: Props) {
  const [visible, setVisible] = useState(false);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(submitInquiry, null);

  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem('enquiryPopupDismissed')) return;
    } catch {
      return;
    }
    const timer = setTimeout(() => setVisible(true), delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [enabled, delaySeconds]);

  useEffect(() => {
    if (state?.success) {
      const t = setTimeout(() => {
        setVisible(false);
        try { sessionStorage.setItem('enquiryPopupDismissed', '1'); } catch { /* */ }
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [state?.success]);

  function dismiss() {
    setVisible(false);
    try { sessionStorage.setItem('enquiryPopupDismissed', '1'); } catch { /* */ }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 relative"
          style={{ background: 'linear-gradient(135deg, #8B4513, #6B3410)' }}
        >
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            aria-label="Close"
          >
            <X size={15} color="white" />
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(212,175,55,0.25)' }}
            >
              <MessageSquare size={20} color="#D4AF37" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
                Share Your Requirement
              </p>
              <h3 className="text-lg font-bold" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
                Get a Free Quote Today
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {state?.success ? (
            <div className="text-center py-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#D4AF37' }}
              >
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-1" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Thank You!
              </h4>
              <p className="text-sm" style={{ color: '#666' }}>
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-3">
              <input type="hidden" name="source" value="popup" />
              <input type="hidden" name="phone" value="" />
              <input type="hidden" name="company" value="" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                    Your Name <span style={{ color: '#8B4513' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full name"
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                    style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                    Email <span style={{ color: '#8B4513' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                    style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                  Country <span style={{ color: '#8B4513' }}>*</span>
                </label>
                <select
                  name="country"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ border: '1px solid #ddd', color: '#1C1C1C', background: '#fff' }}
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                  Your Requirement <span style={{ color: '#8B4513' }}>*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Tell us what you're looking for — product type, quantity, customization..."
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                  style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                />
              </div>

              {state?.error && (
                <p className="text-xs" style={{ color: '#cc0000' }}>{state.error}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 rounded-lg font-semibold text-sm text-white disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #8B4513, #6B3410)' }}
              >
                {isPending ? 'Sending...' : 'Send My Requirement →'}
              </button>

              <p className="text-center text-xs" style={{ color: '#aaa' }}>
                We respond within 24 hours. No spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
