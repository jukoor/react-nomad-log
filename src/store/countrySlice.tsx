import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountrySliceInnerType } from "../types/slices/CountrySliceType";
import { CountryShortType } from "../types/CountryShortType";
import countryDataStatic from "../../assets/json/restcountries.all.json";
import { fetchAllCountriesData } from "../services/apiCall";
import { CountryType } from "../types/CountryType";

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: countryDataStatic as unknown as CountryType[],
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
        // console.log("loading");
      })
      .addCase(fetchAllCountriesData.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
        // console.log("Country API fully fetched");
      })
      .addCase(fetchAllCountriesData.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedCountry, clearSelectedCountry } =
  countrySlice.actions;

export default countrySlice.reducer;
