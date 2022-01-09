const item = require("../item");
const functions = item.functions;
const maximoPropiedades = functions.numeroMaximoPropiedades;
var randomstring = require("randomstring");

beforeEach(() => {
  testItem = item.factory.createItem(
    randomstring.generate(7),
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
    expect(testItem._id).toHaveLength(7);
    expect(testItem.nombre).toBe("Nombre test");
    expect(testItem.precio).toBe(20.5);
    expect(testItem.calidad).toBe(30);
    expect(testItem.material).toBe("indestructible");
    expect(testItem.demanda).toBe(20);
  });
  test("No se puede crear un item con un id ya existente", () => {
    let currentId = testItem._id;
    expect(
      item.factory.createItem(
        currentId,
        "hola",
        20.5,
        30,
        "indestructible",
        300,
        20
      )
    ).toBe("Por favor no repita un id ya asignado a otro item");
  });

  test("El id no se puede cambiar", () => {
    expect(Object.getOwnPropertyDescriptor(testItem, "_id").writable).toBe(
      false
    );
    let currentId = testItem._id;
    testItem._id = 567;
    expect(testItem._id).toBe(currentId);
  });

  test("La propiedad id es configurable, puedo cambiar _id a writable true", () => {
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
    let incrementarCuatro = functions.increasePrecio(4);
    expect(incrementarCuatro(testItem)).toBe(24.5);
    expect(testItem.precio).toBe(24.5);
  });

  test("Increase precio incremento negativo", () => {
    let reducirCuatro = functions.increasePrecio(-4);
    expect(reducirCuatro(testItem)).toBe(16.5);
    expect(testItem.precio).toBe(16.5);
  });

  test("El precio no se puede reducir a 0", () => {
    let reducirACero = functions.increasePrecio(-20.5);
    expect(reducirACero(testItem)).toBe("El precio tiene que ser mayor que 0");
    expect(testItem.precio).toBe(20.5);
  });

  test("El precio   NO se puede reducir a un número negativo", () => {
    let reducirANegativo = functions.increasePrecio(-21.5);
    expect(reducirANegativo(testItem)).toBe(
      "El precio tiene que ser mayor que 0"
    );
    expect(testItem.precio).toBe(20.5);
  });
});

describe("Increase stock funciona bien", () => {
  test("Increase stock incremento positivo", () => {
    let incrementarVeinte = functions.increaseStock(20);
    expect(incrementarVeinte(testItem)).toBe(320);
    expect(testItem.stock).toBe(320);
  });

  test("Increase stock incremento negativo", () => {
    let reducirVeinte = functions.increaseStock(-20);
    expect(reducirVeinte(testItem)).toBe(280);
    expect(testItem.stock).toBe(280);
  });

  test("El stock SÍ que se puede reducir a 0", () => {
    let reducirACero = functions.increaseStock(-300);
    expect(reducirACero(testItem)).toBe(0);
    expect(testItem.stock).toBe(0);
  });

  test("El stock no se puede reducir a un número negativo", () => {
    let reducirANegativo = functions.increaseStock(-301);
    expect(reducirANegativo(testItem)).toBe(
      "El stock tiene que ser mayor o igual que 0"
    );
    expect(testItem.stock).toBe(300);
  });
});

describe("Increase calidad funciona bien", () => {
  test("Increase calidad incremento positivo", () => {
    let incrementarCuatro = functions.increaseCalidad(4);
    expect(incrementarCuatro(testItem)).toBe(34);
    expect(testItem.calidad).toBe(34);
  });

  test("Increase calidad incremento negativo", () => {
    let reducirCuatro = functions.increaseCalidad(-4);
    expect(reducirCuatro(testItem)).toBe(26);
    expect(testItem.calidad).toBe(26);
  });

  test("La calidad sí que se puede reducir a 0", () => {
    let reducirACero = functions.increaseCalidad(-testItem.calidad);
    expect(reducirACero(testItem)).toBe(0);
    expect(testItem.calidad).toBe(0);
  });

  test("La calidad  no se puede reducir a un número negativo", () => {
    let reducirANegativo = functions.increaseCalidad(-(testItem.calidad + 1));
    expect(reducirANegativo(testItem)).toBe(
      "La calidad tiene que ser al menos 0"
    );
    expect(testItem.calidad).toBe(30);
  });

  test("La calidad   puede ser  la máxima", () => {
    let incrementoNecesarioParaMax =
      maximoPropiedades.calidad - testItem.calidad;
    let igualarMaximo = functions.increaseCalidad(incrementoNecesarioParaMax);
    expect(igualarMaximo(testItem)).toBe(maximoPropiedades.calidad);
    expect(testItem.calidad).toBe(maximoPropiedades.calidad);
  });

  test("La calidad  no puede ser mayor que la máxima", () => {
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
    let incrementarCuatro = functions.increaseDemanda(4);
    expect(incrementarCuatro(testItem)).toBe(24);
    expect(testItem.demanda).toBe(24);
  });

  test("Increase demanda incremento negativo", () => {
    let reducirCuatro = functions.increaseDemanda(-4);
    expect(reducirCuatro(testItem)).toBe(16);
    expect(testItem.demanda).toBe(16);
  });

  test("La demanda sí que se puede reducir a 0", () => {
    let reducirACero = functions.increaseDemanda(-testItem.demanda);
    expect(reducirACero(testItem)).toBe(0);
    expect(testItem.demanda).toBe(0);
  });

  test("La demanda no se puede reducir a un número negativo", () => {
    let reducirANegativo = functions.increaseDemanda(-(testItem.demanda + 1));
    expect(reducirANegativo(testItem)).toBe(
      "La demanda tiene que ser al menos 0"
    );
    expect(testItem.demanda).toBe(20);
  });

  test("La demanda puede ser  la máxima", () => {
    let incrementoNecesarioParaMax =
      maximoPropiedades.demanda - testItem.demanda;
    let igualarMaximo = functions.increaseDemanda(incrementoNecesarioParaMax);
    expect(igualarMaximo(testItem)).toBe(maximoPropiedades.demanda);
    expect(testItem.demanda).toBe(maximoPropiedades.demanda);
  });

  test("La demanda no puede ser mayor que la máxima", () => {
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
