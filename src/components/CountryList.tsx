import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/CountryList.module.scss";
import countryList from "../../assets/json/countries.json";
import { ChangeEventHandler, KeyboardEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const CountryList = () => {
  const countryData = countryList;
  const [filteredData, setFilteredData] = useState(countryList);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleChangeFilterList = (event: any) => {
    console.log("changed " + event.target.value);

    const searchTerm = event.target.value;
    const filteredDataLocal = countryData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredDataLocal.length);
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
        <AnimatePresence>
          {filteredData.map((country, index) => {
            return (
              <motion.li
                onClick={() => handleCountryClick(country.name)}
                key={index}
                layout
                className={`${styles.listItem} ${
                  selectedCountries.includes(country.name) ? styles.active : ""
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.icon}>{country.icon}</div>
                <div className={styles.country}>{country.name}</div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </>
  );
};
