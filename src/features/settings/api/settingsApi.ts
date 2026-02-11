import { baseApi } from "@/shared/api/baseApi"
import { CreateSubscriptionRequest, CreateSubscriptionResponse } from "@/features/settings/api/settingsApi.types"

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation<CreateSubscriptionResponse, CreateSubscriptionRequest>({
      query: (body) => ({
        url: "subscriptions",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useCreateSubscriptionMutation } = settingsApi
