import { globalKeyframes, globalStyle } from "@vanilla-extract/css"
import { vars } from "./theme.css"

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  fontSize: 10,
  minHeight: "100vh",
  overflow: "hidden",
  "@media": {
    "screen and (min-width: 250px)": {
      fontSize: 12,
    },
    "screen and (min-width: 350px)": {
      fontSize: 14,
    },
    "screen and (min-width: 500px)": {
      fontSize: 16,
    },
    "screen and (min-width: 700px)": {
      fontSize: 18,
    },
    "screen and (min-width: 1000px)": {
      fontSize: 20,
    },
  },
})

globalStyle("*", {
  boxSizing: "border-box",
})

globalStyle("#root", {
  height: "100vh",
  width: "100vw",
  maxWidth: "1280px",
  color: vars.colors.foundations.text,
  backgroundColor: vars.colors.foundations.background,
})

globalStyle(".relative", {
  position: "relative",
})

globalStyle(".app", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "100%",
})

globalStyle(".base-color", {
  color: vars.colors.foundations.text,
  backgroundColor: vars.colors.foundations.background,
})
globalStyle(".player0", {
  backgroundColor: vars.colors.player1.background,
  color: vars.colors.player1.text,
})
globalStyle(".player1", {
  backgroundColor: vars.colors.player2.background,
  color: vars.colors.player2.text,
})
globalStyle(".player2", {
  backgroundColor: vars.colors.player3.background,
  color: vars.colors.player3.text,
})
globalStyle(".player3", {
  backgroundColor: vars.colors.player4.background,
  color: vars.colors.player4.text,
})

globalStyle(".card", {
  display: "block",
  width: "16vw",
  height: "22vw",
  borderRadius: 6,
})
globalStyle(".card.selectable:hover", {
  cursor: "pointer",
})
globalStyle(".card.selectable.selected", {
  transform: "translateY(-2vw)",
})

globalStyle(".dropzone", {
  position: "relative",
  height: "fit-content",
  borderRadius: 5,
})
globalStyle(".dropzone.active", {
  outline: "none",
  boxShadow: "0 0 4px 2px " + vars.colors.highlight,
  cursor: "pointer",
})
globalStyle(".dropzone > .animate-score", {
  content: "+1",
  position: "absolute",
  bottom: "20%",
  left: "20%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "2em",
  height: "2em",
  fontSize: "1.5em",
  borderRadius: "50%",
  filter: "saturate(1.3)",
  opacity: 0,
  boxShadow: "0 0 4px 2px white",
  animation: "score 0.5s linear",
  animationIterationCount: "1",
  animationFillMode: "initial",
})

globalStyle(".pile", {
  boxShadow:
    "1px 1px 1px white, 2px 2px 1px black, 3px 3px 1px white, 4px 4px 1px black",
})

globalStyle(".playerSelect", {
  position: "absolute",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
})
globalStyle(".playerSelect img", {
  width: "16vw",
  height: "16vw",
  borderRadius: "50%",
  margin: "0 0.5rem",
})
globalStyle(".playerSelect img:hover", {
  cursor: "pointer",
  scale: 1.1,
})
globalStyle(".playerSelect img.selected", {
  border: "2px solid white",
})

globalStyle(".tableau", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
})

globalStyle(".waiting-room", {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  padding: "10%",
  borderRadius: "6px",
})
globalStyle(".waiting-room .instructions", {
  position: "relative",
  height: "75vw",
})
globalStyle(".waiting-room .instructions > img", {
  display: "block",
  maxWidth: "75vw",
  margin: "auto",
})
globalStyle(".waiting-room .instructions > .chevron", {
  position: "absolute",
  fontSize: "2rem",
  bottom: "50%",
  transform: "translateY(50%)",
})
globalStyle(".waiting-room .instructions > .prev", {
  content: "◀",
  left: "-1em",
})
globalStyle(".waiting-room .instructions > .next", {
  content: "▶",
  right: "-1em",
})

globalStyle(".ready-button", {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "2rem",
  borderRadius: "6px",
  border: "1px solid white",
  backgroundColor: vars.colors.foundations.background,
  padding: "1rem",
  marginTop: "2rem",
})
globalStyle(".ready-button:hover", {
  cursor: "pointer",
  boxShadow: "0 0 4px white",
})
globalStyle(".ready-button.voted", {
  backgroundColor: "transparent",
})

globalStyle(".work-row", {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  marginTop: "1rem",
  marginBottom: "1rem",
  columnGap: "1rem",
  zIndex: 10,
})
globalStyle(".work-row .badge", {
  position: "absolute",
  bottom: "-1em",
})
globalStyle(".work-row .snork-button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16vw",
  height: "22vw",
  borderRadius: "6px",
  border: "1px solid white",
  backgroundColor: vars.colors.foundations.background,
  padding: 4,
})
globalStyle(".work-row .snork-button:hover", {
  cursor: "pointer",
  animation: "2s infinite shake",
  boxShadow: "0 0 4px white",
})
globalStyle(".work-row .snork-container", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
globalStyle(".work-row .snork-container .askew", {
  transform: "rotate(-45deg)",
  fontSize: "5vw",
  fontWeight: "bold",
})

globalStyle(".work-row .work-stacks", {
  display: "flex",
  gap: "0.25rem",
})

globalStyle(".work-stack", {
  display: "flex",
  flexDirection: "column",
})
globalStyle(".work-stack .card", {
  marginTop: "-16vw",
})
globalStyle(".work-stack .card:first-child", {
  marginTop: "0",
})

globalStyle(".stock-row", {
  position: "sticky",
  bottom: 0,
  display: "flex",
  alignItems: "flex-end",
  alignSelf: "flex-start",
  justifyContent: "center",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  columnGap: "1rem",
})
globalStyle(".stock-row .stock-container", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
globalStyle(".stock-row .stuck-button", {
  width: "max-content",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.2rem",
  borderRadius: "6px",
  border: "1px solid white",
  backgroundColor: vars.colors.foundations.background,
  padding: 4,
})
globalStyle(".stock-row .stuck-button:hover", {
  cursor: "pointer",
  boxShadow: "0 0 4px white",
})
globalStyle(".stock-row .stuck-button.voted", {
  backgroundColor: "transparent",
})
globalStyle(".stock-row .stock:hover", {
  cursor: "pointer",
})
globalStyle(".stock-row .waste", {
  display: "flex",
  minWidth: "30vw",
})
globalStyle(".stock-row .waste .card", {
  marginLeft: "-10vw",
})
globalStyle(".stock-row .waste .card:first-child", {
  marginLeft: "0",
})
globalStyle(".stock-row .waste .card:last-child:hover", {
  cursor: "pointer",
})

globalStyle(".common-row", {
  width: "100%",
  position: "relative",
  color: vars.colors.foundations.text,
  backgroundColor: vars.colors.foundations.background,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.colors.liteText,
})
globalStyle(".common-row .foundations", {
  display: "grid",
  justifyItems: "center",
  gridTemplateColumns: "repeat(4, minmax(16vw, 1fr))",
  padding: "4px",
  rowGap: "4px",
  paddingTop: "calc(8vw + 8px)",
  paddingBottom: "4vw",
  overflowY: "scroll",
})
globalStyle(".common-row .foundations.player-count-3", {
  gridTemplateColumns: "repeat(6, minmax(16vw, 1fr))",
})
globalStyle(".common-row .foundations.player-count-4", {
  gridTemplateColumns: "repeat(8, minmax(16vw, 1fr))",
})
globalStyle(".common-row .totals", {
  position: "absolute",
  top: "0",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  margin: "4px auto",
})
globalStyle(".common-row .badge.square", {
  minWidth: "3em",
  height: "8vw",
  borderRadius: "6px",
})
globalStyle(".common-row .badge.me", {
  border: "2px solid white",
  animation: "5s infinite pulse-border",
})

// animations
globalKeyframes("shake", {
  "0%": { transform: "rotate(0deg)" },
  "15%": { transform: "rotate(10deg)" },
  "20%": { transform: "rotate(-10deg)" },
  "25%": { transform: "rotate(10deg)" },
  "30%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(0deg)" },
})

globalKeyframes("score", {
  "0%": { opacity: 1, transform: "translateY(0)" },
  "50%": { opacity: 1, transform: "translateY(-2em)" },
  "100%": { opacity: 0, transform: "translateY(-3em)" },
})

globalKeyframes("pulse-border", {
  "0%": { borderWidth: 2 },
  "5%": { borderWidth: 1 },
  "10%": { borderWidth: 2 },
  "100%": { borderWidth: 2 },
})

globalStyle(".badge", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2em",
  height: "2em",
  borderRadius: "50%",
  border: "1px solid white",
  filter: "saturate(1.3)",
})

globalStyle(".badge.square", {
  minWidth: "3em",
  width: "auto",
  height: "8vw",
  borderRadius: "6px",
})

globalStyle(".badge.me", {
  border: "2px solid white",
  animation: "5s infinite pulse-border",
})
