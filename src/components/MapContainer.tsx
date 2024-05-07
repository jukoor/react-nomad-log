import styles from "../styles/Map.module.scss";
import "firebase/database";
import { Map } from "./Map";
import { CountryActionsBar } from "./CountryActionsBar";

export const MapContainer = () => {
  return (
    <div className={styles.mapContainer}>
      <CountryActionsBar />
      <Map />
    </div>
  );
};
