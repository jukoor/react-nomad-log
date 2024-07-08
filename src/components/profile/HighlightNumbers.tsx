import { AccountCircle, FlightTakeoff, LocationOn } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const HighlightNumbers = () => {
  return (
    <>
      <List sx={{ display: "flex" }}>
        <ListItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="11%" secondary="OF THE WORLD" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FlightTakeoff />
          </ListItemIcon>
          <ListItemText primary="14" secondary="COUNTRIES" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary="5/7" secondary="CONTINENTS" />
        </ListItem>
      </List>
    </>
  );
};
