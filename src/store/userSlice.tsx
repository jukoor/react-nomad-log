import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/UserType";
import { CountryCca2Type } from "../types/CountryCca2Type";

export type UserState = {
  selectedUser: UserType | null;
  countryVisitedTemp: CountryCca2Type | null;
  countryLivedTemp: CountryCca2Type | null;
  countryBucketListTemp: CountryCca2Type | null;
  loading: boolean;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    selectedUser: null,
    countryVisitedTemp: null,
    countryBucketListTemp: null,
    countryLivedTemp: null,
    loading: false,
  } as UserState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = {
        ...state.selectedUser,
        ...action.payload,
      };
    },
    addCountryVisited: (state, action) => {
      const countryToAdd = action.payload as CountryCca2Type;
      if (state.selectedUser) {
        state.selectedUser.countriesVisited = [
          ...(state.selectedUser.countriesVisited || []),
          countryToAdd,
        ];
      }
    },
    removeCountryVisited: (state, action) => {
      const countryToRemove = action.payload as CountryCca2Type;
      if (state.selectedUser) {
        state.selectedUser.countriesVisited =
          state.selectedUser.countriesVisited?.filter(
            (country) => country !== countryToRemove
          );
      }
    },
    addCountryBucketList: (state, action) => {
      const countryToAdd = action.payload as CountryCca2Type;
      if (state.selectedUser) {
        state.selectedUser.countriesBucketList = [
          ...(state.selectedUser.countriesBucketList || []),
          countryToAdd,
        ];
      }
    },
    removeCountryBucketList: (state, action) => {
      const countryToRemove = action.payload as CountryCca2Type;
      if (state.selectedUser) {
        state.selectedUser.countriesBucketList =
          state.selectedUser.countriesBucketList?.filter(
            (country) => country !== countryToRemove
          );
      }
    },
    addCountryLived: (state, action) => {
      const countryToAdd = action.payload as CountryCca2Type;
      if (state.selectedUser) {
        state.selectedUser.countriesLived = [
          ...(state.selectedUser.countriesLived || []),
          countryToAdd,
        ];
      }
    },
    removeCountryLived: (state, action) => {
      const countryToRemove = action.payload as CountryCca2Type;
      if (state.selectedUser) {
        state.selectedUser.countriesLived =
          state.selectedUser.countriesLived?.filter(
            (country) => country !== countryToRemove
          );
      }
    },
  },
});

export const {
  setLoading,
  setSelectedUser,
  addCountryVisited,
  addCountryBucketList,
  addCountryLived,
  removeCountryVisited,
  removeCountryBucketList,
  removeCountryLived,
  resetSelectedUser,
} = userSlice.actions;

export default userSlice;
