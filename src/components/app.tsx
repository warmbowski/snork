import { useEffect, useMemo, useRef, useState } from "react"
import { useAtom, useSetAtom } from "jotai"
import { gameStateAtom, staleCountAtom, yourPlayerIdAtom } from "../game-state"
import { usePreloadAssets } from "./preload-theme"
import { getFoundationsScoreMap, getPlayerIndex } from "../logic/utils"
import { Foundations } from "./foundations"
import { StockRow } from "./stock-row"
import { WorkRow } from "./work-row"
import { ScoreBanner } from "./score-banner"
import { SpectatePanel } from "./spectate-panel"
import { WaitingRoom } from "./waiting-room"
import { GameEndPanel } from "./game-end-panel"
import { TABLEAU_THEME } from "../constants"

const declareSnork = new Audio(TABLEAU_THEME.audio.declareSnork)
const resetStock = new Audio(TABLEAU_THEME.audio.resetStock)
const turnStock = new Audio(TABLEAU_THEME.audio.turnStock)
const voteStuck = new Audio(TABLEAU_THEME.audio.voteStuck)
const moveToFoundation = new Audio(TABLEAU_THEME.audio.moveToFoundation)
const moveToWork = new Audio(TABLEAU_THEME.audio.moveToWork)
// const moveInvalid = new Audio(TABLEAU_THEME.audio.moveInvalid)

export function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [game, setGame] = useAtom(gameStateAtom)
  const [yourPlayerId, setYourPlayerId] = useAtom(yourPlayerIdAtom)
  const setStaleCount = useSetAtom(staleCountAtom)
  const [spectateIndex, setSpectateIndex] = useState(0)
  const [totals, setTotals] = useState<Record<string, number>>({})

  const spectateId = useMemo(() => {
    return game?.playerIds[spectateIndex]
  }, [game, spectateIndex])

  const playerIndex = useMemo(() => {
    return game ? getPlayerIndex(game, yourPlayerId || spectateId || "") : -1
  }, [game, spectateId, yourPlayerId])

  const stuckPlayerMap = useMemo(() => {
    return (
      game?.tableaus.reduce<Record<string, boolean>>((acc, t) => {
        acc[t.playerId] = t.isStuck
        return acc
      }, {}) || {}
    )
  }, [game?.tableaus])

  usePreloadAssets()

  useEffect(() => {
    // game state related rune actions called only from current player's game
    if (game) {
      // check if all players are ready to start and start the game
      if (game.tableaus.every((t) => t.readyToStart)) {
        Rune.actions.startGame()
      }

      // check if everyeone is stuck and reset stock piles
      if (game.tableaus.every((t) => t.isStuck)) {
        // this is to endure the reset is only triggered from one player
        if (game.tableaus[0].playerId === yourPlayerId) {
          Rune.actions.resetStockPiles()
        }
      }

      // check if game is over
      if (game.snorkDeclaredBy === yourPlayerId) {
        Rune.actions.endGame()
      }
    }
  }, [game, yourPlayerId])

  useEffect(() => {
    Rune.initClient({
      onChange: ({ event, game, action, yourPlayerId }) => {
        if (event?.name === "stateSync" && event.isNewGame) {
          // game restart will run these actions
          setStaleCount(-1)
        }

        setGame(game)
        setYourPlayerId(yourPlayerId || "")
        // console.log(action)
        const scoreMap = getFoundationsScoreMap(game)
        setTotals(scoreMap)

        // add action sounds effects here
        if (action && action.name === "moveCard") {
          if (action.params.src.pile === "stockPile") {
            setStaleCount(0)
          }
          if (action.params.dest.pile === "foundation") {
            moveToFoundation.play()
          }
          if (
            action.params.dest.pile === "workPile" &&
            action.playerId === yourPlayerId
          ) {
            moveToWork.play()
          }
        }
        if (
          action &&
          action.name === "turnStock" &&
          action.playerId === yourPlayerId
        ) {
          turnStock.play()
        }
        if (action && action.name === "voteStuck") {
          voteStuck.play()
        }
        if (action && action.name === "resetStockPiles") {
          resetStock.play()
          setStaleCount(0)
        }
        if (action && action.name === "endGame") {
          // endGame.play()
        }
        if (action && action.name === "declareSnork") {
          declareSnork.play()
        }
      },
    })
  }, [setGame, setStaleCount, setYourPlayerId])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  return (
    <div ref={rootRef} className={`app player${playerIndex}`}>
      {!game.gameOverResults?.[yourPlayerId] ? (
        <div className={`common-row player-count-${game.playerIds.length}`}>
          <ScoreBanner
            playerIds={game.playerIds}
            yourPlayerId={yourPlayerId}
            totals={totals}
            stuckVotes={stuckPlayerMap}
          />
          <Foundations />
        </div>
      ) : (
        <GameEndPanel yourPlayerId={yourPlayerId} game={game} />
      )}
      {game.gameStarted ? (
        <div className="tableaus">
          {game.tableaus
            .filter((t) => t.playerId === (yourPlayerId || spectateId))
            .map((t) => {
              return (
                <div className="tableau" key={`tableau-${t.playerId}`}>
                  <WorkRow
                    tableau={t}
                    playerIndex={playerIndex}
                    isGameOver={!!game.gameOverResults}
                  />
                  <StockRow tableau={t} playerIndex={playerIndex} />
                </div>
              )
            })}
        </div>
      ) : (
        <WaitingRoom
          readyToStart={game.tableaus[playerIndex].readyToStart}
          isPlayer={Boolean(yourPlayerId)}
          playerIndex={playerIndex}
        />
      )}
      {!yourPlayerId && (
        <SpectatePanel
          playerIds={game.playerIds}
          spectateIndex={spectateIndex}
          setSpectateIndex={setSpectateIndex}
        />
      )}
    </div>
  )
}
