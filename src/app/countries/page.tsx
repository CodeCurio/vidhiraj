import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCountries } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'We Export to 30+ Countries — Indian Handicraft Worldwide Shipping',
  description: 'Vidhiraj Global Impex ships handcrafted Indian handicrafts to 30+ countries including USA, UK, Germany, Australia, UAE, Japan, Singapore, South Korea, Brazil, Italy & more.',
  keywords: ['indian handicraft exporter worldwide', 'handicraft shipping countries', 'import handicrafts india worldwide', 'indian handicraft global supplier'],
  alternates: { canonical: '/countries' },
  openGraph: {
    title: 'Indian Handicraft Exporter — We Ship to 30+ Countries',
    description: 'Country-specific shipping times, import duties & customs info for importing Indian handicrafts worldwide.',
    url: '/countries',
    type: 'website',
  },
};

export default function CountriesPage() {
  const countries = getAllCountries();
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'Export Countries', item: 'https://vidhirajglobalimpex.com/countries' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ background: 'linear-gradient(135deg, #3a1a06 0%, #8B4513 100%)', paddingTop: '120px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Worldwide Export
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
              We Ship to 30+ Countries
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              Country-specific shipping guides, import duties, customs tips, and popular products for each market.
            </p>
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>Select Your Country</span>
            <h2 className="section-title mt-2">Import Guides by Country</h2>
            <p className="section-subtitle">Click your country for duty rates, shipping times & customs tips</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((c) => (
              <Link
                key={c.slug}
                href={`/countries/${c.slug}`}
                className="rounded-xl p-6 transition-shadow hover:shadow-lg group"
                style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w80/${c.flagCode}.png`}
                    alt={c.name}
                    width={48}
                    height={36}
                    style={{ borderRadius: 4, objectFit: 'cover' }}
                  />
                  <div>
                    <div className="font-bold text-base" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>{c.name}</div>
                    <div className="text-xs" style={{ color: '#D4AF37' }}>{c.region}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#888' }}>Air Freight</div>
                    <div className="text-sm font-bold" style={{ color: '#8B4513' }}>{c.airFreightDays}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#888' }}>Import Duty</div>
                    <div className="text-sm font-bold" style={{ color: '#8B4513' }}>{c.importDuty}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold group-hover:underline" style={{ color: '#8B4513' }}>
                  View full import guide →
                </span>
              </Link>
            ))}
          </div>

          {/* Other countries note */}
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: '#1C1C1C' }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
              Don&apos;t see your country?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#aaa' }}>
              We ship to 30+ countries worldwide. Contact us for a custom shipping quote and import duty info for your location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inquiry"
                className="px-7 py-3 rounded-lg font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C' }}
              >
                Get a Shipping Quote
              </Link>
              <a
                href="https://wa.me/918288840802"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-lg font-semibold text-sm text-white"
                style={{ background: '#25D366' }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
