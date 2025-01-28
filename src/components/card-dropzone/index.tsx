import clsx from "clsx"
import { ReactNode, useEffect, useRef, useState } from "react"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import "./styles.css"
import { MoveData } from "../../logic/types"

interface CardDropzoneProps {
  children: ReactNode
  pile: "workPile" | "foundation"
  slot: number
}

export function CardDropzone({ children, pile, slot }: CardDropzoneProps) {
  const dropRef = useRef<HTMLImageElement>(null)
  const [showDropzone, setShowDropzone] = useState(false)

  useEffect(() => {
    const el = dropRef.current!

    return dropTargetForElements({
      element: el,
      onDragEnter: () => {
        setShowDropzone(true)
      },
      onDragLeave: () => {
        setShowDropzone(false)
      },
      onDrop: ({ source }) => {
        if (source.data.dragData) {
          const dragData = source.data.dragData as MoveData
          Rune.actions.moveCard({ ...dragData, dest: { pile, slot } })
        }
        setShowDropzone(false)
      },
    })
  }, [pile, slot])

  return (
    <div
      ref={dropRef}
      className={clsx({
        dropzone: true,
        active: showDropzone,
      })}
    >
      {children}
    </div>
  )
}
