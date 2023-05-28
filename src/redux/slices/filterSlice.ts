

import { createSlice } from "@reduxjs/toolkit";



type FilterSlice = {
  filterValues: { [key: string] : string | number };
  searchValue: string;
  sortColumn: { column: null | string,  value: boolean}
}

const initialState: FilterSlice = {
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
  }
}

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
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
    }
  }
})

export const { 
  setFilterValues, 
  clearFilterValues,
  setSearchValue,
  clearSearchValue,
  setSortColumn,
  clearSortColumn
  
} = filterSlice.actions;

export default filterSlice.reducer;