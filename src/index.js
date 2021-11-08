import { Gameboard } from "./gameboard";
import { MakeShip } from "./ship";
import { Player } from "./player";
import Game from "./gameHelper";

let BOARD_DIMENSION = 10;

// Initialize game
const game = new Game();
game.initGame("Max", "PC", BOARD_DIMENSION, true);

let playing = false;
let currentPlayer = 0;
while (playing) {
  playing = game.checkGameOver();
}
