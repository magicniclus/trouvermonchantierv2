import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZLlEQ-UIwZtjVpCWuuIfxp1Hj78ypXKk",
  authDomain: "trouvermonchantier.firebaseapp.com",
  databaseURL: "https://trouvermonchantier-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trouvermonchantier",
  storageBucket: "trouvermonchantier.firebasestorage.app",
  messagingSenderId: "637542921551",
  appId: "1:637542921551:web:8c9b360a3fa5764993c13a",
};

// Initialize Firebase - Pattern Singleton
let firebaseApp: FirebaseApp;

if (typeof window !== 'undefined') { // Vérifier si nous sommes côté client
  firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0] as FirebaseApp;
} else {
  // Côté serveur, vérifier si l'app existe déjà
  firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0] as FirebaseApp;
}

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, database, db, storage };
