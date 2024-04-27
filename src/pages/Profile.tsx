import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Bio } from "../components/profile/Bio";
import { CountryLists } from "../components/profile/CountryLists";
import { useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserType } from "../types/UserType";
import { setLoading, setSelectedUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useFetchUserData } from "../hooks/useFetchUserData";

export const Profile = () => {
  let { userId } = useParams();
  const dispatch = useAppDispatch();

  useFetchUserData(userId);

  return (
    <div className={`${styles.module} ${styles.moduleProfile}`}>
      <div className={styles.gradientHeader}></div>
      <div className={styles.content}>
        <div className={styles.bio}>
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
    </div>
  );
};
