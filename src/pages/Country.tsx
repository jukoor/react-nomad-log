import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CountryType } from "../types/CountryType";
import { CountrySliceType } from "../types/slices/CountrySliceType";
import { useEffect, useState } from "react";

interface CountryInfo {
  label: string;
  text: string | string[] | number | boolean;
  emoji: string;
}

type CountryInfoList = CountryInfo[];

export const Country = () => {
  // const countryCodeFromUrl = useParams<{ countryCode: string }>();
  // console.log(countryCodeFromUrl);

  const [country, setCountry] = useState<CountryInfoList>([]);

  const countryData = useSelector<CountrySliceType, CountryType[]>(
    (state) => state.Country.countries
  );

  useEffect(() => {
    if (countryData && countryData.length > 0) {
      const c = countryData[0];
      setCountry([
        {
          label: "Continent",
          text: c.region,
          emoji: "🏛️",
        },
        {
          label: "Subregion",
          text: c.subregion,
          emoji: "🏛️",
        },
        {
          label: "Country",
          text: c.name.common,
          emoji: "😀",
        },
        {
          label: "Capital",
          text: Array.isArray(c.capital) ? c.capital.join(", ") : c.capital,
          emoji: "😀",
        },
        {
          label: "Population",
          text: c.population,
          emoji: "🏛️",
        },
        {
          label: "Currency",
          text: Array.isArray(c.currencies)
            ? c.currencies.join(", ")
            : Object.entries(c.currencies)
                .map(([key, value]) => `${value.name} (${value.symbol})`)
                .join(", "),
          emoji: "🏛️",
        },
        {
          label: "Land locked",
          text: c.landlocked ? "Yes" : "No",
          emoji: "🏛️",
        },
        {
          label: "Borders",
          text: Array.isArray(c.borders) ? c.borders.join(", ") : c.borders,
          emoji: "🏛️",
        },
        {
          label: "Size",
          text: c.area,
          emoji: "🏛️",
        },
        {
          label: "Flag",
          text: c.flag,
          emoji: "🏛️",
        },
        {
          label: "Google Maps",
          text: c.maps.googleMaps,
          emoji: "🏛️",
        },
        {
          label: "Timezones",
          text: Array.isArray(c.timezones)
            ? c.timezones.join(", ")
            : c.timezones,
          emoji: "🏛️",
        },
        {
          label: "Coat Of Arms",
          text: c.coatOfArms.svg,
          emoji: "🏛️",
        },
      ]);
    }
  }, [countryData]);

  return (
    <Grid container columnSpacing={"30px"}>
      <Grid item xs={6}>
        <Typography
          variant="body1"
          component="h3"
          color="text.secondary"
          gutterBottom
          textTransform="uppercase"
        >
          Countries
        </Typography>

        <List>
          {country.map((c, index) => (
            <ListItem key={index}>
              <ListItemIcon>{c.emoji}</ListItemIcon>
              <ListItemText primary={c.label} secondary={c.text} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
