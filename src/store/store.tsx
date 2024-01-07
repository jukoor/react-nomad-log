import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./countrySlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
