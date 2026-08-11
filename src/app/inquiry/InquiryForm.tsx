'use client';

import { useActionState } from 'react';
import { submitInquiry } from '@/app/actions/inquiry';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia', 'Canada',
  'Japan', 'UAE', 'Singapore', 'Italy', 'Netherlands', 'Spain', 'Brazil', 'Mexico',
  'South Africa', 'Saudi Arabia', 'Kuwait', 'Qatar', 'New Zealand', 'Switzerland',
  'China', 'South Korea', 'Malaysia', 'Thailand', 'Indonesia', 'India', 'Other',
];

const PRODUCT_CATEGORIES = [
  'Wooden Handicrafts & Artifacts',
  'Brass Figurines & Sculptures',
  'Custom / OEM Order',
  'Mixed / Multiple Categories',
  'Other',
];

type FormState = { success: boolean; error?: string } | null;

interface Props {
  prefilledProduct?: string;
  prefilledProductId?: string;
}

export default function InquiryForm({ prefilledProduct = '', prefilledProductId = '' }: Props) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitInquiry,
    null
  );

  if (state?.success) {
    return (
      <div
        className="rounded-xl p-12 text-center"
        style={{ background: '#FFF8F0', border: '2px solid #D4AF37' }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: '#D4AF37' }}
        >
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold mb-3"
          style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
        >
          Inquiry Submitted Successfully!
        </h3>
        <p className="mb-2" style={{ color: '#555' }}>
          Thank you for your inquiry. Our export team will review your requirements and respond within 24 hours.
        </p>
        <p className="text-sm" style={{ color: '#888' }}>
          For urgent queries, WhatsApp us at{' '}
          <a href="https://wa.me/918288840802" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>
            +91 82-888-408-02
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="productId" value={prefilledProductId} />
      <input type="hidden" name="source" value="inquiry" />

      {/* Personal Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
            Full Name <span style={{ color: '#8B4513' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
            style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
            Company Name <span style={{ color: '#8B4513' }}>*</span>
          </label>
          <input
            type="text"
            name="company"
            required
            placeholder="Your company name"
            className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
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
            placeholder="your@company.com"
            className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
            style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
            Phone / WhatsApp <span style={{ color: '#8B4513' }}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
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

      {/* Product Info */}
      <div className="border-t pt-5" style={{ borderColor: '#f0e0cc' }}>
        <h3
          className="text-base font-bold mb-4"
          style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
        >
          Product Requirements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
              Product Interest <span style={{ color: '#8B4513' }}>*</span>
            </label>
            <select
              name="productInterest"
              required
              defaultValue={prefilledProduct}
              className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
              style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
            >
              <option value="">Select product category</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              {prefilledProduct && !PRODUCT_CATEGORIES.includes(prefilledProduct) && (
                <option value={prefilledProduct}>{prefilledProduct}</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
              Required Quantity
            </label>
            <select
              name="quantity"
              className="w-full px-4 py-3 rounded-lg border text-sm outline-none"
              style={{ border: '1px solid #ddd', fontFamily: 'Georgia, serif', background: '#fff', color: '#1C1C1C' }}
            >
              <option value="">Select quantity range</option>
              <option>Sample only (1–10 pcs)</option>
              <option>50 – 100 pcs</option>
              <option>101 – 500 pcs</option>
              <option>501 – 1,000 pcs</option>
              <option>1,001 – 5,000 pcs</option>
              <option>5,000+ pcs</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1C' }}>
          Message / Requirements <span style={{ color: '#8B4513' }}>*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Please describe your requirements in detail: product type, colors, customization needs, delivery destination, timeline, etc."
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
        className="w-full btn-primary py-4 text-base disabled:opacity-60"
      >
        {isPending ? 'Submitting...' : 'Submit Inquiry'}
      </button>

      <p className="text-xs text-center" style={{ color: '#aaa' }}>
        By submitting, you agree to receive communications from Vidhiraj Global Impex. We respect your privacy.
      </p>
    </form>
  );
}
