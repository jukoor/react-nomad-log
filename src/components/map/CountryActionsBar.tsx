import { Button, Slide, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setCountryActionsBar,
  toggleCountryDetailsOverlay,
} from "../../store/appSlice";
import { useEffect, useState } from "react";
import styles from "../../styles/CountryActionBar.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToggleCountryPopup } from "./ToggleCountryPopup";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const CountryActionsBar = () => {
  const dispatch = useAppDispatch();

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
        <Button
          onClick={() => dispatch(toggleCountryDetailsOverlay())}
          variant="outlined"
          startIcon={<InfoOutlinedIcon />}
        >
          Details
        </Button>

        <ToggleCountryPopup />
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
              <div className={styles.cell}>
                <Button
                  onClick={() => dispatch(setCountryActionsBar(true))}
                  variant="outlined"
                  startIcon={<ArrowBackIosIcon />}
                >
                  Back to Map
                </Button>
              </div>
              <div className={`${styles.cell} ${styles.center}`}>
                <Typography variant="h6" component="span">
                  {selectedCountry?.flag} {selectedCountry?.name.common}
                </Typography>
              </div>
              <div className={`${styles.cell} ${styles.right}`}>
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
