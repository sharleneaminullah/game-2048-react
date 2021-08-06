export default class Tile {
    constructor(value, row, column) {
      this.value = value || 0;
      this.row = row || -1;
      this.column = column || -1;
      this.oldRow = -1;
      this.oldColumn = -1;
      this.delete = false;
      this.mergedInto = null;
    }
  
    moveTo(newRow, newCol) {
      this.oldRow = this.row;
      this.oldColumn = this.column;
      this.row = newRow;
      this.column = newCol;
    }
  
    isNew() {
      return this.oldRow < 0 && !this.mergedInto;
    }

    fromRow() {
      return this.mergedInto ? this.row : this.oldRow;
    }
  
    toRow() {
        return this.mergedInto ? this.mergedInto.row : this.row;
    } 
    
    fromColumn() {
      return this.mergedInto ? this.column : this.oldColumn;
    }

    toColumn() {
      return this.mergedInto ? this.mergedInto.column : this.column;
    }
  
    hasMoved() {
      return (
        (this.fromRow() >= 0 &&
          (this.fromRow() !== this.toRow() ||
            this.fromColumn() !== this.toColumn())) || this.mergedInto
      );
    }
  } 

