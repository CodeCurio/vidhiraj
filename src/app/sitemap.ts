import type { MetadataRoute } from 'next';
import { getProducts, getBlogs } from '@/lib/firestore';
import { getAllCountrySlugs } from '@/lib/countries';

const BASE = 'https://vidhirajglobalimpex.com';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE,                             changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/products`,               changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE}/export-services`,        changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/inquiry`,                changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/about`,                  changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/contact`,                changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/blog`,                   changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE}/faq`,                    changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE}/countries`,              changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/why-choose-us`,          changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/gallery`,                changeFrequency: 'weekly',  priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogs] = await Promise.all([
    getProducts().catch(() => []),
    getBlogs().catch(() => []),
  ]);

  const countryRoutes: MetadataRoute.Sitemap = getAllCountrySlugs().map((slug) => ({
    url: `${BASE}/countries/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${p.id}`,
    lastModified: p.createdAt,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${BASE}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [...staticRoutes, ...countryRoutes, ...productRoutes, ...blogRoutes];
}
