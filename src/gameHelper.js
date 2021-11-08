import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { MakeShip } from "./ship";

export const Game = function (dimension) {
  this.currentPlayer;
  this.players;
  this.dimension = dimension;
  /*
   *  Initialize a game with 2 players.
   *  If IA true: the second player is an IA
   */
  this.initGame = (playerAName, playerBName, IA) => {
    let playWithIA = IA || false;
    const boardA = new Gameboard(this.dimension);
    const boardB = new Gameboard(this.dimension);
    const playerA = new Player(playerAName, boardA);
    const playerB = new Player(playerBName, boardB, playWithIA);
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

  /* Pick a random coord (x,y) in the board*/
  this.rdmCoord = () => {
    const x = Math.floor(Math.random() * this.dimension);
    const y = Math.floor(Math.random() * this.dimension);
    return [x, y];
  };

  /* Pick a rdm direction */
  this.chooseRdmDirection = () => {
    const rdnNbr = Math.random();
    if (rdnNbr < 0.25) {
      return [0, 1];
    } else if (rdnNbr < 0.5) {
      return [0, -1];
    } else if (rdnNbr < 0.75) {
      return [1, 0];
    } else {
      return [-1, 0];
    }
  };

  /* Add the ships rdmly to the current player board */
  this.addShipsRdmly = (ships) => {
    for (const nbrShips in ships) {
      if (Object.hasOwnProperty.call(ships, nbrShips)) {
        const size = ships[nbrShips];
        for (let i = 0; i < nbrShips; i++) {
          // Make a ship of the given size
          const newShip = new MakeShip(size);

          // Add the ship at the position
          let shipCoord;
          let shipDir;
          let shipIsOnTheBoard = false;
          while (!shipIsOnTheBoard) {
            // Choose rdm coord and direction
            shipCoord = this.rdmCoord();
            shipDir = this.chooseRdmDirection();
            // Try to pu the ship on the board
            shipIsOnTheBoard = this.currentPlayer.board.putShip(
              newShip,
              shipCoord,
              shipDir
            );
          }
        }
      }
    }
  };
};
