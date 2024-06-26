import { createSlice } from "@reduxjs/toolkit";
import { AppSliceInnerType } from "../types/slices/AppSliceType";

const appSlice = createSlice({
  name: "app",
  initialState: {
    menuOpen: false,
    countryDetailsOverlayOpen: false,
    countryActionsBarOpen: false,
    mapZoomIn: false,
    mapZoomOut: false,
    mapProjectionGlobe: null,
    snackbarOptions: { open: false, message: "", severity: "success" },
  } as AppSliceInnerType,
  reducers: {
    toggleMenuVisibility: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    toggleCountryDetailsOverlay: (state) => {
      state.countryDetailsOverlayOpen = !state.countryDetailsOverlayOpen;
    },
    setCountryActionsBar: (state, action) => {
      state.countryActionsBarOpen = action.payload;
    },
    setMapZoomIn: (state, action) => {
      state.mapZoomIn = action.payload;
    },
    setMapZoomOut: (state, action) => {
      state.mapZoomOut = action.payload;
    },
    toggleMapProjection: (state) => {
      if (state.mapProjectionGlobe === null) {
        state.mapProjectionGlobe = true;
      } else {
        state.mapProjectionGlobe = !state.mapProjectionGlobe;
      }
    },
    setSnackbarOptions: (state, action) => {
      state.snackbarOptions = { ...state.snackbarOptions, ...action.payload };
    },
  },
});

export const {
  toggleMenuVisibility,
  toggleCountryDetailsOverlay,
  setCountryActionsBar,
  setMapZoomIn,
  setMapZoomOut,
  toggleMapProjection,
  setSnackbarOptions,
} = appSlice.actions;

export default appSlice.reducer;
