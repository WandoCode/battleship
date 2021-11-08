import { Gameboard, giveShipCoordinates } from "./gameboard";
import { MakeShip } from "./ship";

let ship = new MakeShip(4);
let board = new Gameboard(3);

board.putShip(ship, [2, 2], [0, 1]);
