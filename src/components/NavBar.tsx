import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import countryList from "../../public/assets/countries/countries.json";
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

export default function NavBar() {
  const dispatch = useDispatch();

  const countriesVisited = useSelector(
    (state: CountrySliceType) => state.Country.countriesVisited
  );

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
            Travel Map: {countriesVisited.length}
          </Typography>
          <CountrySearchDropdown />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
