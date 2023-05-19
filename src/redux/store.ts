import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { User } from '../components/pages/mechanics/types'
import { UserState } from './slices/userSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

// export type RootState = {
//   user: UserState;
// }

export type RootState = ReturnType<typeof store.getState>;

export default store;