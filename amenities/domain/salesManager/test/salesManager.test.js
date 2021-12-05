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
    expect(mySalesManager.filterByMaxPrice(100)).toHaveLength(7);
    expect(mySalesManager.filterByMaxPrice(81)).toHaveLength(4);
    expect(mySalesManager.filterByMaxPrice(80)).toHaveLength(3);
    expect(mySalesManager.filterByMaxPrice(79)).toHaveLength(2);
    expect(mySalesManager.filterByMaxPrice(150)).toHaveLength(10);
    expect(mySalesManager.filterByMaxPrice(50)).toHaveLength(1);
    expect(
      mySalesManager.filterByMaxPrice(9999999999 * 9999999999).length
    ).toEqual(myStoreManager.getStore().getInventory().size);
  });

  test("Filter by min price", () => {
    expect(mySalesManager.filterByMinPrice(0)).toHaveLength(
      myStoreManager.getStore().getInventory().size
    );
    expect(mySalesManager.filterByMinPrice(100)).toHaveLength(6);
    expect(mySalesManager.filterByMinPrice(81)).toHaveLength(7);
    expect(mySalesManager.filterByMinPrice(80)).toHaveLength(8);
    expect(mySalesManager.filterByMinPrice(79)).toHaveLength(8);
    expect(mySalesManager.filterByMinPrice(150)).toHaveLength(1);
    expect(mySalesManager.filterByMinPrice(50)).toHaveLength(10);
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
    expect(mySalesManager.filterByContainsItem("uno")).toEqual([
      {
        items: [{ name: "uno" }, { name: "item2" }, { name: "tres" }],
        nombre: "Pack2",
        precio: 70,
        stock: 7,
      },
    ]);
  });

  test("Filter by number of items", () => {
    expect(mySalesManager.filterByNumberOfItems(3)).toHaveLength(8);
    expect(mySalesManager.filterByNumberOfItems(2)).toHaveLength(0);
    expect(mySalesManager.filterByNumberOfItems(6)).toHaveLength(1);
    expect(mySalesManager.filterByNumberOfItems(4)).toHaveLength(1);
    expect(mySalesManager.filterByNumberOfItems(1000)).toHaveLength(0);
  });

  test("Sort By price", () => {
    expect(mySalesManager.sortByPrice()).toStrictEqual(
      mySalesManager.sortByPrice("ASC")
    );
    expect(mySalesManager.sortByPrice()[0].precio).toEqual(50);
    expect(mySalesManager.sortByPrice()[1].precio).toEqual(70);
    expect(mySalesManager.sortByPrice()[2].precio).toEqual(80);
    expect(mySalesManager.sortByPrice("DESC")[0].precio).toEqual(150);
    expect(mySalesManager.sortByPrice("DESC")[1].precio).toEqual(140);
    expect(mySalesManager.sortByPrice("DESC")[9]).toEqual(
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

    expect(mySalesManager.findPackByNombre("Pack1").precio).toBe(50); //There's only one pack with price 50
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
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }, {}, {}, {}],
    140
  ),
  packMaker.makePack.createPack(
    7,
    "Pack10",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }, {}],
    150
  ),
];
