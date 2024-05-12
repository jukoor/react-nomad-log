import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import WaterIcon from "@mui/icons-material/Water";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import SnoozeIcon from "@mui/icons-material/Snooze";
import SecurityIcon from "@mui/icons-material/Security";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RouterOutlinedIcon from "@mui/icons-material/RouterOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";

import styles from "../../styles/CountryDetailsOverlay.module.scss";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import CloseIcon from "@mui/icons-material/Close";

interface CountryInfo {
  label: string;
  content: string | string[] | number | boolean | ReactElement | undefined;
  icon: ReactElement;
}

export const CountryDetailsOverlay = () => {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState<"coatOfArms" | "flags">(
    "coatOfArms"
  );

  const drawerWidth = 400;

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

  useEffect(() => {
    if (selectedCountry) {
      console.log(selectedCountry);
    }
  }, [selectedCountry]);

  // Todo: Flag, Currencies

  const TimezoneCollapse = ({ timezones }: TimezoneCollapseProps) => {
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
    if (selectedCountry) {
      setCountry([
        {
          label: "Region",
          content: selectedCountry.region,
          icon: <PublicIcon />,
        },
        {
          label: "Subregion",
          content: selectedCountry.subregion,
          icon: <MapOutlinedIcon />,
        },
        {
          label: "Capital",
          content: concatArrayVals(selectedCountry.capital),
          icon: <AdjustOutlinedIcon />,
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
          icon: <Diversity1OutlinedIcon />,
        },
        {
          label: "Size",
          content: `${numberWithCommas(selectedCountry.area)} km²`,
          icon: <CropFreeOutlinedIcon />,
        },
        {
          label: "Car",
          content: <Car />,
          icon: <DirectionsCarOutlinedIcon />,
        },
        {
          label: "Currency",
          content: Object.entries(selectedCountry.currencies)[0]
            ? `${Object.entries(selectedCountry.currencies)[0][1].name} (${
                Object.entries(selectedCountry.currencies)[0][1].symbol
              })`
            : "",
          icon: <CurrencyExchangeOutlinedIcon />,
        },
        {
          label: "Land locked",
          content: selectedCountry.landlocked ? "Yes" : "No",
          icon: <WaterIcon />,
        },
        {
          label: "Borders",
          content: concatArrayVals(selectedCountry.borders) || "None",
          icon: <HandshakeOutlinedIcon />,
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
          label: "Flag",
          content: (
            <>
              <Tooltip title="Enlarge Flag" placement="top">
                <IconButton
                  onClick={() => handleOpenDialog("flags")}
                  sx={{ marginRight: "5px" }}
                >
                  <ZoomInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Enlarge Flag" placement="top">
                <IconButton
                  onClick={() => handleOpenDialog("flags")}
                  sx={{ marginRight: "5px" }}
                >
                  <img
                    src={selectedCountry.flags.svg}
                    className={styles.coatOfArms}
                  />
                </IconButton>
              </Tooltip>
            </>
          ),
          icon: <TourOutlinedIcon />,
        },
        {
          label: "Coat of Arms",
          content: (
            <>
              <Tooltip title="Enlarge Coat of Arms">
                <IconButton
                  onClick={() => handleOpenDialog("coatOfArms")}
                  sx={{ marginRight: "5px" }}
                >
                  <ZoomInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Enlarge Coat of Arms">
                <IconButton
                  onClick={() => handleOpenDialog("coatOfArms")}
                  sx={{ marginRight: "5px" }}
                >
                  <img
                    src={selectedCountry.coatOfArms.svg}
                    className={styles.coatOfArms}
                  />
                </IconButton>
              </Tooltip>
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

  const handleOpenDialog = (imageType: "coatOfArms" | "flags") => {
    setImageToDisplay(imageType);
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
        onClose={handleOnClick}
        sx={{
          width: "100%",
          maxWidth: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="right"
      >
        <div className={styles.header}>
          <Typography variant="h5" sx={{ display: "flex" }}>
            <span className={styles.headerEmoji}>{selectedCountry?.flag}</span>
            <span className={styles.title}>{selectedCountry?.name.common}</span>
          </Typography>
          <Tooltip
            sx={{ marginRight: "5px" }}
            title="Close"
            placement="bottom"
            arrow
          >
            <IconButton aria-label="Close" onClick={handleOnClick}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Divider />

        <List sx={{ paddingTop: 0 }}>
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
        sx={{ "& .MuiDialog-paper": { width: "60%", height: "auto" } }}
      >
        <DialogTitle>
          <span>
            {selectedCountry?.flag} {selectedCountry?.name.common}:{" "}
            {imageToDisplay === "flags" ? "Flag" : "Coat of Arms"}
          </span>

          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            margin: "20px",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={selectedCountry?.[imageToDisplay].svg}
            alt={
              imageToDisplay.charAt(0).toUpperCase() + imageToDisplay.slice(1)
            }
            style={{
              maxHeight: "100%",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </DialogContent>

        {imageToDisplay === "flags" && (
          <DialogActions>
            <Typography variant="body2" align="left">
              {selectedCountry?.flags.alt}
            </Typography>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};
