import type { RuneClient } from "rune-sdk"

import {
  addCardsToDestPile,
  createDeck,
  createTableau,
  getMovingCards,
  getPlayerIndex,
  removeCardsFromSrcPile,
} from "./logic/utils"
import { GameState, MoveData, Tableau } from "./logic/types"

type GameActions = {
  startGame: () => void
  turnStock: () => void
  moveCard: (params: Required<MoveData>) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  // persistPlayerData: true,
  setup: (allPlayerIds) => {
    return {
      gameStarted: false,
      playerIds: allPlayerIds,
      foundations: allPlayerIds.flatMap(() => new Array(4).fill([])),
      tableaus: allPlayerIds.map((playerId) => {
        const deck = createDeck(playerId)
        return createTableau(deck)
      }),
      gameOverResults: null,
    }
  },
  actions: {
    startGame: (_, { game }) => {
      game.gameStarted = true
    },
    turnStock: (_, { game, playerId }) => {
      const playerIndex = getPlayerIndex(game, playerId)
      const tableau = game.tableaus[playerIndex]

      if (tableau) {
        const stockEndIndex = tableau.stockPile.length - 1
        const lastWasteEntry = tableau.wastePile[tableau.wastePile.length - 1]
        const nextUp: Tableau["wastePile"][0] =
          tableau.wastePile.length > 0
            ? [
                lastWasteEntry[1] + 1,
                Math.min(lastWasteEntry[1] + 3, stockEndIndex),
              ]
            : [0, Math.min(2, stockEndIndex)]
        game.tableaus[playerIndex].wastePile =
          nextUp[0] > stockEndIndex
            ? []
            : [...game.tableaus[playerIndex].wastePile, nextUp]
      }
    },
    moveCard: (moveData, { game, playerId }) => {
      switch (moveData.dest.pile) {
        case "foundation": {
          const destPile = game.foundations[moveData.dest?.slot || 0]
          const cards = getMovingCards(game, playerId, moveData)
          const card = cards[0]
          const topCard = destPile[destPile.length - 1] || null

          if (topCard === null && card && card.rank === 1) {
            addCardsToDestPile(game, playerId, moveData.dest, cards)
            removeCardsFromSrcPile(game, playerId, moveData.src)
          } else if (
            topCard &&
            card &&
            card.suit === topCard.suit &&
            card.rank === topCard.rank + 1
          ) {
            addCardsToDestPile(game, playerId, moveData.dest, cards)
            removeCardsFromSrcPile(game, playerId, moveData.src)
          }
          break
        }

        case "workPile": {
          const destPile =
            game.tableaus[getPlayerIndex(game, playerId)].workStacks[
              moveData.dest.slot
            ]
          const cards = getMovingCards(game, playerId, moveData)
          const card = cards[0]
          const topCard = destPile[destPile.length - 1] || null

          if (topCard === null && card) {
            addCardsToDestPile(game, playerId, moveData.dest, cards)
            removeCardsFromSrcPile(game, playerId, moveData.src)
          } else if (
            topCard &&
            topCard.rank > 1 &&
            card &&
            card.color !== topCard.color &&
            card.rank === topCard.rank - 1
          ) {
            addCardsToDestPile(game, playerId, moveData.dest, cards)
            removeCardsFromSrcPile(game, playerId, moveData.src)
          }
          break
        }
      }
    },
  },
})
