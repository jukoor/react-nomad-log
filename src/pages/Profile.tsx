import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Bio } from "../components/profile/Bio";
import { CountriesVisited } from "../components/profile/CountriesVisited";
import { ContinentsVisited } from "../components/profile/ContinentsVisited";
import { BucketList } from "../components/profile/BucketList";
import { Trips } from "../components/profile/Trips";

export const Profile = () => {
  let { userId } = useParams();

  return (
    <div className={`${styles.module} ${styles.moduleProfile}`}>
      <div className={styles.gradientHeader}></div>
      <div className={styles.content}>
        <div className={styles.bio}>
          <Container>
            <Stack spacing={2}>
              <Bio />
              <CountriesVisited />
              <ContinentsVisited />
              <BucketList />
              <Trips />
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  );
};
