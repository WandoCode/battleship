import { MakeShip } from "../src/ship";

let shipA;
beforeEach(() => {
  return (shipA = new MakeShip(3));
});

test("Ship have a size of 3, is not sunk, and have no hit", () => {
  expect(shipA.size).toBe(3);
  expect(shipA.hitPos.length).toBe(0);
  expect(shipA.isSunk).toBeFalsy();
  expect(shipA.isSunk).toBeFalsy();
});

test("Ship hit in pos 1, hitPos = [1]", () => {
  shipA.hit(1);
  expect(shipA.hitPos).toEqual([1]);
  expect(shipA.isSunk).toBeFalsy();
});

test("Ship hit in pos = size, hitPos = []", () => {
  shipA.hit(3);
  expect(shipA.hitPos).toEqual([]);
  expect(shipA.isSunk).toBeFalsy();
});

test("Ship hit in pos = size - 1, hitPos = [2]", () => {
  shipA.hit(2);
  expect(shipA.hitPos).toEqual([2]);
  expect(shipA.isSunk).toBeFalsy();
});

test("Ship hit multiple time in pos 1, hitPos = [1]", () => {
  shipA.hit(1);
  shipA.hit(1);
  shipA.hit(1);
  expect(shipA.hitPos).toEqual([1]);
  expect(shipA.isSunk).toBeFalsy();
});

test("Hit multiple time at the same position only affect the ship once", () => {
  shipA.hit(1);
  shipA.hit(2);
  shipA.hit(1);
  shipA.hit(2);
  expect(shipA.hitPos).toEqual([1, 2]);
  expect(shipA.isSunk).toBeFalsy();
});

test("Ship hit in a position greater than his size don't change", () => {
  shipA.hit(5);
  shipA.hit(2);
  shipA.hit(3);
  shipA.hit(0);
  expect(shipA.hitPos).toEqual([2, 0]);
  expect(shipA.isSunk).toBeFalsy();
});

test("Ship hit in all his position sink", () => {
  shipA.hit(1);
  shipA.hit(0);
  shipA.hit(2);
  expect(shipA.isSunk).toBeTruthy();
});
