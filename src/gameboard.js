import Ship from "./ship";

const boardSize = 9;

class Gameboard {
    static boardLength = 10;
    constructor() { //0: empty      1: ship present     2: miss      3: hit
        this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
        this.ships = [];
    }

    resetBoard() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
        this.ships = [];
    }

    invalidPosition(startPos, endPos) {
        if (startPos[0] < 0 || startPos[0] > boardSize || startPos[1] < 0 || startPos[1] > boardSize
            || endPos[0] < 0 || endPos[0] > boardSize || endPos[1] < 0 || endPos[1] > boardSize
            || ((startPos[0] !== endPos[0]) && (startPos[1] !== endPos[1]))
        ) {
            return true;
        }

        const shiftIndex = startPos[0] === endPos[0] ? 1 : 0;
        const constPos = shiftIndex === 0 ? 1 : 0; 

        for(let i = startPos[shiftIndex]; i <= endPos[shiftIndex]; i++) {
            if((constPos === 0 && this.board[startPos[0]][i] !== 0) || (constPos === 1 && this.board[i][startPos[1]])) {
                return true;
            }
        }
        return false;
    }

    getShip(pos) {
        for(const ship of this.ships) {
            const shiftIndex = ship.start[0] === ship.end[0] ? 1 : 0;
            const constPos = shiftIndex === 0 ? 1 : 0;
            const lesser = ship.start[shiftIndex] > ship.end[shiftIndex] ? ship.end : ship.start;
            const greater = ship.start[shiftIndex] > ship.end[shiftIndex] ? ship.start : ship.end;
            if((ship.start[constPos] == pos[constPos]) && (pos[shiftIndex] >= lesser[shiftIndex] && pos[shiftIndex] <= greater[shiftIndex])) {
                return ship;
            }
        }
        return null;
    }

    placeShip(startPos, endPos) {
        if(this.invalidPosition(startPos, endPos)) {
            throw Error("Invalid positioning");
        }

        const shiftIndex = startPos[0] === endPos[0] ? 1 : 0;
        const constPos = shiftIndex === 0 ? 1 : 0; 
        const length = Math.abs(endPos[shiftIndex] - startPos[shiftIndex]) + 1;

        this.ships.push({
            ship: new Ship(length),
            start: startPos,
            end: endPos,
        })

        const lesser = startPos[shiftIndex] < endPos[shiftIndex] ? startPos : endPos;
        const greater = startPos[shiftIndex] > endPos[shiftIndex] ? startPos : endPos;

        for(let i = lesser[shiftIndex]; i <= greater[shiftIndex]; i++) {
            if(constPos === 0) {
                this.board[startPos[0]][i] = 1;
            } else {
                this.board[i][startPos[1]] = 1;
            }        
        }
    }

    recieveAttack(pos) {
        if(this.board[pos[0]][pos[1]] === 0) {
            this.board[pos[0]][pos[1]] = 2;
            return true;
        } else if (this.board[pos[0]][pos[1]] === 1) {
            this.board[pos[0]][pos[1]] = 3;
            this.getShip(pos).ship.hit();
        }
        return false;
    }

    validShipState() {
        let validLengths = [2, 3, 3, 4, 5];
        if(this.ships.length !== 5) {
            return false;
        }
        for(const ship of this.ships) {
            const length = ship.ship.length;
            const index = validLengths.indexOf(length);
            if(index === -1) {
                return false;
            }
            validLengths.splice(index, 1);
        }
        return validLengths.length === 0;
    }

    allSunk() {
        for(const ship of this.ships) {
            if(!ship.ship.isSunk()) {
                return false;
            }
        }
        return true;
    }


}

export default Gameboard;