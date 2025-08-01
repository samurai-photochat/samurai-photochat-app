import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark", //заглушка
    error: null as Error,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectError: (state) => state.error,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: string }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const { changeTheme, setAppError } = appSlice.actions
export const { selectThemeMode, selectError } = appSlice.selectors
export const appReducer = appSlice.reducer

//types
export type Error = null | string
// export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
