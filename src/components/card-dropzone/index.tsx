import clsx from "clsx"
import { ReactNode, useState } from "react"
import "./styles.css"
import { handleCardDrop } from "./handlers"

interface CardDropzoneProps {
  children: ReactNode
  pile: "workPile" | "foundation"
  slot: number
}

export function CardDropzone({ children, pile, slot }: CardDropzoneProps) {
  const [showDropzone, setShowDropzone] = useState(false)

  return (
    <div
      className={clsx({
        dropzone: true,
        active: showDropzone,
      })}
      onDragOver={(e) => {
        e.preventDefault()
        setShowDropzone(true)
      }}
      onDragLeave={() => setShowDropzone(false)}
      onDrop={(e) => {
        handleCardDrop(e, pile, slot)
        setShowDropzone(false)
      }}
    >
      {children}
    </div>
  )
}
