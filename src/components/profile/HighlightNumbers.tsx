import { FlightTakeoff, LocationOn } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { CountryType } from "../../types/CountryType";
import { getCountryData } from "../../utils/countryDataUtils";
import styles from "../../styles/HighlightNumbers.module.scss";
import PublicIcon from "@mui/icons-material/Public";

export const HighlightNumbers = () => {
  const [visitedContinentsCount, setVisitedContinentsCount] =
    useState<number>(0);

  const userData = useAppSelector((state) => state.User.selectedUser);
  const countryData = useAppSelector((state) => state.Country.countries);

  useEffect(() => {
    // Initialize an empty array to store country data for visited countries
    let visitedCountriesData: CountryType[] = [];

    // Fetch data for each country visited by the user
    userData?.countriesVisited?.forEach((countryCode) => {
      const countryDetails = getCountryData(countryCode, countryData);
      if (countryDetails) {
        visitedCountriesData.push(countryDetails);
      }
    });

    const continentsOrg = visitedCountriesData.map(
      (country) => country.continents
    );
    // Extract continents from the visited countries data
    const continents = [...new Set(continentsOrg.flat())];
    const continentsArray = Array.from(continents);
    // Update the state with the continents visited, use flat() to resolve the second array created by array.from
    setVisitedContinentsCount(continentsArray.length);
  }, [userData, countryData]);

  let percentVisited;

  if (userData && userData.countriesVisited) {
    percentVisited =
      (userData.countriesVisited.length / countryData.length) * 100;
  }

  return (
    <>
      <List className={`${styles.highlightNumbers} ${styles.list}`}>
        {percentVisited !== undefined && (
          <ListItem className={styles.item}>
            <ListItemIcon className={styles.icon}>
              <PublicIcon className={styles.iconSvg} />
            </ListItemIcon>
            <ListItemText
              primary={`${Math.round(percentVisited)}%`}
              secondary="OF THE WORLD"
              className={styles.text}
            />
          </ListItem>
        )}

        <ListItem className={styles.item}>
          <ListItemIcon className={styles.icon}>
            <FlightTakeoff className={styles.iconSvg} />
          </ListItemIcon>
          <ListItemText
            primary={userData?.countriesVisited?.length}
            secondary={
              userData?.countriesVisited?.length === 1 ? "COUNTRY" : "COUNTRIES"
            }
            className={styles.text}
          />
        </ListItem>

        <ListItem className={styles.item}>
          <ListItemIcon className={styles.icon}>
            <LocationOn className={styles.iconSvg} />
          </ListItemIcon>
          <ListItemText
            primary={visitedContinentsCount}
            secondary={
              visitedContinentsCount === 1 ? "CONTINENT" : "CONTINENTS"
            }
            className={styles.text}
          />
        </ListItem>
      </List>
    </>
  );
};
