import "./mycssNormalize.css"
import "./style.css"
import Player from "./player"

const player1 = new Player;
const player2 = new Player;

let boards = document.querySelectorAll(".board");

let board1 = boards[0];
let board2 = boards[1];
board2.classList.toggle("no-click");
board1.classList.toggle("no-click");

const single = document.querySelector(".single");
const versus = document.querySelector(".versus");
const donePlacing = document.querySelector(".place-button");

setUpBoard();

single.addEventListener("click", () => {
    for(const board of boards) {
        board.addEventListener("click", placeShipState);
    }
})

donePlacing.addEventListener("click", () => {
    for(const board of boards) {
        board.removeEventListener("click", placeShipState);
        board.addEventListener("click", playState);
    }
    board1.classList.toggle("no-click");
})

function playState(e) {
    let nextTurn = handleSpaceClick(e.target);
    renderBoard(e.currentTarget, e.currentTarget.classList.contains("player1") ? player1 : player2)
    if(nextTurn) {
        board1.classList.toggle("no-click");
        board2.classList.toggle("no-click");
    }
}


let previousClick = [];
function placeShipState(e) {
    if(previousClick.length == 0) {
        previousClick = getSpaceIndex(e.target);
        return;
    }
    const board = e.currentTarget;
    const endPos = getSpaceIndex(e.target);
    try {
        if(board.classList.contains("player1")) {
            player1.board.placeShip(previousClick, endPos);
        } else {
            player2.board.placeShip(previousClick, endPos);
        }
    } catch {

    }
    renderBoard(board, board.classList.contains("player1") ? player1 : player2);
    previousClick = [];
}

function setUpBoard() {
    for(let i = 0; i < player1.board.boardLength; i++) {
        for(let j = 0; j < player1.board.boardLength; j++) {
            for(const board of boards) {
                const space = document.createElement("div");
                space.classList.add("space");
                board.appendChild(space);
            }
        }
    }
}

function renderBoard(board, player) {
    let children = Array.prototype.slice.call(board.children);
    for(let i = 0; i < player.board.boardLength; i++) {
        for(let j = 0; j < player.board.boardLength; j++) {
            let color = "white";
            if(player.board.board[i][j] === 1) {
                color = "green";
            } else if(player.board.board[i][j] === 2) {
                color = "blue";
            } else if (player.board.board[i][j] === 3) {
                color = "red";
            }
            let index = i * player.board.boardLength + j
            children[index].style.backgroundColor = color;
        }
    }
}


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

function handleSpaceClick(space) {
    const player = getPlayer(space);
    const index = getSpaceIndex(space);
    if(player.board.board[index[0]][index[1]] === 0) {
        player.board.board[index[0]][index[1]] = 2;
        return true;
    } else if(player.board.board[index[0]][index[1]] === 1) {
        player.board.board[index[0]][index[1]] = 3;
    }
    return false;
}
