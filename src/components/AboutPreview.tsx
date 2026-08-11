'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Hand,
  Factory,
  Leaf,
  Palette,
  ShieldCheck,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Box,
} from 'lucide-react';

const WHY_US_HIGHLIGHTS = [
  {
    icon: Hand,
    title: '100% Handmade Crafting',
    desc: 'Every artifact is hand-carved by master artisans. Authentic heritage craftsmanship with zero machine replication.',
    tag: 'Authentic Art',
  },
  {
    icon: Factory,
    title: 'Direct Factory Pricing',
    desc: 'We are the direct manufacturer with our own workshop in Chandigarh. Deal directly with us — zero agent markups.',
    tag: 'Zero Middlemen',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly & Sustainable',
    desc: 'Sustainably sourced natural wood and pure brass with 100% recyclable export packaging.',
    tag: 'Sustainable',
  },
  {
    icon: Palette,
    title: 'OEM & Custom Branding',
    desc: 'Custom colors, sizes, laser logo engraving, and private-label luxury velvet boxes with zero design fees.',
    tag: 'Custom OEM',
  },
  {
    icon: ShieldCheck,
    title: '3-Stage Quality Assurance',
    desc: 'Rigorous inspection at raw material intake, mid-production crafting, and final pre-shipment stuffing.',
    tag: '99.5% Pass Rate',
  },
  {
    icon: Globe,
    title: 'Global Export Delivery',
    desc: 'Door-to-door sea & air freight shipping to 30+ countries with complete customs COO & Phytosanitary paperwork.',
    tag: '30+ Countries',
  },
];

const QUICK_STATS = [
  { value: '10K+', label: 'Orders Fulfilled' },
  { value: '30+', label: 'Countries Served' },
  { value: '200+', label: 'Product Designs' },
  { value: '500+', label: 'Happy Buyers' },
];

export default function AboutPreview() {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B4513 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}>
            <Sparkles size={14} color="#8B4513" />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8B4513' }}>
              Our Heritage &amp; Manufacturing Advantage
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
            style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
          >
            Why International Buyers Partner With Vidhiraj
          </h2>

          <p className="text-base text-gray-600 leading-relaxed">
            Vidhiraj Global Impex is an end-to-end handicraft manufacturer and exporter from India. A premier venture of the Vidhiraj Group of Companies, we combine traditional artisan heritage with modern export reliability.
          </p>
        </div>

        {/* MAIN SPLIT GRID: STORY ON LEFT + WHY US CARDS ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-14">
          
          {/* LEFT: ABOUT STORY CARD */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl p-7 sm:p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #3a1a06 100%)', color: '#FFF8F0' }}>
            
            {/* Subtle dot pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="relative z-10 space-y-5">
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                About Vidhiraj Global Impex
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                Crafting Indian Art. Exporting Quality Worldwide.
              </h3>

              <p className="text-sm leading-relaxed text-stone-300">
                We own our workshop in Chandigarh, India, employing over 100 master artisans. From raw wood selection to brass casting and moisture-proof packing, we handle everything under one roof.
              </p>

              {/* Quick Stats Pill Row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {QUICK_STATS.map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                    <div className="text-xl font-bold text-amber-400" style={{ fontFamily: 'Georgia, serif' }}>
                      {s.value}
                    </div>
                    <div className="text-[11px] text-stone-300">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/about"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C' }}
              >
                Learn More Story
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/inquiry"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs transition-all text-center border border-stone-600 hover:bg-white/10 text-stone-200"
              >
                Get Quote
              </Link>
            </div>

          </div>

          {/* RIGHT: WHY US HIGHLIGHTS GRID (6 ELEGANT CARDS) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_US_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 border border-stone-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex flex-col justify-between"
                  style={{ boxShadow: '0 2px 12px rgba(139,69,19,0.04)' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-900 group-hover:bg-[#8B4513] group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-amber-900 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                    <CheckCircle2 size={13} className="text-amber-600" />
                    <span>Verified Export Standard</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* TRUST HIGHLIGHTS BAR AT BOTTOM */}
        <div className="rounded-2xl p-5 bg-[#FFF8F0] border border-[#f0e0cc] flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <Clock size={16} className="text-[#8B4513]" />
            <span>10–15 Days Fast Sample Lead Time</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-[#e2d0bc]" />
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <Box size={16} className="text-[#8B4513]" />
            <span>Moisture-Barrier Export Box Packing</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-[#e2d0bc]" />
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <ShieldCheck size={16} className="text-[#8B4513]" />
            <span>Zero Minimum Custom Design Fee</span>
          </div>
        </div>

      </div>
    </section>
  );
}
