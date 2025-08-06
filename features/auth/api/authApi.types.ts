// me
export type MeViewDto = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}

// registration, confirmation, resending
export type ApiErrorResultDto = {
  statusCode: number
  messages: Array<Massage>
  error: string
}

export type Massage = {
  message: string
  field: string
}
