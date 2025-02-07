import { useAtom } from "jotai"
import { moveCardDataAtom } from "../../game-state"
import clsx from "clsx"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { SCORE_ANIMATION_DURATION_MS, TABLEAU_THEME } from "../../constants"

const scoreSound = new Audio(TABLEAU_THEME.audio.score)

interface ScoreIt {
  cardId: number
  playerId: string
  playerIndex: number
  score?: number
}

interface CardDestinationProps {
  children: ReactNode
  pile: "workPile" | "foundation"
  slot: number
  scoreIt?: ScoreIt
}

export function CardDestination({
  children,
  pile,
  slot,
  scoreIt,
}: CardDestinationProps) {
  const [moveData, setMoveData] = useAtom(moveCardDataAtom)
  const [lastScore, setLastScore] = useState<ScoreIt | null>(null)
  const [animateScore, setAnimateScore] = useState<number | null>(null)

  const active = useMemo(() => {
    if (moveData?.src.pile === "workPile") {
      return moveData?.src.slot !== slot || moveData?.src.pile !== pile
    }
    return moveData?.src
  }, [moveData?.src, pile, slot])

  const handleDestinationClick = useCallback(() => {
    if (active && moveData) {
      Rune.actions.moveCard({ ...moveData, dest: { pile, slot } })
      setMoveData(null)
    }
  }, [active, moveData, pile, setMoveData, slot])

  useEffect(() => {
    if (scoreIt && scoreIt.cardId !== lastScore?.cardId) {
      setLastScore(scoreIt)
      setAnimateScore(scoreIt.playerIndex)
      scoreSound.play()

      setTimeout(() => {
        setAnimateScore(null)
      }, SCORE_ANIMATION_DURATION_MS)
    }
  }, [lastScore?.cardId, scoreIt])

  return (
    <div
      className={clsx({
        dropzone: true,
        active: active,
      })}
      onClick={handleDestinationClick}
    >
      {children}
      {animateScore !== null && (
        <span className={`animate-score ${"player" + animateScore}`}>+1</span>
      )}
    </div>
  )
}
