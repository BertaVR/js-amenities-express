const { expect, beforeAll, beforeEach } = require("@jest/globals");

const packMaker = require("../../pack");

const man = require("../storeManager");

const myStoreManager = man.StoreManager.getManager();
const myStore = myStoreManager.getStore();

  function testPacks() {
    testPacks = [packMaker.makePack.createPack(7, "Pack1", [{ name: "item1" }, { name: "item2" }, { name: "item3" }], 50), 
    packMaker.makePack.createPack(7, "Pack2", [{ name: "item1" }, { name: "item2" }, { name: "item3" }], 50)
    ];
    return testPacks;
  }


beforeEach(() => {
  myStoreManager.clearInventory();
});
test("Store name should be 'Tienda de Berta'", () => {
  myStoreManager.addPack(packMaker.makePack.createPack(7, "Pack1", [{ name: "item1" }, { name: "item2" }, { name: "item3" }], 50));
  expect(myStore.getInventory().size).toEqual(2);
});
