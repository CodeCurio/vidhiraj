'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import type { Product, Category } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  allProducts?: Product[]; // Kept for compatibility if passed
  categories: Category[];
}

export default function ProductsShowcase({ categories = [] }: Props) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Filter out coconut if any lingering data is passed
  const displayCategories = categories.filter(c => !c.name.toLowerCase().includes('coconut'));

  // Calculate dynamic transform based on number of items to ensure we can scroll to the end exactly
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]); 

  // Category to image mapping
  const categoryImages: Record<string, string> = {
    'Wooden Handicraft': '/images/wooden-category.avif',
    'Brass Handicraft': '/images/brass-category.avif',
    'Gifting & Hampers': '/images/custom-category.avif',
    'Custom OEM Orders': '/images/custom-category.avif',
  };

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#FFF8F0]">
      <div className="sticky top-0 h-[100vh] pt-24 pb-12 flex flex-col justify-center overflow-hidden">
        
        {/* Subtle Background pattern */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 0.75px, transparent 0.75px)',
            backgroundSize: '24px 24px',
          }}
        />
        
        <div className="relative z-10 px-6 md:px-16 mb-8 max-w-[1400px] w-full">
           <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            <Sparkles size={14} color="#8B4513" />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8B4513' }}>
              Wholesale Product Catalogue
            </span>
          </div>

           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
             Explore Our Categories
           </h2>
           <p className="text-gray-600 mt-3 max-w-2xl text-base md:text-lg">
             Scroll down to explore our exclusive handcrafted collections. Each piece tells a story of traditional Indian craftsmanship.
           </p>
        </div>

        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-6 md:px-16 z-10 w-[max-content] pb-8">
           {displayCategories.map((cat) => (
             <Link 
               key={cat.id} 
               href={`/products?category=${encodeURIComponent(cat.name)}`}
               className="relative group flex-shrink-0 w-[80vw] sm:w-[380px] md:w-[420px] h-[55vh] min-h-[350px] max-h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-transparent hover:border-[#D4AF37]/50 transition-all duration-500"
             >
               <img 
                 src={categoryImages[cat.name] || '/images/wooden-category.avif'} 
                 alt={cat.name}
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
               
               <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                 <p className="text-[#D4AF37] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2">Collection</p>
                 <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 font-serif leading-tight">{cat.name}</h3>
                 <div className="flex items-center text-white/90 gap-2 font-medium text-sm md:text-base group-hover:text-[#D4AF37] transition-colors">
                   <span>Explore Range</span>
                   <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                 </div>
               </div>
             </Link>
           ))}
           
           {/* View all card */}
           <Link 
               href="/products"
               className="relative group flex-shrink-0 w-[80vw] sm:w-[380px] md:w-[420px] h-[55vh] min-h-[350px] max-h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-[#D4AF37]/20 bg-[#141414] flex items-center justify-center transition-all duration-700 hover:border-[#D4AF37]/60"
             >
               {/* Ambient Glow */}
               <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-80" style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.3) 0%, transparent 60%)',
                }}></div>
                
               <div className="relative z-10 flex flex-col items-center p-8 text-center">
                 <div className="w-20 h-20 rounded-full border border-[#D4AF37]/30 bg-black/50 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                    <ArrowRight size={32} className="text-[#D4AF37] group-hover:text-black transition-colors duration-500" />
                 </div>
                 <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 font-serif tracking-wide group-hover:scale-105 transition-transform duration-500">View Entire</h3>
                 <h3 className="text-[#D4AF37] text-3xl md:text-4xl font-bold font-serif italic group-hover:scale-105 transition-transform duration-500">Catalogue</h3>
                 <p className="text-gray-400 mt-4 text-sm max-w-[250px] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                   Discover our complete range of handcrafted masterpieces
                 </p>
               </div>
             </Link>
        </motion.div>
      </div>
    </section>
  );
}
