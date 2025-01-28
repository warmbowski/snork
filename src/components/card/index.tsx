import { useEffect, useRef } from "react"
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Card as CardType, MoveData } from "../../logic/types"

interface CardProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  card?: CardType
  showBack?: number
  dragData?: MoveData
  onDrop?: () => void
}

export function Card({
  card,
  showBack,
  dragData,
  onDrop,
  ...imgProps
}: CardProps) {
  const dragRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!dragData) return

    const el = dragRef.current!

    return draggable({
      element: el,
      getInitialData: () => ({
        dragData,
      }),
      onDragStart: () => {
        el?.classList.add("dragging")
        el?.classList.add("drag=preview")
        requestAnimationFrame(() => el?.classList.remove("drag-preview"))
      },
      onDrop: () => {
        el?.classList.remove("dragging")
        if (onDrop) onDrop()
      },
    })
  }, [card, dragData, onDrop])

  if (showBack !== undefined) {
    return (
      <img
        className="card"
        src={`card-themes/default/cards/card-back${showBack}.png`}
        {...imgProps}
      />
    )
  }
  return (
    <img
      ref={dragRef}
      id={card ? `card-${card.id}` : undefined}
      className="card"
      src={
        card
          ? `card-themes/default/cards/suit${card.suit}/rank${card.rank - 1}.png`
          : undefined
      }
      {...imgProps}
    />
  )
}
