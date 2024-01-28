import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { CountryType } from "../types/CountryType";
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

import styles from "../styles/CountryDetailsOverlay.module.scss";

interface CountryInfo {
  label: string;
  content: string | string[] | number | boolean | ReactElement;
  icon: ReactElement;
}

type CountryInfoList = CountryInfo[];

export const CountryDetailsOverlay = () => {
  const drawerWidth = 400;
  const menuVisibility = true;

  const [country, setCountry] = useState<CountryInfoList>([]);
  const countryData = useSelector<CountrySliceType, CountryType[]>(
    (state) => state.Country.countries
  );

  const concatArrayVals = (arr: string[]) => {
    return Array.isArray(arr) ? arr.join(", ") : arr;
  };

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (countryData && countryData.length > 0) {
      const c = countryData[3];
      setCountry([
        {
          label: "Country",
          content: c.name.common,
          icon: <PublicIcon />,
        },
        {
          label: "Continent",
          content: c.region,
          icon: <PublicIcon />,
        },
        {
          label: "Subregion",
          content: c.subregion,
          icon: <MyLocationIcon />,
        },
        {
          label: "Capital",
          content: concatArrayVals(c.capital),
          icon: <TourOutlinedIcon />,
        },
        {
          label: "Population",
          content: numberWithCommas(c.population),
          icon: <Diversity1Icon />,
        },
        {
          label: "Size",
          content: `${numberWithCommas(c.area)} km²`,
          icon: <CropFreeIcon />,
        },
        {
          label: "Flag",
          content: c.flag,
          icon: <PublicIcon />,
        },
        {
          label: "Currency",
          content: Array.isArray(c.currencies)
            ? c.currencies.join(", ")
            : Object.entries(c.currencies)
                .map(([, value]) => `${value.name} (${value.symbol})`)
                .join(", "),
          icon: <EmojiFlagsIcon />,
        },
        {
          label: "Land locked",
          content: c.landlocked ? "Yes" : "No",
          icon: <WaterIcon />,
        },
        {
          label: "Borders",
          content: concatArrayVals(c.borders),
          icon: <HandshakeIcon />,
        },
        {
          label: "Maps",
          content: (
            <>
              <a href={c.maps.googleMaps} target="_blank">
                Open in Google Maps
              </a>
            </>
          ),
          icon: <GoogleIcon />,
        },
        {
          label: "Timezones",
          content: concatArrayVals(c.timezones),
          icon: <SnoozeIcon />,
        },
        {
          label: "Coat Of Arms",
          content: (
            <>
              <img src={c.coatOfArms.svg} width="40px" height="70px" />
            </>
          ),
          icon: <SecurityIcon />,
        },
      ]);
    }
  }, [countryData]);

  const handleOnClick = () => {};

  return (
    <Drawer
      className={styles.moduleCountryDetailsOverlay}
      open={menuVisibility}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="temporary"
      anchor="right"
    >
      <Button onClick={handleOnClick}>Close</Button>
      <Divider />
      <List>
        {country.map((c, index) => (
          <ListItem key={index} className={styles.listItem}>
            <ListItemIcon>{c.icon}</ListItemIcon>
            <ListItemText primary={c.label} secondary={c.content} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
