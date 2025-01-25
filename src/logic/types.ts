import { PlayerId } from "rune-sdk"

export type Src = "snorkPile" | "stockPile" | "workPile"
export type Dest = "workPile" | "foundation"
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
export type Suit = 0 | 1 | 2 | 3
export type Color = 0 | 1

export interface Card {
  id: number
  rank: Rank
  suit: Suit
  color: Color
  playerId: PlayerId
}

export interface Deck {
  cards: Card[]
  playerId: PlayerId
}

export interface Tableau {
  playerId: PlayerId
  snorkPile: Card[] // 13 cards
  workStacks: Card[][] // 4 stacks of up to 13 cards
  stockPile: Card[] // starts with 35 cards
  wastePile: [number, number][] // array of [stockIndex, stockIndex] (3 cards at a time)
}

export interface GameState {
  gameStarted: boolean
  playerIds: PlayerId[] // 1 to 4 players
  tableaus: Tableau[] // 1 tableau per player
  foundations: Card[][] // 4 stacks of up to 13 cards per player
}

export interface SnorkPileSrc {
  pile: "snorkPile"
  cardId: number
}
export interface StockPileSrc {
  pile: "stockPile"
  cardId: number
}
export interface WorkPileSrc {
  pile: "workPile"
  slot: number
  cardId: number
}
export interface DestPile {
  pile: Dest
  slot: number
}
export interface MoveData {
  src: SnorkPileSrc | StockPileSrc | WorkPileSrc
  dest?: DestPile
}
