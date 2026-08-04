'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, Quote, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  flag: string;
  avatar: string;
  rating: number;
  date: string;
  source: 'google' | 'etsy';
  verifiedProduct: string;
  title: string;
  reviewText: string;
  tag: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Lead Sourcing Director',
    company: 'Artisan Home UK Ltd.',
    location: 'London, United Kingdom',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '12 Jan 2026',
    source: 'google',
    verifiedProduct: '1,200 Pcs Handcrafted Wooden Sculptures',
    title: 'Zero breakage in transit & exceptional hand-carving quality!',
    reviewText: 'We sourced a custom lot of 1,200 teak and rosewood artifacts for our spring retail catalog. Sourcing directly from Vidhiraj eliminated middleman markups. Every single piece passed our strict UK quality audit. The vacuum-sealed moisture protection in the packing ensured zero humidity damage during maritime shipping.',
    tag: 'Wooden Handicrafts',
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Founder & Head of Procurement',
    company: 'Pacific Crafts & Decor LLC',
    location: 'California, United States',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '28 Dec 2025',
    source: 'etsy',
    verifiedProduct: '850 Pcs Solid Brass Figurines & Idols',
    title: 'Remarkable weight, brass purity, and OEM laser branding',
    reviewText: 'Finding authentic Indian brassware suppliers who adhere to strict weight tolerances and lead-free alloy standards used to be difficult. Vidhiraj provided complete metallurgy lab certificates and laser-etched our brand logo on the base of every brass figurine. Repeat orders are already in production!',
    tag: 'Brass Figurines',
  },
  {
    id: '3',
    name: 'Dr. Hans Weber',
    role: 'Product Category Manager',
    company: 'Bavarian Living GmbH',
    location: 'Munich, Germany',
    flag: '🇩🇪',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '04 Nov 2025',
    source: 'google',
    verifiedProduct: '3,000 Eco Coconut Shell Bowls & Candle Holders',
    title: 'Fast 10-day sample turnaround & flawless customs documentation',
    reviewText: 'German customs requires precise Certificate of Origin (COO), phytosanitary certificates, and HS code documentation. Vidhiraj’s export documentation team handled everything seamlessly without a single delay at Hamburg port. The polished coconut shell bowls sell out in days.',
    tag: 'Coconut Crafts',
  },
  {
    id: '4',
    name: 'Evelyn Tan',
    role: 'Boutique Chain Owner',
    company: 'Silk & Wood Decor',
    location: 'Singapore',
    flag: '🇸🇬',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '19 Oct 2025',
    source: 'etsy',
    verifiedProduct: '500 Customized Gifting Hampers',
    title: 'Exquisite custom packaging & low MOQ for luxury hampers',
    reviewText: 'We needed bespoke luxury packaging with velvet inner lining for a major corporate gifting order in Singapore. Vidhiraj modified the design within 48 hours and delivered the entire batch 5 days ahead of schedule. Truly a factory partner you can rely on.',
    tag: 'Custom OEM Orders',
  },
  {
    id: '5',
    name: 'Tariq Al-Maktoum',
    role: 'Managing Director',
    company: 'Al-Barakah General Trading',
    location: 'Dubai, United Arab Emirates',
    flag: '🇦🇪',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '15 Sep 2025',
    source: 'google',
    verifiedProduct: '40ft Container Wooden Furniture & Carvings',
    title: 'Consistent bulk supply & direct factory pricing without agents',
    reviewText: 'We have been importing handicrafts from India for over 12 years. Working with Vidhiraj Global Impex was a game changer — clear WhatsApp updates with video inspections prior to stuffing containers. Their pricing is unbeatable for the level of handmade craftsmanship.',
    tag: 'Wooden Handicrafts',
  },
  {
    id: '6',
    name: 'Claire Dubois',
    role: 'Eco Products Buyer',
    company: 'Maison Eco Crafts',
    location: 'Paris, France',
    flag: '🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '02 Aug 2025',
    source: 'etsy',
    verifiedProduct: '1,500 Coconut Shell Kitchenware Pieces',
    title: '100% natural, food-grade polished, eco-friendly certification',
    reviewText: 'EU environmental regulations are extremely strict regarding natural food containers. Vidhiraj supplied organic coconut oil polished bowls with zero chemical varnishes. Our French customers love the story of artisan women empowered through these products.',
    tag: 'Coconut Crafts',
  },
];

const CATEGORIES = ['All', 'Wooden Handicrafts', 'Brass Figurines', 'Coconut Crafts', 'Custom OEM Orders'];

export default function ReviewsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredReviews = activeCategory === 'All'
    ? REVIEWS
    : REVIEWS.filter((r) => r.tag === activeCategory);

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: '#FFF8F0' }}>
      {/* Background Subtle Pattern & Ambient Glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B4513 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION WITH VERIFIED BADGES & PLATFORM LOGOS */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
            <ShieldCheck size={16} color="#8B4513" />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8B4513' }}>
              Verified Buyer Feedback & Testimonials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
            Trusted by 500+ Wholesalers &amp; Importers Worldwide
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            Real feedback from verified international trade partners, boutique owners, and corporate buyers who rely on our Indian handicrafts for their inventory.
          </p>

          {/* GOOGLE & ETSY INTEGRATED RATING SUMMARY CARD */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 flex flex-col md:flex-row items-center justify-around gap-6">
            
            {/* Overall Score */}
            <div className="flex items-center gap-4 text-left">
              <div className="text-4xl font-extrabold text-amber-600" style={{ fontFamily: 'Georgia, serif' }}>
                4.9
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-700">
                  140+ International B2B Reviews
                </div>
                <div className="text-[11px] text-gray-400">
                  99.2% Positive Satisfaction Score
                </div>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-gray-200" />

            {/* Google Reviews Badge */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 transition-transform hover:scale-105">
              {/* Official Google Icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" className="flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  Google Reviews
                  <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-1.5 py-0.5 rounded">4.9 ★</span>
                </div>
                <div className="text-[11px] text-gray-500">Verified Exporter Profile</div>
              </div>
            </div>

            {/* Etsy Star Seller Badge */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-orange-50/60 border border-orange-100 transition-transform hover:scale-105">
              {/* Etsy Icon */}
              <div className="w-6 h-6 rounded-md bg-[#F1641E] flex items-center justify-center text-white font-extrabold text-xs flex-shrink-0" style={{ fontFamily: 'Georgia, serif' }}>
                E
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  Etsy Wholesaler
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.5 rounded">Star Seller</span>
                </div>
                <div className="text-[11px] text-gray-500">Top Rated Artisan Vendor</div>
              </div>
            </div>

          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'shadow-md scale-105'
                    : 'hover:bg-amber-100/50'
                }`}
                style={{
                  background: isActive ? '#8B4513' : '#fff',
                  color: isActive ? '#FFF8F0' : '#444',
                  border: isActive ? '1px solid #8B4513' : '1px solid #e2d2c0',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
              style={{
                border: '1px solid #f0e2d3',
                boxShadow: '0 4px 20px rgba(139,69,19,0.06)',
              }}
            >
              {/* Background Decorative Watermark Quote */}
              <Quote
                size={70}
                className="absolute top-4 right-4 text-amber-500/10 pointer-events-none group-hover:text-amber-500/20 transition-colors"
              />

              <div>
                {/* Top Bar: Source Badge & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    {review.source === 'google' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                        <svg viewBox="0 0 24 24" width="12" height="12">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Google Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-900 bg-orange-100/70 px-2.5 py-1 rounded-full border border-orange-200">
                        <span className="w-3 h-3 bg-[#F1641E] text-white text-[9px] font-bold rounded-sm flex items-center justify-center">E</span>
                        Etsy Wholesale
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                </div>

                {/* Specific Highlight Title */}
                <h3
                  className="text-base font-bold mb-2 text-gray-900 group-hover:text-amber-900 transition-colors leading-snug"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  &ldquo;{review.title}&rdquo;
                </h3>

                {/* Review Text */}
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {review.reviewText}
                </p>

                {/* Verified Purchase Tag */}
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg mb-5 border border-emerald-100">
                  <CheckCircle2 size={13} className="flex-shrink-0 text-emerald-600" />
                  <span className="truncate">{review.verifiedProduct}</span>
                </div>
              </div>

              {/* USER PROFILE INFO FOOTER */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-400/40 shadow-sm">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="44px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-gray-900 truncate" style={{ fontFamily: 'Georgia, serif' }}>
                    {review.name}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium truncate">
                    {review.role}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate flex items-center gap-1">
                    <span>{review.flag}</span>
                    <span className="truncate">{review.company}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM STATS & CALL TO ACTION BANNER */}
        <div
          className="mt-14 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #3a1a06 100%)', border: '1px solid #8B4513' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <TrendingUp size={28} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-amber-400" style={{ fontFamily: 'Georgia, serif' }}>
                Join 500+ Satisfied Importers Worldwide
              </h4>
              <p className="text-xs text-amber-100/70 mt-1 max-w-xl">
                Get direct factory pricing, 0% design fees, and reliable international door-to-door delivery with custom OEM packaging.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/inquiry"
              className="px-6 py-3 rounded-lg font-semibold text-xs transition-all flex items-center gap-2 shadow-md hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C' }}
            >
              Request Sample &amp; Quote
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
