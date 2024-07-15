import {
  Autocomplete,
  Badge,
  Box,
  Chip,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import styles from "../../styles/CountrySelectDropdown.module.scss";
import { Controller, useFormContext } from "react-hook-form";
import { UserType } from "../../types/UserType";
import { FC, useEffect, useState } from "react";

type TagsSelectDropdownProps = {
  disabled: boolean;
};
export const TagsSelectDropdown: FC<TagsSelectDropdownProps> = ({
  disabled,
}) => {
  const tags = [
    "🎒 Backpacking",
    "🏨 All-Inclusive Hotel",
    "🏝️ Lazy Beach Time",
    "🗼 Sightseeing",
    "🗺️ Adventures",
    "🚶 Hiking",
    "🛳️ Cruise Vacation",
    "🏞️ National Parks",
    "🍴 Foodie Tours",
    "✈️ Air Travel",
    "🧗 Rock Climbing",
    "🎿 Skiing",
    "🏖️ Beach Resorts",
    "🚗 Road Trip",
    "🎢 Theme Parks",
    "🏕️ Camping",
    "🚂 Train Journeys",
    "🌍 World Travel",
    "🛍️ Shopping Spree",
    "📸 Travel Photography",
  ];

  const { control, watch } = useFormContext<UserType>();

  const [selectedCount, setSelectedCount] = useState(0);
  const tagsValues = watch("tags");

  // Set selected options count
  useEffect(() => {
    if (tagsValues) setSelectedCount(tagsValues.length);
  }, [tagsValues]);

  return (
    <>
      <>
        <FormControl fullWidth={true}>
          <InputLabel
            htmlFor={"tags"}
            shrink
            hidden
            style={{ display: "none" }}
          >
            Tags
          </InputLabel>

          <Controller
            control={control}
            name={"tags"}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                id={"tags"}
                className={styles.countrySearch}
                options={tags}
                autoHighlight
                disableCloseOnSelect
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
                    {option}
                  </Box>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    // Extract the key prop if present
                    const tagProps = getTagProps({ index });
                    const { key, ...otherProps } = tagProps;

                    return (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...otherProps}
                        key={key} // Explicitly pass the key prop
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    fullWidth
                    placeholder="Describe your travel style"
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

          {/* Selection Counter Badge  */}
          <Badge
            sx={{ position: "absolute", top: "-14px", right: "18px" }}
            color="secondary"
            badgeContent={selectedCount}
            showZero
          ></Badge>
        </FormControl>
      </>
    </>
  );
};
