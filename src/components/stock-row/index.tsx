import { useCallback, useEffect, useMemo, useRef } from "react"
import { Tableau } from "../../logic/types"
import { CardPlaceholder } from "../placeholder"
import { STALE_COUNT_TRESHOLD } from "../../constants"
import { useAtom } from "jotai"
import { moveCardDataAtom, staleCountAtom } from "../../game-state"
import { Card } from "../card"
import clsx from "clsx"
import { usePreloadAssets } from "../preload-theme"

interface StockRowProps {
  tableau: Tableau
  playerIndex: number
}

export function StockRow({ tableau, playerIndex }: StockRowProps) {
  const stockThrottled = useRef(false)
  const [moveData, setMoveData] = useAtom(moveCardDataAtom)
  const [staleCount, setStaleCount] = useAtom(staleCountAtom)
  const { audio } = usePreloadAssets()

  const topCards = useMemo(() => {
    return {
      wasteIdx: tableau.wastePile[tableau.wastePile.length - 1]?.[1] ?? -1,
      stockIdx: tableau.stockPile.length - 1,
    }
  }, [tableau.stockPile.length, tableau.wastePile])

  useEffect(() => {
    if (tableau.wastePile.length === 0) {
      setStaleCount((prev) => prev + 1)
    }
  }, [setStaleCount, tableau.wastePile.length])

  useEffect(() => {
    if (staleCount > STALE_COUNT_TRESHOLD) {
      Rune.actions.markStockStale()
    } else {
      Rune.actions.markStockNotStale()
    }
  }, [staleCount])

  const handleStockClick = useCallback(() => {
    // Throttle stock turning action as it can easily be spammed
    // Rune limit is 10 actions per second
    if (stockThrottled.current) return
    stockThrottled.current = true
    setTimeout(() => {
      stockThrottled.current = false
    }, 300)

    setMoveData(null)
    Rune.actions.turnStock()
  }, [setMoveData])

  const handleWasteCardClick = useCallback(
    (cardId: number) => () => {
      if (moveData && moveData.src.cardId === cardId) {
        setMoveData(null)
      } else {
        audio.selectCard.play()
        setMoveData({
          playerIndex,
          src: {
            pile: "stockPile",
            cardId,
          },
        })
      }
    },
    [moveData, playerIndex, setMoveData, audio.selectCard]
  )

  return (
    <div className="stock-row">
      <div className="stock-container">
        {topCards.wasteIdx !== topCards.stockIdx ? (
          <img
            className="card stock pile"
            src={`card-themes/default/cards/card-back${playerIndex}.png`}
            onClick={handleStockClick}
          />
        ) : (
          <CardPlaceholder onClick={handleStockClick} />
        )}
      </div>
      <div className="waste">
        {tableau.wastePile.length > 0 &&
          tableau.stockPile
            .slice(
              tableau.wastePile[tableau.wastePile.length - 1][0],
              tableau.wastePile[tableau.wastePile.length - 1][1] + 1
            )
            .map((card, idx, arr) => {
              return (
                <Card
                  key={`card-${card.id}`}
                  className={clsx({
                    card: true,
                    selectable: idx === arr.length - 1,
                    selected: moveData && moveData.src.cardId === card.id,
                  })}
                  card={card}
                  onClick={
                    idx === arr.length - 1
                      ? handleWasteCardClick(card.id)
                      : undefined
                  }
                />
              )
            })}
      </div>
      {tableau.stockIsStale && (
        <div
          className={`stuck-button ${tableau.isStuck ? "voted" : ""}`}
          onClick={() => Rune.actions.voteStuck()}
        >
          <span>{tableau.isStuck ? "Unstuck" : `Stuck?`}</span>
        </div>
      )}
    </div>
  )
}
