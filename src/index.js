import { Game } from "./gameHelper";
import "./styles.css";

let BOARD_DIMENSION = 10;
let boardIDplayerA = "board-player-A";
let boardIDplayerB = "board-player-B";
let PLAYER_A_NAME = "Player";
let PLAYER_B_NAME = "IA";

// {n: t} = n ships of size t
let SHIPS = { 1: 4, 2: 3, 3: 2, 4: 1 };

let body = document.querySelector("body");

// Initialize game
const game = new Game(BOARD_DIMENSION, body, boardIDplayerA, boardIDplayerB);
game.initGame(PLAYER_A_NAME, PLAYER_B_NAME, SHIPS, true);

// Add a btn to restart a game
const btnRestart = document.createElement("button");
body.appendChild(btnRestart);
btnRestart.innerText = "New game";
btnRestart.onclick = () => {
  console.log("new game");
  game.restartGame(PLAYER_A_NAME, PLAYER_B_NAME, SHIPS, true);
};
