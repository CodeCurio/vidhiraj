'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', flagCode: 'gb', native: 'English' },
  { code: 'hi', label: 'Hindi', flagCode: 'in', native: 'हिन्दी' },
  { code: 'ar', label: 'Arabic', flagCode: 'sa', native: 'العربية' },
  { code: 'de', label: 'German', flagCode: 'de', native: 'Deutsch' },
  { code: 'fr', label: 'French', flagCode: 'fr', native: 'Français' },
  { code: 'es', label: 'Spanish', flagCode: 'es', native: 'Español' },
  { code: 'zh-CN', label: 'Chinese', flagCode: 'cn', native: '中文' },
  { code: 'ja', label: 'Japanese', flagCode: 'jp', native: '日本語' },
  { code: 'ko', label: 'Korean', flagCode: 'kr', native: '한국어' },
  { code: 'pt', label: 'Portuguese', flagCode: 'br', native: 'Português' },
  { code: 'ru', label: 'Russian', flagCode: 'ru', native: 'Русский' },
  { code: 'it', label: 'Italian', flagCode: 'it', native: 'Italiano' },
];

function doTranslate(langCode: string) {
  if (langCode === 'en') {
    // Reset to original
    const iframe = document.querySelector<HTMLIFrameElement>('.goog-te-banner-frame');
    if (iframe) {
      const btn = iframe.contentDocument?.getElementById('restore') as HTMLElement;
      if (btn) btn.click();
    }
    // Use cookie method to reset
    document.cookie = 'googtrans=/en/en; path=/; domain=' + window.location.hostname;
    document.cookie = 'googtrans=/en/en; path=/';
    window.location.reload();
    return;
  }

  // Trigger Google Translate via the hidden select element it injects
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
    return;
  }

  // Fallback: cookie + reload approach
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;
  document.cookie = `googtrans=/en/${langCode}; path=/`;
  window.location.reload();
}

export default function LanguageBar({ gst }: { gst?: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect current translate cookie
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match) {
      const found = LANGUAGES.find((l) => l.code === match[1]);
      if (found) setSelected(found);
    }
  }, []);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  function handleSelect(lang: typeof LANGUAGES[0]) {
    setSelected(lang);
    setOpen(false);
    doTranslate(lang.code);
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 sm:px-6 lg:px-8 text-xs"
      style={{ background: '#1C1C1C', color: '#a08060', zIndex: 60 }}
    >
      {/* Left: tagline + GST */}
      <span className="hidden sm:block tracking-wide" style={{ color: '#8a6a4a' }}>
        ✦ Trusted Handicraft Exporter · Chandigarh, India
        {gst
          ? <span style={{ color: '#a08060' }}> &nbsp;|&nbsp; GST: {gst}</span>
          : <span style={{ color: '#6a5040' }}> &nbsp;|&nbsp; GST Registration Pending</span>}
      </span>
      <span className="sm:hidden tracking-wide" style={{ color: '#8a6a4a' }}>
        ✦ Vidhiraj Global Impex
        {gst && <span style={{ color: '#a08060' }}> · GST: {gst}</span>}
      </span>

      {/* Right: language picker */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-1 rounded transition-colors hover:bg-white/10"
          style={{ color: '#c8a878' }}
          aria-label="Select language"
        >
          <Globe className="w-3.5 h-3.5" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w20/${selected.flagCode}.png`}
            srcSet={`https://flagcdn.com/w40/${selected.flagCode}.png 2x`}
            width={16}
            height={12}
            alt={selected.label}
            style={{ borderRadius: '2px', display: 'inline-block' }}
          />
          <span className="font-medium">{selected.native}</span>
          <ChevronDown
            className="w-3 h-3 transition-transform"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-1 w-52 rounded-xl shadow-2xl overflow-hidden z-[9999]"
            style={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
              <p className="text-xs font-semibold" style={{ color: '#D4AF37' }}>Select Language</p>
            </div>
            <div className="max-h-72 overflow-y-auto py-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w20/${lang.flagCode}.png`}
                    srcSet={`https://flagcdn.com/w40/${lang.flagCode}.png 2x`}
                    width={20}
                    height={15}
                    alt={lang.label}
                    style={{ borderRadius: '2px', flexShrink: 0 }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium" style={{ color: '#e8d8c0' }}>{lang.native}</p>
                    <p className="text-xs" style={{ color: '#6a5040' }}>{lang.label}</p>
                  </div>
                  {selected.code === lang.code && (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
