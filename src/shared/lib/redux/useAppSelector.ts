import { useSelector } from "react-redux"
import { AppRootState } from "@/shared/store/store"

export const useAppSelector = useSelector.withTypes<AppRootState>()
