import { Button } from "@mui/material";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import { ToggleCountryPopup } from "./ToggleCountryPopup";
import { useAppDispatch } from "../../hooks/reduxHooks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

import styles from "../../styles/CountryActionButtons.module.scss";

export const CountryActionButtons = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className={isAuthenticated ? styles.auth : ""}>
      <Button
        className={styles.actionBtn}
        onClick={() => dispatch(toggleCountryDetailsOverlay())}
        startIcon={<InfoOutlinedIcon />}
      >
        <span className={styles.label}>Details</span>
      </Button>
      {isAuthenticated ? <ToggleCountryPopup /> : null}
    </div>
  );
};
