import { adminDb } from './firebase-admin';
import type { Product, Category, Inquiry, GalleryImage, Blog, SiteSettings } from '@/types';

// Fallback products and categories to ensure the site displays products cleanly on Vercel
// even if Firebase Admin environment variables are not configured in Vercel settings.
const FALLBACK_CATEGORIES: Category[] = [
  { id: 'copper-handicraft', name: 'Copper Handicraft', slug: 'copper-handicraft', image: '/categories/copper-handicraft.jpg', showOnHomepage: true },
  { id: 'macrame-bags', name: 'Macrame Bags', slug: 'macrame-bags', image: '/categories/macrame-bags.jpg', showOnHomepage: true },
  { id: 'macrame-cushion', name: 'Macrame Cushion', slug: 'macrame-cushion', image: '/categories/macrame-cushion.jpg', showOnHomepage: true },
  { id: 'macrame-wall-hanging', name: 'Macrame Wall Hanging', slug: 'macrame-wall-hanging', image: '/categories/macrame-wall-hanging.jpg', showOnHomepage: true },
  { id: 'wooden-puzzles', name: 'Wooden Puzzles', slug: 'wooden-puzzles', image: '/categories/wooden-puzzles.jpg', showOnHomepage: true },
  { id: 'wooden-toys', name: 'Wooden Toys', slug: 'wooden-toys', image: '/categories/wooden-toys.jpg', showOnHomepage: true },
  { id: 'home-decor', name: 'Home Decor', slug: 'home-decor', image: '/categories/home-decor.jpg', showOnHomepage: true },
  { id: 'kitchenware', name: 'Kitchenware', slug: 'kitchenware', image: '/categories/kitchenware.jpg', showOnHomepage: true },
];

const FALLBACK_PRODUCTS: Product[] = [
  // Copper Handicraft
  {
    id: 'copper-bottle-hammered-01',
    name: 'Pure Hammered Copper Water Bottle (1000ml)',
    description: 'Ayurvedic wellness pure copper water bottle with hand-hammered texture and leakproof cap. Ideal for luxury wellness retail.',
    category: 'Copper Handicraft',
    images: ['/categories/copper-handicraft.jpg'],
    minOrderQty: 25,
    price: '$12 - $18 / pc',
    featured: true,
    specifications: { Material: '99.9% Pure Copper', Capacity: '1000 ml', Finish: 'Hand Hammered' },
    tags: ['copper bottle', 'ayurvedic', 'health'],
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'copper-jug-glasses-set-02',
    name: 'Royal Copper Jug with 4 Hammered Tumblers Set',
    description: 'Traditional handcrafted pure copper jug pitcher set with 4 matching tumblers. Styled with vintage matte copper luster.',
    category: 'Copper Handicraft',
    images: ['/categories/copper-handicraft.jpg'],
    minOrderQty: 15,
    price: '$32 - $48 / set',
    featured: true,
    specifications: { Material: 'Pure Copper', JugCapacity: '1500 ml', GlassQty: '4 Tumblers' },
    tags: ['copper jug', 'drinkware', 'tableware'],
    createdAt: new Date('2026-01-02'),
  },
  {
    id: 'copper-moscow-mule-mugs-03',
    name: 'Embossed Copper Moscow Mule Mug Pack',
    description: 'Solid food-grade copper mugs with comfortable brass handle and hammered vintage finish. Great for barware export.',
    category: 'Copper Handicraft',
    images: ['/categories/copper-handicraft.jpg'],
    minOrderQty: 50,
    price: '$8 - $14 / pc',
    featured: false,
    specifications: { Material: 'Copper with Brass Handle', Capacity: '450 ml' },
    tags: ['copper mug', 'barware', 'export'],
    createdAt: new Date('2026-01-03'),
  },

  // Macrame Bags
  {
    id: 'macrame-tote-bag-01',
    name: 'Boho Cotton Macrame Tote Shoulder Bag',
    description: 'Eco-friendly hand-knotted 100% natural cotton cord macrame beach tote bag with solid wooden ring handle.',
    category: 'Macrame Bags',
    images: ['/categories/macrame-bags.jpg'],
    minOrderQty: 20,
    price: '$14 - $22 / pc',
    featured: true,
    specifications: { Material: 'Organic Cotton Cord', Handle: 'Natural Wooden Ring' },
    tags: ['macrame bag', 'boho tote', 'eco fashion'],
    createdAt: new Date('2026-01-04'),
  },
  {
    id: 'macrame-crossbody-bag-02',
    name: 'Handcrafted Fringe Macrame Crossbody Sling Bag',
    description: 'Chic Bohemian woven crossbody clutch bag featuring bohemian tassel fringes and secure inner canvas lining.',
    category: 'Macrame Bags',
    images: ['/categories/macrame-bags.jpg'],
    minOrderQty: 30,
    price: '$10 - $16 / pc',
    featured: true,
    specifications: { Material: 'Cotton Thread', Closure: 'Zip with Canvas Lining' },
    tags: ['sling bag', 'macrame clutch', 'boho style'],
    createdAt: new Date('2026-01-05'),
  },
  {
    id: 'macrame-shopping-net-bag-03',
    name: 'Hand-Woven Macrame Market Shopper Bag',
    description: 'Durable stretchable cotton macrame market shopper tote for eco-conscious grocery and lifestyle boutiques.',
    category: 'Macrame Bags',
    images: ['/categories/macrame-bags.jpg'],
    minOrderQty: 40,
    price: '$7 - $12 / pc',
    featured: false,
    specifications: { Material: '100% Natural Cotton', Capacity: '15 kg load' },
    tags: ['market tote', 'net bag', 'sustainable'],
    createdAt: new Date('2026-01-06'),
  },

  // Macrame Cushion
  {
    id: 'macrame-cushion-cover-boho-01',
    name: 'Textured Macrame Geometric Pillow Cover (18x18")',
    description: 'Luxury hand-knotted cotton yarn cushion cover with geometric pattern weave and hidden back zipper.',
    category: 'Macrame Cushion',
    images: ['/categories/macrame-cushion.jpg'],
    minOrderQty: 30,
    price: '$11 - $18 / pc',
    featured: true,
    specifications: { Size: '18 x 18 Inches', Front: '100% Cotton Macrame', Back: 'Canvas' },
    tags: ['cushion cover', 'boho decor', 'textile'],
    createdAt: new Date('2026-01-07'),
  },
  {
    id: 'macrame-fringe-cushion-02',
    name: 'Bohemian Tasseled Macrame Throw Pillow Cover',
    description: 'Soft off-white cotton braided cushion featuring side fringe accents for living room and bedroom styling.',
    category: 'Macrame Cushion',
    images: ['/categories/macrame-cushion.jpg'],
    minOrderQty: 25,
    price: '$12 - $20 / pc',
    featured: false,
    specifications: { Size: '16 x 16 Inches', Material: 'Pure Cotton Yarn' },
    tags: ['macrame pillow', 'fringe cushion', 'home decor'],
    createdAt: new Date('2026-01-08'),
  },
  {
    id: 'macrame-lumbar-pillow-03',
    name: 'Artisan Woven Macrame Lumbar Cushion Cover',
    description: 'Elongated boho style lumbar pillow cover with heavy hand-woven macrame front and soft cotton duck fabric.',
    category: 'Macrame Cushion',
    images: ['/categories/macrame-cushion.jpg'],
    minOrderQty: 20,
    price: '$14 - $24 / pc',
    featured: true,
    specifications: { Size: '12 x 20 Inches', Detail: 'Hand-braided tassels' },
    tags: ['lumbar cushion', 'macrame decor', 'handmade'],
    createdAt: new Date('2026-01-09'),
  },

  // Macrame Wall Hanging
  {
    id: 'macrame-wall-tapestry-01',
    name: 'Grand Boho Chic Macrame Wall Hanging Tapestry',
    description: 'Large scale hand-knotted wall tapestry crafted on natural drift wood stick. Adds warm artisanal texture to any room.',
    category: 'Macrame Wall Hanging',
    images: ['/categories/macrame-wall-hanging.jpg'],
    minOrderQty: 10,
    price: '$25 - $42 / pc',
    featured: true,
    specifications: { Width: '36 Inches', Height: '42 Inches', Support: 'Natural Driftwood Branch' },
    tags: ['wall hanging', 'tapestry', 'boho wall decor'],
    createdAt: new Date('2026-01-10'),
  },
  {
    id: 'macrame-plant-hanger-02',
    name: 'Tiered Cotton Rope Macrame Plant Hanger',
    description: 'Double tier hand-braided cotton rope hanging planter holder with wooden bead accents. Indoor & outdoor garden decor.',
    category: 'Macrame Wall Hanging',
    images: ['/categories/macrame-wall-hanging.jpg'],
    minOrderQty: 35,
    price: '$8 - $15 / pc',
    featured: false,
    specifications: { Length: '48 Inches', Capacity: '2 Pots (6-8 inch diameter)' },
    tags: ['plant hanger', 'macrame planter', 'garden decor'],
    createdAt: new Date('2026-01-11'),
  },
  {
    id: 'macrame-feather-leaves-hanging-03',
    name: 'Handmade Feather Leaves Macrame Wall Art',
    description: 'Intricately combed cotton macrame leaf feathers arranged on natural wood rod with wooden beads.',
    category: 'Macrame Wall Hanging',
    images: ['/categories/macrame-wall-hanging.jpg'],
    minOrderQty: 20,
    price: '$18 - $28 / pc',
    featured: true,
    specifications: { Dimension: '24 x 30 Inches', Material: 'Combed Cotton & Teak Wood' },
    tags: ['feather macrame', 'wall art', 'boho chic'],
    createdAt: new Date('2026-01-12'),
  },

  // Wooden Puzzles
  {
    id: 'wooden-3d-interlocking-cube-01',
    name: 'Handcrafted Sheesham Wood 3D Brain Teaser Cube',
    description: 'Traditional Indian 12-piece interlocking wooden puzzle cube carved from solid rosewood. Excellent gift item.',
    category: 'Wooden Puzzles',
    images: ['/categories/wooden-puzzles.jpg'],
    minOrderQty: 50,
    price: '$5 - $9 / pc',
    featured: true,
    specifications: { Material: 'Sheesham Rosewood', Difficulty: 'Hard (12 Pieces)' },
    tags: ['wooden puzzle', 'brain teaser', 'sheesham'],
    createdAt: new Date('2026-01-13'),
  },
  {
    id: 'wooden-soma-cube-02',
    name: 'Artisan Teak Wood Soma Block Puzzle Game',
    description: 'Classic 7-piece wooden block assembly puzzle in polished wooden storage box with sliding lid.',
    category: 'Wooden Puzzles',
    images: ['/categories/wooden-puzzles.jpg'],
    minOrderQty: 40,
    price: '$6 - $11 / pc',
    featured: false,
    specifications: { Material: 'Teak Wood', Packaging: 'Hand-carved wooden box' },
    tags: ['soma cube', 'mind game', 'handicraft puzzle'],
    createdAt: new Date('2026-01-14'),
  },
  {
    id: 'wooden-star-puzzle-03',
    name: 'Interlocking Wooden Star Burr Puzzle',
    description: 'Precision hand-cut 6-piece wooden star puzzle with smooth oil finish, popular in specialty boutique stores.',
    category: 'Wooden Puzzles',
    images: ['/categories/wooden-puzzles.jpg'],
    minOrderQty: 50,
    price: '$4 - $8 / pc',
    featured: true,
    specifications: { Material: 'Haldu Wood', Diameter: '3.5 Inches' },
    tags: ['star puzzle', 'wooden gift', 'burr puzzle'],
    createdAt: new Date('2026-01-15'),
  },

  // Wooden Toys
  {
    id: 'channapatna-wooden-pull-toy-01',
    name: 'Channapatna Non-Toxic Wooden Pull Along Engine',
    description: 'Traditional eco-friendly Channapatna wooden toy engine colored with natural vegetable dyes and polished with lac.',
    category: 'Wooden Toys',
    images: ['/categories/wooden-toys.jpg'],
    minOrderQty: 30,
    price: '$9 - $15 / pc',
    featured: true,
    specifications: { Material: 'Wrightia Tinctoria Wood', Dyes: '100% Organic Vegetable Colors' },
    tags: ['channapatna', 'wooden toy', 'pull toy', 'kids'],
    createdAt: new Date('2026-01-16'),
  },
  {
    id: 'wooden-stacking-ring-tower-02',
    name: 'Organic Wooden Stacking Rainbow Ring Tower',
    description: 'Hand-turned smooth wooden nesting ring tower toy coated with safe natural lacquer for toddlers.',
    category: 'Wooden Toys',
    images: ['/categories/wooden-toys.jpg'],
    minOrderQty: 35,
    price: '$8 - $14 / pc',
    featured: true,
    specifications: { Material: 'Softwood & Natural Lacquer', Height: '7.5 Inches' },
    tags: ['stacking rings', 'montessori toy', 'eco toy'],
    createdAt: new Date('2026-01-17'),
  },
  {
    id: 'wooden-handicraft-rocking-horse-03',
    name: 'Hand-Painted Miniature Wooden Rocking Horse',
    description: 'Artisanal decorated wooden rocking horse figurine styled with traditional Rajasthani floral motifs.',
    category: 'Wooden Toys',
    images: ['/categories/wooden-toys.jpg'],
    minOrderQty: 25,
    price: '$12 - $20 / pc',
    featured: false,
    specifications: { Material: 'Mango Wood', Finish: 'Hand-painted Folk Art' },
    tags: ['rocking horse', 'rajasthani toy', 'heritage'],
    createdAt: new Date('2026-01-18'),
  },

  // Home Decor
  {
    id: 'brass-tree-of-life-wall-decor-01',
    name: 'Hand-Forged Metal Tree of Life Wall Sculpture',
    description: 'Intricate brass and iron antique burnished Tree of Life wall hanging plate. Focal point for high-end interiors.',
    category: 'Home Decor',
    images: ['/categories/home-decor.jpg'],
    minOrderQty: 15,
    price: '$35 - $60 / pc',
    featured: true,
    specifications: { Diameter: '24 Inches', Material: 'Solid Brass & Wrought Iron' },
    tags: ['wall art', 'tree of life', 'home decor'],
    createdAt: new Date('2026-01-19'),
  },
  {
    id: 'carved-wooden-candle-holders-02',
    name: 'Set of 3 Distressed Carved Wooden Pillar Candle Stands',
    description: 'Hand-carved vintage finish wooden candlestick pillar holders. Ideal for dining table and mantle piece decor.',
    category: 'Home Decor',
    images: ['/categories/home-decor.jpg'],
    minOrderQty: 20,
    price: '$22 - $36 / set',
    featured: true,
    specifications: { Heights: '6", 8", 10"', Material: 'Reclaimed Teak Wood' },
    tags: ['candle holders', 'pillar stand', 'vintage decor'],
    createdAt: new Date('2026-01-20'),
  },
  {
    id: 'brass-dhokra-art-figurines-03',
    name: 'Tribal Dhokra Cast Brass Musician Figurines Set',
    description: 'Ancient lost-wax cast brass tribal musicians sculpture set created by traditional Bastar artisans.',
    category: 'Home Decor',
    images: ['/categories/home-decor.jpg'],
    minOrderQty: 15,
    price: '$28 - $45 / set',
    featured: false,
    specifications: { Craft: 'Lost Wax Brass Casting', SetOf: '3 Musician Idols' },
    tags: ['dhokra art', 'tribal brass', 'artisan sculpture'],
    createdAt: new Date('2026-01-21'),
  },

  // Kitchenware
  {
    id: 'wooden-salad-bowl-servers-01',
    name: 'Solid Acacia Wood Salad Bowl with Matching Servers',
    description: 'Premium hand-turned natural grain acacia wood salad serving bowl with dual wooden serving spoons.',
    category: 'Kitchenware',
    images: ['/categories/kitchenware.jpg'],
    minOrderQty: 15,
    price: '$24 - $38 / set',
    featured: true,
    specifications: { BowlDiameter: '12 Inches', Material: 'Acacia Wood', FoodSafe: 'Organic Coconut Oil Polish' },
    tags: ['salad bowl', 'wooden tableware', 'acacia'],
    createdAt: new Date('2026-01-22'),
  },
  {
    id: 'hand-carved-wooden-chapati-box-02',
    name: 'Traditional Carved Wooden Roti Casserole Box',
    description: 'Insulated Sheesham wood roti container with stainless steel liner inner insert and carved lid.',
    category: 'Kitchenware',
    images: ['/categories/kitchenware.jpg'],
    minOrderQty: 20,
    price: '$18 - $28 / pc',
    featured: true,
    specifications: { Material: 'Sheesham Wood + Stainless Steel', OuterDiameter: '9 Inches' },
    tags: ['roti box', 'chapati box', 'kitchenware'],
    createdAt: new Date('2026-01-23'),
  },
  {
    id: 'wooden-spice-box-06',
    name: 'Traditional 9-Grid Wooden Masala Dabba',
    description: 'Handmade Rosewood spice box with glass window lid and brass latch. Includes 9 individual wooden spice containers.',
    category: 'Kitchenware',
    images: ['/categories/kitchenware.jpg'],
    minOrderQty: 20,
    price: '$14 - $24 / pc',
    featured: false,
    specifications: { Material: 'Indian Rosewood', Grids: '9 Containers + Brass Latch' },
    tags: ['spice box', 'kitchenware', 'rosewood'],
    createdAt: new Date('2026-01-24'),
  },

  // Brass Handicraft
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
    createdAt: new Date('2026-01-25'),
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
    createdAt: new Date('2026-01-26'),
  },
  {
    id: 'brass-bronze-buddha-head-08',
    name: 'Serene Brass Buddha Head Table Top Artifact',
    description: 'Hand-finished solid brass Buddha head sculpture with dark antique bronze patina. Designed for high-end spa, hotel, and home interiors.',
    category: 'Brass Handicraft',
    images: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'],
    minOrderQty: 8,
    price: '$35 - $65 / pc',
    featured: false,
    specifications: { Material: 'Solid Brass', Finish: 'Bronze Patina', Height: '14 Inches' },
    tags: ['buddha head', 'brass sculpture', 'hotel decor'],
    createdAt: new Date('2026-01-27'),
  },

  // Wooden Handicraft
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
    createdAt: new Date('2026-01-28'),
  },
  {
    id: 'wooden-jali-screen-partition-02',
    name: 'Traditional Jali Carved Wooden Room Divider',
    description: 'Handcrafted 4-panel folding screen carved from solid mango wood with traditional royal Jali lattice cutouts.',
    category: 'Wooden Handicraft',
    images: ['/categories/home-decor.jpg'],
    minOrderQty: 5,
    price: '$120 - $210 / pc',
    featured: true,
    specifications: { Material: 'Mango Wood', Panels: '4 Panels (72" Height)' },
    tags: ['room divider', 'jali screen', 'furniture'],
    createdAt: new Date('2026-01-29'),
  },
  {
    id: 'wooden-carved-wall-panel-03',
    name: 'Antique Gold Distressed Wooden Wall Panel Jharokha',
    description: 'Heritage Indian wall window frame Jharokha made of carved teak wood with antiqued golden foil accent finish.',
    category: 'Wooden Handicraft',
    images: ['/categories/home-decor.jpg'],
    minOrderQty: 10,
    price: '$42 - $75 / pc',
    featured: false,
    specifications: { Height: '24 Inches', Material: 'Teak Wood' },
    tags: ['jharokha', 'wall frame', 'heritage panel'],
    createdAt: new Date('2026-01-30'),
  },

  // Gifting & Hampers
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
    createdAt: new Date('2026-01-31'),
  },
  {
    id: 'festive-handicrafts-hamper-set-02',
    name: 'Artisan Diwali & Festive Brass & Wood Gift Hamper',
    description: 'Exclusive corporate hamper containing brass oil lamp, wooden coaster set, pure copper tumbler, and organic dabba.',
    category: 'Gifting & Hampers',
    images: ['/categories/home-decor.jpg'],
    minOrderQty: 20,
    price: '$35 - $60 / box',
    featured: true,
    specifications: { Box: 'Rigid Keepsake Wooden Box', Items: '4 Premium Handicraft Artifacts' },
    tags: ['festive hamper', 'corporate gifting', 'luxury set'],
    createdAt: new Date('2026-02-01'),
  },
  {
    id: 'brass-inlay-coaster-set-03',
    name: 'Set of 6 Rosewood Coasters in Brass Inlaid Holder',
    description: 'Handcrafted dark rosewood tea coasters with floral brass wire inlay design and matching storage stand.',
    category: 'Gifting & Hampers',
    images: ['/categories/kitchenware.jpg'],
    minOrderQty: 40,
    price: '$8 - $15 / set',
    featured: false,
    specifications: { Material: 'Indian Rosewood & Brass Inlay', Quantity: '6 Coasters + Holder' },
    tags: ['coaster set', 'rosewood', 'tableware gift'],
    createdAt: new Date('2026-02-02'),
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
