import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import modalSlice from './slices/modalSlice'
import { User } from '../components/pages/mechanics/types'
export const store = configureStore({
  reducer: {
    userSlice,
    modalSlice,
  }
})

// export type RootState = {
//   user: UserState;
// }

export type RootState = ReturnType<typeof store.getState>;

export default store;