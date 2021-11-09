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
const game = new Game(BOARD_DIMENSION, body, boardIDplayerA, boardIDplayerB);
game.initGame("Max", "PC", SHIPS, true);
