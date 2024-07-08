import { Button } from "@mui/material";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import { ToggleCountryPopup } from "./ToggleCountryPopup";
import { useAppDispatch } from "../../hooks/reduxHooks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export const CountryActionButtons = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button
        onClick={() => dispatch(toggleCountryDetailsOverlay())}
        startIcon={<InfoOutlinedIcon />}
      >
        Details
      </Button>
      {isAuthenticated ? <ToggleCountryPopup /> : null}
    </div>
  );
};
