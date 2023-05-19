import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../components/pages/mechanics/types";

const initialState: { userDetails: User } = {
  userDetails: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload
    },
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;