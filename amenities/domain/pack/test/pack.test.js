const importaPack = require("../pack");
const { expect, beforeEach } = require("@jest/globals");

const functions = importaPack.functions;
const store = require("../../store/store");
beforeEach(() => {
  //Tengo que declarar estas variables globales y usarlas en los tests
  // el objetivo es que el objeto del test sea el mismo, no cambie de un tests a otro
   testData = {
    nombre: "Hello",
    items: [
      {
        nombre: "LLave mágica",
        precio: 10,
        calidad: 4,
        material: "normal",
        stock: 3,
        demanda: 68,
      },
      {
        nombre: "Diccionario universal",
        precio: 12,
        calidad: 13,
        material: "indestructible",
        stock: 1,
        demanda: 12,
      },
      {
        nombre: "Pistola de portales",
        precio: 18,
        calidad: 3,
        material: "normal",
        stock: 1,
        demanda: 10,
      },
      {
        nombre: "Crucero espacial",
        precio: 15,
        calidad: 2,
        material: "normal",
        stock: 12,
        demanda: 10,
      },
    ],
    updatedItems: [
      {
        nombre: "LLave muy mágica",
        precio: 80,
        calidad: 4,
        material: "normal",
        stock: 3,
        demanda: 68,
      },
      {
        nombre: "Pistola de portales",
        precio: 18,
        calidad: 3,
        material: "normal",
        stock: 10,
        demanda: 10,
      },
      {
        nombre: "Crucero espacial",
        precio: 95,
        calidad: 2,
        material: "normal",
        stock: 12,
        demanda: 10,
      },
    ],
  };

  testPack = importaPack.makePack.createPack(
    testData.nombre,
    testData.items
  );
});
test("Is available returns true when theres is stock and false when there is not. (this.stock works as expected)", () => {
  // optional parameters

  expect(functions.isAvailable({ stock: 0 })).toEqual(false);
  expect(functions.isAvailable({ stock: 1 })).toEqual(true);
});
test("Create pack variables creation works as expected", () => {
  expect(testPack.precio).toEqual(46.75);
  expect(testPack.stock).toEqual(1);
  expect(testPack.items[0].nombre).toBe("LLave mágica");
  expect(testPack.calidad).toEqual("premium");
})
test("Update name works as expected", () => {
  expect(testPack.nombre).toEqual("Hello");
  testPack.updatePack([{ nombre: "Nuevo Nombre" }]);
  expect(testPack.nombre).toEqual("Nuevo Nombre");
});

test("Update pack update items works as expected", () => {

  testPack.updatePack([{ items: testData.updatedItems }]);

  expect(testPack.precio).toEqual(164.05);
  expect(testPack.stock).toEqual(3);
  expect(testPack.items).toHaveLength(3);
  expect(testPack.items[0].nombre).toBe("LLave muy mágica");
  expect(testPack.calidad).toEqual("standard");
});

test("Update pack update items andd nombre at the same time works as expected", () => {

  testPack.updatePack([{ items: testData.updatedItems }, {nombre: "Este nombre es nuevo"}]);

  expect(testPack.nombre).toEqual("Este nombre es nuevo");
  expect(testPack.precio).toEqual(164.05);
  expect(testPack.stock).toEqual(3);
  expect(testPack.items).toHaveLength(3);
  expect(testPack.items[0].nombre).toBe("LLave muy mágica");
  expect(testPack.calidad).toEqual("standard");
});