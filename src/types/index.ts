export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  specifications: Record<string, string>;
  tags?: string[];
  featured: boolean;
  minOrderQty: number;
  price?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  showOnHomepage?: boolean;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  productInterest?: string;
  quantity?: string;
  message: string;
  productId?: string;
  createdAt?: Date;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  order?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings {
  contactPerson?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  exportEmail?: string;
  address?: string;
  businessHours?: string;
  gst?: string;
  popupEnabled?: boolean;
  popupDelay?: number;
}
