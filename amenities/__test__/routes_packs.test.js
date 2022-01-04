/**
 * Ejecutar los test desde terminal
 * de Linux, por aquello de las
 * variables de entorno
 */

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
    // cierro la conexión a mongo
    // await app.get('db').close();
    db.disconnect();
  });

  // testing de codigo asincrono con promesas
  test("Test getPack /packs/:nombre /", () => {
    // sintaxis alternativa con supertest
    // Uso la de jest con codigo asincrono con promesas
    let nombre = "Pack1";
    return request(app)
      .get(`/packs/${nombre}`)
      .then((res) => {
        console.log(res.body)
        // Received: "application/json; charset=utf-8"
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
});
