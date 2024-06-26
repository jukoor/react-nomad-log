import { Button, Slide, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setCountryActionsBar } from "../../store/appSlice";
import { useEffect, useState } from "react";
import styles from "../../styles/CountryActionBar.module.scss";
import { CountryActionButtons } from "./CountryActionButtons";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

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
                  startIcon={<ArrowCircleLeftOutlinedIcon />}
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
                <CountryActionButtons />
              </div>
            </div>
          </Slide>
        </>
      )}
    </>
  );
};
