import { Button, Slide, Typography } from "@mui/material";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { db } from "../services/firebaseConfig";
import {
  setCountryActionsBar,
  toggleCountryDetailsOverlay,
} from "../store/appSlice";
import {
  addCountryBucketList,
  addCountryVisited,
  removeCountryBucketList,
  removeCountryVisited,
} from "../store/userSlice";
import { useEffect, useState } from "react";
import { SnackMessage } from "./SnackMessage";
import styles from "../styles/CountryActionBar.module.scss";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const CountryActionsBar = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.User.selectedUser);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const [startSlideAnim, setStartSlideAnim] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<any>({
    message: "",
    severity: "success",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  useEffect(() => {
    setStartSlideAnim(true);

    return () => {};
  }, []);

  type ActionType = "add" | "remove";
  type ListType = "visited" | "bucketList";

  const toggleCountryList = (action: ActionType, listType: ListType) => {
    const lists: Record<ListType, { firebaseField: string }> = {
      visited: {
        firebaseField: "countriesVisited",
      },
      bucketList: {
        firebaseField: "bucketList",
      },
    };

    const operation = action === "add" ? arrayUnion : arrayRemove;
    const messageSuccess =
      action === "add" ? "successfully added." : "successfully removed.";
    const messageError =
      action === "add" ? "could not be added." : "could not be removed.";

    const usersColRef = doc(db, "users", userData.uid);
    updateDoc(usersColRef, {
      [lists[listType].firebaseField]: operation(selectedCountry?.cca2),
    })
      // @ts-ignore
      .then((response) => {
        setSnackbarOptions({
          message: `${selectedCountry?.flag}${"  "}${
            selectedCountry?.name.common
          } ${messageSuccess}`,
          severity: "success",
        });
        showSnackbar();
      }) // @ts-ignore
      .catch((error) => {
        setSnackbarOptions({
          message: `${selectedCountry?.flag}  ${selectedCountry?.name.common} ${messageError}`,
          severity: "error",
        });
        showSnackbar();
      })
      .finally(() => {
        console.log("done");
      });

    dispatch(setCountryActionsBar(true));

    // switch (listType) {
    //   case "visited":
    //     switch (action) {
    //       case "add":
    //         dispatch(addCountryVisited(selectedCountry?.cca2));
    //         break;
    //       case "remove":
    //         dispatch(removeCountryVisited(selectedCountry?.cca2));
    //         break;
    //     }
    //     break;
    //   case "bucketList":
    //     switch (action) {
    //       case "add":
    //         dispatch(addCountryBucketList(selectedCountry?.cca2));
    //         break;
    //       case "remove":
    //         dispatch(removeCountryBucketList(selectedCountry?.cca2));
    //         break;
    //     }
    // break;
    // }
  };

  const MapButtons = () => {
    return (
      <div className={styles.mapActions}>
        {userData.countriesVisited.includes(selectedCountry?.cca2 || "") ? (
          <Button
            onClick={() => {
              toggleCountryList("remove", "visited");
            }}
            variant="contained"
            startIcon={<RemoveCircleOutlineIcon />}
          >
            Remove
          </Button>
        ) : (
          <Button
            onClick={() => {
              toggleCountryList("add", "visited");
            }}
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            Visited
          </Button>
        )}
        {userData.bucketList.includes(selectedCountry?.cca2 || "") ? (
          <Button
            onClick={() => {
              toggleCountryList("remove", "bucketList");
            }}
            variant="outlined"
            startIcon={<FormatColorFillIcon />}
          >
            Remove Bucket
          </Button>
        ) : (
          <Button
            onClick={() => {
              toggleCountryList("add", "bucketList");
            }}
            variant="outlined"
            startIcon={<FormatColorFillIcon />}
          >
            Add Bucket
          </Button>
        )}
        <Button
          onClick={() => dispatch(toggleCountryDetailsOverlay())}
          variant="outlined"
          startIcon={<InfoOutlinedIcon />}
        >
          Details
        </Button>
      </div>
    );
  };

  return (
    <>
      {selectedCountry && (
        <>
          <Slide
            direction="down"
            in={startSlideAnim}
            mountOnEnter
            unmountOnExit
          >
            <div className={styles.countryActionsBar}>
              <div>
                <Button onClick={() => dispatch(setCountryActionsBar(true))}>
                  Back to Map
                </Button>
              </div>
              <div>
                <Typography variant="h6" component="span">
                  {selectedCountry?.flag} {selectedCountry?.name.common}
                </Typography>
              </div>
              <div>
                <MapButtons />
              </div>
            </div>
          </Slide>

          <SnackMessage
            message={snackbarOptions.message}
            severity={snackbarOptions.severity}
            open={snackbarOpen}
            onClose={handleSnackbarClose}
          />
        </>
      )}
    </>
  );
};
