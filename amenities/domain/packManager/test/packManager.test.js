const packManager = require("../packManager");
const myManager = packManager.packManager;
const functions = packManager.functions;

test("Los precios se suman adecuadamente", () => {
  expect(
    functions.sumItemsPrecio([{ precio: 50 }, { precio: 30 }, { precio: 20 }])
  ).toEqual(100);
  expect(
    functions.sumItemsPrecio([{ precio: 0 }, { precio: 0 }, { precio: 0 }])
  ).toEqual(0);
});

test("El descuento se calcula bien", () => {
  expect(functions.aplicarDescuento(200)).toEqual(170);
  expect(functions.aplicarDescuento(200, 15)).toEqual(170);
  expect(functions.aplicarDescuento(200, 100)).toEqual(0);
  expect(functions.aplicarDescuento(200, 20)).toEqual(160);
  expect(functions.aplicarDescuento(200, 0)).toEqual(200);
  expect(functions.aplicarDescuento(200.55, 20)).toBe(160.44000000000003);
});

test("Round redondea a 2 decimales solo si es necesario", () => {
  expect(functions.round(112.42099999)).toEqual(112.42);
  expect(functions.round(112)).toEqual(112);
  expect(functions.round(112.4)).toEqual(112.4);
  expect(functions.round(112.43999)).toEqual(112.44);
  expect(functions.round(0.9)).toEqual(0.9);
  expect(functions.round(0.000893458934)).toEqual(0);
  expect(functions.round(0.009)).toEqual(0.01);
});

test("El precio se calcula bien", () => {
  expect(
    myManager.createPrecio(
      new Set([{ precio: 2.5 }, { precio: 50.77 }, { precio: 78.99 }])
    )
  ).toEqual(112.42);
  expect(
    myManager.createPrecio(
      new Set([{ precio: 0 }, { precio: 50.77 }, { precio: 78.99 }])
    )
  ).toEqual(110.3);
  expect(
    myManager.createPrecio(
      new Set([{ precio: 0 }, { precio: 0 }, { precio: 0 }])
    )
  ).toEqual(0);
  expect(
    myManager.createPrecio(
      new Set([{ precio: 143.25 }, { precio: 100.99 }, { precio: 100.67 }])
    )
  ).toEqual(293.17);
});

test("EL stock de un paquete es el menor de los stocks de sus items", () => {
  expect(
    myManager.createStock(
      new Set([{ stock: 20 }, { stock: 33 }, { stock: 155 }])
    )
  ).toEqual(20);
  expect(
    myManager.createStock(
      new Set([{ stock: 0 }, { stock: 33 }, { stock: 155 }])
    )
  ).toEqual(0);
  expect(
    myManager.createStock(
      new Set([{ stock: 5 }, { stock: 33 }, { stock: 155 }])
    )
  ).toEqual(5);
  expect(
    myManager.createStock(new Set([{ stock: 20 }, { stock: 33 }, { stock: 8 }]))
  ).toEqual(8);
  expect(
    myManager.createStock(
      new Set([{ stock: 3 }, { stock: 33 }, { stock: 155 }])
    )
  ).toEqual(3);
});

test("Switch de calidad funciona bien", () => {
  expect(myManager.createCalidad(new Set([{}, {}, {}]))).toBe("standard"); //3
  expect(myManager.createCalidad(new Set([{}, {}]))).toBe("basic"); //2
  expect(myManager.createCalidad(new Set([{}]))).toBe("basic"); //1
  expect(myManager.createCalidad(new Set([{}, {}, {}, {}]))).toBe("premium"); //4
  expect(
    myManager.createCalidad(
      new Set([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
    )
  ).toBe("premium");
  expect(myManager.createCalidad(new Set([]))).toBe("no definida");
  expect(myManager.createCalidad(undefined)).toBe("no hay items");
  expect(myManager.createCalidad(null)).toBe("no hay items");


});
