import { auth, db } from "@/firebase/firebase.config";
import { Message } from "@/types/message";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

export const submitContactForm = async (data: Omit<Message, "id" | "created_at" | "updated_at" | "status" | "user_id">): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to submit a message");
    }

    // Créer une référence à la sous-collection messages de l'utilisateur
    const userMessagesRef = collection(db, `messages/${user.uid}/messages`);
    
    const message: Omit<Message, "id"> = {
      ...data,
      user_id: user.uid,
      status: "new",
      created_at: serverTimestamp() as unknown as string,
      updated_at: serverTimestamp() as unknown as string,
    };

    await addDoc(userMessagesRef, message);
    return true;
  } catch (error) {
    console.error("Error submitting message:", error);
    return false;
  }
};

// Récupérer tous les messages d'un utilisateur
export const getUserMessages = async (userId: string): Promise<Message[]> => {
  try {
    const userMessagesRef = collection(db, `messages/${userId}/messages`);
    const querySnapshot = await getDocs(userMessagesRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
  } catch (error) {
    console.error("Error getting user messages:", error);
    return [];
  }
};
