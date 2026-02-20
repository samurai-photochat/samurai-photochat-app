import { baseApi } from "@/shared/api/baseApi"
import {
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  GetCostOfPaymentResponse,
  GetSubscriptionRequest,
  PaymentResponse,
} from "@/features/settings/api/settingsApi.types"

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation<CreateSubscriptionResponse, CreateSubscriptionRequest>({
      query: (body) => ({
        url: "subscriptions",
        method: "POST",
        body,
      }),
    }),
    getSubscription: builder.query<GetSubscriptionRequest, void>({
      query: () => ({
        url: "subscriptions/current-payment-subscriptions",
        method: "GET",
      }),
    }),
    getCostOfPayment: builder.query<GetCostOfPaymentResponse, void>({
      query: () => ({
        url: "subscriptions/cost-of-payment-subscriptions",
        method: "GET",
      }),
    }),
    getMyPayments: builder.query<PaymentResponse, void>({
      query: () => ({
        url: "subscriptions/my-payments",
        method: "GET",
      }),
    }),
    canceledAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        url: "subscriptions/canceled-auto-renewal",
        method: "POST",
      }),
    }),
    renewAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        url: "subscriptions/renew-auto-renewal",
        method: "POST",
      }),
    }),
  }),
})

export const {
  useCreateSubscriptionMutation,
  useGetSubscriptionQuery,
  useGetMyPaymentsQuery,
  useGetCostOfPaymentQuery,
  useCanceledAutoRenewalMutation,
  useRenewAutoRenewalMutation,
} = settingsApi
