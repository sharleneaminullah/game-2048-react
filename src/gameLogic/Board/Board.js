import Tile from '../Tile/Tile';
import {  
  generateRandomNumber, 
  generateTwoOrFour
} from '../helper';

/* Board generation steps: 
 * Step1: Generate tiles in combination of either "two 2s" OR "one 2 & one 4" OR "two 4s" = max 3 cases
 * Step2: After ‘x’ steps, the numbers in the board can be represented as 2n
 * Step3: In (x+1)th step, the followings happen. 
 *         (a) Slide the tile into an empty spot and no tiles combined with one another
 *         (b) Combined two or more existing tiles with one another (same number tiles)
 *         (c) A combination of cases a and b
 * Finally : At any point of time the board will only have numbers which can
 * be represented in the form of 2n.
 */

class Board {
  constructor() {
    this.tiles = [];
    this.cells = [];
    this.score = 0;
    this.boardSize = 4;
    this.probabilityOfTwo = 0.9;
    
    this.deltaX = [-1, 0, 1, 0];
    this.deltaY = [0, -1, 0, 1];

    this.generateBoard(this.boardSize);

    this.generateRandomTile(); 
    this.generateRandomTile();

    this.setPositions();
    this.won = false;
  }

  generateTile(args) {
    let tile = new Tile(args);
    this.tiles.push(tile);
    return tile;
  }

  generateBoard(boardSize) {
    let i = 0;
    while (i < boardSize) {
      this.cells[i] = [this.generateTile(), this.generateTile(), this.generateTile(), this.generateTile(),];
      i+=1;
    }
  }

  generateRandomTile() {
    let blankCells = [];
    let row = 0;

    this.generateRowAndColumn(row, blankCells, this.cells, this.boardSize);
    let index = generateRandomNumber(blankCells.length); 
    let cell = blankCells[index];
    let twoOrFour = generateTwoOrFour(this.probabilityOfTwo);
    let newTiles = this.generateTile(twoOrFour);

    this.cells[cell.newRow][cell.newColumn] = newTiles;
  }

  moveLeft() {
    let hasChanged = false;
    let row = 0;

    while ( row < this.boardSize) {
      let currentRow = this.cells[row].filter((tile) => tile.value !== 0);
      let resultRow = [];

      for (let target = 0; target < this.boardSize; target++) {
        let targetTile = currentRow.length ? currentRow.shift() : this.generateTile();

        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          let firstTile = targetTile;
          let secondTile = currentRow.shift(); 

          targetTile = this.generateTile(targetTile.value);
          firstTile.mergedInto = targetTile;
          
          secondTile.mergedInto = targetTile;
          targetTile.value += secondTile.value;
          this.score += firstTile.value + secondTile.value;
        }
        resultRow[target] = targetTile;
        this.won = this.won | targetTile.value === 2048;
        hasChanged = hasChanged | targetTile.value !== this.cells[row][target].value;
      }
      this.cells[row] = resultRow;
      row+=1;
    }
    return hasChanged;
  }

  setPositions() {
    this.cells.forEach((currentRow, currentRowIndex) => {
      currentRow.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = currentRowIndex;
        tile.column = columnIndex;
        tile.delete = false;
      });
    });
  }

generateRowAndColumn (row, blankCells, cells,  boardSize) {
  while (row < boardSize) {
    for (let column = 0; column < boardSize; column++) {
      if (cells[row][column].value === 0) {
        blankCells.push({ newRow: row, newColumn: column });
      }
    }
    row+=1;
  }
}

rotateLeft (cells) {
    let row = 0;
    let rows = cells.length;
    let columns = cells[0].length;
    let result = [];
 
    while (row < rows) {
      result.push([]);
  
      for (let column = 0; column < columns; ++column) {
        result[row][column] = cells[column][columns - row - 1];
      }
      row+=1;
    }
    
    return result;
  };  

  /* Directions are used with numbers as below 
   * up = 1, down = 3, right = 2, left = 0
  */
  moveBoard(direction) {
    this.removeOldTiles();
    let i = 0;
    let j = direction;
    let numberOfDirection = 4;

    while( i < direction) {
      this.cells = this.rotateLeft(this.cells);
      i+=1;
    }

    let hasChanged = this.moveLeft();

    while ( j < numberOfDirection) {
      this.cells = this.rotateLeft(this.cells);
      j+=1;
    }

    if (hasChanged) {this.generateRandomTile();}
    this.setPositions();
    return this;
  }

  removeOldTiles() {
    this.tiles = this.tiles.filter((tile) => tile.delete === false);
    
    this.tiles.forEach((tile) => {
      tile.delete = true;
    });
  }

  hasWon() {
    return this.won;
  }

  hasLost() {
    let canMove = false;
    let row = 0; 

    while (row < this.boardSize) {
      for (let column = 0; column < this.boardSize; ++column) {
        canMove = canMove | this.cells[row][column].value === 0;

        for (let i = 0; i < 4; i++) {
          let newRow = row + this.deltaX[i];
          let newColumn = column + this.deltaY[i];
          
          if (newRow < 0 || newRow >= this.boardSize || newColumn < 0 || newColumn >= this.boardSize) {
            continue;
          }
          canMove = canMove | this.cells[row][column].value === this.cells[newRow][newColumn].value;
        }
      }
      row+=1;
    }
    return !canMove;
  }
}

export { Board };
