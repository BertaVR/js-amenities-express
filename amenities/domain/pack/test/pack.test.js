const factory = require("../pack");
const functions = factory.functions;
const store = require("../../store/store");



test("Is available returns true when theres is stock and false when there is not. (this.stock works as expected)", () => {
  // optional parameters

  expect(functions.isAvailable({stock:0})).toEqual(false);
  expect(functions.isAvailable({stock:1})).toEqual(true);
});
