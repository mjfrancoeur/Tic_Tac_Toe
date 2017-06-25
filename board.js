'use strict'

function createBlankBoard() {
  let result = [];
  for (let i = 0; i < 9; i++) {
    result.push(null);
  }
  return result;
}

function Board(cells) {
   this.cells = cells || createBlankBoard();
   this.display = createDisplayBoard(this.cells);
}

Board.prototype.updateBoard = function(index, val) {
  this.cells[index] = val;
  this.display = createDisplayBoard(this.cells);
};

Board.prototype.checkForWin = function(val) {

  let winningStr = val.repeat(3);
  // Check for horizontal win
  if (this.joinCharsByIndex(0, 1, 2) === winningStr ||
      this.joinCharsByIndex(3, 4, 5) === winningStr  ||
      this.joinCharsByIndex(6, 7, 8) === winningStr) {
    return true;
  }

  // Check for vertical win
  else if (this.joinCharsByIndex(0, 3, 6) === winningStr ||
      this.joinCharsByIndex(1, 4, 7) === winningStr  ||
      this.joinCharsByIndex(2, 5, 8) === winningStr) {
    return true;
  }

  // Check for diagonal win
  else if (this.joinCharsByIndex(0, 4, 8) === winningStr || this.joinCharsByIndex(2, 4, 6) === winningStr) {
    return true;
  }
};

Board.prototype.joinCharsByIndex = function(index1, index2, index3) {
  return this.cells[index1] + this.cells[index2] + this.cells[index3];
};

function createDisplayBoard(cells) {
  let display = [];
  cells.forEach( (el, i) => {
    display.push(`_${el || i}_`);
    if ((i + 1) % 3 === 0) {
      display.push('\n');
    } else {
      display.push('|');
    }
  });
  return display.join('');
}

module.exports = new Board();
