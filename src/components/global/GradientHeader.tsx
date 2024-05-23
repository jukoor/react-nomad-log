import styles from "../../styles/GradientHeader.module.scss";

export const GradientHeader = () => {
  return (
    <div className={styles.gradientHeader}>
      <div className={styles.blackOverlay}></div>
    </div>
  );
};
