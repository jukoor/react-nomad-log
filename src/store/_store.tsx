import { configureStore } from "@reduxjs/toolkit";
import countrySliceReducer from "./countrySlice.tsx";
import userSliceReducer from "./userSlice.tsx";
import appSliceReducer from "./appSlice.tsx";

export const store = configureStore({
  reducer: {
    App: appSliceReducer,
    Country: countrySliceReducer,
    User: userSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
