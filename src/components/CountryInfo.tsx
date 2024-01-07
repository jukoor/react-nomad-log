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
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";

import styles from "../styles/CountryInfo.module.scss";

const CountryInfo = () => {
  const drawerWidth = 400;

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
        <Toolbar />
        <Divider />
        <Typography variant="h3">🇩🇪 Deutschland</Typography>
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
          startIcon={<AddLocationAltOutlinedIcon />}
          sx={{ mb: 2 }}
        >
          Visited
        </Button>

        <Button
          variant="contained"
          startIcon={<FormatListNumberedOutlinedIcon />}
        >
          Bucketlist
        </Button>
      </Drawer>
    </Box>
  );
};

export default CountryInfo;
