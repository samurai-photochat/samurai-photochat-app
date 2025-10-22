import { useSelector } from "react-redux"
import { AppRootState } from "@/app/store/store"

export const useAppSelector = useSelector.withTypes<AppRootState>()
