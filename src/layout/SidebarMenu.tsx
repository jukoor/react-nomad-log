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
import { Button, Tooltip } from "@mui/material";
import { SidebarWelcomeMsg } from "./SidebarWelcomeMsg";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { useLocation } from "react-router-dom";

export const SidebarMenu = () => {
  const dispatch = useAppDispatch();
  const menuVisibility = useAppSelector((state) => state.App.menuOpen);
  const menuStructure = useMenuStructure();

  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { loginWithGoogle } = useGoogleLogin();
  const location = useLocation();

  const drawerWidth = 240;

  const handleCloseDrawer = () => {
    dispatch(toggleMenuVisibility());
  };

  const handleCloseDrawer2 = (callback?: () => void) => {
    dispatch(toggleMenuVisibility());

    // If a callback is provided, execute it after a short delay
    if (callback) {
      setTimeout(callback, 300); // Adjust the delay as needed to match the animation duration
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className={styles.sidebar}
        open={menuVisibility}
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
        {user && (
          <>
            <SidebarWelcomeMsg />
            <Divider sx={{ borderColor: "#ffffff70" }} />
          </>
        )}

        <List sx={{ marginTop: "30px" }}>
          {menuStructure.map((item) => (
            // const isActive = location.pathname === item.target;

            <ListItemButton
              component="a"
              href={item.target}
              // onClick={handleCloseDrawer}
              onClick={(event) => {
                event.preventDefault(); // Prevent the default link behavior
                handleCloseDrawer2(() => {
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
        </List>
        {user == null && (
          <Button
            className={styles.signInBtn}
            variant="contained"
            color="secondary"
            onClick={loginWithGoogle}
          >
            Sign in
          </Button>
        )}
      </Drawer>
    </Box>
  );
};
