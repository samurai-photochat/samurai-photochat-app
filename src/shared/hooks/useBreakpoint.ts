import { useEffect, useState } from "react"

export const useBreakpoint = (mediaQueryOrPx: string | number) => {
  const query = typeof mediaQueryOrPx === "number" ? `(max-width: ${mediaQueryOrPx}px)` : mediaQueryOrPx
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })
  useEffect(() => {
    if (typeof window === "undefined") return
    const mediaQuery = window.matchMedia(query)
    const mediaHandler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mediaQuery.matches)
    if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", mediaHandler)
    else mediaQuery.addListener(mediaHandler)
    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", mediaHandler)
      else mediaQuery.removeListener(mediaHandler)
    }
  }, [query])
  return matches
}

export const Breakpoints = {
  narrow: 700,
}
