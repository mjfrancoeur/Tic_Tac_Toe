const gameboard = require('./board.js');
const prompt = require('prompt-sync')();
const clear = require('clear');

function play() {
  clear();

  let gameWon = false;

  let board = gameboard;
  console.log(board.display);

  let numTurns = 1;
  while (!gameWon && numTurns < 10) {
    if (numTurns % 2) {
      gameWon = humansTurn(board, numTurns++);
    } else {
      console.log('Computer\'s turn.');
      gameWon = computersTurn(board, numTurns++);
    }
  }
  if (numTurns > 9 && !gameWon) {
    console.log('No more possible turns. That\'s a draw!');
  }
  console.log('Game over.');
}

// The human player's turn. Return true if the turn results in a win!
function humansTurn(board, numTurns) {
  let guess = null;

  do {
    guess = prompt('It\'s your turn! Enter a number (0 - 8) to pick a place or nothing to quit: ');
  } while (guess < 0 || guess > 8 || board.cells[guess]);
  board.updateBoard(guess, 'X');

  // Print board to console
  printStringToConsole(board.display);

  // Check to see if that was a winning move
  if (numTurns > 5) {
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
    guess = Math.ceil(Math.random() * (8));
  } while (board.cells[guess]);

  board.updateBoard(guess, 'O');

  printStringToConsole(board.display);

  if (numTurns > 4) {
    if (board.checkForWin('O')) {
      console.log('Oh boy. You lost... Don\'t shoot the messenger!');
      return true;
    }
    return false;
  }

}

function printStringToConsole(str) {
  // console.clear();
  clear();
  console.log(str);
}

play();
