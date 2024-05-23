import { GradientHeader } from "../components/global/GradientHeader";
import { SettingsForm } from "../components/settings/SettingsForm";
import styles from "../styles/Profile.module.scss";

export const Settings = () => {
  return (
    <div className={`${styles.module} ${styles.moduleSettings}`}>
      <GradientHeader />
      <div className={styles.content}>
        <SettingsForm />
      </div>
    </div>
  );
};
