import { Card, CardContent, Avatar, Typography, Chip } from "@mui/material";

import styles from "../../styles/Bio.module.scss";

export const Bio = () => {
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
          Julian Orth
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
          className={styles.nationality}
        >
          Nationality: 🇩🇪 German<br></br>
          Living in: 🇳🇿 Barcelona, Spain<br></br>
          Languages: 🇮🇹🇬🇧🇯🇵
        </Typography>
        <Chip label="Backpacker" variant="outlined" />
        <Chip label="Hostel" variant="outlined" />
        <Chip label="South East Asia" variant="outlined" />
        <Typography variant="button" display="block" gutterBottom>
          BIO
        </Typography>
        <Typography variant="body2" className={styles.bio}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </Typography>
      </CardContent>
    </Card>
  );
};
