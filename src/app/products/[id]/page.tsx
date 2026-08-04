import { getProduct, getProducts, getSettings } from '@/lib/firestore';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ProductImageGallery from './ProductImageGallery';
import ProductInquiryModal from '@/components/ProductInquiryModal';
import { CheckCircle, Package, Hand, Leaf } from 'lucide-react';
import type { Metadata } from 'next';
import type { Product, SiteSettings } from '@/types';

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let id = '';
  try {
    const resolved = await params;
    id = resolved.id;
  } catch {
    return { title: 'Product Not Found' };
  }
  const product = await getProduct(id);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  const desc = `${product.description.slice(0, 140)}. Buy wholesale from India. MOQ: ${product.minOrderQty} pcs. Custom branding available. Ships to 30+ countries.`;
  const image = product.images?.[0];
  return {
    title: `${product.name} — Wholesale from India | MOQ ${product.minOrderQty} pcs`,
    description: desc,
    keywords: [
      `${product.name.toLowerCase()} wholesale`,
      `${product.name.toLowerCase()} bulk order india`,
      `${product.category.toLowerCase()} exporter india`,
      'handmade indian handicraft wholesale',
      'buy wholesale from india',
    ],
    alternates: { canonical: `/products/${id}` },
    openGraph: {
      title: `${product.name} — Indian Handicraft Wholesale`,
      description: desc,
      url: `/products/${id}`,
      type: 'website',
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Indian Handicraft Wholesale`,
      description: desc,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  let id = '';
  try {
    const resolved = await params;
    id = resolved.id;
  } catch {
    id = '';
  }

  let product: Product | null = null;
  let relatedProducts: Product[] = [];

  try {
    if (id) {
      product = await getProduct(id);
      if (product) {
        const all = await getProducts(product.category);
        relatedProducts = all.filter((p) => p.id !== product!.id).slice(0, 4);
      }
    }
  } catch {
    product = null;
    relatedProducts = [];
  }

  const settings = await getSettings().catch(() => ({} as SiteSettings));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '80px' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#1C1C1C' }}>Product Not Found</h1>
          <p className="mb-6" style={{ color: '#888' }}>The product you are looking for does not exist.</p>
          <Link href="/products" className="btn-primary px-8 py-3">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [`https://picsum.photos/seed/${product.id}/800/600`];

  const waNumber = (settings.whatsapp || '').replace(/\D/g, '');
  const waMessage = encodeURIComponent(`Hello! I am interested in ${product.name}. Please share pricing and availability.`);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images,
    brand: { '@type': 'Brand', name: 'Vidhiraj Global Impex' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Vidhiraj Global Impex',
      url: 'https://vidhirajglobalimpex.com',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Contact for wholesale pricing',
      },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: product.minOrderQty,
        unitText: 'pieces',
      },
      seller: { '@type': 'Organization', name: 'Vidhiraj Global Impex' },
    },
    ...(product.tags && product.tags.length > 0 && { keywords: product.tags.join(', ') }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div style={{ paddingTop: '80px' }}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm" style={{ color: '#888' }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:underline">Products</Link>
            <span className="mx-2">/</span>
            <span style={{ color: '#8B4513' }}>{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <section className="py-8 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductImageGallery images={images} productName={product.name} />

              <div>
                <span
                  className="inline-block text-xs font-semibold px-2 py-1 rounded mb-3"
                  style={{ background: '#D4AF37', color: '#1C1C1C' }}
                >
                  {product.category}
                </span>
                <h1
                  className="text-3xl font-bold mb-4"
                  style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                >
                  {product.name}
                </h1>
                <p className="text-base leading-relaxed mb-6" style={{ color: '#555' }}>
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg p-4" style={{ background: '#FFF8F0' }}>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>
                      Min Order Qty
                    </div>
                    <div className="text-xl font-bold" style={{ color: '#8B4513' }}>
                      {product.minOrderQty} pcs
                    </div>
                  </div>
                  {product.price && (
                    <div className="rounded-lg p-4" style={{ background: '#FFF8F0' }}>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>
                        Price Range
                      </div>
                      <div className="text-xl font-bold" style={{ color: '#8B4513' }}>
                        {product.price}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(101,120,72,0.12)', color: '#7a9848', border: '1px solid rgba(101,120,72,0.28)' }}>
                    <Hand size={12} />
                    100% Handmade
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(101,120,72,0.12)', color: '#7a9848', border: '1px solid rgba(101,120,72,0.28)' }}>
                    <Leaf size={12} />
                    Eco-Friendly
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {[
                    'Handcrafted by skilled Indian artisans',
                    'Eco-friendly materials & sustainable practices',
                    'Export-quality packaging included',
                    'Custom colors & designs available',
                    'Sample orders accepted',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle size={16} color="#D4AF37" />
                      <span className="text-sm" style={{ color: '#555' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <ProductInquiryModal
                    productId={product.id}
                    productName={product.name}
                    settings={settings}
                  />
                  <a
                    href={`https://wa.me/${waNumber || '9182888 40802'}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded font-semibold text-white transition-colors flex items-center justify-center gap-2"
                    style={{ background: '#25D366' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                      <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
                    </svg>
                    WhatsApp Inquiry
                  </a>
                </div>

                <div
                  className="flex items-center gap-3 rounded-lg p-4"
                  style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
                >
                  <Package size={20} color="#8B4513" />
                  <p className="text-xs" style={{ color: '#666' }}>
                    Worldwide shipping available. Export documentation &amp; customs assistance provided.
                  </p>
                </div>
              </div>
            </div>

            {Object.keys(product.specifications || {}).length > 0 && (
              <div className="mt-14">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                  Specifications
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], i) => (
                        <tr key={key} style={{ background: i % 2 === 0 ? '#FFF8F0' : '#fff' }}>
                          <td className="px-4 py-3 font-semibold w-1/3 border-b" style={{ borderColor: '#f0e0cc', color: '#8B4513' }}>
                            {key}
                          </td>
                          <td className="px-4 py-3 border-b" style={{ borderColor: '#f0e0cc', color: '#555' }}>
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {product.tags && product.tags.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1C1C' }}>Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: '#FFF8F0', color: '#8B4513', border: '1px solid #f0e0cc' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="py-12 px-4" style={{ background: '#FFF8F0' }}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
