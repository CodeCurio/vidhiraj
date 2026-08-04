'use client';

import { useState, useActionState } from 'react';
import { submitInquiry } from '@/app/actions/inquiry';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia', 'Canada',
  'Japan', 'UAE', 'Singapore', 'Italy', 'Netherlands', 'Spain', 'Brazil', 'Mexico',
  'South Africa', 'Saudi Arabia', 'Kuwait', 'Qatar', 'New Zealand', 'Switzerland', 'Other',
];

type FormState = { success: boolean; error?: string } | null;

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitInquiry,
    null
  );

  if (state?.success) {
    return (
      <div
        className="rounded-xl p-10 text-center"
        style={{ background: '#FFF8F0', border: '2px solid #D4AF37' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: '#D4AF37' }}
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
        >
          Message Sent!
        </h3>
        <p style={{ color: '#666' }}>
          Thank you for contacting us. Our team will respond to your inquiry within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="source" value="contact" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
            Full Name <span style={{ color: '#8B4513' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all"
            style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
            Company Name
          </label>
          <input
            type="text"
            name="company"
            placeholder="Your company"
            className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all"
            style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
            Email Address <span style={{ color: '#8B4513' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
            style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 234 567 8900"
            className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
            style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
          Country <span style={{ color: '#8B4513' }}>*</span>
        </label>
        <select
          name="country"
          required
          className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
          style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
        >
          <option value="">Select your country</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
          Message <span style={{ color: '#8B4513' }}>*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your requirements, product interest, quantity needed, etc."
          className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none"
          style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
        />
      </div>

      {state?.error && (
        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000' }}
        >
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full btn-primary py-3 text-base disabled:opacity-60"
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-xs text-center" style={{ color: '#aaa' }}>
        We respect your privacy. Your information will not be shared with third parties.
      </p>
    </form>
  );
}
