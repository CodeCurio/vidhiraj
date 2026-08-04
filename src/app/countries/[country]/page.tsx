import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Truck, FileText, Clock, Package } from 'lucide-react';
import type { Metadata } from 'next';
import { getCountry, getAllCountrySlugs } from '@/lib/countries';

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({ country: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const data = getCountry(country);
  if (!data) return { title: 'Not Found' };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `/countries/${country}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `/countries/${country}`,
      type: 'website',
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const data = getCountry(country);
  if (!data) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'Export Countries', item: 'https://vidhirajglobalimpex.com/countries' },
      { '@type': 'ListItem', position: 3, name: data.name, item: `https://vidhirajglobalimpex.com/countries/${data.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ background: 'linear-gradient(135deg, #3a1a06 0%, #8B4513 100%)', paddingTop: '120px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <nav className="text-xs mb-4" style={{ color: 'rgba(255,248,240,0.5)' }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/countries" className="hover:underline">Countries</Link>
            <span className="mx-2">/</span>
            <span style={{ color: '#D4AF37' }}>{data.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/w80/${data.flagCode}.png`}
              alt={data.name}
              width={48}
              height={36}
              style={{ borderRadius: 4, objectFit: 'cover', display: 'block' }}
            />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Exporting to {data.name}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
            {data.headline}
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#e0c8b0' }}>
            {data.subheadline}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/inquiry"
              className="px-7 py-3 rounded-lg font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C' }}
            >
              Get Wholesale Pricing
            </Link>
            <a
              href="https://wa.me/918288840802"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-lg font-semibold text-sm text-white flex items-center gap-2"
              style={{ background: '#25D366' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping card */}
            <div className="rounded-xl p-6" style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(139,69,19,0.1)' }}>
                <Truck size={24} color="#8B4513" />
              </div>
              <h2 className="text-lg font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Shipping to {data.name}
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>Air Freight</div>
                  <div className="text-sm font-bold" style={{ color: '#8B4513' }}>{data.airFreightDays}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#888' }}>{data.carriers.join(' · ')}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>Sea Freight</div>
                  <div className="text-sm font-bold" style={{ color: '#8B4513' }}>{data.seaFreightDays}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#888' }}>Best for large volume orders</div>
                </div>
              </div>
            </div>

            {/* Duty card */}
            <div className="rounded-xl p-6" style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(139,69,19,0.1)' }}>
                <FileText size={24} color="#8B4513" />
              </div>
              <h2 className="text-lg font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Import Duty & Tax
              </h2>
              <div className="space-y-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>Import Duty</div>
                  <div className="text-sm font-bold" style={{ color: '#8B4513' }}>{data.importDuty}</div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#666' }}>{data.importDutyNote}</p>
                <div className="pt-2 border-t" style={{ borderColor: '#f0e0cc' }}>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>VAT / GST</div>
                  <p className="text-xs" style={{ color: '#666' }}>{data.vatGst}</p>
                </div>
              </div>
            </div>

            {/* Customs tip card */}
            <div className="rounded-xl p-6" style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(139,69,19,0.1)' }}>
                <Package size={24} color="#8B4513" />
              </div>
              <h2 className="text-lg font-bold mb-3" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Customs Tips
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{data.customsTip}</p>
              <div className="mt-4 pt-3 border-t" style={{ borderColor: '#f0e0cc' }}>
                <div className="text-xs font-semibold mb-2" style={{ color: '#8B4513' }}>Documents We Provide:</div>
                <ul className="space-y-1">
                  {['Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Bill of Lading / AWB'].map((doc) => (
                    <li key={doc} className="flex items-center gap-1.5 text-xs" style={{ color: '#666' }}>
                      <CheckCircle size={11} color="#D4AF37" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 px-4" style={{ background: '#1C1C1C' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>Top Sellers</span>
            <h2 className="text-3xl font-bold mt-2" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
              Popular in {data.name}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.popularProducts.map((product) => (
              <Link
                key={product}
                href="/products"
                className="rounded-xl p-4 text-center text-sm font-medium transition-colors"
                style={{ background: '#2a2a2a', color: '#FFF8F0', border: '1px solid #333' }}
              >
                {product}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products" className="btn-gold px-8 py-3 text-sm">
              Browse Full Catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us for this country */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>Why Us</span>
            <h2 className="section-title mt-2">Why {data.name} Buyers Choose Vidhiraj</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Clock size={20} />, title: `${data.airFreightDays} Delivery`, desc: `Air freight to ${data.name} via ${data.carriers[0]} / ${data.carriers[1]}` },
              { icon: <FileText size={20} />, title: `${data.importDuty} Import Duty`, desc: 'We provide all documentation for smooth customs clearance' },
              { icon: <CheckCircle size={20} />, title: '100% Handmade Quality', desc: '3-stage QC, below 0.5% defect rate, pre-shipment inspection report' },
              { icon: <Package size={20} />, title: 'OEM & Custom Branding', desc: 'Your logo, your packaging, your exclusive designs — no extra design fee' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl p-5" style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,69,19,0.1)' }}>
                  <span style={{ color: '#8B4513' }}>{item.icon}</span>
                </div>
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: '#1C1C1C' }}>{item.title}</div>
                  <p className="text-xs" style={{ color: '#666' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {data.testimonial && (
        <section className="py-16 px-4" style={{ background: '#FFF8F0' }}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Verified Buyer — {data.name}
            </span>
            <blockquote
              className="text-xl leading-relaxed mt-6 mb-6 italic"
              style={{ color: '#555', fontFamily: 'Georgia, serif' }}
            >
              &ldquo;{data.testimonial.text}&rdquo;
            </blockquote>
            <div className="font-bold text-sm" style={{ color: '#1C1C1C' }}>{data.testimonial.name}</div>
            <div className="text-xs mt-1" style={{ color: '#888' }}>{data.testimonial.company}</div>
          </div>
        </section>
      )}

      {/* Country-specific FAQs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Common Questions from {data.name} Buyers</h2>
          </div>
          <div className="space-y-5">
            {data.faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl p-6" style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}>
                <h3 className="text-base font-bold mb-2" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-sm font-semibold" style={{ color: '#8B4513' }}>
              View All FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #3a1a06 50%, #1C1C1C 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block mb-5"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>
            {data.flag} Ready to Ship to {data.name}
          </span>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
            Start Your Wholesale Order Today
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,248,240,0.65)' }}>
            Get factory-direct pricing, product samples, and a complete shipping quote for {data.name}. Response within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inquiry"
              className="px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C' }}
            >
              Send Inquiry Form
            </Link>
            <a
              href={`https://wa.me/918288840802?text=Hello%20Vidhiraj%21%20I%20am%20from%20${encodeURIComponent(data.name)}%20and%20want%20to%20order%20wholesale%20handicrafts.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: '#25D366' }}
            >
              WhatsApp Us
            </a>
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#FFF8F0', border: '1px solid rgba(255,248,240,0.2)' }}
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
