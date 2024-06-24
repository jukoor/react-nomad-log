import { Button } from "@mui/material";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import { ToggleCountryPopup } from "./ToggleCountryPopup";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const CountryActionButtons = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.User.isLoggedIn);

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
