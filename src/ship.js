export const MakeShip = function (size) {
  /* Create a ship.
   *
   * @size {number} : > 0
   */
  this.size = size;
  this.isSunk = false;
  // Create an array to put position hit (from 0 to size - 1)
  this.hitPos = [];

  this.sunk = () => {
    this.isSunk = this.hitPos.length === this.size;
  };

  this.hit = (pos) => {
    /* Modify this.hitPos when hit
     *
     * @pos {number}: >=0 ship's position where it's hit
     */

    // Avoid multiple hit at the same position and wrong position
    if (!this.hitPos.includes(pos) && pos < this.size) {
      this.hitPos.push(pos);
      // Look if the hit make the ship sink
      this.sunk();
    }
  };
};
