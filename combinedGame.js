'use strict'

const prompt = require('prompt-sync')();

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
  if (this.cells.join('').indexOf(winningStr) !== -1) {
    return true;
  }

  // Check for vertical win
  else if (this.joinCharsByIndex(0, 3, 6) === winningStr ||
      this.joinCharsByIndex(1, 4, 7) === winningStr  ||
      this.joinCharsByIndex(2, 5, 8) === winningStr) {
    return true;
  }

  // Check for diagonal win
  else if (this.joinCharsByIndex(0, 4, 8) || this.joinCharsByIndex(2, 4, 6)) {
    return true;
  }
};

Board.prototype.joinCharsByIndex = function(index1, index2, index3) {
  return this.cells[index1] + this.cells[index2] + this.cells[index3];
};


function createDisplayBoard(cells) {
  let display = [];
  cells.forEach( (el, i) => {
    if (el) {
      display.push(`_${el}_`);
    } else {
      display.push('___');
    }
    if ((i + 1) % 3 === 0) {
      display.push('\n');
    } else {
      display.push('|');
    }
  });
  return display.join('');
}

// Game playing logic

// const gameboard = require('./board.js');

function play() {
  let gameWon = false;

  let board = new Board();
  console.log(board.display);

  let numTurns = 0;
  while (!gameWon && numTurns < 9) {
    if (numTurns % 2) {
      gameWon = humansTurn(board, numTurns++);
    } else {
      gameWon = computersTurn(board, numTurns++);
    }
  }
}

// The human player's turn. Return true if the turn results in a win!
function humansTurn(board, numTurns) {
  let guess = null;

  do {
    guess = prompt('It\'s your turn! Enter a number (0 - 8) to pick a place: ');
  } while (guess < 0 || guess > 8 || typeof guess !== 'number' || !board.cells[guess]);
  board.updateBoard(guess, 'X');
  // Print board to console
  printStringToConsole(board.display);

  // Check to see if that was a winning move
  if (numTurns > 4) {
    if (board.checkForWin('X')) {
      console.log('Congratulations! You won! But what is a win, really?');
      return true;
    }
    return false;
  }
}

function computersTurn(board, numTurns) {
  let guess = null;

  do {
    guess = Math.random() * (8);
  } while (!board.cells[guess]);

  board.updateBoard(guess, 'O');

  printStringToConsole(board.display);

  if (numTurns > 4) {
    if (board.checkForWin('O')) {
      console.log('Oh boy. You lost... don\'t shoot the messenger.');
      return true;
    }
    return false;
  }

}

function printStringToConsole(str) {
  console.clear();
  console.log(str);
}

// Call the function

play();
