const gameboard = require('./board.js');

function play() {
  let gameWon = false;

  let board = new Board();
  console.log(board.display);

  let numTurns = 0;
  while (!gameWon && numTurns < 9) {
    if (numTurns % 2) {
      gameWon = humansTurn(board, numTurns++)
    } else {
      gameWon = computersTurn(board, numTurns++);
    }
  }

  
}

// The human player's turn. Return true if the turn results in a win!
function humansTurn(board, numTurns) {
  let guess = null;

  do {
    guess = readLine('It\'s your turn! Enter a number (0 - 8) to pick a place: ');
  } while (guess < 0 || guess > 8 || typeof guess !== 'number' || !board.cells[guess]);
  board.updateBoard(guess, 'X');
  // Print board to console
  printStringToConsole(board.display);
  
  // Check to see if that was a winning move
  if (numTurns > 4) {
    if(board.checkForWin('X')) {
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

