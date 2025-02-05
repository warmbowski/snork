import { GameState } from "../../logic/types"
import { getFoundationsScoreMap, getPlayerIndex } from "../../logic/utils"
import * as styles from "./styles.css"

interface GameEndPanelProps {
  yourPlayerId: string
  game: GameState
}

export function GameEndPanel({ yourPlayerId, game }: GameEndPanelProps) {
  const scoreMap = getFoundationsScoreMap(game)

  return (
    <div className={styles.gameEndPanel}>
      {game.tableaus.map((tableau) => {
        const playerId = tableau.playerId
        const playerIndex = getPlayerIndex(game, playerId)
        const score = scoreMap[playerId] || 0
        const penalty = tableau.snorkPile.length * -2

        return (
          <div
            className={`${playerId === yourPlayerId ? styles.myScoreCard : styles.scoreCard} player${playerIndex}`}
            key={playerId}
          >
            <div className={styles.cardScore}>
              <img
                className={`card ${styles.cardBack}`}
                src={`card-themes/default/cards/card-back${playerIndex}.png`}
              />
              <div className={styles.total}>
                <img
                  className={styles.avatar}
                  src={Rune.getPlayerInfo(playerId).avatarUrl}
                />
                <strong>{score + penalty}</strong>
              </div>
            </div>
            <div className={styles.badges}>
              <div className="badge score">+{score}</div>
              <div className="badge penalty">{penalty}</div>
              <div className="result">
                {game.gameOverResults?.[playerId]}&nbsp;
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
