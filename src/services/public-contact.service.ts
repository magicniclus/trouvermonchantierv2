import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export interface PublicContactFormData {
  prenom: string;
  nom: string;
  email: string;
  entreprise?: string;
  message: string;
}

export const submitPublicContactForm = async (data: PublicContactFormData): Promise<boolean> => {
  try {
    // Créer une référence à la collection des messages publics
    const publicMessagesRef = collection(db, "public_messages");
    
    const message = {
      ...data,
      status: "new",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    };

    await addDoc(publicMessagesRef, message);
    return true;
  } catch (error) {
    console.error("Error submitting public message:", error);
    return false;
  }
};
