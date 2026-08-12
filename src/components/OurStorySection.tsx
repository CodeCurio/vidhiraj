'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';

interface StatProps {
  end: number;
  suffix?: string;
  isKFormat?: boolean;
}

function AnimatedStat({ end, suffix = '+', isKFormat = false }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2400; // 2.4s smooth decelerating count up

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOutCubic * end);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end]);

  const displayString = (() => {
    if (isKFormat) {
      if (count >= 1000) {
        const kVal = (count / 1000).toFixed(count >= 9950 ? 0 : 1);
        return `${kVal}K${suffix}`;
      }
      return `${count}${suffix}`;
    }
    return `${count}${suffix}`;
  })();

  return <span ref={ref}>{displayString}</span>;
}

export default function OurStorySection() {
  // 4 Stat Cards with diagonal alternating Dark & Light themes matching website palette
  const STATS = [
    {
      end: 10000,
      suffix: '+',
      label: 'Orders Fulfilled',
      isKFormat: true,
      isDark: true, // Top-Left: Dark
    },
    {
      end: 30,
      suffix: '+',
      label: 'Export Countries',
      isKFormat: false,
      isDark: false, // Top-Right: Light
    },
    {
      end: 200,
      suffix: '+',
      label: 'Product Varieties',
      isKFormat: false,
      isDark: false, // Bottom-Left: Light
    },
    {
      end: 500,
      suffix: '+',
      label: 'Happy Clients',
      isKFormat: false,
      isDark: true, // Bottom-Right: Dark
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-[#FFF8F0] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B4513 0%, transparent 70%)' }}
      />

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
        
        {/* Left Column: Story Text */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-extrabold tracking-widest uppercase text-[#D4AF37]">
            OUR STORY
          </span>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
          >
            Manufacturer, Trader &amp; Exporter to the World
          </h2>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Vidhiraj Global Impex is an end-to-end handicraft manufacturer and exporter from India. We own our workshop, employ 100+ skilled artisans, and handle everything from raw material sourcing to export documentation — giving you factory-direct prices with zero middlemen.
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Whether you need stock catalog products, OEM/ODM custom manufacturing, or private-label packaging, we deliver to wholesalers, boutiques, and retailers across 30+ countries with a 98% on-time rate.
          </p>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-block px-8 py-3.5 rounded-lg font-semibold text-sm text-white transition-all shadow-md hover:opacity-95 hover:scale-105"
              style={{ background: '#8B4513' }}
            >
              Learn More About Us
            </Link>
          </div>
        </div>

        {/* Right Column: 2x2 Diagonal Dark & Light Stat Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center min-h-[160px] ${
                stat.isDark
                  ? 'shadow-xl border border-[#D4AF37]/40'
                  : 'shadow-md border border-[#F5E4D2]'
              }`}
              style={{
                background: stat.isDark
                  ? 'linear-gradient(140deg, #2D1005 0%, #1A0A02 100%)'
                  : 'linear-gradient(140deg, #FFFDF9 0%, #FFF5EB 100%)',
              }}
            >
              <div
                className="text-4xl sm:text-5xl font-bold mb-2 font-serif"
                style={{
                  color: stat.isDark ? '#D4AF37' : '#8B4513',
                  fontFamily: 'Georgia, serif',
                }}
              >
                <AnimatedStat end={stat.end} suffix={stat.suffix} isKFormat={stat.isKFormat} />
              </div>

              <p
                className="text-xs sm:text-sm font-semibold tracking-wide"
                style={{
                  color: stat.isDark ? '#FFF8F0' : '#4A3E3D',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
