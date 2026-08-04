#!/usr/bin/env node
/**
 * Create / update admin user in Firebase Authentication
 * Usage:
 *   node scripts/create-admin.js --username rohan --password MyPass123
 *   node scripts/create-admin.js  (interactive prompts)
 *
 * The admin email in Firebase Auth will be: <username>@vidhirajglobalimpex.com
 * Login to the admin panel with just the username (the @vidhirajglobalimpex.com is appended automatically).
 *
 * Prerequisites:
 *   cd scripts && npm install
 */

let admin;
try {
  admin = require('firebase-admin');
} catch {
  console.error('\n❌ firebase-admin not installed. Run: cd scripts && npm install\n');
  process.exit(1);
}

const path = require('path');
const readline = require('readline');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, '..', 'vidhi-raj-global-impex-firebase-adminsdk-fbsvc-f8876b30e2.json');

let serviceAccount;
try {
  serviceAccount = require(SERVICE_ACCOUNT_PATH);
} catch {
  console.error(`\n❌ Service account file not found at:\n   ${SERVICE_ACCOUNT_PATH}\n`);
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const auth = admin.auth();

function getArg(name) {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : null;
}

async function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

const db = admin.firestore();

async function createOrUpdateAdmin(username, password) {
  const email = `${username}@vidhirajglobalimpex.com`;
  let uid, created;
  try {
    const existing = await auth.getUserByEmail(email);
    await auth.updateUser(existing.uid, { password });
    uid = existing.uid;
    created = false;
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      const newUser = await auth.createUser({ email, password, displayName: username });
      uid = newUser.uid;
      created = true;
    } else {
      throw err;
    }
  }

  await db.collection('admins').doc(uid).set({
    username,
    email,
    uid,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    ...(created && { createdAt: admin.firestore.FieldValue.serverTimestamp() }),
  }, { merge: true });

  return { uid, created };
}

async function main() {
  console.log('\n🔐 Vidhiraj Admin — Create/Update Admin User in Firebase\n');

  let username = getArg('username');
  let password = getArg('password');

  if (!username) username = (await prompt('Username [admin]: ')) || 'admin';
  if (!password) {
    password = await prompt('Password: ');
    if (!password) {
      console.error('❌ Password cannot be empty.');
      process.exit(1);
    }
  }

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters.');
    process.exit(1);
  }

  try {
    const { uid, created } = await createOrUpdateAdmin(username, password);
    const action = created ? 'created' : 'updated';
    console.log(`\n✅ Admin user ${action} in Firebase Auth`);
    console.log(`   Username: ${username}`);
    console.log(`   Email:    ${username}@vidhirajglobalimpex.com`);
    console.log(`   Password: ${'*'.repeat(password.length)}`);
    console.log(`   UID:      ${uid}`);
    console.log('\n   You can now log in to the admin panel with your username and password.\n');
  } catch (err) {
    console.error('❌ Failed to create/update admin user:', err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
