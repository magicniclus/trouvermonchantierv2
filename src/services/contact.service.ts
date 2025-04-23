import { db } from "@/firebase/firebase.config";
import { Contact } from "@/types/contact";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const submitContactForm = async (data: Omit<Contact, "id" | "created_at" | "updated_at" | "status">): Promise<boolean> => {
  try {
    const contactRef = collection(db, "contacts");
    
    const contact: Omit<Contact, "id"> = {
      ...data,
      status: "new",
      created_at: serverTimestamp() as unknown as string,
      updated_at: serverTimestamp() as unknown as string,
    };

    await addDoc(contactRef, contact);
    return true;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return false;
  }
};
