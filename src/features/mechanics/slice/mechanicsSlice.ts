import { createSlice } from "@reduxjs/toolkit";
import { MechanicData } from "../types/types";



type MechanicsData = {
  mechanicsData: MechanicData[] | [];
  filterValues: { [key: string] : string | number };
  searchValue: string;
  sortColumn: { column: null | string,  value: boolean};
  addMechanicIsOpen: boolean;
  editMechanicIsOpen: { open: boolean, mech_id: number | null };
  deleteMechanicIsOpen: { open: boolean, mech_id: number | null };
}

const initialState: MechanicsData = {
  mechanicsData: [],
  filterValues: {
    mechanic_status_value: "",
    mech_difficulty: "",
    mech_importance: "",
    mech_type: "",
    rating_difficulty: "",
    rating_importance: "",
  },
  searchValue: "",
  sortColumn: {
    column: null,
    value: false
  },
  addMechanicIsOpen: false,
  editMechanicIsOpen: { open: false, mech_id: null },
  deleteMechanicIsOpen: { open: false, mech_id: null }
}

export const mechanicsSlice = createSlice({
  name: 'mechanicsSlice',
  initialState,
  reducers: {
    setMechanicsData: (state, action) => {
      state.mechanicsData = action.payload
    },
    clearMechanicsData: (state) => {
      state.mechanicsData = []
    },
    setFilterValues: (state, action) => {
      state.filterValues = action.payload
    },
    clearFilterValues: (state) => {
      state.filterValues = { ...state.filterValues }
      Object.keys(state.filterValues).forEach(filter => {
        state.filterValues[filter] = ""
      })
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    clearSearchValue: (state) => {
      state.searchValue = ""
    },
    setSortColumn: (state, action) => {
      state.sortColumn = action.payload
    },
    clearSortColumn: (state) => {
      state.sortColumn = { column: null, value: false}
    },
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
  setMechanicsData, 
  clearMechanicsData,
  setFilterValues, 
  clearFilterValues,
  setSearchValue,
  clearSearchValue,
  setSortColumn,
  clearSortColumn,
  setAddMechanicIsOpen, 
  setEditMechanicIsOpen,
  setDeleteMechanicIsOpen
} = mechanicsSlice.actions;

export default mechanicsSlice.reducer;