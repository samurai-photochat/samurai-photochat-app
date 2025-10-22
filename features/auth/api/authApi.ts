import { baseApi } from "@/shared/api/baseApi"
import {
  BaseApiResponse,
  ConfirmationRequest,
  GoogleOAuthRequest,
  GoogleOAuthResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  RefreshTokenResponse,
  RegisterRequest,
  ResendingEmailRequest,
} from "./authApi.types"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import { clearToken, clearCurrentUser, setCurrentUser, setToken } from "@/features/auth/model/authSlice"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      refreshToken: builder.mutation<RefreshTokenResponse, void>({
        query: () => ({
          url: "/auth/update-tokens",
          method: "POST",
        }),
      }),
      me: builder.query<MeResponse, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            if (!data) return
            const currentUser: MeResponse = { ...data }
            dispatch(setCurrentUser(currentUser))
          } catch (error) {
            console.log("Failed to fetch user data:", error)
          }
        },
        query: () => {
          return {
            method: "GET",
            url: "/auth/me",
          }
        },
        providesTags: ["User"],
      }),
      registration: builder.mutation<BaseApiResponse, RegisterRequest>({
        query: (body) => {
          return {
            url: "auth/registration",
            method: "POST",
            body,
          }
        },
      }),
      confirmation: builder.mutation<BaseApiResponse, ConfirmationRequest>({
        query: (confirmCode) => {
          return {
            method: "POST",
            url: "auth/registration-confirmation",
            body: confirmCode,
          }
        },
      }),
      emailResending: builder.mutation<BaseApiResponse, ResendingEmailRequest>({
        query: (confirmCode) => {
          return {
            method: "POST",
            url: "auth/registration-email-resending",
            body: confirmCode,
          }
        },
      }),
      login: builder.mutation<LoginResponse, LoginRequest>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            if (!data) return

            LocalStorage.setToken(data.accessToken)
            dispatch(setToken(data.accessToken))
            dispatch(authApi.util.invalidateTags(["User"]))

            const meResult = await dispatch(authApi.endpoints.me.initiate())
            if ("data" in meResult && meResult.data) dispatch(setCurrentUser(meResult.data))
          } catch (error) {
            console.error("Login failed:", error)
          }
        },
        query: (arg) => {
          return {
            method: "POST",
            url: "auth/login",
            body: arg,
          }
        },
      }),
      logout: builder.mutation<BaseApiResponse, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
          } catch (error) {
            console.error("Logout failed on server:", error)
            // Не выбрасываем ошибку дальше, чтобы позволить компонентам
            // обрабатывать очистку состояния самостоятельно
          } finally {
            // Всегда очищаем локальное состояние, даже если сервер вернул ошибку
            LocalStorage.removeToken()
            dispatch(clearToken())
            dispatch(clearCurrentUser())
            dispatch(authApi.util.resetApiState())
          }
        },
        query: () => {
          return {
            method: "POST",
            url: "auth/logout",
          }
        },
        invalidatesTags: ["User"],
      }),
      googleOAuth: builder.mutation<GoogleOAuthResponse, GoogleOAuthRequest>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            if (!data) return

            LocalStorage.setToken(data.accessToken)
            dispatch(setToken(data.accessToken))
            dispatch(authApi.util.invalidateTags(["User"]))

            const meResult = await dispatch(authApi.endpoints.me.initiate())
            if ("data" in meResult && meResult.data) dispatch(setCurrentUser(meResult.data))
          } catch (error) {
            console.error("Google OAuth failed:", error)
          }
        },
        query: (arg) => {
          return {
            method: "POST",
            url: "auth/google/login",
            body: arg,
          }
        },
      }),
    }
  },
})

export const {
  useMeQuery,
  useLazyMeQuery,
  useRegistrationMutation,
  useConfirmationMutation,
  useEmailResendingMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGoogleOAuthMutation,
} = authApi

export type { ResendingEmailRequest, RegisterRequest as UserType, LoginRequest as LoginType } from "./authApi.types"
