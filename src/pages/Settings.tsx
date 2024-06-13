import { ParallaxHeader } from "../components/global/ParallaxHeader";
import { SettingsForm } from "../components/settings/SettingsForm";
import styles from "../styles/Settings.module.scss";

export const Settings = () => {
  return (
    <>
      <ParallaxHeader />
      <div className={styles.content}>
        <SettingsForm />
      </div>
    </>
  );
};
