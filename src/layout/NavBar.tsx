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
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LuggageIcon from "@mui/icons-material/Luggage";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const dispatch = useAppDispatch();

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
            badgeContent={selectedUser.countriesVisited.length}
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
          {selectedUser.nameFirst.length > 0 && (
            <Avatar
              sx={{ bgColor: "red", width: 40, height: 40 }}
              {...stringAvatar(
                `${selectedUser.nameFirst} ${selectedUser.nameLast}`
              )}
            />
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
