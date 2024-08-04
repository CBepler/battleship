function getRandomPos(length, player) {
    let pos;
    do {
        pos = [[], []];
        const constIndex = Math.floor(Math.random() * 2);
        const shiftIndex = constIndex === 0 ? 1 : 0;
        pos[0][constIndex] = Math.floor(Math.random() * 10);
        pos[1][constIndex] = pos[0][constIndex];
        pos[0][shiftIndex] = Math.floor(Math.random() * 10);
        let plusMinus = Math.floor(Math.random() * 2);
        pos[1][shiftIndex] = plusMinus === 0 ? pos[0][shiftIndex] + length - 1 : pos[0][shiftIndex] - length + 1;
    } while(player.board.invalidPosition(pos[0], pos[1]));
    return pos;
}

function placeRandomShips(player) {
    const ships = [5, 4, 3, 3, 2];
    for(const length of ships) {
        const pos = getRandomPos(length, player);
        player.board.placeShip(pos[0], pos[1]);
    }
}

export default placeRandomShips;