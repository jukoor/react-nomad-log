import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import { Stack, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { Bio } from "../components/profile/Bio";
import { CountryLists } from "../components/profile/CountryLists";
import { useFetchUserData } from "../hooks/useFetchUserdata";
import { GradientHeader } from "../components/global/GradientHeader";

export const Profile = () => {
  let { userId } = useParams();

  useFetchUserData(userId);
  const theme = useTheme();

  return (
    <div className={`${styles.module} ${styles.moduleProfile}`}>
      <GradientHeader />
      <div className={styles.content}>
        <Container>
          <Stack
            spacing={theme.breakpoints.down("sm") ? 3 : 6}
            sx={{ pb: 5, mt: -10 }}
          >
            <Bio />
            {/* <ContinentsVisited /> */}
            <CountryLists />
            {/* <Trips /> */}
          </Stack>
        </Container>
      </div>
    </div>
  );
};
