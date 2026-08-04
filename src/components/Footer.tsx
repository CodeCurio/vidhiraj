import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getSettings, getCategories } from '@/lib/firestore';
import ShareButton from './ShareButton';
import { formatPhone } from '@/lib/formatPhone';
import type { SiteSettings, Category } from '@/types';

export default async function Footer() {
  const [settings, categories] = await Promise.all([
    getSettings().catch(() => ({} as SiteSettings)),
    getCategories().catch(() => [] as Category[]),
  ]);

  const phone = settings.phone || '';
  const whatsapp = settings.whatsapp || '';
  const email = settings.email || '';
  const exportEmail = settings.exportEmail || '';
  const address = settings.address || '';
  const gst = settings.gst || '';
  const waNumber = whatsapp.replace(/\D/g, '');

  return (
    <footer style={{ background: '#1C1C1C', color: '#FFF8F0' }} className="w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/vidhiraj-logo.png"
                alt="Vidhiraj Global Impex"
                width={260}
                height={128}
                style={{ objectFit: 'contain', height: '55px', width: 'auto', borderRadius: '6px' }}
                priority
              />
              <p className="text-xs italic mt-1.5 font-medium tracking-wide" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
                Exporting Dreams
              </p>
              <p className="text-[11px] mt-1" style={{ color: '#aaa', fontFamily: 'Georgia, serif' }}>
                A Venture of Vidhiraj Group of Companies
              </p>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#ccc' }}>
              Premium handicraft exporter from India. Specializing in 100% handmade wooden artifacts, brass figurines, and coconut shell handicrafts — eco-friendly crafted for international buyers and wholesalers.
            </p>
            <div className="flex items-center gap-2.5 mt-4">
              {/* Facebook */}
              <a href="https://facebook.com/vidhirajglobalimpex" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: '#1877F2' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/vidhirajglobalimpex" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/vidhirajglobalimpex" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: '#0A66C2' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com/vidhirajglobal" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: '#000' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                  href={`https://wa.me/?text=${encodeURIComponent('Check out Vidhiraj Global Impex — India\'s premium handicraft exporter: https://vidhirajglobalimpex.com')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ background: '#25D366' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="white">
                    <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
                  </svg>
                </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/products', label: 'Products' },
                { href: '/export-services', label: 'Export Services' },
                { href: '/countries', label: 'Countries We Ship To' },
                { href: '/why-choose-us', label: 'Why Choose Us' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
                { href: '/inquiry', label: 'Get a Quote' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: '#ccc' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
              Our Products
            </h3>
            <ul className="space-y-2">
              {(categories.length > 0 ? categories.slice(0, 8) : []).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href="/products"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#ccc' }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              {categories.length === 0 && (
                <li>
                  <Link href="/products" className="text-sm" style={{ color: '#ccc' }}>
                    View All Products
                  </Link>
                </li>
              )}
              <li>
                <Link href="/products" className="text-sm font-medium" style={{ color: '#D4AF37' }}>
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
              Contact Us
            </h3>
            <div className="space-y-4">
              {address && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} color="#D4AF37" className="mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: '#D4AF37' }}>Address</span>
                      <ShareButton
                        address={address}
                        phone={phone || undefined}
                        whatsapp={whatsapp || undefined}
                        email={email || undefined}
                        exportEmail={exportEmail || undefined}
                        gst={gst || undefined}
                      />
                    </div>
                    <p className="text-sm" style={{ color: '#ccc' }}>
                      {address.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </div>
                </div>
              )}

              {phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} color="#D4AF37" className="flex-shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="text-sm transition-colors"
                    style={{ color: '#ccc' }}
                  >
                    {formatPhone(phone)}
                  </a>
                </div>
              )}

              {waNumber && (
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="#D4AF37" className="flex-shrink-0">
                    <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
                  </svg>
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors"
                    style={{ color: '#ccc' }}
                  >
                    {formatPhone(whatsapp)}
                  </a>
                </div>
              )}

              {(email || exportEmail) && (
                <div className="flex items-start gap-3">
                  <Mail size={16} color="#D4AF37" className="mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="text-sm block transition-colors"
                        style={{ color: '#ccc' }}
                      >
                        {email}
                      </a>
                    )}
                    {exportEmail && (
                      <a
                        href={`mailto:${exportEmail}`}
                        className="text-sm block transition-colors"
                        style={{ color: '#ccc' }}
                      >
                        {exportEmail}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Link
                href="/inquiry"
                className="btn-gold text-sm py-2 px-5 text-center block"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #333' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: '#888' }}>
            © {new Date().getFullYear()} Vidhiraj Global Impex — A Venture of Vidhiraj Group of Companies. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#888' }}>
            Handicraft Exporter from India
            {gst
              ? ` | GST: ${gst}`
              : ' | GST Registration Pending'}
          </p>
        </div>
      </div>
    </footer>
  );
}
