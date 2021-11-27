const { expect } = require("@jest/globals");

const factory = require("../store");

test("Store name should be 'Tienda de Berta'", () => {
  let bertaStore = factory.singletonStore.getStore();
  expect(bertaStore.name).toEqual("Tienda de Berta");
});

test("Inventory should be empty when creating a store", () => {
  let emptyStore = factory.singletonStore.getStore();
  //sets
  expect(emptyStore.getInventory().size).toEqual(0);
});

test("Factory returns always the same store: singleton", () => {
  let firstStore = factory.singletonStore.getStore();
  let secondStore = factory.singletonStore.getStore();
  expect(firstStore).toEqual(secondStore);
});

/* test("Sellable can be added to inventory only once", () => {
  let store = factory.singletonStore.getStore();
  store.add("test");
  expect(store.inventory.size).toEqual(1);
  store.add("test");
  expect(store.inventory.size).toEqual(1);

});*/
 

/*
test("Adding packs", () => {
  let newStore = factory.singletonStore.getStore();

  let packs = [
    {
      name: "Pack1",
      stock: 7,
      items: [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      price: 50,
    },
    {
      name: "Pack2",
      stock: 70,
      items: [{ name: "item7" }, { name: "item2" }, { name: "item3" }],
      price: 50,
    },
    {
      name: "Pack1",
      stock: 0,
      items: [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      price: 50,
    },
  ];

  newStore.addPacks(packs);
  con

  expect(newStore.getInventory().size).toEqual(2);
});
*/