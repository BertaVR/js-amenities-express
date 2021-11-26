const { expect } = require("@jest/globals");
const factory = require("../pack");

test("Pack properties if  no values given", () => {
  let pack = factory.singletonPack.createPack();
  expect(pack.name).toBeNull();
  expect(pack.items).toHaveLength(0);
  expect(pack.stock).toBe(0);
});

test("Stock optional parameter works as expected", () => {
  let pack = factory.singletonPack.createPack(1);
  expect(pack.stock).toBe(1);
});

test("Is available returns true when theres is stock and false when there is not. (this.stock works as expected)", () => {
  // optional parameters
  let empty = factory.singletonPack.createPack(0);
  let hasStock = factory.singletonPack.createPack(1);
  expect(empty.isAvailable()).toEqual(false);
  expect(hasStock.isAvailable()).toEqual(true);
});

test("Packs can be added if they have stock", () => {
  //integration test
  let empty = factory.singletonPack.createPack(0);
  let hasStock = factory.singletonPack.createPack(1);
  expect(empty.addPackToBertaStore().inventory).not.toContain(empty);
  expect(hasStock.addPackToBertaStore().inventory).toContain(hasStock);
});

test("The same pack can't be added twice", () => {
  //integration test
  let stock = factory.singletonPack.createPack(1);
  stock.addPackToBertaStore();
  stock.addPackToBertaStore();
  expect(stock.addPackToBertaStore().inventory.size).toBe(1);
});
