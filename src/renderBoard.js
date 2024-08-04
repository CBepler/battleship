import Gameboard from "./gameboard";

function renderBoard(board, player, isEnemy) {
    let children = Array.prototype.slice.call(board.children);
    for(let i = 0; i < Gameboard.boardLength; i++) {
        for(let j = 0; j < Gameboard.boardLength; j++) {
            let colorClass = "water";
            if(player.board.board[i][j] === 1 && !isEnemy) {
                colorClass = "green";
            } else if(player.board.board[i][j] === 2) {
                colorClass = "white";
            } else if (player.board.board[i][j] === 3) {
                colorClass = "red";
            }
            let index = i * Gameboard.boardLength + j;
            children[index].className = `space ${colorClass}`;
        }
    }
}

export default renderBoard;