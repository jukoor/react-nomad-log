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
};
