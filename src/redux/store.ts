import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import modalSlice from './slices/modalSlice'
import filterSlice from './slices/filterSlice'
import mechanicSlice from './slices/mechanicSlice'
export const store = configureStore({
  reducer: {
    userSlice,
    modalSlice,
    filterSlice,
    mechanicSlice
  }
})

// export type RootState = {
//   user: UserState;
// }

export type RootState = ReturnType<typeof store.getState>;

export default store;