import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    countrySelectDialogIsOpen: false,
    menuOpen: false,
  },
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
