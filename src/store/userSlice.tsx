import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/UserType";

export type UserState = {
  selectedUser: UserType;
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
      bioTags: [],
      bucketList: [],
      homeTown: "",
      nationality: "",
      countriesVisited: [],
    },
    isLoggedIn: false,
    loading: false,
  } as UserState,
  reducers: {
    setLoading: (state, action) => {
      var value = action.payload as boolean;
      state.loading = value;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = {
        ...state.selectedUser,
        ...action.payload,
      };
    },
    addCountryVisited: (state, action) => {
      const countryToAdd = action.payload as string;
      state.selectedUser.countriesVisited = [
        ...state.selectedUser.countriesVisited,
        countryToAdd,
      ];
    },
    removeCountryVisited: (state, action) => {
      const countryToRemove = action.payload as string;
      state.selectedUser.countriesVisited =
        state.selectedUser.countriesVisited.filter(
          (country) => country !== countryToRemove
        );
    },
    addCountryBucketList: (state, action) => {
      const countryToAdd = action.payload as string;
      state.selectedUser.bucketList = [
        ...state.selectedUser.bucketList,
        countryToAdd,
      ];
    },
    removeCountryBucketList: (state, action) => {
      const countryToRemove = action.payload as string;
      state.selectedUser.bucketList = state.selectedUser.bucketList.filter(
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
} = userSlice.actions;

export default userSlice.reducer;
