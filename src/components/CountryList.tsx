import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/CountryList.module.scss";
import countryList from "../../assets/json/countries.json";
import { useState } from "react";
import Button from "@mui/material/Button";

export const CountryList = () => {
  const [filteredData, setFilteredData] = useState(countryList);

  const handleOnClick = (category: string) => {
    const filteredDataLocal = filteredData.filter((item) =>
      item.name.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredData(filteredDataLocal);
  };

  return (
    <>
      <Button
        onClick={() => {
          handleOnClick("Republic of");
        }}
      >
        Kategorie 1
      </Button>
      <ul className={styles.countryList}>
        <AnimatePresence>
          {filteredData.map((country, index) => {
            return (
              <motion.li
                key={index}
                layout
                className={styles.listItem}
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                exit={{ transform: "scale(0)" }}
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
