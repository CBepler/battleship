const shipsP1 = document.querySelector(".pieces1");
const shipsP2 = document.querySelector(".pieces2");

function renderShipState(player, board) {
    const children = Array.prototype.slice.call(board.parentElement.children);
    let ships = children[0] == board ? document.querySelector(".pieces1") : document.querySelector(".pieces2");
    let seen3 = false;
    for(const ship of player.board.ships) {
        if(ship.ship.isSunk()) {
            let c = ".s" + ship.ship.length;
            const sunkShips = ships.querySelectorAll(c);
            let index = 0;
            if(seen3 && ship.ship.length === 3) {
                index = 1;
            }
            sunkShips[index].classList.add("gray");
            if(ship.ship.length === 3) {
                seen3 = true;
            }
        }
    }
}

export default renderShipState;