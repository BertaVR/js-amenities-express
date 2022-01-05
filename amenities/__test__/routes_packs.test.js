

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
    let nombre = "Pack1";
    return request(app)
      .get(`/packs/${nombre}`)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", "name", "items");
        expect(res.body.nombre).toEqual(expect.stringMatching(nombre));
        expect(res.body._id).toBeTruthy();
        expect(res.body.nombre).toBeTruthy();
        expect(res.body.items).toBeTruthy();
        expect(res.body._id).toBe("61afbb1396fa4c8802fe4201");
      });
  });

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
        console.log(res.body);
        // Received: "application/json; charset=utf-8"
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty(
          "_id",
          "name",
          "items",
          "stock",
          "calidad",
          "precio"
        );
        expect(res.body).toHaveLength(24);
        expect(res.body[0]._id).not.toBeFalsy();
      });
  });

  test("Positive test deletePack /packs/:nombre/delete /", () => {
    let nombre = "Pack animales";
    return request(app)
      .get(`/packs/${nombre}/delete`)
      .then((res) => {
        console.log(res.body);
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", "61afc35457387547a0c0f6d1");
        expect(res.body).toHaveProperty("nombre", nombre);
      });
  }, 10000);

  test("Negative test deletePack /packs/:nombre/delete /", () => {
    let nombre = "Pack que no existe";
    return request(app)
      .get(`/packs/${nombre}/delete`)
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

  test("Negative test updateNombre  404 -  /packs/:nombre/cambiarNombre/:nuevoNombre /", () => {
    let nombre = "Pack que no existe";
    let nuevoNombre = "Nuevo nombre";
    return request(app)
      .get(`/packs/${nombre}/cambiarNombre/${nuevoNombre}`)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  test("Positive test updateNombre  -  /packs/:nombre/cambiarNombre/:nuevoNombre /", () => {
    let nombre = "Pack para Payasos";
    let nuevoNombre = "Pack guay";
    return request(app)
      .get(`/packs/${nombre}/cambiarNombre/${nuevoNombre}`)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", "61d2ec8dd75d3770be7e818b");
        expect(res.body).toHaveProperty("nombre", nuevoNombre);
      });
  });
});

var testData = {
  positivePost: {
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
  },
  noItemsPost: { nombre: "Hello" },
  noNombrePost: { items: ["a", "b"] },
};
