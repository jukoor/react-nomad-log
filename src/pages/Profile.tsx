import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import { Stack, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { Bio } from "../components/profile/Bio";
import { CountryLists } from "../components/profile/CountryLists";
import { useFetchUserData } from "../hooks/useFetchUserdata";
import { ParallaxHeader } from "../components/global/ParallaxHeader";

export const Profile = () => {
  let { userId } = useParams();

  useFetchUserData(userId);
  const theme = useTheme();

  return (
    <>
      <ParallaxHeader />
      <div className={styles.content}>
        <Container>
          <Stack spacing={theme.breakpoints.down("sm") ? 3 : 6}>
            <Bio />
            {/* <ContinentsVisited /> */}
            <CountryLists />
          </Stack>
        </Container>
      </div>
    </>
  );
};
