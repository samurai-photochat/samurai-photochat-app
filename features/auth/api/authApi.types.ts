// me
export type Response = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}

// registration
export type BaseResponse = {
  statusCode: number
  messages: Array<Massage>
  error: string
}

export type Massage = {
  message: string
  field: string
}
