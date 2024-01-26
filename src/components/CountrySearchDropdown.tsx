import { Autocomplete, Box, TextField } from "@mui/material";
import styles from "../styles/CountrySearchDropdown.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CountrySliceType } from "../types/slices/CountrySliceType";
import countryList from "../../assets/json/countries.json";
import { setSelectedCountry } from "../store/countrySlice";
import { addDocToFirebase } from "../services/firebaseHelper";

type SelectedCountryAT = {
  icon: string;
  code: string;
  name: string;
};

export default function CountrySearchDropdown() {
  const dispatch = useDispatch();

  const countriesVisited = useSelector(
    (state: CountrySliceType) => state.Country.countriesVisited
  );

  function handleOnChange(event: any, newValue: SelectedCountryAT) {
    dispatch(
      setSelectedCountry({
        countryIcon: newValue.icon,
        countryNameShort: newValue.code,
        countryNameFull: newValue.name,
      })
    );
  }

  return (
    <Autocomplete
      className={styles.countrySearch}
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
          {option.icon} {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="filled"
          label="Find a country..."
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
      onChange={(event, newValue) => {
        if (newValue) {
          handleOnChange(event, newValue);
        } else {
          // reset
        }
      }}
    />
  );
}
