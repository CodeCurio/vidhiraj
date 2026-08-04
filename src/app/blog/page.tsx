import { getBlogs } from '@/lib/firestore';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Handicraft Export Guides, Import Tips & Artisan Insights',
  description: 'Expert guides on importing handicrafts from India, wholesale sourcing tips, export regulations, artisan traditions, and global trade insights for international buyers.',
  keywords: [
    'how to import handicrafts from india',
    'handicraft export guide',
    'wholesale sourcing india tips',
    'indian artisan products blog',
    'handicraft import regulations',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Handicraft Export Guides & Import Tips',
    description: 'Expert guides on importing handicrafts from India, wholesale sourcing tips, and global trade insights.',
    url: '/blog',
    type: 'website',
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <section
        className="relative py-24 flex items-center"
        style={{ background: 'linear-gradient(135deg, #3a1a06 0%, #8B4513 100%)', paddingTop: '120px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Insights & Stories
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5" style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}>
              Our Blog
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              Artisan traditions, export guides, and handicraft industry insights.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: '#888' }}>No blog posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block">
                  <article className="h-full rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    {blog.coverImage ? (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div
                        className="aspect-video flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #FFF8F0, #f5d9bb)' }}
                      >
                        <span className="text-4xl">✍️</span>
                      </div>
                    )}
                    <div className="p-5">
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: '#FFF8F0', color: '#8B4513' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2
                        className="text-lg font-bold mb-2 group-hover:text-[#8B4513] transition-colors line-clamp-2"
                        style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                      >
                        {blog.title}
                      </h2>
                      {blog.excerpt && (
                        <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: '#666' }}>
                          {blog.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs" style={{ color: '#999' }}>
                        <span>{blog.author || 'Vidhiraj Team'}</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
