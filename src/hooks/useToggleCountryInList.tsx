import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { setSnackbarOptions } from "../store/appSlice";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  addCountryBucketList,
  addCountryLived,
  addCountryVisited,
  removeCountryBucketList,
  removeCountryLived,
  removeCountryVisited,
} from "../store/userSlice";
import { db } from "../context/AuthProvider";

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
        const operation = action === "add" ? arrayUnion : arrayRemove;
        console.log(action);
        console.log(firebaseField);

        const messageSuccess =
          action === "add" ? "successfully added." : "successfully removed.";
        const messageError =
          action === "add" ? "could not be added." : "could not be removed.";

        // update firebase field
        const usersColRef = doc(db, "users", user.uid);
        try {
          await updateDoc(usersColRef, {
            [firebaseField]: operation(selectedCountry?.cca2),
          });

          // show success message
          dispatch(
            setSnackbarOptions({
              message: `${selectedCountry?.flag}${"  "}${
                selectedCountry?.name.common
              } ${messageSuccess}`,
              severity: "success",
            })
          );

          // update redux user
          if (firebaseField === "countriesVisited") {
            if (action === "add") {
              dispatch(addCountryVisited(selectedCountry?.cca2));
            } else {
              dispatch(removeCountryVisited(selectedCountry?.cca2));
            }
          } else if (firebaseField === "countriesBucketList") {
            if (action === "add") {
              dispatch(addCountryBucketList(selectedCountry?.cca2));
            } else {
              dispatch(removeCountryBucketList(selectedCountry?.cca2));
            }
          } else if (firebaseField === "countriesLived") {
            if (action === "add") {
              dispatch(addCountryLived(selectedCountry?.cca2));
            } else {
              dispatch(removeCountryLived(selectedCountry?.cca2));
            }
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
