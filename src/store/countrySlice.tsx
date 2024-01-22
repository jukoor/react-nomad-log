import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Countries } from "../types/Countries";
import { Country } from "../types/Country";
import axios from "axios";

export type CountryData = {
  countries: Country[];
  selectedCountries: Country[];
  loading: boolean;
};

export const fetchCountriesData = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  }
);

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    selectedCountries: [],
    loading: false,
  } as CountryData,
  reducers: {
    addSelectedCountry: (
      state: CountryData,
      action: PayloadAction<Country>
    ) => {
      state.selectedCountries = [...state.selectedCountries, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountriesData.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountriesData.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;
