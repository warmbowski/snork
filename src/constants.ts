export const SCORE_ANIMATION_DURATION_MS = 1000
export const STALE_COUNT_TRESHOLD = 2

interface Theme {
  images: {
    diagram: string
    cardPlaceholders: string[]
    cardBacks: string[]
    cards: string[]
  }
  audio: {
    test?: string
  }
}

export const TABLEAU_THEME: Theme = {
  images: {
    diagram: "snork-diagram.png",
    cardPlaceholders: [
      "card-themes/default/cards/card-placeholder.png",
      "card-themes/default/cards/card-placeholder-snork.png",
      "card-themes/default/cards/card-placeholder-foundation.png",
      "card-themes/default/cards/card-placeholder-work.png",
    ],
    cardBacks: [
      "card-themes/default/cards/card-back0.png",
      "card-themes/default/cards/card-back1.png",
    ],
    cards: [
      "card-themes/default/cards/suit0/rank0.png",
      "card-themes/default/cards/suit0/rank1.png",
      "card-themes/default/cards/suit0/rank2.png",
      "card-themes/default/cards/suit0/rank3.png",
      "card-themes/default/cards/suit0/rank4.png",
      "card-themes/default/cards/suit0/rank5.png",
      "card-themes/default/cards/suit0/rank6.png",
      "card-themes/default/cards/suit0/rank7.png",
      "card-themes/default/cards/suit0/rank8.png",
      "card-themes/default/cards/suit0/rank9.png",
      "card-themes/default/cards/suit0/rank10.png",
      "card-themes/default/cards/suit0/rank11.png",
      "card-themes/default/cards/suit0/rank12.png",

      "card-themes/default/cards/suit1/rank0.png",
      "card-themes/default/cards/suit1/rank1.png",
      "card-themes/default/cards/suit1/rank2.png",
      "card-themes/default/cards/suit1/rank3.png",
      "card-themes/default/cards/suit1/rank4.png",
      "card-themes/default/cards/suit1/rank5.png",
      "card-themes/default/cards/suit1/rank6.png",
      "card-themes/default/cards/suit1/rank7.png",
      "card-themes/default/cards/suit1/rank8.png",
      "card-themes/default/cards/suit1/rank9.png",
      "card-themes/default/cards/suit1/rank10.png",
      "card-themes/default/cards/suit1/rank11.png",
      "card-themes/default/cards/suit1/rank12.png",

      "card-themes/default/cards/suit2/rank0.png",
      "card-themes/default/cards/suit2/rank1.png",
      "card-themes/default/cards/suit2/rank2.png",
      "card-themes/default/cards/suit2/rank3.png",
      "card-themes/default/cards/suit2/rank4.png",
      "card-themes/default/cards/suit2/rank5.png",
      "card-themes/default/cards/suit2/rank6.png",
      "card-themes/default/cards/suit2/rank7.png",
      "card-themes/default/cards/suit2/rank8.png",
      "card-themes/default/cards/suit2/rank9.png",
      "card-themes/default/cards/suit2/rank10.png",
      "card-themes/default/cards/suit2/rank11.png",
      "card-themes/default/cards/suit2/rank12.png",

      "card-themes/default/cards/suit3/rank0.png",
      "card-themes/default/cards/suit3/rank1.png",
      "card-themes/default/cards/suit3/rank2.png",
      "card-themes/default/cards/suit3/rank3.png",
      "card-themes/default/cards/suit3/rank4.png",
      "card-themes/default/cards/suit3/rank5.png",
      "card-themes/default/cards/suit3/rank6.png",
      "card-themes/default/cards/suit3/rank7.png",
      "card-themes/default/cards/suit3/rank8.png",
      "card-themes/default/cards/suit3/rank9.png",
      "card-themes/default/cards/suit3/rank10.png",
      "card-themes/default/cards/suit3/rank11.png",
      "card-themes/default/cards/suit3/rank12.png",
    ],
  },
  audio: {},
}
