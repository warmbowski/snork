import { useAtom } from "jotai"
import { gameStateAtom } from "../../game-state"
import { CardPlaceholder } from "../placeholder"
import clsx from "clsx"
import { CardDropzone } from "../card-dropzone"

export function Foundations() {
  const [game] = useAtom(gameStateAtom)

  return (
    <div className="foundations">
      {game?.foundations.map((f, idx) => {
        const topCard = f ? f[f.length - 1] : null

        return (
          <CardDropzone key={`foundation-${idx}`} pile="foundation" slot={idx}>
            {topCard ? (
              <img
                className={clsx("card", "foundation", f.length > 1 && "pile")}
                src={`/card-themes/default/cards/suit${topCard.suit}/rank${topCard.rank - 1}.png`}
              />
            ) : (
              <CardPlaceholder />
            )}
          </CardDropzone>
        )
      })}
    </div>
  )
}
