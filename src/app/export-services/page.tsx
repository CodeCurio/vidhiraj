import Link from 'next/link';
import { Package, Truck, Palette, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Export Services — Worldwide Shipping, OEM Manufacturing & Customs Docs',
  description: 'End-to-end export services from India: DHL/FedEx/sea freight, custom packaging, OEM manufacturing, bulk discounts & complete export documentation (COO, GSP, Bill of Lading).',
  keywords: [
    'handicraft export services india',
    'OEM handicraft manufacturing india',
    'import handicrafts from india shipping',
    'india handicraft customs documentation',
    'bulk handicraft order india sea freight',
    'custom branded handicrafts india',
  ],
  alternates: { canonical: '/export-services' },
  openGraph: {
    title: 'Export Services — Worldwide Shipping & OEM Handicraft Manufacturing',
    description: 'End-to-end export: DHL/FedEx/sea freight, OEM manufacturing, bulk discounts & complete customs docs from India.',
    url: '/export-services',
    type: 'website',
  },
};

export default function ExportServicesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'Export Services', item: 'https://vidhirajglobalimpex.com/export-services' },
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
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>Global Trade</span>
              <span className="text-sm italic font-semibold" style={{ color: 'rgba(212,175,55,0.75)', fontFamily: 'Georgia, serif' }}>— Exporting Dreams</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              Export Services
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              End-to-end export solutions for international buyers. From production to your doorstep — we handle everything.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              What We Offer
            </span>
            <h2 className="section-title mt-2">Our Export Capabilities</h2>
            <p className="section-subtitle">
              We make international trade simple, transparent, and reliable for all buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Custom Packaging */}
            <div
              className="rounded-xl p-8"
              style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(139,69,19,0.1)' }}
              >
                <Package size={28} color="#8B4513" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Custom Packaging
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#666' }}>
                We offer fully customizable packaging solutions to align with your brand identity. Whether you need logo-printed boxes, custom tissue paper, branded hang tags, or luxury gift packaging — we deliver it all.
              </p>
              <ul className="space-y-2">
                {[
                  'Logo printing on boxes and product packaging',
                  'Custom color tissue paper & ribbons',
                  'Hang tags with your brand details',
                  'Retail-ready packaging for boutiques',
                  'Eco-friendly packaging options',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                    <CheckCircle size={14} color="#D4AF37" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Global Logistics */}
            <div
              className="rounded-xl p-8"
              style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(139,69,19,0.1)' }}
              >
                <Truck size={28} color="#8B4513" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Global Logistics
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#666' }}>
                We work with leading international freight partners to ensure your shipment arrives safely, on time, and at the most competitive rates. We handle all export documentation on your behalf.
              </p>
              <ul className="space-y-2">
                {[
                  'Air freight: DHL, FedEx, UPS, Aramex',
                  'Sea freight for large volume orders',
                  'Complete export documentation (GSP, COO, etc.)',
                  'Insurance coverage on all shipments',
                  'Real-time tracking updates',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                    <CheckCircle size={14} color="#D4AF37" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Customization / OEM */}
            <div
              className="rounded-xl p-8"
              style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(139,69,19,0.1)' }}
              >
                <Palette size={28} color="#8B4513" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                OEM & Custom Designs
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#666' }}>
                Our in-house design team can bring your vision to life. Send us your design, color palette, or inspiration — and we will produce it exclusively for your brand.
              </p>
              <ul className="space-y-2">
                {[
                  'Custom wood stains, brass finishes & coconut textures',
                  'Exclusive design development',
                  'Brand logo engraving & custom wood/brass finishing',
                  'Seasonal collection development',
                  'No design fee for orders above MOQ',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                    <CheckCircle size={14} color="#D4AF37" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bulk Orders */}
            <div
              className="rounded-xl p-8"
              style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(139,69,19,0.1)' }}
              >
                <BarChart3 size={28} color="#8B4513" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Bulk Order Discounts
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#666' }}>
                The more you order, the more you save. We offer tiered pricing for volume orders to help you maximize margins. Our pricing structure is transparent and competitive.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#8B4513' }}>
                      <th className="py-2 px-3 text-left text-white text-xs">Order Qty</th>
                      <th className="py-2 px-3 text-left text-white text-xs">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { qty: '100 – 499 pcs', discount: '5%' },
                      { qty: '500 – 999 pcs', discount: '10%' },
                      { qty: '1,000 – 4,999 pcs', discount: '15%' },
                      { qty: '5,000+ pcs', discount: 'Custom' },
                    ].map((row, i) => (
                      <tr key={row.qty} style={{ background: i % 2 === 0 ? '#fff' : '#FFF8F0' }}>
                        <td className="py-2 px-3" style={{ color: '#555' }}>{row.qty}</td>
                        <td className="py-2 px-3 font-semibold" style={{ color: '#8B4513' }}>{row.discount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 px-4" style={{ background: '#1C1C1C' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              How It Works
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-3" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
              Our Export Process
            </h2>
            <p className="text-base" style={{ color: '#aaa' }}>
              A simple, transparent process from inquiry to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Inquiry', desc: 'Send us your product requirements, quantity, and target budget.' },
              { step: '02', title: 'Design', desc: 'We create designs or confirm existing Catalogue items. Samples sent for approval.' },
              { step: '03', title: 'Manufacture', desc: 'Full production begins after sample approval and advance payment.' },
              { step: '04', title: 'Pack', desc: 'Products are inspected, quality-checked, and packed per your specifications.' },
              { step: '05', title: 'Ship', desc: 'Shipment dispatched with full tracking. Documents sent electronically.' },
            ].map((step, i) => (
              <div key={step.step} className="flex flex-col items-center text-center relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4"
                  style={{ background: '#D4AF37', color: '#1C1C1C' }}
                >
                  {step.step}
                </div>
                {i < 4 && (
                  <div className="hidden lg:block absolute" style={{ left: 'calc(50% + 32px)', top: 28, right: 'calc(-50% + 32px)' }}>
                    <ArrowRight size={20} color="#444" />
                  </div>
                )}
                <h3 className="text-base font-bold mb-2" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 px-4" style={{ background: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
                Documentation
              </span>
              <h2 className="section-title mt-2">Export Documentation We Handle</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#555' }}>
                Our experienced export team manages all paperwork so you can focus on growing your business. We are fully registered with Indian export authorities and comply with all international trade regulations.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Commercial Invoice',
                  'Packing List',
                  'Certificate of Origin',
                  'GSP Certificate',
                  'Bill of Lading / Airway Bill',
                  'Phytosanitary Certificate',
                  'Export Declaration',
                  'Insurance Certificate',
                ].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-2 rounded px-3 py-2 text-sm"
                    style={{ background: '#fff', border: '1px solid #f0e0cc', color: '#555' }}
                  >
                    <CheckCircle size={14} color="#D4AF37" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-8" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Quick Payment Terms
              </h3>
              <div className="space-y-4">
                {[
                  { term: 'T/T (Wire Transfer)', desc: '30% advance, 70% before shipment' },
                  { term: 'PayPal', desc: 'Available for smaller orders (fees apply)' },
                  { term: 'Letter of Credit (L/C)', desc: 'Available for established buyers' },
                  { term: 'Western Union', desc: 'Available for sample payments' },
                ].map((item) => (
                  <div key={item.term} className="border-b pb-3 last:border-0 last:pb-0" style={{ borderColor: '#f0e0cc' }}>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: '#8B4513' }}>{item.term}</div>
                    <div className="text-xs" style={{ color: '#888' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">Ready to Start Importing?</h2>
          <p className="section-subtitle">
            Contact our export team for a detailed quotation tailored to your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inquiry" className="btn-primary px-8 py-3">
              Request a Quote
            </Link>
            <Link href="/contact" className="btn-gold px-8 py-3">
              Contact Export Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
