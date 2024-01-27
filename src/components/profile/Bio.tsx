import { Card, CardContent, Avatar, Typography, Chip } from "@mui/material";

import styles from "../../styles/Bio.module.scss";
import { useContext, useEffect } from "react";
import { UserDataContext } from "../../pages/Profile";
import { User } from "../../types/User";

export const Bio = () => {
  const userData = useContext(UserDataContext);

  useEffect(() => {
    console.log("bio");
  }, []);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Avatar
          src="https://mui.com/static/images/avatar/2.jpg"
          sx={{ width: 56, height: 56 }}
          className={styles.avatar}
        />
        <Typography
          variant="h3"
          component="h1"
          color="text.secondary"
          gutterBottom
          className={styles.name}
        >
          {userData?.nameFirst} {userData?.nameLast}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
          className={styles.nationality}
        >
          Nationality: 🇩🇪 {userData?.nationality}
          <br></br>
          Living in: 🇳🇿 {userData?.homeTown}
          <br></br>
          Languages: 🇮🇹🇬🇧🇯🇵
        </Typography>
        {userData?.bioTags.map((item: any, index: any) => {
          return <Chip key={index} label={item} variant="outlined" />;
        })}

        <Typography variant="button" display="block" gutterBottom>
          BIO
        </Typography>
        <Typography variant="body2" className={styles.bio}>
          {userData?.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};
