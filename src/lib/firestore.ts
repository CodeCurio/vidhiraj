import { adminDb } from './firebase-admin';
import type { Product, Category, Inquiry, GalleryImage, Blog, SiteSettings } from '@/types';


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

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    if (!adminDb || !adminDb.collection) return [];
    let query: FirebaseFirestore.Query = adminDb.collection('products');
    if (category) {
      query = query.where('category', '==', category);
      const snapshot = await query.get();
      if (snapshot.empty) return [];
      return snapshot.docs.map(docToProduct).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    if (snapshot.empty) return [];
    return snapshot.docs.map(docToProduct);
  } catch {
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    if (!adminDb || !adminDb.collection) return null;
    const doc = await adminDb.collection('products').doc(id).get();
    if (!doc.exists) return null;
    return docToProduct(doc);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    if (!adminDb || !adminDb.collection) return [];
    const snapshot = await adminDb.collection('categories').get();
    if (snapshot.empty) return [];
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
    return [];
  }
}

export async function getHomepageCategoryData(): Promise<Array<{ category: Category; products: Product[] }>> {
  try {
    if (!adminDb || !adminDb.collection) return [];
    const catSnapshot = await adminDb.collection('categories').where('showOnHomepage', '==', true).get();
    if (catSnapshot.empty) return [];
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
    return results.filter((r) => r.products.length > 0);
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    if (!adminDb || !adminDb.collection) return [];
    const snapshot = await adminDb.collection('products').where('featured', '==', true).limit(6).get();
    if (snapshot.empty) return [];
    return snapshot.docs.map(docToProduct);
  } catch {
    return [];
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
