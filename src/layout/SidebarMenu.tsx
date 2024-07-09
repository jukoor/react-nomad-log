import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useMenuStructure } from "./MenuStructure";
import styles from "../styles/SidebarMenu.module.scss";
import { toggleMenuVisibility } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { SidebarWelcomeMsg } from "./SidebarWelcomeMsg";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import LogoutIcon from "@mui/icons-material/Logout";

import LoginIcon from "@mui/icons-material/Login";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SignUpForm } from "./SignUpForm";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
export const SidebarMenu = () => {
  const { isAuthenticated, loginUser, logoutUser } = useContext(AuthContext);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);

  const dispatch = useAppDispatch();
  const menuVisibility = useAppSelector((state) => state.App.menuOpen);

  const menuStructure = useMenuStructure();
  const location = useLocation();
  const drawerWidth = 240;

  const handleCloseDrawer = () => {
    dispatch(toggleMenuVisibility());
  };

  /*  Delay for sidebar to finish closing animation before redirecting*/
  const handleCloseDrawerDelay = (callback?: () => void) => {
    dispatch(toggleMenuVisibility());

    if (callback) {
      setTimeout(callback, 300);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className={styles.sidebar}
        open={menuVisibility}
        disableScrollLock={true}
        onClose={handleCloseDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1f2937b8",
            backdropFilter: "blur(10px)",
          },
        }}
        anchor="left"
      >
        <Tooltip
          sx={{ marginRight: "5px" }}
          title="Close Sidebar"
          placement="right"
          arrow
        >
          <IconButton
            color="primary"
            aria-label="Close Sidebar"
            sx={{ alignSelf: "flex-end", margin: "5px", color: "#ffffff" }}
            onClick={handleCloseDrawer}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>

        <Divider sx={{ borderColor: "#ffffff70" }} />

        {/* Show welcome Message when user is logged in */}
        {isAuthenticated && (
          <>
            <SidebarWelcomeMsg />
            <Divider sx={{ borderColor: "#ffffff70" }} />
          </>
        )}

        <List sx={{ marginTop: "30px" }}>
          {isAuthenticated ? (
            <>
              {menuStructure.map((item) => (
                <ListItemButton
                  component="a"
                  href={item.target}
                  onClick={(event) => {
                    event.preventDefault(); // Prevent the default link behavior
                    handleCloseDrawerDelay(() => {
                      // Perform the redirection after the sidebar close animation
                      window.location.href = item.target;
                    });
                  }}
                  key={item.id}
                  className={`${styles.link} ${
                    location.pathname === item.target ? styles.active : ""
                  }`}
                >
                  <ListItemIcon sx={{ minWidth: "40px", color: "pink" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
              <ListItemButton
                onClick={() => logoutUser()}
                className={styles.link}
              >
                <ListItemIcon sx={{ minWidth: "40px", color: "pink" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          ) : (
            <>
              {isSignUpFormVisible ? (
                <>
                  <SignUpForm />
                </>
              ) : (
                <>
                  <ListItemButton
                    onClick={() => loginUser()}
                    className={styles.link}
                  >
                    <ListItemIcon sx={{ minWidth: "40px", color: "pink" }}>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>

                  <ListItemButton
                    onClick={() => setIsSignUpFormVisible(true)}
                    className={styles.link}
                  >
                    <ListItemIcon sx={{ minWidth: "40px", color: "pink" }}>
                      <FavoriteBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </>
              )}
            </>
          )}
        </List>
        {isSignUpFormVisible && (
          <Tooltip
            sx={{ marginRight: "5px" }}
            title="Back to menu"
            placement="right"
            arrow
          >
            <IconButton
              sx={{
                border: "2px solid #fac0cb",
                position: "absolute",
                bottom: "14px",
                left: "14px",
              }}
              onClick={() => setIsSignUpFormVisible(false)}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </Tooltip>
        )}
      </Drawer>
    </Box>
  );
};
