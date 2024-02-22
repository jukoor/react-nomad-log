import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuStructure } from "./MenuStructure";
import { NavLink } from "react-router-dom";
import styles from "../styles/SidebarMenu.module.scss";
import { toggleMenuVisibility } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const SidebarMenu = () => {
  const dispatch = useAppDispatch();
  const menuVisibility = useAppSelector((state) => state.App.menuOpen);
  const user = useAppSelector((state) => state.User.selectedUser);

  const drawerWidth = 240;

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  const AvatarBox = () => {
    const currentHour = new Date().getHours();
    const welcomeText =
      currentHour < 8
        ? "Good Morning"
        : currentHour < 16
        ? "Good Afternoon"
        : "Good Evening";

    return (
      <Box sx={{ padding: "20px" }}>
        <div className={styles.welcomeText}>{welcomeText},</div>
        <div className={styles.name}>
          {user.nameFirst} {user.nameLast}
        </div>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className={styles.sidebar}
        open={menuVisibility}
        onClose={handleOnClick}
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
        <IconButton
          color="primary"
          aria-label="Close Sidebar"
          title="Close Sidebar"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleOnClick}
        >
          <CloseIcon />
        </IconButton>
        <Divider />

        <AvatarBox />

        <List>
          {menuStructure.map((item) => (
            <ListItem onClick={handleOnClick} key={item.id} disablePadding>
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
          <ListItem key={"logout"} disablePadding>
            <NavLink
              to={"/logout"}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.link}` : `${styles.link}`
              }
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "40px", color: "#59CFFF" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
