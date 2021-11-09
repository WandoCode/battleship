import { drawABoard, drawShipsOnBoard } from "./display";
import { Game } from "./gameHelper";
import "./styles.css";

let BOARD_DIMENSION = 5;
let boardIDplayerA = "board-player-A";
let boardIDplayerB = "board-player-B";
// {n: t} = n ships of size t
let SHIPS = { 1: 4, 2: 1 };

let body = document.querySelector("body");

// Initialize game
const game = new Game(BOARD_DIMENSION);
game.initGame("Max", "PC", true);

// Draw the inital board foar both player
drawABoard(BOARD_DIMENSION, body, "game-board", boardIDplayerA);
drawABoard(BOARD_DIMENSION, body, "game-board", boardIDplayerB);

// Initialize the playerA board
game.addShipsRdmly(SHIPS);

//Listen the board of the other player as the player play on the other player board

// Change player to put his ships
game.nextPlayer();

// Initialize the playerB board
game.addShipsRdmly(SHIPS);
drawShipsOnBoard(game.currentPlayer.enemyBoard, boardIDplayerA);

// Change player: he is ready to play
game.nextPlayer();

game.listenBoard(boardIDplayerA, boardIDplayerB, body);
