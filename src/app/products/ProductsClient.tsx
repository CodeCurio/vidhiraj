'use client';

import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product, Category } from '@/types';

interface Props {
  products: Product[];
  categories: Category[];
  activeCategory: string;
}

export default function ProductsClient({ products, categories, activeCategory }: Props) {
  const router = useRouter();

  const handleCategoryChange = (value: string) => {
    if (value) {
      router.push(`/products?category=${encodeURIComponent(value)}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{
          background: 'linear-gradient(135deg, #3a1a06 0%, #8B4513 100%)',
          paddingTop: '120px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Catalogue
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              Our Products
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              Handcrafted with care in Chandigarh, India. Available for wholesale, bulk orders, and custom manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Mobile: dropdown category selector */}
          <div className="md:hidden mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#888' }}>
              Filter by Category
            </label>
            <select
              value={activeCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none"
              style={{ border: '1px solid #ddd', color: '#1C1C1C' }}
            >
              <option value="">All Products</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar — desktop only */}
            <aside className="hidden md:block w-52 flex-shrink-0">
              <div
                className="sticky top-24 rounded-xl overflow-hidden"
                style={{ border: '1px solid #f0e0cc' }}
              >
                <div
                  className="px-4 py-3"
                  style={{ background: '#FFF8F0', borderBottom: '1px solid #f0e0cc' }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#8B4513' }}>
                    Categories
                  </span>
                </div>
                <nav className="p-2 bg-white">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 hover:bg-[#FFF8F0]"
                    style={
                      !activeCategory
                        ? { background: '#8B4513', color: '#fff' }
                        : { color: '#333' }
                    }
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.name)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 hover:bg-[#FFF8F0]"
                      style={
                        activeCategory === cat.name
                          ? { background: '#8B4513', color: '#fff' }
                          : { color: '#333' }
                      }
                    >
                      {cat.name}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm mb-6" style={{ color: '#888' }}>
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
                {activeCategory ? ` in "${activeCategory}"` : ''}
              </p>

              {products.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg" style={{ color: '#888' }}>No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOQ Info Banner */}
      <section className="py-10 px-4" style={{ background: '#FFF8F0' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base" style={{ color: '#555' }}>
            <strong style={{ color: '#8B4513' }}>Minimum Order Quantities (MOQ)</strong> vary by product. Contact us for pricing on smaller sample orders.
          </p>
          <p className="text-sm mt-2" style={{ color: '#888' }}>
            Custom designs, branding, and OEM manufacturing available on request.
          </p>
        </div>
      </section>
    </>
  );
}
