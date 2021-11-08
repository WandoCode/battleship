import { Gameboard, giveShipCoordinates } from "../src/gameboard";
import { MakeShip } from "../src/ship";

let board;
it("Create a 3x3 board", () => {
  board = new Gameboard(3);
  expect(board.board).toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

it("Check the coordinate of a ship (size 1) in (1,1), direction (0,1)", () => {
  expect(giveShipCoordinates([0, 0], [0, 1], 1)).toEqual([[0, 0]]);
});

it("Check the coordinate of a ship (size 2) in (1,1), direction (0,1)", () => {
  expect(giveShipCoordinates([0, 0], [0, 1], 2)).toEqual([
    [0, 0],
    [0, 1],
  ]);
});

it("Check the coordinate of a ship (size 2) in (1,1), direction (0,-1)", () => {
  expect(giveShipCoordinates([0, 0], [0, -1], 2)).toEqual([
    [0, 0],
    [0, -1],
  ]);
});

it("Check the coordinate of a ship (size 2) in (1,1), direction (1,0)", () => {
  expect(giveShipCoordinates([0, 0], [1, 0], 2)).toEqual([
    [0, 0],
    [1, 0],
  ]);
});
it("Check the coordinate of a ship (size 2) in (1,1), direction (-1,0)", () => {
  expect(giveShipCoordinates([0, 0], [-1, 0], 2)).toEqual([
    [0, 0],
    [-1, 0],
  ]);
});

it("Check if a ship put on the board is at the good coordinate. start:(2,2) ship size = 2, direction (0,1)", () => {
  let ship = new MakeShip(2);
  board = new Gameboard(10);
  board.putShip(ship, [2, 2], [0, 1]);
  expect(board.board[2][2]).toEqual({ ship: ship, portion: 0 });
  expect(board.board[2][3]).toEqual({ ship: ship, portion: 1 });
  expect(board.board[2][1]).toEqual(null);
  expect(board.board[2][4]).toEqual(null);
  expect(board.board[3][3]).toEqual(null);
  expect(board.board[3][2]).toEqual(null);
  expect(board.board[1][2]).toEqual(null);
});

it("Check if ship can be put outside of the board", () => {
  let ship = new MakeShip(5);
  board = new Gameboard(3);
  board.putShip(ship, [0, 0], [0, 1]);
  expect(board.board).toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

it("Check if ship as large as the board can fit", () => {
  let ship = new MakeShip(5);
  board = new Gameboard(5);
  board.putShip(ship, [0, 0], [0, 1]);
  expect(board.board).not.toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

it("Check if a hit on a ship is saved", () => {
  let ship = new MakeShip(2);
  board = new Gameboard(10);
  board.putShip(ship, [2, 2], [0, 1]);
  board.receiveAttack([2, 2]);
  expect(ship.hitPos).toEqual([0]);
});

it("Check if 2 hit on a ship of size 2 is saved, and ship sink", () => {
  let ship = new MakeShip(2);
  board = new Gameboard(10);
  board.putShip(ship, [2, 2], [0, 1]);
  board.receiveAttack([2, 2]);
  board.receiveAttack([2, 3]);
  expect(ship.hitPos).toEqual([0, 1]);
  expect(ship.isSunk).toBeTruthy();
});

it("Check if a hit on a map is saved", () => {
  board = new Gameboard(10);
  board.receiveAttack([2, 2]);
  board.receiveAttack([2, 3]);
  expect(board.firedPositions).toEqual([
    [2, 2],
    [2, 3],
  ]);
});

it("Check if multiple hit at the same position on a map is saved once", () => {
  board = new Gameboard(10);
  board.receiveAttack([2, 2]);
  board.receiveAttack([2, 2]);
  expect(board.firedPositions).toEqual([[2, 2]]);
});

it("Check if a hit on a ship mark the position around ('en X') are filled", () => {
  let ship = new MakeShip(2);
  board = new Gameboard(10);
  board.putShip(ship, [2, 2], [0, 1]);
  board.receiveAttack([2, 2]);
  expect(board.firedPositions).toEqual([
    [2, 2],
    [1, 1],
    [1, 3],
    [3, 1],
    [3, 3],
  ]);
});

it("Check if it show that every ship is sunk", () => {
  let ship = new MakeShip(2);
  board = new Gameboard(10);
  board.putShip(ship, [2, 2], [0, 1]);
  board.receiveAttack([2, 2]);
  board.receiveAttack([2, 3]);
  expect(board.noLivingShips).toBeTruthy();
});

it("Check if it show that not every ship is sunk", () => {
  let ship = new MakeShip(2);
  let shipB = new MakeShip(3);
  board = new Gameboard(10);
  board.putShip(ship, [2, 2], [0, 1]);
  board.putShip(shipB, [4, 4], [0, 1]);
  board.receiveAttack([2, 2]);
  board.receiveAttack([2, 3]);
  expect(board.noLivingShips).toBeFalsy();
});

it("Check if we can put 2 ships that have a common coord", () => {
  let ship = new MakeShip(4);
  let shipB = new MakeShip(3);
  board = new Gameboard(10);
  board.putShip(ship, [3, 3], [1, 0]);
  board.putShip(shipB, [3, 0], [0, 1]);
  expect(board.shipList).toEqual([ship]);
});

it("Check if we can put 2 ships side to side", () => {
  let ship = new MakeShip(4);
  let shipB = new MakeShip(3);
  board = new Gameboard(10);
  board.putShip(ship, [3, 3], [0, 1]);
  board.putShip(shipB, [3, 2], [0, 1]);
  expect(board.shipList).toEqual([ship]);
});

it("Check if we can put 2 times the same ship", () => {
  let ship = new MakeShip(4);
  board = new Gameboard(10);
  board.putShip(ship, [3, 3], [0, 1]);
  board.putShip(ship, [6, 6], [0, 1]);
  expect(board.shipList).toEqual([ship]);
});
