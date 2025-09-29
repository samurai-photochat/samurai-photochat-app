import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "@/app/api/baseApi"
import { appReducer, appSlice } from "@/app/model/appSlice"
import { authReducer, authSlice } from "@/features/auth/model/authSlice"
import { postsReducer, postsSlice } from "@/features/posts/model/postsSlice"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [postsSlice.name]: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
})

setupListeners(store.dispatch)
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
