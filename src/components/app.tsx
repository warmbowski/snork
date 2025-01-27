import { useEffect, useMemo, useRef, useState } from "react"
import { useAtom } from "jotai"
import { gameStateAtom, yourPlayerIdAtom } from "../game-state"
import { usePreloadAssets } from "./preload-theme"
import { getFoundationsScoreMap, getPlayerIndex } from "../logic/utils"
import { Foundations } from "./foundations"
import { StockRow } from "./stock-row"
import { WorkRow } from "./work-row"

type ScoreMap = Record<string, number>

export function App() {
  const [game, setGame] = useAtom(gameStateAtom)
  const [yourPlayerId, setYourPlayerId] = useAtom(yourPlayerIdAtom)
  const [spectateIndex, setSpectateIndex] = useState(0)
  const [totals, setTotals] = useState<ScoreMap>({})
  const rootRef = useRef<HTMLDivElement>(null)

  const spectateId = useMemo(() => {
    return game?.playerIds[spectateIndex]
  }, [game, spectateIndex])

  const playerIndex = useMemo(() => {
    return game ? getPlayerIndex(game, yourPlayerId || spectateId || "") : -1
  }, [game, spectateId, yourPlayerId])

  usePreloadAssets()

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
        }
        if (action && action.name === "turnStock") {
          // playSound("turnStock")
        }
        if (action && action.name === "declareSnork") {
          // playSound("declareSnork")
        }
        if (action && action.name === "voteEndGame") {
          // playSound("markStockStale")
        }
        if (action && action.name === "voteEndGame") {
          // playSound("endGame")
        }
      },
    })
  }, [setGame, setYourPlayerId])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  return (
    <div ref={rootRef} className={`app player${playerIndex}`}>
      <div className="common-row">
        <div className="totals">
          {game.playerIds.map((playerId, idx) => (
            <div
              key={playerId}
              className={`badge player${idx}`}
              style={
                playerId === yourPlayerId ? { border: "1px solid white" } : {}
              }
            >
              {totals[playerId] || 0}
            </div>
          ))}
        </div>
        <Foundations />
      </div>
      <div className="tableaus">
        {game.tableaus
          .filter((t) => t.playerId === (yourPlayerId || spectateId))
          .map((t) => {
            return (
              <div className="tableau" key={`tableau-${t.playerId}`}>
                <WorkRow
                  snorkPile={t.snorkPile}
                  workStacks={t.workStacks}
                  isGameOver={!!game.gameOverResults}
                />
                <StockRow
                  stockPile={t.stockPile}
                  wastePile={t.wastePile}
                  playerIndex={playerIndex}
                />
              </div>
            )
          })}
      </div>
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
