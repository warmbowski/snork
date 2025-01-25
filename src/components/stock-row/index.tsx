import { Tableau } from "../../logic/types"
import {
  handleCardDragEnd,
  handleCardDragStart,
} from "../card-dropzone/handlers"
import { CardPlaceholder } from "../placeholder"

interface StockRowProps {
  stockPile: Tableau["stockPile"]
  wastePile: Tableau["wastePile"]
  playerIndex: number
}

export function StockRow({ stockPile, wastePile, playerIndex }: StockRowProps) {
  const lastWasteCardIndex = wastePile[wastePile.length - 1]?.[1] ?? -1
  const lastStockCardIndex = stockPile.length - 1

  return (
    <div className="stock-row">
      {lastWasteCardIndex !== lastStockCardIndex ? (
        <img
          className="card stock pile"
          src={`/card-themes/default/cards/card-back${playerIndex}.png`}
          onClick={() => Rune.actions.turnStock()}
        />
      ) : (
        <CardPlaceholder onClick={() => Rune.actions.turnStock()} />
      )}
      <div className="waste">
        {wastePile.length > 0 &&
          stockPile
            .slice(
              wastePile[wastePile.length - 1][0],
              wastePile[wastePile.length - 1][1] + 1
            )
            .map((card, idx, arr) => {
              return (
                <img
                  key={`card-${card.id}`}
                  className={`card ${idx === arr.length - 1 ? "draggable" : ""}`}
                  src={`/card-themes/default/cards/suit${card.suit}/rank${card.rank - 1}.png`}
                  draggable={idx === arr.length - 1}
                  onDragStart={(e) => {
                    handleCardDragStart(e, {
                      src: {
                        pile: "stockPile",
                        cardId: card.id,
                      },
                    })
                  }}
                  onDragEnd={(e) => {
                    handleCardDragEnd(e)
                  }}
                />
              )
            })}
      </div>
    </div>
  )
}
