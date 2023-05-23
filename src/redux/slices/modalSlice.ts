
import { createSlice } from "@reduxjs/toolkit";
type ModalSlice = {
  addMechanicIsOpen: boolean;
  editMechanicIsOpen: { open: boolean, mech_id: number | null };
  deleteMechanicIsOpen: { open: boolean, mech_id: number | null };
}

const initialState: ModalSlice = {
  addMechanicIsOpen: false,
  editMechanicIsOpen: { open: false, mech_id: null },
  deleteMechanicIsOpen: { open: false, mech_id: null }
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setAddMechanicIsOpen: (state, action) => {
      state.addMechanicIsOpen = action.payload
    },
    setEditMechanicIsOpen: (state, action) => {
      state.editMechanicIsOpen = action.payload
    },
    setDeleteMechanicIsOpen: (state, action) => {
      state.deleteMechanicIsOpen = action.payload
    },
  }
});

export const { 
  setAddMechanicIsOpen, 
  setEditMechanicIsOpen,
  setDeleteMechanicIsOpen
} = modalSlice.actions;
  
export default modalSlice.reducer;