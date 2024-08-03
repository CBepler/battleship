import Ship from "../src/ship";

let ship = new Ship(5);

test("Hit function increments", () => {
    const beforeHit = ship.timesHit;
    ship.hit();
    const afterHit = ship.timesHit;
    expect(afterHit).toBe(beforeHit + 1);
})

test("isSunk() indicates that a ship has not sunk", () => {
    ship.timesHit = 0;
    expect(ship.isSunk()).toBeFalsy();
})

test("isSunk() indicates that a ship has sunk", () => {
    ship.timesHit = ship.length;
    expect(ship.isSunk()).toBeTruthy();
})