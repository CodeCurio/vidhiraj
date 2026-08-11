import { adminDb } from './firebase-admin';
import type { Product, Category, Inquiry, GalleryImage, Blog, SiteSettings } from '@/types';

// Fallback products and categories to ensure the site displays products cleanly on Vercel
// even if Firebase Admin environment variables are not configured in Vercel settings.
const FALLBACK_CATEGORIES: Category[] = [
  { id: 'wood', name: 'Wooden Handicraft', slug: 'wooden-handicraft', showOnHomepage: true },
  { id: 'brass', name: 'Brass Handicraft', slug: 'brass-handicraft', showOnHomepage: true },
  { id: 'gifting', name: 'Gifting & Hampers', slug: 'gifting-hampers', showOnHomepage: true },
];

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'wood-carved-elephant-01',
    name: 'Royal Hand-Carved Wooden Elephant Pair',
    description: 'Masterfully hand-carved solid teak wood elephant pair with intricate floral Jali filigree work. Hand-lacquered finish by master Indian artisans.',
    category: 'Wooden Handicraft',
    images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'],
    minOrderQty: 10,
    price: '$28 - $45 / pc',
    featured: true,
    specifications: { Material: 'Teak Wood', Crafting: 'Hand-carved', Finish: 'Natural Lacquer' },
    tags: ['wooden', 'elephant', 'home decor', 'handicraft'],
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'brass-ganesha-statue-02',
    name: 'Antiqued Pure Brass Ganesha Idol (12")',
    description: 'Heavyweight pure brass Lord Ganesha sculpture with traditional antique patina finish. Ideal for luxury hotel lobbies and spiritual gift stores.',
    category: 'Brass Handicraft',
    images: ['https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80'],
    minOrderQty: 5,
    price: '$45 - $80 / pc',
    featured: true,
    specifications: { Material: 'Solid Brass', Height: '12 Inches', Weight: '3.2 kg' },
    tags: ['brass', 'ganesha', 'idol', 'antique'],
    createdAt: new Date('2026-01-02'),
  },

  {
    id: 'wooden-dry-fruit-box-04',
    name: 'Luxury Brass Inlaid Wooden Dry Fruit Gift Box',
    description: 'Premium Sheesham wood gift box with intricate brass wire inlay work and velvet-lined compartments. Perfect for corporate gifting hampers.',
    category: 'Gifting & Hampers',
    images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'],
    minOrderQty: 25,
    price: '$18 - $32 / pc',
    featured: true,
    specifications: { Material: 'Sheesham Wood & Brass Inlay', Compartments: '4 Removable Trays' },
    tags: ['gift box', 'dry fruit box', 'corporate gift'],
    createdAt: new Date('2026-01-04'),
  },
  {
    id: 'brass-peacock-oil-lamp-05',
    name: 'Traditional Brass Peacock Diya / Oil Lamp',
    description: 'Hand-cast brass traditional peacock oil lamp with engraved base. Vintage golden luster coating for festive and heritage decor stores.',
    category: 'Brass Handicraft',
    images: ['https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80'],
    minOrderQty: 15,
    price: '$15 - $28 / pc',
    featured: true,
    specifications: { Material: 'Cast Brass', Finish: 'High Polish Gold', Height: '10 Inches' },
    tags: ['brass diya', 'peacock lamp', 'diwali decor'],
    createdAt: new Date('2026-01-05'),
  },
  {
    id: 'wooden-spice-box-06',
    name: 'Traditional 9-Grid Wooden Masala Dabba',
    description: 'Handmade Rosewood spice box with glass window lid and brass latch. Includes 9 individual wooden spice containers.',
    category: 'Wooden Handicraft',
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'],
    minOrderQty: 20,
    price: '$14 - $24 / pc',
    featured: true,
    specifications: { Material: 'Indian Rosewood', Grids: '9 Containers + Brass Latch' },
    tags: ['spice box', 'kitchenware', 'rosewood'],
    createdAt: new Date('2026-01-06'),
  },

  {
    id: 'brass-bronze-buddha-head-08',
    name: 'Serene Brass Buddha Head Table Top Artifact',
    description: 'Hand-finished solid brass Buddha head sculpture with dark antique bronze patina. Designed for high-end spa, hotel, and home interiors.',
    category: 'Brass Handicraft',
    images: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'],
    minOrderQty: 8,
    price: '$35 - $65 / pc',
    featured: true,
    specifications: { Material: 'Solid Brass', Finish: 'Bronze Patina', Height: '14 Inches' },
    tags: ['buddha head', 'brass sculpture', 'hotel decor'],
    createdAt: new Date('2026-01-08'),
  },
];

function docToProduct(doc: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot): Product {
  const data = doc.data() as Record<string, unknown>;
  let createdAt = new Date();
  if (data.createdAt) {
    if (typeof data.createdAt === 'string') {
      createdAt = new Date(data.createdAt);
    } else if (typeof (data.createdAt as FirebaseFirestore.Timestamp).toDate === 'function') {
      createdAt = (data.createdAt as FirebaseFirestore.Timestamp).toDate();
    }
  }
  const moq = data.minOrderQty;
  return {
    id: doc.id,
    name: (data.name as string) || '',
    description: (data.description as string) || '',
    category: (data.category as string) || '',
    images: (data.images as string[]) || [],
    specifications: (data.specifications as Record<string, string>) || {},
    tags: (data.tags as string[]) || [],
    featured: (data.featured as boolean) || false,
    minOrderQty: typeof moq === 'number' ? moq : parseInt(String(moq), 10) || 1,
    price: data.price as string | undefined,
    createdAt,
  };
}

function filterFallbackProducts(category?: string): Product[] {
  if (!category) return FALLBACK_PRODUCTS;
  const filtered = FALLBACK_PRODUCTS.filter(
    (p) => p.category.toLowerCase().trim() === category.toLowerCase().trim()
  );
  return filtered.length > 0 ? filtered : FALLBACK_PRODUCTS;
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    if (!adminDb || !adminDb.collection) {
      return filterFallbackProducts(category);
    }
    let query: FirebaseFirestore.Query = adminDb.collection('products');
    if (category) {
      query = query.where('category', '==', category);
      const snapshot = await query.get();
      if (snapshot.empty) return filterFallbackProducts(category);
      return snapshot.docs.map(docToProduct).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    if (snapshot.empty) return filterFallbackProducts();
    return snapshot.docs.map(docToProduct);
  } catch {
    return filterFallbackProducts(category);
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    if (!adminDb || !adminDb.collection) {
      return FALLBACK_PRODUCTS.find((p) => p.id === id) || FALLBACK_PRODUCTS[0];
    }
    const doc = await adminDb.collection('products').doc(id).get();
    if (!doc.exists) {
      return FALLBACK_PRODUCTS.find((p) => p.id === id) || FALLBACK_PRODUCTS[0];
    }
    return docToProduct(doc);
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.id === id) || FALLBACK_PRODUCTS[0];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    if (!adminDb || !adminDb.collection) return FALLBACK_CATEGORIES;
    const snapshot = await adminDb.collection('categories').get();
    if (snapshot.empty) return FALLBACK_CATEGORIES;
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        slug: data.slug || '',
        image: data.image,
        showOnHomepage: data.showOnHomepage || false,
      };
    });
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function getHomepageCategoryData(): Promise<Array<{ category: Category; products: Product[] }>> {
  try {
    if (!adminDb || !adminDb.collection) {
      return FALLBACK_CATEGORIES.map((cat) => ({
        category: cat,
        products: FALLBACK_PRODUCTS.filter((p) => p.category === cat.name),
      }));
    }
    const catSnapshot = await adminDb.collection('categories').where('showOnHomepage', '==', true).get();
    if (catSnapshot.empty) {
      return FALLBACK_CATEGORIES.map((cat) => ({
        category: cat,
        products: FALLBACK_PRODUCTS.filter((p) => p.category === cat.name),
      }));
    }
    const results = await Promise.all(
      catSnapshot.docs.map(async (catDoc) => {
        const d = catDoc.data();
        const category: Category = {
          id: catDoc.id,
          name: d.name || '',
          slug: d.slug || '',
          image: d.image,
          showOnHomepage: true,
        };
        const prodSnapshot = await adminDb.collection('products')
          .where('category', '==', category.name)
          .limit(4)
          .get();
        const products = prodSnapshot.docs.map(docToProduct);
        return { category, products };
      })
    );
    const validResults = results.filter((r) => r.products.length > 0);
    return validResults.length > 0
      ? validResults
      : FALLBACK_CATEGORIES.map((cat) => ({
          category: cat,
          products: FALLBACK_PRODUCTS.filter((p) => p.category === cat.name),
        }));
  } catch {
    return FALLBACK_CATEGORIES.map((cat) => ({
      category: cat,
      products: FALLBACK_PRODUCTS.filter((p) => p.category === cat.name),
    }));
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    if (!adminDb || !adminDb.collection) return FALLBACK_PRODUCTS.slice(0, 6);
    const snapshot = await adminDb.collection('products').where('featured', '==', true).limit(6).get();
    if (snapshot.empty) return FALLBACK_PRODUCTS.slice(0, 6);
    return snapshot.docs.map(docToProduct);
  } catch {
    return FALLBACK_PRODUCTS.slice(0, 6);
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    if (!adminDb || !adminDb.collection) return [];
    const snapshot = await adminDb.collection('gallery').orderBy('order', 'asc').get();
    if (snapshot.empty) {
      const fallback = await adminDb.collection('gallery').get();
      return fallback.docs.map((doc) => {
        const d = doc.data();
        return { id: doc.id, url: d.url || '', alt: d.alt || '', category: d.category || '', order: d.order };
      });
    }
    return snapshot.docs.map((doc) => {
      const d = doc.data();
      return { id: doc.id, url: d.url || '', alt: d.alt || '', category: d.category || '', order: d.order };
    });
  } catch {
    try {
      if (!adminDb || !adminDb.collection) return [];
      const fallback = await adminDb.collection('gallery').get();
      return fallback.docs.map((doc) => {
        const d = doc.data();
        return { id: doc.id, url: d.url || '', alt: d.alt || '', category: d.category || '', order: d.order };
      });
    } catch {
      return [];
    }
  }
}

function docToBlog(doc: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot): Blog {
  const data = doc.data() as Record<string, unknown>;
  const parseDate = (val: unknown): Date => {
    if (!val) return new Date();
    if (typeof val === 'string') return new Date(val);
    if (typeof (val as FirebaseFirestore.Timestamp).toDate === 'function') {
      return (val as FirebaseFirestore.Timestamp).toDate();
    }
    return new Date();
  };
  return {
    id: doc.id,
    title: (data.title as string) || '',
    slug: (data.slug as string) || '',
    excerpt: (data.excerpt as string) || '',
    content: (data.content as string) || '',
    coverImage: data.coverImage as string | undefined,
    tags: data.tags as string[] | undefined,
    author: data.author as string | undefined,
    published: (data.published as boolean) || false,
    seoTitle: data.seoTitle as string | undefined,
    seoDescription: data.seoDescription as string | undefined,
    createdAt: parseDate(data.createdAt),
    updatedAt: parseDate(data.updatedAt),
  };
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    if (!adminDb || !adminDb.collection) return [];
    const snapshot = await adminDb.collection('blogs').orderBy('createdAt', 'desc').get();
    if (snapshot.empty) return [];
    return snapshot.docs.map(docToBlog).filter((b) => b.published);
  } catch (err) {
    console.error('getBlogs error:', err);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    if (!adminDb || !adminDb.collection) return null;
    const snapshot = await adminDb.collection('blogs').where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const blog = docToBlog(snapshot.docs[0]);
    return blog.published ? blog : null;
  } catch (err) {
    console.error('getBlogBySlug error:', err);
    return null;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    if (!adminDb || !adminDb.collection) return {};
    const doc = await adminDb.doc('settings/main').get();
    if (!doc.exists) return {};
    return doc.data() as SiteSettings;
  } catch {
    return {};
  }
}

export async function saveInquiry(inquiry: Inquiry): Promise<void> {
  try {
    if (!adminDb || !adminDb.collection) {
      console.log('Inquiry (Firebase unavailable):', inquiry);
      return;
    }
    await adminDb.collection('inquiries').add({
      ...inquiry,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    throw error;
  }
}
