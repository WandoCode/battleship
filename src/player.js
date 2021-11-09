export const Player = function (name, enemyBoard, IA) {
  /* A player that can fired on the ennemy enemyBoard. 
    IA=true to make a player with automatic play choice */

  this.name = name;
  this.enemyBoard = enemyBoard;
  this.IA = IA || false;

  this.play = (pos) => {
    /* Make a shot and return true if it touched smthg */

    // Make the shot
    const hitSmthg = this.enemyBoard.receiveAttack(pos);

    return hitSmthg;
  };

  this.IAChooseCoord = () => {
    // For IA: choose pos randomly
    let pos = [];
    let playing = true;
    while (playing) {
      pos = this.rdmCoord();
      if (enemyBoard.isNotAlreadyFired(pos)) playing = false;
    }
    return pos;
  };

  this.rdmCoord = () => {
    /* Pick a random coord (x,y) in the enemy enemyBoard */
    const x = Math.floor(Math.random() * this.enemyBoard.dimension);
    const y = Math.floor(Math.random() * this.enemyBoard.dimension);
    return [x, y];
  };
};
