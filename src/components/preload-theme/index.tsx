import { useLayoutEffect, useRef, useState } from "react"
import { TABLEAU_THEME } from "../../constants"

interface ThemePreload {
  images: {
    diagram: HTMLImageElement
    cardPlaceholders: HTMLImageElement[]
    cardBacks: HTMLImageElement[]
    cards: HTMLImageElement[]
  }
  audio: {
    declareSnork: HTMLAudioElement
    selectCard: HTMLAudioElement
    playCard: HTMLAudioElement
    resetStock: HTMLAudioElement
    turnStock: HTMLAudioElement
    voteReady: HTMLAudioElement
    voteStuck: HTMLAudioElement
    score: HTMLAudioElement
  }
}

export const usePreloadAssets = () => {
  const [status, setStatus] = useState<"preload-started">()
  const audioRef = useRef<
    Record<string, HTMLAudioElement[] | HTMLAudioElement>
  >({})
  const imgRef = useRef<Record<string, HTMLImageElement[] | HTMLImageElement>>(
    {}
  )

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
        return img
      }
    }

    Object.entries(TABLEAU_THEME.images).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const arr = value.map((src) => {
          return loadImgs(src)!
        })
        imgRef.current[key] = arr
      } else {
        imgRef.current[key] = loadImgs(value)!
      }
    })

    const loadAudio = (uri: string) => {
      if (typeof uri === "string" && uri.endsWith(".wav")) {
        const audio = new Audio(uri)
        // audio.preload = "auto"
        audio.load()
        return audio
      }
    }

    Object.entries(TABLEAU_THEME.audio).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const arr = value.map((src) => {
          return loadAudio(src)!
        })
        audioRef.current[key] = arr
      } else {
        audioRef.current[key] = loadAudio(value)!
      }
    })

    setStatus("preload-started")
  }, [])

  return {
    status,
    audio: audioRef.current as unknown as ThemePreload["audio"],
    images: imgRef.current as unknown as ThemePreload["images"],
  }
}
