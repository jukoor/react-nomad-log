import { useState } from "react";
import styles from "../styles/Map.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loadUserFromFirebase } from "../services/firebaseHelper";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toggleCountryDetailsOverlay } from "../store/appSlice";
import { addCountryVisited } from "../store/userSlice";
import "firebase/database";
import { db } from "../services/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Map } from "./Map";
import { SnackMessage, SnackMessageProps } from "./SnackMessage";

export const MapContainer = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.User.selectedUser);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const [snackbarOptions, setSnackbarOptions] = useState<SnackMessageProps>({
    message: "",
    severity: "success",
  });

  const dummyUserId = "8pVS1cDjBszgEUE0aug8";

  loadUserFromFirebase(dummyUserId);

  const handleAddCountryVisitedClick = () => {
    // Add new country to firebase and redux
    dispatch(addCountryVisited(selectedCountry?.cca2));

    const usersColRef = doc(db, "users", userData.uid);
    updateDoc(usersColRef, {
      countriesVisited: arrayUnion(selectedCountry?.cca2),
    })
      // @ts-ignore
      .then((response) => {
        setSnackbarOptions({
          message: `${selectedCountry?.flag}  ${selectedCountry?.name.common} successfully added.`,
          severity: "success",
        });
      }) // @ts-ignore
      .catch((error) => {
        setSnackbarOptions({
          message: `${selectedCountry?.flag}  ${selectedCountry?.name.common} could not be added.`,
          severity: "error",
        });
      });
  };

  const handleRemoveCountryVisitedClick = () => {};

  const MapButtons = () => {
    return (
      <div className={styles.mapActions}>
        {userData.countriesVisited.includes(selectedCountry?.cca2 || "") ? (
          <Button
            onClick={handleRemoveCountryVisitedClick}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Remove Country
          </Button>
        ) : (
          <Button
            onClick={handleAddCountryVisitedClick}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Country
          </Button>
        )}
        <Button
          onClick={() => dispatch(toggleCountryDetailsOverlay())}
          variant="outlined"
          startIcon={<FormatColorFillIcon />}
        >
          Add to Bucketlist
        </Button>
        <Button
          onClick={() => dispatch(toggleCountryDetailsOverlay())}
          variant="outlined"
          startIcon={<InfoOutlinedIcon />}
        >
          Country Info
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className={styles.mapContainer}>
        {selectedCountry && (
          <>
            <div className={styles.selectedCountryName}>
              {/* <Typography variant="h4">{selectedCountry?.name}</Typography> */}
            </div>
            <MapButtons />
          </>
        )}

        <Map />

        <SnackMessage
          message={snackbarOptions.message}
          severity={snackbarOptions.severity}
        />
      </div>
    </>
  );
};
