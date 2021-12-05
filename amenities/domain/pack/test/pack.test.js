const factory = require("../pack");
const store = require("../../store/store");

test("Pack properties if  no values given", () => {
  let pack = factory.makePack.createPack();
  expect(pack.getItems()).toHaveLength(0);
  expect(pack.getStock()).toBe(0);
});

test("Stock optional parameter works as expected", () => {
  let pack = factory.makePack.createPack(1);
  expect(pack.getStock()).toBe(1);
});

test("Is available returns true when theres is stock and false when there is not. (this.stock works as expected)", () => {
  // optional parameters
  let empty = factory.makePack.createPack(0);
  let hasStock = factory.makePack.createPack(1);
  expect(empty.isAvailable()).toEqual(false);
  expect(hasStock.isAvailable()).toEqual(true);
});
