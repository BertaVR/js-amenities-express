const { expect } = require("@jest/globals");

const factory = require("../store");

test("Box name should be Tienda de Berta", () => {
  let bertaStore = factory.singletonStore.getStore();
  expect(bertaStore.name).toEqual("Tienda de Berta");
});

test("Stock should be empty when creating a store", () => {
  let emptyStore = factory.singletonStore.getStore();
  expect(emptyStore.inventory).toHaveLength(0);
});

test("Factory returns always the same store: singleton", () => {
  let firstStore = factory.singletonStore.getStore();
  let secondStore = factory.singletonStore.getStore();
  expect(firstStore).toEqual(secondStore);
});
