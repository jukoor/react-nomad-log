import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import { Stack, useTheme } from "@mui/material";
import { Bio } from "../components/profile/Bio";
import { CountryLists } from "../components/profile/CountryLists";
import { useFetchUserData } from "../hooks/useFetchUserdata";
import { ParallaxHeader } from "../components/global/ParallaxHeader";
import { ContinentsVisited } from "../components/profile/ContinentsVisited";

export const Profile = () => {
  useFetchUserData();
  const theme = useTheme();

  return (
    <>
      <ParallaxHeader />
      <div className={styles.content}>
        <Container>
          <Stack spacing={theme.breakpoints.down("sm") ? 3 : 6}>
            <Bio />
            <ContinentsVisited />
            <CountryLists />
          </Stack>
        </Container>
      </div>
    </>
  );
};
