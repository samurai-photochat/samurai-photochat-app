import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark", //заглушка
    error: null as Error,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: string }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const { changeTheme, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectError, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer

//types
export type Error = null | string
// export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
