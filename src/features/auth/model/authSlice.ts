import { AppRootState } from "@/app/store/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MeResponse } from "@/features/auth/api/authApi.types"

const initialState: AuthState = {
  token: null,

  currentUser: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    clearToken: (state) => {
      state.token = null
    },
    setCurrentUser: (state, action: PayloadAction<MeResponse>) => {
      state.currentUser = action.payload
    },
    clearCurrentUser: (state) => {
      state.currentUser = null
    },
  },
})

export const { setToken, clearToken, setCurrentUser, clearCurrentUser } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectToken = (state: AppRootState) => state.auth.token
export const selectCurrentUser = (state: AppRootState) => state.auth.currentUser
export const selectCurrentUserId = (state: AppRootState) => state.auth.currentUser?.userId

//types

type AuthState = {
  token: string | null
  currentUser: MeResponse | null
}
