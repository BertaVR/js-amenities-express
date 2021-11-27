const { expect, beforeEach, describe, beforeAll } = require("@jest/globals");
const factory = require("../pack");
const store = require("../../store/store");

test("Pack properties if  no values given", () => {
  let pack = factory.pack.createPack();
  expect(pack.getName()).toBeNull();
  expect(pack.getItems()).toHaveLength(0);
  expect(pack.getStock()).toBe(0);
  expect(pack.getPrice()).toBe(null);

});

test("Stock optional parameter works as expected", () => {
  let pack = factory.pack.createPack(1);
  expect(pack.getStock()).toBe(1);
});

test("Is available returns true when theres is stock and false when there is not. (this.stock works as expected)", () => {
  // optional parameters
  let empty = factory.pack.createPack(0);
  let hasStock = factory.pack.createPack(1);
  expect(empty.isAvailable()).toEqual(false);
  expect(hasStock.isAvailable()).toEqual(true);
});

