import { createSlice } from "@reduxjs/toolkit";
import { CountrySliceInnerType } from "../types/slices/CountrySliceType";
import { fetchAllCountriesData } from "../services/apiCall";

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    selectedCountry: null,
    loading: false,
  } as CountrySliceInnerType,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountriesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCountriesData.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
        console.log("Country API fully fetched");
      })
      .addCase(fetchAllCountriesData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedCountry, clearSelectedCountry } =
  countrySlice.actions;

export default countrySlice.reducer;
