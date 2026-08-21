'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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

const NAVBAR_HEIGHT = 96; // 32px LanguageBar + 64px Navbar

export default function ProductsShowcase({ categories = [] }: Props) {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [currentProgress, setCurrentProgress] = useState(0);

  // Combine passed categories or default categories
  const displayCategories = (() => {
    if (!categories || categories.length === 0) return ALL_8_CATEGORIES;
    const existingNames = new Set(categories.map((c) => c.name.toLowerCase().trim()));
    const missing = ALL_8_CATEGORIES.filter((c) => !existingNames.has(c.name.toLowerCase().trim()));
    return [...categories.filter((c) => !c.name.toLowerCase().includes('coconut')), ...missing];
  })();

  const totalItems = displayCategories.length + 1; // +1 for View All card

  // Framer Motion motion values for spring-smoothed movement
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.25 });

  // Direct robust scroll handler taking navbar height into account
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!targetRef.current || !trackRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const trackWidth = trackRef.current.scrollWidth;
      const clientWidth = window.innerWidth;
      const extraPad = clientWidth < 640 ? 32 : 96;
      const maxW = Math.max(0, trackWidth - clientWidth + extraPad);

      const availableHeight = window.innerHeight - NAVBAR_HEIGHT;
      const totalDist = targetRef.current.offsetHeight - availableHeight;
      if (totalDist <= 0) return;

      // Distance scrolled past the navbar top offset (96px)
      const scrolled = NAVBAR_HEIGHT - rect.top;
      const prog = Math.max(0, Math.min(1, scrolled / totalDist));

      setCurrentProgress(Math.round(prog * 100));
      x.set(-prog * maxW);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    // Initial evaluations
    handleScroll();
    const t1 = setTimeout(handleScroll, 200);
    const t2 = setTimeout(handleScroll, 800);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [displayCategories.length, x]);

  // Step scroll button handler
  const handleScrollStep = (direction: 'left' | 'right') => {
    if (!targetRef.current) return;
    const element = targetRef.current;
    const rect = element.getBoundingClientRect();
    const elementTop = window.scrollY + rect.top - NAVBAR_HEIGHT;
    const availableHeight = window.innerHeight - NAVBAR_HEIGHT;
    const totalDist = element.offsetHeight - availableHeight;

    if (totalDist <= 0) return;

    const currentProg = Math.max(0, Math.min(1, (window.scrollY - elementTop) / totalDist));
    const step = 1 / totalItems;
    let targetProg = direction === 'right' ? currentProg + step : currentProg - step;
    targetProg = Math.max(0, Math.min(1, targetProg));

    const targetScrollY = elementTop + targetProg * totalDist;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={targetRef} className="relative h-[320vh] bg-[#FFF8F0]">
      {/* Sticky container pinned right below the 96px fixed navbar */}
      <div className="sticky top-24 h-[calc(100vh-96px)] flex flex-col justify-between pt-4 sm:pt-6 pb-4 sm:pb-6 overflow-hidden">
        
        {/* Background Radial Pattern */}
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-1.5 sm:mb-2 shadow-xs"
              style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              <Sparkles size={13} className="text-[#8B4513]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#8B4513]">
                Handcrafted Collections
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
              style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
            >
              Explore Our Categories
            </h2>
            <p className="text-gray-600 mt-1 max-w-2xl text-xs sm:text-sm hidden sm:block">
              Scroll down to explore all handcrafted categories. Each card showcases traditional Indian artistry.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-gray-500 mr-2">
              <span className="text-[#8B4513] font-bold">{currentProgress}%</span>
              <span>explored</span>
            </div>

            <button
              onClick={() => handleScrollStep('left')}
              disabled={currentProgress <= 2}
              aria-label="Previous Category"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300 ${
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
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300 ${
                currentProgress < 98
                  ? 'bg-white text-[#8B4513] shadow-md hover:bg-[#8B4513] hover:text-white hover:border-[#8B4513] cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Pinned Horizontal Track (Spring Physics + Full 0% to 100% Range) */}
        <div className="relative z-10 w-full my-auto overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x: smoothX }}
            className="flex gap-4 sm:gap-6 px-4 sm:px-8 lg:px-12 w-[max-content] will-change-transform transform-gpu"
          >
            {displayCategories.map((cat, idx) => {
              const imgSrc = cat.image || CATEGORY_IMAGES[cat.name] || '/categories/wooden-puzzles.jpg';
              return (
                <Link
                  key={cat.id || cat.slug || idx}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="relative group flex-shrink-0 w-[74vw] sm:w-[300px] md:w-[320px] h-[300px] sm:h-[320px] md:h-[330px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-transparent hover:border-[#D4AF37] transition-all duration-300"
                >
                  <img
                    src={imgSrc}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/50 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full z-10">
                    <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-[10px] sm:text-xs mb-1">
                      Export Collection
                    </p>
                    <h3 className="text-white text-base sm:text-xl font-bold mb-2 font-serif leading-tight group-hover:text-[#D4AF37] transition-colors">
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
              className="relative group flex-shrink-0 w-[74vw] sm:w-[300px] md:w-[320px] h-[300px] sm:h-[320px] md:h-[330px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-[#D4AF37]/40 bg-[#1A1816] flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37]"
            >
              <div
                className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-80"
                style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.35) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 flex flex-col items-center p-5 text-center">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/40 bg-black/60 backdrop-blur-md flex items-center justify-center mb-2.5 sm:mb-3 group-hover:bg-[#D4AF37] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                  <ArrowRight className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="text-white text-lg sm:text-xl font-bold mb-1 font-serif tracking-wide group-hover:scale-105 transition-transform duration-300">
                  View Entire
                </h3>
                <h3 className="text-[#D4AF37] text-lg sm:text-xl font-bold font-serif italic group-hover:scale-105 transition-transform duration-300">
                  Catalogue
                </h3>
                <p className="text-gray-400 mt-1.5 sm:mt-2 text-[11px] sm:text-xs max-w-[190px] leading-relaxed">
                  Discover all {displayCategories.length} categories and full wholesale range
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="relative z-10 px-4 sm:px-8 max-w-md mx-auto w-full flex items-center justify-between gap-4">
          <span className="text-[11px] font-bold text-[#8B4513] uppercase tracking-widest">
            01
          </span>
          <div className="flex-1 h-1.5 bg-[#E8D8C8] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4AF37] rounded-full"
              style={{ width: `${Math.max(12, currentProgress)}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            0{displayCategories.length}
          </span>
        </div>

      </div>
    </section>
  );
}
