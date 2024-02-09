import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "../styles/CountryDetailsOverlay.module.scss";
import { toggleCountryDetailsOverlay } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import CloseIcon from "@mui/icons-material/Close";
interface CountryInfo {
  label: string;
  content: string | string[] | number | boolean | ReactElement | undefined;
  icon: ReactElement;
}

type CountryInfoList = CountryInfo[];

export const CountryDetailsOverlay = () => {
  const drawerWidth = 400;

  const dispatch = useAppDispatch();
  const [timezonesClpsOpen, setTmezonesClpsOpen] = useState(false);

  const [country, setCountry] = useState<CountryInfo[]>([]);
  const countryData = useAppSelector((state) => state.Country.countries);
  const overlayOpen = useAppSelector(
    (state) => state.App.countryDetailsOverlayOpen
  );
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const concatArrayVals = (arr: string[]) => {
    return Array.isArray(arr) ? arr.join(", ") : arr;
  };

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  interface TimezoneCollapseProps {
    timezones: string[];
  }

  // useEffect(() => {
  //   console.log(timezonesClpsOpen);
  // }, [timezonesClpsOpen]);

  const TimezoneCollapse = ({ timezones }: TimezoneCollapseProps) => {
    console.log(timezones);

    return (
      <>
        <Accordion className={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {timezones[0]}{" "}
            {timezones.length > 1 ? `(+${timezones.length - 1})` : ""}
          </AccordionSummary>
          <AccordionDetails>
            {timezones.map(
              (zone, index) =>
                index > 0 && (
                  <Typography key={index} variant="body1">
                    {zone}
                  </Typography>
                )
            )}
          </AccordionDetails>
        </Accordion>
      </>
    );
  };

  useEffect(() => {
    if (countryData && countryData.length > 0 && selectedCountry) {
      const activeCountry: CountryType | undefined = countryData.find(
        (c) => c.cca2 == selectedCountry.country
      );

      if (activeCountry) {
        // const activeCountryData = countryData[3];
        setCountry([
          {
            label: "Country",
            content: activeCountry.name.common,
            icon: <PublicIcon />,
          },
          {
            label: "Continent",
            content: activeCountry.region,
            icon: <PublicIcon />,
          },
          {
            label: "Subregion",
            content: activeCountry.subregion,
            icon: <MyLocationIcon />,
          },
          {
            label: "Capital",
            content: concatArrayVals(activeCountry.capital),
            icon: <TourOutlinedIcon />,
          },
          {
            label: "Population",
            content: numberWithCommas(activeCountry.population),
            icon: <Diversity1Icon />,
          },
          {
            label: "Size",
            content: `${numberWithCommas(activeCountry.area)} km²`,
            icon: <CropFreeIcon />,
          },
          {
            label: "Flag",
            content: activeCountry.flag,
            icon: <PublicIcon />,
          },
          {
            label: "Currency",
            content: Array.isArray(activeCountry.currencies)
              ? activeCountry.currencies.join(", ")
              : Object.entries(activeCountry.currencies)
                  .map(([, value]) => `${value.name} (${value.symbol})`)
                  .join(", "),
            icon: <EmojiFlagsIcon />,
          },
          {
            label: "Land locked",
            content: activeCountry.landlocked ? "Yes" : "No",
            icon: <WaterIcon />,
          },
          {
            label: "Borders",
            content: concatArrayVals(activeCountry.borders),
            icon: <HandshakeIcon />,
          },
          {
            label: "Maps",
            content: (
              <>
                <a href={activeCountry.maps.googleMaps} target="_blank">
                  Open in Google Maps
                </a>
              </>
            ),
            icon: <GoogleIcon />,
          },
          {
            label: "Timezones",
            content: <TimezoneCollapse timezones={activeCountry.timezones} />,
            icon: <SnoozeIcon />,
          },
          {
            label: "Coat Of Arms",
            content: (
              <>
                <img
                  src={activeCountry.coatOfArms.svg}
                  width="40px"
                  height="70px"
                />
              </>
            ),
            icon: <SecurityIcon />,
          },
        ]);
      }
    }
  }, [countryData]);

  const handleOnClick = () => {
    dispatch(toggleCountryDetailsOverlay());
  };

  return (
    <Drawer
      className={styles.moduleCountryDetailsOverlay}
      open={overlayOpen}
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
      <Typography variant="h5">Country Details</Typography>
      <IconButton color="secondary" aria-label="Close" onClick={handleOnClick}>
        <CloseIcon />
      </IconButton>
      <Divider />

      <List>
        {country.map((c, index) => (
          <ListItem key={index} className={styles.listItem}>
            <ListItemIcon>{c.icon}</ListItemIcon>
            <ListItemText
              primary={c.label}
              secondary={c.content}
              secondaryTypographyProps={{ component: "span" }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
