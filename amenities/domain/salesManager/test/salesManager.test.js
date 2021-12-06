const { expect, beforeAll, afterAll } = require("@jest/globals");

const packMaker = require("../../pack");
const storeMan = require("../../storeManager");
const salesMan = require("../salesManager");
const Pack = packMaker.class;

const myStoreManager = storeMan.StoreManager.getManager();
const mySalesManager = salesMan.SalesManager.getManager();
const myStore = mySalesManager.getStore();
describe("Nothing breaks up if filters are applied to empty inventory", () => {
  test("Nothing breaks up if filters are applied to empty inventory", () => {
    myStoreManager.clearInventory();
    expect(mySalesManager.filterByNumberOfItems(3)).toEqual([]);
    expect(mySalesManager.filterByContainsItem("uno")).toEqual([]);
  });
});
describe("Testing prototype", () => {
  test("Factory returns always the same storeManager: singleton", () => {
    let firstSalesManager = salesMan.SalesManager.getManager();
    let secondSalesManager = salesMan.SalesManager.getManager();
    expect(firstSalesManager).toEqual(secondSalesManager);
  });

  test("Factory returns always the same store", () => {
    let testSalesManager = salesMan.SalesManager.getManager().getStore();
    expect(testSalesManager).toEqual(myStore);
  });
});

describe("Testing filters", () => {
  beforeAll(() => {
    myStoreManager.addPacks(testPacks);
  });
  afterAll(() => {
    myStoreManager.clearInventory();
  });

  test("Filter by max price", () => {
    expect(mySalesManager.filterByMaxPrice(1)).toHaveLength(0);
    expect(mySalesManager.filterByMaxPrice(100)).toHaveLength(2);
    expect(mySalesManager.filterByMaxPrice(81)).toHaveLength(1);
    expect(mySalesManager.filterByMaxPrice(150)).toHaveLength(2);
    expect(mySalesManager.filterByMaxPrice(50)).toHaveLength(1);
    expect(mySalesManager.filterByMaxPrice(85000)).toHaveLength(5);
    expect(mySalesManager.filterByMaxPrice(84999)).toHaveLength(4);
    expect(mySalesManager.filterByMaxPrice(8500)).toHaveLength(4);
    expect(mySalesManager.filterByMaxPrice(8000)).toHaveLength(3);


    expect(
      mySalesManager.filterByMaxPrice(9999999999 * 9999999999).length
    ).toEqual(myStoreManager.getStore().getInventory().size);
  });

  test("Filter by min price", () => {
    expect(mySalesManager.filterByMinPrice(0)).toHaveLength(
      myStoreManager.getStore().getInventory().size
    );
    expect(mySalesManager.filterByMinPrice(100)).toHaveLength(3);
    expect(mySalesManager.filterByMinPrice(81)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(80)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(79)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(150)).toHaveLength(3);
    expect(mySalesManager.filterByMinPrice(50)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(8499)).toHaveLength(2);
    expect(mySalesManager.filterByMinPrice(8500)).toHaveLength(2);
    expect(mySalesManager.filterByMinPrice(85000)).toHaveLength(1);
    expect(mySalesManager.filterByMinPrice(85001)).toHaveLength(0);
    expect(mySalesManager.filterByMinPrice(9999999999 * 9999999)).toHaveLength(
      0
    );
  });

  test("Filter by contains item negative test", () => {
    expect(mySalesManager.filterByContainsItem("Rana")).toHaveLength(0);
  });

  test("Filter by contains item positive tests", () => {
    expect(mySalesManager.filterByContainsItem("uno")).toHaveLength(1);
    expect(mySalesManager.filterByContainsItem("dos")).toHaveLength(2);
    expect(mySalesManager.filterByContainsItem("tres")).toHaveLength(3);

    // I want to make sure that filter returns packs in its array, not items:
    expect(mySalesManager.filterByContainsItem("uno")[0]).toBeInstanceOf(Pack);

  });

  test("Filter by number of items", () => {
    expect(mySalesManager.filterByNumberOfItems(3)).toHaveLength(3);
    expect(mySalesManager.filterByNumberOfItems(2)).toHaveLength(0);
    expect(mySalesManager.filterByNumberOfItems(5)).toHaveLength(1);
    expect(mySalesManager.filterByNumberOfItems(4)).toHaveLength(1);
    expect(mySalesManager.filterByNumberOfItems(1000)).toHaveLength(0);
  });

  test("Sort By price", () => {
    expect(mySalesManager.sortByPrice()).toStrictEqual(
      mySalesManager.sortByPrice("ASC")
    );
    expect(mySalesManager.sortByPrice()[0].precio).toEqual(8.5);
    expect(mySalesManager.sortByPrice()[1].precio).toEqual(85);
    expect(mySalesManager.sortByPrice()[2].precio).toEqual(850);
    expect(mySalesManager.sortByPrice("DESC")[0].precio).toEqual(85000);
    expect(mySalesManager.sortByPrice("DESC")[1].precio).toEqual(8500);
    expect(mySalesManager.sortByPrice("DESC")[testPacks.size -1 ]).toEqual(
      mySalesManager.sortByPrice("ASC")[0]
    );
  });

  // MOCK
  test("Find by nombre", () => {
    expect(mockTmpArray("Pack1")).toHaveLength(1);
    expect(mockTmpArray("Pack2")).toHaveLength(1);
    expect(mockTmpArray("UnexistentPack")).toHaveLength(0);

    // if more than one packs are found return not found
    expect(mockMoreThanOne()).toBe("not found");

    expect(mySalesManager.findPackByNombre("Pack1").precio).toBe(8.5); //There's only one pack with price 50
    expect(mySalesManager.findPackByNombre("Pack1")).toBeInstanceOf(Pack);
    expect(mySalesManager.findPackByNombre("UnexistentPack")).toBeDefined();
    expect(mySalesManager.findPackByNombre("UnexistentPack")).toEqual(
      "not found"
    );
  });

  const mockTmpArray = jest.fn((packNombre) =>
    Array.from(mySalesManager.getStore().getInventory()).filter(
      (p) => p.nombre === packNombre
    )
  );
  const mockMoreThanOne = jest.fn(() => {
    let duplicatedPacks = new Set([
      {
        items: [{ name: "uno" }, { name: "item2" }, { name: "tres" }],
        nombre: "Pack2",
        precio: 70,
        stock: 7,
      },
      {
        items: [{ name: "uno" }, { name: "item2" }, { name: "tres" }],
        nombre: "Pack2",
        precio: 70,
        stock: 7,
      },
    ]);
    return mySalesManager.findPackByNombre(duplicatedPacks);
  });
  test("get Names", () => {
    expect(salesMan.getNames([])).toEqual("ninguno");
    expect(
      salesMan.getNames([
        { nombre: "uno" },
        { nombre: "dos" },
        { nombre: "tres" },
      ])
    ).toEqual(["uno", "dos", "tres"]);
  });
});

const testPacks = 
new Set([packMaker.makePack.createPack(
  "Pack1",
  new Set([
    { name: "uno", stock: 5, precio: 2 },
    { name: "dos", stock: 89, precio: 2 },
    { name: "tres", stock: 7, precio: 6 },
  ])
),
packMaker.makePack.createPack(
  "Pack2",
  new Set([
    { name: "dos", stock: 5, precio: 20 },
    { name: "tres", stock: 89, precio: 20 },
    { name: "tres", stock: 7, precio: 60 },
  ])
),
packMaker.makePack.createPack(

  "Pack3",
  new Set([
    { name: "tres", stock: 5, precio: 200 },
    { name: "item2", stock: 89, precio: 200 },
    { name: "item3", stock: 7, precio: 600 },
    { name: "item2", stock: 89, precio: 0 },
    { name: "item3", stock: 7, precio: 0 },
  ])
),
packMaker.makePack.createPack(

  "Pack4",
  new Set([
    { name: "item1", stock: 5, precio: 2000 },
    { name: "item2", stock: 89, precio: 2000 },
    { name: "item3", stock: 7, precio: 6000 },
  ])
),
packMaker.makePack.createPack(

  "Pack5",
  new Set([
    { name: "item1", stock: 3, precio: 20000 },
    { name: "item2", stock: 89, precio: 20000 },
    { name: "item3", stock: 7, precio: 60000},
    { name: "item3", stock: 7, precio: 0},
  ])
),
]);



