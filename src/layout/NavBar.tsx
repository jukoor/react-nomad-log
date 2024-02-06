import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/NavBar.module.scss";
import { Avatar, LinearProgress } from "@mui/material";
import {
  setCountrySelectDialogOpen,
  toggleCountryDetailsOverlay,
  toggleMenuVisibility,
} from "../store/appSlice";
import { useSelector } from "react-redux";
import { CountrySliceType } from "../types/slices/CountrySliceType";
import { useAppDispatch } from "../hooks/hooks";

export const NavBar = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  const loading = useSelector(
    (state: CountrySliceType) => state.Country.loading
  );

  return (
    <Box className={styles.appBarComp} sx={{ flexGrow: 1 }}>
      <AppBar className={styles.appBar} position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOnClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Passport Pooper
          </Typography>

          <Button onClick={() => dispatch(toggleCountryDetailsOverlay())}>
            Country Info
          </Button>

          <Button
            className={styles.addBtnSpecial}
            onClick={() => dispatch(setCountrySelectDialogOpen(true))}
          >
            Add Location
          </Button>

          <Avatar
            sx={{ ml: "20px" }}
            alt="Profile"
            src="https://mui.com/static/images/avatar/2.jpg"
          />
        </Toolbar>
      </AppBar>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};
