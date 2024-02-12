import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
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
import RouterOutlinedIcon from "@mui/icons-material/RouterOutlined";
import styles from "../styles/CountryDetailsOverlay.module.scss";
import { toggleCountryDetailsOverlay } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import CloseIcon from "@mui/icons-material/Close";

interface CountryInfo {
  label: string;
  content: string | string[] | number | boolean | ReactElement | undefined;
  icon: ReactElement;
}

export const CountryDetailsOverlay = () => {
  const drawerWidth = 400;

  const dispatch = useAppDispatch();
  const [timezonesClpsOpen, setTmezonesClpsOpen] = useState(false);

  const [country, setCountry] = useState<CountryInfo[]>([]);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );
  const overlayOpen = useAppSelector(
    (state) => state.App.countryDetailsOverlayOpen
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
    if (selectedCountry) {
      setCountry([
        {
          label: "Continent",
          content: selectedCountry.region,
          icon: <PublicIcon />,
        },
        {
          label: "Subregion",
          content: selectedCountry.subregion,
          icon: <MyLocationIcon />,
        },
        {
          label: "Capital",
          content: concatArrayVals(selectedCountry.capital),
          icon: <TourOutlinedIcon />,
        },
        {
          label: "Population",
          content: numberWithCommas(selectedCountry.population),
          icon: <Diversity1Icon />,
        },
        {
          label: "Size",
          content: `${numberWithCommas(selectedCountry.area)} km²`,
          icon: <CropFreeIcon />,
        },

        {
          label: "Currency",
          content: Array.isArray(selectedCountry.currencies)
            ? selectedCountry.currencies.join(", ")
            : Object.entries(selectedCountry.currencies)
                .map(([, value]) => `${value.name} (${value.symbol})`)
                .join(", "),
          icon: <EmojiFlagsIcon />,
        },
        {
          label: "Land locked",
          content: selectedCountry.landlocked ? "Yes" : "No",
          icon: <WaterIcon />,
        },
        {
          label: "Borders",
          content: concatArrayVals(selectedCountry.borders),
          icon: <HandshakeIcon />,
        },
        {
          label: "Maps",
          content: (
            <>
              <a href={selectedCountry.maps.googleMaps} target="_blank">
                Open in Google Maps
              </a>
            </>
          ),
          icon: <GoogleIcon />,
        },
        {
          label: "Domain",
          content: selectedCountry.tld,
          icon: <RouterOutlinedIcon />,
        },
        {
          label: "Timezones",
          content: <TimezoneCollapse timezones={selectedCountry.timezones} />,
          icon: <SnoozeIcon />,
        },
        {
          label: "Coat Of Arms",
          content: (
            <>
              <img
                src={selectedCountry.coatOfArms.svg}
                className={styles.coatOfArms}
              />
            </>
          ),
          icon: <SecurityIcon />,
        },
      ]);
    }
  }, [selectedCountry]);

  const handleOnClick = () => {
    dispatch(toggleCountryDetailsOverlay());
  };

  const handleClickAway = () => {
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
      <div className={styles.header}>
        <Typography variant="h5">
          {selectedCountry?.flag} {selectedCountry?.name.common}
        </Typography>
        <IconButton
          color="secondary"
          aria-label="Close"
          onClick={handleOnClick}
        >
          <CloseIcon />
        </IconButton>
      </div>
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
