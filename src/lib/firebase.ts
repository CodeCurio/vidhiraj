import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBX0DWKfmX3tYu0wZgbcv5CiGnQZncEfl8",
  authDomain: "vidhi-raj-global-impex.firebaseapp.com",
  projectId: "vidhi-raj-global-impex",
  storageBucket: "vidhi-raj-global-impex.firebasestorage.app",
  messagingSenderId: "766077947417",
  appId: "1:766077947417:web:a587e5277283a21c466488"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
