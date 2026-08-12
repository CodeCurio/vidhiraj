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
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);

  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [canScrollLeftMobile, setCanScrollLeftMobile] = useState(false);
  const [canScrollRightMobile, setCanScrollRightMobile] = useState(true);

  // Combine passed categories or default categories, ensuring all 8 are present
  const displayCategories = (() => {
    if (!categories || categories.length === 0) return ALL_8_CATEGORIES;
    const existingNames = new Set(categories.map((c) => c.name.toLowerCase().trim()));
    const missing = ALL_8_CATEGORIES.filter((c) => !existingNames.has(c.name.toLowerCase().trim()));
    return [...categories.filter((c) => !c.name.toLowerCase().includes('coconut')), ...missing];
  })();

  const totalItems = displayCategories.length + 1; // +1 for View All card

  // Calculate track width for desktop transform
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const clientW = window.innerWidth;
        setMaxScrollWidth(Math.max(0, scrollW - clientW + 96));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    const timer = setTimeout(updateWidth, 500);
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, [displayCategories.length]);

  // Desktop Sticky Page Scroll
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

  // Desktop Arrow button handlers
  const handleDesktopScrollStep = (direction: 'left' | 'right') => {
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

  // Mobile Horizontal Scroll Handlers
  const handleMobileScrollState = () => {
    if (!mobileScrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = mobileScrollContainerRef.current;
    const maxS = scrollWidth - clientWidth;
    if (maxS > 0) {
      setCanScrollLeftMobile(scrollLeft > 10);
      setCanScrollRightMobile(scrollLeft < maxS - 10);
    }
  };

  const handleMobileScroll = (direction: 'left' | 'right') => {
    if (!mobileScrollContainerRef.current) return;
    const scrollAmount = mobileScrollContainerRef.current.clientWidth * 0.8;
    mobileScrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = mobileScrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleMobileScrollState, { passive: true });
    handleMobileScrollState();
    return () => el.removeEventListener('scroll', handleMobileScrollState);
  }, []);

  return (
    <>
      {/* ── DESKTOP VIEW (MD & UP): STICKY HORIZONTAL PAGE PINNING ── */}
      <section ref={targetRef} className="hidden md:block relative h-[250vh] bg-[#FFF8F0]">
        <div className="sticky top-0 h-screen flex flex-col justify-between pt-24 pb-10 overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none z-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #D4AF37 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Section Header */}
          <div className="relative z-10 px-8 lg:px-12 max-w-[1400px] w-full mx-auto flex items-end justify-between gap-4">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
                style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
              >
                <Sparkles size={14} color="#8B4513" />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8B4513' }}>
                  Handcrafted Collections
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
              >
                Explore Our Categories
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl text-sm md:text-base">
                Scroll down to explore all handcrafted categories. Each card showcases traditional Indian artistry.
              </p>
            </div>

            {/* Desktop Navigation Arrow Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => handleDesktopScrollStep('left')}
                disabled={currentProgress <= 2}
                aria-label="Previous Category"
                className={`w-11 h-11 rounded-full border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300 ${
                  currentProgress > 2
                    ? 'bg-white text-[#8B4513] shadow-md hover:bg-[#8B4513] hover:text-white hover:border-[#8B4513] cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => handleDesktopScrollStep('right')}
                disabled={currentProgress >= 98}
                aria-label="Next Category"
                className={`w-11 h-11 rounded-full border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300 ${
                  currentProgress < 98
                    ? 'bg-white text-[#8B4513] shadow-md hover:bg-[#8B4513] hover:text-white hover:border-[#8B4513] cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Sliding Horizontal Track */}
          <div className="relative z-10 w-full my-auto overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 px-8 lg:px-12 w-[max-content]"
            >
              {displayCategories.map((cat, idx) => {
                const imgSrc = cat.image || CATEGORY_IMAGES[cat.name] || '/categories/wooden-puzzles.jpg';
                return (
                  <Link
                    key={cat.id || cat.slug || idx}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="relative group flex-shrink-0 w-[300px] md:w-[340px] h-[350px] md:h-[370px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-transparent hover:border-[#D4AF37] transition-all duration-500"
                  >
                    <img
                      src={imgSrc}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/95"></div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full z-10">
                      <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-xs mb-1">
                        Export Collection
                      </p>
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 font-serif leading-tight group-hover:text-[#D4AF37] transition-colors">
                        {cat.name}
                      </h3>

                      <div className="flex items-center text-white/90 gap-2 font-medium text-xs md:text-sm group-hover:text-[#D4AF37] transition-colors pt-2 border-t border-white/10">
                        <span>Explore Range</span>
                        <ArrowRight size={15} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* View All Card */}
              <Link
                href="/products"
                className="relative group flex-shrink-0 w-[300px] md:w-[340px] h-[350px] md:h-[370px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-[#D4AF37]/40 bg-[#1A1816] flex items-center justify-center transition-all duration-500 hover:border-[#D4AF37]"
              >
                <div
                  className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-80"
                  style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.35) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10 flex flex-col items-center p-6 text-center">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37]/40 bg-black/60 backdrop-blur-md flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                    <ArrowRight size={24} className="text-[#D4AF37] group-hover:text-black transition-colors duration-500" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-1 font-serif tracking-wide group-hover:scale-105 transition-transform duration-500">
                    View Entire
                  </h3>
                  <h3 className="text-[#D4AF37] text-2xl font-bold font-serif italic group-hover:scale-105 transition-transform duration-500">
                    Catalogue
                  </h3>
                  <p className="text-gray-400 mt-3 text-xs max-w-[200px] leading-relaxed">
                    Discover all 8 categories and full handmade products range
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Progress Bar */}
          <div className="relative z-10 px-8 lg:px-12 max-w-[1400px] w-full mx-auto pb-2 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B4513]">
              <span>Category</span>
              <span className="text-[#D4AF37] font-bold text-sm font-serif">
                0{Math.min(displayCategories.length, Math.max(1, Math.ceil((currentProgress / 100) * displayCategories.length)))}
              </span>
              <span className="text-gray-400">/ 0{displayCategories.length}</span>
            </div>

            <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden border border-[#D4AF37]/25 p-[1px] backdrop-blur-sm shadow-inner">
              <motion.div
                style={{ width: progressPercent }}
                className="h-full bg-gradient-to-r from-[#8B4513] via-[#D4AF37] to-[#F5D061] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              />
            </div>

            <div className="px-3 py-1 rounded-full bg-[#8B4513]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#8B4513] tracking-wider min-w-[52px] text-center shadow-sm">
              {currentProgress}%
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE VIEW (< MD SCREENS): ULTRA-SMOOTH HORIZONTAL TOUCH SWIPE (NO PAGE TRAPPING) ── */}
      <section className="md:hidden py-14 px-4 bg-[#FFF8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header & Mobile Controls */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2"
                style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
              >
                <Sparkles size={12} color="#8B4513" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#8B4513]">
                  Handcrafted Collections
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#1C1C1C] font-serif">
                Explore Categories
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMobileScroll('left')}
                disabled={!canScrollLeftMobile}
                aria-label="Previous"
                className={`w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center ${
                  canScrollLeftMobile ? 'bg-white text-[#8B4513] shadow-sm' : 'bg-gray-100 text-gray-400 opacity-50'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleMobileScroll('right')}
                disabled={!canScrollRightMobile}
                aria-label="Next"
                className={`w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center ${
                  canScrollRightMobile ? 'bg-white text-[#8B4513] shadow-sm' : 'bg-gray-100 text-gray-400 opacity-50'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Native Touch Swipe Cards Track */}
          <div
            ref={mobileScrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory touch-pan-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {displayCategories.map((cat, idx) => {
              const imgSrc = cat.image || CATEGORY_IMAGES[cat.name] || '/categories/wooden-puzzles.jpg';
              return (
                <Link
                  key={cat.id || cat.slug || idx}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="relative group flex-shrink-0 w-[78vw] max-w-[280px] h-[340px] rounded-2xl overflow-hidden shadow-lg border border-transparent hover:border-[#D4AF37] snap-start"
                >
                  <img
                    src={imgSrc}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-5 w-full z-10">
                    <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-[10px] mb-1">
                      Export Collection
                    </p>
                    <h3 className="text-white text-lg font-bold mb-2 font-serif leading-tight">
                      {cat.name}
                    </h3>
                    <div className="flex items-center text-white/90 gap-1.5 font-medium text-xs text-[#D4AF37] pt-2 border-t border-white/10">
                      <span>Explore Range</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* View All Card Mobile */}
            <Link
              href="/products"
              className="relative group flex-shrink-0 w-[78vw] max-w-[280px] h-[340px] rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/40 bg-[#1A1816] flex items-center justify-center snap-start"
            >
              <div className="relative z-10 flex flex-col items-center p-6 text-center">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-black/60 backdrop-blur-md flex items-center justify-center mb-3">
                  <ArrowRight size={20} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-white text-xl font-bold font-serif">View Entire</h3>
                <h3 className="text-[#D4AF37] text-xl font-bold font-serif italic">Catalogue</h3>
                <p className="text-gray-400 mt-2 text-[11px] leading-relaxed">
                  Discover all 8 categories
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
