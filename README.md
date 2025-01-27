# Snork!

<img width="500" alt="Screenshot of Snork!" src="https://github.com/user-attachments/assets/eda39b90-ce88-467e-a46b-62e3036f5cf2" />

Snork! is a competitive multiplayer "solitaire-like" game for two or more players, using a deck of cards for each player. The players race to get rid of the cards from their "Snork piles" while scoring points by building from the ace up onto common foundations. The first player to deplete their Snork pile gets to end the game. At this point, the scoring in the foundations are tallied for all players, and their remaining Snork pile is subtracted from their score. The player with the highest score wins.

#### Basic gameplay to implement:

- [x] Scaffold in basic multiplayer game layout for Rune
- [x] Set game state, logic, and actions via Rune SDK
- [x] Implement drag and drop components and logic
  - [x] flip stock piles cards to waste in groups of 3
  - [x] move top card from Snork pile to foundation or a working stack and flip next card
  - [x] move top card from waste pile to foundation or a working stack
  - [x] play top card from a working stacks to another working stack or foundation
  - [x] move multi-card stack from a working stack to another working stack
- [x] implement snork pile counter 13 -> 0
- [x] Implement "stuck" button to vote for resetting the stock pile (show after 3x through stock pile with no play)
- [x] Implement end game button for players who deplete their Snork pile (they may keep playing cards until this end game button is pressed)
- [x] Implement score keeping logic
- [ ] Implement end game screen with scoring and pleasant animations
- [ ] Implement ready button and game start logic
- [ ] Add sound effects and animations
  - [ ] Add animations and sound effect for card placements in foundations
  - [ ] Add sound effect for general card placement
  - [ ] Add sound effect for waste flip
  - [ ] Add sound effect for stalemate button
  - [ ] Add sound effect for snork! button
  - [ ] Add animations for end game screen

#### Expanded gameplay ideas to implement:

- [ ] Support multiplayer > 2
- [ ]
- [ ] Persist game stats for each player: PRs, Totals, etc

#### Expanded UX ideas:

- [ ] Add ability to unlock new themes

#### Codebase improvements

- [ ] move to monorepo and break components and logic into local packages to be used on other playforms.

## Getting Started with Rune

### `pnpm run dev`

Runs the game in Dev UI.

The page will reload when you make changes.

### `pnpm run upload`

Builds the game and starts upload process to Rune.

### `pnpm run build`

Builds the game. You can then upload it to Rune using `pnpm dlx rune-games-cli@latest upload`.

### `pnpm run lint`

Runs the validation rules. You can read about them in the [docs on server-side logic](https://developers.rune.ai/docs/advanced/server-side-logic).

### `pnpm run typecheck`

Verifies that TypeScript is valid.

## Learn More

See the [Rune docs](https://developers.rune.ai/docs/quick-start) for more info. You can also ask any questions in the [Rune Discord](https://discord.gg/rune-devs), we're happy to help!
