'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import type { Category } from '@/types';

const staticLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/export-services', label: 'Export Services' },
  { href: '/why-choose-us', label: 'Why Choose Us' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

interface Props {
  categories?: Category[];
}

export default function Navbar({ categories = [] }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsHover, setProductsHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyle = { color: '#1C1C1C', fontFamily: 'Georgia, serif' };

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 shadow-sm'
        }`}
      style={{ top: '32px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start flex-shrink-0">
            <Image
              src="/vidhiraj-logo.png"
              alt="Vidhiraj Global Impex"
              width={260}
              height={128}
              style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
              priority
            />
            <span
              className="italic"
              style={{ fontSize: '9px', color: '#8B4513', fontFamily: 'Georgia, serif', letterSpacing: '0.04em', marginTop: '2px' }}
            >
              A Venture of Vidhiraj Group of Companies
            </span>
          </Link>
          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {staticLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded transition-colors"
                style={linkStyle}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#8B4513')}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#1C1C1C')}
              >
                {link.label}
              </Link>
            ))}

            {/* Products with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsHover(true)}
              onMouseLeave={() => setProductsHover(false)}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors"
                style={productsHover ? { ...linkStyle, color: '#8B4513' } : linkStyle}
              >
                Products
                {categories.length > 0 && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${productsHover ? 'rotate-180' : ''}`}
                  />
                )}
              </Link>

              {productsHover && categories.length > 0 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50" style={{ minWidth: '200px' }}>
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm transition-colors hover:bg-orange-50"
                      style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#8B4513')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#1C1C1C')}
                    >
                      All Products
                    </Link>
                    <div className="border-t border-gray-50 my-1" />
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="block px-4 py-2 text-sm transition-colors hover:bg-orange-50"
                        style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#8B4513')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#1C1C1C')}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {staticLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded transition-colors"
                style={linkStyle}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#8B4513')}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#1C1C1C')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/inquiry"
              className="hidden sm:block btn-gold text-sm py-2 px-5"
              style={{ borderRadius: 4 }}
            >
              Get Quote
            </Link>
            <button
              className="lg:hidden p-2 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={22} color="#8B4513" />
              ) : (
                <Menu size={22} color="#8B4513" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {staticLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded text-sm font-medium"
                style={linkStyle}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Products expandable */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2 rounded text-sm font-medium"
                style={linkStyle}
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              >
                <span>Products</span>
                {categories.length > 0 && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                    color="#8B4513"
                  />
                )}
              </button>
              {mobileProductsOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 pl-3" style={{ borderColor: '#f0e0cc' }}>
                  <Link
                    href="/products"
                    className="block px-2 py-1.5 rounded text-sm"
                    style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}
                    onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); }}
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      className="block px-2 py-1.5 rounded text-sm"
                      style={{ color: '#555', fontFamily: 'Georgia, serif' }}
                      onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {staticLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded text-sm font-medium"
                style={linkStyle}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2">
              <Link
                href="/inquiry"
                className="btn-gold block text-center text-sm py-2"
                onClick={() => setMobileOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
