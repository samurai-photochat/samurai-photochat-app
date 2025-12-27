export type Payment = {
  userId: number
  subscriptionId: string
  dateOfPayment: Date
  endDateOfSubscription: Date
  price: number
  subscriptionType: SubscriptionType
  paymentType: PaymentType
}

export type SubscriptionType = "MONTHLY"
export type PaymentType = "STRIPE"
export type PaymentResponse = Payment[]
