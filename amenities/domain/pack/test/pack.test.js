const factory = require("../pack");
const functions = factory.functions;
const store = require("../../store/store");

/*test("Pack properties if  no values given", () => {
  let pack = factory.makePack.createPack();
  expect(pack.getItems()).toHaveLength(0);
  expect(pack.getStock()).toBe(0);
});

test("Stock optional parameter works as expected", () => {
  let pack = factory.makePack.createPack(new Set ({items: {nombre : "jiib", stock: 50, precio: 40}}));
  expect(pack.getStock()).toBe(1);
});*/

test("Is available returns true when theres is stock and false when there is not. (this.stock works as expected)", () => {
  // optional parameters

  expect(functions.isAvailable({stock:0})).toEqual(false);
  expect(functions.isAvailable({stock:1})).toEqual(true);
});
