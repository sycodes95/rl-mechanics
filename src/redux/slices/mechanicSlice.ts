import { createSlice } from "@reduxjs/toolkit";
import { MechanicData } from "../../pages/mechanics/types";



type MechanicsData = {
  mechanicsData: MechanicData[] | [];
}

const initialState: MechanicsData = {
  mechanicsData: [],
}

export const mechanicSlice = createSlice({
  name: 'mechanicSlice',
  initialState,
  reducers: {
    setMechanicsData: (state, action) => {
      state.mechanicsData = action.payload
    },
    clearMechanicsData: (state) => {
      state.mechanicsData = []
    },
  }
});

export const { 
  setMechanicsData, 
  clearMechanicsData 
} = mechanicSlice.actions;

export default mechanicSlice.reducer;