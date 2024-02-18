import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/NavBar.module.scss";
import { Avatar, Badge, LinearProgress } from "@mui/material";
import { toggleMenuVisibility } from "../store/appSlice";
import { useSelector } from "react-redux";
import { CountrySliceType } from "../types/slices/CountrySliceType";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LuggageIcon from "@mui/icons-material/Luggage";
import { useEffect } from "react";

export const NavBar = () => {
  const userData = useAppSelector((state) => state.User.selectedUser);

  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(toggleMenuVisibility());
  };

  const loading = useSelector(
    (state: CountrySliceType) => state.Country.loading
  );

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

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
            Passportyfy
          </Typography>

          <Badge
            badgeContent={userData.countriesVisited.length}
            color="secondary"
          >
            <Button startIcon={<LuggageIcon />}></Button>
          </Badge>

          {/* 
          <Button
            className={styles.addBtnSpecial}
            onClick={() => dispatch(setCountrySelectDialogOpen(true))}
          >
            Add Location
          </Button> */}
          {userData.nameFirst.length > 0 && (
            <Avatar
              sx={{ bgColor: "red", width: 40, height: 40 }}
              {...stringAvatar(`${userData.nameFirst} ${userData.nameLast}`)}
            />
          )}
        </Toolbar>
      </AppBar>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};
