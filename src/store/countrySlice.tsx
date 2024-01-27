import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountrySliceInnerType } from "../types/slices/CountrySliceType";
import axios from "axios";
import { CountryShortType } from "../types/CountryShortType";

export const fetchCountriesData = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    // const response = await axios.get("https://restcountries.com/v3.1/all");
    const response = await axios.get(
      "https://restcountries.com/v3.1/name/germany"
    );

    return response.data;
  }
);

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    selectedCountries: [],
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
      .addCase(fetchCountriesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountriesData.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
        // console.log("Country API fully fetched");
      })
      .addCase(fetchCountriesData.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;
