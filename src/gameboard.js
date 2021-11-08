/* Matrice where the game is set
 * @dimension {number}: > 1 the board is a (dimension x dimension) matrice
 */
export const Gameboard = function (dimension) {
  this.dimension = dimension;

  // Matrice representing the board. Filled by 0
  this.board = makeABoard(dimension);

  // Save coordinate already fired
  this.firedPositions = [];

  // List of ships on the board
  this.shipList = [];

  // True when all ships are sunk
  this.noLivingShips = false;

  /* Put a ship inside the matrice starting from
   * the stratPos toward the given direction.
   * Each position in the matrice have the structure {ship: n}
   * where n is the n-th portion of the ship
   * @direction {(y,x)}: x, y = 1, 0 or -1
   */
  this.putShip = (ship, startPos, direction) => {
    // Check if ship is alreay on the board
    if (this.shipList.includes(ship)) return;

    let shipCoordinates = giveShipCoordinates(startPos, direction, ship.size);
    if (this.shipFit(shipCoordinates)) {
      this.addShipToMatrice(ship, shipCoordinates);
      this.shipList.push(ship);
    }
  };

  /* At each coord of the matrice, add {ship: ship, portion: n}
    where n is the portion of the ship at that place */
  this.addShipToMatrice = (ship, shipCoordinates) => {
    for (let i = 0; i < shipCoordinates.length; i++) {
      const pos = shipCoordinates[i];

      this.board[pos[0]][pos[1]] = { ship: ship, portion: i };
    }
  };

  /* pos is a coord of a hit ship. Fill fired matrice in diagonal around that pos as fired */
  this.fillFiredPositionsAroundHit = (pos) => {
    for (let i = -1; i < 2; i++) {
      if (i === 0) continue;
      for (let j = -1; j < 2; j++) {
        if (j === 0) continue;
        const x = pos[0] + i;
        const y = pos[1] + j;

        // Check if shot is in the board and not already fired
        if (!coordIsInMatrice([x, y], this.dimension)) continue;
        if (this.isNotAlreadyFired([x, y])) {
          this.firedPositions.push([x, y]);
        }
      }
    }
  };

  /* Check if the given coord fit in the matrice */
  this.shipFit = (shipCoordinates) => {
    let itsOkay = true;
    shipCoordinates.forEach((pos) => {
      // Check if the shit will be outside the board
      if (!coordIsInMatrice(pos, this.dimension)) {
        itsOkay = false;
      }
    });

    /* Check if no other ships are directly next to a coord */
    shipCoordinates.forEach((pos) => {
      const x = pos[0];
      const y = pos[1];

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // Can't look outside the matrice
          if (!coordIsInMatrice([x + i, y + j], this.dimension)) {
            continue;
          }

          // Look around the position and at the position of the future ship
          if (this.board[x + i][y + j] !== null) {
            itsOkay = false;
            return;
          }
        }
      }
    });
    return itsOkay;
  };

  /* Return true if the shot hit a ship, otherwise false */
  this.receiveAttack = (pos) => {
    // mark that position as fired if it's the 1st time
    if (this.isNotAlreadyFired(pos)) {
      this.firedPositions.push(pos);
    }

    // Check if a ship is here and hit it
    if (this.board[pos[0]][pos[1]] !== null) {
      const ship = this.board[pos[0]][pos[1]].ship;
      const portion = this.board[pos[0]][pos[1]].portion;

      ship.hit(portion);
      this.fillFiredPositionsAroundHit(pos);
      this.noLivingShips = this.allShipSunk();

      return true;
    }
    return false;
  };

  /* Check if the position has not been fired before */
  this.isNotAlreadyFired = (pos) => {
    return this.firedPositions.every((hitPos) => {
      return hitPos[0] !== pos[0] || hitPos[1] !== pos[1];
    });
  };

  /* check if all sips on the board have been sunk */
  this.allShipSunk = () => {
    let allShipsAreSunk = true;
    this.shipList.forEach((ship) => {
      if (!ship.isSunk) {
        allShipsAreSunk = false;
        return;
      }
    });
    return allShipsAreSunk;
  };
};

/* Deduce all the martice coordinate from a starting positio,
a direction and a length */
export const giveShipCoordinates = (startPos, direction, shipSize) => {
  let coord = [];

  for (let i = 0; i < shipSize; i++) {
    coord.push([
      startPos[0] + i * direction[0],
      startPos[1] + i * direction[1],
    ]);
  }
  return coord;
};

export const makeABoard = (n) => {
  /* Create a matrice nxn filled with 0 */

  let matrice = [];
  for (let i = 0; i < n; i++) {
    matrice[i] = [];
    for (let j = 0; j < n; j++) {
      matrice[i][j] = null;
    }
  }

  return matrice;
};

const coordIsInMatrice = (pos, dimension) => {
  const x = pos[0];
  const y = pos[1];
  if (x < 0 || x >= dimension || y < 0 || y >= dimension) {
    return false;
  }
  return true;
};
