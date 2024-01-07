import { configureStore } from "@reduxjs/toolkit";
import countrySliceReducer from "./countrySlice";

export default configureStore({
  reducer: {
    Country: countrySliceReducer,
  },
});
