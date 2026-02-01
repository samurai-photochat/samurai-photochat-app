export type CreateSubscriptionRequest = {
  typeSubscription: TypeSubscription
  paymentType: PaymentType
  amount: number
  baseUrl: string
}

export type TypeSubscription = "MONTHLY" | "DAY" | "WEEKLY"

export type PaymentType = "STRIPE" | "PAYPAL" | "CREDIT_CARD"

export type CreateSubscriptionResponse = {
  url: string
}
