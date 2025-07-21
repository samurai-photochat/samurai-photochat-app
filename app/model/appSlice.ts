import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark", //заглушка
    error: null as Error,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: string }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
})

export const { changeTheme } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors
export const appReducer = appSlice.reducer

//types
export type Error = null | string
// export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
