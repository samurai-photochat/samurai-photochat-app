import { setupServer } from "msw/node"
import { handlers } from "./handlers"

// Настраиваем MSW сервер с базовыми handlers
export const server = setupServer(...handlers)
