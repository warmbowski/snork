import {
  globalKeyframes,
  globalStyle /* globalFontFace */,
} from "@vanilla-extract/css"
import { vars } from "./theme.css"

// globalFontFace("fibberish", {
//   src: 'url("./assets/fonts/Fibberish/fibberish.ttf") format("truetype")',
//   fontWeight: "normal",
// })

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  fontSize: 14,
  // fontFamily: vars.font.family,
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
  width: "16vw",
  height: "22vw",
  borderRadius: 6,
  marginBottom: "4px",
})

globalStyle(".card.draggable", {
  // @ts-expect-error -webkit-user-drag is not in the types
  WebkitUserDrag: "element",
  transformOrigin: "center",
})

globalStyle(".card.card.draggable.dragging", {
  transform: "none",
})

globalStyle(".card.draggable:hover", {
  transform: "translateY(-1vw)",
})

globalStyle(".pile", {
  marginBottom: "4px",
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
  top: "-1.5em",
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

globalStyle(".work-row .snork-top:hover", {
  cursor: "pointer",
  transform: "none",
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

globalStyle(".work-stack .card:last-child:hover", {
  cursor: "pointer",
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
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "stretch",
  color: vars.colors.foundations.text,
  backgroundColor: vars.colors.foundations.background,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.colors.liteText,
  borderRadius: "0 0 10px 10px",
})

globalStyle(".common-row .foundations", {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  gap: "0.5rem",
})

globalStyle(".common-row .totals", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
  margin: "0 6px",
})

globalStyle(".common-row .badge", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "1.8em",
  height: "1.8em",
  borderRadius: "50%",
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
