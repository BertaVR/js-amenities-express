const salesMan = require("../salesManager");

const mySalesManager = salesMan.SalesManager.getManager();
const myStore = mySalesManager.getStore();
describe("Nothing breaks up if filters are applied to empty inventory", () => {
  test("Nothing breaks up if filters are applied to empty inventory", () => {
    expect(mySalesManager.filterByNumberOfItems(3, new Set())).toEqual([]);
    expect(mySalesManager.filterByContainsItem("uno", new Set())).toEqual([]);
  });
});
describe("Testing prototype", () => {
  test("Factory returns always the same salesManager: singleton", () => {
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
  test("Filter by max price", () => {
    expect(mySalesManager.filterByMaxPrice(1, testPacks)).toHaveLength(0);
    expect(mySalesManager.filterByMaxPrice(100, testPacks)).toHaveLength(2);
    expect(mySalesManager.filterByMaxPrice(81, testPacks)).toHaveLength(1);
    expect(mySalesManager.filterByMaxPrice(150, testPacks)).toHaveLength(2);
    expect(mySalesManager.filterByMaxPrice(50, testPacks)).toHaveLength(1);
    expect(mySalesManager.filterByMaxPrice(85000, testPacks)).toHaveLength(5);
    expect(mySalesManager.filterByMaxPrice(84999, testPacks)).toHaveLength(4);
    expect(mySalesManager.filterByMaxPrice(8500, testPacks)).toHaveLength(4);
    expect(mySalesManager.filterByMaxPrice(8000, testPacks)).toHaveLength(3);

    expect(
      mySalesManager.filterByMaxPrice(9999999999 * 999999999999999, testPacks)
        .length
    ).toEqual(testPacks.size);
  });

  test("Filter by min price", () => {
    expect(mySalesManager.filterByMinPrice(0, testPacks)).toHaveLength(
      testPacks.size
    );
    expect(mySalesManager.filterByMinPrice(100, testPacks)).toHaveLength(3);
    expect(mySalesManager.filterByMinPrice(81, testPacks)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(80, testPacks)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(79, testPacks)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(150, testPacks)).toHaveLength(3);
    expect(mySalesManager.filterByMinPrice(50, testPacks)).toHaveLength(4);
    expect(mySalesManager.filterByMinPrice(8499, testPacks)).toHaveLength(2);
    expect(mySalesManager.filterByMinPrice(8500, testPacks)).toHaveLength(2);
    expect(mySalesManager.filterByMinPrice(85000, testPacks)).toHaveLength(1);
    expect(mySalesManager.filterByMinPrice(85001, testPacks)).toHaveLength(0);
    expect(
      mySalesManager.filterByMinPrice(9999999999 * 9999999, testPacks)
    ).toHaveLength(0);
  });

  test("Filter by contains item negative test", () => {
    expect(mySalesManager.filterByContainsItem("Rana", testPacks)).toHaveLength(
      0
    );
  });

  test("Filter by contains item positive tests", () => {
    expect(mySalesManager.filterByContainsItem("uno", testPacks)).toHaveLength(
      1
    );
    expect(mySalesManager.filterByContainsItem("dos", testPacks)).toHaveLength(
      2
    );
    expect(mySalesManager.filterByContainsItem("tres", testPacks)).toHaveLength(
      3
    );

    // I want to make sure that filter returns packs in its array, not items:
  });

  test("Filter by number of items", () => {
    expect(mySalesManager.filterByNumberOfItems(3, testPacks)).toHaveLength(3);
    expect(mySalesManager.filterByNumberOfItems(2, testPacks)).toHaveLength(0);
    expect(mySalesManager.filterByNumberOfItems(5, testPacks)).toHaveLength(1);
    expect(mySalesManager.filterByNumberOfItems(4, testPacks)).toHaveLength(1);
    expect(mySalesManager.filterByNumberOfItems(1000, testPacks)).toHaveLength(
      0
    );
  });

  test("Sort By price", () => {
    expect(mySalesManager.sortByPrice(testPacks)).toStrictEqual(
      mySalesManager.sortByPrice(testPacks, "ASC")
    );
    expect(mySalesManager.sortByPrice(testPacks)[0].precio).toEqual(8.5);
    expect(mySalesManager.sortByPrice(testPacks)[1].precio).toEqual(85);
    expect(mySalesManager.sortByPrice(testPacks)[2].precio).toEqual(850);
    expect(mySalesManager.sortByPrice(testPacks, "DESC")[0].precio).toEqual(
      85000
    );
    expect(mySalesManager.sortByPrice(testPacks, "DESC")[1].precio).toEqual(
      8500
    );
    expect(
      mySalesManager.sortByPrice(testPacks, "DESC")[testPacks.size - 1]
    ).toEqual(mySalesManager.sortByPrice(testPacks)[0]);
  });

  // MOCK
  test("Find by nombre", () => {
    expect(mockTmpArray("Pack1")).toHaveLength(1);
    expect(mockTmpArray("Pack2")).toHaveLength(1);
    expect(mockTmpArray("UnexistentPack")).toHaveLength(0);

    // if more than one packs are found return not found
    expect(mockMoreThanOne()).toBe("not found");

    expect(mySalesManager.findPackByNombre("Pack1", testPacks).precio).toBe(
      8.5
    ); //There's only one pack with price 50
    expect(
      mySalesManager.findPackByNombre("UnexistentPack", testPacks)
    ).toBeDefined();
    expect(
      mySalesManager.findPackByNombre("UnexistentPack", testPacks)
    ).toEqual("not found");
  });

  const mockTmpArray = jest.fn((packNombre) =>
    Array.from(testPacks).filter((p) => p.nombre === packNombre)
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

const testPacks = new Set([
  {
    nombre: "Pack1",
    stock: 5,
    items: new Set([
      { name: "uno", stock: 5, precio: 2 },
      { name: "dos", stock: 89, precio: 2 },
      { name: "tres", stock: 7, precio: 6 },
    ]),
    precio: 8.5,
  },
  {
    nombre: "Pack2",
    stock: 5,
    items: new Set([
      { name: "dos", stock: 5, precio: 20 },
      { name: "tres", stock: 89, precio: 20 },
      { name: "tres", stock: 7, precio: 60 },
    ]),
    precio: 85,
  },
  {
    nombre: "Pack3",
    stock: 5,
    items: new Set([
      { name: "tres", stock: 5, precio: 200 },
      { name: "item2", stock: 89, precio: 200 },
      { name: "item3", stock: 7, precio: 600 },
      { name: "item2", stock: 89, precio: 0 },
      { name: "item3", stock: 7, precio: 0 },
    ]),
    precio: 850,
  },
  {
    nombre: "Pack4",
    stock: 5,
    items: new Set([
      { name: "item1", stock: 5, precio: 2000 },
      { name: "item2", stock: 89, precio: 2000 },
      { name: "item3", stock: 7, precio: 6000 },
    ]),
    precio: 8500,
  },
  {
    nombre: "Pack5",
    stock: 3,
    items: new Set([
      { name: "item1", stock: 3, precio: 20000 },
      { name: "item2", stock: 89, precio: 20000 },
      { name: "item3", stock: 7, precio: 60000 },
      { name: "item3", stock: 7, precio: 0 },
    ]),
    precio: 85000,
  },
]);
