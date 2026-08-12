'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

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
    const duration = 2400; // 2.4s decelerating count

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
        const kVal = (count / 1000).toFixed(count >= 49500 ? 0 : 1);
        return `${kVal}K${suffix}`;
      }
      return `${count}${suffix}`;
    }
    return `${count}${suffix}`;
  })();

  return <span ref={ref}>{displayString}</span>;
}

export default function ManufacturingCapabilities() {
  // 4 Stat Cards with diagonal alternating Dark & Light themes matching website palette
  const STATS = [
    {
      end: 100,
      suffix: '+',
      label: 'Skilled Artisans',
      isKFormat: false,
      isDark: true, // Top-Left: Dark
    },
    {
      end: 50000,
      suffix: '+',
      label: 'Monthly Capacity',
      isKFormat: true,
      isDark: false, // Top-Right: Light
    },
    {
      end: 200,
      suffix: '+',
      label: 'Product Designs',
      isKFormat: false,
      isDark: false, // Bottom-Left: Light
    },
    {
      end: 3,
      suffix: '',
      label: 'QC Checkpoints',
      isKFormat: false,
      isDark: true, // Bottom-Right: Dark
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Description & Feature Points */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 bg-[#FFF8F0] border border-[#f0e0cc]">
              <Sparkles size={14} color="#8B4513" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">
                Production Strength
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1C1C1C] font-serif">
              Manufacturing Capabilities
            </h2>

            <p className="text-sm sm:text-base leading-relaxed mb-6 text-stone-600">
              Our 10,000 sq. ft. production facility in Chandigarh houses dedicated sections for wood carving, macrame weaving, copperware finishing, quality control, and export packaging. We have the infrastructure to fulfill both small boutique orders and large wholesale volumes.
            </p>

            <ul className="space-y-3 mb-6">
              {[
                'Monthly capacity: 50,000+ units across all 8 product lines',
                'Dedicated QC team with 3-stage inspection process',
                'In-house design studio for custom & OEM/ODM orders',
                'Eco-friendly and fair-trade manufacturing practices',
                'ISO-aligned quality management systems',
                'Digital sample approval process for fast turnaround',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-stone-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: 2x2 Diagonal Dark & Light Animated Stat Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
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
                  className="text-3xl sm:text-5xl font-bold mb-2 font-serif"
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
      </div>
    </section>
  );
}
