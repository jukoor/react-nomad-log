import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Bio } from "../components/profile/Bio";
import { CountryLists } from "../components/profile/CountryLists";
import { useFetchUserData } from "../hooks/useFetchUserdata";
import { GradientHeader } from "../components/global/GradientHeader";

export const Profile = () => {
  let { userId } = useParams();

  useFetchUserData(userId);

  return (
    <div className={`${styles.module} ${styles.moduleProfile}`}>
      <GradientHeader />
      <div className={styles.content}>
        <Container>
          <Stack spacing={2} sx={{ pb: 10 }}>
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
