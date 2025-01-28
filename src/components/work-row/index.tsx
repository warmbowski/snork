import { useMemo } from "react"
import clsx from "clsx"
import { CardPlaceholder } from "../placeholder"
import { CardDropzone } from "../card-dropzone"
import { Card } from "../card"
import { Tableau } from "../../logic/types"

interface WorkRowProps {
  snorkPile: Tableau["snorkPile"]
  workStacks: Tableau["workStacks"]
  isGameOver?: boolean
}

export function WorkRow({ workStacks, snorkPile, isGameOver }: WorkRowProps) {
  const upSnorkCard = useMemo(
    () => (snorkPile.length ? snorkPile[0] : null),
    [snorkPile]
  )

  return (
    <div className="work-row">
      {upSnorkCard ? (
        <div>
          <Card
            card={upSnorkCard}
            className={clsx(
              "card",
              "draggable",
              "snork-top",
              snorkPile.length > 1 && "pile"
            )}
            dragData={{
              src: {
                pile: "snorkPile",
                cardId: upSnorkCard.id,
              },
            }}
          />
          <div className="badge base-color">{snorkPile.length}</div>
        </div>
      ) : (
        <div>
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
        {workStacks.map((workStack, slot) => {
          return (
            <CardDropzone key={`stack-${slot}`} pile="workPile" slot={slot}>
              <div className="work-stack">
                {workStack.length ? (
                  workStack.map((card, idx) => {
                    return (
                      <Card
                        key={`card-${card.id}`}
                        className="card draggable"
                        style={{ zIndex: idx }}
                        card={card}
                        dragData={{
                          src: {
                            pile: "workPile",
                            slot: slot,
                            cardId: card.id,
                          },
                        }}
                      />
                    )
                  })
                ) : (
                  <CardPlaceholder />
                )}
              </div>
            </CardDropzone>
          )
        })}
      </div>
    </div>
  )
}
