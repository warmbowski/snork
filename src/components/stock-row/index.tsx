import { useEffect } from "react"
import { Tableau } from "../../logic/types"
import { CardPlaceholder } from "../placeholder"
import { STALE_COUNT_TRESHOLD } from "../../constants"
import { useAtom } from "jotai"
import { staleCountAtom } from "../../game-state"
import { Card } from "../card"

interface StockRowProps {
  tableau: Tableau
  playerIndex: number
}

export function StockRow({ tableau, playerIndex }: StockRowProps) {
  const [staleCount, setStaleCount] = useAtom(staleCountAtom)
  const lastWasteCardIndex =
    tableau.wastePile[tableau.wastePile.length - 1]?.[1] ?? -1
  const lastStockCardIndex = tableau.stockPile.length - 1

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

  return (
    <div className="stock-row">
      <div>
        {lastWasteCardIndex !== lastStockCardIndex ? (
          <Card
            className="card stock pile"
            src={`card-themes/default/cards/card-back${playerIndex}.png`}
            onClick={() => Rune.actions.turnStock()}
          />
        ) : (
          <CardPlaceholder onClick={() => Rune.actions.turnStock()} />
        )}
        {tableau.stockIsStale && (
          <div
            className={`stuck-button ${tableau.isStuck ? "voted" : ""}`}
            onClick={() => Rune.actions.voteStuck()}
          >
            Stuck
          </div>
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
                  className={`card ${idx === arr.length - 1 ? "draggable" : ""}`}
                  card={card}
                  dragData={{
                    src: {
                      pile: "stockPile",
                      cardId: card.id,
                    },
                  }}
                  onDrop={() => setStaleCount(0)}
                />
              )
            })}
      </div>
    </div>
  )
}
