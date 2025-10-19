import { BaseQueryApi, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { setAppError } from "@/app/model/appSlice"
import { isErrorWithMessages } from "@/app/utils/isErrorWithMessages"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = "Some error occurred"
  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error
        break
      case 404:
      case 403:
      case 401:
      case 400:
        const data = result.error.data
        if (isErrorWithMessages(data)) {
          if (data.messages instanceof Array) {
            if (data.messages.length > 0) {
              error = data.messages[0].message
            } else {
              error = data.error
            }
          } else {
            error = data.messages
          }
        } else {
          error = JSON.stringify(result.error.data)
        }
        break
      default:
        if (result.error.status === "TIMEOUT_ERROR" || (result.error.status >= 500 && result.error.status < 600)) {
          error = "Server error occurred. Please try again later."
        } else {
          error = JSON.stringify(result.error)
        }
        break
    }
    console.log(error)
    api.dispatch(setAppError({ error }))
  }
}
