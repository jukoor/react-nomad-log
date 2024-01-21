import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import countryList from "../../assets/json/countries.json";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "../styles/NavBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  Country,
  CountryState,
  setSelectedCountry,
} from "../store/countrySlice";
import { CountrySliceType } from "../types/CountrySliceType";
import CountrySearchDropdown from "./CountrySearchDropdown";
import { collection, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import Menu from "../Menu";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import { db } from "./firebaseConfig";
import { setCountrySelectDialogOpen } from "../store/appSlice";

function NavBar() {
  const dispatch = useDispatch();
  const [visitedCountriesCount, setVisitedCountriesCount] = useState(0);

  const countriesVisited = useSelector(
    (state: CountrySliceType) => state.Country.countriesVisited
  );

  // useEffect(() => {
  //   console.log(visitedCountriesCount);
  // }, [visitedCountriesCount]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const coll = collection(db, "countriesVisited");
  //       const snapshot = await getCountFromServer(coll);
  //       setVisitedCountriesCount(snapshot.data().count);
  //       console.log("count: ", snapshot.data().count);
  //     } catch (error) {}
  //   }
  //   console.log("ok");
  //   fetchData();
  // }, [countriesVisited]);

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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travel Map: {visitedCountriesCount}
          </Typography>

          {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Menu />
          </Box> */}

          <Button
            className={styles.addBtnSpecial}
            onClick={() => dispatch(setCountrySelectDialogOpen(true))}
          >
            Add Location
          </Button>

          <Avatar
            sx={{ ml: "20px" }}
            alt="Profile"
            src="https://mui.com/static/images/avatar/2.jpg"
          />

          {/* <CountrySearchDropdown /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
