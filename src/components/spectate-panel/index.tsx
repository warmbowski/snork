interface SpectatePanelProps {
  playerIds: string[]
  spectateIndex: number
  setSpectateIndex: (index: number) => void
}

export function SpectatePanel({
  playerIds,
  spectateIndex,
  setSpectateIndex,
}: SpectatePanelProps) {
  return (
    <div className="playerSelect">
      {playerIds.map((playerId, idx) => (
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
  )
}
