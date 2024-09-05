import { Button, Slide, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import styles from "../../styles/CountryActionBar.module.scss";
import { CountryActionButtons } from "./CountryActionButtons";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { setCountryDetailView } from "../../store/appSlice";
import btnStyles from "../../styles/CountryActionButtons.module.scss";

export const CountryActionsBar = () => {
  const dispatch = useAppDispatch();

  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );
  const countryDetailView = useAppSelector(
    (state) => state.App.countryDetailView
  );

  const [startSlideAnim, setStartSlideAnim] = useState(false);

  useEffect(() => {
    setStartSlideAnim(true);

    return () => {};
  }, []);

  return (
    <>
      {countryDetailView === false && (
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
                  className={btnStyles.actionBtn}
                  onClick={() => {
                    dispatch(setCountryDetailView(true));
                  }}
                  startIcon={<ArrowCircleLeftOutlinedIcon />}
                >
                  <span className={btnStyles.label}>Back to Map</span>
                </Button>
              </div>
              <div className={`${styles.cell} ${styles.center}`}>
                <Typography variant="h6" component="span">
                  {selectedCountry?.flag}{" "}
                  <span className={styles.countryName}>
                    {selectedCountry?.name.common}
                  </span>
                </Typography>
              </div>
              <div className={`${styles.cell} ${styles.right}`}>
                <CountryActionButtons />
              </div>
            </div>
          </Slide>
        </>
      )}
    </>
  );
};
