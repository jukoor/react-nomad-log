import styles from "../styles/CountryList.module.scss";
import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";

import React from "react";
import { Typography } from "@mui/material";
import { CountrySliceType } from "../types/slices/CountrySliceType";
import { CountryType } from "../types/CountryType3";
import { useAppSelector } from "../hooks/hooks";

export const CountryList = () => {
  const [initialCountryData, setInitialCountryData] = useState<CountryType[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<CountryType[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const countries = useAppSelector((state) => state.Country.countries);

  useEffect(() => {
    setInitialCountryData(countries);
    setFilteredData(countries);
  }, [countries]);

  const handleChangeFilterList = (event: any) => {
    const searchTerm = event.target.value;
    const filteredDataLocal = initialCountryData.filter((item) =>
      item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredDataLocal);
  };

  const handleCountryClick = (countryName: string) => {
    setSelectedCountries((prevCountries) => {
      // Check if the country is already selected
      if (prevCountries.includes(countryName)) {
        // If it is, remove it from the array
        return prevCountries.filter((name) => name !== countryName);
      } else {
        // If it isn't, add it to the array
        return [...prevCountries, countryName];
      }
    });
  };

  const groupedCountries = useMemo(() => {
    const dict: Record<string, CountryType[]> = {};
    filteredData.forEach((country) => {
      country.continents.forEach((continent) => {
        if (!dict[continent]) {
          dict[continent] = [];
        }
        dict[continent].push(country);
      });
    });
    return dict;
  }, [filteredData]);

  return (
    <>
      <TextField
        label="Country..."
        variant="filled"
        InputProps={{
          onKeyUp: (
            event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleChangeFilterList(event);
          },
        }}
      />
      Selected countries: {JSON.stringify(selectedCountries)}
      <ul className={styles.countryList}>
        {Object.entries(groupedCountries).map(
          ([continent, countries], index) => (
            <React.Fragment key={index}>
              <Typography variant="h3" sx={{ width: "100%" }}>
                {continent}
              </Typography>
              {countries.map((country, index) => (
                <li
                  onClick={() => handleCountryClick(country.cca2)}
                  key={index}
                  className={`${styles.listItem} ${
                    selectedCountries.includes(country.cca2)
                      ? styles.active
                      : ""
                  }`}
                >
                  <div className={styles.icon}>{country.flag}</div>
                  <div className={styles.country}>{country.name.common}</div>
                </li>
              ))}
            </React.Fragment>
          )
        )}
      </ul>
    </>
  );
};
