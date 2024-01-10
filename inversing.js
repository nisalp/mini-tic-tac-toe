let board = [];
let inversedBoard = [];

for (let i = 0; i < 3; i++) {
  board.push([1, 2, 3]);
  inversedBoard.push([" ", " ", " "])
}

printBoard();

function printBoard(){
 for(let i = 0; i<board.length; i++){
  for(let j = 0; j<board[i].length; j++){
   inversedBoard[j][i] = board[i][j];
  }
 }

 console.log(board);
 console.log(inversedBoard);
}


