import styles from "../../styles/ParallaxHeader.module.scss";
import { ParallaxBanner } from "react-scroll-parallax";

export const ParallaxHeader = () => {
  return (
    <ParallaxBanner
      style={{ position: "fixed" }}
      layers={[
        {
          image:
            "https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          speed: 5,
        },
      ]}
      className={styles.parallax}
    />
  );
};
