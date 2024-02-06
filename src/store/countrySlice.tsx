import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountrySliceInnerType } from "../types/slices/CountrySliceType";
import { CountryShortType } from "../types/CountryShortType";
import countryDataStatic from "../../assets/json/restcountries.all.json";
import { fetchAllCountriesData } from "../services/apiCall";
import { CountryType } from "../types/CountryType";

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: countryDataStatic as any,
    selectedCountries: [],
    selectedCountry: null,
    loading: false,
  } as CountrySliceInnerType,
  reducers: {
    addSelectedCountry: (
      state: CountrySliceInnerType,
      action: PayloadAction<CountryShortType>
    ) => {
      state.selectedCountries = [...state.selectedCountries, action.payload];
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
export const { addSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;
