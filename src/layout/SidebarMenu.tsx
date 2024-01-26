import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuStrucutre } from "./MenuStructure";
import { NavLink } from "react-router-dom";
import styles from "../styles/SidebarMenu.module.scss";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleMenuVisibility } from "../store/appSlice";
import { AppSliceType } from "../types/slices/AppSliceType";
import { useSelector } from "react-redux";

export const SidebarMenu = () => {
  const dispatch = useDispatch();
  const menuVisibility = useSelector(
    (state: AppSliceType) => state.App.menuOpen
  );
  console.log(menuVisibility);
  const drawerWidth = 240;

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        open={menuVisibility}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
      >
        <Button onClick={handleOnClick}>Close</Button>
        <Divider />

        <List>
          {menuStrucutre.map((item) => (
            <ListItem key={item.id} disablePadding>
              <NavLink
                to={item.target}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.link}`
                    : `${styles.link}`
                }
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <Outlet /> */}
    </Box>
  );
};
