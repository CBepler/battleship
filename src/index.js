import "./mycssNormalize.css"
import "./style.css"
import Player from "./player"

const player1 = new Player;
const player2 = new Player;

let boards = document.querySelectorAll(".board");

let board1 = boards[0];
let board2 = boards[1];
board2.classList.toggle("no-click");

function setUpBoard() {
    for(let i = 0; i < player1.board.boardLength; i++) {
        for(let j = 0; j < player1.board.boardLength; j++) {
            for(const board of boards) {
                const space = document.createElement("div");
                space.classList.add("space");
                space.addEventListener("click", (e) => {
                    let nextTurn = handleSpaceClick(e);
                    if(nextTurn) {
                        board1.classList.toggle("no-click");
                        board2.classList.toggle("no-click");
                    }
                });
                board.appendChild(space);
            }
        }
    }
}

setUpBoard();


function getPlayer(space) {
    if(space.parentElement.classList.contains("player1")) {
        return player1;
    }
    return player2;
}

function getSpaceIndex(space) {
    const children = Array.prototype.slice.call(space.parentElement.children);
    const index = children.indexOf(space);
    return [Math.floor(index / player1.board.boardLength), index % player1.board.boardLength];
}

function handleSpaceClick(e) {
    const space = e.target;
    const player = getPlayer(space);
    const index = getSpaceIndex(space);
    if(player.board.board[index[0]][index[1]] === 0) {
        player.board.board[index[0]][index[1]] = 2;
        space.style.backgroundColor = "blue";
        return true;
    } else if(player.board.board[index[0]][index[1]] === 1) {
        player.board.board[index[0]][index[1]] = 3;
        space.style.backgroundColor = "red";
    }
    return false;
}
