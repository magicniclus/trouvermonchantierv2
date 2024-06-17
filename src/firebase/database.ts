// firebaseUtils.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import { get, push, ref, set, update } from "firebase/database";
import { auth, database } from "./firebase.config";

const date = new Date();
const dateString = date.toISOString().split("T")[0];
const path = `prospects/${dateString}`;
const newRef = push(ref(database, path));

const addProspect = (data: Record<string, any>): Promise<string> => {
  return new Promise((resolve, reject) => {
    set(newRef, data)
      .then(() => {
        resolve(newRef.key!);
      })
      .catch((error) => {
        console.error("Error adding prospect: ", error);
        reject("Failed to add prospect");
      });
  });
};

const getProspect = (uid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const prospectRef = ref(database, `prospects/${dateString}/${uid}`);

    get(prospectRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject("Prospect not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching prospect: ", error);
        reject("Failed to fetch prospect");
      });
  });
};

const updateProspect = (
  uid: string,
  data: Record<string, any>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const prospectRef = ref(database, `prospects/${dateString}/${uid}`);
    update(prospectRef, data)
      .then(() => resolve())
      .catch((error) => {
        console.error("Error updating prospect: ", error);
        reject("Failed to update prospect");
      });
  });
};

const transferProspectToClient = (uid: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const prospectData = await getProspect(uid);
      const clientRef = ref(database, `clients/${uid}`);
      await set(clientRef, prospectData);
      resolve();
    } catch (error) {
      console.error("Error transferring prospect to client: ", error);
      reject("Failed to transfer prospect to client");
    }
  });
};

const createFirebaseUser = (email: string, password: string): Promise<any> => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error creating Firebase user: ", error);
      throw new Error("Failed to create Firebase user");
    });
};

export {
  addProspect,
  createFirebaseUser,
  getProspect,
  transferProspectToClient,
  updateProspect,
};
