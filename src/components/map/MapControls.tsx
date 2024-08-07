import { Box, Tooltip, IconButton } from "@mui/material";
import {
  toggleMapProjection,
  setMapZoomIn,
  setMapZoomOut,
} from "../../store/appSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import styles from "../../styles/MapControls.module.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import PublicIcon from "@mui/icons-material/Public";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

export const MapControls = () => {
  const mapProjection = useAppSelector((state) => state.App.mapProjectionGlobe);

  const countryDetailView = useAppSelector(
    (state) => state.App.countryDetailView
  );
  const dispatch = useAppDispatch();

  return (
    <Box className={styles.zoomControl}>
      {mapProjection === true ? (
        <Tooltip title="Change globe to map" placement="right" arrow>
          <IconButton
            className={`${styles.actionBtn} ${styles.first}`}
            onClick={() => dispatch(toggleMapProjection())}
          >
            <MapOutlinedIcon sx={{ width: "0.9em", height: "0.9em" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Change map to globe" placement="right" arrow>
          <IconButton
            className={`${
              countryDetailView === false
                ? `${styles.actionBtn} ${styles.first} ${styles.disabled}`
                : `${styles.actionBtn} ${styles.first}`
            }`}
            onClick={() => dispatch(toggleMapProjection())}
          >
            <PublicIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Zoom in" placement="right" arrow>
        <IconButton
          className={`${styles.actionBtn} ${styles.middle}`}
          onClick={() => dispatch(setMapZoomIn(true))}
        >
          <AddOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Zoom out" placement="right" arrow>
        <IconButton
          className={`${styles.actionBtn} ${styles.last}`}
          onClick={() => dispatch(setMapZoomOut(true))}
        >
          <RemoveOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
