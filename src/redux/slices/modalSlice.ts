
import { createSlice } from "@reduxjs/toolkit";

const initialState: { addMechanicIsOpen: boolean } = {
  addMechanicIsOpen: false,
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setAddMechanicIsOpen: (state, action) => {
      state.addMechanicIsOpen = action.payload
    },
  }
});

export const { setAddMechanicIsOpen } = modalSlice.actions;
export default modalSlice.reducer;