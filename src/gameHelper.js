import { Gameboard } from "./gameboard";
import { Player } from "./player";

export const Game = function () {
  this.currentPlayer;
  this.players;

  /*
   *  Initialize a game with 2 players.
   *  If IA true: the second player is an IA
   */
  this.initGame = (playerAName, playerBName, dimension, IA) => {
    let playWithIA = IA || false;
    this.boardA = new Gameboard(dimension);
    this.boardB = new Gameboard(dimension);
    const playerA = new Player(playerAName, this.boardB);
    const playerB = new Player(playerBName, this.boardA, playWithIA);
    this.players = [playerA, playerB];
    this.setFirstPlayer(1);
  };

  /* 
    Choose which player is playing. 
    n = 1 or 2 
    */
  this.setFirstPlayer = (n) => {
    if (n === 1) {
      this.currentPlayer = this.players[0];
    }
    if (n === 2) {
      this.currentPlayer = this.players[1];
    }
  };

  /* Change the playing player */
  this.nextPlayer = () => {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else if (this.currentPlayer === this.players[1]) {
      this.currentPlayer = this.players[0];
    }
  };

  /* Return if the game is done */
  this.checkGameOver = () => {
    if (this.boardA.noLivingShips || this.boardA.noLivingShips) return true;
    return false;
  };
};
