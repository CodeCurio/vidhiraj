'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';

const SITE_URL = 'https://vidhirajglobalimpex.com';
const SHARE_TITLE = 'Vidhiraj Global Impex';

export default function ShareButton({
  address,
  phone,
  whatsapp,
  email,
  exportEmail,
  gst,
}: {
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  exportEmail?: string;
  gst?: string;
}) {
  const SHARE_TEXT = [
    'Vidhiraj Global Impex',
    address ? address.replace(/\n/g, ', ') : '',
    phone ? `Call: ${phone}` : '',
    whatsapp ? `WhatsApp: ${whatsapp}` : '',
    email ? `Email: ${email}` : '',
    exportEmail ? `Export: ${exportEmail}` : '',
    gst ? `GST: ${gst}` : '',
    SITE_URL,
  ].filter(Boolean).join('\n');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT });
        return;
      } catch {
        // user cancelled or not supported — fall through to modal
      }
    }
    setOpen(true);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(SHARE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encoded = encodeURIComponent(SHARE_TEXT);
  const encodedUrl = encodeURIComponent(SITE_URL);
  const encodedTitle = encodeURIComponent(SHARE_TITLE);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors"
        style={{ background: '#FFF8F0', color: '#8B4513', border: '1px solid #e8d0b0' }}
        title="Share this page"
        aria-label="Share contact page"
      >
        <Share2 size={13} />
        Share
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-64 rounded-2xl shadow-2xl overflow-hidden z-[9999]"
          style={{ background: '#fff', border: '1px solid #f0e0cc' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #f0e0cc' }}>
            <p className="text-sm font-bold" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>Share Our Contact</p>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X size={15} color="#999" />
            </button>
          </div>

          {/* Copy */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #f0e0cc' }}>
            <div className="rounded-lg px-3 py-2" style={{ background: '#FFF8F0' }}>
              <p className="text-xs leading-relaxed mb-2 whitespace-pre-line" style={{ color: '#555' }}>{SHARE_TEXT}</p>
              <button
                onClick={copyLink}
                className="flex items-center gap-1 text-xs font-semibold transition-colors"
                style={{ color: copied ? '#25a853' : '#8B4513' }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
          </div>

          {/* Platform buttons */}
          <div className="px-4 py-3 space-y-2">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors hover:opacity-90"
              style={{ background: '#25D366' }}
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
              </svg>
              <span className="text-sm font-semibold text-white">WhatsApp</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors hover:opacity-90"
              style={{ background: '#1877F2' }}
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
              <span className="text-sm font-semibold text-white">Facebook</span>
            </a>

            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors hover:opacity-90"
              style={{ background: '#000' }}
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-semibold text-white">Twitter / X</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(SHARE_TEXT)}`}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors hover:opacity-90"
              style={{ background: '#8B4513' }}
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-sm font-semibold text-white">Email</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
