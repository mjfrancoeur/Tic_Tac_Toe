const gameboard = require('./board.js');
const prompt = require('prompt-sync')();

function play() {
  clear();

  let gameWon = false;

  let board = gameboard;
  printStringToConsole(board.display);

  // console.log('Welcome to tic-tac-toe. You\'re the \'X\' and the computer is the \'O\'. If you wish to quit while playing, you can enter an empty string as your guess.');
  let numTurns = 1;
  while (!gameWon && numTurns < 10) {
    if (numTurns % 2) {
      gameWon = humansTurn(board, numTurns++);
    } else {
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

  for (let i = 0; guess === null || guess < 0 || guess > 8 || board.cells[guess]; i++) {
    if (i === 0) {
      guess = prompt('It\'s your turn! Enter a number (0 - 8) to pick a place or an empty string to quit: ');
    } else {

      if (board.cells[guess]) {
        guess = prompt('That space is already filled, try another: ');
      } else if (guess < 0 || guess > 8) {
        guess = prompt('That was an invalid guess, try a number between 0 and 8: ');
      }
    }

    if (guess === '') {
      console.log('You\'ve decided to forfeit.');
      return true;
    }

  }

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

// Simulates the computer's turn
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

// Prints the board string to console
function printStringToConsole(str) {
  clear();
  console.log('TIC-TAC-TOE\n');
  console.log(str);
}

// Clears the terminal console
function clear() {
  process.stdout.write('\033[2J');
  process.stdout.write('\033[0f');
}

play();
