import { AppRootState } from "@/app/store/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AuthState = {
  token: null,
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
  },
})

export const { setToken, clearToken } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectToken = (state: AppRootState) => state.auth.token
export const selectIsAuthenticated = (state: AppRootState) => Boolean(state.auth.token)

//types

type AuthState = {
  token: string | null
}
