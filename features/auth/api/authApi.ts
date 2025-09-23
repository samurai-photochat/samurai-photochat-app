import { baseApi } from "@/shared/api/baseApi"
import {
  BaseApiResponse,
  ConfirmationRequest,
  GoogleLoginRequest,
  LoginRequest,
  LoginResponse,
  MeResponse,
  RefreshTokenResponse,
  RegisterRequest,
  ResendingEmailRequest,
} from "./authApi.types"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import { clearToken, setCurrentUser, setToken } from "@/features/auth/model/authSlice"

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
      logout: builder.mutation<void, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled

            LocalStorage.removeToken()

            dispatch(clearToken())
            dispatch(authApi.util.resetApiState())
          } catch (error) {
            console.error("Logout failed:", error)
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
      googleLogin: builder.mutation<LoginResponse, GoogleLoginRequest>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            if (!data?.accessToken) {
              console.error("No access token received")
            }
            LocalStorage.setToken(data.accessToken)
            dispatch(setToken(data.accessToken))

            const meResult = await dispatch(authApi.endpoints.me.initiate())
            if ("data" in meResult && meResult.data) {
              dispatch(setCurrentUser(meResult.data))
            }
            dispatch(authApi.util.invalidateTags(["User"]))
          } catch (error) {
            console.error("Google login failed:", error)
          }
        },
        query: (body) => {
          return {
            url: "/auth/google/login",
            method: "POST",
            body: {
              code: body.code,
              redirectUrl: body.redirectUrl,
            },
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
  useGoogleLoginMutation,
} = authApi
