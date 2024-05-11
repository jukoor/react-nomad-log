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
import { useEffect } from "react";

interface CountrySelectDropdownProps {
  fieldType: "Visited" | "Lived" | "BucketList";
}

export const CountrySelectDropdown = ({
  fieldType,
}: CountrySelectDropdownProps) => {
  const countryList = useAppSelector((state) => state.Country.countries);
  const { control, watch } = useFormContext<UserType>();

  // Returns array of only the cca2 (used as uid) code of each country to use it as value
  const transformedValue = countryList.map((code) => code.cca2).sort();

  // Return name and flag of country to display in autocomplete list
  const returnCountryDisplayValues = (option: CountryCca2Type) => {
    const country = countryList.find((country) => country.cca2 === option);

    return `${country?.flag} ${country?.name.common}`;
  };

  useEffect(() => {
    console.log(watch(`countries${fieldType}`));
  }, [watch(`countries${fieldType}`)]);

  return (
    <>
      {countryList && (
        <>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor={`countries${fieldType}`} shrink>
              {`${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`}
            </InputLabel>

            <Controller
              control={control}
              name={`countries${fieldType}`}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  id={`countries${fieldType}`}
                  className={styles.countrySearch}
                  options={transformedValue}
                  autoHighlight
                  multiple
                  limitTags={2}
                  fullWidth
                  onChange={(newValue) => {
                    // If newValue is undefined (no selection), set it to an empty array
                    onChange(Array.isArray(newValue) ? newValue : []);
                  }}
                  value={Array.isArray(value) ? value : []} // Ensure value is always an array
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {returnCountryDisplayValues(option as CountryCca2Type)}
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
