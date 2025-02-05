interface PlaceholderProps {
  className?: string
  onClick?: () => void
}

export function CardPlaceholder({ className = "", onClick }: PlaceholderProps) {
  return (
    <img
      className={`card placeholder ${className}`}
      onClick={onClick}
      src="card-themes/default/cards/card-placeholder.png"
    />
  )
}

export function SnorkPile({ className = "", onClick }: PlaceholderProps) {
  return (
    <img
      className={`card placeholder ${className}`}
      onClick={onClick}
      src="card-themes/default/cards/card-placeholder-snork.png"
    />
  )
}
export function FoundationPile({ className = "", onClick }: PlaceholderProps) {
  return (
    <img
      className={`card placeholder ${className}`}
      onClick={onClick}
      src="card-themes/default/cards/card-placeholder-foundation.png"
    />
  )
}

export function WorkStack({ className = "", onClick }: PlaceholderProps) {
  return (
    <img
      className={`card placeholder ${className}`}
      onClick={onClick}
      src="card-themes/default/cards/card-placeholder-work.png"
    />
  )
}

export function WastePlaceholder({
  className = "",
  onClick,
}: PlaceholderProps) {
  return (
    <img
      className={`waste-placeholder placeholder ${className}`}
      onClick={onClick}
      src="card-themes/default/cards/card-placeholder.png"
    />
  )
}
