import { globalKeyframes, globalStyle } from "@vanilla-extract/css"
import { vars } from "./theme.css"

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  fontSize: 14,
  minHeight: "100vh",
  overflow: "hidden",
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

globalStyle("html, body", {
  "@media": {
    "screen and (min-width: 512px)": {
      fontSize: 16,
    },
  },
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
  boxShadow: "0 0 4px 2px #eff166",
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
  minWidth: "1.8em",
  height: "1.8em",
  borderRadius: "50%",
  filter: "saturate(1.3)",
  opacity: 0,
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
  width: "3rem",
  height: "3rem",
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
  scale: 1.1,
})
globalStyle(".ready-button.voted", {
  backgroundColor: "transparent",
  scale: 1,
})
globalStyle(".ready-button.voted:hover", {
  cursor: "not-allowed",
})

globalStyle(".work-row", {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  marginTop: "1rem",
  marginBottom: "1rem",
  columnGap: "1rem",
})
globalStyle(".work-row .badge", {
  position: "relative",
  top: "-0.5em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.8em",
  height: "1.8em",
  borderRadius: "50%",
  border: "1px solid white",
  filter: "saturate(1.3)",
  margin: "auto",
})
globalStyle(".work-row .snork-button", {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.4rem",
  animation: "2s infinite shake",
  borderRadius: "6px",
  border: "1px solid white",
  backgroundColor: vars.colors.foundations.background,
})
globalStyle(".work-row .snork-button:hover", {
  cursor: "pointer",
  scale: 1.1,
})
globalStyle(".work-row .snork-container", {})
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
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  marginTop: "1rem",
  marginBottom: "1rem",
  columnGap: "1rem",
})
globalStyle(".stock-row .stuck-button", {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.4rem",
  borderRadius: "6px",
  border: "1px solid white",
  backgroundColor: vars.colors.foundations.background,
})
globalStyle(".stock-row .stuck-button:hover", {
  cursor: "pointer",
  scale: 1.1,
})
globalStyle(".stock-row .stuck-button.voted", {
  backgroundColor: "transparent",
})
globalStyle(".stock-row .stuck-button.voted:hover", {
  cursor: "not-allowed",
  scale: 1,
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
  paddingTop: "calc(1.8em + 8px)",
  paddingBottom: "8px",
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
globalStyle(".common-row .badge", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "3em",
  height: "1.8em",
  borderRadius: "6px",
  filter: "saturate(1.3)",
})

// animations
globalKeyframes("shake", {
  "0%": { transform: "rotate(0deg)" },
  "85%": { transform: "rotate(0deg)" },
  "85.1%": { transform: "rotate(10deg)" },
  "90%": { transform: "rotate(-10deg)" },
  "95%": { transform: "rotate(10deg)" },
  "100%": { transform: "rotate(0deg)" },
})

globalKeyframes("score", {
  "0%": { opacity: 1, transform: "translateY(0)" },
  "50%": { opacity: 1, transform: "translateY(-2em)" },
  "100%": { opacity: 0, transform: "translateY(-3em)" },
})
