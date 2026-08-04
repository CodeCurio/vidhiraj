/**
 * Downloads all files from Firebase Storage "products/" folder to local folder.
 * Run: node scripts/download-product-images.js
 * Output: ./downloaded-images/<original-filename>
 */

const adminRoot = require('path').resolve(__dirname, '..', 'admin', 'node_modules');
const { initializeApp, cert, getApps } = require(adminRoot + '/firebase-admin/lib/app/index.js');
const { getStorage } = require(adminRoot + '/firebase-admin/lib/storage/index.js');
const fs = require('fs');
const path = require('path');

// ── init ──────────────────────────────────────────────────────────────────────

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: 'vidhi-raj-global-impex',
      clientEmail: 'firebase-adminsdk-fbsvc@vidhi-raj-global-impex.iam.gserviceaccount.com',
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDgBjVqdbVvY02P\nMqjtLKC93+20GcthZmRtoGJkNvOL198ihoThUsU6Pmv0p/x7YaJ+WwzGFabkQwWx\nI+XZrm3QPx+P+Y3ot/XPr6k2RRRdD9nesTqrpRQ1aRHNtjB3Si4vsr5HrajgPDLH\n6cCcdZ+LuZkDeGpRIMQHvDUoNlhQyMhE5uHCofrEF64FaYH4ecBfiQtR2+fhdhln\nKmPwwZ2gfmiGDmiLpRYMaHCOdMVrQqXM/XUCqxutgWx/PZdOXerS9OHlmVie7M5a\nY/ufvyCJIitTOPhzOUXXjROmIjbHYtrzQVR2BzJwc3ONB6MVcSbAdZ+6sHjtuDoJ\nw+pa/QP7AgMBAAECggEAEsw354wjTR/vg6BexVv/zD7sfWFxYTsMGpjLzhiVp2Ur\nRNngb4nC9pKt+1RXNBaADIs2T1lvbMA6S4q1auZ0h3YB1NJot8or4aFImRRYfkCU\nvwIZvV+3ijhxSn91ofotqvScJnvqFjq8O23KquDsd3cmNut/5vkmtHbJ8msGTmzf\ns5L4pb8KHA4rkc319DMGF2pKHXZqtXFabENzRjFFLb+bonKD0dBDQFP8s+Ik8BPH\ng5wPlHgSR0yB9jkdyc6c9mF9UM+QMN+fkbIVMRvYvetBYLtwEbRG5EPBsid+io5Z\n2nOoDeuwG6+PTz5Vs68Yb7GxJ6HVOJKKGrDp+ynFyQKBgQD7KMv/S5NFl/mlsHjK\n7Wooh6z7GfFMeQCXrEfecFtAGb7l/WaFfQUsQGFcN7UW7BmepK0qM5iZYQgelMbI\nOsh1S+s69TlbVRlk8/CtKpP06Mr89rUdLxc5CJow8P4fkUG8BuWhkSEg4jLdSJXY\nhHVDRiKIi2Q4sI5bpD08kqbeIwKBgQDkV4dtUDVcWn5t4SewctXSzgbt1d4bhPI+\nIV5Li3gzcShb/ldinnXXoSg/JmFMByFJyXuRyNe9jPOGCimnxDdlHDmnc9xC4Ss+\nUwPzSoxLLTNoPgQoHiNHemcLLm60ioLE1nxe4PghLg8p+Nwarq2oxPct/vQiRXIO\nQeGsV/ZkSQKBgDijU5WHundYNUELEcJZVbY8GmMpz4N6SgrqG+7qkXlcFPOSeFsj\n/VWkUxBTs6+uoHxpEG/S4Ne9zPHwhP9EWk4xR6OtBzk0cJyWcjDqyCDTmmr/S4qA\nQxFmgjcFMZl2zUcUmxYbP0hGGkhShRAllrgMCd+W54vtLL03xWNygtTXAoGAeHKb\nY1Qt8ZtimX9tOiw5EkvPZ+GqmYWVaqSbYuoc67XC/lO5sLG5o5bE7hrGtB4Gty9q\n2UnCU6BoTMpLks10EwfCecwp4bV45BVSPiGSw40CUvhzpN3Q6kFs3X8Osnll5YLm\nc/3jpUzwfslhAUonHKFZaY/VI8bSFSc3bXuw4tECgYB6RjhRvahMAPPOUMWvPaiP\nHZ0NzCSmbUTxDa/CNQbTFnem4yNbOIQlIAHYJ4yFrrQFc6M8W/aIrx2Nz8x4kc6O\nwoXcapk3dqxAyy+IlLeuzF9OLB2+krtAKrmEMnFhFgcMCibMkMF305NVkJPB2uyT\n7jBGf4eOdQOHGEyX3bLQMg==\n-----END PRIVATE KEY-----\n",
    }),
    storageBucket: 'vidhi-raj-global-impex.firebasestorage.app',
  });
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const outDir = path.join(__dirname, '..', 'downloaded-images');
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`Output folder: ${outDir}\n`);

  const bucket = getStorage().bucket();

  // List all files under products/
  console.log('Listing files in storage bucket "products/" ...');
  const [files] = await bucket.getFiles({ prefix: 'products/' });

  // Filter out folder placeholders (size 0 or ends with /)
  const imageFiles = files.filter(f => !f.name.endsWith('/'));
  console.log(`Found ${imageFiles.length} files\n`);

  if (!imageFiles.length) {
    console.log('No files found under products/. Check the bucket prefix.');
    process.exit(0);
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of imageFiles) {
    // Flatten path: products/abc/foo.jpg → products_abc_foo.jpg
    const safeName = file.name.replace(/\//g, '_');
    const destPath = path.join(outDir, safeName);

    if (fs.existsSync(destPath)) {
      console.log(`  [exists] ${safeName}`);
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`  Downloading ${file.name} ... `);
      await file.download({ destination: destPath });
      const size = (fs.statSync(destPath).size / 1024).toFixed(1);
      console.log(`done (${size} KB)`);
      downloaded++;
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`Files found      : ${imageFiles.length}`);
  console.log(`Downloaded       : ${downloaded}`);
  console.log(`Skipped/exists   : ${skipped}`);
  console.log(`Failed           : ${failed}`);
  console.log(`Saved to         : ${outDir}`);

  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
