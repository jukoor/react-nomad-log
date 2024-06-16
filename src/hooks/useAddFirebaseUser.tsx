import { setDoc, doc } from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../services/firebaseConfig";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";

// Creates a new User in firebase db. This happens after the first time Sign In/Up with Google Auth Provider
export const useAddFirebaseUser = () => {
  const navigate = useNavigate();

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

        navigate("/settings");

        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }, []);

  return { addUserDoc };
};
