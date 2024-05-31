import { useEffect } from "react";
import { fetchAllCountriesData } from "../services/fetchCountryDataApiCall";
import { useAppDispatch } from "./reduxHooks";

// Fetches all country data from API
export const useFetchCountryDataFromApi = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCountriesData());
  }, [dispatch]);
};
