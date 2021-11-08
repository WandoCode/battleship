import { drawABoard, drawShipsOnBoard } from "./display";
import { Game } from "./gameHelper";
import "./styles.css";

let BOARD_DIMENSION = 10;
let boardIDplayerA = "board-player-A";
let boardIDplayerB = "board-player-B";
// {n: t} = n ships of size t
let SHIPS = { 1: 4, 2: 3, 3: 2, 4: 1 };

let body = document.querySelector("body");

// Initialize game
const game = new Game(BOARD_DIMENSION);
game.initGame("Max", "PC", true);

// Draw the inital board player A
drawABoard(BOARD_DIMENSION, body, "game-board", boardIDplayerA);
game.addShipsRdmly(SHIPS);
drawShipsOnBoard(game.currentPlayer.board, boardIDplayerA);

// Change player to put his ships
game.nextPlayer();

// Draw the inital board player B
drawABoard(BOARD_DIMENSION, body, "game-board", boardIDplayerB);
game.addShipsRdmly(SHIPS);
drawShipsOnBoard(game.currentPlayer.board, boardIDplayerB);

// Change player: he is ready to play
game.nextPlayer();

// Main loop
let playing = false;
while (playing) {
  playing = !game.checkGameOver();
}
