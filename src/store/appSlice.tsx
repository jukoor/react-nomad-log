import { createSlice } from "@reduxjs/toolkit";
import { AppSliceInnerType } from "../types/slices/AppSliceType";

const appSlice = createSlice({
  name: "app",
  initialState: {
    countrySelectDialogIsOpen: false,
    menuOpen: false,
    countryDetailsOverlayOpen: false,
    countryActionsBarOpen: false,
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
    toggleCountryActionsBar: (state, action) => {
      state.countryActionsBarOpen = action.payload;
    },
  },
});

export const {
  setCountrySelectDialogOpen,
  toggleMenuVisibility,
  toggleCountryDetailsOverlay,
  toggleCountryActionsBar,
} = appSlice.actions;

export default appSlice.reducer;
