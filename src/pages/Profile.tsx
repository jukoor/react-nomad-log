import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Bio } from "../components/profile/Bio";
import { CountryLists } from "../components/profile/CountryLists";
import { useFetchUserData } from "../hooks/useFetchUserData";

export const Profile = () => {
  let { userId } = useParams();

  useFetchUserData(userId);

  return (
    <div className={`${styles.module} ${styles.moduleProfile}`}>
      <div className={styles.gradientHeader}></div>
      <div className={styles.content}>
        <Container>
          <Stack spacing={2}>
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
