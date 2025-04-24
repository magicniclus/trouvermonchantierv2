import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "trouvermonchantier.firebaseapp.com",
  databaseURL: "https://trouvermonchantier-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trouvermonchantier",
  storageBucket: "trouvermonchantier.firebasestorage.app",
  messagingSenderId: "637542921551",
  appId: "1:637542921551:web:8c9b360a3fa5764993c13a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, database, db, storage };
