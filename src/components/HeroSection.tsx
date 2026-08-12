'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Globe, Package, ShieldCheck, Sparkles, ArrowRight, RotateCw, Hand, Leaf } from 'lucide-react';

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

const HERO_CATEGORIES = [
  { name: 'Copper Handicraft', image: '/categories/copper-handicraft.jpg', tag: 'Metalware' },
  { name: 'Macrame Bags', image: '/categories/macrame-bags.jpg', tag: 'Handwoven' },
  { name: 'Macrame Cushion', image: '/categories/macrame-cushion.jpg', tag: 'Home Decor' },
  { name: 'Macrame Wall Hanging', image: '/categories/macrame-wall-hanging.jpg', tag: 'Tapestry' },
  { name: 'Wooden Puzzles', image: '/categories/wooden-puzzles.jpg', tag: 'Brain Teaser' },
  { name: 'Wooden Toys', image: '/categories/wooden-toys.jpg', tag: 'Eco Toys' },
  { name: 'Home Decor', image: '/categories/home-decor.jpg', tag: 'Handmade' },
  { name: 'Kitchenware', image: '/categories/kitchenware.jpg', tag: 'Utensils' },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Faster rotation speed: 1800ms
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CATEGORIES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const card0 = HERO_CATEGORIES[activeIndex];
  const card1 = HERO_CATEGORIES[(activeIndex + 1) % HERO_CATEGORIES.length];
  const card2 = HERO_CATEGORIES[(activeIndex + 2) % HERO_CATEGORIES.length];
  const card3 = HERO_CATEGORIES[(activeIndex + 3) % HERO_CATEGORIES.length];

  return (
    <section className="relative overflow-hidden w-full flex flex-col justify-between bg-[#1a0a02]" style={{ minHeight: 'calc(100vh - 112px)' }}>
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(150deg, #1a0a02 0%, #2d1005 35%, #4a181c 70%, #8B4513 100%)',
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Hero Body Grid - 100% Mobile & Desktop Responsive */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-5 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-6 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="space-y-3.5 sm:space-y-4">
            {/* Consolidated Pill Row */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <div
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.35)' }}
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Est. 2026 · Chandigarh, India</span>
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold"
                style={{ background: 'rgba(101,120,72,0.18)', color: '#8aaa52', border: '1px solid rgba(101,120,72,0.35)' }}
              >
                <Hand className="w-3 h-3" />
                100% Handmade
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold"
                style={{ background: 'rgba(101,120,72,0.18)', color: '#8aaa52', border: '1px solid rgba(101,120,72,0.35)' }}
              >
                <Leaf className="w-3 h-3" />
                Eco-Friendly
              </div>
            </div>

            {/* Headline */}
            <h1
              className="font-bold leading-[1.22]"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#FFF8F0',
                fontSize: 'clamp(1.6rem, 5.2vw, 2.5rem)',
              }}
            >
              Premium Indian Handicrafts —<br />
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
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-stone-300 max-w-lg">
              Handcrafted wooden artifacts, macrame creations, copperware &amp; home decor — 100% handmade by skilled artisans, shipped to 30+ countries.
            </p>

            {/* Mobile Category Card Banner (Visible only on mobile/tablet) */}
            <div className="lg:hidden my-3">
              <Link
                href={`/products?category=${encodeURIComponent(card0.name)}`}
                className="relative block w-full h-[180px] rounded-2xl overflow-hidden shadow-xl border border-[#D4AF37]/40 group"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={card0.name}
                    src={card0.image}
                    alt={card0.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/60 text-[#D4AF37] border border-[#D4AF37]/30">
                    {card0.tag}
                  </span>
                  <span className="text-[9px] font-semibold text-white/80 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Rotating Category 0{activeIndex + 1}/08
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider block">Featured Category</span>
                    <h4 className="text-white text-base font-bold font-serif leading-tight">{card0.name}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center flex-shrink-0 shadow-md">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-lg hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #b8962e)',
                  color: '#1C1C1C',
                  boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
                }}
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all hover:bg-white/15 text-[#FFF8F0]"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,248,240,0.3)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                Get a Quote
              </Link>

              <a
                href="https://wa.me/918288840802?text=Hello!%20I%20am%20interested%20in%20your%20handicraft%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all"
                style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)' }}
              >
                <svg viewBox="0 0 32 32" width="15" height="15" fill="currentColor">
                  <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {BADGES.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-xl p-2 sm:p-2.5 text-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5" style={{ color: '#D4AF37' }} />
                  <div className="text-sm sm:text-base font-bold text-[#FFF8F0]" style={{ fontFamily: 'Georgia, serif' }}>{value}</div>
                  <div className="text-[9px] sm:text-[10px] text-stone-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Desktop 4 Category Showcase Cards */}
          <div
            className="hidden lg:block relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Outer Orbit Dashed Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[380px] h-[380px] rounded-full border border-[#D4AF37]/30 animate-spin"
                style={{ animationDuration: '18s', borderStyle: 'dashed' }}
              />
            </div>

            {/* 4 Category Cards Container */}
            <div className="relative w-full aspect-square max-w-[420px] mx-auto p-2">
              <AnimatePresence mode="popLayout">
                {[
                  { card: card0, posKey: 'tl', posClass: 'top-0 left-0' },
                  { card: card1, posKey: 'tr', posClass: 'top-0 right-0' },
                  { card: card2, posKey: 'bl', posClass: 'bottom-0 left-0' },
                  { card: card3, posKey: 'br', posClass: 'bottom-0 right-0' },
                ].map(({ card, posKey, posClass }) => (
                  <motion.div
                    key={`card-${posKey}-${card.name}`}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className={`absolute ${posClass} w-[195px] h-[195px] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/40 group cursor-pointer`}
                  >
                    <Link href={`/products?category=${encodeURIComponent(card.name)}`}>
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-black/70 text-[#D4AF37] border border-[#D4AF37]/30">
                          {card.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
                        <span className="inline-block text-white text-xs font-bold font-serif leading-tight bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 group-hover:text-[#D4AF37] transition-colors truncate max-w-full">
                          {card.name}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Compact Center Orbit Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div
                  className="w-16 h-16 rounded-full flex flex-col items-center justify-center text-center shadow-xl transition-transform duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(26,10,2,0.92)',
                    border: '1.5px solid rgba(212,175,55,0.8)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 0 20px rgba(212,175,55,0.25)',
                  }}
                >
                  <RotateCw className="w-4 h-4 mb-0.5 animate-spin text-[#D4AF37]" style={{ animationDuration: '8s' }} />
                  <div className="text-[8px] font-bold uppercase tracking-wider text-white font-serif">
                    8 Export
                  </div>
                  <div className="text-[8px] text-[#D4AF37] font-semibold">
                    Categories
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {HERO_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show ${cat.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 bg-[#D4AF37]'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Ships from Chandigarh Badge */}
            <div className="flex justify-center mt-2">
              <div
                className="px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5"
                style={{ background: 'rgba(26,10,2,0.9)', border: '1px solid rgba(212,175,55,0.3)', backdropFilter: 'blur(8px)' }}
              >
                <span className="text-xs">🇮🇳</span>
                <span className="text-[11px] font-semibold text-[#FFF8F0]">Ships from Chandigarh, India</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Country Marquee Strip at bottom */}
      <div
        className="w-full py-1.5 overflow-hidden flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(4px)' }}
      >
        <div className="flex items-center gap-0" style={{ animation: 'marquee 30s linear infinite', width: 'max-content' }}>
          {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-[11px] font-medium px-4 whitespace-nowrap text-[#D4AF37]/90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w20/${c.code}.png`}
                srcSet={`https://flagcdn.com/w40/${c.code}.png 2x`}
                width={18}
                height={13}
                alt={c.name}
                style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
              />
              {c.name}
              <span className="ml-2.5 text-[#D4AF37]/30">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee keyframe */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
