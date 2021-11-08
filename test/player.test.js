import { Gameboard } from "../src/gameboard";
import { Player } from "../src/player";
import { MakeShip } from "../src/ship";

describe("Player no IA", () => {
  let enemyBoard;
  let player;
  let ship;
  beforeEach(() => {
    enemyBoard = new Gameboard(10);
    player = new Player("Max", enemyBoard);
    ship = new MakeShip(3);
    enemyBoard.putShip(ship, [3, 3], [0, 1]);
  });

  test("Player fire on a ship", () => {
    expect(player.play([3, 3])).toBeTruthy();
  });

  test("Player fire but miss a ship", () => {
    expect(player.play([8, 8])).toBeFalsy();
  });
});

describe("Player IA", () => {
  let enemyBoard;
  let player;
  let ship;
  beforeEach(() => {
    enemyBoard = new Gameboard(10);
    player = new Player("ordi", enemyBoard, true);
    ship = new MakeShip(3);
    enemyBoard.putShip(ship, [3, 3], [0, 1]);
  });

  for (let i = 0; i < 100; i++) {
    test("IA don't shoot coord already fired", () => {
      expect(enemyBoard.isNotAlreadyFired(player.IAChooseCoord())).toBeTruthy();
    });
  }
});
