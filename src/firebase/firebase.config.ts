import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "trouvermonchantier.firebaseapp.com",
  databaseURL:
    "https://trouvermonchantier-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trouvermonchantier",
  storageBucket: "trouvermonchantier.appspot.com",
  messagingSenderId: "637542921551",
  appId: "1:637542921551:web:8c9b360a3fa5764993c13a",
};

// Initialisez Firebase
const app = initializeApp(firebaseConfig);

// Exportez l'instance de la base de données
const database = getDatabase(app);
export { database };
