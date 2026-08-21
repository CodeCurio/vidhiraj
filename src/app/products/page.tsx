import { getProducts, getCategories } from '@/lib/firestore';
import ProductsClient from './ProductsClient';
import type { Metadata } from 'next';
import type { Product, Category } from '@/types';

// Static metadata for the main /products page
export const metadata: Metadata = {
  title: 'Wholesale Indian Handicrafts — 200+ Products, Bulk Orders Welcome',
  description: 'Browse 200+ handcrafted Indian handicrafts for wholesale. wooden artifacts, brass figurines. Low MOQ. Ships to USA, UK, Germany, Australia & 30+ countries.',
  keywords: [
    'wholesale indian handicrafts',
    'buy handicrafts wholesale from india',
    'wooden artifacts wholesale',
    'brass figurines bulk order',
    'handmade indian products bulk',
    'minimum order handicrafts india',
  ],
  // Canonical always points to /products (not parameterized URL)
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Wholesale Indian Handicrafts — 200+ Products',
    description: 'Browse 200+ handcrafted Indian handicrafts. Wooden artifacts, brass figurines. Bulk orders, low MOQ, ships worldwide.',
    url: '/products',
    type: 'website',
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }> | { category?: string };
}) {
  let category: string | undefined = undefined;
  try {
    const resolved = await searchParams;
    category = resolved?.category;
  } catch {
    category = undefined;
  }

  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    products = [];
    categories = [];
  }

  return (
    <>
      {/* When filtering by category, tell search engines not to index this variant.
          The canonical /products page is already indexed. This prevents duplicate
          content and the 'URL: Parameters' issues flagged in the Screaming Frog audit. */}
      {category && (
        <meta name="robots" content="noindex, follow" />
      )}
      <ProductsClient
        products={products}
        categories={categories}
        activeCategory={category || ''}
      />
    </>
  );
}

