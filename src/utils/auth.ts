import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// Fonction pour générer un mot de passe aléatoire sécurisé
export function generateSecurePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Fonction pour créer un nouvel utilisateur dans Firebase
export async function createFirebaseUser(email: string, password: string) {
  try {
    console.log('Creating user with email:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created successfully:', userCredential.user.uid);
    
    return userCredential;
  } catch (error: any) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    throw error;
  }
}
