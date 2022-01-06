const { expect, beforeEach } = require("@jest/globals");

const packMaker = require("../../pack");
const man = require("../storeManager");

const myStoreManager = man.StoreManager.getManager();
const myStore = myStoreManager.getStore();

describe("Testing prototype", () => {
  test("Factory returns always the same storeManager: singleton", () => {
    let firstStoreManager = man.StoreManager.getManager();
    let secondStoreManager = man.StoreManager.getManager();
    expect(firstStoreManager).toEqual(secondStoreManager);
  });

  test("Factory returns always the same store", () => {
    let testStoreManager = man.StoreManager.getManager().getStore();
    expect(testStoreManager).toEqual(myStore);
  });
});

describe("Testing just adding one pack", () => {
  const testPack = packMaker.makePack.createPack(
    "Pack1",
    new Set([
      { nombre: "item1", stock: 3, precio: 7 },
      { nombre: "item2", stock: 4, precio: 8 },
      { nombre: "item3", stock: 7, precio: 600 },
    ])
  );
  const inventory = myStore.getInventory();

  beforeEach(() => {
    myStoreManager.clearInventory();
    myStoreManager.addPack(testPack);
  });

  test("Add pack works", () => {
    expect(inventory.size).toEqual(1);
  });

  test("Clear inventory", () => {
    myStoreManager.clearInventory();
    expect(inventory.size).toEqual(0);
  });
});

describe("Testing using addPacks: packs with name repeated", () => {
  beforeEach(() => {
    myStoreManager.clearInventory();
    myStoreManager.addPacks(testPacksNameRepeated);
  });
  test("Negative test for findByName", () => {
    expect(myStoreManager.findByName("Not_exists")).toHaveLength(0);
  });
  test("Positive test for findByName: Just one pack.", () => {
    expect(myStoreManager.findByName("Pack2")).toHaveLength(1);
  });

  test("Positive test for findByName: Packs repeated", () => {
    expect(myStoreManager.findByName("Pack1")).toHaveLength(1);
  });

  test("Is repeated: positive tests", () => {
    repeatedPack = packMaker.makePack.createPack(
      "Pack1",
      new Set([
        { nombre: "item1", stock: 66, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );
    repeatedPack2 = packMaker.makePack.createPack(
      "Pack2",
      new Set([
        { nombre: "item1", stock: 66, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );

    expect(myStoreManager.isRepeated(repeatedPack)).toEqual(1);
    expect(myStoreManager.isRepeated(repeatedPack2)).toEqual(1);

    //USING TRUTHY
    expect(myStoreManager.isRepeated(repeatedPack)).toBeTruthy();
    expect(myStoreManager.isRepeated(repeatedPack2)).toBeTruthy();
  });

  test("Is repeated: negative tests", () => {
    let unrepeatedPack = packMaker.makePack.createPack(
      "Name not repeated",
      new Set([
        { nombre: "item1", stock: 0, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );
    let unrepeatedPack2 = packMaker.makePack.createPack(
      "Name not repeated 2",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );

    expect(myStoreManager.isRepeated(unrepeatedPack)).toEqual(0);
    expect(myStoreManager.isRepeated(unrepeatedPack2)).toEqual(0);

    //USING FALSY
    expect(myStoreManager.isRepeated(unrepeatedPack)).toBeFalsy();
    expect(myStoreManager.isRepeated(unrepeatedPack2)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: Repeated pack with stock", () => {
    let repeatedPack = packMaker.makePack.createPack(
      "Pack1",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );
    expect(myStoreManager.isAddableToStore(repeatedPack)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: Unrepeated pack without stock", () => {
    let noStock = packMaker.makePack.createPack(
      "New name",
      new Set([
        { nombre: "item1", stock: 0, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );
    expect(myStoreManager.isAddableToStore(noStock)).toBeFalsy();
  });
  test("Negative test for isAddableToStore: Repeated pack without stock", () => {
    let noStock = packMaker.makePack.createPack(
      "Pack1",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 0, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );

    expect(myStoreManager.isAddableToStore(noStock)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: null stock", () => {
    let nullStock = packMaker.makePack.createPack("New name", null);
    expect(myStoreManager.isAddableToStore(nullStock)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: undefined stock", () => {
    let undefinedStock = packMaker.makePack.createPack("New name", undefined);
    expect(myStoreManager.isAddableToStore(undefinedStock)).toBeFalsy();
  });

  test("Positive test for isAddableToStore: available stock and new name", () => {
    let packsAvailable = packMaker.makePack.createPack(
      "New name",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    );
    expect(myStoreManager.isAddableToStore(packsAvailable)).toBeTruthy();
  });

  test("Add Packs should add all packs that are addable", () => {
    //     myStoreManager.addPacks(testPacksNameRepeated) -> in beforeEach
    expect(myStore.getInventory().size).toEqual(4);
  });

  //  Los tests están acoplados. TODO: Refactor

  const testPacksNameRepeated = [
    packMaker.makePack.createPack(
      //SE AÑADE
      "Pack1",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    ),
    packMaker.makePack.createPack(
      //NO SE AÑADE: NOMBRE REPE
      "Pack1",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    ),
    ,
    packMaker.makePack.createPack(
      //NO SE AÑADE: NOMBRE REPE
      "Pack1",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    ),
    packMaker.makePack.createPack(
      //SE AÑADE
      "Pack2",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    ),
    packMaker.makePack.createPack(
      //SE AÑADE
      "Pack3",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    ),
    packMaker.makePack.createPack(
      //SE AÑADE
      "Pack4",
      new Set([
        { nombre: "item1", stock: 5, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    ),
    packMaker.makePack.createPack(
      //NO SE AÑADE: stock 0
      "Pack5",
      new Set([
        { nombre: "item1", stock: 0, precio: 80 },
        { nombre: "item2", stock: 89, precio: 34 },
        { nombre: "item3", stock: 7, precio: 47 },
      ])
    ),
  ];
});
