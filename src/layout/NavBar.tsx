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
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/global/Login";

import { AvatarMenu } from "./AvatarMenu";

export const NavBar = () => {
  const dispatch = useAppDispatch();

  const auth = getAuth();

  const [user] = useAuthState(auth);
  const userData = useAppSelector((state) => state.User);
  const countryData = useAppSelector((state) => state.Country);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(userData.loading || countryData.loading);
  }, [userData.loading, countryData.loading]);

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  return (
    <Box className={`${styles.appBarComp} appBar`} sx={{ flexGrow: 1 }}>
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

          {user ? <AvatarMenu /> : <Login />}
        </Toolbar>
      </AppBar>

      {loading && (
        <Box className={styles.navbarLoading}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};
