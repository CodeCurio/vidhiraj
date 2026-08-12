import Image from 'next/image';
import Link from 'next/link';
import { Users, Award, Globe, Leaf, Heart, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import ManufacturingCapabilities from '@/components/ManufacturingCapabilities';

export const metadata: Metadata = {
  title: 'About Us — Indian Handicraft Manufacturer & Direct Exporter, Chandigarh | Vidhiraj Global Impex',
  description:
    'Vidhiraj Global Impex is a direct manufacturer of handmade wooden artifacts, macrame creations, copperware & home decor in Chandigarh, India. 100+ artisans, 500+ global clients, 30+ export countries.',
  keywords: [
    'indian handicraft manufacturer',
    'direct handicraft exporter india',
    'chandigarh handicraft manufacturer',
    'handmade handicraft company india',
    'wholesale handicraft supplier india',
    'macrame exporter india',
    'copperware manufacturer india',
    'wooden toys puzzles exporter',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Vidhiraj Global Impex — Direct Handicraft Manufacturer, India',
    description:
      'Direct manufacturer of handmade wooden artifacts, macrame, copperware & home decor from Chandigarh, India. 500+ global clients across 30+ countries.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://vidhirajglobalimpex.com/about' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── 1. HERO SECTION ── */}
      <section
        className="relative py-24 flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A0A02 0%, #3a1a06 40%, #8B4513 100%)',
          paddingTop: '130px',
        }}
      >
        {/* Background Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
                Our Story
              </span>
              <span className="text-xs sm:text-sm italic font-semibold text-[#D4AF37]/80 font-serif">
                — Exporting Dreams
              </span>
            </div>

            <h1
              className="text-3xl sm:text-5xl font-bold mt-2 mb-5 leading-tight"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              About Vidhiraj Global Impex
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#e0c8b0]">
              Bringing the rich artisan heritage of India to global markets from Chandigarh. Premium handicraft manufacturer &amp; direct exporter to 30+ countries.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. WHO WE ARE ── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6 text-[#1C1C1C] font-serif leading-snug">
                Crafting Stories, Connecting Cultures
              </h2>

              <p className="text-sm sm:text-base leading-relaxed mb-4 text-stone-600">
                Vidhiraj Global Impex — a venture of Vidhiraj Group of Companies — was established in 2026 in Chandigarh, India. Founded by a family of master artisans with generations of knowledge in traditional Indian crafts, we began with a dedicated workshop and a clear vision: to share India&apos;s artisanal excellence with international buyers worldwide.
              </p>

              <p className="text-sm sm:text-base leading-relaxed mb-4 text-stone-600">
                Today, we are a full-scale manufacturing and export enterprise employing a team of 100+ skilled artisans, modern production facilities, and a dedicated export documentation team. We supply wholesalers, boutique chains, retailers, and private label brands across 30+ countries.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-stone-600">
                Our export range includes copper handicraft, macrame bags, macrame cushions, macrame wall hangings, wooden puzzles, wooden toys, home decor, and traditional kitchenware — all 100% handmade using sustainable materials with strict export quality standards.
              </p>
            </div>

            {/* Image Collage Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ paddingTop: '120%' }}>
                <Image
                  src="/categories/copper-handicraft.jpg"
                  alt="Artisan copper handicraft crafting"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="400px"
                />
              </div>

              <div className="grid grid-rows-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ paddingTop: '90%' }}>
                  <Image
                    src="/categories/macrame-wall-hanging.jpg"
                    alt="Macrame wall hanging crafting"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="300px"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ paddingTop: '90%' }}>
                  <Image
                    src="/categories/wooden-puzzles.jpg"
                    alt="Handmade wooden puzzles and toys"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="300px"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. MISSION, VISION & VALUES ── */}
      <section className="py-16 sm:py-20 px-4 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-[#1C1C1C] font-serif">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={26} className="text-[#8B4513]" />,
                title: 'Our Mission',
                desc: "To empower India's artisan communities by connecting their craft to global markets, ensuring fair wages and sustainable livelihoods while delivering premium quality products to international buyers.",
              },
              {
                icon: <Lightbulb size={26} className="text-[#8B4513]" />,
                title: 'Our Vision',
                desc: 'To become the most trusted Indian handicraft export company worldwide, recognized for quality, reliability, and innovation in artisan-made products.',
              },
              {
                icon: <Leaf size={26} className="text-[#8B4513]" />,
                title: 'Our Values',
                desc: "Authenticity, sustainability, and craftsmanship excellence. We believe that handmade is not just a product category — it's a story of human creativity and cultural heritage.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 text-center border border-[#F5E4D2] shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#FFF8F0] border-2 border-[#D4AF37]"
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-[#1C1C1C] font-serif">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MANUFACTURING CAPABILITY WITH ANIMATED STATS & DIAGONAL CARDS ── */}
      <ManufacturingCapabilities />

      {/* ── 5. EXPORT STRENGTH ── */}
      <section className="py-16 sm:py-20 px-4 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
              Global Footprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-[#FFF8F0] font-serif">
              Our Export Strength
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe size={24} className="text-[#D4AF37]" />, value: '30+', label: 'Export Countries' },
              { icon: <Users size={24} className="text-[#D4AF37]" />, value: '500+', label: 'Active Clients' },
              { icon: <Award size={24} className="text-[#D4AF37]" />, value: '100%', label: 'Quality Assured' },
              { icon: <CheckCircle2 size={24} className="text-[#D4AF37]" />, value: '10K+', label: 'Completed Orders' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-6 text-center bg-[#252525] border border-[#333] shadow-md"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold mb-1 text-[#FFF8F0] font-serif">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-stone-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OUR PRINCIPLES (WHAT WE STAND FOR) ── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37]">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-[#1C1C1C] font-serif">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Artisan Welfare', desc: 'We pay above market wages and provide health benefits to all our artisans. Fair trade is not just a label — it is our way of doing business.' },
              { title: 'Authentic Craftsmanship', desc: 'All products are handmade using traditional Indian techniques passed down through generations. No machines replace the human touch.' },
              { title: 'Sustainable Practices', desc: 'We use eco-friendly materials, minimize waste, and prefer natural dyes where possible. Our packaging is 100% recyclable.' },
              { title: 'Buyer Transparency', desc: 'No hidden costs. We provide complete cost breakdowns, production timelines, and regular shipment updates for every order.' },
              { title: 'On-time Delivery', desc: 'We understand the importance of inventory planning. Our production planning ensures on-time delivery for 98% of all orders.' },
              { title: 'Quality Assurance', desc: '3-stage quality inspection: raw material check, mid-production review, and final pre-shipment inspection before every order is dispatched.' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 bg-[#FFF8F0] border border-[#F5E4D2] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-6 rounded mb-4 bg-[#D4AF37]" />
                <h3 className="text-base font-bold mb-2 text-[#1C1C1C] font-serif">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PARTNER WITH US CTA ── */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #2d1a08 50%, #1C1C1C 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block mb-4 bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
            Global Sourcing Partner
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#FFF8F0] font-serif">
            Partner With Vidhiraj
          </h2>

          <p className="text-sm sm:text-base max-w-2xl mx-auto mb-8 text-[#FFF8F0]/70 leading-relaxed">
            Join 500+ international buyers across 30+ countries who rely on us for premium handcrafted products, reliable delivery, and factory-direct pricing.
          </p>

          {/* Feature Chips */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {[
              '✋ 100% Handmade',
              '🌿 Eco-Friendly',
              '🏭 Direct Manufacturer',
              '📦 Custom OEM / ODM',
              '🌍 30+ Countries Shipped',
              '⚡ 98% On-time Delivery',
              '🔍 3-Stage QC',
              '💰 Volume Discounts',
            ].map((chip) => (
              <span
                key={chip}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/5 text-[#FFF8F0]/80 border border-[#D4AF37]/20"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider text-[#1C1C1C] shadow-lg transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)' }}
            >
              Send an Inquiry
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-xs sm:text-sm text-[#FFF8F0] border border-white/20 hover:bg-white/10 transition-colors"
            >
              Talk to Our Team
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-xs sm:text-sm text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
