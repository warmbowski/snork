import { useAtom } from "jotai"
import { moveCardDataAtom } from "../../game-state"
import clsx from "clsx"
import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { SCORE_ANIMATION_DURATION_MS } from "../../constants"

interface CardDestinationProps {
  children: ReactNode
  pile: "workPile" | "foundation"
  slot: number
  playerScoreIdx?: number | null
}

export function CardDestination({
  children,
  pile,
  slot,
  playerScoreIdx = null,
}: CardDestinationProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [moveData, setMoveData] = useAtom(moveCardDataAtom)
  const [animateScore, setAnimateScore] = useState<number | null>(null)

  const active = useMemo(() => {
    if (moveData?.src.pile === "workPile") {
      return moveData?.src.slot !== slot || moveData?.src.pile !== pile
    }
    return moveData?.src
  }, [moveData?.src, pile, slot])

  useEffect(() => {
    if (playerScoreIdx !== null) {
      setAnimateScore(playerScoreIdx)

      setTimeout(() => {
        setAnimateScore(null)
      }, SCORE_ANIMATION_DURATION_MS)
    }
    return () => {
      // cleanup
    }
  }, [playerScoreIdx])

  return (
    <div
      ref={divRef}
      className={clsx({
        dropzone: true,
        active: active,
      })}
      onClick={() => {
        if (active && moveData) {
          Rune.actions.moveCard({ ...moveData, dest: { pile, slot } })
          setMoveData(null)
        }
      }}
    >
      {children}
      {animateScore !== null && (
        <span className={`animate-score ${"player" + playerScoreIdx}`}>+1</span>
      )}
    </div>
  )
}
