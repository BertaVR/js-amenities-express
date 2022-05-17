const { expect } = require("@jest/globals");
const request = require("supertest");

const app = require("../app");

const db = require("../db/mongoConfig");

/**
 * SCOPING
 *
 * SETUP y TEARDOWN
 */

describe("Packs Routes", () => {
  afterAll(async () => {
    db.disconnect();
  });

  test("Positive test getPack /packs/:nombre /", () => {
    let nombre = "Pack Squanchy Style";
    return request(app)
      .get(`/packs/${nombre}`)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("nombre", nombre);
        expect(res.body).toHaveProperty("items");
        expect(res.body.nombre).toEqual(expect.stringMatching(nombre));
        expect(res.body._id).toBeTruthy();
        expect(res.body.nombre).toBe(nombre);
        expect(res.body.items[0]).toHaveProperty("_id");
        expect(res.body._id).toBe("61d2dd8ad75d3770be652e7d");
      });
  }, 20000);

  test("Negative test getPack /packs/:nombre /", () => {
    let nombre = "Este pack no existe";
    return request(app)
      .get(`/packs/${nombre}`)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  test("Positive test getAllPacks /packs/ /", () => {
    return request(app)
      .get(`/packs/`)
      .then((res) => {
        // Received: "application/json; charset=utf-8"
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty("_id");
        expect(res.body[0]).toHaveProperty("nombre");
        expect(res.body[0]).toHaveProperty("items");
        expect(res.body[0]).toHaveProperty("stock");
        expect(res.body[0]).toHaveProperty("calidad");
        expect(res.body[0]).toHaveProperty("precio");
        expect(res.body).toHaveLength(22);
        expect(res.body[0]._id).not.toBeFalsy();
      });
  });

  test("Positive test deletePack /packs/:nombre/delete /", () => {
    let nombre = "Pack animales";
    return request(app)
      .delete(`/packs/${nombre}/`)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", "61afc35457387547a0c0f6d1");
        expect(res.body).toHaveProperty("nombre", nombre);
      });
  }, 10000);

  test("Negative test deletePack /packs/:nombre/delete /", () => {
    let nombre = "Pack que no existe";
    return request(app)
      .delete(`/packs/${nombre}/delete`)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  test("Positive test POST addPack /packs /", () => {
    return request(app)
      .post("/packs/add")
      .send(testData.positivePost)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("nombre");
        expect(res.body).toHaveProperty("items");
        expect(res.body).toHaveProperty("stock");
        expect(res.body).toHaveProperty("calidad");
        expect(res.body).toHaveProperty("precio");

        expect(res.body.items).toBeTruthy();
        expect(res.body.items[0].nombre).toBe("Bandera nacional");
        expect(res.body.items[0]).toHaveProperty("nombre");
        expect(res.body.items[0]).toHaveProperty("stock");
        expect(res.body.items[0]).toHaveProperty("calidad");
        expect(res.body.items[0]).toHaveProperty("precio");
        expect(res.body.items[0]).toHaveProperty("demanda");
        expect(res.body.items[2].nombre).toBe("Poción del arcoiris");
        expect(res.body.items[1].nombre).toBe("Bañador de invisibilidad");
        expect(res.body.items.length).toBe(3);
        expect(res.body.nombre).toBe("Hello");
      });
  });

  test("Negative test POST addPack: request without items - /packs /", () => {
    return request(app)
      .post("/packs/add")
      .send(testData.noItemsPost)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  test("Negative test POST 2 addPack: request without name -  /packs /", () => {
    return request(app)
      .post("/packs/add")
      .send(testData.noNombrePost)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  test("Negative test body sin campo items  -  /packs/:nombre/updateItems /", () => {
    let nombre = "Pack brujas";
    return request(app)
      .put(`/packs/${nombre}/updateItems/`)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  test("Positive test updateItems  -  /packs/:nombre/updateItems /", () => {
    let nombre = "Pack brujas";
    return request(app)
      .put(`/packs/${nombre}/updateItems/`)
      .send(testData.positiveUpdateItems1)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", "61d2e1ded75d3770be6c7209");
        expect(res.body).toHaveProperty("nombre", nombre);
        expect(res.body.items).toHaveLength(3);
        expect(res.body.items[0]).toHaveProperty("stock");
        expect(res.body.items[0]).toHaveProperty("demanda");
        expect(res.body.items[0]).toHaveProperty("calidad");
        expect(res.body.items[0]).toHaveProperty("nombre");
        expect(res.body.items[0]).toHaveProperty("precio");
        expect(res.body.precio).toBe(12.75);
        expect(res.body.stock).toBe(63);

        expect(res.body.calidad).toBe("standard");
      });
  }, 10000);

  test("Positive test updateItems 2   -  /packs/:nombre/updateItems /", () => {
    let nombre = "Pack brujas";
    return request(app)
      .put(`/packs/${nombre}/updateItems/`)
      .send(testData.positiveUpdateItems2)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", "61d2e1ded75d3770be6c7209");
        expect(res.body).toHaveProperty("nombre", nombre);
        expect(res.body.items).toHaveLength(2);
        expect(res.body.items[0]).toHaveProperty("stock");
        expect(res.body.items[0]).toHaveProperty("demanda");
        expect(res.body.items[0]).toHaveProperty("calidad");
        expect(res.body.items[0]).toHaveProperty("nombre");
        expect(res.body.items[0]).toHaveProperty("precio");
        expect(res.body.stock).toBe(63);
        expect(res.body.precio).toBe(8.5);
        expect(res.body.calidad).toBe("basic");
      });
  }, 10000);

  test("Negative test updateItems: pack que no existe  -  /packs/:nombre/updateItems /", () => {
    let nombre = "Este pack no existe";
    return request(app)
      .put(`/packs/${nombre}/updateItems/`)
      .send(testData.positiveUpdateItems1)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });
  test("Negative test updateItems: item que no existe  -  /packs/:nombre/updateItems /", () => {
    let nombre = "Pack brujas";
    return request(app)
      .put(`/packs/${nombre}/updateItems/`)
      .send(testData.updateItemNotFound)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  test("Negative test POST 2 addPack: one of the items does not exist in db -  /packs /", () => {
    return request(app)
      .post("/packs/add")
      .send(`items: ${testData.unItemNoExiste.items}`)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  test("Destructive test POST addPack: request without name -  /packs/add /", () => {
    return request(app)
      .post("/packs/add")
      .send(testData.positivePost.items)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });
  test("Negative test POST addPack: nombre repetido -  /packs/add /", () => {
    return request(app)
      .post("/packs/add")
      .send(testData.nombreRepe)
      .then((res) => {
        expect(res.statusCode).toEqual(409);
      });
  });

  test("Negative test updateNombre  404 -  /packs/:nombre/cambiarNombre/:nuevoNombre /", () => {
    let nombre = "Pack que no existe";
    let nuevoNombre = "Nuevo nombre";
    return request(app)
      .put(`/packs/${nombre}/cambiarNombre/${nuevoNombre}`)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  test("Negatobe test updateNombre: no se puede usar un nombre ya guardado  -  /packs/:nombre/cambiarNombre/:nuevoNombre /", () => {
    let nombre = "Pack Squanchy Style";
    let nuevoNombre = "Pack brujas";
    return request(app)
      .put(`/packs/${nombre}/cambiarNombre/${nuevoNombre}`)
      .then((res) => {
        expect(res.statusCode).toEqual(409);
      });
  });

  test("Positive test updateNombre  -  /packs/:nombre/cambiarNombre/:nuevoNombre /", () => {
    let nombre = "Pack para Gangsters";
    let nuevoNombre = "Pack tortuga";
    return request(app)
      .put(`/packs/${nombre}/cambiarNombre/${nuevoNombre}`)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", "61d2de57d75d3770be66b706");
        expect(res.body).toHaveProperty("nombre", nuevoNombre);
      });
  });
});

var testData = {
  positivePost: {
    nombre: "Hello",
    items: [
      "Poción del arcoiris",
      "Bandera nacional",
      "Bañador de invisibilidad",
    ],
  },
  unItemNoExiste: {
    nombre: "Hello",
    items: [
      "dsa",
      "Poción del arcoiris",
    ],
  },
  noItemsPost: { nombre: "Hello" },
  noNombrePost: { items: ["a", "b"] },
  nombreRepe: { nombre: "Pack brujas", items: ["61d58aecd75d3770be584aed"] },
  positiveUpdateItems1: {
    items: [
      "Poción del arcoiris",
      "Bandera nacional",
      "Bañador de invisibilidad",
    ],
  },
  positiveUpdateItems2: {
    items: [      "Poción del arcoiris",
    "Bañador de invisibilidad"],
  },
  updateItemNotFound: {
    items: [
      "aa",
      "bb",
      "vv",
    ],
  },
};
