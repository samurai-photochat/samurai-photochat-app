import { baseApi } from "@/shared/api/baseApi"
import { PaymentResponse } from "@/features/settings/api/subscriptionsApi.types"

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPayments: builder.query<PaymentResponse, void>({
      query: () => ({
        url: "subscriptions/my-payments",
        method: "GET",
      }),
    }),
  }),
})

export const { useGetMyPaymentsQuery } = subscriptionsApi
