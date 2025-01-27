import { atom } from "jotai"
import { PlayerId } from "rune-sdk"
import { GameState } from "../logic/types"
// import MESSAGES_EN, { Translations } from "../i18n/en"

export const yourPlayerIdAtom = atom<PlayerId>("")
export const gameStateAtom = atom<GameState>()
export const staleCountAtom = atom<number>(0)

// export const messagesAtom = atom<Translations>(MESSAGES_EN)
