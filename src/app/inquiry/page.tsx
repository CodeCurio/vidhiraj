import InquiryForm from './InquiryForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote — Wholesale Handicraft Pricing & Free Samples',
  description: 'Request factory-direct wholesale pricing, free product samples, and custom manufacturing options. Our export team responds within 24 hours. No middlemen.',
  keywords: [
    'handicraft wholesale quote india',
    'wholesale pricing indian handicrafts',
    'request handicraft samples india',
    'bulk order inquiry india manufacturer',
  ],
  alternates: { canonical: '/inquiry' },
  openGraph: {
    title: 'Request a Wholesale Quote — Indian Handicraft Manufacturer',
    description: 'Factory-direct wholesale pricing, free samples & custom manufacturing. 24hr response from India\'s direct handicraft manufacturer.',
    url: '/inquiry',
    type: 'website',
  },
};

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; name?: string }>;
}) {
  const { product: productId, name: productName } = await searchParams;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'Request a Quote', item: 'https://vidhirajglobalimpex.com/inquiry' },
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
              Trade Inquiry
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              Request a Quote
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              Fill out the form below and our export team will respond with pricing, samples, and production timelines within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar Info */}
            <div>
              <div
                className="rounded-xl p-6 mb-6"
                style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                >
                  Why Inquire?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Get factory-direct pricing',
                    'Request product samples',
                    'Discuss custom designs',
                    'Negotiate bulk discounts',
                    'Confirm MOQ & lead times',
                    'Get export documentation info',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                      <span style={{ color: '#D4AF37' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl p-6 mb-6"
                style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
              >
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                >
                  Our Response Time
                </h3>
                <div className="text-4xl font-bold mb-1" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                  24hrs
                </div>
                <p className="text-sm" style={{ color: '#888' }}>
                  Maximum response time for all inquiries. We are available Mon–Sat, 9am–6pm IST.
                </p>
              </div>

              <a
                href="https://wa.me/9182888 40802?text=Hello%20Vidhiraj%20Global%20Impex!%20I%20would%20like%20to%20get%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded font-semibold text-white"
                style={{ background: '#25D366' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                  <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
                </svg>
                Chat on WhatsApp Instead
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <InquiryForm prefilledProduct={productName || ''} prefilledProductId={productId || ''} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
