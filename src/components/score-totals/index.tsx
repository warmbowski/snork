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
          className={`badge player${idx}`}
          style={playerId === yourPlayerId ? { border: "1px solid white" } : {}}
        >
          {totals[playerId] || 0}
        </div>
      ))}
    </div>
  )
}
