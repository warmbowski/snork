import { atom } from "jotai"
import { PlayerId } from "rune-sdk"
import { GameState, MoveData } from "../logic/types"
// import MESSAGES_EN, { Translations } from "../i18n/en"

export const yourPlayerIdAtom = atom<PlayerId>("")
export const gameStateAtom = atom<GameState>()
export const staleCountAtom = atom<number>(-1) // -1 to account for first render

const moveAtom = atom<MoveData | null>(null)
// derived atom to make sure spectators can't select cards for moves
export const moveCardDataAtom = atom<
  MoveData | null,
  (MoveData | null)[],
  void
>(
  (get) => get(moveAtom),
  (get, set, newValue) => {
    const isPlayer = !!get(yourPlayerIdAtom)
    return set(moveAtom, isPlayer ? newValue : null)
  }
)

// export const messagesAtom = atom<Translations>(MESSAGES_EN)
