import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const useCheckIfFirebaseUserExists = (uid: string) => {
  const userRef = doc(db, "users", uid);
  const checkIfFirebaseUserExists = async (): Promise<boolean> => {
    try {
      const docSnap = await getDoc(userRef);
      return docSnap.exists();
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return false;
    }
  };

  return checkIfFirebaseUserExists;
};
