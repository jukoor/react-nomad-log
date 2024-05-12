import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import styles from "../styles/CountrySelectDropdown.module.scss";
import { useAppSelector } from "../hooks/reduxHooks";
import { Controller, useFormContext } from "react-hook-form";
import { UserType } from "../types/UserType";
import { CountryCca2Type } from "../types/CountryCca2Type";
import { useEffect, useState } from "react";

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

  const [selectedCount, setSelectedCount] = useState(0);
  const countriesListValue = watch(`countries${fieldType}`);

  // Set selected options length
  useEffect(() => {
    if (countriesListValue) setSelectedCount(countriesListValue.length);
  }, [countriesListValue]);

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
            <InputLabel htmlFor={`countries${fieldType}`} shrink>
              {`${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} `}
              <span className={styles.badgeCustom}>{selectedCount}</span>
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
                  fullWidth
                  // @ts-ignore
                  onChange={(event, newValue) => {
                    console.log(newValue);
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
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      // Use returnCountryDisplayValues to format the display of each selected value
                      const displayValue = returnCountryDisplayValues(
                        option as CountryCca2Type
                      );
                      return (
                        <Chip
                          variant="outlined"
                          label={displayValue}
                          {...getTagProps({ index })}
                        />
                      );
                    })
                  }
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
                  ListboxProps={{
                    style: {
                      maxHeight: "250px",
                    },
                  }}
                />
              )}
            />
          </FormControl>
        </>
      )}
    </>
  );
};
