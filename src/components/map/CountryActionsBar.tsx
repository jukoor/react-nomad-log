import { Button, Slide, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setCountryActionsBar,
  toggleCountryDetailsOverlay,
} from "../../store/appSlice";
import { useEffect, useState } from "react";
import styles from "../../styles/CountryActionBar.module.scss";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useToggleCountryInList } from "../../hooks/useToggleCountryInList";
import { CountryCca2Type } from "../../types/CountryCca2Type";

export const CountryActionsBar = () => {
  const dispatch = useAppDispatch();

  const { toggleCountryInList } = useToggleCountryInList();

  const userData = useAppSelector((state) => state.User.selectedUser);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const [startSlideAnim, setStartSlideAnim] = useState(false);

  useEffect(() => {
    setStartSlideAnim(true);

    return () => {};
  }, []);

  const MapButtons = () => {
    return (
      <div className={styles.mapActions}>
        {userData.countriesVisited?.includes(
          (selectedCountry?.cca2 as CountryCca2Type) || ""
        ) ? (
          <Button
            onClick={() => {
              toggleCountryInList("remove", "visited");
            }}
            variant="contained"
            startIcon={<RemoveCircleOutlineIcon />}
          >
            Remove
          </Button>
        ) : (
          <Button
            onClick={() => {
              toggleCountryInList("add", "visited");
            }}
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            Visited
          </Button>
        )}
        {userData.countriesBucketList?.includes(
          (selectedCountry?.cca2 as CountryCca2Type) || ""
        ) ? (
          <Button
            onClick={() => {
              toggleCountryInList("remove", "bucketList");
            }}
            variant="outlined"
            startIcon={<FormatColorFillIcon />}
          >
            Remove Bucket
          </Button>
        ) : (
          <Button
            onClick={() => {
              toggleCountryInList("add", "bucketList");
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
                  {selectedCountry?.flag} {selectedCountry?.name.official}
                </Typography>
              </div>
              <div>
                <MapButtons />
                {/* <ButtonGroup variant="outlined" aria-label="Basic button group">
                  <Button>Visited</Button>
                  <Button>Lived</Button>
                  <Button>To Do</Button>
                </ButtonGroup> */}
              </div>
            </div>
          </Slide>
        </>
      )}
    </>
  );
};
