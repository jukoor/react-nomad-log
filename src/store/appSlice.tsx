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
    countryDetailView: null,
  } as AppSliceInnerType,
  reducers: {
    setCountryDetailView: (state, action) => {
      state.countryDetailView = action.payload;
    },
    toggleMenuVisibility: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    toggleCountryDetailsOverlay: (state) => {
      state.countryDetailsOverlayOpen = !state.countryDetailsOverlayOpen;
    },
    toggleCountryActionsBar: (state) => {
      state.countryActionsBarOpen = !state.countryActionsBarOpen;
    },
    setMapZoomIn: (state, action) => {
      state.mapZoomIn = action.payload;
    },
    setMapZoomOut: (state, action) => {
      state.mapZoomOut = action.payload;
    },
    setMapProjection: (state, action) => {
      state.mapProjectionGlobe = action.payload;
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
  setMapProjection,
  toggleMenuVisibility,
  toggleCountryDetailsOverlay,
  toggleCountryActionsBar,
  setMapZoomIn,
  setMapZoomOut,
  toggleMapProjection,
  setSnackbarOptions,
  setCountryDetailView,
} = appSlice.actions;

export default appSlice.reducer;
