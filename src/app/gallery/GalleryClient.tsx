'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { GalleryImage } from '@/types';

interface Props {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: Props) {
  const categories = ['All', ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imgFading, setImgFading] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory);

  const getCategoryCount = (cat: string) =>
    cat === 'All' ? images.length : images.filter((img) => img.category === cat).length;

  const openLightbox = (idx: number) => setLightboxIndex(idx);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      setImgFading(true);
      setTimeout(() => {
        setLightboxIndex((prev) => {
          if (prev === null) return null;
          return (prev + dir + filtered.length) % filtered.length;
        });
        setImgFading(false);
      }, 150);
    },
    [lightboxIndex, filtered.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, navigate]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      lightboxRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{
          background: 'linear-gradient(135deg, #2a1004 0%, #6B3410 55%, #8B4513 100%)',
          paddingTop: 140,
          paddingBottom: 72,
        }}
      >
        <div
          className="absolute top-0 right-0 rounded-full opacity-10 pointer-events-none"
          style={{ width: 480, height: 480, background: '#D4AF37', transform: 'translate(35%, -35%)' }}
        />
        <div
          className="absolute bottom-0 left-0 rounded-full opacity-8 pointer-events-none"
          style={{ width: 300, height: 300, background: '#D4AF37', transform: 'translate(-40%, 40%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#D4AF37' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#D4AF37' }}>
              Our Work
            </span>
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-5"
            style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}
          >
            Product Gallery
          </h1>
          <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#e0c8b0' }}>
            A glimpse of the handcrafted excellence that leaves our workshop every day.
          </p>
          {images.length > 0 && (
            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
                  {images.length}+
                </div>
                <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: '#b89070' }}>Images</div>
              </div>
              <div className="w-px h-10" style={{ background: 'rgba(212,175,55,0.3)' }} />
              <div>
                <div className="text-3xl font-bold" style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>
                  {categories.length - 1}
                </div>
                <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: '#b89070' }}>Categories</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gallery body */}
      <section className="min-h-screen" style={{ background: '#F9F7F4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length === 0 ? (
            <div className="text-center py-28">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{ background: '#F0E8DF' }}
              >
                <ZoomIn size={24} style={{ color: '#8B4513' }} />
              </div>
              <p className="font-semibold text-lg" style={{ color: '#555' }}>Gallery coming soon</p>
              <p className="text-sm mt-1" style={{ color: '#aaa' }}>Check back shortly.</p>
            </div>
          ) : (
            <>
              {/* Sticky filter bar */}
              <div
                className="sticky top-0 z-20 py-5"
                style={{ background: 'rgba(249,247,244,0.96)', backdropFilter: 'blur(10px)' }}
              >
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((cat) => {
                    const active = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                        style={
                          active
                            ? {
                                background: '#8B4513',
                                color: '#fff',
                                boxShadow: '0 4px 12px rgba(139,69,19,0.3)',
                                transform: 'translateY(-1px)',
                              }
                            : {
                                background: '#fff',
                                color: '#555',
                                border: '1px solid #E8DED4',
                              }
                        }
                      >
                        {cat}
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                          style={
                            active
                              ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                              : { background: '#F0E8DF', color: '#8B4513' }
                          }
                        >
                          {getCategoryCount(cat)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-center text-xs mt-3" style={{ color: '#b0a898' }}>
                  {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
                  {activeCategory !== 'All' && (
                    <span>
                      {' '}in <span style={{ color: '#8B4513', fontWeight: 600 }}>{activeCategory}</span>
                    </span>
                  )}
                </p>
              </div>

              {/* Masonry grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 pb-16">
                {filtered.map((img, idx) => (
                  <div
                    key={img.id}
                    className="break-inside-avoid mb-4 cursor-zoom-in relative overflow-hidden group"
                    style={{
                      borderRadius: 14,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                    onClick={() => openLightbox(idx)}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-end pb-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(to top, rgba(28,10,2,0.92) 0%, rgba(100,45,10,0.5) 55%, transparent 100%)',
                      }}
                    >
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center mb-2"
                        style={{ background: 'rgba(212,175,55,0.15)', border: '1.5px solid rgba(212,175,55,0.6)' }}
                      >
                        <ZoomIn size={18} style={{ color: '#D4AF37' }} />
                      </div>
                      <p className="text-white text-xs font-semibold text-center px-4 leading-snug truncate w-full text-center">
                        {img.alt}
                      </p>
                      {img.category && (
                        <span
                          className="mt-1.5 text-xs px-3 py-1 rounded-full font-semibold"
                          style={{ background: '#D4AF37', color: '#2a1004' }}
                        >
                          {img.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          className="lightbox-overlay"
          onClick={closeLightbox}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          style={{ backdropFilter: 'blur(6px)' }}
        >
          {/* Counter pill */}
          <div className="absolute top-5 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(0,0,0,0.55)',
                color: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {lightboxIndex + 1} / {filtered.length}
            </span>
          </div>

          {/* Close */}
          <button
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={18} color="white" />
          </button>

          {/* Prev */}
          <button
            className="absolute z-50 w-11 h-11 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
            style={{
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Previous"
          >
            <ChevronLeft size={22} color="white" />
          </button>

          {/* Next */}
          <button
            className="absolute z-50 w-11 h-11 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
            style={{
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Next"
          >
            <ChevronRight size={22} color="white" />
          </button>

          {/* Image */}
          <div
            className="relative z-10"
            style={{
              width: '88vw',
              maxWidth: 960,
              transition: 'opacity 0.15s ease',
              opacity: imgFading ? 0.4 : 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].url}
              alt={filtered[lightboxIndex].alt}
              width={960}
              height={720}
              className="w-full h-auto rounded-xl"
              style={{ maxHeight: '78vh', objectFit: 'contain' }}
              sizes="90vw"
              unoptimized
            />
          </div>

          {/* Caption */}
          <div
            className="absolute bottom-10 left-0 right-0 flex justify-center px-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl max-w-sm"
              style={{
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {filtered[lightboxIndex].category && (
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-bold shrink-0"
                  style={{ background: '#D4AF37', color: '#2a1004' }}
                >
                  {filtered[lightboxIndex].category}
                </span>
              )}
              <span className="text-sm font-medium truncate" style={{ color: '#FFF8F0' }}>
                {filtered[lightboxIndex].alt}
              </span>
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              ← → navigate · Esc close
            </span>
          </div>
        </div>
      )}
    </>
  );
}
