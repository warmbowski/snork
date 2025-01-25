import { MoveData } from "../../logic/types"

export const handleCardDragStart = (
  e: React.DragEvent<HTMLImageElement>,
  moveData: MoveData
) => {
  e.dataTransfer.setData("text/plain", JSON.stringify(moveData))
  e.currentTarget.classList.add("dragging")
}

export const handleCardDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
  e.dataTransfer.clearData()
  e.currentTarget.classList.remove("dragging")
}

export const handleCardDrop = (
  e: React.DragEvent<HTMLDivElement>,
  pile: "workPile" | "foundation",
  slot: number
) => {
  let moveData: MoveData | null = null
  const td = e.dataTransfer.getData("text/plain")

  try {
    moveData = JSON.parse(td) as MoveData
  } catch (e) {
    console.error("Failed to parse moveData", e)
  }

  if (moveData) {
    Rune.actions.moveCard({ ...moveData, dest: { pile, slot } })
  }
  e.preventDefault()
}
