import Gameboard from "./gameboard";

function renderBoard(board, player, isEnemy) {
    let children = Array.prototype.slice.call(board.children);
    for(let i = 0; i < Gameboard.boardLength; i++) {
        for(let j = 0; j < Gameboard.boardLength; j++) {
            let color = "white";
            if(player.board.board[i][j] === 1 && !isEnemy) {
                color = "green";
            } else if(player.board.board[i][j] === 2) {
                color = "blue";
            } else if (player.board.board[i][j] === 3) {
                color = "red";
            }
            let index = i * Gameboard.boardLength + j
            children[index].style.backgroundColor = color;
        }
    }
}

export default renderBoard;