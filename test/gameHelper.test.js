import { Game } from "../src/gameHelper";

const game = new Game();
beforeEach(() => {
  game.initGame("Max", "PC", 10, true);
});

it("Check the first player is 'Max' fct", () => {
  expect(game.currentPlayer.name).toBe("Max");
});

it("Check the .nextPlayer fct. Next player is 'PC'", () => {
  game.nextPlayer();
  expect(game.currentPlayer.name).toBe("PC");
});

it("Check the .nextPlayer fct. Next player (x2) is 'Max' again", () => {
  game.nextPlayer();
  game.nextPlayer();

  expect(game.currentPlayer.name).toBe("Max");
});
