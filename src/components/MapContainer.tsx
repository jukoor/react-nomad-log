import styles from "../styles/Map.module.scss";
import { loadUserFromFirebase } from "../services/firebaseHelper";
import "firebase/database";
import { Map } from "./Map";
import { CountryActionsBar } from "./CountryActionsBar";

export const MapContainer = () => {
  const dummyUserId = "8pVS1cDjBszgEUE0aug8";

  loadUserFromFirebase(dummyUserId);

  return (
    <div className={styles.mapContainer}>
      <CountryActionsBar />
      <Map />
    </div>
  );
};
