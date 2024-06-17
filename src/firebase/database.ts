import { push, ref, set } from "firebase/database";
import { database } from "./firebase.config";

const addProspect = (data: Record<string, any>): Promise<string> => {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const dateString = date.toISOString().split("T")[0];
    const path = `prospects/${dateString}`;
    const newRef = push(ref(database, path));

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

export { addProspect };
