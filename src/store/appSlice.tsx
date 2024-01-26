import { createSlice } from "@reduxjs/toolkit";
import { AppSliceInnerType } from "../types/slices/AppSliceType";

const appSlice = createSlice({
  name: "app",
  initialState: {
    countrySelectDialogIsOpen: false,
    menuOpen: false,
  } as AppSliceInnerType,
  reducers: {
    setCountrySelectDialogOpen: (state, action) => {
      state.countrySelectDialogIsOpen = action.payload;
    },
    toggleMenuVisibility: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { setCountrySelectDialogOpen, toggleMenuVisibility } =
  appSlice.actions;

export default appSlice.reducer;
