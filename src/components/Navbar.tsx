'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import type { Category } from '@/types';

interface Props {
  categories?: Category[];
}

export default function Navbar({ categories = [] }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  
  // Desktop hover states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aboutLinks = [
    { label: 'ABOUT US', href: '/about' },
    { label: 'WHY US', href: '/why-choose-us' },
    { label: 'WORKSHOP', href: '/gallery' },
    { label: 'DEALERSHIP', href: '/contact' },
    { label: 'CSR ACTIVITIES', href: '/about' },
    { label: 'TESTIMONIALS', href: '/#reviews' },
    { label: 'CERTIFICATES', href: '/about' },
  ];

  const mainLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT', hasDropdown: true, dropdownKey: 'about' },
    { href: '/products', label: 'COLLECTION', hasDropdown: true, dropdownKey: 'collection' },
    { href: '/export-services', label: 'EXPORT' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/blog', label: 'BLOGS' },
    { href: '/contact', label: 'CONTACT' },
  ];

  const displayCategories = categories.filter(c => !c.name.toLowerCase().includes('coconut'));

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
        }`}
      style={{ top: '32px' }}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start flex-shrink-0 z-50 relative">
            <Image
              src="/vidhiraj-logo.png"
              alt="Vidhiraj Global Impex"
              width={260}
              height={128}
              style={{ objectFit: 'contain', height: '54px', width: 'auto' }}
              priority
            />
            <span
              className="italic"
              style={{ fontSize: '10px', color: '#8B4513', fontFamily: 'Georgia, serif', letterSpacing: '0.04em', marginTop: '2px' }}
            >
              A Venture of Vidhiraj Group of Companies
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            {mainLinks.map((link) => (
              <div 
                key={link.label}
                className="h-full flex items-center relative"
                onMouseEnter={() => link.hasDropdown ? setActiveDropdown(link.dropdownKey!) : setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="text-[13px] tracking-widest font-semibold uppercase transition-colors flex items-center gap-1.5 group py-8"
                  style={{ color: activeDropdown === link.dropdownKey ? '#D4AF37' : '#333' }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.dropdownKey ? 'rotate-180 text-[#D4AF37]' : 'text-gray-400'}`} />
                  )}
                </Link>
                
                {/* Active Indicator Line */}
                <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#D4AF37] transition-transform duration-300 origin-left ${activeDropdown === link.dropdownKey ? 'scale-x-100' : 'scale-x-0'}`}></div>

                {/* About small dropdown - positioned under the ABOUT link */}
                {link.dropdownKey === 'about' && activeDropdown === 'about' && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animation-fade-in"
                    onMouseEnter={() => setActiveDropdown('about')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="bg-white rounded-xl shadow-2xl border border-[#D4AF37]/15 py-5 px-6 w-[220px]">
                      <ul className="space-y-3">
                        {aboutLinks.map(aLink => (
                          <li key={aLink.label}>
                            <Link 
                              href={aLink.href} 
                              className="text-gray-700 text-[13px] font-semibold tracking-wider hover:text-[#8B4513] transition-colors block"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {aLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4 z-50 relative">
             <div className="hidden lg:flex flex-col gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
               <div className="w-8 h-[2px] bg-gray-800"></div>
               <div className="w-6 h-[2px] bg-gray-800"></div>
             </div>
            
            <button
              className="lg:hidden p-2 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={26} color="#8B4513" />
              ) : (
                <Menu size={26} color="#8B4513" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown — Collection only */}
      <div 
        className={`hidden lg:block absolute top-[100%] left-0 w-full bg-[#FFF8F0] shadow-2xl border-t border-[#D4AF37]/20 overflow-hidden transition-all duration-500 origin-top ${
          activeDropdown === 'collection' ? 'opacity-100 max-h-[600px] visible' : 'opacity-0 max-h-0 invisible'
        }`}
        onMouseEnter={() => activeDropdown === 'collection' && setActiveDropdown('collection')}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">

            {/* COLLECTION DROPDOWN */}
            {activeDropdown === 'collection' && (
               <div className="flex animation-fade-in">
                  <div className="w-1/3 border-r border-[#D4AF37]/20 pr-10">
                     <h3 className="text-sm font-bold tracking-widest text-[#D4AF37] mb-6 uppercase">Our Collections</h3>
                     <ul className="space-y-4">
                        <li>
                           <Link 
                             href="/products" 
                             className="text-gray-800 text-sm font-semibold tracking-wide hover:text-[#8B4513] transition-colors flex items-center group uppercase"
                             onClick={() => setActiveDropdown(null)}
                           >
                              <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-[#D4AF37] opacity-0 group-hover:opacity-100">- </span>
                              ALL COLLECTIONS
                           </Link>
                        </li>
                        {displayCategories.map(cat => (
                           <li key={cat.id}>
                              <Link 
                                href={`/products?category=${encodeURIComponent(cat.name)}`} 
                                className="text-gray-800 text-sm font-semibold tracking-wide hover:text-[#8B4513] transition-colors flex items-center group uppercase"
                                onClick={() => setActiveDropdown(null)}
                              >
                                 <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-[#D4AF37] opacity-0 group-hover:opacity-100">- </span>
                                 {cat.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="w-2/3 pl-10 flex gap-8 h-[350px]">
                      <Link href="/products?category=Wooden%20Handicraft" className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer block" onClick={() => setActiveDropdown(null)}>
                         <img src="/images/wooden-category.avif" alt="Wooden Handicraft" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                         <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                            <h4 className="text-white text-xl font-bold uppercase tracking-wide">Wooden<br/>Collection</h4>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                               <ArrowRight size={18} className="text-white" />
                            </div>
                         </div>
                      </Link>
                      <Link href="/products?category=Brass%20Handicraft" className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer block" onClick={() => setActiveDropdown(null)}>
                         <img src="/images/brass-category.avif" alt="Brass Handicraft" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                         <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                            <h4 className="text-white text-xl font-bold uppercase tracking-wide">Brass<br/>Collection</h4>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                               <ArrowRight size={18} className="text-white" />
                            </div>
                         </div>
                      </Link>
                  </div>
               </div>
            )}

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FFF8F0] border-t border-[#D4AF37]/20 shadow-2xl h-screen overflow-y-auto pb-32">
          <div className="px-6 py-6 space-y-2">
            {mainLinks.map((link) => (
               <div key={link.label} className="border-b border-[#D4AF37]/10">
                  {link.hasDropdown ? (
                     <div>
                        <button
                          className="w-full flex items-center justify-between py-4 text-[15px] tracking-widest font-bold uppercase text-gray-800"
                          onClick={() => setMobileMenuOpen(mobileMenuOpen === link.dropdownKey ? null : link.dropdownKey)}
                        >
                          <span>{link.label}</span>
                          <ChevronDown size={18} className={`transition-transform duration-300 text-[#D4AF37] ${mobileMenuOpen === link.dropdownKey ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Mobile Submenu */}
                        <div className={`overflow-hidden transition-all duration-300 ${mobileMenuOpen === link.dropdownKey ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                           <ul className="space-y-3 pl-4 border-l-2 border-[#D4AF37]/30 ml-2">
                              {link.dropdownKey === 'about' && aboutLinks.map(subLink => (
                                 <li key={subLink.label}>
                                    <Link 
                                       href={subLink.href}
                                       className="block text-gray-600 text-sm font-semibold tracking-wider hover:text-[#8B4513]"
                                       onClick={() => setMobileOpen(false)}
                                    >
                                       {subLink.label}
                                    </Link>
                                 </li>
                              ))}
                              {link.dropdownKey === 'collection' && (
                                 <>
                                   <li>
                                      <Link 
                                         href="/products"
                                         className="block text-[#D4AF37] text-sm font-bold tracking-wider"
                                         onClick={() => setMobileOpen(false)}
                                      >
                                         ALL COLLECTIONS
                                      </Link>
                                   </li>
                                   {displayCategories.map(cat => (
                                      <li key={cat.id}>
                                         <Link 
                                            href={`/products?category=${encodeURIComponent(cat.name)}`}
                                            className="block text-gray-600 text-sm font-semibold tracking-wider hover:text-[#8B4513] uppercase"
                                            onClick={() => setMobileOpen(false)}
                                         >
                                            {cat.name}
                                         </Link>
                                      </li>
                                   ))}
                                 </>
                              )}
                           </ul>
                        </div>
                     </div>
                  ) : (
                     <Link
                       href={link.href}
                       className="block py-4 text-[15px] tracking-widest font-bold uppercase text-gray-800"
                       onClick={() => setMobileOpen(false)}
                     >
                       {link.label}
                     </Link>
                  )}
               </div>
            ))}

            <div className="pt-8">
              <Link
                href="/inquiry"
                className="btn-gold block text-center text-sm py-4 uppercase tracking-widest font-bold rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .animation-fade-in {
           animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
           from { opacity: 0; transform: translateY(-10px); }
           to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </header>
  );
}
