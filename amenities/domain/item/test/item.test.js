const item = require("../item");

test("Create items", () => {
  // optional parameters

  const testItem = item.factory.createItem(
    123, 
    "Nombre test",
    20.5,
    30,
    "indestructible",
    300,
    20
  );
  expect(testItem._id).toBe(123);
  expect(testItem.nombre).toBe("Nombre test");
  expect(testItem.precio).toBe(20.5);
  expect(testItem.calidad).toBe(30);
  expect(testItem.material).toBe("indestructible");
  expect(testItem.demanda).toBe(20);
});
