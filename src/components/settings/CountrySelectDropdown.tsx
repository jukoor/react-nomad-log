import {
  Autocomplete,
  Badge,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import styles from "../../styles/CountrySelectDropdown.module.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Controller, useFormContext } from "react-hook-form";
import { UserType } from "../../types/UserType";
import { CountryCca2Type } from "../../types/CountryCca2Type";
import { useEffect, useState } from "react";

type UserFieldKeys = keyof UserType;

interface CountrySelectDropdownProps {
  multiple?: boolean;
  label: string;
  fieldName: UserFieldKeys;
  disabled?: boolean;
  required?: boolean;
}

export const CountrySelectDropdown = ({
  label,
  fieldName,
  disabled,
  required = false,
  multiple = true,
}: CountrySelectDropdownProps) => {
  const countryList = useAppSelector((state) => state.Country.countries);
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<UserType>();

  // Returns array of only the cca2 (used as uid) code of each country to use it as value
  const transformedValue = countryList.map((code) => code.cca2).sort();

  const [selectedCount, setSelectedCount] = useState(0);
  const countriesListValue = watch(fieldName);

  // Set selected options count
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
            <InputLabel
              htmlFor={fieldName}
              required={required}
              shrink
              hidden
              style={{ display: "none" }}
            >
              {label}
            </InputLabel>

            <Controller
              control={control}
              name={fieldName}
              rules={{ required: required ? true : false }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  id={fieldName}
                  className={styles.countrySearch}
                  options={transformedValue}
                  autoHighlight
                  multiple
                  fullWidth
                  disabled={!!disabled}
                  // @ts-ignore
                  onChange={(event, newValue) => {
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
                      // Extract the key prop if present
                      const displayValue = returnCountryDisplayValues(
                        option as CountryCca2Type
                      );
                      const tagProps = getTagProps({ index });
                      const { key, ...otherProps } = tagProps;

                      return (
                        <Chip
                          variant="outlined"
                          label={displayValue}
                          {...otherProps}
                          key={key} // Explicitly pass the key prop
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={label}
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

            {/* Errors  */}
            {errors.homeCountry && required ? (
              <FormHelperText
                sx={{
                  background: "#d32f2f",
                  color: "#fff",
                  borderRadius: "5px",
                  position: "relative",
                  top: "3px",
                  margin: 0,
                  padding: "0 15px",
                }}
              >
                Please tell us your Nationality * 🙂
              </FormHelperText>
            ) : null}

            {/* Selection Counter Badge  */}
            {multiple ? (
              <Badge
                sx={{ position: "absolute", top: "-14px", right: "18px" }}
                color="secondary"
                badgeContent={selectedCount}
                showZero
              ></Badge>
            ) : null}
          </FormControl>
        </>
      )}
    </>
  );
};
