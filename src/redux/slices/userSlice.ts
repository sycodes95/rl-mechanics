import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../components/pages/mechanics/types";

type UserSlice = {
  user_details: User;
}

const initialState: UserSlice = {
  user_details: null,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user_details = action.payload
    },
  }
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;