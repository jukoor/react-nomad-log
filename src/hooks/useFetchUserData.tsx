// src/hooks/useFetchUserData.ts
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { UserType } from "../types/UserType";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setSelectedUser, setLoading } from "../store/userSlice";

export const useFetchUserData = (userId: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserDataFromFirestore = async () => {
      if (userId) {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(setSelectedUser(docSnap.data() as UserType));
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    getUserDataFromFirestore();
  }, [userId, dispatch]);
};
