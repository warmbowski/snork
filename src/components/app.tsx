import { useEffect, useMemo, useRef, useState } from "react"
import { useAtom, useSetAtom } from "jotai"
import { gameStateAtom, staleCountAtom, yourPlayerIdAtom } from "../game-state"
import { usePreloadAssets } from "./preload-theme"
import { getFoundationsScoreMap, getPlayerIndex } from "../logic/utils"
import { Foundations } from "./foundations"
import { StockRow } from "./stock-row"
import { WorkRow } from "./work-row"
import { ScoreMap } from "../logic/types"
import { ScoreTotals } from "./score-totals"

export function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [game, setGame] = useAtom(gameStateAtom)
  const [yourPlayerId, setYourPlayerId] = useAtom(yourPlayerIdAtom)
  const setStaleCount = useSetAtom(staleCountAtom)
  const [spectateIndex, setSpectateIndex] = useState(0)
  const [totals, setTotals] = useState<ScoreMap>({})

  const spectateId = useMemo(() => {
    return game?.playerIds[spectateIndex]
  }, [game, spectateIndex])

  const playerIndex = useMemo(() => {
    return game ? getPlayerIndex(game, yourPlayerId || spectateId || "") : -1
  }, [game, spectateId, yourPlayerId])

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
      if (game.snorkDeclared === yourPlayerId) {
        Rune.actions.endGame()
      }
    }
  }, [game, yourPlayerId])

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId || "")
        // console.log(action)
        const scoreMap = getFoundationsScoreMap(game)
        setTotals(scoreMap)

        // add action sounds effects here
        if (action && action.name === "moveCard") {
          // playSound("moveCard")
          if (action.params.src.pile === "stockPile") {
            setStaleCount(0)
          }
        }
        if (action && action.name === "turnStock") {
          // playSound("turnStock")
        }
        if (action && action.name === "voteStuck") {
          // playSound("voteStuck")
        }
        if (action && action.name === "resetStockPiles") {
          // playSound("resetStockPiles")
          setStaleCount(0)
        }
        if (action && action.name === "endGame") {
          // playSound("endGame")
        }
        if (action && action.name === "declareSnork") {
          // playSound("declareSnork")
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
      <div className={`common-row player-count-${game.playerIds.length}`}>
        <ScoreTotals
          playerIds={game.playerIds}
          yourPlayerId={yourPlayerId}
          totals={totals}
        />
        <Foundations />
      </div>
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
        <div className="waiting">
          <h1>Snork!</h1>
          <p>
            A fast-paced solitaire-like card game where players try to be the
            first to get rid of their Snork pile and declare "Snork!", while
            playing as many cards as possible in the shared foundations at the
            top. They score +1 for each of their cards in the foundations, and
            will be penalized -2 for any leftover snork pile cards at the end of
            the game. Click the botton when you are ready to start.
          </p>
          <h3>Waiting for all players to be ready...</h3>
          {yourPlayerId && (
            <div
              className={`ready-button ${game.tableaus[playerIndex].readyToStart ? "voted" : ""}`}
              onClick={() => {
                Rune.actions.voteStartGame()
              }}
            >
              {game.tableaus[playerIndex].readyToStart ? "Ready!" : "Ready?"}
            </div>
          )}
        </div>
      )}
      {!yourPlayerId && (
        <div className="playerSelect">
          {game.playerIds.map((playerId, idx) => (
            <img
              key={playerId}
              className={idx === spectateIndex ? "selected" : ""}
              src={Rune.getPlayerInfo(playerId).avatarUrl}
              onClick={() => {
                setSpectateIndex(idx)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
