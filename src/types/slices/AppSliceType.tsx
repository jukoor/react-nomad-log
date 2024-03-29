import { AlertColor } from "@mui/material";

export type AppSliceType = {
  App: AppSliceInnerType;
};

export type AppSliceInnerType = {
  countrySelectDialogIsOpen: boolean;
  menuOpen: boolean;
  countryDetailsOverlayOpen: boolean;
  countryActionsBarOpen: boolean;
  mapZoomIn: boolean;
  mapZoomOut: boolean;
  mapProjectionGlobe: boolean | null;
  snackbarOptions: {
    message: string;
    severity: AlertColor;
  };
};
