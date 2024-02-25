import { createSlice } from "@reduxjs/toolkit";
import { AppSliceInnerType } from "../types/slices/AppSliceType";

const appSlice = createSlice({
  name: "app",
  initialState: {
    countrySelectDialogIsOpen: false,
    menuOpen: false,
    countryDetailsOverlayOpen: false,
    countryActionsBarOpen: false,
    mapZoomIn: false,
    mapZoomOut: false,
    mapProjectionGlobe: null,
  } as AppSliceInnerType,
  reducers: {
    setCountrySelectDialogOpen: (state, action) => {
      state.countrySelectDialogIsOpen = action.payload;
    },
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
  },
});

export const {
  setCountrySelectDialogOpen,
  toggleMenuVisibility,
  toggleCountryDetailsOverlay,
  setCountryActionsBar,
  setMapZoomIn,
  setMapZoomOut,
  toggleMapProjection,
} = appSlice.actions;

export default appSlice.reducer;
