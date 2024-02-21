import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Grid,
} from "@mui/material";

import styles from "../../styles/BucketList.module.scss";

export const BucketList2 = () => {
  return (
    <div className={`module ${styles.moduleBucketList}`}>
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
              <List component="ol" className={styles.orderedList}>
                <ListItem className={styles.listItem}>
                  <span className={styles.flag}>🇯🇵</span> Japan
                </ListItem>
                <ListItem className={styles.listItem}>
                  <span className={styles.flag}>🇧🇷</span> Brazil
                </ListItem>
                <ListItem className={styles.listItem}>
                  <span className={styles.flag}>🇬🇧</span> Great Britain
                </ListItem>
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
                <ListItem className={styles.listItem}>
                  <span className={styles.flag}>🇯🇵</span> Tokio
                </ListItem>
                <ListItem className={styles.listItem}>
                  <span className={styles.flag}>🇧🇷</span> Rio de Janeiroil
                </ListItem>
                <ListItem className={styles.listItem}>
                  <span className={styles.flag}>🇬🇧</span> London
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
