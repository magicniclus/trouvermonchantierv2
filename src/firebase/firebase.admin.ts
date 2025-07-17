import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Variable pour stocker l'instance de l'application
let adminApp: App;
let adminFirestore: Firestore;

export const initAdmin = (): App => {
  if (getApps().length === 0) {
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: 'trouvermonchantier.firebasestorage.app',
    });
  } else {
    adminApp = getApps()[0];
  }
  return adminApp;
};

// Fonction pour obtenir l'instance de Firestore
export const getAdminFirestore = (): Firestore => {
  if (!adminFirestore) {
    // S'assurer que l'app est initialisée
    if (!adminApp) {
      initAdmin();
    }
    adminFirestore = getFirestore();
  }
  return adminFirestore;
};

// Exporter adminDb pour la compatibilité avec le code existant
export const adminDb = getAdminFirestore();
