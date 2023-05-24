import { createSlice } from "@reduxjs/toolkit";

type UserSlice = {
  user_details: {
    user_id: number;
    user_created_at: string;
    user_email: string;
    user_first_name: string;
    user_last_name: string;
    user_is_admin: boolean;
    user_is_verified: boolean;
    user_rank: string;
  } | null;
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