import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Country = {
  countryNameShort: string;
  countryNameFull: string;
  countryIcon: string;
};

export type CountryState = {
  selectedCountry: Country;
  countriesVisited: Country[];
};

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    selectedCountry: {
      countryNameShort: "",
      countryNameFull: "",
      countryIcon: "",
    },
    countriesVisited: [],
  } as CountryState,
  reducers: {
    addCountryVisited: (
      state: CountryState,
      action: PayloadAction<Country>
    ) => {
      state.countriesVisited = [...state.countriesVisited, action.payload];
    },
    setSelectedCountry: (
      state: CountryState,
      action: PayloadAction<Country>
    ) => {
      state.selectedCountry = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCountryVisited, setSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;
