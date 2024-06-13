import styles from "../../styles/ParallaxHeader.module.scss";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import MountainBgImg from "../../images/mountains_bg.jpg";

export const ParallaxHeader = () => {
  return (
    <ParallaxBanner style={{ position: "fixed" }} className={styles.parallax}>
      <ParallaxBannerLayer speed={-5}>
        <img src={MountainBgImg} loading="lazy" className={styles.img} />
      </ParallaxBannerLayer>
    </ParallaxBanner>
  );
};
