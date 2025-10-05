import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import { handleError } from "@/app/utils/handleError"

const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = LocalStorage.getToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  })
export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await createBaseQuery()(args, api, extraOptions)
  handleError(api, result)
  return result
}
