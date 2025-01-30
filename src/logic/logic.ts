import type { RuneClient } from "rune-sdk"

import {
  addCardsToDestPile,
  computeGameOverResults,
  createDeck,
  createTableau,
  getMovingCards,
  getPlayerIndex,
  removeCardsFromSrcPile,
} from "./utils"
import { GameState, MoveData, Tableau } from "./types"

type GameActions = {
  voteStartGame: () => void
  startGame: () => void
  turnStock: () => void
  moveCard: (params: Required<MoveData>) => void
  markStockStale: () => void
  markStockNotStale: () => void
  declareSnork: () => void
  voteStuck: () => void
  resetStockPiles: () => void
  endGame: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  // persistPlayerData: true,
  setup: (allPlayerIds) => {
    return {
      gameStarted: false,
      playerIds: allPlayerIds,
      foundations: allPlayerIds.flatMap(() => new Array(4).fill([])),
      tableaus: allPlayerIds.map((playerId) => {
        const deck = createDeck(
          playerId,
          allPlayerIds.findIndex((id) => id === playerId)
        )
        return createTableau(deck)
      }),
      snorkDeclared: null,
    }
  },
  actions: {
    voteStartGame: (_, { game, playerId }) => {
      game.tableaus[getPlayerIndex(game, playerId)].readyToStart = true
    },
    startGame: (_, { game }) => {
      if (game.tableaus.every((t) => t.readyToStart)) {
        game.gameStarted = true
      }
    },
    markStockStale: (_, { game, playerId }) => {
      game.tableaus[getPlayerIndex(game, playerId)].stockIsStale = true
    },
    markStockNotStale: (_, { game, playerId }) => {
      game.tableaus[getPlayerIndex(game, playerId)].stockIsStale = false
    },
    declareSnork: (_, { game, playerId }) => {
      game.snorkDeclared = playerId
    },
    voteStuck: (_, { game, playerId }) => {
      const { stockIsStale } = game.tableaus[getPlayerIndex(game, playerId)]
      if (stockIsStale) {
        game.tableaus[getPlayerIndex(game, playerId)].isStuck = true
      }
    },
    endGame: (_, { game }) => {
      computeGameOverResults(game)

      if (game.gameOverResults) {
        // persistsPersonalBests(game, playerId)
        Rune.gameOver({
          players: game.gameOverResults,
          // delayPopUp: true, // to be used with Rune.showGameOverPopUp()
          minimizePopUp: true,
        })
      }
    },
    resetStockPiles: (_, { game }) => {
      game.tableaus.forEach((tableau) => {
        const bottomCard = tableau.stockPile[0]
        tableau.stockPile = [...tableau.stockPile.slice(1), bottomCard]
        tableau.wastePile = []
        tableau.isStuck = false
        tableau.stockIsStale = false
      })
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
      if (game.gameOverResults) return

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

          // if anyone plays in the foundation, reset the isStuck votes to give up
          game.tableaus.map((t) => {
            t.isStuck = false
          })
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
