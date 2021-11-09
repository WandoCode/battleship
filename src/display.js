export const drawABoard = function (dimension, parentNode, nodeClass, nodeID) {
  const tableBoard = document.createElement("table");
  parentNode.appendChild(tableBoard);
  const bodyBoard = document.createElement("tbody");
  tableBoard.appendChild(bodyBoard);

  for (let i = 0; i < dimension; i++) {
    const newRow = document.createElement("tr");
    bodyBoard.appendChild(newRow);
    for (let j = 0; j < dimension; j++) {
      const newTd = document.createElement("td");
      newRow.appendChild(newTd);
      const cellDiv = document.createElement("div");
      newTd.appendChild(cellDiv);
      cellDiv.setAttribute("data-coord", `${i}-${j}`);
    }
  }

  if (nodeID) {
    tableBoard.id = nodeID;
  }
  if (nodeClass) {
    tableBoard.classList.add(nodeClass);
  }

  return tableBoard;
};

// Draw ships on the given board
export const drawShipsOnBoard = function (gameboard, boardID) {
  for (let i = 0; i < gameboard.dimension; i++) {
    for (let j = 0; j < gameboard.dimension; j++) {
      if (gameboard.board[i][j] !== null) {
        retreiveCell([i, j], boardID).innerText = "x";
      }
    }
  }
};

// Add a class to all cell where a shot has been fired
export const tagMissedCell = (posList, boardID, classMissed) => {
  // Check eveery position in the list
  posList.forEach(pos => {
    const cellNode = retreiveCell(pos, boardID);
    // Add the classMissed to the node without that class
    if (!cellNode.classList.contains(classMissed)){
      cellNode.classList.add(classMissed);
    }
  }); 
}

// Add a class to cell where a ship has been hit
export const tagHitShip = (pos, boardID, classHit) => {
  
  const cellNode = retreiveCell(pos, boardID);
  // Add the classMissed to the node without that class
  if (!cellNode.classList.contains(classHit)){
    cellNode.classList.add(classHit);
  }
}

// Retrive the cell at the given position on the choosen board
const retreiveCell = function (pos, boardID) {
  const cells = document.querySelector(`#${boardID}`);
  return cells.querySelector(`[data-coord='${pos[0]}-${pos[1]}']`);
};


