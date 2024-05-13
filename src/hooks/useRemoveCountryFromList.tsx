import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch } from "./reduxHooks";
import { setSnackbarOptions } from "../store/appSlice";
import { CountryCca2Type } from "../types/CountryCca2Type";

// Updates User Profile in firebase storage, needs the full UserType object with values
export const useRemoveCountryFromList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const updateCountryList = useCallback(
    async (
      list: "countriesVisited" | "countriesLived" | "countriesBucketList",
      values: CountryCca2Type[]
    ) => {
      if (user) {
        setLoading(true);
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        try {
          await updateDoc(userDocRef, { [list]: values });
          setLoading(false);
          console.log("User updated successfully");

          // show success snackbar
          dispatch(
            setSnackbarOptions({
              open: true,
              message: "List item successfully removed.",
              severity: "success",
            })
          );
        } catch (error) {
          setError(error as Error);
          setLoading(false);
          dispatch(
            setSnackbarOptions({
              open: true,
              message: "List could not be updated. Please retry later.",
              severity: "error",
            })
          );
          console.error("Error updating user document:", error);
        }
      }
    },
    [user]
  );

  return { updateCountryList, loading, error };
};
