interface ScoreTotalsProps {
  playerIds: string[]
  yourPlayerId: string
  totals: Record<string, number>
  stuckVotes: Record<string, boolean>
}

export function ScoreTotals({
  playerIds,
  yourPlayerId,
  totals,
  stuckVotes,
}: ScoreTotalsProps) {
  return (
    <div className="totals">
      {playerIds.map((playerId, idx) => (
        <div
          key={playerId}
          className={`badge player${idx} ${playerId === yourPlayerId ? "me" : ""}`}
        >
          <span className="stuck">{stuckVotes[playerId] && "😩"}</span>
          <span>{totals[playerId] || 0}</span>
        </div>
      ))}
    </div>
  )
}
