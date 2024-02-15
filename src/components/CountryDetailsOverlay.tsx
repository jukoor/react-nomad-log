import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import CropFreeIcon from "@mui/icons-material/CropFree";
import WaterIcon from "@mui/icons-material/Water";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GoogleIcon from "@mui/icons-material/Google";
import SnoozeIcon from "@mui/icons-material/Snooze";
import SecurityIcon from "@mui/icons-material/Security";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RouterOutlinedIcon from "@mui/icons-material/RouterOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

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
  const [openDialog, setOpenDialog] = useState(false);

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
        {timezones.length > 1 ? (
          <Accordion sx={{ boxShadow: "none" }} className={styles.accordion}>
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
        ) : (
          timezones[0]
        )}
      </>
    );
  };

  const Car = () => {
    const lane = selectedCountry?.car.side;
    let tooltipContent;
    let laneIcon;

    if (lane === "right") {
      tooltipContent = "Right-hand traffic, as in 69% of countries worldwide.";
      laneIcon = <SwitchLeftIcon />;
    } else {
      tooltipContent = "Left-hand traffic, as in 31% of countries worldwide.";
      laneIcon = <SwitchRightIcon />;
    }

    return (
      <>
        <Tooltip
          sx={{ marginRight: "5px" }}
          title={tooltipContent}
          placement="left"
          arrow
        >
          {laneIcon}
        </Tooltip>
        {selectedCountry?.car.signs[0]}
      </>
    );
  };

  useEffect(() => {
    console.log(selectedCountry);
  }, [selectedCountry]);

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
          label: "Language",
          content: Array.isArray(selectedCountry.languages)
            ? selectedCountry.languages.join(", ")
            : Object.entries(selectedCountry.languages)
                .map(([, value]) => value)
                .join(", "),

          icon: <ChatOutlinedIcon />,
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
          label: "Car",
          content: <Car />,
          icon: <DirectionsCarIcon />,
        },
        // {
        //   label: "Currency",
        //   content: Array.isArray(selectedCountry.currencies)
        //     ? selectedCountry.currencies.join(", ")
        //     : Object.entries(selectedCountry.currencies)
        //         .map(([, value]) => `${value.name} (${value.symbol})`)
        //         .join(", "),
        //   icon: <CropFreeIcon />,
        // },
        {
          label: "Land locked",
          content: selectedCountry.landlocked ? "Yes" : "No",
          icon: <WaterIcon />,
        },
        {
          label: "Borders",
          content: concatArrayVals(selectedCountry.borders) || "None",
          icon: <HandshakeIcon />,
        },
        {
          label: "Maps",
          content: (
            <>
              <a
                className={styles.link}
                href={selectedCountry.maps.googleMaps}
                target="_blank"
              >
                <LaunchIcon fontSize="small" />
                <span>Google Maps</span>
              </a>
            </>
          ),
          icon: <GoogleIcon />,
        },
        {
          label: "Domain",
          content: selectedCountry.tld.join(", "),
          icon: <RouterOutlinedIcon />,
        },
        {
          label: "Timezones",
          content: <TimezoneCollapse timezones={selectedCountry.timezones} />,
          icon: <SnoozeIcon />,
        },
        {
          label: "Coat of Arms",
          content: (
            <>
              <IconButton
                aria-label="Enlarge Coat of Arms"
                title="Enlarge Coat of Arms"
                onClick={handleOpenDialog}
                sx={{ marginRight: "5px" }}
              >
                <ZoomInIcon />
              </IconButton>
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
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
            <span className={styles.headerEmoji}>{selectedCountry?.flag}</span>
            {selectedCountry?.name.common}
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
                secondary={c.content || ""}
                secondaryTypographyProps={{ component: "span" }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ "& .MuiDialog-paper": { width: "60%" } }}
      >
        <DialogTitle>
          {selectedCountry?.flag} {selectedCountry?.name.common}: Coat of Arms
        </DialogTitle>

        <DialogContent sx={{ margin: "20px" }}>
          <img
            src={selectedCountry?.coatOfArms.svg}
            alt="Coat of Arms"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
