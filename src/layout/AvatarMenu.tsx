import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAppSelector } from "../hooks/reduxHooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Skeleton } from "@mui/material";

export const AvatarMenu = () => {
  const { logoutUser } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const auth = getAuth();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.User);
  const userInitials = `${userData.selectedUser?.nameFirst.charAt(
    0
  )}${userData.selectedUser?.nameLast.charAt(0)}`;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoProfile = () => {
    setAnchorEl(null);
    if (user) {
      navigate(`/profile/${user.uid}`);
    }
  };

  const handleGoSettings = () => {
    setAnchorEl(null);
    navigate("/settings");
  };

  // Logout of Google Auth
  const handleGoLogout = () => {
    setAnchorEl(null);
    logoutUser();
  };

  const isProfileActive = location.pathname.includes(`/profile/${user?.uid}`);
  const isSettingsActive = location.pathname === "/settings";

  return (
    <>
      {userData.selectedUser ? (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Profile Menu">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ backgroundColor: "pink" }}>
                  {userInitials.toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            disableScrollLock={true}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={handleGoProfile}
              style={isProfileActive ? { textDecoration: "underline" } : {}}
            >
              <ListItemIcon>
                <InsertEmoticonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleGoSettings}
              style={isSettingsActive ? { textDecoration: "underline" } : {}}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleGoLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Skeleton variant="circular" width={40} height={40} />
      )}
    </>
  );
};
