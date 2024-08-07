import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/NavBar.module.scss";
import { LinearProgress } from "@mui/material";
import { toggleMenuVisibility } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { AvatarMenu } from "./AvatarMenu";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const dispatch = useAppDispatch();

  const countryData = useAppSelector((state) => state.Country);

  const { isAuthenticated, isLoading } = useContext(AuthContext);

  const openSidebarMenu = () => {
    dispatch(toggleMenuVisibility());
  };

  return (
    <Box className={styles.appBarComp}>
      <AppBar
        className={
          location.pathname === "/"
            ? `${styles.appBar} ${styles.home}`
            : styles.appBar
        }
        position="fixed"
        color="transparent"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openSidebarMenu}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink className={styles.appTitle} to="/" color="inherit">
              <span className={styles.appName}>Nomad Log</span>
              <span className={styles.appSlogan}>
                Your Personal Travel Tracker
              </span>
            </NavLink>
          </Typography>

          {isAuthenticated ? <AvatarMenu /> : null}
        </Toolbar>
      </AppBar>

      {countryData.loading || isLoading ? (
        <Box className={styles.navbarLoading}>
          <LinearProgress color="secondary" sx={{ backgroundColor: "black" }} />
        </Box>
      ) : null}
    </Box>
  );
};
