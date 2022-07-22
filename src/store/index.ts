import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'
import { userReducer } from '@store/slices'
import { getUserDataService } from '@services/user/getUserData'

const store = configureStore({
  reducer: {
    user: userReducer,
    [getUserDataService.reducerPath]: getUserDataService.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getUserDataService.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
