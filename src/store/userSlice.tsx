import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/UserType";

export type UserState = {
  selectedUser: UserType;
  loading: boolean;
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
  },
});

export const {
  setSelectedUser,
  addCountryVisited,
  removeCountryVisited,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
