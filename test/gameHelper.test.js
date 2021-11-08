import { Game } from "../src/gameHelper";
import { MakeShip } from "../src/ship";

const game = new Game(4);
beforeEach(() => {
  game.initGame("Max", "PC", true);
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

it("Check the .addShipsRdmly fct add the given ship", () => {
  const ships = { 1: 2 };
  game.addShipsRdmly(ships);

  expect(game.currentPlayer.board).not.toEqual([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
});
