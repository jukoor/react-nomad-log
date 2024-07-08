import { setDoc, doc } from "firebase/firestore";
import { useCallback } from "react";
import { UserType } from "../types/UserType";
import { db } from "../context/AuthProvider";

// Creates a new User in firebase db.
export const useAddFirebaseUser = () => {
  const addUserDoc = useCallback(async (googleAuthUserUid: string) => {
    if (googleAuthUserUid) {
      try {
        // Empty new User Object, Google Auth Uid will be added as document id and as uid field in the user
        const newUserData: UserType = {
          uid: googleAuthUserUid,
          nameFirst: "",
          nameLast: "",
          bio: "",
          tags: [],
          livingInCity: "",
          homeCountry: [],
          countriesVisited: [],
          countriesBucketList: [],
          countriesLived: [],
        };

        // Create new user doc in firebase with uid from google auth
        const docRef = await setDoc(doc(db, "users", googleAuthUserUid), {
          ...newUserData,
        });

        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }, []);

  return { addUserDoc };
};
