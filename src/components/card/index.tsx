import { Card as CardType } from "../../logic/types"

interface CardProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  card: CardType
  showBack?: boolean
}

export function Card({ card, showBack, ...imgProps }: CardProps) {
  if (showBack !== undefined) {
    return (
      <img
        className="card"
        src={`card-themes/default/cards/card-back${card.back}.png`}
        {...imgProps}
      />
    )
  }

  return (
    <img
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
