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
    7,
    "Pack1",
    [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    50
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
    repeatedPack = packMaker.makePack.createPack(7, "Pack1");
    repeatedPack2 = packMaker.makePack.createPack(7, "Pack2");

    expect(myStoreManager.isRepeated(repeatedPack)).toEqual(1);
    expect(myStoreManager.isRepeated(repeatedPack2)).toEqual(1);

    //USING TRUTHY
    expect(myStoreManager.isRepeated(repeatedPack)).toBeTruthy();
    expect(myStoreManager.isRepeated(repeatedPack2)).toBeTruthy();
  });

  test("Is repeated: negative tests", () => {
    let unrepeatedPack = packMaker.makePack.createPack(7, "Name not repeated");
    let unrepeatedPack2 = packMaker.makePack.createPack(
      7,
      "Name not repeated 2"
    );

    expect(myStoreManager.isRepeated(unrepeatedPack)).toEqual(0);
    expect(myStoreManager.isRepeated(unrepeatedPack2)).toEqual(0);

    //USING FALSY
    expect(myStoreManager.isRepeated(unrepeatedPack)).toBeFalsy();
    expect(myStoreManager.isRepeated(unrepeatedPack2)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: Repeated pack with stock", () => {
    let repeatedPack = packMaker.makePack.createPack(7, "Pack1");
    expect(myStoreManager.isAddableToStore(repeatedPack)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: Unrepeated pack without stock", () => {
    let noStock = packMaker.makePack.createPack(0, "New name");
    expect(myStoreManager.isAddableToStore(noStock)).toBeFalsy();
  });
  test("Negative test for isAddableToStore: Repeated pack without stock", () => {
    let noStock = packMaker.makePack.createPack(0, "Pack1");

    expect(myStoreManager.isAddableToStore(noStock)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: null stock", () => {
    let nullStock = packMaker.makePack.createPack(null, "New name");
    expect(myStoreManager.isAddableToStore(nullStock)).toBeFalsy();
  });

  test("Negative test for isAddableToStore: undefined stock", () => {
    let undefinedStock = packMaker.makePack.createPack(undefined, "New name");
    expect(myStoreManager.isAddableToStore(undefinedStock)).toBeFalsy();
  });

  test("Positive test for isAddableToStore: available stock and new name", () => {
    let undefinedStock = packMaker.makePack.createPack(300, "New name");
    expect(myStoreManager.isAddableToStore(undefinedStock)).toBeTruthy();
  });

  test("Add Packs should add all packs that are addable", () => {
    //     myStoreManager.addPacks(testPacksNameRepeated) -> in beforeEach
    expect(myStore.getInventory().size).toEqual(4);
  });

  const testPacksNameRepeated = [
    packMaker.makePack.createPack(
      7,
      "Pack2",
      [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      50
    ),
    packMaker.makePack.createPack(
      7,
      "Pack1",
      [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      50
    ),
    ,
    packMaker.makePack.createPack(
      7,
      "Pack1",
      [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      50
    ),
    packMaker.makePack.createPack(
      7,
      "Pack1",
      [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      50
    ),
    packMaker.makePack.createPack(
      7,
      "Pack3",
      [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      50
    ),
    packMaker.makePack.createPack(
      7,
      "Pack3",
      [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      50
    ),
    packMaker.makePack.createPack(
      7,
      "Pack4",
      [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
      50
    ),
  ];
});
