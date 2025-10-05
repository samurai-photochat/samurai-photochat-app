import { useEffect, RefObject } from "react"

type Props = {
  ref: RefObject<HTMLDivElement | null>
  action: () => void
}
export const useOutsideClick = ({ ref, action }: Props) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        action()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, action])
}
