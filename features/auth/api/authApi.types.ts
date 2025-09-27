// me
export type MeResponse = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}

// registration, confirmation, resending
export type BaseApiResponse = {
  statusCode: number
  messages: Array<Massage>
  error: string
}

export type Massage = {
  message: string
  field: string
}

export type RefreshTokenResponse = {
  accessToken: string
}

// тип user
export type RegisterRequest = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

export type LoginRequest = {
  email: string
  password: string
}
// тип кода из query
export type ConfirmationRequest = {
  confirmationCode: string
}
// тип для запроса при истекшей ссылке
export type ResendingEmailRequest = {
  email: string
  baseUrl: string
}

export type LoginResponse = {
  accessToken: string
}

// Google OAuth types
export type GoogleOAuthRequest = {
  code: string
  redirectUrl: string
}

export type GoogleOAuthResponse = {
  accessToken: string
}
