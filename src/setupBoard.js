import Gameboard from "./gameboard";

function setUpBoard(boards) {
    for(let i = 0; i < Gameboard.boardLength; i++) {
        for(let j = 0; j < Gameboard.boardLength; j++) {
            for(const board of boards) {
                const space = document.createElement("div");
                space.classList.add("space");
                space.classList.add("water");
                board.appendChild(space);
            }
        }
    }
}

export default setUpBoard;