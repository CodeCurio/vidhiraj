import Image from 'next/image';
import Link from 'next/link';
import { Hand, Leaf } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : `https://picsum.photos/seed/${product.id}/800/600`;

  return (
    <div
      className="rounded-lg overflow-hidden flex flex-col"
      style={{ background: '#faf6f1', boxShadow: '0 2px 12px rgba(0,0,0,0.10)', border: '1px solid #f0ece6' }}
    >
      {/* Image */}
      <div className="relative w-full" style={{ paddingTop: '75%', background: '#fff' }}>
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          style={{ objectFit: 'contain', padding: '6px' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded"
          style={{ background: '#D4AF37', color: '#1C1C1C' }}
        >
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(101,120,72,0.12)', color: '#7a9848', border: '1px solid rgba(101,120,72,0.28)' }}>
            <Hand className="w-2.5 h-2.5" />
            Handmade
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(101,120,72,0.12)', color: '#7a9848', border: '1px solid rgba(101,120,72,0.28)' }}>
            <Leaf className="w-2.5 h-2.5" />
            Eco-Friendly
          </span>
        </div>
        <h3
          className="text-base font-bold mb-1 line-clamp-2"
          style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
        >
          {product.name}
        </h3>
        <p className="text-sm mb-3 line-clamp-2 flex-1" style={{ color: '#666' }}>
          {product.description}
        </p>

        {/* Details row */}
        <div className="flex items-center justify-between mb-4 text-xs" style={{ color: '#888' }}>
          <span>MOQ: {product.minOrderQty} pcs</span>
          {product.price && (
            <span className="font-semibold" style={{ color: '#8B4513' }}>
              {product.price}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center text-sm py-2 px-3 rounded font-medium border transition-colors"
            style={{ border: '1px solid #8B4513', color: '#8B4513', background: 'transparent' }}
          >
            View Details
          </Link>
          <Link
            href="/inquiry"
            className="flex-1 text-center text-sm py-2 px-3 rounded font-medium transition-colors"
            style={{ background: '#8B4513', color: '#fff' }}
          >
            Inquire
          </Link>
        </div>
      </div>
    </div>
  );
}
