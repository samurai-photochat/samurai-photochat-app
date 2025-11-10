import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark", //заглушка
    error: null as Error,
    success: "",
    isLoggedIn: false,
    // ⏱️ ВРЕМЯ ЖИЗНИ TOAST: Настройка автозакрытия уведомлений (в миллисекундах)
    // По умолчанию 5000ms (5 секунд) - стандартное время для toast уведомлений
    // Можно изменить для всех toast или передавать индивидуально при вызове
    toastAutoClose: 3000,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectSuccess: (state) => state.success,
    // ⏱️ СЕЛЕКТОР ВРЕМЕНИ ЖИЗНИ: Получение настройки автозакрытия toast
    selectToastAutoClose: (state) => state.toastAutoClose,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: string }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    // ⏱️ УСТАНОВКА ОШИБКИ: Можно передать autoClose для индивидуального времени жизни
    setAppError: create.reducer<{ error: string | null; autoClose?: number }>((state, action) => {
      state.error = action.payload.error
      // Если передан autoClose, обновляем глобальную настройку
      if (action.payload.autoClose !== undefined) {
        state.toastAutoClose = action.payload.autoClose
      }
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    // ⏱️ УСТАНОВКА УСПЕХА: Можно передать autoClose для индивидуального времени жизни
    setAppSuccess: create.reducer<{ success: string; autoClose?: number }>((state, action) => {
      state.success = action.payload.success
      // Если передан autoClose, обновляем глобальную настройку
      if (action.payload.autoClose !== undefined) {
        state.toastAutoClose = action.payload.autoClose
      }
    }),
  }),
})

export const { changeTheme, setAppError, setIsLoggedIn, setAppSuccess } = appSlice.actions
export const { selectThemeMode, selectError, selectIsLoggedIn, selectSuccess, selectToastAutoClose } = appSlice.selectors
export const appReducer = appSlice.reducer

//types
export type Error = null | string
// export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
