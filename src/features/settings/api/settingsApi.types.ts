export type CreateSubscriptionRequest = {
  typeSubscription: TypeSubscription
  paymentType: PaymentType
  amount: number
  baseUrl: string
}
export type CreateSubscriptionResponse = {
  url: string
}

export type ActiveSubscription = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type GetSubscriptionRequest = {
  data: ActiveSubscription[]
  hasAutoRenewal: boolean
}

export type TypeSubscription = "MONTHLY" | "DAY" | "WEEKLY"

export type PaymentType = "STRIPE" | "PAYPAL" | "CREDIT_CARD"
