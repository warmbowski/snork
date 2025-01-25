import { createGlobalTheme } from "@vanilla-extract/css"

export function getContrastYIQ(hexcolor: string) {
  const r = parseInt(hexcolor.substring(1, 3), 16)
  const g = parseInt(hexcolor.substring(3, 5), 16)
  const b = parseInt(hexcolor.substring(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#333" : "#e6e6e6"
}

export const vars = createGlobalTheme(":root", {
  space: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  colors: {
    foundations: {
      background: "#14764a",
      text: getContrastYIQ("#14764a"),
    },
    player1: {
      background: "#764a14",
      text: getContrastYIQ("#764a14"),
    },
    player2: {
      background: "#761914",
      text: getContrastYIQ("#761914"),
    },
    player3: {
      background: "#4a1476",
      text: getContrastYIQ("#4a1476"),
    },
    player4: {
      background: "#145876",
      text: getContrastYIQ("#145876"),
    },
    liteText: "#e6e6e6",
    darkText: "#333",
  },
  font: {
    family:
      'sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
  },
})
