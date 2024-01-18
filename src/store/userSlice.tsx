import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";

export type UserState = {
  selectedUser: User;
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
    },
  } as UserState,
  reducers: {
    setSelectedUser: (state: UserState, action: PayloadAction<User>) => {
      state.selectedUser = {
        ...state.selectedUser,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
