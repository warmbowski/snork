import clsx from "clsx"
import { Tableau } from "../../logic/types"
import { CardPlaceholder } from "../placeholder"
import { CardDropzone } from "../card-dropzone"
import {
  handleCardDragEnd,
  handleCardDragStart,
} from "../card-dropzone/handlers"

interface WorkRowProps {
  snorkPile: Tableau["snorkPile"]
  workStacks: Tableau["workStacks"]
  isGameOver?: boolean
}

export function WorkRow({ workStacks, snorkPile, isGameOver }: WorkRowProps) {
  const upSnorkCard = snorkPile.length ? snorkPile[0] : null

  return (
    <div className="work-row">
      {upSnorkCard ? (
        <div>
          <img
            id={`card-${upSnorkCard.id}`}
            key={`card-${upSnorkCard.id}`}
            className={clsx(
              "card",
              "draggable",
              "snork-top",
              snorkPile.length > 1 && "pile"
            )}
            src={`/card-themes/default/cards/suit${upSnorkCard.suit}/rank${upSnorkCard.rank - 1}.png`}
            draggable
            onDragStart={(e) => {
              handleCardDragStart(e, {
                src: {
                  pile: "snorkPile",
                  cardId: upSnorkCard.id,
                },
              })
            }}
            onDragEnd={(e) => {
              handleCardDragEnd(e)
            }}
          />
          <div className="badge base-color">{snorkPile.length}</div>
        </div>
      ) : (
        <div>
          <CardPlaceholder />
          <div
            className={!isGameOver ? "snork-declare" : ""}
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
                      <img
                        key={`card-${card.id}`}
                        className="card draggable"
                        style={{ zIndex: idx }}
                        src={`/card-themes/default/cards/suit${card.suit}/rank${card.rank - 1}.png`}
                        draggable
                        onDragStart={(e) => {
                          // // TODO: create a better custom drage image for movng stacked cards
                          // const stackEl =
                          //   e.currentTarget.parentElement?.cloneNode(
                          //     true
                          //   ) as HTMLElement
                          // console.log(stackEl)
                          // e.dataTransfer.setDragImage(stackEl, 20, 0)
                          handleCardDragStart(e, {
                            src: {
                              pile: "workPile",
                              slot: slot,
                              cardId: card.id,
                            },
                          })
                        }}
                        onDragEnd={(e) => {
                          handleCardDragEnd(e)
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
