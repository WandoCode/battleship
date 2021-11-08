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

// Retrive the cell at the given position on the choosen board
const retreiveCell = function (pos, boardID) {
  const cells = document.querySelector(`#${boardID}`);
  return cells.querySelector(`[data-coord='${pos[0]}-${pos[1]}']`);
};

// Listen the given board to make action depending the cell clicked
export const listenBoard = (boardID, player) => {
  document.querySelector(`#${boardID}`).addEventListener("click", (e) => {
    const dataset = e.target.dataset.coord;
    const cellCoord = coordFromDataset(dataset);
    const missed = !player.play(cellCoord);
    if (missed) {
      console.log("missed");
    } else {
      console.log("hit");
    }
  });
};

// Determine Coord x,y from the dataset clicked
const coordFromDataset = (dataset) => {
  let dataArray = dataset.split("-");
  return [dataArray[0], dataArray[1]];
};
