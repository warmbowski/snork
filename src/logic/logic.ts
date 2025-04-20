import { createDeck, createTableau } from "./utils"
import { actions } from "./actions"

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
      snorkDeclaredBy: null,
    }
  },
  actions,
})
