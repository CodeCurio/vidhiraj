import ContactForm from './ContactForm';
import ShareButton from '@/components/ShareButton';
import { getSettings } from '@/lib/firestore';
import { formatPhone } from '@/lib/formatPhone';
import { Mail, Phone, MapPin, Clock, FileText } from 'lucide-react';
import type { Metadata } from 'next';
import type { SiteSettings } from '@/types';

export const metadata: Metadata = {
  title: 'Contact Us — Get Wholesale Pricing & Export Quotes, 24hr Response',
  description: 'Contact Vidhiraj Global Impex for wholesale handicraft pricing, export quotes & custom orders. WhatsApp, email or inquiry form. Response guaranteed within 24 hours.',
  keywords: [
    'contact indian handicraft exporter',
    'wholesale handicraft inquiry india',
    'handicraft export quote india',
    'buy handicrafts from india contact',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Vidhiraj Global Impex — Wholesale Pricing & Export Quotes',
    description: 'Get wholesale pricing, export quotes & samples from India\'s direct handicraft manufacturer. 24hr response guaranteed.',
    url: '/contact',
    type: 'website',
  },
};

export default async function ContactPage() {
  const settings = await getSettings().catch(() => ({} as SiteSettings));

  const phone = settings.phone || '';
  const whatsapp = settings.whatsapp || '';
  const email = settings.email || '';
  const exportEmail = settings.exportEmail || '';
  const address = settings.address || '';
  const businessHours = settings.businessHours || '';
  const gst = settings.gst || '';

  const waNumber = whatsapp.replace(/\D/g, '');

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Vidhiraj Global Impex',
    description: 'Indian handicraft manufacturer and exporter of wooden artifacts, brass figurines & coconut handicrafts. Wholesale & export to 30+ countries.',
    url: 'https://vidhirajglobalimpex.com',
    logo: 'https://vidhirajglobalimpex.com/vidhiraj-logo.png',
    telephone: phone || '+91-82888-40802',
    email: email || exportEmail || 'info@vidhirajglobalimpex.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7098481,
      longitude: 76.8408454,
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    priceRange: '$$',
    areaServed: 'Worldwide',
    sameAs: [
      'https://www.indiamart.com/vidhirajglobalimpex',
      'https://www.linkedin.com/company/vidhiraj-global-impex',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <section
        className="relative py-24 flex items-center"
        style={{ background: 'linear-gradient(135deg, #3a1a06 0%, #8B4513 100%)', paddingTop: '120px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Get In Touch
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              Contact Us
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              {businessHours
                ? `${businessHours}. We respond to all inquiries within 24 hours.`
                : 'Our team is available Monday–Saturday, 9am–6pm IST. We respond to all inquiries within 24 hours.'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                {address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8F0' }}>
                      <MapPin size={18} color="#8B4513" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-bold" style={{ color: '#1C1C1C' }}>Address</div>
                        <ShareButton
                          address={address}
                          phone={phone || undefined}
                          whatsapp={whatsapp || undefined}
                          email={email || undefined}
                          exportEmail={exportEmail || undefined}
                          gst={gst || undefined}
                        />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                        {address.split('\n').map((line, i) => (
                          <span key={i}>{line}<br /></span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}

                {(phone || waNumber) && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8F0' }}>
                      <Phone size={18} color="#8B4513" />
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#1C1C1C' }}>Phone / WhatsApp</div>
                      {phone && (
                        <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-sm block transition-colors" style={{ color: '#666' }}>
                          {formatPhone(phone)}
                        </a>
                      )}
                      {waNumber && (
                        <a
                          href={`https://wa.me/${waNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm block transition-colors"
                          style={{ color: '#666' }}
                        >
                          {formatPhone(whatsapp)}
                        </a>
                      )}
                      {waNumber && (
                        <a
                          href={`https://wa.me/${waNumber}?text=Hello%20Vidhiraj%20Global%20Impex!%20I%20have%20an%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium"
                          style={{ color: '#25D366' }}
                        >
                          Chat on WhatsApp →
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {(email || exportEmail) && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8F0' }}>
                      <Mail size={18} color="#8B4513" />
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#1C1C1C' }}>Email</div>
                      {email && (
                        <div className="mb-1">
                          <span className="text-xs font-medium" style={{ color: '#8B4513' }}>General</span>
                          <a href={`mailto:${email}`} className="text-sm block transition-colors" style={{ color: '#666' }}>
                            {email}
                          </a>
                        </div>
                      )}
                      {exportEmail && (
                        <div>
                          <span className="text-xs font-medium" style={{ color: '#8B4513' }}>Export / Sales</span>
                          <a href={`mailto:${exportEmail}`} className="text-sm block transition-colors" style={{ color: '#666' }}>
                            {exportEmail}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {businessHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8F0' }}>
                      <Clock size={18} color="#8B4513" />
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#1C1C1C' }}>Business Hours</div>
                      <p className="text-sm" style={{ color: '#666' }}>
                        {businessHours.split('\n').map((line, i) => (
                          <span key={i}>{line}<br /></span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8F0' }}>
                    <FileText size={18} color="#8B4513" />
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1" style={{ color: '#1C1C1C' }}>GST Number</div>
                    {gst ? (
                      <p className="text-sm font-mono" style={{ color: '#666' }}>{gst}</p>
                    ) : (
                      <p className="text-sm italic" style={{ color: '#aaa' }}>GST Registration Pending</p>
                    )}
                  </div>
                </div>
              </div>

              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}?text=Hello%20Vidhiraj%20Global%20Impex!%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded font-semibold text-white"
                  style={{ background: '#25D366' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                    <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              )}

              <div className="mt-6">
                <p className="text-sm font-bold mb-3" style={{ color: '#1C1C1C' }}>Follow Us</p>
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com/vidhirajglobalimpex" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/vidhirajglobalimpex" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ background: '#0A66C2' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://facebook.com/vidhirajglobalimpex" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ background: '#1877F2' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/vidhirajglobalimpex" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ background: '#000' }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-xl overflow-hidden" style={{ height: 200, background: '#f5f5f5', position: 'relative' }}>
                <iframe
                  src="https://www.google.com/maps?q=30.7098481,76.8408454&z=12&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vidhiraj Global Impex Location"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
