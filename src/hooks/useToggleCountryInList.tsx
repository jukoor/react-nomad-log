import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../services/firebaseConfig";
import { setSnackbarOptions } from "../store/appSlice";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  setCountryBucketListTemp,
  setCountryLivedTemp,
  setCountryVisitedTemp,
} from "../store/userSlice";

type ActionType = "add" | "remove";
export type CountryList =
  | "countriesVisited"
  | "countriesLived"
  | "countriesBucketList";

// Toggles (add/remove) Country to visited, lived or bucket list
export const useToggleCountryInList = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const toggleCountryInList = useCallback(
    async (action: ActionType, firebaseField: CountryList) => {
      if (user && selectedCountry) {
        console.log(action);
        console.log(firebaseField);

        const operation = action === "add" ? arrayUnion : arrayRemove;

        const messageSuccess =
          action === "add" ? "successfully added." : "successfully removed.";
        const messageError =
          action === "add" ? "could not be added." : "could not be removed.";

        const usersColRef = doc(db, "users", user.uid);
        try {
          await updateDoc(usersColRef, {
            [firebaseField]: operation(selectedCountry?.cca2),
          });

          dispatch(
            setSnackbarOptions({
              message: `${selectedCountry?.flag}${"  "}${
                selectedCountry?.name.common
              } ${messageSuccess}`,
              severity: "success",
            })
          );
          console.log("success");

          // update redux user
          if (firebaseField === "countriesVisited") {
            dispatch(setCountryVisitedTemp(selectedCountry?.cca2));
          } else if (firebaseField === "countriesBucketList") {
            dispatch(setCountryBucketListTemp(selectedCountry?.cca2));
          } else if (firebaseField === "countriesLived") {
            dispatch(setCountryLivedTemp(selectedCountry?.cca2));
          }
        } catch (error) {
          dispatch(
            setSnackbarOptions({
              message: `${selectedCountry?.flag}${"  "}${
                selectedCountry?.name.common
              } ${messageError}`,
              severity: "error",
            })
          );
        }
      }
    },
    [user, selectedCountry]
  );

  return { toggleCountryInList };
};
