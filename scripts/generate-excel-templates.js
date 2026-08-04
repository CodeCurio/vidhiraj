/**
 * Generates categories-template.xlsx and products-template.xlsx
 * Run: node scripts/generate-excel-templates.js
 * Output goes to admin/public/templates/
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, '..', 'admin', 'public', 'templates');
fs.mkdirSync(outDir, { recursive: true });

// ── Categories template ──────────────────────────────────────────────────────

const categories = [
  ['Name', 'Slug', 'Description'],
  ['Gifting & Hampers', 'gifting-hampers', ''],
  ['Brass Handicraft', 'brass-handicraft', ''],
  ['Wooden Handicraft', 'wooden-handicraft', ''],
  ['Coconut Handicraft', 'coconut-handicraft', ''],
];

const catWs = XLSX.utils.aoa_to_sheet(categories);
catWs['!cols'] = [{ wch: 30 }, { wch: 25 }, { wch: 55 }];
const catWb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(catWb, catWs, 'Categories');
XLSX.writeFile(catWb, path.join(outDir, 'categories-template.xlsx'));
console.log('✓ categories-template.xlsx');

// ── Products template ────────────────────────────────────────────────────────

const productHeaders = [
  'Product Name', 'Description', 'Category',
  'Price', 'Min Order Qty', 'Specifications', 'Tags', 'Featured',
];

const productInstructions = [
  '← Required. Product display name',
  '← Optional. Full product description',
  '← Must match a category name exactly (case-insensitive)',
  '← e.g. "8-15" or "Contact to discuss"',
  '← e.g. "50 pieces" (default: 50)',
  '← Format: Key:Value|Key:Value  e.g. Material:Silk|Size:Large',
  '← Comma-separated  e.g. handmade, export, silk',
  '← yes or no',
];

const productData = [productHeaders, productInstructions];
const prodWs = XLSX.utils.aoa_to_sheet(productData);
prodWs['!cols'] = productHeaders.map(() => ({ wch: 30 }));
prodWs['!cols'][0] = { wch: 35 };
prodWs['!cols'][1] = { wch: 55 };
prodWs['!cols'][5] = { wch: 50 };

const prodWb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(prodWb, prodWs, 'Products');
XLSX.writeFile(prodWb, path.join(outDir, 'products-template.xlsx'));
console.log('✓ products-template.xlsx');

console.log(`\nFiles saved to: ${outDir}`);
