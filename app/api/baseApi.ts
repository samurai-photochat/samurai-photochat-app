import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Auth"],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", process.env.NEXT_PUBLIC_API_KEY || "api-key-not-found")
        headers.set("Authorization", `Bearer ${localStorage.getItem("auth-token")}`)
      },
    })(args, api, extraOptions)
    //Пока обработчика нет
    // handleError(api, result)

    return result
  },
  endpoints: () => ({}),
})
