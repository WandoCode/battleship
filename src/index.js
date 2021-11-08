import { drawABoard, drawShipsOnBoard, listenBoard } from "./display";
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

// Draw the inital board foar both player
drawABoard(BOARD_DIMENSION, body, "game-board", boardIDplayerA);
drawABoard(BOARD_DIMENSION, body, "game-board", boardIDplayerB);

// Initialize the playerA board
game.addShipsRdmly(SHIPS);
drawShipsOnBoard(game.currentPlayer.enemyBoard, boardIDplayerB);
//Listen the board of the other player as the player play on the other player board
listenBoard(boardIDplayerB, game.currentPlayer);

// Change player to put his ships
game.nextPlayer();

// Initialize the playerA board
game.addShipsRdmly(SHIPS);
drawShipsOnBoard(game.currentPlayer.enemyBoard, boardIDplayerA);

// Change player: he is ready to play
game.nextPlayer();

// Main loop
let playing = false;
while (playing) {
  playing = !game.checkGameOver();
}
