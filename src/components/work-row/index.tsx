import { useMemo } from "react"
import clsx from "clsx"
import { useAtom } from "jotai"
import { CardPlaceholder } from "../placeholder"
import { CardDestination } from "../card-destination"
import { Card } from "../card"
import { Tableau } from "../../logic/types"
import { moveCardDataAtom } from "../../game-state"

interface WorkRowProps {
  tableau: Tableau
  playerIndex: number
  isGameOver?: boolean
}

export function WorkRow({ tableau, isGameOver, playerIndex }: WorkRowProps) {
  const [moveData, setMoveData] = useAtom(moveCardDataAtom)
  const upSnorkCard = useMemo(
    () => (tableau.snorkPile.length ? tableau.snorkPile[0] : null),
    [tableau.snorkPile]
  )

  return (
    <div className="work-row">
      {upSnorkCard ? (
        <div
          className={clsx({
            card: true,
            "snork-container": true,
            pile: tableau.snorkPile.length > 1,
          })}
          style={{
            backgroundImage: `url(card-themes/default/cards/card-back${playerIndex}.png)`,
          }}
        >
          <Card
            card={upSnorkCard}
            className={clsx({
              card: true,
              selectable: true,
              selected: moveData && moveData.src.cardId === upSnorkCard.id,
            })}
            onClick={() => {
              if (moveData && moveData.src.cardId === upSnorkCard.id) {
                setMoveData(null)
              } else {
                setMoveData({
                  playerIndex,
                  src: {
                    pile: "snorkPile",
                    cardId: upSnorkCard.id,
                  },
                })
              }
            }}
          />
          <div className="badge base-color">{tableau.snorkPile.length}</div>
        </div>
      ) : (
        <div className="snork-container">
          <CardPlaceholder />
          <div
            className={!isGameOver ? "snork-button" : ""}
            onClick={() => {
              Rune.actions.declareSnork()
            }}
          >
            Snork!
          </div>
        </div>
      )}
      <div className="work-stacks">
        {tableau.workStacks.map((workStack, slot) => {
          return (
            <CardDestination key={`stack-${slot}`} pile="workPile" slot={slot}>
              <div className="work-stack">
                {workStack.length ? (
                  workStack.map((card, idx) => {
                    return (
                      <Card
                        key={`card-${card.id}`}
                        className={clsx({
                          card: true,
                          selectable: true,
                          selected: moveData && moveData.src.cardId === card.id,
                        })}
                        style={{ zIndex: idx }}
                        card={card}
                        onClick={() => {
                          if (moveData && moveData.src.cardId === card.id) {
                            setMoveData(null)
                          } else {
                            setMoveData({
                              playerIndex,
                              src: {
                                pile: "workPile",
                                slot,
                                cardId: card.id,
                              },
                            })
                          }
                        }}
                      />
                    )
                  })
                ) : (
                  <CardPlaceholder />
                )}
              </div>
            </CardDestination>
          )
        })}
      </div>
    </div>
  )
}
