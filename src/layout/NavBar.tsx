import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/NavBar.module.scss";
import { Avatar, Button, LinearProgress, Link, Tooltip } from "@mui/material";
import { setSnackbarOptions, toggleMenuVisibility } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const [user] = useAuthState(auth);

  const userData = useAppSelector((state) => state.User);
  const countryData = useAppSelector((state) => state.Country);
  const selectedUser = userData.selectedUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(userData.loading || countryData.loading);
  }, [userData.loading, countryData.loading]);

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  // Display first letter of first and last name as Avatar
  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

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
            <Link href="/" underline="none" color="inherit">
              Nomad Map
            </Link>
          </Typography>

          <Button
            onClick={() =>
              dispatch(
                setSnackbarOptions({ message: "Hi Jual", severity: "error" })
              )
            }
          >
            Snack
          </Button>

          {selectedUser.nameFirst.length > 0 && (
            <NavLink
              to="/profile/8pVS1cDjBszgEUE0aug8"
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.link}` : `${styles.link}`
              }
            >
              <Tooltip title="Profile" arrow placement="left">
                <Avatar
                  className={styles.avatar}
                  {...stringAvatar(
                    `${selectedUser.nameFirst} ${selectedUser.nameLast}`
                  )}
                />
              </Tooltip>
            </NavLink>
          )}

          {!user ? (
            <Login />
          ) : (
            <Button onClick={() => signOut(auth)}>Logout</Button>
          )}
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
