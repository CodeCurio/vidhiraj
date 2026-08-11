import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Zap, CheckCircle, Hand, Leaf } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Choose Vidhiraj — Direct Manufacturer, 98% On-time, Ships to 30+ Countries',
  description: '500+ international buyers trust Vidhiraj for 100% handmade quality, factory-direct pricing, OEM manufacturing, 3-stage QC, and 98% on-time delivery to 30+ countries.',
  keywords: [
    'best indian handicraft exporter',
    'reliable handicraft manufacturer india',
    'direct manufacturer handicrafts india',
    'quality handicraft supplier india',
    'why buy handicrafts from india',
  ],
  alternates: { canonical: '/why-choose-us' },
  openGraph: {
    title: 'Why Choose Vidhiraj — Trusted by 500+ International Buyers',
    description: '100% handmade, factory-direct pricing, OEM manufacturing, 98% on-time delivery. 500+ buyers across 30+ countries.',
    url: '/why-choose-us',
    type: 'website',
  },
};

export default function WhyChooseUsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'Why Choose Us', item: 'https://vidhirajglobalimpex.com/why-choose-us' },
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
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Our Advantages
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              Why Choose Vidhiraj?
            </h1>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#e0c8b0' }}>
              Trusted by 500+ international buyers across 30+ countries. Here is what makes us different.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(101,120,72,0.25)', color: '#a8c46a', border: '1px solid rgba(101,120,72,0.4)' }}>
                <Hand className="w-3 h-3" />
                100% Handmade
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(101,120,72,0.25)', color: '#a8c46a', border: '1px solid rgba(101,120,72,0.4)' }}>
                <Leaf className="w-3 h-3" />
                Eco-Friendly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Our Edge
            </span>
            <h2 className="section-title mt-2">8 Reasons Buyers Trust Us</h2>
          </div>

          <div className="space-y-12">
            {[
              {
                icon: <Star size={32} />,
                title: 'Uncompromising Quality',
                desc: 'Every product that leaves our facility passes through a rigorous 3-stage quality inspection. We use only premium natural materials — select hardwood, pure brass alloy — sourced from trusted suppliers. Our defect rate is below 0.5%, which is why buyers keep reordering.',
                points: ['Premium grade raw materials only', '3-stage quality inspection process', 'Pre-shipment inspection report provided', 'Less than 0.5% defect rate'],
                image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80',
                reverse: false,
              },
              {
                icon: <Users size={32} />,
                title: 'Direct from Manufacturer',
                desc: 'We are the manufacturer. No middlemen, no agents, no commission layers. When you deal with Vidhiraj, you deal directly with our production team. This means better prices, faster communication, and complete transparency on production timelines.',
                points: ['No middlemen or agents', 'Factory-direct pricing', 'Direct communication with production team', 'Full production transparency'],
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
                reverse: true,
              },
              {
                icon: <Hand size={32} />,
                title: '100% Handmade — Always',
                desc: 'Every product we manufacture is crafted entirely by hand using traditional Indian techniques passed down through generations. No machines replace our artisans. Each piece carries authentic human craftsmanship — visible in the finish, the texture, and the detail that machine-made products simply cannot replicate.',
                points: ['Crafted by 100+ skilled Indian artisans', 'Traditional techniques, generation-tested', 'No machine replication — ever', 'Each piece unique with authentic handmade character'],
                image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80',
                reverse: false,
              },
              {
                icon: <Leaf size={32} />,
                title: 'Eco-Friendly by Design',
                desc: 'Sustainability is built into how we work, not added as a label. We use natural materials — wood, brass — avoid synthetic dyes where possible, and package every order in 100% recyclable materials. Buying from us means supporting ethical, planet-conscious manufacturing.',
                points: ['Natural materials: wood, brass', 'Eco-conscious dyeing & finishing processes', '100% recyclable export packaging', 'Zero single-use plastics in our workshop'],
                image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
                reverse: true,
              },
              {
                icon: <Zap size={32} />,
                title: 'Fast Turnaround & On-time Delivery',
                desc: 'We understand that inventory planning is critical for your business. Our production planning team ensures that your order is manufactured and dispatched on schedule. We maintain a 98% on-time delivery record across all international shipments.',
                points: ['Standard production: 30-45 days', 'Rush orders: 15-20 days (premium)', '98% on-time delivery record', 'Regular production updates via email/WhatsApp'],
                image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=600&q=80',
                reverse: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${item.reverse ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={item.reverse ? 'lg:order-2' : ''}>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'rgba(139,69,19,0.1)' }}
                  >
                    <span style={{ color: '#8B4513' }}>{item.icon}</span>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#555' }}>
                    {item.desc}
                  </p>
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                        <CheckCircle size={15} color="#D4AF37" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative rounded-2xl overflow-hidden ${item.reverse ? 'lg:order-1' : ''}`} style={{ paddingTop: '65%' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4" style={{ background: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Credentials
            </span>
            <h2 className="section-title mt-2">Certifications & Registrations</h2>
            <p className="section-subtitle">Fully compliant, government-registered, and internationally recognized</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                logo: '/certs/dgft.svg',
                title: 'DGFT Registered',
                desc: 'Registered Export House — Directorate General of Foreign Trade',
              },
              {
                logo: '/certs/iso9001.svg',
                title: 'ISO 9001:2015',
                desc: 'Quality Management System — International Standard Certified',
              },
              {
                logo: '/certs/epch.svg',
                title: 'EPCH Member',
                desc: 'Export Promotion Council for Handicrafts — Ministry of Textiles',
              },
              {
                logo: '/certs/msme.svg',
                title: 'MSME / Udyam',
                desc: 'Udyam Registered Enterprise — Ministry of MSME, Govt. of India',
              },
              {
                logo: '/certs/gst.svg',
                title: 'GST Registered',
                desc: 'Fully GST compliant manufacturer with valid GSTIN',
              },
            ].map((cert) => (
              <div
                key={cert.title}
                className="rounded-xl p-5 text-center flex flex-col items-center"
                style={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}
              >
                <div className="w-full mb-4" style={{ maxWidth: 140 }}>
                  <Image
                    src={cert.logo}
                    alt={cert.title}
                    width={140}
                    height={85}
                    style={{ objectFit: 'contain', width: '100%', height: 'auto', borderRadius: 8 }}
                  />
                </div>
                <h3 className="text-sm font-bold mb-1.5" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                  {cert.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#888' }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4" style={{ background: '#1C1C1C' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '10K+', label: 'Orders Fulfilled' },
              { value: '30+', label: 'Export Countries' },
              { value: '500+', label: 'Happy Clients' },
              { value: '98%', label: 'On-time Delivery' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#aaa' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Verified Reviews
            </span>
            <h2 className="section-title mt-2">Client Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'David Tan',
                company: 'Orient Crafts Pte Ltd',
                country: '🇸🇬 Singapore',
                text: 'Vidhiraj Global Impex is our exclusive supplier for wooden and brass handicrafts. The quality is outstanding and their team is incredibly professional. They helped us develop an exclusive collection for our brand.',
                rating: 5,
                image: 'https://picsum.photos/seed/t1/100/100',
              },
              {
                name: 'Marie Dupont',
                company: 'La Boutique Artisanale',
                country: '🇫🇷 France',
                text: 'Perfect communication, beautiful products, and on-time delivery. What more can a buyer ask for? We have placed 8 orders so far and each one has been flawless. The custom packaging they created for us is absolutely stunning.',
                rating: 5,
                image: 'https://picsum.photos/seed/t2/100/100',
              },
              {
                name: 'Omar Al Rashid',
                company: 'Dubai Lifestyle Co.',
                country: '🇦🇪 UAE',
                text: 'We source handicrafts from multiple countries but nothing compares to the quality we get from Vidhiraj. Their attention to detail and dedication to customer satisfaction is unmatched. Highly recommend!',
                rating: 5,
                image: 'https://picsum.photos/seed/t3/100/100',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-xl p-6"
                style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: '#555' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#1C1C1C' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: '#888' }}>{t.company} · {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: '#FFF8F0' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">Experience the Vidhiraj Difference</h2>
          <p className="section-subtitle">
            Start with a sample order and see why 500+ international buyers choose us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inquiry" className="btn-primary px-8 py-3">
              Request Samples
            </Link>
            <Link href="/products" className="btn-gold px-8 py-3">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
