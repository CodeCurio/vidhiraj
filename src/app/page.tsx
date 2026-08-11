import Link from 'next/link';
import Image from 'next/image';
import { Clock, Globe, Factory, Settings2, Wrench, Layers, ShieldCheck } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/firestore';
import HeroSection from '@/components/HeroSection';
import ReviewsSection from '@/components/ReviewsSection';
import AboutPreview from '@/components/AboutPreview';
import ProductsShowcase from '@/components/ProductsShowcase';
import type { Product, Category } from '@/types';

export const revalidate = 60;

export default async function HomePage() {
  let allProducts: Product[] = [];
  let categories: Category[] = [];
  try {
    [allProducts, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    allProducts = [];
    categories = [];
  }

  return (
    <>
      <HeroSection />

      {/* ABOUT PREVIEW */}
      <AboutPreview />

      {/* PRODUCTS SHOWCASE SECTION WITH CATEGORY FILTER TABS */}
      <ProductsShowcase allProducts={allProducts} categories={categories} />

      {/* MANUFACTURING CAPABILITIES */}
      <section className="py-16 px-4" style={{ background: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Not Just Exporters
            </span>
            <h2 className="section-title mt-2">We Manufacture. We Export. We Deliver.</h2>
            <p className="section-subtitle">
              End-to-end capability — from raw material sourcing and in-house manufacturing to export documentation and global delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <div className="space-y-5">
                {[
                  {
                    icon: <Factory size={22} />,
                    title: 'In-House Manufacturing',
                    desc: 'Our own workshop with 100+ skilled artisans. Full production control — no outsourcing, no quality compromise.',
                  },
                  {
                    icon: <Settings2 size={22} />,
                    title: 'OEM / ODM Capability',
                    desc: 'Custom designs, your logo, your colors, your packaging. We build products to your exact specifications.',
                  },
                  {
                    icon: <Wrench size={22} />,
                    title: 'Product Development',
                    desc: 'From concept to prototype in 10–15 days. New product ranges developed on request with zero design fees.',
                  },
                  {
                    icon: <Layers size={22} />,
                    title: 'Multiple Product Lines',
                    desc: 'Wooden artifacts, brass figurines, and more — all manufactured under one roof.',
                  },
                  {
                    icon: <ShieldCheck size={22} />,
                    title: '3-Stage Quality Control',
                    desc: 'Every batch inspected at raw material intake, mid-production, and pre-shipment. Less than 0.5% defect rate.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(139,69,19,0.1)' }}
                    >
                      <span style={{ color: '#8B4513' }}>{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-1" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/inquiry" className="btn-primary px-7 py-3 text-sm">
                  Request OEM Quote
                </Link>
                <Link href="/why-choose-us" className="btn-gold px-7 py-3 text-sm">
                  Our Manufacturing Edge
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ paddingTop: '120%', position: 'relative' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80"
                  alt="Artisan crafting handicrafts"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="200px"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ paddingTop: '60%', position: 'relative' }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                    alt="Wooden handicraft workshop"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>
                <div
                  className="rounded-xl p-5 text-center"
                  style={{ background: 'linear-gradient(135deg, #8B4513, #6B3410)' }}
                >
                  <div className="text-3xl font-bold mb-1" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>100+</div>
                  <div className="text-xs text-white opacity-80">Skilled Artisans</div>
                  <div className="text-3xl font-bold mt-3 mb-1" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>200+</div>
                  <div className="text-xs text-white opacity-80">Product Designs</div>
                  <div className="text-3xl font-bold mt-3 mb-1" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>15 Days</div>
                  <div className="text-xs text-white opacity-80">Sample Lead Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturing process steps */}
          <div
            className="rounded-2xl p-8"
            style={{ background: '#fff', border: '1px solid #f0e0cc' }}
          >
            <h3 className="text-lg font-bold text-center mb-8" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
              Our Manufacturing Process
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {[
                { step: '01', label: 'Raw Material\nSourcing' },
                { step: '02', label: 'Design &\nPrototype' },
                { step: '03', label: 'Handcrafting\nby Artisans' },
                { step: '04', label: 'Quality\nInspection' },
                { step: '05', label: 'Export\nPackaging' },
                { step: '06', label: 'Global\nDelivery' },
              ].map((s, i) => (
                <div key={s.step} className="relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold"
                    style={{ background: '#8B4513', color: '#D4AF37' }}
                  >
                    {s.step}
                  </div>
                  <p className="text-xs font-medium leading-tight" style={{ color: '#1C1C1C', whiteSpace: 'pre-line' }}>
                    {s.label}
                  </p>
                  {i < 5 && (
                    <div
                      className="hidden lg:block absolute top-6 left-full w-full h-px -translate-x-1/2"
                      style={{ background: 'linear-gradient(to right, #D4AF37, transparent)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* GLOBAL REACH — Marquee */}
      <section className="py-20 px-4 overflow-hidden" style={{ background: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ color: '#8B4513', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>
              <Globe size={14} /> Worldwide Presence
            </span>
            <h2 className="section-title mt-4">We Export to 30+ Countries</h2>
            <p className="section-subtitle">Trusted by international buyers across every continent</p>
          </div>
        </div>

        {(() => {
          const row1 = [
            { code: 'us', country: 'USA' },
            { code: 'gb', country: 'UK' },
            { code: 'de', country: 'Germany' },
            { code: 'fr', country: 'France' },
            { code: 'au', country: 'Australia' },
            { code: 'ae', country: 'UAE' },
            { code: 'ca', country: 'Canada' },
            { code: 'jp', country: 'Japan' },
            { code: 'it', country: 'Italy' },
            { code: 'nl', country: 'Netherlands' },
          ];
          const row2 = [
            { code: 'sg', country: 'Singapore' },
            { code: 'za', country: 'South Africa' },
            { code: 'br', country: 'Brazil' },
            { code: 'mx', country: 'Mexico' },
            { code: 'sa', country: 'Saudi Arabia' },
            { code: 'kr', country: 'South Korea' },
            { code: 'se', country: 'Sweden' },
            { code: 'ch', country: 'Switzerland' },
            { code: 'nz', country: 'New Zealand' },
            { code: 'no', country: 'Norway' },
          ];

          const CountryPill = ({ code, country }: { code: string; country: string }) => (
            <div
              className="flex items-center gap-3 rounded-full py-3 px-5 flex-shrink-0 transition-shadow hover:shadow-lg"
              style={{ background: '#fff', border: '1px solid #f0e0cc', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w40/${code}.png`}
                srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
                width={28}
                height={21}
                alt={country}
                style={{ borderRadius: 3, objectFit: 'cover', display: 'block' }}
              />
              <span className="text-sm font-semibold whitespace-nowrap" style={{ color: '#1C1C1C' }}>{country}</span>
            </div>
          );

          return (
            <div className="space-y-5">
              {/* Row 1 — scroll left */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, #FFF8F0, transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, #FFF8F0, transparent)' }} />
                <div className="flex gap-4 marquee-scroll-left">
                  {[...row1, ...row1, ...row1].map((item, i) => (
                    <CountryPill key={`r1-${i}`} code={item.code} country={item.country} />
                  ))}
                </div>
              </div>
              {/* Row 2 — scroll right */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, #FFF8F0, transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, #FFF8F0, transparent)' }} />
                <div className="flex gap-4 marquee-scroll-right">
                  {[...row2, ...row2, ...row2].map((item, i) => (
                    <CountryPill key={`r2-${i}`} code={item.code} country={item.country} />
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        <div className="max-w-7xl mx-auto mt-14">
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #8B4513, #6B3410)', color: '#FFF8F0' }}
          >
            <Globe size={40} color="#D4AF37" className="mx-auto mb-4" />
            <p className="text-lg font-semibold mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Ready to ship to your country?
            </p>
            <p className="text-sm mb-4" style={{ color: '#e0c8b0' }}>
              We handle all export documentation, customs clearance assistance, and logistics.
            </p>
            <Link href="/export-services" className="btn-gold px-8 py-3 text-sm">
              View Export Services
            </Link>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }
          .marquee-scroll-left {
            animation: marqueeLeft 30s linear infinite;
            width: max-content;
          }
          .marquee-scroll-right {
            animation: marqueeRight 35s linear infinite;
            width: max-content;
          }
          .marquee-scroll-left:hover,
          .marquee-scroll-right:hover {
            animation-play-state: paused;
          }
        `}} />
      </section>

      {/* REVIEWS SECTION */}
      <ReviewsSection />

      {/* CTA SECTION — Ready to Place Your Order */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #3a1a06 50%, #1C1C1C 100%)' }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom, #8B4513, transparent 70%)' }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <span
            className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block mb-5"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            Start Your Order
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
          >
            Ready to Place Your Order?
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-8" style={{ color: 'rgba(255,248,240,0.65)' }}>
            Get pricing, samples, and custom manufacturing options. Our team responds within 24 hours.
          </p>

          {/* Response guarantee badge */}
          <div className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
            <Clock size={14} style={{ color: '#D4AF37' }} />
            <span className="text-sm" style={{ color: 'rgba(255,248,240,0.75)' }}>Response guaranteed within 24 hours</span>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/918288840802?text=Hello%20Vidhiraj%20Global%20Impex!%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold text-sm text-white"
              style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
              </svg>
              WhatsApp Us
            </a>
            <Link
              href="/inquiry"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C', boxShadow: '0 4px 16px rgba(212,175,55,0.25)' }}
            >
              Send Inquiry Form
            </Link>
            <a
              href="mailto:info@vidhirajglobalimpex.com"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#FFF8F0', border: '1px solid rgba(255,248,240,0.2)' }}
            >
              <Clock size={16} />
              Email Us
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {['✋ 100% Handmade', '🌿 Eco-Friendly', '🔒 Secure Transaction', '📋 No Minimum Design Fee', '🚀 Express Samples Available', '🌍 Ships Worldwide'].map((item) => (
              <span key={item} className="text-xs" style={{ color: 'rgba(255,248,240,0.45)' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
