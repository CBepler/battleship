import Gameboard from "./gameboard";

function getSpaceIndex(space) {
    const children = Array.prototype.slice.call(space.parentElement.children);
    const index = children.indexOf(space);
    return [Math.floor(index / Gameboard.boardLength), index % Gameboard.boardLength];
}

export default getSpaceIndex;