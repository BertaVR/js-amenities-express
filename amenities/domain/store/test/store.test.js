const { expect } = require("@jest/globals");

const factory = require("../store");

test("Store name should be 'Tienda de Berta'", () => {
  let bertaStore = factory.singletonStore.getStore();
  expect(bertaStore.getNombre()).toEqual("Tienda de Berta");
});

test("Inventory should be empty when creating a store", () => {
  let emptyStore = factory.singletonStore.getStore();
  //sets
  expect(emptyStore.getInventario().size).toEqual(0);
});

test("Factory returns always the same store: singleton", () => {
  let firstStore = factory.singletonStore.getStore();
  let secondStore = factory.singletonStore.getStore();
  expect(firstStore).toEqual(secondStore);
});

