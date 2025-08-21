// firebaseUtils.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase.config";

const addProspect = async (data: Record<string, any>): Promise<string> => {
  try {
    console.log("🔥 [Firestore] Début addProspect");
    console.log("🔥 [Firestore] Database object:", db);
    console.log("🔥 [Firestore] Data to save:", data);
    
    // Ajouter à la collection prospects
    console.log("🔥 [Firestore] Adding to prospects collection...");
    
    const docRef = await addDoc(collection(db, "prospects"), data);
    console.log("🔥 [Firestore] Document written with ID:", docRef.id);
    
    return docRef.id;
  } catch (error: any) {
    console.error("🔥 [Firestore] Error adding document:", error);
    console.error("🔥 [Firestore] Error code:", error.code);
    console.error("🔥 [Firestore] Error message:", error.message);
    throw new Error(`Failed to add prospect: ${error.message}`);
  }
};

const getProspect = async (uid: string): Promise<any> => {
  try {
    const docRef = doc(db, "prospects", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Prospect not found");
    }
  } catch (error: any) {
    console.error("Error fetching prospect: ", error);
    throw new Error("Failed to fetch prospect");
  }
};

const updateProspect = async (
  uid: string,
  data: Record<string, any>
): Promise<void> => {
  try {
    const docRef = doc(db, "prospects", uid);
    await updateDoc(docRef, data);
  } catch (error: any) {
    console.error("Error updating prospect: ", error);
    throw new Error("Failed to update prospect");
  }
};

const transferProspectToClient = async (
  oldUid: string,
  newUid: string
): Promise<void> => {
  try {
    const prospectData = await getProspect(oldUid);
    const date = new Date();
    const formattedDate = date.toISOString();

    const clientData = {
      ...prospectData,
      createdAt: formattedDate,
    };

    await addDoc(collection(db, "clients"), clientData);
  } catch (error: any) {
    console.error("Error transferring prospect to client: ", error);
    throw new Error("Failed to transfer prospect to client");
  }
};

const createFirebaseUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential; // Retourner tout le userCredential, pas seulement user
  } catch (error) {
    console.error("Error creating Firebase user: ", error);
    throw new Error("Failed to create Firebase user");
  }
};

export {
  addProspect,
  createFirebaseUser,
  getProspect,
  transferProspectToClient,
  updateProspect,
};
