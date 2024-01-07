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
import styles from "../styles/AppBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../store/countrySlice";

export default function ButtonAppBar() {
  const count = useSelector((state: CountrySliceType) => state.counter.value);
  const dispatch = useDispatch();

  function incrementCounter() {
    dispatch(increment());
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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travel Map: {count}
          </Typography>

          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countryList}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  width="20"
                  src={`/assets/images/flags/${option.code.toLowerCase()}.svg`}
                  alt=""
                />
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Button color="inherit" onClick={incrementCounter}>
            Add
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
