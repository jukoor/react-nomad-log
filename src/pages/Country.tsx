import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { CountryType } from "../types/CountryType3";
import { CountrySliceType } from "../types/slices/CountrySliceType";
import { ReactElement, useEffect, useState } from "react";

import PublicIcon from "@mui/icons-material/Public";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import CropFreeIcon from "@mui/icons-material/CropFree";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import WaterIcon from "@mui/icons-material/Water";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GoogleIcon from "@mui/icons-material/Google";
import SnoozeIcon from "@mui/icons-material/Snooze";
import SecurityIcon from "@mui/icons-material/Security";
import { useAppSelector } from "../hooks/hooks";

interface CountryInfo {
  label: string;
  text: string | string[] | number | boolean;
  icon: ReactElement;
}

type CountryInfoList = CountryInfo[];

export const Country = () => {
  // const countryCodeFromUrl = useParams<{ countryCode: string }>();
  // console.log(countryCodeFromUrl);

  const [country, setCountry] = useState<CountryInfoList>([]);

  const countryData = useAppSelector((state) => state.Country.countries);

  useEffect(() => {
    if (countryData && countryData.length > 0) {
      const c = countryData[0];
      setCountry([
        {
          label: "Country",
          text: c.name.common,
          icon: <PublicIcon />,
        },
        {
          label: "Continent",
          text: c.region,
          icon: <PublicIcon />,
        },
        {
          label: "Subregion",
          text: c.subregion,
          icon: <MyLocationIcon />,
        },
        {
          label: "Capital",
          text: Array.isArray(c.capital) ? c.capital.join(", ") : c.capital,
          icon: <TourOutlinedIcon />,
        },
        {
          label: "Population",
          text: c.population,
          icon: <Diversity1Icon />,
        },
        {
          label: "Size",
          text: c.area,
          icon: <CropFreeIcon />,
        },
        {
          label: "Flag",
          text: c.flag,
          icon: <PublicIcon />,
        },
        {
          label: "Currency",
          text: Array.isArray(c.currencies)
            ? c.currencies.join(", ")
            : Object.entries(c.currencies)
                .map(([key, value]) => `${value.name} (${value.symbol})`)
                .join(", "),
          icon: <EmojiFlagsIcon />,
        },
        {
          label: "Land locked",
          text: c.landlocked ? "Yes" : "No",
          icon: <WaterIcon />,
        },
        {
          label: "Borders",
          text: Array.isArray(c.borders) ? c.borders.join(", ") : c.borders,
          icon: <HandshakeIcon />,
        },
        {
          label: "Google Maps",
          text: c.maps.googleMaps,
          icon: <GoogleIcon />,
        },
        {
          label: "Timezones",
          text: Array.isArray(c.timezones)
            ? c.timezones.join(", ")
            : c.timezones,
          icon: <SnoozeIcon />,
        },
        {
          label: "Coat Of Arms",
          text: c.coatOfArms.svg,
          icon: <SecurityIcon />,
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
              <ListItemIcon>{c.icon}</ListItemIcon>
              <ListItemText primary={c.label} secondary={c.text} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
