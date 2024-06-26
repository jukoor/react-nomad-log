import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/NavBar.module.scss";
import { LinearProgress, Link } from "@mui/material";
import { toggleMenuVisibility } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import LoginButton from "../components/global/LoginButton";

import { AvatarMenu } from "./AvatarMenu";

export const NavBar = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.User);
  const countryData = useAppSelector((state) => state.Country);

  const openSidebarMenu = () => {
    dispatch(toggleMenuVisibility());
  };

  return (
    <Box className={styles.appBarComp}>
      <AppBar className={styles.appBar} position="fixed" color="transparent">
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
            <Link
              className={styles.appTitle}
              href="/"
              underline="none"
              color="inherit"
            >
              <span className={styles.appName}>Nomad Log</span>
              <span className={styles.appSlogan}>
                Your Personal Travel Tracker
              </span>
            </Link>
          </Typography>

          {userData.isLoggedIn ? <AvatarMenu /> : <LoginButton />}
        </Toolbar>
      </AppBar>

      {countryData.loading && (
        <Box className={styles.navbarLoading}>
          <LinearProgress color="secondary" sx={{ backgroundColor: "black" }} />
        </Box>
      )}
    </Box>
  );
};
