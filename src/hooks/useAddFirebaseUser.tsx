import { setDoc, doc } from "firebase/firestore";
import { useCallback } from "react";
import { UserType } from "../types/UserType";
import { db } from "../context/AuthProvider";

export type FirebaseUserDto = {
  googleAuthUserUid: string;
  firstName: string;
  lastName: string;
};

// Creates a new User in firebase db.
export const useAddFirebaseUser = () => {
  const addUserDoc = useCallback(
    async ({ googleAuthUserUid, firstName, lastName }: FirebaseUserDto) => {
      if (googleAuthUserUid) {
        try {
          // Empty new User Object, Google Auth Uid will be added as document id and as uid field in the user
          const newUserData: UserType = {
            uid: googleAuthUserUid,
            nameFirst: firstName,
            nameLast: lastName,
            bio: "",
            tags: [],
            livingInCity: "",
            homeCountry: [],
            countriesVisited: [],
            countriesBucketList: [],
            countriesLived: [],
          };

          // Create new user doc in firebase with uid from google auth
          await setDoc(doc(db, "users", googleAuthUserUid), {
            ...newUserData,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    },
    []
  );

  return { addUserDoc };
};
