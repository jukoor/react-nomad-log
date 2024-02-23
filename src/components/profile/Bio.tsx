import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Box,
  Divider,
} from "@mui/material";

import styles from "../../styles/Bio.module.scss";
import { useContext } from "react";
import { UserDataContext } from "../../pages/Profile";
import { getFirstLettersFromName } from "../../utils/appUtils";

export const Bio = () => {
  const userData = useContext(UserDataContext);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <Avatar
            className={styles.avatar}
            {...getFirstLettersFromName(
              `${userData?.nameFirst} ${userData?.nameLast}`
            )}
          />
          <Typography
            variant="h5"
            component="h1"
            color="text.secondary"
            className={styles.name}
          >
            {userData?.nameFirst} {userData?.nameLast}
          </Typography>
        </Box>

        <Typography
          sx={{ mb: 1.5, color: "grey" }}
          color="text.secondary"
          className={styles.nationality}
        >
          Nationality: 🇩🇪 {userData?.nationality}
          <br></br>
          Living in: 🇳🇿 {userData?.homeTown}
        </Typography>

        <div className={styles.tags}>
          {userData?.bioTags.map((item: any, index: any) => {
            return (
              <Chip
                className={styles.tag}
                key={index}
                label={item}
                variant="outlined"
                color="primary"
              />
            );
          })}
        </div>

        <Typography variant="button" display="block" gutterBottom>
          BIO
        </Typography>
        <Divider sx={{ mb: "10px" }} />
        <Typography variant="body2" className={styles.bio}>
          {userData?.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};
