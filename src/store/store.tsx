import { configureStore } from "@reduxjs/toolkit";
import countrySliceReducer from "./countrySlice";
import userSliceReducer from "./userSlice";

export default configureStore({
  reducer: {
    Country: countrySliceReducer,
    User: userSliceReducer,
  },
});
