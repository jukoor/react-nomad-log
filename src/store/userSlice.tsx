import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/UserType";
import { CountryCca2Type } from "../types/CountryCca2Type";

export type UserState = {
  selectedUser: UserType;
  countryVisitedTemp: string;
  loading: boolean;
  isLoggedIn: boolean;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    selectedUser: {
      uid: "",
      nameFirst: "",
      nameLast: "",
      bio: "",
      tags: [],
      homeTown: "",
      nationality: "",
      countriesVisited: [],
      countriesBucketList: [],
      countriesLived: [],
    },
    countryVisitedTemp: "",
    isLoggedIn: false,
    loading: false,
  } as UserState,
  reducers: {
    setCountryVisitedTemp: (state, action) => {
      state.countryVisitedTemp = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = {
        ...state.selectedUser,
        ...action.payload,
      };
    },
    updateCountriesVisited: (state, action) => {
      state.selectedUser.countriesVisited = [
        ...(state.selectedUser.countriesVisited || []),
        action.payload,
      ];
    },
    addCountryVisited: (state, action) => {
      const countryToAdd = action.payload as CountryCca2Type;
      state.selectedUser.countriesVisited = [
        ...(state.selectedUser.countriesVisited || []),
        countryToAdd,
      ];
    },
    removeCountryVisited: (state, action) => {
      const countryToRemove = action.payload as CountryCca2Type;
      state.selectedUser.countriesVisited =
        state.selectedUser.countriesVisited?.filter(
          (country) => country !== countryToRemove
        );
    },
    addCountryBucketList: (state, action) => {
      const countryToAdd = action.payload as CountryCca2Type;
      state.selectedUser.countriesBucketList = [
        ...(state.selectedUser.countriesBucketList || []),
        countryToAdd,
      ];
    },
    removeCountryBucketList: (state, action) => {
      const countryToRemove = action.payload as CountryCca2Type;
      state.selectedUser.countriesBucketList =
        state.selectedUser.countriesBucketList?.filter(
          (country) => country !== countryToRemove
        );
    },
    setUserLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setLoading,
  setSelectedUser,
  addCountryVisited,
  removeCountryVisited,
  addCountryBucketList,
  removeCountryBucketList,
  setUserLoggedIn,
  updateCountriesVisited,
  setCountryVisitedTemp,
} = userSlice.actions;

export default userSlice.reducer;
