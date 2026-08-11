'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, Globe, Package, ShieldCheck, ChevronDown, Sparkles, Hand, Leaf } from 'lucide-react';

const COUNTRIES = [
  { name: 'USA', code: 'us' },
  { name: 'UK', code: 'gb' },
  { name: 'Germany', code: 'de' },
  { name: 'France', code: 'fr' },
  { name: 'Australia', code: 'au' },
  { name: 'UAE', code: 'ae' },
  { name: 'Canada', code: 'ca' },
  { name: 'Japan', code: 'jp' },
  { name: 'Italy', code: 'it' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Singapore', code: 'sg' },
  { name: 'Saudi Arabia', code: 'sa' },
  { name: 'South Africa', code: 'za' },
  { name: 'Brazil', code: 'br' },
  { name: 'Mexico', code: 'mx' },
];

const BADGES = [
  { icon: Award, value: '100%', label: 'Quality Assured' },
  { icon: Globe, value: '30+', label: 'Countries Served' },
  { icon: Package, value: '500+', label: 'Global Clients' },
  { icon: ShieldCheck, value: '10K+', label: 'Orders Fulfilled' },
];

const IMAGES = [
  { seed: 'wooden1', label: 'Wooden Artifact' },
  { seed: 'brass2', label: 'Brass Figurine' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 'calc(100svh - 96px)' }}>

      {/* ── Background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #1a0a02 0%, #2d1005 30%, #5a2026 60%, #8B4513 100%)',
        }}
      />

      {/* Textile-inspired dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Radial glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[70%] h-[70%] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom right, #D4AF37, transparent 65%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
        style={{ minHeight: 'calc(100svh - 96px)', paddingBottom: '72px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 xl:gap-16 items-center py-12">

          {/* ── Left: Text ── */}
          <div>
            {/* Eyebrow pill */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.35)' }}>
                <Sparkles className="w-3 h-3" />
                Est. 2026 · Chandigarh, India
              </div>
              <span
                className="text-sm italic font-semibold"
                style={{ color: '#D4AF37', fontFamily: 'Georgia, serif', opacity: 0.9 }}
              >
                — Exporting Dreams
              </span>
            </div>
            {/* Handmade & Eco badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(101,120,72,0.18)', color: '#8aaa52', border: '1px solid rgba(101,120,72,0.35)' }}>
                <Hand className="w-3 h-3" />
                100% Handmade
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(101,120,72,0.18)', color: '#8aaa52', border: '1px solid rgba(101,120,72,0.35)' }}>
                <Leaf className="w-3 h-3" />
                Eco-Friendly
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-bold leading-[1.1] mb-5"
              style={{ fontFamily: 'Georgia, serif', color: '#FFF8F0', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
              Premium Indian<br />
              Handicrafts —<br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #D4AF37 0%, #f0d070 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Exported Worldwide
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(255,248,240,0.72)' }}>
              Handcrafted wooden artifacts, brass figurines &amp; coconut shell decor — 100% handmade by skilled artisans using eco-friendly materials, shipped to 30+ countries. Trusted by 500+ international buyers.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #b8962e)',
                  color: '#1C1C1C',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
                }}
              >
                Explore Products
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFF8F0',
                  border: '1px solid rgba(255,248,240,0.3)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                Get a Quote
              </Link>
              <a
                href="https://wa.me/9182888 40802?text=Hello!%20I%20am%20interested%20in%20your%20handicraft%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)' }}
              >
                <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                  <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BADGES.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: '#D4AF37' }} />
                  <div className="text-xl font-bold" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,248,240,0.5)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Transport collage ── */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Decorative gold ring */}
              <div
                className="absolute -top-8 -right-8 w-72 h-72 rounded-full opacity-20 pointer-events-none"
                style={{ border: '2px solid #D4AF37' }}
              />

              {/* 2×2 collage grid */}
              <div className="grid grid-cols-2 gap-3" style={{ aspectRatio: '1/1' }}>

                {/* Container ship */}
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1617952739760-1dcae19a1d93?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sea freight — container ship"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="220px"
                    priority
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,25,50,0.75) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                    {/* <span className="text-base">🚢</span> */}
                    <span className="text-xs font-semibold" style={{ color: '#FFF8F0' }}>Sea Freight</span>
                  </div>
                </div>

                {/* Cargo airplane */}
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1665600291177-75465aa38ae9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Air freight — cargo airplane"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="220px"
                    priority
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,20,50,0.75) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                    {/* <span className="text-base">✈️</span> */}
                    <span className="text-xs font-semibold" style={{ color: '#FFF8F0' }}>Air Freight</span>
                  </div>
                </div>

                {/* Freight truck */}
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1766561994067-dbd575e1cff2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Road freight — truck"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="220px"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,10,2,0.75) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                    {/* <span className="text-base">🚛</span> */}
                    <span className="text-xs font-semibold" style={{ color: '#FFF8F0' }}>Road Express</span>
                  </div>
                </div>

                {/* Warehouse / factory */}
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1652211955967-99c892925469?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Warehouse and logistics"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="220px"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,26,10,0.75) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                    {/* <span className="text-base">🏭</span> */}
                    <span className="text-xs font-semibold" style={{ color: '#FFF8F0' }}>Factory Direct</span>
                  </div>
                </div>
              </div>

              {/* Centre badge overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="rounded-full w-20 h-20 flex flex-col items-center justify-center text-center shadow-2xl"
                  style={{
                    background: 'rgba(26,10,2,0.92)',
                    border: '2px solid rgba(212,175,55,0.6)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Globe className="w-5 h-5 mb-0.5" style={{ color: '#D4AF37' }} />
                  <div className="text-xs font-bold leading-tight" style={{ color: '#FFF8F0' }}>30+</div>
                  <div className="text-xs leading-tight" style={{ color: 'rgba(255,248,240,0.6)', fontSize: '0.6rem' }}>Countries</div>
                </div>
              </div>
            </div>

            {/* Ships from badge - below the grid */}
            <div className="flex justify-center mt-6">
              <div
                className="px-4 py-2 rounded-full shadow-xl flex items-center gap-2"
                style={{ background: 'rgba(26,10,2,0.9)', border: '1px solid rgba(212,175,55,0.4)', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' }}
              >
                <span className="text-xs" style={{ color: '#D4AF37' }}>🇮🇳</span>
                <span className="text-xs font-semibold" style={{ color: '#FFF8F0' }}>Ships from Chandigarh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
          <span className="text-xs tracking-widest uppercase" style={{ color: '#D4AF37' }}>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: '#D4AF37' }} />
        </div>
      </div>

      {/* ── Country Marquee strip at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 py-2 overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(4px)' }}
      >
        <div className="flex items-center gap-0" style={{ animation: 'marquee 30s linear infinite', width: 'max-content' }}>
          {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs font-medium px-5 whitespace-nowrap" style={{ color: 'rgba(212,175,55,0.8)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w20/${c.code}.png`}
                srcSet={`https://flagcdn.com/w40/${c.code}.png 2x`}
                width={20}
                height={15}
                alt={c.name}
                style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
              />
              {c.name}
              <span className="ml-3" style={{ color: 'rgba(212,175,55,0.3)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
