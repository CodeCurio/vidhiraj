'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import type { Product, Category } from '@/types';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  allProducts?: Product[];
  categories?: Category[];
}

const ALL_8_CATEGORIES: Category[] = [
  { id: 'copper-handicraft', name: 'Copper Handicraft', slug: 'copper-handicraft', image: '/categories/copper-handicraft.jpg' },
  { id: 'macrame-bags', name: 'Macrame Bags', slug: 'macrame-bags', image: '/categories/macrame-bags.jpg' },
  { id: 'macrame-cushion', name: 'Macrame Cushion', slug: 'macrame-cushion', image: '/categories/macrame-cushion.jpg' },
  { id: 'macrame-wall-hanging', name: 'Macrame Wall Hanging', slug: 'macrame-wall-hanging', image: '/categories/macrame-wall-hanging.jpg' },
  { id: 'wooden-puzzles', name: 'Wooden Puzzles', slug: 'wooden-puzzles', image: '/categories/wooden-puzzles.jpg' },
  { id: 'wooden-toys', name: 'Wooden Toys', slug: 'wooden-toys', image: '/categories/wooden-toys.jpg' },
  { id: 'home-decor', name: 'Home Decor', slug: 'home-decor', image: '/categories/home-decor.jpg' },
  { id: 'kitchenware', name: 'Kitchenware', slug: 'kitchenware', image: '/categories/kitchenware.jpg' },
];

const CATEGORY_IMAGES: Record<string, string> = {
  'Copper Handicraft': '/categories/copper-handicraft.jpg',
  'Macrame Bags': '/categories/macrame-bags.jpg',
  'Macrame Cushion': '/categories/macrame-cushion.jpg',
  'Macrame Wall Hanging': '/categories/macrame-wall-hanging.jpg',
  'Wooden Puzzles': '/categories/wooden-puzzles.jpg',
  'Wooden Toys': '/categories/wooden-toys.jpg',
  'Wooden toys': '/categories/wooden-toys.jpg',
  'Home Decor': '/categories/home-decor.jpg',
  'Kitchenware': '/categories/kitchenware.jpg',
};

export default function ProductsShowcase({ categories = [] }: Props) {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Combine passed categories or default categories, ensuring all 8 are present
  const displayCategories = (() => {
    if (!categories || categories.length === 0) return ALL_8_CATEGORIES;
    const existingNames = new Set(categories.map((c) => c.name.toLowerCase().trim()));
    const missing = ALL_8_CATEGORIES.filter((c) => !existingNames.has(c.name.toLowerCase().trim()));
    return [...categories.filter((c) => !c.name.toLowerCase().includes('coconut')), ...missing];
  })();

  const totalItems = displayCategories.length + 1; // +1 for View All card

  // Calculate track width accurately for both mobile and desktop
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const clientW = window.innerWidth;
        const extraPad = clientW < 640 ? 32 : 80;
        setMaxScrollWidth(Math.max(0, scrollW - clientW + extraPad));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    const timer1 = setTimeout(updateWidth, 300);
    const timer2 = setTimeout(updateWidth, 1000);
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [displayCategories.length]);

  // Sticky Page Scroll (Works on both Mobile & Desktop)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollWidth]);
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setCurrentProgress(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Step scroll button handler
  const handleScrollStep = (direction: 'left' | 'right') => {
    if (!targetRef.current) return;
    const element = targetRef.current;
    const rect = element.getBoundingClientRect();
    const elementTop = window.pageYOffset + rect.top;
    const totalScrollableHeight = element.offsetHeight - window.innerHeight;

    if (totalScrollableHeight <= 0) return;

    const currentProg = Math.max(0, Math.min(1, (window.pageYOffset - elementTop) / totalScrollableHeight));
    const step = 1 / totalItems;
    let targetProg = direction === 'right' ? currentProg + step : currentProg - step;
    targetProg = Math.max(0, Math.min(1, targetProg));

    const targetScrollY = elementTop + targetProg * totalScrollableHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#FFF8F0]">
      <div className="sticky top-0 h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-10 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 0.75px, transparent 0.75px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Section Header */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1400px] w-full mx-auto flex items-end justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3"
              style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              <Sparkles size={13} color="#8B4513" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#8B4513]">
                Handcrafted Collections
              </span>
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-bold"
              style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
            >
              Explore Our Categories
            </h2>
            <p className="text-gray-600 mt-1 sm:mt-2 max-w-2xl text-xs sm:text-sm md:text-base hidden sm:block">
              Scroll down to explore all handcrafted categories. Each card showcases traditional Indian artistry.
            </p>
          </div>

          {/* Navigation Arrow Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => handleScrollStep('left')}
              disabled={currentProgress <= 2}
              aria-label="Previous Category"
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300 ${
                currentProgress > 2
                  ? 'bg-white text-[#8B4513] shadow-md hover:bg-[#8B4513] hover:text-white hover:border-[#8B4513] cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => handleScrollStep('right')}
              disabled={currentProgress >= 98}
              aria-label="Next Category"
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300 ${
                currentProgress < 98
                  ? 'bg-white text-[#8B4513] shadow-md hover:bg-[#8B4513] hover:text-white hover:border-[#8B4513] cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Horizontal Track (Works on Mobile + Tablet + PC) */}
        <div className="relative z-10 w-full my-auto overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 sm:gap-6 px-4 sm:px-8 lg:px-12 w-[max-content]"
          >
            {displayCategories.map((cat, idx) => {
              const imgSrc = cat.image || CATEGORY_IMAGES[cat.name] || '/categories/wooden-puzzles.jpg';
              return (
                <Link
                  key={cat.id || cat.slug || idx}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="relative group flex-shrink-0 w-[76vw] sm:w-[320px] md:w-[340px] h-[330px] sm:h-[360px] md:h-[370px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-transparent hover:border-[#D4AF37] transition-all duration-500"
                >
                  <img
                    src={imgSrc}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/50 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full z-10">
                    <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-[10px] sm:text-xs mb-1">
                      Export Collection
                    </p>
                    <h3 className="text-white text-lg sm:text-2xl font-bold mb-2 font-serif leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {cat.name}
                    </h3>

                    <div className="flex items-center text-white/90 gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm group-hover:text-[#D4AF37] transition-colors pt-2 border-t border-white/10">
                      <span>Explore Range</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* View All Card */}
            <Link
              href="/products"
              className="relative group flex-shrink-0 w-[76vw] sm:w-[320px] md:w-[340px] h-[330px] sm:h-[360px] md:h-[370px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-[#D4AF37]/40 bg-[#1A1816] flex items-center justify-center transition-all duration-500 hover:border-[#D4AF37]"
            >
              <div
                className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-80"
                style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.35) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 flex flex-col items-center p-6 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#D4AF37]/40 bg-black/60 backdrop-blur-md flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#D4AF37] transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] group-hover:text-black transition-colors duration-500" />
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-1 font-serif tracking-wide group-hover:scale-105 transition-transform duration-500">
                  View Entire
                </h3>
                <h3 className="text-[#D4AF37] text-xl sm:text-2xl font-bold font-serif italic group-hover:scale-105 transition-transform duration-500">
                  Catalogue
                </h3>
                <p className="text-gray-400 mt-2 sm:mt-3 text-xs max-w-[200px] leading-relaxed">
                  Discover all 8 categories and full handmade products range
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Progress Bar (Works on Mobile + Desktop) */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1400px] w-full mx-auto pb-2 flex items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8B4513]">
            <span>Cat</span>
            <span className="text-[#D4AF37] font-bold text-xs sm:text-sm font-serif">
              0{Math.min(displayCategories.length, Math.max(1, Math.ceil((currentProgress / 100) * displayCategories.length)))}
            </span>
            <span className="text-gray-400">/ 0{displayCategories.length}</span>
          </div>

          <div className="flex-1 h-1.5 sm:h-2 bg-black/5 rounded-full overflow-hidden border border-[#D4AF37]/25 p-[1px] backdrop-blur-sm shadow-inner">
            <motion.div
              style={{ width: progressPercent }}
              className="h-full bg-gradient-to-r from-[#8B4513] via-[#D4AF37] to-[#F5D061] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            />
          </div>

          <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#8B4513]/10 border border-[#D4AF37]/30 text-[10px] sm:text-xs font-bold text-[#8B4513] tracking-wider min-w-[44px] sm:min-w-[52px] text-center shadow-sm">
            {currentProgress}%
          </div>
        </div>
      </div>
    </section>
  );
}
