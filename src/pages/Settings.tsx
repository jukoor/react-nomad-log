import { SettingsForm } from "../components/settings/SettingsForm";
import styles from "../styles/Profile.module.scss";

export const Settings = () => {
  return (
    <div className={`${styles.module} ${styles.moduleSettings}`}>
      <div className={styles.gradientHeader}></div>
      <div className={styles.content}>
        <SettingsForm />
      </div>
    </div>
  );
};
