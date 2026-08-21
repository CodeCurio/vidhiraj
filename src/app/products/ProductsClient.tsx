'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import type { Product, Category } from '@/types';
import {
  Sparkles,
  ArrowRight,
  Search,
  X,
  Package,
  CheckCircle2,
  ChevronRight,
  Filter,
  Grid as GridIcon
} from 'lucide-react';

interface Props {
  products: Product[];
  categories: Category[];
  activeCategory: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  'Copper Handicraft': '🏺',
  'Macrame Bags': '👜',
  'Macrame Cushion': '🛋️',
  'Macrame Wall Hanging': '🖼️',
  'Wooden Puzzles': '🧩',
  'Wooden Toys': '🧸',
  'Home Decor': '✨',
  'Kitchenware': '🍳',
  'Brass Handicraft': '🔔',
  'Wooden Handicraft': '🪵',
  'Gifting & Hampers': '🎁',
};

export default function ProductsClient({ products, categories, activeCategory: initialCategory }: Props) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || '');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(initialCategory || '');
  }, [initialCategory]);

  const handleCategoryChange = (catName: string) => {
    setSelectedCategory(catName);
    if (catName) {
      router.push(`/products?category=${encodeURIComponent(catName)}`, { scroll: false });
    } else {
      router.push('/products', { scroll: false });
    }
  };

  // Derive unique list of categories
  const categoryNamesList = Array.from(
    new Set([
      ...categories.map((c) => c.name),
      ...products.map((p) => p.category).filter(Boolean),
    ])
  );

  // Filter products by search query
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!selectedCategory) return matchesSearch;
    return matchesSearch && p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
  });

  // Group products by category for "All Categories" view
  const groupedCategories = categoryNamesList
    .map((catName) => {
      const catProducts = products.filter(
        (p) =>
          p.category.toLowerCase().trim() === catName.toLowerCase().trim() &&
          (!searchQuery.trim() ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))))
      );
      return {
        name: catName,
        icon: CATEGORY_ICONS[catName] || '💎',
        products: catProducts,
        totalCount: products.filter((p) => p.category.toLowerCase().trim() === catName.toLowerCase().trim()).length,
      };
    })
    .filter((group) => group.products.length > 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-[#FAF6F1] text-[#1C1C1C] min-h-screen w-full">
      
      {/* Brand Hero Header */}
      <section
        className="relative py-14 sm:py-16 flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3a1a06 0%, #68300B 50%, #8B4513 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] block mb-2">
              ✦ Handicraft Catalogue ✦
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-[#FFF8F0]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Our Products
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#E0C8B0]">
              Handcrafted with care in Chandigarh, India. Available for wholesale, bulk orders, and custom OEM manufacturing for global importers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container: Left Categories Sidebar + Right Products Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Mobile Dropdown Category Filter (Visible only on small screens) */}
        <div className="md:hidden mb-6 bg-white p-3.5 rounded-2xl border border-[#E8D8C8] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#8B4513] flex items-center gap-1.5">
              <Filter size={13} />
              <span>Select Category</span>
            </label>
            <span className="text-xs text-gray-500 font-medium">{products.length} Items</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 bg-[#FFF8F0] border border-[#D4AF37]/40 rounded-xl text-xs font-semibold text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          >
            <option value="">✨ All Categories (2–3 Items Showcase)</option>
            {categoryNamesList.map((catName) => {
              const count = products.filter(
                (p) => p.category.toLowerCase().trim() === catName.toLowerCase().trim()
              ).length;
              return (
                <option key={catName} value={catName}>
                  {catName} ({count} items)
                </option>
              );
            })}
          </select>
        </div>

        {/* Desktop 2-Column Layout */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start w-full min-w-0">
          
          {/* ================= LEFT SIDEBAR (STICKY & FIXED) ================= */}
          <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0 sticky top-28 z-20">
            <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-sm overflow-hidden">
              
              {/* Sidebar Header */}
              <div className="px-4 py-3.5 bg-[#FFF8F0] border-b border-[#E8D8C8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GridIcon size={15} className="text-[#8B4513]" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B4513]">
                    Categories
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B4513] text-white">
                  {categoryNamesList.length}
                </span>
              </div>

              {/* Sidebar Navigation Items */}
              <nav className="p-2 space-y-1">
                
                {/* "All Categories" Button */}
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`relative w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                    !selectedCategory
                      ? 'text-white shadow-sm'
                      : 'text-[#1C1C1C] hover:bg-[#FFF8F0] hover:text-[#8B4513]'
                  }`}
                >
                  {!selectedCategory && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#A0522D]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-sm">✨</span>
                    <span>All Categories</span>
                  </span>
                  <span
                    className={`relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      !selectedCategory ? 'bg-white/20 text-white' : 'bg-[#8B4513]/10 text-[#8B4513]'
                    }`}
                  >
                    {products.length}
                  </span>
                </button>

                {/* Individual Category Buttons */}
                {categoryNamesList.map((catName) => {
                  const isActive = selectedCategory.toLowerCase().trim() === catName.toLowerCase().trim();
                  const count = products.filter(
                    (p) => p.category.toLowerCase().trim() === catName.toLowerCase().trim()
                  ).length;
                  const icon = CATEGORY_ICONS[catName] || '📦';

                  return (
                    <button
                      key={catName}
                      onClick={() => handleCategoryChange(catName)}
                      className={`relative w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                        isActive
                          ? 'text-white shadow-sm font-bold'
                          : 'text-[#333] hover:bg-[#FFF8F0] hover:text-[#8B4513]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebarActivePill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#A0522D]"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2 min-w-0 pr-1">
                        <span className="text-sm flex-shrink-0">{icon}</span>
                        <span className="truncate text-xs">{catName}</span>
                      </span>
                      <span
                        className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#8B4513]/10 text-[#8B4513]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Footer */}
              <div className="p-2.5 bg-[#FFF8F0]/80 border-t border-[#E8D8C8] text-center">
                <p className="text-[11px] text-gray-500 font-medium flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} className="text-[#8B4513]" />
                  <span>Click category to filter view</span>
                </p>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT AREA ================= */}
          <div className="flex-1 min-w-0 w-full">
            
            {/* Search & Filter Header Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8D8C8] shadow-xs mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                  {selectedCategory ? 'Category Filter Active' : 'Showing 2–3 Products Per Category'}
                </span>
                <h2 className="text-xl font-bold font-serif text-[#1C1C1C] mt-0.5">
                  {selectedCategory ? selectedCategory : 'All Product Collections'}
                </h2>
              </div>

              {/* Search Box */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="relative w-full sm:w-56">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in products..."
                    className="w-full pl-9 pr-8 py-1.5 bg-[#FFF8F0] border border-[#E8D8C8] rounded-xl text-xs font-medium focus:outline-none focus:border-[#8B4513] text-[#1C1C1C]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {selectedCategory && (
                  <button
                    onClick={() => handleCategoryChange('')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-all flex-shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <X size={12} />
                    <span>Clear Filter</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Content Display with Framer Motion */}
            <AnimatePresence mode="wait">
              
              {/* MODE 1: ALL CATEGORIES VIEW (2-3 Products Per Category Showcase) */}
              {!selectedCategory ? (
                groupedCategories.length === 0 ? (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 bg-white rounded-2xl border border-[#E8D8C8] p-8"
                  >
                    <Package className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-60" />
                    <h3 className="text-lg font-bold text-gray-800">No products found</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      No items matched your search query &quot;{searchQuery}&quot;.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-4 py-2 rounded-xl bg-[#8B4513] text-white text-xs font-semibold hover:bg-[#5C2C0C] transition-colors cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="all-categories-grouped"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                    className="space-y-8 w-full"
                  >
                    {groupedCategories.map((group) => {
                      // Show 2 to 3 products per category on main showcase
                      const showcaseItems = group.products.slice(0, 3);

                      return (
                        <motion.div
                          key={group.name}
                          variants={itemVariants}
                          className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8D8C8] shadow-xs relative overflow-hidden w-full"
                        >
                          {/* Accent Top Bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B4513] via-[#D4AF37] to-[#8B4513]" />

                          {/* Category Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-[#F5E6D8] w-full">
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 rounded-xl bg-[#FFF8F0] border border-[#D4AF37]/30 flex items-center justify-center text-lg shadow-xs flex-shrink-0">
                                {group.icon}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-bold font-serif text-[#1C1C1C]">
                                    {group.name}
                                  </h3>
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#8B4513]/10 text-[#8B4513]">
                                    {group.totalCount} items
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Handcrafted Indian export collection
                                </p>
                              </div>
                            </div>

                            {/* View All Button */}
                            <motion.button
                              whileHover={{ scale: 1.02, x: 2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleCategoryChange(group.name)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#8B4513] bg-[#FFF8F0] border border-[#D4AF37]/40 hover:bg-[#8B4513] hover:text-white transition-all shadow-xs group cursor-pointer self-start sm:self-auto flex-shrink-0"
                            >
                              <span>View All ({group.totalCount}) {group.name}</span>
                              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                          </div>

                          {/* 2 to 3 Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                            {showcaseItems.map((product) => (
                              <motion.div
                                key={product.id}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                className="h-full w-full"
                              >
                                <ProductCard product={product} />
                              </motion.div>
                            ))}
                          </div>

                          {/* Extra items indicator */}
                          {group.products.length > 3 && (
                            <div className="mt-4 text-center border-t border-[#F5E6D8] pt-2.5">
                              <button
                                onClick={() => handleCategoryChange(group.name)}
                                className="text-xs font-semibold text-[#8B4513] hover:text-[#5C2C0C] inline-flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>+ View remaining {group.products.length - 3} items in {group.name}</span>
                                <ChevronRight size={13} />
                              </button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )
              ) : (
                
                /* MODE 2: SINGLE CATEGORY SELECTED -> ANIMATED FULL PRODUCT GRID */
                <motion.div
                  key={`single-cat-${selectedCategory}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8D8C8] shadow-xs w-full"
                >
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#F5E6D8]">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-[#FFF8F0] border border-[#D4AF37]/30 flex items-center justify-center text-xl shadow-xs">
                        {CATEGORY_ICONS[selectedCategory] || '📦'}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-serif text-[#1C1C1C]">
                          {selectedCategory}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Showing all {filteredProducts.length} handcrafted products
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCategoryChange('')}
                      className="text-xs font-semibold text-[#8B4513] hover:underline cursor-pointer"
                    >
                      ← Back to All Categories
                    </button>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-gray-800">No products found</h3>
                      <p className="text-xs text-gray-500 mt-1">Try clearing search filter.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                      {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants} whileHover={{ y: -4 }} className="w-full">
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MOQ & Wholesale Bulk Orders Banner */}
      <section className="py-10 px-4 bg-[#FFF8F0] border-t border-[#E8D8C8] w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-xs font-bold mb-2">
            <Sparkles size={12} />
            <span>Wholesale & Bulk Inquiries</span>
          </div>
          <p className="text-sm sm:text-base text-gray-700 font-medium max-w-2xl mx-auto">
            <strong className="text-[#8B4513]">Minimum Order Quantities (MOQ)</strong> vary by product category. Contact us for direct container-load export pricing, custom branding, and samples.
          </p>
        </div>
      </section>
    </div>
  );
}
