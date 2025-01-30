import { PlayerId } from "rune-sdk"
import {
  Card,
  Deck,
  GameState,
  MoveData,
  Tableau,
  Rank,
  Suit,
  GameResult,
} from "./types"

export function createDeck(playerId: PlayerId, playerIndex: number): Deck {
  const cards: Card[] = []
  for (let i = 0; i < 52; i++) {
    const rank = ((i % 13) + 1) as Rank // 1 to 13
    const suit = Math.floor(i / 13) as Suit // 0 to 3
    const color = suit < 2 ? 0 : 1 // 0 for black, 1 for red
    const back = playerIndex as 0 | 1 // 0 for red, 1 for blue
    cards.push({ id: i, rank, suit, color, back, playerId })
  }

  return {
    cards,
    playerId,
  }
}

export function shuffleDeck<T>(deck: T[]) {
  // based on Fisher-Yates shuffle algorithm
  const shuffledDeck = [...deck]
  let currIndex = deck.length - 1
  let tempValue: T | undefined
  let randomIndex: number | undefined

  while (currIndex >= 0) {
    randomIndex = Math.floor(Math.random() * currIndex)
    tempValue = shuffledDeck[currIndex]
    shuffledDeck[currIndex] = shuffledDeck[randomIndex]
    shuffledDeck[randomIndex] = tempValue
    currIndex -= 1
  }
  return shuffledDeck
}

export function createTableau(deck: Deck): Tableau {
  const shuffledCards = shuffleDeck(deck.cards)

  return {
    playerId: deck.playerId,
    snorkPile: shuffledCards.slice(0, 13),
    workStacks: shuffledCards.slice(13, 17).map((card) => [card]),
    stockPile: shuffledCards.slice(17),
    wastePile: [],
    stockIsStale: false,
    isStuck: false,
    readyToStart: false,
  }
}

export function getPlayerIndex(state: GameState | null, playerId: string) {
  if (!state) {
    return -1
  }

  return state.playerIds.findIndex((id) => id === playerId)
}

export function getSrcPile(
  state: GameState,
  playerId: string,
  moveData: MoveData
) {
  const playerIndex = getPlayerIndex(state, playerId)
  const { src } = moveData

  switch (src.pile) {
    case "snorkPile":
      return [...state.tableaus[playerIndex].snorkPile]
    case "workPile":
      return [...state.tableaus[playerIndex].workStacks[src.slot]]
    case "stockPile":
      return [...state.tableaus[playerIndex].stockPile]
  }
}

export function getFoundationsScoreMap(state: GameState) {
  const scoreMap = state.foundations
    .flatMap((f) => f)
    .reduce<Record<string, number>>((acc, c) => {
      acc[c.playerId] = (acc[c.playerId] || 0) + 1
      return acc
    }, {})
  return scoreMap
}

export function computeGameOverResults(state: GameState) {
  const playerFoundationsScores = getFoundationsScoreMap(state)
  const sortedPlayerScores = Object.entries(playerFoundationsScores)
    .map(([id, fScore]) => {
      return {
        playerId: id,
        totalScore:
          fScore -
          state.tableaus[getPlayerIndex(state, id)].snorkPile.length * 2,
      }
    })
    .sort((a, b) => b.totalScore - a.totalScore)

  const maxScore = sortedPlayerScores[0].totalScore
  const gameIsTied =
    sortedPlayerScores.filter((player) => player.totalScore === maxScore)
      .length > 1
  state.gameOverResults = sortedPlayerScores.reduce<
    Record<PlayerId, GameResult>
  >((acc, playerStats) => {
    const winResult: GameResult = gameIsTied ? "TIE" : "WON"
    const loseResult: GameResult = "LOST"
    acc[playerStats.playerId] =
      playerStats.totalScore === maxScore ? winResult : loseResult
    return acc
  }, {})
}

export function getMovingCards(
  state: GameState,
  playerId: string,
  moveData: MoveData
): Card[] {
  const playerIndex = getPlayerIndex(state, playerId)
  const { src } = moveData

  switch (src.pile) {
    case "snorkPile": {
      const cards = state.tableaus[playerIndex].snorkPile.filter(
        (c) => c.id === src.cardId
      )
      return cards
    }
    case "workPile": {
      const baseIndex = state.tableaus[playerIndex].workStacks[
        src.slot
      ].findIndex((c) => c.id === src.cardId)
      const cards = state.tableaus[playerIndex].workStacks[src.slot].filter(
        (c, i) => i >= baseIndex
      )
      return cards
    }
    case "stockPile": {
      const cards = state.tableaus[playerIndex].stockPile.filter(
        (c) => c.id === src.cardId
      )
      return cards
    }
  }
}

export function removeCardsFromSrcPile(
  game: GameState,
  playerId: PlayerId,
  src: MoveData["src"]
) {
  const playerIndex = getPlayerIndex(game, playerId)
  const tableau = game.tableaus[playerIndex]

  switch (src.pile) {
    case "snorkPile": {
      tableau.snorkPile = tableau.snorkPile.filter((c) => c.id !== src.cardId)
      return
    }
    case "workPile": {
      const baseIndex = tableau.workStacks[src.slot].findIndex(
        (c) => c.id === src.cardId
      )
      tableau.workStacks[src.slot] = tableau.workStacks[src.slot].filter(
        (c, i) => i < baseIndex
      )
      return
    }
    case "stockPile": {
      // order matters here. remove from waste pile first or you might see UI flashes.
      tableau.wastePile = removeTopWasteCard(tableau.wastePile)
      tableau.stockPile = tableau.stockPile.filter((c) => c.id !== src.cardId)
      return
    }
  }
}

export function addCardsToDestPile(
  game: GameState,
  playerId: PlayerId,
  dest: MoveData["dest"],
  card: Card[]
) {
  const playerIndex = getPlayerIndex(game, playerId)
  const tableau = game.tableaus[playerIndex]

  switch (dest?.pile) {
    case "workPile":
      tableau.workStacks[dest.slot] = [
        ...tableau.workStacks[dest.slot],
        ...card,
      ]
      break
    case "foundation":
      game.foundations[dest.slot] = [...game.foundations[dest.slot], ...card]
      break
  }
}

function removeTopWasteCard(wastePile: Tableau["wastePile"]) {
  const newWastePile = [...wastePile]
  const [first, last] = newWastePile[newWastePile.length - 1]
  newWastePile[newWastePile.length - 1] = [first, last - 1]
  return newWastePile.filter(([first, last]) => first <= last)
}
