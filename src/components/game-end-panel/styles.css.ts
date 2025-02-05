import { keyframes, style } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

const shadowPulse = keyframes({
  "0%": { boxShadow: "0 0 4px 2px " + vars.colors.highlight },
  "20%": { boxShadow: "0 0 4px 4px " + vars.colors.highlight },
  "50%": { boxShadow: "0 0 4px 2px " + vars.colors.highlight },
  "100%": { boxShadow: "0 0 4px 2px " + vars.colors.highlight },
})

export const gameEndPanel = style({
  display: "grid",
  justifyItems: "center",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  rowGap: "4px",
  color: vars.colors.foundations.text,
  backgroundColor: vars.colors.foundations.background,
  borderBottom: "1px solid white",
  width: "100%",
  padding: "calc(4vw + 4px) 0.5rem",
  fontSize: "1rem",
})

export const scoreCard = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0 8px 0 0",
  borderRadius: "8px",
})

export const myScoreCard = style([
  scoreCard,
  {
    outline: "none",
    boxShadow: "0 0 4px 2px " + vars.colors.highlight,
    animation: `1s infinite ${shadowPulse}`,
  },
])

export const avatar = style({
  width: "10vw",
  height: "10vw",
  borderRadius: "50%",
  margin: "0 0.5rem",
})

export const cardScore = style({
  display: "grid",
  gridTemplateColumns: "1fr",
})

export const cardBack = style({
  gridArea: "1/1",
})

export const total = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gridArea: "1/1",
  fontSize: "1.2rem",
  fontWeight: "bold",
})

export const badges = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  height: "100%",
  gap: "0.2rem",
})
