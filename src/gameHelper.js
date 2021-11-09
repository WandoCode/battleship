import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { MakeShip } from "./ship";
import {
  drawABoard,
  tagMissedCell,
  tagHitShip,
  displayResults,
  drawShipsOnBoard,
} from "./display";

export const Game = function (
  dimension,
  gameNode,
  boardIDplayerA,
  boardIDplayerB
) {
  this.currentPlayer;
  this.players;
  this.dimension = dimension;
  this.gameNode = gameNode;
  this.boardIDplayerA = boardIDplayerA;
  this.boardIDplayerB = boardIDplayerB;

  this.restartGame = (playerAName, playerBName, ships, IA) => {
    const boardANode = document.querySelector(`#${this.boardIDplayerA}`);
    const boardBNode = document.querySelector(`#${this.boardIDplayerB}`);
    boardANode.remove();
    boardBNode.remove();
    this.initGame(playerAName, playerBName, ships, IA);
  };

  /*
   *  Initialize a game with 2 players.
   *  If IA true: the second player is an IA
   */
  this.initGame = (playerAName, playerBName, ships, IA) => {
    let playWithIA = IA || false;
    const boardA = new Gameboard(this.dimension);
    const boardB = new Gameboard(this.dimension);
    const playerA = new Player(playerAName, boardB);
    const playerB = new Player(playerBName, boardA, playWithIA);
    this.players = [playerA, playerB];
    this.setFirstPlayer(1);

    // Draw the inital board foar both player
    drawABoard(
      this.dimension,
      this.gameNode,
      "game-board",
      this.boardIDplayerA
    );
    drawABoard(
      this.dimension,
      this.gameNode,
      "game-board",
      this.boardIDplayerB
    );
    // Initialize the playerA board
    this.addShipsRdmly(ships);

    // Change player to put his ships
    this.nextPlayer();

    // Initialize the playerB board
    this.addShipsRdmly(ships);
    drawShipsOnBoard(this.currentPlayer.enemyBoard, this.boardIDplayerA);

    // Change player: he is ready to play
    this.nextPlayer();

    // Listen to player
    this.listenBoard(this.gameNode);
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
    if (
      this.players[0].enemyBoard.noLivingShips ||
      this.players[1].enemyBoard.noLivingShips
    )
      return true;
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
          // Try to put the ship until it's done
          while (!shipIsOnTheBoard) {
            // Choose rdm coord and direction
            shipCoord = this.rdmCoord();
            shipDir = this.chooseRdmDirection();
            // Try to pu the ship on the board
            shipIsOnTheBoard = this.currentPlayer.enemyBoard.putShip(
              newShip,
              shipCoord,
              shipDir
            );
          }
        }
      }
    }
  };

  // Play a round at the given coord and draw the result on the given board
  this.playARound = (cellCoord, boardID, winnerNode) => {
    // Look if the shot hit a ship
    const hasHit = this.currentPlayer.play(cellCoord);
    if (hasHit) {
      // Look if the game is over
      if (this.checkGameOver()) {
        displayResults(
          this.currentPlayer.name,
          winnerNode,
          "winner",
          "winner-screen"
        );
      }
      // Update board display
      tagHitShip(cellCoord, boardID, "hit");
      tagMissedCell(
        this.currentPlayer.enemyBoard.firedPositions,
        boardID,
        "missed"
      );
    } else {
      // Update board display
      tagMissedCell(
        this.currentPlayer.enemyBoard.firedPositions,
        boardID,
        "missed"
      );
    }

    this.nextPlayer();
  };

  /* Listen the given boardNode to make action depending the cell clicked
   * The fct use the current player enemyBoard to look up for ships!!!
   */
  this.listenBoard = (winnerNode) => {
    document
      .querySelector(`#${this.boardIDplayerB}`)
      .addEventListener("click", (e) => {
        // If game is over, user can't play
        if (this.checkGameOver()) return;

        // Get the coord of the cell clicked
        const cellCoord = this.coordFromDataset(e.target.dataset.coord);

        // Look if this cell have been shot before
        if (!this.currentPlayer.enemyBoard.isNotAlreadyFired(cellCoord)) {
          return;
        }

        // Play on that cell
        this.playARound(cellCoord, this.boardIDplayerB, winnerNode);

        // Make IA play
        this.makeIAPlay(this.boardIDplayerA, winnerNode);
      });
  };

  // Determine Coord x,y from the dataset clicked
  this.coordFromDataset = (dataset) => {
    let dataArray = dataset.split("-");
    return [parseInt(dataArray[0]), parseInt(dataArray[1])];
  };

  // Make IA play
  this.makeIAPlay = (boardID, winnerNode) => {
    // If game is over, IA can't play
    if (this.checkGameOver()) return;
    const cellCoord = this.currentPlayer.IAChooseCoord();

    this.playARound(cellCoord, boardID, winnerNode);
  };
};
