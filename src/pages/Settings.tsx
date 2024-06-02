import { GradientHeader } from "../components/global/GradientHeader";
import { SettingsForm } from "../components/settings/SettingsForm";
import styles from "../styles/Settings.module.scss";

export const Settings = () => {
  return (
    <>
      <GradientHeader />
      <div className={styles.content}>
        <SettingsForm />
      </div>
    </>
  );
};
