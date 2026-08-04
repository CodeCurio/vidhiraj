'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { ArrowRight, Sparkles, Grid, Box, Award, Leaf, Gift, LayoutGrid, ChevronRight } from 'lucide-react';
import type { Product, Category } from '@/types';

interface Props {
  allProducts: Product[];
  categories: Category[];
}

function getCategoryIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('all')) return Sparkles;
  if (lower.includes('wood')) return Box;
  if (lower.includes('brass') || lower.includes('metal')) return Award;
  if (lower.includes('coconut')) return Leaf;
  if (lower.includes('gift') || lower.includes('hamper')) return Gift;
  return LayoutGrid;
}

export default function ProductsShowcase({ allProducts = [], categories = [] }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Build category options list
  const categoryNames = useMemo(() => {
    const list: Array<{ id: string; name: string; count: number }> = [
      { id: 'all', name: 'All Collection', count: allProducts.length },
    ];

    categories.forEach((cat) => {
      const count = allProducts.filter(
        (p) => p.category.toLowerCase().trim() === cat.name.toLowerCase().trim()
      ).length;
      list.push({
        id: cat.id,
        name: cat.name,
        count: count > 0 ? count : 4,
      });
    });

    return list;
  }, [allProducts, categories]);

  // Filtered products calculation
  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      const featured = allProducts.filter((p) => p.featured);
      return featured.length >= 4 ? featured.slice(0, 8) : allProducts.slice(0, 8);
    }

    const foundCategory = categoryNames.find((c) => c.id === selectedCategory);
    if (!foundCategory) return allProducts.slice(0, 8);

    const filtered = allProducts.filter(
      (p) => p.category.toLowerCase().trim() === foundCategory.name.toLowerCase().trim()
    );

    return filtered.length > 0 ? filtered.slice(0, 8) : allProducts.slice(0, 8);
  }, [selectedCategory, allProducts, categoryNames]);

  const activeCategoryObj = categoryNames.find((c) => c.id === selectedCategory);

  return (
    <section className="py-14 sm:py-20 px-4 relative overflow-hidden" style={{ background: '#FFF8F0' }}>
      {/* Background subtle dot pattern */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            <Sparkles size={14} color="#8B4513" />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8B4513' }}>
              Wholesale Product Catalogue
            </span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-bold mb-3"
            style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
          >
            Explore Our Handcrafted Collections
          </h2>

          <p className="text-xs sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Select a category below to browse 100% handmade wooden artifacts, brass statuettes, and coconut shell crafts.
          </p>
        </div>

        {/* CATEGORY OPTION BAR (TOUCH SWIPE ON MOBILE, CENTERED FLEX ON DESKTOP) */}
        <div className="relative mb-8 sm:mb-12">
          {/* Scrollable Container */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 sm:flex-wrap sm:justify-center scroll-smooth">
            {categoryNames.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const Icon = getCategoryIcon(cat.name);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'shadow-lg shadow-amber-950/20 scale-105'
                      : 'bg-white text-gray-700 hover:text-amber-900 hover:bg-amber-50/50 hover:border-amber-400 hover:scale-102 shadow-xs'
                  }`}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #8B4513 0%, #6B3410 100%)' : '#ffffff',
                    color: isActive ? '#FFF8F0' : '#444444',
                    border: isActive ? '1px solid #8B4513' : '1px solid #e0d2c0',
                  }}
                >
                  <Icon size={16} className={isActive ? 'text-amber-400' : 'text-amber-800'} />
                  <span className="font-medium whitespace-nowrap">{cat.name}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isActive ? 'bg-[#D4AF37] text-amber-950' : 'bg-[#f0e0cc] text-[#8B4513]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="sm:hidden flex items-center justify-center gap-1 text-[11px] text-amber-900/60 mt-1">
            <span>Swipe categories</span>
            <ChevronRight size={12} className="animate-pulse" />
          </div>
        </div>

        {/* ACTIVE CATEGORY HEADING & PRODUCT COUNT BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-amber-200/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-900/10 border border-amber-800/20 flex items-center justify-center text-amber-900 flex-shrink-0">
              <Grid size={18} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                {activeCategoryObj?.name || 'All Collection'}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Displaying top export items ({displayedProducts.length} items)
              </p>
            </div>
          </div>

          <Link
            href={
              selectedCategory === 'all'
                ? '/products'
                : `/products?category=${encodeURIComponent(activeCategoryObj?.name || '')}`
            }
            className="text-xs font-bold text-[#8B4513] hover:text-amber-900 flex items-center gap-1.5 transition-colors self-end sm:self-auto"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* PRODUCTS GRID */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <p className="text-base text-gray-500 font-medium mb-4">
              No products found in this category.
            </p>
            <Link href="/products" className="btn-primary px-6 py-2.5 text-xs font-semibold">
              Browse All Catalogue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* BOTTOM ACTION BUTTON */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href={
              selectedCategory === 'all'
                ? '/products'
                : `/products?category=${encodeURIComponent(activeCategoryObj?.name || '')}`
            }
            className="btn-primary px-8 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5 shadow-lg hover:scale-105 transition-transform"
          >
            <span>Explore All {activeCategoryObj?.name || 'Handicrafts'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
