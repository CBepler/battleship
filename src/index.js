import "./mycssNormalize.css"
import "./style.css"
import Player from "./player"
import renderBoard from "./renderBoard";
import setUpBoard from "./setupBoard";
import getSpaceIndex from "./getSpaceIndex";

const player1 = new Player;
const player2 = new Player;

let boards = document.querySelectorAll(".board");

const directions = document.querySelector(".directions");

let board1 = boards[0];
let board2 = boards[1];

const single = document.querySelector(".single");
const versus = document.querySelector(".versus");

const placeP1 = document.querySelector(".place-button-p1");
const placeP2 = document.querySelector(".place-button-p2");

setUpBoard(boards);

let turn = 0;
versus.addEventListener("click", () => {
    turn = 0;
    board1.addEventListener("click", placeShipState);
    board1.classList.remove("no-click");
    player1.board.resetBoard();
    player2.board.resetBoard();
    renderBoard(board1, player1, false);
    renderBoard(board2, player2, false);
    directions.textContent = "Player 1 place ships";
    placeP1.classList.remove("hide");
    placeP2.classList.add("hide");
})

placeP1.addEventListener("click", () => {
    if(!player1.board.validShipState()) {
        player1.board.resetBoard();
        renderBoard(board1, player1, false);
        directions.textContent = "Please place the proper ships. Player 1 place ships again";
        return;
    }
    board1.removeEventListener("click", placeShipState);
    board1.classList.add("no-click");
    board2.addEventListener("click", placeShipState);
    board2.classList.remove("no-click");
    directions.textContent = "Player 2 place ships";
    placeP1.classList.add("hide");
    placeP2.classList.remove("hide");
    renderBoard(board1, player1, true);

})

placeP2.addEventListener("click", () => {
    if(!player2.board.validShipState()) {
        player2.board.resetBoard();
        renderBoard(board2, player2, false);
        directions.textContent = "Please place the proper ships. Player 2 place ships again";
        return;
    }
    board2.removeEventListener("click", placeShipState);
    directions.textContent = "Pass computer to player 1 and press enter to play turn";
    placeP2.classList.add("hide");
    for(const board of boards) {
        board.addEventListener("click", setplayState);
    }
    renderBoard(board1, player1, true);
    renderBoard(board2, player2, true);
})

document.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        if(turn % 2 === 0) {
            renderBoard(board1, player1, false);
            return;
        }
        if(turn % 2 === 1) {
            renderBoard(board2, player2, false);
            return;
        }
    }
})

single.addEventListener("click", () => {
    turn = 0;
    board1.addEventListener("click", placeShipState);
    board1.classList.remove("no-click");
    player1.board.resetBoard();
    player2.board.resetBoard();
    renderBoard(board1, player1);
    renderBoard(board2, player2);
    directions.textContent = "Place Ships";
})

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
    renderBoard(board, board.classList.contains("player1") ? player1 : player2, false);
    previousClick = [];
}


function getPlayer(space) {
    if(space.parentElement.classList.contains("player1")) {
        return player1;
    }
    return player2;
}

function handleSpaceClick(space) {
    const player = getPlayer(space);
    const index = getSpaceIndex(space);
    let endAttack = player.board.recieveAttack(index);
    return endAttack;
}

function handleEndGame() {
    if(player1.board.allSunk()) {
        directions.textContent = "Player 2 Wins";
    }
    if(player2.board.allSunk()) {
        directions.textContent = "Player 1 Wins";
    }
    for(const board of boards) {
        board.removeEventListener("click", setplayState);
        board.classList.add("no-click");
    }
}

function setplayState(e) {
    let nextTurn = handleSpaceClick(e.target);
    renderBoard(e.currentTarget, e.currentTarget.classList.contains("player1") ? player1 : player2, true)
    if(player1.board.allSunk() || player2.board.allSunk()) {
        handleEndGame();
    }
    if(nextTurn) {
        renderBoard(board1, player1, true);
        renderBoard(board2, player2, true);
        board1.classList.toggle("no-click");
        board2.classList.toggle("no-click");
        turn++;
        directions.textContent = "Pass computer to player " + ((turn % 2) === 0 ? 1 : 2) + " and press enter to play turn";
    }
}