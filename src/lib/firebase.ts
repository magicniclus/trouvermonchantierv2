// Import Firebase instance from centralized config
import type { FirebaseApp } from 'firebase/app';
import { firebaseApp, db, auth, storage } from '../firebase/firebase.config';

// Re-export for backward compatibility
const app: FirebaseApp = firebaseApp;
export { app, db, auth, storage };
