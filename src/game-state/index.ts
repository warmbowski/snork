import { atom } from "jotai"
import { PlayerId } from "rune-sdk"
import { GameState, MoveData } from "../logic/types"
// import MESSAGES_EN, { Translations } from "../i18n/en"

export const yourPlayerIdAtom = atom<PlayerId>("")
export const gameStateAtom = atom<GameState>()
export const dataTransferAtom = atom<MoveData | null>(null)

// export const messagesAtom = atom<Translations>(MESSAGES_EN)
