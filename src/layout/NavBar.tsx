import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/NavBar.module.scss";
import {
  Avatar,
  Button,
  LinearProgress,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { toggleMenuVisibility } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";
import { getFirstLettersFromName } from "../utils/appUtils";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = getAuth();

  const [user] = useAuthState(auth);
  const userData = useAppSelector((state) => state.User);
  const countryData = useAppSelector((state) => state.Country);
  const selectedUser = userData.selectedUser;
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState<null | HTMLElement>(null);
  const avatarMenuOpen = Boolean(avatar);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);
    setAvatar(event.currentTarget);
  };
  const handleClose = () => {
    setAvatar(null);
  };

  useEffect(() => {
    setLoading(userData.loading || countryData.loading);
  }, [userData.loading, countryData.loading]);

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  const handleMenuProfileClick = () => {
    navigate("/profile/8pVS1cDjBszgEUE0aug8");
  };

  const handleMenuSettingseClick = () => {
    navigate("/settings");
  };

  const handleMenuLogoutClick = () => {
    navigate("/logout");
  };

  const AvatarMenu = () => {
    return (
      <>
        <Button onClick={handleAvatarClick}>
          <Avatar
            className={styles.avatar}
            {...getFirstLettersFromName(
              `${selectedUser.nameFirst} ${selectedUser.nameLast}`
            )}
          />
        </Button>
        <Menu anchorEl={avatar} open={avatarMenuOpen} onClose={handleClose}>
          <MenuItem onClick={handleMenuProfileClick}>
            <ListItemIcon>
              <InsertEmoticonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuSettingseClick}>
            <ListItemIcon>
              <ToggleOnOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuLogoutClick}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
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
              <Link
                className={styles.appTitle}
                href="/"
                underline="none"
                color="inherit"
              >
                <span className={styles.appName}>Nomad Log</span>
                <span className={styles.appSlogan}>
                  Your personal Travel Tracker
                </span>
              </Link>
            </Typography>

            {user && <AvatarMenu />}

            {user ? (
              <Button onClick={() => signOut(auth)}>Logout</Button>
            ) : (
              <Login />
            )}
          </Toolbar>
        </AppBar>

        {loading && (
          <Box className={styles.navbarLoading}>
            <LinearProgress />
          </Box>
        )}
      </Box>
    </>
  );
};
