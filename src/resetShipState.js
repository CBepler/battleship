function resetShipState() {
    let shipsP1 = document.querySelector(".pieces1");
    let shipsP2 = document.querySelector(".pieces2"); 
    shipsP1 = Array.prototype.slice.call(shipsP1.children);
    shipsP2 = Array.prototype.slice.call(shipsP2.children);
    for(let i = 0; i < shipsP1.length; i++) {
        shipsP1[i].classList.remove("gray");
        shipsP2[i].classList.remove("gray");
    }
}

export default resetShipState;