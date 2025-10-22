// API
export {
  authApi,
  useMeQuery,
  useLazyMeQuery,
  useRegistrationMutation,
  useConfirmationMutation,
  useEmailResendingMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGoogleOAuthMutation,
} from "./api/authApi"

export type { ResendingEmailRequest, UserType, LoginType } from "./api/authApi"

// Model
export {
  authSlice,
  authReducer,
  setToken,
  clearToken,
  setCurrentUser,
  clearCurrentUser,
  selectToken,
  selectCurrentUser,
  selectCurrentUserId,
} from "./model/authSlice"
