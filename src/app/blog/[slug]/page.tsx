import { getBlogBySlug, getBlogs } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Not Found' };

  const title = blog.seoTitle || blog.title;
  const description = blog.seoDescription || blog.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      authors: blog.author ? [blog.author] : ['Vidhiraj Global Impex'],
      images: blog.coverImage ? [{ url: blog.coverImage, alt: blog.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const contentHtml = await marked.parse(blog.content);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: blog.author || 'Vidhiraj Global Impex',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vidhiraj Global Impex',
      logo: { '@type': 'ImageObject', url: 'https://vidhirajglobalimpex.com/vidhiraj-logo.png' },
    },
    mainEntityOfPage: `https://vidhirajglobalimpex.com/blog/${blog.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div style={{ paddingTop: '80px' }}>
        {/* Cover image */}
        {blog.coverImage && (
          <div className="relative w-full" style={{ height: '400px' }}>
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(28,28,28,0.7))' }} />
          </div>
        )}

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8" style={{ color: '#888' }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span className="mx-2">/</span>
            <span style={{ color: '#8B4513' }}>{blog.title}</span>
          </nav>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: '#FFF8F0', color: '#8B4513', border: '1px solid #f0e0cc' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
          >
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b" style={{ borderColor: '#f0e0cc', color: '#999' }}>
            <span className="text-sm">By {blog.author || 'Vidhiraj Team'}</span>
            <span className="text-sm">
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Footer CTA */}
          <div
            className="mt-12 p-6 rounded-xl text-center"
            style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
          >
            <h3 className="text-lg font-bold mb-2" style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}>
              Interested in our products?
            </h3>
            <p className="text-sm mb-4" style={{ color: '#666' }}>
              Browse our full range of handcrafted handicrafts available for wholesale export.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded font-semibold text-white text-sm"
              style={{ background: '#8B4513' }}
            >
              Browse Products
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
