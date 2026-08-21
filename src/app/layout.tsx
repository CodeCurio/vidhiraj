import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LanguageBar from '@/components/LanguageBar';
import EnquiryPopup from '@/components/EnquiryPopup';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { getCategories, getSettings } from '@/lib/firestore';
import type { SiteSettings } from '@/types';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://vidhirajglobalimpex.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vidhiraj Global Impex',
  alternateName: 'Vidhiraj Impex',
  url: SITE_URL,
  logo: `${SITE_URL}/vidhiraj-logo.png`,
  image: `${SITE_URL}/vidhiraj-logo.png`,
  description:
    'Leading manufacturer and exporter of handcrafted wooden artifacts, brass figurines  from India. Bulk orders, custom manufacturing, global shipping to 30+ countries. A venture of Vidhiraj Group of Companies.',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Vidhiraj Group of Companies',
  },
  foundingLocation: {
    '@type': 'Place',
    name: 'Chandigarh, India',
  },
  areaServed: [
    'US', 'GB', 'DE', 'FR', 'AU', 'AE', 'CA', 'JP', 'IT', 'NL',
    'SG', 'ZA', 'BR', 'MX', 'SA', 'IN', 'KR', 'ES', 'PT', 'RU',
    'SE', 'CH', 'BE', 'PL', 'TR', 'ID', 'MY', 'TH', 'NZ', 'IE',
    'VN', 'DK', 'NO', 'FI', 'AT', 'GR', 'CZ', 'HU', 'RO', 'PH',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-82888-40802',
    contactType: 'sales',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Hindi', 'Arabic', 'German', 'French', 'Spanish', 'Japanese', 'Russian', 'Italian', 'Portuguese'],
  },
  sameAs: [
    'https://facebook.com/vidhirajglobalimpex',
    'https://instagram.com/vidhirajglobalimpex',
    'https://www.linkedin.com/company/vidhiraj-global-impex',
    'https://youtube.com/@vidhirajglobalimpex',
    'https://www.indiamart.com/vidhirajglobalimpex',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Indian Handicrafts — Wholesale & Export',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Handmade Wooden Artifacts' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Brass Figurines Wholesale' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '' } },
    ],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vidhiraj Global Impex',
  url: SITE_URL,
  description: 'Indian handicraft manufacturer & exporter — wholesale wooden artifacts, brass figurines  shipped to 30+ countries.',
  publisher: {
    '@type': 'Organization',
    name: 'Vidhiraj Global Impex',
    url: SITE_URL,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vidhiraj Global Impex | Indian Handicraft Exporter — Wooden, Brass & Coconut Crafts',
    template: '%s | Vidhiraj Global Impex',
  },
  description:
    'Leading manufacturer & exporter of handcrafted wooden artifacts, brass figurines  from India. A venture of Vidhiraj Group of Companies. Bulk orders, OEM manufacturing, shipping to 30+ countries.',
  keywords: [
    'handicraft exporter india',
    'wooden handicraft manufacturer india',
    'brass figurines wholesale',
    'india handicraft export',
    'handmade wooden artifacts wholesale',
    'buy handicrafts wholesale from india',
    'indian handicraft supplier',
    'OEM handicraft manufacturer india',
    'eco friendly handicrafts wholesale',
  ],
  // Only include hreflang for languages that have actual pages.
  // Removed /de, /fr, /ar etc. — those pages don't exist yet and were causing
  // "non-200 hreflang URLs" errors flagged in the Screaming Frog SEO audit.
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'Vidhiraj Global Impex | Indian Handicraft Exporter',
    description:
      'Premium handcrafted wooden artifacts, brass figurines  — wholesale & export from India to 30+ countries.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Vidhiraj Global Impex',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Vidhiraj Global Impex — Indian Handicraft Exporter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidhiraj Global Impex | Indian Handicraft Exporter',
    description:
      'Premium handcrafted wooden artifacts, brass figurines  — wholesale & export from India.',
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/vidhiraj-logo.png',
    apple: '/vidhiraj-logo.png',
  },
  verification: {
    google: '',
    other: {
      'msvalidate.01': [''],
      'yandex-verification': [''],
      'baidu-site-verification': [''],
      'naver-site-verification': [''],
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, settings] = await Promise.all([
    getCategories().catch(() => []),
    getSettings().catch(() => ({} as SiteSettings)),
  ]);
  const waNumber = (settings.whatsapp || '').replace(/\D/g, '');
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          {/* Hidden Google Translate element — controlled by LanguageBar */}
          <Script id="google-translate-init" strategy="afterInteractive">
            {`function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false, includedLanguages: 'en,hi,ar,de,fr,es,zh-CN,zh-TW,ja,ko,pt,ru,it,nl,pl,tr,id,vi,th,ms,sv,da,no,fi' },
                'google_translate_element'
              );
            }`}
          </Script>
          <Script
            id="google-translate-script"
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />

          {/* Invisible GT widget — LanguageBar talks to it via .goog-te-combo */}
          <div id="google_translate_element" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} />

          {/* Top bar with language selector */}
          <LanguageBar gst={settings.gst || ''} />

          {/* Sticky navbar sits below the top bar */}
          <Navbar categories={categories} />

          <main className="bg-white flex-1 w-full" style={{ paddingTop: '96px', flex: '1 0 auto' }}>{children}</main>
          <Footer />
          <WhatsAppButton number={waNumber} />
          <EnquiryPopup
            enabled={settings.popupEnabled !== false}
            delaySeconds={typeof settings.popupDelay === 'number' ? settings.popupDelay : 15}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
