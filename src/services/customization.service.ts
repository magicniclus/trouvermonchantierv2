import { db } from "@/firebase/firebase.config";
import { Customization } from "@/types/client";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

export const getCustomization = async (userId: string): Promise<Customization | null> => {
  try {
    console.log("Getting customization for user:", userId);
    const customizationRef = doc(db, "clients", userId);
    const docSnap = await getDoc(customizationRef);
    
    if (docSnap.exists()) {
      console.log("Customization data found:", docSnap.data());
      return docSnap.data() as Customization;
    }
    console.log("No customization data found");
    return null;
  } catch (error) {
    console.error("Error getting customization:", error);
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }
    return null;
  }
};

export const subscribeToCustomization = (
  userId: string,
  callback: (data: Customization | null) => void
) => {
  console.log("Setting up subscription for user:", userId);
  const customizationRef = doc(db, "clients", userId);
  
  return onSnapshot(customizationRef, (docSnap) => {
    console.log("Snapshot received:", docSnap.exists());
    if (docSnap.exists()) {
      const data = docSnap.data() as Customization;
      console.log("Snapshot data:", data);
      callback(data);
    } else {
      console.log("No data in snapshot");
      callback(null);
    }
  }, (error) => {
    console.error("Snapshot error:", error);
  });
};

export const updateCustomization = async (
  userId: string,
  data: Customization
): Promise<boolean> => {
  try {
    const customizationRef = doc(db, "clients", userId);
    await setDoc(customizationRef, {
      ...data,
      updated_at: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error updating customization:", error);
    return false;
  }
};
