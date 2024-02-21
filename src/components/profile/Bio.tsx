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
            src="https://mui.com/static/images/avatar/2.jpg"
            sx={{ width: 56, height: 56 }}
            className={styles.avatar}
          />
          <Typography
            variant="h4"
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
        {userData?.bioTags.map((item: any, index: any) => {
          return (
            <Chip
              sx={{ mr: "10px", mb: "20px" }}
              key={index}
              label={item}
              variant="outlined"
            />
          );
        })}

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
