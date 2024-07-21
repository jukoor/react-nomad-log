import { configureStore } from "@reduxjs/toolkit";
import countrySliceReducer from "./countrySlice.tsx";
import userSlice from "./userSlice.tsx";
import appSliceReducer from "./appSlice.tsx";

export const store = configureStore({
  reducer: {
    App: appSliceReducer,
    Country: countrySliceReducer,
    User: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
