'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail, Sparkles } from 'lucide-react';
import type { Category } from '@/types';

interface Props {
  categories?: Category[];
}

const ALL_8_CATEGORIES: Category[] = [
  { id: 'copper-handicraft', name: 'Copper Handicraft', slug: 'copper-handicraft', image: '/categories/copper-handicraft.jpg' },
  { id: 'macrame-bags', name: 'Macrame Bags', slug: 'macrame-bags', image: '/categories/macrame-bags.jpg' },
  { id: 'macrame-cushion', name: 'Macrame Cushion', slug: 'macrame-cushion', image: '/categories/macrame-cushion.jpg' },
  { id: 'macrame-wall-hanging', name: 'Macrame Wall Hanging', slug: 'macrame-wall-hanging', image: '/categories/macrame-wall-hanging.jpg' },
  { id: 'wooden-puzzles', name: 'Wooden Puzzles', slug: 'wooden-puzzles', image: '/categories/wooden-puzzles.jpg' },
  { id: 'wooden-toys', name: 'Wooden Toys', slug: 'wooden-toys', image: '/categories/wooden-toys.jpg' },
  { id: 'home-decor', name: 'Home Decor', slug: 'home-decor', image: '/categories/home-decor.jpg' },
  { id: 'kitchenware', name: 'Kitchenware', slug: 'kitchenware', image: '/categories/kitchenware.jpg' },
];

const CATEGORY_IMAGES: Record<string, string> = {
  'Copper Handicraft': '/categories/copper-handicraft.jpg',
  'Macrame Bags': '/categories/macrame-bags.jpg',
  'Macrame Cushion': '/categories/macrame-cushion.jpg',
  'Macrame Wall Hanging': '/categories/macrame-wall-hanging.jpg',
  'Wooden Puzzles': '/categories/wooden-puzzles.jpg',
  'Wooden Toys': '/categories/wooden-toys.jpg',
  'Wooden toys': '/categories/wooden-toys.jpg',
  'Home Decor': '/categories/home-decor.jpg',
  'Kitchenware': '/categories/kitchenware.jpg',
};

export default function Navbar({ categories = [] }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  
  // Desktop hover states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Active category item being hovered in Collection dropdown
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  // Scroll listener for sticky shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const aboutLinks = [
    { label: 'ABOUT US', href: '/about' },
    { label: 'WHY US', href: '/why-choose-us' },
    { label: 'WORKSHOP', href: '/gallery' },
    { label: 'EXPORT SERVICES', href: '/export-services' },
    { label: 'FAQ', href: '/faq' },
    { label: 'TESTIMONIALS', href: '/#reviews' },
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

  const displayCategories = (() => {
    if (!categories || categories.length === 0) return ALL_8_CATEGORIES;
    const existingNames = new Set(categories.map((c) => c.name.toLowerCase().trim()));
    const missing = ALL_8_CATEGORIES.filter((c) => !existingNames.has(c.name.toLowerCase().trim()));
    return [...categories.filter((c) => !c.name.toLowerCase().includes('coconut')), ...missing];
  })();

  // Current active preview category in dropdown
  const activePreviewCategory = hoveredCategory || displayCategories[0];

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
      style={{ top: '32px' }}
      onMouseLeave={() => {
        setActiveDropdown(null);
        setHoveredCategory(null);
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo (Subtext removed as requested) */}
          <Link href="/" className="flex items-center flex-shrink-0 z-50 relative">
            <Image
              src="/vidhiraj-logo.png"
              alt="Vidhiraj Global Impex"
              width={240}
              height={100}
              style={{ objectFit: 'contain', height: '52px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            {mainLinks.map((link) => (
              <div 
                key={link.label}
                className="h-full flex items-center relative"
                onMouseEnter={() => link.hasDropdown ? setActiveDropdown(link.dropdownKey!) : setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="text-[13px] tracking-widest font-bold uppercase transition-colors flex items-center gap-1.5 group py-7"
                  style={{ color: activeDropdown === link.dropdownKey ? '#D4AF37' : '#1C1C1C' }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.dropdownKey ? 'rotate-180 text-[#D4AF37]' : 'text-gray-400'}`} />
                  )}
                </Link>
                
                {/* Active Line Indicator */}
                <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#D4AF37] transition-transform duration-300 origin-left ${activeDropdown === link.dropdownKey ? 'scale-x-100' : 'scale-x-0'}`} />

                {/* About Submenu */}
                {link.dropdownKey === 'about' && activeDropdown === 'about' && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animation-fade-in"
                    onMouseEnter={() => setActiveDropdown('about')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="bg-white rounded-xl shadow-2xl border border-[#D4AF37]/20 py-4 px-5 w-[220px]">
                      <ul className="space-y-2.5">
                        {aboutLinks.map(aLink => (
                          <li key={aLink.label}>
                            <Link 
                              href={aLink.href} 
                              className="text-gray-700 text-[12px] font-bold tracking-wider hover:text-[#8B4513] hover:translate-x-1 transition-all block"
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

          {/* Desktop Right Action: Get Quote Button (Replaced old hamburger icon) */}
          <div className="flex items-center gap-4 z-50 relative">
            <Link
              href="/inquiry"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)',
                color: '#1C1C1C',
                boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
              }}
            >
              Get Quote
              <ArrowRight size={14} />
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-[#FFF8F0] border border-[#D4AF37]/30 text-[#8B4513]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* ── MEGA MENU DROPDOWN — COLLECTION (INTERACTIVE HOVER PREVIEW) ── */}
      <div 
        className={`hidden lg:block absolute top-[100%] left-0 w-full bg-[#FFFDF9] shadow-2xl border-t border-[#D4AF37]/25 overflow-hidden transition-all duration-300 origin-top ${
          activeDropdown === 'collection' ? 'opacity-100 max-h-[600px] visible' : 'opacity-0 max-h-0 invisible pointer-events-none'
        }`}
        onMouseEnter={() => activeDropdown === 'collection' && setActiveDropdown('collection')}
        onMouseLeave={() => {
          setActiveDropdown(null);
          setHoveredCategory(null);
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex gap-8 items-stretch">
            
            {/* Left 1/3: Category List */}
            <div className="w-1/3 border-r border-[#D4AF37]/20 pr-8">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D4AF37]/20">
                <h3 className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
                  <Sparkles size={13} />
                  Product Categories
                </h3>
                <span className="text-[11px] text-stone-500 font-medium">8 Handcrafted Lines</span>
              </div>

              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/products" 
                    onMouseEnter={() => setHoveredCategory(null)}
                    className={`text-xs font-bold tracking-wider px-3 py-2 rounded-lg transition-all flex items-center justify-between uppercase ${
                      !hoveredCategory
                        ? 'bg-[#8B4513] text-white shadow-sm'
                        : 'text-stone-800 hover:bg-[#FFF8F0] hover:text-[#8B4513]'
                    }`}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span>All Collections</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>

                {displayCategories.map(cat => {
                  const isSelected = hoveredCategory?.id === cat.id;
                  return (
                    <li key={cat.id}>
                      <Link 
                        href={`/products?category=${encodeURIComponent(cat.name)}`} 
                        onMouseEnter={() => setHoveredCategory(cat)}
                        className={`text-xs font-bold tracking-wider px-3 py-2.5 rounded-lg transition-all flex items-center justify-between uppercase ${
                          isSelected
                            ? 'bg-[#8B4513] text-white shadow-sm'
                            : 'text-stone-800 hover:bg-[#FFF8F0] hover:text-[#8B4513]'
                        }`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/40'}`} />
                          {cat.name}
                        </span>
                        <ArrowRight size={13} className={`transition-transform ${isSelected ? 'translate-x-1 text-[#D4AF37]' : 'opacity-0'}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right 2/3: Dynamic Interactive Preview Image Card */}
            <div className="w-2/3 pl-2 flex gap-6 h-[380px]">
              
              {/* Main Hovered Category Preview Card */}
              <Link 
                href={`/products?category=${encodeURIComponent(activePreviewCategory.name)}`} 
                className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl border border-[#D4AF37]/30 block"
                onClick={() => setActiveDropdown(null)}
              >
                <img 
                  key={activePreviewCategory.name}
                  src={activePreviewCategory.image || CATEGORY_IMAGES[activePreviewCategory.name] || '/categories/copper-handicraft.jpg'} 
                  alt={activePreviewCategory.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                    Active Preview
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                      100% Export Grade
                    </span>
                    <h4 className="text-white text-2xl font-bold font-serif leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {activePreviewCategory.name}
                    </h4>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37] flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>

              {/* Secondary Featured Preview Card */}
              <Link 
                href="/products" 
                className="w-2/5 relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-[#D4AF37]/20 bg-[#1C1C1C] flex flex-col justify-between p-6 block"
                onClick={() => setActiveDropdown(null)}
              >
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at center, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#D4AF37] bg-white/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    Handicraft Catalog
                  </span>
                  <h4 className="text-white text-xl font-bold font-serif mt-4 leading-snug">
                    Explore All 8 Product Lines
                  </h4>
                  <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                    Direct factory prices with zero agent markups. Custom OEM &amp; luxury export packaging.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                  <span>Browse Catalog</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU DRAWER (100% FULLSCREEN SOLID OVERLAY FIX) ── */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed top-[-32px] left-0 right-0 bottom-0 w-screen h-[100vh] z-[9999] flex flex-col bg-[#FFFDF9]"
          style={{ position: 'fixed', top: '-32px', left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}
        >
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 bg-white flex-shrink-0 pt-10">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/vidhiraj-logo.png"
                alt="Vidhiraj Global Impex"
                width={170}
                height={65}
                style={{ objectFit: 'contain', height: '42px', width: 'auto' }}
              />
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 rounded-full bg-[#FFF8F0] border border-[#D4AF37]/40 flex items-center justify-center text-[#8B4513] shadow-sm"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-[#FFFDF9]">
            {mainLinks.map((link) => (
              <div key={link.label} className="border-b border-[#D4AF37]/15 pb-3">
                {link.hasDropdown ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between py-2 text-sm tracking-widest font-bold uppercase text-stone-900"
                      onClick={() => setMobileMenuOpen(mobileMenuOpen === link.dropdownKey ? null : link.dropdownKey)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={18} className={`transition-transform duration-300 text-[#D4AF37] ${mobileMenuOpen === link.dropdownKey ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Mobile Submenu Accordion */}
                    <div className={`overflow-hidden transition-all duration-300 ${mobileMenuOpen === link.dropdownKey ? 'max-h-[600px] pt-3 pb-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {link.dropdownKey === 'about' && (
                        <div className="grid grid-cols-1 gap-2 pl-3 border-l-2 border-[#D4AF37]/30">
                          {aboutLinks.map(subLink => (
                            <Link 
                              key={subLink.label}
                              href={subLink.href}
                              className="text-stone-700 text-xs font-bold tracking-wider py-1.5 hover:text-[#8B4513]"
                              onClick={() => setMobileOpen(false)}
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {link.dropdownKey === 'collection' && (
                        <div className="space-y-2 pt-1">
                          <Link 
                            href="/products"
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#8B4513] text-white text-xs font-bold tracking-wider uppercase shadow-sm"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span>ALL COLLECTIONS</span>
                            <ArrowRight size={14} />
                          </Link>

                          <div className="grid grid-cols-1 gap-1.5 pt-1">
                            {displayCategories.map(cat => {
                              const catImg = cat.image || CATEGORY_IMAGES[cat.name] || '/categories/copper-handicraft.jpg';
                              return (
                                <Link 
                                  key={cat.id}
                                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                                  className="flex items-center gap-3 p-2 rounded-xl bg-white border border-[#F5E4D2] hover:border-[#D4AF37] transition-all"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <img src={catImg} alt={cat.name} className="w-8 h-8 rounded-lg object-cover border border-[#D4AF37]/20" />
                                  <span className="text-xs font-bold text-stone-800 uppercase flex-1">{cat.name}</span>
                                  <ArrowRight size={13} className="text-[#D4AF37]" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-2 text-sm tracking-widest font-bold uppercase text-stone-900 hover:text-[#8B4513]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Quick Contact Box inside Drawer */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/25 space-y-2 mt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">Direct Export Inquiry</span>
              <a href="tel:+918288840802" className="flex items-center gap-2 text-xs font-bold text-stone-800">
                <Phone size={14} className="text-[#8B4513]" />
                <span>+91 82888 40802</span>
              </a>
              <a href="mailto:export@vidhirajglobal.com" className="flex items-center gap-2 text-xs font-medium text-stone-600">
                <Mail size={14} className="text-[#8B4513]" />
                <span>export@vidhirajglobal.com</span>
              </a>
            </div>
          </div>

          {/* Drawer Bottom CTAs */}
          <div className="p-5 border-t border-[#D4AF37]/20 bg-white flex-shrink-0 space-y-2">
            <Link
              href="/inquiry"
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-center block text-[#1C1C1C] shadow-md"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)' }}
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </Link>

            <a
              href="https://wa.me/918288840802?text=Hello!%20I%20am%20interested%20in%20your%20handicraft%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
              </svg>
              WhatsApp Support
            </a>
          </div>

        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .animation-fade-in {
           animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
           from { opacity: 0; transform: translateY(-8px); }
           to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </header>
  );
}
