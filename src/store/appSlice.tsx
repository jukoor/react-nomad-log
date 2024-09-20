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
    mapProjectionMap: true,
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
    toggleMapProjection: (state) => {
      state.mapProjectionMap = !state.mapProjectionMap;
    },
    setSnackbarOptions: (state, action) => {
      state.snackbarOptions = { ...state.snackbarOptions, ...action.payload };
    },
  },
});

export const {
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
