import { CountryActionsBar } from "../components/map/CountryActionsBar";
import { Map } from "../components/map/Map";
import styles from "../styles/Map.module.scss";

export const Home = () => {
  return (
    <div className={styles.mapContainer}>
      <CountryActionsBar />
      <Map />
    </div>
  );
};
