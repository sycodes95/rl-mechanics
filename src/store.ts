import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
// import filterSlice from './slices/filterSlice'
import mechanicsSlice from './features/mechanics/slice/mechanicsSlice'
export const store = configureStore({
  reducer: {
    userSlice,
    mechanicsSlice
  }
})

// export type RootState = {
//   user: UserState;
// }

export type RootState = ReturnType<typeof store.getState>;

export default store;