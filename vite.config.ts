import react from "@vitejs/plugin-react"
import path from "node:path"
import rune from "rune-sdk/vite"
import { defineConfig } from "vite"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
// import { qrcode } from "vite-plugin-qrcode"

// https://vitejs.dev/config/
export default defineConfig({
  base: "", // Makes paths relative
  plugins: [
    // qrcode(), // only applies in dev mode
    vanillaExtractPlugin(),
    react(),
    rune({
      logicPath: path.resolve("./src/logic/logic.ts"),
      minifyLogic: false, // This flag can be used if your logic reaches the allowed limit. However, it will make it significantly more difficult to detect validation issues
      ignoredDependencies: [],
    }),
  ],
})
