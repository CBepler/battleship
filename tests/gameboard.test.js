import Gameboard from "../src/gameboard";

let board = new Gameboard;

test("Place ship on the board normally", () => {
    let startPos = [0, 0];
    let endPos = [0, 4];
    board.placeShip(startPos, endPos);
    const shiftIndex = startPos[0] === endPos[0] ? 1 : 0;
    const constPos = shiftIndex === 0 ? 1 : 0; 
    for(let i = startPos[shiftIndex]; i <= endPos[shiftIndex]; i++) {
        if(constPos === 0) {
            expect(board.board[startPos[0]][i]).toBe(1);
        } else {
            expect(board.board[i][startPos[0]]).toBe(1);
        }
    }
})

test("Place ship where other ship is", () => {
    let startPos = [0, 0];
    let endPos = [0, 4];
    expect(() => {board.placeShip(startPos, endPos)}).toThrow();
})

test("Place ship diagonally", () => {
    let startPos = [0, 0];
    let endPos = [4, 4];
    expect(() => {board.placeShip(startPos, endPos)}).toThrow();
})

test("Place ship out of bounds low", () => {
    let startPos = [-1, 0];
    let endPos = [3, 0];
    expect(() => {board.placeShip(startPos, endPos)}).toThrow();
})

test("Place ship out of bounds high", () => {
    let startPos = [0, 0];
    let endPos = [10, 0];
    expect(() => {board.placeShip(startPos, endPos)}).toThrow();
})

test("Attack empty position", () => {
    const attack = [9, 9];
    board.recieveAttack(attack);
    expect(board.board[attack[0]][attack[1]]).toBe(2);
})

test("Attack ship position", () => {
    const attack = [0, 0];
    const hitsBefore = board.getShip(attack).ship.timesHit;
    board.recieveAttack(attack);
    const hitsAfter = board.getShip(attack).ship.timesHit;
    expect(board.board[attack[0]][attack[1]]).toBe(3);
    expect(hitsAfter).toBe(hitsBefore + 1);
})

test("All ships NOT sunk", () => {
    expect(board.allSunk()).toBeFalsy();
})

test("All ships sunk", () => {
    board.recieveAttack([0, 1]);
    board.recieveAttack([0, 2]);
    board.recieveAttack([0, 3]);
    board.recieveAttack([0, 4]);
    expect(board.allSunk()).toBeTruthy();
})