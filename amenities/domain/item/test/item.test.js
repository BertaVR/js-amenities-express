const item = require("../item");
const functions = item.functions;
const maximoPropiedades = item.functions.numeroMaximoPropiedades;

beforeEach(() => {
  testItem = item.factory.createItem(
    123,
    "Nombre test",
    20.5,
    30,
    "indestructible",
    300,
    20
  );
});
describe("Propiedades de los items ", () => {
  test("Los items creados con factory tienen las propiadades", () => {
    // optional parameters

    expect(testItem._id).toBe(123);
    expect(testItem.nombre).toBe("Nombre test");
    expect(testItem.precio).toBe(20.5);
    expect(testItem.calidad).toBe(30);
    expect(testItem.material).toBe("indestructible");
    expect(testItem.demanda).toBe(20);
  });

  test("El id no se puede cambiar", () => {
    // optional parameters
    expect(Object.getOwnPropertyDescriptor(testItem, "_id").writable).toBe(
      false
    );
    testItem._id = 567;
    expect(testItem._id).toBe(123);
  });

  test("La propiedad id es configurable, puedo cambiar _id a writable true", () => {
    // optional parameters
    expect(Object.getOwnPropertyDescriptor(testItem, "_id").configurable).toBe(
      true
    );
    expect(Object.getOwnPropertyDescriptor(testItem, "_id").writable).toBe(
      false
    );

    Object.defineProperty(testItem, "_id", {
      // value: _id,
      writable: true, // not writable!
    });

    expect(Object.getOwnPropertyDescriptor(testItem, "_id").writable).toBe(
      true
    );

    testItem._id = 567;
    expect(testItem._id).toBe(567);
  });
});

describe("Increase precio funciona bien", () => {
  test("Increase precio incremento positivo", () => {
    // optional parameters

    let incrementarCuatro = functions.increasePrecio(4);
    expect(incrementarCuatro(testItem)).toBe(24.5);
    expect(testItem.precio).toBe(24.5);
  });

  test("Increase precio incremento negativo", () => {
    // optional parameters
    let reducirCuatro = functions.increasePrecio(-4);
    expect(reducirCuatro(testItem)).toBe(16.5);
    expect(testItem.precio).toBe(16.5);
  });

  test("El precio no se puede reducir a 0", () => {
    // optional parameters
    let reducirACero = functions.increasePrecio(-20.5);
    expect(reducirACero(testItem)).toBe("El precio tiene que ser mayor que 0");
    expect(testItem.precio).toBe(20.5);
  });

  test("El precio   NO se puede reducir a un número negativo", () => {
    // optional parameters
    let reducirANegativo = functions.increasePrecio(-21.5);
    expect(reducirANegativo(testItem)).toBe(
      "El precio tiene que ser mayor que 0"
    );
    expect(testItem.precio).toBe(20.5);
  });
});

describe("Increase stock funciona bien", () => {
  test("Increase stock incremento positivo", () => {
    // optional parameters

    let incrementarVeinte = functions.increaseStock(20);
    expect(incrementarVeinte(testItem)).toBe(320);
    expect(testItem.stock).toBe(320);
  });

  test("Increase stock incremento negativo", () => {
    // optional parameters
    let reducirVeinte = functions.increaseStock(-20);
    expect(reducirVeinte(testItem)).toBe(280);
    expect(testItem.stock).toBe(280);
  });

  test("El stock SÍ que se puede reducir a 0", () => {
    // optional parameters
    let reducirACero = functions.increaseStock(-300);
    expect(reducirACero(testItem)).toBe(0);
    expect(testItem.stock).toBe(0);
  });

  test("El stock no se puede reducir a un número negativo", () => {
    // optional parameters
    let reducirANegativo = functions.increaseStock(-301);
    expect(reducirANegativo(testItem)).toBe(
      "El stock tiene que ser mayor o igual que 0"
    );
    expect(testItem.stock).toBe(300);
  });
});

describe("Increase calidad funciona bien", () => {
  test("Increase calidad incremento positivo", () => {
    // optional parameters

    let incrementarCuatro = functions.increaseCalidad(4);
    expect(incrementarCuatro(testItem)).toBe(34);
    expect(testItem.calidad).toBe(34);
  });

  test("Increase calidad incremento negativo", () => {
    // optional parameters
    let reducirCuatro = functions.increaseCalidad(-4);
    expect(reducirCuatro(testItem)).toBe(26);
    expect(testItem.calidad).toBe(26);
  });

  test("La calidad sí que se puede reducir a 0", () => {
    // optional parameters
    let reducirACero = functions.increaseCalidad(-testItem.calidad);
    expect(reducirACero(testItem)).toBe(0);
    expect(testItem.calidad).toBe(0);
  });

  test("La calidad  no se puede reducir a un número negativo", () => {
    // optional parameters
    let reducirANegativo = functions.increaseCalidad(-(testItem.calidad + 1));
    expect(reducirANegativo(testItem)).toBe(
      "La calidad tiene que ser al menos 0"
    );
    expect(testItem.calidad).toBe(30);
  });

  test("La calidad   puede ser  la máxima", () => {
    // optional parameters
    let incrementoNecesarioParaMax =
      maximoPropiedades.calidad - testItem.calidad;
    let igualarMaximo = functions.increaseCalidad(incrementoNecesarioParaMax);
    expect(igualarMaximo(testItem)).toBe(maximoPropiedades.calidad);
    expect(testItem.calidad).toBe(maximoPropiedades.calidad);
  });

  test("La calidad  no puede ser mayor que la máxima", () => {
    // optional parameters
    let incrementoNecesarioParaMax =
      maximoPropiedades.calidad - testItem.calidad;
    let excederMaximo = functions.increaseCalidad(
      incrementoNecesarioParaMax + 1
    );
    expect(excederMaximo(testItem)).toBe(
      `La calidad tiene que ser  menor o igual que ${maximoPropiedades.calidad}`
    );
    expect(testItem.calidad).toBe(30);
  });
});

describe("Increase demanda funciona bien", () => {
  test("Increase demanda incremento positivo", () => {
    // optional parameters

    let incrementarCuatro = functions.increaseDemanda(4);
    expect(incrementarCuatro(testItem)).toBe(24);
    expect(testItem.demanda).toBe(24);
  });

  test("Increase demanda incremento negativo", () => {
    // optional parameters
    let reducirCuatro = functions.increaseDemanda(-4);
    expect(reducirCuatro(testItem)).toBe(16);
    expect(testItem.demanda).toBe(16);
  });

  test("La demanda sí que se puede reducir a 0", () => {
    // optional parameters
    let reducirACero = functions.increaseDemanda(-testItem.demanda);
    expect(reducirACero(testItem)).toBe(0);
    expect(testItem.demanda).toBe(0);
  });

  test("La demanda no se puede reducir a un número negativo", () => {
    // optional parameters
    let reducirANegativo = functions.increaseDemanda(-(testItem.demanda + 1));
    expect(reducirANegativo(testItem)).toBe(
      "La demanda tiene que ser al menos 0"
    );
    expect(testItem.demanda).toBe(20);
  });

  test("La demanda puede ser  la máxima", () => {
    // optional parameters
    let incrementoNecesarioParaMax =
      maximoPropiedades.demanda - testItem.demanda;
    let igualarMaximo = functions.increaseDemanda(incrementoNecesarioParaMax);
    expect(igualarMaximo(testItem)).toBe(maximoPropiedades.demanda);
    expect(testItem.demanda).toBe(maximoPropiedades.demanda);
  });

  test("La demanda no puede ser mayor que la máxima", () => {
    // optional parameters
    let incrementoNecesarioParaMax =
      maximoPropiedades.demanda - testItem.demanda;
    let excederMaximo = functions.increaseDemanda(
      incrementoNecesarioParaMax + 1
    );
    expect(excederMaximo(testItem)).toBe(
      `La demanda tiene que ser  menor o igual que ${maximoPropiedades.demanda}`
    );
    expect(testItem.demanda).toBe(20);
  });
});
