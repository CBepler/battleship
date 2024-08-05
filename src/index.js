import "./mycssNormalize.css"
import "./style.css"
import Player from "./player"
import renderBoard from "./renderBoard";
import setUpBoard from "./setupBoard";
import getSpaceIndex from "./getSpaceIndex";
import placeRandomShips from "./placeShipRandom";
import Gameboard from "./gameboard";
import renderShipState from "./renderShipState";
import resetShipState from "./resetShipState";

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
const placeSingle = document.querySelector(".place-button-single");

let singlePlayer = false;

setUpBoard(boards);

let turn = 0;
versus.addEventListener("click", () => {
    hitSpaces = [];
    previousClick = []
    singlePlayer = false;
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
    placeSingle.classList.add("hide");
    resetShipState();
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

placeSingle.addEventListener("click", () => {
    if(!player1.board.validShipState()) {
        player1.board.resetBoard();
        renderBoard(board1, player1, false);
        directions.textContent = "Please place the proper ships. Player 1 place ships again";
        return;
    }
    board1.removeEventListener("click", placeShipState);
    placeRandomShips(player2);
    placeSingle.classList.add("hide");
    for(const board of boards) {
        board.addEventListener("click", setplayState);
    }
    board1.classList.add("no-click");
    board2.classList.remove("no-click");
    renderBoard(board1, player1, false);
    renderBoard(board2, player2, true);
    directions.textContent = "Play Game";
})

single.addEventListener("click", () => {
    hitSpaces = [];
    previousClick = []
    singlePlayer = true;
    placeP1.classList.add("hide");
    placeP2.classList.add("hide");
    turn = 0;
    board1.addEventListener("click", placeShipState);
    board1.classList.remove("no-click");
    player1.board.resetBoard();
    player2.board.resetBoard();
    renderBoard(board1, player1, false);
    renderBoard(board2, player2, false);
    directions.textContent = "Player 1 place ships";
    placeSingle.classList.remove("hide");
    resetShipState();
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

let hitSpaces = [];
function doComputerTurn() {
    let pos;
    while(true) {
        while(hitSpaces.length !== 0) {
            const current = hitSpaces[hitSpaces.length - 1];
            if(player1.board.isValidAttack([current[0] - 1, current[1]])) {
                pos = [...current];
                pos[0]--;
                break;
            }
            if(player1.board.isValidAttack([current[0] + 1, current[1]])) {
                pos = [...current];
                pos[0]++;
                break;
            }
            if(player1.board.isValidAttack([current[0], current[1] - 1])) {
                pos = [...current];
                pos[1]--;
                break;
            }
            if(player1.board.isValidAttack([current[0], current[1] + 1])) {
                pos = [...current];
                pos[1]++;
                break;
            }
            hitSpaces.pop();
        }
        if(hitSpaces.length === 0) {
            const index = Math.floor(Math.random() * (Gameboard.boardLength * Gameboard.boardLength));
            pos = [Math.floor(index / Gameboard.boardLength), index % Gameboard.boardLength];
        }
        while(player1.board.board[pos[0]][pos[1]] !== 0 && player1.board.board[pos[0]][pos[1]] !== 1) {
            pos[1]++
            if(pos[1] > 9) {
                pos[1] = 0;
                pos[0]++;
                if(pos[0] > 9) {
                    pos[0] = 0;
                }
            }
        }
        player1.board.recieveAttack(pos);
        if(player1.board.allSunk()) {
            handleEndGame();
        }
        if(player1.board.board[pos[0]][pos[1]] !== 3) {
            break;
        }
        hitSpaces.push(pos);
    }
}

function setplayState(e) {
    let nextTurn = handleSpaceClick(e.target);
    renderBoard(e.currentTarget, e.currentTarget.classList.contains("player1") ? player1 : player2, true)
    if(player1.board.allSunk() || player2.board.allSunk()) {
        handleEndGame();
    }
    renderShipState(e.currentTarget.classList.contains("player1") ? player1 : player2, e.currentTarget);
    if(nextTurn) {
        if(!singlePlayer) {
            renderBoard(board1, player1, true);
            renderBoard(board2, player2, true);
            board1.classList.toggle("no-click");
            board2.classList.toggle("no-click");
        }
        turn++;
        if(singlePlayer && turn % 2 === 1) {
            doComputerTurn();
            turn++
            renderShipState(player1, board1);
            renderBoard(board1, player1, false);
            return;
        }
        directions.textContent = "Pass computer to player " + ((turn % 2) === 0 ? 1 : 2) + " and press enter to play turn";
    }
}