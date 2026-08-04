'use client';

import { useState, useActionState } from 'react';
import { X, Phone, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { submitInquiry } from '@/app/actions/inquiry';
import { formatPhone } from '@/lib/formatPhone';
import type { SiteSettings } from '@/types';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia', 'Canada',
  'Japan', 'UAE', 'Singapore', 'Italy', 'Netherlands', 'Spain', 'Brazil', 'Mexico',
  'South Africa', 'Saudi Arabia', 'Kuwait', 'Qatar', 'New Zealand', 'Switzerland', 'Other',
];

type FormState = { success: boolean; error?: string } | null;

interface Props {
  productId: string;
  productName: string;
  settings: SiteSettings;
}

export default function ProductInquiryModal({ productId, productName, settings }: Props) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(submitInquiry, null);

  const phone = settings.phone || '';
  const whatsapp = settings.whatsapp || '';
  const email = settings.email || '';

  const waNumber = whatsapp.replace(/\D/g, '');
  const waMessage = encodeURIComponent(`Hello! I am interested in ${productName}. Please share pricing and availability.`);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary flex-1 text-center py-3"
      >
        Request Quote
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{ background: '#fff' }}
          >
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                  Request a Quote
                </h2>
                <p className="text-xs mt-0.5" style={{ color: '#888' }}>{productName}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-5">
              {/* Contact shortcuts */}
              {(phone || waNumber || email) && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-gray-50"
                      style={{ borderColor: '#ddd', color: '#1C1C1C' }}
                    >
                      <Phone className="w-3.5 h-3.5" style={{ color: '#8B4513' }} />
                      {formatPhone(phone)}
                    </a>
                  )}
                  {waNumber && (
                    <a
                      href={`https://wa.me/${waNumber}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white transition-colors"
                      style={{ background: '#25D366' }}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent(`Inquiry: ${productName}`)}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-gray-50"
                      style={{ borderColor: '#ddd', color: '#1C1C1C' }}
                    >
                      <Mail className="w-3.5 h-3.5" style={{ color: '#8B4513' }} />
                      Email Us
                    </a>
                  )}
                </div>
              )}

              {state?.success ? (
                <div
                  className="rounded-xl p-8 text-center"
                  style={{ background: '#FFF8F0', border: '2px solid #D4AF37' }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: '#D4AF37' }}
                  >
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                    Inquiry Sent!
                  </h3>
                  <p className="text-sm" style={{ color: '#666' }}>
                    We will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-4 text-sm font-medium"
                    style={{ color: '#8B4513' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form action={formAction} className="space-y-4">
                  <input type="hidden" name="productId" value={productId} />
                  <input type="hidden" name="productInterest" value={productName} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                        Full Name *
                      </label>
                      <input
                        type="text" name="name" required placeholder="Your name"
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                        Company
                      </label>
                      <input
                        type="text" name="company" placeholder="Your company"
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                        Email *
                      </label>
                      <input
                        type="email" name="email" required placeholder="your@email.com"
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel" name="phone" placeholder="+1 234 567 8900"
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                        Country *
                      </label>
                      <select
                        name="country" required
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none bg-white"
                        style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                        Quantity Required
                      </label>
                      <input
                        type="text" name="quantity" placeholder="e.g. 500 pcs"
                        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1C' }}>
                      Message *
                    </label>
                    <textarea
                      name="message" required rows={3}
                      placeholder="Tell us about your requirements, customization needs, etc."
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                      style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
                      defaultValue={`I am interested in ${productName}. Please share pricing and availability.`}
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
                    className="w-full py-3 rounded-lg font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ background: '#8B4513' }}
                  >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isPending ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
