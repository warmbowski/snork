import { ScoreMap } from "../../logic/types"

interface ScoreTotalsProps {
  playerIds: string[]
  yourPlayerId: string
  totals: ScoreMap
}

export function ScoreTotals({
  playerIds,
  yourPlayerId,
  totals,
}: ScoreTotalsProps) {
  return (
    <div className="totals">
      {playerIds.map((playerId, idx) => (
        <div
          key={playerId}
          className={`badge player${idx} ${playerId === yourPlayerId ? "me" : ""}`}
        >
          {totals[playerId] || 0}
        </div>
      ))}
    </div>
  )
}
