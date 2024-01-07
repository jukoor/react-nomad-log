import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";

import styles from "../styles/CountryInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CountryState, addCountryVisited } from "../store/countrySlice";
import { CountrySliceType } from "../types/CountrySliceType";

const CountryInfo = () => {
  const dispatch = useDispatch();

  const selectedCountry = useSelector(
    (state: CountrySliceType) => state.Country.selectedCountry
  );

  const drawerWidth = 400;

  const handleOnClickAddVisited = () => {
    if (selectedCountry) {
      dispatch(addCountryVisited(selectedCountry));
    }
  };

  return (
    <Box sx={{ display: "flex" }} className={styles.countryInfoComp}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Typography variant="h4">
          <Box sx={{ display: "inline-block", mr: 2 }}>
            {selectedCountry.countryIcon}
          </Box>
          {selectedCountry.countryNameFull}
        </Typography>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
          onClick={handleOnClickAddVisited}
        >
          Visited
        </Button>

        <Button variant="contained" startIcon={<AddIcon />}>
          Bucketlist
        </Button>
      </Drawer>
    </Box>
  );
};

export default CountryInfo;
