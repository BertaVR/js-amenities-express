const { expect, beforeAll, afterAll } = require("@jest/globals");
const packMaker = require("../../pack");
const storeMan = require("../../storeManager");
const salesMan = require("../salesManager");
const myStoreManager = storeMan.StoreManager.getManager();
const mySalesManager = salesMan.SalesManager.getManager();

beforeAll(() => {
  myStoreManager.addPacks(testPacks);
});
afterAll(() => {
  myStoreManager.clearInventory();
});

test("Filter by max price", () => {
  expect(mySalesManager.filterByMaxPrice(1).length).toEqual(0);
  expect(mySalesManager.filterByMaxPrice(100).length).toEqual(7);
  expect(mySalesManager.filterByMaxPrice(81).length).toEqual(4);
  expect(mySalesManager.filterByMaxPrice(80).length).toEqual(3);
  expect(mySalesManager.filterByMaxPrice(79).length).toEqual(2);
  expect(mySalesManager.filterByMaxPrice(150).length).toEqual(10);
  expect(mySalesManager.filterByMaxPrice(50).length).toEqual(1);
  expect(
    mySalesManager.filterByMaxPrice(9999999999 * 9999999999).length
  ).toEqual(myStoreManager.getStore().getInventory().size);
});

test("Filter by min price", () => {
  expect(mySalesManager.filterByMinPrice(0).length).toEqual(
    myStoreManager.getStore().getInventory().size
  );
  expect(mySalesManager.filterByMinPrice(100).length).toEqual(6);
  expect(mySalesManager.filterByMinPrice(81).length).toEqual(7);
  expect(mySalesManager.filterByMinPrice(80).length).toEqual(8);
  expect(mySalesManager.filterByMinPrice(79).length).toEqual(8);
  expect(mySalesManager.filterByMinPrice(150).length).toEqual(1);
  expect(mySalesManager.filterByMinPrice(50).length).toEqual(10);
  expect(mySalesManager.filterByMinPrice(9999999999 * 9999999).length).toEqual(
    0
  );
});


test("Filter by contains item negative test", () => {
    expect(mySalesManager.filterByContainsItem("Rana").length).toEqual(0);
})


test("Filter by contains item positive tests", () => {
    expect(mySalesManager.filterByContainsItem("uno").length).toEqual(1);
    expect(mySalesManager.filterByContainsItem("dos").length).toEqual(2);
    expect(mySalesManager.filterByContainsItem("tres").length).toEqual(3);

})

const testPacks = [
  packMaker.makePack.createPack(
    7,
    "Pack1",
    [{ name: "item1" }, { name: "tres" }, { name: "item3" }],
    50
  ),
  packMaker.makePack.createPack(
    7,
    "Pack2",
    [{ name: "uno" }, { name: "item2" }, { name: "tres" }],
    70
  ),
  ,
  packMaker.makePack.createPack(
    7,
    "Pack3",
    [{ name: "dos" }, { name: "item2" }, { name: "item3" }],
    80
  ),
  packMaker.makePack.createPack(
    7,
    "Pack4",
    [{ name: "dos" }, { name: "tres" }, { name: "tres" }],
    81
  ),
  packMaker.makePack.createPack(
    7,
    "Pack5",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    100
  ),
  packMaker.makePack.createPack(
    7,
    "Pack6",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    100
  ),
  packMaker.makePack.createPack(
    7,
    "Pack7",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    100
  ),
  packMaker.makePack.createPack(
    7,
    "Pack8",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    130
  ),
  packMaker.makePack.createPack(
    7,
    "Pack9",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    140
  ),
  packMaker.makePack.createPack(
    7,
    "Pack10",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    150
  ),
];
