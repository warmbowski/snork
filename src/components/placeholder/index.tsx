export function CardPlaceholder({ onClick }: { onClick?: () => void }) {
  return (
    <img
      className="card"
      onClick={onClick}
      src={`card-themes/default/cards/card-placeholder.png`}
    />
  )
}

export function WastePlaceholder({ onClick }: { onClick?: () => void }) {
  return (
    <img
      className="waste-placeholder"
      onClick={onClick}
      src={`card-themes/default/cards/card-placeholder.png`}
    />
  )
}
