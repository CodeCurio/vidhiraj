import Image from 'next/image';
import Link from 'next/link';
import { Users, Award, Globe, Leaf, Heart, Lightbulb, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Indian Handicraft Manufacturer & Direct Exporter, Chandigarh',
  description: 'Vidhiraj Global Impex is a direct manufacturer of handmade wooden artifacts, brass figurines & coconut handicrafts in Chandigarh, India. 100+ artisans, 500+ global clients, 30+ export countries.',
  keywords: [
    'indian handicraft manufacturer',
    'direct handicraft exporter india',
    'chandigarh handicraft manufacturer',
    'handmade handicraft company india',
    'wholesale handicraft supplier india',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Vidhiraj Global Impex — Direct Handicraft Manufacturer, India',
    description: 'Direct manufacturer of handmade wooden, brass & coconut handicrafts from Chandigarh, India. 500+ global clients across 30+ countries.',
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
      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{
          background: 'linear-gradient(135deg, #3a1a06 0%, #8B4513 100%)',
          paddingTop: '120px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>Our Story</span>
              <span className="text-sm italic font-semibold" style={{ color: 'rgba(212,175,55,0.75)', fontFamily: 'Georgia, serif' }}>— Exporting Dreams</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              About Vidhiraj Global Impex
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              Bringing the artisan heritage of India to global markets from Chandigarh.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
                Who We Are
              </span>
              <h2 className="section-title mt-2">Crafting Stories, Connecting Cultures</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#555' }}>
                Vidhiraj Global Impex — a venture of Vidhiraj Group of Companies — was established in 2026 in Chandigarh, India. Founded by a family of artisans with generations of knowledge in traditional Indian crafts, we began with a small workshop and a big dream: to share India&apos;s artisanal excellence with the world.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#555' }}>
                Today, we are a full-scale manufacturing and export company with a team of 100+ skilled artisans, modern production facilities, and a dedicated export management team. We work with wholesalers, boutiques, e-commerce retailers, and branded labels across 30+ countries.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#555' }}>
                Our product range includes handmade wooden artifacts, brass figurines, coconut shell decor, and a variety of artisan crafts — all 100% handmade with traditional techniques, eco-friendly materials, and contemporary design sensibility.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden" style={{ paddingTop: '120%' }}>
                <Image
                  src="https://picsum.photos/seed/about1/400/500"
                  alt="Artisan crafting"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="300px"
                />
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="relative rounded-xl overflow-hidden" style={{ paddingTop: '90%' }}>
                  <Image
                    src="https://picsum.photos/seed/about2/400/360"
                    alt="Workshop"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden" style={{ paddingTop: '90%' }}>
                  <Image
                    src="https://picsum.photos/seed/about3/400/360"
                    alt="Products"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4" style={{ background: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              What Drives Us
            </span>
            <h2 className="section-title mt-2">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={28} />,
                title: 'Our Mission',
                desc: 'To empower India\'s artisan communities by connecting their craft to global markets, ensuring fair wages and sustainable livelihoods while delivering premium quality products to international buyers.',
              },
              {
                icon: <Lightbulb size={28} />,
                title: 'Our Vision',
                desc: 'To become the most trusted Indian handicraft export company worldwide, recognized for quality, reliability, and innovation in artisan-made products.',
              },
              {
                icon: <Leaf size={28} />,
                title: 'Our Values',
                desc: 'Authenticity, sustainability, and craftsmanship excellence. We believe that handmade is not just a product category — it\'s a story of human creativity and cultural heritage.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-8 text-center"
                style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: '#FFF8F0', border: '2px solid #D4AF37' }}
                >
                  <span style={{ color: '#8B4513' }}>{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capability */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
                Production Strength
              </span>
              <h2 className="section-title mt-2">Manufacturing Capability</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#555' }}>
                Our 10,000 sq. ft. production facility in Chandigarh houses dedicated sections for wood carving, brass casting & finishing, coconut shell crafting, quality control, and packaging. We have the capacity to fulfill both small boutique orders and large wholesale volumes.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Monthly capacity: 50,000+ units across all product lines',
                  'Dedicated QC team with 3-stage inspection process',
                  'In-house design studio for custom & OEM orders',
                  'Eco-friendly and fair-trade manufacturing practices',
                  'ISO-aligned quality management systems',
                  'Digital sample approval process for fast turnaround',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle size={18} color="#D4AF37" className="mt-0.5 flex-shrink-0" />
                    <span className="text-sm" style={{ color: '#555' }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '100+', label: 'Skilled Artisans' },
                { value: '50K+', label: 'Monthly Capacity' },
                { value: '200+', label: 'Product Designs' },
                { value: '3', label: 'QC Checkpoints' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-6 text-center"
                  style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
                >
                  <div className="text-4xl font-bold mb-2" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export Strength */}
      <section className="py-16 px-4" style={{ background: '#1C1C1C' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Global Footprint
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-3" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
              Our Export Strength
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe size={24} />, value: '30+', label: 'Export Countries', color: '#D4AF37' },
              { icon: <Users size={24} />, value: '500+', label: 'Active Clients', color: '#D4AF37' },
              { icon: <Award size={24} />, value: '100%', label: 'Quality Assured', color: '#D4AF37' },
              { icon: <CheckCircle size={24} />, value: '10K+', label: 'Completed Orders', color: '#D4AF37' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-6 text-center"
                style={{ background: '#2a2a2a', border: '1px solid #333' }}
              >
                <span style={{ color: stat.color }}>{stat.icon}</span>
                <div className="text-4xl font-bold mt-3 mb-1" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#aaa' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Our Principles
            </span>
            <h2 className="section-title mt-2">What We Stand For</h2>
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
                className="rounded-xl p-6"
                style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
              >
                <div className="w-2 h-6 rounded mb-4" style={{ background: '#D4AF37' }} />
                <h3 className="text-base font-bold mb-2" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Partner With Us */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #2d1a08 50%, #1C1C1C 100%)' }}
      >
        {/* Decorative dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* Gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, #D4AF37, transparent 70%)' }}
        />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block mb-4"
              style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>
              Global Sourcing Partner
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
              Partner With Vidhiraj
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,248,240,0.65)' }}>
              Join 500+ international buyers across 30+ countries who rely on us for premium handcrafted products, reliable delivery, and factory-direct pricing.
            </p>
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
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
                className="text-sm font-medium px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,248,240,0.8)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}
            >
              Send an Inquiry
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#FFF8F0', border: '1px solid rgba(255,248,240,0.2)' }}
            >
              Talk to Our Team
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'transparent', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.4)' }}
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
