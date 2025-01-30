import { useAtom } from "jotai"
import { gameStateAtom } from "../../game-state"
import { CardPlaceholder } from "../placeholder"
import clsx from "clsx"
import { CardDestination } from "../card-destination"
import { getPlayerIndex } from "../../logic/utils"

export function Foundations() {
  const [game] = useAtom(gameStateAtom)

  return (
    <div className={`foundations player-count-${game?.playerIds.length}`}>
      {game?.foundations.map((f, idx) => {
        const topCard = f ? f[f.length - 1] : null

        return (
          <CardDestination
            key={`foundation-${idx}`}
            pile="foundation"
            slot={idx}
            scoreIt={
              topCard?.playerId
                ? {
                    cardId: topCard.id,
                    playerIndex: getPlayerIndex(game, topCard.playerId),
                    playerId: topCard.playerId,
                  }
                : undefined
            }
          >
            {topCard ? (
              <img
                className={clsx("card", "foundation", f.length > 1 && "pile")}
                src={`card-themes/default/cards/suit${topCard.suit}/rank${topCard.rank - 1}.png`}
              />
            ) : (
              <CardPlaceholder />
            )}
          </CardDestination>
        )
      })}
    </div>
  )
}
