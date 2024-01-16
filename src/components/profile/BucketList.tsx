import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemButton,
  Grid,
} from "@mui/material";

import styles from "../../styles/BucketList.module.scss";

export const BucketList = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          gutterBottom
        >
          Bucket List
        </Typography>

        <Grid container>
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
            <List component="ol" className={styles.orderedList}>
              <ListItem className={styles.listItem}>🇯🇵 Japan</ListItem>
              <ListItem className={styles.listItem}>🇧🇷 Brazil</ListItem>
              <ListItem className={styles.listItem}>🇬🇧 Great Britain</ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              component="h3"
              color="text.secondary"
              gutterBottom
              textTransform="uppercase"
            >
              CITIES
            </Typography>
            <List component="ol">
              <ListItem>🇯🇵 Tokio</ListItem>
              <ListItem>🇧🇷 Rio de Janeiro</ListItem>
              <ListItem>🇬🇧 London</ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
