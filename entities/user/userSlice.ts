import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const { setIsLoggedIn } = userSlice.actions
export const { selectIsLoggedIn } = userSlice.selectors
export const userReducer = userSlice.reducer
