import { AppDispatch } from "@/app/store/store"
import { useDispatch } from "react-redux"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
