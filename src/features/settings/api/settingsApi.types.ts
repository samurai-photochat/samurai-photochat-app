export type CreateSubscriptionRequest = {
  typeSubscription: SubscriptionType
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

export type GetCostOfPaymentResponse = {
  data: {
    amount: number
    typeDescription: SubscriptionType
  }[]
}

export type Payment = {
  userId: number
  subscriptionId: string
  dateOfPayment: Date
  endDateOfSubscription: Date
  price: number
  subscriptionType: SubscriptionType
  paymentType: PaymentType
}

export type PaymentResponse = Payment[]

export type SubscriptionType = "MONTHLY" | "DAY" | "WEEKLY"

export type PaymentType = "STRIPE" | "PAYPAL" | "CREDIT_CARD"
