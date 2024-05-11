import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import styles from "../styles/CountrySelectDropdown.module.scss";
import { useAppSelector } from "../hooks/reduxHooks";
import { Controller, useFormContext } from "react-hook-form";
import { UserType } from "../types/UserType";
import { CountryCca2Type } from "../types/CountryCca2Type";

export const CountrySelectDropdown = () => {
  const countryList = useAppSelector((state) => state.Country.countries);
  const { control } = useFormContext<UserType>();

  // Returns array of only the cca2 (used as uid) code of each country to use it as value
  const transformedValue = countryList.map((code) => code.cca2);

  // Return name and flag of country to display in autocomplete list
  const returnCountryDisplayValues = (option: CountryCca2Type) => {
    const country = countryList.find((country) => country.cca2 === option);

    return `${country?.flag} ${country?.name.common}`;
  };

  return (
    <>
      {countryList && (
        <>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="countriesVisited" shrink>
              Countries Visited
            </InputLabel>

            <Controller
              control={control}
              name="countriesVisited"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  id="countriesVisited"
                  className={styles.countrySearch}
                  options={transformedValue}
                  autoHighlight
                  multiple
                  limitTags={2}
                  fullWidth
                  onChange={onChange}
                  value={value}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {returnCountryDisplayValues(option as CountryCca2Type)}
                      {/* {option?.flag} {option?.name.common} */}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </>
      )}
    </>
  );
};
