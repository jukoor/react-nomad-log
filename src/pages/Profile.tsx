import Container from "@mui/material/Container";
import styles from "../styles/Profile.module.scss";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Bio } from "../components/profile/Bio";
import { CountriesVisited } from "../components/profile/CountriesVisited";
import { ContinentsVisited } from "../components/profile/ContinentsVisited";
import { BucketList } from "../components/profile/BucketList";
import { Trips } from "../components/profile/Trips";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  QuerySnapshot,
  doc,
  DocumentData,
} from "firebase/firestore";
import { UserType } from "../types/UserType";
import { setSelectedUser } from "../store/userSlice";
import React from "react";
import { useAppDispatch } from "../hooks/hooks";

export const UserDataContext = React.createContext<DocumentData | undefined>(
  undefined
);

export const Profile = () => {
  let { userId } = useParams();

  let [userData, setUserData] = useState<DocumentData>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserDataFromFirestore = async () => {
      if (userId) {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(setSelectedUser(docSnap.data() as UserType));
            setUserData(docSnap.data() as UserType);
            console.log(docSnap.data());
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserDataFromFirestore();
  }, []);

  return (
    <UserDataContext.Provider value={userData}>
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
    </UserDataContext.Provider>
  );
};
