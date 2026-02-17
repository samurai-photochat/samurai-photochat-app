import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import LocalStorage from "@/shared/utils/localStorage"
import { handleError } from "@/shared/api/handleError"
import { RefreshTokenResponse } from "@/features/auth/api/authApi.types"
import { PATH } from "@/shared/config/routes"

type RefreshResult = {
  data?: RefreshTokenResponse
  error?: never
}

const createBaseQuery = (skipAuth?: boolean) =>
  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (!skipAuth) {
        const token = LocalStorage.getToken()
        if (token) {
          headers.set("Authorization", `Bearer ${token}`)
        }
      }
      return headers
    },
  })
interface ExtraOptions {
  skipAuth?: boolean
}

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
})

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions> = async (
  args,
  api,
  extraOptions
) => {
  const skipAuth = extraOptions?.skipAuth
  let result = await createBaseQuery(skipAuth)(args, api, extraOptions)
  handleError(api, result)
  if (result.error && result.error.status === 401) {
    const refreshResult = (await rawBaseQuery(
      { url: "/auth/update", method: "POST" },
      api,
      extraOptions
    )) as RefreshResult
    if (refreshResult.data?.accessToken) {
      const accessToken = refreshResult.data.accessToken
      LocalStorage.setToken(accessToken)
      result = await createBaseQuery(skipAuth)(args, api, extraOptions)
    } else {
      LocalStorage.removeToken()
      if (window.location.href !== window.location.origin + PATH.AUTH.LOGIN) {
        window.location.href = PATH.AUTH.LOGIN
      }
    }
  }
  return result
}
