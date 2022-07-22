import {
  PayloadAction,
  createSlice
} from '@reduxjs/toolkit'
import { RootState } from '@store/index'

type UserState = {
  isAuth: boolean,
}

const initialState: UserState = { isAuth: false }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { setUserAuth: (state, { payload }: PayloadAction<boolean>) => {
    state.isAuth = payload
  } }
})

export const getUserAuth = (state: RootState) => state.user.isAuth

export const { setUserAuth } = userSlice.actions

export const { reducer: userReducer } = userSlice
