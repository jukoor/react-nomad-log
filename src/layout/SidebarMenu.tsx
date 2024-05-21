import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useMenuStructure } from "./MenuStructure";
import { NavLink } from "react-router-dom";
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

export const SidebarMenu = () => {
  const dispatch = useAppDispatch();
  const menuVisibility = useAppSelector((state) => state.App.menuOpen);
  const menuStructure = useMenuStructure();

  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { loginWithGoogle } = useGoogleLogin();

  const drawerWidth = 240;

  const handleCloseDrawer = () => {
    dispatch(toggleMenuVisibility());
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
            backgroundColor: "#0b2948",
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
            sx={{ alignSelf: "flex-end", margin: "5px" }}
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
            <ListItem onClick={handleCloseDrawer} key={item.id} disablePadding>
              <NavLink
                to={item.target}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.link}`
                    : `${styles.link}`
                }
              >
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: "40px", color: "#59CFFF" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
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
