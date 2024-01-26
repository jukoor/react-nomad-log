import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/NavBar.module.scss";
import CountrySearchDropdown from "../components/CountrySearchDropdown";
import Menu from "../Menu";
import { Avatar, LinearProgress } from "@mui/material";
import {
  setCountrySelectDialogOpen,
  toggleMenuVisibility,
} from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { CountryData } from "../store/countrySlice";

interface CountryState {
  Country: CountryData;
}

export const NavBar = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  interface CountryState {
    Country: CountryData;
  }

  const loading = useSelector((state: CountryState) => state.Country.loading);

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

          {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Menu />
          </Box> */}

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

          {/* <CountrySearchDropdown /> */}
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
