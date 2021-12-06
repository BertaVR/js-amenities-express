const filterMan = require("../filterManager");

const myFilterManager = filterMan.FilterManager.getManager();
const myStore = myFilterManager.getStore();
describe("Nothing breaks up if filters are applied to empty inventory", () => {
  test("Nothing breaks up if filters are applied to empty inventory", () => {
    expect(myFilterManager.filterByNumberOfItems(3, new Set())).toEqual([]);
    expect(myFilterManager.filterByContainsItem("uno", new Set())).toEqual([]);
  });
});
describe("Testing prototype", () => {
  test("Factory returns always the same filterManager: singleton", () => {
    let firstFilterManager = filterMan.FilterManager.getManager();
    let secondFilterManager = filterMan.FilterManager.getManager();
    expect(firstFilterManager).toEqual(secondFilterManager);
  });

  test("Factory returns always the same store", () => {
    let testFilterManagerStore = filterMan.FilterManager.getManager().getStore();
    expect(testFilterManagerStore).toEqual(myStore);
  });
});

describe("Testing filters", () => {
  test("Filter by max price", () => {
    expect(myFilterManager.filterByMaxPrice(1, testPacks)).toHaveLength(0);
    expect(myFilterManager.filterByMaxPrice(100, testPacks)).toHaveLength(2);
    expect(myFilterManager.filterByMaxPrice(81, testPacks)).toHaveLength(1);
    expect(myFilterManager.filterByMaxPrice(150, testPacks)).toHaveLength(2);
    expect(myFilterManager.filterByMaxPrice(50, testPacks)).toHaveLength(1);
    expect(myFilterManager.filterByMaxPrice(85000, testPacks)).toHaveLength(5);
    expect(myFilterManager.filterByMaxPrice(84999, testPacks)).toHaveLength(4);
    expect(myFilterManager.filterByMaxPrice(8500, testPacks)).toHaveLength(4);
    expect(myFilterManager.filterByMaxPrice(8000, testPacks)).toHaveLength(3);

    expect(
      myFilterManager.filterByMaxPrice(9999999999 * 999999999999999, testPacks)
        .length
    ).toEqual(testPacks.size);
  });

  test("Filter by min price", () => {
    expect(myFilterManager.filterByMinPrice(0, testPacks)).toHaveLength(
      testPacks.size
    );
    expect(myFilterManager.filterByMinPrice(100, testPacks)).toHaveLength(3);
    expect(myFilterManager.filterByMinPrice(81, testPacks)).toHaveLength(4);
    expect(myFilterManager.filterByMinPrice(80, testPacks)).toHaveLength(4);
    expect(myFilterManager.filterByMinPrice(79, testPacks)).toHaveLength(4);
    expect(myFilterManager.filterByMinPrice(150, testPacks)).toHaveLength(3);
    expect(myFilterManager.filterByMinPrice(50, testPacks)).toHaveLength(4);
    expect(myFilterManager.filterByMinPrice(8499, testPacks)).toHaveLength(2);
    expect(myFilterManager.filterByMinPrice(8500, testPacks)).toHaveLength(2);
    expect(myFilterManager.filterByMinPrice(85000, testPacks)).toHaveLength(1);
    expect(myFilterManager.filterByMinPrice(85001, testPacks)).toHaveLength(0);
    expect(
      myFilterManager.filterByMinPrice(9999999999 * 9999999, testPacks)
    ).toHaveLength(0);
  });

  test("Filter by contains item negative test", () => {
    expect(myFilterManager.filterByContainsItem("Rana", testPacks)).toHaveLength(
      0
    );
  });

  test("Filter by contains item positive tests", () => {
    expect(myFilterManager.filterByContainsItem("uno", testPacks)).toHaveLength(
      1
    );
    expect(myFilterManager.filterByContainsItem("dos", testPacks)).toHaveLength(
      2
    );
    expect(myFilterManager.filterByContainsItem("tres", testPacks)).toHaveLength(
      3
    );

    // I want to make sure that filter returns packs in its array, not items:
  });

  test("Filter by number of items", () => {
    expect(myFilterManager.filterByNumberOfItems(3, testPacks)).toHaveLength(3);
    expect(myFilterManager.filterByNumberOfItems(2, testPacks)).toHaveLength(0);
    expect(myFilterManager.filterByNumberOfItems(5, testPacks)).toHaveLength(1);
    expect(myFilterManager.filterByNumberOfItems(4, testPacks)).toHaveLength(1);
    expect(myFilterManager.filterByNumberOfItems(1000, testPacks)).toHaveLength(
      0
    );
  });

  test("Sort By price", () => {
    expect(myFilterManager.sortByPrice(testPacks)).toStrictEqual(
      myFilterManager.sortByPrice(testPacks, "ASC")
    );
    expect(myFilterManager.sortByPrice(testPacks)[0].precio).toEqual(8.5);
    expect(myFilterManager.sortByPrice(testPacks)[1].precio).toEqual(85);
    expect(myFilterManager.sortByPrice(testPacks)[2].precio).toEqual(850);
    expect(myFilterManager.sortByPrice(testPacks, "DESC")[0].precio).toEqual(
      85000
    );
    expect(myFilterManager.sortByPrice(testPacks, "DESC")[1].precio).toEqual(
      8500
    );
    expect(
      myFilterManager.sortByPrice(testPacks, "DESC")[testPacks.size - 1]
    ).toEqual(myFilterManager.sortByPrice(testPacks)[0]);
  });

  // MOCK
  test("Find by nombre", () => {
    expect(mockTmpArray("Pack1")).toHaveLength(1);
    expect(mockTmpArray("Pack2")).toHaveLength(1);
    expect(mockTmpArray("UnexistentPack")).toHaveLength(0);

    // if more than one packs are found return not found
    expect(mockMoreThanOne()).toBe("not found");

    expect(myFilterManager.findPackByNombre("Pack1", testPacks).precio).toBe(
      8.5
    ); //There's only one pack with price 50
    expect(
      myFilterManager.findPackByNombre("UnexistentPack", testPacks)
    ).toBeDefined();
    expect(
      myFilterManager.findPackByNombre("UnexistentPack", testPacks)
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
    return myFilterManager.findPackByNombre(duplicatedPacks);
  });
  test("get Names", () => {
    expect(filterMan.getNames([])).toEqual("ninguno");
    expect(
      filterMan.getNames([
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
