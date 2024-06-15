import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Fetch All Country Data from restcountries.com API */
export const fetchAllCountriesData = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");

    return response.data;
  }
);
