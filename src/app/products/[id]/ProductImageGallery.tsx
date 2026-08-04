'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div>
        {/* Main Image */}
        <div
          className="relative w-full rounded-xl overflow-hidden mb-3 cursor-zoom-in"
          style={{ paddingTop: '75%', background: '#fff' }}
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={images[activeIndex]}
            alt={productName}
            fill
            style={{ objectFit: 'contain', padding: '8px' }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="relative rounded-lg overflow-hidden flex-shrink-0 transition-all"
                style={{
                  width: 72,
                  height: 72,
                  background: '#fff',
                  border: idx === activeIndex ? '2px solid #8B4513' : '2px solid transparent',
                  opacity: idx === activeIndex ? 1 : 0.65,
                }}
              >
                <Image
                  src={img}
                  alt={`${productName} view ${idx + 1}`}
                  fill
                  style={{ objectFit: 'contain', padding: '3px' }}
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 z-50 p-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onClick={() => setLightboxOpen(false)}
          >
            <X size={24} color="white" />
          </button>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 p-2 rounded-full z-50"
                style={{ background: 'rgba(255,255,255,0.15)', top: '50%', transform: 'translateY(-50%)' }}
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft size={28} color="white" />
              </button>
              <button
                className="absolute right-4 p-2 rounded-full z-50"
                style={{ background: 'rgba(255,255,255,0.15)', top: '50%', transform: 'translateY(-50%)' }}
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight size={28} color="white" />
              </button>
            </>
          )}
          <div
            className="relative"
            style={{ width: '90vw', maxWidth: 900, maxHeight: '80vh', aspectRatio: '4/3' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={productName}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
