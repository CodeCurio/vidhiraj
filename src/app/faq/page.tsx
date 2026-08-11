import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Indian Handicraft Wholesale & Export Questions Answered',
  description: 'Answers to common questions about ordering handcrafted Indian handicrafts wholesale: MOQ, pricing, shipping, OEM, samples, payment terms, customs docs & more.',
  keywords: [
    'handicraft wholesale FAQ india',
    'minimum order quantity indian handicrafts',
    'how to import handicrafts from india',
    'indian handicraft manufacturer questions',
    'wholesale handicraft shipping india',
    'OEM handicraft india FAQ',
    'handicraft samples india',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Indian Handicraft Wholesale & Export',
    description: 'Everything international buyers need to know about ordering wholesale handicrafts from India.',
    url: '/faq',
    type: 'website',
  },
};

const faqs: { q: string; a: string }[] = [
  // --- Ordering & MOQ ---
  {
    q: 'What is the minimum order quantity (MOQ) for wholesale handicrafts?',
    a: 'Our standard MOQ is 50 pieces per product design. For mixed assortments, the total order minimum is 100 pieces across designs. Custom OEM orders have a minimum of 200 pieces per design. Sample orders of 1–5 pieces are available at retail price before bulk commitment.',
  },
  {
    q: 'Can I place a mixed order with different products?',
    a: 'Yes. You can mix different products, designs, and categories in one order. The total order value must meet our minimum order value of USD 300. There is no restriction on how many SKUs you combine.',
  },
  {
    q: 'How do I place a wholesale order with Vidhiraj Global Impex?',
    a: 'Step 1: Browse our product catalog and select items. Step 2: Submit an inquiry via our Inquiry Form, WhatsApp (+91-82888-40802), or email. Step 3: Receive a quotation within 24 hours. Step 4: Confirm order with 30% advance payment. Step 5: Production begins, samples shared for approval. Step 6: Final payment before dispatch. Step 7: Shipment with full tracking.',
  },
  {
    q: 'Do you have a product catalog I can download?',
    a: 'Yes, we provide a digital product catalog in PDF format upon request. Contact us via WhatsApp or email and we will send the latest catalog with pricing, product codes, and MOQ details within 24 hours.',
  },
  // --- Pricing ---
  {
    q: 'How is wholesale pricing determined?',
    a: 'Pricing depends on the product type, quantity ordered, customization requirements, and material specifications. We offer tiered volume discounts: 5% off for 100–499 pcs, 10% off for 500–999 pcs, 15% off for 1,000–4,999 pcs, and custom rates for 5,000+ pcs. Request a quote for exact pricing.',
  },
  {
    q: 'Do prices include shipping costs?',
    a: 'Our standard product prices are quoted Ex-Works (EXW) from our Chandigarh facility. Shipping costs are calculated separately based on destination, shipping method (air or sea), and order volume. We provide a complete landed cost estimate including shipping, insurance, and export documentation.',
  },
  {
    q: 'Are there any hidden fees or agent commissions?',
    a: 'No. We are the direct manufacturer with zero agents or commission layers. The price you see is what you pay. There are no hidden fees. Any applicable government export duties from the Indian side are included in our quotation.',
  },
  // --- Samples ---
  {
    q: 'Can I order product samples before placing a bulk order?',
    a: 'Yes. We strongly encourage sample orders. Sample orders of 1–5 pieces per design are available at retail price plus actual shipping cost. Sample lead time is 5–10 business days. The cost of samples is often credited against your first bulk order over USD 1,000.',
  },
  {
    q: 'How long does it take to receive samples?',
    a: 'Standard samples from existing designs: 5–10 business days for production, plus shipping time (3–7 days by DHL/FedEx to most countries). Custom sample development takes 15–20 business days. We provide tracking once dispatched.',
  },
  // --- Customization / OEM ---
  {
    q: 'Can you manufacture products with my brand logo or custom design?',
    a: 'Yes. We offer full OEM and ODM manufacturing. We can engrave, print, or emboss your logo on wooden products, brass items, and packaging. Send us your logo (vector format preferred) and design brief, and our team will provide a sample within 15–20 days. No design fee for orders above MOQ.',
  },
  {
    q: 'What customization options are available?',
    a: 'Customization options include: custom wood stains and finishes, custom brass patina and plating, custom colors for coconut shell products, logo engraving or printing, custom packaging (boxes, tissue, hang tags, ribbons), custom product shapes and sizes (with tooling), seasonal or themed design development, and private label / white label manufacturing.',
  },
  {
    q: 'Do you offer private label or white label manufacturing?',
    a: 'Yes. We manufacture exclusively for your brand with no Vidhiraj branding. All products, tags, packaging, and documentation can carry your brand identity. We sign NDAs on request to protect your designs.',
  },
  // --- Production & Lead Time ---
  {
    q: 'What is the production lead time for bulk orders?',
    a: 'Standard production lead time is 30–45 business days after order confirmation and advance payment. Rush orders can be fulfilled in 15–20 business days at a 15% premium. Custom OEM orders with new tooling take 45–60 business days. We provide weekly production updates.',
  },
  {
    q: 'Can I visit your factory or arrange a factory audit?',
    a: 'Yes. We welcome buyer visits to our Chandigarh production facility. For international buyers, we also facilitate virtual factory tours via video call. Third-party factory audits by appointed inspection agencies are permitted with prior scheduling.',
  },
  // --- Quality ---
  {
    q: 'What quality control processes do you follow?',
    a: 'We conduct a 3-stage quality inspection: (1) Raw material inspection on arrival, (2) Mid-production quality check at 50% completion, and (3) Final pre-shipment inspection of 100% of units. We maintain a defect rate below 0.5%. A pre-shipment inspection report is shared before dispatch.',
  },
  {
    q: 'Are your products 100% handmade?',
    a: 'Yes. Every product from Vidhiraj Global Impex is crafted entirely by hand by our team of 100+ skilled Indian artisans. We do not use machine manufacturing or automation in the making of any product. This guarantees authentic handmade character and variation in each piece.',
  },
  {
    q: 'What materials do you use?',
    a: 'We use premium natural materials: select hardwood (mango, sheesham, neem), pure brass alloy, organic coconut shell, natural mineral and plant-based dyes, and sustainable packaging materials. All materials are sourced from verified suppliers and are eco-friendly.',
  },
  {
    q: 'What is your defect/damage policy?',
    a: 'If any products arrive damaged or defective, we replace the defective units at no charge in the next shipment, or issue a credit note, at your choice. Claims must be submitted with photographic evidence within 7 days of delivery. Our defect rate is below 0.5%.',
  },
  // --- Shipping ---
  {
    q: 'Which countries do you ship to?',
    a: 'We ship to 30+ countries worldwide including USA, UK, Germany, France, Australia, UAE, Canada, Japan, Italy, Netherlands, Singapore, South Africa, Brazil, Mexico, Saudi Arabia, and more. Contact us if your country is not listed — we can usually arrange delivery.',
  },
  {
    q: 'What shipping methods are available?',
    a: 'We offer: Air freight via DHL, FedEx, UPS, and Aramex (transit time: 3–7 days); Sea freight via LCL (Less than Container Load) or FCL for large orders (transit time: 15–40 days depending on destination); Express courier for samples and urgent small orders.',
  },
  {
    q: 'How long does shipping take to the USA, UK, Europe, and Australia?',
    a: 'Air freight transit times: USA 4–6 days, UK 3–5 days, Germany/France/Europe 4–7 days, Australia 5–8 days, UAE 2–4 days, Canada 5–7 days. Sea freight adds 15–35 days. These are carrier transit times; add 1–2 days for pickup from our facility.',
  },
  {
    q: 'Do you provide shipment tracking?',
    a: 'Yes. All shipments include a tracking number shared immediately upon dispatch. We use DHL, FedEx, UPS, or Aramex for air freight — all with real-time online tracking. For sea freight, we provide the Bill of Lading number and vessel tracking link.',
  },
  // --- Documentation ---
  {
    q: 'What export documents do you provide?',
    a: 'We provide: Commercial Invoice, Packing List, Certificate of Origin (COO), GSP Certificate (for applicable countries), Bill of Lading or Airway Bill, Phytosanitary Certificate (where required), Export Declaration, and Insurance Certificate. All documents are prepared by our dedicated export documentation team.',
  },
  {
    q: 'Do you help with customs clearance at the destination?',
    a: 'We handle all export documentation from India. Import customs clearance at the destination is the buyer\'s responsibility, but we guide you through HS codes, declared values, and required paperwork to ensure smooth clearance. We recommend using a licensed customs broker in your country.',
  },
  {
    q: 'What HS codes do your products fall under?',
    a: 'Common HS codes for our products: Wooden handicrafts — 4420, Brass figurines — 8306 — 1404/4421. We provide the exact HS code on the Commercial Invoice for each product. Contact us for product-specific HS code confirmation.',
  },
  // --- Payment ---
  {
    q: 'What payment methods do you accept?',
    a: 'We accept: T/T Wire Transfer (30% advance, 70% before shipment — most common), PayPal (for smaller orders up to USD 500, fees apply), Letter of Credit / L/C (for established buyers with orders over USD 10,000), Western Union (for sample payments), and Wise (TransferWise).',
  },
  {
    q: 'Are payments secure? Do you offer buyer protection?',
    a: 'Yes. Our bank details are verified and consistent. We never request payment via personal accounts. For new buyers, we recommend starting with a small sample order via PayPal for buyer protection. All transactions are supported by a formal Purchase Order and Proforma Invoice.',
  },
  // --- Sustainability ---
  {
    q: 'Are your products eco-friendly and sustainable?',
    a: 'Yes. We use only natural, sustainably sourced materials — wood and brass. We avoid synthetic dyes where possible, prefer plant-based and mineral finishes, and pack every order in 100% recyclable and biodegradable packaging. Zero single-use plastics in our facility.',
  },
  {
    q: 'Are your products fair trade?',
    a: 'We operate on fair trade principles: our artisans receive above-market wages, health benefits, and safe working conditions. While we are not formally certified by a specific fair trade body (certification is in process), we are fully transparent about our manufacturing practices and welcome factory audits.',
  },
  // --- Communication ---
  {
    q: 'How quickly do you respond to inquiries?',
    a: 'We guarantee a response to all inquiries within 24 hours, Monday to Saturday, 9am–6pm IST. For urgent inquiries, WhatsApp is the fastest channel — we typically respond within 2–4 hours during business hours.',
  },
  {
    q: 'Do you speak languages other than English?',
    a: 'Our primary business language is English. We also have team members who can communicate in Hindi. For buyers in Germany, France, and Arabic-speaking countries, we use professional translation tools to ensure clear communication.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const categories = [
  { label: 'Ordering & MOQ', ids: [0, 1, 2, 3] },
  { label: 'Pricing', ids: [4, 5, 6] },
  { label: 'Samples', ids: [7, 8] },
  { label: 'Customization & OEM', ids: [9, 10, 11] },
  { label: 'Production & Lead Time', ids: [12, 13] },
  { label: 'Quality & Materials', ids: [14, 15, 16, 17] },
  { label: 'Shipping & Delivery', ids: [18, 19, 20, 21] },
  { label: 'Export Documentation', ids: [22, 23, 24] },
  { label: 'Payment', ids: [25, 26] },
  { label: 'Sustainability', ids: [27, 28] },
  { label: 'Communication', ids: [29, 30] },
];

export default function FAQPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vidhirajglobalimpex.com' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://vidhirajglobalimpex.com/faq' },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ background: 'linear-gradient(135deg, #3a1a06 0%, #8B4513 100%)', paddingTop: '120px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>
              Buyer Guide
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
            >
              Frequently Asked Questions
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#e0c8b0' }}>
              Everything international buyers need to know about ordering wholesale handicrafts from India.
            </p>
          </div>
        </div>
      </section>

      {/* Category nav */}
      <section className="py-8 px-4 border-b" style={{ background: '#FFF8F0', borderColor: '#f0e0cc' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat.label}
                href={`#${cat.label.toLowerCase().replace(/\s+&?\s*/g, '-')}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                style={{ background: '#fff', color: '#8B4513', border: '1px solid #f0e0cc' }}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          {categories.map((cat) => (
            <div key={cat.label} id={cat.label.toLowerCase().replace(/\s+&?\s*/g, '-')}>
              <h2
                className="text-2xl font-bold mb-8 pb-3 border-b"
                style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif', borderColor: '#f0e0cc' }}
              >
                {cat.label}
              </h2>
              <div className="space-y-6">
                {cat.ids.filter((i) => i < faqs.length).map((i) => (
                  <div
                    key={i}
                    className="rounded-xl p-6"
                    style={{ background: '#FFF8F0', border: '1px solid #f0e0cc' }}
                  >
                    <h3
                      className="text-base font-bold mb-3"
                      style={{ color: '#1C1C1C', fontFamily: 'Georgia, serif' }}
                    >
                      {faqs[i].q}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#555' }}>
                      {faqs[i].a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-16 px-4" style={{ background: '#1C1C1C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full inline-block mb-5"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>
            Still Have Questions?
          </span>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: '#FFF8F0', fontFamily: 'Georgia, serif' }}
          >
            We Reply Within 24 Hours
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,248,240,0.65)' }}>
            Our export team is available Monday–Saturday, 9am–6pm IST. WhatsApp is fastest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/918288840802?text=Hello%20Vidhiraj%20Global%20Impex!%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm text-white"
              style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm6.358 19.92c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
              </svg>
              WhatsApp Us
            </a>
            <Link
              href="/inquiry"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#1C1C1C' }}
            >
              Send Inquiry Form
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#FFF8F0', border: '1px solid rgba(255,248,240,0.2)' }}
            >
              All Contact Options
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
