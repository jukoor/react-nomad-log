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
import { db } from "../components/firebaseConfig";
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
import { User } from "../types/User";
import { setSelectedUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import React from "react";

export const UserDataContext = React.createContext<DocumentData | undefined>(
  undefined
);

export const Profile = () => {
  // console.log(app);
  let { userId } = useParams();

  let [userData, setUserData] = useState<DocumentData>();

  const dispatch = useDispatch();
  // const collectionRef = collection(db, "users");

  useEffect(() => {
    const getUser2 = async () => {
      if (userId) {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(setSelectedUser(docSnap.data() as User));
            setUserData(docSnap.data() as User);
            console.log(docSnap.data());
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    // const getUser = async () => {
    //   await getDocs(collectionRef)
    //     .then((userDataDoc) => {
    //       // let todoData = userData.docs.map((user) => ({ ...user.data(), id: did }))
    //       console.log(userDataDoc.docs);
    //       setUserData(userDataDoc);
    //       userDataDoc.forEach((doc) => {
    //         console.log(doc.data());
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    getUser2();
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
