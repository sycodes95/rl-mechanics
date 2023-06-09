import { createSlice } from "@reduxjs/toolkit";
import { MechanicData } from "../types/types";



type MechanicsData = {
  mechanicsData: MechanicData[] | [];
  filterValues: { [key: string] : string | number };
  searchValue: string;
  sortColumn: { column: null | string,  value: boolean, clicks: number };
  mechanicsStatus: any;
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
    value: false,
    clicks: 0,
  },
  mechanicsStatus: [],
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
      state.sortColumn = { column: null, value: false, clicks: 0}
    },
    setMechanicsStatus: (state, action) => {
      state.mechanicsStatus = action.payload
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
  setMechanicsStatus,
  setAddMechanicIsOpen, 
  setEditMechanicIsOpen,
  setDeleteMechanicIsOpen
} = mechanicsSlice.actions;

export default mechanicsSlice.reducer;