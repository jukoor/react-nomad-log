import { AlertColor } from "@mui/material";

export type AppSliceType = {
  App: AppSliceInnerType;
};

export type AppSliceInnerType = {
  menuOpen: boolean;
  countryDetailsOverlayOpen: boolean;
  countryActionsBarOpen: boolean;
  mapZoomIn: boolean;
  mapZoomOut: boolean;
  mapProjectionGlobe: boolean | null;
  snackbarOptions: {
    open: boolean;
    message: string;
    severity?: AlertColor;
  };
};
