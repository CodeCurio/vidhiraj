import GalleryClient from './GalleryClient';
import { getGalleryImages } from '@/lib/firestore';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Product Gallery — Handcrafted Wooden, Brass & Coconut Handicrafts from India',
  description: 'Browse our gallery of 200+ handcrafted wooden artifacts, brass figurines, and coconut shell decor from India. See the quality before placing your wholesale order.',
  keywords: [
    'indian handicraft gallery',
    'wooden artifact photos india',
    'brass figurines images wholesale',
    'handmade indian products gallery',
  ],
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Product Gallery — Indian Handicrafts Wholesale',
    description: '200+ handcrafted wooden artifacts, brass figurines & coconut decor. See quality before ordering wholesale.',
    url: '/gallery',
    type: 'website',
  },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://vidhirajglobalimpex.com/gallery' },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GalleryClient images={images} />
    </>
  );
}
