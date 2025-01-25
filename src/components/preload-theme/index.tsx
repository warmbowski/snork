import { useLayoutEffect, useState } from "react"
import { TABLEAU_THEME } from "../../constants"

export const usePreloadAssets = () => {
  const [status, setStatus] = useState<"preload-started">()

  useLayoutEffect(() => {
    const loadImgs = (uri: string) => {
      if (typeof uri === "string" && uri.endsWith(".png")) {
        const img = new Image()
        img.src = uri
        img.id = uri
        img.classList.add("card")
        img.style.position = "absolute"
        img.style.top = "150vh"
        img.style.left = "0"
        document.body.appendChild(img)
      }
    }

    Object.values(TABLEAU_THEME.images).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((src) => {
          loadImgs(src)
        })
      } else {
        loadImgs(value)
      }
    })

    const loadAudio = (uri: string) => {
      if (typeof uri === "string" && uri.endsWith(".wav")) {
        new Audio(uri)
      }
    }

    Object.values(TABLEAU_THEME.audio).forEach(([value]) => {
      if (Array.isArray(value)) {
        value.forEach((src) => {
          loadAudio(src)
        })
      } else {
        loadAudio(value)
      }
    })

    setStatus("preload-started")
  }, [])

  return status
}
