const { expect } = require("@jest/globals");
const { isValidObjectId } = require("mongoose");
const request = require("supertest");
const app = require("../app");

const db = require("../db/mongoConfig");
describe("Items Routes", () => {
  afterAll(async () => {
    db.disconnect();
  });
  test("Positive test getItem /items/:nombre /", () => {
    let nombre = "Poción del arcoiris";
    return request(app)
      .get(`/items/${nombre}`)
      .then((res) => {
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body.stock).toBe(63),
          expect(res.body.demanda).toBe(63),
          expect(res.body.calidad).toBe(20),
          expect(res.body.precio).toBe(2),
          expect(res.body.nombre).toEqual(expect.stringMatching(nombre));

        expect(res.body._id).toBe("61d58b99d75d3770be596747");
      });
  }, 20000);

  test("Negative test getItem /items/:nombre /", () => {
    let nombre = "Este item no existe";
    return request(app)
      .get(`/items/${nombre}`)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  test("Positive test getAllItems /items /", () => {
    return request(app)
      .get(`/items`)
      .then((res) => {
        console.log(res.body);
        // Received: "application/json; charset=utf-8"
        expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(71);
        expect(res.body[0]._id).toBeTruthy();
        expect(res.body[0].nombre).toBeTruthy();
        expect(res.body[0].precio).toBeTruthy();
        expect(res.body[0]).toHaveProperty("stock");
        expect(res.body[0]).toHaveProperty("calidad");
        expect(res.body[0]).toHaveProperty("demanda");
      });
  });
}, 20000);
