interface WaitingRoomProps {
  readyToStart: boolean
  isPlayer: boolean
  playerIndex: number
}

export function WaitingRoom({
  readyToStart,
  isPlayer,
  playerIndex,
}: WaitingRoomProps) {
  return (
    <div className={`waiting-room player${playerIndex}`}>
      <h1>Snork!</h1>
      <div className="instructions">
        <img src="snork-diagram.png" />
      </div>
      <h3>Waiting for all players to be ready...</h3>
      {isPlayer && (
        <div
          className={`ready-button ${readyToStart ? "voted" : ""}`}
          onClick={() => {
            Rune.actions.voteStartGame()
          }}
        >
          {readyToStart ? "Ready!" : "Ready?"}
        </div>
      )}
    </div>
  )
}
